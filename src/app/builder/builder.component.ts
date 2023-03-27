import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { GenaricFeild } from '../models/genaricFeild.modal';
import { Guid } from '../models/guid';
import { TreeNode } from '../models/treeNode';
import { BuilderService } from '../services/builder.service';
import { DataSharedService } from '../services/data-shared.service';
import { actionTypeFeild, formFeildData } from './configurations/configuration.modal';
import { htmlTabsData } from './ControlList';
import { BuilderClickButtonService } from './service/builderClickButton.service';
import { ruleFactory } from '@elite-libs/rules-machine';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  public editorOptions: JsonEditorOptions;

  makeOptions = () => new JsonEditorOptions();


  size: NzButtonSize = 'large';
  selectModuleName: any;
  applicationBuilder: any = [];
  moduleList: any = [];
  selectApplicationName: any;
  IslayerVisible: boolean = true;
  IsjsonEditorVisible: boolean = false;
  sizes = [20, 80, 0];
  IsConfigurationVisible: boolean = true;
  IsShowConfig: boolean = false;
  htmlTabsData: any = [];
  nodes: any = [];
  screenModule: any;
  screenName: any;
  screenId: any = 0;
  screenPage: boolean = false;
  fieldData: GenaricFeild;
  searchControllData: any = [];
  selectedNode: TreeNode;
  selectdParentNode: TreeNode;
  formModalData: any;
  isActiveShow: string;
  filterMenuData: any = [];

  isVisible: string;
  showSectionOnly: boolean = false;
  columnData: any = [];
  controlListvisible = false;
  requestSubscription: Subscription;




  constructor(public builderService: BuilderService,
    private formBuilder: FormBuilder,
    private toastr: NzMessageService,
    private cdr: ChangeDetectorRef,
    private clickButtonService: BuilderClickButtonService, public dataSharedService: DataSharedService) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    // document.getElementsByTagName("body")[0].setAttribute("data-sidebar-size", "sm");
    this.clearChildNode();
    // this.jsonBuilderMain().subscribe((res => {

    //   this.nodes = res[0].menuData;
    // }));
  }
  controlListClose(): void {
    this.controlListvisible = false;
  }
  controlListOpen(): void {
    this.controlListvisible = true;
  }
  ngOnInit(): void {

    this.jsonModuleSetting();
    this.loadApplications();
    document.getElementsByTagName("body")[0].setAttribute("data-sidebar-size", "sm");
    if (this.dataSharedService.screenName) {
      this.getFormLayers(this.dataSharedService.screenName);
    }
    this.htmlTabsData = htmlTabsData;
  }
  jsonModuleSetting() {
    this.requestSubscription = this.builderService.jsonScreenModuleList().subscribe({
      next: (res) => {
        this.screenModule = res;
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });


  }
  loadApplications() {
    this.requestSubscription = this.builderService.jsonApplicationBuilder().subscribe({
      next: (res) => {
        this.applicationBuilder = res;
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  };
  getDataFromApi(name: any, apiType: any) {
    if (apiType == "application") {
      this.selectModuleName = "";
      this.applicationBuilder = this.applicationBuilder;
      this.requestSubscription = this.builderService.getjsonModuleModuleListByapplicationName(name).subscribe({
        next: (res) => {
          this.moduleList = res;
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      });
    }
  }
  LayerShow() {
    if (this.IslayerVisible)
      this.IslayerVisible = false;
    else

      this.IslayerVisible = true;
    this.IsjsonEditorVisible = false;
    this.applySize();

  }

  JsonEditorShow() {

    this.IslayerVisible = false;
    this.IsjsonEditorVisible = true;
    this.IsShowConfig = true;
    this.applySize();
  }
  saveJson() {
    this.highlightSelect(this.selectedNode.id, false);
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    var newData = this.jsonParse(this.jsonStringifyWithObject(this.nodes));
    var data =
    {
      "moduleName": this.screenName,
      "menuData": newData,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
    };
    this.screenId = mainModuleId[0].screenId;
    // if (this.screenId > 0) {

    this.requestSubscription = this.builderService.jsonBuilderSettingV1(this.screenName).subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.requestSubscription = this.builderService.jsonDeleteBuilder(res[0].id).subscribe({
            next: (res) => {
              this.requestSubscription = this.builderService.jsonSaveBuilder(data).subscribe({
                next: (res) => {
                  alert("Data Save");
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            },
            error: (err) => {
              console.error(err); // Log the error to the console
              this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
            }
          })
        } else {
          this.requestSubscription = this.builderService.jsonSaveBuilder(data).subscribe({
            next: (res) => {
              alert("Data Save");
            },
            error: (err) => {
              console.error(err); // Log the error to the console
              this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
            }
          })
        }
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }

    })
  }
  expandedKeys: any;
  getFormLayers(data: any) {

    this.screenName = data;
    this.requestSubscription = this.builderService.jsonBuilderSettingV1(data).subscribe({
      next: (res) => {
        if (res.length > 0) {
          if (res[0].menuData[0].children[1]) {
            this.screenId = res[0].id;
            // this.nodes = res[0].menuData;
            this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(res[0].menuData));

            // this.uiRuleGetData(res[0].moduleId);
            // this.uiGridRuleGetData(res[0].moduleId);
          }
          else {
            this.screenId = res[0].id;
            this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(res[0].menuData));
            // this.uiRuleGetData(res[0].moduleId);
            // this.uiGridRuleGetData(res[0].moduleId);
            // this.updateNodes();
          }

        }
        else {
          this.screenId = 0;
          this.clearChildNode();
          // this.updateNodes();
        }
        this.formModalData = {};
        this.getUIRuleData(true);
        this.getBusinessRule();
        this.expandedKeys = this.nodes.map((node: any) => node.key);
        this.uiRuleGetData(this.screenName);
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    }
    );
    this.screenPage = true;

  }
  clearChildNode() {
    if (this.screenPage) {
      const newNode = [{
        id: 'page',
        title: 'page',
        type: "page",
        footer: false,
        header: false,
        expanded: false,
        isNextChild: true,
        children: [
        ],
      } as TreeNode];
      this.nodes = newNode;
      this.selectedNode = newNode[0];
      this.addControlToJson('pageHeader', null);
      this.addControlToJson('pageBody', null);
      this.selectedNode = this.sectionBageBody;
      this.addControlToJson('according', null);
      this.selectedNode = this.sectionAccording;
      this.addControlToJson('accordingHeader', null);
      this.addControlToJson('accordingBody', null);
      this.addControlToJson('accordingFooter', null);
      this.selectedNode = this.sectionAccorBody;
      this.addControlToJson('text', this.textJsonObj);
      this.selectedNode = newNode[0];
      this.addControlToJson('pageFooter', null);
      this.updateNodes();
    }
  }
  textJsonObj = {
    parameter: "input",
    icon: "uil uil-text",
    label: "Input",
    type: 'input',
    fieldType: 'input',
    configType: 'input',
  };
  downloadJson() {

    var currentData = this.jsonParse(this.jsonStringifyWithObject(this.nodes));
    // JSON.parse(
    //   JSON.stringify(this.nodes, function (key, value) {
    //     if (typeof value == 'function') {
    //       return value.toString();
    //     } else {
    //       return value;
    //     }
    //   }) || '{}');

    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    var data =
    {
      "moduleName": this.screenName,
      "menuData": currentData,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
    };

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  selectForDropdown: any;
  sectionAccording: TreeNode;
  sectionBageBody: TreeNode;
  sectionAccorBody: TreeNode;
  stepperAdd: TreeNode;
  tabsAdd: TreeNode;
  stepperChild: TreeNode;
  tabsChild: TreeNode;
  screenData: any;
  businessRuleData: any;
  formlyModel: any;
  faker: boolean = false;
  makeFaker() {

    let dataModelFaker: any = [];
    if (this.faker == true) {


    }
    if (this.nodes.length > 0) {
      this.nodes.forEach((element: any) => {
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
                            dataModelFaker[V2.formly[0].fieldGroup[0].key] = this.makeFakerData(V2);
                          }
                        } else if (V2.mainDashonicTabsConfig) {
                          V2.children.forEach((element: any) => {
                            element.children.forEach((element2: any) => {
                              if (element2.formly) {
                                if (element2.formly[0].fieldGroup) {
                                  dataModelFaker[element2.formly[0].fieldGroup[0].key] = this.makeFakerData(element2);
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
  uiRuleGetData(moduleId: any) {
    this.makeFaker();
    this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
    // this.getUIRuleData();
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
  checkConditionUIRule(model: any, currentValue: any) {
    this.getUIRule(model, currentValue);
    this.cdr.detectChanges();
    // this.cdr.detach();
  }
  getUIRuleData(data: any) {
    this.requestSubscription = this.builderService.jsonUIRuleGetData(this.screenName).subscribe({
      next: (getRes) => {
        if (getRes.length > 0) {
          this.screenData = getRes[0];
        } else {
        }
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }

    });
  }
  getUIRule(model: any, currentValue: any) {
    try {
      if (this.screenData != undefined) {
        var inputType = this.nodes[0].children[1].children[0].children[1].children;
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
              this.nodes[0].children[1].children[0].children[1].children = check;
              this.updateNodes();
              this.updateFormlyModel();
              // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
            }
            else {
              const check = this.makeUIJSONForSave(this.screenData, index, inputType, false);
              this.nodes[0].children[1].children[0].children[1].children = check;
              this.updateNodes();
              this.updateFormlyModel();
              // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
            }
          }
        }
      } else {
        this.updateFormlyModel();
        // Object.assign([],this.formlyModel)
        // this.updateNodes();
        // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
      }
    } catch (error) {
      console.log(error)
    } finally {
      if (this.businessRuleData && this.businessRuleData.length > 0) {
        const fishRhyme = ruleFactory(this.businessRuleData);
        console.log(fishRhyme(this.formlyModel));
        // this.cdr.detectChanges();

      }
    }
  }
  updateFormlyModel() {
    this.formlyModel = Object.assign({}, this.formlyModel)
  }
  getBusinessRule() {
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    if (mainModuleId.length > 0) {
      this.requestSubscription = this.builderService.jsonBisnessRuleGet(mainModuleId[0].screenId).subscribe({
        next: (getRes) => {
          if (getRes.length > 0) {
            this.businessRuleData = [];
            this.businessRuleData = getRes[0].buisnessRule
          } else {
            this.businessRuleData = [];
          }
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      })
    }
  }
  lastFormlyModelValue: string;
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
            inputType[l].formly[0].fieldGroup[0].defaultValue = this.screenData.uiData[index].targetCondition[k].inputJsonData.defaultValue;
          } else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue) {
            inputType[l].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
            inputType[l].formly[0].fieldGroup[0].defaultValue = this.screenData.uiData[index].targetCondition[k].inputOldJsonData.defaultValue;
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

  addControlToJson(value: string, data?: any) {

    if (value == "stepperMain" || value == "tabsMain" || value == "mainDashonicTabs" || value == "kanban") {
      this.selectForDropdown = this.selectedNode;
    }
    let node = this.selectedNode;
    // this.IsShowConfig = true;
    if (value == 'page') {
      const newNode = {
        id: 'page_' + Guid.newGuid(),
        key: "pages_" + Guid.newGuid(),
        title: 'Page',
        type: "page",
        footer: false,
        header: false,
        expanded: true,
        screenVariables: [
          {
            variableName: '',
            type: '',
            value: ''
          }
        ],
        highLight: false,
        isNextChild: true,
        formly: [
          {
            key: "pages_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'pageHeader') {
      const newNode = {
        id: 'pageHeader_' + Guid.newGuid(),
        key: "pageHeader_" + Guid.newGuid(),
        title: 'Page Header',
        type: "pageHeader",
        headingSize: "text-xl",
        footer: false,
        header: true,
        expanded: true,
        isBordered: true,
        highLight: false,
        labelPosition: 'text-left',
        alertPosition: 'topHeader',
        isNextChild: true,
        formly: [
          {
            key: "pageHeader_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'pageBody') {
      const newNode = {
        id: 'pageBody_' + Guid.newGuid(),
        key: "pageBody_" + Guid.newGuid(),
        title: 'Page Body',
        type: "pageBody",
        footer: false,
        header: false,
        expanded: true,
        highLight: false,
        isNextChild: true,
        formly: [
          {
            key: "pageBody_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.sectionBageBody = newNode;
      this.addNode(node, newNode);
    }
    else if (value == 'pageFooter') {
      const newNode = {
        id: 'pageFooter_' + Guid.newGuid(),
        key: "pageFooter_" + Guid.newGuid(),

        title: 'Page Footer',
        type: "pageFooter",
        footer: false,
        header: false,
        expanded: true,
        highLight: false,
        isNextChild: true,
        formly: [
          {
            key: "pageFooter_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'according') {
      const newNode = {
        id: 'according_' + Guid.newGuid(),
        key: "according_" + Guid.newGuid(),
        title: 'Section_1',
        type: "according",
        className: "w-full",
        sectionClassName: "",
        footer: false,
        header: false,
        expanded: true,
        sectionDisabled: "editable",
        labelPosition: "text-left",
        highLight: false,
        isNextChild: true,
        repeatable: false,
        isBordered: true,
        size: 'default',
        status: '',
        formly: [
          {
            key: "according_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.sectionAccording = newNode;
      this.addNode(node, newNode);
    }
    else if (value == 'accordingHeader') {
      const newNode = {
        id: 'accordingHeader_' + Guid.newGuid(),
        key: "accordingHeader_" + Guid.newGuid(),
        title: 'Header',
        type: "accordingHeader",
        footer: false,
        headingSize: "",
        header: true,
        expanded: false,
        highLight: false,
        labelPosition: "text-left",
        isNextChild: true,
        backGroundColor: "#FFFFFF",
        textColor: "#000000",
        formly: [
          {
            key: "accordingHeader_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'accordingBody') {
      const newNode = {
        id: 'accordingBody_' + Guid.newGuid(),
        key: "accordingBody_" + Guid.newGuid(),
        title: 'Body',
        type: "accordingBody",
        footer: false,
        header: false,
        expanded: true,
        highLight: false,
        isNextChild: true,
        formly: [
          {
            key: "accordingBody_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.sectionAccorBody = newNode;
      this.addNode(node, newNode);
    }
    else if (value == 'accordingFooter') {
      const newNode = {
        id: 'accordingFooter_' + Guid.newGuid(),
        title: 'Footer',
        type: "accordingFooter",
        key: "accordingFooter_" + Guid.newGuid(),
        footer: false,
        header: false,
        expanded: true,
        highLight: false,
        isNextChild: true,
        formly: [
          {
            key: "accordingFooter_" + Guid.newGuid(),
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (data?.parameter == 'input') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        // key: data?.label + Guid.newGuid(),
        title: data?.label,
        expanded: true,
        type: data?.configType,
        className: 'w-1/3 px-1 py-1',
        // type: data?.type,
        formlyType: data?.parameter,
        formly: [
          {
            fieldGroup: [
              {
                key: data?.configType + Guid.newGuid(),
                type: data?.type,
                defaultValue: "",
                focus: false,
                wrappers: this.getLastNodeWrapper("wrappers"),
                props: {
                  multiple: true,
                  className: 'w-1/3 px-1 py-1',
                  attributes: {
                    autocomplete: 'off',
                  },
                  config: {
                    addonLeft: '',
                    addonRight: '',
                    addonLeftIcon: '',
                    addonrightIcon: '',
                    status: '',
                    size: 'default',
                    border: false,
                    firstBtnText: 'Now',
                    secondBtnText: 'ok',
                    minuteStep: 1,
                    secondStep: 1,
                    hoursStep: 1,
                    use12Hours: false,
                    icon: 'close',
                    allowClear: false,
                    step: 1,
                    serveSearch: false,
                    showArrow: false,
                    showSearch: false,
                    format: 'dd-MM-yyyy',
                    optionHieght: 30,
                    optionHoverSize: 10,
                    suffixicon: '',
                    prefixicon: '',
                    wrapper: '',
                    floatFieldClass: '',
                    floatLabelClass: '',
                  },
                  maxLength: 5000,
                  minLength: 1,
                  type: data?.fieldType,
                  labelPosition: "text-left",
                  titleIcon: "",
                  label: data?.label,
                  placeholder: data?.label,
                  tooltip: "",
                  maskString: data?.maskString,
                  // sufix: 'INV ',
                  maskLabel: data?.maskLabel,
                  disabled: this.getLastNodeWrapper("disabled"),
                  readonly: false,
                  hidden: false,
                  options: this.makeFormlyOptions(data?.options),
                  keyup: (model: any) => {

                    let currentVal = model.formControl.value;
                    this.formlyModel[model.key] = model.formControl.value;
                    this.checkConditionUIRule(model, currentVal);
                  }
                },
                hideExpression: false,
              },
            ]
          },
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
      // this.makeFaker();
    }
    else if (value == "buttonGroup") {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'buttonGroup',
        type: "buttonGroup",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        className: "w-11/12",
        key: "buttongroup_" + Guid.newGuid(),
        btngroupformat: "text-left",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'insertButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: "insert" + Guid.newGuid(),
        hideExpression: false,
        title: 'insert_1',
        type: "button",
        actionType: "insert",
        highLight: false,
        isNextChild: false,
        className: "w-1/3",
        color: "bg-blue-600",
        onhover: "hover:bg-black",
        btnIcon: "upload",
        tooltip: "",
        format: "text-left",
        disabled: false,
        nzDanger: false,
        nzBlock: false,
        nzType: "Primary",
        nzSize: "large",
        nzShape: 'default',
        nzLoading: false,
        nzGhost: false,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'dropdownButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'dropdownButton_1',
        hideExpression: false,
        tooltip: "",
        key: "button" + Guid.newGuid(),
        type: "dropdownButton",
        highLight: false,
        isNextChild: false,
        className: "w-1/3",
        color: "bg-green-600",
        onhover: "hover:bg-green-400",
        btnIcon: "down",
        format: "text-left",
        disabled: false,
        nzDanger: false,
        nzBlock: false,
        nzSize: "default",
        nzShape: 'default',
        trigger: 'hover',
        placement: 'bottomLeft',
        visible: true,
        clickHide: false,
        nzLoading: false,
        nzGhost: false,
        dropdownOptions: [
          {
            label: "Option 1",
            link: "1",
          },
          {
            label: "Option 2",
            link: "2",
          },
          {
            label: "Option 3",
            link: "3",
          },
          {
            label: "Option 4",
            link: "4",
          },
        ],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'updateButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: "update" + Guid.newGuid(),
        title: 'update_1',
        type: "button",
        hideExpression: false,
        tooltip: "",
        highLight: false,
        isNextChild: false,
        actionType: "update",
        className: "w-1/3",
        color: "bg-blue-200",
        onhover: "hover:bg-blue-200",
        btnIcon: "redo",
        format: "text-left",
        btnDisables: false,
        nzDanger: false,
        nzBlock: false,
        nzType: "Primary",
        nzSize: "default",
        nzShape: 'default',
        nzLoading: false,
        nzGhost: false,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'deleteButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        hideExpression: false,
        tooltip: "",
        key: "delete" + Guid.newGuid(),
        title: 'delete_1',
        type: "button",
        highLight: false,
        isNextChild: false,
        actionType: "delete",
        className: "w-1/3",
        color: "bg-yellow-600",
        onhover: "hover:bg-yellow-400",
        btnIcon: "delete",
        format: "text-left",
        btnDisables: false,
        nzDanger: false,
        nzBlock: false,
        nzType: "primary",
        nzSize: "large",
        nzShape: 'default',
        nzLoading: false,
        nzGhost: false,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'cardWithComponents') {
      const newNode = {
        id: 'cardWithComponents_' + Guid.newGuid(),
        className: 'w-full',
        hideExpression: false,
        tooltip: "",
        key: "cardWithComponents" + Guid.newGuid(),
        title: 'Card With Components',
        type: "cardWithComponents",
        highLight: false,
        isNextChild: true,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'switch') {

      const newNode = {
        id: 'common_' + Guid.newGuid(),
        type: "switch",
        highLight: false,
        isNextChild: false,
        className: "w-1/2",
        hideExpression: false,
        tooltip: "",
        key: "switch" + Guid.newGuid(),
        switchPosition: "left",
        title: "Switch",
        switchType: "defaultSwitch",
        size: 'default',
        checkedChildren: '',
        unCheckedChildren: '',
        disabled: false,
        loading: false,
        control: false,
        model: false,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'imageUpload') {
      const newNode = {
        id: 'imageUpload_' + Guid.newGuid(),
        key: "imageUpload_" + Guid.newGuid(),
        type: "imageUpload",
        highLight: false,
        isNextChild: false,
        className: "w-1/2",
        title: "Image Upload",
        imageClass: "",
        alt: "",
        source: "https://cdn.pixabay.com/photo/2016/04/04/14/12/monitor-1307227__340.jpg",
        imagHieght: 200,
        imageWidth: 200,
        base64Image: "",
        hideExpression: false,
        tooltip: "",
        imagePreview: true,
        keyboardKey: true,
        zoom: 1.5,
        rotate: 0,
        zIndex: 1000,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'progressBar') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'progressBar',
        type: "progressBar",
        highLight: false,
        isNextChild: false,
        className: "w-1/2",
        hideExpression: false,
        tooltip: "",
        key: "progressBar" + Guid.newGuid(),
        progressBarType: 'line',
        percent: 30,
        showInfo: true,
        status: 'success',
        strokeLineCap: 'round',
        success: 30,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'video') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: "video" + Guid.newGuid(),
        title: 'Play Video Online',
        type: "video",
        highLight: false,
        className: "w-1/2",
        hideExpression: false,
        isNextChild: false,
        tooltip: "",
        videoRatio: "ratio ratio-1x1",
        videoSrc: "https://www.youtube.com/embed/1y_kfWUCFDQ",
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'audio') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        title: "Audio Example",
        type: "audio",
        highLight: false,
        className: "w-1/2",
        hideExpression: false,
        isNextChild: false,
        tooltip: "",
        audioSrc: "https://pagalfree.com/musics/128-Rasiya%20-%20Brahmastra%20128%20Kbps.mp3",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'carouselCrossfade') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        title: 'carouselCrossfade_1',
        type: "carouselCrossfade",
        highLight: false,
        isNextChild: false,
        className: "w-1/2",
        hideExpression: false,
        tooltip: "",
        effect: "scrollx",
        dotPosition: "bottom",
        autoPlay: true,
        autolPlaySpeed: 3000,
        showDots: true,
        enableSwipe: true,
        carousalConfig: [
          {
            img: "assets/images/small/img-1.jpg",
          },
          {
            img: "assets/images/small/img-2.jpg",
          },
          {
            img: "assets/images/small/img-3.jpg",
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'tuiCalender') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        title: 'calender_1',
        type: "tuiCalender",
        className: "w-10/12",
        hideExpression: false,
        highLight: false,
        isNextChild: false,
        tooltip: "",
        viewType: "month",
        disabled: false,
        options: [
          {
            id: 'cal1',
            name: 'Personal',
            "bgColor": '#bbdc00',
          },
          {
            id: 'cal2',
            name: 'Work',
            bgColor: '#ffbb3b',
          },
          {
            id: 'cal2',
            name: 'Work Tonight',
            bgColor: 'black',
          },
        ],


        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'sharedMessagesChart') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        title: 'Task  Widget_1',
        type: "sharedMessagesChart",
        className: "w-1/2",
        hideExpression: false,
        highLight: false,
        isNextChild: false,

        tooltip: "",
        labelIcon: "uil-shutter-alt",
        heading: "Latest to do's",
        headingIcon: "fas fa-exclamation-triangle",
        headingColor: "text-warning",
        subHeading: "Latest finished to do's",
        subHeadingIcon: "fa fa-check",
        subheadingColor: 'text-success',
        link: '',
        sharedMessagesConfig: [
          {
            message: "Bill's place for a.",
            dateAndTime: "2022-11-05 04:21:01",
            icon: "uil-pen",
            icon1: "uil-times",
          }
        ],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'alert') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'alert_1',
        type: "alert",
        className: "w-full",
        hideExpression: false,
        key: "alert_" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        tooltip: "",
        alertColor: "bg-blue-200",
        text: "This is an alert—check it out!",
        icon: "",
        alertType: 'success',
        banner: false,
        showIcon: false,
        closeable: false,
        iconType: '',
        description: '',
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'simpleCardWithHeaderBodyFooter') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: "simpleCard_" + Guid.newGuid(),
        title: 'simpleCard_1',
        type: "simpleCardWithHeaderBodyFooter",
        hideExpression: false,
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        tooltip: "",
        textAlign: "text-left",
        textSize: "h1",
        headerText: "Card header",
        bodyText: "card body",
        footerText: "card footer",
        link: '',
        height: '100p',
        borderless: false,
        extra: '',
        hover: false,
        loading: false,
        nztype: 'default',
        size: 'default',
        imageSrc: '',
        imageAlt: '',

        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'tabs') {
      const newNode = {
        id: 'tabs_' + Guid.newGuid(),
        key: 'tabs_' + Guid.newGuid(),
        title: 'Tabs',
        type: "tabs",
        className: "w-full",
        isNextChild: true,
        highLight: false,
        hideExpression: false,
        disabled: false,
        tooltip: '',
        icon: 'star',
        children: [
        ],
      } as TreeNode;
      this.tabsChild = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'mainTab') {
      const newNode = {
        id: 'mainTab_' + Guid.newGuid(),
        key: 'mainTab_' + Guid.newGuid(),
        title: 'Main Tab',
        type: "mainTab",
        isNextChild: true,
        highLight: false,
        className: "w-full",
        tooltip: "",
        hideExpression: false,
        selectedIndex: 0,
        animated: true,
        size: 'default',
        tabPosition: 'top',
        tabType: 'line',
        hideTabs: false,
        nodes: "3",
        centerd: false,
        children: [
        ],
      } as TreeNode;
      this.tabsAdd = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'mainStep') {
      const newNode = {
        id: 'mainStep_' + Guid.newGuid(),
        key: 'mainStep_' + Guid.newGuid(),
        title: 'Main Step',
        type: "mainStep",
        isNextChild: true,
        highLight: false,
        className: "w-full",
        tooltip: "",
        hideExpression: false,
        stepperType: 'default',
        selectedIndex: 0,
        direction: 'horizontal',
        placement: 'horizontal',
        size: 'default',
        status: 'process',
        disabled: false,
        nodes: "3",
        children: [
        ],
      } as TreeNode;
      this.tabsAdd = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'step') {
      const newNode = {
        id: 'step_' + Guid.newGuid(),
        key: 'step_' + Guid.newGuid(),
        title: 'Step',
        type: "step",
        tooltip: "",
        isNextChild: true,
        highLight: false,
        icon: 'star',
        className: "w-full",
        disabled: false,
        description: "description",
        status: '',
        subtitle: '',
        percentage: '',
        children: [
        ],
      } as TreeNode;
      this.tabsChild = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'kanban') {
      const newNode = {
        id: 'kanban' + Guid.newGuid(),
        title: 'kanban',
        type: "kanban",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        tooltip: "",

        key: "kanban" + Guid.newGuid(),
        className: "w-1/2",
        text: "Kanban Board",
        nodes: "3",
        kambanChildren: [],
        children: [
        ],

      } as TreeNode;
      this.tabsAdd = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'kanbanTask') {
      const newNode = {
        id: 'kanbanTask' + Guid.newGuid(),
        title: 'kanbanTask',
        type: "kanbanTask",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",

        key: "kanbanTask" + Guid.newGuid(),
        className: "w-1/2",
        text: "KanbanTask",
        // title: "Authentication Page Design",
        date: "14 Oct, 2019",
        content: "In enim justo rhoncus ut",
        users: [
          {
            "name": "Emily Surface"
          }
        ],
        status: "open",
        variant: "bg-primary",
        children: [
        ],

      } as TreeNode;
      this.tabsChild = newNode;
      this.addNode(node, newNode);
    }
    else if (value == 'linkbutton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'linkbutton_1',
        type: "linkButton",
        highLight: false,
        isNextChild: false,
        className: "w-1/4",
        key: "button_" + Guid.newGuid(),
        hideExpression: false,
        tooltip: "",
        color: "bg-blue-200",
        onhover: "hover:bg-blue-200",
        target: "_blank",
        btnType: "_blank",
        href: "",
        format: "text-left",
        btnIcon: "",
        nzSize: "default",
        nzShape: 'default',
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'simplecard') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "card" + '_1',
        type: "card",
        className: "w-1/4",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        icon: "uil uil-list-ul",
        name: "Total Tasks",
        total: "21",
        key: "simplecard_" + Guid.newGuid(),
        link: "",

        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'chartcard') {
      const newNode = {
        id: "common" + Guid.newGuid(),
        title: "chart" + '_1',
        type: "chart",
        className: "w-1/2",
        key: "chart" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        "link": "",
        chartFilterData: [],
        section: [
          {
            "filtertype": "Monthly",
            "price": "$46.34k",
            "data": [
              10,
              20,
              15,
              40,
              20,
              50,
              70,
              60,
              90,
              70,
              110
            ],
            "colors": [
              "#E10E0E",
            ],
            "filterData": [
              {
                "heading": "TOTAL REVENUE",
                "price": "$46.34k",
                "subheading": "Earning this month",
                "defaultfilter": "Monthly",
                "refundsChart": {
                  "series": [
                    {
                      "name": "Series A",
                      "data": [
                        10,
                        20,
                        15,
                        40,
                        20,
                        50,
                        70,
                        60,
                        90,
                        70,
                        110
                      ]
                    }
                  ],
                  "chart": {
                    "height": 50,
                    "type": "bar",
                    "sparkline": {
                      "enabled": true
                    },
                    "toolbar": {
                      "show": false
                    }
                  },
                  "dataLabels": {
                    "enabled": false
                  },
                  "stroke": {
                    "curve": "smooth",
                    "width": 2
                  },
                  "fill": {
                    "type": "gradient",
                    "gradient": {
                      "shadeIntensity": 1,
                      "inverseColors": false,
                      "opacityFrom": 0.45,
                      "opacityTo": 0.05,
                      "stops": [
                        50,
                        100,
                        100,
                        100
                      ]
                    }
                  },
                  "colors": [
                    "#E10E0E",
                  ]
                },
                "filters": [
                  {
                    "filtertype": "Monthly"
                  },
                  {
                    "filtertype": "Yearly"
                  },
                  {
                    "filtertype": "Weekly"
                  }
                ]
              },
            ]
          },
        ],

        // formly: [
        //   {
        //     key: "inputfeildGen",
        //     type: "input",
        //     props: {
        //       label: "Genaric Added",
        // tooltip: {"content": ""},
        //     },
        //   }
        // ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }

    else if (value == 'sectionCard') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "Section_Chart" + '_1',
        type: "sectionCard",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        "link": "",
        "belowpercentage": 1,
        "belowpercentageColor": "danger",
        "key": "sectionCard_" + Guid.newGuid(),
        "limit": 1,
        section: [{
          "icon": "fa-user",
          "name": "Users",
          "total": "2.2 k",
          "percentage": "1.2",
        }],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'widgetSectionCard') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "Widget_Section_Card" + '_1',
        type: "widgetSectionCard",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        "link": "",
        "limit": 1,
        "belowpercentage": 1,
        "belowpercentageColor": "danger",
        "key": "widgetSectionCard_" + Guid.newGuid(),

        section: [
          {
            "name": "New Visitors",
            "total": "1.2 k ",
            "percentage": "0.2",
            "data": [
              21,
              65,
              32,
              80,
              42,
              25, 90, 80, 10
            ],
            "Chart": {
              "series": [
                {
                  "name": "New Visitors",
                  "data": [
                    21,
                    65,
                    32,
                    80,
                    42,
                    25, 90, 80, 10
                  ]
                }
              ],
              "chart": {
                "height": 52,
                "type": "area",
                "sparkline": {
                  "enabled": true
                },
                "toolbar": {
                  "show": false
                }
              },
              "dataLabels": {
                "enabled": false
              },
              "stroke": {
                "curve": "smooth",
                "width": 2
              },
              "colors": [
                "#038edc"
              ],
              "fill": {
                "type": "gradient",
                "gradient": {
                  "shadeIntensity": 1,
                  "inverseColors": false,
                  "opacityFrom": 0.45,
                  "opacityTo": 0.05,
                  "stops": [
                    20,
                    100,
                    100,
                    100
                  ]
                }
              },
              "tooltip": {
                "fixed": {
                  "enabled": false
                },
                "x": {
                  "show": false
                },
                "marker": {
                  "show": false
                }
              }
            }
          }],

        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'donutChart') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "donut_Chart" + '_1',
        type: "donutChart",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        hideExpression: false,

        tooltip: "",
        link: "",
        defaultColor: "bg-primary",
        key: "donutChart_" + Guid.newGuid(),
        section: [{
          "chart": {
            "height": 245,
            "type": "donut"
          },
          plotOptions: {
            pie: {
              donut: {
                size: "70%"
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          series: [
            60,
            35,
            19,
          ],
          labels: [
            "Social",
            "Direct",
            "Others",
          ],
          colors: [
            "#038edc",
            "#f5f6f8",
            "#5fd0f3",
          ],
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            verticalAlign: "middle",
            floating: false,
            fontSize: "14px",
            offsetX: 0
          }
        }],

        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'browserChart') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "Browser_Chart" + '_1',
        type: "browserCard",
        link: "",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        hideExpression: false,

        tooltip: "",
        icon: "fa-chrome",
        limit: 1,
        belowpercentage: 100,
        belowpercentageColor: "bg-danger",
        key: "browserCard_" + Guid.newGuid(),
        chart:
          [
            {
              name: "Chrome",
              percentage: 82,
              min: "82",
              max: "100",
              bar: "82%"
            },
          ],

        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'browserCombineChart') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "Browser_CombineChart" + '_1',
        type: "browserCombineChart",
        link: "",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        hideExpression: false,

        tooltip: "",
        icon: "fa-chrome",
        limit: 1,
        belowpercentage: 100,
        belowpercentageColor: "bg-danger",
        key: "browserCard_" + Guid.newGuid(),
        numberofcolumns: "",
        chart:
          [
            {
              name: "Chrome",
              percentage: 82,
              min: "82",
              max: "100",
              bar: "82%"
            },
          ],

        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'donuteSaleChart') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "Sale_Donute_Chart" + '_1',
        type: "donuteSaleChart",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        key: "donuteSaleChart_" + Guid.newGuid(),
        thisTitle: "This Month",
        lastTitle: "Last Month",
        prevTitle: "From previous period",
        thisValue: "$12,582",
        lastValue: "$98,741",
        prevValue: "25.2%",
        growth: "+15%",
        section: [
          {
            chart: {
              height: 130,
              type: "donut"
            },
            dataLabels: {
              enabled: false
            },
            series: [
              44,
              25,
              19
            ],
            labels: [
              "Revenue",
              "Expenses",
              "Profit"
            ],
            colors: [
              "#038edc",
              "#dfe2e6",
              "#5fd0f3"
            ],
            legend: {
              show: false,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: false,
              fontSize: "14px",
              offsetX: 0
            }
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'salesAnalyticschart') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "sales_Analytics_chart" + '_1',
        type: "salesAnalyticschart",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        key: "salesAnalyticschart_" + Guid.newGuid(),
        firstTitle: "Income",
        firstValue: "3.85k",
        secondTitle: "Sales",
        secondValue: "258",
        thirdLabel: "Users",
        thirdValue: "52k",
        link: "",
        section: [{
          chartTitlesValues: [
            {
              value: "3.85k",
            },
            {
              value: "258",
            },
            {
              value: "52k",
            }
          ],
          chart: {
            height: 332,
            type: "line",
            stacked: false,
            offsetY: -5,
            toolbar: {
              show: false
            }
          },
          stroke: {
            width: [
              0,
              0,
              0,
              1
            ],
            curve: "smooth"
          },
          plotOptions: {
            bar: {
              columnWidth: "40%"
            }
          },
          colors: [
            "#5fd0f3",
            "#038edc",
            "#51d28c",
            "#51d28c"
          ],
          series: [
            {
              name: "Income",
              title: "Income",
              value: "3.85k",
              type: "column",
              data: [
                23,
                11,
                22,
                27,
                13,
                22,
                37,
                21,
                44,
                22,
                30
              ]
            },
            {
              name: "Sales",
              title: "Sales",
              value: "258",
              type: "column",
              data: [
                19,
                8,
                26,
                21,
                18,
                36,
                30,
                28,
                40,
                39,
                15
              ]
            },
            {
              name: "Conversation Ratio",
              title: "",
              value: "",
              type: "area",
              data: [
                44,
                55,
                41,
                67,
                22,
                43,
                21,
                41,
                56,
                27,
                43
              ]
            },
            {
              name: "Users",
              title: "Users",
              value: "52k",
              type: "line",
              data: [
                9,
                11,
                13,
                12,
                10,
                8,
                6,
                9,
                14,
                17,
                22
              ]
            }
          ],
          fill: {
            opacity: [
              0.85,
              1,
              0.25,
              1
            ],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [
                0,
                100,
                100,
                100
              ]
            }
          },
          labels: [
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003",
            "09/01/2003",
            "10/01/2003",
            "11/01/2003"
          ],
          markers: {
            "size": 0
          },
          xaxis: {
            "type": "datetime"
          },
          yaxis: {
            title: {
              text: "Sales Analytics",
              style: {
                fontWeight: 500
              }
            }
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: "21 points"
          },
          grid: {
            borderColor: "#f1f1f1",
            padding: {
              bottom: 15
            }
          }
        }],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'heading') {
      const newNode = {
        id: "heading_" + Guid.newGuid(),
        key: "heading_" + Guid.newGuid(),
        title: "Heading" + '_1',
        type: "heading",
        className: "w-full",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        style: "font-weight:bold;",
        textAlign: "text-left",
        color: '#000000',
        headingApi: "",
        text: "Editor.js",
        heading: 3,
        fontstyle: 'font-normal',
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'paragraph') {
      const newNode = {
        id: "paragraph_" + Guid.newGuid(),
        key: "paragraph_" + Guid.newGuid(),
        title: "Paragraph" + '_1',
        type: "paragraph",
        className: "w-full",
        highLight: false,
        isNextChild: false,
        tooltip: "",
        hideExpression: false,
        editable: false,
        color: '',
        fontstyle: 'font-normal',
        text: 'A random paragraph generate when add paragraph componenet',
        editableTooltip: '',
        copyable: false,
        copyTooltips: '',
        ellipsis: false,
        suffix: '',
        disabled: false,
        expandable: false,
        ellipsisRows: 1,
        nztype: 'default',
        beforecopyIcon: '',
        aftercopyIcon: '',
        editableIcon: '',
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'htmlBlock') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "Html Block" + '_1',
        type: "paragraph",
        className: "w-full",
        highLight: false,
        isNextChild: false,
        tooltip: "",
        hideExpression: false,
        key: "htmlBlock_" + Guid.newGuid(),
        style: "font-weight:normal;",
        textAlign: "text-align:left;",
        fontSize: "font-weight:normal;text-align:left;",
        api: "",
        data: {
          text: "Lorem ipsum Hi  sit amet consectetur adipisicing elit. Dolorum minus aliquid earum voluptatum eum quis vero facere, veritatis nisi porro minima sed harum aperiam! Voluptas distinctio consequuntur ipsa enim obcaecati"
        },
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'textEditor') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        key: "textEditor" + Guid.newGuid(),
        title: "Text Editor" + '_1',
        type: "textEditor",
        className: "w-full",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'editor_js') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        key: "editor_js" + Guid.newGuid(),
        title: "editor_js" + '_1',
        type: "editor_js",
        className: "w-full",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'breakTag') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        title: "breakTag" + '_1',
        type: "breakTag",
        className: "w-full",
        highLight: false,
        isNextChild: false,
        tooltip: "",
        hideExpression: false,
        key: "breakTag_" + Guid.newGuid(),
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'multiFileUpload') {
      const newNode = {
        id: "multiFileUpload_" + Guid.newGuid(),
        key: "multiFileUpload_" + Guid.newGuid(),
        title: "multiFileUpload",
        type: "multiFileUpload",
        className: "w-1/2",
        highLight: false,
        isNextChild: false,
        tooltip: "",
        hideExpression: false,
        uploadBtnLabel: "Click here to upload",
        multiple: false,
        disabled: false,
        showDialogueBox: true,
        showUploadlist: true,
        onlyDirectoriesAllow: false,
        uploadLimit: 10,
        size: 30,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'gridList') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "w-full",
        title: 'Grid List' + '_1',
        type: 'gridList',
        link: '',
        key: "gridList_" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tableId: "gridList_" + Guid.newGuid(),
        nzFooter: "This is footer",
        nzTitle: "This is Title",
        nzPaginationPosition: "bottom",
        nzPaginationType: "default",
        nzLoading: false,
        nzFrontPagination: true,
        nzShowPagination: true,
        nzBordered: false,
        showColumnHeader: true,
        noResult: false,
        nzSimple: false,
        nzSize: 'default',
        nzShowSizeChanger: false,
        showCheckbox: true,
        expandable: true,
        fixHeader: false,
        tableScroll: false,
        fixedColumn: false,
        sort: true,
        filter: true,
        tableHeaders: [
          {
            name: 'Id',
            sortOrder: null,
            sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            // listOfFilter: [
            //   { text: 'Joe', value: 'Joe' },
            //   { text: 'Jim', value: 'Jim', byDefault: true }
            // ],
            // filterFn: (list: string[], item: any) => list.some(name => item.name.indexOf(name) !== -1)
          },
          {
            name: 'Name',
            sortOrder: null,
            sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: [
              // { text: 'Joe', value: 'Joe' },
              // { text: 'Jim', value: 'Jim', byDefault: true }
            ],
            filterFn: (list: string[], item: any) => list.some(name => item.name.indexOf(name) !== -1)
          },
          {
            name: 'Age',
            sortOrder: 'descend',
            sortFn: (a: any, b: any) => a.age - b.age,
            sortDirections: ['descend', null],
            listOfFilter: [],
            filterFn: null,
            filterMultiple: false
          },
          {
            name: 'Address',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: any, b: any) => a.address.length - b.address.length,
            filterMultiple: false,
            listOfFilter: [
              { text: 'London', value: 'London' },
              { text: 'Sidney', value: 'Sidney' }
            ],
            filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
          }
        ],
        tableData: [
          {
            id: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 2 years old, living in New York No',
            checked: false,
            expand: false,
            children: [
              {
                id: 1,
                name: 'test',
              },
              {
                id: 2,
                name: 'test2'
              },
            ]
          },
          {
            id: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            description: 'My name is John Brown, I am 2 years old, living in New York No',
            checked: false,
            expand: false
          },
          {
            id: 3,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is John Brown, I am 2 years old, living in New York No',
            checked: false,
            expand: false
          },
          {
            id: 4,
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
            description: 'My name is John Brown, I am 2 years old, living in New York No',
            checked: false,
            expand: false
          }
        ],
        children: []
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'invoiceGrid') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'Grid List' + '_1',
        type: 'invoiceGrid',
        link: '',
        key: "invoiceGrid_" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        className: "w-full",
        pagination: 10,
        filter: false,
        sortable: false,
        tooltip: "",
        delete: true,
        update: false,
        create: false,



        children: [
          {
            "id": "description",
            "label": "description",
            "type": "input",
            "header": "description",
            "name": "description",
            "showColumn": true,
            "filter": false,
            "editorType": false,
            "sortable": false,
            "editor": {
              "type": "text"
            },
            "children": []
          },
          {
            "id": "quantity",
            "label": "quantity",
            "type": "input",
            "header": "quantity",
            "name": "quantity",
            "showColumn": true,
            "filter": false,
            "sortable": false,
            "editorType": false,
            "editor": {
              "type": "text"
            },
            "children": []
          },
          {
            "id": "price",
            "label": "price",
            "type": "input",
            "header": "price",
            "name": "price",
            "showColumn": true,
            "filter": false,
            "sortable": false,
            "editorType": false,
            "editor": {
              "type": "text"
            },
            "children": []
          },
          {
            "id": "amount",
            "label": "amount",
            "type": "input",
            "header": "amount",
            "name": "amount",
            "showColumn": true,
            "filter": false,
            "sortable": false,
            "editorType": false,
            "editor": {
              "type": "text"
            },
            "children": []
          }
        ],
        rowData: [
          {
            id: 1,
            "description": "aa",
            "quantity": 10,
            "price": 10,
            "amount": 100,
          },
          {

            "description": "bb",
            "quantity": 10,
            "price": 10,
            "amount": 100,
          },
          {
            "description": "cc",
            "quantity": 10,
            "price": 10,
            "amount": 100,
          },
          {
            "description": "baby_ruth",
            "quantity": 10,
            "price": 10,
            "amount": 100,
          },
        ],
        columnData: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'column') {
      const newNode = {
        id: "Column " + Math.random().toFixed(3),
        key: "Column " + Math.random().toFixed(3),
        title: 'Column' + '_1',
        type: "input",
        isNextChild: false,
        gridList: [
          {
            header: "Id " + Math.random().toFixed(3),
            name: "id " + Math.random().toFixed(3),
            textArea: ""
          }
        ],
        children: []
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'timeline') {
      const newNode = {
        id: 'timeline_' + Guid.newGuid(),
        key: 'timeline_' + Guid.newGuid(),
        title: 'timeline_1',
        type: "timeline",
        tooltip: "",
        className: "w-full",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        pendingText: "Recording...",
        mainIcon: "loading",
        reverse: false,
        labelText: '',
        mode: 'left',
        data: [
          {
            title: "Timeline Event One",
            dotIcon: 'loading',
            timecolor: 'green',
          },
          {
            title: "Timeline Event two",
            dotIcon: 'down',
            timecolor: 'green',
          },
          {
            title: "Timeline Event three",
            dotIcon: 'loading',
            timecolor: 'green',
          },
          {
            title: "Timeline Event One",
            dotIcon: 'loading',
            timecolor: 'green',
          },
          {
            title: "Timeline Event One",
            dotIcon: 'loading',
            timecolor: 'green',
          },
          {
            title: "Timeline Event One",
            dotIcon: 'loading',
            timecolor: 'green',
          },
          {
            title: "Timeline Event One",
            dotIcon: 'loading',
            timecolor: 'green',
          },
        ],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'fixedDiv') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: "fixedDiv" + Guid.newGuid(),
        title: 'FixedDiv_1',
        type: "fixedDiv",
        tooltip: "",
        isNextChild: true,
        hideExpression: false,
        fixedDivConfig: [
          {
            key: "fixedDiv" + Guid.newGuid(),

          }
        ],
        fixedDivChild: [],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'accordionButton') {
      const newNode = {
        id: 'accordionButton_' + Guid.newGuid(),
        key: 'accordionButton_' + Guid.newGuid(),
        title: 'accordionButton',
        type: "accordionButton",
        highLight: false,
        isNextChild: true,
        className: "w-full",
        hideExpression: false,
        tooltip: "",
        nzBordered: true,
        nzGhost: false,
        nzExpandIconPosition: "left",
        nzDisabled: false,
        nzExpandedIcon: '',
        nzShowArrow: true,
        extra: '',
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'divider') {
      const newNode = {
        className: "w-1/4",
        id: 'common_' + Guid.newGuid(),
        title: 'Divider_1',
        type: "divider",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        tooltip: "",
        text: "Divider",
        key: "divider" + Guid.newGuid(),
        dividerClassName: "w-1/4",
        dividerText: "Divider",
        icon: "plus",
        dashed: false,
        dividerType: "horizontal",
        orientation: "center",
        plain: false,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'toastr') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'toastr_' + Guid.newGuid(),
        title: 'toastr_1',
        type: "toastr",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        toastrType: "success",
        toasterTitle: "Title",
        duration: 3000,
        placement: "topRight",
        closeIcon: "close-circle",
        description: "message",
        animate: true,
        pauseOnHover: true,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'rate') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'rate_' + Guid.newGuid(),
        title: 'rate_1',
        type: "rate",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        clear: true,
        allowHalf: true,
        focus: true,
        icon: 'star',
        showCount: 5,
        disabled: false,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'rangeSlider') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'rangeSlider',
        type: "rangeSlider",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        // sliderType:'simple',
        min: '0',
        max: '2',
        disabled: false,
        showValue: false,
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'invoice') {
      const newNode = {
        id: 'invoice_' + Guid.newGuid(),
        key: 'invoice_' + Guid.newGuid(),
        className: "w-full",
        title: 'Invoice',
        type: "invoice",
        isNextChild: true,
        hideExpression: false,
        tooltip: "",
        invoiceNumberLabel: "Invoice Number",
        poNumber: "PO Number",
        datelabel: "Date Label",
        paymentTermsLabel: "Payment Terms",
        billToLabel: "Bill To ",
        dueDateLabel: "Due Date ",
        shipToLabel: "Ship To",
        notesLabel: "Notes",
        subtotalLabel: "Sub Total",
        dicountLabel: "Dicount",
        shippingLabel: "Shipping",
        taxLabel: "Tax",
        termsLabel: "Terms",
        totalLabel: "Total",
        amountpaidLabel: "Amount Paid",
        balanceDueLabel: "Balance Due",
        invoiceChild: [],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'affix') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Affix',
        type: "affix",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        affixType: 'affix-top',
        margin: 10,
        target: false,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'statistic') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Statistic',
        type: "statistic",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        prefixIcon: "like",
        suffixIcon: "like",
        statisticArray: [
          {
            title: "Active Users",
            value: 1949101,
          },
          {
            title: "Account Balance (CNY)",
            value: 2019.111,
          },
        ],
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'backTop') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Back Top',
        type: "backTop",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        description: "Scroll down to see the bottom-right",
        visibleafter: '',
        target: false,
        duration: '',
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'anchor') {
      const newNode = {
        id: 'anchor_' + Guid.newGuid(),
        key: 'anchor_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Anchor',
        type: "anchor",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        affix: true,
        offSetTop: 5,
        showInkInFixed: true,
        bond: 5,
        target: false,
        options: [
          {
            nzTitle: "Basic demo",
            nzHref: "#components-anchor-demo-basic",
            children: [],
          },
          {
            nzTitle: "Static demo",
            nzHref: "#components-anchor-demo-static",
            children: [],
          },
          {
            nzHref: "#api",
            nzTitle: "API",
            children: [
              {
                nzHref: "#nz-anchor",
                nzTitle: "nz-anchor",
              },
              {
                nzHref: "#nz-link",
                nzTitle: "nz-link",
              },
            ]
          },
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'modal') {
      const newNode = {
        id: 'modal_' + Guid.newGuid(),
        key: 'modal_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Modal',
        type: "modal",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        btnLabel: "Show Modal",
        modalContent: "Content",
        modalTitle: "The is modal title",
        cancalButtontext: 'Cancel',
        centered: false,
        okBtnLoading: false,
        cancelBtnLoading: false,
        okBtnDisabled: false,
        cancelDisabled: false,
        ecsModalCancel: true,
        okBtnText: 'Ok',
        closeIcon: 'close',
        width: 250,
        showCloseIcon: true,
        zIndex: 1000,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'popConfirm') {
      const newNode = {
        id: 'popConfirm_' + Guid.newGuid(),
        key: 'popConfirm_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Pop Confirm',
        type: "popConfirm",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        btnLabel: "Open Popconfirm with Promise",
        arrowPointAtCenter: false,
        content: 'Pop Confirm',
        trigger: 'hover',
        placement: 'top',
        visible: false,
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'avatar') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        key: "avatar_" + Guid.newGuid(),
        title: 'Avatar',
        type: "avatar",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        icon: "",
        text: "",
        src: "//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        bgColor: "#87d068",
        color: "#f56a00",
        alt: "",
        gap: 0,
        size: 'default',
        shape: 'circle',
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'badge') {
      const newNode = {
        id: 'badge_' + Guid.newGuid(),
        key: 'badge_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Badge',
        type: "badge",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        count: 10,
        nzText: "",
        nzColor: "",
        nzStatus: "success",
        status: false,
        standAlone: false,
        dot: true,
        showDot: true,
        overflowCount: '',
        showZero: false,
        nztype: 'count',
        size: '',
        icon: 'clock-circle',
        offset: '',
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'comment') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'comment_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Comment',
        type: "comment",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        author: 'Han Solo',
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'popOver') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'popOver_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Pop Over',
        type: "popOver",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        btnLabel: "Hover me",
        content: "Content",
        arrowPointAtCenter: false,
        trigger: 'hover',
        placement: 'top',
        visible: false,
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        backdrop: false,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'description') {
      const newNode = {
        id: 'description_' + Guid.newGuid(),
        key: 'description_' + Guid.newGuid(),
        type: "description",
        title: 'Description',
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: true,
        btnText: "Edit",
        size: "default",
        isBordered: true,
        formatter: "horizontal",
        isColon: false,
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'descriptionChild') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'descriptionchild_' + Guid.newGuid(),
        title: 'descriptionchild',
        type: "descriptionChild",
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        nzSpan: 2,
        // title: "title",
        content: "content",
        nzStatus: "processing",
        isBadeg: true,
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'segmented') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Segmented',
        type: "segmented",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        options: [
          { label: 'Daily' },
          { label: 'Weekly' },
          { label: 'Monthly' },
          { label: 'Quarterly' },
          { label: 'Yearly' },
        ],
        block: true,
        disabled: false,
        size: 'default',
        defaultSelectedIndex: 1,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'result') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'result',
        type: "result",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        status: "success",
        resultTitle: "Successfully Purchased Cloud Server ECS!",
        subTitle: "Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.",
        btnLabel: "Done",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'nzTag') {
      const newNode = {
        id: 'nzTag_' + Guid.newGuid(),
        key: 'nzTag_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Tag',
        type: "nzTag",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        color: "red",
        mode: "closeable",
        checked: false,
        options: [
          {
            title: 'Twitter',
            icon: 'twitter',
            tagColor: 'blue',
          },
          {
            title: 'Youtube',
            icon: 'youtube',
            tagColor: 'red',
          },
          {
            title: 'Facebook',
            icon: 'facebook',
            tagColor: 'blue',
          },
          {
            title: 'LinkedIn',
            icon: 'linkedin',
            tagColor: 'blue',
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'spin') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'spin_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Spin',
        type: "spin",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        size: "default",
        delayTime: 1000,
        loaderText: "Loading...",
        simple: false,
        spinning: true,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'transfer') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'transfer',
        type: "transfer",
        isNextChild: false,
        tooltip: "",
        hideExpression: false,
        disabled: false,
        showSearch: true,
        firstBoxTitle: 'Source',
        secondBoxTitle: 'Target',
        leftButtonLabel: 'to left',
        rightButtonLabel: 'to right',
        searchPlaceHolder: 'Search here...',
        status: 'error',
        notFoundContentLabel: 'The list is empty',
        list: [
          {
            key: '1',
            title: 'content 1',
            direction: 'right',
          },
          {
            key: '2',
            title: 'content 2',
            direction: undefined,
          },
          {
            key: '3',
            title: 'content 3',
            description: 'description',
            direction: 'right',
          },
          {
            key: '4',
            title: 'content 4',
            direction: undefined,
          },
          {
            key: '5',
            title: 'content 5',
            direction: 'right',
          },
          {
            key: '6',
            title: 'content 6',
            direction: undefined,
          },
          {
            key: '7',
            title: 'content 7',
            direction: 'right',
          },
          {
            key: '8',
            title: 'content 8',
            direction: 'undefined',
          },
          {
            key: '9',
            title: 'content 9',
            direction: 'right',
          },
          {
            key: '10',
            title: 'content 10',
            direction: undefined,
          },
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'treeSelect') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'tree Select',
        type: "treeSelect",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        expandKeys: ['100', '1001'],
        showSearch: false,
        placeHolder: '',
        disabled: false,
        icon: false,
        width: true,
        hideUnMatched: false,
        status: 'default',
        checkable: false,
        showExpand: true,
        showLine: false,
        defaultExpandAll: false,
        size: 'default',
        key: '100',
        nodes: [
          {
            title: 'parent 1',
            key: '100',
            children: [
              {
                title: 'parent 1-0',
                key: '1001',
                children: [
                  { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
                  { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
                ]
              },
              {
                title: 'parent 1-1',
                key: '1002',
                children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
              }
            ]
          }
        ],
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'tree') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'tree',
        type: "tree",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        checkable: false,
        blockNode: false,
        showLine: false,
        showIcon: false,
        draggable: false,
        multiple: false,
        expandAll: false,
        expand: true,
        expandIcon: 'folder',
        closingexpandicon: 'file',
        nodes: [
          {
            title: '0-0',
            key: '0-0',
            expanded: true,
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
                  { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
                  { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
                ]
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
                  { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
                  { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
                ]
              },
              {
                title: '0-0-2',
                key: '0-0-2',
                isLeaf: true
              }
            ]
          },
          {
            title: '0-1',
            key: '0-1',
            children: [
              { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
              { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
              { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
            ]
          },
          {
            title: '0-2',
            key: '0-2',
            isLeaf: true
          }
        ],
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'cascader') {
      const newNode = {
        id: 'cascader_' + Guid.newGuid(),
        key: 'cascader_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Cascader',
        type: "cascader",
        isNextChild: false,
        hideExpression: false,

        expandTrigger: 'hover',
        placeHolder: 'Please select',
        size: 'default',
        status: 'default',
        expandIcon: 'down',
        showInput: true,
        disabled: false,
        nodes: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                    isLeaf: true
                  }
                ]
              },
              {
                value: 'ningbo',
                label: 'Ningbo',
                isLeaf: true
              }
            ]
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                    isLeaf: true
                  }
                ]
              }
            ]
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'drawer') {
      const newNode = {
        id: 'drawer_' + Guid.newGuid(),
        key: 'drawer_' + Guid.newGuid(),
        type: "drawer",
        title: 'Drawer',
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        color: "bg-blue-500",
        btnText: "Open Drawer",
        isClosable: true,
        icon: "close",
        extra: "extra",
        // isMask: true,
        // isMaskClosable: true,
        // isCloseOnNavigation: true,
        isKeyboard: true,
        // maskStyle: {},
        // bodyStyle: {},
        // title: "Basic Drawer",
        footerText: "",
        isVisible: false,
        placement: "right",
        size: "default",
        width: 500,
        height: 500,
        offsetX: 0,
        offsetY: 0,
        wrapClassName: "",
        zIndex: 1,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum blanditiis sunt unde quisquam architecto. Nesciunt eum consequatur suscipit obcaecati. Aliquam repudiandae neque ratione natus doloribus ab excepturi, a modi voluptate!',
        // onClose: "right",//function
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'skeleton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'skeleton_' + Guid.newGuid(),
        type: "skeleton",
        title: 'Skeleton',
        className: "w-1/2",
        tooltip: "",
        isNextChild: false,
        hideExpression: false,

        isActive: false, //true
        size: "default", //large, small
        buttonShape: "circle", //default ,round
        avatarShape: "circle", //square
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'empty') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'empty_' + Guid.newGuid(),
        type: "empty",
        title: 'Empty',
        className: "w-1/2",
        tooltip: "",
        isNextChild: false,
        hideExpression: false,
        icon: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",
        content: "contentTpl",
        text: "Description",
        link: "#API",
        btnText: "Create Now",
        color: "bg-blue-600",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'list') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'list_' + Guid.newGuid(),
        type: "list",
        title: 'List with Load More',
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        headerText: "this is Header",
        footerText: "this is footer",
        formatter: "vertical",
        size: "default",
        isBordered: true,
        isSplit: false,
        isEdit: true,
        isUpdate: false,
        isDelete: true,
        isLoad: false,
        loadText: "Loading more",
        options: [
          {
            avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            name: "Mr Felicíssimo Porto",
            lastNameHref: "https://ng.ant.design",
            description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
            email: "felicissimo.porto@example.com",
            gender: "male",
            content: "Content",
            nat: "BR",
            isLoading: false,
          },
          {
            avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            name: "Miss Léane Muller",
            lastNameHref: "https://ng.ant.design",
            description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
            email: "leane.muller@example.com",
            gender: "female",
            content: "Content",
            nat: "FR",
            loading: false,
          },
          {
            avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            name: "Mrs کیمیا موسوی",
            lastNameHref: "https://ng.ant.design",
            description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
            email: "khymy.mwswy@example.com",
            gender: "female",
            content: "Content",
            nat: "IR",
            loading: false,
          },
          {
            avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            name: "Mr Antonin Fabre",
            lastNameHref: "https://ng.ant.design",
            description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
            email: "antonin.fabre@example.com",
            gender: "male",
            content: "Content",
            nat: "FR",
            loading: true,
          },
          {
            avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            name: "Mr Jivan Ronner",
            lastNameHref: "https://ng.ant.design",
            description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
            email: "jivan.ronner@example.com",
            gender: "male",
            content: "Content",
            nat: "NL",
            loading: false,
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'treeView') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'treeView_' + Guid.newGuid(),
        type: "treeView",
        title: 'Tree View',
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        isBlockNode: true,
        isDraggable: true,
        isShowLine: true,
        isCheckable: false,
        isMultiple: false,
        isExpandAll: false,
        nodes: [
          {
            title: 'parent 1',
            key: '100',
            expanded: true,
            children: [
              {
                title: 'parent 1-0',
                key: '1001',
                expanded: true,
                children: [
                  { title: 'leaf', key: '10010', isLeaf: true },
                  { title: 'leaf', key: '10011', isLeaf: true },
                  { title: 'leaf', key: '10012', isLeaf: true }
                ]
              },
              {
                title: 'parent 1-1',
                key: '1002',
                children: [{ title: 'leaf', key: '10020', isLeaf: true }]
              },
              {
                title: 'parent 1-2',
                key: '1003',
                children: [
                  { title: 'leaf', key: '10030', isLeaf: true },
                  { title: 'leaf', key: '10031', isLeaf: true }
                ]
              }
            ]
          }
        ],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'mentions') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'mentions_' + Guid.newGuid(),
        type: "mentions",
        // title: 'Mention',
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        options: [
          {
            label: 'afc163'
          },
          {
            label: 'benjycui'
          },
          {
            label: 'yiminghe'
          },
          {
            label: 'RaoHai'
          },
          {
            label: '中文'
          },
        ],
        title: "mention",
        placeholder: "enter sugestion",
        rows: "1",
        loading: false,
        disabled: false,
        noneData: '',
        status: 'default',
        prefix: '',
        position: 'top',

        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'message') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'message_' + Guid.newGuid(),
        title: 'Message',
        type: "message",
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        content: "this message is disappeard after 10 seconds",
        duration: 10000,
        messageType: "success",
        pauseOnHover: true,
        animate: true,
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'notification') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'notification_' + Guid.newGuid(),
        title: 'Notification',
        type: "notification",
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        // title: "Notification Title",
        content: "A function will be be called after the notification is closed (automatically after the 'duration' time of manually).",
        isSmile: true,
        icon: "smile",
        color: "#108ee9",
        duration: 3000,
        pauseOnHover: true,
        animate: true,
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'icon') {
      const newNode = {
        id: 'icon_' + Guid.newGuid(),
        key: 'icon' + Guid.newGuid(),
        title: 'Icon',
        type: "icon",
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        icon: 'star',
        theme: 'outline',
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    this.updateNodes();

    // this.controlListClose();
    // if (this.screenName)
    // this.saveOldJson();
  }
  makeFormlyOptions(option: any) {
    if (option) {
      let data = [
        {
          label: "option1",
          value: "1"
        },
        {
          label: "option2",
          value: "2"
        },
        {
          label: "option3",
          value: "3"
        }
      ];
      return data;
    } else
      return [];
  }
  addNode(node: TreeNode, newNode: TreeNode) {
    if (node.children)
      node.children.push(newNode);
    this.toastr.success('Control Added', { nzDuration: 3000 });
    // this.dropTargetIds = [];
    // this.formlyService.templateNode = JSON.parse(JSON.stringify(this.formlyService.nodes));
    // this.formlyService.prepareDragDrop(this.formlyService.templateNode, this.selectedNode);
  }
  getLastNodeWrapper(dataType?: string) {
    let wrapperName: any = ['form-field-horizontal'];
    if (dataType == 'wrappers') {
      return wrapperName;
    } else if (dataType == 'disabled') {
      return false;
    }
    let disabledProperty: any;
    if (this.selectedNode.children) {
      for (let j = 0; j < this.selectedNode.children.length; j++) {
        if (this.selectedNode.children[j].formlyType != undefined) {
          if (this.selectedNode.children[j].formlyType == 'input') {
            wrapperName = this.selectedNode.children[j].formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
            disabledProperty = this.selectedNode.children[j].formly?.at(0)?.fieldGroup?.at(0)?.props?.disabled;
          }
          else if (this.selectedNode.children[j].type == 'tabsMain') {
            this.selectedNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.props?.disabled;
              });
            });
          }
          else if (this.selectedNode.children[j].type == 'stepperMain') {
            this.selectedNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.props?.disabled;
              });
            });
          }
          else if (this.selectedNode.children[j].type == 'mainDashonicTabs') {
            this.selectedNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.props?.disabled;
              });
            });
          }
        }
      }
    }

    if (dataType == 'wrappers') {
      return wrapperName;
    } else if (dataType == 'disabled') {
      return disabledProperty;
    }

  }
  addNextChildProperty(data: any) {

    if (!data.isNextChild) {
      if (data.type != "page" && data.type != "pageHeader" && data.type != "pageBody" && data.type != "pageFooter" && data.type != "according" && data.type != "accordingHeader" && data.type != "accordingBody" && data.type != "accordingFooter" && data.type != "stepperMain" && data.type != "stepper" && data.type != "buttonGroup" && data.type != "dashonicTabs" && data.type != "mainDashonicTabs" && data.type != "kanban" && data.type != "kanbanTask" && data.type != "fixedDiv" && data.type != "accordionButton") {
        data["isNextChild"] = [],
          data.isNextChild = false;
      } else {
        data["isNextChild"] = [],
          data.isNextChild = true;
      }
    }
    return data;
  }
  closeConfigurationList() {
    this.IsShowConfig = false;
  }
  openConfig(parent: any, node: any) {
    if (node.origin) {
      parent = parent?.parentNode?.origin;
      node = node.origin;
    }
    this.searchControllData = [];
    this.IsConfigurationVisible = true;
    this.controlListvisible = false;
    // document.getElementById("mySidenav-right").style.width = "100%";
    this.IsShowConfig = true;
    this.selectedNode = node;
    this.selectdParentNode = parent;
    // this.highlightSelect(this.selectedNode.id,true)
    this.clickButton(node?.type)
  }
  applyHighLight(data: boolean, element: any) {
    debugger
    if (element.highLight) {
      element["highLight"] = data;
    } else {
      element["highLight"] = data;
    }
    return element;
  }
  applySize() {

    this.sizes = [25, 75, 0]
    if (!this.IslayerVisible && this.IsConfigurationVisible && !this.IsjsonEditorVisible) {
      this.sizes = [1, 99, 0]
    }
    else if (!this.IslayerVisible && this.IsConfigurationVisible && this.IsjsonEditorVisible) {
      this.sizes = [25, 75, 0]
    }
    else if (!this.IslayerVisible && !this.IsConfigurationVisible && this.IsjsonEditorVisible) {
      this.sizes = [25, 75, 0]
    }
    else if (this.IslayerVisible && !this.IsConfigurationVisible && !this.IsjsonEditorVisible) {
      this.sizes = [25, 75, 0]
    }
    else if (!this.IslayerVisible && !this.IsConfigurationVisible && !this.IsjsonEditorVisible) {
      this.sizes = [1, 99, 0]
    }
  }

  addPropertieInOldScreens(propertyName: any, propertyType: any) {
    if (propertyType == "isShow") {
      if (propertyName == undefined) {
        propertyName = true;
      }
    }
    else if (propertyType == "repeat" || propertyType == "repeatable" || propertyType == "hideExpression") {
      if (propertyName == undefined) {
        propertyName = false;
      }
    }
    else if (propertyType == "icon") {
      if (propertyName == undefined) {
        propertyName = [];
      }
    }
    else if (propertyType == "padding") {
      if (propertyName == undefined) {
        propertyName = '';
      }
    }
    else if (propertyType == "paddingRight" || propertyType == "paddingTop" || propertyType == "paddingBottom") {
      if (propertyName == undefined) {
        propertyName = 0;
      }
    }
    else if (propertyType == "styleConfig") {
      if (propertyName.styleConfig == undefined) {
        propertyName["styleConfig"] = [{}]
      }
    }
    else if (propertyType == "style") {
      if (propertyName.style == undefined) {
        propertyName[""] = {}
      }
    }
    else if (propertyType == "addonLeft") {
      if (propertyName.addonLeft == undefined) {
        propertyName["addonLeft"] = {};
        propertyName.addonLeft["text"] = "";
        propertyName = propertyName.addonLeft.text;
      } else {
        propertyName = propertyName.addonLeft.text;
      }
    }
    else if (propertyType == "addonRight") {
      if (propertyName.addonRight == undefined) {
        propertyName["addonRight"] = {};
        propertyName.addonRight["text"] = "";
        propertyName = propertyName.addonRight.text;
      } else {
        propertyName = propertyName.addonRight.text;
      }
    }
    return propertyName;
  };





  clickButton(type: any) {

    let _formFieldData = new formFeildData();
    this.fieldData = new GenaricFeild({
      type: type,
      title: "Change Attribute Values",
      commonData: _formFieldData.commonOtherConfigurationFields,
    });
    const selectedNode = this.selectedNode;
    let configObj: any = {
      id: selectedNode.id as string, className: selectedNode.className,
      key: selectedNode.key, title: selectedNode.title,
      tooltip: selectedNode.tooltip, hideExpression: selectedNode.hideExpression
    };

    switch (type) {
      case "breakTag":
        configObj = { ...configObj };
        this.fieldData.formData = _formFieldData.breakTagFeilds;
        break;

      case "drawer":
        configObj = { ...configObj, ...this.clickButtonService.getDrawerConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.drawerFields;
        break;
      case "icon":
        configObj = { ...configObj, ...this.clickButtonService.getIconConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.iconFields;
        break;
      case "anchor":
        configObj = { ...configObj, ...this.clickButtonService.getAnchorConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.anchorFields;

        break;
      case "treeSelect":
        configObj = { ...configObj, ...this.clickButtonService.getTreeselectviewConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.treeSelectFields;
        break;
      case "treeView":
        configObj = { ...configObj, ...this.clickButtonService.getTreeViewConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.treeviewFields;
        break;
      case "cascader":

        configObj = { ...configObj, ...this.clickButtonService.getCascaderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.cascaderFields;
        break;
      case "tree":
        configObj = { ...configObj, ...this.clickButtonService.getTreeConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.treeFields;
        break;
      case "modal":
        configObj = { ...configObj, ...this.clickButtonService.getModalConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.modalFields;
        break;
      case "transfer":
        configObj = { ...configObj, ...this.clickButtonService.getTransferConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.transferFields;
        break;

      case "gridList":
        configObj = { ...configObj, ...this.clickButtonService.getGridConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.gridFields;
        break;
      case "comment":
        configObj = { ...configObj, ...this.clickButtonService.getCommentConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.commentFields;
        break;
      case "rate":
        configObj = { ...configObj, ...this.clickButtonService.getRateFieldsConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.rateFields;
        break;

      case "skeleton":
        configObj = { ...configObj, ...this.clickButtonService.getSkeletonConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.skeletonFields;
        break;
      case "badge":
        configObj = { ...configObj, ...this.clickButtonService.getBadgeConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.badgeFields;
        break;
      case "mentions":
        configObj = { ...configObj, ...this.clickButtonService.getMentionConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.mentionsFields;
        break;
      case "empty":
        configObj = { ...configObj, ...this.clickButtonService.getEmptyConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.emptyFields;
        break;
      case "segmented":
        configObj = { ...configObj, ...this.clickButtonService.getSegmentedConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.segmentedFields;
        break;
      case "statistic":
        configObj = { ...configObj, ...this.clickButtonService.getStatisticConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.statisticFields;
        break;
      case "nzTag":
        configObj = { ...configObj, ...this.clickButtonService.getnzTagConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.nzTagFields;
        break;
      case "message":
        configObj = { ...configObj, ...this.clickButtonService.getMessageConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.messageFields;
        break;
      case "notification":
        configObj = { ...configObj, ...this.clickButtonService.getnotificationConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.notificationFields;
        break;
      case "list":
        configObj = { ...configObj, ...this.clickButtonService.getlistConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.listFields;
        break;

      case "description":
        configObj = { ...configObj, ...this.clickButtonService.getDescriptionConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.descriptionFields;
        break;

      case "descriptionChild":
        configObj = { ...configObj, ...this.clickButtonService.getDescriptionChildConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.descriptionChildFields;
        break;

      case "affix":
        configObj = { ...configObj, ...this.clickButtonService.getAffixConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.affixFields;
        break;
      case "backTop":

        configObj = { ...configObj, ...this.clickButtonService.getBacktopConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.backtopFields;
        break;

      case "avatar":
        configObj = { ...configObj, ...this.clickButtonService.getAvatarConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.avatarFields;
        break;

      case "popOver":
        configObj = { ...configObj, ...this.clickButtonService.getPopOverConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.popOverFields;
        break;
      case "popConfirm":
        configObj = { ...configObj, ...this.clickButtonService.getPopOverConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.popOverFields;
        break;

      case "result":
        configObj = { ...configObj, ...this.clickButtonService.getResultConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.resultFields;
        break;

      case "spin":
        configObj = { ...configObj, ...this.clickButtonService.getSpinConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.spinFields;
        break;

      case "imageUpload":
        configObj = { ...configObj, ...this.clickButtonService.getImageUploadConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.imageUploadFeilds;
        break;

      case "toastr":
        configObj = { ...configObj, ...this.clickButtonService.getToastrConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.toastrFeilds;
        break;

      case "invoice":
        configObj = { ...configObj, ...this.clickButtonService.getinvoiceConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.invoiceFeilds;
        break;

      case "rangeSlider":
        configObj = { ...configObj, ...this.clickButtonService.getRangeSliderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.rangeSliderFeilds;
        break;

      case "inputGroupGrid":
        configObj = { ...configObj, ...this.clickButtonService.getInputGroupGridConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.inputGroupGridFeilds;
        break;

      case "card":
        configObj = { ...configObj, ...this.clickButtonService.getCardConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.cardFields;
        break;

      case "fixedDiv":
        configObj = { ...configObj, ...this.clickButtonService.getFixedDivConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.fixedDivFields;
        break;

      case "tuiCalender":
        configObj = { ...configObj, ...this.clickButtonService.getTuiCalenderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.tuiCalendarFeilds;
        break;

      case "multiFileUpload":
        configObj = { ...configObj, ...this.clickButtonService.getMultiFileUploadConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.multiFileUploadFeilds;
        break;

      case "textEditor":
        configObj = { ...configObj, ...this.clickButtonService.getTextEditorConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.textEditorFeilds;
        break;

      case "switch":
        configObj = { ...configObj, ...this.clickButtonService.getSwitchConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.switchFeilds;
        break;

      case "tabs":
        configObj = { ...configObj, ...this.clickButtonService.getTabsConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.tabsFields;
        break;

      case "kanban":
        configObj = { ...configObj, ...this.clickButtonService.getKanbanConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.kanbanFeilds;
        break;

      case "kanbanTask":
        configObj = { ...configObj, ...this.clickButtonService.getKanbanTaskConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.kanbanTaskFeilds;
        break;

      case "mainTab":
        configObj = { ...configObj, ...this.clickButtonService.getMainDashonicTabsConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.mainTabFields;
        break;

      case "progressBar":
        configObj = { ...configObj, ...this.clickButtonService.getProgressBarConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.progressBarFields;
        break;

      case "divider":
        configObj = { ...configObj, ...this.clickButtonService.getDividerConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.dividerFeilds;
        break;

      case "video":
        configObj = { ...configObj, ...this.clickButtonService.getVideoConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.videosFeilds;
        break;

      case "audio":
        configObj = { ...configObj, ...this.clickButtonService.getAudioConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.audioFeilds;
        break;

      case "carouselCrossfade":
        configObj = { ...configObj, ...this.clickButtonService.getcarouselCrossfadeConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.carouselCrossfadeFeilds;
        break;

      case "alert":
        configObj = { ...configObj, ...this.clickButtonService.getAlertConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.alertFeilds;
        break;

      case "timeline":
        configObj = { ...configObj, ...this.clickButtonService.getTimelineConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.timelineFeilds;
        break;

      case "simpleCardWithHeaderBodyFooter":
        configObj = { ...configObj, ...this.clickButtonService.getSimpleCardWithHeaderBodyFooterConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.simpleCardWithHeaderBodyFooterFeilds;
        break;

      case "sharedMessagesChart":
        configObj = { ...configObj, ...this.clickButtonService.getSharedMessagesChartConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.sharedMessagesChartFeilds;
        break;

      case "browserCard":

        configObj = { ...configObj, ...this.clickButtonService.getBrowserCardConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.browserChartFields;
        break;

      case "browserCombineChart":
        configObj = { ...configObj, ...this.clickButtonService.getBrowserCombineChartConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.browserComibeChartFields;
        break;

      case "widgetSectionCard":
        configObj = { ...configObj, ...this.clickButtonService.getWidgetSectionCardConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.widgetSectionChartFields;
        break;

      case "sectionCard":
        configObj = { ...configObj, ...this.clickButtonService.getSectionCardConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.SectionChartFields;
        break;

      case "chart":
        configObj = { ...configObj, ...this.clickButtonService.getChartConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.chartFields;
        break;

      case "donutChart":
        var seriesDataV1 = [];
        for (let k = 0; k < this.selectedNode.section[0].series.length; k++) {
          var series = { "series": 90, "title": "abc", "color": "ds" };
          series["series"] = this.selectedNode.section[0].series[k];
          series["title"] = this.selectedNode.section[0].titles[k];
          series["color"] = this.selectedNode.section[0].colors[k];
          seriesDataV1.push(series);
        }
        configObj = { ...configObj, ...this.clickButtonService.getDonutChartConfig(selectedNode) };
        configObj.options = seriesDataV1,
          this.fieldData.formData = _formFieldData.chartFields;
        break;

      case "donuteSaleChart":
        var seriesDataV1 = [];
        for (let k = 0; k < this.selectedNode.section[0].series.length; k++) {
          var series = { "series": 90, "title": "abc", "color": "ds" };
          series["series"] = this.selectedNode.section[0].series[k];
          series["title"] = this.selectedNode.section[0].titles[k];
          series["color"] = this.selectedNode.section[0].colors[k];
          seriesDataV1.push(series);
        }
        configObj = { ...configObj, ...this.clickButtonService.getDonuteSaleChartConfig(selectedNode) };
        configObj.options = seriesDataV1,
          this.fieldData.formData = _formFieldData.donutSaleChartFields;
        break;

      case "salesAnalyticschart":
        var series1Obj = [];
        for (let i = 0; i < this.selectedNode.section[0].series.length; i++) {
          series1Obj.push(this.selectedNode.section[0].series[i]);
        }
        configObj = { ...configObj, ...this.clickButtonService.getSalesAnalyticschartConfig(selectedNode) };
        //   configObj.option = series1Obj;
        //   for (let i = 0; i < node.section[0].series.length; i++) {
        //     configObj.options[i].name1 = node.section[0].series[i].title;
        //     configObj.options[i].value = node.section[0].series[i].value;
        //  }

        this.fieldData.formData = _formFieldData.saleAnalyticsChartFields;

        break;

      case "heading":

        configObj = { ...configObj, ...this.clickButtonService.getHeadingConfig(selectedNode) };
        // configObj.padding = this.addPropertieInOldScreens(this.selectedNode.padding, "padding"),
        this.fieldData.formData = _formFieldData.headingFields;
        break;

      case "paragraph":
        configObj = { ...configObj, ...this.clickButtonService.getParagraphConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.paragraphFields;
        break;

      case "tags":
      case "repeatSection":
      case "multiselect":
      case "search":
      case "radiobutton":
      case "checkbox":
      case "datetime":
      case "time":
      case "timepicker":
      case "date":
      case "month":
      case "decimal":
      case "week":
      case "color":
      case "input":
      case "inputGroup":
      case "image":
      case "textarea":
      case "telephone":
      case "autoComplete":
      case "number":
        configObj = { ...configObj, ...this.clickButtonService.getFormlyConfig(selectedNode) };
        this.fieldData.commonData = _formFieldData.commonFormlyConfigurationFields;
        if (type == "tags" || type == "multiselect" || type == "search")
          this.fieldData.formData = _formFieldData.selectFields;
        else if (type == "radiobutton" || type == "checkbox")
          this.fieldData.formData = _formFieldData.radioFields;
        else if (type == 'color')
          this.fieldData.formData = _formFieldData.colorFields;
        else if (type == 'autoComplete')
          this.fieldData.formData = _formFieldData.autoCompleteFields;
        else if (type == 'date')
          this.fieldData.formData = _formFieldData.zorroDateFields;
        else if (type == 'number')
          this.fieldData.formData = _formFieldData.numberFields;
        else if (type == 'repeatSection')
          this.fieldData.formData = _formFieldData.zorroSelectFields;
        else if (type == 'timepicker')
          this.fieldData.formData = _formFieldData.zorroTimeFields;
        break;

      case "customMasking":
        configObj = { ...configObj, ...this.clickButtonService.getMaskingFormlyConfig(selectedNode) };
        this.fieldData.commonData = _formFieldData.commonFormlyConfigurationFields;
        this.fieldData.formData = _formFieldData.customMaskingFields;
        break;
      case "button":
        configObj = { ...configObj, ...this.clickButtonService.getButtonConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.buttonFields;
        break;
      case "dropdownButton":
        configObj = { ...configObj, ...this.clickButtonService.getDropdownButtonConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.dropdownButtonFields;
        break;
      case "accordionButton":
        configObj = { ...configObj, ...this.clickButtonService.getAccordionButtonConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.accordionButtonFields;
        break;
      case "linkButton":
        configObj = { ...configObj, ...this.clickButtonService.getLinkButtonConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.linkButtonFields;
        break;
      case "buttonGroup":
        configObj = { ...configObj, ...this.clickButtonService.getBtnGroupConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.buttonGroupFields;
        break;
      case "gridName":

        break;
      case "page":
        configObj = { ...configObj, ...this.clickButtonService.getPagesConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.pageFields;
        break;
      case "pageHeader":
        configObj = { ...configObj, ...this.clickButtonService.getHeaderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.pageHeaderFields;
        break;
      case "pageBody":
        // configObj = { ...configObj, ...this.clickButtonService.getHeaderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.pageBodyFields;
        break;
      case "pageFooter":
        configObj = { ...configObj, ...this.clickButtonService.getFooterConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.pageFooterFields;
        break;
      case "according":
        if (this.fieldData.commonData && this.fieldData.commonData[0].fieldGroup)
          this.fieldData.commonData[0].fieldGroup[4] = {
            className: "w-1/4 px-2 d-none",
            key: 'className',
            type: 'select',
            wrappers: ["formly-vertical-wrapper"],
            props: {
              label: 'Section ClassName',
              options: [
                {
                  label: 'Full',
                  value: 'w-full'
                },
                {
                  label: 'col-6',
                  value: 'w-1/2 pr-1'
                },
                {
                  label: 'col-3',
                  value: 'w-1/3 pr-1'
                },
              ]
            }
          };
        configObj = { ...configObj, ...this.clickButtonService.getSectionConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.accordingFields;
        break;
      case "accordingHeader":
        configObj = { ...configObj, ...this.clickButtonService.getSectionHeaderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.accordingHeaderFields;
        break;
      case "accordingFooter":
        configObj = { ...configObj, ...this.clickButtonService.getSectionFooterConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.accordingFooterFields;
        break;
      case "accordingBody":
        // configObj = { ...configObj, ...this.clickButtonService.getSectionBodyConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.accordingBodyFields;
        break;
      case "step":
        configObj = { ...configObj, ...this.clickButtonService.getStepperConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.stepperFields;
        break;
      case "mainStep":
        configObj = { ...configObj, ...this.clickButtonService.getStepperMainConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.mainStepperFields;
        break;
      case "tabsMain":
        configObj = { ...configObj, ...this.clickButtonService.getMainTabsConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.mainTabFields;
        break;
      default:
        break;

    }
    this.formModalData = configObj;
  }
  menuSearch() {
    this.filterMenuData = [];
    var input = (document.getElementById("mySearch") as HTMLInputElement).value.toUpperCase();
    if (input) {
      this.nodes.forEach((element: any) => {
        if (element.title.toUpperCase().includes(input)) {
          this.filterMenuData.push(element);
        } else if (element.children.length > 0) {
          element.children.forEach((element1: any) => {
            if (element1.title.toUpperCase().includes(input)) {
              this.filterMenuData.push(element1);
            }
            else if (element1.children.length > 0) {
              element1.children.forEach((element2: any) => {
                if (element2.title.toUpperCase().includes(input)) {
                  this.filterMenuData.push(element2);
                }
                else if (element2.children.length > 0) {
                  element2.children.forEach((element3: any) => {
                    if (element3.title.toUpperCase().includes(input)) {
                      this.filterMenuData.push(element3);
                    }
                    else if (element3.children.length > 0) {
                      element3.children.forEach((element4: any) => {
                        if (element4.title.toUpperCase().includes(input)) {
                          this.filterMenuData.push(element4);
                        }
                        else if (element4.children.length > 0) {
                          element4.children.forEach((element5: any) => {
                            if (element5.title.toUpperCase().includes(input)) {
                              this.filterMenuData.push(element5);
                            }
                            else if (element5.children.length > 0) {
                              element5.children.forEach((element6: any) => {
                                if (element6.title.toUpperCase().includes(input)) {
                                  this.filterMenuData.push(element6);
                                }
                                else if (element6.children.length > 0) {
                                  element6.children.forEach((element7: any) => {
                                    if (element7.title.toUpperCase().includes(input)) {
                                      this.filterMenuData.push(element7);
                                    }
                                    else if (element7.children.length > 0) {
                                      element7.children.forEach((element8: any) => {
                                        if (element8.title.toUpperCase().includes(input)) {
                                          this.filterMenuData.push(element8);
                                        };
                                      });
                                    };
                                  });
                                };
                              });
                            };
                          });
                        };
                      });
                    };
                  });
                };
              });
            };
          });
        };
      });
    };
  }
  hoverIn(data: any) {
    this.isVisible = data.origin.id;
  }
  hoverOut(data: any) {
    this.isVisible = data.origin.id;
  }
  applyOrRemoveHighlight(element: any, id: any, highlightOrNot: boolean) {
    if (id == element.id)
      element["highLight"] = true;
    else
      element["highLight"] = false;
    if (!highlightOrNot) {
      element["highLight"] = false;
    }
  }

  // define function to handle button group
  handleButtonGroup(element: any, id: any) {
    if (id == element.id) {
      if (element.children.length > 0)
        element.highLight = true;
    }
    else {
      if (element.children.length > 0)
        element.highLight = false;
    }
  }

  // define function to handle formly fields
  handleFormly(element: any, id: any) {
    if (!element) return;

    if (element.formly != undefined) {
      if (element.type == "stepperMain") {
        if (id == element.id)
          element.children[0].highLight = true;
        else
          element.children[0].highLight = false;
      } else {
        var className = element.formly[0].fieldGroup[0].className;
        if (id == element.id) {
          if (!className.includes("highLight")) {
            element.formly[0].fieldGroup[0].className = className + " highLight";
          }
        }
        else {
          element.formly[0].fieldGroup[0].className = className.replace("highLight", "");
        }
      }
    }
  }
  highlightSelect(id: any, highlightOrNot: boolean) {
    this.applyOrRemoveHighlight(this.nodes[0], id,highlightOrNot);
    this.nodes.at(0)?.children?.forEach((element: any) => {
      this.applyOrRemoveHighlight(element, id, highlightOrNot);
      element.children.forEach((child: any) => {
        this.applyOrRemoveHighlight(child, id, highlightOrNot);
        child.children.forEach((child1: any) => {
          this.applyOrRemoveHighlight(child1, id, highlightOrNot);
          child1.children.forEach((child2: any) => {
            this.applyOrRemoveHighlight(child2, id, highlightOrNot);
            child2.children.forEach((child3: any) => {
              this.applyOrRemoveHighlight(child3, id, highlightOrNot);
              child3.children.forEach((child4: any) => {
                this.applyOrRemoveHighlight(child4, id, highlightOrNot);
                child4.children.forEach((child5: any) => {
                  this.applyOrRemoveHighlight(child5, id, highlightOrNot);
                  child5.children.forEach((child6: any) => {
                    this.applyOrRemoveHighlight(child6, id, highlightOrNot);
                  });
                });
              });
            });
          });
        });
      });
      this.updateNodes();
    });
  }
  addSection() {
    this.sectionBageBody = this.nodes[0].children[1];
    this.selectedNode = this.sectionBageBody,
      this.addControlToJson('according', null);
    this.selectedNode = this.sectionAccording;
    this.addControlToJson('accordingHeader', null);
    this.addControlToJson('accordingBody', null);
    this.addControlToJson('accordingFooter', null);
    this.selectedNode = this.sectionAccorBody;
    this.addControlToJson('text', this.textJsonObj);
  }
  openField(event: any) {

    let id = event.origin.id;
    let node = event.origin;
    if (this.screenPage) {
      this.searchControllData = [];
      this.isActiveShow = id;
      this.selectedNode = node;
      if (this.selectedNode.isNextChild) {
        // this.IsShowConfig = true;
        this.controlListvisible = true;
      }
      if (this.selectedNode.type == 'pageBody') {
        this.showSectionOnly = true;
      } else {
        this.showSectionOnly = false;
      }
    }
  }
  // add(node: TreeNode) {
  //   this.applySize();
  //   this.selectedNode = node;
  // }
  newChild: any = [];
  insertAt(parent: any, node: any) {
    // this.highlightSelect(this.selectedNode.id,true)
    parent = parent.parentNode.origin;
    node = node.origin;
    var nodeData = JSON.parse(JSON.stringify(node));
    if (parent.children) {
      const idx = parent.children.indexOf(node as TreeNode);
      this.newChild = [];
      if (nodeData.children[0] != undefined) {
        if (nodeData.type != "buttonGroup" && nodeData.type != "stepperMain" && nodeData.type != "mainDashonicTabs" && nodeData.type != "gridList" && nodeData.type != "gridListEditDelete" && nodeData.type != "kanban" && nodeData.type != "accordionButton" && nodeData.type != "fixedDiv") {
          nodeData.id = nodeData.id + Guid.newGuid();

          for (let index = 0; index < this.nodes.length; index++) {
            for (let k = 0; k < this.nodes[index].children.length; k++) {
              if (this.nodes[index].children[k].type == 'pageBody') {
                const element = JSON.parse(JSON.stringify(this.nodes[index].children[1].children[idx]));
                // element.id = element.id+idx+1;
                // formly checker
                for (let i = 0; i < element.children.length; i++) {
                  // for (let a = 0; a < this.nodes[index].children[1].children.length; a++) {
                  //   this.nodes[index].children[1].children[a].id = Guid.newGuid();
                  //   this.nodes[index].children[1].children[a].formly[0].key = Guid.newGuid();
                  // }
                  if (element.children[i].type == 'accordingBody') {
                    element.children[i].id = element.children[i].id + Guid.newGuid();
                    element.children[i].formly[0].key = element.children[i].formly[0].key + Guid.newGuid();
                    for (let a = 0; a < element.children[i].children.length; a++) {
                      if (element.children[i].children[a].formly != undefined) {
                        element.children[i].children[a].formly[0].fieldGroup[0].key = element.children[i].children[a].formly[0].fieldGroup[0].key + Guid.newGuid();
                        element.children[i].children[a].formly[0].fieldGroup[0].id = element.children[i].children[a].formly[0].fieldGroup[0].id + Guid.newGuid();
                      } else if (element.children[i].children[a].type != "buttonGroup")
                        element.children[i].children[a].id = element.children[i].children[a].id + Guid.newGuid();
                      else if (element.children[i].children[a].type == "buttonGroup") {
                        element.children[i].children[a].id = element.children[i].children[a].id + Guid.newGuid();
                        for (let b = 0; b < element.children[i].children[a].children.length; b++) {
                          element.children[i].children[a].children[b].id = element.children[i].children[a].children[b].id + Guid.newGuid();
                        }
                      }
                    }

                  }
                  // else
                  // element.children[j].children[i].id = element.children[j].children[i].id+ Guid.newGuid();
                }
                let obj = {};
                if (nodeData.formly != undefined) {
                  obj = { id: Guid.newGuid(), title: element.title, type: element.type, footer: element.footer, header: element.header, expanded: element.expanded, sectionDisabled: element.sectionDisabled, highLight: element.highLight, isNextChild: element.isNextChild, children: element.children[0].children, key: Guid.newGuid(), formly: element.formly }
                }
                else if (nodeData?.type == "buttonGroup") {
                  for (let index = 0; index < element.children[0].children[1].children.length; index++) {
                    if (element.children[0].children[1].children[index].type == "buttonGroup") {
                      obj = { id: element.id + Guid.newGuid(), title: element.title, type: element.type, children: element.children[0].children[1].children[index].children, key: element.key }
                    }
                  }
                }
                else {
                  obj = { id: element.id + Guid.newGuid(), title: element.title, type: element.type, children: element.children, key: element.key }
                }
                this.newChild.push(obj);
              }
            }
          }

          for (let index = 0; index < nodeData.children.length; index++) {
            nodeData.children[index].id = nodeData.children[index].id + Guid.newGuid();
            for (let indexChildren = 0; indexChildren < nodeData.children[index].children.length; indexChildren++) {
              nodeData.children[index].children[indexChildren].id = nodeData.children[index].children[indexChildren].id + Guid.newGuid();
            }
          }
          const newNode = {
            id: nodeData.id + Guid.newGuid(),
            title: nodeData.title,
            type: nodeData?.type,
            footer: nodeData.footer,
            expanded: nodeData.expanded,
            sectionDisabled: nodeData.sectionDisabled,
            highLight: nodeData.highLight,
            isNextChild: nodeData.isNextChild,
            children: nodeData.children,
            formly: nodeData?.formly,
            key: nodeData.key + Guid.newGuid(),

          } as TreeNode;
          parent.children.splice(idx as number + 1, 0, newNode);
        }
        else {
          nodeData.id = nodeData.id + Guid.newGuid();
          nodeData.children.forEach((element: any) => {
            element.id = element.id + Guid.newGuid();
            if (element) {
              if (element.length > 0) {
                if (element.formly) {
                  element.formly[0].fieldGroup[0].key = element.formly[0].fieldGroup[0].key + Guid.newGuid();
                }
              }
            }
            element.children.forEach((element1: any) => {
              element1.id = element1.id + Guid.newGuid();
              if (element1) {
                if (element1.length > 0) {
                  if (element1.formly) {
                    element1.formly[0].fieldGroup[0].key = element1.formly[0].fieldGroup[0].key + Guid.newGuid();
                  }
                }
              }
            });
          });
          const newNode = nodeData;
          const idx = parent.children.indexOf(node as TreeNode);
          parent.children.splice(idx as number + 1, 0, newNode);
        }
      }
      else {
        if (nodeData.formly) {
          if (nodeData.formly != undefined) {
            nodeData.formly[0].fieldGroup[0].key = Guid.newGuid();
            nodeData.formly[0].fieldGroup[0].id = Guid.newGuid();
          }
        }
        nodeData.id = nodeData.id + Guid.newGuid();
        const newNode = nodeData;
        const idx = parent.children.indexOf(node as TreeNode);
        parent.children.splice(idx as number + 1, 0, newNode);
      }
    }
    else {
      const idx = this.nodes.indexOf(node as TreeNode);
      this.newChild = [];
      for (let index = 0; index < this.nodes[idx].children.length; index++) {
        const element = JSON.parse(JSON.stringify(this.nodes[idx].children[index]));
        for (let j = 0; j < element.children.length; j++) {
          if (node?.formly != undefined) {
            element.children[j].formly[0].fieldGroup[0].key = Guid.newGuid();
            element.children[j].formly[0].fieldGroup[0].id = Guid.newGuid();
          } else
            element.children[j].key = Guid.newGuid();
        }
        let obj = {};
        if (nodeData.formly != undefined) {
          obj = { id: Guid.newGuid(), title: element.title, type: element.type, children: element.children, key: Guid.newGuid(), formly: element.formly }
        }
        else {
          obj = { id: element.id + Guid.newGuid(), title: element.title, type: element.type, children: element.children, key: element.key }
        }
        this.newChild.push(obj);

      }
      // this.newChild.forEach(elementV2 => {
      //   elementV2.id=elementV2.id+"f"+1;
      // });

      const newNode = {
        id: this.nodes[idx].id + "_" + idx + '_1',
        title: nodeData.title,
        children: this.newChild,
        formly: this.nodes[idx].formly,
        type: this.nodes[idx].type,
        className: nodeData?.className,
      } as TreeNode;
      this.nodes.splice(idx + 1, 0, newNode);

    }

    this.updateNodes();
    // this.jsonStringifData();

    // array.splice(index, 0, ...elementsArray);
  }
  addFunctionsInHtml(type: any) {
    if (type == "dashonictabsAddNew")
      this.dashonictabsAddNew();
    else if (type == "stepperAddNew")
      this.stepperAddNew();
    else if (type == "kanabnAddNew")
      this.kanabnAddNew();
    else if (type == "address_form" || type == "employee_form" || type == "login_Form" || type == "signUp_Form")
      this.formDataFromApi(type);
    else if (type == "addSection")
      this.addSection();
  }
  kanabnAddNew() {
    this.addControlToJson('kanban');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('kanbanTask');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('kanbanTask');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('kanbanTask');
    this.selectedNode = this.tabsAdd;
    this.selectedNode = this.selectForDropdown;
    this.updateNodes();
  }
  stepperAddNew() {

    this.addControlToJson('mainStep');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('step');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('step');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('step');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.selectForDropdown;
    // this.stepperNewlength = 3;
    this.updateNodes();
  }
  tabsAddNew() {
    this.addControlToJson('tabsMain');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.selectForDropdown;
    // this.tabsNewlength = 3;
    this.updateNodes();
  }
  dashonictabsAddNew() {
    this.addControlToJson('mainTab');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsChild;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.selectForDropdown;
    // this.tabsNewlength = 3;
    this.updateNodes();
  }
  formDataFromApi(screenId: any) {
    this.requestSubscription = this.builderService.genericApis(screenId).subscribe({
      next: (res) => {
        this.nodes[0].children[1].children.push(res[0])
        this.updateNodes();
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }

    });
  }
  dashonicTemplates(model: any) {
    this.requestSubscription = this.builderService.dashonicTemplates(model).subscribe({
      next: (res) => {
        this.selectedNode?.children?.push(res);
        this.updateNodes();
        this.toastr.success('Controll Added', { nzDuration: 3000 });
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  }
  remove(parent: any, node: any) {

    if (parent?.parentNode && node.origin) {
      parent = parent?.parentNode?.origin;
      node = node.origin;
    }
    if (parent != undefined) {
      console.log(parent, node);
      const idx = parent.children.indexOf(node);
      // this.columnData = this.columnData.filter((a: any) => a.name != parent.children[idx].id);
      parent.children.splice(idx as number, 1);
      // this.templateNode = JSON.parse(JSON.stringify(this.nodes));
      // this.prepareDragDrop(this.templateNode, this.selectedNode);
    } else {
      console.log(parent, node);
      const idx = this.nodes.indexOf(node);
      this.nodes.splice(idx as number, 1);
      // this.templateNode = JSON.parse(JSON.stringify(this.nodes));
      // this.prepareDragDrop(this.templateNode, this.selectedNode);
    }
    this.updateNodes();
  }
  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }
  updateNodes() {
    this.nodes = [...this.nodes];

  }
  clickBack() {

    this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
    // this.templateNode = JSON.parse(JSON.stringify(this.nodes));
    // this.prepareDragDrop(this.templateNode, this.selectedNode);
    // this.makeFaker();

  }
  EnumView() {
    this.requestSubscription = this.builderService.multiAPIData().subscribe({
      next: (res) => {
        const node = this.selectedNode ?? {};
        const formly = node.formly ?? [];
        const fieldGroup = formly?.[0]?.fieldGroup ?? [];
        const props = fieldGroup[0]?.props ?? {};
        props.options = res ?? undefined;
        this.updateNodes();
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  }
  notifyEmit(event: actionTypeFeild): void {

    if(event.type)
    {
      this.selectedNode.title = event.form.title;
      this.selectedNode.className = event.form.className;
      this.selectedNode.tooltip = event.form.tooltip;
      this.selectedNode.hideExpression = event.form.hideExpression;
      this.selectedNode['id'] = event.form?.id;
      this.selectedNode['key'] = event.form?.key;
    }

    switch (event.type) {
      case "drawer":
        if (this.selectedNode) {
          this.selectedNode.color = event.form.color;
          this.selectedNode.btnText = event.form.btnText;
          this.selectedNode.isClosable = event.form.isClosable;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.extra = event.form.extra;
          this.selectedNode.isKeyboard = event.form.isKeyboard;
          this.selectedNode.footerText = event.form.footerText;
          this.selectedNode.isVisible = event.form.isVisible;
          this.selectedNode.placement = event.form.placement;
          this.selectedNode.size = event.form.size;
          this.selectedNode.width = event.form.width;
          this.selectedNode.height = event.form.height;
          this.selectedNode.offsetX = event.form.offsetX;
          this.selectedNode.offsetY = event.form.offsetY;
          this.selectedNode.wrapClassName = event.form.wrapClassName;
          this.selectedNode.zIndex = event.form.zIndex;
          this.selectedNode.onClose = event.form.onClose;
          this.selectedNode.content = event.form.content;
        }
        break;
      case "icon":
        if (this.selectedNode) {
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.theme = event.form.theme;
        }
        break;
      case "anchor":
        if (this.selectedNode) {
          this.selectedNode.affix = event.form.affix;
          this.selectedNode.offSetTop = event.form.offSetTop;
          this.selectedNode.showInkInFixed = event.form.showInkInFixed;
          this.selectedNode.target = event.form.target;
          this.selectedNode.bond = event.form.bond;
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                this.selectedNode.options = res;
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
        }
        break;
      case "treeSelect":

        if (this.selectedNode) {
          this.selectedNode.expandKeys = event.form.expandKeys;
          this.selectedNode.showSearch = event.form.showSearch;
          this.selectedNode.placeHolder = event.form.placeHolder;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.width = event.form.width;
          this.selectedNode.hideUnMatched = event.form.hideUnMatched;
          this.selectedNode.status = event.form.status;
          this.selectedNode.checkable = event.form.checkable;
          this.selectedNode.showExpand = event.form.showExpand;
          this.selectedNode.showLine = event.form.showLine;
          this.selectedNode.defaultExpandAll = event.form.defaultExpandAll;
          this.selectedNode.size = event.form.size;
          if (event.tableDta) {
            this.selectedNode.nodes = event.tableDta;
          }
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.nodes = res;
                  this.updateNodes();
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          // this.selectedNode.nodes = this.assigOptionsData(this.selectedNode.nodes, event.tableDta, event.form.api);

        }
        break;
      case "treeView":

        if (this.selectedNode) {
          if (event.tableDta) {
            this.selectedNode.nodes = event.tableDta;
          }
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.nodes = res;
                  this.updateNodes();
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          // this.selectedNode.nodes = this.assigOptionsData(this.selectedNode.nodes, event.tableDta, event.form.api);

        }
        break;
      case "cascader":
        if (this.selectedNode) {
          this.selectedNode.expandTrigger = event.form.expandTrigger;
          this.selectedNode.labelProperty = event.form.labelProperty;
          this.selectedNode.placeHolder = event.form.placeHolder;
          this.selectedNode.size = event.form.size;
          this.selectedNode.status = event.form.status;
          this.selectedNode.expandIcon = event.form.expandIcon;
          this.selectedNode.suffixIcon = event.form.suffixIcon;
          this.selectedNode.allowClear = event.form.allowClear;
          this.selectedNode.autoFocus = event.form.autoFocus;
          this.selectedNode.backdrop = event.form.backdrop;
          this.selectedNode.showArrow = event.form.showArrow;
          this.selectedNode.showInput = event.form.showInput;
          this.selectedNode.showSearch = event.form.showSearch;
          this.selectedNode.disabled = event.form.disabled;
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.nodes = res;
                  this.updateNodes();
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          // this.selectedNode.nodes = this.assigOptionsData(this.selectedNode.nodes, event.tableDta, event.form.api);
        }
        break;
      case "tree":
        if (this.selectedNode) {
          this.selectedNode.checkable = event.form.checkable;
          this.selectedNode.blockNode = event.form.blockNode;
          this.selectedNode.showLine = event.form.showLine;
          // this.selectedNode.showIcon = event.form.showIcon;
          this.selectedNode.draggable = event.form.draggable;
          // this.selectedNode.multiple = event.form.multiple;
          this.selectedNode.expandAll = event.form.expandAll;
          this.selectedNode.expand = event.form.expand;
          this.selectedNode.expandIcon = event.form.expandIcon;
          this.selectedNode.closingexpandicon = event.form.closingexpandicon;
          // this.selectedNode.nodes = event.form.nodes;
          // this.selectedNode.treeApi = this.assigOptionsData(this.selectedNode.treeApi, event.tableDta , event.form.api)
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.nodes = res;
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
        }
        break;
      case "modal":
        if (this.selectedNode) {
          this.selectedNode.color = event.form.color;
          this.selectedNode.btnLabel = event.form.btnLabel;
          this.selectedNode.modalContent = event.form.modalContent;
          this.selectedNode.modalTitle = event.form.modalTitle;
          this.selectedNode.cancalButtontext = event.form.cancalButtontext;
          this.selectedNode.centered = event.form.centered;
          this.selectedNode.okBtnLoading = event.form.okBtnLoading;
          this.selectedNode.cancelBtnLoading = event.form.cancelBtnLoading;
          this.selectedNode.okBtnDisabled = event.form.okBtnDisabled;
          this.selectedNode.cancelDisabled = event.form.cancelDisabled;
          this.selectedNode.ecsModalCancel = event.form.ecsModalCancel;
          this.selectedNode.okBtnText = event.form.okBtnText;
          this.selectedNode.closeIcon = event.form.closeIcon;
          this.selectedNode.width = event.form.width;
          this.selectedNode.showCloseIcon = event.form.showCloseIcon;
          this.selectedNode.zIndex = event.form.zIndex;
        }
        break;
      case "transfer":
        if (this.selectedNode) {
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.showSearch = event.form.showSearch;
          this.selectedNode.firstBoxTitle = event.form.firstBoxTitle;
          this.selectedNode.secondBoxTitle = event.form.secondBoxTitle;
          this.selectedNode.leftButtonLabel = event.form.leftButtonLabel;
          this.selectedNode.rightButtonLabel = event.form.rightButtonLabel;
          this.selectedNode.searchPlaceHolder = event.form.searchPlaceHolder;
          this.selectedNode.status = event.form.status;
          this.selectedNode.notFoundContentLabel = event.form.notFoundContentLabel;
          // this.selectedNode.list = this.assigOptionsData(this.selectedNode.list, event.tableDta, event.form.api)
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.list = res;
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
        }
        break;
      case "skeleton":
        if (this.selectedNode) {
          this.selectedNode.isActive = event.form.isActive;
          this.selectedNode.size = event.form.size;
          this.selectedNode.buttonShape = event.form.buttonShape;
          this.selectedNode.avatarShape = event.form.avatarShape;
        }
        break;
      case "rate":
        if (this.selectedNode) {
          this.selectedNode.clear = event.form.clear;
          this.selectedNode.allowHalf = event.form.allowHalf;
          this.selectedNode.focus = event.form.focus;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.showCount = event.form.showCount;
          this.selectedNode.disabled = event.form.disabled;
        }
        break;
      case "statistic":
        if (this.selectedNode) {
          this.selectedNode.prefixIcon = event.form.prefixIcon;
          this.selectedNode.suffixIcon = event.form.suffixIcon;
          if (event.tableDta) {
            this.selectedNode.statisticArray = event.tableDta
          } else {
            this.selectedNode.statisticArray = this.selectedNode.statisticArray
          }
        }
        break;
      case "nzTag":
        if (this.selectedNode) {
          this.selectedNode.color = event.form.color;
          this.selectedNode.mode = event.form.mode;
          this.selectedNode.checked = event.form.checked;
          if (event.tableDta) {
            this.selectedNode.options = event.tableDta
          }
        }
        break;
      case "segmented":
        if (this.selectedNode) {
          if (event.tableDta) {
            this.selectedNode.options = event.tableDta
          } else {
            this.selectedNode.options = this.selectedNode.options
          }
          this.selectedNode.block = event.form.block;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.size = event.form.size;
          this.selectedNode.defaultSelectedIndex = event.form.defaultSelectedIndex;
        }
        break;
      case "badge":
        if (this.selectedNode) {
          this.selectedNode.count = parseInt(event.form.count);
          this.selectedNode.nzText = event.form.nzText;
          this.selectedNode.nzColor = event.form.nzColor;
          this.selectedNode.nzStatus = event.form.nzStatus;
          this.selectedNode.status = event.form.status;
          this.selectedNode.standAlone = event.form.standAlone;
          this.selectedNode.dot = event.form.dot;
          this.selectedNode.showDot = event.form.showDot;
          this.selectedNode.overflowCount = event.form.overflowCount;
          this.selectedNode.showZero = event.form.showZero;
          this.selectedNode.size = event.form.size;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.nztype = event.form.nztype;

        }
        break;
      case "mentions":
        if (this.selectedNode) {
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.loading = event.form.loading;
          this.selectedNode.status = event.form.status;
          // this.selectedNode.options = this.assigOptionsData(this.selectedNode.options, event.tableDta, event.form.api);
          // this.selectedNode.options = event.form.options;
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.options = res;
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          this.selectedNode.position = event.form.position;

        }
        break;
      case "empty":
        if (this.selectedNode) {
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.content = event.form.content;
          this.selectedNode.text = event.form.text;
          this.selectedNode.link = event.form.link;
          this.selectedNode.btnText = event.form.btnText;
          this.selectedNode.color = event.form.color;
        }
        break;
      case "notification":
        if (this.selectedNode) {
          this.selectedNode.content = event.form.content;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.color = event.form.color;
          this.selectedNode.duration = event.form.duration;
          this.selectedNode.pauseOnHover = event.form.pauseOnHover;
          this.selectedNode.animate = event.form.animate;
        }
        break;
      case "list":
        if (this.selectedNode) {
          this.selectedNode.headerText = event.form.headerText;
          this.selectedNode.footerText = event.form.footerText;
          this.selectedNode.formatter = event.form.formatter;
          this.selectedNode.size = event.form.size;
          this.selectedNode.isBordered = event.form.isBordered;
          this.selectedNode.isSplit = event.form.isSplit;
          this.selectedNode.isEdit = event.form.isEdit;
          this.selectedNode.isUpdate = event.form.isUpdate;
          this.selectedNode.isDelete = event.form.isDelete;
          this.selectedNode.isLoad = event.form.isLoad;
          this.selectedNode.loadText = event.form.loadText;
          this.selectedNode.options = event.form.options;
        }
        break;
      case "description":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.btnText = event.form.btnText;
          this.selectedNode.formatter = event.form.formatter;
          this.selectedNode.size = event.form.size;
          this.selectedNode.isBordered = event.form.isBordered;
          this.selectedNode.isColon = event.form.isColon;
        }
        break;
      case "message":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.content = event.form.content;
          this.selectedNode.duration = event.form.duration;
          this.selectedNode.messageType = event.form.messageType;
          this.selectedNode.animate = event.form.animate;
          this.selectedNode.isColon = event.form.isColon;
        }
        break;
      case "descriptionChild":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.content = event.form.content;
          this.selectedNode.nzStatus = event.form.nzStatus;
          this.selectedNode.isBadeg = event.form.isBadeg;
          this.selectedNode.nzSpan = event.form.nzSpan;
        }
        break;
      case "select":
      case "repeatSection":
      case "tag":
      case "search":
      case "radiobutton":
      case "checkbox":
      case "decimal":
      case "input":
      case "inputGroup":
      case "image":
      case "telephone":
      case "textarea":
      case "multiselect":
      case "time":
      case "timepicker":
      case "month":
      case "week":
      case "datetime":
      case "date":
      case "color":
      case "autoComplete":
      case "number":

        if (this.selectedNode) {
          debugger
          this.selectedNode.title = event.form.title;
          this.selectedNode.formly?.forEach(elementV1 => {
            // MapOperator(elementV1 = currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            fieldGroup[0].defaultValue = event.form.defaultValue;
            fieldGroup[0].hideExpression = event.form.hideExpression;
            const props = fieldGroup[0]?.props ?? {};
            props.label = event.form.title;
            props['key'] = event.form.key;
            props['className'] = event.form.className;
            props['hideExpression'] = event.form.hideExpression;
            props.placeholder = event.form.placeholder;
            // props['className'] = event.form.className;
            if (event.tableDta) {
              props['options'] = event.tableDta;
            }
            props['required'] = event.form.required;
            props['maxLength'] = event.form.maxLength;
            props['minLength'] = event.form.minLength;
            props['disabled'] = event.form.disabled;
            props['tooltip'] = event.form.tooltip;
            props['className'] = event.form.className;
            props['titleIcon'] = event.form.titleIcon;
            if (props.config.wrapper != 'floating_filled' || props.config.wrapper != 'floating_filled' || props.config.wrapper != 'floating_standard') {
              props.config['addonRight'] = event.form.addonRight;
              props.config['addonLeft'] = event.form.addonLeft;
              props.config['prefixicon'] = event.form.prefixicon;
              props.config['suffixicon'] = event.form.suffixicon;
            } else {
              this.toastr.error('Right , left text and icon are not allowed in case of floating wrappers', { nzDuration: 3000 });
            }
            props.config['border'] = event.form.border;
            props.config['optionWidth'] = event.form.optionWidth;
            props.config['step'] = event.form.step;
            props.config['format'] = event.form.format;
            props.config['allowClear'] = event.form.allowClear;
            props.config['serveSearch'] = event.form.serveSearch;
            props.config['showArrow'] = event.form.showArrow;
            props.config['showSearch'] = event.form.showSearch;
            props.config['clearIcon'] = event.form.clearIcon;
            props.config['loading'] = event.form.loading;
            props.config['optionHieght'] = event.form.optionHieght;
            props.config['optionHoverSize'] = event.form.optionHoverSize;
            props.config['optionDisabled'] = event.form.optionDisabled;
            props.config['optionHide'] = event.form.optionHide;
            props.config['firstBtnText'] = event.form.firstBtnText;
            props.config['secondBtnText'] = event.form.secondBtnText;
            props.config['minuteStep'] = event.form.minuteStep;
            props.config['secondStep'] = event.form.secondStep;
            props.config['hoursStep'] = event.form.hoursStep;
            props.config['use12Hours'] = event.form.use12Hours;
            props.config['icon'] = event.form.icon;
            props['readonly'] = event.form.readonly;
            if (event.tableDta) {
              props['options'] = event.tableDta;
            } else {
              props['options'] = event.form.options;
            }
            // if (this.selectedNode.type == "multiselect" && event.form.defaultValue) {
            //   const arr = event.form.defaultValue.split(',');
            //   props['defaultValue'] = arr;
            // } else {
            // }
            if (event.form.api) {
              this.requestSubscription = this.builderService.jsonTagsDataGet(event.form.api).subscribe({
                next: (res) => {
                  props.options = res;
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            }
          });
          this.clickBack();
        }
        break;

      case "breakTag":
        if (this.selectedNode) {
        }
        break;
      case "affix":
        if (this.selectedNode) {
          this.selectedNode.affixType = event.form.affixType;
          this.selectedNode.margin = event.form.margin;
          this.selectedNode.target = event.form.target;
          this.selectedNode.hideExpression = event.form.hideExpression;
        }
        break;
      case "backTop":
        if (this.selectedNode) {
          this.selectedNode.target = event.form.target;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.visibleafter = event.form.visibleafter;
          this.selectedNode.duration = event.form.duration;
        }
        break;
      case "avatar":
        if (this.selectedNode) {
          this.selectedNode.src = event.form.src;
          this.selectedNode.text = event.form.text;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.bgColor = event.form.bgColor;
          this.selectedNode.color = event.form.color;
          this.selectedNode.gap = event.form.gap;
          this.selectedNode.alt = event.form.alt;
          this.selectedNode.size = event.form.size;
          this.selectedNode.shape = event.form.shape;

        }
        break;
      case "comment":
        if (this.selectedNode) {
          this.selectedNode.avatar = event.form.avatar;
          this.selectedNode.author = event.form.author;
        }
        break;
      case "popOver":
        if (this.selectedNode) {
          this.selectedNode.btnLabel = event.form.btnLabel;
          this.selectedNode.content = event.form.content;
          this.selectedNode.nzPopoverTitle = event.form.nzPopoverTitle;
          this.selectedNode.arrowPointAtCenter = event.form.arrowPointAtCenter;
          this.selectedNode.trigger = event.form.trigger;
          this.selectedNode.placement = event.form.placement;
          this.selectedNode.visible = event.form.visible;
          this.selectedNode.mouseEnterDelay = event.form.mouseEnterDelay;
          this.selectedNode.mouseLeaveDelay = event.form.mouseLeaveDelay;
          this.selectedNode.backdrop = event.form.backdrop;
        }
        break;
      case "popConfirm":
        if (this.selectedNode) {
          this.selectedNode.btnLabel = event.form.btnLabel;
          this.selectedNode.content = event.form.content;
          this.selectedNode.nzPopoverTitle = event.form.nzPopoverTitle;
          this.selectedNode.arrowPointAtCenter = event.form.arrowPointAtCenter;
          this.selectedNode.trigger = event.form.trigger;
          this.selectedNode.placement = event.form.placement;
          this.selectedNode.visible = event.form.visible;
          this.selectedNode.mouseEnterDelay = event.form.mouseEnterDelay;
          this.selectedNode.mouseLeaveDelay = event.form.mouseLeaveDelay;
          this.selectedNode.backdrop = event.form.backdrop;
        }
        break;
      case "spin":
        if (this.selectedNode) {
          this.selectedNode.size = event.form.size;
          this.selectedNode.delayTime = event.form.delayTime;
          this.selectedNode.loaderText = event.form.loaderText;
          this.selectedNode.loaderIcon = event.form.loaderIcon;
          this.selectedNode.simple = event.form.simple;
          this.selectedNode.spinning = event.form.spinning;
        }
        break;
      case "result":
        if (this.selectedNode) {
          this.selectedNode.status = event.form.status;
          this.selectedNode.resultTitle = event.form.resultTitle;
          this.selectedNode.subTitle = event.form.subTitle;
          this.selectedNode.btnLabel = event.form.btnLabel;
          this.selectedNode.extra = event.form.extra;
          this.selectedNode.icon = event.form.icon;

        }
        break;
      case "imageUpload":

        if (this.selectedNode) {
          this.selectedNode.alt = event.form.alt;
          this.selectedNode.source = event.form.source;
          this.selectedNode.imagHieght = event.form.imagHieght;
          this.selectedNode.imageWidth = event.form.imageWidth;
          this.selectedNode.imageClass = event.form.imageClass;
          this.selectedNode.keyboardKey = event.form.keyboardKey;
          this.selectedNode.zoom = event.form.zoom;
          this.selectedNode.rotate = event.form.rotate;
          this.selectedNode.zIndex = event.form.zIndex;
          this.selectedNode.imagePreview = event.form.imagePreview;
          if (event.form.source) {
            this.dataSharedService.imageUrl = '';
            this.selectedNode.base64Image = '';
          }
          else if (this.dataSharedService.imageUrl) {
            this.selectedNode.base64Image = this.dataSharedService.imageUrl;
          }
        }
        break;
      case "toastr":
        if (this.selectedNode) {
          this.selectedNode.toastrType = event.form.toastrType;
          this.selectedNode.toasterTitle = event.form.toasterTitle;
          this.selectedNode.duration = event.form.duration;
          this.selectedNode.placement = event.form.placement;
          this.selectedNode.closeIcon = event.form.closeIcon;
          this.selectedNode.description = event.form.description;
          this.selectedNode.animate = event.form.animate;
          this.selectedNode.pauseOnHover = event.form.pauseOnHover;
        }
        break;
      case "invoice":
        if (this.selectedNode) {
          this.selectedNode.invoiceNumberLabel = event.form.invoiceNumberLabel;
          this.selectedNode.datelabel = event.form.datelabel;
          this.selectedNode.paymentTermsLabel = event.form.paymentTermsLabel;
          this.selectedNode.poNumber = event.form.poNumber;
          this.selectedNode.billToLabel = event.form.billToLabel;
          this.selectedNode.dueDateLabel = event.form.dueDateLabel;
          this.selectedNode.shipToLabel = event.form.shipToLabel;
          this.selectedNode.notesLabel = event.form.notesLabel;
          this.selectedNode.subtotalLabel = event.form.subtotalLabel;
          this.selectedNode.dicountLabel = event.form.dicountLabel;
          this.selectedNode.shippingLabel = event.form.shippingLabel;
          this.selectedNode.taxLabel = event.form.taxLabel;
          this.selectedNode.termsLabel = event.form.termsLabel;
          this.selectedNode.totalLabel = event.form.totalLabel;
          this.selectedNode.amountpaidLabel = event.form.amountpaidLabel;
          this.selectedNode.balanceDueLabel = event.form.balanceDueLabel;
        }
        break;
      case "rangeSlider":
        if (this.selectedNode) {
          this.selectedNode.min = event.form.min;
          this.selectedNode.max = event.form.max;
          this.selectedNode.sliderType = event.form.sliderType;
          this.selectedNode.progressBar = event.form.progressBar;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.showValue = event.form.showValue;
        }
        break;
      case "inputGroupGrid":
        if (this.selectedNode) {
        }
        break;

      case "calendar":
        if (this.selectedNode.id) {
          this.selectedNode.viewType = event.form.viewType;
          this.selectedNode.disabled = event.form.disabled;
          if (event.form.statusApi != undefined) {
            this.requestSubscription = this.builderService.genericApis(event.form.statusApi).subscribe({
              next: (res) => {
                this.selectedNode.options = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          // this.updateNodes();
        }
        break;
      case "masking":
        if (this.selectedNode) {
          this.selectedNode?.formly?.forEach(elementV1 => {
            // MapOperator(elementV1 =currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            const props = fieldGroup[0]?.props ?? {};
            props['key'] = event.form.key;
            props.label = event.form.title;
            props.focus = event.form.focus;
            props['hideExpression'] = event.form.hideExpression;
            props['defaultValue'] = event.form.defaultValue;
            props['required'] = event.form.required;
            props.readonly = event.form.readonly;
            props.placeholder = event.form.placeholder;
            props['required'] = event.form.required;
            props['disabled'] = event.form.disabled;
            props['tooltip'] = event.form.tooltip;
            props['maskString'] = event.form.maskString;
            props['maskLabel'] = event.form.maskLabel;
            props['labelIcon'] = event.form.labelIcon;
            props['addonLeft'].text = event.form.addonLeft;
            props['addonRight'].text = event.form.addonRight;
            props['tooltip'] = event.form.tooltip;
            props['options'] = event.form.multiselect == "" ? event.form.options : "";
          });
        }
        break;
      case "gridList":

        if (this.selectedNode.id) {
          this.selectedNode.nzTitle = event.form.nzTitle;
          this.selectedNode.nzBordered = event.form.nzBordered;
          this.selectedNode.nzFooter = event.form.nzFooter;
          this.selectedNode.nzLoading = event.form.nzLoading;
          this.selectedNode.nzPaginationType = event.form.nzPaginationType;
          this.selectedNode.nzPaginationPosition = event.form.nzPaginationPosition;
          this.selectedNode.nzFrontPagination = event.form.nzShowPagination;
          this.selectedNode.nzShowPagination = event.form.nzShowPagination;
          this.selectedNode.showColumnHeader = event.form.showColumnHeader;
          this.selectedNode.noResult = event.form.noResult;
          this.selectedNode.nzSimple = event.form.nzSimple;
          this.selectedNode.nzSize = event.form.nzSize;
          this.selectedNode.nzShowSizeChanger = event.form.nzShowSizeChanger;
          this.selectedNode.showCheckbox = event.form.showCheckbox;
          this.selectedNode.expandable = event.form.expandable;
          this.selectedNode.fixHeader = event.form.fixHeader;
          this.selectedNode.tableScroll = event.form.tableScroll;
          this.selectedNode.fixedColumn = event.form.fixedColumn;
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                this.selectedNode.tableData = res.tableData;
                this.selectedNode.tableHeaders = res.tableHeaders;
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }

          if (this.selectedNode.noResult) {
            if (this.selectedNode.tableData.length > 0) {
              this.selectedNode['tableNoResultArray'] = this.selectedNode.tableData;
              this.selectedNode.tableData = [];
            }
          }
          else {
            if (this.selectedNode['tableNoResultArray'])
              this.selectedNode.tableData = this.selectedNode['tableNoResultArray'];
          }

          // this.selectedNode.sort = event.form.sort;
          // const firstObjectKeys = Object.keys(this.selectedNode.tableData[0]);
          // const key = firstObjectKeys.map(key => ({ name: key }));
          // if (this.selectedNode.sort) {
          //   key.forEach((j: any) => {
          //     this.selectedNode.tableHeaders.forEach((i: any) => {
          //       if (i.name.toLowerCase() == j.name.toLowerCase()) {
          //         i['sortOrder'] = null;
          //         i['sortFn'] = (a: any, b: any) => {
          //           Object.defineProperty(a, 'dynamicProp', { value: a[j.name], writable: true });
          //           Object.defineProperty(b, 'dynamicProp', { value: b[j.name], writable: true });
          //           const result = a.dynamicProp - b.dynamicProp;
          //           delete a.dynamicProp;
          //           delete b.dynamicProp;
          //           return result;
          //         };
          //         // i['sortFn'] = (a: any, b: any) => {
          //         //   Object.defineProperty(a, 'dynamicProp', { value: a[j.name], writable: true });
          //         //   Object.defineProperty(b, 'dynamicProp', { value: b[j.name], writable: true });
          //         //   const result = a.dynamicProp.localeCompare(b.dynamicProp);
          //         //   delete a.dynamicProp;
          //         //   delete b.dynamicProp;
          //         //   return result;
          //         // };
          //         i['sortDirections'] = ['ascend', 'descend', null]
          //       }
          //     });
          //   });
          // }


        }
        break;

      case "button":

        if (this.selectedNode) {
          this.selectedNode.color = event.form.color;
          this.selectedNode.onhover = event.form.onhover;
          this.selectedNode.btnIcon = event.form.btnIcon;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.nzBlock = event.form.nzBlock;
          this.selectedNode.nzSize = event.form.nzSize;
          this.selectedNode.nzShape = event.form.nzShape;
          this.selectedNode.nzLoading = event.form.nzLoading;
          this.selectedNode.nzGhost = event.form.nzGhost;
          this.selectedNode.nzDanger = event.form.nzDanger;
          this.selectedNode.nzShape = event.form.nzShape;
          this.selectedNode.format = event.form.format;
        }
        break;

      case "buttonGroup":
        if (this.selectedNode) {
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.btngroupformat = event.form.btngroupformat;
          this.updateNodes();
        }
        break;
      case "linkButton":
        debugger
        if (this.selectedNode) {
          this.selectedNode.btnIcon = event.form.btnIcon;
          this.selectedNode.href = event.form.href;
          this.selectedNode.target = event.form.target;
          this.selectedNode.color = event.form.color;
          this.selectedNode.onhover = event.form.onhover;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.nzBlock = event.form.nzBlock;
          this.selectedNode.nzSize = event.form.nzSize;
          this.selectedNode.nzShape = event.form.nzShape;
          this.selectedNode.nzLoading = event.form.nzLoading;
          this.selectedNode.nzDanger = event.form.nzDanger;
          this.selectedNode.format = event.form.format;
          this.selectedNode.nzGhost = event.form.nzGhost;
          this.selectedNode.btnType = event.form.target;
          // if (event.form.target == "modal" || event.form.target == "lg" || event.form.target == "xl" || event.form.target == "fullscreen") {
          //   this.selectedNode.btnType = "modal";
          // }
          this.updateNodes();

        }
        break;
      case "dropdownButton":
        if (this.selectedNode) {
          this.selectedNode.color = event.form.color;
          this.selectedNode.onhover = event.form.onhover;
          this.selectedNode.btnIcon = event.form.btnIcon;
          this.selectedNode.nzBlock = event.form.nzBlock;
          this.selectedNode.nzSize = event.form.nzSize;
          this.selectedNode.nzShape = event.form.nzShape;
          this.selectedNode.nzDanger = event.form.nzDanger;
          this.selectedNode.nzLoading = event.form.nzLoading;
          this.selectedNode.nzGhost = event.form.nzGhost;
          this.selectedNode.format = event.form.format;
          this.selectedNode.trigger = event.form.trigger;
          this.selectedNode.placement = event.form.placement;
          this.selectedNode.visible = event.form.visible;
          this.selectedNode.clickHide = event.form.clickHide;
          this.selectedNode.disabled = event.form.disabled;

          if (event.tableDta) {
            this.selectedNode.dropdownOptions = event.tableDta;
          }
        }
        break;
      case "accordionButton":
        if (this.selectedNode) {
          this.selectedNode.nzBordered = event.form.nzBordered;
          this.selectedNode.nzGhost = event.form.nzGhost;
          this.selectedNode.nzExpandIconPosition = event.form.nzExpandIconPosition;
          this.selectedNode.nzDisabled = event.form.nzDisabled;
          this.selectedNode.nzExpandedIcon = event.form.nzExpandedIcon;
          this.selectedNode.nzShowArrow = event.form.nzShowArrow;
          this.selectedNode.extra = event.form.extra;
        }
        break;
      //Card Case
      case "card":
        this.selectedNode.hideExpression = event.form.hideExpression;
        if (this.selectedNode) {
          this.selectedNode.label = event.form.name;
          // this.selectedNode.className = event.form.className;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.name = event.form.name;
          this.selectedNode.total = event.form.total;
          this.selectedNode.link = event.form.link;
          this.selectedNode.tooltip = event.form.tooltip;
        }
        break;
      case "fixedDiv":
        if (this.selectedNode) {
          this.selectedNode.hideExpression = event.form.hideExpression;
        }
        break;

      case "chart":

        if (this.selectedNode) {
          var seriesList = [];
          var ans = Array.isArray(event.form.options[0].data)
          if (ans != true) {
            {
              var arrayData = event.form.options[0].data.split(',');
              for (let index = 0; index < arrayData.length; index++) {
                seriesList.push(arrayData[index]);
              }
            }
          } else {
            seriesList = event.form.options[0].data;
          };
          this.selectedNode.section[0].filterData[0].heading = event.form.title;
          this.selectedNode.section[0].filterData[0].subheading = event.form.sub_label;
          // this.selectedNode.section[0].filterData[0].refundsChart.series[0].data = event.form.options;
          this.selectedNode.section[0].filterData[0].price = event.form.options[0].price;
          this.selectedNode.section[0].filterData[0].refundsChart.colors = event.form.options[0].colors;
          this.selectedNode.section[0].filterData[0].refundsChart.series[0].data = seriesList;
          this.selectedNode.link = event.form.link;
          if (event.form.link) {
            this.requestSubscription = this.builderService.salesDataApi().subscribe({
              next: (res) => {
                if (this.selectedNode.section) {
                  this.selectedNode.section[0].price = res[0]?.price;
                  this.selectedNode.section[0].filterData[0].price = res[0]?.price;
                  this.selectedNode.section[0].colors = res[0]?.colors;
                  this.selectedNode.section[0].data = res[0]?.data;
                  this.selectedNode.section[0].filtertype = res[0]?.filter;
                  this.selectedNode.section[0].filterData[0].refundsChart.series[0].data = res[0]?.data;
                  this.selectedNode.section[0].filterData[0].refundsChart.colors = res[0]?.colors;
                }
                this.updateNodes()
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            });
            event.form.link = "";
          }
        }
        break;

      case "donutChart":
        if (this.selectedNode) {
          this.selectedNode.link = event.form.link;
          this.selectedNode.section[0].series = [];
          this.selectedNode.section[0].labels = [];
          this.selectedNode.section[0].colors = [];
          for (let k = 0; k < event.form.options.length; k++) {
            this.selectedNode.section[0].series.push(event.form.options[k].series);
            this.selectedNode.section[0].labels.push(event.form.options[k].label);
            this.selectedNode.section[0].colors.push(event.form.options[k].color);
          }
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.requestSubscription = this.builderService.genericApis(event.form.options[index].api).subscribe({
                next: (res) => {
                  for (let h = 0; h < event.form.options.length; h++) {
                    if (event.form.options[index].api != undefined) {
                      this.selectedNode.section[0].series[index] = res.series[0];
                      this.selectedNode.section[0].labels[index] = res.labels[0];
                      this.selectedNode.section[0].colors[index] = res.colors[0];
                      this.updateNodes();
                    }
                  }
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            }
          }
          if (this.selectedNode.link != undefined) {
            this.requestSubscription = this.builderService.visitordonutChart().subscribe({
              next: (res) => {
                this.selectedNode.section = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            });
          }
        }
        break;

      case "donutSaleChart":
        if (this.selectedNode) {
          this.selectedNode.thisTitle = event.form.thisTitle;
          this.selectedNode.lastTitle = event.form.lastTitle;
          this.selectedNode.prevTitle = event.form.prevTitle;
          this.selectedNode.section[0].series = [];
          this.selectedNode.section[0].labels = [];
          this.selectedNode.section[0].colors = [];
          for (let k = 0; k < event.form.options.length; k++) {
            this.selectedNode.section[0].series.push(event.form.options[k].series);
            this.selectedNode.section[0].labels.push(event.form.options[k].label);
            this.selectedNode.section[0].colors.push(event.form.options[k].color);
          }
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.requestSubscription = this.builderService.genericApis(event.form.options[index].api).subscribe({
                next: (res) => {
                  if (event.form.options[index].api != undefined) {
                    // this.selectedNode.saledDonutChart[index].labels = res.labels;
                    // this.selectedNode.saledDonutChart[index].series = res.series;
                    // this.selectedNode.saledDonutChart[index].colors = res.colors;
                    this.selectedNode.thisValue = res.thisValue;
                    this.selectedNode.lastValue = res.lastValue;
                    this.selectedNode.prevValue = res.prevValue;
                    this.selectedNode.growth = res.growth;
                    this.updateNodes();
                  }
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            }
          }
          if (this.selectedNode.link != undefined) {
            this.requestSubscription = this.builderService.genericApis("donutChart").subscribe({
              next: (res) => {
                this.selectedNode.section = res;
                this.updateNodes()
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            });
          }
        }
        break;

      case "browserCard":

        if (this.selectedNode) {
          this.selectedNode.link = event.form.link;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.limit = event.form.limit;
          this.selectedNode.defaultColor = event.form.defaultColor;
          this.selectedNode.belowpercentage = event.form.belowpercentage;
          this.selectedNode.belowpercentageColor = event.form.below_percentage_color;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.requestSubscription = this.builderService.genericApis(event.form.options[index].api).subscribe({
                next: (res) => {
                  for (let h = 0; h < event.form.options.length; h++) {
                    if (event.form.options[index].api != undefined) {
                      this.selectedNode.chart[index].percentage = res.min;
                      this.selectedNode.chart[index].min = res.min;
                      this.selectedNode.chart[index].bar = res.min + "%";
                      this.updateNodes();
                    }
                  }
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            }
          }
          if (this.selectedNode.link != undefined) {
            this.requestSubscription = this.builderService.genericApis("browserdata").subscribe({
              next: (res) => {
                this.selectedNode.chart = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
        }
        break;

      case "browserCombineChart":

        if (this.selectedNode) {
          this.selectedNode.link = event.form.link;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.limit = event.form.limit;
          this.selectedNode.defaultColor = event.form.defaultColor;
          this.selectedNode.belowpercentage = event.form.belowpercentage;
          this.selectedNode.numberofcolumns = event.form.numberofcolumns;
          this.selectedNode.belowpercentageColor = event.form.below_percentage_color;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.requestSubscription = this.builderService.genericApis(event.form.options[index].api).subscribe({
                next: (res) => {
                  for (let h = 0; h < event.form.options.length; h++) {
                    if (event.form.options[index].api != undefined) {
                      this.selectedNode.chart[index].percentage = res.min;
                      this.selectedNode.chart[index].min = res.min;
                      this.selectedNode.chart[index].bar = res.min + "%";
                      this.updateNodes();
                    }
                  }
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            }
          }
          if (this.selectedNode.link != undefined) {
            this.requestSubscription = this.builderService.genericApis("browserdata").subscribe({
              next: (res) => {
                this.selectedNode.chart = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
        }
        break;

      case "salesAnalyticsChart":
        if (this.selectedNode) {
          this.selectedNode.link = event.form.link;
          this.selectedNode.section[0].series = event.form.options;
          for (let index = 0; index < this.selectedNode.section[0].series.length; index++) {
            if (this.selectedNode.section[0].series[index].type != event.form.options[index].type) {
              this.selectedNode.section[0].series[index].type = event.form.options[index]?.type;
            }
          }
          for (let i = 0; i < this.selectedNode.section[0].chartTitlesValues.length; i++) {
            this.selectedNode.section[0].chartTitlesValues[i].value = event.form.options[i].value;
            this.selectedNode.section[0].series[i].title = event.form.options[i].name1;
          }
          this.selectedNode.section[0].series = event.form.options;
          if (this.selectedNode.link != undefined) {
            this.requestSubscription = this.builderService.genericApis("analyticsChart").subscribe({
              next: (res) => {
                this.selectedNode.section[0].chart = res.chart;
                this.selectedNode.section[0].stroke = res.stroke;
                this.selectedNode.section[0].plotOptions = res.plotOptions;
                this.selectedNode.section[0].colors = res.colors;
                for (let j = 0; j < res.series.length; j++) {
                  this.selectedNode.section[0].series[j].name = res.series[j].name;
                  this.selectedNode.section[0].series[j].title = res.series[j].name;
                  this.selectedNode.section[0].series[j].data = res.series[j].data;
                }
                this.selectedNode.section[0].fill = res.fill;
                this.selectedNode.section[0].labels = res.labels;
                this.selectedNode.section[0].markers = res.markers;
                this.selectedNode.section[0].xaxis = res.xaxis;
                this.selectedNode.section[0].yaxis = res.yaxis;
                this.selectedNode.section[0].tooltip = res.tooltip;
                this.selectedNode.section[0].grid = res.grid;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
        }
        break;

      case "widgetSectionChart":
        if (this.selectedNode) {
          this.selectedNode.limit = event.form.limit;
          this.selectedNode.belowpercentage = event.form.percentage;
          this.selectedNode.belowpercentageColor = event.form.below_percentage_color;
          // for (let i = 0; i < event.form.options.length; i++) {
          //   this.selectedNode.section[i].name = event.form.options[i].name
          //   this.selectedNode.section[i].total = event.form.options[i].total
          //   this.selectedNode.section[i].percentage = event.form.options[i].percentage
          //   var data : any = [];
          //   data.push(event.form.options[i].data)
          //   this.selectedNode.section[i].data = data
          // };
          // this.selectedNode.section = event.form.options;
          this.selectedNode.link = event.form.link;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api) {
              this.requestSubscription = this.builderService.genericApis(event.form.options[index].api).subscribe({
                next: (res) => {
                  this.selectedNode.section = '';
                  for (let h = 0; h < event.form.options.length; h++) {
                    if (event.form.options[index].api != undefined) {
                      this.selectedNode.section[index].total = res.total;
                      this.selectedNode.section[index].percentage = res.percentage;
                      this.selectedNode.section[index].data = res.Chart.series[0].data;
                      this.selectedNode.section[index].Chart = res.Chart;
                      this.updateNodes();
                    }
                  }
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            }
          }
          if (this.selectedNode.link != undefined) {
            this.requestSubscription = this.builderService.genericApis("widgetChart").subscribe({
              next: (res) => {
                this.selectedNode.section = res;
                for (let index = 0; index < res.length; index++) {
                  this.selectedNode.section[index].data = res[index].Chart.series[0].data;
                }
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
            event.form.link = "";
          }
        }
        break;

      case "SectionChart":
        if (this.selectedNode) {
          this.selectedNode.limit = event.form.limit;
          this.selectedNode.belowpercentage = event.form.percentage;
          this.selectedNode.section.icon = event.form.options;
          this.selectedNode.section.name = event.form.options;
          this.selectedNode.section.percentage = event.form.options;
          this.selectedNode.section.total = event.form.options;
          this.selectedNode.belowpercentageColor = event.form.below_percentage_color;
          this.selectedNode.link = event.form.link;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.requestSubscription = this.builderService.genericApis(event.form.options[index].api).subscribe({
                next: (res) => {
                  for (let h = 0; h < event.form.options.length; h++) {
                    if (event.form.options[index].api != undefined) {
                      this.selectedNode.section[index].total = res.total;
                      this.selectedNode.section[index].percentage = res.percentage;
                      this.updateNodes();
                    }
                  }
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                }
              })
            }
          }
          if (this.selectedNode.link != undefined) {
            this.requestSubscription = this.builderService.genericApis("widgetSecondCard").subscribe({
              next: (res) => {
                this.selectedNode.section = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
            event.form.link = "";
          }
        }
        break;

      case "heading":
        if (this.selectedNode) {
            this.selectedNode.heading = event.form.heading,
          this.selectedNode.color = event.form.color;
          // this.selectedNode.paddingLeft = event.form.paddingLeft;
          // this.selectedNode.paddingRight = event.form.paddingRight;
          // this.selectedNode.paddingTop = event.form.paddingTop;
          // this.selectedNode.paddingBottom = event.form.paddingBottom;
          this.selectedNode.fontstyle = event.form.fontstyle;
          this.selectedNode.text = event.form.text;
          this.selectedNode.style = event.form.style;
          this.selectedNode.fontSize = event.form.style + event.form.textAlignment + 'color:' + event.form.headingColor;
          this.selectedNode.textAlign = event.form.textAlign;
          this.selectedNode.headingColor = event.form.headingColor;
          if (event.form.headingApi) {
            this.requestSubscription = this.builderService.genericApis(event.form.headingApi).subscribe({
              next: (res) => {
                this.selectedNode.data = res.data;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          this.updateNodes();
        }
        break;

      case "paragraph":
        if (this.selectedNode) {
          this.selectedNode.text = event.form.text;
          this.selectedNode.editable = event.form.editable;
          this.selectedNode.editableTooltip = event.form.editableTooltip;
          this.selectedNode.copyable = event.form.copyable;
          this.selectedNode.copyTooltips = event.form.copyTooltips;
          this.selectedNode.ellipsis = event.form.ellipsis;
          this.selectedNode.suffix = event.form.suffix;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.expandable = event.form.expandable;
          this.selectedNode.ellipsisRows = event.form.ellipsisRows;
          this.selectedNode.nztype = event.form.nztype;
          this.selectedNode.beforecopyIcon = event.form.beforecopyIcon;
          this.selectedNode.aftercopyIcon = event.form.aftercopyIcon;
          this.selectedNode.editableIcon = event.form.editableIcon;
          this.selectedNode.color = event.form.color;
          this.selectedNode.fontstyle = event.form.fontstyle;
          // if (event.form.api) {
          //   this.builderService.genericApis(event.form.api).subscribe((res => {
          //     this.updateNodes()
          //   }));
          // }

        }
        break;

      case "step":
        if (this.selectedNode) {
          // this.selectedNode.hideExpression = event.form.hideExpression;
          // this.selectedNode.className = event.form.className;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.description = event.form.description;
          this.selectedNode.status = event.form.status;
          this.selectedNode.label = event.form.label;
          this.selectedNode.subtitle = event.form.subtitle;
          // this.selectedNode.percentage = event.form.percentage;

          this.updateNodes()
        }
        break;

      case "mainStep":
        if (this.selectedNode) {
          this.selectedNode.direction = event.form.direction;
          this.selectedNode.placement = event.form.placement;
          this.selectedNode.size = event.form.size;
          // this.selectedNode.status = event.form.status;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.stepperType = event.form.stepperType;
          this.selectedNode.nodes = event.form.nodes;
          this.addDynamic(event.form.nodes, 'step', 'mainStep')
        }
        break;
      case "page":
        if (this.selectedNode.id) {
          this.selectedNode.screenVariables = event.form.variables;
        }
        break;

      case "pageHeader":
        if (this.selectedNode.id) {
          this.selectedNode.headingSize = event.form.headingSize;
          this.selectedNode.header = event.form.header;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.selectedNode.alertPosition = event.form.alertPosition;
          this.selectedNode.isBordered = event.form.isBordered;
        }
        break;

      case "pageBody":
        if (this.selectedNode.id) {
        }
        break;

      case "pageFooter":
        if (this.selectedNode.id) {
          this.selectedNode.footer = event.form.footer;
        }
        break;
      case "according":
        if (this.selectedNode.id) {
          this.selectedNode.sectionClassName = event.form.sectionClassName;
          this.selectedNode.sectionDisabled = event.form.disabled;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.selectedNode.repeatable = event.form.repeatable;
          this.selectedNode.size = event.form.size;
          this.selectedNode.status = event.form.status;
          this.selectedNode.isBordered = event.form.isBordered;
          this.selectedNode?.children?.[1]?.children?.forEach(res => {
            if (res) {
              if (res.formly != undefined) {
                if (res.type != "stepperMain" && res.type != "tabsMain") {
                  res['wrapper'] = [];
                  res.wrapper.push(event.form.wrappers);
                  res['dataOnly'] = event.form.disabled;
                  if (event.form.sectionClassName) {
                    res['className'] = event.form.sectionClassName
                  }
                  res.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, res.formly[0].fieldGroup);
                }
                if (res.type == "tabsMain") {
                  res.children?.forEach((element: any) => {
                    element.children.forEach((elementV1: any) => {
                      elementV1['wrapper'] = event.form.wrappers;
                      if (event.form.sectionClassName) {
                        res['className'] = event.form.sectionClassName
                      }
                      elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                    });
                  });
                }
                if (res.type == "stepperMain") {
                  res.children?.forEach((element: any) => {
                    element.children.forEach((elementV1: any) => {
                      elementV1['wrapper'] = event.form.wrappers;
                      if (event.form.sectionClassName) {
                        res['className'] = event.form.sectionClassName
                      }
                      elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                    });
                  });
                }
              }
              if (res.type == "mainDashonicTabs") {
                res.children?.forEach((element: any) => {
                  element.children.forEach((elementV1: any) => {
                    elementV1['wrapper'] = event.form.wrappers;
                    if (event.form.sectionClassName) {
                      res['className'] = event.form.sectionClassName
                    }
                    elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                  });
                });
              }
              if (res.type == "accordionButton") {
                res?.children?.forEach((elementV1: any) => {
                  elementV1['wrapper'] = event.form.wrappers;
                  if (event.form.sectionClassName) {
                    res['className'] = event.form.sectionClassName
                  }
                  elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                });
              }
              // if (event.form.className) {
              //   res.className = event.form.className;
              // }
            }
          })
          this.clickBack();
        }
        break;
      case "accordingHeader":
        if (this.selectedNode.id) {
          this.selectedNode.headingSize = event.form.headingSize;
          this.selectedNode.backGroundColor = event.form.backGroundColor;
          this.selectedNode.textColor = event.form.textColor;
          this.selectedNode.header = event.form.header;
          this.selectedNode.expanded = event.form.expanded;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.updateNodes();
        }
        break;

      case "accordingBody":
        if (this.selectedNode.id) {
        }
        break;

      case "accordingFooter":
        if (this.selectedNode.id) {
          this.selectedNode.footer = event.form.footer;
        }
        break;
      case "switch":
        if (this.selectedNode) {
          this.selectedNode.size = event.form.size;
          this.selectedNode.checkedChildren = event.form.checkedChildren;
          this.selectedNode.unCheckedChildren = event.form.unCheckedChildren;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.loading = event.form.loading;
          this.selectedNode.control = event.form.control;
          this.selectedNode.model = event.form.model;
        }
        break;
      case "multiFileUpload":
        if (this.selectedNode.id) {
          this.selectedNode.uploadBtnLabel = event.form.title;
          this.selectedNode.multiple = event.form.multiple;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.uploadBtnLabel = event.form.uploadBtnLabel;
          this.selectedNode.uploadLimit = event.form.uploadLimit;
          this.selectedNode.size = event.form.size;
          this.selectedNode.showDialogueBox = event.form.showDialogueBox;
          this.selectedNode.showUploadlist = event.form.showUploadlist;
          this.selectedNode.onlyDirectoriesAllow = event.form.onlyDirectoriesAllow;
        }
        break;
      case "textEditor":
        if (this.selectedNode.id) {
        }
        break;

      case "tabs":
        if (this.selectedNode.id) {
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.disabled = event.form.disabled;
          this.updateNodes();
        }
        break;
      case "kanban":
        if (this.selectedNode.id) {
          this.selectedNode.text = event.form.title;
          this.selectedNode.nodes = event.form.nodes;
          this.updateNodes();
        }
        break;
      case "kanbanTask":
        if (this.selectedNode.id) {
          if (this.selectedNode.children) {
            for (let i = 0; i < this.selectedNode.children.length; i++) {
              this.selectedNode.children[i].id = event.form.options[i].id;
              this.selectedNode.children[i].title = event.form.options[i].title;
              this.selectedNode.children[i].date = event.form.options[i].date;
              this.selectedNode.children[i].content = event.form.options[i].content;
              this.selectedNode.children[i].users = JSON.parse(event.form.options[i].users);
              this.selectedNode.children[i].status = event.form.options[i].status;
              this.selectedNode.children[i].variant = event.form.options[i].variant;
            }
          }

          if (event.form.kanbanTaskApi != undefined) {
            this.requestSubscription = this.builderService.genericApis(event.form.kanbanTaskApi).subscribe({
              next: (res) => {
                this.selectedNode = res;
                for (let index = 0; index < res.length; index++) {
                  this.selectedNode.id = res[index].id;
                  this.selectedNode.title = res[index].title;
                  this.selectedNode.date = res[index].date;
                  this.selectedNode.users = res[index].users;
                  this.selectedNode.status = res[index].status;
                  this.selectedNode.variant = res[index].variant;
                  this.selectedNode.content = res[index].content;
                }
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          this.updateNodes();
        }
        break;

      case "mainTab":
        if (this.selectedNode.id) {
          this.selectedNode.selectedIndex = event.form.selectedIndex;
          this.selectedNode.animated = event.form.animated;
          this.selectedNode.size = event.form.size;
          this.selectedNode.tabPosition = event.form.tabPosition;
          this.selectedNode.tabType = event.form.tabType;
          this.selectedNode.hideTabs = event.form.hideTabs;
          this.selectedNode.nodes = event.form.nodes;
          this.selectedNode.centerd = event.form.centerd;
          this.addDynamic(event.form.nodes, 'tabs', 'mainTab')
          this.updateNodes();
        }
        break;
      case "progressBar":
        if (this.selectedNode.id) {
          this.selectedNode.progressBarType = event.form.progressBarType;
          this.selectedNode.percent = event.form.percent;
          this.selectedNode.showInfo = event.form.showInfo;
          this.selectedNode.status = event.form.status;
          this.selectedNode.strokeLineCap = event.form.strokeLineCap;
          this.selectedNode.success = event.form.success;
          this.updateNodes()
        }
        break;


      case "divider":
        if (this.selectedNode.id) {
          this.selectedNode.dividerText = event.form.dividerText;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.dashed = event.form.dashed;
          this.selectedNode.dividerType = event.form.dividerType;
          this.selectedNode.orientation = event.form.orientation;
          this.selectedNode.plain = event.form.plain;
          this.updateNodes()
        }
        break;

      case "sharedMessagesChart":

        if (this.selectedNode.id) {
          this.selectedNode.labelIcon = event.form.labelIcon;
          this.selectedNode.heading = event.form.heading;
          this.selectedNode.headingIcon = event.form.headingIcon;
          this.selectedNode.headingColor = event.form.headingColor;
          this.selectedNode.subHeading = event.form.subHeading;
          this.selectedNode.subHeadingIcon = event.form.subHeadingIcon;
          this.selectedNode.subheadingColor = event.form.subheadingColor;
          this.selectedNode.link = event.form.link;
          for (let index = 0; index < this.selectedNode.sharedMessagesConfig[0].length; index++) {
            this.selectedNode.sharedMessagesConfig[0].message = event.form.options.message;
            this.selectedNode.sharedMessagesConfig[0].dateAndTime = event.form.options.dateAndTime;
            this.selectedNode.sharedMessagesConfig[0].icon = event.form.options.icon;
            this.selectedNode.sharedMessagesConfig[0].icon1 = event.form.options.icon1;
          }
          if (event.form.api != undefined) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                this.selectedNode.sharedMessagesConfig = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
          this.updateNodes()
        }
        break;

      case "audio":
        if (this.selectedNode.id) {
          this.selectedNode.audioSrc = event.form.audioSrc;
          this.updateNodes()
        }
        break;
      case "carouselCrossfade":
        if (this.selectedNode.id) {
          this.selectedNode.effect = event.form.effect;
          this.selectedNode.dotPosition = event.form.dotPosition;
          this.selectedNode.autoPlay = event.form.autoPlay;
          this.selectedNode.autolPlaySpeed = event.form.autolPlaySpeed;
          this.selectedNode.showDots = event.form.showDots;
          this.selectedNode.enableSwipe = event.form.enableSwipe;
          event.tableDta != undefined ? this.selectedNode.carousalConfig = event.tableDta : this.selectedNode.carousalConfig = this.selectedNode.carousalConfig;
          if (event.form.link != undefined || event.form.link != "") {
            this.requestSubscription = this.builderService.genericApis(event.form.link).subscribe({
              next: (res) => {
                this.selectedNode.carousalConfig = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }

            })
          }
        }
        break;
      case "videos":
        if (this.selectedNode.id) {
          this.selectedNode.videoConfig[0].title = event.form.title;
          this.selectedNode.videoConfig[0].videoRatio = event.form.videoRatio;
          this.selectedNode.videoConfig[0].videoSrc = event.form.videoSrc;
          this.selectedNode.videoConfig[0].tooltip = event.form.tooltip;
          this.updateNodes()
        }
        break;
      case "alert":
        if (this.selectedNode.id) {
          this.selectedNode.text = event.form.text;
          this.selectedNode.alertColor = event.form.alertColor;
          this.selectedNode.alertType = event.form.alertType;
          this.selectedNode.banner = event.form.banner;
          this.selectedNode.showIcon = event.form.showIcon;
          this.selectedNode.closeable = event.form.closeable;
          this.selectedNode.description = event.form.description;
          this.selectedNode.closeText = event.form.closeText;
          this.selectedNode.iconType = event.form.iconType;
          this.selectedNode.action = event.form.action;
          this.updateNodes()
        }
        break;
      case "timeline":
        if (this.selectedNode.id) {
            this.selectedNode.labelText = event.form.labelText,
            this.selectedNode.dotIcon = event.form.dotIcon,
            this.selectedNode.mainIcon = event.form.mainIcon,
            this.selectedNode.timecolor = event.form.timecolor,
            this.selectedNode.position = event.form.position,
            this.selectedNode.pendingText = event.form.pendingText,
            this.selectedNode.reverse = event.form.reverse,
            this.selectedNode.mode = event.form.mode
          if (event.tableDta) {
            this.selectedNode.data = event.tableDta;
          }
          if (event.form.api) {
            this.requestSubscription = this.builderService.genericApis(event.form.api).subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.data = res;
                  this.updateNodes();
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
              }
            })
          }
        }
        break;
      case "simpleCardWithHeaderBodyFooter":
        if (this.selectedNode.id) {
          this.selectedNode.headerText = event.form.headerText;
          this.selectedNode.bodyText = event.form.bodyText;
          this.selectedNode.footerText = event.form.footerText;
          this.selectedNode.height = event.form.height;
          this.selectedNode.link = event.form.link;
          this.selectedNode.textAlign = event.form.textAlign;
          this.selectedNode.borderless = event.form.borderless;
          this.selectedNode.extra = event.form.extra;
          this.selectedNode.hover = event.form.hover;
          this.selectedNode.loading = event.form.loading;
          this.selectedNode.nztype = event.form.nztype;
          this.selectedNode.size = event.form.size;
          this.selectedNode.imageAlt = event.form.imageAlt;
          this.selectedNode.imageSrc = event.form.imageSrc;
          this.updateNodes()
        }
        break;

      default:
        break;

    }
    this.showSuccess();
    this.updateNodes();
    this.closeConfigurationList();
  }
  showSuccess() {
    this.toastr.success('Information update successfully!', { nzDuration: 3000 });
  }
  addDynamic(abc: any, subType: any, mainType: any,) {

    if (this.selectedNode.children) {
      let tabsLength = this.selectedNode.children?.length;
      if (tabsLength < abc) {
        for (let k = 0; k < abc; k++) {
          if (tabsLength < abc) {
            this.addControlToJson(subType);
            this.selectedNode = this.tabsChild;
            this.addControlToJson('text', this.textJsonObj);
            this.selectedNode = this.tabsAdd;
            tabsLength = tabsLength + 1;
          }
        }
      }
      else {
        if (this.selectdParentNode.children) {
          let removeTabsLength = this.selectedNode.children.length;
          let checkParentLength = this.selectdParentNode.children.length;
          for (let a = 0; a < removeTabsLength; a++) {
            for (let i = 0; i < checkParentLength; i++) {
              for (let j = 0; j < removeTabsLength; j++) {
                if (this.selectdParentNode.children[i].type == mainType) {
                  if (abc < tabsLength) {
                    this.remove(this.selectdParentNode.children[i], this.selectedNode.children[tabsLength - 1]);
                    tabsLength = tabsLength - 1;
                  }
                }
              }
            }
          }
        }
      }
    }

  }


  searchControll() {
    this.searchControllData = [];
    var input = (document.getElementById("searchControll") as HTMLInputElement).value.toUpperCase();
    if (input && input != " ") {
      this.htmlTabsData[0].children.forEach((a: any) => {
        a.children.forEach((b: any) => {
          b.children.forEach((c: any) => {
            if (c.label.toUpperCase().includes(input)) {
              this.searchControllData.push(c)
            }
          });
        });
      });
    }
  }
  diasabledAndlabelPosition(formValues: any, fieldGroup: any) {
    debugger
    if (fieldGroup) {
      if (fieldGroup[0].props) {
        if (formValues.disabled == "editable") {
          fieldGroup[0].props.disabled = false;
        }
        else if (formValues.disabled == "disabled") {
          fieldGroup[0].props.disabled = true;
        }
        else if (formValues.disabled == "disabled-But-ditable") {
          fieldGroup[0].props.disabled = true;
        }
        if (formValues.status) {
          fieldGroup[0].props.config.status = formValues.status;
        }
        if (formValues.size) {
          fieldGroup[0].props.config.size = formValues.size;
        }
        if (formValues.sectionClassName) {
          fieldGroup[0].props.className = formValues.sectionClassName;
          fieldGroup[0].className = formValues.sectionClassName;
        }
        if (formValues.wrappers) {
          fieldGroup[0].wrappers[0] = [formValues.wrappers][0];
          fieldGroup[0].props.config['wrapper'] = [formValues.wrappers][0];
          if (formValues.wrappers == 'floating_filled' || formValues.wrappers == 'floating_outlined' || formValues.wrappers == 'floating_standard') {
            if (fieldGroup[0].props.config.size == 'small' || fieldGroup[0].props.config.size == 'large') {
              this.selectedNode.size = 'default ';
              // this.toastr.error('Small and large size are not allowed in case of floating wrappers so by default its default size', { nzDuration: 3000 });
            }
            if (fieldGroup[0].props.config['addonRight'] != '' || fieldGroup[0].props.config['addonLeft'] != '' || fieldGroup[0].props.config['prefixicon'] != '' || fieldGroup[0].props.config['suffixicon'] != '') {
              // this.toastr.error('Right , left text and icon are not allowed in case of floating wrappers', { nzDuration: 3000 });
              fieldGroup[0].props.config['addonRight'] = '';
              fieldGroup[0].props.config['addonLeft'] = '';
              fieldGroup[0].props.config['prefixicon'] = '';
              fieldGroup[0].props.config['suffixicon'] = '';
            }
            fieldGroup[0].props.placeholder = " ";
          }
          if (formValues.wrappers == 'floating_filled') {
            fieldGroup[0].props.config['floatFieldClass'] = 'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
            fieldGroup[0].props.config['floatLabelClass'] = 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4';
          }
          else if (formValues.wrappers == 'floating_outlined') {
            fieldGroup[0].props.config['floatFieldClass'] = 'block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
            fieldGroup[0].props.config['floatLabelClass'] = 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1';
          }
          else if (formValues.wrappers == 'floating_standard') {
            fieldGroup[0].props.config['floatFieldClass'] = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
            fieldGroup[0].props.config['floatLabelClass'] = 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';
          }
        }
        fieldGroup[0].props.labelPosition = formValues?.labelPosition;
      }
    }
    return fieldGroup;
  }

  functionName: any;
  mainTemplate() {
    this.requestSubscription = this.builderService.genericApis(this.functionName).subscribe({
      next: (res) => {
        if (this.selectedNode.children)
          this.selectedNode.children.push(res)
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  }

  jsonStringify(data: any) {
    return JSON.stringify(data)
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
  jsonParse(data: any) {
    return JSON.parse(data)
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

  assigOptionsData(selectNode: any, tableDta: any, api: any) {

    if (tableDta) {
      selectNode = tableDta;
      return selectNode;
    }
    if (api) {
      this.requestSubscription = this.builderService.genericApis(api).subscribe({
        next: (res) => {
          if (res) {
            selectNode = res;
            this.updateNodes();
            return selectNode;
          }
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      })
    }
  }

  jsonUpload(event: any) {
    debugger
    let contents
    event;
    if (event.target instanceof HTMLInputElement && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        contents = reader.result as string;
        var makeData = JSON.parse(contents);
        var currentData = JSON.parse(
          JSON.stringify(makeData.menuData, function (key, value) {
            if (typeof value == 'function') {
              return value.toString();
            } else {
              return value;
            }
          }) || '{}');

        var data =
        {
          "moduleName": makeData.moduleName,
          "menuData": currentData,
          "moduleId": makeData.moduleId,
        };
        this.nodes = makeData.menuData;
        // this.employeeService.menuTabs(makeData.moduleId).subscribe(((res: any) => {
        //   if (res.length > 0) {
        //     this.employeeService.jsonDeleteBuilder(res[0].id).subscribe((res => {
        //       this.employeeService.jsonSaveBuilder(data).subscribe((res => {
        //         alert("Data Save");
        //       }))
        //     }))
        //   }
        //   else {
        //     this.employeeService.jsonSaveBuilder(data).subscribe((res => {
        //       alert("Data Save");
        //     }))
        //   }
        // }))
      };
      reader.readAsText(event.target.files[0]);
    }
  }
  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  removeHighlightOnsaveScreen() {

  }
}

