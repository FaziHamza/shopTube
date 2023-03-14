import { GenaricFeild } from './../models/genaricFeild.modal';
import { Component, OnInit } from '@angular/core';
import { actionTypeFeild, formFeildData } from '../builder/configurations/configuration.modal';
import { BuilderClickButtonService } from '../builder/service/builderClickButton.service';
import { TreeNode } from '../models/treeNode';
import { MenuItem } from '../models/menu';
import { BuilderService } from '../services/builder.service';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Guid } from '../models/guid';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.scss']
})
export class MenuBuilderComponent implements OnInit {
  fieldData: GenaricFeild;
  selectedNode: TreeNode;
  selectedParentNode: TreeNode;
  formModalData: any;
  IslayerVisible: boolean = true;
  IsjsonEditorVisible: boolean = false;
  sizes = [20, 80, 0];
  controlListvisible: boolean = false;
  nodes: any = [];
  IsConfigurationVisible: boolean = true;
  IsShowConfig: boolean = false;
  menuModule: any;
  moduleName: any;
  moduleId: any = 0;
  screenIdList: any = [];
  dataMenuArrayLength: any = [];
  buttonLinkArray: any = [];
  filterMenuData: any = [];
  expandedKeys: any;
  isVisible: string;
  tabsChild: TreeNode;
  tabsAdd: TreeNode;
  dropdownAdd: any;
  pagesAdd: TreeNode;
  selectForDropdown: any;
  isActiveShow: string;
  htmlTabsData: any = [];
  tabsAndDropDownFromMenu: any = [];
  public editorOptions: JsonEditorOptions;
  // actionType: any;
  constructor(private clickButtonService: BuilderClickButtonService,
    public builderService: BuilderService, private toastr: NzMessageService,) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.htmlTabsData = [
      {
        title: "Heading here",
        children: [
          {
            title: "Input Fields",
            children: [
              {
                title: "Basic",
                id: "static-1",
                children: [
                  {
                    parameter: "input",
                    paramater2: false,
                    icon: "uil uil-text pr-1",
                    title: "Add Sub Menu",
                    show: true,
                  },
                  {
                    parameter: "input",
                    paramater2: true,
                    icon: "uil uil-text pr-1",
                    title: "Add Parent Menu",
                    show: true,
                  },
                  {
                    parameter: "buttons",
                    icon: "uil uil-bitcoin-sign",
                    title: "Buttons",
                    show: true,
                  },
                  {
                    parameter: "dropdown",
                    icon: "uil uil-bitcoin-sign",
                    title: "Dropdown menu",
                    show: true,
                  },
                  {
                    parameter: "In Page Dropdown",
                    icon: "uil uil-bitcoin-sign",
                    title: "In Page Dropdown",
                    show: true,
                  },
                  {
                    parameter: "Tabs",
                    icon: "uil uil-bitcoin-sign",
                    title: "Tabs",
                    show: true,
                  },


                ]
              }
            ]
          }
        ]
      }
    ]
  }
  clearChildNode() {
    this.tabsAndDropDownFromMenu = [];
    const newNode = [{
      id: 'menu_' + Guid.newGuid(),
      title: 'Menu',
      link: '/pages/tabsanddropdown',
      icon: "appstore",
      type: "input",
      isTitle: false,
      children: [
      ],
    } as any];
    this.moduleId = 0;
    this.nodes = newNode;
  }
  ngOnInit(): void {
    this.jsonModuleSetting();
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
    this.controlListvisible = false;

    this.IsjsonEditorVisible = true;
    this.IsShowConfig = true;
    this.applySize();
  }
  jsonModuleSetting() {
    this.builderService.jsonModuleSetting().subscribe((res => {
      this.menuModule = res;
      this.clickBack();
    }));
  }
  getFormLayers(data: any) {

    this.builderService.getJsonModules(data).subscribe((res => {
      if (res.length > 0) {
        this.moduleId = res[0].id
        this.nodes = res[0].menuData;
      }
      else {
        const newNode = [{
          id: 'menu_' + Guid.newGuid(),
          title: 'Menu',
          link: '/pages/tabsanddropdown',
          icon: "Menu",
          type: "input",
          isTitle: false,
          children: [
          ],

        } as any];
        this.moduleId = 0;
        this.nodes = newNode;
      }
      this.clickBack();
      // this.prepareDragDrop(this.nodes);
    }));
  }
  clickBack() {
    this.nodes = [...this.nodes];
  }
  downloadJson() {
    const blob = new Blob([JSON.stringify(this.nodes)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  // closeDetail() {
  //   this.controlListvisible = false;
  // }
  controlListClose(): void {
    this.controlListvisible = false;
  }
  dashonictabsAddNew() {
    this.addControlToJson('mainTab');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs');
    this.selectedNode = this.selectForDropdown;
    this.clickBack();
  }

  dropdownAddNew() {
    this.addControlToJson('dropdown');
    this.selectedNode = this.dropdownAdd;
    this.addControlToJson('pages');
    this.selectedNode = this.pagesAdd;
    this.addControlToJson('buttons');
    this.selectedNode = this.selectForDropdown;
    this.clickBack();
  }
  addFunctionsInHtml(type: any) {

    if (type == "Tabs") {
      this.dashonictabsAddNew();
    }
    else if (type == "In Page Dropdown") {
      this.dropdownAddNew();
    }
  }
  openConfig(parent: any, node: any) {
    if (node.origin) {
      parent = parent?.parentNode?.origin;
      node = node.origin;
    }

    this.IsConfigurationVisible = true;
    // this.closeDetail();
    // this.btnShow = false;
    // this.inputShow = false;
    // this.cardShow = false;
    // this.IsShowPanel = false;
    this.IsShowConfig = true;
    // this.applySize();
    this.selectedNode = node;

    this.selectedParentNode = parent;
    this.clickButton(node?.type)
  }
  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }
  hoverIn(data: any) {

    this.isVisible = data.origin.id;
  }
  hoverOut(data: any) {
    this.isVisible = data.origin.id;
  }
  openField(event: any) {
    this.tabsAndDropDownFromMenu = [];
    let id = event.origin.id;
    let node = event.origin;
    this.isActiveShow = id;
    this.controlListvisible = true;
    // this.IsShowConfig = true;
    if (node.type == 'dropdown' && node.children.length == 0) {
      this.whenDropdownSelectedOnlyTabsControllShow();
    } else if (node.type == 'dropdown' && node.children.length > 0) {
      if (node.children[0].type == 'mainTab') {
        this.whenDropdownSelectedOnlyTabsControllShow();
      }
    }
    else {
      this.htmlTabsData[0].children[0].children[0].children.forEach((a: any) => {
        a.show = true;
      });
    }
    this.selectedNode = node;
    // this.applySize();
  }
  clickButton(type: any) {
    // this.actionType = type;
    let _formFieldData = new formFeildData();
    this.fieldData = new GenaricFeild({
      type: type,
      title: "Change Attribute Values",
      commonData: _formFieldData.commonMenuBuilderConfigurationFields,
    });
    const selectedNode = this.selectedNode;
    let configObj: any = {
      id: selectedNode.id as string,
      key: selectedNode.key, title: selectedNode.title
    };
    switch (type) {
      case "input":
        configObj = { ...configObj, ...this.clickButtonService.getMenuAttributeConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.menufield;
        break;
        case "tabs":
          configObj = { ...configObj, ...this.clickButtonService.getMenutab(selectedNode) };
          this.fieldData.formData = _formFieldData.menuBuilderTabFields;
          break;
        case "mainTab":
          configObj = { ...configObj, ...this.clickButtonService.getMainDashonicTabsConfig(selectedNode) };
          this.fieldData.formData = _formFieldData.mainTabFields;
          break;
      case "dropdown":
        configObj = { ...configObj, ...this.clickButtonService.getDropDownAttributeConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.menuBuilderDropdownFeilds;
        break;
      case "pages":
        configObj = { ...configObj, ...this.clickButtonService.getPagesAttributeConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.menuBuilderPagesFeilds;
        break;
      case "buttons":
        configObj = { ...configObj, ...this.clickButtonService.getButtonAttributeConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.menuBuilderButtonFeilds;
        break;
    }

    this.formModalData = configObj;
  }
  addControlToJson(value: string, nodeType?: boolean) {

    if (this.selectedNode.isTitle && !nodeType) {
      return
    }
    var nodesLength = this.nodes.length + 1;
    if (value == "dropdown" || value == "mainTab") {
      this.selectForDropdown = this.selectedNode;
    }
    this.controlListvisible = true;
    // this.IsShowConfig = true;
    let node = this.selectedNode;
    if (value == 'input') {
      const newNode = {
        id: 'Menu_' + Guid.newGuid(),
        title: 'Menu_' + nodesLength,
        link: '/pages/tabsanddropdown',
        icon: "appstore",
        type: "input",
        isTitle: false,
        expanded: true,
        color: "",
        children: [
        ],
      } as any;
      if (nodeType == false) {
        this.addNode(node, newNode);
      } else if (nodeType) {
        this.ParentNode(newNode);
      }
    }
    else if (value == 'title') {
      const newNode = {
        id: 'Menu' + '_1',
        title: 'Menu' + '_1',
        link: '/pages/tabsanddropdown',
        icon: "appstore",
        expanded: true,
        type: "input",
        isTitle: true,
        children: [
        ],
      } as any;
      this.addNode(node, newNode);
    }
    else if (value == 'card') {
      const newNode = {
        expanded: true,
        id: node.id + '_1',
        children: [
        ],
      } as TreeNode;
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
    else if (value == 'tabs') {
      const newNode = {
        id: 'tabs_' + Guid.newGuid(),
        key: 'tabs_' + Guid.newGuid(),
        title: 'Tabs',
        type: "tabs",
        link:"",
        className: "w-full",
        isNextChild: true,
        highLight: false,
        hideExpression: false,
        tooltip: '',
        icon: 'star',
        children: [
        ],
      } as TreeNode;
      this.tabsChild = newNode
      this.addNode(node, newNode);
    }
    else if (value == 'dropdown') {
      const newNode = {
        id: 'dropdown_' + Guid.newGuid(),
        title: 'Category',
        expanded: true,
        type: "dropdown",
        className: "col-12",
        nodes: 1,
        dropdownIcon: "uil-star",
        children: [
        ],

      } as any;
      this.addNode(node, newNode);
      this.dropdownAdd = newNode
    }
    else if (value == 'pages') {
      const newNode = {
        id: 'pages_' + Guid.newGuid(),
        title: 'Pages',
        expanded: true,
        type: "pages",
        className: "col-12",
        link: "",
        children: [
        ],

      } as any;
      this.pagesAdd = newNode;
      this.addNode(node, newNode);

    }
    else if (value == 'buttons') {
      const newNode = {
        id: 'buttons_' + Guid.newGuid(),
        title: 'Buttons',
        type: "buttons",
        expanded: true,
        className: "col-12",
        link: "",
        ButtonIcon: "uil-star",
        children: [
        ],

      } as any;
      this.addNode(node, newNode);
    }
    this.clickBack();
  }
  addNode(node: any, newNode: any) {
    if (node) {
      let checkNode = node.children;
      if (checkNode) {
        node.children.push(newNode);
      } else {
        node.children.push(newNode);
      }
      this.clickBack();
      this.toastr.success('Control Added', { nzDuration: 3000 });
    }

  }
  ParentNode(newNode: any) {
    this.nodes.push(newNode);
    this.clickBack();
  }
  insertAt(node: any) {

    let parent = node?.parentNode?.origin;
    node = node.origin;
    if (parent != undefined) {
      const newNode = JSON.parse(JSON.stringify(node));
      newNode.id = newNode.id + Guid.newGuid();
      const idx = parent.children.indexOf(node as TreeNode);
      parent.children.splice(idx as number + 1, 0, newNode);
    }
    else {
      const newNode = JSON.parse(JSON.stringify(node));
      newNode.id = newNode.id + Guid.newGuid();
      const idx = this.nodes.indexOf(node as any);
      node.children.forEach((a: any) => {
        a.id = a.id + Guid.newGuid();
        a.children.forEach((j: any) => {
          j.id = j.id + Guid.newGuid();
          j.children.forEach((k: any) => {
            k.id = k.id + Guid.newGuid();
            k.children.forEach((l: any) => {
              l.id = l.id + Guid.newGuid();
              l.children.forEach((m: any) => {
                m.id = m.id + Guid.newGuid();
                m.children.forEach((n: any) => {
                  n.id = n.id + Guid.newGuid();
                });
              });
            });
          });
        });
      });
      this.nodes.splice(idx + 1, 0, newNode);
    }
    this.clickBack();
  }
  remove(node: any) {
    let parent = node?.parentNode?.origin;
    node = node.origin;
    if (parent) {
      console.log(parent, node);
      const idx = node.children.indexOf(node);
      parent.children.splice(idx as number, 1);
    } else {
      console.log(parent, node);
      const idx = this.nodes.indexOf(node);
      this.nodes.splice(idx as number, 1);
    }
    this.clickBack();
  }
  menuSearch() {
    this.filterMenuData = [];
    var input = (document.getElementById("mySearch") as HTMLInputElement).value.toUpperCase();
    if (input) {
      this.nodes.forEach((element: any) => {
        if (element.title.toUpperCase().includes(input)) {
          this.filterMenuData.push(element);
        }
        else if (element.children.length > 0) {
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
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }
  saveJsonMenu() {

    var currentData = JSON.parse(JSON.stringify(this.nodes) || '{}');
    // var addObj = [{
    //   "moduleName": this.moduleName, "menuData": currentData,

    // }];
    const mainModuleId = this.menuModule.filter((a: any) => a.name == this.moduleName)
    var data =
    {
      "moduleName": this.moduleName,
      "menuData": currentData,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].moduleId : "",
    };
    if (this.moduleId > 0) {
      // this.builderService.jsonDeleteModule(this.moduleId).subscribe((res => {


      //   // this.router.navigate(["/dashboard/builder" + this.schema]);
      // }))
      this.builderService.jsonUpdateModule(this.moduleId, data).subscribe((res => {

        alert("Data Save");
      }))
    } else {
      this.builderService.jsonSaveModule(data).subscribe((res => {

        alert("Data Save");
      }))
    }


  }
  downloadAllJson() {

    var resData: any = [];
    this.screenIdList = [];
    this.buttonLinkArray = [];
    const mainModuleId = this.menuModule.filter((a: any) => a.name == this.moduleName)
    let arr: any = [];
    arr["jsonModule"] = [];
    arr.jsonModule.push(mainModuleId[0]);
    var currentData = JSON.parse(JSON.stringify(this.nodes) || '{}');
    var data =
    {
      "moduleName": this.moduleName,
      "menuData": currentData,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].moduleId : "",
    };
    arr["jsonModuleSetting"] = [];
    arr["jsonBuilderSetting"] = [];
    this.dataMenuArrayLength = data.menuData.length - 1;
    arr.jsonModuleSetting.push(data);
    data.menuData.forEach((element: any) => {
      this.callApiData(element, arr);
      element.children.forEach((element1: any) => {
        this.callApiData(element1, arr);
        element1.children.forEach((element2: any) => {
          this.callApiData(element2, arr);
          element2.children.forEach((element3: any) => {
            this.callApiData(element3, arr);
            element3.children.forEach((element4: any) => {
              this.callApiData(element4, arr);
              element4.children.forEach((element5: any) => {
                this.callApiData(element5, arr);
                element5.children.forEach((element6: any) => {
                  this.callApiData(element6, arr);
                  element6.children.forEach((element7: any) => {
                    this.callApiData(element7, arr);
                    element7.children.forEach((element8: any) => {
                      this.callApiData(element8, arr);
                      element8.children.forEach((element9: any) => {
                        this.callApiData(element9, arr);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    var downloadFileScreen = 0;
    var downloadButtonScreen = 0;
    var screenIdListLength = this.screenIdList.length;
    this.screenIdList.forEach((element: any) => {
      this.builderService.menuTabs(element).subscribe((res => {
        downloadFileScreen++;
        if (res.length > 0) {
          resData.push(res[0]);
          this.getButtonLink(res[0].menuData);
        }
        if (screenIdListLength == downloadFileScreen) {
          if (this.buttonLinkArray.length > 0) {
            var length = this.buttonLinkArray.length;
            this.buttonLinkArray.forEach((element1: any) => {
              this.builderService.menuTabs(element1).subscribe((res => {
                downloadButtonScreen++;
                if (res.length > 0) {
                  resData.push(res[0]);
                  this.getButtonLink(res[0].menuData);
                }
                if (length == downloadButtonScreen) {
                  arr.jsonBuilderSetting.push(resData);
                  let obj = Object.assign({}, arr);
                  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = 'file.';
                  document.body.appendChild(a);
                  a.click();
                }
              }))
            });
          }
          else {
            arr.jsonBuilderSetting.push(resData);
            let obj = Object.assign({}, arr);
            const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'file.';
            document.body.appendChild(a);
            a.click();
          }
        }

      }))
    });
  }
  callApiData(element?: any, arr?: any) {
    if (element.type != "buttons" && element.type != "dashonicTabs") {
      if (element.link) {
        if (element.link.includes("pages") && element.link != "/pages/tabsanddropdown") {
          let screenId = element.link.replace("/pages/", "");
          this.screenIdList.push(screenId)

        }
      }
    }
    else if (element.type == "buttons" || element.type == "dashonicTabs") {
      var newLink;
      if (element.type == "buttons") {
        if (element.buttonsConfig[0].link) {
          newLink = element.buttonsConfig[0].link;
          this.screenIdList.push(newLink)
        }
      } else if (element.type == "dashonicTabs") {
        if (element.dashonicTabsConfig[0].link) {
          newLink = element.dashonicTabsConfig[0].link;
          this.screenIdList.push(newLink)
        }
      }
    }

  }
  getButtonLink(data: any) {
    data[0].children.forEach((element: any) => {
      if (element.type == "pageHeader" || element.type == "pageFooter") {
        if (element.children.length > 0) {
          element.children.forEach((element1: any) => {
            if (element1.type == "linkButton") {
              this.buttonLinkArray.push(element1.buttonGroup[0].btnConfig[0].href)
            }
            else if (element1.type == "buttonGroup") {
              if (element1.children.length > 0) {
                element1.children.forEach((element2: any) => {
                  if (element2.type == "linkButton") {
                    if (element2.buttonGroup[0].btnConfig[0].href) {
                      this.buttonLinkArray.push(element2.buttonGroup[0].btnConfig[0].href)
                    }
                  }
                });
              }
            }
          });
        }
      }
      else if (element.type == "pageBody") {
        if (element.children.length > 0) {
          element.children.forEach((element2: any) => {
            if (element2.children.length > 0) {
              element2.children.forEach((element3: any) => {
                if (element3.children.length > 0) {
                  element3.children.forEach((element4: any) => {
                    if (element4.type == "linkButton") {
                      this.buttonLinkArray.push(element4.buttonGroup[0].btnConfig[0].href)
                    }
                    else if (element4.type == "buttonGroup") {
                      if (element4.children.length > 0) {
                        element4.children.forEach((element2: any) => {
                          if (element2.type == "linkButton") {
                            if (element2.buttonGroup[0].btnConfig[0].href) {
                              this.buttonLinkArray.push(element2.buttonGroup[0].btnConfig[0].href)
                            }
                          }
                        });
                      }
                    }
                  });
                }
              })
            }
          })
        }
      }
    });
  };
  jsonUpload(event: Event) {
    // && event.target.files.length > 0
    if (event.target instanceof HTMLInputElement) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let contents = reader.result as string;
        var makeData = JSON.parse(contents);
        makeData.jsonBuilderSetting[0].forEach((element: any) => {
          var data =
          {
            "moduleName": element.moduleName,
            "menuData": element.menuData,
            "moduleId": element.moduleId,
          };
          this.builderService.jsonBuilderSettingV1(element.moduleName).subscribe(((res: any) => {
            if (res.length > 0) {
              var a = 1;
              res.forEach((element1: any) => {
                this.builderService.jsonDeleteBuilder(element1.id).subscribe((res1 => {
                  if (res1) {
                    if (a == 1) {
                      a++;
                      this.builderService.jsonSaveBuilder(data).subscribe((res2 => {
                        console.log("save Screens");
                      }));
                    }
                  }
                }));
              });
            }
            else {
              this.builderService.jsonSaveBuilder(data).subscribe((res2 => {
                console.log("save");
              }));
            }
          }))
          // this.builderService.jsonDeleteBuilderBySreenName(element.moduleName).subscribe((res => {
          //   this.builderService.jsonSaveBuilder(data).subscribe((res1 => {
          //     console.log("save");
          //   }));
          // }))

        });
        if (makeData.jsonModule && makeData.jsonModule.length > 0) {
          var moduleData = {
            applicationName: makeData.jsonModule[0].applicationName,
            name: makeData.jsonModule[0].name
          }
          this.builderService.updateModule(makeData.jsonModule[0].id, moduleData).subscribe((res => {
            console.log("module save");
          }))
        }
      };
      // reader.readAsText(event.target.files[0]);
    }
  }
  closeConfigurationList() {
    this.IsShowConfig = false;
  }
  whenDropdownSelectedOnlyTabsControllShow() {
    this.htmlTabsData[0].children[0].children[0].children.forEach((a: any) => {
      if (a.parameter == 'Tabs') {
        a.show = true;
      } else {
        a.show = false;
      }
    });
  }
  notifyEmit(event: actionTypeFeild): void {

    switch (event.type) {
      case "input":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.icon = event.form.icon;
          if (!event.form.menuLink.includes("pages") && event.form.menuLink != '') {
            // this.selectedNode.link = event.form.menuLink != "/pages/tabsanddropdown" ? "/pages/" + event.form.menuLink : event.form.menuLink;
            this.selectedNode.link = "/pages/" + event.form.menuLink;
          } else {
            this.selectedNode.link = event.form.menuLink;
          }
          this.selectedNode.isTitle = event.form.menuRequired;
          this.selectedNode.textColor = event.form.textColor;
          this.selectedNode.color = "color:" + event.form.textColor;
          this.clickBack();
        }
        break;

        case "tabs":
          if (this.selectedNode.id) {
            this.selectedNode.id = event.form.id;
            this.selectedNode.key = event.form.key;
            this.selectedNode.title = event.form.title;
            this.selectedNode.icon = event.form.icon;
            this.selectedNode.link = event.form.link;
            this.clickBack();
          }
          break;

        case "mainTab":
          if (this.selectedNode.id) {
            this.selectedNode.id = event.form.id;
            this.selectedNode.tooltip = event.form.tooltip,
              this.selectedNode.title = event.form.title;
            this.selectedNode.selectedIndex = event.form.selectedIndex;
            this.selectedNode.animated = event.form.animated;
            this.selectedNode.size = event.form.size;
            this.selectedNode.tabPosition = event.form.tabPosition;
            this.selectedNode.tabType = event.form.tabType;
            this.selectedNode.hideTabs = event.form.hideTabs;
            this.selectedNode.nodes = event.form.nodes;
            this.selectedNode.centerd = event.form.centerd;
            // this.addDynamic(event.form.nodes, 'tabs', 'mainTab')
            this.clickBack();
          }
          break;

      case "dropdown":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.dropdownConfig[0].title = event.form.title;
          this.selectedNode.dropdownConfig[0].nodes = event.form.nodes;
          this.selectedNode.dropdownConfig[0].dropdownIcon = event.form.dropdownIcon;
          this.adddynamicPages(event.form.nodes);
          this.clickBack();
        }
        break;
      case "pages":
        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.pageConfig[0].title = event.form.title;
          this.selectedNode.pageConfig[0].link = event.form.link;
          this.clickBack();
        }
        break;
      case "buttons":

        if (this.selectedNode) {
          this.selectedNode.id = event.form.id;
          this.selectedNode.title = event.form.title;
          this.selectedNode.buttonsConfig[0].title = event.form.title;
          this.selectedNode.buttonsConfig[0].link = event.form.link;
          this.selectedNode.buttonsConfig[0].ButtonIcon = event.form.ButtonIcon;
          this.clickBack();
        }
        break;

      // case "redirection":
      //   if (this.selectedNode.actionConfig) {
      //     this.selectedNode.actionConfig.redirection = event.form.redirection;
      //   }
      //   break;

      // case "method":
      //   if (this.selectedNode.actionConfig) {
      //     this.selectedNode.actionConfig.method = event.form.method;
      //   }
      //   break;

      // case "btnText":
      //   if (this.selectedNode.btnConfig) {
      //     this.selectedNode.id = event.form.title;
      //     this.selectedNode.btnConfig[0].title = event.form.title;
      //   }
      //   break;
      // case "btnClass":
      //   if (this.selectedNode.btnConfig) {
      //     this.selectedNode.btnConfig[0].color = event.form.color;
      //   }
      //   break;
      // case "menuID":
      //   if (this.selectedNode.id) {

      //     this.selectedNode.id = event.form.menuID;
      //   }
      //   break;
      // case "menutitle":
      //   if (this.selectedNode.title) {
      //     this.selectedNode.title = event.form.menutitle;
      //   }
      //   break;
      // case "menuIcon":
      //   if (this.selectedNode.icon) {
      //     this.selectedNode.icon = event.form.menuIcon;
      //   }
      //   break;
      // case "menuLink":
      //   if (this.selectedNode.link) {
      //     this.selectedNode.link = event.form.menuLink;
      //   }
      //   break;
      // case "menuRequired":
      //   this.selectedNode.isTitle = event.form.menuRequired;
      //   break;
      default:
        break;
    }
    this.showSuccess();
    this.clickBack();
    this.closeConfigurationList();
  }
  showSuccess() {
    this.toastr.success('Information update successfully!', { nzDuration: 3000 });
  }
  adddynamicDashonictab(abc: any) {
    // this.selectdParentNode = parent;
    if (this.selectedNode.children) {
      let tabslength = this.selectedNode.children.length;
      if (tabslength < abc) {
        for (let k = 0; k < abc; k++) {
          if (tabslength < abc) {
            this.addControlToJson('tabs');
            this.selectedNode = this.tabsAdd;
            tabslength = tabslength + 1;
          }
        }
      }
      else {
        let tabLength = this.selectedNode.children.length;
        for (let a = 0; a < tabLength; a++) {
          if (this.selectedNode.type == "mainTab") {
            if (abc < tabslength) {
              this.remove(this.selectedNode);
              tabslength = tabslength - 1;
            }
          }
        }
      }
    }

  }
  adddynamicPages(abc: any) {
    if (this.selectedNode.children) {
      let pageLength = this.selectedNode.children.length;
      if (pageLength < abc) {
        for (let k = 0; k < abc; k++) {
          if (pageLength < abc) {
            this.selectedNode = this.dropdownAdd;
            this.addControlToJson('pages');
            this.selectedNode = this.pagesAdd;
            this.addControlToJson('buttons');
            // this.selectedNode = this.dropdownAdd;
            pageLength = pageLength + 1;
          }
        }
      }
      else {
        let removePage = this.selectedNode.children.length;
        for (let a = 0; a < removePage; a++) {
          if (this.selectedNode.type == "dropdown") {
            if (abc < pageLength) {
              this.remove(this.selectedNode);
              pageLength = pageLength - 1;
            }
          }
        }
      }
    }
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
  loadTabsAndDropdownFromMenuChild(data : any){
    debugger
    if(!data.arrayEmpty){
    this.tabsAndDropDownFromMenu = data.menuData.children;
    }else{
      this.tabsAndDropDownFromMenu = [];
    }
  }
  
}


