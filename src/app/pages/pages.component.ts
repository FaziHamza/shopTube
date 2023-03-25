import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ruleFactory } from '@elite-libs/rules-machine';
import { FormlyFormOptions } from '@ngx-formly/core';
import { BuilderService } from '../services/builder.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private activatedRoute: ActivatedRoute,
    public builderService: BuilderService,
    private cdr: ChangeDetectorRef,) { }
  @Input() resData: any = [];
  @Input() formlyModel: any;
  fields: any = [];
  screenData: any;
  businessRuleData: any;
  @Input() screenName = '';
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params["schema"]) {
        this.screenName = params["schema"];
        this.employeeService.jsonBuilderSetting(params["schema"]).subscribe((res => {
          if (res.length > 0) {
            this.getUIRuleData(res[0].moduleName);
            this.getBusinessRule(this.screenName);
            this.resData = this.jsonParseWithObject(this.jsonStringifyWithObject(res[0].menuData));
            this.uiRuleGetData({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' })
          }
        }));
      }
    });
  }
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
  getUIRuleData(data: any) {
    this.builderService.jsonUIRuleGetData(data).subscribe((getRes => {
      if (getRes.length > 0) {
        this.screenData = [];
        this.screenData = getRes[0];
      } else { }
    }));
  }
  disabledAndEditableSection(data: any) {
    data[0].forEach((a: any) => {
      if (a.formlyType) {
        if (a.formlyType == "input") {
          a.formly[0].fieldGroup.forEach((b: any) => {
            if (b.templateOptions.disabled == true)
              b.templateOptions.disabled = false;
            else if (b.templateOptions.disabled == false)
              b.templateOptions.disabled = true;
          });
        }
      }
    });
  }
  uiRuleGetData(moduleId: any) {
    this.makeFaker();
    this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
    // this.getUIRuleData();
  }
  updateNodes() {
    this.resData = [...this.resData];
  }
  checkConditionUIRule(model: any, currentValue: any) {
    
    this.getUIRule(model, currentValue);
    this.updateNodes();
    this.cdr.detectChanges();
    this.cdr.detach();
  }
  getUIRule(model: any, currentValue: any) {
    try {
      if (this.screenData != undefined) {
        var inputType = this.resData[0].children[1].children[0].children[1].children;
        for (let j = 0; j < inputType.length; j++) {
          for (let index = 0; index < this.screenData.uiData.length; index++) {
            if (inputType[j] == undefined) {
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
                // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
              }
              else {
                const check = this.makeUIJSONForSave(this.screenData, index, inputType, false);
                this.resData[0].children[1].children[0].children[1].children = check;
                // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
              }
            }
            else if (inputType[j].formly != undefined) {
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
                // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
              }
              else {
                const check = this.makeUIJSONForSave(this.screenData, index, inputType, false);
                this.resData[0].children[1].children[0].children[1].children = check;
                this.updateNodes();
                // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
              }
            }
          }
        }
        // this.clickBack();
        // this.cdr.detectChanges();
      }
    } catch (error) {
      console.log(error)
    } finally {
      if (this.screenName) {
        const fishRhyme = ruleFactory(this.businessRuleData);
        console.log(fishRhyme(this.formlyModel));
        this.cdr.detectChanges();
        this.cdr.detach();
      }
    }
  }
  getBusinessRule(screenName: string) {
    if (screenName) {
      this.builderService.jsonBisnessRuleGet(screenName).subscribe((getRes => {
        if (getRes.length > 0) {
          this.businessRuleData = [];
          this.businessRuleData = getRes[0].buisnessRule
        }
      }))
    }
  }
  makeFaker() {

    let dataModelFaker: any = [];
    if (this.resData.length > 0) {
      this.resData.forEach((element: any) => {
        if (element.children != undefined) {
          element.children.forEach((element2: any) => {

            if (element2.children != undefined) {
              element2.children.forEach((according: any) => {
                according.children.forEach((accordingBody: any) => {
                  if (accordingBody.type == 'accordingBody') {
                    accordingBody.children.forEach((V2: any) => {
                      if (V2) {
                        if (V2.formly != undefined) {
                          if (V2.formly[0].type == 'stepper' || V2.formly[0].type == 'dashonicTabs') {
                            V2.children.forEach((step1: any) => {
                              step1.children.forEach((step2: any) => {
                                dataModelFaker[step2.formly[0].fieldGroup[0].key] = this.makeFakerData(step2);
                              });
                            });
                          }
                          else {//input field
                            dataModelFaker[V2.key] = this.makeFakerData(V2);
                          }
                        } else if (V2.mainDashonicTabsConfig) {
                          V2.children.forEach((element: any) => {
                            element.children.forEach((element2: any) => {
                              if (element2.chartCardConfig) {
                                if (element2.chartCardConfig.length > 0) {
                                  if (element2.formly) {
                                    if (element2.formly[0].fieldGroup) {
                                      dataModelFaker[element2.formly[0].fieldGroup[0].key] = this.makeFakerData(element2);
                                    }
                                  }
                                }
                              }
                            });
                          });
                        }
                      }
                    });
                  }
                });
              }
              );
            }
          });
        }
      });
    }
    this.formlyModel = dataModelFaker;
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
    if (V2.formly[0].fieldGroup[0].templateOptions) {
      let modelFaker: any;
      if (V2.formly[0].fieldGroup[0].templateOptions.type) {
        if (V2.formly[0].fieldGroup[0].type == 'input') {
          // modelFaker = faker.name.firstName()
        }
        else if (V2.formly[0].fieldGroup[0].type == 'textarea') {
          // modelFaker = faker.lorem.paragraph()
        }
        else if (V2.formly[0].fieldGroup[0].type == 'inputGroupGrid') {
          // modelFaker = faker.name.firstName()
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'password') {
          // modelFaker = faker.name.firstName()
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'tel') {
          // modelFaker = faker.phone.number()
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'date') {
          // modelFaker = faker.date.between('01/01/2001', '01/01/2001');
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'email') {
          // modelFaker = faker.internet.email()
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'checkbox') {
          // modelFaker = faker.datatype.boolean()
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'radio') {
          // modelFaker = faker.datatype.boolean()
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'number') {
          // modelFaker = 1
          // modelFaker = faker.datatype.number(10)
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'decimal') {
          // modelFaker = 0.0
          // modelFaker = faker.datatype.float({ min: 10, max: 100, precision: 0.001 })
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'month') {
          // modelFaker = faker.date.month({ abbr: true, context: true })
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'datetime-local') {
          // modelFaker = faker.datatype.datetime(1893456000000)
        }
        else if (V2.formly[0].fieldGroup[0].templateOptions.type == 'color') {
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
          if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && currentValue) {
            inputType[l].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
          } else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue) {
            inputType[l].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
          }
        } else if (inputType[l].type == "alert" || inputType[l].type == "header" || inputType[l].type == "paragraph" ||
          inputType[l].type == "nzTag" || inputType[l].type == "card" || inputType[l].type == "simpleCardWithHeaderBodyFooter" ||
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
}
