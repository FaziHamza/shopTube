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
  IsShowConfig: boolean = false;
  htmlTabsData: any = [];
  nodes: any = [];
  screenModule: any;
  screenName: any;
  screenId: any = 0;
  screenPage: boolean = false;
  fieldData: GenaricFeild;
  searchControllData: any = [];
  selectdNode: TreeNode;
  selectdParentNode: TreeNode;
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
                      if (element3.formly[0].fieldGroup[0].className && element3.formly[0].fieldGroup[0].className.includes("highLight")) {
                        var className = element3.formly[0].fieldGroup[0].className;
                        element3.formly[0].fieldGroup[0].className = className.replace("highLight", "");
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
  expandedKeys: any;
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
          // this.updateNodes();
        }

      }
      else {
        this.screenId = 0;
        this.clearChildNode();
        // this.updateNodes();
      }
      this.expandedKeys = this.nodes.map((node: any) => node.key);
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
      this.selectdNode = newNode[0];
      this.addControlToJson('pageHeader', null);
      this.addControlToJson('pageBody', null);
      this.selectdNode = this.sectionBageBody;
      this.addControlToJson('according', null);
      this.selectdNode = this.sectionAccording;
      this.addControlToJson('accordingHeader', null);
      this.addControlToJson('accordingBody', null);
      this.addControlToJson('accordingFooter', null);
      this.selectdNode = this.sectionAccorBody;
      this.addControlToJson('text', this.textJsonObj);
      this.selectdNode = newNode[0];
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

  addControlToJson(value: string, data: any) {

    if (value == "stepperMain" || value == "tabsMain" || value == "mainDashonicTabs" || value == "kanban") {
      this.selectForDropdown = this.selectdNode;
    }
    let node = this.selectdNode;
    // this.IsShowConfig = true;
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
        title: 'Header',
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
        expanded: true,
        type: data?.configType,
        className: 'w-1/4 pl-1',
        // type: data?.type,
        formlyType: data?.parameter,
        formly: [
          {
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
                  type: data?.fieldType,
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
                  options: this.makeFormlyOptions(data?.options),
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
    else if (value == "buttonGroup") {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'buttonGroup',
        type: "buttonGroup",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        className: "co-3",
        chartCardConfig: [{
          position: "text-center",
          key: "buttongroup_" + Guid.newGuid(),
          id: "buttongroup",
          btnGroupPosition: "header-button",
          btngroupformat: "text-left",
          className: "co-3",
        }],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'insertButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'insert_1',
        type: "button",
        actionType: "insert",
        highLight: false,
        isNextChild: false,
        className: "col-md-3 col-sm-6 col-xs-12",
        chartCardConfig: [{
          buttonGroup: [
            {
              // btnGroupPosition: "text-left",
              btnGroupFormat: "text-left",
              highLight: false,
              btnConfig: [
                {
                  hideExpression: false,
                  tooltip: "",
                  key: "insert" + Guid.newGuid(),
                  color: "btn btn-success",
                  title: "Insert",
                  type: "insert",
                  btnIcon: "uil uil-user",
                  // format: "text-left",
                  btnDisables: false,
                  disabled: this.getLastNodeWrapper("disabled"),
                },
              ],

            }
          ],
        }],

        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'dropdownButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'dropdownButton_1',
        type: "dropdownButton",
        highLight: false,
        isNextChild: false,
        className: "col-md-3 col-sm-6 col-xs-12",
        chartCardConfig: [{
          buttonGroup: [
            {
              // btnGroupPosition: "text-left",
              btnGroupFormat: "text-left",
              highLight: false,
              btnConfig: [
                {
                  hideExpression: false,
                  tooltip: "",
                  key: "button" + Guid.newGuid(),
                  color: "btn btn-success",
                  title: "Dropdown button",
                  type: "dropdown",
                  btnIcon: "uil uil-user",
                  // format: "text-left",
                  btnDisables: false,
                  disabled: this.getLastNodeWrapper("disabled"),
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
                },

              ],

            }
          ],
        }],

        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'updateButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'update_1',
        type: "button",
        highLight: false,
        isNextChild: false,
        actionType: "update",
        className: "col-md-3 col-sm-6 col-xs-12",
        chartCardConfig: [{
          buttonGroup: [
            {
              // btnGroupPosition: "text-left",
              btnGroupFormat: "text-left",
              highLight: false,
              btnConfig: [
                {
                  hideExpression: false,
                  tooltip: "",
                  color: "btn btn-primary",
                  title: "Update",
                  btnIcon: "uil uil-user",
                  type: "update",
                  key: "update" + Guid.newGuid(),
                  // format: "text-left",
                  btnDisables: false,
                  disabled: this.getLastNodeWrapper("disabled"),
                },
              ],

            }
          ],
        }],

        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'deleteButton') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'delete_1',
        type: "button",
        highLight: false,
        isNextChild: false,
        actionType: "delete",
        className: "col-md-3 col-sm-6 col-xs-12",
        chartCardConfig: [{
          buttonGroup: [
            {
              // btnGroupPosition: "text-left",
              btnGroupFormat: "text-left",
              btnConfig: [
                {
                  hideExpression: false,
                  tooltip: "",
                  key: "delete" + Guid.newGuid(),
                  color: "btn btn-danger",
                  title: "Delete",
                  btnIcon: "uil uil-user",
                  type: "delete",
                  // format: "text-left",
                  btnDisables: false,
                  disabled: this.getLastNodeWrapper("disabled"),
                },
              ],

            }
          ],
        }],

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
        className: "col-md-6 col-xs-12",
        hideExpression: false,
        tooltip: "",
        key: "switch" + Guid.newGuid(),
        switchPosition: "left",
        label: "Switch",
        switchType: "defaultSwitch",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'imageUpload') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        type: "imageUpload",
        highLight: false,
        isNextChild: false,
        className: "col-md-6 col-xs-12",
        label: "Image Upload",
        imageClass: "",
        alt: "",
        source: "https://cdn.pixabay.com/photo/2016/04/04/14/12/monitor-1307227__340.jpg",
        imagHieght: 200,
        imageWidth: 200,
        base64Image: "",
        hideExpression: false,
        tooltip: "",
        key: "imageUpload" + Guid.newGuid(),
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
        className: "col-md-6 col-xs-12",
        hideExpression: false,
        tooltip: "",
        key: "progressBar" + Guid.newGuid(),
        value: "25",
        color: "primary",
        showValue: false,
        stripped: false,
        height: '9',
        animated: false,
        hieghtWithPx: "9px",
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'video') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'Play Video Online',
        type: "video",
        highLight: false,
        className: "col-md-6 col-xs-12",
        hideExpression: false,
        isNextChild: false,
        tooltip: "",
        key: "video" + Guid.newGuid(),

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
        title: "Audio Example",
        type: "audio",
        highLight: false,
        className: "col-md-6 col-xs-12",
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
        label: 'carouselCrossfade_1',
        type: "carouselCrossfade",
        highLight: false,
        isNextChild: false,
        className: "col-md-6 col-xs-12",
        hideExpression: false,
        tooltip: "",

        carousalType: "carousel-fade",
        carousalConfig: [
          {
            img: "assets/images/small/img-1.jpg",
            captionTitle: "First slide label",
            caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            img: "assets/images/small/img-2.jpg",
            captionTitle: "Second slide label",
            caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            img: "assets/images/small/img-3.jpg",
            captionTitle: "Third slide label",
            caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
        label: 'calender_1',
        type: "tuiCalender",
        className: "col-md-9 col-xs-12",
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
        label: 'Task  Widget_1',
        type: "sharedMessagesChart",
        className: "col-md-6 col-xs-12",
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
        label: 'alert_1',
        type: "alert",
        className: "col-12",
        hideExpression: false,
        tooltip: "Alert",
        highLight: false,
        isNextChild: false,
        alertConfig: [
          {
            tooltip: "",
            alertColor: "alert alert-primary",
            text: "This is a primary alert—check it out!",
            icon: "uil uil-question-circle",
            type: "",
            key: "alert_" + Guid.newGuid(),
          }
        ],

        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'simpleCardWithHeaderBodyFooter') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'simpleCard_1',
        type: "simpleCardWithHeaderBodyFooter",
        hideExpression: false,
        className: "col-md-6 col-xs-12",
        highLight: false,
        isNextChild: false,

        key: "simpleCard_" + Guid.newGuid(),
        simpleCardWithHeaderBodyFooterConfig: [
          {
            tooltip: "",
            textAlign: "text-left",
            textSize: "h1",
            headerText: "Card header",
            bodyText: "card body",
            footerText: "card footer",
            link: '',
            height: '100p',
          }
        ],

        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'dashonicTabs') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'SubTab_1',
        type: "dashonicTabs",
        className: "col-12",
        isNextChild: true,
        highLight: false,
        key: 'SubTab_' + Guid.newGuid(),

        dashonicTabsConfig: [
          {
            hideExpression: false,
            tabLabel: 'Tab',
            tooltip: '',
            tabsPosition: 'nav-tabs justify-content-start',
            selectTabColor: "",
            tabsDisplayType: "--tabsDisplayType:None",
            buttonText: "Submit",
            buttonIcon: "",
            buttonColor: "btn btn-primary mt-2",
            underLineColor: "--underLineColor:none",
            color: "none",
            tabFormat: "horizental",
            tabIcon: "uil-star",
            dashonicTabsChild: []
          }
        ],
        children: [
        ],

      } as TreeNode;
      this.tabsChild = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'mainDashonicTabs') {
      const newNode = {
        id: 'mainDashonicTabs_' + Guid.newGuid(),
        label: 'MainTab_1',
        type: "mainDashonicTabs",
        isNextChild: true,
        highLight: false,
        className: "col-12",
        tooltip: "",
        hideExpression: false,
        mainDashonicTabsConfig: [
          {
            tabLabel: 'Tab 1',
            tabsPosition: 'nav-tabs justify-content-start',
            selectTabColor: "#038EDC",
            tabsDisplayType: "None",
            buttonText: "Submit",
            buttonIcon: "",
            buttonColor: "btn btn-primary",
            tabFormat: "horizental",
            nodes: "3",
            mainDashonicTabsChild: []
          }

        ],

        children: [
        ],

      } as TreeNode;
      this.tabsAdd = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'kanban') {
      const newNode = {
        id: 'kanban' + Guid.newGuid(),
        label: 'kanban',
        type: "kanban",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        tooltip: "",

        key: "kanban" + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
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
        label: 'kanbanTask',
        type: "kanbanTask",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",

        key: "kanbanTask" + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        text: "KanbanTask",
        title: "Authentication Page Design",
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
        label: 'linkbutton_1',
        type: "linkButton",
        highLight: false,
        isNextChild: false,
        className: "col-md-3 col-sm-6 col-xs-12",
        buttonGroup: [
          {
            // btnPosition: "text-left",
            btnGroupFormat: "text-left",
            btnConfig: [
              {
                hideExpression: false,
                className: "m-2",
                tooltip: "",
                key: "button_" + Guid.newGuid(),
                type: "button",
                color: "btn btn-primary",
                target: "_blank",
                btnType: "_blank",
                title: "Link",
                href: "fazi",
                format: "text-left",
                btnIcon: "",
              },
            ],

          }
        ],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'simplecard') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        label: "card" + '_1',
        type: "card",
        className: "col-md-3 col-sm-6 col-xs-12",
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
        label: "chart" + '_1',
        type: "chart",
        className: "col-md-6 col-xs-12",
        key: "chart",
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
        //     templateOptions: {
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
        label: "Section_Chart" + '_1',
        type: "sectionCard",
        className: "col-md-6 col-xs-12",
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
        label: "Widget_Section_Card" + '_1',
        type: "widgetSectionCard",
        className: "col-md-6 col-xs-12",
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
        label: "donut_Chart" + '_1',
        type: "donutChart",
        className: "col-md-6 col-xs-12",
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
        label: "Browser_Chart" + '_1',
        type: "browserCard",
        link: "",
        className: "col-md-6 col-xs-12",
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
        label: "Browser_CombineChart" + '_1',
        type: "browserCombineChart",
        link: "",
        className: "col-md-6 col-xs-12",
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
        label: "Sale_Donute_Chart" + '_1',
        type: "donuteSaleChart",
        className: "col-md-6 col-xs-12",
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
        label: "sales_Analytics_chart" + '_1',
        type: "salesAnalyticschart",
        className: "col-md-6 col-xs-12",
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
        id: "common_" + Guid.newGuid(),
        label: "Heading" + '_1',
        type: "header",
        className: "col-12",
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        key: "heading_" + Guid.newGuid(),
        style: "font-weight:bold;",
        textAlign: "text-align:left;",
        headingColor: "#000000",
        headingApi: "",
        fontSize: "font-weight:bold;text-align:left;color:#000000",
        paddingBottom: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        data: {
          text: "Editor.js",
          level: 1
        },
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'paragraph') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        label: "Paragraph" + '_1',
        type: "paragraph",
        className: "col-12",
        highLight: false,
        isNextChild: false,
        tooltip: "",
        hideExpression: false,
        key: "paragraph_" + Guid.newGuid(),
        style: "font-weight:normal;",
        textAlign: "text-align:left;",
        fontSize: "font-weight:normal;text-align:left;",
        color: "#000000",
        api: "",
        padding: '',
        // paddingBottom: 0,
        // paddingTop: 0,
        // paddingRight: 0,
        // paddingLeft: 0,
        data: {
          text: "Lorem ipsum Hi  sit amet consectetur adipisicing elit. Dolorum minus aliquid earum voluptatum eum quis vero facere, veritatis nisi porro minima sed harum aperiam! Voluptas distinctio consequuntur ipsa enim obcaecati"
        },
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'htmlBlock') {
      const newNode = {
        id: "common_" + Guid.newGuid(),
        label: "Html Block" + '_1',
        type: "paragraph",
        className: "col-12",
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
        label: "Text Editor" + '_1',
        type: "textEditor",
        className: "col-12",
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
        label: "editor_js" + '_1',
        type: "editor_js",
        className: "col-12",
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
        label: "breakTag" + '_1',
        type: "breakTag",
        className: "col-12",
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
        id: "common_" + Guid.newGuid(),
        label: "Multi File Upload" + '_1',
        type: "multiFileUpload",
        className: "col-md-6 col-xs-12",
        highLight: false,
        isNextChild: false,
        tooltip: "",
        hideExpression: false,

        key: "multiFileUpload_" + Guid.newGuid(),
        uploadBtnLabel: "Click here to upload",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'gridList') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'Grid List' + '_1',
        type: 'gridList',
        link: '',
        key: "simpleGridList_" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        forCommomComponentCondition: 'simpleGridList',
        className: "col-12",
        pagination: 10,
        filter: false,
        sortable: false,
        tooltip: "",
        delete: true,
        update: false,
        create: false,
        getVariable: "",
        setVariable: "",
        children: [
          {
            id: "name_" + Guid.newGuid(),
            label: "name",
            type: "input",
            editor: { type: 'text' },
            header: "Name",
            name: "name",
            sortingType: "desc",
            sortable: false,
            showColumn: true,
            editorType: true,
            children: []
          },
          {
            id: "father_name_" + Guid.newGuid(),
            label: "father_name",
            type: "input",
            editor: { type: 'text' },
            header: "Father Name",
            name: "father_name",
            sortingType: "desc",
            sortable: false,
            showColumn: true,
            editorType: true,
            children: []
          },
          {
            id: "address_" + Guid.newGuid(),
            label: "address",
            type: "input",
            editor: { type: 'text' },
            header: "Address",
            name: "address",
            sortingType: "desc",
            sortable: false,
            showColumn: true,
            editorType: true,
            children: []
          },
        ],
        rowData: [
          {
            father_name: "baby_ruth",
            address: "FSD",
            id: 1,
            name: "Sebastian",
            salary: 100,
          },
          {
            father_name: "baby_ruth",
            address: "FSD",
            id: 2,
            name: "Sebastian",
            salary: 200,
          },
          {
            father_name: "baby_ruth",
            address: "FSD",
            id: 3,
            name: "Sebastian",
            salary: 300,
          },
        ],
        columnData: [],
        icon: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'invoiceGrid') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'Grid List' + '_1',
        type: 'invoiceGrid',
        link: '',
        key: "invoiceGrid_" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        className: "col-12",
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
    else if (value == 'gridListEditDelete') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'Grid List' + '_1',
        type: 'gridListEditDelete',
        link: '',
        key: "gridListEditDelete_" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        tooltip: "Grid List Editable",
        forCommomComponentCondition: 'gridListEditDelete',
        pagination: 10,
        filter: false,
        sortable: false,
        children: [
          {
            id: "name_" + Guid.newGuid(),
            label: "name",
            type: "input",
            editor: { type: 'text' },
            header: "Name",
            name: "name",
            sortingType: "desc",
            sortable: false,
            showColumn: true,
            editorType: true,
            children: []
          },
          {
            id: "father_name_" + Guid.newGuid(),
            label: "father_name",
            type: "input",
            editor: { type: 'text' },
            header: "Father Name",
            name: "father_name",
            sortingType: "desc",
            sortable: false,
            showColumn: true,
            editorType: true,
            children: []
          },
          {
            id: "address_" + Guid.newGuid(),
            label: "address",
            type: "input",
            editor: { type: 'text' },
            header: "Address",
            name: "address",
            sortingType: "desc",
            sortable: false,
            showColumn: true,
            editorType: true,
            children: []
          },
        ],
        rowData: [
          {
            father_name: "baby_ruth",
            address: "FSD",
            id: 1,
            name: "Sebastian",
            salary: 100,
          },
          {
            father_name: "baby_ruth",
            address: "FSD",
            id: 2,
            name: "Sebastian",
            salary: 200,
          },
          {
            father_name: "baby_ruth",
            address: "FSD",
            id: 3,
            name: "Sebastian",
            salary: 300,
          },
        ],
        columnData: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'column') {
      const newNode = {
        id: "Column " + Math.random().toFixed(3),
        label: 'Column' + '_1',
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
        id: 'common_' + Guid.newGuid(),
        label: 'timeline_1',
        type: "timeline",
        className: "col-12",
        highLight: false,
        isNextChild: false,
        hideExpression: false,

        timelineConfig: [
          {
            tooltip: "",
            timelineHeading: '2021',
            headingColor: 'btn btn-danger',
            headingShape: 'btn-rounded',
            timelineType: 'verti-timeline',
            data: [
              {
                title: "Timeline Event One",
                content: "It will be as simple as occidental in fact. To an english person, it will seem like simplified English, as a skeptical friend",
                date: '11/7/2022',
                align: "",
                createdBy: "Zubair",
                image: ["assets/images/small/img-2.jpg", "assets/images/small/img-2.jpg", "assets/images/small/img-2.jpg"],
                company: "",
              }
            ]
          }
        ],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'fixedDiv') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'FixedDiv_1',
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
        label: 'accordionButton_1',
        type: "accordionButton",
        highLight: false,
        isNextChild: true,
        className: "col-12",
        hideExpression: false,
        accordionConfig: [
          {
            tooltip: "",
            label: "Accordion",
            color: "bg-primary",
            accordionChild: [],
          }
        ],
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'divider') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'Divider_1',
        type: "divider",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        tooltip: "",
        text: "Divider",
        key: "divider" + Guid.newGuid(),
        dividerClassName: "col-md-6 col-xs-12",
        textColor: "#000000",
        textcolorForStyle: "",
        lineColorForStyle: "--lineColor:#000000",
        verticalLineColorForCssBinding: "--verticalLineColorForCssBinding:1px solid black",
        lineColor: "#000000",
        dividerPosition: "",
        classNameForPosition: "",
        dividerFormat: "horizental",
        verticalLineHieght: "200",
        verticalLineHieghtForCssBinding: "--verticalLineHieghtForCssBinding:200px",
        verticalLinePosition: "50",
        verticalLinePositionForCssBinding: "--verticalLinePositionForCssBinding:50px",
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'toastr') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'toastr_' + Guid.newGuid(),
        label: 'toastr_1',
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
    else if (value == 'starrate') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        label: 'starrate_1',
        type: "starrate",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        children: [
        ],

      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'rangeSlider') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'rangeSlider',
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
        className: "col-12",
        label: 'Invoice',
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
        className: "col-md-6 col-xs-12",
        label: 'Affix',
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
        className: "col-md-6 col-xs-12",
        label: 'Statistic',
        type: "statistic",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        statisticArray: [
          {
            nzTitle: "Active Users",
            nzValue: 1949101,
          },
          {
            nzTitle: "Account Balance (CNY)",
            nzValue: 2019.111,
          },
        ],
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'backTop') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Back Top',
        type: "backTop",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        description: "Scroll down to see the bottom-right",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'anchor') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Anchor',
        type: "anchor",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        anchor: [
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
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Modal',
        type: "modal",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        btnLabel: "Show Modal",
        modalContent: "Content",
        modalTitle: "The first Modal",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'popConfirm') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Pop Confirm',
        type: "popConfirm",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        btnLabel: "Open Popconfirm with Promise",
        // modalContent:"Content",
        // modalTitle:"The first Modal",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'avatar') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        key: "avatar_" + Guid.newGuid(),
        label: 'Avatar',
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
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'badge') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Badge',
        type: "badge",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        numberOfBadges: 5,
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'comment') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'comment_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Comment',
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
        className: "col-md-6 col-xs-12",
        label: 'Pop Over',
        type: "popOver",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        btnLabel: "Hover me",
        nzPopoverContent: "Content",
        nzPopoverTitle: "Title",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'description') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'description_' + Guid.newGuid(),
        type: "description",
        label: 'Description',
        className: "col-md-6 col-xs-12",
        tooltip: "",
        hideExpression: false,
        isNextChild: true,
        title: "Description",
        nzExtra: "extraTpl",
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
        label: 'descriptionchild',
        type: "descriptionChild",
        className: "col-md-6 col-xs-12",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        nzSpan: 2,
        title: "title",
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
        className: "col-md-6 col-xs-12",
        label: 'Segmented',
        type: "segmented",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'],
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'result') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'result',
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
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Tag',
        type: "nzTag",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        color: "red",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'spin') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'spin_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Spin',
        type: "spin",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        size: "large",
        delayTime: 1000,
        loaderText: "Loading...",
        loaderIcon: "",
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'transfer') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'transfer',
        type: "transfer",
        isNextChild: false,
        hideExpression: false,
        disabled: false,
        list: [
          {
            key: '1',
            title: 'content 1',
            description: 'description of content 1',
            direction: 'right',
          },
          {
            key: '2',
            title: 'content 2',
            description: 'description of content 1',
            direction: undefined,
          },
          {
            key: '3',
            title: 'content 3',
            description: 'description of content 3',
            direction: 'right',
          },
          {
            key: '4',
            title: 'content 4',
            description: 'description of content 4',
            direction: undefined,
          },
          {
            key: '5',
            title: 'content 5',
            description: 'description of content 5',
            direction: 'right',
          },
          {
            key: '6',
            title: 'content 6',
            description: 'description of content 6',
            direction: undefined,
          },
          {
            key: '7',
            title: 'content 7',
            description: 'description of content 8',
            direction: 'right',
          },
          {
            key: '8',
            title: 'content 8',
            description: 'description of content 8',
            direction: 'undefined',
          },
          {
            key: '9',
            title: 'content 9',
            description: 'description of content 9',
            direction: 'right',
          },
          {
            key: '10',
            title: 'content 10',
            description: 'description of content 10',
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
        className: "col-md-6 col-xs-12",
        label: 'tree Select',
        type: "treeSelect",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        expandKeys: ['100', '1001'],
        title: 'parent 1',
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
    else if (value == 'cascader') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "col-md-6 col-xs-12",
        label: 'Cascader',
        type: "cascader",
        isNextChild: false,
        hideExpression: false,
        options: [
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
        id: 'common_' + Guid.newGuid(),
        key: 'drawer_' + Guid.newGuid(),
        type: "drawer",
        label: 'Drawer',
        className: "col-md-6 col-xs-12",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        color: "primary",
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
        title: "Basic Drawer",
        footerText: "",
        isVisible: false,
        placement: "right",
        size: "right",
        width: "",
        height: "", //number and string
        offsetX: 0,
        offsetY: 0,
        wrapClassName: "",
        zIndex: 1,
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
        label: 'Skeleton',
        className: "col-md-6 col-xs-12",
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
        label: 'Empty',
        className: "col-md-6 col-xs-12",
        tooltip: "",
        isNextChild: false,
        hideExpression: false,

        icon: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",
        content: "contentTpl",
        text: "Description",
        link: "#API",
        btnText: "Create Now",
        color: "primary",
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
        label: 'List with Load More',
        className: "col-md-6 col-xs-12",
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
        label: 'Tree View',
        className: "col-md-6 col-xs-12",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        isBlockNode: true,
        isDraggable: true,
        isShowLine: true,
        isCheckable: false,
        isMultiple: false,
        isExpandAll: false,
        treeNode: [
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
        label: 'Mention',
        className: "col-md-6 col-xs-12",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        options: ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'],
        title: "@afc163",
        placeholder: "enter sugestion",
        rows: "1",
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'message') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'message_' + Guid.newGuid(),
        label: 'Message',
        type: "message",
        className: "col-md-6 col-xs-12",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        title: "show Message",
        content: "this message is disappeard after 10 seconds",
        duration: 10000,
        messageType: "success",
        children: [],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'notification') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        key: 'notification_' + Guid.newGuid(),
        label: 'Notification',
        type: "notification",
        className: "col-md-6 col-xs-12",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        title: "Notification Title",
        content: "A function will be be called after the notification is closed (automatically after the 'duration' time of manually).",
        isSmile: true,
        icon: "smile",
        color: "#108ee9",
        duration: 3000,
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
    if(node.children)
    node.children.push(newNode);
    // this.dropTargetIds = [];
    // this.formlyService.templateNode = JSON.parse(JSON.stringify(this.formlyService.nodes));
    // this.formlyService.prepareDragDrop(this.formlyService.templateNode, this.selectdNode);
  }
  getLastNodeWrapper(dataType?: string) {
    let wrapperName: any = ['form-field-horizontal'];
    if (dataType == 'wrappers') {
      return wrapperName;
    } else if (dataType == 'disabled') {
      return false;
    }
    let disabledProperty: any;
    if(this.selectdNode.children){
      for (let j = 0; j < this.selectdNode.children.length; j++) {
        if (this.selectdNode.children[j].formlyType != undefined) {
          if (this.selectdNode.children[j].formlyType == 'input') {
            wrapperName = this.selectdNode.children[j].chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
            disabledProperty = this.selectdNode.children[j].chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
          }
          else if (this.selectdNode.children[j].type == 'tabsMain') {
            this.selectdNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
              });
            });
          }
          else if (this.selectdNode.children[j].type == 'stepperMain') {
            this.selectdNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
              });
            });
          }
          else if (this.selectdNode.children[j].type == 'mainDashonicTabs') {
            this.selectdNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
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
    parent = parent.parentNode.origin;
    node = node.origin;
    this.searchControllData = [];
    this.IsConfigurationVisible = true;
    this.controlListvisible = false;
    // document.getElementById("mySidenav-right").style.width = "100%";
    this.IsShowConfig = true;
    this.selectdNode = node;
    this.selectdParentNode = parent;

    this.clickButton(node.type)

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

  clickButton(type: any) {
    this.fieldData = new GenaricFeild();
    let _formFieldData = new formFeildData();
    this.fieldData.type = type;
    this.fieldData.title = "Change Attribute Values";
    let configObj: any = {};
    if (type == "breakTag") {
      configObj = {
        id: this.selectdNode.id as string,
        tooltip: this.selectdNode.tooltip,
        title: this.selectdNode.title,
        hideExpression: this.selectdNode.hideExpression,
        className: this.selectdNode.className,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.breakTagFeilds;
    }
    if (type == "drawer") {
        configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        label: this.selectdNode.label,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        //----------------------------------------
        color: this.selectdNode.color,
        btnText: this.selectdNode.btnText,
        isClosable: this.selectdNode.isClosable,
        icon: this.selectdNode.icon,
        extra: this.selectdNode.extra,
        // isMask: this.selectdNode.isMask,
        // isMaskClosable: this.selectdNode.isMaskClosable,
        // isCloseOnNavigation: this.selectdNode.isCloseOnNavigation,
        isKeyboard: this.selectdNode.isKeyboard,
        // maskStyle: this.selectdNode.maskStyle,
        // bodyStyle: this.selectdNode.bodyStyle,
        title: this.selectdNode.title,
        footerText: this.selectdNode.footerText,
        isVisible: this.selectdNode.isVisible,
        placement: this.selectdNode.placement,

        size: this.selectdNode.size,
        width: this.selectdNode.width,
        height: this.selectdNode.height,
        offsetX: this.selectdNode.offsetX,
        offsetY: this.selectdNode.offsetY,
        wrapClassName: this.selectdNode.wrapClassName,
        zIndex: this.selectdNode.zIndex,
        onClose: this.selectdNode.onClose,
      }
    }
    else if (type == "skeleton") {
        configObj= {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        label: this.selectdNode.label,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        //----------------------------------------
        isActive: this.selectdNode.isActive,
        size: this.selectdNode.size,
        buttonShape: this.selectdNode.buttonShape,
        avatarShape: this.selectdNode.avatarShape,
      }
    }
    else if (type == "empty") {
      configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        label: this.selectdNode.label,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        //----------------------------------------
        icon: this.selectdNode.icon,
        content: this.selectdNode.content,
        text: this.selectdNode.text,
        link: this.selectdNode.link,
        btnText: this.selectdNode.btnText,
        color: this.selectdNode.color,
      }
    }
    else if (type == "list") {
      configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        label: this.selectdNode.label,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        //----------------------------------------
        headerText: this.selectdNode.headerText,
        footerText: this.selectdNode.footerText,
        formatter: this.selectdNode.formatter,
        size: this.selectdNode.size,
        isBordered: this.selectdNode.isBordered,
        isSplit: this.selectdNode.isSplit,
        isEdit: this.selectdNode.isEdit,
        isUpdate: this.selectdNode.isUpdate,
        isDelete: this.selectdNode.isDelete,
        isLoad: this.selectdNode.isLoad,
        loadText: this.selectdNode.loadText,
        options: this.selectdNode.options,
      }
    }
    else if (type == "descriptionAttribute") {
        configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        label: this.selectdNode.label,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        //----------------------------------------
        title: this.selectdNode.title,
        nzExtra: this.selectdNode.nzExtra,
        formatter: this.selectdNode.formatter,
        size: this.selectdNode.size,
        isBordered: this.selectdNode.isBordered,
        isColon: this.selectdNode.isColon,
      }
    }
    else if (type == "descriptionChildAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        label: this.selectdNode.label,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        hideExpression: this.selectdNode.hideExpression,
        //----------------------------------------
        title: this.selectdNode.title,
        content: this.selectdNode.content,
        nzStatus: this.selectdNode.nzStatus,
        isBadeg: this.selectdNode.isBadeg,
        nzSpan: this.selectdNode.nzSpan,
      }
    }
    else if (type == "affixAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        tooltip: this.selectdNode.tooltip,
        label: this.selectdNode.label,
        hideExpression: this.selectdNode.hideExpression,
        className: this.selectdNode.className,
        affixType: this.selectdNode.affixType,
        margin: this.selectdNode.margin,
        target: this.selectdNode.target,
      }
    }
    else if (type == "avatarAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        tooltip: this.selectdNode.tooltip,
        key: this.selectdNode.key,
        label: this.selectdNode.label,
        hideExpression: this.selectdNode.hideExpression,
        className: this.selectdNode.className,
        icon: this.selectdNode.icon,
        text: this.selectdNode.text,
        src: this.selectdNode.src,
        bgColor: this.selectdNode.bgColor,
        color: this.selectdNode.color,
        gap: this.selectdNode.gap,
        alt: this.selectdNode.alt,
      }
    }
    else if (type == "commentAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        className: this.selectdNode.className,
        label: this.selectdNode.label,
        hideExpression: this.selectdNode.hideExpression,
        tooltip: this.selectdNode.tooltip,
        avatar: this.selectdNode.avatar,
        author: this.selectdNode.author,
      }
    }
    else if (type == "popOverAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        className: this.selectdNode.className,
        label: this.selectdNode.label,
        hideExpression: this.selectdNode.hideExpression,
        tooltip: this.selectdNode.tooltip,
        btnLabel: this.selectdNode.btnLabel,
        nzPopoverContent: this.selectdNode.nzPopoverContent,
        nzPopoverTitle: this.selectdNode.nzPopoverTitle,
      }
    }
    else if (type == "spinAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        className: this.selectdNode.className,
        label: this.selectdNode.label,
        hideExpression: this.selectdNode.hideExpression,
        tooltip: this.selectdNode.tooltip,
        size: this.selectdNode.size,
        delayTime: this.selectdNode.delayTime,
        loaderText: this.selectdNode.loaderText,
        loaderIcon: this.selectdNode.loaderIcon,
      }
    }
    else if (type == "resultAttribute") {
      configObj = {
        id: this.selectdNode.id as string,
        key: this.selectdNode.key,
        className: this.selectdNode.className,
        label: this.selectdNode.label,
        hideExpression: this.selectdNode.hideExpression,
        tooltip: this.selectdNode.tooltip,
        status: this.selectdNode.status,
        resultTitle: this.selectdNode.resultTitle,
        subTitle: this.selectdNode.subTitle,
        btnLabel: this.selectdNode.btnLabel,
      }
    }
    else if (type == "imageUpload") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.imageUploadFeilds;
    }
    else if (type == "toastr") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.toastrFeilds;
    }
    else if (type == "invoice") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.invoiceFeilds;
    }
    else if (type == "rangeSlider") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.rangeSliderFeilds;
    }
    else if (type == "inputGroupGrid") {
      configObj = {
        id: this.selectdNode.id as string,
        tooltip: this.selectdNode.tooltip,
        title: this.selectdNode.title,
        hideExpression: this.selectdNode.hideExpression,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.inputGroupGridFeilds;
    }
    else if (type == "card") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.cardFields;
    }
    else if (type == "fixedDiv") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.title,
        tooltip: this.selectdNode?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.formData = _formFieldData.fixedDivFields;
    }
    else if (type == "tuiCalender") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.tuiCalendarFeilds;
    }
    else if (type == "multiFileUpload") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.title,
        className: this.selectdNode.className,
        tooltip: this.selectdNode?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.multiFileUploadFeilds;
    }
    else if (type == "textEditor") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.title,
        className: this.selectdNode.className,
        tooltip: this.selectdNode.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.textEditorFeilds;
    }
    else if (type == "switch") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.switchFeilds;
    }
    else if (type == "dashonicTabs") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode?.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.hideExpression, "hideExpression"),
        className: this.selectdNode.className,
        tabtitle: this.selectdNode.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.tabtitle,
        tabIcon: this.selectdNode.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.tabIcon,
        tooltip: this.selectdNode.chartCardConfig?.at(0)?.dashonicTabsConfig[0]?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.dashonicTabFields;
    }
    else if (type == "kanban") {
      configObj = {
        id: this.selectdNode.id as string,
        hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
        title: this.selectdNode.chartCardConfig?.at(0)?.text,
        nodes: this.selectdNode.chartCardConfig?.at(0)?.nodes,
        tooltip: this.selectdNode?.tooltip,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),

      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.kanbanFeilds;
    }
    else if (type == "kanbanTask") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.kanbanTaskFeilds;
    }
    else if (type == "mainDashonicTabs") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.dashoniMainTabFields;
    }

    else if (type == "progressBar") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.progressBarFeilds;
    }
    else if (type == "divider") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.dividerFeilds;
    }
    else if (type == "video") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.videosFeilds;
    }
    else if (type == "audio") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.audioFeilds;
    }
    else if (type == "carouselCrossfade") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.carousalFeilds;
    }
    else if (type == "alert") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.alertFeilds;
    }
    else if (type == "timeline") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.timelineFeilds;
    }


    else if (type == "simpleCardWithHeaderBodyFooter") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.simpleCardWithHeaderBodyFooterFeilds;
    }


    else if (type == "sharedMessagesChart") {

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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.sharedMessagesChartFeilds;
    }
    else if (type == "browserCard") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.browserChartFields;
    }
    else if (type == "browserCombineChart") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.browserComibeChartFields;
    }
    else if (type == "widgetSectionCard") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.widgetSectionChartFields;
    }
    else if (type == "sectionCard") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.SectionChartFields;
    }
    else if (type == "chart") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.chartFields;
    }
    else if (type == "donutChart") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.donutChartFields;
    }
    else if (type == "donuteSaleChart") {

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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.donutSaleChartFields;
    }
    else if (type == "salesAnalyticschart") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.saleAnalyticsChartFields;
    }
    else if (type == "heading") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.headingFields;
    }
    else if (type == "paragraph") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.paragraphFields;
    }
    else if (type == "tags" || type == "multiselect" || type == "search" || type == "radiobutton" || type == "checkbox"
      || type == "datetime" || type == "time" || type == "date" || type == "month" || type == "decimal" || type == "week"
      || type == "color" || type == "input" || type == "inputGroup" || type == "image" || type == "textarea"
      || type == "telephone") {
      debugger
      if (this.selectdNode) {
        configObj = {
          id: this.selectdNode.id as string,
          hideExpression: this.addPropertieInOldScreens(this.selectdNode.hideExpression, "hideExpression"),
          key: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.key,
          label: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
          className: this.selectdNode?.className,
          placeholder: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.placeholder,
          options: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.options,
          required: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.required,
          tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['tooltip'],
          titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['labelIcon'],
          rows: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.rows,
          formCheck: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['formCheck'],
          addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
          addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.fieldData.commonData = _formFieldData.commonFormlyConfigurationFields;
      if (type == "tags" || type == "multiselect" || type == "search" || type == "radiobutton" || type == "checkbox")
        this.fieldData.formData = _formFieldData.radioFields;
      if (type == 'color')
        this.fieldData.formData = _formFieldData.colorFields;

    }
    else if (type == "customMasking") {
      if (this.selectdNode) {
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
          tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['tooltip'],
          titleIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['labelIcon'],
          addonLeft: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonLeft"),
          addonRight: this.addPropertieInOldScreens(this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions, "addonRight"),
          // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        }
      }
      this.fieldData.commonData = _formFieldData.commonFormlyConfigurationFields;
      this.fieldData.formData = _formFieldData.customMaskingFields;
    }
    //button Conditions
    else if (type == "button") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.buttonFields;
    }
    else if (type == "dropdownButton") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.dropdownButtonFields;
    }
    else if (type == "accordionButton") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.accordionButtonFields;
    }
    //Link Button Conditions
    else if (type == "linkButton") {

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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.linkButtonFields;
    }
    else if (type == "buttonGroup") {

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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.buttonGroupFields;
    }

    //Grid Conditions
    else if (type == "gridNameAttributes") {

    }
    // Working For Page Section
    else if (type == "page") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        variables: this.selectdNode.screenVariables
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.pageFields;
    }
    else if (type == "pageHeader") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        headingSize: this.selectdNode.headingSize,
        header: this.selectdNode.header,
        titlePosition: this.selectdNode.labelPosition,
        alertPosition: this.selectdNode.alertPosition,
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.pageHeaderFields;
    }
    else if (type == "pageBody") {


      // this.fieldData.formData = this.methodUrl;

      var objPageBody = {
        id: this.selectdNode.id,
        title: this.selectdNode.title
      }
      this.formModalData = objPageBody;
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.pageBodyFields;
    }
    else if (type == "pageFooter") {


      // this.fieldData.formData = this.methodUrl;

      var objPageFooter = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        footer: this.selectdNode.footer,
      }
      this.formModalData = objPageFooter;
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.pageFooterFields;
    }
    else if (type == "according") {
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
          this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
          this.fieldData.formData = _formFieldData.accordingFields;
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
          this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
          this.fieldData.formData = _formFieldData.accordingFields;
        }
      }
    }
    else if (type == "accordingHeader") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.accordingHeaderFields;
    }
    else if (type == "accordingBody") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.accordingBodyFields;
    }
    else if (type == "accordingFooter") {
      configObj = {
        id: this.selectdNode.id,
        title: this.selectdNode.title,
        footer: this.selectdNode.footer,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.accordingFooterFields;
    }
    else if (type == "stepper") {
      configObj = {
        // stepperText: this.selectdNode.id,
        steppertitle: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['tooltip'],
        // stepperIcon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.icon,
        // stepperFormat: this.selectdNode.chartCardConfig?.at(0)?.formly?.at(0)?.stepperFormat,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        // nodes: this.stepperNewlength,
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.stepperFields;
    }
    else if (type == "stepperMain") {
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
        tooltip: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['tooltip'],
        icon: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['icon'],
        steppertitle: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.label,
        nodes: this.selectdNode.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.['nodes'],
        // stepperFormat: this.selectdNode.chartCardConfig[0].formly[0].stepperFormat,
        // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
        // nodes: this.stepperNewlength,
      }
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.mainStepperFields;
    }
    else if (type == "tabsMain") {
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
      this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
      this.fieldData.formData = _formFieldData.mainTabFields;
    }

    else if (type == "gridAttributes") {
      this.fieldData.formData = _formFieldData.gridFields;
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
                  var className = element3.formly[0].fieldGroup[0].className;
                  if (id == element3.id) {
                    if (!element3.formly[0].fieldGroup[0].className.includes("highLight")) {
                      element3.formly[0].fieldGroup[0].className = element3.formly[0].fieldGroup[0].className + " highLight";
                    }
                  }
                  else
                    element3.formly[0].fieldGroup[0].className = className.replace("highLight", "");
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
      // this.updateNodes();
    });
  }
  addSection() {
    this.sectionBageBody = this.nodes[0].children[1];
    this.selectdNode = this.sectionBageBody,
      this.addControlToJson('according', null);
    this.selectdNode = this.sectionAccording;
    this.addControlToJson('accordingHeader', null);
    this.addControlToJson('accordingBody', null);
    this.addControlToJson('accordingFooter', null);
    this.selectdNode = this.sectionAccorBody;
    this.addControlToJson('text', this.textJsonObj);
  }
  openField(event: any) {

    let id = event.origin.id;
    let node = event.origin;
    if (this.screenPage) {
      this.searchControllData = [];
      this.isActiveShow = id;
      this.selectdNode = node;
      if (this.selectdNode.isNextChild) {
        // this.IsShowConfig = true;
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
                  element.formly[0].fieldGroup[0].key = element.formly[0].fieldGroup[0].key + Guid.newGuid();
                }
              }
            }
            element.children.forEach((element1: any) => {
              element1.id = element1.id + Guid.newGuid();
              if (element1.chartCardConfig) {
                if (element1.chartCardConfig.length > 0) {
                  if (element1.chartCardConfig[0].formly) {
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

    this.updateNodes();
    // this.jsonStringifData();

    // array.splice(index, 0, ...elementsArray);
  }
  remove(parent: any, node: any) {
    parent = parent?.parentNode?.origin;
    node = node.origin;
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
    this.updateNodes();
  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
  updateNodes() {
    this.nodes = [...this.nodes];
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
  EnumView() {
    this.builderService.multiAPIData().subscribe((res => {
      const node = this.selectdNode ?? {};
      const formly = node.formly ?? [];
      const fieldGroup = formly?.[0]?.fieldGroup ?? [];
      const templateOptions = fieldGroup[0]?.templateOptions ?? {};
      templateOptions.options = res ?? undefined;
      this.updateNodes();
      // this.updateNodes();
    }));
  }
  notifyEmit(event: actionTypeFeild): void {
    debugger
    switch (event.type) {
      case "drawer":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.color = event.form.color;
          this.selectdNode.btnText = event.form.btnText;
          this.selectdNode.isClosable = event.form.isClosable;
          this.selectdNode.icon = event.form.icon;
          this.selectdNode.extra = event.form.extra;
          this.selectdNode.isKeyboard = event.form.isKeyboard;
          this.selectdNode.title = event.form.title;
          this.selectdNode.footerText = event.form.footerText;
          this.selectdNode.isVisible = event.form.isVisible;
          this.selectdNode.placement = event.form.placement;
          this.selectdNode.size = event.form.size;
          this.selectdNode.width = event.form.width;
          this.selectdNode.height = event.form.height;
          this.selectdNode.offsetX = event.form.offsetX;
          this.selectdNode.offsetY = event.form.offsetY;
          this.selectdNode.wrapClassName = event.form.wrapClassName;
          this.selectdNode.zIndex = event.form.zIndex;
          this.selectdNode.onClose = event.form.onClose;
        }
        break;
      case "skeleton":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.isActive = event.form.isActive;
          this.selectdNode.size = event.form.size;
          this.selectdNode.buttonShape = event.form.buttonShape;
          this.selectdNode.avatarShape = event.form.avatarShape;
        }
        break;
      case "empty":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.icon = event.form.icon;
          this.selectdNode.content = event.form.content;
          this.selectdNode.text = event.form.text;
          this.selectdNode.link = event.form.link;
          this.selectdNode.btnText = event.form.btnText;
          this.selectdNode.color = event.form.color;
        }
        break;
      case "list":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.headerText = event.form.headerText;
          this.selectdNode.footerText = event.form.footerText;
          this.selectdNode.formatter = event.form.formatter;
          this.selectdNode.size = event.form.size;
          this.selectdNode.isBordered = event.form.isBordered;
          this.selectdNode.isSplit = event.form.isSplit;
          this.selectdNode.isEdit = event.form.isEdit;
          this.selectdNode.isUpdate = event.form.isUpdate;
          this.selectdNode.isDelete = event.form.isDelete;
          this.selectdNode.isLoad = event.form.isLoad;
          this.selectdNode.loadText = event.form.loadText;
          this.selectdNode.options = event.form.options;
        }
        break;
      case "descriptionAttribute":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.title = event.form.title;
          this.selectdNode.nzExtra = event.form.nzExtra;
          this.selectdNode.formatter = event.form.formatter;
          this.selectdNode.size = event.form.size;
          this.selectdNode.isBordered = event.form.isBordered;
          this.selectdNode.isColon = event.form.isColon;
        }
        break;
      case "descriptionChildAttribute":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.title = event.form.title;
          this.selectdNode.content = event.form.content;
          this.selectdNode.nzStatus = event.form.nzStatus;
          this.selectdNode.isBadeg = event.form.isBadeg;
          this.selectdNode.nzSpan = event.form.nzSpan;
        }
        break;
      case "selectAttributes" || 'tagAttributes' || 'searchAttributes' || 'radioAttributes'
        || 'checkBoxAttributes' || 'decimalAttributes' || 'inputAttributes' ||
        'inputGroupAttributes' || 'imageAttributes' || 'telephoneAttributes' || 'textareaAttributes'
        || 'textareaAttributes' || 'timeAttributes' || 'monthAttributes' || 'weekAttributes' || 'dateTimeAttributes'
        || 'dateAttributes' || 'colorAttributes' :
        if (this.selectdNode) {
          this.selectdNode.className = event.form.className
          this.selectdNode.formly?.forEach(elementV1 => {
            // MapOperator(elementV1 = currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            const templateOptions = fieldGroup[0]?.templateOptions ?? {};

            templateOptions.label = event.form.label;
            templateOptions['key'] = event.form.key;
            templateOptions['defaultValue'] = event.form.defaultValue;
            templateOptions['className'] = event.form.className;
            templateOptions['hideExpression'] = event.form.hideExpression;
            templateOptions.placeholder = event.form.placeholder;
            // templateOptions['className'] = event.form.className;
            templateOptions['options'] = event.form.options;
            templateOptions['required'] = event.form.required;
            templateOptions['disabled'] = event.form.disabled;
            templateOptions['tooltip'] = event.form.tooltip;
            templateOptions['labelIcon'] = event.form.labelIcon;
            templateOptions['addonLeft'].text = event.form.addonLeft;
            templateOptions['addonRight'].text = event.form.addonRight;
            templateOptions['tooltip'] = event.form.tooltip;
            templateOptions['options'] = event.form.multiselect == "" ? event.form.options : "";
            if (this.selectdNode.type == "multiselect") {
              const arr = event.form.defaultValue.split(',');
              templateOptions['defaultValue'] = arr;
            } else {
              templateOptions['defaultValue'] = event.form.defaultValue;
            }
            if (event.form.apiData != undefined) {
              this.selectdNode.link = event.form.apiData;
              this.builderService.jsonTagsDataGet(event.form.apiData).subscribe((res) => {

                templateOptions.options = res;
              })
            } else {
              templateOptions.options = event.form.options;
            }
          });
          this.selectdNode.label = event.form.label;
          if (event.form.multiselect != "") {
            this.EnumView();
          }
        }
        break;

      case "breakTagAttribute":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
        }
        break;
      case "affixAttribute":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.className = event.form.className;
          this.selectdNode.affixType = event.form.affixType;
          this.selectdNode.margin = event.form.margin;
          this.selectdNode.target = event.form.target;
          this.selectdNode.hideExpression = event.form.hideExpression;
        }
        break;
      case "avatarAttribute":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.key = event.form.key;
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.src = event.form.src;
          this.selectdNode.text = event.form.text;
          this.selectdNode.icon = event.form.icon;
          this.selectdNode.bgColor = event.form.bgColor;
          this.selectdNode.color = event.form.color;
          this.selectdNode.gap = event.form.gap;
          this.selectdNode.alt = event.form.alt;
        }
        break;
      case "commentAttribute":
        debugger
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.key = event.form.key;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.avatar = event.form.avatar;
          this.selectdNode.author = event.form.author;
        }
        break;
      case "popOverAttribute":
        debugger
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.key = event.form.key;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.btnLabel = event.form.btnLabel;
          this.selectdNode.nzPopoverContent = event.form.nzPopoverContent;
          this.selectdNode.nzPopoverTitle = event.form.nzPopoverTitle;
        }
        break;
      case "spinAttribute":
        debugger
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.key = event.form.key;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.size = event.form.size;
          this.selectdNode.delayTime = event.form.delayTime;
          this.selectdNode.loaderText = event.form.loaderText;
          this.selectdNode.loaderIcon = event.form.loaderIcon;
        }
        break;
      case "resultAttribute":
        debugger
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.key = event.form.key;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.status = event.form.status;
          this.selectdNode.resultTitle = event.form.resultTitle;
          this.selectdNode.subTitle = event.form.subTitle;
          this.selectdNode.btnLabel = event.form.btnLabel;
        }
        break;
      case "imageUploadAttribute":
        if (this.selectdNode) {

          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.alt = event.form.alt;
          this.selectdNode.source = event.form.source;
          this.selectdNode.imagHieght = event.form.imagHieght;
          this.selectdNode.imageWidth = event.form.imageWidth;
          this.selectdNode.imageClass = event.form.imageClass;
          if (event.form.source) {
            // this.formlyService.imageUrl = '';
            this.selectdNode.base64Image = '';
          }
          // else if (this.formlyService.imageUrl) {
          //   this.selectdNode.base64Image = this.formlyService.imageUrl;
          // }
        }
        break;
      case "toastrAttribute":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.toastrType = event.form.toastrType;
          this.selectdNode.toasterTitle = event.form.toasterTitle;
          this.selectdNode.duration = event.form.duration;
          this.selectdNode.placement = event.form.placement;
          this.selectdNode.closeIcon = event.form.closeIcon;
          this.selectdNode.description = event.form.description;
          this.selectdNode.animate = event.form.animate;
          this.selectdNode.pauseOnHover = event.form.pauseOnHover;
        }
        break;
      case "invoiceAttribute":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.invoiceNumberLabel = event.form.invoiceNumberLabel;
          this.selectdNode.datelabel = event.form.datelabel;
          this.selectdNode.paymentTermsLabel = event.form.paymentTermsLabel;
          this.selectdNode.poNumber = event.form.poNumber;
          this.selectdNode.billToLabel = event.form.billToLabel;
          this.selectdNode.dueDateLabel = event.form.dueDateLabel;
          this.selectdNode.shipToLabel = event.form.shipToLabel;
          this.selectdNode.notesLabel = event.form.notesLabel;
          this.selectdNode.subtotalLabel = event.form.subtotalLabel;
          this.selectdNode.dicountLabel = event.form.dicountLabel;
          this.selectdNode.shippingLabel = event.form.shippingLabel;
          this.selectdNode.taxLabel = event.form.taxLabel;
          this.selectdNode.termsLabel = event.form.termsLabel;
          this.selectdNode.totalLabel = event.form.totalLabel;
          this.selectdNode.amountpaidLabel = event.form.amountpaidLabel;
          this.selectdNode.balanceDueLabel = event.form.balanceDueLabel;
        }
        break;
      case "rangeSliderAttribute":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.min = event.form.min;
          this.selectdNode.max = event.form.max;
          this.selectdNode.sliderType = event.form.sliderType;
          this.selectdNode.progressBar = event.form.progressBar;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.disabled = event.form.disabled;
          this.selectdNode.showValue = event.form.showValue;
        }
        break;
      case "inputGroupGridAttribute":

        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.hideExpression = event.form.hideExpression;
        }
        break;

      case "calendarAttribute":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.viewType = event.form.viewType;
          this.selectdNode.disabled = event.form.disabled;
          if (event.form.statusApi != undefined) {
            this.builderService.genericApis(event.form.statusApi).subscribe((res => {
              this.selectdNode.options = res;
              this.updateNodes();
            }))
          }
          // this.updateNodes();
        }
        break;
      case "maskingAttribute":
        if (this.selectdNode) {
          this.selectdNode.className = event.form.className
          this.selectdNode?.formly?.forEach(elementV1 => {
            // MapOperator(elementV1 =currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            const templateOptions = fieldGroup[0]?.templateOptions ?? {};
            templateOptions['key'] = event.form.key;

            templateOptions.label = event.form.label;
            templateOptions.focus = event.form.focus;
            templateOptions['hideExpression'] = event.form.hideExpression;
            templateOptions['defaultValue'] = event.form.defaultValue;
            templateOptions['required'] = event.form.required;
            templateOptions.readonly = event.form.readonly;
            templateOptions.placeholder = event.form.placeholder;
            templateOptions['required'] = event.form.required;
            templateOptions['disabled'] = event.form.disabled;
            templateOptions['tooltip'] = event.form.tooltip;
            templateOptions['maskString'] = event.form.maskString;
            templateOptions['maskLabel'] = event.form.maskLabel;
            templateOptions['labelIcon'] = event.form.labelIcon;
            templateOptions['addonLeft'].text = event.form.addonLeft;
            templateOptions['addonRight'].text = event.form.addonRight;
            templateOptions['tooltip'] = event.form.tooltip;
            templateOptions['options'] = event.form.multiselect == "" ? event.form.options : "";
          });
          this.selectdNode.label = event.form.label;
          this.selectdNode.id = event.form.id;
        }
        break;
      case "gridAttributes":

        if (this.selectdNode.id) {
          this.selectdNode.label = event.form.header,
            this.selectdNode.editorType = event.form.editorType,
            this.selectdNode.sortable = event.form.sortable,
            this.selectdNode.filter = event.form.filter;
          this.selectdNode.header = event.form.header;
          if (event.form?.sortable) {
            this.selectdNode.sortingType = "desc";
            this.selectdNode.sortable = true;
          }
          else {
            delete this.selectdNode.sortingType;
            delete this.selectdNode.sortable;
          }

          if (event.form.filter) {
            this.selectdNode['filter'] = {};
            this.selectdNode.filter["type"] = {};
            this.selectdNode.filter.type = event.form?.filterType;
            if (event.form.filterType != "select") {
              this.selectdNode.filter.operator = "OR"
              this.selectdNode.filter.showApplyBtn = true;
              this.selectdNode.filter.showClearBtn = true;
            }
          } else {
            delete this.selectdNode.filter;
          }
          if (event.form.editorType) {
            this.selectdNode.editorType = event.form.editorType;
            if (event.form.fieldType == "text" || event.form.fieldType == "number") {
              this.selectdNode["editor"] = {};
              this.selectdNode.editor["type"] = {};
              this.selectdNode.editor.type = event.form.fieldType
            };
            if (event.form.fieldType == "select" || event.form.fieldType == "radio" || event.form.fieldType == "checkbox") {
              if (event.form.options.length > 0) {
                this.selectdNode['editor'] = {};
                this.selectdNode.editor['type'];
                this.selectdNode.editor.type = event.form.fieldType;
                this.selectdNode.editor['options'] = {};
                this.selectdNode.editor.options['listItems'] = [];
                this.selectdNode['formatter'] = {}
                this.selectdNode.formatter = "listItemText";
                this.selectdNode.editor.options.listItems = event.form.options;
              } else {
                this.selectdNode.editor.type = event.form.fieldType;
              }
            }
          }
          else if (this.selectdNode.editor.options && event.form.options.length > 0) {
            this.selectdNode.editor.options.listItems = event.form.options;
          }
          this.selectdParentNode.columnData.forEach((element: any) => {
            if (element.id == this.selectdNode.id) {
              element = this.selectdNode;
            }
          });
        }
        break;

      case "gridNameAttributes":
        if (this.selectdNode) {

          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.className = event.form.className;
          this.selectdNode.sortable = event.form.sortable;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.label = event.form.gridName;
          this.selectdNode.pagination = event.form.pagination;
          this.selectdNode.filter = event.form.filter;
          this.selectdNode.icon = event.form.icon;
          this.selectdNode.id = event.form.id;
          // this.selectdNode.getVariable = event?.form?.getVariable,
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.delete = event.form.delete;
          this.selectdNode.update = event.form.update;
          this.selectdNode.create = event.form.create;
          this.selectdNode['deleteapi'] = event.form.deleteapi;
          this.selectdNode.columnData.forEach((a: any) => {
            if (event.form?.sortable) {
              a.sortingType = "desc";
              a.sortable = true;
            }
            else {
              delete a?.sortingType;
              delete a?.sortable;
            }
            if (event.form.filter) {
              a['filter'] = {};
              a.filter.type = "select";
              // a.filter.type = event.form?.filterType;
              if (event.form.filterType != "select") {
                a.filter.operator = "OR"
                a.filter.showApplyBtn = true;
                a.filter.showClearBtn = true;
              }
            } else {
              delete a.filter;
            }
          });
          let newColumnData: any = [];
          let data = JSON.parse(JSON.stringify(event.form.options))
          for (let element = 0; element < data.length; element++) {
            for (let index = 0; index < this.selectdNode.columnData.length; index++) {
              if (data[element].id) {
                if (this.selectdNode.columnData[index].id == data[element].id) {
                  this.selectdNode.columnData[index].label = data[element].header;
                  this.selectdNode.columnData[index].name = data[element].name;
                  this.selectdNode.columnData[index].header = data[element].header;
                  this.selectdNode.columnData[index].showColumn = data[element].showColumn;
                  this.selectdNode.columnData[index].sumColumn = data[element].sumColumn;
                  this.selectdNode.columnData[index]["api"] = data[element].api;
                  newColumnData.push(this.selectdNode.columnData[index]);
                }
              }
              else {
                data[element]["id"] = data[element].name + "_" + Guid.newGuid();
                data[element]["children"] = [];
                data[element]["type"] = "input";
                data[element]["label"] = data[element].name;
                newColumnData.push(data[element]);
              }
            }
          }
          this.selectdNode.columnData = newColumnData;
          this.selectdNode.children = this.selectdNode.columnData;
          if (event.form?.link != null) {
            this.selectdNode.columnData = [];
            this.builderService.genericApis(event.form?.link).subscribe((res => {
              this.selectdNode.children = res[0].columnData;
              res[0].columnData.forEach((element: any) => {
                element["id"] = element.name + "_" + Guid.newGuid();
                this.selectdNode.columnData.push(element);

              });
              this.selectdNode.rowData = res[0].rowData;
              this.selectdNode.columnData.forEach((a: any) => {
                if (event.form?.sortable) {
                  a.sortingType = "desc";
                  a.sortable = true;
                }
                else {
                  delete a?.sortingType;
                  delete a?.sortable;
                }
                if (event.form.filter) {
                  a['filter'] = {};
                  a.filter.type = "select";
                  a.filter.type = event.form?.filterType;
                  if (event.form.filterType != "select") {
                    a.filter.operator = "OR"
                    a.filter.showApplyBtn = true;
                    a.filter.showClearBtn = true;
                  }
                } else {
                  delete a.filter;
                }
              });
              this.updateNodes();
            }))
            // this.GridView(event.form.link);
          }
        }


        break;

      case "gridNameAction":
        this.selectdNode.link = event.form.APIList;
        // this.GridView(event.form.APIList);
        break;

      case "buttonAttributes":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.title;
          if (this.selectdNode && this.selectdNode.buttonGroup && this.selectdNode.buttonGroup[0] && this.selectdNode.buttonGroup[0].btnConfig) {
            this.selectdNode.buttonGroup[0].btnConfig[0].title = event.form.title;
            this.selectdNode.buttonGroup[0].btnConfig[0].hideExpression = event.form.hideExpression;
            this.selectdNode.buttonGroup[0].btnConfig[0].color = event.form.color;
            this.selectdNode.buttonGroup[0].btnConfig[0].btnIcon = event.form.btnIcon;
            this.selectdNode.buttonGroup[0].btnConfig[0].className = event.form.className;
            // this.selectdNode.chartCardConfig[0].buttonGroup[0].btnConfig[0].format = event.form.format;
            this.selectdNode.buttonGroup[0].btnGroupFormat = event.form.btnGroupFormat;
            this.selectdNode.buttonGroup[0].btnConfig[0].disabled = event.form.disabled;
            if (event.form.disabled) {
              // this.selectdNode.buttonGroup[0].btnConfig[0].btnDisables = this.form.valid;
            } else
              this.selectdNode.buttonGroup[0].btnConfig[0].btnDisables = false;
            this.selectdNode.buttonGroup[0].btnConfig[0].tooltip = event.form.tooltip;
          }
        }
        break;

      case "groupButtonAttributes":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          // this.selectdNode.chartCardConfig[0].buttonGroup[0].btnConfig[0].key = event.form.key
          this.selectdNode.label = event.form.title
          if (this.selectdNode && this.selectdNode.children) {
            this.selectdNode.btnGroupPosition = event.form.btnGroupPosition;
            for (let i = 0; i < this.selectdNode.children.length; i++) {
              const node = this.selectdNode.children ?? [];
              const btnGroup = node[i].buttonGroup ?? [];
              btnGroup[0].btnGroupFormat = event.form.btnGroupFormat
              btnGroup[0].btnConfig[0].hideExpression = event.form.hideExpression
              this.selectdNode.children[i].className = event.form.className
              // this.selectdNode.children.forEach(elementV1 => elementV1.chartCardConfig[0].buttonGroup[0].btnGroupFormat = event.form.btnGroupFormat);
              if (event.form.btnGroupPosition == 'header') {
                this.selectdParentNode.header = true;
              }
              else if (event.form.btnGroupPosition == 'default') {
                this.selectdParentNode.header = false;
              }
              if (event.form.btnGroupPosition == 'footer') {
                this.selectdParentNode.footer = true;
              }
            }

          }
        }
        break;
      case "linkButtonAttributes":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.title;
          if (this.selectdNode && this.selectdNode.buttonGroup && this.selectdNode.buttonGroup[0] && this.selectdNode.buttonGroup[0].btnConfig) {
            this.selectdNode.buttonGroup[0].btnConfig[0].key = event.form.key;
            this.selectdNode.buttonGroup[0].btnConfig[0].title = event.form.title;
            this.selectdNode.buttonGroup[0].btnConfig[0].color = event.form.color;
            this.selectdNode.buttonGroup[0].btnConfig[0].btnIcon = event.form.btnIcon;
            this.selectdNode.buttonGroup[0].btnConfig[0].className = event.form.className;
            this.selectdNode.buttonGroup[0].btnConfig[0].href = event.form.href;
            this.selectdNode.buttonGroup[0].btnConfig[0].format = event.form.format;
            this.selectdNode.buttonGroup[0].btnConfig[0].target = event.form.target;
            this.selectdNode.buttonGroup[0].btnConfig[0].btnType = event.form.target;
            this.selectdNode.buttonGroup[0].btnGroupFormat = event.form.format;
            this.selectdNode.buttonGroup[0].btnConfig[0].tooltip = event.form.tooltip;
            this.selectdNode.buttonGroup[0].btnConfig[0].hideExpression = event.form.hideExpression;
            if (event.form.target == "sm" || event.form.target == "lg" || event.form.target == "xl" || event.form.target == "fullscreen") {
              this.selectdNode.buttonGroup[0].btnConfig[0].btnType = "modal";
            }
          }

        }
        break;
      case "dropdownButtonAttributes":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.title;
          if (this.selectdNode && this.selectdNode.buttonGroup && this.selectdNode.buttonGroup[0] && this.selectdNode.buttonGroup[0].btnConfig) {
            this.selectdNode.buttonGroup[0].btnConfig[0].hideExpression = event.form.hideExpression;
            this.selectdNode.buttonGroup[0].btnConfig[0].title = event.form.title;
            this.selectdNode.buttonGroup[0].btnConfig[0].tooltip = event.form.tooltip;
            this.selectdNode.buttonGroup[0].btnConfig[0].color = event.form.color;
            this.selectdNode.buttonGroup[0].btnConfig[0].btnIcon = event.form.btnIcon;
            this.selectdNode.buttonGroup[0].btnConfig[0].className = event.form.className;
            this.selectdNode.buttonGroup[0].btnGroupFormat = event.form.btnGroupFormat;
            this.selectdNode.buttonGroup[0].btnConfig[0].dropdownOptions = event.form.options;
          }
        }
        break;
      case "accordionButtonAttribute":
        if (this.selectdNode) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          if (this.selectdNode && this.selectdNode.accordionConfig) {
            this.selectdNode.accordionConfig[0].label = event.form.label;
            this.selectdNode.accordionConfig[0].color = event.form.color;
            this.selectdNode.accordionConfig[0].tooltip = event.form.tooltip;
          }
        }
        break;
      //Card Case
      case "cardAttributes":
        this.selectdNode.hideExpression = event.form.hideExpression;
        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.label = event.form.name;
          this.selectdNode.className = event.form.className;
          // this.selectdNode.chartCardConfig[0].className = event.form.className;
          this.selectdNode.chartCardConfig[0].icon = event.form.icon;
          this.selectdNode.chartCardConfig[0].name = event.form.name;
          this.selectdNode.chartCardConfig[0].total = event.form.total;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
        }
        break;
      case "fixedDivAttribute":
        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.label = event.form.label;
        }
        break;

      case "chartAttributes":

        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.hideExpression = event.form.hideExpression;
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
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].section[0].filterData[0].heading = event.form.label;
          this.selectdNode.chartCardConfig[0].section[0].filterData[0].subheading = event.form.sub_label;
          // this.selectdNode.chartCardConfig[0].section[0].filterData[0].refundsChart.series[0].data = event.form.options;
          this.selectdNode.chartCardConfig[0].section[0].filterData[0].price = event.form.options[0].price;
          this.selectdNode.chartCardConfig[0].section[0].filterData[0].refundsChart.colors = event.form.options[0].colors;
          this.selectdNode.chartCardConfig[0].section[0].filterData[0].refundsChart.series[0].data = seriesList;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          if (event.form.link) {
            this.builderService.salesDataApi().subscribe((res => {
              // this.selectdNode.chartCardConfig[0].chartFilterData = res;
              if (this.selectdNode.section) {
                this.selectdNode.section[0].price = res[0]?.price;
                this.selectdNode.section[0].filterData[0].price = res[0]?.price;
                this.selectdNode.section[0].colors = res[0]?.colors;
                this.selectdNode.section[0].data = res[0]?.data;
                this.selectdNode.section[0].filtertype = res[0]?.filter;
                this.selectdNode.section[0].filterData[0].refundsChart.series[0].data = res[0]?.data;
                this.selectdNode.section[0].filterData[0].refundsChart.colors = res[0]?.colors;
              }

              this.updateNodes()
            }));
            event.form.link = "";
          }
        }
        break;

      case "donutChartAttributes":
        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].label = event.form.label;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          this.selectdNode.chartCardConfig[0].section[0].series = [];
          this.selectdNode.chartCardConfig[0].section[0].labels = [];
          this.selectdNode.chartCardConfig[0].section[0].colors = [];
          for (let k = 0; k < event.form.options.length; k++) {
            this.selectdNode.chartCardConfig[0].section[0].series.push(event.form.options[k].series);
            this.selectdNode.chartCardConfig[0].section[0].labels.push(event.form.options[k].label);
            this.selectdNode.chartCardConfig[0].section[0].colors.push(event.form.options[k].color);
          }
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectdNode.section[0].series[index] = res.series[0];
                    this.selectdNode.section[0].labels[index] = res.labels[0];
                    this.selectdNode.section[0].colors[index] = res.colors[0];
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectdNode.chartCardConfig[0].link != undefined) {
            this.builderService.visitordonutChart().subscribe((res => {
              this.selectdNode.section = res;
              this.updateNodes();
            }));
          }
        }
        break;

      case "donutSaleChartAttributes":
        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.chartCardConfig[0].label = event.form.label;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          this.selectdNode.chartCardConfig[0].thisTitle = event.form.thisTitle;
          this.selectdNode.chartCardConfig[0].lastTitle = event.form.lastTitle;
          this.selectdNode.chartCardConfig[0].prevTitle = event.form.prevTitle;
          this.selectdNode.chartCardConfig[0].section[0].series = [];
          this.selectdNode.chartCardConfig[0].section[0].labels = [];
          this.selectdNode.chartCardConfig[0].section[0].colors = [];
          for (let k = 0; k < event.form.options.length; k++) {
            this.selectdNode.chartCardConfig[0].section[0].series.push(event.form.options[k].series);
            this.selectdNode.chartCardConfig[0].section[0].labels.push(event.form.options[k].label);
            this.selectdNode.chartCardConfig[0].section[0].colors.push(event.form.options[k].color);
          }
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                if (event.form.options[index].api != undefined) {
                  // this.selectdNode.saledDonutChart[index].labels = res.labels;
                  // this.selectdNode.saledDonutChart[index].series = res.series;
                  // this.selectdNode.saledDonutChart[index].colors = res.colors;
                  this.selectdNode.thisValue = res.thisValue;
                  this.selectdNode.lastValue = res.lastValue;
                  this.selectdNode.prevValue = res.prevValue;
                  this.selectdNode.growth = res.growth;
                  this.updateNodes();
                }
              }))
            }
          }
          if (this.selectdNode.chartCardConfig[0].link != undefined) {
            this.builderService.genericApis("donutChart").subscribe((res => {
              this.selectdNode.section = res;
              this.updateNodes()
            }));
          }
        }
        break;

      case "browserChartAttributes":

        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.chartCardConfig[0].label = event.form.label;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          this.selectdNode.chartCardConfig[0].icon = event.form.icon;
          this.selectdNode.chartCardConfig[0].limit = event.form.limit;
          this.selectdNode.chartCardConfig[0].defaultColor = event.form.defaultColor;
          this.selectdNode.chartCardConfig[0].belowpercentage = event.form.belowpercentage;
          this.selectdNode.chartCardConfig[0].belowpercentageColor = event.form.below_percentage_color;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectdNode.chart[index].percentage = res.min;
                    this.selectdNode.chart[index].min = res.min;
                    this.selectdNode.chart[index].bar = res.min + "%";
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectdNode.chartCardConfig[0].link != undefined) {
            this.builderService.genericApis("browserdata").subscribe((res => {
              this.selectdNode.chart = res;
              this.updateNodes();
            }))
          }
        }
        break;

      case "browserCombineChartAttributes":

        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].label = event.form.label;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          this.selectdNode.chartCardConfig[0].icon = event.form.icon;
          this.selectdNode.chartCardConfig[0].limit = event.form.limit;
          this.selectdNode.chartCardConfig[0].defaultColor = event.form.defaultColor;
          this.selectdNode.chartCardConfig[0].belowpercentage = event.form.belowpercentage;
          this.selectdNode.chartCardConfig[0].numberofcolumns = event.form.numberofcolumns;
          this.selectdNode.chartCardConfig[0].belowpercentageColor = event.form.below_percentage_color;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {

                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectdNode.chart[index].percentage = res.min;
                    this.selectdNode.chart[index].min = res.min;
                    this.selectdNode.chart[index].bar = res.min + "%";
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectdNode.chartCardConfig[0].link != undefined) {
            this.builderService.genericApis("browserdata").subscribe((res => {
              this.selectdNode.chart = res;
              this.updateNodes();
            }))
          }
        }
        break;

      case "salesAnalyticsChartAttributes":
        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].label = event.form.label;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          this.selectdNode.chartCardConfig[0].section[0].series = event.form.options;
          for (let index = 0; index < this.selectdNode.chartCardConfig[0].section[0].series.length; index++) {
            if (this.selectdNode.chartCardConfig[0].section[0].series[index].type != event.form.options[index].type) {
              this.selectdNode.chartCardConfig[0].section[0].series[index].type = event.form.options[index]?.type;
            }
          }
          for (let i = 0; i < this.selectdNode.chartCardConfig[0].section[0].chartTitlesValues.length; i++) {
            this.selectdNode.chartCardConfig[0].section[0].chartTitlesValues[i].value = event.form.options[i].value;
            this.selectdNode.chartCardConfig[0].section[0].series[i].title = event.form.options[i].name1;
          }
          this.selectdNode.chartCardConfig[0].section[0].series = event.form.options;
          if (this.selectdNode.chartCardConfig[0].link != undefined) {
            this.builderService.genericApis("analyticsChart").subscribe((res => {
              this.selectdNode.section[0].chart = res.chart;
              this.selectdNode.section[0].stroke = res.stroke;
              this.selectdNode.section[0].plotOptions = res.plotOptions;
              this.selectdNode.section[0].colors = res.colors;
              for (let j = 0; j < res.series.length; j++) {
                this.selectdNode.section[0].series[j].name = res.series[j].name;
                this.selectdNode.section[0].series[j].title = res.series[j].name;
                this.selectdNode.section[0].series[j].data = res.series[j].data;
              }
              this.selectdNode.section[0].fill = res.fill;
              this.selectdNode.section[0].labels = res.labels;
              this.selectdNode.section[0].markers = res.markers;
              this.selectdNode.section[0].xaxis = res.xaxis;
              this.selectdNode.section[0].yaxis = res.yaxis;
              this.selectdNode.section[0].tooltip = res.tooltip;
              this.selectdNode.section[0].grid = res.grid;
              this.updateNodes();
            }))
          }
        }
        break;

      case "widgetSectionChartAttributes":

        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].limit = event.form.limit;
          this.selectdNode.chartCardConfig[0].belowpercentage = event.form.percentage;
          this.selectdNode.chartCardConfig[0].belowpercentageColor = event.form.below_percentage_color;
          // for (let i = 0; i < event.form.options.length; i++) {
          //   this.selectdNode.chartCardConfig[0].section[i].name = event.form.options[i].name
          //   this.selectdNode.chartCardConfig[0].section[i].total = event.form.options[i].total
          //   this.selectdNode.chartCardConfig[0].section[i].percentage = event.form.options[i].percentage
          //   var data : any = [];
          //   data.push(event.form.options[i].data)
          //   this.selectdNode.chartCardConfig[0].section[i].data = data
          // };
          // this.selectdNode.chartCardConfig[0].section = event.form.options;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                this.selectdNode.section = '';
                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectdNode.section[index].total = res.total;
                    this.selectdNode.section[index].percentage = res.percentage;
                    this.selectdNode.section[index].data = res.Chart.series[0].data;
                    this.selectdNode.section[index].Chart = res.Chart;
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectdNode.link != undefined) {
            this.builderService.genericApis("widgetChart").subscribe((res => {
              this.selectdNode.section = res;
              for (let index = 0; index < res.length; index++) {
                this.selectdNode.section[index].data = res[index].Chart.series[0].data;
              }
              this.updateNodes();
            }))
            event.form.link = "";
          }
        }
        break;

      case "SectionChartAttributes":
        if (this.selectdNode.chartCardConfig) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.chartCardConfig[0].limit = event.form.limit;
          this.selectdNode.chartCardConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.chartCardConfig[0].key = event.form.key;
          this.selectdNode.chartCardConfig[0].belowpercentage = event.form.percentage;
          this.selectdNode.chartCardConfig[0].section.icon = event.form.options;
          this.selectdNode.chartCardConfig[0].section.name = event.form.options;
          this.selectdNode.chartCardConfig[0].section.percentage = event.form.options;
          this.selectdNode.chartCardConfig[0].section.total = event.form.options;
          this.selectdNode.chartCardConfig[0].belowpercentageColor = event.form.below_percentage_color;
          this.selectdNode.chartCardConfig[0].link = event.form.link;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectdNode.section[index].total = res.total;
                    this.selectdNode.section[index].percentage = res.percentage;
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectdNode.chartCardConfig[0].link != undefined) {
            this.builderService.genericApis( "widgetSecondCard").subscribe((res => {
              this.selectdNode.section = res;
              this.updateNodes();
            }))
            event.form.link = "";
          }
        }
        break;

      case "headingAttributes":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.className = event.form.className;
          this.selectdNode.padding = event.form.padding;
          // this.selectdNode.paddingLeft = event.form.paddingLeft;
          // this.selectdNode.paddingRight = event.form.paddingRight;
          // this.selectdNode.paddingTop = event.form.paddingTop;
          // this.selectdNode.paddingBottom = event.form.paddingBottom;
          this.selectdNode.data.level = event.form.level;
          this.selectdNode.data.text = event.form.text;
          this.selectdNode.style = event.form.style;
          this.selectdNode.fontSize = event.form.style + event.form.textAlignment + 'color:' + event.form.headingColor;
          this.selectdNode.textAlign = event.form.textAlignment;
          this.selectdNode.headingColor = event.form.headingColor;
          if (event.form.headingApi) {
            this.builderService.genericApis(event.form.headingApi).subscribe((res => {
              this.selectdNode.data = res.data;
              this.updateNodes();
            }))
          }
          this.updateNodes();
        }
        break;

      case "paragraphAttributes":
        if (this.selectdNode) {
          this.selectdNode.label = event.form.label;
          // this.selectdNode.paddingLeft = event.form.paddingLeft;
          // this.selectdNode.paddingRight = event.form.paddingRight;
          // this.selectdNode.paddingTop = event.form.paddingTop;
          // this.selectdNode.paddingBottom = event.form.paddingBottom;
          this.selectdNode.padding = event.form.padding;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.className = event.form.className;
          this.selectdNode.data.text = event.form.text;
          this.selectdNode.style = event.form.style;
          this.selectdNode.fontSize = event.form.style + event.form.textAlignment + "color:" + event.form.color;
          this.selectdNode.textAlign = event.form.textAlignment;
          this.selectdNode.color = event.form.color;
          if (event.form.api) {
            this.builderService.genericApis(event.form.api).subscribe((res => {
              // this.selectdNode.data.text = this.fillTemplate(this.selectdNode.data.text, res)//this.selectdNode.chartCardConfig[0].data.text;
              // let response = JSON.stringify(res);
              // let arrayData = response.split(',');
              // this.selectdNode.headingConfig[0].data.text = res;
              // var seriesList = [];
              // var arrayData = res[0].split(" ");
              // for (let index = 0; index < arrayData.length; index++) {
              //   let columnValue = arrayData[index].toString();
              //   let assignValue = columnValue.split(':');
              //   for (let j = 0; j < assignValue.length; j++) {
              //     assignValue[0] = assignValue[0].replace('{', '');
              //     assignValue[1] = assignValue[1].replace('{', '');
              //     assignValue[0] = assignValue[0].replace('}', '');
              //     assignValue[1] = assignValue[1].replace('}', '');
              //     let parseValue = JSON.parse(assignValue[0]);
              //     let parseData = JSON.parse(assignValue[1]);
              //     this.selectdNode.chartCardConfig[0].data.text = JSON.stringify(this.selectdNode.chartCardConfig[0].data.text).replace(parseValue, parseData);
              //     this.selectdNode.chartCardConfig[0].data.text = this.selectdNode.chartCardConfig[0].data.text.replace('"\\\"', '');
              //     this.selectdNode.chartCardConfig[0].data.text = this.selectdNode.chartCardConfig[0].data.text.replace('\\\"', '');
              //   }
              // }
              this.updateNodes()
            }));
          }

        }
        break;

      case "stepperAttributes":
        if (this.selectdNode.id) {
          // this.selectdNode.id = event.form.stepperText;
          this.selectdNode.label = event.form.stepperLabel;
          this.selectdNode.className = event.form.className;
          if(this.selectdNode && this.selectdNode.formly && this.selectdNode.formly[0].fieldGroup && this.selectdNode.formly[0].fieldGroup[0].templateOptions){
            this.selectdNode.formly[0].fieldGroup[0].templateOptions.label = event.form.stepperLabel;
            this.selectdNode.formly[0].fieldGroup[0].templateOptions['tooltip'] = event.form.tooltip;
          }

          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.icon = event.form.stepperIcon;
          this.updateNodes()
        }
        break;

      case "mainStepperAttributes":
        if (this.selectdNode.id) {
          // this.selectdNode.id = event.form.stepperText;
          this.selectdNode.label = event.form.stepperLabel;
          this.selectdNode.className = event.form.className;
          // if(this.selectdNode && this.selectdNode.formly && this.selectdNode.formly[0].fieldGroup && this.selectdNode.formly[0].fieldGroup[0].templateOptions){
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.label = event.form.stepperLabel;
          //   this.selectdNode.formly[0].[stepperFormat] = event.form.stepperFormat;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.nextButtonText = event.form.nextButtonText;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.nextButtonIcon = event.form.nextButtonIcon;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.nextButtonColor = event.form.nextButtonColor;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.backButtonColor = event.form.backButtonColor;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.backButtonIcon = event.form.backButtonIcon;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.backButtonText = event.form.backButtonText;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.submitButtonColor = event.form.submitButtonColor;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.submitButtonIcon = event.form.submitButtonIcon;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.submitButtonText = event.form.submitButtonText;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.selectColor = event.form.selectColor;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.defaultColor = event.form.defaultColor;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.className = event.form.className;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.icon = event.form.icon;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.nodes = event.form.nodes;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.tooltip = event.form.tooltip;
          //   this.selectdNode.formly[0].fieldGroup[0].templateOptions.hideExpression = event.form.hideExpression;
          // }

          // for (let index = 0; index < this.selectdNode.children.length; index++) {
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].stepperFormat = event.form.stepperFormat);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.nextButtonText = event.form.nextButtonText);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.nextButtonIcon = event.form.nextButtonIcon + " mr-1");
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.nextButtonColor = event.form.nextButtonColor + " mt-2");
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.backButtonColor = event.form.backButtonColor + " mt-2");
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.backButtonIcon = event.form.backButtonIcon + " mr-1");
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.backButtonText = event.form.backButtonText);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.submitButtonColor = event.form.submitButtonColor + " mt-2");
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.submitButtonIcon = event.form.submitButtonIcon + " mr-1");
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.submitButtonText = event.form.submitButtonText);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.selectColor = "--selectColor:" + event.form.selectColor);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.defaultColor = "--defaultColor:" + event.form.defaultColor);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.icon = event.form.icon);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.className = event.form.className);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.tooltip = event.form.tooltip);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.hideExpression = event.form.hideExpression);
          //   this.selectdNode.children[index].className = event.form.className;
          // }
          // this.adddynamicStepper(event.form.nodes);
        }
        break;

      case "tabAttributes":
        if (this.selectdNode.id) {
          // this.selectdNode.id = event.form.stepperText;
          this.selectdNode.label = event.form.stepperLabel;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].props.label = event.form.stepperLabel;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].props.stepperFormat = event.form.stepperFormat;
        }
        break;
      case "maintabAttributes":
        if (this.selectdNode.id) {
          // this.selectdNode.id = event.form.stepperText;
          this.selectdNode.label = event.form.stepperLabel;
          this.selectdNode.className = event.form.className;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.label = event.form.stepperLabel;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.stepperFormat = event.form.stepperFormat;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.buttonText = event.form.buttonText;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.buttonIcon = event.form.buttonIcon;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.buttonColor = event.form.buttonColor;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.tabsPosition = event.form.tabsPosition;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.selectTabColor = event.form.selectTabColor;
          // this.selectdNode.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.tabsDisplayType = event.form.tabsDisplayType;
          // for (let index = 0; index < this.selectdNode.children.length; index++) {
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.buttonText = event.form.buttonText);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.buttonIcon = event.form.buttonIcon + " mr-1");
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.buttonColor = event.form.buttonColor + " mt-2");
          //   if (event.form.tabsDisplayType == "buttonType") {
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.selectTabColor = "--selectTabColor:" + event.form.selectTabColor);
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.borderRadius = "--borderRadius:0.25rem");
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.color = "--color:azure");
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.fontsize = "--fontsize:large");
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.tabsDisplayType = "--tabsDisplayType:none");
          //   } else if (event.form.tabsDisplayType == "None" || event.form.tabsDisplayType == "underLine") {
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.selectTabColor = "--selectTabColor:none");
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.underLineColor = "--underLineColor:" + event.form.selectTabColor);
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.borderRadius = "--borderRadius:none");
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.color = "--color:none");
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.fontsize = "--fontsize:none");
          //     this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.tabsDisplayType = "--tabsDisplayType: " + event.form.tabsDisplayType);
          //   }
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].type = event.form.stepperFormat);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.className = event.form.className);
          //   this.selectdNode.children[index].chartCardConfig.forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.tabsPosition = event.form.tabsPosition);
          //   this.selectdNode.children[index].className = event.form.className;
          //   this.selectdNode.children[index].type = event.form.stepperFormat;
          // }
          // this.adddynamictab(event.form.nodes);
        }
        break;
      // For Section Page Changes
      case "pageAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.screenVariables = event.form.variables;
        }
        break;

      case "pageHeaderAttributes":

        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.headingSize = event.form.headingSize;
          this.selectdNode.header = event.form.header;
          this.selectdNode.labelPosition = event.form.labelPosition;
          this.selectdNode.alertPosition = event.form.alertPosition;
        }
        break;

      case "pageBodyAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
        }
        break;

      case "pageFooterAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.footer = event.form.footer;
        }
        break;
      case "accordingAttributes":
        if (this.selectdNode.id) {

          // this.selectdNode.id = event.form.accordingText;
          this.selectdNode.label = event.form.accordingText;
          this.selectdNode.className = event.form.className;
          this.selectdNode.sectionDisabled = event.form.disabled;
          this.selectdNode.labelPosition = event.form.labelPosition;
          this.selectdNode.repeatable = event.form.repeatable;
          this.selectdNode?.children?.[1]?.children?.forEach(res => {
            if (res.chartCardConfig) {
              if (res.chartCardConfig[0].formly != undefined) {
                if (res.type != "stepperMain" && res.type != "tabsMain") {
                  res['wrapper'] = event.form.wrappers;
                  res['dataOnly'] = event.form.disabled;
                  // if (event.form.className) {
                  //   res.className = event.form.className;
                  // }
                  res.chartCardConfig[0].formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, res.chartCardConfig[0].formly[0].fieldGroup);
                }
                if (res.type == "tabsMain") {

                  if (event.form.className) {
                    res.className = event.form.className;
                  }
                  res.children?.forEach((element: any) => {
                    element.children.forEach((elementV1: any) => {
                      elementV1['wrapper'] = event.form.wrappers;
                      elementV1.chartCardConfig[0].formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.chartCardConfig[0].formly[0].fieldGroup);
                    });
                  });
                }
                if (res.type == "stepperMain") {
                  if (event.form.className) {
                    res.className = event.form.className;
                  }
                  res.children?.forEach((element: any) => {
                    element.children.forEach((elementV1: any) => {
                      elementV1['wrapper'] = event.form.wrappers;
                      elementV1.chartCardConfig[0].formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.chartCardConfig[0].formly[0].fieldGroup);
                    });
                  });
                }
              }
              if (res.type == "mainDashonicTabs") {
                res.children?.forEach((element: any) => {
                  element.children.forEach((elementV1: any) => {
                    elementV1['wrapper'] = event.form.wrappers;
                    elementV1.chartCardConfig[0].formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.chartCardConfig[0].formly[0].fieldGroup);
                  });
                });
              }
              if (res.type == "accordionButton") {
                res?.children?.forEach((elementV1: any) => {
                  elementV1['wrapper'] = event.form.wrappers;
                  elementV1.chartCardConfig[0].formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.chartCardConfig[0].formly[0].fieldGroup);
                });
              }
              // if (event.form.className) {
              //   res.className = event.form.className;
              // }
            }
          })
        }
        break;
      case "accordingHeaderAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.headingSize = event.form.headingSize;
          this.selectdNode.backGroundColor = event.form.backGroundColor;
          this.selectdNode.textColor = event.form.textColor;
          this.selectdNode.header = event.form.header;
          this.selectdNode.isExpanded = event.form.isExpanded;
          this.selectdNode.labelPosition = event.form.labelPosition;
          this.updateNodes();
        }
        break;

      case "accordingBodyAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
        }
        break;

      case "accordingFooterAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.label;
          this.selectdNode.footer = event.form.footer;
        }
        break;
      case "switchAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.switchType = event.form.switchType;
          this.selectdNode.switchPosition = event.form.switchPosition;
          this.selectdNode.tooltip = event.form.tooltip;
        }
        break;
      case "multiFileUploadAttribute":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.uploadBtnLabel = event.form.label;
        }
        break;
      case "textEditorAttribute":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
        }
        break;

      case "dashonicTabAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.label = event.form.tabLabel;
          this.selectdNode.className = event.form.className;
          this.selectdNode.dashonicTabsConfig[0].tabLabel = event.form.tabLabel;
          this.selectdNode.dashonicTabsConfig[0].tabIcon = event.form.tabIcon;
          this.selectdNode.dashonicTabsConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.dashonicTabsConfig[0].hideExpression = event.form.hideExpression;
          this.updateNodes();
        }
        break;
      case "kanbanAttribute":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.text = event.form.label;
          this.selectdNode.nodes = event.form.nodes;
          // this.adddynamicKanban(event.form.nodes);
          this.updateNodes();
        }
        break;
      case "kanbanTaskAttribute":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.hideExpression = event.form.hideExpression,
            this.selectdNode.label = event.form.label;
            if(this.selectdNode.children){
              for (let i = 0; i < this.selectdNode.children.length; i++) {
                this.selectdNode.children[i].id = event.form.options[i].id;
                this.selectdNode.children[i].title = event.form.options[i].title;
                this.selectdNode.children[i].date = event.form.options[i].date;
                this.selectdNode.children[i].content = event.form.options[i].content;
                this.selectdNode.children[i].users = JSON.parse(event.form.options[i].users);
                this.selectdNode.children[i].status = event.form.options[i].status;
                this.selectdNode.children[i].variant = event.form.options[i].variant;
              }
            }

          if (event.form.kanbanTaskApi != undefined) {
            this.builderService.genericApis(event.form.kanbanTaskApi).subscribe((res => {
              this.selectdNode.chartCardConfig = res;
              for (let index = 0; index < res.length; index++) {
                this.selectdNode.id = res[index].id;
                this.selectdNode.title = res[index].title;
                this.selectdNode.date = res[index].date;
                this.selectdNode.users = res[index].users;
                this.selectdNode.status = res[index].status;
                this.selectdNode.variant = res[index].variant;
                this.selectdNode.content = res[index].content;
              }
              this.updateNodes();
            }))
          }
          this.updateNodes();
        }
        break;

      case "dashonicMainTabAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.label = event.form.tabLabel;
          this.selectdNode.className = event.form.className;
          this.selectdNode.mainDashonicTabsConfig[0].tabsDisplayType = event.form.tabsDisplayType;
          this.selectdNode.mainDashonicTabsConfig[0].selectTabColor = event.form.selectTabColor;
          this.selectdNode.mainDashonicTabsConfig[0].buttonText = event.form.buttonText;
          this.selectdNode.mainDashonicTabsConfig[0].buttonIcon = event.form.buttonIcon;
          this.selectdNode.mainDashonicTabsConfig[0].buttonColor = event.form.buttonColor;
          this.selectdNode.mainDashonicTabsConfig[0].tabFormat = event.form.tabFormat;
          this.selectdNode.mainDashonicTabsConfig[0].tabsPosition = event.form.tabsPosition;
          this.selectdNode.mainDashonicTabsConfig[0].nodes = event.form.nodes;
          if(this.selectdNode.children){
            for (let index = 0; index < this.selectdNode.children.length; index++) {
              this.selectdNode.children.forEach(elementV1 => {
                elementV1.dashonicTabsConfig[0].tabsPosition = event.form.tabsPosition,
                  elementV1.dashonicTabsConfig[0].buttonText = event.form.buttonText,
                  elementV1.dashonicTabsConfig[0].buttonIcon = event.form.buttonIcon + " mr-1",
                  elementV1.dashonicTabsConfig[0].buttonColor = event.form.buttonColor + " mt-2",
                  elementV1.dashonicTabsConfig[0].tabFormat = event.form.tabFormat
              });

              if (event.form.tabsDisplayType == "buttonType") {
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].selectTabColor = "--selectTabColor:" + event.form.selectTabColor);
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].underLineColor = "--underLineColor:none");
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].color = "--color:#fff");
              } else if (event.form.tabsDisplayType == "None") {
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].selectTabColor = "--selectTabColor:none");
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].underLineColor = "--underLineColor:none");
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].color = "--color:none");
              } else if (event.form.tabsDisplayType == "underLine") {
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].underLineColor = "--underLineColor:1px solid " + event.form.selectTabColor);
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].selectTabColor = "--selectTabColor:none");
                this.selectdNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].color = "--color:none");
              }
            }
          }

          // this.adddynamicDashonictab(event.form.nodes);
          this.updateNodes();
        }
        break;
      case "progressBarAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.link = event.form.link;
          this.selectdNode.progressBArConfig[0].title = event.form.label;
          this.selectdNode.progressBArConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.progressBArConfig[0].value = event.form.value;
          this.selectdNode.progressBArConfig[0].color = event.form.color;
          this.selectdNode.progressBArConfig[0].showValue = event.form.showValue;
          this.selectdNode.progressBArConfig[0].stripped = event.form.stripped;
          this.selectdNode.progressBArConfig[0].height = event.form.height;
          this.selectdNode.progressBArConfig[0].hieghtWithPx = event.form.height + "px";
          this.selectdNode.progressBArConfig[0].animated = event.form.animated;
          this.selectdNode.link = event.form.link;
          if (this.selectdNode.link != undefined) {
            this.selectdNode.link = event.form.link;
            this.builderService.genericApis(event.form.link).subscribe((res => {
              this.selectdNode.progressBArConfig[0].value = res.value;
              this.selectdNode.progressBArConfig[0].color = res.color;
              this.selectdNode.progressBArConfig[0].showValue = res.showValue;
              this.selectdNode.progressBArConfig[0].stripped = res.stripped;
              this.selectdNode.progressBArConfig[0].height = res.height;
              this.selectdNode.progressBArConfig[0].hieghtWithPx = res.height + "px";
              this.selectdNode.progressBArConfig[0].animated = res.animated;
              this.updateNodes()
            }));
            event.form.link = "";
          }
          this.updateNodes()
        }
        break;


      case "dividerAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip;
          if (event.form.label == '') {
            this.selectdNode.label = this.selectdNode.label;
          } else if (event.form.label != '') {
            this.selectdNode.label = event.form.label;
          }
          this.selectdNode.dividerClassName = event.form.className;
          this.selectdNode.classNameForPosition = event.form.classNameForPosition;
          this.selectdNode.dividerPosition = event.form.dividerPosition;
          this.selectdNode.text = event.form.label;
          this.selectdNode.textColor = event.form.textColor;
          this.selectdNode.lineColor = event.form.lineColor;
          this.selectdNode.textcolorForStyle = "color:" + event.form.textColor;
          this.selectdNode.lineColorForStyle = "--lineColor:" + event.form.lineColor;
          this.selectdNode.dividerFormat = event.form.dividerFormat;
          this.selectdNode.verticalLineHieght = event.form.verticalLineHieght;
          this.selectdNode.verticalLineHieghtForCssBinding = "--verticalLineHieghtForCssBinding:" + event.form.verticalLineHieght + "px";
          this.selectdNode.verticalLinePosition = event.form.verticalLinePosition;
          this.selectdNode.verticalLinePositionForCssBinding = "--verticalLinePositionForCssBinding:" + event.form.verticalLinePosition + "%";
          this.selectdNode.verticalLineColorForCssBinding = "--verticalLineColorForCssBinding:1px solid" + event.form.lineColor;
          this.updateNodes()
        }
        break;

      case "sharedMessagesChartAttributes":

        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.label = event.form.label;
          this.selectdNode.className = event.form.className;
          this.selectdNode.label = event.form.label;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.labelIcon = event.form.labelIcon;
          this.selectdNode.heading = event.form.heading;
          this.selectdNode.headingIcon = event.form.headingIcon;
          this.selectdNode.headingColor = event.form.headingColor;
          this.selectdNode.subHeading = event.form.subHeading;
          this.selectdNode.subHeadingIcon = event.form.subHeadingIcon;
          this.selectdNode.subheadingColor = event.form.subheadingColor;
          this.selectdNode.link = event.form.link;
          for (let index = 0; index < this.selectdNode.sharedMessagesConfig[0].length; index++) {
            this.selectdNode.sharedMessagesConfig[0].message = event.form.options.message;
            this.selectdNode.sharedMessagesConfig[0].dateAndTime = event.form.options.dateAndTime;
            this.selectdNode.sharedMessagesConfig[0].icon = event.form.options.icon;
            this.selectdNode.sharedMessagesConfig[0].icon1 = event.form.options.icon1;
          }
          if (event.form.api != undefined) {
            this.builderService.genericApis(event.form.api).subscribe((res => {
              this.selectdNode.sharedMessagesConfig = res;
              this.updateNodes();
            }))
          }
          this.updateNodes()
        }
        break;

      case "audioAttribute":
        if (this.selectdNode.id) {

          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.title = event.form.title;
          this.selectdNode.audioSrc = event.form.audioSrc;
          this.updateNodes()
        }
        break;
      case "carousalAttribute":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.carousalType = event.form.carousalType;
          // this.selectdNode.carousalConfig[0].captionTitle = event.form.captionTitle;
          // this.selectdNode.carousalConfig[0].caption = event.form.caption;
          // this.selectdNode.carousalConfig[0].img = event.form.imgSrc;
          this.selectdNode.carousalConfig = event.form.options;
          this.selectdNode.tooltip = event.form.tooltip;
          this.selectdNode.link = event.form.link;

          if (event.form.link != undefined || event.form.link != "") {
            this.builderService.genericApis(event.form.link).subscribe((res) => {

              this.selectdNode.carousalType = res[0].carousalType;
              this.selectdNode.carousalConfig = res[0].options;
              this.updateNodes();
            })
          }
        }
        break;
      case "videosAttribute":
        if (this.selectdNode.id) {

          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.videoConfig[0].title = event.form.title;
          this.selectdNode.videoConfig[0].videoRatio = event.form.videoRatio;
          this.selectdNode.videoConfig[0].videoSrc = event.form.videoSrc;
          this.selectdNode.videoConfig[0].tooltip = event.form.tooltip;
          this.updateNodes()
        }
        break;
      case "alertAttributes":

        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.alertConfig[0].icon = event.form.icon;
          this.selectdNode.alertConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.alertConfig[0].type = event.form.type;
          this.selectdNode.alertConfig[0].text = event.form.text;
          this.selectdNode.alertConfig[0].alertColor = event.form.alertColor;
          this.updateNodes()
        }
        break;
      case "timelineAttributes":

        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.tooltip = event.form.tooltip,
            this.selectdNode.className = event.form.className;
            this.selectdNode.timelineConfig[0].timelineHeading = event.form.timelineHeading;
            this.selectdNode.timelineConfig[0].headingColor = event.form.headingColor;
            this.selectdNode.timelineConfig[0].headingShape = event.form.headingShape;
            this.selectdNode.timelineConfig[0].timelineType = event.form.timelineType;
            this.selectdNode.timelineConfig[0].data = event.form.timelineData;

            for (let index = 0; index < event.form.timelineData.length; index++) {
              event.form.timelineData[index].image = event.form.timelineData[index].image.toString();
              this.selectdNode.timelineConfig[0].data[index].image = event.form.timelineData[index].image.split(",");
            }
            if (event.form.timelineExample != undefined) {
              this.selectdNode.timelineConfig[0].timelineExample = event.form.timelineExample;
              this.builderService.genericApis(event.form.timelineExample).subscribe((res) => {

                this.selectdNode.timelineConfig[0].data = res[0].data;
                this.updateNodes();
              })
          }
        }
        break;

      case "simpleCardWithHeaderBodyFooterAttributes":
        if (this.selectdNode.id) {
          this.selectdNode.id = event.form.id;
          this.selectdNode.hideExpression = event.form.hideExpression;
          this.selectdNode.className = event.form.className;
          this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].headerText = event.form.headerText;
          this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].tooltip = event.form.tooltip;
          this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].bodyText = event.form.bodyText;
          this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].footerText = event.form.footerText;
          this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].height = event.form.height;
          this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].link = event.form.link;
          this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].textAlign = event.form.textAlign;
          if (event.form.link != undefined || event.form.link != "") {
            this.builderService.genericApis(event.form.link).subscribe((res => {

              this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].headerText = res[0].headerText;
              this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].bodyText = res[0].bodyText;
              this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].footerText = res[0].footerText;
              this.selectdNode.simpleCardWithHeaderBodyFooterConfig[0].height = res[0].height;
              this.updateNodes();
            }))
          }
          this.updateNodes()
        }
        break;

      default:
        break;

    }
    this.showSuccess();
    this.updateNodes();
    // document.getElementById("mySidenav-right").style.width = "0";
    // this.formlyService.templateNode = JSON.parse(JSON.stringify(this.formlyService.nodes));
    // this.wrapperForCombineFeilds(this.formlyService.templateNode)

  }
  showSuccess() {
    this.toastr.success('Information update successfully!',{nzDuration:3000});
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
  diasabledAndlabelPosition(formValues: any, fieldGroup: any) {

    if (fieldGroup) {
      if (fieldGroup[0].templateOptions) {
        if (fieldGroup[0].templateOptions.labelPosition == undefined && fieldGroup[0].templateOptions.labelPosition == '') {
          fieldGroup[0].templateOptions["labelPosition"];
        }
        if (formValues.disabled == "editable") {
          fieldGroup[0].templateOptions.disabled = false;
        }
        else if (formValues.disabled == "disabled") {
          fieldGroup[0].templateOptions.disabled = true;
        }
        else if (formValues.disabled == "disabled-But-ditable") {
          fieldGroup[0].templateOptions.disabled = true;
        }
        if (formValues.labelPosition == "text-right") {
          fieldGroup[0].templateOptions.labelPosition = "text-right";
        }
        else if (formValues.labelPosition == "text-center") {
          fieldGroup[0].templateOptions.labelPosition = "text-center";
        }
        else if (formValues.labelPosition == "text-left") {
          fieldGroup[0].templateOptions.labelPosition = "text-left";
        }
        if (formValues.wrappers) {
          fieldGroup[0].wrappers[0] = [formValues.wrappers][0];
        }
        if (formValues.className) {
          fieldGroup[0].templateOptions.className = formValues.className;
          fieldGroup[0].className = formValues.className;
        }
      }
    }
    return fieldGroup;
  }

  functionName: any;
  mainTemplate() {
    this.builderService.genericApis(this.functionName).subscribe((res => {
      if(this.selectdNode.children)
      this.selectdNode.children.push(res)
      // this.updateNodes();
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
