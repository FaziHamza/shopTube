import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ruleFactory } from '@elite-libs/rules-machine';
import { BuilderService } from '../services/builder.service';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs';
import { ElementData } from '../models/element';
import { TreeNode } from '../models/treeNode';
import { Guid } from '../models/guid';
import { DataSharedService } from '../services/data-shared.service';
import { DividerComponent } from '../components';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApplicationService } from '../services/application.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard, private applicationService: ApplicationService,
    public builderService: BuilderService,
    private cdr: ChangeDetectorRef,
    private toastr: NzMessageService,
    public dataSharedService: DataSharedService, private router: Router) {
    this.dataSharedService.change.subscribe(({ event, field }) => {

      if (event && field && this.router.url.includes('/pages')) {
        this.checkConditionUIRule(field, event);
      }
    });
  }
  @Input() resData: any = [];
  @Input() formlyModel: any;
  fields: any = [];
  dataModel: any = {};
  screenData: any;
  businessRuleData: any;
  @Input() screenName = '';
  @Input() screenId: any;
  requestSubscription: Subscription;
  isPageContextShow = false;
  form: any = new FormGroup({});
  ngOnInit(): void {

    this.requestSubscription = this.dataSharedService.pageSubmit.subscribe({
      next: (res) => {

        let makeModel: any = {};
        const filteredNodes = this.filterInputElements(this.resData[0].children[1].children[0].children[1].children);
        for (let item in this.formlyModel) {
          filteredNodes.forEach((element) => {
            if (item == element.formly[0].fieldGroup[0].key) {
              makeModel[item] = this.formlyModel[item]
            }
          });
        }
        // this.dataModel = makeModel;
        this.dataModel = this.formlyModel;
        // this.submit();
        if (Object.keys(makeModel).length > 0)
          this.saveData(res)
      },
      error: (err) => {
        console.error(err);
      }
    })
    // if (this.router.url.includes('/pages'))
    //   this.isPageContextShow = true;
    this.requestSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      // // This is used in SiteLayoutComponent.component to show active route and show data on base of active route
      // if (params["application"] && params["module"]) {
      //   let activeModule = params["module"].replace('-', ' ');
      //   let activeApplication = params["application"].replace('-', ' ');
      //   if (params["module"] && (this.dataSharedService.checkModule !== params["module"] || this.dataSharedService.checkModule === '')) {
      //     this.dataSharedService.checkModule = params["module"];
      //     if (params["module"]) {
      //       this.requestSubscription = this.employeeService.headerFooter(params["module"]).subscribe({
      //         next: (res: any) => {
      //           if (res.length > 0) {
      //             this.setData(res[0]);

      //             if (res.length > 1) {
      //               this.setData(res[1]);
      //             }
      //           }
      //         },
      //         error: (err) => {
      //           console.error(err);
      //         }
      //       });
      //     }
      //     this.dataSharedService.urlModule.next({ aplication: activeApplication, module: activeModule });
      //   }
      //   else {
      //   }
      // }
      // else {
      //   // this.dataSharedService.urlModule.next({ aplication: '', module: '' });
      // }
      // ----------------------------------------------------------------//


      // ------------------
      //  Working on Load
      // ------------------
      if (params["schema"]) {
        this.dataSharedService.defaultPageNodes = '';
        this.isPageContextShow = true;
        // this.dataSharedService.urlModule.next({ aplication: '', module: '' });
        this.screenName = params["schema"];
        this.requestSubscription = this.applicationService.getNestCommonAPI("cp/UserComment").subscribe((res: any) => {
          if (res.isSuccess) {

            // let commentList = res.data.filter((item: any) => item.screenId == this.screenName)
            let commentList = res.data
            this.dataSharedService.screenCommentList = commentList;
          }
        })

        this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', params["schema"]).subscribe({
          next: (res: any) => {
            if (res.isSuccess) {
              if (res.data.length > 0) {
                this.screenId = res.data[0].screenBuilderId;
                this.getBusinessRule(res.data[0].screenBuilderId);
                this.getUIRuleData(res.data[0].screenBuilderId);
                const data = JSON.parse(res.data[0].screenData);
                this.resData = this.jsonParseWithObject(this.jsonStringifyWithObject(data));
                this.dataSharedService.checkContentForFixFooter = this.jsonParseWithObject(this.jsonStringifyWithObject(data));
                this.checkDynamicSection();
                this.uiRuleGetData({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' });
                this.getFromQuery();
                if (params["commentId"] != "all") {
                  this.builderService.getCommentById(params["commentId"]).subscribe(res => {
                    if (res.length > 0) {
                      let findObj = this.findObjectById(this.resData[0], res[0].commentId);
                      findObj.highLight = true;
                    }
                  })
                } else {
                  this.dataSharedService.screenCommentList.forEach(element => {
                    let findObj = this.findObjectById(this.resData[0], element.commentId);
                    findObj.highLight = true;
                  });
                }
              }
            } else
              this.toastr.error(res.message, { nzDuration: 3000 });
          },
          error: (err) => {
            console.error(err); // Log the error to the console
          }
        });

      }

    });
  }
  saveData(data: any) {
    if (data.isSubmit) {
      // let oneModelData = this.convertModel(this.dataModel);
      // // this.sections.children[1].children
      // // this.sections.children[1].childrena.forEach((element:any) => {
      // //   if(element.type == "gridList"){
      // //     let tableData = this.findObjectByType(element,"gridList");
      // //     tableData.tableData = [];
      // //     tableData.tableHeaders = [];
      // //     tableData?.tableData?.push(this.dataModel);
      // //   }
      // // });
      // // let tableData = this.findObjectByType(element,"gridList");
      // let tableData = this.resData[0].children[1].children[0].children[1].children.filter((a: any) => a.type == "gridList");
      // if (tableData.length > 0) {
      //   tableData[0]['api'] = data.dataTable;
      //   let saveForm = JSON.parse(JSON.stringify(oneModelData));
      //   // saveForm["id"] = '';
      //   // this.dataModel["id"] = tableData[0]['tableKey'].length
      //   const firstObjectKeys = Object.keys(saveForm);
      //   let obj = firstObjectKeys.map(key => ({ name: key }));
      //   // obj.unshift({name: 'id'});
      //   if (JSON.stringify(tableData[0]['tableKey']) != JSON.stringify(obj)) {
      //     tableData[0].nzFooter = '';
      //     tableData[0].tableData = [];
      //     tableData[0]['tableKey'] = obj;
      //     tableData[0].tableHeaders = tableData[0]['tableKey'];
      //     saveForm.id = tableData[0].tableData.length + 1
      //     tableData[0].tableData?.push(saveForm);
      //   } else {
      //     tableData[0].nzFooter = '';
      //     tableData[0]['tableKey'] = obj;
      //     tableData[0].tableHeaders = tableData[0]['tableKey'];
      //     saveForm.id = tableData[0].tableData.length + 1;
      //     tableData[0].tableData?.push(saveForm);
      //   }

      // }
      this.saveData1(data);

    }
  }
  submit() {
    this.dataModel = this.formlyModel;
  }
  saveData1(data: any) {

    this.dataModel = this.formlyModel;
    let oneModelData = this.convertModel(this.dataModel);
    // const objModel: any = this.dataModel;
    // var nestedObject = {};
    // for (var key in objModel) {
    //   Object.assign(nestedObject, objModel[key]);
    // }

    // let nestedObject: any = null;
    // Object.keys(objModel).forEach(key => {
    //   const value = objModel[key];
    //   if (typeof value === "object" && value !== null) {
    //     nestedObject = value;
    //   }
    // });
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

    // if (data.dataTable) {
    //   this.requestSubscription = this.builderService.genericApisPost(data.dataTable, this.dataModel).subscribe({
    //     next: (res) => {
    //       this.toastr.success("Data saved!", { nzDuration: 3000 });
    //     },
    //     error: (err) => {
    //       console.error(err); // Log the error to the console
    //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //     }
    //   });
    // } else {
    //   this.toastr.error("Data table required", { nzDuration: 3000 }); // Show an error message to the user
    // }
  }
  getFromQuery() {
    let tableData = this.findObjectByTypeBase(this.resData[0],"gridList");
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
  assignGridRules(data:any){
    this.applicationService.getNestCommonAPIById('cp/GridBusinessRule', this.screenId).subscribe(((getRes: any) => {
      if (getRes.isSuccess) {
        if (getRes.data.length > 0) {
          // this.dataModel['input34d5985f']='1313'
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
                    else
                      query = data.tableData[j][elementv1.ifCondition] + elementv1.oprator + elementv1.getValue

                    if (eval(query)) {
                      for (let k = 0; k < elementv1.getRuleCondition.length; k++) {
                        const elementv2 = elementv1.getRuleCondition[k];
                        if (elementv1.getRuleCondition[k].referenceOperator != '') {
                          data.tableData[j][elementv1.target] = eval(`${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                          data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                        } else {
                          if (k > 0) {
                            data.tableData[j][elementv1.target] = eval(`${data.tableData[j][elementv1.target]} ${elementv1.getRuleCondition[k - 1].referenceOperator} ${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                            data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                          }
                          else
                            data.tableData[j][elementv1.target] = eval(`${data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${data.tableData[j][elementv2.target]}`);
                          data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                        }
                        if (elementv2.multiConditionList.length > 0) {
                          for (let l = 0; l < elementv2.multiConditionList.length; l++) {
                            const elementv3 = elementv2.multiConditionList[l];
                            const value = data.tableData[j][elementv1.target];
                            data.tableData[j][elementv1.target] = eval(`${value} ${elementv3.oprator} ${data.tableData[j][elementv3.target]}`);
                            // this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                          }
                        }
                      }
                      for (let k = 0; k < elementv1.thenCondition.length; k++) {
                        const elementv2 = elementv1.thenCondition[k];
                        for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                          const elementv3 = elementv2.getRuleCondition[l];
                          data.tableData[j][elementv2.thenTarget] = eval(`${data.tableData[j][elementv3.ifCondition]} ${elementv3.oprator} ${data.tableData[j][elementv3.target]}`);
                          if (elementv3.multiConditionList.length > 0) {
                            for (let m = 0; m < elementv3.multiConditionList.length; m++) {
                              const elementv4 = elementv3.multiConditionList[m];
                              const value = data.tableData[j][elementv2.thenTarget];
                              data.tableData[j][elementv2.thenTarget] = eval(`${value} ${elementv4.oprator} ${data.tableData[j][elementv4.target]}`);
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
      } else
        this.toastr.error(getRes.message, { nzDuration: 3000 });
    }));
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
  setInternalValuesEmpty = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.setInternalValuesEmpty(obj[key]);
      } else {
        obj[key] = '';
      }
    }
  };
  jsonParseWithObject(data: any) {
    return JSON.parse(
      data, (key, value) => {
        if (typeof value === 'string' && value.startsWith('(')) {
          return eval(`(${value})`);
        }
        return value;
      });
  }
  jsonStringifyWithObject(data: any) {
    return JSON.stringify(data, function (key, value) {
      if (typeof value == 'function') {
        return value.toString();
      } else {
        return value;
      }
    }) || '{}'
  }
  getUIRuleData(screenId: string) {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/UiRule', screenId).subscribe({
      next: (getRes: any) => {
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.screenData = [];
            const jsonUIResult = {
              "key": getRes.data[0].key,
              "title": getRes.data[0].title,
              "screenName": getRes.data[0].screenName,
              "screenId": getRes.data[0].screenId,
              "uiData": JSON.parse(getRes.data[0].uiData)
            }
            this.screenData = jsonUIResult;
          } else { }
        } else
          this.toastr.error(getRes.message, { nzDuration: 3000 });
      },
      error: (err) => {
        console.error(err); // Log the error to the console
      }
    });
  }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  uiRuleGetData(moduleId: any) {
    this.makeFaker();
    this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
    this.updateFormlyModel();
    // this.getUIRuleData();
  }
  updateNodes() {
    this.resData = [...this.resData];
  }
  checkConditionUIRule(model: any, currentValue: any) {

    this.getUIRule(model, currentValue);
    this.updateNodes();
    // this.resData = this.jsonParseWithObject(this.jsonStringifyWithObject(this.resData));
    // this.cdr.detectChanges();
    // this.cdr.detach();
  }
  getUIRule(model: any, currentValue: any) {
    debugger
    try {
      if (this.screenData != undefined) {
        var inputType = this.resData[0].children[1].children[0].children[1].children;
        for (let index = 0; index < this.screenData.uiData.length; index++) {
          if (model.key == this.screenData.uiData[index].ifMenuName) {
            let query: any;
            let getModelValue = this.formlyModel[this.screenData.uiData[index].ifMenuName] == "" ? false : this.formlyModel[this.screenData.uiData[index].ifMenuName];
            if (this.screenData.uiData[index].condationName == 'contains') {
              if (this.formlyModel[this.screenData.uiData[index].ifMenuName] != undefined &&
                this.formlyModel[this.screenData.uiData[index].ifMenuName].includes(this.screenData.uiData[index].targetValue)) {
                query = '1 == 1';
                query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
              }
              else {
                query = '1 == 2';
                query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
              }
            } else if (this.screenData.uiData[index].condationName == 'null') {
              if (typeof (this.formlyModel[this.screenData.uiData[index].ifMenuName]) != "number") {
                if (this.formlyModel[this.screenData.uiData[index].ifMenuName] == '' || this.formlyModel[this.screenData.uiData[index].ifMenuName] == null) {
                  query = '1 == 1';
                  query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
                }
                else {
                  query = '1 == 2';
                  query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
                }
              } else {
                query = '1 == 2';
                query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
              }

            } else {
              if (this.screenData.uiData[index].ifMenuName.includes('number') || this.screenData.uiData[index].ifMenuName.includes('decimal')) {
                query = Number(getModelValue) + " " + this.screenData.uiData[index].condationName + " " + this.screenData.uiData[index].targetValue;

                query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
              } else {
                query = "'" + getModelValue + "' " + this.screenData.uiData[index].condationName + " '" + this.screenData.uiData[index].targetValue + "'";

                query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
              }
            }
            if (eval(query)) {
              const check = this.makeUIJSONForSave(this.screenData, index, inputType, true);
              this.resData[0].children[1].children[0].children[1].children = check;
              this.updateNodes();
              this.updateFormlyModel();
            }
            else {
              const check = this.makeUIJSONForSave(this.screenData, index, inputType, false);
              this.resData[0].children[1].children[0].children[1].children = check;
              this.updateNodes();
              this.updateFormlyModel();
            }
          }
        }
      }
      else {
        // this.updateFormlyModel();
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      if (this.screenName) {
        if (this.businessRuleData) {
          const fishRhyme = ruleFactory(this.businessRuleData);
          const updatedModel = fishRhyme(this.formlyModel);
          this.updateFormlyModel();

          // if(updatedModel){
          //   this.updateFormlyModel();
          // }else{
          //   this.updateFormlyModelData()
          // }
          this.cdr.detectChanges();
          // this.cdr.detach();
        }
      }
      this.getSetVariableRule(model, currentValue);

    }
  }
  updateFormlyModelData() {
    for (const rule of this.businessRuleData) {
      if (this.evaluateCondition(rule.if)) {
        this.updateModelWithStatement(rule.then);
      } else {
        if (rule.then) {
          this.modelWithStatement(rule.then);
        }
      }
    }
  }
  evaluateCondition(condition: string): boolean {
    if(condition.includes('AND') || condition.includes('OR'))
      return this.evaluateConditionOperatoe(condition);
    else
      return this.evaluateConditionSimple(condition);
  }
  evaluateConditionSimple(condition: string): boolean {
    const operators: { [key: string]: (a: any, b: any) => boolean } = {
      "==": (a: any, b: any) => a == b,
      "!=": (a: any, b: any) => a != b,
      ">=": (a: any, b: any) => a >= b,
      "<=": (a: any, b: any) => a <= b,
      "=": (a: any, b: any) => a === b,
      ">": (a: any, b: any) => a > b,
      "<": (a: any, b: any) => a < b,
    };

    const parts = condition.split(" ");
    const leftOperand = parts[0].trim();
    const operator = parts[1].trim();
    const rightOperand = parts[2].trim();

    const leftValue = this.formlyModel[leftOperand];
    const rightValue = this.formlyModel[rightOperand];

    return operators[operator](leftValue, rightValue);
  }
  evaluateConditionOperatoe(condition: string): boolean {
      const operators: { [key: string]: (a: any, b: any) => boolean } = {
        "==": (a: any, b: any) => a == b,
        "!=": (a: any, b: any) => a != b,
        ">=": (a: any, b: any) => a >= b,
        "<=": (a: any, b: any) => a <= b,
        "=": (a: any, b: any) => a === b,
        ">": (a: any, b: any) => a > b,
        "<": (a: any, b: any) => a < b,
      };

      const andConditions = condition.split("AND");
      let andResult = true;

      for (const andCondition of andConditions) {
        const orConditions = andCondition.split("OR");
        let orResult = false;

        for (const orCondition of orConditions) {
          const parts = orCondition.split(" ");
          const leftOperand = parts[0].trim();
          const operator = parts[1].trim();
          const rightOperand = parts[2].trim();

          const leftValue = this.formlyModel[leftOperand];
          const rightValue = this.formlyModel[rightOperand];

          const conditionResult = operators[operator](leftValue, rightValue);

          if (conditionResult) {
            orResult = true;
            break;
          }
        }

        if (!orResult) {
          andResult = false;
          break;
        }
      }

      return andResult;
  }

  updateModelWithStatement(statement: string) {
    // Implement your own logic to update the model based on the statement
    const parts = statement.split('=');
    const key = parts[0].trim();
    const value = parts[1].trim().replace(/"/g, ''); // Remove double quotes from the value if present
    this.formlyModel[key] = value;
  }
  modelWithStatement(statement: string) {
    // Implement your own logic to update the model based on the statement
    const parts = statement.split('=');
    const key = parts[0].trim();
    const value = parts[1].trim().replace(/"/g, ''); // Remove double quotes from the value if present
    this.formlyModel[key] = '';
  }
  getSetVariableRule(model: any, value: any) {
    //for grid amount assign to other input field
    const filteredNodes = this.filterInputElements(this.resData);
    filteredNodes.forEach(node => {
      const formlyConfig = node.formly?.[0]?.fieldGroup?.[0]?.props?.config;
      if (formlyConfig?.setVariable)
        if (formlyConfig?.setVariable === model?.props?.config?.getVariable) {
          this.formlyModel[node?.formly?.[0]?.fieldGroup?.[0]?.key] = value;
        }
    });
  }
  filterInputElements(data: ElementData[]): any[] {
    const inputElements: ElementData[] = [];

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
  getBusinessRule(screenId: string) {
    if (screenId) {
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/BusinessRule', screenId).subscribe({
        next: (getRes: any) => {
          if (getRes.isSuccess) {
            if (getRes.data.length > 0) {
              this.businessRuleData = [];
              if (getRes.data[0].businessRule)
                this.businessRuleData = JSON.parse(getRes.data[0].businessRule)
            }
          } else
            this.toastr.error(getRes.message, { nzDuration: 3000 });
        },
        error: (err) => {
          console.error(err); // Log the error to the console
        }
      })
    }
  }
  makeFaker() {
    let dataModelFaker: any = [];
    if (this.resData.length > 0) {
      const filteredNodes = this.filterInputElements(this.resData);
      filteredNodes.forEach(node => {
        dataModelFaker[node.formly[0].fieldGroup[0].key] = this.makeFakerData(node);
      });
    }
    this.formlyModel = dataModelFaker;
    this.updateFormlyModel();
  }
  updateFormlyModel() {
    this.formlyModel = Object.assign({}, this.formlyModel)
  }
  evalConditionRule(query: any, dataTargetIfValue: any) {
    dataTargetIfValue.forEach((e: any) => {
      let type = e.conditonType == "AND" ? "&&" : "||";
      type = query == '' ? "" : type;
      let getModelValue = this.formlyModel[e.ifMenuName] == "" ? "''" : this.formlyModel[e.ifMenuName];
      if (getModelValue == undefined)
        getModelValue = "";

      if (e.condationName == 'contains') {
        if (this.formlyModel[e.ifMenuName] != undefined && this.formlyModel[e.ifMenuName].includes(e.targetValue))
          query = query + " " + type + " " + '1 == 1';
        else
          query = query + " " + type + " " + '1 == 2';
      } else if (e.condationName == 'null') {
        if (typeof (this.formlyModel[e.ifMenuName]) != "number") {
          if (this.formlyModel[e.ifMenuName] == '' || this.formlyModel[e.ifMenuName] == null)
            query = query + " " + type + " " + '1 == 1';
          else
            query = query + " " + type + " " + '1 == 2';
        }
        else
          query = query + " " + type + " " + '1 == 2';
      } else {
        if (e.ifMenuName.includes('number') || e.ifMenuName.includes('decimal')) {
          query = query + " " + type + " " + Number(getModelValue) + " " + e.condationName + " " + e.targetValue;
        }
        else {
          query = query + " " + type + " '" + getModelValue + "' " + e.condationName + " '" + e.targetValue + "'";
        }
      }
    });
    return query;
  }
  makeFakerData(V2: any) {
    if (V2.formly[0].fieldGroup[0].props) {
      let modelFaker: any;
      if (V2.formly[0].fieldGroup[0].props.type) {
        if (V2.formly[0].fieldGroup[0].type == 'input') {
          // modelFaker = faker.name.firstName()
        }
        else if (V2.formly[0].fieldGroup[0].type == 'textarea') {
          // modelFaker = faker.lorem.paragraph()
        }
        else if (V2.formly[0].fieldGroup[0].type == 'inputGroupGrid') {
          // modelFaker = faker.name.firstName()
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'password') {
          // modelFaker = faker.name.firstName()
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'tel') {
          // modelFaker = faker.phone.number()
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'date') {
          // modelFaker = faker.date.between('01/01/2001', '01/01/2001');
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'email') {
          // modelFaker = faker.internet.email()
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'checkbox') {
          // modelFaker = faker.datatype.boolean()
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'radio') {
          // modelFaker = faker.datatype.boolean()
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'number') {
          // modelFaker = 1
          // modelFaker = faker.datatype.number(10)
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'decimal') {
          // modelFaker = 0.0
          // modelFaker = faker.datatype.float({ min: 10, max: 100, precision: 0.001 })
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'month') {
          // modelFaker = faker.date.month({ abbr: true, context: true })
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'datetime-local') {
          // modelFaker = faker.datatype.datetime(1893456000000)
        }
        else if (V2.formly[0].fieldGroup[0].props.type == 'color') {
          // modelFaker = faker.color.colorByCSSColorSpace()
        }
      }
      else if (V2.formly[0].fieldGroup[0].type) {
        if (V2.formly[0].fieldGroup[0].type == 'input') {
          // modelFaker = faker.name.firstName()
        }
        else if (V2.formly[0].fieldGroup[0].type == 'textarea') {
          // modelFaker = faker.lorem.paragraph()
        }
        else if (V2.formly[0].fieldGroup[0].type == 'inputGroupGrid') {
          // modelFaker = faker.name.firstName()
        }
      }
      return modelFaker;
    }
  }
  makeUIJSONForSave(screenData: any, index: number, inputType: any, currentValue: boolean) {
    for (let k = 0; k < screenData.uiData[index].targetCondition.length; k++) {
      for (let l = 0; l < inputType.length; l++) {
        if (inputType[l].type == "button" || inputType[l].type == "linkButton" || inputType[l].type == "dropdownButton") {
          if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && currentValue) {
            inputType[l] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
          } else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue)
            inputType[l] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
        } else if (inputType[l].type == "buttonGroup") {
          if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && currentValue)
            inputType[l].children = this.screenData.uiData[index].targetCondition[k].inputJsonData;
          else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue)
            inputType[l].children = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
        }
        else if (inputType[l].type == "input" || inputType[l].type == "inputGroup" || inputType[l].type == "checkbox" ||
          inputType[l].type == "color" || inputType[l].type == "decimal" || inputType[l].type == "image" ||
          inputType[l].type == "multiselect" || inputType[l].type == "radiobutton" || inputType[l].type == "search" ||
          inputType[l].type == "repeatSection" || inputType[l].type == "tags" || inputType[l].type == "telephone" ||
          inputType[l].type == "textarea" || inputType[l].type == "date" || inputType[l].type == "datetime" ||
          inputType[l].type == "month" || inputType[l].type == "time" || inputType[l].type == "week") {
          if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].formly[0].fieldGroup[0].key && currentValue) {
            inputType[l].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
          } else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].formly[0].fieldGroup[0].key && !currentValue) {
            inputType[l].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
          }
        } else if (inputType[l].type == "alert" || inputType[l].type == "heading" || inputType[l].type == "paragraph" ||
          inputType[l].type == "tag" || inputType[l].type == "card" || inputType[l].type == "simpleCardWithHeaderBodyFooter" ||
          inputType[l].type == "cascader" || inputType[l].type == "mentions" || inputType[l].type == "transfer" ||
          inputType[l].type == "treeSelect" || inputType[l].type == "switch" || inputType[l].type == "avatar" ||
          inputType[l].type == "badge" || inputType[l].type == "treeView" || inputType[l].type == "carouselCrossfade" ||
          inputType[l].type == "comment" || inputType[l].type == "description" || inputType[l].type == "statistic" ||
          inputType[l].type == "empty" || inputType[l].type == "list" || inputType[l].type == "popConfirm" ||
          inputType[l].type == "timeline" || inputType[l].type == "popOver" || inputType[l].type == "imageUpload" ||
          inputType[l].type == "invoice" || inputType[l].type == "segmented" || inputType[l].type == "drawer" ||
          inputType[l].type == "message" || inputType[l].type == "notification" || inputType[l].type == "modal" ||
          inputType[l].type == "progressBar" || inputType[l].type == "result" || inputType[l].type == "skeleton" ||
          inputType[l].type == "spin" || inputType[l].type == "accordionButton" || inputType[l].type == "audio" ||
          inputType[l].type == "multiFileUpload" || inputType[l].type == "rate" || inputType[l].type == "toastr" ||
          inputType[l].type == "video") {
          if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && currentValue)
            inputType[l] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
          else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue)
            inputType[l] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
        } else if (inputType[l].type == "mainDashonicTabs") {
          for (let m = 0; m < inputType[l].children.length; m++) {
            if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].key && currentValue)
              inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
            else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].key && !currentValue)
              inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
          }
        } else if (inputType[l].type == "stepperMain") {
          for (let m = 0; m < inputType[l].children.length; m++) {
            if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].formly[0].fieldGroup[0].key && currentValue)
              inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
            else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].formly[0].fieldGroup[0].key && !currentValue)
              inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
          }
        }
        else if (inputType[l].type == "gridList" || inputType[l].type == "gridListEditDelete") {
          if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && currentValue)
            inputType[l] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
          else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue)
            inputType[l] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
        }
      }
    }
    return inputType;
  }

  sectionRepeat(section: any) {
    try {
      const idx = this.resData[0].children[1].children.indexOf(section as TreeNode);
      let newNode = JSON.parse(JSON.stringify(section));
      let obj = { node: newNode, type: 'copy' };
      this.traverseAndChange(obj);
      this.resData[0].children[1].children.splice(idx as number + 1, 0, newNode);
      this.resData = [...this.resData];
    } catch (error: any) {
      console.error('An error occurred:', error);
    }
  }
  changeIdAndkey(node: any) {
    node.id = node.id + Guid.newGuid();
    if (node.formly) {
      if (node.formly[0].key) {
        node.formly[0].key = node.formly[0].key + Guid.newGuid();
      } else if (node.formly[0].fieldGroup[0].key) {
        node.formly[0].fieldGroup[0].key = node.formly[0].fieldGroup[0].key + Guid.newGuid();
      }
    }
    return node;
  }
  traverseAndChange(event: any) {

    if (event.node) {
      if (event.type == 'copy') {
        event.node = this.changeIdAndkey(event.node);
      } else if (event.type == 'disabled') {
        event.node = this.disabledAndEditableSection(event.node);
      }
      if (event.node.children) {
        event.node.children.forEach((child: any) => {
          let obj = { node: child, type: event.type };
          this.traverseAndChange(obj);
        });
      }
    }
  }
  disabledAndEditableSection(data: any) {

    if (data.formlyType) {
      if (data.formlyType == "input") {
        data.formly[0].fieldGroup[0].props.disabled = data.formly[0].fieldGroup[0].props.disabled ? false : true;
      };
    };
    return data;
  };
  checkDynamicSection() {

    if (this.resData) {
      this.resData[0].children[1].children.forEach((element: any, i: number) => {
        let selectedNode: any = undefined;
        if (selectedNode = this.findObjectByType(element, "sections", element.key)) {
          this.makeDynamicSections(selectedNode.mapApi, selectedNode);
        }
        if (this.resData[0].children[1].children[i].children[1].children.length) {
          this.resData[0].children[1].children[i].children[1].children.forEach((j: any) => {
            if (selectedNode = this.findObjectByType(this.resData[0].children[1].children[i].children[1], "listWithComponents", j.key)) {
              selectedNode.children.forEach((item: any) => {
                this.makeDynamicSections(item.mapApi, item);
              });
            }
            if (selectedNode = this.findObjectByType(this.resData[0].children[1].children[i].children[1], "mainTab", j.key)) {
              selectedNode.children.forEach((item: any) => {
                this.makeDynamicSections(item.mapApi, item);
              });
            }
            if (selectedNode = this.findObjectByType(this.resData[0].children[1].children[i].children[1], "mainStep", j.key)) {
              selectedNode.children.forEach((item: any) => {
                this.makeDynamicSections(item.mapApi, item);
              });
            }
            if (selectedNode = this.findObjectByType(this.resData[0].children[1].children[i].children[1], "div", j.key)) {
              this.makeDynamicSections(selectedNode.mapApi, selectedNode);
            }
            if (selectedNode = this.findObjectByType(this.resData[0].children[1].children[i].children[1], "cardWithComponents", j.key)) {
              this.makeDynamicSections(selectedNode.mapApi, selectedNode);
            }
          })
        }
      });
    }
  }
  makeDynamicSections(api: any, selectedNode: any) {

    let checkFirstTime = true;
    let tabsAndStepper: any = [];
    if (api)
      this.requestSubscription = this.builderService.genericApis(api).subscribe(res => {
        if (res) {
          for (let index = 0; index < res.length; index++) {
            const item = res[index];
            let newNode: any = {};
            if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'div' || selectedNode.type == 'listWithComponentsChild' || selectedNode.type == 'cardWithComponents') {
              newNode = JSON.parse(JSON.stringify(selectedNode?.children));
            }
            else {
              newNode = JSON.parse(JSON.stringify(selectedNode?.children?.[1]?.children?.[0]));
            }
            if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'div' || selectedNode.type == 'listWithComponentsChild' || selectedNode.type == 'cardWithComponents') {
              if (selectedNode.tableBody) {
                selectedNode.tableBody.forEach((element: any) => {
                  if (newNode.length) {
                    newNode.forEach((j: any) => {
                      const keyObj = this.findObjectByKey(j, element.fileHeader);
                      if (keyObj && element.defaultValue) {
                        const updatedObj = this.dataReplace(keyObj, item, element);
                        j = this.replaceObjectByKey(j, keyObj.key, updatedObj);
                        if (selectedNode.type == 'tabs' || selectedNode.type == 'step') {
                          j['mapping'] = true;
                        }
                      }
                    });
                  }
                });
              }
            }
            else if (selectedNode.type != 'tabs' && selectedNode.type != 'step' && selectedNode.type != 'div' && selectedNode.type != 'listWithComponentsChild' && selectedNode.type != 'cardWithComponents') {
              if (selectedNode.tableBody) {
                selectedNode.tableBody.forEach((element: any) => {
                  const keyObj = this.findObjectByKey(newNode, element.fileHeader);
                  if (keyObj && element.defaultValue) {
                    const updatedObj = this.dataReplace(keyObj, item, element);
                    newNode = this.replaceObjectByKey(newNode, keyObj.key, updatedObj);
                  }
                });
              }
            }
            if (checkFirstTime) {
              if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'div' || selectedNode.type == 'listWithComponentsChild' || selectedNode.type == 'cardWithComponents') {
                selectedNode.children = newNode;
              }
              else if (selectedNode.children[1]) {
                selectedNode.children[1].children = [];
                selectedNode?.children[1]?.children?.push(newNode);
              }
              this.updateNodes();
              checkFirstTime = false
            }
            else {
              if (selectedNode.type == 'tabs' || selectedNode.type == 'step') {
                if (newNode.length) {
                  newNode.forEach((k: any) => {
                    if (k.mapping) {
                      tabsAndStepper.push(k);
                    }
                  });
                }
                if (index == res.length - 1) {
                  if (tabsAndStepper.length) {
                    tabsAndStepper.forEach((j: any) => {
                      selectedNode?.children?.push(j);
                    });
                  }
                  let unMapped = selectedNode?.children.filter((child: any) => child.mapping == undefined);
                  let mapped = selectedNode?.children.filter((child: any) => child.mapping);
                  selectedNode.children = mapped;
                  if (unMapped.length) {
                    unMapped.forEach((element: any) => {
                      selectedNode.children.push(element);
                    });
                  }
                  selectedNode.children.forEach((k: any) => {
                    delete k.mapping
                  });
                }
              }
              else if (selectedNode.type == 'div' || selectedNode.type == 'cardWithComponents' || selectedNode.type == 'listWithComponentsChild') {
                let newSelected = JSON.parse(JSON.stringify(selectedNode));
                newSelected.children = newNode;
                let data = JSON.parse(JSON.stringify(newSelected));
                tabsAndStepper.push(data);
                if (index == res.length - 1) {

                  this.resData[0].children[1].children.forEach((a: any,) => {
                    let checkPushOrNot = true
                    a.children[1].children.forEach((b: any, i: number) => {
                      let idx = i;
                      if ((b.type == 'div' || selectedNode.type == 'cardWithComponents') && b.id == selectedNode.id && checkPushOrNot) {
                        if (tabsAndStepper) {
                          tabsAndStepper.forEach((div: any) => {
                            a.children[1].children.splice(idx + 1, 0, div);
                            idx++;
                          });
                          checkPushOrNot = false;
                        }
                      }
                      else if (b.type == 'listWithComponents') {
                        b.children.forEach((listChild: any, chilIndex: number) => {
                          let idx = chilIndex
                          if (listChild.type == 'listWithComponentsChild' && listChild.id == selectedNode.id && checkPushOrNot) {
                            if (tabsAndStepper) {
                              tabsAndStepper.forEach((div: any) => {
                                b.children.splice(idx + 1, 0, div);
                                idx++;
                              });
                              checkPushOrNot = false;
                            }
                          }
                        });
                      }
                    })
                  })
                }
              }
              else if (selectedNode.children[1]) {
                selectedNode?.children[1]?.children?.push(newNode);
              }
            }
          }
          this.updateNodes();
        }
      })
  }
  findObjectByType(data: any, type: any, key?: any) {
    if (data.type === type && data.key === key) {
      return data;
    }
    for (let child of data.children) {
      let result: any = this.findObjectByType(child, type, key);
      if (result !== undefined) {
        return result;
      }
    }
    return undefined;
  }
  findObjectByKey(data: any, key: any) {
    if (data) {
      if (data.key && key) {
        if (data.key === key) {
          return data;
        }
        if (data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByKey(child, key);
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }
    }
  }
  dataReplace(node: any, replaceData: any, value: any): any {
    let typeMap: any = {
      cardWithComponents: 'title',
      buttonGroup: 'title',
      button: 'title',
      breakTag: 'title',
      switch: 'title',
      imageUpload: 'source',
      heading: 'text',
      paragraph: 'text',
      alert: 'text',
      progressBar: 'percent',
      video: 'videoSrc',
      audio: 'audioSrc',
      carouselCrossfade: 'carousalConfig',
      tabs: 'title',
      mainTab: 'title',
      mainStep: 'title',
      listWithComponents: 'title',
      listWithComponentsChild: 'title',
      step: 'title',
      kanban: 'title',
      simplecard: 'title',
      div: 'title',
      textEditor: 'title',
      multiFileUpload: 'uploadBtnLabel',
      accordionButton: 'title',
      divider: 'dividerText',
      toastr: 'toasterTitle',
      rate: 'icon',
      editor_js: 'title',
      rangeSlider: 'title',
      affix: 'title',
      statistic: 'title',
      anchor: 'title',
      modal: 'btnLabel',
      popConfirm: 'btnLabel',
      avatar: 'src',
      badge: 'nzText',
      comment: 'avatar',
      description: 'btnText',
      descriptionChild: 'content',
      segmented: 'title',
      result: 'resultTitle',
      tree: 'title',
      transfer: 'title',
      spin: 'loaderText',
      cascader: 'title',
      drawer: 'btnText',
      skeleton: 'title',
      empty: 'text',
      list: 'title',
      treeView: 'title',
      message: 'content',
      mentions: 'title',
      icon: 'title'
    };

    const type = node.type;
    const key = typeMap[type];
    if (node.type == 'avatar') {
      if (Array.isArray(replaceData[value.defaultValue])) {
        let nodesArray: any = [];
        replaceData[value.defaultValue].forEach((i: any) => {
          let newNode = JSON.parse(JSON.stringify(node));
          newNode.src = i;
          nodesArray.push(newNode);
        });
        return nodesArray;
      }
    }
    else if (node.type == "tag") {
      if (Array.isArray(replaceData[value.defaultValue])) {
        node.options = replaceData[value.defaultValue];
        return node;
      }
    }
    else {
      if (key) {
        node[key] = replaceData[value.defaultValue];
      }
      return node;
    }
  }
  replaceObjectByKey(data: any, key: any, updatedObj: any) {
    if (data.key === key) {
      return updatedObj;
    }
    for (let i = 0; i < data.children.length; i++) {
      const child = data.children[i];
      if (child.key === key) {
        if (Array.isArray(updatedObj) && child.type == 'avatar') {
          let check = data.children.filter((a: any) => a.type == "avatar");
          if (check.length != 1) {
            // let getFirstAvatar = JSON.parse(JSON.stringify(check[0]));
            let deleteAvatar = check.length - 1;
            for (let index = 0; index < deleteAvatar; index++) {
              const element = data.children.filter((a: any) => a.type == "avatar");;
              const idx = data.children.indexOf(element[0]);
              data.children.splice(idx as number, 1);
            }
            let lastAvatarIndex = data.children.filter((a: any) => a.type == "avatar");
            let idx = data.children.indexOf(lastAvatarIndex[0]);
            data.children.splice(idx, 1);
            updatedObj.forEach((i: any) => {
              data.children.splice(idx + 1, 0, i);
              idx = idx + 1;
            });
          }
          else {
            let lastAvatarIndex = data.children.filter((a: any) => a.type == "avatar");
            let idx = data.children.indexOf(lastAvatarIndex[0]);
            data.children.splice(idx, 1);
            updatedObj.forEach((i: any) => {
              data.children.splice(idx + 1, 0, i);
              idx = idx + 1;
            });
          }
        }
        else {
          data.children[i] = updatedObj;
        }
        return data;
      }
      const result = this.replaceObjectByKey(child, key, updatedObj);
      if (result !== null) {
        return data;
      }
    }
    return null;
  }
  copySectionJson(json: any) {
    let data = JSON.stringify(json);
    this.clipboard.copy(data);
    // alert('Copied to clipboard');
  }
  copyPageJson(json: any) {
    let data = JSON.stringify(json);
    this.clipboard.copy(data);
    // alert('Copied to clipboard');
  }

  setData(response: any) {
    if (response.moduleName.includes('footer')) {
      this.dataSharedService.footerData = response.menuData[0].children[1].children[0].children[1].children;
    } else {
      this.dataSharedService.headerData = response.menuData[0].children[1].children[0].children[1].children;
    }
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
}
