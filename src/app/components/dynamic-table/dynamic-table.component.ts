import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, HostListener
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { parse } from 'path';
import { Subscription } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DataService } from 'src/app/services/offlineDb.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { QrCodeComponent } from '../qr-code/qr-code.component';
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
  index: any;
  serverPath = environment.nestBaseUrl
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
  drawerChild: any[] = [];
  nodes: any = [];
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
  searchValue: any = '';
  progress = 0;
  showProgressBar = false;
  fileUpload: any = '';
  visible: boolean = false;
  checklink: any = '';
  filteringArrayData: any[] = [];
  localStorageGrouping: any[] = [];
  filteringHeadArray: any = [];
  nzScrollConfig: { x: string } = { x: '1100px' };
  rotationDegree: number = -45;
  editData: any;
  deleteditWidth: any = [{ label: 'Edit', Width: '' }, { label: 'Delete', Width: '' }, { label: 'Checkbox', Width: '' }
  ]
  borderColor = '#3b82f6';
  backgroundColor = 'red';
  boxShadow = '0px 7px 16px rgba(0, 0, 0, 0.14)';
  borderRadius = '8px';
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Update the nzScroll configuration based on screen size
    this.updateScrollConfig();
  }
  constructor(public _dataSharedService: DataSharedService, private builderService: BuilderService,
    private applicationService: ApplicationService,
    private dataService: DataService,
    private employeeService: EmployeeService, private toastr: NzMessageService, private cdr: ChangeDetectorRef,
    public dataSharedService: DataSharedService,
    private applicationServices: ApplicationService,
    private sanitizer: DomSanitizer, private router: Router, private http: HttpClient,
    private modal: NzModalService
  ) {
    this.processData = this.processData.bind(this);
  }
  userDetails: any;
  ngOnInit(): void {
    if (this.data) {
      document.documentElement.style.setProperty('--paginationColor', this.data?.paginationColor || '#2563EB');

    }
    this.userDetails = JSON.parse(localStorage.getItem('user')!)

    this.updateRotationDegree(50); // Rotate to -60 degrees

    this.updateScrollConfig();
    if (!this.childTable) {
      // this.search(this.data?.searchType ? 'keyup' : 'keyup')
    }
    if (this.data?.eventActionconfig && !this.childTable && Object.keys(this.data.eventActionconfig).length > 0) {
      // The object is not empty, do something here
      this.saveLoader = true;
    }
    this.loadTableData();
    // this.gridInitilize();
    this.getSaveGroupNodes();
    this.requestSubscription = this.dataSharedService.taskmanager.subscribe({
      next: (res) => {
        if (this.data.appConfigurableEvent && res) {
          let url = 'knex-query/getAction/' + this.data.eventActionconfig._id;
          this.saveLoader = true;
          this.requestSubscription = this.applicationService.callApi(url, 'get', '', '', '').subscribe({
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
    if (this.data?.formType == 'newTab' && this.data?.routeUrl && data.id) {
      if (this.data?.routeUrl.includes('pages')) {
        this.router.navigate([this.data?.routeUrl + '/' + data.id]);
      } else {
        this.router.navigate(['/pages/' + this.data?.routeUrl + '/' + data.id]);
      }
    }
    else if (this.data.doubleClick != false) {
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
        let makeModel = JSON.parse(JSON.stringify(this.formlyModel));

        if (this.formlyModel) {
          for (const key in this.formlyModel) {
            if (this.formlyModel.hasOwnProperty(key)) {
              if (typeof this.formlyModel[key] === 'object') {
                for (const key1 in this.formlyModel[key]) {
                  if (newData[key1])
                    makeModel[key][key1] = newData[key1]
                }
              }
              else {
                if (newData[key.split('.')[1]])
                  makeModel[key] = newData[key.split('.')[1]];
              }
            }
          }
        }
        this.formlyModel = makeModel;
        this.form.patchValue(this.formlyModel);
        this.form.get(dynamicPropertyName)?.patchValue(this.formlyModel);
        this.cdr.detach;
        this.cdr.detectChanges;
      }
    }
  }
  onClickRow(api: string, item: any) {
    if (api) {
      this.requestSubscription = this.builderService.genericApis(api).subscribe({
        next: (res: any) => {
          this.requestSubscription = this.builderService.genericApisDeleteWithId(api, item.id).subscribe({
            next: (res: any) => {
              this.requestSubscription = this.builderService.genericApisPost(api, item).subscribe({
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
    this.requestSubscription = this.builderService.genericApisWithId(api, item.key).subscribe({
      next: (res: any) => {
        this.requestSubscription = this.builderService.genericApisDeleteWithId(api, res[0].id).subscribe({
          next: (res: any) => {
            this.requestSubscription = this.builderService.genericApisPost(api, item).subscribe({
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
    // this.applyBusinessRule(getRes, this.data);
    // this.loadTableData();
    if (this.screenId)
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/GridBusinessRule', this.screenId).subscribe(((getRes: any) => {
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            // this.formlyModel['input34d5985f']='1313'
            this.applyBusinessRule(getRes, this.data);
          }
          this.pageChange(1);
          // this.loadTableData();
        } else
          this.toastr.error(getRes.message, { nzDuration: 3000 });
      }));

  }
  applyBusinessRule(getRes: any, data: any) {
    let gridFilter = getRes.data.filter((a: any) => a.gridType == 'Body');
    for (let m = 0; m < gridFilter.length; m++) {
      if (gridFilter[m].gridKey == data.key && this.tableData) {
        const objRuleData = JSON.parse(gridFilter[m].businessRuleData);
        for (let index = 0; index < objRuleData.length; index++) {
          if (this.tableData.length > 0) {
            // const elementv1 = objRuleData[index].ifRuleMain;
            const elementv1 = objRuleData[index];
            let checkType = Object.keys(this.tableData[0]).filter(a => a == elementv1.target);
            if (checkType.length == 0) {
              console.log("No obj Found!")
            }
            else {
              for (let j = 0; j < this.tableData.length; j++) {
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
                      let firstValue = this.tableData[j][element.ifCondition] ? this.tableData[j][element.ifCondition] : "0";
                      let appendString = element.conditional.length > 0 ? " ( " : ' ';
                      if (ruleIndex == 0) {
                        query = appendString + firstValue + element.oprator + element.getValue
                      } else {
                        query += appendString + firstValue + element.oprator + element.getValue
                      }
                    }
                    for (let k = 0; k < element.conditional.length; k++) {
                      const conditionElement = element.conditional[k];
                      let check = this.tableData[j][conditionElement.condifCodition] ? this.tableData[j][conditionElement.condifCodition] : '0';
                      query += ' ' + conditionElement.condType + ' ' + check + conditionElement.condOperator + conditionElement.condValue;
                      if (k + 1 == element.conditional.length)
                        query += " ) " + element.condType
                    }
                  }
                  else {
                    if (element.oprator == 'NotNull')
                      query = "1==1"
                    else {
                      let firstValue = this.tableData[j][element.ifCondition] ? this.tableData[j][element.ifCondition] : "0";
                      query = firstValue + element.oprator + element.getValue
                    }
                    for (let k = 0; k < element.conditional.length; k++) {
                      const conditionElement = element.conditional[k];
                      let check = this.tableData[j][conditionElement.condifCodition] ? this.tableData[j][conditionElement.condifCodition] : '0';
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
                      if (this.tableData[j][elementv2.ifCondition])
                        this.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${this.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${this.tableData[j][elementv2.target]}`);
                      // if (elementv1.getRuleCondition[k].referenceColor)
                      this.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                      this.tableData[j]['textColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                      // if (elementv1.getRuleCondition[k].referenceColumnColor) {
                      this.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColor;
                      this.tableData[j]['columnTextColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                      this.tableData[j]['colorDataType'] = this.tableData[j][elementv1.target];
                      // }
                    }
                    else {
                      if (k > 0) {
                        if (this.tableData[j][elementv2.ifCondition])
                          this.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${this.tableData[j][elementv1.target]} ${elementv1.getRuleCondition[k - 1].referenceOperator} ${this.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${this.tableData[j][elementv2.target]}`);
                        // if (elementv1.getRuleCondition[k].referenceColor)
                        this.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                        this.tableData[j]['textColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                        // if (elementv1.getRuleCondition[k].referenceColor) {
                        this.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColor;
                        this.tableData[j]['columnTextColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                        this.tableData[j]['colorDataType'] = this.tableData[j][elementv1.target];
                        // }
                      }
                      else
                        // if (elementv1.getRuleCondition[k].referenceColor)
                        this.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                      this.tableData[j]['textColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                      this.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColor;
                      this.tableData[j]['columnTextColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                      this.tableData[j]['colorDataType'] = this.tableData[j][elementv1.target];
                      if (elementv1.getRuleCondition[k].referenceColumnColor) {
                        // data.tableHeaders.filter((check: any) => !check.hasOwnProperty('dataType'));
                        let head = data.tableHeaders.find((a: any) => a.name == elementv1.target)
                        if (head) {
                          this.tableData[j]['colorDataType'] = this.tableData[j][elementv1.target];
                          head['dataType'] = 'objectType';
                          head['columnColor'] = elementv1.getRuleCondition[k].referenceColor;
                          head['columnTextColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                        }
                      }
                      else {
                        if (this.tableData[j][elementv2.ifCondition])
                          this.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${this.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${this.tableData[j][elementv2.target]}`);

                      }
                    }
                    if (elementv2.multiConditionList.length > 0) {
                      for (let l = 0; l < elementv2.multiConditionList.length; l++) {
                        const elementv3 = elementv2.multiConditionList[l];
                        const value = this.tableData[j][elementv1.target];
                        this.tableData[j][elementv1.target] = this.evaluateGridConditionOperator(`${value} ${elementv3.oprator} ${this.tableData[j][elementv3.target]}`);
                        // if (elementv1.getRuleCondition[k].referenceColumnColor) {
                        this.tableData[j]['columnTextColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                        this.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColor;
                        this.tableData[j]['colorDataType'] = this.tableData[j][elementv1.target];
                        // }
                      }
                    }
                  }
                  for (let k = 0; k < elementv1.thenCondition.length; k++) {
                    const elementv2 = elementv1.thenCondition[k];
                    for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                      const elementv3 = elementv2.getRuleCondition[l];
                      this.tableData[j][elementv2.thenTarget] = this.evaluateGridConditionOperator(`${this.tableData[j][elementv3.ifCondition]} ${elementv3.oprator} ${this.tableData[j][elementv3.target]}`);
                      if (elementv3.multiConditionList.length > 0) {
                        for (let m = 0; m < elementv3.multiConditionList.length; m++) {
                          const elementv4 = elementv3.multiConditionList[m];
                          const value = this.tableData[j][elementv2.thenTarget];
                          this.tableData[j][elementv2.thenTarget] = this.evaluateGridConditionOperator(`${value} ${elementv4.oprator} ${this.tableData[j][elementv4.target]}`);
                          // if (elementv1.getRuleCondition[k].referenceColumnColor) {
                          this.tableData[j]['columnColor'] = elementv1.getRuleCondition[k].referenceColor;
                          this.tableData[j]['columnTextColor'] = elementv1.getRuleCondition[k].referenceTextColor;
                          this.tableData[j]['colorDataType'] = this.tableData[j][elementv1.target];
                          // }
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
      if (headerFilter[m].gridKey == data.key && this.tableData) {
        for (let index = 0; index < headerFilter[m].businessRuleData.length; index++) {
          const elementv1 = headerFilter[m].businessRuleData[index];
          let checkType = Object.keys(this.tableData[0]).filter(a => a == elementv1.target);
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
                    let checkType = Object.keys(this.tableData[0]).filter(a => a == elementv3.ifCondition);
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
      if (footerFilter[m].gridKey == data.key && this.tableData) {
        for (let index = 0; index < footerFilter[m].businessRuleData.length; index++) {
          const elementv1 = footerFilter[m].businessRuleData[index];
          let checkType = Object.keys(this.tableData[0]).filter(a => a == elementv1.target);
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
                    let checkType = Object.keys(this.tableData[0]).filter(a => a == elementv3.ifCondition);
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
      if (this.tableData.length == 0) {
        this.tableData = [...this.displayData]
      }
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
    
    const checkPermission = this.dataSharedService.getUserPolicyMenuList.find(a => a.screenId == this.dataSharedService.currentMenuLink);
    if (!checkPermission?.delete && this.dataSharedService.currentMenuLink != '/ourbuilder') {
      alert("You did not have permission");
      return;
    }
    delete data.children;
    delete data.expand;
    const model = {
      screenId: this.screenName,
      postType: 'delete',
      modalData: data
    };
    if (this.screenName != undefined) {
      if (this.data?.appConfigurableEvent && this.data?.appConfigurableEvent?.length > 0) {
        // Find the 'delete' event in appConfigurableEvent
        const findClickApi = this.data.appConfigurableEvent.filter((item: any) => item.rule.includes('delete'));
        const id = findClickApi?.[0]?.rule.includes('EnumList') ? data?._id : data?.id;

        if (findClickApi.length > 0) {
          const url = findClickApi[0].actionType === 'api' ? findClickApi[0].rule : `knex-query/executeDelete-rules/${findClickApi[0]._id}`;

          if (url) {
            this.saveLoader = true;
            const requestObservable = findClickApi[0].actionType === 'api' ?
              this.employeeService.deleteCommonApi(url, id) :
              this.employeeService.saveSQLDatabaseTable(url, model);

            this.requestSubscription = requestObservable.subscribe({
              next: (res) => {
                this.saveLoader = false;
                if (res.isSuccess) {
                  // Data successfully deleted
                  this.handleDataDeletion(data);
                  this.toastr.success("Delete Successfully", { nzDuration: 3000 });
                } else {
                  // Data not updated
                  this.toastr.warning("Data is not updated", { nzDuration: 3000 });
                }
              },
              error: (err) => {
                this.saveLoader = false;
                this.toastr.error(`An error occurred ${err}`, { nzDuration: 3000 });
              }
            });
          }
        }
      } else {
        // Handle the case where appConfigurableEvent is not defined
        this.handleDataDeletion(data);
      }
    }
    else {
      this.handleDataDeletion(data);
      this.toastr.success("Delete from userend successfully", { nzDuration: 3000 });
    }
  };

  async startEdit(data: any): Promise<void> {
    this.editId = data.id;
    let newData = JSON.parse(JSON.stringify(data))
    this.editData = newData;
    try {
      const filteredHeaders = this.tableHeaders.filter((item: any) => item.dataType === 'repeatSection' && item.callApi);
      if (filteredHeaders && filteredHeaders.length > 0) {
        for (const header of filteredHeaders) {
          if (!this.displayData.some(item => item.hasOwnProperty(header.key + '_list'))) {
            try {
              this.dataSharedService.pagesLoader.next(true);
              const res = await this.applicationService.getNestCommonAPI(header?.callApi).toPromise();
              this.dataSharedService.pagesLoader.next(false);
              if (res.data?.length > 0) {
                const propertyNames = Object.keys(res.data[0]);
                const result = res.data.map((item: any) => {
                  const newObj: any = {};
                  const propertiesToGet: string[] = ('id' in item && 'name' in item) ? ['id', 'name'] : Object.keys(item).slice(0, 2);
                  propertiesToGet.forEach((prop) => {
                    newObj[prop] = item[prop];
                  });
                  return newObj;
                });

                const finalObj = result.map((item: any) => ({
                  label: item.name || item[propertyNames[1]],
                  value: item.name || item[propertyNames[1]],
                }));
                this.makeOptions(this.displayData, header.key + '_list', finalObj);
                let newData = this.displayData.find((a: any) => a.id == data.id)
                this.editData = { ...newData };
              }
            } catch (err) {
              this.dataSharedService.pagesLoader.next(false);
              console.error(err); // Log the error to the console
              this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
            }
          }
        }
      } else {
      }
    } catch (error) {
      console.error("An error occurred in try-catch:", error);
      // Handle the error appropriately, e.g., show an error message to the user.
    }
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
        this.requestSubscription = this.applicationService.getNestCommonAPIById(this.data?.serverApi + pagination, this.data?.targetId).subscribe(response => {
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
        this.requestSubscription = this.employeeService.getSQLDatabaseTable(this.data?.serverApi + pagination).subscribe(response => {
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
      this.pageSize = this.data.end ? this.data.end : this.tableData.length;
    this.updateDisplayData();
  }
  updateDisplayData(): void {
    const start = (this.data.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.start = start === 0 ? 1 : (this.data.pageIndex * this.pageSize) - this.pageSize + 1;
    this.displayData = this.tableData.slice(start, end);
    this.end = this.displayData.length !== this.data.end ? this.tableData.length : this.data.pageIndex * this.pageSize;

    this.data.totalCount = this.tableData.length;

    // Updating this.tableData directly without creating a new reference
    // this.tableData = JSON.parse(JSON.stringify(this.tableData)); // Avoid reassigning if not necessary
    // this.displayData = JSON.parse(JSON.stringify(this.displayData)); // Avoid reassigning if not necessary

    // Trigger change detection by marking for check and applying change detection
    this.cdr.markForCheck();
    this.cdr.detectChanges();
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
    
    if (header?.callApi != '' && header?.callApi != null && (header?.dataType != 'repeatSection' || header?.dataType == '' || header?.dataType == undefined)) {
      this.showChild = false;
      if (this.data?.openComponent == 'drawer') {
        this.editId = null;
        this.dataSharedService.taskmanagerDrawer.next(false);
        const drawer = this.findObjectByTypeBase(this.data, "drawer");
        if (drawer?.eventActionconfig) {
          let newData: any = JSON.parse(JSON.stringify(item));
          const dataTitle = this.data.title ? this.data.title + '.' : '';
          newData['parentid'] = newData.id;
          const userData = JSON.parse(localStorage.getItem('user')!);
          newData.id = '';
          newData['organizationid'] = JSON.parse(localStorage.getItem('organizationId')!) || '';
          newData['applicationid'] = JSON.parse(localStorage.getItem('applicationId')!) || '';
          newData['createdby'] = userData.username;
          // Get the current date and time
          const currentDate = new Date();

          // Format the date and time as "YYYY-MM-DD HH:mm:ss.sss"
          const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}.${currentDate.getMilliseconds().toString().padStart(3, '0')}`;

          // Now, you can save 'formattedDate' in your SQL database
          newData.datetime = formattedDate;


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
        if (window.location.href.includes('/pages')) {
          if (this.drawerChild.length == 0 && drawer.children.length > 0) {
            this.drawerChild = JSON.parse(JSON.stringify(drawer.children))
          }
          drawer.children = JSON.parse(JSON.stringify(this.drawerChild));

          if (window.location.href.includes('/pages')) {
            this.data = JSON.parse(JSON.stringify(this.data));
          }
        }

        this.showChild = true;
        drawer['visible'] = true;
      }
    }
    else if (this.configurationTable) {
      this.startEdit(item)
    }
  }
  openQrCode(data: any) {
    const modal =
      this.modal.create<QrCodeComponent>({
        nzTitle: 'Qr Code Scan',
        nzWidth: '250px',
        nzContent: QrCodeComponent,
        nzComponentParams: {
          model: data,
        },
        // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
        nzFooter: [],
      });
    // const instance = modal.getContentComponent();
    modal.afterClose.subscribe((res) => {
      if (res) {

      }
    });
  }
  loadApiData() {
    if (this.data.appConfigurableEvent) {
      this.saveLoader = true;
      this.requestSubscription = this.applicationService.callApi(`knex-query/getexecute-rules/${this.data.eventActionconfig._id}`, 'get', '', '', '').subscribe({
        next: (res) => {
          // this.saveLoader = false;
          this.getFromQueryOnlyTable(this.data, res);
        },
        error: (error: any) => {
          console.error(error);
          this.saveLoader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
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
    this.saveLoader = true;
    header['grouping'] = type === 'add' ? data : '';

    try {
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
      this.saveLoader = false;
    } catch (error) {
      // Handle the error here, you can log it or display an error message
      console.error('An error occurred in groupedFunc:', error);
    } finally {
      this.saveLoader = false;
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
    if (data) {
      if (data.length > 0) {
        let res: any = {};
        res['data'] = [];
        res['data'] = data;

        this.getFromQueryOnlyTable(this.data, res)
      } else {
        this.saveLoader = false;
      }
    } else {
      this.saveLoader = false;
    }
    return data
  }
  async getFromQueryOnlyTable(tableData: any, res: any) {
    try {
      ;
      if (tableData && res?.data.length > 0) {
        this.data['searchValue'] = '';
        const applicationId = localStorage.getItem('applicationId') || '';
        let savedGroupData: any = [];
        if (applicationId) {
          savedGroupData = await this.dataService.getNodes(JSON.parse(applicationId), this.screenName, "Table");
        }
        if (this.data?.eventActionconfig && !this.childTable && Object.keys(this.data.eventActionconfig).length > 0) {
          if (window.location.href.includes('marketplace.com')) {
            res.data = res.data.map((item: any) => ({
              id: item._id, // Rename _id to id
              name: item.name,
              categoryId: item.categoryId,
              categoryName: item.categoryDetails?.[0]?.name, // Access the name property from categoryDetails
              subcategoryId: item.subcategoryId,
              subcategoryName: item.subcategoryDetails?.[0]?.name, // Access the name property from subcategoryDetails
              thumbnailimage: item.thumbnailimage,
              // ...rest
            }));
          }
        }

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
            tableData.serverApi = tableData.eventActionconfig.rule;
          }
        }
        this.data.targetId = '';

        this.displayData = this.tableData.length > this.data.end ? this.tableData.slice(0, this.data.end) : this.tableData;
        if (this.tableHeaders.length === 0) {
          this.tableHeaders = Object.keys(this.tableData[0] || {}).map(key => ({ name: key, key: key }));
          this.data['tableKey'] = this.tableHeaders;
        } else {
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
                this.groupedFunc(elem, 'add', findData, false);
              }
            })
            this.displayData = this.tableData.length > this.data.end ? this.tableData.slice(0, this.data.end) : this.tableData;
            tableData.tableHeaders.unshift({
              name: 'expand',
              key: 'expand',
              title: 'Expand',
            });
            this.data.totalCount = this.tableData
          } else {
            this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand');
            this.pageChange(1);
          }
        } else {
          this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand');
          this.pageChange(1);
        }
        this.data['tableKey'] = this.tableHeaders;
        this.data['tableHeaders'] = this.tableHeaders;
        const resizingData = localStorage.getItem(this.screenId);
        if (resizingData) {
          const parseResizingData = JSON.parse(resizingData);
          this.tableHeaders.forEach((element1: any) => {
            const matchingElement = parseResizingData.find((element: any) => element.key === element1.key);
            if (matchingElement) {
              element1.width = matchingElement.width;
            }
          });
        }
        this.tableHeaders.forEach((head: any) => {
          head['isFilterdSortedColumn'] = false
        });
      }
      this.saveLoader = false;
      this.gridInitilize();
    }
    catch (error) {
      this.toastr.error('An error occurred in load table data', { nzDuration: 3000 });
      console.error("An error occurred in getFromQueryOnlyTable:", error);
      // Handle the error appropriately, e.g., show an error message to the user.
      this.saveLoader = false;
    }
  }

  isAllowEdit(header: any): boolean {
    let check = header.some((head: any) => head?.editMode != '' && head?.editMode != null);
    return check;
  }
  saveEdit(dataModel: any) {
    let newDataModel = JSON.parse(JSON.stringify(dataModel))
    let findClickApi = this.data?.appConfigurableEvent?.filter((item: any) => item.rule.includes('put'));
    const checkPermission = this.dataSharedService.getUserPolicyMenuList.find(a => a.screenId == this.dataSharedService.currentMenuLink);
    if (!checkPermission?.update && this.dataSharedService.currentMenuLink != '/ourbuilder') {
      alert("You did not have permission");
      return;
    }

    if (findClickApi) {
      if (JSON.stringify(dataModel) != JSON.stringify(this.editData)) {
        if (newDataModel) {
          for (let key in newDataModel) {
            if (newDataModel[key] && Array.isArray(newDataModel[key])) {
              delete newDataModel[key];
            } else if (newDataModel[key] == null) {
              newDataModel[key] = ''
            }
            else if (newDataModel[key] == 'null') {
              newDataModel[key] = ''
            }
          }

          delete newDataModel.children
          const model = {
            screenId: this.screenName,
            postType: 'put',
            modalData: newDataModel
          };

          let url = findClickApi[0]?._id ? `knex-query/executeDelete-rules/${findClickApi[0]?._id}` : '';
          if (url) {
            this.saveLoader = true;
            this.requestSubscription = this.applicationServices.addNestCommonAPI(url, model).subscribe({
              next: (res) => {
                if (res.isSuccess && res.data.length > 0) {
                  this.toastr.success('Update Successfully', { nzDuration: 3000 });
                  this.editId = null;
                  this.editData = null;
                }
                else {
                  this.cancelEdit(dataModel);
                  this.toastr.warning(res.message, { nzDuration: 3000 });
                }
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
      } else {
        this.toastr.warning('Please change the data for update', { nzDuration: 3000 });
      }
    }
    else {
      this.toastr.warning('There is no rule against this', { nzDuration: 3000 });
    }
  }
  exportToExcel() {
    let header = this.tableHeaders.filter((head: any) => head.key != 'expand')
    const dataToExport = [header
      .map((header: any) => header.name)
    ];

    // Add data rows
    let newData = this.filteringArrayData.length > 0 ? [...this.filteringArrayData] : [...this.excelReportData]
    newData.forEach(item => {
      const rowData = header.map((data: any) => item[data.key]);
      dataToExport.push(rowData);
    });

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    const customFilename = this.data.title + '.xlsx';
    XLSX.writeFile(wb, customFilename);
  }

  rowselected(i: number) {
    if (this.data?.rowSelected != false) {
      this.index = i;
    } else {
      this.index = null;
    }
  }

  makeOptions(data: any, key: any, value: any) {
    data.forEach((element: any) => {
      element[key] = value;
      if (data.children) {
        if (data.children.length > 0) {
          this.makeOptions(data.children, key, value)
        }
      }
    });
  }

  async search(searchType: any) {
    if (this.data?.searchType ? searchType == this.data?.searchType : 'keyup' == searchType) {
      try {
        
        this.saveLoader = true;
        const applicationId = localStorage.getItem('applicationId') || '';
        let savedGroupData: any = [];
        if (applicationId) {
          savedGroupData = await this.dataService.getNodes(JSON.parse(applicationId), this.screenName, "Table");
        }
        // Step 1: Remove the 'expand' header from tableHeaders
        this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand');

        if (this.data?.searchValue) {
          const searchValue = this.data?.searchValue.toLowerCase();

          // Step 2: Use a more efficient approach for filtering the Excel report data
          if (!this.filteringArrayData || this.filteringArrayData.length === 0) {
            this.filteringArrayData = this.excelReportData;
          }

          this.tableData = this.filteringArrayData.filter((item) =>
            this.tableHeaders.some((header: any) => {
              const key = header.key;
              const itemValue = item[key]?.toString().toLowerCase();
              return itemValue && itemValue.includes(searchValue);
            })
          );



          this.groupingData = [];
        }
        else {
          this.tableData = !this.filteringArrayData || this.filteringArrayData.length === 0 ? this.excelReportData : this.filteringArrayData;
          this.displayData = !this.filteringArrayData || this.filteringArrayData.length === 0 ? this.excelReportData : this.filteringArrayData;;
          this.groupingData = [];

        }
        if (savedGroupData.length > 0) {
          let getData = savedGroupData[savedGroupData.length - 1];

          if (getData.data.length > 0) {
            let updateTableData: any = [];
            this.groupingArray = [];
            getData.data.forEach((elem: any) => {
              let findData = this.tableHeaders.find((item: any) => item.key == elem);

              if (findData) {
                this.groupedFunc(elem, 'add', findData, false);
              }
            });

            this.displayData = this.tableData.length > this.data.end ? this.tableData.slice(0, this.data.end) : this.tableData;
            this.data.tableHeaders.unshift({
              name: 'expand',
              key: 'expand',
              title: 'Expand',
            });

            this.data.totalCount = this.tableData;
          } else {
            this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand');
            this.displayData = this.tableData;
            this.pageChange(1);
          }
        }
        else {
          this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand');
          this.displayData = this.tableData;
          this.pageChange(1);
        }

        this.saveLoader = false;
      }
      catch (error) {
        console.error("An error occurred in search:", error);
        // Handle the error appropriately, e.g., show an error message to the user.
        this.saveLoader = false;
      }
    }
  }
  ngOnDestroy() {
    if (this.requestSubscription)
      this.requestSubscription.unsubscribe();
  }
  onFileSelected(event: any): void {
    if (this.data.appConfigurableEvent) {
      let findClickApi = this.data?.appConfigurableEvent?.find((item: any) => item.rule.includes('fileupload'));
      if (!findClickApi) {
        this.toastr.error('Action Required for upload data in bulk', { nzDuration: 2000 });
        return;
      }

      const file: File = event.target.files[0];
      if (file) {
        this.showProgressBar = true;
        this.progress = 0; // Initialize progress to 0

        const formData: FormData = new FormData();
        formData.append('file', file);
        this.requestSubscription = this.http
          .post(this.serverPath + 'knex-query/savecsv/' + findClickApi?._id, formData, {
            reportProgress: true, // Enable progress reporting
            observe: 'events', // Observe Http events
          })
          .subscribe({
            next: (event: HttpEvent<any>) => {
              if (event.type === HttpEventType.UploadProgress) {
                if (event.total !== undefined && event.total > 0) {
                  // Ensure 'event.total' is defined and positive before using it
                  this.progress = Math.round((100 * event.loaded) / event.total);
                }
              } else if (event.type === HttpEventType.Response) {
                // Upload complete
                this.progress = 100;
                this.showProgressBar = false;
                // this.toastr.success('Import successfully', { nzDuration: 3000 });
                this.fileUpload = ''; // This clears the file input
                if (event.body.isSuccess) {
                  if (this.data.appConfigurableEvent) {
                    let url = 'knex-query/getexecute-rules/' + this.data.eventActionconfig._id;
                    this.saveLoader = true;
                    this.requestSubscription = this.applicationService.callApi(url, 'get', '', '', '').subscribe({
                      next: (res) => {
                        this.getFromQueryOnlyTable(this.data, res);
                      },
                      error: (error: any) => {
                        console.error(error);
                        this.saveLoader = false;
                        this.toastr.error("An error occurred", { nzDuration: 3000 });
                      }
                    })
                  }
                  this.toastr.success('Import successfully', { nzDuration: 3000 });
                } else {
                  this.toastr.error(event.body.error, { nzDuration: 2000 });
                }
              }
            },
            error: (err) => {
              // Handle error
              this.showProgressBar = false;
              this.toastr.error('Some error occurred', { nzDuration: 2000 });
            },
          });
      }
    }
    // if (!this.data?.tableName) {
    //   this.toastr.error('Required Impot table name', { nzDuration: 2000 });
    //   return
    // }

  }


  split(index: any, data: any) {

    if (data) {
      if (typeof data == 'string') {
        return data.split(',')[index];
      } else {
        return ''
      }
    } else {
      return ''
    }

  }

  showDeleteConfirm(rowData: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Row?',
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzClassName: 'deleteRow',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteRow(rowData),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  open(): void {
    this.visible = true;
    if (this.data?.drawerScreenLink) {
      this.saveLoader = true;
      if (this.checklink) {
        if (this.checklink == this.data?.drawerScreenLink) {
          this.saveLoader = false;
          return
        }
      }
      this.checklink = this.data?.drawerScreenLink;
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', this.data?.drawerScreenLink).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.screenId = res.data[0].screenBuilderId;
              this.nodes.push(res);
            }
          }
          this.saveLoader = false;
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.saveLoader = false;
        }
      });
    }
  }

  close(): void {
    this.visible = false;
  }
  makeFilterData(header: any, allowPrevious: boolean) {
    header['searchValue'] = '';
    const filterData: any = {};
    if (this.filteringArrayData.length == 0) {
      this.filteringArrayData = this.excelReportData;
    }
    // Loop through the input array to collect unique status values
    for (const item of this.excelReportData) {
      const key = header?.key; // The key to filter by
      const text = item[key]; // The text/value of the filter
      if (!filterData[key]) {
        filterData[key] = [];
      }
      // Check if the text/value is not already in the filter data
      if (!filterData[key].some((filterItem: any) => filterItem.text === text)) {
        filterData[key].push({ key, text, value: text, filter: false });
      }
    }

    // Now filterData['status'] contains the unique filter data for 'status'
    if (header['filterArray'] && header?.filterArray?.length > 0 && allowPrevious) {
      let result: any[] = [];
      filterData[header?.key].forEach((element: any) => {
        let fonudObj: any = ''
        fonudObj = header['filterArray'].find((item: any) => item.value == element.value);
        if (fonudObj) {
          result.push(fonudObj);
        } else {
          result.push(element)
        }

      });
      header['filterArray'] = [...result]
      header['filterSearch'] = [...result]

    } else {
      header['filterArray'] = filterData[header?.key];
      header['filterSearch'] = filterData[header?.key];
    }
  }
  async filter(item: any, add: boolean) {
    item['visible'] = false;
    this.filteringArrayData = this.excelReportData;


    // Update the filteringHeadArray
    this.filteringHeadArray = this.filteringHeadArray.filter((filterHead: any) => filterHead.key !== item.key);
    if (add) {
      let checkFilter = item?.filterArray.find((a: any) => a.filter);
      if (checkFilter) {
        this.filteringHeadArray.push(item);
      }
    } else {
      if (item?.filterArray) {
        delete item?.filterArray;
      }
    }

    if (this.filteringHeadArray.length > 0) {
      // Create an array of filtered values for each filter header
      const filteredValuesMap = new Map<string, Set<string>>();

      this.filteringHeadArray.forEach((element1: any) => {
        const filteredValues = new Set<string>(
          element1?.filterArray.filter((filterItem: any) => filterItem.filter).map((filterItem: any) => filterItem.value)
        );
        filteredValuesMap.set(element1.key, filteredValues);
      });

      // Filter the data based on all filter headers
      const filteredData = this.filteringArrayData.filter((dataItem: any) => {
        return this.filteringHeadArray.every((filterHead: any) => {
          const filteredValues = filteredValuesMap.get(filterHead.key) ?? new Set<string>();
          return filteredValues.has(dataItem[filterHead.key]);
        });
      });

      // Assign the filtered data to this.displayData and this.tableData
      this.filteringArrayData = filteredData;
      this.displayData = filteredData;
      this.tableData = filteredData;
    }
    else {
      this.displayData = this.excelReportData;
      this.tableData = this.excelReportData;
      this.filteringArrayData = [];
    }
    this.groupingData = [];
    if (this.data?.searchValue) {
      this.search(this.data?.searchType ? this.data?.searchType : 'keyup')
    }
    else {
      const applicationId = localStorage.getItem('applicationId') || '';
      let savedGroupData: any = [];
      if (applicationId) {
        this.saveLoader = true;
        savedGroupData = await this.dataService.getNodes(JSON.parse(applicationId), this.screenName, "Table");
        this.saveLoader = false;
      }
      if (savedGroupData.length > 0) {
        let getData = savedGroupData[savedGroupData.length - 1];

        if (getData.data.length > 0) {
          let updateTableData: any = [];
          this.groupingArray = [];
          getData.data.forEach((elem: any) => {
            let findData = this.tableHeaders.find((item: any) => item.key == elem);

            if (findData) {
              this.groupedFunc(elem, 'add', findData, false);
            }
          });

          this.displayData = this.tableData.length > this.data.end ? this.tableData.slice(0, this.data.end) : this.tableData;
          this.data.tableHeaders.unshift({
            name: 'expand',
            key: 'expand',
            title: 'Expand',
          });

          this.data.totalCount = this.tableData;
        } else {
          this.tableHeaders = this.tableHeaders.filter((head: any) => head.key != 'expand');
          this.displayData = this.tableData;
          this.pageChange(1);
        }
      } else {
        this.pageChange(1);
      }
    }
    if (item.filterArray) {
      item['isFilterdSortedColumn'] = item.filterArray.some((a: any) => a?.filter) && item.filterArray.length > 0;
    } else {
      item['isFilterdSortedColumn'] = false
    }
  }

  simpleFiltering(value: any, header: any) {
    header.filterArray.forEach((element: any) => {
      if (element.value == value) {
        element.filter = true;
      } else {
        element.filter = false;
      }
    });
    this.filter(header, true);
  }

  checkResetFiltering(header: any): boolean {
    return !header?.filterArray?.some((item: any) => item.filter);
  }
  sortedArray: any[] = [];
  sortingData(headerData: any, sortingOrder: any) {
    // Check if the column header is already in the sortedArray
    const header = headerData.key
    const index = this.sortedArray.findIndex(item => item.key === header);
    headerData['isFilterdSortedColumn'] = true;
    if (index !== -1) {
      // Column is already in the sortedArray, toggle the sort order
      this.sortedArray[index].order = sortingOrder;
    }
    else {
      // Column is not in the sortedArray, add it with 'asc' order
      this.sortedArray.push({ key: header, order: 'asc' });
    }

    // Sort the dataArray based on the keys and order in sortedArray
    this.tableData.sort((a, b) => {
      for (const sortItem of this.sortedArray) {
        const order = sortItem.order;
        const key = sortItem.key;
        const result = this.customSort(a, b, key, order);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    });

    this.pageChange(1);
  }

  // Define a custom sorting function
  customSort(a: any, b: any, key: string, order: "asc" | "desc"): number {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1; // Ascending or Descending
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1; // Ascending or Descending
    }
    return 0;
  }
  searchFilter(header: any) {
    header['filterArray'] = header['filterSearch']
    if (header?.searchValue) {
      const searchValue = header?.searchValue.toLowerCase();
      header['filterArray'] = header['filterSearch'].filter((item: any) =>
        item.value.toLowerCase().includes(searchValue)
      );
    }
  }
  selectClearAll(header: any, allow: boolean) {
    header?.filterArray.forEach((element: any) => {
      element.filter = allow;
    });
  }

  updateScrollConfig(): void {
    // Adjust the nzScroll configuration based on your desired logic
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      this.nzScrollConfig = { x: '1100px' };
    } else {
      this.nzScrollConfig = { x: '100%' }; // Adjust this value for smaller screens
    }
  }
  allowFreeze(header: any, index: number): boolean {
    if (header) {
      if (this.data?.endFreezingNumber || this.data.startFreezingNumber) {
        let checkFreezingNumber = 0;
        if (['', undefined, true].includes(this.data.isDeleteAllow)) {
          checkFreezingNumber = checkFreezingNumber + 1
        }
        if (this.tableHeaders.some((item: any) => item?.editMode === true)) {
          checkFreezingNumber = checkFreezingNumber + 1;
        }
        if (index < this.data?.endFreezingNumber - checkFreezingNumber && this.data?.endFreezingNumber > checkFreezingNumber) {
          let freezeIndex = this.tableHeaders.length - (index + 1)
          this.tableHeaders[freezeIndex]['headerFreeze'] = true;
        }
        let checkFreezingStartNUmber = 0;
        if (this.data.showCheckbox) {
          checkFreezingStartNUmber = checkFreezingStartNUmber + 1;
        }
        if (index < this.data.startFreezingNumber - checkFreezingStartNUmber) {
          header['headerFreeze'] = true;
          return header['headerFreeze'];
        }
        else {
          return header['headerFreeze'] ? header['headerFreeze'] : false;
        }
      } else {
        return header['headerFreeze'] ? header['headerFreeze'] : false;
      }
    }
    else {
      return false
    }
  }
  removeGrouping(index: number, remove: boolean) {
    try {
      this.saveLoader = true;
      let newGroupedArray: any[] = [];
      if (!remove) {
        if (index < 0 || index >= this.groupingArray.length) {
          // this.saveLoader = false;
          return; // Invalid index, nothing to remove
        }
        newGroupedArray.push(this.groupingArray[index])
        // for (let i = 0; i <= index; i++) {
        //   newGroupedArray.push(this.groupingArray[i])
        // }
      }
      else {
        newGroupedArray = [...this.groupingArray]
        this.groupingArray = [];
      }

      if (newGroupedArray.length > 0) {
        newGroupedArray.forEach((elem: any) => {
          let findData = this.tableHeaders.find((item: any) => item.key == elem);
          if (findData && !remove) {
            this.groupedFunc(elem, 'remove', findData, true);
          }
          else if (findData && remove) {
            this.groupedFunc(elem, 'remove', findData, true);
          }
        });
      }
      this.saveLoader = false;
    } catch (error) {
      // Handle the error, log it, or perform any necessary actions
      this.saveLoader = false;
      this.toastr.error('An error occurred in mapping:' + error, {
        nzDuration: 3000,
      });
      console.error('An error occurred in mapping:', error);
      // Optionally, you can rethrow the error to propagate it further
    }
  }
  changePageSize(pageSize: number) {
    this.data['end'] = pageSize;
    this.pageSize = '';
    this.pageChange(1);
  }
  check(event: any) {
    
    console.log(event)
  }
  onResizeStart(event: MouseEvent, column: any) {
    if (!this.saveLoader) {
      const startX = event.clientX;
      const initialWidth = parseInt(column.width) || 100;

      const onMouseMove = (e: MouseEvent) => {
        const width = initialWidth + e.clientX - startX;
        if (width > 0) {
          column.width = width;
          this.resizingLocalStorage();
        }
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

  }
  updateRotationDegree(degree: number) {
    this.rotationDegree = degree;
  }
  allowChild(child: any): boolean {
    if (this.tableHeaders.length > 0 && child) {
      return this.tableHeaders.some((head: any) => head.key === child.key);
    } else {
      return false;
    }
  }
  cancelEdit(item: any) {
    for (const key in this.editData) {
      item[key] = this.editData[key]
    }
    this.editId = null;
  }

  resizingLocalStorage() {
    
    let storeData = this.tableHeaders.map((item: any) => {
      let obj = {
        key: item.key,
        width: item.width
      };
      return obj;
    });
    if (this.screenId) {
      localStorage.setItem(this.screenId, JSON.stringify(storeData));
    }
  }
  handleDataDeletion(data: any) {
    // Remove the data to be deleted from various data arrays
    this.tableData = this.tableData.filter((d: any) => d.id !== data.id);
    this.displayData = this.displayData.filter((d: any) => d.id !== data.id);
    this.excelReportData = this.excelReportData.filter((d: any) => d.id !== data.id);
    this.pageChange(1); // Optionally, update pagination or other UI changes
  }

}

