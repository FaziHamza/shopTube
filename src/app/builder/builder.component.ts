import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewContainerRef,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { GenaricFeild } from '../models/genaricFeild.modal';
import { Guid } from '../models/guid';
import { TreeNode } from '../models/treeNode';
import { BuilderService } from '../services/builder.service';
import { DataSharedService } from '../services/data-shared.service';
import {
  actionTypeFeild,
  formFeildData,
} from './configurations/configuration.modal';
import { htmlTabsData } from '../ControlList';
import { BuilderClickButtonService } from './service/builderClickButton.service';
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { INITIAL_EVENTS } from '../shared/event-utils/event-utils';
import { ColorPickerService } from '../services/colorpicker.service';
import { DataService } from '../services/offlineDb.service';
import { EncryptionService } from '../services/encryption.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddControlService } from './service/addControl.service';
import { Router } from '@angular/router';
import { AddControlCommonPropertiesComponent } from './add-control-common-properties/add-control-common-properties.component';
import { ApplicationService } from '../services/application.service';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { TemplatePopupComponent } from './template-popup/template-popup.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { faker } from '@faker-js/faker';
import { HeadingParagrapghUpdateComponent } from './heading-paragrapgh-update/heading-paragrapgh-update.component';
import { OtherBulkUpdateComponent } from './other-bulk-update/other-bulk-update.component';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'st-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  isScreenSaved: boolean = false;
  showRules: any = '';
  showActionRule: any = true;
  public editorOptions: JsonEditorOptions = new JsonEditorOptions();
  isSavedDb = false;
  makeOptions = () => new JsonEditorOptions();
  addControl = false;
  size: NzButtonSize = 'large';
  departmentData: any = [];
  applicationData: any = [];
  selectDepartmentName: any = [];
  IslayerVisible: boolean = true;
  IsjsonEditorVisible: boolean = false;
  sizes = [17, 83];
  IsShowConfig: boolean = false;
  htmlTabsData: any = [];
  nodes: any = [];
  screens: any;
  screenname: any;
  navigation: any = '';
  id: any = "";
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
  showModal: boolean = false;
  showNotification: boolean = true;
  previewJsonData: any = '';
  searchValue: any = '';
  selectApplicationName: any = '';
  saveLoader: any = false;
  htmlBlockimagePreview: any = '';
  webBlock: boolean = false;
  saveAsTemplate: boolean = false;
  templateName: any = '';
  modalType: any = '';
  websiteBlockButton: any = '';
  websiteBlockTypeArray: any = [];
  websiteBlockName: any = '';
  webisteBlockType: any = '';
  searchControlValue: any = '';
  websiteBlockSave: boolean = false;
  dbWebsiteBlockArray: any = [];
  dbHtmlCodeBlockArray: any = [];
  formlyTypes: any = [];
  currentUser: any;
  iconActive: string = '';
  form: any = new FormGroup({});
  formlyLength: any = 0;
  pdf: boolean = false;
  getTaskManagementIssues: any[] = [];
  applicationThemeClasses: any[] = [];
  uiRuleData: any[] = [];
  constructor(
    public builderService: BuilderService,
    private viewContainerRef: ViewContainerRef,
    private applicationService: ApplicationService,
    private drawerService: NzDrawerService,
    private _encryptionService: EncryptionService,
    private employeeService: EmployeeService,
    private toastr: NzMessageService,
    private dataService: DataService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private addControlService: AddControlService,
    private clickButtonService: BuilderClickButtonService,
    public dataSharedService: DataSharedService,
    private colorPickerService: ColorPickerService,
    private el: ElementRef,
    private router: Router,
    private renderer: Renderer2,
    public socketService: SocketService,

  ) {

    // document.getElementsByTagName("body")[0].setAttribute("data-sidebar-size", "sm");
    // this.clearChildNode();
    // this.jsonBuilderMain().subscribe((res => {

    //   this.nodes = res[0].menuData;
    // }));
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.dataSharedService.change.subscribe(({ event, field }) => {
      if (event && field && this.router.url == '/builder') {
        if (this.formModalData) {
          if (this.formModalData[field.key] && field.type == 'image-upload') {
            this.formModalData[field.key] = event;
            if (!this.formModalData[field.key]) {
              this.makeModel(field, event);
            }
          }
        }
        this.checkConditionUIRule(field, event);
      }
    });
    this.requestSubscription = this.dataSharedService.configuration.subscribe({
      next: (res) => {
        if (res && this.router.url == '/builder') {
          this.openConfig(res, res)
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  controlListClose(): void {
    this.controlListvisible = false;
  }
  controlListOpen(): void {
    this.controlListvisible = true;
  }
  ngOnInit(): void {
    this.getAppliationGlobalClass();
    this.getApplicationTheme();
    // this.getUsers();
    this.dataSharedService.currentMenuLink = '/ourbuilder';
    this.currentUser = JSON.parse(this.dataSharedService.decryptedValue('user'));
    this.loadDepartmentData();
    document
      .getElementsByTagName('body')[0]
      .setAttribute('data-sidebar-size', 'sm');
    this.htmlTabsData = htmlTabsData;
    this.makeDatainTemplateTab();
    let filterdButtons = this.htmlTabsData[0].children.filter(
      (item: any) => item.id == 'website-block'
    );
    this.websiteBlockTypeArray = filterdButtons[0].children;
    this.makeFormlyTypeOptions(htmlTabsData[0]);
  }

  // onDepartmentChange
  onDepartmentChange(departmentId: any) {
    if (departmentId.length === 3) {
      if (departmentId[2] != 'selectScreen') {
        this.getscreendata(departmentId[2])
      }
    }
  }
  async loadDepartmentData(): Promise<void> {
    const { jsonData, newGuid } = this.socketService.makeJsonData('Department', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.departmentData = (res.data || []).map((data: any) => ({
            label: data.name,
            value: data.id
          }));

          const header = {
            label: 'Select Department',
            value: 'selectDepartment'
          };
          this.departmentData.unshift(header);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.message, { nzDuration: 3000 });
      }
    });
  }
  async loadData(node: NzCascaderOption, index: number): Promise<void> {
    if (index == 1 && node.value != 'selectApplication') {
      // Root node - Load application data
      try {
        this.selectApplicationName = node.value;
        const { jsonData, newGuid } = this.socketService.makeJsonDataById('ScreenBuilder', node.value, 'GetModelTypeById');
        this.socketService.Request(jsonData);
        const response:any = await new Promise((resolve, reject) => {
          const subscription = this.socketService.OnResponseMessage().subscribe(
            (data: any) => {
              subscription.unsubscribe();
              resolve(data);
            },
            (error: any) => {
              subscription.unsubscribe();
              reject(error);
            }
          );
        });
        if (response.parseddata.requestId == newGuid && response.parseddata.isSuccess) {
         const res = response.parseddata.apidata;
          this.screens = res.data;
          const screens = res.data.map((screendata: any) => {
            return {
              label: screendata.name,
              value: screendata.id,
              isLeaf: true
            };

          });
          node.children = screens;
          let header = {
            label: 'Select Screen',
            value: 'selectScreen'
          }
          screens.unshift(header)
        }
      } catch (err) {
        this.toastr.error('An error occurred while loading application data', { nzDuration: 3000 });
      }
    }
    else if (index === 0 && node.value != 'selectDepartment') {
      try {
        this.selectApplicationName = node.value;
        try {
          this.selectApplicationName = node.value;
          const { jsonData, newGuid } = this.socketService.makeJsonDataById('Application', node.value, 'GetModelTypeById');
          this.socketService.Request(jsonData);
          const response:any = await new Promise((resolve, reject) => {
            const subscription = this.socketService.OnResponseMessage().subscribe(
              (data: any) => {
                subscription.unsubscribe();
                resolve(data);
              },
              (error: any) => {
                subscription.unsubscribe();
                reject(error);
              }
            );
          });
          if (response.parseddata.requestId == newGuid && response.parseddata.isSuccess) {
             const res = response.parseddata.apidata;
            this.selectApplicationName = "";
            this.applicationData = res.data;
            const applications = res.data.map((appData: any) => {
              return {
                label: appData.name,
                value: appData.id,
                isLeaf: false
              };
            });
            node.children = applications;
            let header = {
              label: 'Select Application',
              value: 'selectApplication'
            }
            applications.unshift(header)
          }
        } catch (err) {
          this.toastr.error('An error occurred while loading application data', { nzDuration: 3000 });
        }
      } catch (err) {
        console.error('Error loading screen data:', err);
        this.toastr.error('An error occurred while loading screen data', { nzDuration: 3000 });
      }
    }
  }

  LayerShow() {
    this.iconActive = 'layer';
    if (this.IslayerVisible) this.IslayerVisible = false;
    else this.IslayerVisible = true;
    this.IsjsonEditorVisible = false;
    this.applySize();
  }
  updateNodes() {
    this.nodes = [...this.nodes];
    if (this.isSavedDb) this.saveOfflineDB();
    // this.cdr.detectChanges();
  }
  saveOfflineDB() {
    let data = this.jsonStringifyWithObject(this.nodes);
    let encryptData = this._encryptionService.encryptData(data);
    this.dataService.saveData(this.screenname, this.selectApplicationName, "Builder", encryptData);
  }
  getOfflineDb() {
    let data = this.dataService.getNodes(this.selectApplicationName, this.screenname, "Builder");
    let decryptData = this._encryptionService.decryptData(data);
    this.nodes = this.jsonParseWithObject(
      this.jsonStringifyWithObject(decryptData)
    );
    // let data = this.jsonParse(this.jsonStringifyWithObject(data));
  }
  async applyOfflineDb(content: 'previous' | 'next' | 'delete') {
    if (content == 'previous') {
      this.iconActive = 'undo';
    } if (content == 'next') {
      this.iconActive = 'redo';
    }
    if (content === 'delete') {
      this.iconActive = 'delete';
      const nodes = await this.dataService.deleteDb(this.selectApplicationName, this.screenname, "Builder");
      alert('this Screen Delete db successfully!');
      return;

    }
    const nodes = await this.dataService.getNodes(this.selectApplicationName, this.screenname, "Builder");

    if (this.oldIndex === undefined) {
      // this.oldIndex = 0;
      this.decryptData(nodes[nodes.length - 1]);
      this.oldIndex = nodes.length - 1;
      return;
    }

    const index = content === 'next' ? this.oldIndex + 1 : this.oldIndex - 1;

    if (index < 0 || index >= nodes.length) {
      const message =
        content === 'next'
          ? 'Sorry there is no JSON Forward'
          : 'Sorry there is no JSON Backward';
      this.toastr.error(message);
      return;
    }

    const node = nodes[index];
    this.decryptData(node);
    this.oldIndex = index;
  }

  oldIndex: number;
  decryptData(data: any) {
    let decryptData = this._encryptionService.decryptData(data?.data);
    this.nodes = this.jsonParseWithObject(decryptData);
  }

  deleteOfflineDb() {
    let data = this.dataService.deleteDb(this.selectApplicationName, this.screenname, "Builder");
  }
  JsonEditorShow() {
    this.iconActive = 'jsonEdit';
    this.IslayerVisible = false;
    this.IsjsonEditorVisible = true;
    this.IsShowConfig = false;
    this.controlListvisible = false;
    this.applySize();
  }
  getAllObjects(data: any): any[] {
    const foundObjects: any[] = [];

    function recursiveFind(currentData: any) {
      if (currentData) {
        foundObjects.push(currentData);

        if (currentData.children && currentData.children.length > 0) {
          for (const child of currentData.children) {
            recursiveFind(child);
          }
        }
      }
    }

    recursiveFind(data);
    return foundObjects;
  }
  updateObjects(data: any) {
    if (data) {
      // Set eventActionconfig to an empty object and appConfigurableEvent to an empty array
      if (data.formly) {
        if (data.formly[0].fieldGroup) {
          data.formly[0].fieldGroup[0].props.appConfigurableEvent = [];
          data.formly[0].fieldGroup[0].props.eventActionconfig = {};
        }
      } else {
        data.eventActionconfig = {};
        data.appConfigurableEvent = [];

        if (data.children && data.children.length > 0) {
          for (let child of data.children) {
            // Recursively update children
            this.updateObjects(child);
          }
        }
      }

    }
  }

  saveJson() {

    if (this.screenPage) {
      // this.saveLoader = true;
      if (this.selectedNode) {
        this.highlightSelect(this.selectedNode.id, false);
      }
      this.applyHighlightSearch(this.nodes[0], false);
      // const selectedScreen = this.screens.filter((a: any) => a.id == this.navigation)
      // Check Grid Data
      let gridData = this.findObjectByTypeBase(this.nodes[0], 'gridList');
      if (gridData) {
        gridData.tableData = [];
        gridData.displayData = [];
        gridData.totalCount = 0;
      }
      // Assuming data is your array of objects
      this.nodes.forEach((item: any) => {
        this.updateObjects(item);
      });
      let newNode = JSON.parse(JSON.stringify(this.nodes))
      this.applyTheme(newNode[0], true)
      // const screendata = this.jsonStringifyWithObject(newNode);
      const screendata = JSON.stringify(newNode);
      const JsonData = {
        json: newNode,
      }
      const data: any = {
        "screendata": newNode,
        "screenname": this.screenname,
        "navigation": this.navigation,
        "screenbuilderid": this.id,
        // "pdf": this.pdf,
        "applicationid": this.selectApplicationName,
      };
      data.navigation = this.navigation;
      const tableValue = `Builders`;
      // this.saveLoader =  false;
      var ResponseGuid: any;
      if (this.builderscreendata?.[0]) {
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [tableValue]: data, metaInfo: metainfocreate }
        this.socketService.Request(Add);
      }
      else {
        const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(this.builderscreendata[0].id);
        ResponseGuid = newUGuid;
        const Update = { [tableValue]: data, metaInfo: metainfoupdate };
        this.socketService.Request(Update)
      }

      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              this.isScreenSaved = true;
              this.toastr.success(res.message, { nzDuration: 3000 });
              this.showActionRule = true;
              if (this.builderscreendata?.length > 0) {
                this.applyTheme(this.nodes[0], false)
                this.applyTheme(this.nodes[0], false)
              } else {
                this.getBuilderScreen();
              }
              if (gridData) {
                // this.getFromQuery(this.navigation, 'load');
              } else {
              }
              this.saveLoader = false;
            }
            else {
              this.toastr.error(res.message, { nzDuration: 3000 });
              this.saveLoader = false;
            }
          }
        },
        error: (err) => {
          this.saveLoader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    } else {
      alert('Please Select Screen');
    }
  }
  expandedKeys: any;
  previousScreenId: string = '';
  builderscreendata: any;
  getscreendata(data: any) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to switch your screen?',
      nzClassName: 'custom-modal-class',
      nzCentered: true,
      nzOnOk: () => {
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
          const objScreen = this.screens.find((x: any) => x.id == data);
          this.navigation = objScreen.navigation;
          this.id = objScreen.id;
          // this.pdf = objScreen.pdf ? objScreen.pdf : false;
          this.screenname = objScreen.name;
          this.isSavedDb = false;
          this.getActions();
          // this.getBuilderScreen();
          this.screenPage = true;
          // this.requestSubscription = this.applicationService.getNestCommonAPI("cp/getuserCommentsByApp/UserComment/pages/" + this.navigation).subscribe((res: any) => {
          //   if (res.isSuccess) {
          //     let commentList = res.data
          //     this.dataSharedService.screenCommentList = commentList;

          //     this.getTaskManagementIssuesFunc(this.navigation, JSON.parse(localStorage.getItem('applicationid')!));
          //   }
          // })
          if (objScreen.name.includes('_header') && this.selectApplicationName) {
            let application = this.applicationData.find((item: any) => item.id == this.selectApplicationName);
            this.dataSharedService.headerLogo = application['image'];
            if (application.application_Type == "website") {
              const { jsonData, newGuid } = this.socketService.makeJsonDataById('CacheMenu', this.currentUser.userId, 'GetModelTypeById');
              this.socketService.Request(jsonData);
              this.socketService.OnResponseMessage().subscribe({
                next: (res: any) => {
                  this.saveLoader = false;
                  if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
                    res = res.parseddata.apidata;
                    this.saveLoader = false;
                    if (res.data.length > 0) {
                      let getApplication: any = JSON.parse(res.data[0].selectedTheme)
                      this.dataSharedService.menus = getApplication;
                      this.dataSharedService.menus.allMenuItems = JSON.parse(res.data[0].menuData);
                    }
                    else {
                      const { jsonData, newGuid } = this.socketService.makeJsonDataById('Menu', application.id, 'GetModelTypeById');
                      this.socketService.Request(jsonData);
                      this.socketService.OnResponseMessage().subscribe({
                        next: (resData: any) => {
                          this.saveLoader = false;
                          if (resData.parseddata.requestId == newGuid && resData.parseddata.isSuccess) {
                            resData = resData.parseddata.apidata;
                            this.saveLoader = false;
                            let getApplication: any = JSON.parse(resData.data[0].selectedTheme)
                            this.dataSharedService.menus = getApplication;
                            this.dataSharedService.menus.allMenuItems = JSON.parse(resData.data[0].menuData);
                          }
                        },
                        error: (err) => {
                          console.error(err);
                          this.saveLoader = false;
                          this.toastr.error(err, { nzDuration: 3000 });
                        }
                      });
                    }
                  }
                },
                error: (err) => {
                  console.error(err);
                  this.saveLoader = false;
                  this.toastr.error(err, { nzDuration: 3000 });
                }
              });
            }
          }
        })
          .catch(() => this.navigation = this.previousScreenId ? this.previousScreenId : this.navigation)
      },
      nzOnCancel: () => {
        this.navigation = this.previousScreenId ? this.previousScreenId : this.navigation;
        console.log('User clicked Cancel');
      }
    });
  }
  actionRuleList: any[] = [];
  getActions() {
    this.saveLoader = true;
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('ActionRule', this.id, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.actionRuleList = res?.data;
          this.getBuilderScreen();
        }
      },
      error: (err) => {
        this.getBuilderScreen();
        console.error(err);
        // this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  getBuilderScreen() {
    this.nodes = [];
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('Builders', this.id, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            // this.form = new FormGroup({});
            if (res.data.length > 0) {
              localStorage.setItem('screenBuildId', res.data[0].screenbuilderid);
              this.builderscreendata = [res.data[0]];
              // this.navigation = '';
              this.showActionRule = true;
              const objScreenData = res.data[0].screendata;
              this.isSavedDb = true;
              // this.moduleId = res[0].moduleId;
              // this.formlyModel = {};
  
              let objscreendata = this.jsonParseWithObject(this.jsonStringifyWithObject(objScreenData));
              this.applyTheme(objscreendata[0], false)
              if (this.actionRuleList && this.actionRuleList.length > 0) {
                let getInputs = this.filterInputElements(objscreendata);
                if (getInputs && getInputs.length > 0) {
                  getInputs.forEach((node) => {
                    const formlyConfig = node.formly?.[0]?.fieldGroup?.[0]?.key;
                    for (let index = 0; index < this.actionRuleList.length; index++) {
                      const element = this.actionRuleList[index];
                      if (formlyConfig == element.componentfrom) {
                        const eventActionConfig = node?.formly?.[0]?.fieldGroup?.[0]?.props;
                        if (eventActionConfig) {
                          if (index == 0) {
                            eventActionConfig['appConfigurableEvent'] = [];
                            eventActionConfig['eventActionconfig'] = {};
                          }
                          if (element.action == 'load') {
                            eventActionConfig['eventActionconfig'] = {};
                            eventActionConfig['eventActionconfig'] = element;
                          }
                          else {
                            if (eventActionConfig['appConfigurableEvent']) {
                              eventActionConfig['appConfigurableEvent'].push(element);
                            } else {
                              eventActionConfig['appConfigurableEvent'] = [];
                              eventActionConfig['appConfigurableEvent'].push(element);
                            }
                          }
                        }
                      }
                      // else {
                      //   const eventActionConfig = node?.formly?.[0]?.fieldGroup?.[0]?.props;
                      //   if (eventActionConfig) {
                      //     eventActionConfig['appConfigurableEvent'] = [];
                      //     eventActionConfig['eventActionconfig'] = {};
                      //   }
                      // }
                    }
                  });
                }
  
                let checkFirst: any = {};
                for (let index = 0; index < this.actionRuleList.length; index++) {
                  const element = this.actionRuleList[index];
                  let findObj = this.findObjectByKey(objscreendata[0], element.componentfrom);
                  if (findObj) {
                    if (findObj?.key == element.componentfrom) {
                      if (!checkFirst[findObj?.key]) {
                        findObj['appConfigurableEvent'] = [];
                        findObj['eventActionconfig'] = {};
                        checkFirst[findObj?.key] = "done";
                      }
                      if (element.action == 'load') {
                        findObj.eventActionconfig = element;
                      }
                      else {
                        if (findObj['appConfigurableEvent']) {
                          findObj['appConfigurableEvent'].push(element);
                        } else {
                          findObj['appConfigurableEvent'] = [];
                          findObj['appConfigurableEvent'].push(element);
                        }
                      }
                    }
                    // else {
                    //   findObj['appConfigurableEvent'] = [];
                    //   findObj['eventActionconfig'] = {};
                    // }
                  }
                }
                this.nodes = objscreendata;
              }
              else
                this.nodes = objscreendata;
  
  
              // if (!this.nodes[0].isLeaf) {
              //   this.addOrRemoveisLeaf(this.nodes[0]);
              // }
              // this.updateNodes();
              this.getJoiValidation(this.id);
              this.saveLoader = false;
              // this.getFromQuery(res.data[0].navigation, 'get');
              // if (res[0].menuData[0].children[1]) {
  
              //   // this.uiRuleGetData(res[0].moduleId);
              //   // this.uiGridRuleGetData(res[0].moduleId);
              // }
              // else {
              //   this.navigation = res[0].id;
              //   this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(res[0].menuData));
              //   // this.uiRuleGetData(res[0].moduleId);
              //   // this.uiGridRuleGetData(res[0].moduleId);
              // }
              this.dataSharedService.screenCommentList.forEach(element => {
                this.assignIssue(this.nodes[0], element);
              });
  
            }
            else {
              // this.navigation = 0;
              // this.clearChildNode();
              this.builderscreendata = [];
              const { jsonData, newGuid } = this.socketService.makeJsonData('GetSampleScreen', 'GetSampleScreen');
              this.socketService.Request(jsonData);
              this.socketService.OnResponseMessage().subscribe({
                next: (res: any) => {
                  if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
                    res = res.parseddata.apidata;
                    if (res.isSuccess) {
                      if (res.data.length > 0) {
                        const objscreendata = JSON.parse(res.data[0].data.screendata);
                        this.isSavedDb = true;
                        // this.formlyModel = [];
                        this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(objscreendata?.json));
                        this.updateNodes();
                        this.applyDefaultValue();
                        this.saveLoader = false;
                      }
                    }
                    else {
                      this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
                      this.saveLoader = false;
                    }
                  }
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                  this.saveLoader = false;
                }
              });
            }
            this.isSavedDb = true;
            // this.formModalData = {};
            this.getUIRuleData(true);
            this.getBusinessRule();
            this.expandedKeys = this.nodes.map((node: any) => node.key);
            this.uiRuleGetData(this.screenname);
            this.updateNodes();
            this.applyDefaultValue();
            // this.requestSubscription = this.applicationService.getNestCommonAPI('cp/applicationTheme').subscribe({
            //   next: (res: any) => {
            //     if (res.isSuccess) {
            //       if (res.data.length > 0) {
            //         this.applicationThemeClasses = res.data;
            //         this.applyApplicationThemeClass();
            //       }
            //     }
            //     else {
            //       this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
            //       this.saveLoader = false;
            //     }
            //   },
            //   error: (err) => {
            //     console.error(err); // Log the error to the console
            //     this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
            //     this.saveLoader = false;
            //   }
            // });
          } else {
            this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
            this.saveLoader = false;
          }
        }
        
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        this.saveLoader = false;
      }
    });
  }
  private addClasses(tagName: string, classesToAdd: string[]): void {
    // const elements = this.el.nativeElement.querySelectorAll(tagName);

    // elements.forEach((element: HTMLElement) => {
    //   const existingClasses = Array.from(element.classList);

    //   classesToAdd.forEach(classToAdd => {
    //     // Split the class name by the '-' character
    //     const [prefix] = classToAdd.split('-');

    //     // Check if the prefix already exists in the element's classes
    //     const prefixExists = existingClasses.some(existingClass => existingClass.startsWith(prefix));

    //     if (!prefixExists) {
    //       // If the prefix doesn't exist, add the new class
    //       this.renderer.addClass(element, classToAdd);
    //     }
    //   });
    // });
  }


  private addClass(tagName: string, classes: string): void {
    const elements = this.el.nativeElement.querySelectorAll(tagName);

    elements.forEach((element: HTMLElement) => {
      const classList = classes.split(' ');
      classList.forEach((className: string) => {
        this.renderer.addClass(element, className);
      });
    });
  }
  applyDefaultValue() {
    let newMode: any = {};
    const filteredNodes = this.filterInputElements(this.nodes);
    filteredNodes.forEach((node) => {
      const formlyConfig = node.formly?.[0]?.fieldGroup?.[0]?.defaultValue;
      newMode[node?.formly?.[0]?.fieldGroup?.[0]?.key] =
        formlyConfig;
    });
    this.formlyModel = newMode;
    this.form.patchValue(this.formlyModel);
  }
  clearChildNode() {
    this.iconActive = 'clearChildNode';
    this.addControl = true;
    this.isSavedDb = false;
    this.showNotification = false;

    if (this.screenPage) {
      this.formlyModel = [];
      const newNode = [
        {
          id: this.screenname + '_' + 'page_' + Guid.newGuid(),
          key: 'page_' + Guid.newGuid(),
          treeExpandIcon: 'fa-regular fa-file-text',
          treeInExpandIcon: 'fa-regular fa-file-text',
          title: 'page',
          type: 'page',
          footer: false,
          header: false,
          options: [
            {
              VariableName: '',
            },
          ],
          expanded: false,
          isNextChild: true,
          children: [],
        } as TreeNode,
      ];
      this.nodes = newNode;
      this.selectedNode = newNode[0];
      this.addControlToJson('pageHeader', null, true);
      this.addControlToJson('pageBody', null, true);
      this.selectedNode = this.sectionBageBody;
      this.addControlToJson('sections', null, true);
      this.selectedNode = this.sections;
      this.addControlToJson('header', null, true);
      this.addControlToJson('body', null, true);
      this.addControlToJson('footer', null, true);
      this.selectedNode = newNode[0];
      this.addControlToJson('pageFooter', null, true);
      this.addControl = false;
      this.selectedNode = this.sectionAccorBody;
      this.addControlToJson('text', this.textJsonObj, true);
      this.updateNodes();
      this.saveOfflineDB();
      this.isSavedDb = true;
      this.showNotification = true;
      this.toastr.success('Control Added', { nzDuration: 3000 });
    } else {
      alert('Please Select Screen');
    }
  }
  textJsonObj = {
    parameter: 'input',
    icon: 'uil uil-text',
    label: 'Input',
    type: 'input',
    fieldType: 'input',
    configType: 'input',
    treeExpandIcon: 'fa-regular fa-t',
    treeInExpandIcon: 'fa-regular fa-t',
    isLeaf: true
  };
  downloadJson() {
    if (!this.screenPage) {
      this.toastr.warning('Please Select Screen', { nzDuration: 3000 });
      return;
    }
    if (this.selectedNode) {
      this.highlightSelect(this.selectedNode.id, false);
    }
    this.applyHighlightSearch(this.nodes[0], false);
    var currentData = this.jsonParse(this.jsonStringifyWithObject(this.nodes));
    // JSON.parse(
    //   JSON.stringify(this.nodes, function (key, value) {
    //     if (typeof value == 'function') {
    //       return value.toString();
    //     } else {
    //       return value;
    //     }
    //   }) || '{}');

    const selectedScreen = this.screens.filter((a: any) => a.name == this.screenname)
    var data =
    {
      "screenname": this.screenname,
      "screendata": currentData,
      "navigation": this.navigation
    };

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  selectForDropdown: any;
  sections: TreeNode;
  sectionBageBody: TreeNode;
  sectionAccorBody: TreeNode;
  stepperAdd: TreeNode;
  ParentAdd: TreeNode;
  stepperChild: TreeNode;
  childAdd: TreeNode;
  screendata: any;
  businessRuleData: any;
  formlyModel: any;
  faker: boolean = false;
  makeFaker(check?: boolean) {
    debugger
    this.iconActive = 'faker';
    let dataModelFaker: any = [];
    if (this.nodes.length > 0) {
      const filteredNodes = this.filterInputElements(this.nodes);
      filteredNodes.forEach((node) => {
        dataModelFaker[node.formly[0].fieldGroup[0].key] =
          this.makeFakerData(node, check);
      });
    }
    // this.formlyModel = dataModelFaker;
    this.assignValues(dataModelFaker);
    console.log(this.formlyModel);
    this.form.patchValue(this.formlyModel);
  }
  makeFakerData(V2: any, check?: any) {
    if (V2.formly[0].fieldGroup[0].props) {
      let modelFaker: any;
      if (check) {
        if (V2.formly[0].fieldGroup[0].props.type) {
          if (V2.formly[0].fieldGroup[0].type == 'input') {
            modelFaker = faker.name.firstName()
          } else if (V2.formly[0].fieldGroup[0].type == 'textarea') {
            modelFaker = faker.lorem.paragraph()
          } else if (V2.formly[0].fieldGroup[0].type == 'inputGroupGrid') {
            modelFaker = faker.name.firstName()
          } else if (V2.formly[0].fieldGroup[0].props.type == 'password') {
            modelFaker = faker.name.firstName()
          } else if (V2.formly[0].fieldGroup[0].props.type == 'tel') {
            modelFaker = faker.phone.number()
          } else if (V2.formly[0].fieldGroup[0].props.type == 'date') {
            modelFaker = faker.date.between('01/01/2001', '01/01/2001');
          } else if (V2.formly[0].fieldGroup[0].props.type == 'email') {
            modelFaker = faker.internet.email()
          } else if (V2.formly[0].fieldGroup[0].props.type == 'checkbox') {
            modelFaker = faker.datatype.boolean()
          } else if (V2.formly[0].fieldGroup[0].props.type == 'radio') {
            modelFaker = faker.datatype.boolean()
          } else if (V2.formly[0].fieldGroup[0].props.type == 'number') {
            modelFaker = 1
            // modelFaker = faker.datatype.number(10)
          } else if (V2.formly[0].fieldGroup[0].props.type == 'decimal') {
            modelFaker = 0.0
            // modelFaker = faker.datatype.float({ min: 10, max: 100, precision: 0.001 })
          } else if (V2.formly[0].fieldGroup[0].props.type == 'month') {
            modelFaker = faker.date.month({ abbr: true, context: true })
          } else if (V2.formly[0].fieldGroup[0].props.type == 'datetime-local') {
            modelFaker = faker.datatype.datetime(1893456000000)
          } else if (V2.formly[0].fieldGroup[0].props.type == 'color') {
            modelFaker = faker.color.colorByCSSColorSpace()
          }
        } else if (V2.formly[0].fieldGroup[0].type) {
          if (V2.formly[0].fieldGroup[0].type == 'input') {
            modelFaker = faker.name.firstName()
          } else if (V2.formly[0].fieldGroup[0].type == 'textarea') {
            modelFaker = faker.lorem.paragraph()
          } else if (V2.formly[0].fieldGroup[0].type == 'inputGroupGrid') {
            modelFaker = faker.name.firstName()
          }
        }
      }

      return modelFaker;
    }
  }
  uiRuleGetData(screenId: any) {
    let dataModelFaker: any = [];
    if (this.nodes.length > 0) {
      const filteredNodes = this.filterInputElements(this.nodes);
      // filteredNodes.forEach((node) => {
      //   dataModelFaker[node.formly[0].fieldGroup[0].key] =
      //     this.makeFakerData(node, true);
      // });
      filteredNodes.forEach((node) => {
        dataModelFaker[node.formly[0].fieldGroup[0].key] =
          '';
      });
    }
    this.formlyModel = dataModelFaker;
    this.updateFormlyModel();
    this.checkConditionUIRule(
      { key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' },
      ''
    );
    // this.getUIRuleData();
  }
  evalConditionRule(query: any, dataTargetIfValue: any) {
    dataTargetIfValue.forEach((e: any) => {
      let type = e.conditonType == 'AND' ? '&&' : '||';
      type = query == '' ? '' : type;
      let getModelValue =
        this.formlyModel[e.ifMenuName] == ''
          ? "''"
          : this.formlyModel[e.ifMenuName];
      if (getModelValue == undefined) getModelValue = '';

      if (e.condationName == 'contains') {
        if (
          this.formlyModel[e.ifMenuName] != undefined &&
          this.formlyModel[e.ifMenuName].includes(e.targetValue)
        )
          query = query + ' ' + type + ' ' + '1 == 1';
        else query = query + ' ' + type + ' ' + '1 == 2';
      } else if (e.condationName == 'null') {
        if (typeof this.formlyModel[e.ifMenuName] != 'number') {
          if (
            this.formlyModel[e.ifMenuName] == '' ||
            this.formlyModel[e.ifMenuName] == null
          )
            query = query + ' ' + type + ' ' + '1 == 1';
          else query = query + ' ' + type + ' ' + '1 == 2';
        } else query = query + ' ' + type + ' ' + '1 == 2';
      } else {
        if (
          e.ifMenuName.includes('number') ||
          e.ifMenuName.includes('decimal')
        ) {
          query =
            query +
            ' ' +
            type +
            ' ' +
            Number(getModelValue) +
            ' ' +
            e.condationName +
            ' ' +
            e.targetValue;
        } else {
          query =
            query +
            ' ' +
            type +
            " '" +
            getModelValue +
            "' " +
            e.condationName +
            " '" +
            e.targetValue +
            "'";
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
  validationRuleId: string = '';
  getJoiValidation(id: any) {
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('ValidationRule', id, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        this.saveLoader = false;
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.saveLoader = false;
          if (res.data.length > 0) {
            this.validationRuleId = res.data[0].id;
            this.joiValidationData = res.data;
          }
          else
            this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
        }
      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }
    });
  }
  getUIRuleData(data: any) {
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('UiRule', this.id, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        this.saveLoader = false;
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.saveLoader = false;
          if (res.data.length > 0) {
            const jsonUIResult = {
              // "key": this.selectedNode.chartCardConfig?.at(0)?.buttonGroup == undefined ? this.selectedNode.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.key : this.selectedNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
              // "key": this.selectedNode.key,
              // "title": this.selectedNode.title,
              "screenname": this.screenname,
              "screenbuilderid": this.id,
              "uiData": res.data[0].uidata,
            }
            this.screendata = jsonUIResult;
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }
    });
  }
  performBulkUpdate(updateType: string) {
    if (!this.screenPage) {
      this.toastr.warning('Please Select Screen', { nzDuration: 3000 });
      return;
    }
    if (this.nodes.length > 0) {
      let nzWidth = '70%'; // default width
      let componentType: any;

      switch (updateType) {
        case 'default':
          componentType = BulkUpdateComponent;
          break;
        case 'headingParagraph':
          componentType = HeadingParagrapghUpdateComponent;
          nzWidth = '70%';
          break;
        case 'other':
          componentType = OtherBulkUpdateComponent;
          nzWidth = '70%';
          break;
        default:
          console.error('Invalid bulk update type');
          return;
      }

      const drawerRef = this.drawerService.create<any, { value: string }, string>({
        nzWidth: nzWidth,
        nzContent: componentType,
        nzContentParams: {
          nodes: this.nodes,
          types: this.formlyTypes,
          screenname: this.screenname,
        },
      });

      drawerRef.afterOpen.subscribe(() => {
        console.log('Drawer(Component) open');
      });

      drawerRef.afterClose.subscribe((data: any) => {
        console.log(data);
        if (data) {
          if (data.nodes) this.nodes = data.nodes;
          if (data.formlyModel) this.formlyModel = data.formlyModel;
          this.updateNodes();
          this.cdr.detectChanges();
        }
      });
    } else {
      this.toastr.error('Please select Screen first', { nzDuration: 3000 });
    }
  }


  getUIRule(model: any, currentValue: any) {

    try {
      if (this.screendata != undefined) {
        var inputType =
          this.nodes[0].children[1].children[0].children[1].children;
        for (let index = 0; index < this.screendata.uiData.length; index++) {
          if (model.key == this.screendata.uiData[index].ifMenuName) {
            let query: any;
            let getModelValue =
              this.formlyModel[this.screendata.uiData[index].ifMenuName] == ''
                ? false
                : this.formlyModel[this.screendata.uiData[index].ifMenuName];
            if (this.screendata.uiData[index].condationName == 'contains') {
              if (
                this.formlyModel[this.screendata.uiData[index].ifMenuName] !=
                undefined &&
                this.formlyModel[
                  this.screendata.uiData[index].ifMenuName
                ].includes(this.screendata.uiData[index].targetValue)
              ) {
                query = '1 == 1';
                query = this.evalConditionRule(
                  query,
                  this.screendata.uiData[index].targetIfValue
                );
              } else {
                query = '1 == 2';
                query = this.evalConditionRule(
                  query,
                  this.screendata.uiData[index].targetIfValue
                );
              }
            } else if (this.screendata.uiData[index].condationName == 'null') {
              if (
                typeof this.formlyModel[
                this.screendata.uiData[index].ifMenuName
                ] != 'number'
              ) {
                if (
                  this.formlyModel[this.screendata.uiData[index].ifMenuName] ==
                  '' ||
                  this.formlyModel[this.screendata.uiData[index].ifMenuName] ==
                  null
                ) {
                  query = '1 == 1';
                  query = this.evalConditionRule(
                    query,
                    this.screendata.uiData[index].targetIfValue
                  );
                } else {
                  query = '1 == 2';
                  query = this.evalConditionRule(
                    query,
                    this.screendata.uiData[index].targetIfValue
                  );
                }
              } else {
                query = '1 == 2';
                query = this.evalConditionRule(
                  query,
                  this.screendata.uiData[index].targetIfValue
                );
              }
            } else {
              if (
                this.screendata.uiData[index].ifMenuName.includes('number') ||
                this.screendata.uiData[index].ifMenuName.includes('decimal')
              ) {
                query =
                  Number(getModelValue) +
                  ' ' +
                  this.screendata.uiData[index].condationName +
                  ' ' +
                  this.screendata.uiData[index].targetValue;

                query = this.evalConditionRule(
                  query,
                  this.screendata.uiData[index].targetIfValue
                );
              } else {
                query =
                  "'" +
                  getModelValue +
                  "' " +
                  this.screendata.uiData[index].condationName +
                  " '" +
                  this.screendata.uiData[index].targetValue +
                  "'";

                query = this.evalConditionRule(
                  query,
                  this.screendata.uiData[index].targetIfValue
                );
              }
            }
            if (eval(query)) {
              const check = this.makeUIJSONForSave(
                this.screendata,
                index,
                inputType,
                true
              );
              this.nodes[0].children[1].children[0].children[1].children =
                check;
              this.updateNodes();
              this.updateFormlyModel();
              // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
            } else {
              const check = this.makeUIJSONForSave(
                this.screendata,
                index,
                inputType,
                false
              );
              this.nodes[0].children[1].children[0].children[1].children =
                check;
              this.updateNodes();
              this.updateFormlyModel();
              // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
            }
          }
        }
      } else {
        // this.updateFormlyModel();
        // Object.assign([],this.formlyModel)
        // this.updateNodes();
        // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (this.businessRuleData && this.businessRuleData.length > 0) {
        this.updateNodes();
        this.updateFormlyModel();
        // this.cdr.detectChanges();
      }
      this.getSetVariableRule(model, currentValue);
    }
  }
  getSetVariableRule(model: any, value: any) {
    // for grid amount assign to other input field
    const filteredNodes = this.filterInputElements(this.nodes);
    filteredNodes.forEach((node) => {
      const formlyConfig =
        node.formly?.[0]?.fieldGroup?.[0]?.props['additionalProperties'];
      if (formlyConfig)
        if (formlyConfig.setVariable != '' && formlyConfig.setVariable)
          if (model?.props['additionalProperties']?.getVariable != '')
            if (
              formlyConfig?.setVariable ===
              model?.props['additionalProperties']?.getVariable
            ) {
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
    this.formlyModel = Object.assign({}, this.formlyModel);
  }
  getBusinessRule() {
    const selectedScreen = this.screens.filter(
      (a: any) => a.name == this.screenname
    );
    if (selectedScreen.length > 0) {
      const { jsonData, newGuid } = this.socketService.makeJsonDataById('BusinessRule', this.id, 'GetModelTypeById');
      this.socketService.Request(jsonData);
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess)
              if (res.data.length > 0) {
                this.businessRuleData = [];
                if (res.data[0].buisnessRule) {
                  this.businessRuleData = JSON.parse(res.data[0].buisnessRule)
                }
              } else {
                this.businessRuleData = [];
              }
            else
              this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
          }

        },
        error: (err) => {
          console.error(err);
          this.saveLoader = false;
        }
      });
    }
  }
  lastFormlyModelValue: string;
  makeUIJSONForSave(
    screendata: any,
    index: number,
    inputType: any,
    currentValue: boolean
  ) {
    for (let k = 0; k < screendata.uiData[index].targetCondition.length; k++) {
      for (let l = 0; l < inputType.length; l++) {
        if (
          inputType[l].type == 'button' ||
          inputType[l].type == 'linkbutton' ||
          inputType[l].type == 'dropdownButton'
        ) {
          if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          ) {
            inputType[l] =
              this.screendata.uiData[index].targetCondition[k].inputJsonData;
          } else if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l] =
              this.screendata.uiData[index].targetCondition[k].inputOldJsonData;
        } else if (inputType[l].type == 'buttonGroup') {
          if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          )
            inputType[l].children =
              this.screendata.uiData[index].targetCondition[k].inputJsonData;
          else if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l].children =
              this.screendata.uiData[index].targetCondition[k].inputOldJsonData;
        } else if (
          inputType[l].type == 'input' ||
          inputType[l].type == 'inputGroup' ||
          inputType[l].type == 'number' ||
          inputType[l].type == 'checkbox' ||
          inputType[l].type == 'color' ||
          inputType[l].type == 'decimal' ||
          inputType[l].type == 'image' ||
          inputType[l].type == 'multiselect' ||
          inputType[l].type == 'radiobutton' ||
          inputType[l].type == 'search' ||
          inputType[l].type == 'repeatSection' ||
          inputType[l].type == 'tags' ||
          inputType[l].type == 'telephone' ||
          inputType[l].type == 'textarea' ||
          inputType[l].type == 'date' ||
          inputType[l].type == 'datetime' ||
          inputType[l].type == 'month' ||
          inputType[l].type == 'time' ||
          inputType[l].type == 'week'
        ) {
          if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].formly[0].fieldGroup[0].key &&
            currentValue
          ) {
            inputType[l].formly[0].fieldGroup[0] =
              this.screendata.uiData[index].targetCondition[k].inputJsonData;
            inputType[l].formly[0].fieldGroup[0].defaultValue =
              this.screendata.uiData[index].targetCondition[
                k
              ].inputJsonData.defaultValue;
          } else if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].formly[0].fieldGroup[0].key &&
            !currentValue
          ) {
            inputType[l].formly[0].fieldGroup[0] =
              this.screendata.uiData[index].targetCondition[k].inputOldJsonData;
            inputType[l].formly[0].fieldGroup[0].defaultValue =
              this.screendata.uiData[index].targetCondition[
                k
              ].inputOldJsonData.defaultValue;
          }
        } else if (
          inputType[l].type == 'alert' ||
          inputType[l].type == 'header' ||
          inputType[l].type == 'paragraph' ||
          inputType[l].type == 'tag' ||
          inputType[l].type == 'card' ||
          inputType[l].type == 'simpleCardWithHeaderBodyFooter' ||
          inputType[l].type == 'cascader' ||
          inputType[l].type == 'mentions' ||
          inputType[l].type == 'transfer' ||
          inputType[l].type == 'treeSelect' ||
          inputType[l].type == 'switch' ||
          inputType[l].type == 'avatar' ||
          inputType[l].type == 'badge' ||
          inputType[l].type == 'treeView' ||
          inputType[l].type == 'carouselCrossfade' ||
          inputType[l].type == 'comment' ||
          inputType[l].type == 'description' ||
          inputType[l].type == 'statistic' ||
          inputType[l].type == 'empty' ||
          inputType[l].type == 'list' ||
          inputType[l].type == 'popConfirm' ||
          inputType[l].type == 'timeline' ||
          inputType[l].type == 'popOver' ||
          inputType[l].type == 'imageUpload' ||
          inputType[l].type == 'invoice' ||
          inputType[l].type == 'segmented' ||
          inputType[l].type == 'drawer' ||
          inputType[l].type == 'message' ||
          inputType[l].type == 'notification' ||
          inputType[l].type == 'modal' ||
          inputType[l].type == 'progressBar' ||
          inputType[l].type == 'result' ||
          inputType[l].type == 'skeleton' ||
          inputType[l].type == 'spin' ||
          inputType[l].type == 'accordionButton' ||
          inputType[l].type == 'contactList' ||
          inputType[l].type == 'audio' ||
          inputType[l].type == 'multiFileUpload' ||
          inputType[l].type == 'rate' ||
          inputType[l].type == 'toastr' ||
          inputType[l].type == 'video'
        ) {
          if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          )
            inputType[l] =
              this.screendata.uiData[index].targetCondition[k].inputJsonData;
          else if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l] =
              this.screendata.uiData[index].targetCondition[k].inputOldJsonData;
        } else if (inputType[l].type == 'mainDashonicTabs') {
          for (let m = 0; m < inputType[l].children.length; m++) {
            if (
              this.screendata.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].key &&
              currentValue
            )
              inputType[l].children[m] =
                this.screendata.uiData[index].targetCondition[k].inputJsonData;
            else if (
              this.screendata.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].key &&
              !currentValue
            )
              inputType[l].children[m] =
                this.screendata.uiData[index].targetCondition[
                  k
                ].inputOldJsonData;
          }
        } else if (inputType[l].type == 'stepperMain') {
          for (let m = 0; m < inputType[l].children.length; m++) {
            if (
              this.screendata.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].formly[0].fieldGroup[0].key &&
              currentValue
            )
              inputType[l].children[m] =
                this.screendata.uiData[index].targetCondition[k].inputJsonData;
            else if (
              this.screendata.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].formly[0].fieldGroup[0].key &&
              !currentValue
            )
              inputType[l].children[m] =
                this.screendata.uiData[index].targetCondition[
                  k
                ].inputOldJsonData;
          }
        } else if (
          inputType[l].type == 'gridList' ||
          inputType[l].type == 'gridListEditDelete'
        ) {
          if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          )
            inputType[l] =
              this.screendata.uiData[index].targetCondition[k].inputJsonData;
          else if (
            this.screendata.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l] =
              this.screendata.uiData[index].targetCondition[k].inputOldJsonData;
        }
      }
    }
    return inputType;
  }
  columnApply(value: any) {
    if (
      value == 'sections' ||
      value == 'calender' ||
      value == 'mainStep' ||
      value == 'mainTab' ||
      value == 'kanban' ||
      value == 'timeline' ||
      value == 'gridList' ||
      value == 'accordionButton' ||
      value == 'contactList' ||
      value == 'fileManager' ||
      value == 'header' ||
      value == 'email' ||
      value == 'email'
    )
      return 'w-full';
    else if (value == 'body') return 'px-6 pt-6 pb-10';
    else if (value == 'footer') return '';
    else if (value == 'buttonGroup') return 'w-11/12';
    else return 'sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2';
  }
  addControlToJson(value: string, data?: any, allow?: any) {
    let obj = {
      type: data?.parameter,
      title: value,
      key: value.toLowerCase() + '_' + Guid.newGuid(),
      isSubmit: false,
    };
    if (data?.parameter === 'input') {
      obj.title = data?.label;
      obj.key = data?.configType.toLowerCase() + '_' + Guid.newGuid();
    }
    if (this.addControl) {
      this.controls(value, data, obj, null, true);
    }
    else {
      const modal =
        this.modalService.create<AddControlCommonPropertiesComponent>({
          nzTitle: 'Change Control Value',
          nzWidth: '550px',
          nzContent: AddControlCommonPropertiesComponent,
          nzViewContainerRef: this.viewContainerRef,
          nzComponentParams: {
            model: obj,
          },
          // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
          nzFooter: [],
        });
      const instance = modal.getContentComponent();
      modal.afterClose.subscribe((res) => {
        if (res) {
          this.controls(value, data, obj, res, true);
        }
      });
    }
  }
  controls(value: any, data: any, obj?: any, res?: any, allow?: any) {
    if (
      value == 'stepperMain' ||
      value == 'tabsMain' ||
      value == 'mainDashonicTabs' ||
      value == 'kanban'
    ) {
      this.selectForDropdown = this.selectedNode;
    }
    let node = this.selectedNode;
    let newNode: any = {};
    let formlyId = this.navigation + '_' + value.toLowerCase() + '_' + Guid.newGuid();

    if (data?.parameter == 'input') {
      newNode = {
        id: formlyId,
        className: this.columnApply(value),
        expanded: true,
        type: value,
        title: res?.title ? res.title : obj.title,
        children: [],
        tooltip: '',
        hideExpression: false,
        highLight: false,
        copyJsonIcon: false,
        treeExpandIcon: data?.treeExpandIcon,
        treeInExpandIcon: data?.treeInExpandIcon,
        isLeaf: true,
        apiUrl: '',
      };
    } else {
      newNode = {
        key: res?.key ? res.key : obj.key,
        id: this.navigation + '_' + value.toLowerCase() + '_' + Guid.newGuid(),
        className: this.columnApply(value),
        expanded: true,
        type: value,
        title: res?.title ? res.title : obj.title,
        children: [],
        tooltip: '',
        tooltipIcon: 'question-circle',
        hideExpression: false,
        highLight: false,
        copyJsonIcon: false,
        treeExpandIcon: data?.treeExpandIcon,
        treeInExpandIcon: data?.treeInExpandIcon,
        isLeaf: data?.isLeaf,
      };
    }
    if (
      value == 'insertButton' ||
      value == 'updateButton' ||
      value == 'deleteButton' ||
      value == 'downloadButton'

    ) {
      newNode.isSubmit = res?.isSubmit || false;
    }
    if (value == 'invoiceGrid') {
      newNode.type = 'gridList';
      newNode.id =
        this.screenname + '_' + 'gridList'.toLowerCase() + '_' + Guid.newGuid();
    }
    if (allow) {
      switch (value) {
        case 'page':
          newNode = { ...newNode, ...this.addControlService.getPageControl() };
          break;
        // case 'headerLogo':
        //   newNode = { ...newNode, ...this.addControlService.headerLogoControl() };
        //   break;
        case 'pageHeader':
          newNode = {
            ...newNode,
            ...this.addControlService.getPageHeaderControl(),
          };
          break;
        case 'pageBody':
          newNode = {
            ...newNode,
            ...this.addControlService.getPageBodyControl(),
          };
          this.sectionBageBody = newNode;
          break;
        case 'pageFooter':
          newNode = {
            ...newNode,
            ...this.addControlService.getPageFooterControl(),
          };
          break;
        case 'sections':
          newNode = { ...newNode, ...this.addControlService.getSectionControl() };
          this.sections = newNode;
          break;
        case 'header':
          newNode = { ...newNode, ...this.addControlService.getHeaderControl() };
          break;
        case 'body':
          newNode = { ...newNode, ...this.addControlService.getBodyControl() };
          this.sectionAccorBody = newNode;
          break;
        case 'footer':
          newNode = { ...newNode, ...this.addControlService.getFooterControl() };
          break;
        case 'taskManagerComment':
          newNode = { ...newNode, ...this.addControlService.getTaskManagerCommentControl() };
          break;
        case 'header_1':
          newNode = {
            ...newNode,
            ...this.addControlService.getHeader1(newNode, this.screenname),
          };
          break;
        case 'header_2':
          newNode = {
            ...newNode,
            ...this.addControlService.getHeader_2(newNode, this.screenname),
          };
          break;
        case 'header_3':
          newNode = {
            ...newNode,
            ...this.addControlService.getHeade_3(newNode, this.screenname),
          };
          break;
        case 'header_4':
          newNode = {
            ...newNode,
            ...this.addControlService.getHeader_4(newNode, this.screenname),
          };
          break;
        case 'header_5':
          newNode = {
            ...newNode,
            ...this.addControlService.getHeader_5(newNode, this.screenname),
          };
          break;
        case 'header_6':
          newNode = {
            ...newNode,
            ...this.addControlService.getHeader_6(newNode, this.screenname),
          };
          break;
        case 'header_7':
          newNode = {
            ...newNode,
            ...this.addControlService.getHeader_7(newNode, this.screenname),
          };
          break;
        case 'pricing':
          newNode = {
            ...newNode,
            ...this.addControlService.getwebistepricing(newNode, this.screenname),
          };
          break;
        case 'buttonGroup':
          newNode = {
            ...newNode,
            ...this.addControlService.getButtonGroupControl(),
          };
          break;
        case 'insertButton':
        case 'updateButton':
        case 'downloadButton':
        case 'deleteButton':
          newNode = {
            ...newNode,
            ...this.addControlService.getInsertButtonControl(value, data),
          };
          break;
        case 'dropdownButton':
          newNode = {
            ...newNode,
            ...this.addControlService.getDropdownButtonControl(),
          };
          break;
        case 'menu':
          newNode = { ...newNode, ...this.addControlService.getMenuControl() };
          break;
        case 'linkbutton':
          newNode = {
            ...newNode,
            ...this.addControlService.getLinkbuttonControl(),
          };
          break;
        case 'cardWithComponents':
          newNode = {
            ...newNode,
            ...this.addControlService.getCardWithComponentsControl(),
          };
          break;
        case 'switch':
          newNode = { ...newNode, ...this.addControlService.getSwitchControl() };
          break;
        case 'imageUpload':
          newNode = {
            ...newNode,
            ...this.addControlService.getImageUploadControl(),
          };
          break;
        case 'progressBar':
          newNode = {
            ...newNode,
            ...this.addControlService.getProgressBarControl(),
          };
          break;
        case 'video':
          newNode = { ...newNode, ...this.addControlService.getVideoControl() };
          break;
        case 'audio':
          newNode = { ...newNode, ...this.addControlService.getAudioControl() };
          break;
        case 'carouselCrossfade':
          newNode = {
            ...newNode,
            ...this.addControlService.getCarouselCrossfadeControl(),
          };
          this.ParentAdd = newNode;
          break;
        case 'subCarouselCrossfade':
          newNode = {
            ...newNode,
            ...this.addControlService.getsubCarouselCrossfadeControl(),
          };
          this.childAdd = newNode;
          break;
        case 'calender':
          newNode = {
            ...newNode,
            ...this.addControlService.getCalenderControl(),
          };
          break;
        case 'sharedMessagesChart':
          newNode = {
            ...newNode,
            ...this.addControlService.getSharedMessagesChartControl(),
          };
          break;
        case 'alert':
          newNode = { ...newNode, ...this.addControlService.getAlertControl() };
          break;
        case 'fileManager':
          newNode = { ...newNode, ...this.addControlService.getFileManagerControl() };
          break;
        case 'chat':
          newNode = { ...newNode, ...this.addControlService.getChatControl() };
          break;
        case 'email_template':
          newNode = { ...newNode, ...this.addControlService.getEmailControl() };
          break;
        case 'taskManager':
          newNode = { ...newNode, ...this.addControlService.getTaskManagerControl() };
          break;
        case 'repeatableControll':
          let formlyObj = {
            isNextChild: true,
            type: data?.configType,
            formlyType: 'input',
            hideExpression: false,
            title: res?.title ? res.title : obj.title,
            formly: [
              {
                fieldGroup: [
                  {
                    key: res?.key ? res.key : obj.key,
                    type: data?.type,
                    defaultValue: '',
                    focus: false,
                    id: formlyId.toLowerCase(),
                    wrappers: this.getLastNodeWrapper('wrappers'),
                    props: {
                      multiple: true,
                      className: 'sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2',
                      attributes: {
                        autocomplete: 'off',
                      },
                      additionalProperties: {
                        getVariable: '',
                        setVariable: '',
                        addonLeft: '',
                        addonRight: '',
                        // addonLeftIcon: '',
                        // addonrightIcon: '',
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
                        wrapper: this.getLastNodeWrapper('configWrapper'),
                        floatFieldClass: '',
                        floatLabelClass: '',
                        formatAlignment: 'ltr',
                        iconType: 'outline',
                        iconSize: 15,
                        iconColor: '',
                        labelPosition: 'text-left',
                        titleIcon: '',
                        tooltip: '',
                        default: '',
                        hoverIconColor: '',
                        requiredMessage: '',
                        tooltipPosition: 'right',
                        toolTipClass: '',
                        formlyTypes: data?.type + '_' + data?.configType + '_' + data?.fieldType,
                        uploadBtnLabel: "Click here to upload",
                        multiple: false,
                        disabled: false,
                        showDialogueBox: true,
                        showUploadlist: true,
                        onlyDirectoriesAllow: false,
                        isNextChild: false,
                        uploadLimit: 10,
                        fileUploadSize: 30,
                        selectType: 'multiple',
                        multiFileUploadTypes: 'dragNDrop',
                        innerInputClass: '',
                        InputGroupClass: '',
                        dataClassification: '',
                      },
                      apiUrl: '',
                      rows: 1,
                      maxLength: null,
                      minLength: 1,
                      type: data?.fieldType,
                      label: res?.title ? res.title : obj.title,
                      placeholder: data?.label,
                      maskString: data?.maskString,
                      // sufix: 'INV ',
                      maskLabel: data?.maskLabel,
                      // disabled: this.getLastNodeWrapper("disabled"),
                      readonly: false,
                      hidden: false,
                      options: this.makeFormlyOptions(data?.options, data.type),
                      keyup: (model: any) => {

                        let currentVal = model.formControl.value;
                        this.formlyModel[model.key] = model.formControl.value;
                        this.checkConditionUIRule(model, currentVal);
                      },
                    },
                    fieldArray: {
                      // type: 'input',
                      // props: {
                      //   placeholder: 'Task name',
                      //   required: true,
                      // },
                    },
                  },
                ],
              },
            ],
          };
          newNode = { ...newNode, ...formlyObj };
          break;
        case 'simpleCardWithHeaderBodyFooter':
          newNode = {
            ...newNode,
            ...this.addControlService.getSimpleCardWithHeaderBodyFooterControl(),
          };
          break;
        case 'tabs':
          newNode = { ...newNode, ...this.addControlService.getTabsControl() };
          this.childAdd = newNode;
          break;
        case 'mainTab':
          newNode = { ...newNode, ...this.addControlService.getMainTabControl() };
          this.ParentAdd = newNode;
          break;
        case 'mainStep':
          newNode = {
            ...newNode,
            ...this.addControlService.getMainStepControl(),
          };
          this.ParentAdd = newNode;
          break;
        case 'listWithComponents':
          newNode = {
            ...newNode,
            ...this.addControlService.getlistWithComponentsControl(),
          };
          this.ParentAdd = newNode;
          break;
        case 'listWithComponentsChild':
          newNode = {
            ...newNode,
            ...this.addControlService.getlistWithComponentsChildControl(),
          };
          this.childAdd = newNode;
          break;
        case 'step':
          newNode = { ...newNode, ...this.addControlService.getStepControl() };
          this.childAdd = newNode;
          break;
        case 'kanban':
          newNode = { ...newNode, ...this.addControlService.getKanbanControl() };
          this.ParentAdd = newNode;
          break;
        case 'kanbanChild':
          newNode = {
            ...newNode,
            ...this.addControlService.getKanbanTaskControl(),
          };
          this.childAdd = newNode;
          break;
        case 'simplecard':
          newNode = { ...newNode, ...this.addControlService.simplecardControl() };
          break;
        case 'div':
          newNode = { ...newNode, ...this.addControlService.divControl() };
          break;
        case 'qrcode':
          newNode = { ...newNode, ...this.addControlService.qrControl() };
          break;
        case 'mainDiv':
          newNode = { ...newNode, ...this.addControlService.mainDivControl() };
          break;
        case 'heading':
          newNode = { ...newNode, ...this.addControlService.headingControl() };
          break;

        case 'paragraph':
          newNode = { ...newNode, ...this.addControlService.paragraphControl() };
          break;

        case 'htmlBlock':
          newNode = { ...newNode, ...this.addControlService.htmlBlockControl() };
          break;

        case 'textEditor':
          newNode = { ...newNode, ...this.addControlService.textEditorControl() };
          break;

        case 'editor_js':
          newNode = { ...newNode, ...this.addControlService.editor_jsControl() };
          break;

        case 'breakTag':
          newNode = { ...newNode, ...this.addControlService.breakTagControl() };
          break;

        // case 'multiFileUpload':
        //   newNode = {
        //     ...newNode,
        //     ...this.addControlService.multiFileUploadControl(),
        //   };
        //   break;

        case 'gridList':
          newNode = { ...newNode, ...this.addControlService.gridListControl() };
          break;
        case 'invoiceGrid':
          newNode = {
            ...newNode,
            ...this.addControlService.invoiceGridControl(),
          };
          break;

        case 'column':
          newNode = { ...newNode, ...this.addControlService.columnControl() };
          break;

        case 'timeline':
          newNode = { ...newNode, ...this.addControlService.timelineControl() };
          this.ParentAdd = newNode;
          break;
        case 'timelineChild':
          newNode = { ...newNode, ...this.addControlService.timelineChildControl() };
          this.childAdd = newNode;
          break;

        case 'fixedDiv':
          newNode = { ...newNode, ...this.addControlService.fixedDivControl() };
          this.childAdd = newNode;
          break;

        case 'accordionButton':
          newNode = {
            ...newNode,
            ...this.addControlService.accordionButtonControl(),
          };
          break;

        case 'contactList':
          newNode = {
            ...newNode,
            ...this.addControlService.contactListControl(),
          };
          break;

        case 'divider':
          newNode = { ...newNode, ...this.addControlService.dividerControl() };
          break;

        case 'toastr':
          newNode = { ...newNode, ...this.addControlService.toastrControl() };
          break;

        case 'rate':
          newNode = { ...newNode, ...this.addControlService.rateControl() };
          break;

        case 'rangeSlider':
          newNode = {
            ...newNode,
            ...this.addControlService.rangeSliderControl(),
          };
          break;

        case 'invoice':
          newNode = { ...newNode, ...this.addControlService.invoiceControl() };
          break;

        case 'affix':
          newNode = { ...newNode, ...this.addControlService.affixControl() };
          break;

        case 'statistic':
          newNode = { ...newNode, ...this.addControlService.statisticControl() };
          break;

        case 'backTop':
          newNode = { ...newNode, ...this.addControlService.backTopControl() };
          break;

        case 'anchor':
          newNode = { ...newNode, ...this.addControlService.anchorControl() };
          break;

        case 'modal':
          newNode = { ...newNode, ...this.addControlService.modalControl() };
          break;

        case 'popConfirm':
          newNode = { ...newNode, ...this.addControlService.popConfirmControl() };
          break;

        case 'avatar':
          newNode = { ...newNode, ...this.addControlService.avatarControl() };
          break;

        case 'badge':
          newNode = { ...newNode, ...this.addControlService.badgeControl() };
          break;

        case 'comment':
          newNode = { ...newNode, ...this.addControlService.commentControl() };
          break;

        case 'popOver':
          newNode = { ...newNode, ...this.addControlService.popOverControl() };
          break;

        case 'description':
          newNode = {
            ...newNode,
            ...this.addControlService.descriptionControl(),
          };
          break;

        case 'descriptionChild':
          newNode = {
            ...newNode,
            ...this.addControlService.descriptionChildControl(),
          };
          break;

        case 'segmented':
          newNode = { ...newNode, ...this.addControlService.segmentedControl() };
          break;

        case 'result':
          newNode = { ...newNode, ...this.addControlService.resultControl() };
          break;

        case 'tag':
          newNode = { ...newNode, ...this.addControlService.nzTagControl() };
          break;

        case 'treeSelect':
          newNode = { ...newNode, ...this.addControlService.treeSelectControl() };
          break;

        case 'transfer':
          newNode = { ...newNode, ...this.addControlService.transferControl() };
          break;

        case 'spin':
          newNode = { ...newNode, ...this.addControlService.spinControl() };
          break;

        case 'tree':
          newNode = { ...newNode, ...this.addControlService.treeControl() };
          break;

        // case 'cascader':
        //   newNode = { ...newNode, ...this.addControlService.cascaderControl() };
        //   break;

        case 'drawer':
          newNode = { ...newNode, ...this.addControlService.drawerControl() };
          break;

        case 'skeleton':
          newNode = { ...newNode, ...this.addControlService.skeletonControl() };
          break;

        case 'empty':
          newNode = { ...newNode, ...this.addControlService.emptyControl() };
          break;

        case 'list':
          newNode = { ...newNode, ...this.addControlService.listControl() };
          break;

        case 'treeView':
          newNode = { ...newNode, ...this.addControlService.treeViewControl() };
          break;

        case 'message':
          newNode = { ...newNode, ...this.addControlService.messageControl() };
          break;

        case 'mentions':
          newNode = { ...newNode, ...this.addControlService.mentionsControl() };
          break;

        case 'notification':
          newNode = {
            ...newNode,
            ...this.addControlService.notificationControl(),
          };
          break;

        case 'icon':
          newNode = { ...newNode, ...this.addControlService.iconControl() };
          break;
        case 'barChart':
          newNode = { ...newNode, ...this.addControlService.barChartControl() };
          break;
        case 'pieChart':
          newNode = { ...newNode, ...this.addControlService.pieChartControl() };
          break;
        case 'bubbleChart':
          newNode = {
            ...newNode,
            ...this.addControlService.bubbleChartControl(),
          };
          break;
        case 'candlestickChart':
          newNode = {
            ...newNode,
            ...this.addControlService.candlestickChartControl(),
          };
          break;
        case 'columnChart':
          newNode = {
            ...newNode,
            ...this.addControlService.columnChartControl(),
          };
          break;
        case 'orgChart':
          newNode = { ...newNode, ...this.addControlService.orgChartControl() };
          break;
        case 'ganttChart':
          newNode = { ...newNode, ...this.addControlService.ganttChartControl() };
          break;
        case 'geoChart':
          newNode = { ...newNode, ...this.addControlService.geoChartControl() };
          break;
        case 'histogramChart':
          newNode = {
            ...newNode,
            ...this.addControlService.histogramChartControl(),
          };
          break;
        case 'treeMapChart':
          newNode = {
            ...newNode,
            ...this.addControlService.treeMapChartControl(),
          };
          break;
        case 'tableChart':
          newNode = { ...newNode, ...this.addControlService.tableChartControl() };
          break;
        case 'lineChart':
          newNode = { ...newNode, ...this.addControlService.lineChartControl() };
          break;
        case 'sankeyChart':
          newNode = {
            ...newNode,
            ...this.addControlService.sankeyChartControl(),
          };
          break;
        case 'scatterChart':
          newNode = {
            ...newNode,
            ...this.addControlService.scatterChartControl(),
          };
          break;
        case 'areaChart':
          newNode = { ...newNode, ...this.addControlService.areaChartControl() };
          break;
        case 'comboChart':
          newNode = { ...newNode, ...this.addControlService.comboChartControl() };
          break;
        case 'steppedAreaChart':
          newNode = {
            ...newNode,
            ...this.addControlService.steppedAreaChartControl(),
          };
          break;
        case 'map':
          newNode = { ...newNode, ...this.addControlService.mapControl() };
          break;
        default:
          if (data?.parameter === 'input') {
            let formlyObj = {
              type: data?.configType,
              formlyType: data?.parameter,
              hideExpression: false,
              title: res?.title ? res.title : obj.title,
              key: res?.key ? res.key : obj.key,
              formly: [
                {
                  fieldGroup: [
                    {
                      key: res?.key ? res.key : obj.key,
                      type: data?.type,
                      defaultValue: '',
                      focus: false,
                      id: formlyId.toLowerCase(),
                      wrappers: this.getLastNodeWrapper('wrappers'),
                      props: {
                        multiple: true,
                        className: 'sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2',
                        attributes: {
                          autocomplete: 'off',
                        },
                        additionalProperties: {
                          getVariable: '',
                          setVariable: '',
                          addonLeft: '',
                          addonRight: '',
                          // addonLeftIcon: '',
                          // addonrightIcon: '',
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
                          wrapper: this.getLastNodeWrapper('configWrapper'),
                          floatFieldClass: '',
                          floatLabelClass: '',
                          formatAlignment: 'ltr',
                          iconType: 'outline',
                          iconSize: 15,
                          iconColor: '',
                          labelPosition: 'text-left',
                          titleIcon: '',
                          tooltip: '',
                          default: '',
                          hoverIconColor: '',
                          requiredMessage: '',
                          tooltipPosition: 'right',
                          toolTipClass: '',
                          formlyTypes: data?.type + '_' + data?.configType + '_' + data?.fieldType,
                          uploadBtnLabel: "Click here to upload",
                          multiple: false,
                          disabled: false,
                          showDialogueBox: true,
                          showUploadlist: true,
                          onlyDirectoriesAllow: false,
                          isNextChild: false,
                          uploadLimit: 10,
                          fileUploadSize: 30,
                          selectType: 'multiple',
                          multiFileUploadTypes: 'dragNDrop',
                          innerInputClass: '',
                          InputGroupClass: '',
                          dataClassification: '',
                        },
                        apiUrl: '',
                        rows: 1,
                        maxLength: null,
                        minLength: 1,
                        type: data?.fieldType,
                        label: res?.title ? res.title : obj.title,
                        placeholder: data?.label,
                        maskString: data?.maskString,
                        // sufix: 'INV ',
                        maskLabel: data?.maskLabel,
                        // disabled: this.getLastNodeWrapper("disabled"),
                        readonly: false,
                        hidden: false,
                        options: this.makeFormlyOptions(data?.options, data.type),
                        keyup: (model: any) => {

                          let currentVal = model.formControl.value;
                          this.formlyModel[model.key] = model.formControl.value;
                          this.checkConditionUIRule(model, currentVal);
                        },
                      },
                    },
                  ],
                },
              ],
            };
            newNode = { ...newNode, ...formlyObj };
            newNode = this.applyFloatingLastNodeWrapper(newNode);
            this.showActionRule = false;
          }
          break;
      }
      this.addNode(node, newNode);
      this.updateNodes();
    } else {
      // let controlType = value;
      // let type = value;
      // if (controlType == 'insertButton' || controlType == 'updateButton' || controlType == 'downloadButton' || controlType == 'deleteButton') {
      //   controlType = 'button'
      //   type = 'button'
      // } else if (data?.parameter === 'input') {
      //   controlType = 'input'
      // }
      // this.applicationService.getNestCommonAPI(`controls/${controlType}`).subscribe(((apiRes: any) => {
      //   if (apiRes.isSuccess) {
      //     if (apiRes.data) {
      //       let response = this.jsonParseWithObject(apiRes.data.controlJson);
      //       newNode = this.createControl(response, data, value, res, obj, type)
      //       this.addNode(node, newNode);
      //       this.updateNodes();
      //     } else {
      //       this.toastr.warning('No control found', { nzDuration: 2000 });
      //     }
      //   } else
      //     this.toastr.warning(apiRes.message, { nzDuration: 2000 });
      // }));
    }
    // this.applyApplicationThemeClass();
  }
  makeFormlyOptions(option: any, type: any) {
    if (!option) {
      return [];
    }

    const baseData = [
      { label: 'option1', value: '1' },
      { label: 'option2', value: '2' },
      { label: 'option3', value: '3' },
    ];

    if (type === 'checkbox') {
      return [{ ...baseData[0], width: 'w-1/2' }];
    } else if (type === 'radio') {
      return baseData.map(item => ({ ...item, width: 'w-1/2' }));
    }

    return baseData;
  }

  addNode(node: any, newNode: TreeNode) {
    if (node?.children) {
      newNode.isNewNode = true;
      node.children.push(newNode);
      this.isScreenSaved = true;
      if (node.children.length > 0) {
        delete node.isLeaf
      }
      if (this.showNotification) {
        this.toastr.success('Control Added', { nzDuration: 3000 });
      }
      // if (node.type == 'repeatableControll') {
      //   node.formly[0].fieldGroup[0].fieldArray = newNode
      // }

      // let repeatable = this.findObjectByType(this.nodes[0], 'repeatableControll')
      // if(repeatable){
      //   this.dataSharedService.repeatableControll.next(node);
      // }
    }
    // this.makeFaker();
  }
  gotoNextConfig() {
    let parent: any;
    let node: any;
    let nextNode: any;
    if (
      JSON.stringify(this.selectdParentNode) ==
      JSON.stringify(this.selectedNode)
    ) {
      parent = this.selectdParentNode;
      nextNode = this.selectedNode.children
        ? this.selectedNode.children[0]
        : {};
    } else if (
      this.selectedNode &&
      this.selectedNode.children &&
      this.selectedNode.children.length > 0
    ) {
      parent = this.selectedNode;
      nextNode = parent;
      this.selectdParentNode = parent;
      this.selectedNode = nextNode;
    } else {
      parent = this.selectdParentNode;
      node = this.selectedNode;

      if (parent && parent.children && parent.children.length > 0) {
        const idx = parent.children.indexOf(node);
        nextNode = parent.children[idx + 1];
      }
    }
    if (!nextNode) {
      this.toastr.error('Sorry there is no child');
      return;
    }
    this.openConfig(parent, nextNode);
  }
  gotoBackConfig() {
    let parent: any;
    let node: any;
    let nextNode: any;
    if (this.selectdParentNode.children) {
      if (
        JSON.stringify(this.selectdParentNode.children[0]) ==
        JSON.stringify(this.selectedNode)
      ) {
        parent = this.selectdParentNode;
        nextNode = this.selectdParentNode.children
          ? this.selectdParentNode.children[0]
          : {};
      } else {
        parent = this.selectdParentNode;
        node = this.selectedNode;

        if (parent && parent.children && parent.children.length > 0) {
          const idx = parent.children.indexOf(node);
          nextNode = parent.children[idx - 1];
        }
      }
      if (!nextNode) {
        this.toastr.error('Sorry there is no child');
        return;
      }
      this.openConfig(parent, nextNode);
    }
  }
  nextNode(): void {
    let parent = this.selectdParentNode;
    let nextNode: any;
    if (parent && parent.children) {
      const currentIndex = parent.children.findIndex(
        (node: any) => node.id === this.selectedNode.id
      );
      if (currentIndex !== -1 && currentIndex < parent.children.length - 1) {
        nextNode = parent.children[currentIndex + 1];
      } else {
        parent = this.selectedNode;
        nextNode = this.selectedNode.children
          ? this.selectedNode.children[0]
          : {};
      }
      if (!nextNode) {
        this.toastr.error('Sorry there is no child');
        return;
      }
      this.openConfig(parent, nextNode);
    }
  }

  backNode(): void {
    let parent = this.selectdParentNode;
    let nextNode: any;
    if (parent && parent.children) {
      const currentIndex = parent.children.findIndex(
        (node: any) => node.id === this.selectedNode.id
      );
      if (currentIndex !== -1 && currentIndex > 0) {
        nextNode = parent.children[currentIndex - 1];
      } else {
        const prevParent = this.findParentNode(this.nodes, parent);
        if (prevParent) {
          parent = prevParent;
          nextNode = prevParent.children[prevParent.children?.length - 1];
        }
      }
      if (!nextNode) {
        this.toastr.error('Sorry there is no child');
        return;
      }
      this.openConfig(parent, nextNode);
    }
  }
  findParentNode(nodes: any[], node: any): any {
    for (const n of nodes) {
      if (n.children && n.children.includes(node)) {
        return n;
      } else if (n.children) {
        const parent = this.findParentNode(n.children, node);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }

  getLastNodeWrapper(dataType?: string) {
    let wrapperName: any = ['form-field-horizontal'];
    let wrapper: any = 'form-field-horizontal';
    let disabledProperty: any;
    const filteredNodes = this.filterInputElements(this.selectedNode);
    for (let index = 0; index < filteredNodes.length; index++) {
      wrapperName = filteredNodes[index].formly
        ?.at(0)
        ?.fieldGroup?.at(0)?.wrappers;
      wrapper = filteredNodes[index].formly?.at(0)?.fieldGroup?.at(0)
        ?.wrappers[0];
      disabledProperty = filteredNodes[index].formly?.at(0)?.fieldGroup?.at(0)
        ?.props?.disabled;
      break;
    }
    if (dataType == 'wrappers') {
      return wrapperName;
    } else if (dataType == 'disabled') {
      return disabledProperty;
    } else if (dataType == 'configWrapper') {
      return wrapper;
    }
  }

  applyFloatingLastNodeWrapper(node: any) {
    if (node.formly[0].fieldGroup[0].wrappers == 'floating_filled' || node.formly[0].fieldGroup[0].wrappers == 'floating_outlined' || node.formly[0].fieldGroup[0].wrappers == 'floating_standard') {
      node.formly[0].fieldGroup[0].props['additionalProperties']['size'] = 'default';
      node.formly[0].fieldGroup[0].props['additionalProperties']['addonRight'] = '';
      node.formly[0].fieldGroup[0].props['additionalProperties']['addonLeft'] = '';
      node.formly[0].fieldGroup[0].props['additionalProperties']['prefixicon'] = '';
      node.formly[0].fieldGroup[0].props['additionalProperties']['suffixicon'] = '';
      node.formly[0].fieldGroup[0].props.placeholder = " ";
    }
    if (node.formly[0].fieldGroup[0].wrappers == 'floating_filled') {
      node.formly[0].fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
        'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
      node.formly[0].fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
        'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4';
    } else if (node.formly[0].fieldGroup[0].wrappers == 'floating_outlined') {
      node.formly[0].fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
        'block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
      node.formly[0].fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
        'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1';
    } else if (node.formly[0].fieldGroup[0].wrappers == 'floating_standard') {
      node.formly[0].fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
        'floting-standerd-input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
      node.formly[0].fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
        'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';
    }
    return node;
  }
  closeConfigurationList() {
    if (this.selectedNode) {
      const allowedTypes: any = [
        'sections',
        'tabs',
        'step',
        'div',
        'listWithComponentsChild',
        'cardWithComponents',
        'timelineChild'
      ];

      if (allowedTypes.includes(this.selectedNode.type) && this.selectedNode?.tableBody && this.selectedNode?.tableBody?.length > 0) {
        this.selectedNode.tableBody = this.selectedNode.tableBody.map((mapping: any) => ({
          ...mapping,
          'SelectQBOField': []
        }));
        this.selectedNode['tableHeader'] = [];
        this.selectedNode['tableKey'] = [];
        this.selectedNode['checkData'] = [];
      }

    }

    this.IsShowConfig = false;
    this.showRules = '';
  }
  openConfig(parent: any, node: any) {
    if (node.origin) {
      parent = parent?.parentNode?.origin;
      node = node.origin;
    }
    // this.isActiveShow = node.origin.id;
    this.searchControllData = [];
    this.controlListvisible = false;
    // document.getElementById("mySidenav-right").style.width = "100%";
    this.IsShowConfig = true;
    this.selectedNode = node;
    this.selectdParentNode = parent;
    // this.highlightSelect(this.selectedNode.id,true)
    // this.clickButton(node?.title);
    this.clickButton(node?.type);
    this.dataSharedService.nodes = this.nodes;
    this.dataSharedService.screenModule = this.screens;
    this.dataSharedService.selectedNode = this.selectedNode;
    this.dataSharedService.screenName = this.screenname;
  }
  applySize() {
    if (!this.IslayerVisible && !this.IsjsonEditorVisible) {
      this.sizes = [0, 100];
    } else {
      this.sizes = [18, 82];
    }
  }


  clickButton(type: any) {
    debugger
    let _formFieldData = new formFeildData();
    if ((_formFieldData.commonFormlyConfigurationFields[0].fieldGroup || _formFieldData.commonOtherConfigurationFields[0].fieldGroup) && this.applicationThemeClasses.length) {
      let newArray = this.applicationThemeClasses.filter((a: any) => a.tag?.toLowerCase().includes(this.selectedNode.type?.toLowerCase()));
      const transformedArray = newArray.map((item: any) => ({
        label: item.name,
        value: item.classes
      }));
      this.setOptionsForFieldGroup(_formFieldData.commonFormlyConfigurationFields[0].fieldGroup, 'applicationThemeClasses', transformedArray);
      this.setOptionsForFieldGroup(_formFieldData.commonOtherConfigurationFields[0].fieldGroup, 'applicationThemeClasses', transformedArray);
    }
    const validationObj = {
      title: this.selectedNode.title ? this.selectedNode.title : this.selectedNode.id,
      data: _formFieldData.inputValidationRuleFields
    }
    this.validationFieldData = new GenaricFeild({
      type: 'inputValidationRule',
      title: this.selectedNode.title ? this.selectedNode.title : this.selectedNode.id,
      commonData: [validationObj]
    });
    if (this.joiValidationData.length > 0) {
      let getJoiRule = this.joiValidationData.find(
        (a) => a.cid == this.selectedNode.id
      );
      if (getJoiRule) this.validationFieldData.modelData = getJoiRule;
    }
    let veriableOptions: any[] = [];
    if (this.nodes?.[0]?.options) {
      for (let index = 0; index < this.nodes[0].options.length; index++) {
        const element = this.nodes[0].options[index];
        veriableOptions.push({
          label: element.VariableName,
          value: element.VariableName,
        });
      }
    }
    if (_formFieldData.commonIconFields[0].fieldGroup) {
      const fieldGroup =
        _formFieldData.commonFormlyConfigurationFields[0].fieldGroup || [];
      _formFieldData.commonIconFields[0].fieldGroup.forEach((element) => {
        if (
          _formFieldData.commonFormlyConfigurationFields[0].fieldGroup &&
          element.key != 'icon' &&
          element.key != 'badgeType' &&
          element.key != 'badgeCount' &&
          element.key != 'dot_ribbon_color'
        ) {
          fieldGroup.push(element);
        }
      });
      // fieldGroup.push({
      //   key: 'className',
      //   type: 'multiselect',
      //   className: 'w-full',
      //   wrappers: ['formly-vertical-theme-wrapper'],
      //   props: {
      //     multiple: true,
      //     label: 'CSS ClassName',
      //     options: [
      //       {
      //         label: 'w-1/2',
      //         value: 'w-1/2',
      //       },
      //       {
      //         label: 'w-1/3',
      //         value: 'w-1/3',
      //       },
      //       {
      //         label: 'w-2/3',
      //         value: 'w-2/3',
      //       },
      //       {
      //         label: 'w-1/4',
      //         value: 'w-1/4',
      //       },
      //       {
      //         label: 'w-3/4',
      //         value: 'w-3/4',
      //       },
      //       {
      //         label: 'w-full',
      //         value: 'w-full',
      //       },
      //       {
      //         label: 'w-auto',
      //         value: 'w-auto',
      //       },
      //       {
      //         label: 'w-screen',
      //         value: 'w-screen',
      //       },
      //       {
      //         label: 'sm:w-1/2',
      //         value: 'sm:w-1/2',
      //       },
      //       {
      //         label: 'md:w-1/3',
      //         value: 'md:w-1/3',
      //       },
      //       {
      //         label: 'lg:w-2/3',
      //         value: 'lg:w-2/3',
      //       },
      //       {
      //         label: 'xl:w-1/4',
      //         value: 'xl:w-1/4',
      //       },
      //       {
      //         label: 'text-gray-500',
      //         value: 'text-gray-500',
      //       },
      //       {
      //         label: 'text-red-600',
      //         value: 'text-red-600',
      //       },
      //       {
      //         label: 'text-blue-400',
      //         value: 'text-blue-400',
      //       },
      //       {
      //         label: 'text-green-500',
      //         value: 'text-green-500',
      //       },
      //       {
      //         label: 'text-yellow-300',
      //         value: 'text-yellow-300',
      //       },
      //       {
      //         label: 'bg-gray-200',
      //         value: 'bg-gray-200',
      //       },
      //       {
      //         label: 'bg-blue-500',
      //         value: 'bg-blue-500',
      //       },
      //       {
      //         label: 'bg-green-300',
      //         value: 'bg-green-300',
      //       },
      //       {
      //         label: 'bg-yellow-200',
      //         value: 'bg-yellow-200',
      //       },
      //       {
      //         label: 'p-4',
      //         value: 'p-4',
      //       },
      //       {
      //         label: 'pt-6',
      //         value: 'pt-6',
      //       },
      //       {
      //         label: 'ml-2',
      //         value: 'ml-2',
      //       },
      //       {
      //         label: 'mr-8',
      //         value: 'mr-8',
      //       },
      //       {
      //         label: 'my-3',
      //         value: 'my-3',
      //       },
      //       {
      //         label: 'flex',
      //         value: 'flex',
      //       },
      //       {
      //         label: 'justify-center',
      //         value: 'justify-center',
      //       },
      //       {
      //         label: 'items-center',
      //         value: 'items-center',
      //       },
      //     ],
      //     additionalProperties: {
      //       allowClear: true,
      //       serveSearch: true,
      //       showArrow: true,
      //       showSearch: true,
      //       selectType: 'tags',
      //       maxCount: 6,
      //     },
      //   },
      // });
      // _formFieldData.commonFormlyConfigurationFields[0].fieldGroup = fieldGroup;
    }

    const filteredFields: any =
      _formFieldData.commonFormlyConfigurationFields[0].fieldGroup;
    const getVar = filteredFields.filter((x: any) => x.key == 'getVariable');
    const index = filteredFields.indexOf(getVar[0]);
    // if (_formFieldData.commonOtherConfigurationFields[0].fieldGroup) {
    //   _formFieldData.commonOtherConfigurationFields[0].fieldGroup[index].props!.options = veriableOptions;
    //   _formFieldData.commonOtherConfigurationFields[0].fieldGroup[index + 1].props!.options;
    // }
    if (_formFieldData.commonFormlyConfigurationFields[0].fieldGroup) {
      _formFieldData.commonFormlyConfigurationFields[0].fieldGroup[
        index
      ].props!.options = veriableOptions;
      _formFieldData.commonFormlyConfigurationFields[0].fieldGroup[
        index + 1
      ].props!.options = veriableOptions;
    }

    const selectedNode = this.selectedNode;
    let configObj: any;
    if (Array.isArray(selectedNode.className)) {
      selectedNode.className = selectedNode.className.join(' ');
    }
    configObj = selectedNode;
    // let newClass = selectedNode.className;
    selectedNode.id = selectedNode.id?.toLowerCase();
    // this.selectedNode.className = newClass;
    // selectedNode.className = newClass;
    // configObj = JSON.parse(JSON.stringify(selectedNode));
    const obj = {
      title: selectedNode.title ? selectedNode.title : selectedNode.id,
      data: _formFieldData.commonOtherConfigurationFields
    }
    this.fieldData = new GenaricFeild({
      type: type,
      commonData: [obj]
    });

    switch (type) {
      case 'drawer':
        this.addIconCommonConfiguration(_formFieldData.drawerFields, false);
        // this.fieldData.formData = _formFieldData.drawerFields;
        this.fieldData.commonData?.push({ title: 'Drawer', data: _formFieldData.drawerFields });
        break;
      case 'cardWithComponents':
        this.fieldData.commonData?.push({ title: 'Card Fields', data: _formFieldData.cardWithComponentsFields });
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'icon':
        this.fieldData.commonData?.push({ title: 'Icon Fields', data: _formFieldData.commonIconFields });
        break;
      case 'qrcode':
        this.fieldData.commonData?.push({ title: 'Qr Code Fields', data: _formFieldData.qrCodeFeilds });
        break;
      case 'anchor':
        this.fieldData.commonData?.push({ title: 'Anchor Fields', data: _formFieldData.anchorFields });
        break;
      case 'treeSelect':
        this.fieldData.commonData?.push({ title: 'Tree Select Fields', data: _formFieldData.treeSelectFields });
        break;
      case 'taskManager':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getGridConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Tree Select Fields', data: _formFieldData.taskManagerFileds });
        break;
      case 'headerLogo':
        this.fieldData.commonData?.push({ title: 'Header Logo Fields', data: _formFieldData.headerLogoFields });
        break;
      case 'treeView':
        this.fieldData.commonData?.push({ title: 'Tree View Fields', data: _formFieldData.treeviewFields });
        break;
      case 'cascader':
        this.addIconCommonConfiguration(_formFieldData.cascaderFields, true);
        this.fieldData.commonData?.push({ title: 'Cascader Fields', data: _formFieldData.cascaderFields });
        // delete configObj.options;
        break;
      case 'tree':
        this.addIconCommonConfiguration(_formFieldData.treeFields, false);
        this.fieldData.commonData?.push({ title: 'TreeFields', data: _formFieldData.treeFields });
        break;
      case 'htmlBlock':
        this.fieldData.commonData?.push({ title: 'Html Block Fields', data: _formFieldData.htmlBlockFields });
        break;
      case 'modal':
        this.addIconCommonConfiguration(_formFieldData.modalFields, false);
        this.fieldData.commonData?.push({ title: 'Modal Fields', data: _formFieldData.modalFields });
        break;
      case 'transfer':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getTransferConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Transfer Fields', data: _formFieldData.transferFields });
        break;
      case 'gridList':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getGridConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Grid Fields', data: _formFieldData.gridFields }, { title: 'Table', data: _formFieldData.gridFields_Table },
          { title: 'Table header', data: _formFieldData.gridFields_th }, { title: 'Table rows', data: _formFieldData.gridFields_td }, { title: 'Style Property', data: _formFieldData.gridFields_StyleProperty }, { title: 'Drawer', data: _formFieldData.gridFields_Drawer }
          , { title: 'Heading', data: _formFieldData.gridFields_Heading }, { title: 'Options', data: _formFieldData.gridFieldsOptions }

        );
        break;
      case 'comment':
        this.fieldData.commonData?.push({ title: 'Comment Fields', data: _formFieldData.commentFields });
        break;
      case 'rate':
        if (!configObj.options[0].label) {
          configObj.options = configObj.options.map((option: any) => ({
            label: option,
          }));
        }
        this.addIconCommonConfiguration(_formFieldData.rateFields, true);
        this.fieldData.commonData?.push({ title: 'Rate Fields', data: _formFieldData.rateFields });
        break;
      case 'skeleton':
        this.fieldData.commonData?.push({ title: 'Skeleton Fields', data: _formFieldData.skeletonFields });
        break;
      case 'badge':
        this.addIconCommonConfiguration(_formFieldData.badgeFields, false);
        this.fieldData.commonData?.push({ title: 'Badge Fields', data: _formFieldData.badgeFields });
        break;
      case 'mentions':
        this.fieldData.commonData?.push({ title: 'Mentions Fields', data: _formFieldData.mentionsFields });
        break;
      case 'empty':
        this.fieldData.commonData?.push({ title: 'Empty Fields', data: _formFieldData.emptyFields });
        break;
      case 'segmented':
        this.fieldData.commonData?.push({ title: 'Segmented Fields', data: _formFieldData.segmentedFields });
        break;
      case 'statistic':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getStatisticConfig(selectedNode),
        };
        this.addIconCommonConfiguration(_formFieldData.statisticFields, true);
        this.fieldData.commonData?.push({ title: 'Statistic Fields', data: _formFieldData.statisticFields });
        break;
      case 'tag':
        this.addIconCommonConfiguration(_formFieldData.nzTagFields, false);
        this.fieldData.commonData?.push({ title: 'nz Tag Fields', data: _formFieldData.nzTagFields });
        break;
      case 'message':
        this.fieldData.commonData?.push({ title: 'Message Fields', data: _formFieldData.messageFields });
        break;
      case 'notification':
        this.addIconCommonConfiguration(
          _formFieldData.notificationFields,
          true
        );
        this.fieldData.commonData?.push({ title: 'Notification Fields', data: _formFieldData.notificationFields });
        break;
      case 'list':
        this.fieldData.commonData?.push({ title: 'List Fields', data: _formFieldData.listFields });
        break;
      case 'description':
        this.fieldData.commonData?.push({ title: 'Description Fields', data: _formFieldData.descriptionFields });
        break;
      case 'descriptionChild':
        this.fieldData.commonData?.push({ title: 'Description Child Fields', data: _formFieldData.descriptionChildFields });
        break;
      case 'affix':
        this.fieldData.commonData?.push({ title: 'Affix Fields', data: _formFieldData.affixFields });
        break;
      case 'backTop':
        this.fieldData.commonData?.push({ title: 'Backtop Fields', data: _formFieldData.backtopFields });
        break;
      case 'avatar':
        this.fieldData.commonData?.push({ title: 'Avatar Fields', data: _formFieldData.avatarFields });
        break;
      case 'popOver':
        this.fieldData.commonData?.push({ title: 'Pop Over Fields', data: _formFieldData.popOverFields });
        break;
      case 'popConfirm':
        this.fieldData.commonData?.push({ title: 'Pop Confirm Fields', data: _formFieldData.popOverFields });
        break;
      case 'result':
        this.fieldData.commonData?.push({ title: 'Result Fields', data: _formFieldData.resultFields });
        break;
      case 'spin':
        this.fieldData.commonData?.push({ title: 'Spin Fields', data: _formFieldData.spinFields });
        break;
      case 'imageUpload':
        this.fieldData.commonData?.push({ title: 'Image Upload Feilds', data: _formFieldData.imageUploadFeilds });
        break;
      case 'toastr':
        this.fieldData.commonData?.push({ title: 'Toastr Feilds', data: _formFieldData.toastrFeilds });
        break;
      case 'invoice':
        // configObj = { ...configObj, ...this.clickButtonService.getinvoiceConfig(selectedNode) };
        this.fieldData.commonData?.push({ title: 'Invoice Feilds', data: _formFieldData.invoiceFeilds });
        break;
      case 'rangeSlider':
        this.addIconCommonConfiguration(_formFieldData.rangeSliderFeilds, true);
        this.fieldData.commonData?.push({ title: 'Range Slider Feilds', data: _formFieldData.rangeSliderFeilds });
        break;
      case 'inputGroupGrid':
        this.fieldData.commonData?.push({ title: 'Input Group Grid Feilds', data: _formFieldData.inputGroupGridFeilds });
        break;
      case 'card':
        this.fieldData.commonData?.push({ title: 'Card Fields', data: _formFieldData.cardFields });
        break;
      case 'chat':
        this.fieldData.commonData?.push({ title: 'Chat Fields', data: _formFieldData.chatFields });
        break;
      case 'calender':
        this.fieldData.commonData?.push({ title: 'Tui Calendar Feilds', data: _formFieldData.tuiCalendarFeilds });
        break;
      // case 'multiFileUpload':
      //   this.fieldData.formData = _formFieldData.multiFileUploadFeilds;
      //   break;
      case 'switch':
        this.fieldData.commonData?.push({ title: 'Switch Feilds', data: _formFieldData.switchFeilds });
        break;
      case 'tabs':
        this.addIconCommonConfiguration(_formFieldData.tabsFields, true);
        this.fieldData.commonData?.push({ title: 'Tabs Fields', data: _formFieldData.tabsFields });
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'kanban':
        // configObj = {
        //   ...configObj,
        //   ...this.clickButtonService.getGridConfig(selectedNode),
        // };
        this.fieldData.commonData?.push({ title: 'Kanban Feilds', data: _formFieldData.kanbanFeilds });
        break;
      case 'kanbanTask':
        this.fieldData.commonData?.push({ title: 'Kanban Task Feilds', data: _formFieldData.kanbanTaskFeilds });
        break;
      case 'mainTab':
        this.fieldData.commonData?.push({ title: 'MainTab Fields', data: _formFieldData.mainTabFields });
        break;
      case 'progressBar':
        this.fieldData.commonData?.push({ title: 'Progress Bar Fields', data: _formFieldData.progressBarFields });
        break;
      case 'divider':
        this.addIconCommonConfiguration(_formFieldData.dividerFeilds, true);
        this.fieldData.commonData?.push({ title: 'Divider Feilds', data: _formFieldData.dividerFeilds });
        break;
      case 'video':
        this.fieldData.commonData?.push({ title: 'Videos Feilds', data: _formFieldData.videosFeilds });
        break;
      case 'audio':
        this.fieldData.commonData?.push({ title: 'Audio Feilds', data: _formFieldData.audioFeilds });
        break;
      case 'carouselCrossfade':
        this.fieldData.commonData?.push({ title: 'Carousel Crossfade Feilds', data: _formFieldData.carouselCrossfadeFeilds });
        break;
      case 'alert':
        this.addIconCommonConfiguration(_formFieldData.alertFeilds, true);
        this.fieldData.commonData?.push({ title: 'Aert Feilds', data: _formFieldData.alertFeilds });
        break;
      case 'timeline':

        this.addIconCommonConfiguration(_formFieldData.timelineFeilds, false);
        if (_formFieldData.timelineFeilds[0].fieldGroup) {
          _formFieldData.timelineFeilds[0].fieldGroup = _formFieldData.timelineFeilds[0].fieldGroup.filter(item => item.key !== 'iconClass');
        }
        this.fieldData.commonData?.push({ title: 'Timeline Feilds', data: _formFieldData.timelineFeilds });
        break;
      case 'simpleCardWithHeaderBodyFooter':
        this.fieldData.commonData?.push({ title: 'Simple Card With Header Body Footer Feilds', data: _formFieldData.simpleCardWithHeaderBodyFooterFeilds });

        break;
      case 'div':
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.commonData?.push({ title: 'Div Fields', data: _formFieldData.divFields });
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'timelineChild':
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.addIconCommonConfiguration(_formFieldData.timelineChildFeilds, true);
        this.fieldData.commonData?.push({ title: 'Timeline child fileds', data: _formFieldData.timelineChildFeilds });
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'mainDiv':
        this.fieldData.commonData?.push({ title: 'Main DivFields', data: _formFieldData.mainDivFields });
        break;
      case 'heading':
        this.fieldData.commonData?.push({ title: 'Heading Fields', data: _formFieldData.headingFields });
        break;
      case 'paragraph':
        this.addIconCommonConfiguration(_formFieldData.paragraphFields, false);
        this.fieldData.commonData?.push({ title: 'Paragraph Fields', data: _formFieldData.paragraphFields });
        break;
      case 'tags':
      case 'repeatSection':
      case 'multiselect':
      // case "tag":
      case 'search':
      case 'radiobutton':
      case 'checkbox':
      case 'datetime':
      case 'time':
      case 'timepicker':
      case 'date':
      case 'month':
      case 'year':
      case 'decimal':
      case 'week':
      case 'color':
      case 'input':
      case 'email':
      case 'inputGroup':
      case 'image':
      case 'textarea':
      case 'telephone':
      case 'autoComplete':
      case 'number':
      case 'url':
      case 'customMasking':
      case 'multiFileUploader':
      case 'audioVideoRecorder':
      case 'image':
      case 'signaturePad':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getFormlyConfig(selectedNode),
        };
        _formFieldData?.commonFormlyConfigurationFields[0]?.fieldGroup?.forEach(
          (configField: any) => {
            if (configField.key == 'formlyTypes') {
              configField.props.options = this.formlyTypes;
            }
          }
        );
        if (type == 'year' || type == 'month') {
          let formlyData: any = _formFieldData?.commonFormlyConfigurationFields[0]?.fieldGroup;
          formlyData.push({
            key: 'disabledCalenderProperties',
            type: 'select',
            className: "w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2",
            wrappers: ["formly-vertical-theme-wrapper"],
            props: {
              label: 'Disabled',
              options: [
                {
                  label: "Disabled before current",
                  value: "disabledBeforeCurrent"
                },
                {
                  label: "Disabled After Current",
                  value: "disabledAfterCurrent"
                },
                {
                  label: "Disabled both",
                  value: "disabledBoth"
                },
              ],
              additionalProperties: {
                allowClear: true,
                serveSearch: false,
                showArrow: true,
                showSearch: true,
              },
            },
          })
        }
        this.fieldData.commonData = [];
        const obj = {
          title: 'test',
          data: _formFieldData.commonFormlyConfigurationFields
        }

        this.fieldData.commonData?.push(obj);
        switch (type) {
          case 'signaturePad':
            this.fieldData.commonData?.push({ title: 'Signature Pad Fields', data: _formFieldData.signaturePad });
            break;
          case 'search':
            this.fieldData.commonData?.push({ title: 'Select Fields', data: _formFieldData.selectFields });
            break;
          case 'radiobutton':
          case 'checkbox':
            this.fieldData.commonData?.push({ title: 'Radio Fields', data: _formFieldData.radioFields });
            break;
          case 'color':
            this.fieldData.commonData?.push({ title: 'Color Fields', data: _formFieldData.colorFields });
            break;
          case 'autoComplete':
            this.fieldData.commonData?.push({ title: 'Auto Complete Fields', data: _formFieldData.autoCompleteFields });
            break;
          case 'date':
            this.fieldData.commonData?.push({ title: 'Zorro Date Fields', data: _formFieldData.zorroDateFields });
            break;
          case 'number':
            this.fieldData.commonData?.push({ title: 'Number Fields', data: _formFieldData.numberFields });
            break;
          case 'image':
            this.fieldData.commonData?.push({ title: 'File Upload', data: _formFieldData.fileUpload });
            break;
          case 'repeatSection':
          case 'multiselect':
            this.fieldData.commonData?.push({ title: 'Zorro Select Fields', data: _formFieldData.zorroSelectFields });
            break;
          case 'timepicker':
            this.fieldData.commonData?.push({ title: 'Zorro Time Fields', data: _formFieldData.zorroTimeFields });
            break;
          case 'customMasking':
            this.fieldData.commonData?.push({ title: 'Custom Masking Fields', data: _formFieldData.customMaskingFields });
            break;
          case 'multiFileUploader':
            this.fieldData.commonData?.push({ title: 'Multi File Upload Feilds', data: _formFieldData.multiFileUploadFeilds });
            break;
        }
        break;
      case 'button':
      case 'downloadButton':
        // configObj = { ...configObj, ...this.clickButtonService.getButtonConfig(selectedNode) };
        // if (typeof selectedNode.buttonClass === "string") {
        //   const classObj = JSON.parse(JSON.stringify(selectedNode.buttonClass.split(" ")));
        //   configObj.buttonClass = classObj
        // }
        configObj.icon = selectedNode.btnIcon;
        this.addIconCommonConfiguration(_formFieldData.buttonFields, true);
        this.fieldData.commonData?.push({ title: 'Button Fields', data: _formFieldData.buttonFields }, { title: 'Button Drawer Fields', data: _formFieldData.buttonDrawerFields });
        break;
      case 'dropdownButton':
        // if (typeof selectedNode.buttonClass === "string") {
        //   const classObj = JSON.parse(JSON.stringify(selectedNode.buttonClass.split(" ")));
        //   configObj.buttonClass = classObj
        // }
        // (configObj.icon = selectedNode.btnIcon),
        //   (configObj.options = selectedNode.dropdownOptions);
        // configObj = { ...configObj, ...this.clickButtonService.getDropdownButtonConfig(selectedNode) };
        this.addIconCommonConfiguration(
          _formFieldData.dropdownButtonFields,
          true
        );
        configObj.icon = selectedNode.btnIcon;
        configObj.options = selectedNode.dropdownOptions;
        this.fieldData.commonData?.push({ title: 'Dropdown Button Fields', data: _formFieldData.dropdownButtonFields });
        break;
      case 'accordionButton':
        this.addIconCommonConfiguration(
          _formFieldData.accordionButtonFields,
          true
        );
        this.fieldData.commonData?.push({ title: 'Accordion Button Fields', data: _formFieldData.accordionButtonFields });
        break;
      case 'contactList':
        this.addIconCommonConfiguration(
          _formFieldData.contactListFields,
          true
        );
        this.fieldData.commonData?.push({ title: 'Contact List Fields', data: _formFieldData.contactListFields });
        break;
      case 'linkbutton':
        // if (typeof selectedNode.buttonClass === "string") {
        //   const classObj = JSON.parse(JSON.stringify(selectedNode.buttonClass.split(" ")));
        //   configObj.buttonClass = classObj
        // }
        // configObj = { ...configObj, ...this.clickButtonService.getLinkButtonConfig(selectedNode) };
        (configObj.icon = selectedNode.btnIcon),
          this.addIconCommonConfiguration(
            _formFieldData.linkButtonFields,
            true
          );
        this.fieldData.commonData?.push({ title: 'Link Button Fields', data: _formFieldData.linkButtonFields });
        break;
      case 'buttonGroup':
        this.fieldData.commonData?.push({ title: 'Button Group Fields', data: _formFieldData.buttonGroupFields });
        break;
      case 'page':
        this.fieldData.commonData?.push({ title: 'Page Fields', data: _formFieldData.pageFields });
        break;
      case 'pageHeader':
        this.fieldData.commonData?.push({ title: 'Page Header Fields', data: _formFieldData.pageHeaderFields });
        break;
      case 'pageBody':
        break;
      case 'pageFooter':
        this.fieldData.commonData?.push({ title: 'Page Footer Fields', data: _formFieldData.pageFooterFields });
        break;
      case 'sections':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getSectionConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Sections Fields', data: _formFieldData.sectionsFields });
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;

        break;
      case 'header':
        configObj = {
          ...configObj,
          ...this.clickButtonService.headerConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Header Fields', data: _formFieldData.headerFields });
        break;
      case 'footer':
        this.fieldData.commonData?.push({ title: 'Footer Fields', data: _formFieldData.footerFields });
        break;
      case 'body':
        this.fieldData.commonData?.push({ title: 'Body Fields', data: _formFieldData.bodyFields });
        break;
      case 'step':
        this.addIconCommonConfiguration(_formFieldData.stepperFields, true);
        this.fieldData.commonData?.push({ title: 'Stepper Fields', data: _formFieldData.stepperFields });
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;

        break;
      case 'mainStep':
        this.fieldData.commonData?.push({ title: 'Main Stepper Fields', data: _formFieldData.mainStepperFields });

        break;
      case 'listWithComponents':
        this.fieldData.commonData?.push({ title: 'List With Components Fields', data: _formFieldData.listWithComponentsFields });
        break;
      case 'listWithComponentsChild':
        this.fieldData.commonData?.push({ title: 'List With Components Child Fields', data: _formFieldData.listWithComponentsChildFields });
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'tabsMain':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getMainTabsConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Main Tab Fields', data: _formFieldData.mainTabFields });
        break;
      case 'barChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getBarChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Bar Chart Fields', data: _formFieldData.barChartFields });
        break;
      case 'pieChart':
        //   configObj = {
        //     ...configObj,
        //     ...this.clickButtonService.getPieChartConfig(selectedNode),
        //   };
        //   is3D: node?.options.is3D,
        // pieHole: node?.options.pieHole,
        // pieStartAngle: node?.options.pieStartAngle,
        // // slices: node?.options.slices,
        // sliceVisibilityThreshold: node?.options.sliceVisibilityThreshold,
        configObj['is3D'] = selectedNode?.options.is3D;
        configObj['pieHole'] = selectedNode?.options.pieHole;
        configObj['pieStartAngle'] = selectedNode?.options.pieStartAngle;
        configObj['sliceVisibilityThreshold'] = selectedNode?.options.sliceVisibilityThreshold;
        this.fieldData.commonData?.push({ title: 'Pie Chart Fields', data: _formFieldData.pieChartFields });
        break;
      case 'bubbleChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getBubbleChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Bubble Chart Fields', data: _formFieldData.bubbleChartFields });
        break;
      case 'candlestickChart':
        this.fieldData.commonData?.push({ title: 'Candlestick Chart Fields', data: _formFieldData.candlestickChartFields });
        break;
      case 'columnChart':
        this.fieldData.commonData?.push({ title: 'Column Chart Fields', data: _formFieldData.columnChartFields });
        break;
      case 'ganttChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getGanttChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Gantt Chart Fields', data: _formFieldData.ganttChartFields });
        break;
      case 'geoChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getGeoChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Geo Chart Fields', data: _formFieldData.geoChartFields });
        break;
      case 'histogramChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getHistogramChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Histogram Char tFields', data: _formFieldData.histogramChartFields });
        break;
      case 'treeMapChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.gettreeMapChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Tree Map Chart Fields', data: _formFieldData.treeMapChartFields });
        break;
      case 'tableChart':
        this.fieldData.commonData?.push({ title: 'Table Chart Fields', data: _formFieldData.tableChartFields });
        break;
      case 'lineChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getLineChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Line Chart Fields', data: _formFieldData.lineChartFields });
        break;
      case 'sankeyChart':
        this.fieldData.commonData?.push({ title: 'Sankey Chart Fields', data: _formFieldData.sankeyChartFields });
        break;
      case 'scatterChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getScatterChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Scatter Chart Fields', data: _formFieldData.scatterChartFields });
        break;
      case 'areaChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getAreaChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Area Chart Fields', data: _formFieldData.areaChartFields });
        break;
      case 'comboChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getComboChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Combo Chart Fields', data: _formFieldData.comboChartFields });
        break;
      case 'steppedAreaChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getSteppedAreaChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Stepped Area Chart Fields', data: _formFieldData.steppedAreaChartFields });
        break;
      case 'timelineChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getTimelineChartConfig(selectedNode),
        };
        this.fieldData.commonData?.push({ title: 'Stepped Area Chart Fields', data: _formFieldData.steppedAreaChartFields });
        break;
      case 'fileManager':

        this.fieldData.commonData?.push({ title: 'File Manager Fileds', data: _formFieldData.fileManagerFields });
        break;
      default:
        break;
    }
    this.formModalData = configObj;

  }
  menuSearch() {
    this.filterMenuData = [];
    var input = (
      document.getElementById('mySearch') as HTMLInputElement
    ).value.toUpperCase();
    if (input) {
      this.nodes.forEach((element: any) => {
        if (element.title.toUpperCase().includes(input)) {
          this.filterMenuData.push(element);
        } else if (element.children.length > 0) {
          element.children.forEach((element1: any) => {
            if (element1.title.toUpperCase().includes(input)) {
              this.filterMenuData.push(element1);
            } else if (element1.children.length > 0) {
              element1.children.forEach((element2: any) => {
                if (element2.title.toUpperCase().includes(input)) {
                  this.filterMenuData.push(element2);
                } else if (element2.children.length > 0) {
                  element2.children.forEach((element3: any) => {
                    if (element3.title.toUpperCase().includes(input)) {
                      this.filterMenuData.push(element3);
                    } else if (element3.children.length > 0) {
                      element3.children.forEach((element4: any) => {
                        if (element4.title.toUpperCase().includes(input)) {
                          this.filterMenuData.push(element4);
                        } else if (element4.children.length > 0) {
                          element4.children.forEach((element5: any) => {
                            if (element5.title.toUpperCase().includes(input)) {
                              this.filterMenuData.push(element5);
                            } else if (element5.children.length > 0) {
                              element5.children.forEach((element6: any) => {
                                if (
                                  element6.title.toUpperCase().includes(input)
                                ) {
                                  this.filterMenuData.push(element6);
                                } else if (element6.children.length > 0) {
                                  element6.children.forEach((element7: any) => {
                                    if (
                                      element7.title
                                        .toUpperCase()
                                        .includes(input)
                                    ) {
                                      this.filterMenuData.push(element7);
                                    } else if (element7.children.length > 0) {
                                      element7.children.forEach(
                                        (element8: any) => {
                                          if (
                                            element8.title
                                              .toUpperCase()
                                              .includes(input)
                                          ) {
                                            this.filterMenuData.push(element8);
                                          }
                                        }
                                      );
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
              });
            }
          });
        }
      });
    }
  }
  hoverIn(data: any) {
    this.isVisible = data.origin.id;
  }
  hoverOut(data: any) {
    this.isVisible = data.origin.id;
  }
  applyOrRemoveHighlight(element: any, id: any, highlightOrNot: boolean) {
    if (id == element.id) element['highLight'] = true;
    else element['highLight'] = false;
    if (!highlightOrNot) {
      element['highLight'] = false;
    }
  }

  highlightSelect(id: any, highlightOrNot: boolean) {
    this.recursiveHighlight(this.nodes[0], id, highlightOrNot);
  }

  private recursiveHighlight(node: any, id: any, highlightOrNot: boolean) {
    this.applyOrRemoveHighlight(node, id, highlightOrNot);

    if (node.children) {
      node.children.forEach((child: any) => {
        this.recursiveHighlight(child, id, highlightOrNot);
      });
    }
  }

  addSection(section?: any) {
    this.sectionBageBody = this.nodes[0].children[1];
    (this.selectedNode = this.sectionBageBody),
      this.addControlToJson(section, null);
    this.selectedNode = this.sections;
    this.addControlToJson('header', null);
    this.addControlToJson('body', null);
    this.addControlToJson('footer', null);
    this.selectedNode = this.sectionAccorBody;
    this.addControlToJson('text', this.textJsonObj);
  }
  openField(event: any) {

    this.searchControlValue = '';
    let id = event.origin.id;
    let node = event.origin;
    if (this.screenPage) {
      this.searchControllData = [];
      this.isActiveShow = id;
      this.selectedNode = node;
      if (this.selectedNode.isNextChild) {
        // this.IsShowConfig = true;
        this.controlListvisible = true;
      } else {
        this.toastr.warning("Not allowed to add control in this")
      }
      if (this.selectedNode.type == 'pageBody') {
        this.showSectionOnly = true;
      } else {
        this.showSectionOnly = false;
      }
    }
  }
  newChild: any = [];
  insertAt(node: any) {
    let parent = node?.parentNode?.origin;
    node = node.origin
    // node = node.origin;
    if (
      node.type != 'page' &&
      node.type != 'pageHeader' &&
      node.type != 'pageBody' &&
      node.type != 'pageFooter' &&
      node.type != 'header' &&
      node.type != 'body' &&
      node.type != 'footer'
    ) {
      let newNode: any;
      if (node.formlyType)
        newNode = JSON.parse(this.jsonStringifyWithObject(node));
      else
        newNode = JSON.parse(JSON.stringify(node));
      newNode = this.changeIdAndkey(newNode);
      const idx = parent.children.indexOf(node as TreeNode);
      newNode.children.forEach((child: any) => {
        child = this.changeIdAndkey(child);
        child.children.forEach((child1: any) => {
          child1 = this.changeIdAndkey(child1);
          child1.children.forEach((child2: any) => {
            child2 = this.changeIdAndkey(child2);
            child2.children.forEach((child3: any) => {
              child3 = this.changeIdAndkey(child3);
              child3.children.forEach((child4: any) => {
                child4 = this.changeIdAndkey(child4);
                child4.children.forEach((child5: any) => {
                  child5 = this.changeIdAndkey(child5);
                  child5.children.forEach((child6: any) => {
                    child6 = this.changeIdAndkey(child6);
                  });
                });
              });
            });
          });
        });
      });
      parent.children.splice((idx as number) + 1, 0, newNode);
      if (parent) {
        if (parent.type == 'mainTab' || parent.type == 'dropdown' || parent.type == 'kanban' || parent.type == 'mainStep' || parent.type == 'timeline') {
          parent.nodes = parent.children.length;
        }
      }
      this.updateNodes();
    } else {
      this.toastr.error("Don't copy this !", { nzDuration: 3000 });
    }
  }
  traverseAndChange(node: any) {
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

    if (node.id) {
      let changeId = node.id.split('_');
      if (changeId.length == 2) {
        node.id = this.navigation + '_' + changeId[0] + '_' + Guid.newGuid();
      } else {
        node.id = changeId[0] + '_' + changeId[1] + '_' + Guid.newGuid();
      }
    }
    if (node.formly) {
      if (node.formly[0].key) {
        node.formly[0].key = node.formly[0].key.split('_')[0] + '_' + Guid.newGuid();
      }
      else if (node.formly[0].fieldGroup[0].key) {
        node.formly[0].fieldGroup[0].key = node.formly[0].fieldGroup[0].key.split('_')[0] + '_' + Guid.newGuid();
      }
    }
    else if (node.key) {
      if (node.key.includes('_')) {
        node.key = node.key.split('_')[0] + '_' + Guid.newGuid();
      } else {
        node.key = node.key;
      }
    }
    return node;
  }

  addFunctionsInHtml(type: any) {
    this.addControl = true;
    this.showNotification = false;

    switch (type) {
      case 'dashonictabsAddNew':
        this.addChildControlsWithSubChild('mainTab', 'tabs');
        break;
      case 'carouselCrossfadeMain':
        this.addChildControlsWithSubChild('carouselCrossfade', 'subCarouselCrossfade');
        break;

      case 'stepperAddNew':
        this.addChildControlsWithSubChild('mainStep', 'step');
        break;

      case 'kanabnAddNew':
        this.addChildControlsWithSubChild('kanban', 'kanbanChild');
        break;

      case 'timeline':
        this.addChildControlsWithSubChild('timeline', 'timelineChild');
        break;

      case 'listWithComponents':
        this.addChildControlsWithSubChild('listWithComponents', 'listWithComponentsChild');
        break;

      case 'address_form':
      case 'employee_form':
      case 'login_Form':
      case 'signUp_Form':
        this.formDataFromApi(type);
        this.addControl = false;
        this.showNotification = true;
        this.toastr.success('Control Added', { nzDuration: 3000 });
        break;

      case 'addSection':
        this.addSection('sections');
        this.addControl = false;
        this.showNotification = true;
        this.toastr.success('Control Added', { nzDuration: 3000 });
        break;
    }
    this.addControl = false;
  }


  addChildControls(parent?: any, child?: any) {
    let findControls = parent + ',' + child;
    this.applicationService.getNestCommonAPI(`controls/multiplConrols/${findControls}`).subscribe(((apiRes: any) => {
      if (apiRes.isSuccess) {
        if (apiRes.data) {
          let mainParent = this.getControls(apiRes.data, parent);
          this.selectedNode = mainParent;
          let createNode = this.getControls(apiRes.data, child);
          this.selectedNode = mainParent;
          createNode = this.getControls(apiRes.data, child);
          this.selectedNode = mainParent;
          createNode = this.getControls(apiRes.data, child);
          this.selectedNode = mainParent;
          this.updateNodes()
        } else {
          this.toastr.warning('No control found', { nzDuration: 2000 });
        }
      } else
        this.toastr.warning(apiRes.message, { nzDuration: 2000 });
    }));
  }
  // addChildControlsWithSubChild(parent: any, child: any) {
  //   let findControls = parent + ',' + child + ',' + 'input';
  //   this.applicationService.getNestCommonAPI(`controls/multiplConrols/${findControls}`).subscribe(((apiRes: any) => {
  //     if (apiRes.isSuccess) {
  //       if (apiRes.data) {
  //         this.showNotification = false;
  //         let mainParent = this.getControls(apiRes.data, parent);
  //         this.selectedNode = mainParent;
  //         let createNode = this.getControls(apiRes.data, child);
  //         this.selectedNode = createNode;
  //         createNode = this.getControls(apiRes.data, 'input');
  //         this.selectedNode = mainParent;
  //         createNode = this.getControls(apiRes.data, child);
  //         this.selectedNode = createNode;
  //         createNode = this.getControls(apiRes.data, 'input');
  //         this.selectedNode = mainParent;
  //         createNode = this.getControls(apiRes.data, child);
  //         this.selectedNode = createNode;
  //         createNode = this.getControls(apiRes.data, 'input');
  //         this.selectedNode = mainParent;
  //         this.updateNodes();
  //         this.addControl = false;
  //         this.showNotification = true;
  //         this.toastr.success('Control Added', { nzDuration: 3000 });
  //       } else {
  //         this.toastr.warning('No control found', { nzDuration: 2000 });
  //       }
  //     } else
  //       this.toastr.warning(apiRes.message, { nzDuration: 2000 });
  //   }));
  // }
  addChildControlsWithSubChild(parent: any, child: any) {
    this.addControlToJson(parent);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.childAdd;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.childAdd;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.ParentAdd;
    this.addControlToJson(child);
    this.selectedNode = this.childAdd;
    this.addControlToJson('text', this.textJsonObj);
    this.selectedNode = this.selectForDropdown;
    this.updateNodes();
  }
  formDataFromApi(screenId: any) {
    this.requestSubscription = this.builderService
      .genericApis(screenId)
      .subscribe({
        next: (res) => {
          this.nodes[0].children[1].children.push(res[0]);
          this.updateNodes();
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
        },
      });
  }
  // dashonicTemplates(model: any) {
  //   this.requestSubscription = this.builderService
  //     .dashonicTemplates(model)
  //     .subscribe({
  //       next: (res) => {
  //         this.selectedNode?.children?.push(res);
  //         this.updateNodes();
  //         this.toastr.success('Controll Added', { nzDuration: 3000 });
  //       },
  //       error: (err) => {
  //         console.error(err); // Log the error to the console
  //         this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
  //       },
  //     });
  // }
  remove(parent: any, node: any) {
    debugger
    //This condition is work if ui rule apply on component then user cannot delete the component.
    if (this.screendata) {
      if (this.screendata.uiData.length > 0) {
        if (node?.origin?.key) {
          for (const rule of this.screendata.uiData) {
            if ((node.origin && rule.ifMenuName === node.origin.key) || (node.parentNode && rule.ifMenuName === node.parentNode.key)) {
              this.toastr.warning('UI Rule is applied to this component, so please refrain from deleting it.', { nzDuration: 3000 }); // Show an error message to the user
              return;
            }
            var data = true;
            if (rule.targetCondition.length > 0) {
              rule.targetCondition.forEach((element: any) => {
                if ((node.origin && element.targetName === node.origin.key) || (node.parentNode && element.targetName === node.parentNode.key)) {
                  if (node?.origin?.isNewNode)
                    data = true;
                  else {
                    this.toastr.warning('UI Rule is applied on parent component, so please refrain from deleting it.', { nzDuration: 3000 }); // Show an error message to the user
                    data = false;
                  }
                }
              });
              if (!data)
                return;
            }
          }
        }
      }
    }

    this.uiRuleData;
    if (parent?.parentNode && node.origin) {
      parent = parent?.parentNode?.origin;
      node = node.origin;
    }
    if (parent != undefined) {
      console.log(parent, node);
      const idx = parent.children.indexOf(node);
      parent.children.splice(idx as number, 1);
      if (parent.children.length > 0) {
        if (parent.isLeaf) {
          delete parent.isLeaf;
        }
      }
      else {
        parent['isLeaf'] = true;
      }
    }
    else {
      console.log(parent, node);
      const idx = this.nodes.indexOf(node);
      this.nodes.splice(idx as number, 1);
    }
    if (parent) {
      if (parent.type == 'mainTab' || parent.type == 'dropdown' || parent.type == 'kanban' || parent.type == 'mainStep' || parent.type == 'timeline') {
        parent.nodes = parent.children.length;
      }
    }
    this.updateNodes();
  }
  // nzEvent(event: NzFormatEmitEvent): void { }

  clickBack() {
    this.nodes = this.jsonParseWithObject(
      this.jsonStringifyWithObject(this.nodes)
    );
  }
  // EnumView() {
  //   this.requestSubscription = this.builderService.multiAPIData().subscribe({
  //     next: (res) => {
  //       const node = this.selectedNode ?? {};
  //       const formly = node.formly ?? [];
  //       const fieldGroup = formly?.[0]?.fieldGroup ?? [];
  //       const props = fieldGroup[0]?.props ?? {};
  //       props.options = res ?? undefined;
  //       this.updateNodes();
  //     },
  //     error: (err) => {
  //       console.error(err); // Log the error to the console
  //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
  //     }
  //   });
  // }
  notifyEmit(event: actionTypeFeild): void {
    let needToUpdate = true;
    if (event?.form?.className) {
      if (event.form.className.includes('$')) {
        this.selectedNode['appGlobalClass'] = this.changeWithGlobalClass(event.form.className);
      } else {
        this.selectedNode['appGlobalClass'] = ''
      }
    } else {
      this.selectedNode['appGlobalClass'] = ''
    }
    if (event?.form?.innerClass || event?.form?.iconClass) {
      if (event.form?.innerClass) {
        if (event.form?.innerClass.includes('$')) {
          this.selectedNode['appGlobalInnerClass'] = this.changeWithGlobalClass(event.form?.innerClass);
        } else {
          this.selectedNode['appGlobalInnerClass'] = '';
        }
      }
      else if (event.form?.iconClass) {
        if (event.form?.iconClass.includes('$')) {
          this.selectedNode['appGlobalInnerIconClass'] = this.changeWithGlobalClass(event.form?.iconClass);
        }
        else {
          this.selectedNode['appGlobalInnerIconClass'] = '';
        }
      }
      else {
        this.selectedNode['appGlobalInnerClass'] = '';
      }
    }
    else {
      this.selectedNode['appGlobalInnerIconClass'] = '';
      this.selectedNode['appGlobalInnerClass'] = '';
    }


    switch (event.type) {
      case 'rangeSlider':
        document.documentElement.style.setProperty('--slider-color', event.form.color ? event.form.color : '#91d5ff');
        break;
      case 'body':
        this.selectedNode = this.api(event.form.api, this.selectedNode);
        break;
      case 'drawer':
        this.selectedNode['notvisible'] = event.form.notvisible;
        break;
      case 'sections':
      case 'tabs':
      case 'step':
      case 'div':
      case 'listWithComponentsChild':
      case 'cardWithComponents':
      case 'timelineChild':
        if (this.selectedNode.id) {
          if (event.type == 'tabs') {
            this.selectedNode['disabled'] = event.form.disabled;
          }
          else if (event.type == 'div') {
            this.selectedNode['rowClass'] = event.form.rowClass;
            this.selectedNode['componentMapping'] = event.form.componentMapping;
            this.selectedNode['image'] = event.form.image;
            this.selectedNode['imageSrc'] = event.form.imageSrc;
            // if (event.form.imageSrc) {
            //   this.selectedNode.imageSrc = event.form.imageSrc;
            // } else {
            //   this.selectedNode.imageSrc = this.dataSharedService.imageUrl;
            // }
            // this.dataSharedService.imageUrl = '';
            if (event.form.divRepeat > 0) {
              this.addDynamic(event.form.nodes, 'step', 'mainStep');
            }
          }
          else if (event.type == 'sections') {
            if (Array.isArray(event.form.className)) {
              if (event.form.className.length > 0) {
                let classArray: any;
                for (let i = 0; i < event.form.className.length; i++) {
                  if (i == 0) {
                    classArray = event.form.className[i];
                  }
                  else {
                    classArray = classArray + ' ' + event.form.className[i];
                  }
                };
                this.selectedNode['className'] = classArray;
              }
            }
            else {
              this.selectedNode['className'] = event.form.className;
            }
            const filteredNodes = this.filterInputElements(
              this.selectedNode?.children?.[1]?.children
            );
            filteredNodes.forEach((node) => {
              if (event.form.sectionClassName) {
                if (event.form?.sectionClassName.includes('$')) {
                  node['appGlobalInnerIconClass'] = this.changeWithGlobalClass(event.form.sectionClassName);
                } else {
                  node['appGlobalInnerIconClass'] = '';
                }
                node.className = event.form.sectionClassName;
              } else {
                node['appGlobalInnerIconClass'] = '';
              }
              node.formly[0].fieldGroup = this.sectionFormlyConfigApply(
                event.form,
                node.formly[0].fieldGroup
              );
            });
            this.selectedNode?.children?.[1]?.children?.forEach((element: any) => {
              if (!element.formly) {
                element['tooltipIcon'] = event.form.tooltipIcon;
              }
            });

            this.selectedNode.title = event.form.title;
            // this.selectedNode.className = event.form.className;
            this.selectedNode.tooltip = event.form.tooltip;
            this.selectedNode['tooltipWithoutIcon'] =
              event.form.tooltipWithoutIcon;
            this.selectedNode.hideExpression = event.form.hideExpression;
            this.selectedNode['id'] = event.form?.id;
            this.selectedNode['key'] = event.form?.key;
            this.selectedNode.sectionClassName = event.form.sectionClassName;
            this.selectedNode.sectionDisabled = event.form.disabled;
            this.selectedNode.borderColor = event.form.borderColor;
            this.selectedNode.labelPosition = event.form.labelPosition;
            this.selectedNode.repeatable = event.form.repeatable;
            this.selectedNode.size = event.form.size;
            this.selectedNode.status = event.form.status;
            this.selectedNode.formatAlignment = event.form.formatAlignment;
            this.selectedNode.isBordered = event.form.isBordered;
            this.selectedNode['borderRadius'] = event.form.borderRadius;
            this.selectedNode['tooltipIcon'] = event.form.tooltipIcon;
            this.selectedNode['rowClass'] = event.form.rowClass;
            this.selectedNode['borderLessInputs'] = event.form.borderLessInputs;
            this.selectedNode['inputLabelClassName'] = event.form.inputLabelClassName;
            // const filteredCascader = this.findObjectByTypeBase(this.selectedNode?.children?.[1] , 'cascader');
            // if (this.selectedNode['borderRadius'] && filteredCascader) {
            //   filteredCascader['borderRadius'] = this.selectedNode['borderRadius']
            //   document.documentElement.style.setProperty('--cascaderBorderRadius', this.selectedNode['borderRadius']);
            //   this.cdr.detectChanges();
            // }


            if (this.selectedNode.children) {
              this.selectedNode.children[1]['rowClass'] = event.form.rowClass;
            }
            if (this.selectedNode.wrappers != event.form.wrappers) {
              this.selectedNode.wrappers = event.form.wrappers;
              this.clickBack();
            }
            if (event.form.inputLabelClassName) {
              if (this.selectedNode['inputLabelClassName'] != event.form.inputLabelClassName) {
                this.clickBack();
              }
            }
            // if(this.selectedNode.size && filteredCascader){
            //   filteredCascader['size']= this.selectedNode.size;
            // }
          }
          // this.selectedNode['checkData'] =
          //   this.selectedNode.checkData == undefined
          //     ? ''
          //     : this.selectedNode.checkData;
          // let check = this.arrayEqual(
          //   this.selectedNode.checkData,
          //   event.tableDta == undefined
          //     ? event.tableDta
          //     : this.selectedNode.tableBody
          // );
          if (this.selectedNode?.checkData) {
            this.selectedNode.checkData = [];
          }
          if (event.tableDta && event.tableDta?.length > 0) {
            const item = this.selectedNode.dbData[0];
            let newNode: any = {};
            if (
              event.type == 'tabs' ||
              event.type == 'step' ||
              event.type == 'div' ||
              event.type == 'listWithComponentsChild' ||
              event.type == 'cardWithComponents' ||
              event.type == 'timelineChild'
            ) {
              newNode = JSON.parse(
                JSON.stringify(this.selectedNode?.children)
              );
            }
            else {
              newNode = JSON.parse(
                JSON.stringify(
                  this.selectedNode?.children?.[1]?.children?.[0]
                )
              );
            }
            if (
              event.type == 'tabs' ||
              event.type == 'step' ||
              event.type == 'div' ||
              event.type == 'timelineChild' ||
              event.type == 'listWithComponentsChild' ||
              event.type == 'cardWithComponents'
            ) {
              if (event.tableDta) {
                event.tableDta.forEach((element: any) => {
                  if (newNode.length) {
                    newNode.forEach((j: any) => {
                      const keyObj = this.findObjectByKey(
                        j,
                        element.fileHeader
                      );
                      if (keyObj && element.defaultValue) {
                        const updatedObj = this.dataReplace(
                          keyObj,
                          item,
                          element
                        );
                        j = this.replaceObjectByKey(
                          j,
                          keyObj.key,
                          updatedObj
                        );
                      }
                    });
                  }
                });
              }
            }
            else if (
              event.type != 'tabs' &&
              event.type != 'step' &&
              event.type != 'div' &&
              event.type != 'timelineChild' &&
              event.type != 'listWithComponentsChild' &&
              event.type != 'cardWithComponents'
            ) {
              if (event.tableDta) {
                event.tableDta.forEach((element: any) => {
                  const keyObj = this.findObjectByKey(
                    newNode,
                    element.fileHeader
                  );
                  if (keyObj && element.defaultValue) {
                    const updatedObj = this.dataReplace(
                      keyObj,
                      item,
                      element
                    );
                    newNode = this.replaceObjectByKey(
                      newNode,
                      keyObj.key,
                      updatedObj
                    );
                  }
                });
              }
            }
            const { selectedNode } = this;
            if (selectedNode && selectedNode.children) {
              if (
                event.type == 'tabs' ||
                event.type == 'step' ||
                event.type == 'div' ||
                event.type == 'timelineChild' ||
                event.type == 'listWithComponentsChild' ||
                event.type == 'cardWithComponents'
              ) {
                selectedNode.children = newNode;
              } else if (selectedNode.children[1]) {
                selectedNode.children[1].children = newNode
                  ? [newNode]
                  : [];
              }
              this.updateNodes();
            }
            this.updateNodes();
          }
          // if (event.dbData) {
          //   this.selectedNode.dbData = event.dbData;
          // }
          this.selectedNode.tableBody = event.tableDta ? event.tableDta : this.selectedNode.tableBody;
          this.selectedNode.mapApi = event.form.mapApi;
          // if (event.tableDta) {
          //   this.selectedNode.checkData = JSON.parse(
          //     JSON.stringify(event.tableDta)
          //   );
          // }
          if (this.selectedNode.tableBody.length > 0) {
            this.selectedNode.tableBody = this.selectedNode.tableBody.map((mapping: any) => {
              return {
                ...mapping,
                'SelectQBOField': []
              }
            });
            this.selectedNode['tableHeader'] = [];
            this.selectedNode.tableKey = [];
          }
          this.updateNodes();
        }
        break;

      case 'anchor':
      case 'mentions':
      case 'treeSelect':
      case 'tree':
      case 'treeView':
      // case 'cascader':
      //   // if (event.tableDta) {
      //   //   this.selectedNode.nodes = event.tableDta;
      //   // }
      //   if (event.form.nodes) {
      //     this.selectedNode.nodes = event.form.nodes;
      //   }
      //   if (event.form.api) {
      //     this.requestSubscription = this.builderService
      //       .genericApis(event.form.api)
      //       .subscribe({
      //         next: (res) => {
      //           switch (event.type) {
      //             case 'anchor':
      //             case 'mentions':
      //               this.selectedNode.options = res;
      //               break;
      //             case 'treeSelect':
      //             case 'tree':
      //             case 'treeView':
      //             case 'cascader':
      //               this.selectedNode.nodes = res;
      //               break;
      //             case 'transfer':
      //               this.selectedNode.list = res;
      //               break;
      //             default:
      //               break;
      //           }
      //           this.updateNodes();
      //         },
      //         error: (err) => {
      //           console.error(err); // Log the error to the console
      //           this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
      //         },
      //       });
      //   }
      //   break;
      case 'mainTab':
        document.documentElement.style.setProperty('--selected-tab-color', event.form?.selectedTabColor || 'red');
        this.addDynamic(event.form.nodes, 'tabs', 'mainTab');
        break;
      case 'kanban':
        if (event.tableDta) {
          this.selectedNode['kanlistArray'] = event.tableDta;
        }
        this.addDynamic(event.form.nodes, 'kanbanChild', 'kanban');
        break;
      case 'mainStep':
        document.documentElement.style.setProperty('--selected-stepper-color', event.form?.selectedStepperColor || 'red');
        this.addDynamic(event.form.nodes, 'step', 'mainStep');
        break;
      case 'taskManager':
        this.selectedNode['className'] = event.form.className;
        this.selectedNode['tableHeaders'] = event.form.tableHeaders;
        break;
      case 'listWithComponents':
        this.addDynamic(
          event.form.nodes,
          'listWithComponentsChild',
          'listWithComponents'
        );
        break;
      case 'mainDiv':
        this.addDynamic(event.form.divRepeat, 'div', 'mainDiv');
        break;
      case 'rate':
        // if (event.tableDta) {
        //   this.selectedNode.options = event.tableDta.map(
        //     (option: any) => option.label
        //   );
        // }
        // else {
        //   this.selectedNode.options = this.selectedNode.options.map(
        //     (option: any) => option.label
        //   );
        // }
        document.documentElement.style.setProperty('--rateSpacing', (event.form.spacing ? event.form.spacing : 8) + 'px');
        if (event.tableDta) {
          this.selectedNode.options = event.tableDta.map(
            (option: any) => option.label
          );
        } else {
          this.selectedNode.options = this.selectedNode.options.map(
            (option: any) => option.label
          );
        }
        this.cdr.detectChanges();
        break;

      case 'statistic':
        // if (event.tableDta) {
        //   this.selectedNode.statisticArray = event.tableDta;
        // } else {
        //   this.selectedNode.statisticArray = this.selectedNode.statisticArray;
        // }
        this.selectedNode.statisticArray = event.form.statisticArray;
        break;
      case 'button':
      case 'downloadButton':
      case 'linkbutton':
        // if (Array.isArray(event.form.buttonClass)) {
        //   if (event.form.buttonClass.length > 0) {
        //     let classArray: any;
        //     for (let i = 0; i < event.form.buttonClass.length; i++) {
        //       if (i == 0) {
        //         classArray = event.form.buttonClass[i];
        //       }
        //       else {
        //         classArray = classArray + ' ' + event.form.buttonClass[i];
        //       }
        //     };
        //     this.selectedNode['buttonClass'] = classArray;
        //   }
        // }
        // else {
        //   this.selectedNode['buttonClass'] = event.form.buttonClass;
        // }
        this.selectedNode.btnIcon = event.form?.icon;
        this.selectedNode['buttonClass'] = event.form?.buttonClass;
        // this.selectedNode['captureData'] = event.form?.captureData;

        break;
      case 'header':
        this.selectedNode['headerCollapse'] = event.form?.headerCollapse;
        this.selectedNode['expandedIconPosition'] = event.form?.expandedIconPosition;
        this.selectedNode['headingSize'] = event.form?.headingSize;
        this.selectedNode['backGroundColor'] = event.form?.backGroundColor;
        this.selectedNode['textColor'] = event.form?.textColor;
        this.selectedNode['header'] = event.form?.header;
        this.selectedNode['title'] = event.form?.title;
        this.selectedNode['className'] = event.form?.className;
        // this.selectedNode['key'] = event.form?.key;
        // this.selectedNode['id'] = event.form?.id;
        break;
      case 'accordionButton':
        this.selectedNode.nzExpandedIcon = event.form?.icon;
        if (event.form?.headerColor) {
          if (this.selectedNode.style) {
            this.selectedNode.style['--background'] = event.form?.headerColor;
          } else {
            this.selectedNode.style = { '--background': event.form.headerColor, };
          }
        }
        break;
      case 'segmented':
      case 'tag':
        // if (event.tableDta) {
        //   this.selectedNode.options = event.tableDta;
        // } else {
        //   this.selectedNode.options = this.selectedNode.options;
        // }
        this.selectedNode.options = this.selectedNode.options;
        break;
      case 'select':
      case 'repeatSection':
      case 'multiselect':
      // case "tag":
      case 'search':
      case 'radiobutton':
      case 'checkbox':
      case 'decimal':
      case 'input':
      case 'email':
      case 'inputGroup':
      case 'image':
      case 'telephone':
      case 'textarea':
      case 'time':
      case 'timepicker':
      case 'month':
      case 'year':
      case 'week':
      case 'datetime':
      case 'date':
      case 'color':
      case 'autoComplete':
      case 'number':
      case 'customMasking':
      case 'url':
      case 'multiFileUploader':
      case 'audioVideoRecorder':
      case 'image':
      case 'cascader':
      case 'signaturePad':
        if (this.selectedNode) {
          needToUpdate = false;

          this.selectedNode.title = event.form.title;

          this.selectedNode.apiUrl = event.form.apiUrl;
          this.selectedNode['key'] = event.form?.key;
          this.selectedNode['id'] = event.form?.id;
          this.selectedNode['copyJsonIcon'] = event.form.copyJsonIcon;
          // this.selectedNode.className = event.form.className;
          this.selectedNode['tooltip'] = event.form.tooltip;
          this.selectedNode['tooltipWithoutIcon'] =
            event.form.tooltipWithoutIcon;
          this.selectedNode.hideExpression = event.form.hideExpression;
          this.selectedNode.formly?.forEach((elementV1) => {
            // MapOperator(elementV1 = currentData);
            const formly = elementV1 ?? {};
            const fieldGroup = formly.fieldGroup ?? [];
            fieldGroup[0].defaultValue = event.form.defaultValue;
            if (fieldGroup[0]['key'] != event.form.key) {
              if (fieldGroup[0] && fieldGroup[0].key)
                this.formlyModel[event.form.key] =
                  this.formlyModel[fieldGroup[0]['key'] as string];
            }
            fieldGroup[0]['key'] = event.form.key;
            fieldGroup[0]['hide'] = false;
            const props = fieldGroup[0]?.props ?? {};
            if (event.form.formlyTypes && event.form.formlyTypes != props['additionalProperties']['formlyTypes']) {
              let formlyData = this.findFormlyTypeObj(this.htmlTabsData[0], event.form.formlyTypes)
              if (formlyData['parameter']) {
                this.selectedNode.type = formlyData.configType;
                this.selectedNode.formlyType = formlyData.parameter;
                fieldGroup[0]['type'] = formlyData.type;
                props['type'] = formlyData.fieldType;
                props['options'] = this.makeFormlyOptions(
                  formlyData?.options,
                  formlyData.type
                );
                // this.selectedNode['key'] = event.form.event.form.formlyTypes.configType.toLowerCase() + "_" + Guid.newGuid();
                // this.selectedNode['id'] = this.screenName + "_" + event.form.event.form.formlyTypes.parameter.toLowerCase() + "_" + Guid.newGuid();
              }
            }

            if (Array.isArray(event.form.className)) {
              if (event.form.className.length > 0) {
                let classArray: string = '';
                for (let i = 0; i < event.form.className.length; i++) {
                  const classObj: string[] = event.form.className[i].split(" ");
                  if (classObj.length > 0) {
                    for (let j = 0; j < classObj.length; j++) {
                      if (j === 0 && i === 0) {
                        classArray = classObj[j];
                      } else {
                        classArray += ' ' + classObj[j];
                      }
                    }
                  }
                }
                this.selectedNode.className = classArray;
                props['className'] = classArray;
              }
            }
            else {
              props['className'] = event.form.className;
              this.selectedNode['className'] = event.form.className;
            }

            // if (Array.isArray(event.form.className)) {
            //   if (event.form.className.length > 0) {
            //     let classArray: any;
            //     for (let i = 0; i < event.form.className.length; i++) {
            //       if (i == 0) {
            //         classArray = event.form.className[i];
            //       } else {
            //         classArray = classArray + ' ' + event.form.className[i];
            //       }
            //     }
            //     this.selectedNode['className'] = classArray;
            //     props['className'] = classArray;
            //   }
            // }
            // else {
            //   props['className'] = event.form.className;
            //   this.selectedNode['className'] = event.form.className;
            // }
            props.label = event.form.title;
            // props['key'] = event.form.key
            this.formlyModel[event.form.key] = event.form.defaultValue
              ? event.form.defaultValue
              : this.formlyModel[event.form.key];
            this.updateFormlyModel();
            props['className'] = event.form.className;
            // props['hideExpression'] = event.form.hideExpression;
            props.placeholder = event.form.placeholder;
            // props['className'] = event.form.className;
            // if (event.tableDta) {
            //   props['options'] = event.tableDta;
            // }
            if (event.form.options) {
              props['options'] = event.form.options;
            }
            // props['options'] = event.form.options
            props['required'] = event.form.required;
            props['apiUrl'] = event.form.apiUrl;
            props['maxLength'] = event.form.maxLength;
            props['minLength'] = event.form.minLength;
            props['disabled'] = event.form.disabled;
            props['additionalProperties']['tooltip'] = event.form.tooltip;
            props['className'] = event.form.className;
            props['additionalProperties']['titleIcon'] = event.form.titleIcon;
            props['maskString'] = event.form.maskString;
            props['masktitle'] = event.form.masktitle;
            props['rows'] = event.form.rows;
            props['additionalProperties']['addonRight'] = event.form.addonRight;
            props['additionalProperties']['addonLeft'] = event.form.addonLeft;
            props['additionalProperties']['prefixicon'] = event.form.prefixicon;
            props['additionalProperties']['suffixicon'] = event.form.suffixicon;
            props['additionalProperties']['border'] = event.form.border;
            props['additionalProperties']['requiredMessage'] =
              event.form.requiredMessage;
            props['additionalProperties']['optionWidth'] =
              event.form.optionWidth;
            props['additionalProperties']['step'] = event.form.step;
            props['additionalProperties']['format'] = event.form.format;
            props['additionalProperties']['allowClear'] = event.form.allowClear;
            props['additionalProperties']['serveSearch'] =
              event.form.serveSearch;
            props['additionalProperties']['showArrow'] = event.form.showArrow;
            props['additionalProperties']['showSearch'] = event.form.showSearch;
            props['additionalProperties']['clearIcon'] = event.form.clearIcon;
            props['additionalProperties']['loading'] = event.form.loading;
            props['additionalProperties']['optionHieght'] =
              event.form.optionHieght;
            props['additionalProperties']['optionHoverSize'] =
              event.form.optionHoverSize;
            props['additionalProperties']['optionDisabled'] =
              event.form.optionDisabled;
            props['additionalProperties']['optionHide'] = event.form.optionHide;
            props['additionalProperties']['firstBtnText'] =
              event.form.firstBtnText;
            props['additionalProperties']['secondBtnText'] =
              event.form.secondBtnText;
            props['additionalProperties']['minuteStep'] = event.form.minuteStep;
            props['additionalProperties']['secondStep'] = event.form.secondStep;
            props['additionalProperties']['hoursStep'] = event.form.hoursStep;
            props['additionalProperties']['use12Hours'] = event.form.use12Hours;
            props['additionalProperties']['icon'] = event.form.icon;
            props['additionalProperties']['tooltipWithoutIcon'] =
              event.form.tooltipWithoutIcon;
            props['additionalProperties']['setVariable'] =
              event.form?.setVariable;
            props['additionalProperties']['getVariable'] =
              event.form?.getVariable;
            props['additionalProperties']['iconSize'] = event.form?.iconSize;
            props['additionalProperties']['iconType'] = event.form?.iconType;
            props['additionalProperties']['iconColor'] = event.form?.iconColor;
            props['additionalProperties']['hoverIconColor'] =
              event.form?.hoverIconColor;
            props['additionalProperties']['tooltipPosition'] =
              event.form?.tooltipPosition;
            props['additionalProperties']['toolTipClass'] =
              event.form?.toolTipClass;
            props['additionalProperties']['classesArray'] =
              event.form?.classesArray;
            props['additionalProperties']['selectType'] =
              event.form?.selectType;
            props['additionalProperties']['formlyTypes'] = event.form?.formlyTypes;
            props['additionalProperties']['uploadBtnLabel'] = event.form?.uploadBtnLabel;
            props['additionalProperties']['multiple'] = event.form?.multiple;
            props['additionalProperties']['disabled'] = event.form?.disabled;
            props['additionalProperties']['showDialogueBox'] = event.form?.showDialogueBox;
            props['additionalProperties']['showUploadlist'] = event.form?.showUploadlist;
            props['additionalProperties']['onlyDirectoriesAllow'] = event.form?.onlyDirectoriesAllow;
            props['additionalProperties']['uploadLimit'] = event.form?.uploadLimit;
            props['additionalProperties']['uploadSelectType'] = event.form?.uploadSelectType;
            props['additionalProperties']['fileUploadSize'] = event.form?.fileUploadSize;
            props['additionalProperties']['multiFileUploadTypes'] = event.form?.multiFileUploadTypes;
            props['additionalProperties']['innerInputClass'] = event.form?.innerInputClass;
            if (event.form?.innerInputClass) {
              if (event.form?.innerInputClass.includes('$')) {
                props['additionalProperties']['appGlobalInnerClass'] = this.changeWithGlobalClass(event.form?.innerInputClass);
              } else {
                props['additionalProperties']['appGlobalInnerClass'] = ''
              }
            } else {
              props['additionalProperties']['appGlobalInnerClass'] = ''
            }
            props['additionalProperties']['InputGroupClass'] = event.form?.InputGroupClass;
            if (event.form?.InputGroupClass) {
              if (event.form?.InputGroupClass.includes('$')) {
                props['additionalProperties']['appGlobalInnerClass'] = this.changeWithGlobalClass(event.form?.InputGroupClass);
              } else {
                props['additionalProperties']['appGlobalInnerClass'] = ''
              }
            } else {
              props['additionalProperties']['appGlobalInnerClass'] = ''
            }
            props['additionalProperties']['dataClassification'] = event.form?.dataClassification;
            // props['additionalProperties']['disabledBeforeCurrent'] = event.form?.disabledBeforeCurrent;
            props['additionalProperties']['disabledCalenderProperties'] = event.form?.disabledCalenderProperties;
            props['additionalProperties']['browserButtonColor'] = event.form?.browserButtonColor;
            props['additionalProperties']['hoverBrowseButtonColor'] = event.form?.hoverBrowseButtonColor;
            props['additionalProperties']['expandTrigger'] = event.form?.expandTrigger;
            props['additionalProperties']['applicationThemeClasses'] = event.form?.applicationThemeClasses;
            props['additionalProperties']['wrapperLabelClass'] = event.form?.wrapperLabelClass;
            props['additionalProperties']['wrapperInputClass'] = event.form?.wrapperInputClass;
            props['additionalProperties']['showAddButton'] = event.form?.showAddButton;
            props['additionalProperties']['signatureClearButtonClass'] = event.form?.signatureClearButtonClass;
            props['additionalProperties']['signatureAddButtonClass'] = event.form?.signatureAddButtonClass;
            props['additionalProperties']['height'] = event.form?.height;
            if (event.form?.browserButtonColor) {
              document.documentElement.style.setProperty('--browseButtonColor', event.form?.browserButtonColor || '#2563EB');
            }
            if (event.form?.hoverBrowseButtonColor) {
              document.documentElement.style.setProperty('--hoverBrowseButtonColor', event.form?.hoverBrowseButtonColor || '#3b82f6');
            }
            props['additionalProperties']['filetype'] = event.form?.filetype;
            props['readonly'] = event.form.readonly;
            // props['options'] = event.form.options;
            // if (event.tableDta) {
            //   props['options'] = event.tableDta;
            // }
            // if (this.selectedNode.type == "multiselect" && event.form.defaultValue) {
            //   const arr = event.form.defaultValue.split(',');
            //   props['defaultValue'] = arr;
            // } else {
            // }
            // if (event.form.api || event.form?.apiUrl) {
            //   this.requestSubscription = this.applicationService
            //     .getNestCommonAPI(event.form.apiUrl)
            //     .subscribe({
            //       next: (res) => {
            //         
            //         if (res?.data?.length > 0) {
            //           let propertyNames = Object.keys(res.data[0]);
            //           let result = res.data.map((item: any) => {
            //             let newObj: any = {};
            //             let propertiesToGet: string[];
            //             if ('id' in item && 'name' in item) {
            //               propertiesToGet = ['id', 'name'];
            //             } else {
            //               propertiesToGet = Object.keys(item).slice(0, 2);
            //             }
            //             propertiesToGet.forEach((prop) => {
            //               newObj[prop] = item[prop];
            //             });
            //             return newObj;
            //           });

            //           let finalObj = result.map((item: any) => {
            //             return {
            //               label: item.name || item[propertyNames[1]],
            //               value: item.id || item[propertyNames[0]],
            //             };
            //           });
            //           props.options = finalObj;
            //         }
            //       },
            //       error: (err) => {
            //         console.error(err); // Log the error to the console
            //         this.toastr.error('An error occurred', {
            //           nzDuration: 3000,
            //         }); // Show an error message to the user
            //       },
            //     });
            // }
          });
          // this.updateNodes();
        }
        break;
      case 'inputValidationRule':

        if (this.selectedNode) {
          const selectedScreen = this.screens.filter(
            (a: any) => a.name == this.screenname
          );
          const jsonRuleValidation = {
            "screenname": this.screenname,
            "screenbuilderid": this.id,
            "cid": this.selectedNode.id,
            "key": this.selectedNode?.formly?.[0]?.fieldGroup?.[0]?.key,
            "type": event.form.type,
            "label": event.form.label,
            "reference": event.form.reference,
            "minlength": event.form.minlength,
            "maxlength": event.form.maxlength,
            "pattern": event.form.pattern,
            "required": event.form.required,
            "emailtypeallow": event.form.emailTypeAllow,
            "applicationid": this.selectApplicationName,
          }
          var JOIData = JSON.parse(JSON.stringify(jsonRuleValidation) || '{}');
          // const validationRuleModel = {
          //   [tableValue]: JOIData
          // }
          // const checkAndProcess = this.validationRuleId == ''
          const tableValue = `ValidationRule`;
          var ResponseGuid: any;
          if (!event.form.id) {
            const { newGuid, metainfocreate } = this.socketService.metainfocreate();
            ResponseGuid = newGuid;
            const Add = { [tableValue]: JOIData, metaInfo: metainfocreate }
            this.socketService.Request(Add);
          }
          else {
            const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(event.form.id);
            ResponseGuid = newUGuid;
            const Update = { [tableValue]: JOIData, metaInfo: metainfoupdate };
            this.socketService.Request(Update)
          }

          this.socketService.OnResponseMessage().subscribe({
            next: (res: any) => {
              if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
                if (res.isSuccess) {
                  this.getJoiValidation(this.id);
                  this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
                }
                else
                  this.toastr.error(`Validation Rule: ${res.message}`, { nzDuration: 3000 })
              }
            },
            error: (err) => {
              this.toastr.error(`Validation rule not save, some exception unhandle`, { nzDuration: 3000 });

            }
          });
        }
        break;
      case 'avatar':
        if (event.form.src) {
          this.selectedNode.src = event.form.src;
        } else if (this.dataSharedService.imageUrl) {
          this.selectedNode.src = this.dataSharedService.imageUrl;
        }
        this.dataSharedService.imageUrl = '';
        break;
      case 'imageUpload':
        this.selectedNode['image'] = event.form.image;
        // if (event.form.source) {
        //   this.selectedNode.source = event.form.source;
        // } else if (this.dataSharedService.imageUrl) {
        //   this.selectedNode.source = this.dataSharedService.imageUrl;
        // }
        // this.dataSharedService.imageUrl = '';
        break;
      case 'calender':
        if (this.selectedNode.id) {
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
        }
        break;
      case 'gridList':
        if (this.selectedNode.id) {
          if (event.form.formType) {
            if (event.form.formType == 'newTab' && (event.form.routeUrl == '' || event.form.routeUrl == undefined)) {
              alert('plase proide url')
            }
          }

          // this.selectedNode.sortDirections = event.form.sortDirections
          //   ? JSON.parse(event.form.sortDirections)
          //   : event.form?.sortDirections;
          this.selectedNode.className = event.form?.className;
          this.selectedNode.doubleClick = event.form?.doubleClick;
          this.selectedNode.filterMultiple = event.form?.filterMultiple;
          this.selectedNode.rowClickApi = event.form?.rowClickApi;
          this.selectedNode['key'] = event.form?.key;
          this.selectedNode['id'] = event.form?.id;
          this.selectedNode['tooltip'] = event.form?.tooltip;
          this.selectedNode['tooltipWithoutIcon'] = event.form?.tooltipWithoutIcon;
          this.selectedNode['toolTipClass'] = event.form?.toolTipClass;
          this.selectedNode['tooltipPosition'] = event.form?.tooltipPosition;
          this.selectedNode['hideExpression'] = event.form?.hideExpression;
          this.selectedNode['nzFooter'] = event.form?.nzFooter;
          this.selectedNode['title'] = event.form?.title;
          this.selectedNode['nzTitle'] = event.form?.nzTitle;
          this.selectedNode['nzPaginationPosition'] = event.form?.nzPaginationPosition;
          this.selectedNode['nzPaginationType'] = event.form?.nzPaginationType;
          this.selectedNode['nzSize'] = event.form?.nzSize;
          this.selectedNode['position'] = event.form?.position;
          this.selectedNode['filterMultiple'] = event.form?.filterMultiple;
          this.selectedNode['nzBordered'] = event.form?.nzBordered;
          this.selectedNode['showColumnHeader'] = event.form?.showColumnHeader;
          this.selectedNode['noResult'] = event.form?.noResult;
          this.selectedNode['nzShowSizeChanger'] = event.form?.nzShowSizeChanger;
          this.selectedNode['nzSimple'] = event.form?.nzSimple;
          this.selectedNode['showCheckbox'] = event.form?.showCheckbox;
          this.selectedNode['isAddRow'] = event.form?.isAddRow;
          this.selectedNode['rowClickApi'] = event.form?.rowClickApi;
          this.selectedNode['nzLoading'] = event.form?.nzLoading;
          this.selectedNode['nzShowPagination'] = event.form?.nzShowPagination;
          this.selectedNode['showEditInput'] = event.form?.showEditInput;
          this.selectedNode['openComponent'] = event.form?.openComponent;
          this.selectedNode['isDeleteAllow'] = event.form?.isDeleteAllow;
          this.selectedNode['isAllowGrouping'] = event.form?.isAllowGrouping;
          this.selectedNode['isAllowExcelReport'] = event.form?.isAllowExcelReport;
          this.selectedNode['isAllowUploadExcel'] = event.form?.isAllowUploadExcel;
          this.selectedNode['isAllowSearch'] = event.form?.isAllowSearch;
          this.selectedNode['tableName'] = event.form?.tableName;
          this.selectedNode['buttonPositions'] = event.form?.buttonPositions;
          this.selectedNode['buttonAlignments'] = event.form?.buttonAlignments;
          this.selectedNode['formType'] = event.form?.formType;
          this.selectedNode['routeUrl'] = event.form?.routeUrl;
          this.selectedNode['searchType'] = event.form?.searchType;
          this.selectedNode['drawerButtonLabel'] = event.form?.drawerButtonLabel;
          this.selectedNode['drawerWidth'] = event.form?.drawerWidth;
          this.selectedNode['isShowDrawerButton'] = event.form?.isShowDrawerButton;
          this.selectedNode['drawerScreenLink'] = event.form?.drawerScreenLink;
          this.selectedNode['drawerPlacement'] = event.form?.drawerPlacement;
          this.selectedNode['startFreezingNumber'] = event.form?.startFreezingNumber;
          this.selectedNode['endFreezingNumber'] = event.form?.endFreezingNumber;
          this.selectedNode['stickyHeaders'] = event.form?.stickyHeaders;
          this.selectedNode['rowSelected'] = event.form?.rowSelected;
          this.selectedNode['outerBordered'] = event.form?.outerBordered;
          this.selectedNode['showTotal'] = event.form?.showTotal;
          this.selectedNode['changePageSize'] = event.form?.changePageSize;
          this.selectedNode['rotationDegree'] = event.form?.rotationDegree;
          this.selectedNode['headingClass'] = event.form?.headingClass;
          this.selectedNode['heading'] = event.form?.heading;
          this.selectedNode['tableHeaderClass'] = event.form?.tableHeaderClass;
          this.selectedNode['thLabelClass'] = event.form?.thLabelClass;
          this.selectedNode['thClass'] = event.form?.thClass;
          this.selectedNode['tbodyClass'] = event.form?.tbodyClass;
          this.selectedNode['dataRow'] = event.form?.dataRow;
          this.selectedNode['deleteCell'] = event.form?.deleteCell;
          this.selectedNode['editCell'] = event.form?.editCell;
          this.selectedNode['tdClass'] = event.form?.tdClass;
          this.selectedNode['tdrowClass'] = event.form?.tdrowClass;
          this.selectedNode['hieght'] = event.form?.hieght;
          this.selectedNode['searchfieldClass'] = event.form?.searchfieldClass;
          this.selectedNode['actionButtonClass'] = event.form?.actionButtonClass;
          this.selectedNode['paginationColor'] = event.form?.paginationColor;
          if (event.form?.paginationColor) {
            document.documentElement.style.setProperty('--paginationColor', event.form?.paginationColor);
          }

          if (event.form?.hieght) {
            this.selectedNode['stickyHeaders'] = true;
          }
          let tableData: any = '';
          if (event.tableDta) {
            tableData = event.tableDta;
          }
          // const tableData = event.form.options;
          this.selectedNode['end'] = event.form?.end;
          this.selectedNode['serverSidePagination'] = event.form?.serverSidePagination;
          // const tableData = event.tableDta ? event.tableDta : event.form.options;
          if (tableData) {
            const updatedData = tableData.filter((updatedItem: any) => {
              const key = updatedItem.key;
              return !this.selectedNode.tableHeaders.some((headerItem: any) => headerItem.key === key);
            });

            if (updatedData.length > 0) {
              this.selectedNode.tableHeaders.forEach((item: any) => {
                updatedData.forEach((updatedItem: any) => {
                  item[updatedItem.key] = "";
                });
              });
            }

            this.selectedNode.tableHeaders = event.tableDta ? event.tableDta : event.form.options;
          }


          // if (this.selectedNode.tableHeaders.length > 0) {
          //   let newHeaders = this.selectedNode.tableHeaders.map((obj: any) => {
          //     let newObj = { ...obj };
          //     let key = newObj.key;
          //     if (event.form.sortOrder) {
          //       newObj.sortOrder = event.form.sortOrder;
          //     }
          //     if (event.form.sortDirections) {
          //       newObj.sortDirections = event.form.sortDirections;
          //     }
          //     if (event.form.filterMultiple) {
          //       newObj.filterMultiple = event.form.filterMultiple;
          //     }
          //     if (newObj.listOfFilter) {
          //       newObj.listOfFilter = JSON.parse(newObj.listOfFilter);
          //     }
          //     return newObj;
          //   });
          //   this.selectedNode.tableHeaders = newHeaders;
          // }
          // this.selectedNode.tableKey = this.selectedNode.tableHeaders.map((key: any) => ({ name: key.key }));
          // if (event.tableDta) {
          //   this.selectedNode.columnData = this.updateTableData(
          //     event.tableDta ? event.tableDta : event.form.options,
          //     event.tableDta ? event.tableDta : event.form.options
          //     // event.form.options, event.form.options
          //   );
          // }
          if (event.form.api) {
            this.requestSubscription = this.builderService
              .genericApis(event.form.api)
              .subscribe({
                next: (res) => {
                  this.selectedNode.tableData = res.tableData;
                  this.selectedNode.tableHeaders = res.tableHeaders;
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
                },
              });
          }
          if (this.selectedNode.noResult) {
            if (this.selectedNode.tableData.length > 0) {
              this.selectedNode['tableNoResultArray'] =
                this.selectedNode.tableData;
              this.selectedNode.tableData = [];
            }
          }
          else {
            if (this.selectedNode['tableNoResultArray'])
              this.selectedNode.tableData =
                this.selectedNode['tableNoResultArray'];
          }
          if (this.selectedNode.tableHeaders.length > 0) {
            this.selectedNode.tableHeaders.forEach((header: any) => {
              if (header) {
                header.headerFreeze = false;
              }
            });
          }
          this.selectedNode.tableKey = this.selectedNode.tableHeaders;
        }
        break;

      case 'dropdownButton':

        this.selectedNode.btnIcon = event.form?.icon;
        if (event.tableDta) {
          this.selectedNode.dropdownOptions = event.tableDta;
        }
        // this.selectedNode.dropdownOptions = event?.form?.dropdownOptions;
        break;
      case 'fixedDiv':
        if (event.form.api) {
          this.requestSubscription = this.builderService
            .genericApis(event.form.api)
            .subscribe({
              next: (res) => {
                if (Array.isArray(res)) {
                  res.forEach((item) => {
                    this.selectedNode?.children?.push(item);
                  });
                } else {
                  this.selectedNode?.children?.push(res);
                }
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
              },
            });
        }
        break;
      case 'chart':
        if (this.selectedNode) {
          var seriesList = [];
          var ans = Array.isArray(event.form.options[0].data);
          if (ans != true) {
            {
              var arrayData = event.form.options[0].data.split(',');
              for (let index = 0; index < arrayData.length; index++) {
                seriesList.push(arrayData[index]);
              }
            }
          } else {
            seriesList = event.form.options[0].data;
          }
          this.selectedNode.section[0].filterData[0].heading = event.form.title;
          this.selectedNode.section[0].filterData[0].subheading =
            event.form.sub_label;
          // this.selectedNode.section[0].filterData[0].refundsChart.series[0].data = event.form.options;
          this.selectedNode.section[0].filterData[0].price =
            event.form.options[0].price;
          this.selectedNode.section[0].filterData[0].refundsChart.colors =
            event.form.options[0].colors;
          this.selectedNode.section[0].filterData[0].refundsChart.series[0].data =
            seriesList;
          this.selectedNode.link = event.form.link;
          if (event.form.link) {
            this.requestSubscription = this.builderService
              .salesDataApi()
              .subscribe({
                next: (res) => {
                  if (this.selectedNode.section) {
                    this.selectedNode.section[0].price = res[0]?.price;
                    this.selectedNode.section[0].filterData[0].price =
                      res[0]?.price;
                    this.selectedNode.section[0].colors = res[0]?.colors;
                    this.selectedNode.section[0].data = res[0]?.data;
                    this.selectedNode.section[0].filtertype = res[0]?.filter;
                    this.selectedNode.section[0].filterData[0].refundsChart.series[0].data =
                      res[0]?.data;
                    this.selectedNode.section[0].filterData[0].refundsChart.colors =
                      res[0]?.colors;
                  }
                  this.updateNodes();
                },
                error: (err) => {
                  console.error(err); // Log the error to the console
                  this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
                },
              });
            event.form.link = '';
          }
        }
        break;
      case "heading":

        this.selectedNode.fontstyle = event.form.fontstyle
        // this.selectedNode.fontSize = event.form.style + event.form.textAlignment + 'color:' + event.form.headingColor;
        // if (event.form.headingApi) {
        //   this.requestSubscription = this.builderService.genericApis(event.form.headingApi).subscribe({
        //     next: (res) => {
        //       this.selectedNode.data = res.data;
        //       this.updateNodes();
        //     },
        //     error: (err) => {
        //       console.error(err); // Log the error to the console
        //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        //     }
        //   })
        // }
        break;
      case 'page':
        this.selectedNode.options = event.form?.options;
        this.selectedNode.primaryColor = event.form?.primaryColor;
        this.selectedNode.secondaryColor = event.form?.secondaryColor;
        document.documentElement.style.setProperty('--pagePrimaryColor', event.form?.primaryColor);
        document.documentElement.style.setProperty('--pageSecondaryColor', event.form?.secondaryColor);
        // this.selectedNode.options = event.tableDta
        //   ? event.tableDta
        //   : event.form?.options;
        if (
          this.selectedNode &&
          this.selectedNode.children &&
          this.selectedNode.children[1] &&
          this.selectedNode.children[1].children && event.form.tooltipIcon
        ) {
          this.selectedNode.children[1].children.forEach((element: any) => {
            element.children[1].children.forEach((element1: any) => {
              if (!element1.formly) {
                element1['tooltipIcon'] = event.form.tooltipIcon;
              } else if (element1.formly) {
                element1.formly[0].fieldGroup[0].props['additionalProperties'][
                  'tooltipIcon'
                ] = JSON.parse(JSON.stringify(event.form.tooltipIcon));
              }
            });
          });
        }
        this.cdr.detectChanges();
        break;

      case 'kanbanTask':
        if (this.selectedNode.id) {
          if (this.selectedNode.children) {
            for (let i = 0; i < this.selectedNode.children.length; i++) {
              this.selectedNode.children[i].id = event.form.options[i].id;
              this.selectedNode.children[i].title = event.form.options[i].title;
              this.selectedNode.children[i].date = event.form.options[i].date;
              this.selectedNode.children[i].content =
                event.form.options[i].content;
              this.selectedNode.children[i].users = JSON.parse(
                event.form.options[i].users
              );
              this.selectedNode.children[i].status =
                event.form.options[i].status;
              this.selectedNode.children[i].variant =
                event.form.options[i].variant;
            }
          }

          if (event.form.kanbanTaskApi != undefined) {
            this.requestSubscription = this.builderService
              .genericApis(event.form.kanbanTaskApi)
              .subscribe({
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
                  this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
                },
              });
          }
          this.updateNodes();
        }
        break;
      case 'carouselCrossfade':
        // if (event.tableDta) {
        //   this.selectedNode.carousalConfig = event.tableDta;
        // }
        this.addDynamic(event.form.nodes, 'subCarouselCrossfade', 'carouselCrossfade');
        // event.tableDta != undefined
        //   ? (this.selectedNode.carousalConfig = event.tableDta)
        //   : (this.selectedNode.carousalConfig =
        //     this.selectedNode.carousalConfig);
        // this.selectedNode.carousalConfig = event.form.carousalConfig;
        // if (event.form.link != undefined || event.form.link != '') {
        //   this.requestSubscription = this.builderService
        //     .genericApis(event.form.link)
        //     .subscribe({
        //       next: (res) => {
        //         this.selectedNode.carousalConfig = res;
        //         this.updateNodes();
        //       },
        //       error: (err) => {
        //         console.error(err); // Log the error to the console
        //         this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
        //       },
        //     });
        // }
        break;
      case 'timeline':
        this.addDynamic(event.form.nodes, 'timelineChild', 'timeline');

        // this.selectedNode['data'] = event.form.options;
        // // if (event.tableDta) {
        // //   this.selectedNode.data = event.tableDta;
        // // }
        // this.selectedNode.data = event.form.data;
        // if (event.form.api) {
        //   this.requestSubscription = this.builderService
        //     .genericApis(event.form.api)
        //     .subscribe({
        //       next: (res) => {
        //         if (res) {
        //           this.selectedNode.data = res;
        //           this.updateNodes();
        //         }
        //       },
        //       error: (err) => {
        //         console.error(err); // Log the error to the console
        //         this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
        //       },
        //     });
        // }
        break;
      case 'simpleCardWithHeaderBodyFooter':
        if (event.form.imageSrc) {
          this.selectedNode.imageSrc = event.form.imageSrc;
        } else if (this.dataSharedService.imageUrl) {
          this.selectedNode.imageSrc = this.dataSharedService.imageUrl;
        }
        this.dataSharedService.imageUrl = '';
        break;
      case 'barChart':
        if (this.selectedNode) {
          let data = event.form.columnNames;
          data.push(
            { role: 'style', type: 'string' },
            { role: 'annotation', type: 'string' }
          );
          this.selectedNode.columnNames = data;
          this.selectedNode.options = {
            chart: {
              title: event.form.title,
              subtitle: event.form.subtitle,
            },
            hAxis: {
              title: event.form.hAxisTitle,
              minValue: 0,
            },
            vAxis: {
              title: event.form.vAxisTitle,
            },
            bar: { groupWidth: event.form.groupWidth },
            bars: event.form.barType,
            isStacked: event.form.isStacked,
            colors: Array.isArray(event.form.color)
              ? event.form.color
              : event.form.color?.split(','),
          };

          // if (event.tableDta) {
          //   this.selectedNode.tableData = event.tableDta;
          //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
          //     data.name,
          //     data.value,
          //     data.value2,
          //   ]);
          // }
          if (event.form.tableData) {
            this.selectedNode.tableData = event.form.tableData;
            this.selectedNode.chartData = event.form.tableData.map((data: any) => [
              data.name,
              data.value,
              data.value2,
            ]);
          }
        }
        break;
      case 'pieChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.name,
        //     Number(data.value),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.name,
            Number(data.value),
          ]);
        }
        this.selectedNode.options = {
          title: event.form.title,
          is3D: event.form.is3D,
          pieHole: event.form.pieHole,
          pieStartAngle: event.form.pieStartAngle,
          sliceVisibilityThreshold: event.form.sliceVisibilityThreshold,
        };
        break;
      case 'bubbleChart':
        this.selectedNode.options.hAxis.fontSize = event.form.fontSize;
        this.selectedNode.options.bubble.textStyle.fontSize =
          event.form.fontSize;
        this.selectedNode.options.bubble.textStyle.fontName =
          event.form.fontName;
        this.selectedNode.options.bubble.textStyle.color = event.form.color;
        this.selectedNode.options.bubble.textStyle.bold = event.form.bold;
        this.selectedNode.options.bubble.textStyle.italic = event.form.italic;
        this.selectedNode.options = {
          title: event.form.title,
          hAxis: { title: event.form.hAxisTitle },
          vAxis: { title: event.form.vAxisTitle },
          colorAxis: {
            colors: Array.isArray(event.form.colorAxis)
              ? event.form.colorAxis
              : event.form.colorAxis?.split(','),
          },
          bubble: {
            textStyle: {
              fontSize: event.form.fontSize,
              fontName: event.form.fontName,
              color: event.form.color,
              bold: event.form.bold,
              italic: event.form.italic,
            },
          },
        };
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.id,
        //     Number(data.x),
        //     Number(data.y),
        //     Number(data.temprature),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.id,
            Number(data.x),
            Number(data.y),
            Number(data.temprature),
          ]);
        }
        break;
      case 'candlestickChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.name,
        //     Number(data.value),
        //     Number(data.value1),
        //     Number(data.value2),
        //     Number(data.value3),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.name,
            Number(data.value),
            Number(data.value1),
            Number(data.value2),
            Number(data.value3),
          ]);
        }
        break;
      case 'columnChart':
        let data = event.form.columnNames;
        data.push(
          { role: 'style', type: 'string' },
          { role: 'annotation', type: 'string' }
        );
        this.selectedNode.columnNames = data;
        this.selectedNode.options = {
          title: event.form.title,
          bar: { groupWidth: event.form.groupWidth },
          legend: {
            position: event.form.position,
            maxLines: event.form.maxLines,
          },
          hAxis: {
            title: event.form?.hAxisTitle,
          },
          vAxis: {
            title: event.form?.vAxisTitle,
          },
          isStacked: event.form.isStacked,
          colors: Array.isArray(event.form.color)
            ? event.form.color
            : event.form.color?.split(','),
        };
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode['chartData'] = event.tableDta.map((data: any) => [
        //     data.id,
        //     Number(data.col1),
        //     Number(data.col2),
        //     Number(data.col3),
        //     Number(data.col4),
        //     Number(data.col5),
        //     Number(data.col6),
        //     data.style,
        //     data.annotation,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode['chartData'] = event.form.tableData.map((data: any) => [
            data.id,
            Number(data.col1),
            Number(data.col2),
            Number(data.col3),
            Number(data.col4),
            Number(data.col5),
            Number(data.col6),
            data.style,
            data.annotation,
          ]);
        }
        break;
      case 'ganttChart':
        this.selectedNode.options = {
          criticalPathEnabled: event.form.isCriticalPath, //if true then criticalPathStyle apply
          criticalPathStyle: {
            stroke: event.form.stroke,
            strokeWidth: event.form.isCriticalPath,
          },
          innerGridHorizLine: {
            stroke: event.form.isCriticalPath,
            strokeWidth: event.form.strokeWidth,
          },
          arrow: {
            angle: event.form.angle,
            width: event.form.arrowWidth,
            color: event.form.color,
            radius: event.form.radius,
          },
          innerGridTrack: { fill: event.form.innerGridTrack },
          innerGridDarkTrack: { fill: event.form.innerGridDarkTrack },
        };
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.taskID,
        //     data.taskName,
        //     data.resource,
        //     new Date(data.startDate),
        //     new Date(data.endDate),
        //     data.duration,
        //     data.percentComplete,
        //     data.dependencies,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.taskID,
            data.taskName,
            data.resource,
            new Date(data.startDate),
            new Date(data.endDate),
            data.duration,
            data.percentComplete,
            data.dependencies,
          ]);
        }
        break;
      case 'geoChart':
        this.selectedNode.options = {
          region: event.form.region, // Africa
          colorAxis: {
            colors: Array.isArray(event.form.colorAxis)
              ? event.form.colorAxis
              : event.form.colorAxis?.split(','),
          },
          backgroundColor: event.form.bgColor,
          datalessRegionColor: event.form.color,
          defaultColor: event.form.defaultColor,
        };
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.label,
        //     data.value,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.label,
            data.value,
          ]);
        }
        break;
      case 'treeMapChart':
        this.selectedNode.options = {
          highlightOnMouseOver: event.form.highlightOnMouseOver,
          maxDepth: event.form.width,
          maxPostDepth: event.form.maxPostDepth,
          minHighlightColor: event.form.minHighlightColor,
          midHighlightColor: event.form.midHighlightColor,
          maxHighlightColor: event.form.maxHighlightColor,
          minColor: event.form.minColor,
          midColor: event.form.midColor,
          maxColor: event.form.maxColor,
          headerHeight: event.form.headerHeight,
          showScale: event.form.showScale,
          useWeightedAverageForAggregation:
            event.form.useWeightedAverageForAggregation,
        };
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.id,
        //     data.value1,
        //     data.value2,
        //     data.value3,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.id,
            data.value1,
            data.value2,
            data.value3,
          ]);
        }
        break;
      case 'histogramChart':
        this.selectedNode.options.title = event.form.title;
        this.selectedNode.options.legend = event.form.legend;
        this.selectedNode.options.color = event.form.color;
        this.selectedNode.options.histogram = event.form.histogram;
        this.selectedNode.options.hAxis = event.form.hAxis;
        this.selectedNode.options.vAxis = event.form.vAxis;
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.label,
        //     data.value,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.label,
            data.value,
          ]);
        }
        break;
      case 'tableChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.col1,
        //     data.col2,
        //     data.col3,
        //     data.col4,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.col1,
            data.col2,
            data.col3,
            data.col4,
          ]);
        }
        break;
      case 'lineChart':
        this.selectedNode.options = {
          chart: {
            title: event.form.title,
            subtitle: event.form.subtitle,
          },
        };
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     Number(data.id),
        //     Number(data.col1),
        //     Number(data.col2),
        //     Number(data.col3),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            Number(data.id),
            Number(data.col1),
            Number(data.col2),
            Number(data.col3),
          ]);
        }
        break;
      case 'sankeyChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.label,
        //     data.link,
        //     data.value,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.label,
            data.link,
            data.value,
          ]);
        }
        break;
      case 'scatterChart':
        this.selectedNode.subtitle = event.form.subtitle;
        this.selectedNode.options = {
          width: 800,
          height: 500,
          chart: {
            title: event.form.title,
            subtitle: event.form.subtitle,
          },
          axes: {
            x: {
              0: { side: 'top' },
            },
          },
        };
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.id,
        //     data.value,
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.id,
            data.value,
          ]);
        }
        break;
      case 'areaChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.label,
        //     Number(data.col1),
        //     Number(data.col2),
        //     Number(data.col3),
        //     Number(data.col4),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.label,
            Number(data.col1),
            Number(data.col2),
            Number(data.col3),
            Number(data.col4),
          ]);
        }
        this.selectedNode.options = {
          title: event.form.title,
          isStacked: event.form.isStacked,
          legend: {
            position: event.form.position,
            maxLines: event.form.maxLines,
          },
          selectionMode: event.form.selectionMode,
          tooltip: { trigger: event.form.tooltip },
          hAxis: {
            title: event.form.hAxis,
            titleTextStyle: { color: event.form.titleTextStyle },
          },
          vAxis: { minValue: event.form.minValue },
        };
        break;
      case 'comboChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.label,
        //     Number(data.col1),
        //     Number(data.col2),
        //     Number(data.col3),
        //     Number(data.col4),
        //     Number(data.col5),
        //     Number(data.col6),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.label,
            Number(data.col1),
            Number(data.col2),
            Number(data.col3),
            Number(data.col4),
            Number(data.col5),
            Number(data.col6),
          ]);
        }
        this.selectedNode.options = {
          title: event.form.title,
          seriesType: event.form.seriesType,
          hAxis: { title: event.form.hAxis },
          vAxis: { title: event.form.vAxis },
        };
        break;
      case 'steppedAreaChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.label,
        //     Number(data.value1),
        //     Number(data.value2),
        //     Number(data.value3),
        //     Number(data.value4),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.label,
            Number(data.value1),
            Number(data.value2),
            Number(data.value3),
            Number(data.value4),
          ]);
        }
        this.selectedNode.options = {
          backgroundColor: event.form.bgColor,
          legend: { position: event.form.position },
          connectSteps: event.form.connectSteps,
          colors: Array.isArray(event.form.color)
            ? event.form.color
            : event.form.color?.split(','),
          isStacked: event.form.isStacked,
          vAxis: {
            minValue: 0,
            ticks: [0, 0.3, 0.6, 0.9, 1],
          },
          selectionMode: event.form.selectionMode,
        };
        break;
      case 'timelineChart':
        // if (event.tableDta) {
        //   this.selectedNode.tableData = event.tableDta;
        //   this.selectedNode.chartData = event.tableDta.map((data: any) => [
        //     data.label,
        //     data.value,
        //     new Date(data.startDate),
        //     new Date(data.endDate),
        //   ]);
        // }
        if (event.form.tableData) {
          this.selectedNode.tableData = event.form.tableData;
          this.selectedNode.chartData = event.form.tableData.map((data: any) => [
            data.label,
            data.value,
            new Date(data.startDate),
            new Date(data.endDate),
          ]);
        }
        this.selectedNode.options = {
          timeline: {
            showRowLabels: event.form.showRowLabels,
            colorByRowLabel: event.form.colorByRowLabel,
            singleColor: event.form.singleColor,
            rowLabelStyle: {
              fontName: event.form.rowLabelFontName,
              fontSize: event.form.rowLabelFontSize,
              color: event.form.rowLabelColor,
            },
            barLabelStyle: {
              fontName: event.form.barLabelFontName,
              fontSize: event.form.barLabelFontSize,
            },
          },
          backgroundColor: event.form.bgColor,
          alternatingRowStyle: event.form.alternatingRowStyle,
          colors: Array.isArray(event.form.color)
            ? event.form.color
            : event.form.color?.split(','),
        };
        break;
      default:
        break;
    }
    if (event.type && event.type != "inputValidationRule" && needToUpdate) {
      this.selectedNode = { ...this.selectedNode, ...event.form };
      // if (Array.isArray(event.form.className)) {
      //   if (event.form.className.length > 0) {
      //     let classArray: string = '';
      //     for (let i = 0; i < event.form.className.length; i++) {
      //       const classObj: string[] = event.form.className[i].split(" ");
      //       if (classObj.length > 0) {
      //         for (let j = 0; j < classObj.length; j++) {
      //           if (j === 0 && i === 0) {
      //             classArray = classObj[j];
      //           } else {
      //             classArray += ' ' + classObj[j];
      //           }
      //         }
      //       }
      //     }
      //     this.selectedNode.className = classArray;
      //     this.selectedNode = { ...this.selectedNode, ...event.form };
      //   }
      // }
      // else {
      //   this.selectedNode.className = event.form.className;
      // }

      // this.updateNodes();
    }

    this.showSuccess();
    this.updateNodes();
    // this.applyApplicationThemeClass();
    this.closeConfigurationList();
  }

  autocorrectClassValue(classValue: string): string {
    // Split the classValue by spaces
    const classArray = classValue.split(' ');

    // Filter out any empty class names
    const filteredClassArray = classArray.filter(className => className.trim() !== '');

    // Join the filtered class names with spaces
    const correctedClassValue = filteredClassArray.join(' ');

    return correctedClassValue;
  }

  updateTableData(tableData: any, tableHeaders: any) {
    tableData.forEach((data: any) => {
      tableHeaders.forEach((header: any) => {
        if (header.key)
          if (!data.hasOwnProperty(header.key.toLowerCase())) {
            data[header.key] = null;
          }
      });
    });
    return tableData;
  }
  showSuccess() {
    this.toastr.success('Information update successfully!', {
      nzDuration: 3000,
    });
  }
  // addDynamic(nodesNumber: any, subType: any, mainType: any) {
  //   try {
  //     if (this.selectedNode.children) {
  //       this.addControl = true;
  //       this.showNotification = false;
  //       let nodesLength = this.selectedNode.children?.length;
  //       if (nodesLength < nodesNumber) {
  //         let findControls = subType + ',' + 'input';
  //         let MainSelectedNode = this.selectedNode;
  //         this.applicationService.getNestCommonAPI(`controls/multiplConrols/${findControls}`).subscribe(((apiRes: any) => {
  //           this.selectedNode = MainSelectedNode;
  //           if (apiRes?.isSuccess) {
  //             if (apiRes?.data?.length > 0) {
  //               for (let k = 0; k < nodesNumber; k++) {
  //                 if (nodesLength < nodesNumber) {
  //                   if (mainType != 'mainDiv') {
  //                     this.selectedNode = this.getControls(apiRes.data, subType);
  //                     this.getControls(apiRes.data, 'input');
  //                     this.selectedNode = MainSelectedNode;
  //                   }
  //                   else {
  //                     if (this.selectedNode?.children) {
  //                       if (
  //                         this.selectedNode &&
  //                         this.selectedNode?.children?.length > 0
  //                       ) {
  //                         let updateObj = JSON.parse(
  //                           JSON.stringify(this.selectedNode.children[0])
  //                         );
  //                         let ChangeIdKey = this.updateIdsAndKeys(updateObj);
  //                         this.selectedNode.children?.push(ChangeIdKey);
  //                       }
  //                     }
  //                   }
  //                   nodesLength = nodesLength + 1;
  //                 }
  //                 this.updateNodes();
  //               }
  //               this.addControl = false;
  //               this.showNotification = true;
  //               this.toastr.success('Control Updated', { nzDuration: 3000 });
  //             } else {
  //               this.toastr.warning('No control found', { nzDuration: 2000 });
  //             }
  //           }
  //           else
  //             this.toastr.warning(apiRes.message, { nzDuration: 2000 });
  //         }));
  //       }
  //       else {
  //         if (this.selectdParentNode.children) {
  //           let removeTabsLength = this.selectedNode.children.length;
  //           let checkParentLength = this.selectdParentNode.children.length;
  //           for (let a = 0; a < removeTabsLength; a++) {
  //             for (let i = 0; i < checkParentLength; i++) {
  //               for (let j = 0; j < removeTabsLength; j++) {
  //                 if (this.selectdParentNode.children[i].type == mainType) {
  //                   if (nodesNumber < nodesLength) {
  //                     this.remove(
  //                       this.selectdParentNode.children[i],
  //                       this.selectedNode.children[nodesLength - 1]
  //                     );
  //                     nodesLength = nodesLength - 1;
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //           this.addControl = false;
  //           this.showNotification = true;
  //           this.toastr.success('Control Updated', { nzDuration: 3000 });
  //         }
  //       }

  //     }
  //   } catch (error) {
  //     console.error(error);
  //     this.toastr.error('An error occurred', { nzDuration: 3000 });
  //   }
  // }
  addDynamic(nodesNumber: any, subType: any, mainType: any) {
    try {
      if (this.selectedNode.children) {
        this.addControl = true;
        this.showNotification = false;
        let nodesLength = this.selectedNode.children?.length;
        if (nodesLength < nodesNumber) {
          this.ParentAdd = this.selectedNode;
          for (let k = 0; k < nodesNumber; k++) {
            if (nodesLength < nodesNumber) {
              if (mainType != 'mainDiv') {
                this.addControlToJson(subType);
                this.selectedNode = this.childAdd;
                this.addControlToJson('input', this.textJsonObj);
                this.selectedNode = this.ParentAdd;
              } else {
                if (this.selectedNode?.children) {
                  if (
                    this.selectedNode &&
                    this.selectedNode?.children?.length > 0
                  ) {
                    let updateObj = JSON.parse(
                      JSON.stringify(this.selectedNode.children[0])
                    );
                    let ChangeIdKey = this.updateIdsAndKeys(updateObj);
                    this.selectedNode.children?.push(ChangeIdKey);
                  }
                }
              }
              nodesLength = nodesLength + 1;
            }
            this.updateNodes();
          }
        } else {
          if (this.selectdParentNode.children) {
            let removeTabsLength = this.selectedNode.children.length;
            let checkParentLength = this.selectdParentNode.children.length;
            for (let a = 0; a < removeTabsLength; a++) {
              for (let i = 0; i < checkParentLength; i++) {
                for (let j = 0; j < removeTabsLength; j++) {
                  if (this.selectdParentNode.children[i].type == mainType) {
                    if (nodesNumber < nodesLength) {
                      this.remove(
                        this.selectdParentNode.children[i],
                        this.selectedNode.children[nodesLength - 1]
                      );
                      nodesLength = nodesLength - 1;
                    }
                  }
                }
              }
            }
          }
        }
        this.addControl = false;
        this.showNotification = true;
        // this.toastr.success('Control Updated', { nzDuration: 3000 });
      }
    } catch (error) {
      console.error(error);
      this.toastr.error('An error occurred', { nzDuration: 3000 });
    }
  }
  searchControll() {
    this.searchControllData = [];
    const input = this.searchControlValue.toUpperCase();
    if (input) {
      const filterData = this.htmlTabsData[0].children.filter((a: any) => a.id !== 'website-block');
      filterData.forEach((a: any) => {
        a.children.forEach((b: any) => {
          if (b.children) {
            b.children.forEach((c: any) => {
              if (c.label.toUpperCase().includes(input)) {
                this.searchControllData.push(c);
              }
            });
          }
        });
      });
    }
  }

  sectionFormlyConfigApply(formValues: any, fieldGroup: any) {
    if (fieldGroup) {
      if (fieldGroup[0].props) {
        if (formValues.disabled == 'editable') {
          fieldGroup[0].props.disabled = false;
        } else if (
          formValues.disabled == 'disabled' ||
          formValues.disabled == 'disabled-But-ditable'
        ) {
          fieldGroup[0].props.disabled = true;
        }
        fieldGroup[0].props['additionalProperties']['status'] =
          formValues.status;
        fieldGroup[0].props['additionalProperties']['size'] = formValues.size;
        if (formValues.sectionClassName) {
          fieldGroup[0].props.className = formValues.sectionClassName;
          fieldGroup[0].className = formValues.sectionClassName;
        }
        if (formValues.wrappers) {
          if (fieldGroup[0].props['additionalProperties']['wrapper'] != formValues.wrappers) {
            if (formValues.wrappers == 'formly-vertical-theme-wrapper') {
              fieldGroup[0].props['additionalProperties']['wrapperLabelClass'] = 'w-1/3 py-2 col-form-label relative column-form-label'
              fieldGroup[0].props['additionalProperties']['wrapperInputClass'] = 'w-2/3 column-form-input form-control-style v-body-border'
            }
            if (formValues.wrappers == 'form-field-horizontal') {
              fieldGroup[0].props['additionalProperties']['wrapperLabelClass'] = ''
              fieldGroup[0].props['additionalProperties']['wrapperInputClass'] = '';
            }
            if (formValues.wrappers == 'formly-vertical-wrapper') {
              fieldGroup[0].props['additionalProperties']['wrapperLabelClass'] = 'label-style relative col-form-label pl-1'
              fieldGroup[0].props['additionalProperties']['wrapperInputClass'] = 'mt-1 pl-2'
            }
          }
          fieldGroup[0].wrappers = [formValues.wrappers];
          fieldGroup[0].props['additionalProperties']['wrapper'] = [formValues.wrappers][0];
          if (formValues.wrappers == 'floating_filled' || formValues.wrappers == 'floating_outlined' || formValues.wrappers == 'floating_standard') {
            fieldGroup[0].props['additionalProperties']['size'] = 'default';
            fieldGroup[0].props['additionalProperties']['addonRight'] = '';
            fieldGroup[0].props['additionalProperties']['addonLeft'] = '';
            fieldGroup[0].props['additionalProperties']['prefixicon'] = '';
            fieldGroup[0].props['additionalProperties']['suffixicon'] = '';
            fieldGroup[0].props.placeholder = " ";
          }
          if (formValues.wrappers == 'floating_filled') {
            fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
              '!block !rounded-t-lg !px-2.5 !pb-2.5 !pt-5 !w-full !text-sm !text-gray-900 !bg-gray-50 dark:!bg-gray-700 !border-0 !border-b-2 !border-gray-300 !appearance-none dark:!text-white dark:!border-gray-600 dark:!focus:border-blue-500 focus:!outline-none focus:!ring-0 focus:!border-blue-600 peer floating-filled-label add';
            fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
              '!absolute !text-sm !text-gray-500 dark:!text-gray-400 !duration-300 !transform !-translate-y-4 !scale-75 !top-4 !z-10 !origin-[0] !left-2.5 peer-focus:!text-blue-600 peer-focus:!dark:text-blue-500 peer-placeholder-shown:!scale-100 peer-placeholder-shown:!translate-y-0 peer-focus:!scale-75 peer-focus:!-translate-y-4  floating-filled-field';
          } else if (formValues.wrappers == 'floating_outlined') {
            fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
              '!block !px-2.5 !pb-2.5 !pt-4 !w-full !text-sm !text-gray-900 !bg-transparent !rounded-lg !border-1 !border-gray-300 !appearance-none dark:!text-white dark:!border-gray-600 dark:!focus:border-blue-500 focus:!outline-none focus:!ring-0 focus:!border-blue-600 !peer';
            fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
              '!absolute !text-sm !text-gray-500 dark:!text-gray-400 !duration-300 !transform -!translate-y-4 !scale-75 !top-2 !z-10 !origin-[0] !bg-white dark:!bg-gray-900 !px-2 peer-focus:!px-2 peer-focus:!text-blue-600 peer-focus:!dark:text-blue-500 peer-placeholder-shown:!scale-100 peer-placeholder-shown:!-translate-y-1/2 peer-placeholder-shown:!top-1/2 peer-focus:!top-2 peer-focus:!scale-75 peer-focus:!-translate-y-4 !left-1';
          } else if (formValues.wrappers == 'floating_standard') {
            fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
              'floting-standerd-input !block !py-2.5 !px-0 !w-full !text-sm !text-gray-900 !bg-transparent !border-0 !border-b-2 !border-gray-300 !appearance-none dark:!text-white dark:!border-gray-600 dark:!focus:border-blue-500 focus:!outline-none focus:!ring-0 focus:!border-blue-600 !peer floating-standerd-label';
            fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
              '!absolute !text-sm !text-gray-500 dark:!text-gray-400 !duration-300 !transform -!translate-y-6 !scale-75 !top-3 -!z-10 !origin-[0] peer-focus:!left-0 peer-focus:!text-blue-600 peer-focus:!dark:text-blue-500 peer-placeholder-shown:!scale-100 peer-placeholder-shown:!translate-y-0 peer-focus:!scale-75 peer-focus:!-translate-y-6 floating-standerd-field';
          }
        }
        fieldGroup[0].props['additionalProperties']['labelPosition'] =
          formValues.labelPosition;

        fieldGroup[0].props['additionalProperties']['formatAlignment'] =
          formValues.formatAlignment;
        fieldGroup[0].props['additionalProperties']['borderRadius'] =
          formValues.borderRadius;
        fieldGroup[0].props['additionalProperties']['tooltipIcon'] =
          formValues.tooltipIcon;
        fieldGroup[0].props['additionalProperties']['border'] =
          formValues.borderLessInputs;
        fieldGroup[0].props['additionalProperties']['labelClassName'] =
          formValues.inputLabelClassName;
      }
    }
    return fieldGroup;
  }
  functionName: any;
  // mainTemplate() {
  //   this.requestSubscription = this.builderService.genericApis(this.functionName).subscribe({
  //     next: (res) => {
  //       if (this.selectedNode.children)
  //         this.selectedNode.children.push(res)
  //     },
  //     error: (err) => {
  //       console.error(err); // Log the error to the console
  //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
  //     }
  //   });
  // }

  jsonStringify(data: any) {
    return JSON.stringify(data);
  }
  jsonStringifyWithObject(data: any) {
    return (
      JSON.stringify(data, function (key, value) {
        if (typeof value == 'function') {
          let check = value.toString();
          if (check.includes('model =>'))
            return check.replace('model =>', '(model) =>');
          else return check;
        }
        else {
          return value;
        }
      }) || '{}'
    );
  }
  jsonParse(data: any) {
    return JSON.parse(data);
  }
  jsonParseWithObject(data: any) {
    return JSON.parse(data, (key, value) => {
      if (typeof value === 'string' && value.startsWith('(') && value.includes('(model)')) {
        return eval(`(${value})`);
      }
      return value;
    });
  }

  // assigOptionsData(selectNode: any, tableDta: any, api: any) {

  //   if (tableDta) {
  //     selectNode = tableDta;
  //     return selectNode;
  //   }
  //   if (api) {
  //     this.requestSubscription = this.builderService.genericApis(api).subscribe({
  //       next: (res) => {
  //         if (res) {
  //           selectNode = res;
  //           this.updateNodes();
  //           return selectNode;
  //         }
  //       },
  //       error: (err) => {
  //         console.error(err); // Log the error to the console
  //         this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
  //       }
  //     })
  //   }
  // }

  jsonUpload(event: any) {
    if (!this.screenPage) {
      this.toastr.warning('Please Select Screen', { nzDuration: 3000 });
      return;
    }
    let contents: any;
    if (this.screenname) {
      if (
        event.target instanceof HTMLInputElement &&
        event.target.files.length > 0
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            contents = reader.result as string;
            var makeData = JSON.parse(contents);
            const getScreenData = makeData.screendata ? makeData.screendata : makeData.screenData;
            var currentData = JSON.parse(
              JSON.stringify(getScreenData, function (key, value) {
                if (typeof value == 'function') {
                  return value.toString();
                } else {
                  return value;
                }
              }) || '{}'
            );
            event.target.value = '';
            currentData.forEach((item: any) => {
              this.updateObjects(item);
            });
            this.nodes = currentData;
            this.applyDefaultValue();
            this.toastr.success('File uploaded successfully!', {
              nzDuration: 3000,
            });
            this.updateNodes();
          } catch (error) {
            console.error('Error parsing JSON:', error);
            // Handle the error or show an error message to the user
            this.toastr.error('Error parsing JSON. Please check the file format.', {
              nzDuration: 3000,
            });
          }
        };
        reader.readAsText(event.target.files[0]);
      }
    } else {
      alert('Please Select Screen');
    }
  }


  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  addIconCommonConfiguration(configurationFields: any, allowIcon?: boolean) {
    let _formFieldData = new formFeildData();
    if (_formFieldData.commonIconFields[0].fieldGroup) {
      _formFieldData.commonIconFields[0].fieldGroup.forEach((element) => {
        if (
          element.key != 'badgeType' &&
          element.key != 'badgeCount' &&
          element.key != 'dot_ribbon_color'
        ) {
          if (element.key != 'icon' || allowIcon) {
            configurationFields[0].fieldGroup.unshift(element);
          }
        }
      });
    }
  }
  setCustomColor(data: any) {
    let color: string;
    color = data.target.value;
    this.colorPickerService.setCustomColor('custom-color', color);
  }

  selectedDownloadJson() {
    if (!this.screenPage) {
      this.toastr.warning('Please Select Screen', { nzDuration: 3000 });
      return;
    }
    var currentData = this.jsonParse(
      this.jsonStringifyWithObject(this.selectedNode)
    );
    const blob = new Blob([JSON.stringify(currentData)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    if (this.selectedNode.title) {
      a.download = this.selectedNode.title + '.';
    } else {
      a.download = 'file.';
    }
    document.body.appendChild(a);
    a.click();
  }
  selectedJsonUpload(event: any) {
    if (!this.screenPage) {
      this.toastr.warning('Please Select Screen', { nzDuration: 3000 });
      return;
    }
    if (event.target instanceof HTMLInputElement && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const contents = reader.result as string;
          const makeData = JSON.parse(contents);

          if (this.selectedNode.children) {
            // this.selectedNode.children.push(makeData); // Push the parsed data directly
            this.selectedNode.children.push(makeData);
            this.toastr.success('File uploaded successfully!', {
              nzDuration: 3000,
            });

            // Ensure Angular's Change Detection is triggered by creating a new array reference
            let nodesData: any = [...this.nodes]; // Or any other change detection technique
            this.nodes = [];
            this.updateObjects(nodesData);
            this.nodes = nodesData;
            this.updateNodes();
            this.applyDefaultValue();
            // this.nodes = JSON.parse(JSON.stringify(this.nodes));
            // Reset the file input value to allow uploading the same file again
            event.target.value = '';
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          // Handle the error or show an error message to the user
          this.toastr.error('Error parsing JSON. Please check the file format.', {
            nzDuration: 3000,
          });
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  handleCancel(): void {
    this.showModal = false;
  }
  isTableSave: boolean = false;
  saveCommit: boolean = false;
  newCases: string[] = [];
  deleteCases: any[] = [];
  deleteDBFields() {
    if (this.deleteCases.length > 0) {
      const deleteObservables = this.deleteCases.map((element) => {
        return this.builderService
          .deleteSQLDatabaseTable('knex-crud/tableschema/', element.id)
          .pipe(
            catchError((error) => of(error)) // Handle error and continue the forkJoin
          );
      });
      forkJoin(deleteObservables).subscribe({
        next: (results) => {
          if (results.every((result) => !(result instanceof Error))) {
            this.toastr.success('Delete Fields Successfully', {
              nzDuration: 3000,
            });
          } else {
            this.toastr.error('Fields not inserted', { nzDuration: 3000 });
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Fields not inserted', { nzDuration: 3000 });
        },
      });
    }
  }

  saveInDB() {
    let mainArray: any[] = [];
    for (let i = 0; i < Object.keys(this.formlyModel).length; i++) {
      const element = Object.keys(this.formlyModel)[i];
      let keyPart = element.includes('.') ? element.split('.') : '';
      let check = mainArray.find((a) => a.name == keyPart[0]);
      if (keyPart) {
        if (!check) {
          let obj: any = { name: keyPart[0], children: [] };
          obj.children.push(keyPart[1]);
          mainArray.push(obj);
        } else {
          check.children.push(keyPart[1]);
        }
      }
    }
    for (let i = 0; i < mainArray.length; i++) {
      const objTable = mainArray[i];
      const objTableNames = {
        tableName: objTable.name,
        comment: '',
        totalFields: 0,
        status: 'Pending',
        isActive: true,
        screenbuilderid: this.id
      };
      const objMakeTable: any = {
        table: objTableNames,
        tableFields: []
      }
      mainArray[i].children.map((objFieldName: any) => {
        if (objFieldName != 'id') {
          const objFields = {
            tableid: 0,
            fieldName: objFieldName,
            type: 'VARCHAR',
            description: null,
            status: 'Pending',
            isActive: true,
            screenbuilderid: this.id
          };
          objMakeTable.tableFields.push(objFields);
        }
      });
      let dataArray = [
        {
          fieldname: 'fname',
          id: '62747e06-a16a-40de-9646-7041db375d4e'
        },
        {
          fieldname: 'address',
          id: '62747e06-a16a-40de-9646-7041db335d4e'
        },
        {
          fieldname: 'email',
          id: '62747e06-a16a-40de-9646-7041db37554e'
        }
      ]
      if (objMakeTable.tableFields.length > 0) {
        const tableValue = `insertNewTable`;
        var ResponseGuid: any;
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [tableValue]: objMakeTable, metaInfo: metainfocreate }
        this.socketService.Request(Add);
        this.socketService.OnResponseMessage().subscribe({
          next: (res: any) => {
            if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
              res = res.parseddata.apidata;
              if (res.isSuccess) {
                this.saveLoader = false;
                this.toastr.success("Save table successfully", { nzDuration: 3000 });
              } else {
                this.saveLoader = false;
                console.error(res.message);
                this.toastr.error(res.message, { nzDuration: 3000 });
              }
            }
          },
          error: (err) => {
            this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
          },
        });

        // this.applicationService.addNestNewCommonAPI('cp/insertNewTable', objMakeTable).subscribe({
        //   next: (res) => {
        //     if (res.isSuccess) {
        //       this.saveLoader = false;
        //       this.toastr.success("Save table successfully", { nzDuration: 3000 });
        //     } else {
        //       this.saveLoader = false;
        //       console.error(res.message);
        //       this.toastr.error(res.message, { nzDuration: 3000 });
        //     }
        //   },
        //   error: (err) => {
        //     this.saveLoader = false;
        //     console.error(err);
        //     this.toastr.error("An error occurred", { nzDuration: 3000 });
        //   }
        // });
      }
    }
  }
  comentSubmit() {
    this.requestSubscription = this.applicationService.addNestCommonAPI(`applications/${this.currentUser.applicationid}/clone`, "").subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`Git : ${res.message}`, { nzDuration: 3000 });
        } else this.toastr.error(`Git : ${res.message}`, { nzDuration: 3000 });
      },
      error: (err) => {
        this.toastr.error("Git : An error occurred", { nzDuration: 3000 });
      }
    });
  }
  handleOk(): void {
    if (this.isTableSave)
      this.saveInDB();
    if (this.saveCommit)
      this.comentSubmit();

    if (this.modalType === 'webCode') {
      // this.dashonicTemplates(this.htmlBlockimagePreview.parameter);
    }
    else if (this.modalType === 'saveAsTemplate') {
      try {
        this.saveLoader = true;
        if (
          (this.saveAsTemplate && this.templateName) ||
          (this.websiteBlockName &&
            this.webisteBlockType &&
            this.websiteBlockSave)
        ) {
          if (this.saveAsTemplate && this.templateName) {
            const objTemplate = {
              parameter: 'htmlBlock',
              icon: 'uil uil-paragraph',
              label: this.templateName,
              templateType: 'builderBlock',
              template: JSON.stringify(this.nodes[0].children[1].children),
            };

            const templateModel = {
              "Template": objTemplate
            }
            const tableValue = `Template`;
            var ResponseGuid: any;
            const { newGuid, metainfocreate } = this.socketService.metainfocreate();
            ResponseGuid = newGuid;
            const Add = { [tableValue]: templateModel, metaInfo: metainfocreate }
            this.socketService.Request(Add);
            this.socketService.OnResponseMessage().subscribe({
              next: (res: any) => {
                if (res.isSuccess) {
                  this.toastr.success(`Template: ${res.message}`, { nzDuration: 3000 });
                  this.makeDatainTemplateTab();
                  this.saveLoader = false;
                } else
                  this.toastr.error(`Template: ${res.message}`, { nzDuration: 3000 });
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
              },
            });


            // this.requestSubscription = this.applicationService.addNestCommonAPI('cp', templateModel).subscribe({
            //   next: (res: any) => {
            //     if (res.isSuccess) {
            //       this.toastr.success(`Template: ${res.message}`, { nzDuration: 3000 });
            //       this.makeDatainTemplateTab();
            //       this.saveLoader = false;
            //     } else
            //       this.toastr.error(`Template: ${res.message}`, { nzDuration: 3000 });
            //   },
            //   error: (err) => {
            //     console.error(err);
            //     this.saveLoader = false;
            //     this.toastr.error('An error occurred', { nzDuration: 3000 });
            //   }
            // });
          }
          if (
            this.websiteBlockName &&
            this.webisteBlockType &&
            this.websiteBlockSave
          ) {
            const objTemplate = {
              parameter: this.websiteBlockName,
              icon: 'uil uil-paragraph',
              label: this.websiteBlockName,
              type: this.webisteBlockType,
              templateType: 'websiteBlock',
              template: JSON.stringify(this.nodes[0].children[1].children),
            };

            const templateModel = {
              "Template": objTemplate
            }
            const tableValue = `Template`;
            var ResponseGuid: any;
            const { newGuid, metainfocreate } = this.socketService.metainfocreate();
            ResponseGuid = newGuid;
            const Add = { [tableValue]: templateModel, metaInfo: metainfocreate }
            this.socketService.Request(Add);
            this.socketService.OnResponseMessage().subscribe({
              next: (res: any) => {
                if (res.isSuccess) {
                  this.toastr.success(`Template: ${res.message}`, { nzDuration: 3000 });
                  this.makeDatainTemplateTab();
                  this.saveLoader = false;
                } else
                  this.toastr.error(`Template: ${res.message}`, { nzDuration: 3000 });
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
              },
            });

            // this.requestSubscription = this.applicationService.addNestCommonAPI('cp', templateModel).subscribe({
            //   next: (res: any) => {
            //     if (res.isSuccess) {
            //       this.toastr.success(`Template: ${res.message}`, { nzDuration: 3000 });
            //       this.makeDatainTemplateTab();
            //       this.saveLoader = false;
            //     } else
            //       this.toastr.error(`Template: ${res.message}`, { nzDuration: 3000 });
            //   },
            //   error: (err) => {
            //     console.error(err);
            //     this.saveLoader = false;
            //     this.toastr.error('Template: An error occurred', { nzDuration: 3000 });
            //   }
            // });
          }
          setTimeout(() => {
            this.saveJson();
            // this.saveLoader = false;
            this.showModal = false;
          }, 500);
        }
        else {
          if (!this.saveAsTemplate && this.templateName) {
            alert("Please check the checkbox for 'Save as Template'.");
          } else if (this.saveAsTemplate && !this.templateName) {
            alert('Please provide a template name.');
          }
          if (
            (!this.websiteBlockName &&
              this.webisteBlockType &&
              this.websiteBlockSave) ||
            (this.websiteBlockName &&
              !this.webisteBlockType &&
              !this.websiteBlockSave) ||
            (!this.websiteBlockName &&
              this.webisteBlockType &&
              !this.websiteBlockSave)
          ) {
            alert(
              'Please provide all the required information for saving the web block.'
            );
          }
        }
        const isTemplateNameValid =
          !this.saveAsTemplate &&
          (!this.templateName || this.templateName == '');
        const isWebsiteBlockValid =
          (!this.websiteBlockName || this.websiteBlockName == '') &&
          (this.webisteBlockType || this.webisteBlockType == '') &&
          !this.websiteBlockSave;

        if (isTemplateNameValid && isWebsiteBlockValid) {
          this.saveJson();
          // this.saveLoader = false;
          this.showModal = false;
        }
      } catch (error) {
        console.error(error);
        this.toastr.error('An error occurred', { nzDuration: 3000 });
        this.saveLoader = false;
      }
    }

    if (this.modalType !== 'saveAsTemplate') {
      this.showModal = false;
    }
  }

  convertIntoDate(date: any) {
    if (!date) {
      return null;
    }
    const startDateArray = date
      .split(',')
      .map((str: any) => parseInt(str.trim(), 10));
    const startDate = startDateArray.length
      ? new Date(startDateArray[0], startDateArray[1], startDateArray[2])
      : null;
    return startDate;
  }
  api(value?: any, data?: any) {
    if (value) {
      this.requestSubscription = this.builderService
        .genericApis(value)
        .subscribe({
          next: (res) => {
            if (Array.isArray(res)) {
              res.forEach((item) => {
                data?.children?.push(item);
              });
            } else {
              data?.children?.push(res);
            }
            this.updateNodes();
          },
          error: (err) => {
            console.error(err); // Log the error to the console
            this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
          },
        });
    }
    return data;
  }
  findObjectByKey(data: any, key: any) {
    if (data) {
      if (data.key && key) {
        if (data.key === key) {
          return data;
        }
        if (data.children && data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByKey(child, key);
            if (result !== null) {
              return result;
            }
          }
        }
      }
    }
    return null;
  }

  dataReplace(node: any, replaceData: any, value: any): any {
    let typeMap: any = this.dataSharedService.typeMap;
    const type = node.type;
    const key = value.componentKey ? value.componentKey : typeMap[type];
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
    } else if (node.type == 'tag') {
      if (Array.isArray(replaceData[value.defaultValue])) {
        node.options = replaceData[value.defaultValue];
        return node;
      }
    }
    else if (node.type == "pieChart") {
      node[key] = JSON.parse(replaceData[value.defaultValue]);
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
          let check = data.children.filter((a: any) => a.type == 'avatar');
          if (check.length != 1) {
            // let getFirstAvatar = JSON.parse(JSON.stringify(check[0]));
            let deleteAvatar = check.length - 1;
            for (let index = 0; index < deleteAvatar; index++) {
              const element = data.children.filter(
                (a: any) => a.type == 'avatar'
              );
              const idx = data.children.indexOf(element[0]);
              data.children.splice(idx as number, 1);
            }
            let lastAvatarIndex = data.children.filter(
              (a: any) => a.type == 'avatar'
            );
            let idx = data.children.indexOf(lastAvatarIndex[0]);
            data.children.splice(idx, 1);
            updatedObj.forEach((i: any) => {
              data.children.splice(idx + 1, 0, i);
              idx = idx + 1;
            });
          } else {
            let lastAvatarIndex = data.children.filter(
              (a: any) => a.type == 'avatar'
            );
            let idx = data.children.indexOf(lastAvatarIndex[0]);
            data.children.splice(idx, 1);
            updatedObj.forEach((i: any) => {
              data.children.splice(idx + 1, 0, i);
              idx = idx + 1;
            });
          }
        } else {
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

  arrayEqual(a: any, b: any) {
    if (a) {
      return JSON.stringify(a) === JSON.stringify(b);
    } else {
      return false;
    }
  }
  findObjectByType(node: any, newNode: any) {
    if (node.type === newNode.type && node.key === newNode.key) {
      node = newNode;
    }
    for (let child of node.children) {
      let result: any = this.findObjectByType(child, newNode);
      if (result !== undefined) {
        return result;
      }
    }
    return undefined;
  }
  async pasteFromClipboard(): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        let updateData = JSON.parse(text);
        if (updateData[0]) {
          if (updateData[0].type == 'page') this.nodes = updateData;
          if (updateData[0].type == 'sections')
            this.selectedNode.children?.push(updateData[0]);
          this.updateNodes();
        } else if (this.selectedNode && updateData) {
          this.selectedNode.children?.push(updateData);
          this.updateNodes();
          this.toastr.success('Json update successfully!', {
            nzDuration: 3000,
          });
        } else {
          this.toastr.error('Please select a data first!', {
            nzDuration: 3000,
          });
        }
      } else {
        this.toastr.error('Please select a data first!', { nzDuration: 3000 });
      }
    } catch (err) {
      this.toastr.error('Please copy correct data!', { nzDuration: 3000 });
    }
  }

  openModal(type?: any, data?: any): void {
    this.iconActive = 'save';
    if (type == 'webCode') {
      this.modalType = 'webCode';
      this.htmlBlockimagePreview = data;
    } else if (type == 'previewJson') {
      this.selectedNode = data.origin;
      this.modalType = 'previewJson';
      this.isActiveShow = data.origin.id;
    } else if (type == 'saveAsTemplate') {
      this.saveAsTemplate = false;
      this.websiteBlockSave = false;
      this.templateName = '';
      this.websiteBlockName = '';
      this.webisteBlockType = '';
      this.modalType = 'saveAsTemplate';
    }
    this.showModal = true;
  }

  showWebBlockList(type: any) {
    if (type == 'Website Block') {
      this.webBlock = true;
    } else {
      this.webBlock = false;
    }
  }

  addTemplate(data: any, checkType?: any) {
    let template = this.jsonParseWithObject(data.template);
    if (checkType == 'website-block') {
      template.forEach((item: any) => {
        this.nodes[0].children[1].children.push(item);
      });
    } else {
      template.forEach((item: any) => {
        let data = JSON.parse(JSON.stringify(item));
        this.traverseAndChange(data);
        this.nodes[0].children[1].children.push(data);
      });
    }
    this.updateNodes();
    this.toastr.success('Control Added', { nzDuration: 3000 });
  }

  makeDatainTemplateTab() {
    // this.requestSubscription = this.applicationService.getNestNewCommonAPI(`cp/Template`).subscribe({
    //   next: (res: any) => {
    //     if (res.isSuccess) {
    //       this.dbWebsiteBlockArray = res.data.filter((x: any) => x.templateType == 'websiteBlock');
    //       this.htmlTabsData[0].children.forEach((item: any) => {
    //         if (item?.id == 'template') {
    //           item.children[0].children = res.data.filter((x: any) => x.templateType == 'builderBlock');
    //         }
    //       })
    //     } else { this.toastr.error(`Template : ${res.message}`, { nzDuration: 3000 }); }
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     { this.toastr.error(`Template : An error occurred`, { nzDuration: 3000 }); }
    //   }
    // });
  }

  loadWebsiteBlockChild(data?: any) {
    let filterdData = this.dbWebsiteBlockArray.filter(
      (item: any) => item.type == data.label
    );
    data.children = filterdData;
    this.websiteBlockButton = data.children;
  }

  updateIdsAndKeys(obj: any) {
    let updatedObj = { ...obj };
    updatedObj = this.changeIdAndkey(updatedObj);

    if (updatedObj.children && Array.isArray(updatedObj.children)) {
      updatedObj.children = updatedObj.children.map((child: any) =>
        this.updateIdsAndKeys(child)
      );
    }
    return updatedObj;
  }

  makeFormlyTypeOptions(node: any) {
    if (node) {
      if (node?.parameter == 'input') {
        let obj = {
          label: node.label,
          value: node.type + '_' + node.configType + '_' + node.fieldType,
        };
        if (this.formlyTypes.length == 0) {
          this.formlyTypes.push(obj);
        }
        else if (!this.formlyTypes.some((item: any) => item.value.split('_')[0] == 'custom')) {
          this.formlyTypes.push(obj);
        }
      }
      if (node?.children) {
        if (node?.children.length > 0) {
          node.children.forEach((child: any) => {
            this.makeFormlyTypeOptions(child);
          });
        }
      }
    }
  }
  findFormlyTypeObj(node: any, type: any) {
    if (node) {
      if (node.parameter == 'input' && node.type == type.split('_')[0] && node.configType == type.split('_')[1] && node.fieldType == type.split('_')[2]) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        for (let child of node.children) {
          let result: any = this.findFormlyTypeObj(child, type);
          if (result) {
            return result;
          }
        }
      }
    }
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
  deleteValidationRule(data: any) {
    const { jsonData, newGuid } = this.socketService.deleteModelType('ValidationRule', data.modelData.id);

    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        if (res.isSuccess) {
          this.validationRuleId = '';
          this.validationFieldData.modelData = {};
          this.getJoiValidation(this.id);
          this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
        }
        else
          this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
      }

    });


    // this.applicationService.deleteNestNewCommonAPI(`cp/ValidationRule`, data.modelData.id).subscribe({
    //   next: (res: any) => {
    //     if (res.isSuccess) {
    //       this.validationRuleId = '';
    //       this.validationFieldData.modelData = {};
    //       this.getJoiValidation(this.id);
    //       this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
    //     }
    //     else
    //       this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
    //   },
    //   error: () => {
    //     this.toastr.error('Delete data unhandler', { nzDuration: 3000 });
    //   }
    // })
  }
  checkPage() {

    if (!this.screenPage) {
      alert("Please Select Screen")
    } else {
      let application = this.applicationData.find((app: any) => app.id == this.selectApplicationName)
      const url = `http://${application.domains}:5600/pages/${this.navigation}`;
      window.open(url);

    }
  }
  async getFromQuery(name: string, type?: any) {
    try {
      let tableData = this.findObjectByTypeBase(this.nodes[0], "gridList");
      if (tableData) {
        // this.saveLoader = true;
        tableData['searchValue'] = '';
        let findClickApi = tableData?.eventActionconfig;
        if (findClickApi) {
          // let pagination = '';
          let url = `knex-query/getexecute-rules/${findClickApi.id}`;
          // for (let index = 0; index < findClickApi.length; index++) {
          //   let element = findClickApi[index].actionType;
          //   if (element == 'query') {
          //     url = `knex-query/getAction/${findClickApi[index].id}`;
          //     break;
          //   } else {
          //     url = `knex-query/getAction/${findClickApi[index].id}`;
          //   }
          // }
          // if (tableData.serverSidePagination) {
          //   pagination = '?page=' + 1 + '&pageSize=' + tableData?.end;
          // }
          if (url) {
            const applicationid = this.dataSharedService.decryptedValue('applicationId');
            let savedGroupData: any = [];
            if (applicationid) {
              savedGroupData = await this.dataService.getNodes(JSON.parse(applicationid), this.screenname, "Table");
            }
            this.saveLoader = true;
            this.employeeService.getSQLDatabaseTable(url).subscribe({
              next: (res) => {
                try {
                  if (tableData && res?.isSuccess) {
                    if (res.data.length > 0) {
                      // this.saveLoader = false;
                      let saveForm = JSON.parse(JSON.stringify(res.data[0]));
                      const firstObjectKeys = Object.keys(saveForm);
                      let tableKey = firstObjectKeys.map(key => ({ name: key }));
                      let obj = firstObjectKeys.map(key => ({ name: key, key: key }));
                      tableData.tableData = [];
                      saveForm.id = tableData.tableData.length + 1;
                      res.data.forEach((element: any) => {
                        element.id = (element?.id)?.toString();
                        tableData.tableData?.push(element);
                      });
                      // pagniation work start
                      if (!tableData.end) {
                        tableData.end = 10;
                      }
                      tableData.pageIndex = 1;
                      tableData.totalCount = res.count;
                      tableData.serverApi = url;
                      tableData.targetId = '';
                      tableData.displayData = tableData.tableData.length > tableData.end ? tableData.tableData.slice(0, tableData.end) : tableData.tableData;
                      // pagniation work end
                      if (tableData.tableHeaders.length == 0) {
                        tableData.tableHeaders = obj;
                        tableData['tableKey'] = tableKey;
                      }
                      else {
                        if (JSON.stringify(tableData['tableKey']) !== JSON.stringify(tableKey)) {
                          const updatedData = tableKey.filter(updatedItem =>
                            !tableData.tableHeaders.some((headerItem: any) => headerItem.key === updatedItem.name)
                          );
                          if (updatedData.length > 0) {
                            updatedData.forEach(updatedItem => {
                              tableData.tableHeaders.push({ id: tableData.tableHeaders.length + 1, key: updatedItem.name, name: updatedItem.name });
                            });
                            tableData['tableKey'] = tableData.tableHeaders;
                          }
                        }
                      }

                      // Make DataType
                      let propertiesWithoutDataType = tableData.tableHeaders.filter((check: any) => !check.hasOwnProperty('dataType'));
                      if (propertiesWithoutDataType.length > 0) {
                        let formlyInputs = this.filterInputElements(this.nodes[0].children[1].children);

                        if (formlyInputs && formlyInputs.length > 0) {
                          propertiesWithoutDataType.forEach((head: any) => {
                            let input = formlyInputs.find(a => a.formly[0].fieldGroup[0].key.includes('.') ? a.formly[0].fieldGroup[0].key.split('.')[1] == head.key : a.formly[0].fieldGroup[0].key == head.key);

                            if (input) {
                              head['dataType'] = input.formly[0].fieldGroup[0].type;
                              head['subDataType'] = input.formly[0].fieldGroup[0].props.type;
                              head['title'] = input.title;
                            }
                          });

                          tableData.tableHeaders = tableData.tableHeaders.concat(propertiesWithoutDataType.filter((item: any) => !tableData.tableHeaders.some((objItem: any) => objItem.key === item.key)));
                        }
                      }
                      tableData['tableKey'] = tableData.tableHeaders;
                      let getData = savedGroupData[savedGroupData.length - 1];
                      if (getData?.data) {
                        if (getData.data.length > 0) {
                          let groupingArray: any = [];
                          let updateTableData: any = [];
                          getData.data.forEach((elem: any) => {
                            let findData = tableData.tableHeaders.find((item: any) => item.key == elem);
                            if (findData) {
                              updateTableData = this.groupedFunc(elem, 'add', findData, groupingArray, tableData.displayData, tableData.tableData, tableData.tableHeaders);
                            }
                          });
                          tableData.tableData = updateTableData;
                          tableData.displayData = tableData.tableData.length > tableData.end ? tableData.tableData.slice(0, tableData.end) : tableData.tableData;
                          tableData.tableHeaders.unshift({
                            name: 'expand',
                            key: 'expand',
                            title: 'Expand',
                          });
                          tableData.totalCount = tableData.tableData;
                        } else {
                          tableData.tableHeaders = tableData.tableHeaders.filter((head: any) => head.key != 'expand');
                        }

                      } else {
                        tableData.tableHeaders = tableData.tableHeaders.filter((head: any) => head.key != 'expand');
                      }
                      this.saveLoader = false;
                    } else {
                      this.saveLoader = false;
                    }
                    // this.assignGridRules(tableData);
                    this.updateNodes();
                    this.cdr.detectChanges();
                  } else {
                    this.saveLoader = false;
                  }
                } catch (error) {
                  console.error(error);
                  this.toastr.error("An error occurred", { nzDuration: 3000 });
                  this.saveLoader = false;
                }
              },
              error: (error: any) => {
                console.error(error);
                this.toastr.error("An error occurred", { nzDuration: 3000 });
                this.saveLoader = false;
              }
            });
          }
        } else {
          this.saveLoader = false;
        }
      }
    } catch (error) {
      console.error(error);
      this.toastr.error("An error occurred", { nzDuration: 3000 });
      this.saveLoader = false;
    }
  }


  //Fazi code
  nzEvent(event: NzFormatEmitEvent): void {

    if (event.eventName === 'drop') {
      // capture the dragNode and dropNode
      const dragNode = event.dragNode?.origin;
      const dropNode = event?.node?.origin;

      // Use the keys of the dragNode and dropNode to update your tree
      if (dropNode?.key) {
        this.nodes = this.updateNodesDnD(this.nodes, dragNode, dropNode?.key);
        this.cdr.detectChanges();
      }
    }
  }

  updateNodesDnD(nodes: any[], nodeToMove: any, destinationKey: string): any[] {
    return nodes.reduce((result, node) => {
      if (node.key === nodeToMove.key) {
        // Skip over this node because we're moving it
      } else if (node.key === destinationKey) {
        // Add the node we're moving to this node's children
        result.push({ ...node, children: [...(node.children || []), nodeToMove] });
      } else {
        // Otherwise just add the node as-is
        result.push({
          ...node,
          children: node.children ? this.updateNodesDnD(node?.children, nodeToMove, destinationKey) : undefined,
        });
      }
      return result;
    }, []);
  }

  pageConfig() {
    if (this.nodes.length > 0) {
      this.openConfig(this.nodes[0], this.nodes[0]);
    } else {
      this.toastr.warning('Page is not available', {
        nzDuration: 3000,
      });
    }
  }
  // addOrRemoveisLeaf(node: any) {
  //   if (node) {
  //     if (node.children.length > 0) {
  //       node.children.forEach((child: any) => {
  //         this.addOrRemoveisLeaf(child);
  //       });
  //     }
  //     else {
  //       node['isLeaf'] = true;
  //     }
  //   }
  // }
  // onTreeMouseLeave(): void {
  //   this.addOrRemoveisLeaf(this.nodes[0]);
  //   this.nodes = [...this.nodes];
  // }

  // onTreeMouseEnter(): void {
  //   this.removeLeafIcon(this.nodes[0]);
  //   this.nodes = [...this.nodes];
  // }


  // removeLeafIcon(node: any) {
  //   if (node) {
  //     delete node.isLeaf;
  //     if (node.children.length > 0) {
  //       node.children.forEach((child: any) => {
  //         this.removeLeafIcon(child);
  //       });
  //     }
  //   }
  // }

  typeFirstAlphabetAsIcon(node: any) {
    const firstAlphabet = node?.origin?.type?.charAt(0)?.toUpperCase();
    return firstAlphabet;
  }
  addWebsiteTemplate() {
    const modalRef: NzModalRef = this.modalService.create({
      nzTitle: 'Template Save',
      nzContent: TemplatePopupComponent,
      nzFooter: null,
      nzClosable: false,
    });
    modalRef.afterClose.subscribe((formData) => {
      if (formData) {
        var ResponseGuid: any;

        if (formData.category == "Block") {
          formData['data'] = JSON.stringify(this.nodes[0].children[1].children)
        }
        else
          formData['data'] = JSON.stringify(this.nodes)
        let obj = {
          "MarketPlaceList": formData
        }
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [`MarketPlaceList`]: formData, metaInfo: metainfocreate }
        this.socketService.Request(Add);
        this.socketService.OnResponseMessage().subscribe((res: any) => {
          if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              this.toastr.success("Saved Successfully!", { nzDuration: 3000 });
            }
            else
              this.toastr.error("Found error!", { nzDuration: 3000 });
          }
        })

      } else {
        console.log('Modal closed without saving data.');
      }
    });
  }
  openMarketPlace() {
    this.iconActive = 'openMarketPlace';
    if (this.nodes.length > 0) {
      const drawerRef = this.drawerService.create<
        MarketPlaceComponent,
        { value: string },
        string
      >({
        // nzTitle: 'Market Place',
        nzWidth: '80%',
        nzMaskClosable: false,
        // nzExtra: '#saving',
        nzContent: MarketPlaceComponent,
        nzContentParams: {
          nodes: this.nodes,
        },
      });
      drawerRef.afterOpen.subscribe(() => {
        // console.log('Drawer(Component) open');
      });
      drawerRef.afterClose.subscribe((data: any) => {
        if (data) {
          if (data) this.nodes = data;
          this.updateNodes();
          this.cdr.detectChanges();
        }
      });
    } else {
      this.toastr.error('Please select Screen first', { nzDuration: 3000 });
    }
  }
  showRulesFunc(ruleType: any) {
    this.showRules = ruleType;
    // let getInputs: any[] = this.filterInputElements(this.nodes);
    // this.showActionRule = getInputs.length > 0 ? false : true;
  }
  applyHighlightSearch(data: any, allow: any) {
    if (this.searchValue && allow) {
      const isMatch = data?.title ? data?.title.toLowerCase().includes(this.searchValue.toLowerCase()) : data?.id.toLowerCase().includes(this.searchValue.toLowerCase());
      data['searchHighlight'] = isMatch;
      if (data?.children?.length > 0) {
        data.children.forEach((element: any) => {
          this.applyHighlightSearch(element, allow);
        });
      }
    }
    else {
      data['searchHighlight'] = false;
      if (data?.children?.length > 0) {
        data.children.forEach((element: any) => {
          this.applyHighlightSearch(element, allow);
        });
      }
    }
  }
  getTaskManagementIssuesFunc(screenId: string, applicationid: string) {
    if (applicationid) {
      this.requestSubscription = this.builderService.getUserAssignTask(screenId, applicationid).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.getTaskManagementIssues = res.data;
            }
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
    }
  }
  assignIssue(node: any, issue: any) {
    if (issue['componentId']) {
      if (node.id == issue['componentId']) {
        let assign = this.getTaskManagementIssues.find(a => a.componentId == node.id)
        if (node.formly) {
          if (node.formly.length > 0) {
            if (node.formly[0].fieldGroup) {
              if (node.formly[0].fieldGroup[0]) {
                node.formly[0].fieldGroup[0].props['screenname'] = this.screenname;
                node.formly[0].fieldGroup[0].props['id'] = node.id;
                if (assign && assign?.status) {
                  node.formly[0].fieldGroup[0].props['status'] = assign.status;
                }
                if (!node.formly[0].fieldGroup[0].props['issueReport']) {
                  node.formly[0].fieldGroup[0].props['issueReport'] = [];
                }

                node.formly[0].fieldGroup[0].props['issueReport'].push(issue);

                if (!node.formly[0].fieldGroup[0].props['issueUser']) {
                  node.formly[0].fieldGroup[0].props['issueUser'] = [issue['createdBy']];
                }
                else {
                  if (!node.formly[0].fieldGroup[0].props['issueUser'].includes(issue['createdBy'])) {
                    // Check if the user is not already in the array, then add them
                    node.formly[0].fieldGroup[0].props['issueUser'].push(issue.createdBy);
                  }
                }

              }
            }
          }
        }
        else {
          if (assign && assign?.status) {
            node['status'] = assign.status;
          }
          if (!node['issueReport']) {
            node['issueReport'] = [];
          }

          node['issueReport'].push(issue);

          if (!node['issueUser']) {
            node['issueUser'] = [issue['createdBy']];
          }
          else {
            if (!node['issueUser'].includes(issue['createdBy'])) {
              // Check if the user is not already in the array, then add them
              node['issueUser'].push(issue.createdBy);
            }
          }
        }
      }

      if (node.children.length > 0) {
        node.children.forEach((child: any) => {
          this.assignIssue(child, issue);
        });
      }
    }
  }
  groupedFunc(data: any, type: any, header: any, groupingArray: any, displayData: any, tableData: any, tableHeaders: any) {
    header['grouping'] = type === 'add' ? data : '';

    if (type === 'add')
      groupingArray.push(data);

    if (groupingArray.length === 0) {
      tableHeaders = tableHeaders.filter((a: any) => a.name !== 'expand');
    } else {
      // Reset displayData and tableHeaders before re-grouping
      displayData = [];
      tableHeaders = tableHeaders.filter((a: any) => a.name !== 'expand');
      // Apply grouping for each column in the groupingArray
      return this.groupData(tableData, 0, groupingArray, tableData, tableHeaders);
    }

  }
  groupData(data: any[], index: number, groupingArray: any, tableData: any, tableHeaders: any): any {
    if (index < groupingArray.length) {
      const groupColumn = groupingArray[index];

      if (index === 0) {
        // Group the data by the specified column
        const groupedData = this.groupByColumn(data, groupColumn, index, groupingArray);

        // Update the displayData and tableHeaders for the current level
        tableData = tableData.concat(groupedData);
        tableHeaders.unshift({
          name: 'expand',
          key: 'expand',
          title: 'Expand',
        });

        // Continue grouping for the next column
        return this.groupData(groupedData, index + 1, groupingArray, tableData, tableHeaders);
      }
      else {
        data.forEach((update: any) => {
          if (update.children) {
            const groupedChildren = this.groupByColumn(update.children, groupColumn, index, groupingArray);
            update.children = groupedChildren; // Update children with grouped data
            // Recursively apply grouping to children
            this.groupData(update.children, index + 1, groupingArray, tableData, tableHeaders);
          }
        });
      }
    }

    return data; // Return the grouped data when all columns are processed
  }

  groupByColumn(data: any, columnName: string, index: number, groupingArray: any) {
    const groupedData: any = {};
    data.forEach((element: any) => {
      const groupValue = element[columnName];
      const parentValue = groupingArray[index - 1]; // Previous grouping value

      if (!groupedData[parentValue]) {
        groupedData[parentValue] = [];
      }

      if (!groupedData[parentValue][groupValue]) {
        groupedData[parentValue][groupValue] = {
          expand: false,
          children: [],
        };
      }

      const group = groupedData[parentValue][groupValue];
      group.children.push(element);
      group.expand = false;

      // If it's the first level of grouping, add the parent value
      if (index === 0) {
        group['parent'] = parentValue;
      }
    });
    const result = Object.keys(groupedData).map((parentKey: string) => {
      const parentGroup = groupedData[parentKey];
      return Object.keys(parentGroup).map((groupKey: string) => {
        const groupData = parentGroup[groupKey];
        const secondObj = groupData.children[0];
        const firstObj = JSON.parse(JSON.stringify(groupData));
        for (const key in secondObj) {
          if (secondObj.hasOwnProperty(key)) {
            // Check if the property does not exist in the first object
            if (!firstObj.hasOwnProperty(key)) {
              // Assign the property from the second object to the first object
              firstObj[key] = secondObj[key];
            }
          }
        }
        return firstObj;
      });
    }).flat(); // Flatten the nested arrays

    return result;
  }

  assignValues(source: any) {
    if (this.formlyModel) {
      for (const key in this.formlyModel) {
        if (this.formlyModel.hasOwnProperty(key)) {
          if (typeof this.formlyModel[key] === 'object') {
            for (const key1 in this.formlyModel[key]) {
              this.formlyModel[key][key1] = source[key + '.' + key1]
            }
          }
          else {
            this.formlyModel[key] = source[key];
          }
        }
      }
    }
  }

  makeModel(field: any, event: any) {
    let newModel = JSON.parse(JSON.stringify(this.formlyModel));
    if (newModel) {
      for (const key in newModel) {
        if (newModel.hasOwnProperty(key)) {
          if (typeof newModel[key] === 'object') {
            for (const key1 in newModel[key]) {
              if (field.key.includes('.')) {
                if (key1 == field.key.split('.')[1]) {
                  newModel[key][field.key.split('.')[1]] = event;
                }
              } else {
                if (key1 == field.key) {
                  newModel[key][field.key] = event;
                }
              }

            }
          }
          else {
            if (key == field.key) {
              newModel[field.key] = event;
            }
          }
        }
      }
    }
    this.formlyModel = newModel;
  }
  applyApplicationThemeClass() {

    if (this.applicationThemeClasses.length > 0) {
      for (let index = 0; index < this.applicationThemeClasses.length; index++) {
        const element = this.applicationThemeClasses[index];
        const classesToAdd = element?.classes;
        this.addClasses(element?.name, classesToAdd);
      }
    }
  }
  setOptionsForFieldGroup(fieldGroup: any, key: string, options: any): void {
    if (fieldGroup) {
      fieldGroup.forEach((element: any) => {
        if (element?.key === key) {
          element.props.options = options;
        }
      });
    }
  }
  createControl(response: any, data: any, value: any, res: any, obj: any, type: any) {
    const findThemeClass = this.applicationThemeClasses?.find(a => a.tag == value);
    let newNode: any = {};
    let formlyId = this.navigation + '_' + value.toLowerCase() + '_' + Guid.newGuid();
    if (data?.parameter === 'input') {
      newNode = {
        ...response,
        id: formlyId,
        className: this.columnApply(value),
        expanded: true,
        type: value,
        title: res?.title ? res.title : obj.title,
        children: [],
        tooltip: '',
        hideExpression: false,
        highLight: false,
        copyJsonIcon: false,
        treeExpandIcon: data?.treeExpandIcon,
        treeInExpandIcon: data?.treeInExpandIcon,
        isLeaf: true,
        apiUrl: '',
      }
      newNode.type = data?.configType;
      newNode.formlyType = data?.parameter;
      newNode.title = res?.title ? res.title : obj.title;
      newNode.formly[0].fieldGroup[0].key = res?.key ? res.key : obj.key;
      newNode.formly[0].fieldGroup[0].type = data?.type;
      newNode.formly[0].fieldGroup[0].id = formlyId.toLowerCase();
      newNode.formly[0].fieldGroup[0].wrappers = this.getLastNodeWrapper('wrappers');
      newNode.formly[0].fieldGroup[0].props.additionalProperties.wrapper = this.getLastNodeWrapper('configWrapper');
      newNode.formly[0].fieldGroup[0].props.type = data?.fieldType;
      newNode.formly[0].fieldGroup[0].props.label = res?.title ? res.title : obj.title;
      newNode.formly[0].fieldGroup[0].props.placeholder = data?.label;
      newNode.formly[0].fieldGroup[0].props.maskString = data?.maskString;
      newNode.formly[0].fieldGroup[0].props.maskLabel = data?.maskLabel;
      newNode.formly[0].fieldGroup[0].props.applicationThemeClasses = findThemeClass?.classes;
      newNode.formly[0].fieldGroup[0].props.options = this.makeFormlyOptions(data?.options, data.type);
      newNode.formly[0].fieldGroup[0].props.keyup = (model: any) => {
        let currentVal = model.formControl.value;
        this.formlyModel[model.key] = model.formControl.value;
        this.checkConditionUIRule(model, currentVal);
      };
    }
    else {
      newNode = {
        ...response, // Spread the properties from response
        key: res?.key ? res.key : obj.key,
        id: this.navigation + '_' + value.toLowerCase() + '_' + Guid.newGuid(),
        className: this.columnApply(value),
        expanded: true,
        type: type,
        title: res?.title ? res.title : obj.title,
        children: [],
        tooltip: '',
        tooltipIcon: 'question-circle',
        hideExpression: false,
        highLight: false,
        copyJsonIcon: false,
        treeExpandIcon: data?.treeExpandIcon,
        treeInExpandIcon: data?.treeInExpandIcon,
        applicationThemeClasses: findThemeClass?.classes
      };
    }
    return newNode;
  }

  getControls(apiRes: any, controlName: any) {
    let findControl: any = '';
    findControl = apiRes.find((a: any) => a.name == controlName);
    let response = this.jsonParseWithObject(findControl.controlJson);
    if (findControl) {
      let obj = {
        type: findControl?.name,
        title: findControl?.name,
        key: findControl?.name.toLowerCase() + '_' + Guid.newGuid(),
        isSubmit: false,
      };
      if (findControl?.name === 'input') {
        obj.title = this.textJsonObj?.label;
        obj.key = this.textJsonObj?.configType.toLowerCase() + '_' + Guid.newGuid();
      }
      let newNode = this.createControl(response, findControl.name == 'input' ? this.textJsonObj : null, findControl.name, response, obj, findControl?.name)
      this.addNode(this.selectedNode, newNode);
      this.updateNodes();
      return newNode;
    }
  }
  getApplicationTheme() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('applicationTheme', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess && res.data.length > 0) {
            this.saveLoader = false;
            this.applicationThemeClasses = res.data;
            // this.applyApplicationThemeClass();
          }
        }

      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }
    });

    // this.requestSubscription = this.applicationService.getNestNewCommonAPI(`cp/applicationTheme`).subscribe({
    //   next: (res: any) => {
    //     if (res.isSuccess) {
    //       if (res.data.length > 0) {
    //         this.applicationThemeClasses = res.data;
    //         // this.applyApplicationThemeClass();
    //       }
    //     }
    //     else {
    //       this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
    //       this.saveLoader = false;
    //     }
    //   },
    //   error: (err) => {
    //     console.error(err); // Log the error to the console
    //     this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //     this.saveLoader = false;
    //   }
    // });
  }
  removeMapping() {
    if (!this.screenPage) {
      this.toastr.warning('Please Select Screen', { nzDuration: 3000 });
      return;
    }
    if (this.selectedNode?.dbData) {
      if (this.selectedNode?.dbData.length > 0) {
        let selectedNode: any = this.selectedNode;
        const item = this.selectedNode?.dbData[0];
        selectedNode?.tableBody.forEach((element: any) => {
          const keyObj = this.findObjectByKey(
            this.selectedNode,
            element.fileHeader
          );
          for (const key in item) {
            item[key] = '';
          }
          if (keyObj && element?.defaultValue) {
            this.dataReplace(
              keyObj,
              item,
              element
            );
          }
        });
        this.updateNodes();
      }
    }
  }
  applyTheme(data: any, remove: boolean) {
    if (data) {
      if (remove) {
        data['appGlobalClass'] = '';
        data['appGlobalInnerClass'] = '';
        data['appGlobalInnerIconClass'] = '';
        if (data?.formlyType) {
          if (data?.formlyType == 'input') {
            data.formly[0].fieldGroup[0].props['additionalProperties']['appGlobalInnerClass'] = '';
          }
        }
      }
      else {
        data.isNewNode ? data.isNewNode : data['isNewNode'] = false;
        if (data.className) {
          if (data.className.includes('$')) {
            data['appGlobalClass'] = this.changeWithGlobalClass(data.className);
          }
        }
        if (data?.innerClass) {
          if (data?.innerClass.includes('$')) {
            data['appGlobalInnerClass'] = this.changeWithGlobalClass(data?.innerClass);
          }
        }
        if (data?.iconClass) {
          if (data?.iconClass.includes('$')) {
            data['appGlobalInnerIconClass'] = this.changeWithGlobalClass(data?.iconClass);
          }
        }
        if (data?.formlyType) {
          if (data?.formlyType == 'input') {
            if (data.formly[0].fieldGroup[0].props['additionalProperties']?.innerInputClass) {
              if (data.formly[0].fieldGroup[0].props['additionalProperties']?.innerInputClass.includes('$')) {
                data.formly[0].fieldGroup[0].props['additionalProperties']['appGlobalInnerClass'] = this.changeWithGlobalClass(data.formly[0].fieldGroup[0].props['additionalProperties']?.innerInputClass);
              }
            }
          }
        }
        if (data?.formlyType) {
          if (data?.formlyType == 'input') {
            if (data.formly[0].fieldGroup[0].props['additionalProperties']?.InputGroupClass) {
              if (data.formly[0].fieldGroup[0].props['additionalProperties']?.InputGroupClass.includes('$')) {
                data.formly[0].fieldGroup[0].props['additionalProperties']['appGlobalInnerClass'] = this.changeWithGlobalClass(data.formly[0].fieldGroup[0].props['additionalProperties']?.InputGroupClass);
              }
            }
          }
        }
      }

      if (data.children && data.children.length > 0) {
        for (let child of data.children) {
          this.applyTheme(child, remove);
        }
      }
    }
  }
  getAppliationGlobalClass() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('applicationGlobalClass', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess && res.data.length > 0) {
            this.dataSharedService.applicationGlobalClass = res.data
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }
    });

    // this.applicationService.getNestNewCommonAPI(`cp/applicationGlobalClass`).subscribe(((res: any) => {
    //   if (res.isSuccess) {
    //     if (res.data.length > 0) {
    //       this.dataSharedService.applicationGlobalClass = res.data
    //     }
    //   } else
    //     this.toastr.warning(res.message, { nzDuration: 2000 });
    // }));
  }
  changeWithGlobalClass(className: any) {
    let matches: any[] = className.match(/\$\S+/g);
    let globalClass: any = '';
    if (matches) {
      if (matches.length > 0 && this.dataSharedService.applicationGlobalClass.length > 0) {
        matches.forEach((classItem: any, index: number) => {
          let splittedName = classItem.split('$')[1];
          let resClass: any = this.dataSharedService.applicationGlobalClass.find((item: any) => item.name.toLocaleLowerCase() == splittedName.toLocaleLowerCase());
          if (resClass) {
            globalClass = globalClass ? globalClass + ' ' + resClass?.class : resClass?.class;
          }
          else if (index == 0) {
            globalClass = '';
          }
        });
      }
    } else {
      globalClass = '';
    }

    return globalClass;
  }
  screenClone() {
    this.iconActive = 'screenClone';
    if (!this.screenPage) {
      this.toastr.warning('Please Select Screen', { nzDuration: 3000 });
      return;
    }
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to clone this screen?',
      nzContent: '',
      nzOnOk: () => {
        this.saveLoader = true;
        this.applicationService.addNestCommonAPI(`applications/${this.id}/screenClone`, this.builderscreendata).subscribe({
          next: (res: any) => {
            this.saveLoader = false;
            this.toastr.success('clone Data Successfully', { nzDuration: 3000 });
          },
          error: (err) => {
            this.saveLoader = false;
            console.log(err);
            this.toastr.error(err, { nzDuration: 3000 });
          }
        });
      }
    });
  }
  screenAssignData(res: any) {
    localStorage.setItem('screenBuildId', res.data[0].screenbuilderid);
    this.builderscreendata = [res.data[0]];
    this.showActionRule = true;
    const objScreenData = res.data[0].screendata;
    this.isSavedDb = true;
    let objscreendata = this.jsonParseWithObject(this.jsonStringifyWithObject(objScreenData));
    this.applyTheme(objscreendata[0], false)
    this.nodes = objscreendata;
  }
}
