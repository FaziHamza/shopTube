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
import { INITIAL_EVENTS } from '../shared/event-utils/event-utils';
import { ElementData } from '../models/element';
import { ColorPickerService } from '../services/colorpicker.service';
import { DataService } from '../services/offlineDb.service';
import { EncryptionService } from '../services/encryption.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddControlService } from './service/addControl.service';

@Component({
  selector: 'st-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  isSavedDb = false;
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
  moduleId: any;
  screenPage: boolean = false;
  fieldData: GenaricFeild;
  validationFieldData: GenaricFeild;
  searchControllData: any = [];
  selectedNode: TreeNode;
  selectdParentNode: TreeNode;
  formModalData: any;
  isActiveShow: string;
  filterMenuData: any = [];
  joiValidationData: TreeNode[] = [];
  isVisible: string;
  showSectionOnly: boolean = false;
  columnData: any = [];
  controlListvisible = false;
  requestSubscription: Subscription;




  constructor(public builderService: BuilderService,
    // private formBuilder: FormBuilder,
    private _encryptionService: EncryptionService,
    private toastr: NzMessageService,
    private dataService: DataService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private addControlService: AddControlService,
    private clickButtonService: BuilderClickButtonService, public dataSharedService: DataSharedService, private colorPickerService: ColorPickerService) {
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
  updateNodes() {
    this.nodes = [...this.nodes];
    if (this.isSavedDb)
      this.saveOfflineDB();
    // this.cdr.detectChanges();
  }
  saveOfflineDB() {
    let data = this.jsonStringifyWithObject(this.nodes);
    let encryptData = this._encryptionService.encryptData(data)
    this.dataService.saveData(this.screenName, encryptData);
  }
  getOfflineDb() {
    let data = this.dataService.getNodes(this.screenName);
    let decryptData = this._encryptionService.decryptData(data)
    this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(decryptData));
    // let data = this.jsonParse(this.jsonStringifyWithObject(data));
  }
  async applyOfflineDb(content: 'previous' | 'next' | 'delete') {
    if (content === 'delete') {
      const nodes = await this.dataService.deleteDb(this.screenName);
      alert('this Screen Delete db successfully!')
      return;
    }
    const nodes = await this.dataService.getNodes(this.screenName);

    if (this.oldIndex === undefined) {
      this.decryptData(nodes[nodes.length - 1]);
      this.oldIndex = nodes.length - 1;
      return;
    }

    const index = content === 'next' ? this.oldIndex + 1 : this.oldIndex - 1;

    if (index < 0 || index >= nodes.length) {
      const message = content === 'next' ? 'Sorry there is no JSON Forward' : 'Sorry there is no JSON Backward';
      this.toastr.error(message);
      return;
    }

    const node = nodes[index];
    this.decryptData(node);
    this.oldIndex = index;
  }

  // async applyOfflineDb(content:any){
  //   let data  =await this.dataService.getNodes(this.screenName);
  //   if(this.oldIndex != undefined){
  //     if(content == 'previous' && this.oldIndex == 0)
  //     {
  //       return this.toastr.error("Sorry there is no JSON Backward");
  //     }
  //     else if(content == 'next' && this.oldIndex + 1 == data.length){
  //       return this.toastr.error("Sorry there is no JSON Forward");
  //     }
  //     else{
  //       if (this.oldIndex != undefined) {
  //         for (let index = 0; index < data.length; index++) {
  //             if (content == 'next' && index == this.oldIndex + 1) {
  //               this.decryptData(data[index]);
  //               this.oldIndex = index;
  //               break;
  //             } else if (content == 'previous' && index == this.oldIndex - 1) {
  //               this.decryptData(data[index]);
  //               this.oldIndex =index;
  //               break;
  //             }
  //         }
  //       }

  //     }
  //   }
  //   else {
  //     this.decryptData(data[data.length - 1]);
  //     this.oldIndex = data.length - 1;
  //   }
  // }
  oldIndex: number;
  decryptData(data: any) {
    let decryptData = this._encryptionService.decryptData(data?.data)
    this.nodes = this.jsonParseWithObject(decryptData);
  }

  deleteOfflineDb() {
    let data = this.dataService.deleteDb(this.screenName);
  }
  JsonEditorShow() {

    this.IslayerVisible = false;
    this.IsjsonEditorVisible = true;
    this.IsShowConfig = true;
    this.applySize();
  }
  saveJson() {

    if (this.selectedNode) {
      this.highlightSelect(this.selectedNode.id, false);
    }
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
  previousScreenName: string = '';
  getFormLayers(data: any) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to switch your screen?',
      nzOnOk: () => {
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
          this.screenName = data;
          this.previousScreenName = data;
          this.isSavedDb = false;
          const newScreenName = this.screenModule.filter((a: any) => a.name == this.screenName);
          this.requestSubscription = this.builderService.screenById(newScreenName[0].screenId).subscribe({
            next: (res) => {
              if (res.length > 0) {
                this.isSavedDb = true;
                this.screenId = res[0].id;
                this.moduleId = res[0].moduleId;
                this.formlyModel = [];
                this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(res[0].menuData));
                this.updateNodes();
                this.applyDefaultValue();
                this.getJoiValidation(this.moduleId);
                // if (res[0].menuData[0].children[1]) {

                //   // this.uiRuleGetData(res[0].moduleId);
                //   // this.uiGridRuleGetData(res[0].moduleId);
                // }
                // else {
                //   this.screenId = res[0].id;
                //   this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(res[0].menuData));
                //   // this.uiRuleGetData(res[0].moduleId);
                //   // this.uiGridRuleGetData(res[0].moduleId);
                // }

              }
              else {
                this.screenId = 0;
                this.clearChildNode();
              }
              this.isSavedDb = true;
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
        }).catch(() => this.screenName = this.previousScreenName)
      },
      nzOnCancel: () => {
        this.screenName = this.previousScreenName;
        console.log('User clicked Cancel');
      }
    });
  }
  applyDefaultValue() {
    const filteredNodes = this.filterInputElements(this.nodes);
    filteredNodes.forEach(node => {
      const formlyConfig = node.formly?.[0]?.fieldGroup?.[0]?.defaultValue;
      if (formlyConfig)
        this.formlyModel[node?.formly?.[0]?.fieldGroup?.[0]?.key] = formlyConfig;
    });
  }
  clearChildNode() {
    this.isSavedDb = false;
    if (this.screenPage) {
      this.formlyModel = [];
      const newNode = [{
        id: 'page',
        key:'page_' + Guid.newGuid(),
        title: 'page',
        type: "page",
        footer: false,
        header: false,
        options: [
          {
            VariableName: ''
          }
        ],
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
      this.addControlToJson('sections', null);
      this.selectedNode = this.sectionsections;
      this.addControlToJson('header', null);
      this.addControlToJson('body', null);
      this.addControlToJson('footer', null);
      this.selectedNode = this.sectionAccorBody;
      this.addControlToJson('text', this.textJsonObj);
      this.selectedNode = newNode[0];
      this.addControlToJson('pageFooter', null);
      this.updateNodes();
      this.saveOfflineDB();
      this.isSavedDb = true;
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
  sectionsections: TreeNode;
  sectionBageBody: TreeNode;
  sectionAccorBody: TreeNode;
  stepperAdd: TreeNode;
  ParentAdd: TreeNode;
  stepperChild: TreeNode;
  chilAdd: TreeNode;
  screenData: any;
  businessRuleData: any;
  formlyModel: any;
  faker: boolean = false;
  makeFaker() {
    let dataModelFaker: any = [];
    if (this.nodes.length > 0) {
      const filteredNodes = this.filterInputElements(this.nodes);
      filteredNodes.forEach(node => {
        dataModelFaker[node.formly[0].fieldGroup[0].key] = this.makeFakerData(node);
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
  getJoiValidation(id: any) {
    if (id > 0) {
      this.builderService.jsonGetScreenValidationRule(id).subscribe((getRes => {
        this.joiValidationData = getRes;
      }))
    }
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
        this.updateNodes();
        this.updateFormlyModel();
        // this.cdr.detectChanges();

      }
      this.getSetVariableRule(model, currentValue);
    }
  }
  getSetVariableRule(model: any, value: any) {
    //for grid amount assign to other input field
    const filteredNodes = this.filterInputElements(this.nodes);
    filteredNodes.forEach(node => {
      const formlyConfig = node.formly?.[0]?.fieldGroup?.[0]?.props?.config;
      if (formlyConfig)
        if (formlyConfig.setVariable != "" && formlyConfig.setVariable)
          if (model?.props?.config?.getVariable != "")
            if (formlyConfig?.setVariable === model?.props?.config?.getVariable) {
              this.formlyModel[node?.formly?.[0]?.fieldGroup?.[0]?.key] = value;
            }
    });
  }
  //#region GetInputFormly

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
        if (inputType[l].type == "button" || inputType[l].type == "linkbutton" || inputType[l].type == "dropdownButton") {
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
        else if (inputType[l].type == "input" || inputType[l].type == "inputGroup" || inputType[l].type == "number" || inputType[l].type == "checkbox" ||
          inputType[l].type == "color" || inputType[l].type == "decimal" || inputType[l].type == "image" ||
          inputType[l].type == "multiselect" || inputType[l].type == "radiobutton" || inputType[l].type == "search" ||
          inputType[l].type == "repeatSection" || inputType[l].type == "tags" || inputType[l].type == "telephone" ||
          inputType[l].type == "textarea" || inputType[l].type == "date" || inputType[l].type == "datetime" ||
          inputType[l].type == "month" || inputType[l].type == "time" || inputType[l].type == "week") {
          if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].formly[0].fieldGroup[0].key && currentValue) {
            inputType[l].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
            inputType[l].formly[0].fieldGroup[0].defaultValue = this.screenData.uiData[index].targetCondition[k].inputJsonData.defaultValue;
          } else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].formly[0].fieldGroup[0].key && !currentValue) {
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
  columnApply(value: any) {
    if (value == 'sections')
      return 'w-full'
    else if (value == 'body')
      return 'px-6 pt-6 pb-10';
    else if (value == 'buttonGroup')
      return 'w-11/12';
    else
      return 'sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2';
  }
  addControlToJson(value: string, data?: any) {
    debugger
    if (value == "stepperMain" || value == "tabsMain" || value == "mainDashonicTabs" || value == "kanban") {
      this.selectForDropdown = this.selectedNode;
    }
    let node = this.selectedNode;
    let newNode: any = {};
    if (data?.parameter == 'input') {
      newNode = {
        id: value.toLowerCase() + "_" + Guid.newGuid(),
        className: this.columnApply(value),
        expanded: true,
        type: value,
        title: value,
        children: [],
        tooltip: '',
        hideExpression: false,
        highLight: false,
      }
    }
    else {
      newNode = {
        key: value.toLowerCase() + "_" + Guid.newGuid(),
        id: value.toLowerCase() + "_" + Guid.newGuid(),
        className: this.columnApply(value),
        expanded: true,
        type: value,
        title: value,
        children: [],
        tooltip: '',
        hideExpression: false,
        highLight: false,
      }
    }



    switch (value) {
      case "page":
        newNode = { ...newNode, ...this.addControlService.getPageControl() };
        break;
      case "pageHeader":
        newNode = { ...newNode, ...this.addControlService.getPageHeaderControl() };
        break;
      case "pageBody":
        newNode = { ...newNode, ...this.addControlService.getPageBodyControl() };
        this.sectionBageBody = newNode;
        break;
      case "pageFooter":
        newNode = { ...newNode, ...this.addControlService.getPageFooterControl() };
        break;
      case "sections":
        newNode = { ...newNode, ...this.addControlService.getSectionControl() };
        this.sectionsections = newNode;
        break;
      case "header":
        newNode = { ...newNode, ...this.addControlService.getHeaderControl() };
        break;
      case "body":
        newNode = { ...newNode, ...this.addControlService.getBodyControl() };
        this.sectionAccorBody = newNode;
        break;
      case "footer":
        newNode = { ...newNode, ...this.addControlService.getFooterControl() };
        break;
      case "buttonGroup":
        newNode = { ...newNode, ...this.addControlService.getButtonGroupControl() };
        break;
      case "insertButton":
      case "updateButton":
      case "deleteButton":
        newNode = { ...newNode, ...this.addControlService.getInsertButtonControl() };
        break;
      case "dropdownButton":
        newNode = { ...newNode, ...this.addControlService.getDropdownButtonControl() };
        break;
      case "cardWithComponents":
        newNode = { ...newNode, ...this.addControlService.getCardWithComponentsControl() };
        break;
      case "switch":
        newNode = { ...newNode, ...this.addControlService.getSwitchControl() };
        break;
      case "imageUpload":
        newNode = { ...newNode, ...this.addControlService.getImageUploadControl() };
        break;
      case "progressBar":
        newNode = { ...newNode, ...this.addControlService.getProgressBarControl() };
        break;
      case "video":
        newNode = { ...newNode, ...this.addControlService.getVideoControl() };
        break;
      case "audio":
        newNode = { ...newNode, ...this.addControlService.getAudioControl() };
        break;
      case "carouselCrossfade":
        newNode = { ...newNode, ...this.addControlService.getCarouselCrossfadeControl() };
        break;
      case "calender":
        newNode = { ...newNode, ...this.addControlService.getCalenderControl() };
        break;
      case "sharedMessagesChart":
        newNode = { ...newNode, ...this.addControlService.getSharedMessagesChartControl() };
        break;
      case "alert":
        newNode = { ...newNode, ...this.addControlService.getAlertControl() };
        break;
      case "simpleCardWithHeaderBodyFooter":
        newNode = { ...newNode, ...this.addControlService.getSimpleCardWithHeaderBodyFooterControl() };
        break;
      case "tabs":
        newNode = { ...newNode, ...this.addControlService.getTabsControl() };
        this.chilAdd = newNode
        break;
      case "mainTab":
        newNode = { ...newNode, ...this.addControlService.getMainTabControl() };
        this.ParentAdd = newNode
        break;
      case "mainStep":
        newNode = { ...newNode, ...this.addControlService.getMainStepControl() };
        this.ParentAdd = newNode
        break;
      case "step":
        newNode = { ...newNode, ...this.addControlService.getStepControl() };
        this.chilAdd = newNode
        break;
      case "kanban":
        newNode = { ...newNode, ...this.addControlService.getKanbanControl() };
        break;
      case "kanbanTask":
        newNode = { ...newNode, ...this.addControlService.getKanbanTaskControl() };
        break;
      case "linkbutton":
        newNode = { ...newNode, ...this.addControlService.getLinkbuttonControl() };
        break;
      case "simplecard":
        newNode = { ...newNode, ...this.addControlService.simplecardControl() };
        break;
      case "chartcard":
        newNode = { ...newNode, ...this.addControlService.chartcardControl() };
        break;

      case "sectionCard":
        newNode = { ...newNode, ...this.addControlService.sectionCardControl() };
        break;

      case "widgetSectionCard":
        newNode = { ...newNode, ...this.addControlService.widgetSectionCardControl() };
        break;

      case "donutChart":
        newNode = { ...newNode, ...this.addControlService.donutChartControl() };
        break;

      case "browserChart":
        newNode = { ...newNode, ...this.addControlService.browserChartControl() };
        break;

      case "browserCombineChart":
        newNode = { ...newNode, ...this.addControlService.browserCombineChartControl() };
        break;

      case "donuteSaleChart":
        newNode = { ...newNode, ...this.addControlService.donuteSaleChartControl() };
        break;

      case "salesAnalyticschart":
        newNode = { ...newNode, ...this.addControlService.salesAnalyticschartControl() };
        break;

      case "heading":
        newNode = { ...newNode, ...this.addControlService.headingControl() };
        break;

      case "paragraph":
        newNode = { ...newNode, ...this.addControlService.paragraphControl() };
        break;

      case "htmlBlock":
        newNode = { ...newNode, ...this.addControlService.htmlBlockControl() };
        break;

      case "textEditor":
        newNode = { ...newNode, ...this.addControlService.textEditorControl() };
        break;

      case "editor_js":
        newNode = { ...newNode, ...this.addControlService.editor_jsControl() };
        break;

      case "breakTag":
        newNode = { ...newNode, ...this.addControlService.breakTagControl() };
        break;

      case "multiFileUpload":
        newNode = { ...newNode, ...this.addControlService.multiFileUploadControl() };
        break;

      case "gridList":
        newNode = { ...newNode, ...this.addControlService.gridListControl() };
        break;

      case "column":
        newNode = { ...newNode, ...this.addControlService.columnControl() };
        break;

      case "timeline":
        newNode = { ...newNode, ...this.addControlService.timelineControl() };
        this.ParentAdd = newNode;
        break;

      case "fixedDiv":
        newNode = { ...newNode, ...this.addControlService.fixedDivControl() };
        this.chilAdd = newNode;
        break;

      case "accordionButton":
        newNode = { ...newNode, ...this.addControlService.accordionButtonControl() };
        break;

      case "divider":
        newNode = { ...newNode, ...this.addControlService.dividerControl() };
        break;

      case "toastr":
        newNode = { ...newNode, ...this.addControlService.toastrControl() };
        break;

      case "rate":
        newNode = { ...newNode, ...this.addControlService.rateControl() };
        break;

      case "rangeSlider":
        newNode = { ...newNode, ...this.addControlService.rangeSliderControl() };
        break;

      case "invoice":
        newNode = { ...newNode, ...this.addControlService.invoiceControl() };
        break;

      case "affix":
        newNode = { ...newNode, ...this.addControlService.affixControl() };
        break;

      case "statistic":
        newNode = { ...newNode, ...this.addControlService.statisticControl() };
        break;

      case "backTop":
        newNode = { ...newNode, ...this.addControlService.backTopControl() };
        break;

      case "anchor":
        newNode = { ...newNode, ...this.addControlService.anchorControl() };
        break;

      case "modal":
        newNode = { ...newNode, ...this.addControlService.modalControl() };
        break;

      case "popConfirm":
        newNode = { ...newNode, ...this.addControlService.popConfirmControl() };
        break;

      case "avatar":
        newNode = { ...newNode, ...this.addControlService.avatarControl() };
        break;

      case "badge":
        newNode = { ...newNode, ...this.addControlService.badgeControl() };
        break;

      case "comment":
        newNode = { ...newNode, ...this.addControlService.commentControl() };
        break;

      case "popOver":
        newNode = { ...newNode, ...this.addControlService.popOverControl() };
        break;

      case "description":
        newNode = { ...newNode, ...this.addControlService.descriptionControl() };
        break;

      case "descriptionChild":
        newNode = { ...newNode, ...this.addControlService.descriptionChildControl() };
        break;

      case "segmented":
        newNode = { ...newNode, ...this.addControlService.segmentedControl() };
        break;

      case "result":
        newNode = { ...newNode, ...this.addControlService.resultControl() };
        break;

      case "nzTag":
        newNode = { ...newNode, ...this.addControlService.nzTagControl() };
        break;

      case "treeSelect":
        newNode = { ...newNode, ...this.addControlService.treeSelectControl() };
        break;

      case "transfer":
        newNode = { ...newNode, ...this.addControlService.transferControl() };
        break;

      case "spin":
        newNode = { ...newNode, ...this.addControlService.spinControl() };
        break;

      case "tree":
        newNode = { ...newNode, ...this.addControlService.treeControl() };
        break;

      case "cascader":
        newNode = { ...newNode, ...this.addControlService.cascaderControl() };
        break;

      case "drawer":
        newNode = { ...newNode, ...this.addControlService.drawerControl() };
        break;

      case "skeleton":
        newNode = { ...newNode, ...this.addControlService.skeletonControl() };
        break;

      case "empty":
        newNode = { ...newNode, ...this.addControlService.emptyControl() };
        break;

      case "list":
        newNode = { ...newNode, ...this.addControlService.listControl() };
        break;

      case "treeView":
        newNode = { ...newNode, ...this.addControlService.treeViewControl() };
        break;

      case "message":
        newNode = { ...newNode, ...this.addControlService.messageControl() };
        break;

      case "mentions":
        newNode = { ...newNode, ...this.addControlService.mentionsControl() };
        break;

      case "notification":
        newNode = { ...newNode, ...this.addControlService.notificationControl() };
        break;

      case "icon":
        newNode = { ...newNode, ...this.addControlService.iconControl() };
        break;
      default:
        if (data?.parameter === 'input') {
          let formlyObj = {
            type: data?.configType,
            formlyType: data?.parameter,
            hideExpression: false,
            title: data?.label,
            formly: [
              {
                fieldGroup: [
                  {
                    key: data?.configType.toLowerCase() + "_" + Guid.newGuid(),
                    type: data?.type,
                    defaultValue: "",
                    focus: false,
                    wrappers: this.getLastNodeWrapper("wrappers"),
                    props: {
                      multiple: true,
                      className: 'sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2',
                      attributes: {
                        autocomplete: 'off',
                      },
                      config: {
                        getVariable: '',
                        setVariable: '',
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
                        wrapper: this.getLastNodeWrapper("configWrapper"),
                        floatFieldClass: '',
                        floatLabelClass: '',
                        formatAlignment: 'ltr',
                      },
                      maxLength: 10000000,
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
                      // disabled: this.getLastNodeWrapper("disabled"),
                      readonly: false,
                      hidden: false,
                      options: this.makeFormlyOptions(data?.options),
                      keyup: (model: any) => {
                        let currentVal = model.formControl.value;
                        this.formlyModel[model.key] = model.formControl.value;
                        this.checkConditionUIRule(model, currentVal);
                      }
                    },
                  },
                ]
              },
            ],
          }
          newNode = { ...newNode, ...formlyObj };
        }
        break;
    }
    this.addNode(node, newNode);
    this.updateNodes();
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
    let wrapper: any = 'form-field-horizontal'
    let disabledProperty: any;
    const filteredNodes = this.filterInputElements(this.selectedNode);
    for (let index = 0; index < filteredNodes.length; index++) {
      wrapperName = filteredNodes[index].formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
      wrapper = filteredNodes[index].formly?.at(0)?.fieldGroup?.at(0)?.wrappers[0];
      disabledProperty = filteredNodes[index].formly?.at(0)?.fieldGroup?.at(0)?.props?.disabled;
      break;
    }
    if (dataType == 'wrappers') {
      return wrapperName;
    } 
    else if (dataType == 'disabled') {
      return disabledProperty;
    }
    else if (dataType == 'configWrapper') {
      return wrapper;
    }
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
    // this.clickButton(node?.title);
    this.clickButton(node?.type);
    this.dataSharedService.nodes = this.nodes;
    this.dataSharedService.screenModule = this.screenModule;
    this.dataSharedService.selectedNode = this.selectedNode;
    this.dataSharedService.screenName = this.screenName;

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

  clickButton(type: any) {
    debugger
    let _formFieldData = new formFeildData();
    this.validationFieldData = new GenaricFeild({
      type: 'inputValidationRule',
      title: "Change Attribute Values",
      formData: _formFieldData.inputValidationRuleFields,
    });
    if (this.joiValidationData.length > 0) {
      let getJoiRule = this.joiValidationData.filter(a => a.id == this.selectedNode.id);
      if (getJoiRule.length)
        this.validationFieldData.modelData = getJoiRule[0];
    }
    let veriableOptions: any[] = [];
    if (this.nodes[0].options) {
      for (let index = 0; index < this.nodes[0].options.length; index++) {
        const element = this.nodes[0].options[index];
        veriableOptions.push({
          label: element.VariableName,
          value: element.VariableName,
        })
      }
    }
    const filteredFields: any = _formFieldData.commonFormlyConfigurationFields[0].fieldGroup
    const getVar = filteredFields.filter((x: any) => x.key == "getVariable");
    const index = filteredFields.indexOf(getVar[0]);
    // if (_formFieldData.commonOtherConfigurationFields[0].fieldGroup) {
    //   _formFieldData.commonOtherConfigurationFields[0].fieldGroup[index].props!.options = veriableOptions;
    //   _formFieldData.commonOtherConfigurationFields[0].fieldGroup[index + 1].props!.options;
    // }
    if (_formFieldData.commonFormlyConfigurationFields[0].fieldGroup) {
      _formFieldData.commonFormlyConfigurationFields[0].fieldGroup[index].props!.options = veriableOptions;
      _formFieldData.commonFormlyConfigurationFields[0].fieldGroup[index + 1].props!.options = veriableOptions;
    }

    this.fieldData = new GenaricFeild({
      type: type,
      title: "Change Attribute Values",
      commonData: _formFieldData.commonOtherConfigurationFields,
    });
    const selectedNode = this.selectedNode;
    let configObj: any = {
      id: selectedNode.id as string, className: selectedNode.className,
      key: selectedNode.key,
      title: selectedNode.title,
      tooltip: selectedNode.tooltip,
      hideExpression: selectedNode.hideExpression
    };

    switch (type) {
      case "breakTag":
        configObj = { ...configObj };
        // this.fieldData.formData = _formFieldData.breakTagFeilds;
        break;

      case "drawer":
        configObj = { ...configObj, ...this.clickButtonService.getDrawerConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.drawerFields;
        break;
      case "cardWithComponents":
        configObj = { ...configObj, ...this.clickButtonService.getcardWithComponentsConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.cardWithComponentsFields;
        break;
      case "icon":
        configObj = { ...configObj, ...this.clickButtonService.getIconConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.commonIconFields;
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
        case "htmlBlock":
        configObj = { ...configObj, ...this.clickButtonService.htmlBlockConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.htmlBlockFields;
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
        this.addIconCommonConfiguration(_formFieldData.statisticFields);
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
        // this.fieldData.formData = _formFieldData.fixedDivFields;
        break;

      case "calender":
        configObj = { ...configObj, ...this.clickButtonService.getCalenderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.tuiCalendarFeilds;
        break;

      case "multiFileUpload":
        configObj = { ...configObj, ...this.clickButtonService.getMultiFileUploadConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.multiFileUploadFeilds;
        break;

      case "textEditor":
        configObj = { ...configObj, ...this.clickButtonService.getTextEditorConfig(selectedNode) };
        // this.fieldData.formData = _formFieldData.textEditorFeilds;
        break;

      case "switch":
        configObj = { ...configObj, ...this.clickButtonService.getSwitchConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.switchFeilds;
        break;

      case "tabs":

        configObj = { ...configObj, ...this.clickButtonService.getTabsConfig(selectedNode) };
        this.addIconCommonConfiguration(_formFieldData.tabsFields)
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
        this.fieldData.formData = _formFieldData.headingFields;
        break;

      case "paragraph":
        configObj = { ...configObj, ...this.clickButtonService.getParagraphConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.paragraphFields;
        break;

      case "tags":
      case "repeatSection":
      case "multiselect":
      case "tag":
      case "search":
      case "radiobutton":
      case "checkbox":
      case "datetime":
      case "time":
      case "timepicker":
      case "date":
      case "month":
      case "year":
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
      case "url":
        configObj = { ...configObj, ...this.clickButtonService.getFormlyConfig(selectedNode) };
        this.fieldData.commonData = _formFieldData.commonFormlyConfigurationFields;
        switch (type) {
          case "search":
            this.fieldData.formData = _formFieldData.selectFields;
            break;
          case "radiobutton":
          case "checkbox":
            this.fieldData.formData = _formFieldData.radioFields;
            break;
          case "color":
            this.fieldData.formData = _formFieldData.colorFields;
            break;
          case "autoComplete":
            this.fieldData.formData = _formFieldData.autoCompleteFields;
            break;
          case "date":
            this.fieldData.formData = _formFieldData.zorroDateFields;
            break;
          case "number":
            this.fieldData.formData = _formFieldData.numberFields;
            break;
          case "repeatSection":
          case "multiselect":
          case "tag":
            this.fieldData.formData = _formFieldData.zorroSelectFields;
            break;
          case "timepicker":
            this.fieldData.formData = _formFieldData.zorroTimeFields;
            break;
        }
        break;
      case "customMasking":
        configObj = { ...configObj, ...this.clickButtonService.getMaskingFormlyConfig(selectedNode) };
        this.fieldData.commonData = _formFieldData.commonFormlyConfigurationFields;
        this.fieldData.formData = _formFieldData.customMaskingFields;
        break;
      case "button":
        configObj = { ...configObj, ...this.clickButtonService.getButtonConfig(selectedNode) };
        this.addIconCommonConfiguration(_formFieldData.buttonFields);
        this.fieldData.formData = _formFieldData.buttonFields;
        break;
      case "dropdownButton":
        configObj = { ...configObj, ...this.clickButtonService.getDropdownButtonConfig(selectedNode) };
        this.addIconCommonConfiguration(_formFieldData.dropdownButtonFields);
        this.fieldData.formData = _formFieldData.dropdownButtonFields;
        break;
      case "accordionButton":
        debugger
        configObj = { ...configObj, ...this.clickButtonService.getAccordionButtonConfig(selectedNode) };
        this.addIconCommonConfiguration(_formFieldData.accordionButtonFields);
        this.fieldData.formData = _formFieldData.accordionButtonFields;
        break;
      case "linkbutton":
        configObj = { ...configObj, ...this.clickButtonService.getLinkButtonConfig(selectedNode) };
        this.addIconCommonConfiguration(_formFieldData.linkButtonFields);
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
        // this.fieldData.formData = _formFieldData.pageBodyFields;
        break;
      case "pageFooter":
        configObj = { ...configObj, ...this.clickButtonService.getFooterConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.pageFooterFields;
        break;
      case "sections":
        if (this.fieldData.commonData && this.fieldData.commonData[0].fieldGroup)
          // this.fieldData.commonData[0].fieldGroup[4] = {
          //   className: "w-1/2",
          //   key: 'className',
          //   type: 'input',
          //   wrappers: ["formly-vertical-theme-wrapper"],
          //   props: {
          //     label: 'Section ClassName',
          //     // options: [
          //     //   {
          //     //     label: 'Full',
          //     //     value: 'w-full'
          //     //   },
          //     //   {
          //     //     label: 'col-6',
          //     //     value: 'w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2'
          //     //   },
          //     //   {
          //     //     label: 'col-4',
          //     //     value: 'w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3'
          //     //   },
          //     //   {
          //     //     label: 'col-3',
          //     //     value: 'w-full sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4'
          //     //   },
          //     // ]
          //   }
          // };
          configObj = { ...configObj, ...this.clickButtonService.getSectionConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.sectionsFields;
        break;
      case "header":
        configObj = { ...configObj, ...this.clickButtonService.getSectionHeaderConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.headerFields;
        break;
      case "footer":
        configObj = { ...configObj, ...this.clickButtonService.getSectionFooterConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.footerFields;
        break;
      case "body":
        configObj = { ...configObj, ...this.clickButtonService.getSectionBodyConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.bodyFields;
        break;
      case "step":
        configObj = { ...configObj, ...this.clickButtonService.getStepperConfig(selectedNode) };
        this.addIconCommonConfiguration(_formFieldData.stepperFields);
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

  highlightSelect(id: any, highlightOrNot: boolean) {
    this.applyOrRemoveHighlight(this.nodes[0], id, highlightOrNot);
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
    });
  }
  addSection() {
    this.sectionBageBody = this.nodes[0].children[1];
    this.selectedNode = this.sectionBageBody,
      this.addControlToJson('sections', null);
    this.selectedNode = this.sectionsections;
    this.addControlToJson('header', null);
    this.addControlToJson('body', null);
    this.addControlToJson('footer', null);
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
  // insertAt(parent: any, node: any) {
  //   // this.highlightSelect(this.selectedNode.id,true)
  //   parent = parent.parentNode.origin;
  //   node = node.origin;
  //   var nodeData = JSON.parse(JSON.stringify(node));
  //   if (parent.children) {
  //     const idx = parent.children.indexOf(node as TreeNode);
  //     this.newChild = [];
  //     if (nodeData.children[0] != undefined) {
  //       if (nodeData.type != "buttonGroup" && nodeData.type != "stepperMain" && nodeData.type != "mainDashonicTabs" && nodeData.type != "gridList" && nodeData.type != "gridListEditDelete" && nodeData.type != "kanban" && nodeData.type != "accordionButton" && nodeData.type != "fixedDiv") {
  //         nodeData.id = nodeData.id + Guid.newGuid();

  //         for (let index = 0; index < this.nodes.length; index++) {
  //           for (let k = 0; k < this.nodes[index].children.length; k++) {
  //             if (this.nodes[index].children[k].type == 'pageBody') {
  //               const element = JSON.parse(JSON.stringify(this.nodes[index].children[1].children[idx]));
  //               // element.id = element.id+idx+1;
  //               // formly checker
  //               for (let i = 0; i < element.children.length; i++) {
  //                 // for (let a = 0; a < this.nodes[index].children[1].children.length; a++) {
  //                 //   this.nodes[index].children[1].children[a].id = Guid.newGuid();
  //                 //   this.nodes[index].children[1].children[a].formly[0].key = Guid.newGuid();
  //                 // }
  //                 if (element.children[i].type == 'body') {
  //                   element.children[i].id = element.children[i].id + Guid.newGuid();
  //                   element.children[i].formly[0].key = element.children[i].formly[0].key + Guid.newGuid();
  //                   for (let a = 0; a < element.children[i].children.length; a++) {
  //                     if (element.children[i].children[a].formly != undefined) {
  //                       element.children[i].children[a].formly[0].fieldGroup[0].key = element.children[i].children[a].formly[0].fieldGroup[0].key + Guid.newGuid();
  //                       element.children[i].children[a].formly[0].fieldGroup[0].id = element.children[i].children[a].formly[0].fieldGroup[0].id + Guid.newGuid();
  //                     } else if (element.children[i].children[a].type != "buttonGroup")
  //                       element.children[i].children[a].id = element.children[i].children[a].id + Guid.newGuid();
  //                     else if (element.children[i].children[a].type == "buttonGroup") {
  //                       element.children[i].children[a].id = element.children[i].children[a].id + Guid.newGuid();
  //                       for (let b = 0; b < element.children[i].children[a].children.length; b++) {
  //                         element.children[i].children[a].children[b].id = element.children[i].children[a].children[b].id + Guid.newGuid();
  //                       }
  //                     }
  //                   }

  //                 }
  //                 // else
  //                 // element.children[j].children[i].id = element.children[j].children[i].id+ Guid.newGuid();
  //               }
  //               let obj = {};
  //               if (nodeData.formly != undefined) {
  //                 obj = { id: Guid.newGuid(), title: element.title, type: element.type, footer: element.footer, header: element.header, expanded: element.expanded, sectionDisabled: element.sectionDisabled, highLight: element.highLight, isNextChild: element.isNextChild, children: element.children[0].children, key: Guid.newGuid(), formly: element.formly }
  //               }
  //               else if (nodeData?.type == "buttonGroup") {
  //                 for (let index = 0; index < element.children[0].children[1].children.length; index++) {
  //                   if (element.children[0].children[1].children[index].type == "buttonGroup") {
  //                     obj = { id: element.id + Guid.newGuid(), title: element.title, type: element.type, children: element.children[0].children[1].children[index].children, key: element.key }
  //                   }
  //                 }
  //               }
  //               else {
  //                 obj = { id: element.id + Guid.newGuid(), title: element.title, type: element.type, children: element.children, key: element.key }
  //               }
  //               this.newChild.push(obj);
  //             }
  //           }
  //         }

  //         for (let index = 0; index < nodeData.children.length; index++) {
  //           nodeData.children[index].id = nodeData.children[index].id + Guid.newGuid();
  //           for (let indexChildren = 0; indexChildren < nodeData.children[index].children.length; indexChildren++) {
  //             nodeData.children[index].children[indexChildren].id = nodeData.children[index].children[indexChildren].id + Guid.newGuid();
  //           }
  //         }
  //         const newNode = {
  //           id: nodeData.id + Guid.newGuid(),
  //           title: nodeData.title,
  //           type: nodeData?.type,
  //           footer: nodeData.footer,
  //           expanded: nodeData.expanded,
  //           sectionDisabled: nodeData.sectionDisabled,
  //           highLight: nodeData.highLight,
  //           isNextChild: nodeData.isNextChild,
  //           children: nodeData.children,
  //           formly: nodeData?.formly,
  //           key: nodeData.key + Guid.newGuid(),

  //         } as TreeNode;
  //         parent.children.splice(idx as number + 1, 0, newNode);
  //       }
  //       else {
  //         nodeData.id = nodeData.id + Guid.newGuid();
  //         nodeData.children.forEach((element: any) => {
  //           element.id = element.id + Guid.newGuid();
  //           if (element) {
  //             if (element.length > 0) {
  //               if (element.formly) {
  //                 element.formly[0].fieldGroup[0].key = element.formly[0].fieldGroup[0].key + Guid.newGuid();
  //               }
  //             }
  //           }
  //           element.children.forEach((element1: any) => {
  //             element1.id = element1.id + Guid.newGuid();
  //             if (element1) {
  //               if (element1.length > 0) {
  //                 if (element1.formly) {
  //                   element1.formly[0].fieldGroup[0].key = element1.formly[0].fieldGroup[0].key + Guid.newGuid();
  //                 }
  //               }
  //             }
  //           });
  //         });
  //         const newNode = nodeData;
  //         const idx = parent.children.indexOf(node as TreeNode);
  //         parent.children.splice(idx as number + 1, 0, newNode);
  //       }
  //     }
  //     else {
  //       if (nodeData.formly) {
  //         if (nodeData.formly != undefined) {
  //           nodeData.formly[0].fieldGroup[0].key = Guid.newGuid();
  //           nodeData.formly[0].fieldGroup[0].id = Guid.newGuid();
  //         }
  //       }
  //       nodeData.id = nodeData.id + Guid.newGuid();
  //       const newNode = nodeData;
  //       const idx = parent.children.indexOf(node as TreeNode);
  //       parent.children.splice(idx as number + 1, 0, newNode);
  //     }
  //   }
  //   else {
  //     const idx = this.nodes.indexOf(node as TreeNode);
  //     this.newChild = [];
  //     for (let index = 0; index < this.nodes[idx].children.length; index++) {
  //       const element = JSON.parse(JSON.stringify(this.nodes[idx].children[index]));
  //       for (let j = 0; j < element.children.length; j++) {
  //         if (node?.formly != undefined) {
  //           element.children[j].formly[0].fieldGroup[0].key = Guid.newGuid();
  //           element.children[j].formly[0].fieldGroup[0].id = Guid.newGuid();
  //         } else
  //           element.children[j].key = Guid.newGuid();
  //       }
  //       let obj = {};
  //       if (nodeData.formly != undefined) {
  //         obj = { id: Guid.newGuid(), title: element.title, type: element.type, children: element.children, key: Guid.newGuid(), formly: element.formly }
  //       }
  //       else {
  //         obj = { id: element.id + Guid.newGuid(), title: element.title, type: element.type, children: element.children, key: element.key }
  //       }
  //       this.newChild.push(obj);

  //     }
  //     // this.newChild.forEach(elementV2 => {
  //     //   elementV2.id=elementV2.id+"f"+1;
  //     // });

  //     const newNode = {
  //       id: this.nodes[idx].id + "_" + idx + '_1',
  //       title: nodeData.title,
  //       children: this.newChild,
  //       formly: this.nodes[idx].formly,
  //       type: this.nodes[idx].type,
  //       className: nodeData?.className,
  //     } as TreeNode;
  //     this.nodes.splice(idx + 1, 0, newNode);

  //   }

  //   this.updateNodes();
  //   // this.jsonStringifData();

  //   // array.splice(index, 0, ...elementsArray);
  // }
  insertAt(node: any) {

    let parent = node?.parentNode?.origin;
    node = node.origin;
    if (node.type != 'page' && node.type != 'pageHeader' && node.type != 'pageBody' && node.type != 'pageFooter' && node.type != 'header' && node.type != 'body' && node.type != 'footer') {
      let newNode = JSON.parse(JSON.stringify(node));
      newNode = this.changeIdAndkey(newNode);
      const idx = parent.children.indexOf(node as TreeNode);
      parent.children.splice(idx as number + 1, 0, newNode);
      if (parent) {
        if (parent.type == 'mainTab' || parent.type == 'dropdown') {
          parent.nodes = parent.children.length;
        }
      }
      this.updateNodes();
    } else {
      this.toastr.error("Don't copy this!", { nzDuration: 3000 });
    }

  }
  traverseAndChange(node: any) {
    debugger
    if (node) {
      node = this.changeIdAndkey(node);
      if (node.children) {
        node.children.forEach((child: any) => {
          this.traverseAndChange(child);
        });
      }
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

  addFunctionsInHtml(type: any) {
    debugger
    if (type == "dashonictabsAddNew")
      this.addChildControlsWithSubChild('mainTab', 'tabs');
    else if (type == "stepperAddNew")
      this.addChildControlsWithSubChild('mainStep', 'step');
    else if (type == "kanabnAddNew")
      this.addChildControls('kanban','kanbanTask');
    else if (type == "timelineAddnew")
      this.addChildControlsWithSubChild('timeline', 'timelineChild');
    else if (type == "address_form" || type == "employee_form" || type == "login_Form" || type == "signUp_Form")
      this.formDataFromApi(type);
    else if (type == "addSection")
      this.addSection();
  }

  addChildControls(parent?: any, child?: any) {
    this.addControlToJson(parent);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    // this.selectedNode = this.ParentAdd;
    this.selectedNode = this.selectForDropdown;
    this.updateNodes();
  }
  addChildControlsWithSubChild(parent: any, child: any) {
    this.addControlToJson(parent);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.chilAdd;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.chilAdd;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.chilAdd;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.selectForDropdown;
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
    debugger
    if (event.type && event.type != "inputValidationRule") {
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
      case "cardWithComponents":
        if (this.selectedNode) {
          this.selectedNode.borderless = event.form.borderless;
        }
        break;
      case "icon":
        if (this.selectedNode) {
          debugger
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.iconType = event.form.iconType;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['iconColor'] = event.form.iconColor;
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
        case "htmlBlock":
        if (this.selectedNode) {
          this.selectedNode.data = event.form.data;
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
          this.selectedNode.shapeType = event.form.shapeType;
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
          this.selectedNode.ngvalue = event.form.ngvalue;
          if (event.tableDta) {
            this.selectedNode.options = event.tableDta.map((option: any) => option.label);
          } else {
            this.selectedNode.options = this.selectedNode.options;
          }
        }
        break;
      case "statistic":
        if (this.selectedNode) {
          this.selectedNode.prefixIcon = event.form.icon;
          this.selectedNode.suffixIcon = event.form.suffixIcon;
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['iconColor'] = event.form.iconColor;
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
          this.selectedNode.notificationType = event.form.notificationType;
          this.selectedNode.placement = event.form.placement;
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
      case "multiselect":
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
      case "year":
      case "week":
      case "datetime":
      case "date":
      case "color":
      case "autoComplete":
      case "number":
      case "customMasking":
        case "url":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode['hideExpression'] = event.form.hideExpression;
          this.selectedNode.formly?.forEach(elementV1 => {
            // MapOperator(elementV1 = currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            fieldGroup[0].defaultValue = event.form.defaultValue;
            // fieldGroup[0].hideExpression = event.form.hideExpression;
            const props = fieldGroup[0]?.props ?? {};
            props.label = event.form.title;
            props['key'] = event.form.key;
            this.formlyModel[event.form.key] = event.form.defaultValue ? event.form.defaultValue : this.formlyModel[event.form.key];
            this.updateFormlyModel();
            props['className'] = event.form.className;
            // props['hideExpression'] = event.form.hideExpression;
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
            props['maskString'] = event.form.maskString;
            props['masktitle'] = event.form.masktitle;
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
            props.config['setVariable'] = event.form?.setVariable;
            props.config['getVariable'] = event.form?.getVariable;
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
        }
        break;
      case "inputValidationRule":

        if (this.selectedNode) {
          debugger
          const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
          const jsonRuleValidation = {
            "moduleName": this.screenName,
            "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
            "id": this.selectedNode.id,
            "key": this.selectedNode?.formly?.[0]?.fieldGroup?.[0]?.key,
            "type": event.form.type,
            "label": event.form.label,
            "reference": event.form.reference,
            "minlength": event.form.minlength,
            "maxlength": event.form.maxlength,
            "pattern": event.form.pattern,
            "required": event.form.required,
            "emailTypeAllow": event.form.emailTypeAllow,
          }
          var JOIData = JSON.parse(JSON.stringify(jsonRuleValidation) || '{}');
          if (mainModuleId.length > 0) {
            this.builderService.jsonGetValidationRule(mainModuleId[0].screenId, event.form.id).subscribe((getRes => {

              getRes;
              if (getRes.length > 0) {
                this.builderService.jsonDeleteValidationRule(event.form.id).subscribe((delRes => {

                  this.builderService.jsonSaveValidationRule(JOIData).subscribe((saveRes => {

                    alert("Data Save");
                  }))
                }))
              }
              else {
                this.builderService.jsonSaveValidationRule(JOIData).subscribe((saveRes => {

                  alert("Data Save");
                }))
              }
            }))
          }
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
          this.selectedNode.text = event.form.text;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.bgColor = event.form.bgColor;
          this.selectedNode.color = event.form.color;
          this.selectedNode.gap = event.form.gap;
          this.selectedNode.alt = event.form.alt;
          this.selectedNode.size = event.form.size;
          this.selectedNode.shape = event.form.shape;
          if (event.form.src) {
            this.selectedNode.src = event.form.src;
          }
          else if (this.dataSharedService.imageUrl) {
            this.selectedNode.src = this.dataSharedService.imageUrl;
            this.dataSharedService.imageUrl = '';
          }
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

      case "calender":
        if (this.selectedNode.id) {
          this.selectedNode.viewType = event.form.viewType;
          this.selectedNode.view = event.form.view;
          this.selectedNode.weekends = event.form.weekends;
          this.selectedNode.editable = event.form.editable;
          this.selectedNode.selectable = event.form.selectable;
          this.selectedNode.selectMirror = event.form.selectMirror;
          this.selectedNode.dayMaxEvents = event.form.dayMaxEvents;
          this.selectedNode.details = event.form.details;
          // this.selectedNode.disabled = event.form.disabled;
          if (event.form.statusApi != undefined) {
            this.selectedNode.options = INITIAL_EVENTS;
            // this.requestSubscription = this.builderService.genericApis(event.form.statusApi).subscribe({
            //   next: (res) => {
            //     this.selectedNode.options = res;
            //     this.updateNodes();
            //   },
            //   error: (err) => {
            //     console.error(err); // Log the error to the console
            //     this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
            //   }
            // })
          }
          // this.cdr.detectChanges();
        }
        break;
      // case "customMasking":
      // if (this.selectedNode) {
      //   this.selectedNode?.formly?.forEach(elementV1 => {
      //     // MapOperator(elementV1 =currentData);
      //     const formly = elementV1 ?? {};
      //     const fieldGroup = formly.fieldGroup ?? [];
      //     const props = fieldGroup[0]?.props ?? {};
      //     props['key'] = event.form.key;
      //     props.label = event.form.title;
      //     props.focus = event.form.focus;
      //     props['hideExpression'] = event.form.hideExpression;
      //     props['defaultValue'] = event.form.defaultValue;
      //     props['required'] = event.form.required;
      //     props.readonly = event.form.readonly;
      //     props.placeholder = event.form.placeholder;
      //     props['required'] = event.form.required;
      //     props['disabled'] = event.form.disabled;
      //     props['tooltip'] = event.form.tooltip;
      //     props['maskString'] = event.form.maskString;
      //     props['maskLabel'] = event.form.maskLabel;
      //     props['labelIcon'] = event.form.labelIcon;
      //     props['addonLeft'].text = event.form.addonLeft;
      //     props['addonRight'].text = event.form.addonRight;
      //     props['tooltip'] = event.form.tooltip;
      //     props['options'] = event.form.multiselect == "" ? event.form.options : "";
      //   });
      // }
      // break;
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
          this.selectedNode.sortOrder = event.form?.sortOrder;
          this.selectedNode.isAddRow = event.form?.isAddRow;
          this.selectedNode.sortDirections = event.form.sortDirections ? JSON.parse(event.form.sortDirections) : event.form?.sortDirections;
          this.selectedNode.filterMultiple = event.form?.filterMultiple;
          this.selectedNode.tableHeaders = event.tableDta ? event.tableDta : event.form.options;
          if (this.selectedNode.tableHeaders.length > 0) {
            let newHeaders = this.selectedNode.tableHeaders.map((obj: any) => {
              let newObj = { ...obj };
              let key = newObj.key;
              if (event.form.sortOrder) {
                newObj.sortOrder = event.form.sortOrder;
              }
              if (event.form.sortDirections) {
                newObj.sortDirections = event.form.sortDirections;
                // let sortFn = (a: any, b: any) => {
                //   const propA = newObj[key]?.toLowerCase() || '';
                //   const propB = newObj[key]?.toLowerCase() || '';
                //   return propA.localeCompare(propB);
                // };
                // newObj.sortFn = sortFn;
                // newObj.sortFn = (a:any, b:any) => newObj.key.localeCompare(newObj.key);
              }
              if (event.form.filterMultiple) {
                newObj.filterMultiple = event.form.filterMultiple;
              }
              if (newObj.listOfFilter) {
                newObj.listOfFilter = JSON.parse(newObj.listOfFilter);
                // let filterFn = (address: string, item: any) => {
                //   const propValue = item[key].toLowerCase();
                //   return propValue.indexOf(address.toLowerCase()) !== -1;
                // };
                // newObj.filterFn = (address: string, item: any) => newObj.key.indexOf(newObj.key) !== -1;
              }
              return newObj;
            });
            this.selectedNode.tableHeaders = newHeaders;
          }


          this.selectedNode.tableData = this.updateTableData(this.selectedNode.tableData, event.tableDta ? event.tableDta : event.form.options);
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
          this.selectedNode.hoverColor = event.form.hoverColor;
          this.selectedNode.btnIcon = event.form.icon;
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.nzBlock = event.form.nzBlock;
          this.selectedNode.nzSize = event.form.nzSize;
          this.selectedNode.nzShape = event.form.nzShape;
          this.selectedNode.nzLoading = event.form.nzLoading;
          this.selectedNode.nzGhost = event.form.nzGhost;
          this.selectedNode.nzDanger = event.form.nzDanger;
          this.selectedNode.nzShape = event.form.nzShape;
          this.selectedNode.format = event.form.format;
          this.selectedNode.nztype = event.form.nztype;
          this.selectedNode.href = event.form.href;
          this.selectedNode.btnType = event.form.redirect;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['hoverTextColor'] = event.form.hoverTextColor;
          this.selectedNode['textColor'] = event.form.textColor;
          this.selectedNode['isSubmit'] = event.form.isSubmit;
          this.selectedNode['iconColor'] = event.form.iconColor;
          this.selectedNode['dataTable'] = event.form.dataTable;
        }
        break;

      case "buttonGroup":
        if (this.selectedNode) {
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.btngroupformat = event.form.btngroupformat;
          this.updateNodes();
        }
        break;
      case "linkbutton":

        if (this.selectedNode) {
          this.selectedNode.btnIcon = event.form.icon;
          this.selectedNode.href = event.form.href;
          this.selectedNode.btnType = event.form.target;
          this.selectedNode.hoverColor = event.form.hoverColor;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.nzBlock = event.form.nzBlock;
          this.selectedNode.nzSize = event.form.nzSize;
          this.selectedNode.nzShape = event.form.nzShape;
          this.selectedNode.nzLoading = event.form.nzLoading;
          this.selectedNode.nzDanger = event.form.nzDanger;
          this.selectedNode.format = event.form.format;
          this.selectedNode.nzGhost = event.form.nzGhost;
          this.selectedNode.btnType = event.form.target;
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['iconColor'] = event.form.iconColor;
          // this.selectedNode['dataTable'] = event.form.dataTable;
          // if (event.form.target == "modal" || event.form.target == "lg" || event.form.target == "xl" || event.form.target == "fullscreen") {
          //   this.selectedNode.btnType = "modal";
          // }
          this.updateNodes();

        }
        break;
      case "dropdownButton":

        if (this.selectedNode) {
          this.selectedNode.color = event.form.color;
          this.selectedNode.hoverColor = event.form.hoverColor;
          this.selectedNode.btnIcon = event.form.icon;
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
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode['nztype'] = event.form.nztype;
          this.selectedNode['textColor'] = event.form.textColor;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['hoverTextColor'] = event.form.hoverTextColor;
          this.selectedNode['iconColor'] = event.form.iconColor;
          this.selectedNode['dataTable'] = event.form.dataTable;
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
          this.selectedNode.nzExpandedIcon = event.form.icon;
          this.selectedNode.nzShowArrow = event.form.nzShowArrow;
          this.selectedNode.extra = event.form.extra;
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['iconColor'] = event.form.iconColor;
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
          this.selectedNode.link = event.form.link;
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
          this.selectedNode.link = event.form.link;
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
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['iconColor'] = event.form.iconColor;
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
          this.updateNodes();
          // this.clickBack();
        }
        break;
      case "page":
        if (this.selectedNode.id) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.options = event.tableDta ? event.tableDta : event.form?.options;
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
      case "sections":
        if (this.selectedNode.id) {
          this.selectedNode.sectionClassName = event.form.sectionClassName;
          this.selectedNode.sectionDisabled = event.form.disabled;
          this.selectedNode.borderColor = event.form.borderColor;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.selectedNode.repeatable = event.form.repeatable;
          this.selectedNode.size = event.form.size;
          this.selectedNode.status = event.form.status;
          this.selectedNode.isBordered = event.form.isBordered;
          this.selectedNode?.children?.[1]?.children?.forEach(res => {
            if (res) {

              if (res.formly != undefined) {
                if (res.type != "mainStep" && res.type != "mainTab") {
                  // res['wrappers'] = [];
                  // res.wrappers.push(event.form.wrappers);
                  res['dataOnly'] = event.form.disabled;
                  if (event.form.sectionClassName) {
                    res['className'] = event.form.sectionClassName
                  }
                  res.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, res.formly[0].fieldGroup);
                }
              }
              if (res.type == "mainStep") {
                res.children?.forEach((element: any) => {
                  element.children.forEach((elementV1: any) => {
                    if (event.form.sectionClassName) {
                      res['className'] = event.form.sectionClassName
                    }
                    if (elementV1.formly) {
                      elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                    }
                  });
                });
              }
              if (res.type == "cardWithComponents") {
                res.children?.forEach((element: any) => {
                  if (event.form.sectionClassName) {
                    res['className'] = event.form.sectionClassName
                  }
                  if (element.formly) {
                    element.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, element.formly[0].fieldGroup);
                  }
                });
              }
              if (res.type == "mainTab") {
                res.children?.forEach((element: any) => {
                  element.children.forEach((elementV1: any) => {
                    if (event.form.sectionClassName) {
                      res['className'] = event.form.sectionClassName
                    }
                    if (elementV1.formly) {
                      elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                    }
                  });
                });
              }
              if (res.type == "accordionButton") {
                res?.children?.forEach((elementV1: any) => {
                  if (event.form.sectionClassName) {
                    res['className'] = event.form.sectionClassName
                  }
                  if (elementV1.formly) {
                    elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                  }
                });
              }
            }
          })
          this.clickBack();
        }
        break;
      case "header":
        if (this.selectedNode.id) {
          this.selectedNode.headingSize = event.form.headingSize;
          // this.selectedNode.borderColor = event.form.borderColor;
          this.selectedNode.backGroundColor = event.form.backGroundColor;
          this.selectedNode.textColor = event.form.textColor;
          this.selectedNode.header = event.form.header;
          this.selectedNode.expanded = event.form.expanded;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.updateNodes();
        }
        break;

      case "body":
        if (this.selectedNode.id) {
          // this.selectedNode.borderColor = event.form.borderColor;
          this.selectedNode.backGroundColor = event.form.backGroundColor;
          this.selectedNode.textColor = event.form.textColor;
        }
        break;

      case "footer":
        if (this.selectedNode.id) {
          // this.selectedNode.borderColor = event.form.borderColor;
          this.selectedNode.backGroundColor = event.form.backGroundColor;
          this.selectedNode.textColor = event.form.textColor;
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
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['iconColor'] = event.form.iconColor;
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
          this.selectedNode.dividerFormat = event.form.dividerFormat;
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
            this.selectedNode['data'] = event.form.options;
          // this.addDynamic(event.form.nodes, 'timelineChild', 'timeline')
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
          this.selectedNode.description = event.form.description;
          // this.selectedNode.bgColorHeader = event.form.bgColorHeader;
          // this.selectedNode.bgColorBody = event.form.bgColorBody;
          // this.selectedNode.bgColorFooter = event.form.bgColorFooter;
          this.selectedNode.bgColor = event.form.bgColor;
          this.selectedNode.footer = event.form.footer;
          this.selectedNode['footerBorder'] = event.form.footerBorder;
          if (event.form.imageSrc) {
            this.selectedNode.imageSrc = event.form.imageSrc;
          }
          else if (this.dataSharedService.imageUrl) {
            this.selectedNode.imageSrc = this.dataSharedService.imageUrl;
          }
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
  updateTableData(tableData: any, tableHeaders: any) {
    // Loop through each object in tableData
    tableData.forEach((data: any) => {
      // Loop through each object in tableHeaders
      tableHeaders.forEach((header: any) => {
        // Check if the key exists in the data object
        if (header.key)
          if (!data.hasOwnProperty(header.key.toLowerCase())) {
            // If the key does not exist, add it with a value of null or an empty string
            data[header.key] = null; // or data[header.key] = '';
          }
      });
    });
    return tableData;
  }
  showSuccess() {
    this.toastr.success('Information update successfully!', { nzDuration: 3000 });
  }
  addDynamic(abc: any, subType: any, mainType: any,) {

    if (this.selectedNode.children) {
      let nodesLength = this.selectedNode.children?.length;
      if (nodesLength < abc) {
        for (let k = 0; k < abc; k++) {
          if (nodesLength < abc) {
            this.addControlToJson(subType);
            if (mainType != 'timeline') {
              this.selectedNode = this.chilAdd;
              this.addControlToJson('text', this.textJsonObj);
            }
            this.selectedNode = this.ParentAdd;
            nodesLength = nodesLength + 1;
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
                  if (abc < nodesLength) {
                    this.remove(this.selectdParentNode.children[i], this.selectedNode.children[nodesLength - 1]);
                    nodesLength = nodesLength - 1;
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

    if (fieldGroup) {
      if (fieldGroup[0].props) {
        if (formValues.disabled == "editable") {
          fieldGroup[0].props.disabled = false;
        }
        else if (formValues.disabled == "disabled" || formValues.disabled == "disabled-But-ditable") {
          fieldGroup[0].props.disabled = true;
        }
        fieldGroup[0].props.config.status = formValues.status;
        fieldGroup[0].props.config.size = formValues.size;
        if (formValues.sectionClassName) {
          fieldGroup[0].props.className = formValues.sectionClassName;
          fieldGroup[0].className = formValues.sectionClassName;
        }
        if (formValues.wrappers) {
          fieldGroup[0].wrappers[0] = [formValues.wrappers][0];
          fieldGroup[0].props.config['wrapper'] = [formValues.wrappers][0];
          if (formValues.wrappers == 'floating_filled' || formValues.wrappers == 'floating_outlined' || formValues.wrappers == 'floating_standard') {
            fieldGroup[0].props.config.size = 'default';
            fieldGroup[0].props.config['addonRight'] = '';
            fieldGroup[0].props.config['addonLeft'] = '';
            fieldGroup[0].props.config['prefixicon'] = '';
            fieldGroup[0].props.config['suffixicon'] = '';
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
        fieldGroup[0].props.labelPosition = formValues.labelPosition;

        fieldGroup[0].props.config['formatAlignment'] = formValues.formatAlignment;
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
        let check = value.toString();
        if (check.includes('model =>'))
          return check.replace('model =>', '(model) =>')
        else
          return check;
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
          // return new Function('return ' + value)();
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
        this.moduleId = makeData.moduleId;
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
  addIconCommonConfiguration(configurationFields: any) {
    let _formFieldData = new formFeildData();
    if (_formFieldData.commonIconFields[0].fieldGroup) {
      _formFieldData.commonIconFields[0].fieldGroup.forEach(element => {
        configurationFields[0].fieldGroup.unshift(element)
      });
    }
  }
  setCustomColor(data: any) {

    let color: string;
    color = data.target.value;
    this.colorPickerService.setCustomColor('custom-color', color);
  }
}

