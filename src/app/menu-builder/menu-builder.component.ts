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
import { Subscription } from 'rxjs';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'st-menu-builder',
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
  applications: any;
  applicationName: any;
  applicationId: string = '';
  screenIdList: any = [];
  dataMenuArrayLength: any = [];
  buttonLinkArray: any = [];
  filterMenuData: any = [];
  departments: any[] = [];
  expandedKeys: any;
  isVisible: string;
  tabsChild: TreeNode;
  tabsAdd: TreeNode;
  dropdownAdd: any;
  pagesAdd: TreeNode;
  selectForDropdown: any;
  isActiveShow: string;
  htmlTabsData: any = [];
  tabsArray: any = [];
  dropdownButtonArray: any = [];
  selectedTheme: any;
  selectDepartment: any = '';
  selectApplicationType: any = '';
  requestSubscription: Subscription;

  public editorOptions: JsonEditorOptions;
  // actionType: any;
  constructor(private clickButtonService: BuilderClickButtonService,
    private applicationService: ApplicationService,
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
                  // {
                  //   parameter: "buttons",
                  //   icon: "uil uil-bitcoin-sign",
                  //   title: "Buttons",
                  //   show: true,
                  // },
                  // {
                  //   parameter: "dropdown",
                  //   icon: "uil uil-bitcoin-sign",
                  //   title: "Dropdown menu",
                  //   show: true,
                  // },
                  // {
                  //   parameter: "In Page Dropdown",
                  //   icon: "uil uil-bitcoin-sign",
                  //   title: "In Page Dropdown",
                  //   show: true,
                  // },
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
    debugger
    this.arrayEmpty();
    const newNode = [{
      id: 'menu_' + Guid.newGuid(),
      key: 'menu_' + Guid.newGuid(),
      title: 'Menu',
      link: '',
      icon: "appstore",
      type: "input",
      isTitle: false,
      children: [
      ],
    } as any];
    this.nodes = newNode;
    this.makeMenuData();
  }
  ngOnInit(): void {
    this.selectedTheme = {
      topHeaderMenu: 'w-1/6',
      topHeader: 'w-10/12',
      menuMode: 'inline',
      menuColumn: 'w-2/12',
      rowClass: 'w-10/12',
      horizontalRow: 'flex flex-wrap',
      layout: 'vertical',
      colorScheme: 'light',
      layoutWidth: 'fluid',
      layoutPosition: 'fixed',
      topBarColor: 'light',
      sideBarSize: 'default',
      siderBarView: 'sidebarViewDefault',
      sieBarColor: 'light',
      siderBarImages: '',
      checked: false,
      theme: false,
      isCollapsed: false,
      newMenuArray: [],
      menuChildArrayTwoColumn: [],
      isTwoColumnCollapsed: false,
      allMenuItems: [],
      showMenu: true,
    }
    // this.jsonModuleSetting();
    this.getDepartments();

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

  getMenus(id: string) {
    debugger
    this.applicationService.getNestCommonAPIByCustomQuery('menu/application/', id).subscribe((res => {
      if (res.length > 0) {
        let getApplication = this.applications.find((a: any) => a._id == id);
        this.selectApplicationType = getApplication['application_Type'] ? getApplication['application_Type'] : '';
        this.applicationId = res[0]._id
        this.nodes = JSON.parse(res[0].menuData);
        if (res[0].selectedTheme) {
          this.selectedTheme = JSON.parse(res[0].selectedTheme);
          this.selectedTheme.allMenuItems = this.nodes;
        }
        else {
          this.selectedTheme = {
            topHeaderMenu: 'w-1/6',
            topHeader: 'w-10/12',
            menuMode: 'inline',
            menuColumn: 'w-2/12',
            rowClass: 'w-10/12',
            horizontalRow: 'flex flex-wrap',
            layout: 'vertical',
            colorScheme: 'light',
            layoutWidth: 'fluid',
            layoutPosition: 'fixed',
            topBarColor: 'light',
            sideBarSize: 'default',
            siderBarView: 'sidebarViewDefault',
            sieBarColor: 'light',
            siderBarImages: '',
            checked: false,
            theme: false,
            isCollapsed: false,
            newMenuArray: [],
            menuChildArrayTwoColumn: [],
            isTwoColumnCollapsed: false,
            allMenuItems: [],
            showMenu: true,
          }
          this.selectedTheme.allMenuItems = this.nodes;
        }
        this.makeMenuData();
      }
      else {
        this.clearChildNode();
        this.applicationId = '';
        this.clickBack();
      }
      // this.prepareDragDrop(this.nodes);
    }));
  }
  clickBack() {
    this.nodes = [...this.nodes];
  }
  downloadJson() {
    debugger
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
    this.arrayEmpty();
    let id = event.origin.id;
    let node = event.origin;
    this.isActiveShow = id;
    this.controlListvisible = true;
    // this.IsShowConfig = true;
    this.specificControllShow(node.type, node);
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
      key: selectedNode.key.toLowerCase(),
      title: selectedNode.title
    };
    switch (type) {
      case "input":
        configObj = { ...configObj, ...this.clickButtonService.getMenuAttributeConfig(selectedNode) };
        this.addIconCommonConfiguration(_formFieldData.menufield, true);
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
        key: 'menu_' + Guid.newGuid(),
        title: 'Menu_' + nodesLength,
        link: '',
        icon: "appstore",
        type: "input",
        isTitle: false,
        expanded: true,
        // color: "",
        iconType: "outline",
        iconSize: "15",
        iconColor: "",
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
        key: 'maintab_' + Guid.newGuid(),
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
        link: "",
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
        key: 'dropdown_' + Guid.newGuid(),
        id: 'dropdown_' + Guid.newGuid(),
        title: 'Category',
        expanded: true,
        type: "dropdown",
        className: "col-12",
        nodes: 1,
        icon: "star",
        children: [
        ],

      } as any;
      this.addNode(node, newNode);
      this.dropdownAdd = newNode
    }
    else if (value == 'pages') {
      const newNode = {
        id: 'pages_' + Guid.newGuid(),
        key: 'pages_' + Guid.newGuid(),
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
        key: 'buttons_' + Guid.newGuid(),
        title: 'Buttons',
        type: "buttons",
        expanded: true,
        className: "col-12",
        link: "",
        icon: "star",
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
      this.makeMenuData();
      this.toastr.success('Control Added', { nzDuration: 3000 });
    }
  }
  ParentNode(newNode: any) {
    this.nodes.push(newNode);
    this.makeMenuData();
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
    if (parent) {
      if (parent.type == 'mainTab' || parent.type == 'dropdown') {
        parent.nodes = parent.children.length;
      }
    }
    this.clickBack();
    this.makeMenuData();
  }
  remove(node: any, parentNode?: any) {
    let parent;
    if (parentNode) {
      parent = parentNode;
    } else {
      parent = node?.parentNode?.origin;
      node = node.origin;
    }
    if (parent) {
      console.log(parent, node);
      const idx = parent.children.indexOf(node);
      parent.children.splice(idx as number, 1);
    } else {
      console.log(parent, node);
      const idx = this.nodes.indexOf(node);
      this.nodes.splice(idx as number, 1);
    }
    if (parent) {
      if (parent.type == 'mainTab' || parent.type == 'dropdown') {
        parent.nodes = parent.children.length;
      }
    }
    this.clickBack();
    this.makeMenuData();
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
  saveLoader: any = false;

  saveJsonMenu() {
    this.saveLoader = true;
    var currentData = JSON.parse(JSON.stringify(this.nodes) || '{}');
    // const mainApplicationId = this.applications.filter((a: any) => a.name == this.applicationName);
    const temporaryData = JSON.parse(JSON.stringify(this.selectedTheme));
    var data =
    {
      "name": this.applicationName,
      "applicationId": this.applicationName,
      "menuData": JSON.stringify(currentData),
      // "applicationId": mainApplicationId.length > 0 ? mainApplicationId[0].id : "",
      "selectedTheme": JSON.stringify(temporaryData)
    };
    // data.selectedTheme.allMenuItems = [];
    if (this.applicationId == '') {
      this.requestSubscription = this.applicationService.addNestCommonAPI('menu', data).subscribe({
        next: (objMenu) => {
          this.saveLoader = false;
          this.toastr.success('Menu Save successfully', { nzDuration: 3000 })
        },
        error: (err) => {
          this.saveLoader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user

        }
      });
    } else {
      this.requestSubscription = this.applicationService.updateNestCommonAPI('menu', this.applicationId, data).subscribe({
        next: (objMenu) => {
          this.saveLoader = false;
          this.toastr.success('Menu Update successfully', { nzDuration: 3000 });
        },
        error: (err) => {
          this.saveLoader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      });
    }

    // this.requestSubscription = this.builderService.getJsonModules(this.applicationName).subscribe({
    //   next: (res) => {
    //     if (res.length > 0) {
    //       this.applicationId = res[0].id
    //       this.requestSubscription = this.builderService.jsonDeleteModule(this.applicationId).subscribe({
    //         next: (res) => {

    //           this.requestSubscription = this.builderService.jsonSaveModule(data).subscribe({
    //             next: (res) => {
    //               this.saveLoader = false;
    //               alert("Data Save");
    //             },
    //             error: (err) => {
    //               console.error(err); // Log the error to the console
    //               this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //               this.saveLoader = false;
    //             }
    //           }
    //           )
    //         },
    //         error: (err) => {
    //           console.error(err); // Log the error to the console
    //           this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //           this.saveLoader = false;
    //         }
    //       })
    //     }
    //     else {
    //       this.builderService.jsonSaveModule(data).subscribe((res => {
    //         this.saveLoader = false;
    //         alert("Data Save");
    //       }))
    //     }
    //   },
    //   error: (err) => {
    //     console.error(err); // Log the error to the console
    //     this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //     this.saveLoader = false;
    //   }
    // })
  }

  downloadAllJson() {
    var currentData = JSON.parse(JSON.stringify(this.nodes) || '{}');
    const mainApplicationId = this.applications.filter((a: any) => a.name == this.applicationName);
    const temporaryData = JSON.parse(JSON.stringify(this.selectedTheme));
    var data =
    {
      "applicatioId": this.applicationName,
      "menuData": currentData,
      // "applicationId": mainApplicationId.length > 0 ? mainApplicationId[0].id : "",
      "selectedTheme": temporaryData
    };
    const blob = new Blob([JSON.stringify(this.selectedTheme)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
    // var resData: any = [];
    // this.screenIdList = [];
    // this.buttonLinkArray = [];
    // const mainApplicationId = this.menuModule.filter((a: any) => a.name == this.applicationName)
    // let arr: any = [];
    // arr["jsonModule"] = [];
    // arr.jsonModule.push(mainApplicationId[0]);
    // var currentData = JSON.parse(JSON.stringify(this.nodes) || '{}');
    // var data =
    // {
    //   "applicatioName": this.applicationName,
    //   "menuData": currentData,
    //   "applicationId": mainApplicationId.length > 0 ? mainApplicationId[0].mainApplicationId : "",
    // };
    // arr["jsonModuleSetting"] = [];
    // arr["jsonBuilderSetting"] = [];
    // this.dataMenuArrayLength = data.menuData.length - 1;
    // arr.jsonModuleSetting.push(data);
    // data.menuData.forEach((element: any) => {
    //   this.callApiData(element, arr);
    //   element.children.forEach((element1: any) => {
    //     this.callApiData(element1, arr);
    //     element1.children.forEach((element2: any) => {
    //       this.callApiData(element2, arr);
    //       element2.children.forEach((element3: any) => {
    //         this.callApiData(element3, arr);
    //         element3.children.forEach((element4: any) => {
    //           this.callApiData(element4, arr);
    //           element4.children.forEach((element5: any) => {
    //             this.callApiData(element5, arr);
    //             element5.children.forEach((element6: any) => {
    //               this.callApiData(element6, arr);
    //               element6.children.forEach((element7: any) => {
    //                 this.callApiData(element7, arr);
    //                 element7.children.forEach((element8: any) => {
    //                   this.callApiData(element8, arr);
    //                   element8.children.forEach((element9: any) => {
    //                     this.callApiData(element9, arr);
    //                   });
    //                 });
    //               });
    //             });
    //           });
    //         });
    //       });
    //     });
    //   });
    // });
    // var downloadFileScreen = 0;
    // var downloadButtonScreen = 0;
    // var screenIdListLength = this.screenIdList.length;
    // this.screenIdList.forEach((element: any) => {
    //   this.builderService.screenById(element).subscribe((res => {
    //     downloadFileScreen++;
    //     if (res.length > 0) {
    //       resData.push(res[0]);
    //       this.getButtonLink(res[0].menuData);
    //     }
    //     if (screenIdListLength == downloadFileScreen) {
    //       if (this.buttonLinkArray.length > 0) {
    //         var length = this.buttonLinkArray.length;
    //         this.buttonLinkArray.forEach((element1: any) => {
    //           this.builderService.screenById(element1).subscribe((res => {
    //             downloadButtonScreen++;
    //             if (res.length > 0) {
    //               resData.push(res[0]);
    //               this.getButtonLink(res[0].menuData);
    //             }
    //             if (length == downloadButtonScreen) {
    //               arr.jsonBuilderSetting.push(resData);
    //               let obj = Object.assign({}, arr);
    //               const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    //               const a = document.createElement('a');
    //               a.href = URL.createObjectURL(blob);
    //               a.download = 'file.';
    //               document.body.appendChild(a);
    //               a.click();
    //             }
    //           }))
    //         });
    //       }
    //       else {
    //         arr.jsonBuilderSetting.push(resData);
    //         let obj = Object.assign({}, arr);
    //         const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    //         const a = document.createElement('a');
    //         a.href = URL.createObjectURL(blob);
    //         a.download = 'file.';
    //         document.body.appendChild(a);
    //         a.click();
    //       }
    //     }

    //   }))
    // });
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
        this.selectedTheme = makeData;
        this.nodes = makeData.allMenuItems;
        this.makeMenuData();
        // let selectDepartment = this.menuModule.find((a: any) => a.name == data);
        // this.selectApplicationType = selectDepartment['application_Type'] ? selectDepartment['application_Type'] : '';
        // this.applicationId = makeData[0].id
        // this.nodes = makeData.menuData;
        // makeData.jsonBuilderSetting[0].forEach((element: any) => {
        //   var data =
        //   {
        //     "applicationName": element.applicationName,
        //     "menuData": element.menuData,
        //     "applicationId": element.moduleId,
        //   };
        //   this.builderService.jsonBuilderSettingV1(element.applicationName).subscribe(((res: any) => {
        //     if (res.length > 0) {
        //       var a = 1;
        //       res.forEach((element1: any) => {
        //         this.builderService.jsonDeleteBuilder(element1.id).subscribe((res1 => {
        //           if (res1) {
        //             if (a == 1) {
        //               a++;
        //               this.builderService.jsonSaveBuilder(data).subscribe((res2 => {
        //                 console.log("save Screens");
        //               }));
        //             }
        //           }
        //         }));
        //       });
        //     }
        //     else {
        //       this.builderService.jsonSaveBuilder(data).subscribe((res2 => {
        //         console.log("save");
        //       }));
        //     }
        //   }))
        //   // this.builderService.jsonDeleteBuilderBySreenName(element.applicationName).subscribe((res => {
        //   //   this.builderService.jsonSaveBuilder(data).subscribe((res1 => {
        //   //     console.log("save");
        //   //   }));
        //   // }))

        // });
        // if (makeData.jsonModule && makeData.jsonModule.length > 0) {
        //   var moduleData = {
        //     applicationName: makeData.jsonModule[0].applicationName,
        //     name: makeData.jsonModule[0].name
        //   }
        //   this.builderService.updateModule(makeData.jsonModule[0].id, moduleData).subscribe((res => {
        //     console.log("Application save");
        //   }))
        // }
      };
      if (event.target.files) {
        reader.readAsText(event.target.files[0]);
      }
    }
  }
  closeConfigurationList() {

    this.IsShowConfig = false;
  }
  specificControllShow(selected: any, node: any) {

    this.htmlTabsData[0].children[0].children[0].children.forEach((a: any) => {
      if (selected == 'input') {
        if (a.parameter == 'input' || a.parameter == 'dropdown' || a.parameter == 'In Page Dropdown' || a.parameter == 'Tabs') {
          a.show = true;
        } else {
          a.show = false;
        }
      }
      else if (selected == 'dropdown' && node.children.length == 0) {
        if (a.parameter == 'Tabs') {
          a.show = true;
        } else {
          a.show = false;
        }
      }
      else if (selected == 'dropdown' && node.children.length > 0) {
        if (node.children[0].type == 'pages') {
          a.show = false;
        }
      }
      else if (selected == 'mainTab' || selected == 'tabs' || selected == 'buttons') {
        a.show = true;
      }
      else if (selected == 'pages') {
        if (a.parameter == 'buttons') {
          a.show = true;
        } else {
          a.show = false;
        }
      }
      else {
        a.show = true;
      }
    });
  }
  
  notifyEmit(event: actionTypeFeild): void {
    this.selectedNode.id = event.form.id;
    this.selectedNode.key = event.form.key;
    this.selectedNode.title = event.form.title;
    switch (event.type) {
      case "input":
        if (this.selectedNode) {
          this.selectedNode.icon = event.form.icon;
          if (!event.form.link.includes("pages") && event.form.link != '') {
            // this.selectedNode.link = event.form.link != "/pages/tabsanddropdown" ? "/pages/" + event.form.link : event.form.menuLink;
            this.selectedNode.link = "/pages/" + event.form.link;
          } else {
            this.selectedNode.link = event.form.link;
          }
          this.selectedNode.isTitle = event.form.isTitle;
          this.selectedNode.textColor = event.form.textColor;
          this.selectedNode['iconType'] = event.form.iconType;
          this.selectedNode['iconSize'] = event.form.iconSize;
          this.selectedNode['iconColor'] = event.form.iconColor;
        }
        break;

      case "tabs":
        if (this.selectedNode.id) {
          this.selectedNode.icon = event.form.icon;
          this.selectedNode.link = event.form.link;
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
          // this.adddynamicDashonictab(this.selectedNode.nodes);
          this.addDynamic(event.form.nodes, 'tabs', 'mainTab')
        }
        break;

      case "dropdown":
        if (this.selectedNode) {
          this.selectedNode.nodes = event.form.nodes;
          this.selectedNode.icon = event.form.icon;
          this.adddynamicPages(event.form.nodes);
        }
        break;
      case "pages":
        if (this.selectedNode) {
          this.selectedNode.link = event.form.link;
        }
        break;
      case "buttons":

        if (this.selectedNode) {
          this.selectedNode.link = event.form.link;
          this.selectedNode.icon = event.form.icon;
        }
        break;
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

  addDynamic(nodes: any, subType: any, mainType: any,) {

    if (this.selectedNode.children) {
      let tabsLength = this.selectedNode.children?.length;
      if (tabsLength < nodes) {
        for (let k = 0; k < nodes; k++) {
          if (tabsLength < nodes) {
            this.addControlToJson(subType);
            this.selectedNode = this.tabsAdd;
            tabsLength = tabsLength + 1;
          }
        }
      }
      else {
        if (this.selectedParentNode.children) {
          let removeTabsLength = this.selectedNode.children.length;
          let checkParentLength = this.selectedParentNode.children.length;
          for (let a = 0; a < removeTabsLength; a++) {
            for (let i = 0; i < checkParentLength; i++) {
              for (let j = 0; j < removeTabsLength; j++) {
                if (this.selectedParentNode.children[i].type == mainType) {
                  if (nodes < tabsLength) {
                    this.remove(this.selectedNode.children[tabsLength - 1], this.selectedParentNode.children[i]);
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

  loadTabsAndDropdownFromMenuChild(data: any, arrayEmpty: boolean) {
    if (arrayEmpty) {
      this.arrayEmpty();
    }
    else if (!arrayEmpty) {
      this.tabsArray = [];
    }
    if (data) {
      if (data.children) {
        data.children.forEach((child: any) => {
          if (child.type == 'dropdown') {
            this.dropdownButtonArray.push(child)
          } else if (child.type == 'mainTab') {
            this.tabsArray.push(child)
          }
        });
      }
    }
  }

  arrayEmpty() {
    this.dropdownButtonArray = [];
    this.tabsArray = [];
  }

  changeLayout(layoutType: any) {
    if (layoutType.includes('backGroundColor')) {
      this.selectedTheme['backGroundColor'] = layoutType.split('_')[0];
    } else if (layoutType.includes('textColor')) {
      this.selectedTheme['textColor'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('font')) {
      this.selectedTheme['font'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('activeBackgroundColor')) {
      this.selectedTheme['activeBackgroundColor'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('activeTextColor')) {
      this.selectedTheme['activeTextColor'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('hoverTextColor')) {
      this.selectedTheme['hoverTextColor'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('iconColor')) {
      this.selectedTheme['iconColor'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('hoverIconColor')) {
      this.selectedTheme['hoverIconColor'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('activeIconColor')) {
      this.selectedTheme['activeIconColor'] = layoutType.split('_')[0];
    }
    else if (layoutType.includes('iconSize')) {
      this.selectedTheme['iconSize'] = layoutType.split('_')[0];
    }
    else if (layoutType == 'design1' || layoutType == 'design2' || layoutType == 'design3' || layoutType == 'design4') {
      this.selectedTheme['design'] = layoutType;
    }
    else if (layoutType == 'vertical' || layoutType == 'fluid' || layoutType == 'sidebarViewDefault' || layoutType == 'twoColumn' || layoutType == 'rtl') {
      this.selectedTheme.menuMode = "inline",
        this.selectedTheme.isCollapsed = false;
      this.selectedTheme.topHeaderMenu = 'w-1/6'
      this.selectedTheme.topHeader = 'w-10/12';
      // this.selectedTheme.menuColumn = 'w-1/6';
      // this.selectedTheme.rowClass = 'w-10/12';
      if (layoutType == 'vertical' || layoutType == 'fluid' || layoutType == 'rtl') {
        this.selectedTheme.horizontalRow = 'flex flex-wrap';
        this.selectedTheme.menuColumn = 'w-1/6';
        this.selectedTheme.rowClass = 'w-10/12';
        if (layoutType == 'vertical' || layoutType == 'rtl')
          this.selectedTheme.layout = layoutType;
      }
      if (layoutType == 'twoColumn') {
        this.selectedTheme.layoutPosition = '';
        this.selectedTheme.layout = layoutType;
        this.selectedTheme.horizontalRow = 'flex flex-wrap'
        this.selectedTheme.rowClass = 'w-11/12';
        this.selectedTheme.isCollapsed = true;
        this.selectedTheme.isTwoColumnCollapsed = false;
        this.selectedTheme.menuColumn = 'w-1/12';
        this.selectedTheme.topHeaderMenu = 'w-1/6'
        this.selectedTheme.topHeader = 'w-10/12';
        this.selectedTheme.layoutWidth = '';
        if (this.selectedTheme.menuChildArrayTwoColumn.length > 0) {
          this.selectedTheme.rowClass = 'w-10/12';
          this.selectedTheme.menuColumn = 'w-2/12';
        }
      }
    }
    else if (layoutType == 'horizental') {
      this.selectedTheme.layout = layoutType;
      this.horizentalLayout();
      if (this.selectedTheme.layoutWidth == 'boxed')
        this.selectedTheme.rowClass = 'w-full'
    }
    else if (layoutType == 'dark') {
      this.selectedTheme.theme = true;
    }
    else if (layoutType == 'light') {
      this.selectedTheme.theme = false;
    }
    else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView') {
      this.selectedTheme.isCollapsed = true;
    }
    else if (layoutType == 'boxed') {
      if (this.selectedTheme.layout == 'horizental') {
        this.selectedTheme.horizontalRow = 'flex flex-wrap';
        this.selectedTheme.rowClass = 'w-full',
          this.selectedTheme.menuMode = "horizontal",
          this.selectedTheme.menuColumn = 'w-full',
          this.selectedTheme.isCollapsed = false;
      } else {
        this.selectedTheme.isCollapsed = true;
        this.selectedTheme.horizontalRow = 'flex flex-wrap';
        this.selectedTheme.rowClass = 'w-10/12';
        this.selectedTheme.checked = false;
      }
    }
    else if (layoutType == 'default' || layoutType == 'compact' || layoutType == 'compact_right' || layoutType == 'compact_left') {
      this.selectedTheme.isCollapsed = false;
    }
    // This conditions is used to assign value to object
    if (layoutType == 'vertical' || layoutType == 'horizental' || layoutType == 'twoColumn' || layoutType == 'rtl') {
      this.selectedTheme.layout = layoutType;
      if (this.selectedTheme.sideBarSize == 'compact' || layoutType == 'compact_right' || layoutType == 'compact_left') {
        if (layoutType == 'horizental' || layoutType == 'twoColumn')
          this.selectedTheme.sideBarSize = '';
      }
    }
    else if (layoutType == 'fluid' || layoutType == 'boxed') {
      this.selectedTheme.layoutWidth = layoutType;
      if (this.selectedTheme.layout == 'horizental' && layoutType == 'fluid') {
        this.horizentalLayout();
        // this.selectedTheme.horizontalRow = 'flex flex-wrap';
        // this.selectedTheme.rowClass = 'h-5/6';
        // this.selectedTheme.menuColumn = 'w-full',
        // this.menuMode = "horizontal";
      }
    }
    else if (layoutType == 'light' || layoutType == 'dark') {
      this.selectedTheme.sieBarColor = layoutType;
    }
    else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView' || layoutType == 'default' || layoutType == 'compact' || layoutType == 'compact_right' || layoutType == 'compact_left') {
      this.selectedTheme.sideBarSize = layoutType;
    }
    else if (layoutType == 'fixed' || layoutType == 'scrollable') {
      this.selectedTheme.layoutPosition = layoutType;
    }
    else if (layoutType == 'sidebarViewDefault' || layoutType == 'detatatched') {
      this.selectedTheme.siderBarView = layoutType;
    }
    else if (layoutType.includes('assets/images/menu/image') || layoutType == '') {
      this.selectedTheme.siderBarImages = layoutType;
    }
    this.makeMenuData();
  }

  makeMenuData() {
    let arrayList = [];
    arrayList = this.nodes;
    this.selectedTheme.allMenuItems = [];
    this.selectedTheme.newMenuArray = [];
    if (this.nodes.length > 7 && this.selectedTheme.layout == 'horizental') {
      this.selectedTheme.newMenuArray = [{
        label: "More",
        icon: "down",
        subMenu: []
      }]

      const withOutTitle = this.nodes.filter((a: any) => a.isTitle != true);
      this.selectedTheme.newMenuArray[0].subMenu = withOutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((a: any) => a.isTitle != true).slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }

  horizentalLayout() {
    this.makeMenuData();
    this.selectedTheme.horizontalRow = 'flex flex-wrap';
    this.selectedTheme.rowClass = 'w-10/12',
      this.selectedTheme.menuMode = "horizontal",
      this.selectedTheme.menuColumn = 'w-full',
      this.selectedTheme.isCollapsed = false;
  }

  addIconCommonConfiguration(configurationFields: any, allowIcon?: boolean) {
    const formFieldData = new formFeildData();
    const commonIconFields: any = formFieldData.commonIconFields[0].fieldGroup;
    if (commonIconFields.length > 0) {
      commonIconFields.forEach((element: any) => {
        const excludedKeys = ['badgeType', 'badgeCount', 'dot_ribbon_color', 'iconSize', 'iconColor', 'hoverIconColor'];
        if (element.key !== 'icon' || allowIcon) {
          if (!excludedKeys.includes(element.key)) {
            configurationFields[0].fieldGroup.unshift(element);
          }
        }
      });
    }
  }


  getApplication(id: any) {
    if (id) {
      // let getApplication = this.departments.find(a => a.name == id);
      // if (getApplication) {
      // this.selectApplicationType = getApplication['application_Type'] ? getApplication['application_Type'] : '';
      this.requestSubscription = this.applicationService.getNestCommonAPIByCustomQuery('application/department/', id).subscribe({
        next: (res) => {
          this.applications = res;
          this.clickBack();
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      });
    }
    // }
  }

  getDepartments() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('department').subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  };


}


