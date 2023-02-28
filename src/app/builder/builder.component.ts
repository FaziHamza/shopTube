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
import { BuilderClickButtonService } from './service/builderClickButton.service';

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
  selectedNode: TreeNode;
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
    private toastr: NzMessageService,
    private clickButtonService: BuilderClickButtonService) {
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
          element1.children[0].highLight = false;
        }
        else if (element1.type != "buttonGroup") {
          element1 = this.applyHighLight(false, element1);
        }
        element1.children.forEach((element2: any) => {
          element2 = this.applyHighLight(false, element2);
          element2.children.forEach((element3: any) => {
            if (element3) {
              if (element3.length > 0) {
                if (element3) {
                  if (element3.formly != undefined) {
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
                  element3.children[0].highLight = false;
                }
                else if (element3.type != "buttonGroup" && element3 == undefined) {
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
        if (res[0].menuData[0].children[1]) {
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
      this.selectForDropdown = this.selectedNode;
    }
    let node = this.selectedNode;
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
                  tooltip: "",
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
        title: 'buttonGroup',
        type: "buttonGroup",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        className: "w-1/4",
        position: "text-center",
        key: "buttongroup_" + Guid.newGuid(),
        btnGroupPosition: "header-button",
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
        tooltip: "",
        title: 'insert_1',
        type: "button",
        actionType: "insert",
        highLight: false,
        isNextChild: false,
        className: "w-1/4",
        btnConfig: [
          {
            color: "btn btn-success",
            type: "insert",
            btnIcon: "uil uil-user",
            // format: "text-left",
            btnDisables: false,
            disabled: this.getLastNodeWrapper("disabled"),
          },
        ],
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
        className: "w-1/4",
        btnConfig: [
          {
            color: "btn btn-success",
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
        className: "w-1/4",
        btnConfig: [
          {
            color: "btn btn-primary",
            btnIcon: "uil uil-user",
            type: "update",
            // format: "text-left",
            btnDisables: false,
            disabled: this.getLastNodeWrapper("disabled"),
          },
        ],
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
        className: "w-1/4",
        btnConfig: [
          {
            color: "btn btn-danger",
            btnIcon: "uil uil-user",
            type: "delete",
            // format: "text-left",
            btnDisables: false,
            disabled: this.getLastNodeWrapper("disabled"),
          },
        ],
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
        className: "w-1/2",
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
        className: "w-1/2",
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
        title: 'carouselCrossfade_1',
        type: "carouselCrossfade",
        highLight: false,
        isNextChild: false,
        className: "w-1/2",
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
        title: 'simpleCard_1',
        type: "simpleCardWithHeaderBodyFooter",
        hideExpression: false,
        className: "w-1/2",
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
        title: 'SubTab_1',
        type: "dashonicTabs",
        className: "w-full",
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
        title: 'MainTab_1',
        type: "mainDashonicTabs",
        isNextChild: true,
        highLight: false,
        className: "w-full",
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
        id: "common_" + Guid.newGuid(),
        title: "Heading" + '_1',
        type: "header",
        className: "w-full",
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
        title: "Paragraph" + '_1',
        type: "paragraph",
        className: "w-full",
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
        id: "common_" + Guid.newGuid(),
        title: "Multi File Upload" + '_1',
        type: "multiFileUpload",
        className: "w-1/2",
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
        title: 'Grid List' + '_1',
        type: 'gridList',
        link: '',
        key: "simpleGridList_" + Guid.newGuid(),
        highLight: false,
        isNextChild: false,
        hideExpression: false,
        forCommomComponentCondition: 'simpleGridList',
        className: "w-full",
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
    else if (value == 'gridListEditDelete') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'Grid List' + '_1',
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
        id: 'common_' + Guid.newGuid(),
        title: 'timeline_1',
        type: "timeline",
        tooltip: "",
        className: "w-full",
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
        title: 'accordionButton_1',
        type: "accordionButton",
        highLight: false,
        isNextChild: true,
        className: "w-full",
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
        title: 'Divider_1',
        type: "divider",
        highLight: false,
        isNextChild: true,
        hideExpression: false,
        tooltip: "",
        text: "Divider",
        key: "divider" + Guid.newGuid(),
        dividerClassName: "w-1/2",
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
    else if (value == 'starrate') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        title: 'starrate_1',
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
        className: "w-1/2",
        title: 'Statistic',
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
        className: "w-1/2",
        title: 'Back Top',
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
        className: "w-1/2",
        title: 'Anchor',
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
        className: "w-1/2",
        title: 'Modal',
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
        className: "w-1/2",
        title: 'Pop Confirm',
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
        children: [
        ],
      } as TreeNode;
      this.addNode(node, newNode);
    }
    else if (value == 'badge') {
      const newNode = {
        id: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Badge',
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
        title: 'Description',
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: true,
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
        className: "w-1/2",
        title: 'Segmented',
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
        id: 'common_' + Guid.newGuid(),
        className: "w-1/2",
        title: 'Tag',
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
        className: "w-1/2",
        title: 'Spin',
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
        className: "w-1/2",
        title: 'transfer',
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
        className: "w-1/2",
        title: 'tree Select',
        type: "treeSelect",
        isNextChild: false,
        hideExpression: false,
        tooltip: "",
        expandKeys: ['100', '1001'],
        // title: 'parent 1',
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
        className: "w-1/2",
        title: 'Cascader',
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
        title: 'Drawer',
        className: "w-1/2",
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
        // title: "Basic Drawer",
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
        // title: 'Mention',
        className: "w-1/2",
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
        title: 'Message',
        type: "message",
        className: "w-1/2",
        tooltip: "",
        hideExpression: false,
        isNextChild: false,
        // title: "show Message",
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
            disabledProperty = this.selectedNode.children[j].formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
          }
          else if (this.selectedNode.children[j].type == 'tabsMain') {
            this.selectedNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
              });
            });
          }
          else if (this.selectedNode.children[j].type == 'stepperMain') {
            this.selectedNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
              });
            });
          }
          else if (this.selectedNode.children[j].type == 'mainDashonicTabs') {
            this.selectedNode.children[j].children?.forEach(element => {
              element.children?.forEach(elementV1 => {
                wrapperName = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.wrappers;
                disabledProperty = elementV1.formly?.at(0)?.fieldGroup?.at(0)?.templateOptions?.disabled;
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
    this.selectedNode = node;
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

      case "skeleton":
        configObj = { ...configObj, ...this.clickButtonService.getSkeletonConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.skeletonFields;
        break;
      case "empty":
        configObj = { ...configObj, ...this.clickButtonService.getEmptyConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.emptyFields;
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

      case "avatar":
        configObj = { ...configObj, ...this.clickButtonService.getAvatarConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.avatarFields;
        break;

      case "popOver":
        configObj = { ...configObj, ...this.clickButtonService.getPopOverConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.popOverFields;
        break;

      case "result":
        configObj = { ...configObj, ...this.clickButtonService.getResultConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.resultFields;
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

      case "dashonicTabs":
        configObj = { ...configObj, ...this.clickButtonService.getdashonicTabsConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.dashonicTabFields;
        break;

      case "kanban":
        configObj = { ...configObj, ...this.clickButtonService.getKanbanConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.kanbanFeilds;
        break;

      case "kanbanTask":
        configObj = { ...configObj, ...this.clickButtonService.getKanbanTaskConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.kanbanTaskFeilds;
        break;

      case "mainDashonicTabs":
        configObj = { ...configObj, ...this.clickButtonService.getMainDashonicTabsConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.dashoniMainTabFields;
        break;

      case "progressBar":
        configObj = { ...configObj, ...this.clickButtonService.getProgressBarConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.progressBarFeilds;
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
        this.fieldData.formData = _formFieldData.carousalFeilds;
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
        configObj.padding = this.addPropertieInOldScreens(this.selectedNode.padding, "padding"),
          this.fieldData.formData = _formFieldData.headingFields;
        break;

      case "paragraph":
        configObj = { ...configObj, ...this.clickButtonService.getParagraphConfig(selectedNode) };
        configObj.padding = this.addPropertieInOldScreens(this.selectedNode.padding, "padding"),
          this.fieldData.formData = _formFieldData.paragraphFields;
        break;

      case "tags":
      case "multiselect":
      case "search":
      case "radiobutton":
      case "checkbox":
      case "datetime":
      case "time":
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
        configObj = { ...configObj, ...this.clickButtonService.getFormlyConfig(selectedNode) };
        this.fieldData.commonData = _formFieldData.commonFormlyConfigurationFields;
        if (type == "tags" || type == "multiselect" || type == "search" || type == "radiobutton" || type == "checkbox")
          this.fieldData.formData = _formFieldData.radioFields;
        if (type == 'color')
          this.fieldData.formData = _formFieldData.colorFields;
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
      case "stepper":
        configObj = { ...configObj, ...this.clickButtonService.getStepperConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.stepperFields;
        break;
      case "stepperMain":
        configObj = { ...configObj, ...this.clickButtonService.getStepperMainConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.mainStepperFields;
        break;
      case "tabsMain":
        configObj = { ...configObj, ...this.clickButtonService.getTabsConfig(selectedNode) };
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
  applyOrRemoveHighlight(element: any, id: any, highlight: boolean) {
    if (id == element.id)
      element = this.applyHighLight(highlight, element);
    else
      element = this.applyHighLight(false, element);
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
  highlightSelect(id: any) {
    this.nodes.at(0)?.children?.forEach((element: any) => {
      this.applyOrRemoveHighlight(element, id, true);

      element.children.forEach((child: any) => {
        this.applyOrRemoveHighlight(child, id, false);

        if (child.type == "buttonGroup") {
          this.handleButtonGroup(child, id);
        } else {
          this.applyOrRemoveHighlight(child, id, false);

          child.children.forEach((subChild: any) => {
            this.applyOrRemoveHighlight(subChild, id, false);

            this.handleButtonGroup(subChild, id);

            this.handleFormly(subChild, id);

            subChild.children.forEach((subSubChild: any) => {
              this.applyOrRemoveHighlight(subSubChild, id, true);
            });
          });
        }
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
  add(node: TreeNode) {
    this.applySize();
    this.selectedNode = node;
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
  remove(parent: any, node: any) {
    parent = parent?.parentNode?.origin;
    node = node.origin;
    if (parent != undefined) {
      console.log(parent, node);
      const idx = parent.children.indexOf(node);
      this.columnData = this.columnData.filter((a: any) => a.name != parent.children[idx].id);
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
    // this.prepareDragDrop(this.templateNode, this.selectedNode);
    // this.makeFaker();

  }
  EnumView() {
    this.builderService.multiAPIData().subscribe((res => {
      const node = this.selectedNode ?? {};
      const formly = node.formly ?? [];
      const fieldGroup = formly?.[0]?.fieldGroup ?? [];
      const templateOptions = fieldGroup[0]?.templateOptions ?? {};
      templateOptions.options = res ?? undefined;
      this.updateNodes();
      // this.updateNodes();
    }));
  }
  notifyEmit(event: actionTypeFeild): void {
    switch (event.type) {
      case "drawer":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
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
        }
        break;
      case "skeleton":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.isActive = event.form.isActive;
          this.selectedNode.size = event.form.size;
          this.selectedNode.buttonShape = event.form.buttonShape;
          this.selectedNode.avatarShape = event.form.avatarShape;
        }
        break;
      case "empty":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.content = event.form.content;
          this.selectedNode.text = event.form.text;
          this.selectedNode.link = event.form.link;
          this.selectedNode.btnText = event.form.btnText;
          this.selectedNode.color = event.form.color;
        }
        break;
      case "list":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
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
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.nzExtra = event.form.nzExtra;
          this.selectedNode.formatter = event.form.formatter;
          this.selectedNode.size = event.form.size;
          this.selectedNode.isBordered = event.form.isBordered;
          this.selectedNode.isColon = event.form.isColon;
        }
        break;
      case "descriptionChild":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.content = event.form.content;
          this.selectedNode.nzStatus = event.form.nzStatus;
          this.selectedNode.isBadeg = event.form.isBadeg;
          this.selectedNode.nzSpan = event.form.nzSpan;
        }
        break;
      case 'select':
      case 'tag':
      case 'search':
      case 'radio':
      case 'checkbox':
      case 'decimal':
      case 'input':
      case 'inputGroup':
      case 'image':
      case 'telephone':
      case 'textarea':
      case 'time':
      case 'month':
      case 'week':
      case 'datetime':
      case 'date':
      case 'color':
        if (this.selectedNode) {
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.formly?.forEach(elementV1 => {
            // MapOperator(elementV1 = currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            const templateOptions = fieldGroup[0]?.templateOptions ?? {};

            templateOptions.label = event.form.title;
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
            if (this.selectedNode.type == "multiselect") {
              const arr = event.form.defaultValue.split(',');
              templateOptions['defaultValue'] = arr;
            } else {
              templateOptions['defaultValue'] = event.form.defaultValue;
            }
            if (event.form.apiData != undefined) {
              this.selectedNode.link = event.form.apiData;
              this.builderService.jsonTagsDataGet(event.form.apiData).subscribe((res) => {

                templateOptions.options = res;
              })
            } else {
              templateOptions.options = event.form.options;
            }
          });
          if (event.form.multiselect) {
            this.EnumView();
          }
        }
        break;

      case "breakTag":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
        }
        break;
      case "affix":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.className = event.form.className;
          this.selectedNode.affixType = event.form.affixType;
          this.selectedNode.margin = event.form.margin;
          this.selectedNode.target = event.form.target;
          this.selectedNode.hideExpression = event.form.hideExpression;
        }
        break;
      case "avatar":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.key = event.form.key;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.src = event.form.src;
          this.selectedNode.text = event.form.text;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.bgColor = event.form.bgColor;
          this.selectedNode.color = event.form.color;
          this.selectedNode.gap = event.form.gap;
          this.selectedNode.alt = event.form.alt;
        }
        break;
      case "comment":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.key = event.form.key;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.avatar = event.form.avatar;
          this.selectedNode.author = event.form.author;
        }
        break;
      case "popOver":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.key = event.form.key;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.btnLabel = event.form.btnLabel;
          this.selectedNode.nzPopoverContent = event.form.nzPopoverContent;
          this.selectedNode.nzPopoverTitle = event.form.nzPopoverTitle;
        }
        break;
      case "spin":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.key = event.form.key;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.size = event.form.size;
          this.selectedNode.delayTime = event.form.delayTime;
          this.selectedNode.loaderText = event.form.loaderText;
          this.selectedNode.loaderIcon = event.form.loaderIcon;
        }
        break;
      case "result":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.key = event.form.key;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.status = event.form.status;
          this.selectedNode.resultTitle = event.form.resultTitle;
          this.selectedNode.subTitle = event.form.subTitle;
          this.selectedNode.btnLabel = event.form.btnLabel;
        }
        break;
      case "imageUpload":
        if (this.selectedNode) {

          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.alt = event.form.alt;
          this.selectedNode.source = event.form.source;
          this.selectedNode.imagHieght = event.form.imagHieght;
          this.selectedNode.imageWidth = event.form.imageWidth;
          this.selectedNode.imageClass = event.form.imageClass;
          if (event.form.source) {
            // this.formlyService.imageUrl = '';
            this.selectedNode.base64Image = '';
          }
          // else if (this.formlyService.imageUrl) {
          //   this.selectedNode.base64Image = this.formlyService.imageUrl;
          // }
        }
        break;
      case "toastr":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip;
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
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
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
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.min = event.form.min;
          this.selectedNode.max = event.form.max;
          this.selectedNode.sliderType = event.form.sliderType;
          this.selectedNode.progressBar = event.form.progressBar;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.disabled = event.form.disabled;
          this.selectedNode.showValue = event.form.showValue;
        }
        break;
      case "inputGroupGrid":

        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.hideExpression = event.form.hideExpression;
        }
        break;

      case "calendar":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.viewType = event.form.viewType;
          this.selectedNode.disabled = event.form.disabled;
          if (event.form.statusApi != undefined) {
            this.builderService.genericApis(event.form.statusApi).subscribe((res => {
              this.selectedNode.options = res;
              this.updateNodes();
            }))
          }
          // this.updateNodes();
        }
        break;
      case "masking":
        if (this.selectedNode) {
          this.selectedNode.className = event.form.className
          this.selectedNode?.formly?.forEach(elementV1 => {
            // MapOperator(elementV1 =currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            const templateOptions = fieldGroup[0]?.templateOptions ?? {};
            templateOptions['key'] = event.form.key;

            templateOptions.label = event.form.title;
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
          this.selectedNode.title = event.form.title;
          this.selectedNode.id = event.form.id;
        }
        break;
      case "grid":

        if (this.selectedNode.id) {
          this.selectedNode.label = event.form.header,
            this.selectedNode.editorType = event.form.editorType,
            this.selectedNode.sortable = event.form.sortable,
            this.selectedNode.filter = event.form.filter;
          this.selectedNode.header = event.form.header;
          if (event.form?.sortable) {
            this.selectedNode.sortingType = "desc";
            this.selectedNode.sortable = true;
          }
          else {
            delete this.selectedNode.sortingType;
            delete this.selectedNode.sortable;
          }

          if (event.form.filter) {
            this.selectedNode['filter'] = {};
            this.selectedNode.filter["type"] = {};
            this.selectedNode.filter.type = event.form?.filterType;
            if (event.form.filterType != "select") {
              this.selectedNode.filter.operator = "OR"
              this.selectedNode.filter.showApplyBtn = true;
              this.selectedNode.filter.showClearBtn = true;
            }
          } else {
            delete this.selectedNode.filter;
          }
          if (event.form.editorType) {
            this.selectedNode.editorType = event.form.editorType;
            if (event.form.fieldType == "text" || event.form.fieldType == "number") {
              this.selectedNode["editor"] = {};
              this.selectedNode.editor["type"] = {};
              this.selectedNode.editor.type = event.form.fieldType
            };
            if (event.form.fieldType == "select" || event.form.fieldType == "radio" || event.form.fieldType == "checkbox") {
              if (event.form.options.length > 0) {
                this.selectedNode['editor'] = {};
                this.selectedNode.editor['type'];
                this.selectedNode.editor.type = event.form.fieldType;
                this.selectedNode.editor['options'] = {};
                this.selectedNode.editor.options['listItems'] = [];
                this.selectedNode['formatter'] = {}
                this.selectedNode.formatter = "listItemText";
                this.selectedNode.editor.options.listItems = event.form.options;
              } else {
                this.selectedNode.editor.type = event.form.fieldType;
              }
            }
          }
          else if (this.selectedNode.editor.options && event.form.options.length > 0) {
            this.selectedNode.editor.options.listItems = event.form.options;
          }
          this.selectdParentNode.columnData.forEach((element: any) => {
            if (element.id == this.selectedNode.id) {
              element = this.selectedNode;
            }
          });
        }
        break;

      case "gridName":
        if (this.selectedNode) {

          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.className = event.form.className;
          this.selectedNode.sortable = event.form.sortable;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.label = event.form.gridName;
          this.selectedNode.pagination = event.form.pagination;
          this.selectedNode.filter = event.form.filter;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.id = event.form.id;
          // this.selectedNode.getVariable = event?.form?.getVariable,
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.delete = event.form.delete;
          this.selectedNode.update = event.form.update;
          this.selectedNode.create = event.form.create;
          this.selectedNode['deleteapi'] = event.form.deleteapi;
          this.selectedNode.columnData.forEach((a: any) => {
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
            for (let index = 0; index < this.selectedNode.columnData.length; index++) {
              if (data[element].id) {
                if (this.selectedNode.columnData[index].id == data[element].id) {
                  this.selectedNode.columnData[index].label = data[element].header;
                  this.selectedNode.columnData[index].name = data[element].name;
                  this.selectedNode.columnData[index].header = data[element].header;
                  this.selectedNode.columnData[index].showColumn = data[element].showColumn;
                  this.selectedNode.columnData[index].sumColumn = data[element].sumColumn;
                  this.selectedNode.columnData[index]["api"] = data[element].api;
                  newColumnData.push(this.selectedNode.columnData[index]);
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
          this.selectedNode.columnData = newColumnData;
          this.selectedNode.children = this.selectedNode.columnData;
          if (event.form?.link != null) {
            this.selectedNode.columnData = [];
            this.builderService.genericApis(event.form?.link).subscribe((res => {
              this.selectedNode.children = res[0].columnData;
              res[0].columnData.forEach((element: any) => {
                element["id"] = element.name + "_" + Guid.newGuid();
                this.selectedNode.columnData.push(element);

              });
              this.selectedNode.rowData = res[0].rowData;
              this.selectedNode.columnData.forEach((a: any) => {
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
        this.selectedNode.link = event.form.APIList;
        // this.GridView(event.form.APIList);
        break;

      case "button":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.className = event.form.className;
          this.selectedNode.label = event.form.title;
          if (this.selectedNode && this.selectedNode && this.selectedNode && this.selectedNode.btnConfig) {
            this.selectedNode.btnConfig[0].title = event.form.title;
            this.selectedNode.btnConfig[0].hideExpression = event.form.hideExpression;
            this.selectedNode.btnConfig[0].color = event.form.color;
            this.selectedNode.btnConfig[0].btnIcon = event.form.btnIcon;
            this.selectedNode.btnConfig[0].className = event.form.className;
            // this.selectedNode.btnConfig[0].format = event.form.format;
            this.selectedNode.btnConfig[0].disabled = event.form.disabled;
            if (event.form.disabled) {
              // this.selectedNode.btnConfig[0].btnDisables = this.form.valid;
            } else
              this.selectedNode.btnConfig[0].btnDisables = false;
            this.selectedNode.btnConfig[0].tooltip = event.form.tooltip;
          }
        }
        break;

      case "groupButton":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          // this.selectedNode.btnConfig[0].key = event.form.key
          this.selectedNode.label = event.form.title
          if (this.selectedNode && this.selectedNode.children) {
            this.selectedNode.btnGroupPosition = event.form.btnGroupPosition;
            for (let i = 0; i < this.selectedNode.children.length; i++) {
              const node = this.selectedNode.children ?? [];
              const btnGroup = node[i] ?? {};
              this.selectedNode.children[i].className = event.form.className
              // this.selectedNode.children.forEach(elementV1 => elementV1.btnGroupFormat = event.form.btnGroupFormat);
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
      case "linkButton":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.className = event.form.className;
          this.selectedNode.label = event.form.title;
          if (this.selectedNode && this.selectedNode && this.selectedNode && this.selectedNode.btnConfig) {
            this.selectedNode.btnConfig[0].key = event.form.key;
            this.selectedNode.btnConfig[0].title = event.form.title;
            this.selectedNode.btnConfig[0].color = event.form.color;
            this.selectedNode.btnConfig[0].btnIcon = event.form.btnIcon;
            this.selectedNode.btnConfig[0].className = event.form.className;
            this.selectedNode.btnConfig[0].href = event.form.href;
            this.selectedNode.btnConfig[0].format = event.form.format;
            this.selectedNode.btnConfig[0].target = event.form.target;
            this.selectedNode.btnConfig[0].btnType = event.form.target;
            this.selectedNode.btnConfig[0].tooltip = event.form.tooltip;
            this.selectedNode.btnConfig[0].hideExpression = event.form.hideExpression;
            if (event.form.target == "sm" || event.form.target == "lg" || event.form.target == "xl" || event.form.target == "fullscreen") {
              this.selectedNode.btnConfig[0].btnType = "modal";
            }
          }

        }
        break;
      case "dropdownButton":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.className = event.form.className;
          this.selectedNode.label = event.form.title;
          if (this.selectedNode && this.selectedNode && this.selectedNode && this.selectedNode.btnConfig) {
            this.selectedNode.btnConfig[0].hideExpression = event.form.hideExpression;
            this.selectedNode.btnConfig[0].title = event.form.title;
            this.selectedNode.btnConfig[0].tooltip = event.form.tooltip;
            this.selectedNode.btnConfig[0].color = event.form.color;
            this.selectedNode.btnConfig[0].btnIcon = event.form.btnIcon;
            this.selectedNode.btnConfig[0].className = event.form.className;
            this.selectedNode.btnConfig[0].dropdownOptions = event.form.options;
          }
        }
        break;
      case "accordionButton":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          if (this.selectedNode && this.selectedNode.accordionConfig) {
            this.selectedNode.accordionConfig[0].label = event.form.title;
            this.selectedNode.accordionConfig[0].color = event.form.color;
            this.selectedNode.accordionConfig[0].tooltip = event.form.tooltip;
          }
        }
        break;
      //Card Case
      case "card":
        this.selectedNode.hideExpression = event.form.hideExpression;
        if (this.selectedNode) {
          this.selectedNode.label = event.form.name;
          this.selectedNode.className = event.form.className;
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
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.title = event.form.title;
        }
        break;

      case "chart":

        if (this.selectedNode) {
          this.selectedNode.hideExpression = event.form.hideExpression;
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
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.section[0].filterData[0].heading = event.form.title;
          this.selectedNode.section[0].filterData[0].subheading = event.form.sub_label;
          // this.selectedNode.section[0].filterData[0].refundsChart.series[0].data = event.form.options;
          this.selectedNode.section[0].filterData[0].price = event.form.options[0].price;
          this.selectedNode.section[0].filterData[0].refundsChart.colors = event.form.options[0].colors;
          this.selectedNode.section[0].filterData[0].refundsChart.series[0].data = seriesList;
          this.selectedNode.link = event.form.link;
          if (event.form.link) {
            this.builderService.salesDataApi().subscribe((res => {
              // this.selectedNode.chartFilterData = res;
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
            }));
            event.form.link = "";
          }
        }
        break;

      case "donutChart":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
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
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectedNode.section[0].series[index] = res.series[0];
                    this.selectedNode.section[0].labels[index] = res.labels[0];
                    this.selectedNode.section[0].colors[index] = res.colors[0];
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectedNode.link != undefined) {
            this.builderService.visitordonutChart().subscribe((res => {
              this.selectedNode.section = res;
              this.updateNodes();
            }));
          }
        }
        break;

      case "donutSaleChart":
        if (this.selectedNode) {
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.link = event.form.link;
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
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
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
              }))
            }
          }
          if (this.selectedNode.link != undefined) {
            this.builderService.genericApis("donutChart").subscribe((res => {
              this.selectedNode.section = res;
              this.updateNodes()
            }));
          }
        }
        break;

      case "browserChart":

        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.link = event.form.link;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.limit = event.form.limit;
          this.selectedNode.defaultColor = event.form.defaultColor;
          this.selectedNode.belowpercentage = event.form.belowpercentage;
          this.selectedNode.belowpercentageColor = event.form.below_percentage_color;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectedNode.chart[index].percentage = res.min;
                    this.selectedNode.chart[index].min = res.min;
                    this.selectedNode.chart[index].bar = res.min + "%";
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectedNode.link != undefined) {
            this.builderService.genericApis("browserdata").subscribe((res => {
              this.selectedNode.chart = res;
              this.updateNodes();
            }))
          }
        }
        break;

      case "browserCombineChart":

        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.link = event.form.link;
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.limit = event.form.limit;
          this.selectedNode.defaultColor = event.form.defaultColor;
          this.selectedNode.belowpercentage = event.form.belowpercentage;
          this.selectedNode.numberofcolumns = event.form.numberofcolumns;
          this.selectedNode.belowpercentageColor = event.form.below_percentage_color;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {

                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectedNode.chart[index].percentage = res.min;
                    this.selectedNode.chart[index].min = res.min;
                    this.selectedNode.chart[index].bar = res.min + "%";
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectedNode.link != undefined) {
            this.builderService.genericApis("browserdata").subscribe((res => {
              this.selectedNode.chart = res;
              this.updateNodes();
            }))
          }
        }
        break;

      case "salesAnalyticsChart":
        if (this.selectedNode) {
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
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
            this.builderService.genericApis("analyticsChart").subscribe((res => {
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
            }))
          }
        }
        break;

      case "widgetSectionChart":

        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
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
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
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
              }))
            }
          }
          if (this.selectedNode.link != undefined) {
            this.builderService.genericApis("widgetChart").subscribe((res => {
              this.selectedNode.section = res;
              for (let index = 0; index < res.length; index++) {
                this.selectedNode.section[index].data = res[index].Chart.series[0].data;
              }
              this.updateNodes();
            }))
            event.form.link = "";
          }
        }
        break;

      case "SectionChart":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.limit = event.form.limit;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.key = event.form.key;
          this.selectedNode.belowpercentage = event.form.percentage;
          this.selectedNode.section.icon = event.form.options;
          this.selectedNode.section.name = event.form.options;
          this.selectedNode.section.percentage = event.form.options;
          this.selectedNode.section.total = event.form.options;
          this.selectedNode.belowpercentageColor = event.form.below_percentage_color;
          this.selectedNode.link = event.form.link;
          for (let index = 0; index < event.form.options.length; index++) {
            if (event.form.options[index].api != undefined) {
              this.builderService.genericApis(event.form.options[index].api).subscribe((res => {
                for (let h = 0; h < event.form.options.length; h++) {
                  if (event.form.options[index].api != undefined) {
                    this.selectedNode.section[index].total = res.total;
                    this.selectedNode.section[index].percentage = res.percentage;
                    this.updateNodes();
                  }
                }
              }))
            }
          }
          if (this.selectedNode.link != undefined) {
            this.builderService.genericApis("widgetSecondCard").subscribe((res => {
              this.selectedNode.section = res;
              this.updateNodes();
            }))
            event.form.link = "";
          }
        }
        break;

      case "heading":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.className = event.form.className;
          this.selectedNode.padding = event.form.padding;
          // this.selectedNode.paddingLeft = event.form.paddingLeft;
          // this.selectedNode.paddingRight = event.form.paddingRight;
          // this.selectedNode.paddingTop = event.form.paddingTop;
          // this.selectedNode.paddingBottom = event.form.paddingBottom;
          this.selectedNode.data.level = event.form.level;
          this.selectedNode.data.text = event.form.text;
          this.selectedNode.style = event.form.style;
          this.selectedNode.fontSize = event.form.style + event.form.textAlignment + 'color:' + event.form.headingColor;
          this.selectedNode.textAlign = event.form.textAlignment;
          this.selectedNode.headingColor = event.form.headingColor;
          if (event.form.headingApi) {
            this.builderService.genericApis(event.form.headingApi).subscribe((res => {
              this.selectedNode.data = res.data;
              this.updateNodes();
            }))
          }
          this.updateNodes();
        }
        break;

      case "paragraph":
        if (this.selectedNode) {
          this.selectedNode.title = event.form.title;
          // this.selectedNode.paddingLeft = event.form.paddingLeft;
          // this.selectedNode.paddingRight = event.form.paddingRight;
          // this.selectedNode.paddingTop = event.form.paddingTop;
          // this.selectedNode.paddingBottom = event.form.paddingBottom;
          this.selectedNode.padding = event.form.padding;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.className = event.form.className;
          this.selectedNode.data.text = event.form.text;
          this.selectedNode.style = event.form.style;
          this.selectedNode.fontSize = event.form.style + event.form.textAlignment + "color:" + event.form.color;
          this.selectedNode.textAlign = event.form.textAlignment;
          this.selectedNode.color = event.form.color;
          if (event.form.api) {
            this.builderService.genericApis(event.form.api).subscribe((res => {
              // this.selectedNode.data.text = this.fillTemplate(this.selectedNode.data.text, res)//this.selectedNode.data.text;
              // let response = JSON.stringify(res);
              // let arrayData = response.split(',');
              // this.selectedNode.headingConfig[0].data.text = res;
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
              //     this.selectedNode.data.text = JSON.stringify(this.selectedNode.data.text).replace(parseValue, parseData);
              //     this.selectedNode.data.text = this.selectedNode.data.text.replace('"\\\"', '');
              //     this.selectedNode.data.text = this.selectedNode.data.text.replace('\\\"', '');
              //   }
              // }
              this.updateNodes()
            }));
          }

        }
        break;

      case "stepper":
        if (this.selectedNode.id) {
          // this.selectedNode.id = event.form.stepperText;
          this.selectedNode.label = event.form.stepperLabel;
          this.selectedNode.className = event.form.className;
          if (this.selectedNode && this.selectedNode.formly && this.selectedNode.formly[0].fieldGroup && this.selectedNode.formly[0].fieldGroup[0].templateOptions) {
            this.selectedNode.formly[0].fieldGroup[0].templateOptions.label = event.form.stepperLabel;
            this.selectedNode.formly[0].fieldGroup[0].templateOptions['tooltip'] = event.form.tooltip;
          }

          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.icon = event.form.stepperIcon;
          this.updateNodes()
        }
        break;

      case "mainStepper":
        if (this.selectedNode.id) {
          // this.selectedNode.id = event.form.stepperText;
          this.selectedNode.label = event.form.stepperLabel;
          this.selectedNode.className = event.form.className;
          // if(this.selectedNode && this.selectedNode.formly && this.selectedNode.formly[0].fieldGroup && this.selectedNode.formly[0].fieldGroup[0].templateOptions){
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.label = event.form.stepperLabel;
          //   this.selectedNode.formly[0].[stepperFormat] = event.form.stepperFormat;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.nextButtonText = event.form.nextButtonText;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.nextButtonIcon = event.form.nextButtonIcon;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.nextButtonColor = event.form.nextButtonColor;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.backButtonColor = event.form.backButtonColor;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.backButtonIcon = event.form.backButtonIcon;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.backButtonText = event.form.backButtonText;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.submitButtonColor = event.form.submitButtonColor;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.submitButtonIcon = event.form.submitButtonIcon;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.submitButtonText = event.form.submitButtonText;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.selectColor = event.form.selectColor;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.defaultColor = event.form.defaultColor;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.className = event.form.className;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.icon = event.form.icon;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.nodes = event.form.nodes;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.tooltip = event.form.tooltip;
          //   this.selectedNode.formly[0].fieldGroup[0].templateOptions.hideExpression = event.form.hideExpression;
          // }

          // for (let index = 0; index < this.selectedNode.children.length; index++) {
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].stepperFormat = event.form.stepperFormat);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.nextButtonText = event.form.nextButtonText);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.nextButtonIcon = event.form.nextButtonIcon + " mr-1");
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.nextButtonColor = event.form.nextButtonColor + " mt-2");
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.backButtonColor = event.form.backButtonColor + " mt-2");
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.backButtonIcon = event.form.backButtonIcon + " mr-1");
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.backButtonText = event.form.backButtonText);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.submitButtonColor = event.form.submitButtonColor + " mt-2");
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.submitButtonIcon = event.form.submitButtonIcon + " mr-1");
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.submitButtonText = event.form.submitButtonText);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.selectColor = "--selectColor:" + event.form.selectColor);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.defaultColor = "--defaultColor:" + event.form.defaultColor);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.icon = event.form.icon);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.className = event.form.className);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.tooltip = event.form.tooltip);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].templateOptions.hideExpression = event.form.hideExpression);
          //   this.selectedNode.children[index].className = event.form.className;
          // }
          // this.adddynamicStepper(event.form.nodes);
        }
        break;

      case "tab":
        if (this.selectedNode.id) {
          // this.selectedNode.id = event.form.stepperText;
          this.selectedNode.label = event.form.stepperLabel;
          // this.selectedNode.formly[0].fieldGroup[0].props.label = event.form.stepperLabel;
          // this.selectedNode.formly[0].fieldGroup[0].props.stepperFormat = event.form.stepperFormat;
        }
        break;
      case "maintab":
        if (this.selectedNode.id) {
          // this.selectedNode.id = event.form.stepperText;
          this.selectedNode.label = event.form.stepperLabel;
          this.selectedNode.className = event.form.className;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.label = event.form.stepperLabel;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.stepperFormat = event.form.stepperFormat;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.buttonText = event.form.buttonText;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.buttonIcon = event.form.buttonIcon;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.buttonColor = event.form.buttonColor;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.tabsPosition = event.form.tabsPosition;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.selectTabColor = event.form.selectTabColor;
          // this.selectedNode.formly[0].fieldGroup[0].templateOptions.tabsDisplayType = event.form.tabsDisplayType;
          // for (let index = 0; index < this.selectedNode.children.length; index++) {
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.buttonText = event.form.buttonText);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.buttonIcon = event.form.buttonIcon + " mr-1");
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.buttonColor = event.form.buttonColor + " mt-2");
          //   if (event.form.tabsDisplayType == "buttonType") {
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.selectTabColor = "--selectTabColor:" + event.form.selectTabColor);
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.borderRadius = "--borderRadius:0.25rem");
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.color = "--color:azure");
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.fontsize = "--fontsize:large");
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.tabsDisplayType = "--tabsDisplayType:none");
          //   } else if (event.form.tabsDisplayType == "None" || event.form.tabsDisplayType == "underLine") {
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.selectTabColor = "--selectTabColor:none");
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.underLineColor = "--underLineColor:" + event.form.selectTabColor);
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.borderRadius = "--borderRadius:none");
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.color = "--color:none");
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.fontsize = "--fontsize:none");
          //     this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.tabsDisplayType = "--tabsDisplayType: " + event.form.tabsDisplayType);
          //   }
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].type = event.form.stepperFormat);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.className = event.form.className);
          //   this.selectedNode.children[index].forEach(elementV1 => elementV1.formly[0].fieldGroup[0].props.tabsPosition = event.form.tabsPosition);
          //   this.selectedNode.children[index].className = event.form.className;
          //   this.selectedNode.children[index].type = event.form.stepperFormat;
          // }
          // this.adddynamictab(event.form.nodes);
        }
        break;
      // For Section Page Changes
      case "page":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.screenVariables = event.form.variables;
        }
        break;

      case "pageHeader":

        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.headingSize = event.form.headingSize;
          this.selectedNode.header = event.form.header;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.selectedNode.alertPosition = event.form.alertPosition;
        }
        break;

      case "pageBody":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
        }
        break;

      case "pageFooter":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.footer = event.form.footer;
        }
        break;
      case "according":
        if (this.selectedNode.id) {

          // this.selectedNode.id = event.form.accordingText;
          this.selectedNode.label = event.form.accordingText;
          this.selectedNode.className = event.form.className;
          this.selectedNode.sectionDisabled = event.form.disabled;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.selectedNode.repeatable = event.form.repeatable;
          this.selectedNode?.children?.[1]?.children?.forEach(res => {
            if (res) {
              if (res.formly != undefined) {
                if (res.type != "stepperMain" && res.type != "tabsMain") {
                  res['wrapper'] = event.form.wrappers;
                  res['dataOnly'] = event.form.disabled;
                  // if (event.form.className) {
                  //   res.className = event.form.className;
                  // }
                  res.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, res.formly[0].fieldGroup);
                }
                if (res.type == "tabsMain") {

                  if (event.form.className) {
                    res.className = event.form.className;
                  }
                  res.children?.forEach((element: any) => {
                    element.children.forEach((elementV1: any) => {
                      elementV1['wrapper'] = event.form.wrappers;
                      elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
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
                      elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                    });
                  });
                }
              }
              if (res.type == "mainDashonicTabs") {
                res.children?.forEach((element: any) => {
                  element.children.forEach((elementV1: any) => {
                    elementV1['wrapper'] = event.form.wrappers;
                    elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                  });
                });
              }
              if (res.type == "accordionButton") {
                res?.children?.forEach((elementV1: any) => {
                  elementV1['wrapper'] = event.form.wrappers;
                  elementV1.formly[0].fieldGroup = this.diasabledAndlabelPosition(event.form, elementV1.formly[0].fieldGroup);
                });
              }
              // if (event.form.className) {
              //   res.className = event.form.className;
              // }
            }
          })
        }
        break;
      case "accordingHeader":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.headingSize = event.form.headingSize;
          this.selectedNode.backGroundColor = event.form.backGroundColor;
          this.selectedNode.textColor = event.form.textColor;
          this.selectedNode.header = event.form.header;
          this.selectedNode.isExpanded = event.form.isExpanded;
          this.selectedNode.labelPosition = event.form.labelPosition;
          this.updateNodes();
        }
        break;

      case "accordingBody":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
        }
        break;

      case "accordingFooter":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.footer = event.form.footer;
        }
        break;
      case "switch":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.switchType = event.form.switchType;
          this.selectedNode.switchPosition = event.form.switchPosition;
          this.selectedNode.tooltip = event.form.tooltip;
        }
        break;
      case "multiFileUpload":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.uploadBtnLabel = event.form.title;
        }
        break;
      case "textEditor":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
        }
        break;

      case "dashonicTab":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.label = event.form.tabLabel;
          this.selectedNode.className = event.form.className;
          this.selectedNode.dashonicTabsConfig[0].tabLabel = event.form.tabLabel;
          this.selectedNode.dashonicTabsConfig[0].tabIcon = event.form.tabIcon;
          this.selectedNode.dashonicTabsConfig[0].tooltip = event.form.tooltip;
          this.selectedNode.dashonicTabsConfig[0].hideExpression = event.form.hideExpression;
          this.updateNodes();
        }
        break;
      case "kanban":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.text = event.form.title;
          this.selectedNode.nodes = event.form.nodes;
          // this.adddynamicKanban(event.form.nodes);
          this.updateNodes();
        }
        break;
      case "kanbanTask":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.hideExpression = event.form.hideExpression,
            this.selectedNode.title = event.form.title;
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
            this.builderService.genericApis(event.form.kanbanTaskApi).subscribe((res => {
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
            }))
          }
          this.updateNodes();
        }
        break;

      case "dashonicMainTab":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.label = event.form.tabLabel;
          this.selectedNode.className = event.form.className;
          this.selectedNode.mainDashonicTabsConfig[0].tabsDisplayType = event.form.tabsDisplayType;
          this.selectedNode.mainDashonicTabsConfig[0].selectTabColor = event.form.selectTabColor;
          this.selectedNode.mainDashonicTabsConfig[0].buttonText = event.form.buttonText;
          this.selectedNode.mainDashonicTabsConfig[0].buttonIcon = event.form.buttonIcon;
          this.selectedNode.mainDashonicTabsConfig[0].buttonColor = event.form.buttonColor;
          this.selectedNode.mainDashonicTabsConfig[0].tabFormat = event.form.tabFormat;
          this.selectedNode.mainDashonicTabsConfig[0].tabsPosition = event.form.tabsPosition;
          this.selectedNode.mainDashonicTabsConfig[0].nodes = event.form.nodes;
          if (this.selectedNode.children) {
            for (let index = 0; index < this.selectedNode.children.length; index++) {
              this.selectedNode.children.forEach(elementV1 => {
                elementV1.dashonicTabsConfig[0].tabsPosition = event.form.tabsPosition,
                  elementV1.dashonicTabsConfig[0].buttonText = event.form.buttonText,
                  elementV1.dashonicTabsConfig[0].buttonIcon = event.form.buttonIcon + " mr-1",
                  elementV1.dashonicTabsConfig[0].buttonColor = event.form.buttonColor + " mt-2",
                  elementV1.dashonicTabsConfig[0].tabFormat = event.form.tabFormat
              });

              if (event.form.tabsDisplayType == "buttonType") {
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].selectTabColor = "--selectTabColor:" + event.form.selectTabColor);
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].underLineColor = "--underLineColor:none");
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].color = "--color:#fff");
              } else if (event.form.tabsDisplayType == "None") {
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].selectTabColor = "--selectTabColor:none");
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].underLineColor = "--underLineColor:none");
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].color = "--color:none");
              } else if (event.form.tabsDisplayType == "underLine") {
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].underLineColor = "--underLineColor:1px solid " + event.form.selectTabColor);
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].selectTabColor = "--selectTabColor:none");
                this.selectedNode.children.forEach(elementV1 => elementV1.dashonicTabsConfig[0].color = "--color:none");
              }
            }
          }

          // this.adddynamicDashonictab(event.form.nodes);
          this.updateNodes();
        }
        break;
      case "progressBar":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.link = event.form.link;
          this.selectedNode.progressBArConfig[0].title = event.form.title;
          this.selectedNode.progressBArConfig[0].tooltip = event.form.tooltip;
          this.selectedNode.progressBArConfig[0].value = event.form.value;
          this.selectedNode.progressBArConfig[0].color = event.form.color;
          this.selectedNode.progressBArConfig[0].showValue = event.form.showValue;
          this.selectedNode.progressBArConfig[0].stripped = event.form.stripped;
          this.selectedNode.progressBArConfig[0].height = event.form.height;
          this.selectedNode.progressBArConfig[0].hieghtWithPx = event.form.height + "px";
          this.selectedNode.progressBArConfig[0].animated = event.form.animated;
          this.selectedNode.link = event.form.link;
          if (this.selectedNode.link != undefined) {
            this.selectedNode.link = event.form.link;
            this.builderService.genericApis(event.form.link).subscribe((res => {
              this.selectedNode.progressBArConfig[0].value = res.value;
              this.selectedNode.progressBArConfig[0].color = res.color;
              this.selectedNode.progressBArConfig[0].showValue = res.showValue;
              this.selectedNode.progressBArConfig[0].stripped = res.stripped;
              this.selectedNode.progressBArConfig[0].height = res.height;
              this.selectedNode.progressBArConfig[0].hieghtWithPx = res.height + "px";
              this.selectedNode.progressBArConfig[0].animated = res.animated;
              this.updateNodes()
            }));
            event.form.link = "";
          }
          this.updateNodes()
        }
        break;


      case "divider":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip;
          if (event.form.title == '') {
            this.selectedNode.label = this.selectedNode.label;
          } else if (event.form.title != '') {
            this.selectedNode.title = event.form.title;
          }
          this.selectedNode.dividerClassName = event.form.className;
          this.selectedNode.classNameForPosition = event.form.classNameForPosition;
          this.selectedNode.dividerPosition = event.form.dividerPosition;
          this.selectedNode.text = event.form.title;
          this.selectedNode.textColor = event.form.textColor;
          this.selectedNode.lineColor = event.form.lineColor;
          this.selectedNode.textcolorForStyle = "color:" + event.form.textColor;
          this.selectedNode.lineColorForStyle = "--lineColor:" + event.form.lineColor;
          this.selectedNode.dividerFormat = event.form.dividerFormat;
          this.selectedNode.verticalLineHieght = event.form.verticalLineHieght;
          this.selectedNode.verticalLineHieghtForCssBinding = "--verticalLineHieghtForCssBinding:" + event.form.verticalLineHieght + "px";
          this.selectedNode.verticalLinePosition = event.form.verticalLinePosition;
          this.selectedNode.verticalLinePositionForCssBinding = "--verticalLinePositionForCssBinding:" + event.form.verticalLinePosition + "%";
          this.selectedNode.verticalLineColorForCssBinding = "--verticalLineColorForCssBinding:1px solid" + event.form.lineColor;
          this.updateNodes()
        }
        break;

      case "sharedMessagesChart":

        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.title = event.form.title;
          this.selectedNode.className = event.form.className;
          this.selectedNode.title = event.form.title;
          this.selectedNode.tooltip = event.form.tooltip;
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
            this.builderService.genericApis(event.form.api).subscribe((res => {
              this.selectedNode.sharedMessagesConfig = res;
              this.updateNodes();
            }))
          }
          this.updateNodes()
        }
        break;

      case "audio":
        if (this.selectedNode.id) {

          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.title = event.form.title;
          this.selectedNode.audioSrc = event.form.audioSrc;
          this.updateNodes()
        }
        break;
      case "carousal":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.carousalType = event.form.carousalType;
          // this.selectedNode.carousalConfig[0].captionTitle = event.form.captionTitle;
          // this.selectedNode.carousalConfig[0].caption = event.form.caption;
          // this.selectedNode.carousalConfig[0].img = event.form.imgSrc;
          this.selectedNode.carousalConfig = event.form.options;
          this.selectedNode.tooltip = event.form.tooltip;
          this.selectedNode.link = event.form.link;

          if (event.form.link != undefined || event.form.link != "") {
            this.builderService.genericApis(event.form.link).subscribe((res) => {

              this.selectedNode.carousalType = res[0].carousalType;
              this.selectedNode.carousalConfig = res[0].options;
              this.updateNodes();
            })
          }
        }
        break;
      case "videos":
        if (this.selectedNode.id) {

          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.videoConfig[0].title = event.form.title;
          this.selectedNode.videoConfig[0].videoRatio = event.form.videoRatio;
          this.selectedNode.videoConfig[0].videoSrc = event.form.videoSrc;
          this.selectedNode.videoConfig[0].tooltip = event.form.tooltip;
          this.updateNodes()
        }
        break;
      case "alert":

        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.alertConfig[0].icon = event.form.icon;
          this.selectedNode.alertConfig[0].tooltip = event.form.tooltip;
          this.selectedNode.alertConfig[0].type = event.form.type;
          this.selectedNode.alertConfig[0].text = event.form.text;
          this.selectedNode.alertConfig[0].alertColor = event.form.alertColor;
          this.updateNodes()
        }
        break;
      case "timeline":

        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.tooltip = event.form.tooltip,
            this.selectedNode.className = event.form.className;
          this.selectedNode.timelineConfig[0].timelineHeading = event.form.timelineHeading;
          this.selectedNode.timelineConfig[0].headingColor = event.form.headingColor;
          this.selectedNode.timelineConfig[0].headingShape = event.form.headingShape;
          this.selectedNode.timelineConfig[0].timelineType = event.form.timelineType;
          this.selectedNode.timelineConfig[0].data = event.form.timelineData;

          for (let index = 0; index < event.form.timelineData.length; index++) {
            event.form.timelineData[index].image = event.form.timelineData[index].image.toString();
            this.selectedNode.timelineConfig[0].data[index].image = event.form.timelineData[index].image.split(",");
          }
          if (event.form.timelineExample != undefined) {
            this.selectedNode.timelineConfig[0].timelineExample = event.form.timelineExample;
            this.builderService.genericApis(event.form.timelineExample).subscribe((res) => {

              this.selectedNode.timelineConfig[0].data = res[0].data;
              this.updateNodes();
            })
          }
        }
        break;

      case "simpleCardWithHeaderBodyFooter":
        if (this.selectedNode.id) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.className = event.form.className;
          this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].headerText = event.form.headerText;
          this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].tooltip = event.form.tooltip;
          this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].bodyText = event.form.bodyText;
          this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].footerText = event.form.footerText;
          this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].height = event.form.height;
          this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].link = event.form.link;
          this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].textAlign = event.form.textAlign;
          if (event.form.link != undefined || event.form.link != "") {
            this.builderService.genericApis(event.form.link).subscribe((res => {

              this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].headerText = res[0].headerText;
              this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].bodyText = res[0].bodyText;
              this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].footerText = res[0].footerText;
              this.selectedNode.simpleCardWithHeaderBodyFooterConfig[0].height = res[0].height;
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
    this.closeConfigurationList();
    // document.getElementById("mySidenav-right").style.width = "0";
    // this.formlyService.templateNode = JSON.parse(JSON.stringify(this.formlyService.nodes));
    // this.wrapperForCombineFeilds(this.formlyService.templateNode)

  }
  showSuccess() {
    this.toastr.success('Information update successfully!', { nzDuration: 3000 });
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
      if (this.selectedNode.children)
        this.selectedNode.children.push(res)
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