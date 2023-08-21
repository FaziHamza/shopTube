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
  @Input() form: any;
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
  saveLoader: boolean = false;
  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService, private employeeService: EmployeeService
    , private applicationServices: ApplicationService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.screenName;
    this.getJoiValidation();
    let btnData = this.findObjectByTypeBase(this.sections, "button");
    if (btnData)
      this.getFromQuery(btnData);
    this.requestSubscription = this.dataSharedService.sectionSubmit.subscribe({
      next: (res) => {
        const checkButtonExist = this.findObjectById(this.sections, res.id);
        // const checkButtonExist = this.isButtonIdExist(this.sections.children[1].children, res.id);
        if (checkButtonExist?.appConfigurableEvent) {
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
                  this.dataModel[key] = this.dataModel[key] ? this.dataModel[key] : value;
                }
              }
            }
          }
          // this.submit();
          if (Object.keys(makeModel).length > 0) {
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
      if (this.joiValidationData.length > 0) {
        if (this.validationCheckStatus.length == 0) {
          this.saveData1(data);
        }
      } else {
        this.saveData1(data);
      }
    }
  }
  saveButtonApi(api: string) {
    let oneModelData = this.convertModel(this.dataModel);
    const removePrefix = (data: Record<string, any>): Record<string, any> => {
      const newData: Record<string, any> = {};
      for (const key in data) {
        const lastDotIndex = key.lastIndexOf('.');
        const newKey = lastDotIndex !== -1 ? key.substring(lastDotIndex + 1) : key;
        newData[newKey] = data[key];
      }
      return newData;
    };

    const result = removePrefix(oneModelData);
    // Note we need to save JSON of Button for api in JSON.stringify
    let apiJSON = JSON.parse(api);
    let findClickApi = apiJSON.filter((item: any) => item.actions.some((action: any) => action.method === 'POST' && action.actionType == 'API'));
    this.applicationServices.addNestCommonAPI(findClickApi.length > 0 ? findClickApi?.[0].actions?.[0]?.url : 'knex-query', result).subscribe({
      next: (res) => {
        if (res[0]?.error)
          this.toastr.error(res[0]?.error, { nzDuration: 3000 });
        else {
          this.toastr.success("Save Successfully", { nzDuration: 3000 });
          // this.setInternalValuesEmpty(this.dataModel)
          // this.employeeService.getSQLDatabaseTable(`knex-query?tables=${tables}&relationIds=id,${relationIds.toString()}`).subscribe({
          this.getFromQuery(apiJSON);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  saveData1(data: any) {
    // this.submit();
    let oneModelData = this.convertModel(this.dataModel);
    if (Object.keys(oneModelData).length > 0) {
      let findClickApi = data.appConfigurableEvent.filter((item: any) => item.actions.some((action: any) => action.method === 'post' && action.actionType == 'api'));

      let empData: any = {};
      if (findClickApi?.[0].actions?.[0]?.url?.includes('/cp') || findClickApi?.[0].actions?.[0]?.url?.includes('/market-place')) {
        let mainTableName = "";
        const removePrefix = (data: Record<string, any>): Record<string, any> => {
          const newData: Record<string, any> = {};
          for (const key in data) {
            const lastDotIndex = key.lastIndexOf('.');
            const newKey = lastDotIndex !== -1 ? key.substring(lastDotIndex + 1) : key;
            newData[newKey] = data[key];

            if (lastDotIndex !== -1 && mainTableName === "") {
              mainTableName = key.substring(0, lastDotIndex);
            }
          }
          return newData;
        };

        let result = removePrefix(oneModelData);
        // result['id'] = '';
        if (findClickApi?.[0].actions?.[0]?.url?.includes('/market-place')) {
          empData = result;
        } else {
          empData[mainTableName] = result;
        }
      } else {
        empData = {
          screenId: this.screenName,
          modalData: oneModelData
        };
      }


      console.log(empData);
      const tableNames = new Set();

      for (const key in empData.modalData) {
        const tableName = key.split('.')[0];
        tableNames.add(tableName);
      }

      const Arraytables = Array.from(tableNames)
      const remainingTables = Arraytables.slice(1);
      let id;
      for (const key in empData?.modalData) {
        if (empData.modalData.hasOwnProperty(key) &&
          key.endsWith('.id') &&
          empData.modalData[key] !== "") {
          id = key;
        }
      }
      if (id == undefined) {

        let relationIds: any = remainingTables.map(table => `${Arraytables[0]}_id`);
        relationIds = relationIds.toString();
        // if (Object.keys(empData.modalData).length > 0)
        this.saveLoader = true;
        this.applicationServices.addBackendCommonApi(findClickApi.length > 0 ? findClickApi?.[0].actions?.[0]?.url : 'knex-query', empData).subscribe({
          next: (res) => {
            if (res[0]?.error)
              this.toastr.error(res[0]?.error, { nzDuration: 3000 });
            else {
              this.toastr.success("Save Successfully", { nzDuration: 3000 });
              this.setInternalValuesEmpty(this.dataModel);
              this.setInternalValuesEmpty(this.formlyModel);
              this.form.patchValue(this.formlyModel);
              // this.setInternalValuesEmpty(this.dataModel)
              // this.employeeService.getSQLDatabaseTable(`knex-query?tables=${tables}&relationIds=id,${relationIds.toString()}`).subscribe({
              this.getFromQuery(data);
            }

          },
          error: (err) => {
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
            this.saveLoader = false;
          }
        });
      }
      else {
        let findClickApi = data.appConfigurableEvent.filter((item: any) => item.actions.some((action: any) => action.method === 'put' && action.actionType == 'api'));
        if (this.dataModel) {
          // this.form.get(dynamicPropertyName);
          const model = {
            screenId: this.screenName,
            postType: 'put',
            modalData: empData.modalData
          };
          const removePrefix = (data: Record<string, any>): Record<string, any> => {
            const newData: Record<string, any> = {};
            for (const key in data) {
              const lastDotIndex = key.lastIndexOf('.');
              const newKey = lastDotIndex !== -1 ? key.substring(lastDotIndex + 1) : key;
              newData[newKey] = data[key];
            }
            return newData;
          };

          const result = {
            ...model,
            modalData: removePrefix(model.modalData)
          };
          this.saveLoader = true;
          this.applicationServices.addNestCommonAPI(findClickApi.length > 0 ? findClickApi?.[0].actions?.[0]?.url : 'knex-query/executeQuery', result).subscribe({
            next: (res) => {
              this.toastr.success("Update Successfully", { nzDuration: 3000 });
              this.setInternalValuesEmpty(this.dataModel);
              this.setInternalValuesEmpty(this.formlyModel);
              this.form.patchValue(this.formlyModel);
              this.getFromQuery(data);
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
              this.saveLoader = false;
            }
          });
        }
      }
    }

  }
  convertModel(model: any, parentKey = "") {
    const convertedModel: any = {};

    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const value = model[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (Array.isArray(value)) {
          convertedModel[newKey] = value.join(',');
        }
        else if (typeof value === 'object' && value !== null) {
          Object.assign(convertedModel, this.convertModel(value, newKey));
        } else {
          convertedModel[newKey] = value;
        }
      }
    }

    return convertedModel;
  }

  temporyGrid() {
    let tableData = this.findObjectByTypeBase(this.sections, "gridList");
    this.assignGridRules(tableData);
  }
  getFromQuery(data: any) {
    let findClickApi = data?.appConfigurableEvent?.filter((item: any) => item.actions.some((action: any) => action.method === 'get' && action.actionType == 'api'));
    if (findClickApi) {
      if (findClickApi.length > 0) {
        let tableData = this.findObjectByKey(this.sections, findClickApi?.[0].actions?.[0]?.elementName);
        if (tableData) {
          let pagination = '';
          if (tableData.serverSidePagination) {
            pagination = '?page=' + 1 + '&pageSize=' + tableData?.end;
          }
          const apiUrl = findClickApi.length > 0 ? findClickApi?.[0].actions?.[0]?.url : `knex-query/${this.screenName}`;
          this.saveLoader = true;
          this.employeeService.getSQLDatabaseTable(apiUrl + pagination).subscribe({
            next: (res) => {
              if (tableData && res.isSuccess) {
                if (res.data.length > 0) {
                  if (findClickApi?.[0].actions?.[0]?.url.includes('market-place')) {

                    let requiredData = res.data.map((item: any) => {
                      // Extracting category details and subcategory details
                      const categoryDetails = item?.categoryDetails?.[0];
                      const subcategoryDetails = item?.subcategoryDetails?.[0];

                      // Create a new object without unwanted properties
                      return {
                        id: item._id, // Rename _id to id
                        name: item.name,
                        categoryId: item.categoryId,
                        categoryName: categoryDetails?.name, // Access the name property from categoryDetails
                        subcategoryId: item.subcategoryId,
                        subcategoryName: subcategoryDetails?.name, // Access the name property from subcategoryDetails
                        thumbnailimage: item.thumbnailimage,
                        // ...rest
                      };
                    });

                    res.data = requiredData;
                  }

                  let saveForm = JSON.parse(JSON.stringify(res.data[0]));
                  const firstObjectKeys = Object.keys(saveForm);
                  let tableKey = firstObjectKeys.map(key => ({ name: key }));
                  let obj = firstObjectKeys.map(key => ({ name: key, key: key }));
                  tableData.tableData = [];
                  saveForm.id = tableData.tableData.length + 1;
                  res.data.forEach((element: any) => {
                    element.id = (element?.id)?.toString();
                    tableData.tableData?.push(element);
                  });
                  // pagniation work start
                  if (!tableData.end) {
                    tableData.end = 10;
                  }
                  tableData.pageIndex = 1;
                  tableData.totalCount = res.count;
                  tableData.serverApi = findClickApi.length > 0 ? findClickApi?.[0].actions?.[0]?.url : `knex-query/${this.screenName}`;
                  tableData.targetId = '';
                  tableData.displayData = tableData.tableData.length > tableData.end ? tableData.tableData.slice(0, tableData.end) : tableData.tableData;
                  // pagniation work end
                  if (tableData.tableHeaders.length == 0) {
                    tableData.tableHeaders = obj;
                    // let checkDataTypeExist = tableData.tableHeaders.every((check: any) => check.hasOwnProperty('dataType'));
                    // if (!checkDataTypeExist) {
                    //   let formlyInputs = this.filterInputElements(this.sections.children[1].children);
                    //   if (formlyInputs && formlyInputs?.length > 0) {
                    //     obj.forEach((head: any) => {
                    //       let input = formlyInputs.find(a => a.formly[0].fieldGroup[0].key.includes('.') ? a.formly[0].fieldGroup[0].key.split('.')[1] == head.key : a.formly[0].fieldGroup[0].key == head.key);
                    //       if (input) {
                    //         head['dataType'] = input.formly[0].fieldGroup[0].type;
                    //         head['subDataType'] = input.formly[0].fieldGroup[0].props.type;
                    //         head['title'] = input.title;
                    //       }
                    //     });
                    //     tableData.tableHeaders = obj;
                    //   }
                    // }
                    tableData['tableKey'] = tableKey
                  }
                  else {
                    if (JSON.stringify(tableData['tableKey']) != JSON.stringify(tableKey)) {
                      const updatedData = tableData.tableHeaders.filter((updatedItem: any) => {
                        const name = updatedItem.name;
                        return !tableKey.some((headerItem: any) => headerItem.name === name);
                      });
                      if (updatedData.length > 0) {
                        tableData.tableHeaders.map((item: any) => {
                          const newItem = { ...item };
                          for (let i = 0; i < updatedData.length; i++) {
                            newItem[updatedData[i].key] = "";
                          }
                          return newItem;
                        });
                      }

                    }
                  }

                  // Make DataType 
                  let propertiesWithoutDataType = tableData.tableHeaders.filter((check: any) => !check.hasOwnProperty('dataType'));
                  if (propertiesWithoutDataType.length > 0) {
                    let formlyInputs = this.filterInputElements(this.sections.children[1].children);

                    if (formlyInputs && formlyInputs.length > 0) {
                      propertiesWithoutDataType.forEach((head: any) => {
                        let input = formlyInputs.find(a => a.formly[0].fieldGroup[0].key.includes('.') ? a.formly[0].fieldGroup[0].key.split('.')[1] == head.key : a.formly[0].fieldGroup[0].key == head.key);

                        if (input) {
                          head['dataType'] = input.formly[0].fieldGroup[0].type;
                          head['subDataType'] = input.formly[0].fieldGroup[0].props.type;
                          head['title'] = input.title;
                        }
                      });

                      tableData.tableHeaders = tableData.tableHeaders.concat(propertiesWithoutDataType.filter((item : any) => !tableData.tableHeaders.some((objItem : any) => objItem.key === item.key)));
                      // tableData.tableHeaders = obj;
                    }
                  }
                }
                this.assignGridRules(tableData);
              }
              this.saveLoader = false;
            }, error: (error: any) => {
              console.error(error);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
              this.saveLoader = false;
            }
          });
        }
      }
    }


  }
  gridRulesData: any;
  assignGridRules(data: any) {
    if (this.gridRulesData?.data.length > 0) {
      this.gridRules(this.gridRulesData, data);
    }
    else {
      this.applicationServices.getNestCommonAPIById('cp/GridBusinessRule', this.screenId).subscribe(((getRes: any) => {
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.gridRulesData = getRes;
            this.gridRules(getRes, data);
          }
        } else
          this.toastr.error(getRes.message, { nzDuration: 3000 });
      }));
    }
  }
  gridRules(getRes: any, data: any) {

    let gridFilter = getRes.data.filter((a: any) => a.gridType == 'Body');
    for (let m = 0; m < gridFilter.length; m++) {
      if (gridFilter[m].gridKey == data.key && data.tableData) {
        const objRuleData = JSON.parse(gridFilter[m].businessRuleData);
        for (let index = 0; index < objRuleData.length; index++) {
          // const elementv1 = objRuleData[index].ifRuleMain;
          const elementv1 = objRuleData[index];
          let checkType = Object.keys(data.tableData[0]).filter(a => a == elementv1.target);
          if (checkType.length == 0) {
            console.log("No obj Found!")
          }
          else {
            for (let j = 0; j < data.tableData.length; j++) {
              //query
              let query: any = '';
              objRuleData[index].ifRuleMain.forEach((element: any, ruleIndex: number) => {
                if (objRuleData[index].ifRuleMain.length > 1) {
                  if (element.oprator == 'NotNull') {
                    if (!query) {
                      query = " ( 1==1"
                    } else {
                      query += " ( 1==1"
                    }
                  }
                  else {
                    let firstValue = data.tableData[j][element.ifCondition] ? data.tableData[j][element.ifCondition] : "0";
                    let appendString = element.conditional.length > 0 ? " ( " : ' ';
                    if (ruleIndex == 0) {
                      query = appendString + firstValue + element.oprator + element.getValue
                    } else {
                      query += appendString + firstValue + element.oprator + element.getValue
                    }
                  }
                  for (let k = 0; k < element.conditional.length; k++) {
                    const conditionElement = element.conditional[k];
                    let check = data.tableData[j][conditionElement.condifCodition] ? data.tableData[j][conditionElement.condifCodition] : '0';
                    query += ' ' + conditionElement.condType + ' ' + check + conditionElement.condOperator + conditionElement.condValue;
                    if (k + 1 == element.conditional.length)
                      query += " ) " + element.condType
                  }
                }
                else {
                  if (element.oprator == 'NotNull')
                    query = "1==1"
                  else {
                    let firstValue = data.tableData[j][element.ifCondition] ? data.tableData[j][element.ifCondition] : "0";
                    query = firstValue + element.oprator + element.getValue
                  }
                  for (let k = 0; k < element.conditional.length; k++) {
                    const conditionElement = element.conditional[k];
                    let check = data.tableData[j][conditionElement.condifCodition] ? data.tableData[j][conditionElement.condifCodition] : '0';
                    query += ' ' + conditionElement.condType + ' ' + check + conditionElement.condOperator + conditionElement.condValue;
                  }
                }
              });
              let checkCondition = false;
              if (objRuleData[index].ifRuleMain.length > 1) {
                checkCondition = this.evaluateGridCondition(query)
              } else {
                checkCondition = this.evaluateGridConditionMain(query)
              }
              if (checkCondition) {
                for (let k = 0; k < elementv1.getRuleCondition.length; k++) {
                  const elementv2 = elementv1.getRuleCondition[k];
                  if (elementv1.getRuleCondition[k].referenceOperator != '') {
                    data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                    data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                  }
                  else {
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
            data.tableHeaders.forEach((element: any) => {
              if (element.key == checkType[0]) {
                element['gridHeaderSum'] = 0;
                const filteredData = this.filterTableData(elementv1, data)
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
                      data.tableHeaders.forEach((element: any) => {
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
            data.tableHeaders.forEach((element: any) => {
              if (element.key == checkType[0]) {
                element['gridFooterSum'] = 0;
                const filteredData = this.filterTableData(elementv1, data)
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
                      data.tableHeaders.forEach((element: any) => {
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
  evaluateGridConditionMain(condition: string): boolean {
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

    const logicalOperatorsRegex = /\s+(AND|OR)\s+/;
    const conditionParts = condition.split(logicalOperatorsRegex);

    const evaluateExpression = (expr: string): boolean => {
      const [leftOperand, operator, rightOperand] = expr.split(/(==|!=|>=|<=|=|>|<|null|contains)/).map(part => part.trim());

      if (!operators[operator]) {
        throw new Error(`Unknown operator: ${operator}`);
      }

      return operators[operator](leftOperand, rightOperand);
    };

    const evaluateCondition = (condition: string): boolean => {
      if (condition.includes("AND")) {
        const subConditions = condition.split(" AND ");
        return subConditions.every(subCondition => evaluateCondition(subCondition));
      } else if (condition.includes("OR")) {
        const subConditions = condition.split(" OR ");
        return subConditions.some(subCondition => evaluateCondition(subCondition));
      } else {
        return evaluateExpression(condition);
      }
    };

    return evaluateCondition(condition);
  }

  evaluateGridCondition(condition: any): boolean {
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

    const evaluateExpression = (expr: string): boolean => {
      if (!expr.includes(' false ') && !expr.includes(' true ')) {
        const [leftOperand, operator, rightOperand] = expr.trim().split(/(==|!=|>=|<=|=|>|<|null|contains)/).map(part => part.trim());

        let leftValue: any = leftOperand;
        if (leftOperand) {
          leftValue = leftOperand;
        } else if (leftOperand === 'null') {
          leftValue = null;
        }

        let rightValue: any = rightOperand;
        if (rightOperand) {
          rightValue = rightOperand;
        } else if (rightOperand === 'null') {
          rightValue = null;
        }

        if (!operators[operator]) {
          throw new Error(`Unknown operator: ${operator}`);
        }

        return operators[operator](leftValue, rightValue);
      }
      else {
        if (expr.includes(' false ')) {
          return false;
        } else {
          return true;
        }
      }



    };

    const processSubCondition = (subCondition: string): boolean => {
      const stack: string[] = [];
      let currentExpression = '';

      for (const char of subCondition) {
        if (char === '(') {
          if (currentExpression) {
            stack.push(currentExpression);
            currentExpression = '';
          }
          stack.push(char);
        } else if (char === ')') {
          if (currentExpression) {
            stack.push(currentExpression);
            currentExpression = '';
          }
          let innerExpression = '';
          while (stack.length > 0 && stack[stack.length - 1] !== '(') {
            innerExpression = stack.pop() + innerExpression;
          }
          stack.pop(); // Remove the opening parenthesis from the stack

          const innerResult = processSubCondition(innerExpression);
          stack.push(innerResult.toString());
        } else {
          currentExpression += char;
        }
      }

      if (currentExpression) {
        stack.push(currentExpression);
      }

      return evaluateCondition(stack.join(' '));
    };

    const evaluateCondition = (condition: any): boolean => {
      if (condition.includes("OR")) {
        const subConditions = condition.split(" OR ");
        return subConditions.some((subCondition: any) => processSubCondition(subCondition));
      } else if (condition.includes("AND")) {
        const subConditions = condition.split(" AND ");
        return subConditions.every((subCondition: any) => processSubCondition(subCondition));
      } else {
        return evaluateExpression(condition);
      }
    };

    return processSubCondition(condition);
  }










  // evaluateGridCondition(condition: any): boolean {
  //   const operators: { [key: string]: (a: any, b: any) => boolean } = {
  //     "==": (a: any, b: any) => a == b,
  //     "!=": (a: any, b: any) => a != b,
  //     ">=": (a: any, b: any) => a >= b,
  //     "<=": (a: any, b: any) => a <= b,
  //     "=": (a: any, b: any) => a === b,
  //     ">": (a: any, b: any) => a > b,
  //     "<": (a: any, b: any) => a < b,
  //     "null": (a: any, b: any) => a === null,
  //     "contains": (a: any, b: any) => a.includes(b),
  //   };

  //   const logicalOperatorsRegex = /\s+(AND|OR)\s+/;
  //   const conditionParts = condition.split(logicalOperatorsRegex);

  //   const evaluateExpression = (expr: string): boolean => {
  //     const [leftOperand, operator, rightOperand] = expr.split(/(==|!=|>=|<=|=|>|<|null|contains)/).map(part => part.trim());

  //     if (!operators[operator]) {
  //       throw new Error(`Unknown operator: ${operator}`);
  //     }

  //     return operators[operator](leftOperand, rightOperand);
  //   };

  //   condition = condition.trim().replace(/^\(|\)$/g, '');
  //   const evaluateCondition = (condition: any): boolean => {
  //     if (condition.includes("AND")) {
  //       const subConditions = condition.split(" AND ");
  //       return subConditions.every((subCondition: any) => evaluateCondition(subCondition));
  //     } else if (condition.includes("OR")) {
  //       const subConditions = condition.split(" OR ");
  //       return subConditions.some((subCondition: any) => evaluateCondition(subCondition));
  //     } else {
  //       return evaluateExpression(condition);
  //     }
  //   };

  //   return evaluateCondition(condition);
  // }
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
  filterTableData(elementv1: any, data: any) {
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
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.setInternalValuesEmpty(obj[key]);
      }
      // else if (Array.isArray(obj)) {
      //   obj = [];
      // }
      else {
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
    // this.joiValidation();
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
    let modelObj: any = [];
    this.ruleValidation = {};
    let filteredInputNodes = this.filterInputElements(this.sections.children[1].children);
    if (this.joiValidationData.length > 0) {
      for (let j = 0; j < filteredInputNodes.length; j++) {
        if (filteredInputNodes[j].formlyType != undefined) {
          let jsonScreenRes: any = this.joiValidationData.filter(a => a.key == filteredInputNodes[j].formly[0].fieldGroup[0].key);
          if (jsonScreenRes.length > 0) {
            if (jsonScreenRes[0].type === "text") {
              const { minlength, maxlength } = jsonScreenRes[0];
              const minLimit: any = typeof minlength !== 'undefined' ? minlength : 0;
              const maxLimit: any = typeof maxlength !== 'undefined' ? maxlength : 0;
              // this.ruleObj = {
              //   [jsonScreenRes[0].key]: Joi.string().min(parseInt(minLimit, 10)).max(parseInt(maxLimit, 10)),
              // };
              modelObj[jsonScreenRes[0].key] = this.formlyModel[jsonScreenRes[0].key];
              if (!minLimit && !maxLimit) {
                if (modelObj[jsonScreenRes[0].key] instanceof Date) {
                  this.ruleObj = {
                    [jsonScreenRes[0].key]: Joi.date().iso().required()
                  };
                } else if (typeof modelObj[jsonScreenRes[0].key] === 'string') {
                  this.ruleObj = {
                    [jsonScreenRes[0].key]: Joi.string().required()
                  };
                } else {
                  this.ruleObj = {
                    [jsonScreenRes[0].key]: Joi.any().required()
                  };
                }
              }
              else {
                this.ruleObj = {
                  [jsonScreenRes[0].key]: Joi.string().min(parseInt(minLimit, 10)).max(parseInt(maxLimit, 10)),
                };
              }
            }
            else if (jsonScreenRes[0].type === "number") {
              modelObj[jsonScreenRes[0].key] = this.formlyModel[jsonScreenRes[0].key];
              const { minlength, maxlength } = jsonScreenRes[0];
              const minLimit: any = typeof minlength !== 'undefined' ? minlength : 0;
              const maxLimit: any = typeof maxlength !== 'undefined' ? maxlength : 0;
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.number().integer().min(parseInt(minLimit, 10)).max(parseInt(maxLimit, 10)),
              };
            }
            else if (jsonScreenRes[0].type == "pattern") {
              modelObj[jsonScreenRes[0].key] = this.formlyModel[jsonScreenRes[0].key];
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.string().pattern(new RegExp(jsonScreenRes[0].pattern)),
              }
            }
            else if (jsonScreenRes[0].type == "reference") {
              modelObj[jsonScreenRes[0].key] = this.formlyModel[jsonScreenRes[0].key];
              modelObj[jsonScreenRes[0].reference] = this.formlyModel[jsonScreenRes[0].reference];
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.ref(typeof jsonScreenRes[0].reference !== 'undefined' ? jsonScreenRes[0].reference : ''),
              }
            }
            else if (jsonScreenRes[0].type == "email") {
              modelObj[jsonScreenRes[0].key] = this.formlyModel[jsonScreenRes[0].key];
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
      this.validationChecker(modelObj);

    }
    return true;
  }
  validationChecker(object: any) {
    let filteredNodes = this.filterInputElements(this.sections.children[1].children);
    filteredNodes.forEach((item: any) => {
      if (item.formly) {
        // item.formly[0].fieldGroup[0].props.error = null;
        if (item.formly[0].fieldGroup[0].props) {
          item.formly[0].fieldGroup[0].props['additionalProperties'].requiredMessage = null;
        }
      }
    });

    this.validationCheckStatus = [];
    const cc = this.schemaValidation.validate(Object.assign({}, object), { abortEarly: false });
    if (cc?.error) {
      this.setErrorToInput = JSON.parse(JSON.stringify(cc.error.details));
      filteredNodes.forEach((V2: any, index) => {
        const key = V2.formly[0].fieldGroup[0].key;
        const matchingError = this.setErrorToInput.find((error: any) => error.context.key === key);

        if (matchingError && V2.formly[0].fieldGroup[0].props) {
          const props = V2.formly[0].fieldGroup[0].props;
          props.additionalProperties.requiredMessage = matchingError.message.replace(matchingError.context.key, props.label);
          this.validationCheckStatus.push(props.additionalProperties.requiredMessage);
        }
      });

      if (this.validationCheckStatus.length > 0) {
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
  findObjectById(data: any, key: any) {
    if (data) {
      if (data.id && key) {
        if (data.id === key) {
          return data;
        }
        if (data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectById(child, key);
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }
    }
  }
  findObjectByKey(data: any, key: any) {
    if (data) {
      if (data.key && key) {
        if (data.key === key) {
          return data;
        }
        if (data.children && data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByKey(child, key);
            if (result !== null) {
              return result;
            }
          }
        }
      }
    }
    return null;
  }
  // ngOnDestroy() {
  //   this.requestSubscription.unsubscribe();
  // }
}
