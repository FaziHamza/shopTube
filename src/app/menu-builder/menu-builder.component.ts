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
import { Subscription, forkJoin } from 'rxjs';
import { ApplicationService } from '../services/application.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { MenuBulkUpdateComponent } from './menu-bulk-update/menu-bulk-update.component';
import { Router } from '@angular/router';
import { DataSharedService } from '../services/data-shared.service';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

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
  showNotification: boolean = true;
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
  iconType: any = '';
  selectApplicationType: any = '';
  requestSubscription: Subscription;
  currentUser: any;
  iconActive: string = '';
  selectDepartmentName: any = [];
  departmentData: any = [];
  public editorOptions: JsonEditorOptions;
  // actionType: any;
  constructor(private clickButtonService: BuilderClickButtonService,
    private applicationService: ApplicationService,
    private drawerService: NzDrawerService,
    public builderService: BuilderService, private toastr: NzMessageService,
    private router: Router,
    public dataSharedService: DataSharedService) {
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
    this.iconActive = 'clearChildNode';
    this.arrayEmpty();
    const newNode = [{
      id: 'Menu_' + Guid.newGuid(),
      key: 'menu_' + Guid.newGuid(),
      title: 'Menu',
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
    } as any];
    this.nodes = newNode;
    this.makeMenuData();
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.dataSharedService.goToMenu = '';
    this.getDepartments();
  }
  LayerShow() {
    this.iconActive = 'layer';
    if (this.IslayerVisible)
      this.IslayerVisible = false;
    else
      this.IslayerVisible = true;
    this.IsjsonEditorVisible = false;
    this.applySize();
  }
  JsonEditorShow() {
    this.iconActive = 'jsonEdit';
    this.IslayerVisible = false;
    this.controlListvisible = false;
    this.IsjsonEditorVisible = true;
    this.IsShowConfig = false;
    this.applySize();
  }

  getMenus(id: string) {
    this.applicationService.getNestCommonAPIById('cp/CacheMenu', this.currentUser.userId).subscribe(((res: any) => {
      if (res.isSuccess) {
        this.dataSharedService.goToMenu = id;
        if (res.data.length > 0) {
          let getApplication = this.applications.find((a: any) => a._id == id);
          this.selectApplicationType = getApplication['application_Type'] ? getApplication['application_Type'] : '';
          this.applicationId = res.data[0]._id
          this.nodes = JSON.parse(res.data[0].menuData);
          let theme = JSON.parse(res.data[0].selectedTheme);
          this.selectedTheme = this.controlUndefinedValues(theme);
          this.selectedTheme.allMenuItems = this.nodes;
          this.makeMenuData();
        }
        else {
          this.getlocalMenu(id);
        }
      } else {
        this.toastr.error(res.message, { nzDuration: 3000 });
        this.getlocalMenu(id);
      }
    }));
  }
  getlocalMenu(id: any) {
    this.applicationService.getNestCommonAPIById('cp/Menu', id).subscribe(((res: any) => {
      if (res.isSuccess) {
        this.dataSharedService.goToMenu = id;
        if (res.data.length > 0) {
          this.applicationId = res.data[0]._id
          this.nodes = JSON.parse(res.data[0].menuData);
          let theme = JSON.parse(res.data[0].selectedTheme);
          this.selectedTheme = this.controlUndefinedValues(theme);
          this.makeMenuData();
          let getApplication = this.applications.find((a: any) => a._id == id);
          if (getApplication) {
            let domain = getApplication.domain ? getApplication.domain : '';
            if (domain) {
              this.dataSharedService.localhostHeaderFooter.next(domain);
            }
            this.selectApplicationType = getApplication['application_Type'] ? getApplication['application_Type'] : '';
          }
        }
        else {
          this.selectedTheme['font'] = 'font-roboto'
          this.clearChildNode();
          this.applicationId = '';
          this.clickBack();
        }
      } else
        this.toastr.error(res.message, { nzDuration: 3000 });
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
    this.showNotification = false;
    this.addControlToJson('mainTab');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs', true, 'home');
    this.selectedNode = this.tabsAdd;
    this.addControlToJson('tabs', true, 'user');
    this.selectedNode = this.tabsAdd;
    this.showNotification = true;
    this.addControlToJson('tabs', true, 'code-sandbox');
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
    debugger
    if (type == "Tabs" && this.selectedNode.children) {
      const maintabCount = this.selectedNode.children.filter((child: any) => child.type === 'mainTab').length;
      if (maintabCount === 0) {
        this.dashonictabsAddNew();
      }
      else {
        this.toastr.warning("Only one MainTab is allowed in parent-child")
      }
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
    if (event.origin.type != 'mainTab') {
      const data = this.getMenuParents(event.origin, this.nodes);
      const parents = data.slice().reverse();
      const tab = parents.filter((p: any) => p.type === 'tabs');
      if (event.origin.type !== 'tabs' && tab.length === 0) {
        if (parents.length < 3) {
          this.controlListvisible = true;
        } else {
          this.toastr.warning("Cannot add control at this level")
        }
      } else if (event.origin.type == 'tabs') {
        this.controlListvisible = true;
      }
      else if (tab.length > 0) {
        const keyIndex = parents.findIndex((item: any) => item.key === tab[0].key);
        if (keyIndex !== -1) {
          const dataAfterKey = parents.slice(keyIndex + 1);
          if (dataAfterKey.length <= 1) {
            this.controlListvisible = true;
          } else {
            this.toastr.warning("Cannot add control at this level")
          }
        }
      }
    }
    else {
      this.toastr.warning("Add sub tab through configuration of main tab")
    }
    // const treeView = this.generateTreeView(this.nodes, event.origin, event?.parentNode?.origin);
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
  addControlToJson(value: string, nodeType?: boolean, tabIcon?: any) {
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
        iconType: "outline",
        iconSize: "15",
        iconColor: "",
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
      if (node.type != 'tabs') {
        this.addNode(node, newNode);
      } else {
        this.toastr.warning('Cannot add Main tab in tab', { nzDuration: 3000 });
      }
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
        icon: tabIcon ? tabIcon : 'home',
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
    // this.clickBack();
  }
  addNode(node: any, newNode: any) {
    if (node) {
      node.children.push(newNode);
      if (this.showNotification) {
        this.clickBack();
        this.makeMenuData();
        this.toastr.success('Control Added', { nzDuration: 3000 });
      }
    }
  }
  ParentNode(newNode: any) {
    this.nodes.push(newNode);
    this.makeMenuData();
    this.clickBack();
  }
  insertAt(node: any) {
    const parent = node?.parentNode?.origin;
    node = node.origin;
    const newNode = this.deepCloneWithGuid(node);

    if (parent != undefined) {
      const idx = parent.children.indexOf(node as TreeNode);
      parent.children.splice(idx + 1, 0, newNode);
    } else {
      const idx = this.nodes.indexOf(node as any);
      this.deepCloneNodesWithGuid(node.children);
      this.nodes.splice(idx + 1, 0, newNode);
    }

    if (parent && (parent.type === 'mainTab' || parent.type === 'dropdown')) {
      parent.nodes = parent.children.length;
    }

    this.clickBack();
    this.makeMenuData();
  }

  deepCloneWithGuid(node: any): any {
    const newNode = JSON.parse(JSON.stringify(node));
    newNode.id = node.id.split('_')[0] + '_' + Guid.newGuid();
    newNode.key = node.key.split('_')[0] + '_' + Guid.newGuid();
    this.deepCloneNodesWithGuid(newNode.children);
    return newNode;
  }

  deepCloneNodesWithGuid(nodes: any[]): void {
    nodes.forEach((node) => {
      node.id = node.id.split('_')[0] + '_' + Guid.newGuid();
      node.key = node.key.split('_')[0] + '_' + Guid.newGuid();
      if (node.children.length > 0) {
        this.deepCloneNodesWithGuid(node.children);
      }
    });
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
    this.iconActive = 'save';
    this.saveLoader = true;
    var currentData = JSON.parse(JSON.stringify(this.nodes) || '{}');
    // const mainApplicationId = this.applications.filter((a: any) => a.name == this.applicationName);
    const temporaryData = JSON.parse(JSON.stringify(this.selectedTheme));
    temporaryData.allMenuItems = []
    temporaryData.menuChildArrayTwoColumn = []
    temporaryData.newMenuArray = []
    var data: any =
    {
      "name": this.applicationName,
      "applicationId": this.applicationName,
      "menuData": JSON.stringify(currentData),
      // "applicationId": mainApplicationId.length > 0 ? mainApplicationId[0].id : "",
      "selectedTheme": JSON.stringify(temporaryData)
    };
    const menuModel = {
      "Menu": data
    }
    // data.selectedTheme.allMenuItems = [];
    if (this.applicationId == '') {
      this.requestSubscription = this.applicationService.addNestCommonAPI('cp', menuModel).subscribe({
        next: (objMenu: any) => {
          if (objMenu.isSuccess)
            this.toastr.success(objMenu.message, { nzDuration: 3000 });
          else
            this.toastr.error(objMenu.message, { nzDuration: 3000 });

          this.saveLoader = false;
        },
        error: (err) => {
          this.saveLoader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user

        }
      });
    } else {
      this.requestSubscription = this.applicationService.updateNestCommonAPI('cp/Menu', this.applicationId, menuModel).subscribe({
        next: (objMenu: any) => {
          if (objMenu.isSuccess)
            this.toastr.success(objMenu.message, { nzDuration: 3000 });
          else
            this.toastr.error(objMenu.message, { nzDuration: 3000 });

          this.saveLoader = false;
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
    // const mainApplicationId = this.applications.filter((a: any) => a.name == this.applicationName);
    const SaveTheme = JSON.parse(JSON.stringify(this.selectedTheme));
    SaveTheme.allMenuItems = [];
    SaveTheme.menuChildArrayTwoColumn = [];
    SaveTheme.newMenuArray = [];
    var data: any =
    {
      "name": this.applicationName,
      "applicationId": this.applicationName,
      "menuData": JSON.stringify(currentData),
      // "applicationId": mainApplicationId.length > 0 ? mainApplicationId[0].id : "",
      "selectedTheme": JSON.parse(JSON.stringify(SaveTheme))
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
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
  // callApiData(element?: any, arr?: any) {
  //   if (element.type != "buttons" && element.type != "dashonicTabs") {
  //     if (element.link) {
  //       if (element.link.includes("pages") && element.link != "/pages/tabsanddropdown") {
  //         let screenId = element.link.replace("/pages/", "");
  //         this.screenIdList.push(screenId)

  //       }
  //     }
  //   }
  //   else if (element.type == "buttons" || element.type == "dashonicTabs") {
  //     var newLink;
  //     if (element.type == "buttons") {
  //       if (element.buttonsConfig[0].link) {
  //         newLink = element.buttonsConfig[0].link;
  //         this.screenIdList.push(newLink)
  //       }
  //     } else if (element.type == "dashonicTabs") {
  //       if (element.dashonicTabsConfig[0].link) {
  //         newLink = element.dashonicTabsConfig[0].link;
  //         this.screenIdList.push(newLink)
  //       }
  //     }
  //   }

  // }
  // getButtonLink(data: any) {
  //   data[0].children.forEach((element: any) => {
  //     if (element.type == "pageHeader" || element.type == "pageFooter") {
  //       if (element.children.length > 0) {
  //         element.children.forEach((element1: any) => {
  //           if (element1.type == "linkButton") {
  //             this.buttonLinkArray.push(element1.buttonGroup[0].btnConfig[0].href)
  //           }
  //           else if (element1.type == "buttonGroup") {
  //             if (element1.children.length > 0) {
  //               element1.children.forEach((element2: any) => {
  //                 if (element2.type == "linkButton") {
  //                   if (element2.buttonGroup[0].btnConfig[0].href) {
  //                     this.buttonLinkArray.push(element2.buttonGroup[0].btnConfig[0].href)
  //                   }
  //                 }
  //               });
  //             }
  //           }
  //         });
  //       }
  //     }
  //     else if (element.type == "pageBody") {
  //       if (element.children.length > 0) {
  //         element.children.forEach((element2: any) => {
  //           if (element2.children.length > 0) {
  //             element2.children.forEach((element3: any) => {
  //               if (element3.children.length > 0) {
  //                 element3.children.forEach((element4: any) => {
  //                   if (element4.type == "linkButton") {
  //                     this.buttonLinkArray.push(element4.buttonGroup[0].btnConfig[0].href)
  //                   }
  //                   else if (element4.type == "buttonGroup") {
  //                     if (element4.children.length > 0) {
  //                       element4.children.forEach((element2: any) => {
  //                         if (element2.type == "linkButton") {
  //                           if (element2.buttonGroup[0].btnConfig[0].href) {
  //                             this.buttonLinkArray.push(element2.buttonGroup[0].btnConfig[0].href)
  //                           }
  //                         }
  //                       });
  //                     }
  //                   }
  //                 });
  //               }
  //             })
  //           }
  //         })
  //       }
  //     }
  //   });
  // };
  jsonUpload(event: Event) {
    debugger
    // && event.target.files.length > 0
    if (event.target instanceof HTMLInputElement) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let contents = reader.result as string;
        let theme = JSON.parse(contents);
        this.selectedTheme = this.controlUndefinedValues(theme.selectedTheme);
        this.nodes = JSON.parse(theme.menuData);
        // this.controlUndefinedValues();
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

  changeLayout(data: any) {
    debugger
    if (!data.inPageMenu) {
      let layoutType = data.layoutType;
      if (
        layoutType.includes('showButton') ||
        layoutType.includes('buttonClass') ||
        layoutType.includes('iconType')) {
        this.selectedTheme[layoutType.split('_')[1]] = layoutType.split('_')[0];
        if (layoutType.includes('iconType')) {
          this.changeIconType(this.selectedTheme['iconType'], this.nodes);
        }
        if (layoutType.includes('showButton')) {
          this.selectedTheme[layoutType.split('_')[1]] = layoutType.split('_')[0] == 'true' ? true : false;
        }
        if (layoutType.includes('showLogo')) {
          this.selectedTheme[layoutType.split('_')[1]] = layoutType.split('_')[0] == 'true' ? true : false;
        }
        if (layoutType.includes('buttonClass')) {
          this.selectedTheme[layoutType.split('_')[1]] = layoutType.split('_')[0].replace(',', ' ');
        }
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
          this.selectedTheme.isCollapsed = true;
          this.selectedTheme.layoutPosition = '';
          this.selectedTheme.layout = layoutType;
          this.selectedTheme.horizontalRow = 'flex flex-wrap'
          this.selectedTheme.rowClass = 'w-11/12';
          // this.selectedTheme.isTwoColumnCollapsed = false;
          this.selectedTheme.menuColumn = 'w-1/12';
          this.selectedTheme.topHeaderMenu = 'w-1/6'
          this.selectedTheme.topHeader = 'w-10/12';
          this.selectedTheme.layoutWidth = '';
          if (this.selectedTheme.menuChildArrayTwoColumn.length > 0) {
            this.selectedTheme.rowClass = 'w-10/12';
            this.selectedTheme.menuColumn = 'w-2/12';
          }
        }
        if (this.selectedTheme.sideBarSize == 'smallIconView' || this.selectedTheme.sideBarSize == 'smallHoverView') {
          this.selectedTheme.isCollapsed = true;
          this.selectedTheme.checked = false;
          this.selectedTheme.topHeaderMenu = 'w-1/12';
          this.selectedTheme.topHeader = 'w-full';
          this.selectedTheme.menuColumn = '';
          this.selectedTheme.rowClass = 'w-full';
        }
      }
      else if (layoutType == 'horizental') {
        this.selectedTheme.siderBarImages = '';
        // this.selectedTheme.isCollapsed = false;
        this.selectedTheme.layout = layoutType;
        this.horizentalLayout();
        if (!this.selectedTheme.layoutWidth) {
          this.selectedTheme.layoutWidth = 'fluid';
        }
        else if (this.selectedTheme.layoutWidth == 'boxed')
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
        this.selectedTheme.topHeaderMenu = 'w-1/12';
        this.selectedTheme.topHeader = 'w-full';
        this.selectedTheme.menuColumn = '';
        this.selectedTheme.rowClass = 'w-full';
        this.selectedTheme.checked = false;
      }
      else if (layoutType == 'boxed') {
        if (this.selectedTheme.layout == 'horizental') {
          this.selectedTheme.horizontalRow = 'flex flex-wrap';
          this.selectedTheme.rowClass = 'w-full',
            this.selectedTheme.menuMode = "horizontal",
            this.selectedTheme.menuColumn = 'w-full',
            this.selectedTheme.isCollapsed = false;
        }
        else {
          this.selectedTheme.isCollapsed = false;
          this.selectedTheme.menuColumn = 'w-1/6';
          this.selectedTheme.rowClass = 'w-10/12';
          this.selectedTheme.topHeaderMenu = 'w-1/6';
          this.selectedTheme.topHeader = 'w-10/12';
        }
      }
      else if (layoutType == 'default' || layoutType == 'compact' || layoutType == 'compact_right' || layoutType == 'compact_left') {
        this.selectedTheme.isCollapsed = false;
        this.selectedTheme.menuColumn = 'w-1/6';
        this.selectedTheme.rowClass = 'w-10/12';
        this.selectedTheme.topHeaderMenu = 'w-1/6';
        this.selectedTheme.topHeader = 'w-10/12';
      }
      // This conditions is used to assign value to object
      if (layoutType == 'vertical' || layoutType == 'horizental' || layoutType == 'twoColumn' || layoutType == 'rtl') {
        this.selectedTheme.layout = layoutType;
        if (layoutType == 'horizental' || layoutType == 'twoColumn')
          this.selectedTheme.sideBarSize = '';
      }
      else if (layoutType == 'fluid' || layoutType == 'boxed') {
        this.selectedTheme.layoutWidth = layoutType;
        if (this.selectedTheme.layout == 'horizental' && layoutType == 'fluid') {
          this.horizentalLayout();
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
    else if (data.inPageMenu) {
      if (
        data.layoutType.includes('childiconType')) {
        this.changeTabChildIconType(this.selectedTheme['inPageMenu']['child']['iconType'], this.nodes);
      }
      else if (data.layoutType.includes('iconType')) {
        this.changeTabIconType(this.selectedTheme['inPageMenu']['iconType'], this.nodes);
      }
    }
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
        id: 'menu_428605c1',
        key: 'menu_0f7d1e4e',
        children: []
      }]
      const withOutTitle = this.nodes.filter((a: any) => a.isTitle != true);
      this.selectedTheme.newMenuArray[0].children = withOutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((a: any) => a.isTitle != true).slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }

  horizentalLayout() {
    this.selectedTheme.isCollapsed = false;
    this.selectedTheme.topHeaderMenu = 'w-1/6';
    this.selectedTheme.topHeader = 'w-10/12';
    this.selectedTheme.horizontalRow = '';
    this.selectedTheme.rowClass = 'w-full';
    this.selectedTheme.menuMode = "horizontal";
    this.selectedTheme.menuColumn = 'w-full';
    this.makeMenuData();
  }

  addIconCommonConfiguration(configurationFields: any, allowIcon?: boolean) {
    const formFieldData = new formFeildData();
    const commonIconFields: any = formFieldData.commonIconFields[0].fieldGroup;
    if (commonIconFields.length > 0) {
      commonIconFields.forEach((element: any) => {
        const excludedKeys = ['badgeType', 'badgeCount', 'dot_ribbon_color', 'iconSize', 'iconColor', 'hoverIconColor', 'iconClass'];
        if (element.key !== 'icon' || allowIcon) {
          if (!excludedKeys.includes(element.key)) {
            configurationFields[0].fieldGroup.unshift(element);
          }
        }
      });
    }
  }

  getDepartments() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Department').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            this.departments = res.data;
            this.departmentData = res.data?.map((data: any) => {
              return {
                label: data.name,
                value: data._id
              };
            });
          } else {
            this.departments = [];
            this.departmentData = [];
          }
        }
        else
          this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  };
  bulkUpdate() {
    if (this.nodes.length > 0) {
      const drawerRef = this.drawerService.create<MenuBulkUpdateComponent, { value: string }, string>({
        nzTitle: 'Bulk Update',
        nzWidth: 1000,
        nzContent: MenuBulkUpdateComponent,
        nzContentParams: {
          nodes: JSON.parse(JSON.stringify(this.nodes))
        }
      });
      drawerRef.afterOpen.subscribe(() => {
        // console.log('Drawer(Component) open');
      });
      drawerRef.afterClose.subscribe(data => {
        console.log(data);
        if (data) {
          this.nodes = data;
          this.clickBack();
          this.makeMenuData();
        }
      });
    } else {
      this.toastr.error("Please select application first", { nzDuration: 3000 });
    }

  }
  changeIconType(data: string, nodes: Node[]) {
    nodes.forEach((node: any) => {
      if (node.type !== 'tabs') {
        node.iconType = data;
      }
      if (node.children.length > 0) {
        if (node.type !== 'tabs') {
          this.changeIconType(data, node.children);
        } else {
          // Do not apply icon type change to children of 'tabs'
        }
      }
    });
  }

  changeTabIconType(data: any, nodeData: any) {
    if (nodeData.length > 0 && data) {
      nodeData.forEach((node: any) => {
        if (node.type === 'tabs') {
          node.iconType = data;
        }
        if (node.children.length > 0) {
          this.changeTabIconType(data, node.children);
        }
      });
    }
  }
  changeTabChildIconType(data: any, nodeData: any) {
    if (nodeData.length > 0 && data) {
      nodeData.forEach((node: any) => {
        if (node.type === 'tabs') {
          if (node.children.length > 0) {
            node.children.forEach((tabChild: any) => {
              tabChild.iconType = data;
              if (tabChild.children.length > 0) {
                tabChild.children.forEach((tabSubChild: any) => {
                  tabSubChild.iconType = data;
                });
              }
            });
          }
        }
        if (node.children.length > 0) {
          this.changeTabChildIconType(data, node.children);
        }
      });
    }
  }


  getMenuParents(selectedItem: any, menuItems: any[]): any {
    const parents: any[] = [];
    const parentIds: string[] = [];
    const findSelectedItem = (item: any, menu: any[]) => {
      if (menu.includes(item)) {
        parents.push(item);
        parentIds.push(item.id);
        return true;
      }
      for (const menuItem of menu) {
        if (menuItem.children && menuItem.children.length > 0) {
          if (findSelectedItem(item, menuItem.children)) {
            parents.push(menuItem);
            parentIds.push(menuItem.id);
            return true;
          }
        }
      }
      return false;
    };
    findSelectedItem(selectedItem, menuItems);
    const filteredParents = parents.filter((item, index) => index <= 2);
    return filteredParents;
  }
  // generateTreeView(menuItems: any, newNode: any, parentId: any): any {
  //   const result: any[] = [];

  //   function traverseNodes(items: any, parentIndex: any) {
  //     for (let i = 0; i < items.length; i++) {
  //       const item = items[i];
  //       const currentIndex = parentIndex ? `${parentIndex}.${i + 1}` : `${i + 1}`;
  //       const label = `${currentIndex} ${item.title}`;
  //       item.title = label;
  //       // result.push(label);

  //       if (item.id === parentId && item.children) {
  //         // item.children.push(newNode);
  //         traverseNodes(item.children, currentIndex);
  //       } else if (item.children) {
  //         traverseNodes(item.children, currentIndex);
  //       }
  //     }
  //   }

  //   traverseNodes(menuItems, '');

  //   return result;
  // }

  checkPage() {
    if (this.dataSharedService.goToMenu) {
      this.router.navigate(['/']);
    } else {
      this.toastr.warning('Please select Application', { nzDuration: 3000 });
    }
  }

  controlUndefinedValues(theme?: any) {
    if (!theme['buttonClassArray']) {
      theme['buttonClassArray'] = []
    }
    if (theme['showButton'] == undefined || theme['showButton'] == '' || theme['showButton'] == null) {
      theme['showButton'] = true
    }
    if (theme['showLogo'] == undefined || theme['showLogo'] == '' || theme['showLogo'] == null) {
      theme['showLogo'] = true
    }
    if (!theme['inPageMenu']) {
      theme['inPageMenu'] = {};
    }
    if (!theme['inPageMenu']['child']) {
      theme['inPageMenu']['child'] = {};
    }

    const defaultProperties = [
      { property: 'backGroundColor', defaultValue: '#ffffff' },
      { property: 'hoverBgColor', defaultValue: '#3b82f6' },
      { property: 'activeTextColor', defaultValue: '#6f777d' },
      { property: 'textColor', defaultValue: '#6f777d' },
      { property: 'activeBackgroundColor', defaultValue: '#e6f7ff' },
      { property: 'hoverTextColor', defaultValue: '#ffffff' },
      { property: 'iconColor', defaultValue: '#6f777d' },
      { property: 'hoverIconColor', defaultValue: '#ffffff' },
      { property: 'activeIconColor', defaultValue: '#6f777d' },
      { property: 'titleSize', defaultValue: 15 },
      { property: 'iconSize', defaultValue: 15 },
      { property: 'font', defaultValue: 'font-roboto' },
      { property: 'buttonIcon', defaultValue: 'fa-regular fa-bars' },
      { property: 'buttonIconType', defaultValue: 'font_awsome' },
      { property: 'buttonIconType', defaultValue: 'right' },
    ];
    const defaultPropertiesInPageMenu = [
      { property: 'backGroundColor', defaultValue: '#ffffff' },
      { property: 'activeTextColor', defaultValue: '#2563eb' },
      { property: 'textColor', defaultValue: '#73757A' },
      { property: 'activeBackgroundColor', defaultValue: '#2563eb' },
      { property: 'hoverTextColor', defaultValue: '#73757A' },
      { property: 'iconColor', defaultValue: '#73757A' },
      { property: 'hoverIconColor', defaultValue: '#73757A' },
      { property: 'activeIconColor', defaultValue: '#2563eb' },
      { property: 'titleSize', defaultValue: 16 },
      { property: 'iconSize', defaultValue: 15 },
      { property: 'font', defaultValue: 'font-roboto' },
    ];
    const defaultPropertiesInPageMenuChild = [
      { property: 'backGroundColor', defaultValue: '#ffffff' },
      { property: 'activeTextColor', defaultValue: '#ffffff' },
      { property: 'textColor', defaultValue: '#73757A' },
      { property: 'activeBackgroundColor', defaultValue: '#ffffff' },
      { property: 'hoverTextColor', defaultValue: '#ffffff' },
      { property: 'iconColor', defaultValue: '#73757A' },
      { property: 'hoverIconColor', defaultValue: '#73757A' },
      { property: 'activeIconColor', defaultValue: '#ffffff' },
      { property: 'titleSize', defaultValue: 16 },
      { property: 'iconSize', defaultValue: 15 },
      { property: 'font', defaultValue: 'font-roboto' },
      { property: 'hoverBgColor', defaultValue: '#3b82f6' },

    ];

    for (const prop of defaultProperties) {
      if (!theme[prop.property]) {
        theme[prop.property] = prop.defaultValue;
      }
    }
    for (const prop of defaultPropertiesInPageMenuChild) {
      if (!theme['inPageMenu']['child'][prop.property]) {
        theme['inPageMenu']['child'][prop.property] = prop.defaultValue;
      }
    }
    return theme
  }
  // typeFirstAlphabetAsIcon(node: any) {
  //   if (node.origin.type === 'input') {
  //     if (node?.parentNode?.origin) {
  //       return 'S';
  //     } else {
  //       return 'M';
  //     }
  //   } else {
  //     return 'I';
  //   }
  // }

  async loadData(node: NzCascaderOption, index: number): Promise<void> {
    if (index === 0) {
      try {
        const res = await this.applicationService.getNestCommonAPIById('cp/Application', node.value).toPromise();
        if (res.isSuccess) {
          this.applications = res.data;
          const applications = res.data.map((appData: any) => {
            return {
              label: appData.name,
              value: appData._id,
              isLeaf: true
            };
          });
          node.children = applications;
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      } catch (err) {
        console.error('Error loading screen data:', err);
        this.toastr.error('An error occurred while loading screen data', { nzDuration: 3000 });
      }
    }
  }
  onDepartmentChange(departmentId: any) {
    if (departmentId.length === 2) {
      this.getMenus(departmentId[1])
    }
  }
  undefinedSelectedTheme() {
    this.toastr.warning('Please Select Application!', { nzDuration: 3000 });
  }
}


