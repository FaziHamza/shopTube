import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { GenaricFeild } from '../models/genaricFeild.modal';
import { TreeNode } from '../models/treeNode';
import { BuilderService } from '../services/builder.service';
import { actionTypeFeild, formFeildData } from './configurations/configuration.modal';
import { htmlTabsData } from './ControlList';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  size: NzButtonSize = 'large';
  selectModuleName: any;
  applicationBuilder: any = [];
  moduleList: any = [];
  selectApplicationName: any;
  IslayerVisible: boolean = true;
  IsjsonEditorVisible: boolean = false;
  sizes = [20, 80, 0];
  IsConfigurationVisible: boolean = true;
  IsShowConfig: boolean = true;
  htmlTabsData: any = [];
  nodes: any = [];
  screenModule: any;
  screenName: any;
  screenId: any = 0;
  screenPage: boolean = false;
  feildData: GenaricFeild;
  searchControllData: any = [];
  configurationData: any = [];
  configuratioAction: any = [];
  selectdNode: TreeNode;
  selectdParentNode: TreeNode;
  configurationList: any;

  formModalData: any;
  isActiveShow: string;
  filterMenuData: any = [];

  isVisible: string;
  showSectionOnly: boolean = false;
  columnData: any = [];
  controlListvisible = false;
  public editorOptions: JsonEditorOptions;
  constructor(public builderService: BuilderService,
    private formBuilder: FormBuilder,
    private toastr: NzMessageService) {
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
    this.screenName = "CRMAPP"
    if (this.screenName) {
      this.getFormLayers();
    }
    this.htmlTabsData = htmlTabsData;
  }
  jsonModuleSetting() {
    this.builderService.jsonScreenModuleList().subscribe((res => {
      this.screenModule = res;
    }));
  }
  loadApplications() {
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationBuilder = res;
    }));
  };
  getDataFromApi(name: any, apiType: any) {
    if (apiType == "application") {
      this.selectModuleName = "";
      this.applicationBuilder = this.applicationBuilder;
      this.builderService.getjsonModuleModuleListByapplicationName(name).subscribe((res => {
        this.moduleList = res;
      }));
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

    //<---------------- This is used to unhighlight the highlight components------------------------->//
    this.nodes[0].children?.forEach((element: any) => {
      element = this.applyHighLight(false, element);
      element.children.forEach((element1: any) => {
        if (element1.type == "buttonGroup") {
          element1.children[0].chartCardConfig[0].buttonGroup[0].highLight = false;
        }
        else if (element1.type != "buttonGroup") {
          element1 = this.applyHighLight(false, element1);
        }
        element1.children.forEach((element2: any) => {
          element2 = this.applyHighLight(false, element2);
          element2.children.forEach((element3: any) => {
            if (element3.chartCardConfig) {
              if (element3.chartCardConfig.length > 0) {
                if (element3.chartCardConfig) {
                  if (element3.chartCardConfig[0].formly != undefined) {
                    if (element3.type == "stepperMain") {
                      element3.children[0].highLight = false;

                    } else {
                      if (element3.chartCardConfig[0].formly[0].fieldGroup[0].className && element3.chartCardConfig[0].formly[0].fieldGroup[0].className.includes("highLight")) {
                        var className = element3.chartCardConfig[0].formly[0].fieldGroup[0].className;
                        element3.chartCardConfig[0].formly[0].fieldGroup[0].className = className.replace("highLight", "");
                      }
                    }
                  }
                }
                else if (element3.type == "buttonGroup") {
                  element3.children[0].chartCardConfig[0].buttonGroup[0].highLight = false;
                }
                else if (element3.type != "buttonGroup" && element3.chartCardConfig == undefined) {
                  element3 = this.applyHighLight(false, element3);
                }
                element3.children.forEach((element4: any) => {
                  if (element3.type != "buttonGroup" && element3.type != "stepperMain") {
                    element4 = this.applyHighLight(true, element4);
                  }
                });
              }
            }
          });
        });
      });
    });

    var currentData = JSON.parse(
      JSON.stringify(this.nodes, function (key, value) {
        if (typeof value == 'function') {
          return value.toString();
        } else {
          return value;
        }
      }) || '{}');
    // this.nodes =
    // var currentData = JSON.parse(JSON.stringify(this.nodes) || '{}');
    // this.prepareDragDrop(this.nodes);

    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    // var newData = JSON.parse(
    //   JSON.stringify(this.nodes, function (key, value) {
    //     if (typeof node.type =='function') {
    //       return value.toString();
    //     } else {
    //       return value;
    //     }
    //   }) || '{}');
    var newData = JSON.parse(JSON.stringify(this.nodes));
    var data =
    {
      "moduleName": this.screenName,
      "menuData": newData,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
    };

    if (this.screenId > 0) {
      this.builderService.jsonDeleteBuilder(this.screenId).subscribe((res => {
        this.builderService.jsonSaveBuilder(data).subscribe((res => {
          this.builderService.jsonBuilderSettingV1(this.screenName).subscribe((res => {
            if (res.length > 0) {
              this.screenId = res[0].id;
              alert("Data Save");
            }
          }
          ));
        }))
      }))
    } else {
      this.builderService.jsonSaveBuilder(data).subscribe((res => {
        alert("Data Save");
      }))
    }
  }
  expandedKeys :any;
  getFormLayers() {

    this.builderService.jsonBuilderSettingV1(this.screenName).subscribe((res => {

      if (res.length > 0) {
        if (res[0].menuData[0].children[1].chartCardConfig) {
          this.screenId = res[0].id;
          this.nodes = res[0].menuData;
          // this.uiRuleGetData(res[0].moduleId);
          // this.uiGridRuleGetData(res[0].moduleId);
        }
        else {
          this.screenId = res[0].id;
          this.nodes = res[0].menuData;
          // this.uiRuleGetData(res[0].moduleId);
          // this.uiGridRuleGetData(res[0].moduleId);
          // this.clickBack();
        }

      }
      else {
        this.screenId = 0;
        this.clearChildNode();
        // this.clickBack();
      }
      this.expandedKeys = this.nodes.map((node:any) => node.key);
    }
    ));
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
      // this.selectdNode = newNode[0];
      // this.addControlToJson('pageHeader');
      // this.addControlToJson('pageBody');
      // this.selectdNode = this.sectionBageBody;
      // this.addControlToJson('according');
      // this.selectdNode = this.sectionAccording;
      // this.addControlToJson('accordingHeader');
      // this.addControlToJson('accordingBody');
      // this.addControlToJson('accordingFooter');
      // this.selectdNode = this.sectionAccorBody;
      // this.addControlToJson('text');
      // this.selectdNode = newNode[0];
      // this.addControlToJson('pageFooter');
      // this.clickBack();
    }
  }
  downloadJson() {

    var currentData = JSON.parse(
      JSON.stringify(this.nodes, function (key, value) {
        if (typeof value == 'function') {
          return value.toString();
        } else {
          return value;
        }
      }) || '{}');

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

  addControlToJson(value: string,data:any) {

    if (value == "stepperMain" || value == "tabsMain" || value == "mainDashonicTabs" || value == "kanban") {
      this.selectForDropdown = this.selectdNode;
    }
    let node = this.selectdNode;
    this.IsShowConfig = true;
    if (value == 'page') {
      const newNode = {
        id: 'page_' + Guid.newGuid(),
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
        title: 'Page Header',
        type: "pageHeader",
        headingSize: "",
        footer: false,
        header: true,
        expanded: true,
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
        title: 'Section_1',
        type: "according",
        className: "",
        footer: false,
        header: false,
        expanded: true,
        sectionDisabled: "editable",
        labelPosition: "text-right",
        highLight: false,
        isNextChild: true,
        repeatable: false,
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
        label: 'Header',
        type: "accordingHeader",
        footer: false,
        headingSize: "",
        header: true,
        expanded: true,
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
        title: data?.label,
        expanded:true,
        className:'col-md-6 col-xs-12',
        // type: data?.type,
        formlyType: data?.parameter,
        formly: [
          {
            fieldGroupClassName: "row",
            fieldGroup: [
              {
                key: data?.label + Guid.newGuid(),
                type: data?.type,
                defaultValue: "",
                focus: false,
                wrappers: this.getLastNodeWrapper("wrappers"),
                templateOptions: {
                  attributes: {
                    autocomplete: 'off',
                  },
                  addonLeft: {
                    text: ''
                  },
                  addonRight: {
                    text: ''
                  },
                  type:data?.fieldType,
                  labelPosition: "text-right",
                  labelIcon: "",
                  label: data?.label,
                  placeholder: data?.label,
                  tooltip: { content: "" },
                  maskString: data?.maskString,
                  // sufix: 'INV ',
                  maskLabel: data?.maskLabel,
                  disabled: this.getLastNodeWrapper("disabled"),
                  readonly: false,
                  hidden: false,
                  options:this.makeFormlyOptions(data?.options),
                  change: (model, $event) => {

                    // let currentVal = model.form.value[model.key.toString()];
                    // let value = currentVal.split(":");
                    // currentVal = value[1].slice(1);
                    // this.formlyModel[model.key.toString()] = currentVal;
                    // this.checkConditionUIRule(model, currentVal);
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
    }
    this.nodes = [...this.nodes];
    // if (this.screenName)
    // this.saveOldJson();
  }
  makeFormlyOptions(option:any){
    if(option){
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
    }else
      return [];
  }
  addNode(node: TreeNode, newNode: TreeNode) {
    node.children.push(newNode);
    // this.dropTargetIds = [];
    // this.formlyService.templateNode = JSON.parse(JSON.stringify(this.formlyService.nodes));
    // this.formlyService.prepareDragDrop(this.formlyService.templateNode, this.selectdNode);
  }
  getLastNodeWrapper(dataType?: string) {
    let wrapperName : any = ['form-field-horizontal'];
    if (dataType == 'wrappers') {
      return wrapperName;
    } else if (dataType == 'disabled') {
      return false;
    }
    let disabledProperty: any;
    for (let j = 0; j < this.selectdNode.children.length; j++) {
      if (this.selectdNode.children[j].formlyType != undefined) {
        if (this.selectdNode.children[j].formlyType == 'input') {
          wrapperName = this.selectdNode.children[j].chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
          disabledProperty = this.selectdNode.children[j].chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
        }
        else if (this.selectdNode.children[j].type == 'tabsMain') {
          this.selectdNode.children[j].children.forEach(element => {
            element.children.forEach(elementV1 => {
              wrapperName = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
              disabledProperty = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
            });
          });
        }
        else if (this.selectdNode.children[j].type == 'stepperMain') {
          this.selectdNode.children[j].children.forEach(element => {
            element.children.forEach(elementV1 => {
              wrapperName = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
              disabledProperty = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
            });
          });
        }
        else if (this.selectdNode.children[j].type == 'mainDashonicTabs') {
          this.selectdNode.children[j].children.forEach(element => {
            element.children.forEach(elementV1 => {
              wrapperName = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
              disabledProperty = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
            });
          });
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
  openConfig(parent: TreeNode, node: TreeNode) {
    this.searchControllData = [];
    this.IsConfigurationVisible = true;
    // document.getElementById("mySidenav-right").style.width = "100%";
    this.configurationData = [];
    this.configuratioAction = [];
    this.IsShowConfig = true;
    this.applySize();
    this.selectdNode = node;
    this.selectdParentNode = parent;
    if (node.type == 'toastr') {
      this.configurationData = this.configurationList?.toastrConfiguration?.controlProperty;
    }
    else if (node.type == 'rangeSlider') {
      this.configurationData = this.configurationList?.rangeSliderConfiguration?.controlProperty;
    }
    else if (node.type == 'breakTag') {
      this.configurationData = this.configurationList?.breakTagConfiguration?.controlProperty
    }
    else if (node.type == 'inputGroupGrid') {
      this.configurationData = this.configurationList?.inputGroupGridConfiguration?.controlProperty;
    }
    else if (node.type == 'page') {
      this.configurationData = this.configurationList?.pageConfiguration?.controlProperty;
    }
    else if (node.type == 'pageHeader') {
      this.configurationData = this.configurationList?.pageHeaderConfiguration?.controlProperty;
    }
    else if (node.type == 'switch') {
      this.configurationData = this.configurationList?.switchConfiguration?.controlProperty;
    }
    else if (node.type == 'multiFileUpload') {
      this.configurationData = this.configurationList?.multiFileUploadConfiguration?.controlProperty;
    }
    else if (node.type == 'textEditor') {
      this.configurationData = this.configurationList?.texteditorConfiguration?.controlProperty;
    }
    else if (node.type == 'tuiCalender') {
      this.configurationData = this.configurationList?.tuiCalendarConfiguration?.controlProperty;
    }
    else if (node.type == 'dropdownButton') {
      this.configurationData = this.configurationList?.dropdownButtonConfiguration?.controlProperty;
    }
    else if (node.type == 'accordionButton') {
      this.configurationData = this.configurationList?.accordionButtonConfiguration?.controlProperty;
    }
    else if (node.type == 'fixedDiv') {
      this.configurationData = this.configurationList?.fixedDivConfiguration?.controlProperty;
    }
    else if (node.type == 'sharedMessagesChart') {
      this.configurationData = this.configurationList?.sharedMessagesChartConfiguration?.controlProperty;
    }
    else if (node.type == 'dashonicTabs') {
      this.configurationData = this.configurationList?.dashonicTabsConfiguration?.controlProperty;
    }
    else if (node.type == 'mainDashonicTabs') {
      this.configurationData = this.configurationList?.dashonicMainTabsConfiguration?.controlProperty;
    }
    else if (node.type == 'simpleCardWithHeaderBodyFooter') {
      this.configurationData = this.configurationList?.simpleCardWithHeaderBodyFooterConfiguration?.controlProperty;
    }
    else if (node.type == 'progressBar') {
      this.configurationData = this.configurationList?.progressBarConfiguration?.controlProperty;
    }
    else if (node.type == 'video') {
      this.configurationData = this.configurationList?.videosConfiguration?.controlProperty;
    }
    else if (node.type == 'audio') {
      this.configurationData = this.configurationList?.audioConfiguration?.controlProperty;
    }
    else if (node.type == 'kanban') {
      this.configurationData = this.configurationList?.kanbanConfiguration?.controlProperty;
    }
    else if (node.type == 'kanbanTask') {
      this.configurationData = this.configurationList?.kanbanTaskConfiguration?.controlProperty;
    }
    else if (node.type == 'carouselCrossfade') {
      this.configurationData = this.configurationList?.carouselConfiguration?.controlProperty;
    }
    else if (node.type == 'alert') {
      this.configurationData = this.configurationList?.alertConfiguration?.controlProperty;
    }
    else if (node.type == 'timeline') {
      this.configurationData = this.configurationList?.timelineConfiguration?.controlProperty;
    }
    else if (node.type == 'divider') {
      this.configurationData = this.configurationList?.dividerConfiguration?.controlProperty;
    }
    else if (node.type == 'pageBody') {
      this.configurationData = this.configurationList?.pageBodyConfiguration?.controlProperty;
    }
    else if (node.type == 'pageFooter') {
      this.configurationData = this.configurationList?.pageFooterConfiguration?.controlProperty;
    }
    else if (node.type == 'accordingHeader') {
      this.configurationData = this.configurationList?.accordingHeaderConfiguration?.controlProperty;
    }
    else if (node.type == 'accordingBody') {
      this.configurationData = this.configurationList?.accordingBodyConfiguration?.controlProperty;
    }
    else if (node.type == 'accordingFooter') {
      this.configurationData = this.configurationList?.accordingFooterConfiguration?.controlProperty;
    }
    else if (node.type == 'input') {
      if (this.selectdParentNode.type != 'gridList' && this.selectdParentNode.type != 'gridListEditDelete') {
        this.configurationData = this.configurationList?.inputConfiguration?.controlProperty;
      } else if (this.selectdParentNode.type == 'gridList' || this.selectdParentNode.type == 'gridListEditDelete') {
        this.configurationData = this.configurationList?.gridConf?.controlProperty;
      }
    }
    else if (node.type == 'inputGroup') {
      this.configurationData = this.configurationList?.inputGroupConfiguration?.controlProperty;
    }
    else if (node.type == 'textarea') {
      this.configurationData = this.configurationList?.textareaConfiguration?.controlProperty;
    }
    else if (node.type == 'heading') {
      this.configurationData = this.configurationList?.headingConfiguration?.controlProperty;
    }
    else if (node.type == 'paragraph') {
      this.configurationData = this.configurationList?.paragraphConfiguration?.controlProperty;
    }
    else if (node.type == 'image') {
      this.configurationData = this.configurationList?.imageConfiguration?.controlProperty;
    }
    else if (node.type == 'card') {
      this.configurationData = this.configurationList?.cardConfiguration?.controlProperty;
    }
    else if (node.type == 'chart') {
      this.configurationData = this.configurationList?.chartConfiguration?.controlProperty;
    }
    else if (node.type == 'browserCard') {
      this.configurationData = this.configurationList?.browserChartConfiguration?.controlProperty;
    }
    else if (node.type == 'browserCombineChart') {
      this.configurationData = this.configurationList?.browserComineChartConfiguration?.controlProperty;
    }
    else if (node.type == 'widgetSectionCard') {
      this.configurationData = this.configurationList?.widgetSectionChartConfiguration?.controlProperty;
    }
    else if (node.type == 'sectionCard') {
      this.configurationData = this.configurationList?.SectionChartConfiguration?.controlProperty;
    }
    else if (node.type == 'donutChart') {
      this.configurationData = this.configurationList?.donutChartConfiguration?.controlProperty;
    }
    else if (node.type == 'donuteSaleChart') {
      this.configurationData = this.configurationList?.donutSaleChartConfiguration?.controlProperty;
    }
    else if (node.type == 'salesAnalyticschart') {
      this.configurationData = this.configurationList?.salesAnalyticsChartConfiguration?.controlProperty;
    }
    else if (node.type == 'telephone') {
      this.configurationData = this.configurationList?.telephoneConfiguration?.controlProperty;
    }
    else if (node.type == 'checkbox') {
      this.configurationData = this.configurationList?.checkBoxConfiguration?.controlProperty;
    }
    else if (node.type == 'time') {
      this.configurationData = this.configurationList?.timeConfiguration?.controlProperty;
    }
    else if (node.type == 'datetime') {
      this.configurationData = this.configurationList?.dateTimeConfiguration?.controlProperty;
    }
    else if (node.type == 'date') {
      this.configurationData = this.configurationList?.dateConfiguration?.controlProperty;
    }
    else if (node.type == 'month') {
      this.configurationData = this.configurationList?.monthConfiguration?.controlProperty;
    }
    else if (node.type == 'week') {
      this.configurationData = this.configurationList?.weekConfiguration?.controlProperty;
    }
    else if (node.type == 'color') {
      this.configurationData = this.configurationList?.colorconfiguration?.controlProperty;
    }
    else if (node.type == 'customMasking') {
      this.configurationData = this.configurationList?.maskConf?.controlProperty;
    }
    else if (node.type == 'according') {
      this.configurationData = this.configurationList?.accordingConfiguration?.controlProperty;
    }
    else if (node.type == 'formRows') {
      this.configurationData = this.configurationList?.formRowsConfiguration?.controlProperty;
    }
    else if (node.type == 'stepper') {
      this.configurationData = this.configurationList?.stepperConfiguration?.controlProperty;
    }
    else if (node.type == 'stepperMain') {
      this.configurationData = this.configurationList?.mainStepperConfiguration?.controlProperty;
    }
    else if (node.type == 'tabs') {
      this.configurationData = this.configurationList?.tabsConfiguration?.controlProperty;
    }
    else if (node.type == 'tabsMain') {
      this.configurationData = this.configurationList?.mainTabsConfiguration?.controlProperty;
    }
    else if (this.selectdNode.type == 'gridList') {
      this.configurationData = this.configurationList?.gridNameConfiguration?.controlProperty;
    }
    else if (this.selectdNode.type == 'gridListEditDelete') {
      this.configurationData = this.configurationList?.gridNameConfiguration?.controlProperty;
    }
    else if (node.type == 'decimal') {
      this.configurationData = this.configurationList?.decimalConfiguration?.controlProperty;
    }
    else if (node.type == 'repeatSection') {
      this.configurationData = this.configurationList?.selectConfiguration?.controlProperty;
    }
    else if (node.type == 'tags') {
      this.configurationData = this.configurationList?.tagConfiguration?.controlProperty;
    }
    else if (node.type == 'multiselect') {
      this.configurationData = this.configurationList?.multiselectConfiguration?.controlProperty;
    }
    else if (node.type == 'search') {
      this.configurationData = this.configurationList?.searchConfiguration?.controlProperty;
    }
    else if (node.type == 'radiobutton') {
      this.configurationData = this.configurationList?.radioConfiguration?.controlProperty;
    }
    else if (node.type == 'button') {
      this.configurationData = this.configurationList?.buttonConfiguration?.controlProperty;
    }
    else if (node.type == 'buttonGroup') {
      this.configurationData = this.configurationList?.buttonGroupConfiguration?.controlProperty;
    }
    else if (node.type == 'linkButton') {
      this.configurationData = this.configurationList?.linkButtonConfiguration?.controlProperty;
    }
    else if (node.type == 'simplecard') {
      this.configurationData = this.configurationList?.cardConfiguration?.controlProperty;
    }
    else if (node.type == 'chartcard') {
      this.configurationData = this.configurationList?.cardConfiguration?.controlProperty;
    }
    else if (node.type == 'imageUpload') {
      this.configurationData = this.configurationList?.imageUploadConfiguration?.controlProperty;
    }
    else if (node.type == 'invoice') {
      this.configurationData = this.configurationList?.invoiceConfiguration?.controlProperty;
    }
    if (this.configurationData.length > 0) {
      this.clickButton(this.configurationData[0].name);
    }
  }
  applyHighLight(data: boolean, element: any) {
    if (element.highLight) {
      element.highLight = data;
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
        propertyName["attributes"] = {}
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
  commonConfigurationFields() {
    let obj: FormlyFieldConfig[] = [
      {
        className: "col-md-4 col-sm-6 col-xs-12 ",
        key: 'key',
        type: 'input',
        wrappers: ["formly-vertical-wrapper"],
        templateOptions: {
          title: 'Key',
          required: true,
          pattern: /^[a-z0-9_]+$/,
        }
      },
      {
        key: 'title',
        type: 'input',
        className: "col-md-4 col-sm-6 col-xs-12 ",
        wrappers: ["formly-vertical-wrapper"],
        templateOptions: {
          title: 'title'
        }
      },
      {
        className: "col-md-4 col-sm-6 col-xs-12 ",
        key: 'tooltip',
        type: 'input',
        wrappers: ["formly-vertical-wrapper"],
        templateOptions: {
          title: 'Tooltip',
        }
      },
      {
        key: 'className',
        type: 'select',
        className: "col-md-4 col-sm-6 col-xs-12 ",
        wrappers: ["formly-vertical-wrapper"],
        templateOptions: {
          title: 'column',
          options: [
            {
              title: 'col-2',
              value: 'col-md-2 col-sm-6 col-xs-12'
            },
            {
              title: 'col-3',
              value: 'col-md-3 col-sm-6 col-xs-12'
            },
            {
              title: 'col-4',
              value: 'col-md-4 col-sm-6 col-xs-12'
            },
            {
              title: 'col-6',
              value: 'col-md-6 col-xs-12'
            },
            {
              title: 'col-8',
              value: 'col-md-8 col-xs-12'
            },
            {
              title: 'col-9',
              value: 'col-md-9 col-xs-12'
            },
            {
              title: 'col-10',
              value: 'col-md-10 col-xs-12'
            },
            {
              title: 'col-12',
              value: 'col-12'
            }
          ]
        },
      },
      {
        className: "col-md-2 col-sm-2 col-xl-2 col-xs-6 mt-3",
        key: 'hideExpression',
        type: 'checkbox',
        templateOptions: {
          title: 'Hide',
        },
        defaultValue: false
      },
    ];
    return obj;
  }
  clickButton(type: any) {
    this.feildData = new GenaricFeild();
    let _formFeildData = new formFeildData();
    this.feildData.title = "Change Attribute Values";
    let configObj: any = {};
    if (type == "selectAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        // key: this.selectdNode?.chartCardConfig[0]?.formly[0]?.fieldGroup[0]?.key,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['title'],
        options: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.options,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        // multiselect: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.multiselect,
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.selectBoxFields;
    }
    else if (type == "breakTagAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        tooltip: this.selectdNode.tooltip,
        title: this.selectdNode.title,
        hideExpression: this.selectdNode.hideExpression,
        className: this.selectdNode.className,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.breakTagFeilds;
    }
    else if (type == "imageUploadAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        tooltip: this.selectdNode.tooltip,
        title: this.selectdNode.title,
        hideExpression: this.selectdNode.hideExpression,
        className: this.selectdNode.className,
        imageClass: this.selectdNode.imageClass,
        alt: this.selectdNode.alt,
        source: this.selectdNode.source,
        imagHieght: this.selectdNode.imagHieght,
        imageWidth: this.selectdNode.imageWidth,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        // image: this.selectdNode.base64Image,
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.imageUploadFeilds;
    }
    else if (type == "toastrAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        title: this.selectdNode.title,
        hideExpression: this.selectdNode.hideExpression,
        timeOut: this.selectdNode.timeOut,
        positionClass: this.selectdNode.positionClass,
        progressBar: this.selectdNode.progressBar,
        message: this.selectdNode.message,
        toastrType: this.selectdNode.toastrType,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.toastrFeilds;
    }
    else if (type == "invoiceAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        title: this.selectdNode.title,
        invoiceNumbertitle: this.selectdNode.invoiceNumberLabel,
        datetitle: this.selectdNode.datelabel,
        paymentTermstitle: this.selectdNode.paymentTermsLabel,
        poNumber: this.selectdNode.poNumber,
        billTotitle: this.selectdNode.billToLabel,
        dueDatetitle: this.selectdNode.dueDateLabel,
        shipTotitle: this.selectdNode.shipToLabel,
        notestitle: this.selectdNode.notesLabel,
        subtotaltitle: this.selectdNode.subtotalLabel,
        dicounttitle: this.selectdNode.dicountLabel,
        shippingtitle: this.selectdNode.shippingLabel,
        taxtitle: this.selectdNode.taxLabel,
        termstitle: this.selectdNode.termsLabel,
        totaltitle: this.selectdNode.totalLabel,
        amountpaidtitle: this.selectdNode.amountpaidLabel,
        balanceDuetitle: this.selectdNode.balanceDueLabel,
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.invoiceFeilds;
    }
    else if (type == "rangeSliderAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        title: this.selectdNode.title,
        className: this.selectdNode.className,
        min: this.selectdNode.min,
        max: this.selectdNode.max,
        sliderType: this.selectdNode.sliderType,
        disabled: this.selectdNode.disabled,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        showValue: this.selectdNode.showValue,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.rangeSliderFeilds;
    }
    else if (type == "inputGroupGridAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        tooltip: this.selectdNode.tooltip,
        title: this.selectdNode.title,
        hideExpression: this.selectdNode.hideExpression,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.inputGroupGridFeilds;
    }
    else if (type == "cardAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        className: this.selectdNode.className,
        icon: this.selectdNode?.icon,
        name: this.selectdNode?.name,
        total: this.selectdNode?.total,
        link: this.selectdNode?.link,
        tooltip: this.selectdNode?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.cardFields;
    }
    else if (type == "fixedDivAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.title,
        tooltip: this.selectdNode?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.formData = _formFeildData.fixedDivFields;
    }
    else if (type == "calendarAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.selectdNode.hideExpression,
        title: this.selectdNode.title,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        options: this.selectdNode.options,
        viewType: this.selectdNode.viewType,
        disabled: this.selectdNode.disabled,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.tuiCalendarFeilds;
    }
    else if (type == "multiFileUploadAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.title,
        className: this.selectdNode.className,
        tooltip: this.selectdNode?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.multiFileUploadFeilds;
    }
    else if (type == "textEditorAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.title,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.textEditorFeilds;
    }

    else if (type == "switchAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        className: this.selectdNode.className,
        title: this.selectdNode.title,
        tooltip: this.selectdNode.tooltip,
        switchType: this.selectdNode.switchType,
        switchPosition: this.selectdNode.switchPosition,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.switchFeilds;
    }

    else if (type == "dashonicTabAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode?.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.hideExpression, "hideExpression"),
        className: this.selectdNode.className,
        tabtitle: this.selectdNode.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.tabtitle,
        tabIcon: this.selectdNode.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.tabIcon,
        tooltip: this.selectdNode.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.dashonicTabFields;
    }
    else if (type == "kanbanAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.chartCardConfig?.at(0)?.text,
        nodes: this.selectdNode.chartCardConfig?.at(0)?.nodes,
        tooltip: this.selectdNode?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),

      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.kanbanFeilds;
    }
    else if (type == "kanbanTaskAttribute") {
      if (this.selectdNode.chartCardConfig) {
        for (let index = 0; index < this.selectdNode.chartCardConfig.length; index++) {
          if (typeof this.selectdNode?.chartCardConfig[index].users !== "string") {
            this.selectdNode.chartCardConfig[index].users = JSON.stringify(this.selectdNode.chartCardConfig[index].users);
          } else {
            this.selectdNode.chartCardConfig[index].users = JSON.parse(this.selectdNode.chartCardConfig[index].users);
            this.selectdNode.chartCardConfig[index].users = JSON.stringify(this.selectdNode.chartCardConfig[index].users);
          }
        }
      }
      configObj = {
        id: this.selectdNode.id as string,
        title: this.selectdNode.title,
        options: this.selectdNode.chartCardConfig,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.kanbanTaskFeilds;
    }
    else if (type == "dashonicMainTabAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          tabtitle: this.selectdNode.title,
          tabsPosition: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.tabsPosition,
          selectTabColor: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.selectTabColor,
          tabsDisplayType: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.tabsDisplayType,
          buttonText: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.buttonText,
          buttonIcon: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.buttonIcon,
          buttonColor: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.buttonColor,
          tabFormat: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.tabFormat,
          nodes: this.selectdNode.chartCardConfig[0].mainDashonicTabsConfig[0]?.nodes,
          tooltip: this.selectdNode?.tooltip,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.dashoniMainTabFields;
    }

    else if (type == "progressBarAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          title: this.selectdNode.title,
          className: this.selectdNode.className,
          tooltip: this.selectdNode.chartCardConfig[0].progressBArConfig[0]?.tooltip,
          value: this.selectdNode.chartCardConfig[0].progressBArConfig[0]?.value,
          color: this.selectdNode.chartCardConfig[0].progressBArConfig[0]?.color,
          showValue: this.selectdNode.chartCardConfig[0].progressBArConfig[0]?.showValue,
          stripped: this.selectdNode.chartCardConfig[0].progressBArConfig[0]?.stripped,
          height: this.selectdNode.chartCardConfig[0].progressBArConfig[0]?.height,
          animated: this.selectdNode.chartCardConfig[0].progressBArConfig[0]?.animated,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.progressBarFeilds;
    }
    else if (type == "dividerAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.title,
        tooltip: this.selectdNode?.tooltip,
        // title: this.selectdNode.chartCardConfig[0].dividerConfig[0]?.label,
        // text: this.selectdNode.chartCardConfig[0].dividerConfig[0]?.text,
        textColor: this.selectdNode.textColor,
        lineColor: this.selectdNode.lineColor,
        className: this.selectdNode.dividerClassName,
        classNameForPosition: this.selectdNode.classNameForPosition,
        dividerPosition: this.selectdNode.dividerPosition,
        dividerFormat: this.selectdNode.dividerFormat,
        verticalLineHieght: this.selectdNode.verticalLineHieght,
        verticalLinePosition: this.selectdNode.verticalLinePosition,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.dividerFeilds;
    }
    else if (type == "videosAttribute") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0].videoConfig[0]?.label,
          videoRatio: this.selectdNode.chartCardConfig[0].videoConfig[0]?.videoRatio,
          videoSrc: this.selectdNode.chartCardConfig[0].videoConfig[0]?.videoSrc,
          tooltip: this.selectdNode.chartCardConfig[0].videoConfig[0]?.tooltip,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.videosFeilds;
    }
    else if (type == "audioAttribute") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          tooltip: this.selectdNode.tooltip,
          title: this.selectdNode.chartCardConfig[0].title,
          audioSrc: this.selectdNode.chartCardConfig[0].audioSrc,
          link: "",
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.audioFeilds;
    }
    else if (type == "carousalAttribute") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          carousalType: this.selectdNode.chartCardConfig[0]?.carousalType,
          options: this.selectdNode.chartCardConfig[0].carousalConfig,
          tooltip: this.selectdNode.tooltip,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.carousalFeilds;
    }
    else if (type == "alertAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          icon: this.selectdNode.chartCardConfig[0].alertConfig[0]?.icon,
          tooltip: this.selectdNode.chartCardConfig[0].alertConfig[0]?.tooltip,
          type: this.selectdNode.chartCardConfig[0].alertConfig[0]?.type,
          text: this.selectdNode.chartCardConfig[0].alertConfig[0]?.text,
          alertColor: this.selectdNode.chartCardConfig[0].alertConfig[0]?.alertColor,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.alertFeilds;
    }
    else if (type == "timelineAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          tooltip: this.selectdNode?.tooltip,
          className: this.selectdNode.className,
          timelineData: this.selectdNode.chartCardConfig[0].timelineConfig[0].data,
          timelineHeading: this.selectdNode.chartCardConfig[0].timelineConfig[0]?.timelineHeading,
          headingColor: this.selectdNode.chartCardConfig[0].timelineConfig[0]?.headingColor,
          headingShape: this.selectdNode.chartCardConfig[0].timelineConfig[0]?.headingShape,
          timelineType: this.selectdNode.chartCardConfig[0].timelineConfig[0]?.timelineType,
          // timelineExample: this.selectdNode.chartCardConfig[0].timelineConfig[0]?.timelineExample,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.timelineFeilds;
    }


    else if (type == "simpleCardWithHeaderBodyFooterAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          headerText: this.selectdNode.chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig[0]?.headerText,
          tooltip: this.selectdNode.chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig[0]?.tooltip,
          bodyText: this.selectdNode.chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig[0]?.bodyText,
          footerText: this.selectdNode.chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig[0]?.footerText,
          textAlign: this.selectdNode.chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig[0]?.textAlign,
          link: "",
          height: this.selectdNode.chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig[0]?.height,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.simpleCardWithHeaderBodyFooterFeilds;
    }


    else if (type == "sharedMessagesChartAttributes") {

      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0]?.label,
          titleIcon: this.selectdNode.chartCardConfig[0]?.labelIcon,
          heading: this.selectdNode.chartCardConfig[0]?.heading,
          headingIcon: this.selectdNode.chartCardConfig[0]?.headingIcon,
          headingColor: this.selectdNode.chartCardConfig[0]?.headingColor,
          subHeading: this.selectdNode.chartCardConfig[0]?.subHeading,
          subHeadingIcon: this.selectdNode.chartCardConfig[0]?.subHeadingIcon,
          subheadingColor: this.selectdNode.chartCardConfig[0]?.subheadingColor,
          tooltip: this.selectdNode.chartCardConfig[0]?.tooltip,
          link: this.selectdNode.chartCardConfig[0]?.link,
          options: this.selectdNode.chartCardConfig[0]?.sharedMessagesConfig,
          repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.sharedMessagesChartFeilds;
    }
    else if (type == "browserChartAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0].title,
          tooltip: this.selectdNode.chartCardConfig[0].tooltip,
          icon: this.selectdNode.chartCardConfig[0].icon,
          options: this.selectdNode.chartCardConfig[0].chart,
          limit: this.selectdNode.chartCardConfig[0]?.limit,
          defaultColor: this.selectdNode.chartCardConfig[0]?.defaultColor,
          belowpercentage: this.selectdNode.chartCardConfig[0]?.belowpercentage,
          below_percentage_color: this.selectdNode.chartCardConfig[0]?.belowpercentageColor,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.browserChartFields;
    }
    else if (type == "browserCombineChartAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0].title,
          icon: this.selectdNode.chartCardConfig[0].icon,
          tooltip: this.selectdNode.chartCardConfig[0].tooltip,
          options: this.selectdNode.chartCardConfig[0].chart,
          limit: this.selectdNode.chartCardConfig[0]?.limit,
          defaultColor: this.selectdNode.chartCardConfig[0]?.defaultColor,
          belowpercentage: this.selectdNode.chartCardConfig[0]?.belowpercentage,
          below_percentage_color: this.selectdNode.chartCardConfig[0]?.belowpercentageColor,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.browserComibeChartFields;
    }
    else if (type == "widgetSectionChartAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          title: this.selectdNode?.label,
          className: this.selectdNode.className,
          tooltip: this.selectdNode.chartCardConfig[0]?.tooltip,
          limit: this.selectdNode.chartCardConfig[0]?.limit,
          percentage: this.selectdNode.chartCardConfig[0]?.belowpercentage,
          below_percentage_color: this.selectdNode.chartCardConfig[0]?.belowpercentageColor,
          options: this.selectdNode.chartCardConfig[0].section,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
          // data: this.selectdNode.widgetSectionCard[0].section[0].Chart.series[0].data,
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.widgetSectionChartFields;
    }
    else if (type == "SectionChartAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          title: this.selectdNode?.label,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          tooltip: this.selectdNode.chartCardConfig[0]?.tooltip,
          limit: this.selectdNode.chartCardConfig[0]?.limit,
          key: this.selectdNode.chartCardConfig[0]?.key,
          percentage: this.selectdNode.chartCardConfig[0]?.belowpercentage,
          below_percentage_color: this.selectdNode.chartCardConfig[0]?.belowpercentageColor,
          options: this.selectdNode.chartCardConfig[0]?.section,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.SectionChartFields;
    }
    else if (type == "chartAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          className: this.selectdNode.className,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          tooltip: this.selectdNode.chartCardConfig[0]?.tooltip,
          options: this.selectdNode.chartCardConfig[0]?.section,
          title: this.selectdNode.chartCardConfig[0].section[0].filterData[0].heading,
          sub_title: this.selectdNode.chartCardConfig[0].section[0].filterData[0].subheading,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      // objSelect.options = this.selectdNode.chartCardConfig[0]?.section[0].data,
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.chartFields;
    }
    else if (type == "donutChartAttributes") {
      if (this.selectdNode.chartCardConfig) {
        let seriesDataV1 = [];
        for (let k = 0; k < this.selectdNode.chartCardConfig[0].section[0].series.length; k++) {
          var series = { "series": 90, "title": "abc", "color": "ds" };
          series["series"] = this.selectdNode.chartCardConfig[0].section[0].series[k];
          series["title"] = this.selectdNode.chartCardConfig[0].section[0].titles[k];
          series["color"] = this.selectdNode.chartCardConfig[0].section[0].colors[k];
          seriesDataV1.push(series);
        }
        configObj = {
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          // id: this.selectdNode.id as string,
          // title: this.selectdNode.title,
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0].title,
          tooltip: this.selectdNode.chartCardConfig[0].tooltip,
          options: seriesDataV1,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
          // options: generateColorData,
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.donutChartFields;
    }
    else if (type == "donutSaleChartAttributes") {

      if (this.selectdNode.chartCardConfig) {
        let seriesDataV1 = [];
        for (let k = 0; k < this.selectdNode.chartCardConfig[0].section[0].series.length; k++) {
          var series = { "series": 90, "title": "abc", "color": "ds" };
          series["series"] = this.selectdNode.chartCardConfig[0].section[0].series[k];
          series["title"] = this.selectdNode.chartCardConfig[0].section[0].titles[k];
          series["color"] = this.selectdNode.chartCardConfig[0].section[0].colors[k];
          seriesDataV1.push(series);
        }
        configObj = {
          // id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          // title: this.selectdNode.title,
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0].title,
          // className: this.selectdNode.chartCardConfig[0].className,
          link: this.selectdNode.chartCardConfig[0].link,
          tooltip: this.selectdNode.chartCardConfig[0].tooltip,
          thisTitle: this.selectdNode.chartCardConfig[0].thisTitle,
          lastTitle: this.selectdNode.chartCardConfig[0].lastTitle,
          prevTitle: this.selectdNode.chartCardConfig[0].prevTitle,
          options1: this.selectdNode.chartCardConfig,
          options: seriesDataV1,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
          // options: generateColorData,
          // thisValue: this.selectdNode.saledDonutChart[0].thisValue,
          // lastValue: this.selectdNode.saledDonutChart[0].lastValue,
          // prevValue: this.selectdNode.saledDonutChart[0].prevValue,
          // growth: this.selectdNode.saledDonutChart[0].growth,
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.donutSaleChartFields;
    }
    else if (type == "salesAnalyticsChartAttributes") {
      if (this.selectdNode.chartCardConfig) {
        let series1Obj = [];
        for (let i = 0; i < this.selectdNode.chartCardConfig[0].section[0].series.length; i++) {
          series1Obj.push(this.selectdNode.chartCardConfig[0].section[0].series[i]);
        }
        configObj = {
          // id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0].title,
          tooltip: this.selectdNode.chartCardConfig[0].tooltip,
          options: series1Obj,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        };
        // for (let index = 0; index < this.selectdNode.analyticsChart[0].section[0].chartTitlesValues.length; index++) {
        //   objsaleAnalyticsChart.options[index].value = this.selectdNode.analyticsChart[0].section[0].chartTitlesValues[index].value;
        // };
        for (let i = 0; i < this.selectdNode.chartCardConfig[0].section[0].series.length; i++) {
          configObj.options[i].name1 = this.selectdNode.chartCardConfig[0].section[0].series[i].title;
          configObj.options[i].value = this.selectdNode.chartCardConfig[0].section[0].series[i].value;
          // objsaleAnalyticsChart.options[i].value = this.selectdNode.analyticsChart[0].section[0].chartTitlesValues[i].value;

        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.saleAnalyticsChartFields;
    }
    else if (type == "headingAttributes") {



      configObj = {
        title: this.selectdNode.title,
        tooltip: this.selectdNode?.tooltip,
        className: this.selectdNode.className,
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        padding: this.addPropertieInOldScreens(this.selectdNode.padding, "padding"),
        // paddingRight: this.addPropertieInOldScreens(this.selectdNode.paddingRight, "hideExpression"),
        // paddingTop: this.addPropertieInOldScreens(this.selectdNode.paddingTop, "hideExpression"),
        // paddingBottom: this.addPropertieInOldScreens(this.selectdNode.paddingBottom, "hideExpression"),
        level: this.selectdNode.data.level,
        text: this.selectdNode.data.text,
        style: this.selectdNode.style,
        textAlignment: this.selectdNode.textAlign,
        headingColor: this.selectdNode.headingColor,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      };
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.headingFields;
    }
    else if (type == "paragraphAttributes") {



      configObj = {
        id: this.selectdNode.id as string,
        padding: this.addPropertieInOldScreens(this.selectdNode.padding, "padding"),
        // hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        // paddingLeft: this.addPropertieInOldScreens(this.selectdNode.paddingLeft, "paddingLeft"),
        // paddingRight: this.addPropertieInOldScreens(this.selectdNode.paddingRight, "hideExpression"),
        // paddingTop: this.addPropertieInOldScreens(this.selectdNode.paddingTop, "hideExpression"),
        // paddingBottom: this.addPropertieInOldScreens(this.selectdNode.paddingBottom, "hideExpression"),
        title: this.selectdNode.title,
        // padding: this.selectdNode.padding,
        tooltip: this.selectdNode?.tooltip,
        className: this.selectdNode.className,
        text: this.selectdNode.data.text,
        style: this.selectdNode.style,
        textAlignment: this.selectdNode.textAlign,
        color: this.selectdNode.color,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      };
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.paragraphFields;
    }
    else if (type == "tagAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
          title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
          className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
          options: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.options,
          required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
          tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
          titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
          addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
          addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.tagBoxFields;
    }
    else if (type == "multiselectAttributes") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
          key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
          className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
          title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
          defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['defaultValue'],
          options: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.options,
          required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
          tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
          titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
          multiselect: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['multiselect'],
          addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
          addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.selectBoxFields;
    }
    else if (type == "maskingAttribute") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
          key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
          focus: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.focus,
          className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
          defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
          title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
          required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
          readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
          disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
          maskString: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['maskString'],
          masktitle: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['masktitle'],
          placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
          tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
          titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
          addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
          addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.customMaskingFields;
    }
    else if (type == "searchAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        options: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.options,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.searchBoxFields;
    }
    else if (type == "radioAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        options: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.options,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        formCheck: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['formCheck'],
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        multiselect: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['multiselect'],
        titleColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelColor,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        titleBackgroundColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelBackgroundColor,
      }
      // _formFeildData.radioFields[0].fieldGroup[0].templateOptions.options = res;
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.radioFields;
    }
    else if (type == "checkBoxAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        // defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        options: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.options,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        formCheck: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['formCheck'],
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        multiselect: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['multiselect'],
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.checkBoxFields;
    }
    //datandtime conditions
    else if (type == "dateTimeAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        // name: this.selectdNode.formly[0].fieldGroup[0].name,
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.dateTimeFields;
    }
    //time conditions
    else if (type == "timeAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        // name: this.selectdNode.formly[0].fieldGroup[0].name,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.timeFields;
    }
    //date condition
    else if (type == "dateAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        // name: this.selectdNode.formly[0].fieldGroup[0].name,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.dateFields;
    }
    //month condition
    else if (type == "monthAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        // name: this.selectdNode.formly[0].fieldGroup[0].name,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.monthFields;
    }
    //Number Conditions
    else if (type == "decimalAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
        decimalmode: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['decimalmode'],
        default: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        focus: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.focus,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      };
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.decimalFeilds;
    }

    //week condition
    else if (type == "weekAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        // name: this.selectdNode.formly[0].fieldGroup[0].name,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.weekFields;
    }
    //input color conditions
    else if (type == "colorAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        // name: this.selectdNode.formly[0].fieldGroup[0].name,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        defaultValue: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.colorFields;
    }
    //button Conditions
    else if (type == "buttonAttributes") {
      configObj = {
        id: this.selectdNode.id,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].hideExpression, "isShow"),
        className: this.selectdNode.className,
        // key: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0]?.key,
        title: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].title,
        color: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].color,
        // btnIcon: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].title,
        // fontSize: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].fontSize,
        // fontStyle: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].fontStyle,
        // textColor: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].textColor,
        // bgColor: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].bgColor,
        // border: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].border,
        // margin: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].margin,
        // padding: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].padding,
        // className: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].className,
        btnGroupFormat: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnGroupFormat,
        disabled: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].disabled,
        tooltip: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0]['tooltip'],
        btnIcon: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].icon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      };
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.buttonFields;
    }
    else if (type == "dropdownButtonAttributes") {
      configObj = {
        id: this.selectdNode.id,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].hideExpression, "isShow"),
        className: this.selectdNode.className,
        title: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].title,
        color: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].color,
        // btnIcon: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].btnIcon,
        // className: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].className,
        options: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].dropdownOptions,
        btnGroupFormat: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnGroupFormat,
        tooltip: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0]['tooltip'],
        btnIcon: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].icon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.dropdownButtonFields;
    }
    else if (type == "accordionButtonAttribute") {
      if (this.selectdNode.chartCardConfig) {
        configObj = {
          id: this.selectdNode.id,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          className: this.selectdNode.className,
          title: this.selectdNode.chartCardConfig[0].accordionConfig[0].title,
          tooltip: this.selectdNode.chartCardConfig[0].accordionConfig[0].tooltip,
          color: this.selectdNode.chartCardConfig[0].accordionConfig[0].color,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.accordionButtonFields;
    }
    //Link Button Conditions
    else if (type == "linkButtonAttributes") {

      configObj = {
        id: this.selectdNode.id,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].hideExpression, "isShow"),
        className: this.selectdNode.className,
        key: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0]?.key,
        title: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].title,
        color: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].color,
        // btnIcon: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].btnIcon,
        // className: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].className,
        href: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].href,
        target: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].target,
        format: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].format,
        btnType: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].btnType,
        tooltip: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0]['tooltip'],
        btnIcon: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].icon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.linkButtonFields;
    }
    else if (type == "groupButtonAttributes") {

      configObj = {
        id: this.selectdNode?.id,
        title: this.selectdNode?.label,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        // key: this.selectdNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0]?.key,
        btnGroupFormat: this.selectdNode.btngroupformat,
        // btnGroupFormat:this.selectdNode.className,
        className: this.selectdNode.className,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.buttonGroupFields;
    }

    //Grid Conditions
    else if (type == "gridNameAttributes") {

    }

    //Input Conditions
    else if (type == "inputAttributes") {
      if (this.selectdNode.chartCardConfig) {
        this.selectdNode.chartCardConfig[0] = this.addPropertieInOldScreens(this.selectdNode.chartCardConfig[0], "styleConfig");
        // this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions = this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "style");
        let veriableOptions = [];
        if (this.nodes[0].screenVariables) {
          for (let index = 0; index < this.nodes[0].screenVariables.length; index++) {
            veriableOptions.push({
              title: this.nodes[0].screenVariables[index].variableName,
              value: this.nodes[0].screenVariables[index].variableName
            })
          }
        }
        // _formFeildData.inputFeilds[0].fieldGroup[8].templateOptions.options = veriableOptions;
        // _formFeildData.inputFeilds[0].fieldGroup[9].templateOptions.options = veriableOptions;
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
          key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
          title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
          placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
          getVariable: this.selectdNode.chartCardConfig[0].getVariable,
          setVariable: this.selectdNode.chartCardConfig[0].setVariable,
          default: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
          className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
          minlength: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.minLength,
          maxlength: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.maxLength,
          focus: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.focus,
          required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
          readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
          disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
          tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
          titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
          fontSize: this.selectdNode.chartCardConfig[0].styleConfig?.fontSize,
          fontStyle: this.selectdNode.chartCardConfig[0].styleConfig?.fontStyle,
          textColor: this.selectdNode.chartCardConfig[0].styleConfig?.textColor,
          bgColor: this.selectdNode.chartCardConfig[0].styleConfig?.bgColor,
          border: this.selectdNode.chartCardConfig[0].styleConfig?.border,
          margin: this.selectdNode.chartCardConfig[0].styleConfig?.margin,
          padding: this.selectdNode.chartCardConfig[0].styleConfig?.padding,
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
          addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
          addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
        };
        // if (this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.type == 'number') {
        //   _formFeildData.inputFeilds[0].fieldGroup.forEach(element => {
        //     if (element.key == 'minlength' || element.key == 'maxlength') {
        //       element['hideExpression'] = true;
        //     }
        //   });
        // }
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.inputFeilds;
    }
    else if (type == "inputGroupAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
        default: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        minlength: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.minLength,
        maxlength: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.maxLength,
        focus: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.focus,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        addonLeft: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['addonLeft'].text,
        addonRight: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['addonRight'].text,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      };
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.inputGroupFeilds;
    }
    //Image Conditions
    else if (type == "imageAttributes") {


      // this.feildData.formData = this.methodUrl;

      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        focus: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.focus,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      };
      // this.feildData.modal=obj;
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.imageFeilds;
    }
    //Text Area Conditions
    else if (type == "textareaAttributes") {

      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
        default: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        rows: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.rows,
        minlength: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.minLength,
        maxlength: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.maxLength,
        focus: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.focus,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      };
      // this.feildData.modal=obj;
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.textareaFeilds;
    }
    //Phone number Conditions
    else if (type == "telephoneAttributes") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.hideExpression, "hideExpression"),
        key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
        title: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
        default: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.defaultValue,
        className: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.className,
        required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
        readonly: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.readonly,
        disabled: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip?.content,
        titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.labelIcon,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
        addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
      };
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.telephoneFeilds;
    }
    // Working For Page Section
    else if (type == "pageAttributes") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        variables: this.selectdNode.screenVariables
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.pageFields;
    }
    else if (type == "pageHeaderAttributes") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        headingSize: this.selectdNode.headingSize,
        header: this.selectdNode.header,
        titlePosition: this.selectdNode.labelPosition,
        alertPosition: this.selectdNode.alertPosition,
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.pageHeaderFields;
    }
    else if (type == "pageBodyAttributes") {


      // this.feildData.formData = this.methodUrl;

      var objPageBody = {
        id: this.selectdNode.id,
        title: this.selectdNode.title
      }
      this.formModalData = objPageBody;
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.pageBodyFields;
    }
    else if (type == "pageFooterAttributes") {


      // this.feildData.formData = this.methodUrl;

      var objPageFooter = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        footer: this.selectdNode.footer,
      }
      this.formModalData = objPageFooter;
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.pageFooterFields;
    }
    else if (type == "accordingAttributes") {
      if (this.selectdNode.children) {
        if (this.selectdNode.children?.at(1)?.children?.at(0)?.chartCardConfig?.at(0)?.formly) {
          configObj = {
            accordingText: this.selectdNode.title,
            disabled: this.selectdNode.sectionDisabled,
            className: this.selectdNode.className,
            titlePosition: this.selectdNode.labelPosition,
            repeatable: this.addPropertieInOldScreens(this.selectdNode.repeatable, 'repeatable'),
            // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
            wrappers: this.selectdNode.children?.at(1)?.children?.at(0)?.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers == undefined ? "" : this.selectdNode.children?.at(1)?.children?.at(0)?.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers?.at(0),
            // disabled: this.selectdNode.children[1].children[0].chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.disabled == undefined ? "" : this.selectdNode.children[1].children[0].chartCardConfig[0].formly[0].fieldGroup[0]?.templateOptions.disabled,
          }
          this.feildData.commonData = this.commonConfigurationFields();
          this.feildData.formData = _formFeildData.accordingFields;
        }
        else {
          configObj = {
            accordingText: this.selectdNode.title,
            disabled: this.selectdNode.sectionDisabled,
            className: this.selectdNode.className,
            titlePosition: this.selectdNode.labelPosition,
            repeatable: this.addPropertieInOldScreens(this.selectdNode.repeatable, 'repeatable'),
            // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
          }
          this.feildData.commonData = this.commonConfigurationFields();
          this.feildData.formData = _formFeildData.accordingFields;
        }
      }
    }
    else if (type == "accordingHeaderAttributes") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        headingSize: this.selectdNode.headingSize,
        header: this.selectdNode.header,
        expanded: this.selectdNode.expanded,
        titlePosition: this.selectdNode.labelPosition,
        backGroundColor: this.selectdNode.backGroundColor,
        textColor: this.selectdNode.textColor,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.accordingHeaderFields;
    }
    else if (type == "accordingBodyAttributes") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.accordingBodyFields;
    }
    else if (type == "accordingFooterAttributes") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        footer: this.selectdNode.footer,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.accordingFooterFields;
    }
    else if (type == "stepperAttributes") {
      configObj = {
        // stepperText: this.selectdNode.id,
        steppertitle: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip,
        // stepperIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.icon,
        // stepperFormat: this.selectdNode.chartCardConfig?.at(0)?.formly?.at(0)?.stepperFormat,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        // nodes: this.stepperNewlength,
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.stepperFields;
    }
    else if (type == "mainStepperAttributes") {
      configObj = {
        // stepperText: this.selectdNode.id,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['hideExpression'], "hideExpression"),
        className: this.selectdNode.className,
        nextButtonText: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['nextButtonText'],
        nextButtonIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['nextButtonIcon'],
        nextButtonColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['nextButtonColor'],
        backButtonText: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['backButtonText'],
        backButtonIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['backButtonIcon'],
        backButtonColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['backButtonColor'],
        submitButtonText: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['submitButtonText'],
        submitButtonIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['submitButtonIcon'],
        submitButtonColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['submitButtonColor'],
        selectColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['selectColor'],
        defaultColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['defaultColor'],
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.tooltip,
        icon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['icon'],
        steppertitle: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        nodes: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['nodes'],
        // stepperFormat: this.selectdNode.chartCardConfig[0].formly[0].stepperFormat,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        // nodes: this.stepperNewlength,
      }
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.mainStepperFields;
    }
    else if (type == "maintabAttributes") {
      let objTab = {
        className: this.selectdNode.className,
        steppertitle: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        stepperFormat: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['stepperFormat'],
        buttonText: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['buttonText'],
        buttonIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['buttonIcon'],
        buttonColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['buttonColor'],
        tabsPosition: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['tabsPosition'],
        selectTabColor: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['selectTabColor'],
        tabsDisplayType: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['tabsDisplayType'],
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        // nodes: this.tabsNewlength,
      }
      this.formModalData = objTab;
      this.feildData.commonData = this.commonConfigurationFields();
      this.feildData.formData = _formFeildData.mainTabFields;
    }

    else if (type == "gridAttributes") {
      this.feildData.formData = _formFeildData.gridFields;
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
    this.isVisible = data.id;
  }
  hoverOut(data: any) {
    this.isVisible = data.id;
  }
  highlightSelect(id: any) {
    this.nodes.at(0)?.children?.forEach((element: any) => {
      if (id == element.id)
        element = this.applyHighLight(true, element);
      else
        element = this.applyHighLight(false, element);
      element.children.forEach((element1: any) => {
        if (element1.type == "buttonGroup") {
          if (id == element1.id) {
            if (element1.children.length > 0)
              element1.children[0].chartCardConfig[0].buttonGroup[0].highLight = true;
          }
          else {
            if (element1.children.length > 0)
              element1.children[0].chartCardConfig[0].buttonGroup[0].highLight = false;
          }
        }
        else if (element1.type != "buttonGroup") {
          if (id == element1.id)
            element1 = this.applyHighLight(true, element1);
          else
            element1 = this.applyHighLight(false, element1);
        }
        element1.children.forEach((element2: any) => {
          if (id == element2.id)
            element2 = this.applyHighLight(true, element2);
          else
            element2 = this.applyHighLight(false, element2);
          element2.children.forEach((element3: any) => {
            if (element3.chartCardConfig) {
              if (element3.chartCardConfig[0].formly != undefined) {
                if (element3.type == "stepperMain") {
                  if (id == element3.id)
                    element3.children[0].highLight = true;
                  else
                    element3.children[0].highLight = false;
                } else {
                  var className = element3.chartCardConfig[0].formly[0].fieldGroup[0].className;
                  if (id == element3.id) {
                    if (!element3.chartCardConfig[0].formly[0].fieldGroup[0].className.includes("highLight")) {
                      element3.chartCardConfig[0].formly[0].fieldGroup[0].className = element3.chartCardConfig[0].formly[0].fieldGroup[0].className + " highLight";
                    }
                  }
                  else
                    element3.chartCardConfig[0].formly[0].fieldGroup[0].className = className.replace("highLight", "");
                }
              }
            }
            else if (element3.type == "buttonGroup") {
              if (id == element3.id) {
                if (element3.children.length > 0)
                  element3.children[0].chartCardConfig[0].buttonGroup[0].highLight = true;
              }
              else {
                if (element3.children.length > 0)
                  element3.children[0].chartCardConfig[0].buttonGroup[0].highLight = false;
              }
            }
            else if (element3.type != "buttonGroup" && element3.chartCardConfig == undefined) {
              if (id == element3.id)
                element3 = this.applyHighLight(true, element3);
              else
                element3 = this.applyHighLight(false, element3);
            }
            element3.children.forEach((element4: any) => {
              if (element3.type != "buttonGroup" && element3.type != "stepperMain") {
                if (id == element4.id)
                  element4 = this.applyHighLight(true, element4);
                else
                  element4 = this.applyHighLight(true, element4);
              }
            });
          });
        });
      });
      // this.clickBack();
    });
  }
  openField(event: any) {

    let id = event.node.origin.id;
     let node =  event.node.origin;
    if (this.screenPage) {
      this.searchControllData = [];
      this.isActiveShow = id;
      this.selectdNode = node;
      if (this.selectdNode.isNextChild) {
        this.IsShowConfig = true;
        this.controlListvisible = true;
      }
      if (this.selectdNode.type == 'pageBody') {
        this.showSectionOnly = true;
      } else {
        this.showSectionOnly = false;
      }
    }
  }
  add(node: TreeNode) {
    this.applySize();
    this.selectdNode = node;
  }
  newChild: any = [];
  insertAt(parent: any, node: any) {
    debugger
    parent =  parent.parentNode.origin;
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
                      obj = { id: element.id + Guid.newGuid(), title: element.title, type: element.type, children: element.children[0].children[1].children[index].children, chartCardConfig: element.children[0].children[1].children[index].chartCardConfig[0], key: element.key }
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
            chartCardConfig: nodeData.chartCardConfig,

          } as TreeNode;
          parent.children.splice(idx as number + 1, 0, newNode);
        }
        else {
          nodeData.id = nodeData.id + Guid.newGuid();
          nodeData.children.forEach((element: any) => {
            element.id = element.id + Guid.newGuid();
            if (element.chartCardConfig) {
              if (element.chartCardConfig.length > 0) {
                if (element.chartCardConfig[0].formly) {
                  element.chartCardConfig[0].formly[0].fieldGroup[0].key = element.chartCardConfig[0].formly[0].fieldGroup[0].key + Guid.newGuid();
                }
              }
            }
            element.children.forEach((element1: any) => {
              element1.id = element1.id + Guid.newGuid();
              if (element1.chartCardConfig) {
                if (element1.chartCardConfig.length > 0) {
                  if (element1.chartCardConfig[0].formly) {
                    element1.chartCardConfig[0].formly[0].fieldGroup[0].key = element1.chartCardConfig[0].formly[0].fieldGroup[0].key + Guid.newGuid();
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
      // this.newChild.forEach(elementV2.chartCardConfig[0] => {
      //   elementV2.chartCardConfig[0].id=elementV2.chartCardConfig[0].id+"f"+1;
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

    this.nodes = [...this.nodes];
    // this.jsonStringifData();

    // array.splice(index, 0, ...elementsArray);
  }
  remove(parent: TreeNode, node: TreeNode) {
    if (parent != undefined) {
      console.log(parent, node);
      const idx = parent.children.indexOf(node);
      this.columnData = this.columnData.filter((a: any) => a.name != parent.children[idx].id);
      parent.children.splice(idx as number, 1);
      // this.templateNode = JSON.parse(JSON.stringify(this.nodes));
      // this.prepareDragDrop(this.templateNode, this.selectdNode);
    } else {
      console.log(parent, node);
      const idx = this.nodes.indexOf(node);
      this.nodes.splice(idx as number, 1);
      // this.templateNode = JSON.parse(JSON.stringify(this.nodes));
      // this.prepareDragDrop(this.templateNode, this.selectdNode);
    }

  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  clickBack() {

    this.nodes = JSON.parse(
      JSON.stringify(this.nodes, (key, value) => {
        if (typeof value == 'function') {
          return value.toString();
        } else {
          return value;
        }
      }), (key, value) => {
        // if (typeof value != 'string') return value;
        // return (value.substring(0, 8) == 'function') ? eval('(' + value + ')') : value;
        if (typeof value === 'string' && value.startsWith('(')) {
          return eval(`(${value})`);
        }
        return value;
      });
    // this.templateNode = JSON.parse(JSON.stringify(this.nodes));
    // this.prepareDragDrop(this.templateNode, this.selectdNode);
    // this.makeFaker();

  }
  openSideAttributes: boolean = false;
  navbarInstance() {
    this.openSideAttributes = true;
    // document.getElementById("mySidenav-right").style.width = "100%";
  }
  notifyEmit(event: actionTypeFeild): void {

  }




  searchControll() {
    this.searchControllData = [];
    var input = (document.getElementById("searchControll") as HTMLInputElement).value.toUpperCase();
    if (input && input != " ") {
      this.htmlTabsData[0].children.forEach((a: any) => {
        a.children.forEach((b: any) => {
          b.children.forEach((c: any) => {
            if (c.title.toUpperCase().includes(input)) {
              this.searchControllData.push(c)
            }
          });
        });
      });
    }
  }
  functionName: any;
  mainTemplate() {
    this.builderService.genericApis(this.functionName).subscribe((res => {

      this.selectdNode.children.push(res)
      this.clickBack();
    }));
  }
}

class Guid {
  static newGuid() {
    let data = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    return data.split("-")[0];
  }
}
