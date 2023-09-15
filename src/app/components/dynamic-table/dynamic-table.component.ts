import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DataService } from 'src/app/services/offlineDb.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  @Input() itemData: any;
  @Input() tableId: any;
  @Input() form: any;
  @Input() checkType: boolean;
  @Input() configurationTable: boolean = false;
  @Input() tableData: any[] = [];
  @Input() excelReportData: any[] = [];
  @Input() displayData: any[] = [];
  @Input() tableHeaders: any = [];
  @Input() data: any;
  editId: string | null = null;
  @Input() screenName: any;
  @Input() showPagination: any = true;
  @Input() childTable: any = false;
  GridType: string = '';
  index: number;
  serverPath = environment.nestImageUrl
  screenNameaa: any;
  footerData: any[] = [];
  childKey: any;
  allChecked = false;
  indeterminate = false;
  saveLoader = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  @Input() screenId: any;
  @Input() formlyModel: any;
  storeRows: any = [];
  storeColums: any = [];
  responsiveTable: boolean = false;
  requestSubscription: Subscription;
  selectList = [
    { key: "Faizan", value: "Faizan" },
    { key: "Arfan", value: "Arfan" },
    { key: "Zubair", value: "Zubair" },
    { key: "Husnain", value: "Husnain" },
  ];
  editingEntry: any = null;
  pageSize: any;
  start = 1;
  end: any;
  groupingArray: any = [];
  groupingData: any = [];
  showChild: boolean = false;
  constructor(public _dataSharedService: DataSharedService, private builderService: BuilderService,
    private applicationService: ApplicationService,
    private dataService: DataService,
    private employeeService: EmployeeService, private toastr: NzMessageService, private cdr: ChangeDetectorRef,
    public dataSharedService: DataSharedService,
    private applicationServices: ApplicationService,
    private sanitizer: DomSanitizer
  ) {
    this.processData = this.processData.bind(this);
  }

  ngOnInit(): void {
    if (this.data?.eventActionconfig && !this.childTable && Object.keys(this.data.eventActionconfig).length > 0) {
      // The object is not empty, do something here
      this.saveLoader = true;
    }

    this.loadTableData();
    this.gridInitilize();
    this.getSaveGroupNodes();
    this.requestSubscription = this.dataSharedService.taskmanager.subscribe({
      next: (res) => {
        if (this.data.appConfigurableEvent && res) {
          let url = 'knex-query/getAction/' + this.data.eventActionconfig._id;
          this.saveLoader = true;
          this.applicationService.callApi(url, 'get', '', '', '').subscribe({
            next: (res) => {
              this.saveLoader = false;
              this.getFromQueryOnlyTable(this.data, res);
            },
            error: (error: any) => {
              console.error(error);
              this.saveLoader = false;
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          })
        }
      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }
    });

  }
  async getSaveGroupNodes() {
    const applicationId = localStorage.getItem('applicationId') || '';
    let groupedNodes = await this.dataService.getNodes(this.screenName, JSON.parse(applicationId), "Table");
    if (groupedNodes.length > 0) {
      this.groupingArray = groupedNodes[groupedNodes.length - 1].data;
    }
  }
  updateModel(data: any) {
    if (this.data.doubleClick != false) {
      const dynamicPropertyName = Object.keys(this.form.value)[0]; // Assuming the dynamic property name is the first property in this.form.value
      if (this.form.get(dynamicPropertyName)) {
        let newData: any = JSON.parse(JSON.stringify(data));
        for (const key in data) {
          const filteredData = this.tableHeaders.find((header: any) => header.key === key);

          if (filteredData && filteredData?.dataType === "multiselect") {
            newData[key] = newData[key]?.includes(',') ? newData[key].split(',') : ((newData[key] == undefined || newData[key] == '') ? [] : [newData[key]]);
          }
          else if (filteredData && filteredData?.dataType === "rangePicker") {
            newData[key] = newData[key]?.includes(',') ? newData[key].split(',') : ((newData[key] == undefined || newData[key] == '') ? [] : [newData[key]]);
          }
          else if (filteredData && filteredData?.dataType === "datetime-local") {
            newData[key] = newData[key] ? new Date(newData[key]) : ((newData[key] == undefined || newData[key] == '') ? [] : [newData[key]]);
          }
        }

        this.form.get(dynamicPropertyName)?.patchValue(newData);
      }
    }
  }
  onClickRow(api: string, item: any) {
    if (api) {
      this.builderService.genericApis(api).subscribe({
        next: (res: any) => {
          this.builderService.genericApisDeleteWithId(api, item.id).subscribe({
            next: (res: any) => {
              this.builderService.genericApisPost(api, item).subscribe({
                next: (res: any) => {
                  res;
                }
              });
            }
          });
        }
      });
      console.log(JSON.stringify(item));
    }
  }
  onClickColumn(api: string, item: any) {
    this.builderService.genericApisWithId(api, item.key).subscribe({
      next: (res: any) => {
        this.builderService.genericApisDeleteWithId(api, res[0].id).subscribe({
          next: (res: any) => {
            this.builderService.genericApisPost(api, item).subscribe({
              next: (res: any) => {
                res;
              }
            });
          }
        });
      }
    });
    console.log("Column Click " + name);
  }
  gridInitilize() {
    let getRes: any = {
      data: [
        {
          "_id": {
            "$oid": "649bce85e4823f1628e266c1"
          },
          "businessRule": [
            {
              "if": "id == 1",
              "then": [
                "id == (id-id)"
              ]
            }
          ],
          "businessRuleData": '[{"target":"status","opratorForTraget":"==","resultValue":"","ifRuleMain":[{"ifCondition":"status","oprator":"==","isGetValue":true,"getValue":"open","condType":"","conditional":[]}],"thenCondition":[],"getRuleCondition":[{"ifCondition":"status","oprator":"==","target":"status","referenceId":"","referenceOperator":"","referenceColor":"","referenceColumnColor":"#EF4444","condition":"","multiConditionList":[]}]},{"target":"status","opratorForTraget":"==","resultValue":"","ifRuleMain":[{"ifCondition":"status","oprator":"==","isGetValue":true,"getValue":"completed","condType":"","conditional":[]}],"thenCondition":[],"getRuleCondition":[{"ifCondition":"status","oprator":"==","target":"status","referenceId":"","referenceOperator":"","referenceColor":"","referenceColumnColor":"#EF4444","condition":"","multiConditionList":[]}]}]',
          "gridKey": "gridlist_5ef02c4b",
          "gridType": "Body",
          "screenName": "Card",
          "screenBuilderId": {
            "$oid": "64901e0007e01828b29b0146"
          },
          "__v": 0
        }
      ]
    };
    this.applyBusinessRule(getRes, this.data);
    this.loadTableData();
    if (this.screenId == 'taskmanager') {

    } else {
      if (this.screenId)
        this.applicationService.getNestCommonAPIById('cp/GridBusinessRule', this.screenId).subscribe(((getRes: any) => {
          if (getRes.isSuccess) {
            if (getRes.data.length > 0) {
              // this.formlyModel['input34d5985f']='1313'
              this.applyBusinessRule(getRes, this.data);
            }
            this.loadTableData();
          } else
            this.toastr.error(getRes.message, { nzDuration: 3000 });
        }));
    }

  }
  applyBusinessRule(getRes: any, data: any) {
    let gridFilter = getRes.data.filter((a: any) => a.gridType == 'Body');
    for (let m = 0; m < gridFilter.length; m++) {
      if (gridFilter[m].gridKey == data.key && data.tableData) {
        const objRuleData = JSON.parse(gridFilter[m].businessRuleData);
        for (let index = 0; index < objRuleData.length; index++) {
          if (data.tableData.length > 0) {
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
                      data.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColumnColor;
                    }
                    else {
                      if (k > 0) {
                        data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${data.tableData[j][elementv1.target]} ${elementv1.getRuleCondition[k - 1].referenceOperator} ${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                        data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                        data.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColor;
                      }
                      else
                        data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                      if (elementv1.getRuleCondition[k].referenceColumnColor) {
                        // data.tableHeaders.filter((check: any) => !check.hasOwnProperty('dataType'));
                        let head = data.tableHeaders.find((a: any) => a.name == elementv1.target)
                        if (head) {
                          head['dataType'] = 'objectType';
                          head['columnColor'] = elementv1.getRuleCondition[k].referenceColumnColor;
                        }
                      } else {
                        data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);

                      }
                    }
                    if (elementv2.multiConditionList.length > 0) {
                      for (let l = 0; l < elementv2.multiConditionList.length; l++) {
                        const elementv3 = elementv2.multiConditionList[l];
                        const value = data.tableData[j][elementv1.target];
                        data.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${value} ${elementv3.oprator} ${data.tableData[j][elementv3.target]}`);
                        this.data.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColumnColor;
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
                          this.data.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColumnColor;
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
  evaluateGridConditionOperator(condition: string): any {
    const operators: { [key: string]: (a: any, b: any) => any } = {
      "+": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a + b : null,
      "-": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a - b : null,
      "*": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a * b : null,
      "/": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a / b : null,
      "==": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a == b : null,
      "%": (a: any, b: any) => this.isNumeric(a) && this.isNumeric(b) ? a % b : null,
    };

    const parts = condition.split(/(\+|-|\*|\/|%|==)/).map(part => part.trim());
    const leftOperand = parts[0];
    const operator = parts[1];
    const rightOperand = parts[2];

    const leftValue = this.isNumeric(leftOperand) ? Number(leftOperand) : null;
    const rightValue = this.isNumeric(rightOperand) ? Number(rightOperand) : null;

    return operators[operator](leftValue, rightValue);
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
  columnName: any;
  isHeaderVisible = false;
  // addColumn(): void {
  //   this.isVisible = true;
  // };
  // handleOk(): void {
  addColumn(): void {
    const id = this.tableData.length - 1;
    const newRow = JSON.parse(JSON.stringify(this.tableData[0]));
    newRow["id"] = this.tableData[id].id + 1;
    this.tableData.push(newRow);
    this.displayData = [...this.tableData];
    // if (this.tableData.length > 0) {
    //   const firstObjectKeys = Object.keys(this.tableData[0]);
    //   for (let index = 0; index < firstObjectKeys.length; index++) {
    //     const element = firstObjectKeys[index];
    //     if (element.toLocaleLowerCase() == this.columnName.toLocaleLowerCase())
    //       return alert('this Column is already Exsist')
    //   }
    //   this.tableHeaders.push(
    //     {
    //       name: this.columnName,
    //       sortOrder: null,
    //       // sortFn: "(a, b) => a.name.localeCompare(b.name)",
    //       sortDirections: [
    //         "ascend",
    //         "descend",
    //         null
    //       ],
    //       "filterMultiple": true
    //     });
    //   for (let j = 0; j < this.data.tableData.length; j++) {
    //     this.data.tableData[j][this.columnName.charAt(0).toLowerCase() + this.columnName.slice(1)] = 0;
    //   }
    //   this.loadTableData();
    //   this.columnName = null;
    // }
    // this.isVisible = false;
  }

  addRow(): void {
    const id = this.displayData.length - 1;
    if (id == -1) {
      let row = {
        id: 1, name: '',
      }
      this.displayData = [...this.tableData, row];
    }
    else {
      const newRow = JSON.parse(JSON.stringify(this.tableData[0]));
      newRow["id"] = this.tableData[id].id + 1;
      delete newRow?._id;
      delete newRow?.__v;
      this.tableData.unshift(newRow);
      this.displayData = [...this.tableData];
      if (!this.pageSize)
        this.pageSize = this.data.end;
      this.updateDisplayData();
    }
  };
  deleteRow(data: any): void {
    delete data.children;
    delete data.expand;
    const model = {
      screenId: this.screenName,
      postType: 'delete',
      modalData: data
    };
    if (this.screenName != undefined) {
      if (this.data?.appConfigurableEvent) {
        let findClickApi = this.data?.appConfigurableEvent?.filter((item: any) => item.actionLink === 'delete' && (item.actionType == 'api' || item.actionType == 'query'));
        let id = '';
        if (findClickApi?.length > 0) {
          if (findClickApi[0]?.httpAddress.includes('EnumList')) {
            id = data?._id
          } else
            id = data?.id
        } else
          id = data?.id
        let url = '';
        if (findClickApi[0]?.actionType == 'api') {
          url = findClickApi[0]?.httpAddress;
          if (url) {
            this.saveLoader = true;
            this.requestSubscription = this.employeeService.deleteCommonApi(url, id).subscribe({
              next: (res) => {
                this.saveLoader = false;
                if (res) {

                  this.pageChange(1);
                  this.toastr.success("Delete Successfully", { nzDuration: 3000 });
                }
              },
              error: (err) => {
                this.saveLoader = false;
                console.error(err);
              }
            })
          }

        }
        else if (findClickApi[0]?.actionType == 'query') {
          url = 'knex-query/executeQuery/' + findClickApi[0]._id;
          if (url) {
            this.requestSubscription = this.employeeService.saveSQLDatabaseTable(url, model).subscribe({
              next: (res) => {
                if (res) {
                  this.tableData = this.tableData.filter((d: any) => d.id !== data.id);
                  this.displayData = this.displayData.filter((d: any) => d.id !== data.id);
                  this.excelReportData = this.excelReportData.filter((d: any) => d.id !== data.id);
                  this.pageChange(1);
                  this.toastr.success("Delete Successfully", { nzDuration: 3000 });
                }
              },
              error: (err) => {
                console.error(err);
              }
            })
          }
        }

      }
      else {
        this.requestSubscription = this.employeeService.saveSQLDatabaseTable('knex-query/executeQuery', model).subscribe({
          next: (res) => {
            this.tableData = this.tableData.filter((d: any) => d.id !== data.id);
            this.displayData = this.displayData.filter((d: any) => d.id !== data.id);
            this.pageChange(1);
            this.toastr.success("Delete Successfully", { nzDuration: 3000 });
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
      }
    }
    else {
      this.pageSize = 10;
      const indexToRemove = this.tableData.findIndex((d: any) => d.id === data.id);

      if (indexToRemove !== -1) {
        this.tableData.splice(indexToRemove, 1);
      }
      // this.tableData = this.tableData.filter((d: any) => d.id !== data.id);
      // this.tableData = JSON.parse(JSON.stringify(updatedData));
      // this.tableData = [...this.displayData]
      this.displayData = [...this.tableData];
      this.pageChange(1);
      this.toastr.success("Delete from userend successfully", { nzDuration: 3000 });
    }
  };

  startEdit(id: string): void {
    this.editId = id;
  }
  stopEdit(): void {
    this.editId = null;
  }

  loadTableData() {
    if (this.tableData.length > 0) {
      if (this.tableData[0].__v || this.tableData[0]._id) {
        const requiredData = this.tableData.map(({ __v, _id, ...rest }: any) => ({
          expand: false,
          id: _id,
          ...rest,
        }));
        this.tableData = JSON.parse(JSON.stringify(requiredData));
      }
      let newId = 0;
      if (!this.tableData[0].id) {
        let newId = 0;
        this.tableData = this.tableData.map((j: any) => {
          newId++;
          return {
            id: newId,
            ...j,
          };
        });
      }
      if (!this.data['tableKey'] || this.data['tableKey']?.length == 0) {
        const firstObjectKeys = Object.keys(this.tableData[0]);
        this.data['tableKey'] = firstObjectKeys.map(key => ({ key: key }));
      }
      this.data['tableKey'] = this.data['tableKey'].filter((header: any) => header.name !== 'color');
      this.data['tableKey'] = this.data['tableKey'].filter((header: any) => header.name !== 'children');
      this.footerData = this.tableHeaders;
      if (!this.tableHeaders || !this.footerData) {
        this.tableHeaders = this.data['tableKey'];
        this.footerData = this.data['tableKey'];
      }
      if (!this.tableData.some((a: any) => a.children)) {
        this.tableHeaders = this.tableHeaders.filter((head: any) => head.name !== 'expand');
      }

      this.displayData = this.tableData;
    }
    if (!this.data) {
      const newNode = {
        nzFooter: "",
        nzTitle: "",
        nzPaginationPosition: "bottom",
        nzPaginationType: "default",
        nzLoading: false,
        nzFrontPagination: true,
        start: 1,
        end: 10,
        nzShowPagination: true,
        nzBordered: true,
        showColumnHeader: true,
        noResult: false,
        nzSimple: false,
        nzSize: 'default',
        nzShowSizeChanger: false,
        showCheckbox: false,
        expandable: false,
        fixHeader: false,
        rowClickApi: true,
        tableScroll: false,
        fixedColumn: false,
        sort: true,
        filter: true,
      }
      this.data = newNode;
    }
  }
  handleCancel(): void {
    this.isHeaderVisible = false;
  }
  showModal(type: any): void {
    this.GridType = type;
    this.isHeaderVisible = true;
  }
  handleOk(): void {
    this.isHeaderVisible = false;
  }
  getSumOfRow(data: any) {
    if (data.sum) {
      if (this.tableData.some((item: any) => item.hasOwnProperty(data.key.toLowerCase()))) {
        const sum = this.tableData.reduce((acc: any, curr: any) => {
          acc += curr[data.key.toLowerCase()];
          return acc;
        }, 0);
        return sum;
      } else {
        return '';
      }
      return 0
    }
    else {
      return '';
    }
  }
  getHeader() {
    if (this.tableData) {
      const firstObjectKeys = Object.keys(this.tableData[0]);
      this.data['tableKey'] = firstObjectKeys.map(key => ({ name: key }));
      this.data['tableKey'] = this.data['tableKey'].filter((header: any) => header.name !== 'color');
    }
  }
  getChildrenData() {
    const childKeys = this.tableData.reduce((acc: any, obj: any) => {
      if (obj.children) {
        obj.children.forEach((child: any) => {
          Object.keys(child).forEach(key => {
            if (!acc.includes(key)) {
              acc.push(key);
            }
          });
        });
      }
      return acc;
    }, []);
    return childKeys;
  }
  save() {
    this._dataSharedService.setData(this.tableData);
    if (this.data.doubleClick == false)
      this._dataSharedService.saveGridData(this.tableData);
    this.toastr.success('Data saved successfully', { nzDuration: 3000 });
  }

  checkAll(value: boolean): void {
    this.tableData.forEach((data: any) => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.tableData.filter((value: any) => !value.disabled);
    const allChecked = validData.length > 0 && validData.every((value: any) => value.checked === true);
    const allUnChecked = validData.every((value: any) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }
  getChildKeys(obj: any): any {
    const keys: any = {};
    const firstObjectKeys = Object.keys(obj);
    keys.parent = firstObjectKeys.map(key => ({ name: key }));
    if (obj.children) {
      keys.children = this.getChildKeys(obj.children[0])
    }
    return keys;
  }

  getParentChildrenKeys(data: any[]): any[] {
    const result: any[] = [];
    if (data.length > 0) {
      const keys = this.getChildKeys(data[0]);
      result.push(keys);
    };
    return result;
  }

  isMyDataArray(data: any): boolean {
    return Array.isArray(data);
  }
  isEditing(entry: any): boolean {
    return this.editingEntry === entry;
  }

  editValue(entry: any): void {
    this.editingEntry = entry;
  }

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
  onPageIndexChange(index: number): void {
    if (this.tableHeaders.length == 0) {
      const firstObjectKeys = Object.keys(this.tableData[0]);
      this.data['tableKey'] = firstObjectKeys.map(key => ({ name: key }));
      this.data['tableKey'] = this.data['tableKey'].filter((header: any) => header.name !== 'color');
      this.data['tableKey'] = this.data['tableKey'].filter((header: any) => header.name !== 'children');
      this.tableHeaders = this.data['tableKey'];
      this.footerData = this.tableHeaders;
    }
    // this.displayData = this.tableData;
    if (this.data.serverSidePagination) {
      if (this.data?.targetId) {
        const pagination = '?page=' + index + '&pageSize=' + this.data?.end;
        this.pageSize = this.data.end
        this.applicationService.getNestCommonAPIById(this.data?.serverApi + pagination, this.data?.targetId).subscribe(response => {
          if (response.isSuccess) {
            this.tableData = [];
            this.displayData = [];
            response.data?.forEach((element: any) => {
              element.id = (element?.id)?.toString();
              this.tableData?.push(element);
            });
            this.updateGridPagination();
          }
        })
      }
      else {
        const pagination = '?page=' + index + '&pageSize=' + this.data?.end;
        this.pageSize = this.data.end
        this.employeeService.getSQLDatabaseTable(this.data?.serverApi + pagination).subscribe(response => {
          if (response.isSuccess) {
            this.tableData = [];
            this.displayData = [];
            response.data.forEach((element: any) => {
              element.id = (element?.id)?.toString();
              this.tableData?.push(element);
            });
            this.displayData = this.tableData;
            this.updateGridPagination();
          }

        })
      }
    }
    else {
      this.pageChange(index);
    }
  }
  pageChange(index: number) {
    this.data.pageIndex = index;
    if (!this.pageSize)
      this.pageSize = this.data.end;
    this.updateDisplayData();
  }
  updateDisplayData(): void {
    const start = (this.data.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.start = start == 0 ? 1 : ((this.data.pageIndex * this.pageSize) - this.pageSize) + 1;
    this.displayData = this.tableData.slice(start, end);
    this.end = this.displayData.length != this.data.end ? this.tableData.length : this.data.pageIndex * this.pageSize;
    this.data.totalCount = this.tableData.length;
  }
  updateGridPagination() {
    const start = (this.data.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.start = start == 0 ? 1 : ((this.data.pageIndex * this.pageSize) - this.pageSize) + 1;
    this.end = this.displayData.length == this.data.end ? (this.data.pageIndex * this.data.end) : this.data.totalCount;
    // this.data.totalCount = this.tableData.length;
  }
  select(rowIndex: number, value: any) {
    // this.tableData[rowIndex].defaultValue = value.type;
    // Perform any additional updates to 'listOfData' if needed
  }
  checkTypeData(item: any, header: any) {
    debugger
    let checkAllowClick = this.tableHeaders.find((head: any) => head.key == header.key)
    if (checkAllowClick) {
      if (checkAllowClick?.callApi != '' && checkAllowClick?.callApi != null) {
        this.showChild = false;
        if (this.data?.openComponent == 'drawer') {
          const drawer = this.findObjectByTypeBase(this.data, "drawer");
          drawer['visible'] = true;
          if (drawer?.eventActionconfig) {
            let newData: any = JSON.parse(JSON.stringify(item));
            const dataTitle = this.data.title ? this.data.title + '.' : '';
            newData['parentid'] = newData.id;
            const userData = JSON.parse(localStorage.getItem('user')!);
            newData.id = '';
            newData['organizationid'] = JSON.parse(localStorage.getItem('organizationId')!) || '';
            newData['applicationid'] = JSON.parse(localStorage.getItem('applicationId')!) || '';
            newData['createdby'] = userData.username;
            // newData.datetime = new Date();

            for (const key in newData) {
              if (Object.prototype.hasOwnProperty.call(newData, key)) {
                if (newData[key] == null) {
                  this.formlyModel[dataTitle + key] = '';
                } else {
                  this.formlyModel[dataTitle + key] = newData[key];
                }
                for (const obj of [this.formlyModel, /* other objects here */]) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    obj[key] = newData[key];
                  }
                }
              }
            }
            drawer.eventActionconfig['parentId'] = item.id;
          }
          this.data = JSON.parse(JSON.stringify(this.data));
          this.showChild = true;
        }
      }
    }
  }
  transform(dateRange: string): any {
    if (dateRange) {
      if (dateRange.includes('GMT+0500') && dateRange) {
        // Split the date range by ","
        const dateParts = dateRange.split(',');

        if (dateParts.length >= 2) {
          // Extract the start and end date parts
          const startDate = dateParts[0].trim();
          const endDate = dateParts[1].trim();

          // Format the start and end dates
          const formattedStartDate = this.formatDate(startDate);
          const formattedEndDate = this.formatDate(endDate);

          // Return the formatted date range
          return `${formattedStartDate} - ${formattedEndDate}`;
        } else {
          // If there are not enough parts, return the original date range
          return dateRange;
        }
      }
      return null;
    }
    return null;
  }

  private formatDate(dateString: string): any {
    const date = new Date(dateString);
    return new DatePipe('en-US').transform(date, 'EEE MMM dd yyyy HH:mm:ss');
  }
  tasks: any = [];
  editObj: any = {};
  Object = Object;
  chartData: any[] = [];
  issueReport: any = [];
  userTaskManagement: any = '';
  getTimelIne: any;
  showIssue(data: any): void {
    this.saveLoader = true;
    if (this.data?.appConfigurableEvent) {
      if (this.data?.appConfigurableEvent.length > 0) {
        if (!data?.children) {
          data.children = [];
          const url = this.data?.appConfigurableEvent
            .filter((item: any) => item.actions.some((action: any) => action.submit === 'change'))
            .map((item: any) => item.actions.find((action: any) => action.submit === 'change').url);
          // Create a URL object
          const parsedURL = new URL(url);

          // Extract the pathname
          let path = parsedURL.pathname;

          // Remove the leading slash if it exists
          if (path.startsWith("/")) {
            path = path.substring(1);
          }
          this.requestSubscription = this.applicationService.getNestCommonAPI(path + data.screenId).subscribe({
            next: (res: any) => {
              debugger
              this.saveLoader = false;
              this.issueReport['issueReport'] = '';
              this.issueReport['showAllComments'] = false;
              if (res.isSuccess && res.data.length > 0) {
                const filteredIssues = res.data.filter((rep: any) => rep.componentId === data.componentId);
                const requiredData = filteredIssues.map(({ __v, _id, ...rest }: any) => ({
                  expand: false,
                  id: _id,
                  // expandable: true,
                  ...rest,
                }));

                data.children = requiredData;
                // if (filteredIssues.length > 0) {
                //   try {
                //     const drawer = this.findObjectByTypeBase(this.data, "drawer");
                //     drawer['visible'] = true;
                //     drawer['notShowButton'] = true;

                //     const timeline = this.findObjectByTypeBase(drawer, "timeline");
                //     const timelineChild = this.findObjectByTypeBase(timeline, "timelineChild");
                //     const newChild = JSON.parse(JSON.stringify(timelineChild));
                //     const childTimelineData = this.findObjectByTypeBase(newChild, "timeline");
                //     const timelineChildChild = this.findObjectByTypeBase(childTimelineData, "timelineChild");
                //     const timelineChildChildParse = JSON.parse(JSON.stringify(timelineChildChild));
                //     timeline.children = [];


                //     for (const issue of filteredIssues) {
                //       const paragragh = this.findAllObjectsByType(newChild, "paragraph");
                //       paragragh[0].text = issue.createdBy
                //       paragragh[1].text = issue.dateTime;
                //       paragragh[2].text = issue.message

                //       newChild.children = [];
                //       newChild.children.push(paragragh[0]);
                //       newChild.children.push(paragragh[1]);
                //       newChild.children.push(paragragh[2]);



                //       if (issue.children.length > 0 && timelineChildChildParse) {

                //         timelineChildChild.children = [];
                //         childTimelineData.children = [];
                //         for (const childIssue of issue.children) {
                //           const childParagragh = this.findAllObjectsByType(newChild, "paragraph");
                //           childParagragh[0].text = childIssue.createdBy
                //           childParagragh[1].text = childIssue.dateTime;
                //           childParagragh[2].text = childIssue.message

                //           timelineChildChildParse.children = [];
                //           timelineChildChildParse.children.push(paragragh[0]);
                //           timelineChildChildParse.children.push(paragragh[1]);
                //           timelineChildChildParse.children.push(paragragh[2]);
                //           childTimelineData?.children.push(JSON.parse(JSON.stringify(timelineChildChildParse)));
                //         }
                //         newChild?.children.push(JSON.parse(JSON.stringify(childTimelineData)));
                //       }
                //       timeline?.children.push(JSON.parse(JSON.stringify(newChild)));
                //     }

                //     // Update other properties as needed
                //     // this.userTaskManagement = data;
                //     // this.issueReport['status'] = data['status'];
                //     // this.issueReport['showAllComments'] = true;
                //     // this.issueReport['issueReport'] = filteredIssues;
                //     // this.issueReport['id'] = filteredIssues[0].componentId;
                //     // this.callAssignee(this.issueReport);
                //   } catch (error) {
                //     console.error("An error occurred:", error);
                //     this.toastr.error(`An error occurred`, { nzDuration: 3000 });
                //   }


                // } else {
                //   this.saveLoader = false;
                //   this.toastr.error(`UserComment: No comments against this`, { nzDuration: 3000 });
                // }
              }


            },
            error: (err) => {
              this.issueReport['issueReport'] = '';
              this.issueReport['showAllComments'] = false;
              console.error(err); // Log the error to the console
              this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
            }
          });
        }
        else {
          console.log("Data");
          console.log("Data");
          const requiredData = data.children.map(({ __v, _id, ...rest }: any) => {
            if (rest.children) {
              const childData = rest.children;
              delete rest.children;
              return {
                id: _id,
                ...rest,
                children: childData.length > 0 ? childData : undefined,
              };
            } else {
              // If the 'children' property doesn't exist, return the object without it
              return {
                id: _id,
                ...rest,
              };
            }
          });
          data.children = requiredData;
        }
      }
    }
  }
  getTasks() {
    this.saveLoader = true;
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/getuserCommentsCurrentMonth/UserComment').subscribe({
      next: (res: any) => {
        this.saveLoader = false;
        if (res.isSuccess && res.data?.length > 0) {
          this.tasks = res.data.filter((a: any) => a.parentId == '' || a.parentId == undefined);
          let groupedData = this.tasks;
          this.tasks = groupedData;
          let newData = JSON.parse(JSON.stringify(groupedData));
          this.chartData = this.groupDataByStatus(newData)
        }
      },
      error: (err) => {
        this.saveLoader = false;
        console.error(err); // Log the error to the console
        this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
      }
    });
  }
  assignToresponse: any = '';
  callAssignee(data: any) {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/UserAssignTask', data.id).subscribe({
      next: (res: any) => {
        if (res) {
          if (res.data.length > 0) {
            this.assignToresponse = res.data[0];
            data['dueDate'] = res.data[0]['dueDate'];
            data['assignTo'] = res.data[0]['assignTo'];
            data['startDate'] = res.data[0]['startDate'];
            data['endDate'] = res.data[0]['endDate'];
            data['tags'] = res.data[0]['tags'];
            // this.toastr.success(`UserAssignTask : ${res.message}`, { nzDuration: 3000 });
          } else {
            data['dueDate'] = new Date();
            data['dueDate'] = data['dueDate'].toISOString().split('T')[0];
          }
        }
      }, error: (err: any) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserAssignTask : An error occurred`, { nzDuration: 3000 });
      }
    })
  }
  updateIssues(updateData: any) {
    if (updateData) {
      this.getTasks();
    }
  }
  groupDataByStatus(data: any[]): any[] {
    return data.map((weekData) => {
      const statusGroups: { [status: string]: any[] } = {
        open: [],
        completed: [],
        inProgress: [],
        closed: [],
      };

      weekData.issues.forEach((issue: any) => {
        const status = issue.status;

        // Push the issue to the corresponding status array
        if (status in statusGroups) {
          statusGroups[status].push(issue);
        }
      });

      return {
        week: weekData.week,
        issues: statusGroups,
        weekStartDate: weekData.weekStartDate,
        weekEndDate: weekData.weekEndDate,
      };
    });
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
  findAllObjectsByType(data: any, type: any): any[] {
    const foundObjects: any[] = [];

    function searchForType(node: any) {
      if (node) {
        if (node.type && node.type === type) {
          foundObjects.push(node);
        }
        if (node.children && node.children.length > 0) {
          for (const child of node.children) {
            searchForType(child);
          }
        }
      }
    }

    searchForType(data);
    return foundObjects;
  }
  groupedFunc(data: any, type: any, header: any, allowSaveInLocal?: any) {
    header['grouping'] = type === 'add' ? data : '';


    if (this.groupingData.length == 0) {
      this.groupingData = this.tableData
    }
    if (type === 'add') {
      if (this.groupingArray.some((group: any) => group === data)) {
        return; // Data is already grouped, no need to proceed
      }
    }

    if (type === 'add') {
      this.groupingArray.push(data);
    }
    else if (type === 'remove') {
      const indexToRemove = this.groupingArray.indexOf(data);
      if (indexToRemove !== -1) {
        this.groupingArray.splice(indexToRemove, 1); // Remove 1 element at the specified index
      }
    }

    if (this.groupingArray.length === 0) {
      this.displayData = this.groupingData;
      this.tableData = JSON.parse(JSON.stringify(this.groupingData));
      this.groupingData = [];
      this.tableHeaders = this.tableHeaders.filter((a: any) => a.name !== 'expand');
      this.data.tableHeaders = this.data.tableHeaders.filter((a: any) => a.name !== 'expand');
      this.pageChange(1);
    } else {
      // Reset displayData and tableHeaders before re-grouping
      this.displayData = [];
      this.tableHeaders = this.tableHeaders.filter((a: any) => a.name !== 'expand');
      this.data.tableHeaders = this.data.tableHeaders.filter((a: any) => a.name !== 'expand');

      // Apply grouping for each column in the groupingArray
      this.tableData = this.groupData(this.groupingData, 0);
      this.pageChange(1);
    }
    if (allowSaveInLocal) {
      const applicationId = localStorage.getItem('applicationId') || '';
      this.dataService.addData(this.screenName, JSON.parse(applicationId), "Table", this.groupingArray);
    }

  }

  groupData(data: any[], index: number): any {
    if (index < this.groupingArray.length) {
      const groupColumn = this.groupingArray[index];

      if (index === 0) {
        // Group the data by the specified column
        const groupedData = this.groupByColumn(data, groupColumn, index);

        // Update the displayData and tableHeaders for the current level
        this.tableData = this.tableData.concat(groupedData);
        this.tableHeaders.unshift({
          name: 'expand',
          key: 'expand',
          title: 'Expand',
        });
        this.data.tableHeaders.unshift({
          name: 'expand',
          key: 'expand',
          title: 'Expand',
        });
        // Continue grouping for the next column
        return this.groupData(groupedData, index + 1);
      }
      else {
        data.forEach((update: any) => {
          if (update.children) {
            const groupedChildren = this.groupByColumn(update.children, groupColumn, index);
            update.children = groupedChildren; // Update children with grouped data
            // Recursively apply grouping to children
            this.groupData(update.children, index + 1);
          }
        });
      }
    }

    return data; // Return the grouped data when all columns are processed
  }

  groupByColumn(data: any, columnName: string, index: number) {
    const groupedData: any = {};
    data.forEach((element: any) => {
      const groupValue = element[columnName];
      const parentValue = this.groupingArray[index - 1]; // Previous grouping value

      if (!groupedData[parentValue]) {
        groupedData[parentValue] = [];
      }

      if (!groupedData[parentValue][groupValue]) {
        groupedData[parentValue][groupValue] = {
          expand: false,
          children: [],
        };
      }

      const group = groupedData[parentValue][groupValue];
      group.children.push(element);
      group.expand = false;

      // If it's the first level of grouping, add the parent value
      if (index === 0) {
        group['parent'] = parentValue;
      }
    });
    const result = Object.keys(groupedData).map((parentKey: string) => {
      const parentGroup = groupedData[parentKey];
      return Object.keys(parentGroup).map((groupKey: string) => {
        const groupData = parentGroup[groupKey];
        const secondObj = groupData.children[0];
        const firstObj = JSON.parse(JSON.stringify(groupData));
        for (const key in secondObj) {
          if (secondObj.hasOwnProperty(key)) {
            // Check if the property does not exist in the first object
            if (!firstObj.hasOwnProperty(key)) {
              // Assign the property from the second object to the first object
              firstObj[key] = secondObj[key];
            }
          }
        }
        return firstObj;
      });
    }).flat(); // Flatten the nested arrays

    return result;
  }

  processData(data: any[]) {
    this.saveLoader = false;
    if (data.length > 0) {
      let res: any = {};
      res['data'] = [];
      res['data'] = data;
      this.getFromQueryOnlyTable(this.data, res)
    }
    return data

  }
  async getFromQueryOnlyTable(tableData: any, res: any) {
    debugger
    if (tableData && res?.data.length > 0) {
      const applicationId = localStorage.getItem('applicationId') || '';
      let savedGroupData: any = [];
      if (applicationId) {
        savedGroupData = await this.dataService.getNodes(JSON.parse(applicationId), this.screenName, "Table");
      }
      this.saveLoader = false;
      this.tableData = res.data.map((element: any) => ({ ...element, id: element.id?.toString() }));
      this.excelReportData = [...this.tableData];
      if (!this.data.end) {
        tableData.end = 10;
      }
      this.data.pageIndex = 1;
      this.data.totalCount = res.data.length;
      if (tableData.eventActionconfig) {
        if (tableData.eventActionconfig.actionType == 'query') {
          tableData.serverApi = `knex-query/getAction/${tableData.eventActionconfig._id}`;
        } else if (tableData.eventActionconfig.actionType == 'api') {
          tableData.serverApi = tableData.eventActionconfig.httpAddress;
        }
      }
      this.data.targetId = '';
      this.displayData = this.tableData.length > this.data.end ? this.tableData.slice(0, this.data.end) : this.tableData;
      if (this.tableHeaders.length === 0) {
        this.tableHeaders = Object.keys(this.tableData[0] || {}).map(key => ({ name: key, key: key }));
        this.data['tableKey'] = this.tableHeaders;
      }
      else {
        const tableKey = Object.keys(this.tableData[0] || {}).map(key => ({ name: key }));
        if (JSON.stringify(this.data['tableKey']) !== JSON.stringify(tableKey)) {
          const updatedData = tableKey.filter(updatedItem =>
            !this.tableHeaders.some((headerItem: any) => headerItem.key === updatedItem.name)
          );
          if (updatedData.length > 0) {
            updatedData.forEach(updatedItem => {
              this.tableHeaders.push({ id: tableData.tableHeaders.length + 1, key: updatedItem.name, name: updatedItem.name, });
            });
            this.data.tableHeaders = this.tableHeaders;
          }
        }

      }
      let CheckKey = this.tableHeaders.find((head: any) => !head.key)
      if (CheckKey) {
        for (let i = 0; i < this.tableHeaders.length; i++) {
          if (!this.tableHeaders[i].hasOwnProperty('key')) {
            this.tableHeaders[i].key = tableData.tableHeaders[i].name;
          }
        }
      }
      if (savedGroupData.length > 0) {
        let getData = savedGroupData[savedGroupData.length - 1];
        if (getData.data.length > 0) {
          let updateTableData: any = [];
          getData.data.forEach((elem: any) => {
            let findData = this.tableHeaders.find((item: any) => item.key == elem);
            if (findData) {
              updateTableData = this.groupedFunc(elem, 'add', findData, false);
            }
          })
          this.tableData = updateTableData;
          this.displayData = this.tableData.length > this.data.end ? this.tableData.slice(0, this.data.end) : this.tableData;
          tableData.tableHeaders.unshift({
            name: 'expand',
            key: 'expand',
            title: 'Expand',
          });
          this.data.totalCount = this.tableData
        }
        else {
          this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand')
        }
      }
      else {
        //if data is not stored in index db then remove expand column
        this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand')
      }
      this.data['tableKey'] = this.tableHeaders;
      this.data['tableHeaders'] = this.tableHeaders;
    }
    // this.loadTableData();
  }
  isAllowEdit(header: any): boolean {
    let check = header.some((head: any) => head?.editMode != '' && head?.editMode != null);
    return check;
  }
  saveEdit(dataModel: any) {
    const findClickApi = this.data.appConfigurableEvent.find((item: any) =>
      item.actionLink === 'put' && (item.actionType === 'api' || item.actionType === 'query')
    );

    if (findClickApi) {
      const { actionType, httpAddress, _id } = findClickApi;

      if (dataModel) {
        delete dataModel.children
        const model = {
          screenId: this.screenName,
          postType: 'put',
          modalData: dataModel
        };

        let url = actionType === 'api' ? httpAddress : actionType === 'query' ? `knex-query/executeQuery/${_id}` : '';
        if (url) {
          this.saveLoader = true;
          this.applicationServices.addNestCommonAPI(url, model).subscribe({
            next: (res) => {
              if (res) {
                this.toastr.success('Update Successfully', { nzDuration: 3000 });
                this.editId = null;
                // let callget = this.data?.appConfigurableEvent?.filter((item: any) =>
                //   (item.actionLink === 'get' && (item.actionType === 'api' || item.actionType === 'query'))
                // );
                // if (callget) {
                //   if (callget.length > 0) {
                //     let getUrl = '';
                //     for (let index = 0; index < callget.length; index++) {
                //       let element = callget[index].actionType;
                //       if (element == 'query') {
                //         getUrl = `knex-query/getAction/${callget[index]._id}`;
                //         break;
                //       } else {
                //         getUrl = `knex-query/getAction/${callget[index]._id}`;
                //       }
                //     }
                //     let pagination = '';
                //     if (this.data.serverSidePagination) {
                //       pagination = '?page=' + 1 + '&pageSize=' + this.data?.end;
                //     }
                //     this.employeeService.getSQLDatabaseTable(getUrl + pagination).subscribe({
                //       next: async (res) => {
                //         if (res) {
                //           this.getFromQueryOnlyTable(this.data, res)
                //         }
                //       }, error: (error: any) => {
                //         console.error(error);
                //         this.toastr.error("An error occurred", { nzDuration: 3000 });
                //         this.saveLoader = false;
                //       }
                //     });
                //   }
                // }
              }
              // this.getFromQueryOnlyTable(data);
              this.saveLoader = false;
            },
            error: (err) => {
              console.error(err);
              this.toastr.error('An error occurred', { nzDuration: 3000 });
              this.saveLoader = false;
            }
          });
        }
      }
    }
  }
  exportToExcel() {
    debugger
    let header = this.tableHeaders.filter((head: any) => head.key != 'expand')
    const dataToExport = [header
      .map((header: any) => header.name)
    ];

    // Add data rows
    this.excelReportData.forEach(item => {
      const rowData = header.map((data: any) => item[data.key]);
      dataToExport.push(rowData);
    });

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'grid-data.xlsx');
  }

  rowselected(i: number) {
    this.index = i;
  }
}
