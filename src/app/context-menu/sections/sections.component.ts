import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { TreeNode } from 'src/app/models/treeNode';
import { ApplicationService } from 'src/app/services/application.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import * as Joi from 'joi';

@Component({
  selector: 'st-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  @Input() sections: any;
  @Input() screenName: any;
  @Input() screenId: any;
  @Input() resData: any;
  @Input() formlyModel: any;
  form: any = new FormGroup({});
  @Output() traverseChangeEmit: EventEmitter<any> = new EventEmitter();
  @Output() sectionRepeatEmit: EventEmitter<any> = new EventEmitter();
  @Output() notify: EventEmitter<any> = new EventEmitter();
  requestSubscription: Subscription;
  dataModel: any = {};
  validationCheckStatus: any = [];
  setErrorToInput: any = [];
  joiValidationData: TreeNode[] = [];
  schemaValidation: any;
  ruleObj: any = {};
  ruleValidation: any = {};
  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService, private employeeService: EmployeeService
    , private applicationServices: ApplicationService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getJoiValidation();
    this.getFromQuery();
    this.requestSubscription = this.dataSharedService.sectionSubmit.subscribe({
      next: (res) => {
        const checkButtonExist = this.isButtonIdExist(this.sections.children[1].children, res.id);
        if (checkButtonExist) {
          let makeModel: any = {};
          const filteredNodes = this.filterInputElements(this.sections.children[1].children);
          for (let item in this.formlyModel) {
            filteredNodes.forEach((element) => {
              if (item == element.formly[0].fieldGroup[0].key) {
                makeModel[item] = this.formlyModel[item]
              }
            });
          }
          this.dataModel = makeModel;
          if (Object.keys(makeModel).length > 0) {
            for (const key in this.dataModel) {
              if (this.dataModel.hasOwnProperty(key)) {
                const value = this.getValueFromNestedObject(key, this.formlyModel);
                if (value !== undefined) {
                  this.dataModel[key] = value;
                }
              }
            }
          }
          // this.submit();
          if (Object.keys(makeModel).length > 0) {
            let obj = {
              "employeeeuser": this.dataModel
            };
            // this.dataModel = obj;
            this.saveData(res)

          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getValueFromNestedObject(key: string, obj: any): any {
    const keys = key.split('.');
    let value = obj;
    for (const k of keys) {
      if (!value || !value.hasOwnProperty(k)) {
        return undefined;
      }
      value = value[k];
    }
    return value;
  }
  traverseAndChange(node: any, type: string) {
    let obj = {
      node: node,
      type: type
    }
    this.traverseChangeEmit.emit(obj);
  }
  sectionRepeat(data: any) {
    this.sectionRepeatEmit.emit(data);
  }
  isButtonIdExist(data: any[], targetId: string): boolean {
    for (const item of data) {
      if (item.type === 'button' && item.id === targetId) {
        return true;
      }
      if (item.children && item.children.length > 0) {
        if (this.isButtonIdExist(item.children, targetId)) {
          return true;
        }
      }
    }
    return false;
  }
  filterInputElements(data: any): any[] {
    const inputElements: any[] = [];

    function traverse(obj: any): void {
      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          traverse(item);
        });
      } else if (typeof obj === 'object' && obj !== null) {
        if (obj.formlyType === 'input') {
          inputElements.push(obj);
        }
        Object.values(obj).forEach((value) => {
          traverse(value);
        });
      }
    }

    traverse(data);
    return inputElements;
  }
  saveData(data: any) {

    if (data.isSubmit) {
      this.joiValidation();
      this.saveData1(data);
    }
  }
  saveData1(data: any) {
    // this.submit();
    let oneModelData = this.convertModel(this.dataModel);

    const empData = {
      screenId: this.screenName,
      modalData: oneModelData
    };

    console.log(empData);
    const tableNames = new Set();

    for (const key in empData.modalData) {
      const tableName = key.split('.')[0];
      tableNames.add(tableName);
    }

    const Arraytables = Array.from(tableNames)
    const remainingTables = Arraytables.slice(1);
    let id;
    for (const key in empData.modalData) {
      if (empData.modalData.hasOwnProperty(key) &&
        key.endsWith('.id') &&
        empData.modalData[key] !== "") {
        id = key;
      }
    }

    if (id == undefined) {
      let relationIds: any = remainingTables.map(table => `${Arraytables[0]}_id`);
      relationIds = relationIds.toString();
      const tables = (Array.from(tableNames)).toString();
      console.log(tables);
      if (Object.keys(empData.modalData).length > 0)
        this.employeeService.saveSQLDatabaseTable('knex-query', empData).subscribe({
          next: (res) => {
            if (res[0]?.error)
              this.toastr.error(res[0]?.error, { nzDuration: 3000 });
            else {
              this.toastr.success("Save Successfully", { nzDuration: 3000 });
              this.setInternalValuesEmpty(this.dataModel)
              // this.employeeService.getSQLDatabaseTable(`knex-query?tables=${tables}&relationIds=id,${relationIds.toString()}`).subscribe({
              this.getFromQuery();
            }
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
    } else {
      // const dynamicPropertyName = Object.keys(this.dataModel)[0]; // Assuming the dynamic property name is the first property in this.dataModel
      if (this.dataModel) {
        // this.form.get(dynamicPropertyName);
        const model = {
          screenId: this.screenName,
          postType: 'put',
          modalData: empData.modalData
        };
        if (Object.keys(empData.modalData).length > 0)
          this.employeeService.saveSQLDatabaseTable('knex-query/executeQuery', model).subscribe({
            next: (res) => {
              this.toastr.success("Update Successfully", { nzDuration: 3000 });
              this.getFromQuery();
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          });
      }
    }
  }
  convertModel(model: any, parentKey = "") {
    const convertedModel: any = {};

    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const value = model[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          Object.assign(convertedModel, this.convertModel(value, newKey.toLocaleLowerCase()));
        } else {
          convertedModel[newKey.toLocaleLowerCase()] = value;
        }
      }
    }

    return convertedModel;
  }
  getFromQuery() {
    let tableData = this.findObjectByTypeBase(this.sections,"gridList");
    if(tableData){
      this.employeeService.getSQLDatabaseTable(`knex-query/${this.screenName}`).subscribe({
        next: (res) => {
          if (tableData && res) {
            let saveForm = JSON.parse(JSON.stringify(res[0]));
            const firstObjectKeys = Object.keys(saveForm);
            let obj = firstObjectKeys.map(key => ({ name: key }));
            tableData.tableData = [];
            saveForm.id = tableData.tableData.length + 1
            res.forEach((element: any) => {
              element.id = (element.id).toString();
              tableData.tableData?.push(element);
            });
            if (JSON.stringify(tableData['tableKey']) != JSON.stringify(obj)) {
              const updatedData = tableData.tableHeaders.filter((updatedItem:any) => {
                const name = updatedItem.name;
                return !obj.some((headerItem:any) => headerItem.name === name);
              });
              if(updatedData.length > 0) {
                tableData.tableData =   tableData.tableData.map((item:any) => {
                  const newItem = { ...item };
                      for (let i = 0; i < updatedData.length; i++) {
                        newItem[updatedData[i].key] = "";
                      }
                  return newItem;
                });
              }
            }
            this.assignGridRules(tableData);
          }
        }
      });
    }
  }
  gridRulesData:any;
  assignGridRules(data:any){
    if(this.gridRulesData?.data.length > 0){
      this.gridRules(this.gridRulesData,data);
    }
    else
    {
      this.applicationServices.getNestCommonAPIById('cp/GridBusinessRule', this.screenId).subscribe(((getRes: any) => {
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.gridRulesData = getRes;
            this.gridRules(getRes,data);
          }
        } else
          this.toastr.error(getRes.message, { nzDuration: 3000 });
      }));
    }

  }
  gridRules(getRes:any,data:any){
    let gridFilter = getRes.data.filter((a: any) => a.gridType == 'Body');
    for (let m = 0; m < gridFilter.length; m++) {
      if (gridFilter[m].gridKey == data.key && data.tableData) {
        const objRuleData = JSON.parse(gridFilter[m].businessRuleData);
        for (let index = 0; index < objRuleData.length; index++) {
          const elementv1 = objRuleData[index];
          let checkType = Object.keys(data.tableData[0]).filter(a => a == elementv1.target);
          if (checkType.length == 0) {
            console.log("No obj Found!")
          }
          else {
            for (let j = 0; j < data.tableData.length; j++) {
              //query
              let query: any;
              if (elementv1.oprator == 'NotNull')
                query = "1==1"
              else{
                let firstValue = data.tableData[j][elementv1.ifCondition] ? data.tableData[j][elementv1.ifCondition] : "0";
                query =  firstValue + elementv1.oprator + elementv1.getValue
              }
              for (let k = 0; k < elementv1.conditional.length; k++) {
                const element = elementv1.conditional[k];
                query += ' ' +element.condType + ' ' + data.tableData[j][element.condifCodition] + element.condOperator +  element.condValue;
              }
              if (this.evaluateGridCondition(query)) {
                for (let k = 0; k < elementv1.getRuleCondition.length; k++) {
                  const elementv2 = elementv1.getRuleCondition[k];
                  if (elementv1.getRuleCondition[k].referenceOperator != '') {
                    data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                    data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                  } else {
                    if (k > 0) {
                      data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${data.tableData[j][elementv1.target]} ${elementv1.getRuleCondition[k - 1].referenceOperator} ${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                      data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                    }
                    else
                      data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                    data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                  }
                  if (elementv2.multiConditionList.length > 0) {
                    for (let l = 0; l < elementv2.multiConditionList.length; l++) {
                      const elementv3 = elementv2.multiConditionList[l];
                      const value = data.tableData[j][elementv1.target];
                      data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${value} ${elementv3.oprator} ${data.tableData[j][elementv3.target]}`);
                      // this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                    }
                  }
                }
                for (let k = 0; k < elementv1.thenCondition.length; k++) {
                  const elementv2 = elementv1.thenCondition[k];
                  for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                    const elementv3 = elementv2.getRuleCondition[l];
                    data.tableData[j][elementv2.thenTarget] = this.evaluateGridConditionOperator(`${data.tableData[j][elementv3.ifCondition]} ${elementv3.oprator} ${data.tableData[j][elementv3.target]}`);
                    if (elementv3.multiConditionList.length > 0) {
                      for (let m = 0; m < elementv3.multiConditionList.length; m++) {
                        const elementv4 = elementv3.multiConditionList[m];
                        const value = data.tableData[j][elementv2.thenTarget];
                        data.tableData[j][elementv2.thenTarget] = this.evaluateGridConditionOperator(`${value} ${elementv4.oprator} ${data.tableData[j][elementv4.target]}`);
                        // this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    let headerFilter = getRes.data.filter((a: any) => a.gridType == 'Header');
    for (let m = 0; m < headerFilter.length; m++) {
      if (headerFilter[m].gridKey == data.key && data.tableData) {
        for (let index = 0; index < headerFilter[m].businessRuleData.length; index++) {
          const elementv1 = headerFilter[m].businessRuleData[index];
          let checkType = Object.keys(data.tableData[0]).filter(a => a == elementv1.target);
          if (checkType.length == 0) {
            // const filteredData = this.filterTableData(elementv1)
            // const result = this.makeAggregateFunctions(filteredData, elementv1.target);
            // elementv1.getRuleCondition.forEach((elementv2: any) => {
            //   element = this.applyAggreateFunctions(elementv2, element, result, 'gridHeaderSum')
            // });
          }
          else {
            data.tableHeaders.forEach((element:any) => {
              if (element.key == checkType[0]) {
                element['gridHeaderSum'] = 0;
                const filteredData = this.filterTableData(elementv1,data)
                const result = this.makeAggregateFunctions(filteredData, elementv1.target)
                elementv1.getRuleCondition.forEach((elementv2: any) => {
                  element = this.applyAggreateFunctions(elementv2, element, result, 'gridHeaderSum')
                });
                for (let k = 0; k < elementv1.thenCondition.length; k++) {
                  const elementv2 = elementv1.thenCondition[k];
                  for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                    const elementv3 = elementv2.getRuleCondition[l];
                    let checkType = Object.keys(data.tableData[0]).filter(a => a == elementv3.ifCondition);
                    if (checkType.length == 0) {
                      console.log("No obj Found!")
                    }
                    else {
                      const resultData = this.makeAggregateFunctions(filteredData, elementv3.ifCondition)
                      data.tableHeaders.forEach((element:any) => {
                        if (element.key == checkType[0]) {
                          element = this.applyAggreateFunctions(elementv3, element, resultData, 'gridHeaderSum')
                        }
                      })
                    }
                  }
                }
              }
              else {
                if (!element.gridHeaderSum)
                  element['gridHeaderSum'] = '';
              }
            });
          }
        }
      }
    }
    let footerFilter = getRes.data.filter((a: any) => a.gridType == 'Footer');
    for (let m = 0; m < footerFilter.length; m++) {
      if (footerFilter[m].gridKey == data.key && data.tableData) {
        for (let index = 0; index < footerFilter[m].businessRuleData.length; index++) {
          const elementv1 = footerFilter[m].businessRuleData[index];
          let checkType = Object.keys(data.tableData[0]).filter(a => a == elementv1.target);
          if (checkType.length == 0) {
            console.log("No obj Found!")
          }
          else {
            data.tableHeaders.forEach((element:any) => {
              if (element.key == checkType[0]) {
                element['gridFooterSum'] = 0;
                const filteredData = this.filterTableData(elementv1,data)
                const result = this.makeAggregateFunctions(filteredData, elementv1.target)
                elementv1.getRuleCondition.forEach((elementv2: any) => {
                  element = this.applyAggreateFunctions(elementv2, element, result, 'gridFooterSum')
                });
                for (let k = 0; k < elementv1.thenCondition.length; k++) {
                  const elementv2 = elementv1.thenCondition[k];
                  for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                    const elementv3 = elementv2.getRuleCondition[l];
                    let checkType = Object.keys(data.tableData[0]).filter(a => a == elementv3.ifCondition);
                    if (checkType.length == 0) {
                      console.log("No obj Found!")
                    }
                    else {
                      const resultData = this.makeAggregateFunctions(filteredData, elementv3.ifCondition)
                      data.tableHeaders.forEach((element:any) => {
                        if (element.key == checkType[0]) {
                          element = this.applyAggreateFunctions(elementv3, element, resultData, 'gridFooterSum')
                        }
                      })
                    }
                  }
                }
              }
              else {
                if (!element.gridHeaderSum)
                  element['gridHeaderSum'] = '';
              }
            });
          }
        }
      }
    }
  }
  private isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  evaluateGridConditionOperator(condition: string): any {
    const operators: { [key: string]: (a: any, b: any) => any } = {
      "+": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a + b : null,
      "-": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a - b : null,
      "*": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a * b : null,
      "/": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a / b : null,
      "%": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a % b : null,
    };

    const parts = condition.split(/(\+|-|\*|\/|%)/).map(part => part.trim());
    const leftOperand = parts[0];
    const operator = parts[1];
    const rightOperand = parts[2];

    const leftValue = this.isNumeric(leftOperand) ? Number(leftOperand) : null;
    const rightValue = this.isNumeric(rightOperand) ? Number(rightOperand) : null;

    return operators[operator](leftValue, rightValue);
  }
  evaluateGridCondition(condition: string): boolean {
    const operators: { [key: string]: (a: any, b: any) => boolean } = {
      "==": (a: any, b: any) => a == b,
      "!=": (a: any, b: any) => a != b,
      ">=": (a: any, b: any) => a >= b,
      "<=": (a: any, b: any) => a <= b,
      "=": (a: any, b: any) => a === b,
      ">": (a: any, b: any) => a > b,
      "<": (a: any, b: any) => a < b,
      "null": (a: any, b: any) => a === null,
      "contains": (a: any, b: any) => a.includes(b),
    };

    const hasLogicalOperator = condition.includes("AND") || condition.includes("OR");

    if (hasLogicalOperator) {
      const conditions = condition.split(/\s+(AND|OR)\s+/);
      let result = true;

      for (let i = 0; i < conditions.length; i++) {
        const expr = conditions[i];
        if (!expr.includes('AND') && !expr.includes('OR')) {
          const parts = expr.split(/(==|!=|>=|<=|=|>|<|null|contains)/).map(part => part.trim());
          const leftOperand = this.parseOperand(parts[0]);
          const operator = parts[1];
          const rightOperand = this.parseOperand(parts[2]);

          if (!operators[operator]) {
            result = false; // Invalid operator found
            break;
          }

          if (!operators[operator](leftOperand, rightOperand)) {
            result = false; // Condition not satisfied
            break;
          }
        }
      }

      return result;
    } else {
      const parts = condition.split(/(==|!=|>=|<=|=|>|<|null|contains)/).map(part => part.trim());
      const leftOperand = this.parseOperand(parts[0]);
      const operator = parts[1];
      const rightOperand = this.parseOperand(parts[2]);

      return operators[operator](leftOperand, rightOperand);
    }
  }
  parseOperand(operand: string): any {
    const trimmedOperand = operand.trim();
    if (/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(trimmedOperand)) {
      return Number(trimmedOperand); // Parse as number if it's a valid numeric string
    }
    return trimmedOperand; // Return as string otherwise
  }

  applyAggreateFunctions(elementv3: any, element: any, resultData: any, value: any) {
    if (elementv3.oprator == 'sum')
      element[value] = resultData?.sum;
    else if (elementv3.oprator == 'count')
      element[value] = resultData?.count;
    else if (elementv3.oprator == 'avg') {
      element[value] = resultData.avg
    }
    else if (elementv3.oprator == 'min')
      element[value] = resultData.min
    else if (elementv3.oprator == 'max')
      element[value] = resultData.max;
    return element;
  }
  filterTableData(elementv1: any,data:any) {
    let filterData = data.tableData.filter((item: any) => {
      const condition = item[elementv1.ifCondition];
      const value = elementv1.getValue;

      switch (elementv1.oprator) {
        case ">=":
          return condition >= value;
        case ">":
          return condition > value;
        case "<=":
          return condition <= value;
        case "<":
          return condition < value;
        case "==":
          return condition === value;
        case "!=":
          return condition !== value;
        default:
          return false;
      }
    });
    return filterData;
  }
  makeAggregateFunctions(filteredData: any, elementv1: any) {
    let getData = filteredData.reduce((accumulator: any, currentValue: any, index: any, array: any) => {
      accumulator.count++;
      accumulator.sum += currentValue[elementv1];
      accumulator.min = Math.min(accumulator.min, currentValue[elementv1]);
      accumulator.max = Math.max(accumulator.max, currentValue[elementv1]);

      if (index === array.length - 1) {
        accumulator.avg = accumulator.sum / accumulator.count;
      }

      return accumulator;
    },
      {
        count: 0,
        sum: 0,
        min: Infinity,
        max: -Infinity,
        avg: 0,
      }
    );
    return getData;
  }
  findObjectByTypeBase(data: any, type: any) {
    if (data) {
      if (data.type && type) {
        if (data.type === type) {
          return data;
        }
        if (data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByTypeBase(child, type);
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }
    }
  }
  setInternalValuesEmpty = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.setInternalValuesEmpty(obj[key]);
      } else {
        obj[key] = '';
      }
    }
  };
  submit() {

    // this.commonChartService.submit();
    // this.cd.detectChanges();
    // this.joiService.dataModel = this.dataModel;
    // this.joiService.submit();
    this.dataModel = this.formlyModel;
    // this.formlyModel = this.dataModel;
    this.joiValidation();
    // if (this.validationCheckStatus.length === 0) {
    //   this.dataModel;
    //   console.log(this.dataModel);
    //   this.dataModel
    // }
    // else {
    //   alert(this.validationCheckStatus);
    // }
  }
  joiValidation() {
    let jsonScreenRes: any = [];
    let filteredInputNodes = this.filterInputElements(this.sections.children[1].children);
    if (this.joiValidationData.length > 0) {
      for (let j = 0; j < filteredInputNodes.length; j++) {
        if (filteredInputNodes[j].formlyType != undefined) {
          let jsonScreenRes = this.joiValidationData.filter(a => a.key == filteredInputNodes[j].formly[0].fieldGroup[0].key);
          if (jsonScreenRes.length > 0) {
            if (jsonScreenRes[0].type === "text") {
              const { minlength, maxlength } = jsonScreenRes[0];
              const minLimit: any = typeof minlength !== 'undefined' ? minlength : 0;
              const maxLimit: any = typeof maxlength !== 'undefined' ? maxlength : 0;
              if (!minLimit && !maxLimit) {
                this.ruleObj = {
                  [jsonScreenRes[0].key]: Joi.string().required()
                }
              }
              else {
                this.ruleObj = {
                  [jsonScreenRes[0].key]: Joi.string().min(parseInt(minLimit, 10)).max(parseInt(maxLimit, 10)),
                };
              }
            }
            else if (jsonScreenRes[0].type === "number") {
              const { minlength, maxlength } = jsonScreenRes[0];
              const minLimit: any = typeof minlength !== 'undefined' ? minlength : 0;
              const maxLimit: any = typeof maxlength !== 'undefined' ? maxlength : 0;
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.number().integer().min(parseInt(minLimit, 10)).max(parseInt(maxLimit, 10)),
              };
            }
            else if (jsonScreenRes[0].type == "pattern") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.string().pattern(new RegExp(jsonScreenRes[0].pattern)),
              }
            }
            else if (jsonScreenRes[0].type == "reference") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.ref(typeof jsonScreenRes[0].reference !== 'undefined' ? jsonScreenRes[0].reference : ''),
              }
            }
            else if (jsonScreenRes[0].type == "email") {
              // this.ruleObj = {
              //   [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments: jsonScreenRes[0].emailTypeAllow.length, tlds: { allow: jsonScreenRes[0].emailTypeAllow } }),
              // }
              const emailTypeAllow = Array.isArray(jsonScreenRes[0].emailTypeAllow) ? jsonScreenRes[0].emailTypeAllow : [];
              const minDomainSegments = Math.max(0, Number.isInteger(jsonScreenRes[0].emailTypeAllow.length) ? jsonScreenRes[0].emailTypeAllow.length : 0);
              const schema = {
                [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments, tlds: { allow: emailTypeAllow } }),
              };
              this.ruleObj = schema;
            }
            Object.assign(this.ruleValidation, this.ruleObj);
          }
        }

      }
      this.schemaValidation = Joi.object(Object.assign({}, this.ruleValidation));
      this.validationChecker();

    }
    return true;
  }
  validationChecker() {
    let filteredNodes = this.filterInputElements(this.sections.children[1].children);
    filteredNodes.forEach((item: any) => {
      if (item.formly) {
        item.formly[0].fieldGroup[0].props.error = null;
        item.formly[0].fieldGroup[0].props['additionalProperties'].requiredMessage = null;
      }
    });

    this.validationCheckStatus = [];
    const cc = this.schemaValidation.validate(Object.assign({}, this.formlyModel), { abortEarly: false });
    if (cc?.error) {
      this.setErrorToInput = cc.error.details;
      filteredNodes.forEach((V2: any, index) => {
        for (let i = 0; i < this.setErrorToInput.length; i++) {
          if (this.setErrorToInput[i].context.key == V2.formly[0].fieldGroup[0].key) {
            V2.formly[0].fieldGroup[0].props['additionalProperties'].requiredMessage = this.setErrorToInput[i].message.replace(this.setErrorToInput[i].context.key, V2.formly[0].fieldGroup[0].props.label);
          }
        }
        if (V2.formly[0].fieldGroup[0].props['additionalProperties'].requiredMessage)
          this.validationCheckStatus.push(V2.formly[0].fieldGroup[0].props['additionalProperties'].requiredMessage);
      });
      if (this.setErrorToInput.length > 0) {
        this.dataSharedService.formlyShowError.next(true);
      }
      this.cd.detectChanges();
    }
  }
  findObjectByType(data: any, key: any) {
    if (data.type === key) {
      return data;
    }
    for (let child of data.children) {
      let result: any = this.findObjectByType(child, key);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
  getJoiValidation() {
    if (this.screenId)
      this.applicationServices.getNestCommonAPIById('cp/ValidationRule', this.screenId).subscribe((getRes => {
        this.joiValidationData = getRes.data;
      }))
  }
}
