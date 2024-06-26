import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewContainerRef,
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
import { htmlTabsData } from './ControlList';
import { BuilderClickButtonService } from './service/builderClickButton.service';
import { ruleFactory } from '@elite-libs/rules-machine';
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { INITIAL_EVENTS } from '../shared/event-utils/event-utils';
import { ColorPickerService } from '../services/colorpicker.service';
import { DataService } from '../services/offlineDb.service';
import { EncryptionService } from '../services/encryption.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddControlService } from './service/addControl.service';
import { Router } from '@angular/router';
import { AddControlCommonPropertiesComponent } from './add-control-common-properties/add-control-common-properties.component';
import { ApplicationService } from '../services/application.service';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
@Component({
  selector: 'st-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  isSavedDb = false;
  makeOptions = () => new JsonEditorOptions();
  addControl = false;
  size: NzButtonSize = 'large';
  departmentData: any = [];
  applicationData: any = [];
  selectDepartmentId: any;
  IslayerVisible: boolean = true;
  IsjsonEditorVisible: boolean = false;
  sizes = [20, 80, 0];
  IsConfigurationVisible: boolean = true;
  IsShowConfig: boolean = false;
  htmlTabsData: any = [];
  nodes: any = [];
  screens: any;
  screenName: any;
  navigation: any = '';
  _id: any = "";
  // moduleId: any;
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
  selectApplicationId: any = '';
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
  websiteBlockSave: boolean = false;
  dbWebsiteBlockArray: any = [];
  dbHtmlCodeBlockArray: any = [];
  formlyTypes: any = [];
  constructor(
    public builderService: BuilderService,
    private viewContainerRef: ViewContainerRef,
    private applicationService: ApplicationService,
    private drawerService: NzDrawerService,
    // private formBuilder: FormBuilder,
    private _encryptionService: EncryptionService,
    private toastr: NzMessageService,
    private dataService: DataService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private addControlService: AddControlService,
    private clickButtonService: BuilderClickButtonService,
    public dataSharedService: DataSharedService,
    private colorPickerService: ColorPickerService,
    private router: Router
  ) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    // document.getElementsByTagName("body")[0].setAttribute("data-sidebar-size", "sm");
    // this.clearChildNode();
    // this.jsonBuilderMain().subscribe((res => {

    //   this.nodes = res[0].menuData;
    // }));
    this.dataSharedService.change.subscribe(({ event, field }) => {
      if (event && field && this.router.url == '/builder') {
        this.checkConditionUIRule(field, event);
      }
    });
  }
  controlListClose(): void {
    this.controlListvisible = false;
  }
  controlListOpen(): void {
    this.controlListvisible = true;
  }
  ngOnInit(): void {
    // this.getScreenBuilder();
    this.getDepartments();
    document
      .getElementsByTagName('body')[0]
      .setAttribute('data-sidebar-size', 'sm');
    if (this.dataSharedService.screenName) {
      this.getScreenData(this.dataSharedService.screenName);
    }
    this.htmlTabsData = htmlTabsData;
    this.makeDatainTemplateTab();
    let filterdButtons = this.htmlTabsData[0].children.filter(
      (item: any) => item.id == 'website-block'
    );
    this.websiteBlockTypeArray = filterdButtons[0].children;
    this.makeFormlyTypeOptions(htmlTabsData[0]);
  }

 //#region  Dropdown Work start

  // getDepartment Drodown
  getDepartments() {
    debugger
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Department').subscribe({
      next: (res: any) => {
        if (res.isSuccess)
          this.departmentData = res.data;
        else
          this.toastr.error(`Department : ${res.message}`, { nzDuration: 3000 });
      },
      error: (err) => {
        this.toastr.error(`Department : An error occured`, { nzDuration: 3000 });
      }
    });
  };

   // getApplication Drodown
  getApplications(departmentId: any) {
    debugger
    if (!departmentId) {
      return;
    }
    this.selectApplicationId = "";
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Application', departmentId).subscribe({
      next: (res: any) => {
        if (res.isSuccess)
          this.applicationData = res.data;
        else  this.toastr.error(`Application : ${res.message}`, { nzDuration: 3000 }); // Show an error message to the user
      },
      error: (err) => {
        
        this.toastr.error(`Application : An error occurred`, { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  }

  // getScreenBuilder Drodown
  getScreenBuilder(applicationId: string) {
    debugger
    if (!applicationId) {
      return;
    }
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/ScreenBuilder', applicationId).subscribe({
      next: (res: any) => {
        if (res.isSuccess)
          this.screens = res.data;
        else
          this.toastr.error(`ScreenBuilder : ${res.message}`, { nzDuration: 3000 });
      },
      error: (err) => {
        // console.error(err); 
        this.toastr.error(`ScreenBuilder : An error occurred`, { nzDuration: 3000 }); 
      }
    });

  }

 //#endregion Dropdown Work End



  LayerShow() {
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
    this.dataService.saveData(this.screenName, encryptData);
  }
  getOfflineDb() {
    let data = this.dataService.getNodes(this.screenName);
    let decryptData = this._encryptionService.decryptData(data);
    this.nodes = this.jsonParseWithObject(
      this.jsonStringifyWithObject(decryptData)
    );
    // let data = this.jsonParse(this.jsonStringifyWithObject(data));
  }
  async applyOfflineDb(content: 'previous' | 'next' | 'delete') {
    if (content === 'delete') {
      const nodes = await this.dataService.deleteDb(this.screenName);
      alert('this Screen Delete db successfully!');
      return;
    }
    const nodes = await this.dataService.getNodes(this.screenName);

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
    let data = this.dataService.deleteDb(this.screenName);
  }
  JsonEditorShow() {
    this.IslayerVisible = false;
    this.IsjsonEditorVisible = true;
    this.IsShowConfig = true;
    this.applySize();
  }
  saveJson() {
    if (this.screenPage) {
      this.saveLoader = true;
      if (this.selectedNode) {
        this.highlightSelect(this.selectedNode.id, false);
      }
      // const selectedScreen = this.screens.filter((a: any) => a._id == this.navigation)
      const screenData = this.jsonParse(this.jsonStringifyWithObject(this.nodes));
      const data: any = {
        "screenData": JSON.stringify(screenData),
        "screenName": this.screenName,
        "navigation": this.navigation,
        "screenBuilderId": this._id,
      };
      const builderModel = {
        "Builder": data
      }
      // if ((this.screenName.includes('-header') || this.screenName.includes('-footer')) && this.selectApplicationName) {
      //   data['module'] = this.selectApplicationName;
      //   this.dataSharedService.headerData = [];
      //   this.dataSharedService.footerData = [];
      //   this.dataSharedService.checkModule = '';
      // }
      // this.navigation = selectedScreen[0].navigation;
      // if (this.navigation > 0) {
      const checkBuilderAndProcess = this.builderScreenData.length > 0
        ? this.applicationService.updateNestCommonAPI('cp/Builder', this.builderScreenData[0]._id, builderModel)
        : this.applicationService.addNestCommonAPI('cp', builderModel);

      this.requestSubscription = checkBuilderAndProcess.subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.toastr.success(res.message, { nzDuration: 3000 });
            this.getBuilderScreen();
          }
          else
            this.toastr.error(res.message, { nzDuration: 3000 });

          this.saveLoader = false;
        },
        error: (err) => {
          this.saveLoader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
      // this.requestSubscription = this.builderService.jsonBuilderSettingV1(this.screenName).subscribe({
      //   next: (res: any) => {
      //     if (res.length > 0) {
      //       this.requestSubscription = this.builderService.jsonDeleteBuilder(res[0].id).subscribe({
      //         next: (res) => {
      //           this.requestSubscription = this.builderService.jsonSaveBuilder(data).subscribe({
      //             next: (res) => {
      //               this.saveLoader = false;
      //               alert("Data Save");
      //             },
      //             error: (err) => {
      //               console.error(err); // Log the error to the console
      //               this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      //               this.saveLoader = false;
      //             }
      //           })
      //         },
      //         error: (err) => {
      //           console.error(err); // Log the error to the console
      //           this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      //           this.saveLoader = false;
      //         }
      //       })
      //     }
      //     else {
      //       this.requestSubscription = this.builderService.jsonSaveBuilder(data).subscribe({
      //         next: (res) => {
      //           alert("Data Save");
      //           this.saveLoader = false;
      //         },
      //         error: (err) => {
      //           console.error(err); // Log the error to the console
      //           this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      //           this.saveLoader = false;
      //         }
      //       })
      //     }
      //   },
      //   error: (err) => {
      //     console.error(err); // Log the error to the console
      //     this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      //     this.saveLoader = false;
      //   }
      // })
    } else {
      alert('Please Select Screen');
    }
  }
  expandedKeys: any;
  previousScreenId: string = '';
  builderScreenData: any;
  getScreenData(data: any) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to switch your screen?',
      nzOnOk: () => {
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
          const objScreen = this.screens.find((x: any) => x._id == data);
          this.navigation = objScreen.navigation;
          this.screenName = objScreen.name;
          this.previousScreenId = objScreen.navigation;
          this.isSavedDb = false;
          this.getBuilderScreen();
          // const newScreenName = this.screens
          // if (newScreenName[0].name.includes('_header') && this.selectApplicationName) {
          //   let applicationType = this.applicationData.filter((item: any) => item.name == this.selectApplicationName);
          //   if (applicationType[0].application_Type == "website") {
          //     this.requestSubscription = this.builderService.getJsonModules(this.selectApplicationName).subscribe({
          //       next: (result) => {
          //         if (result.length > 0) {
          //           this.dataSharedService.menus = result ? result[0].selectedTheme ? result[0].selectedTheme : {} : {};
          //           this.dataSharedService.menus.allMenuItems = result[0].menuData
          //         }
          //       },
          //       error: (err) => {
          //         console.error(err); // Log the error to the console
          //         this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
          //       }
          //     })
          //   }
          // }

          this.screenPage = true;
        }).catch(() => this.navigation = this.previousScreenId)
      },
      nzOnCancel: () => {
        this.navigation = this.previousScreenId;
        console.log('User clicked Cancel');
      }
    });
  }
  getBuilderScreen() {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', this._id).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.builderScreenData = res.data;
          if (res.data.length > 0) {
            const objScreenData = JSON.parse(res.data[0].screenData);
            this.isSavedDb = true;
            // this.moduleId = res[0].moduleId;
            this.formlyModel = [];
            this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(objScreenData));
            this.updateNodes();
            this.applyDefaultValue();
            this.getJoiValidation(this._id);
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

          }
          else {
            // this.navigation = 0;
            this.clearChildNode();
          }
          this.isSavedDb = true;
          this.formModalData = {};
          this.getUIRuleData(true);
          this.getBusinessRule();
          this.expandedKeys = this.nodes.map((node: any) => node.key);
          this.uiRuleGetData(this.screenName);
        } else
          this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  }
  applyDefaultValue() {
    const filteredNodes = this.filterInputElements(this.nodes);
    filteredNodes.forEach((node) => {
      const formlyConfig = node.formly?.[0]?.fieldGroup?.[0]?.defaultValue;
      if (formlyConfig)
        this.formlyModel[node?.formly?.[0]?.fieldGroup?.[0]?.key] =
          formlyConfig;
    });
  }
  clearChildNode() {
    this.addControl = true;
    this.isSavedDb = false;
    this.showNotification = false;
    if (this.screenPage) {
      this.formlyModel = [];
      const newNode = [
        {
          id: this.screenName + '_' + 'page_' + Guid.newGuid(),
          key: 'page_' + Guid.newGuid(),
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
      this.addControlToJson('pageHeader', null);
      this.addControlToJson('pageBody', null);
      this.selectedNode = this.sectionBageBody;
      this.addControlToJson('sections', null);
      this.selectedNode = this.sections;
      this.addControlToJson('header', null);
      this.addControlToJson('body', null);
      this.addControlToJson('footer', null);
      this.selectedNode = newNode[0];
      this.addControlToJson('pageFooter', null);
      this.addControl = false;
      this.selectedNode = this.sectionAccorBody;
      this.addControlToJson('text', this.textJsonObj);
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

    const selectedScreen = this.screens.filter((a: any) => a.name == this.screenName)
    var data =
    {
      "screenName": this.screenName,
      "screenData": currentData,
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
  chilAdd: TreeNode;
  screenData: any;
  businessRuleData: any;
  formlyModel: any;
  faker: boolean = false;
  makeFaker() {
    let dataModelFaker: any = [];
    if (this.nodes.length > 0) {
      const filteredNodes = this.filterInputElements(this.nodes);
      filteredNodes.forEach((node) => {
        dataModelFaker[node.formly[0].fieldGroup[0].key] =
          this.makeFakerData(node);
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
        } else if (V2.formly[0].fieldGroup[0].type == 'textarea') {
          // modelFaker = faker.lorem.paragraph()
        } else if (V2.formly[0].fieldGroup[0].type == 'inputGroupGrid') {
          // modelFaker = faker.name.firstName()
        } else if (V2.formly[0].fieldGroup[0].props.type == 'password') {
          // modelFaker = faker.name.firstName()
        } else if (V2.formly[0].fieldGroup[0].props.type == 'tel') {
          // modelFaker = faker.phone.number()
        } else if (V2.formly[0].fieldGroup[0].props.type == 'date') {
          // modelFaker = faker.date.between('01/01/2001', '01/01/2001');
        } else if (V2.formly[0].fieldGroup[0].props.type == 'email') {
          // modelFaker = faker.internet.email()
        } else if (V2.formly[0].fieldGroup[0].props.type == 'checkbox') {
          // modelFaker = faker.datatype.boolean()
        } else if (V2.formly[0].fieldGroup[0].props.type == 'radio') {
          // modelFaker = faker.datatype.boolean()
        } else if (V2.formly[0].fieldGroup[0].props.type == 'number') {
          // modelFaker = 1
          // modelFaker = faker.datatype.number(10)
        } else if (V2.formly[0].fieldGroup[0].props.type == 'decimal') {
          // modelFaker = 0.0
          // modelFaker = faker.datatype.float({ min: 10, max: 100, precision: 0.001 })
        } else if (V2.formly[0].fieldGroup[0].props.type == 'month') {
          // modelFaker = faker.date.month({ abbr: true, context: true })
        } else if (V2.formly[0].fieldGroup[0].props.type == 'datetime-local') {
          // modelFaker = faker.datatype.datetime(1893456000000)
        } else if (V2.formly[0].fieldGroup[0].props.type == 'color') {
          // modelFaker = faker.color.colorByCSSColorSpace()
        }
      } else if (V2.formly[0].fieldGroup[0].type) {
        if (V2.formly[0].fieldGroup[0].type == 'input') {
          // modelFaker = faker.name.firstName()
        } else if (V2.formly[0].fieldGroup[0].type == 'textarea') {
          // modelFaker = faker.lorem.paragraph()
        } else if (V2.formly[0].fieldGroup[0].type == 'inputGroupGrid') {
          // modelFaker = faker.name.firstName()
        }
      }
      return modelFaker;
    }
  }
  uiRuleGetData(screenId: any) {
    this.makeFaker();
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
  getJoiValidation(_id: any) {
    this.applicationService.getNestCommonAPIById('cp/ValidationRule', _id).subscribe(((getRes: any) => {
      if (getRes.isSuccess) {
        if (getRes.data.length > 0) {
          this.validationRuleId = getRes.data[0]._id;
          this.joiValidationData = getRes.data;
        }
      }
      else
        this.toastr.error(getRes.message, { nzDuration: 3000 }); // Show an error message to the user
    }));
  }
  getUIRuleData(data: any) {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/UiRule', this._id).subscribe({
      next: (getRes: any) => {
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            const jsonUIResult = {
              // "key": this.selectedNode.chartCardConfig?.at(0)?.buttonGroup == undefined ? this.selectedNode.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.key : this.selectedNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
              "key": this.selectedNode.key,
              "title": this.selectedNode.title,
              "screenName": this.screenName,
              "screenBuilderId": this._id,
              "uiData": JSON.parse(getRes.data[0].uiData),
            }
            this.screenData = jsonUIResult;
          } else {
          }
        } else
          this.toastr.error(getRes.message, { nzDuration: 3000 }); // Show an error message to the user
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }

    });
  }
  bulkUpdate() {
    if (this.nodes.length > 0) {
      const drawerRef = this.drawerService.create<
        BulkUpdateComponent,
        { value: string },
        string
      >({
        nzTitle: 'Bulk Update',
        nzWidth: 1000,
        nzContent: BulkUpdateComponent,
        nzContentParams: {
          nodes: this.nodes,
          types: this.formlyTypes,
          // formlyModel: this.formlyModel,
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
        }
        this.updateNodes();
        this.cdr.detectChanges();
      });
    } else {
      this.toastr.error('Please select Screen first', { nzDuration: 3000 });
    }
  }

  getUIRule(model: any, currentValue: any) {

    try {
      if (this.screenData != undefined) {
        var inputType =
          this.nodes[0].children[1].children[0].children[1].children;
        for (let index = 0; index < this.screenData.uiData.length; index++) {
          if (model.key == this.screenData.uiData[index].ifMenuName) {
            let query: any;
            let getModelValue =
              this.formlyModel[this.screenData.uiData[index].ifMenuName] == ''
                ? false
                : this.formlyModel[this.screenData.uiData[index].ifMenuName];
            if (this.screenData.uiData[index].condationName == 'contains') {
              if (
                this.formlyModel[this.screenData.uiData[index].ifMenuName] !=
                undefined &&
                this.formlyModel[
                  this.screenData.uiData[index].ifMenuName
                ].includes(this.screenData.uiData[index].targetValue)
              ) {
                query = '1 == 1';
                query = this.evalConditionRule(
                  query,
                  this.screenData.uiData[index].targetIfValue
                );
              } else {
                query = '1 == 2';
                query = this.evalConditionRule(
                  query,
                  this.screenData.uiData[index].targetIfValue
                );
              }
            } else if (this.screenData.uiData[index].condationName == 'null') {
              if (
                typeof this.formlyModel[
                this.screenData.uiData[index].ifMenuName
                ] != 'number'
              ) {
                if (
                  this.formlyModel[this.screenData.uiData[index].ifMenuName] ==
                  '' ||
                  this.formlyModel[this.screenData.uiData[index].ifMenuName] ==
                  null
                ) {
                  query = '1 == 1';
                  query = this.evalConditionRule(
                    query,
                    this.screenData.uiData[index].targetIfValue
                  );
                } else {
                  query = '1 == 2';
                  query = this.evalConditionRule(
                    query,
                    this.screenData.uiData[index].targetIfValue
                  );
                }
              } else {
                query = '1 == 2';
                query = this.evalConditionRule(
                  query,
                  this.screenData.uiData[index].targetIfValue
                );
              }
            } else {
              if (
                this.screenData.uiData[index].ifMenuName.includes('number') ||
                this.screenData.uiData[index].ifMenuName.includes('decimal')
              ) {
                query =
                  Number(getModelValue) +
                  ' ' +
                  this.screenData.uiData[index].condationName +
                  ' ' +
                  this.screenData.uiData[index].targetValue;

                query = this.evalConditionRule(
                  query,
                  this.screenData.uiData[index].targetIfValue
                );
              } else {
                query =
                  "'" +
                  getModelValue +
                  "' " +
                  this.screenData.uiData[index].condationName +
                  " '" +
                  this.screenData.uiData[index].targetValue +
                  "'";

                query = this.evalConditionRule(
                  query,
                  this.screenData.uiData[index].targetIfValue
                );
              }
            }
            if (eval(query)) {
              const check = this.makeUIJSONForSave(
                this.screenData,
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
                this.screenData,
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
        this.updateFormlyModel();
        // Object.assign([],this.formlyModel)
        // this.updateNodes();
        // this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(this.nodes));
      }
    } catch (error) {
      console.log(error);
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
      (a: any) => a.name == this.screenName
    );
    if (selectedScreen.length > 0) {
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/BusinessRule', this._id).subscribe({
        next: (getRes: any) => {
          if (getRes.isSuccess)
            if (getRes.data.length > 0) {
              this.businessRuleData = [];
              if (getRes.data[0].buisnessRule) {
                this.businessRuleData = JSON.parse(getRes.data[0].buisnessRule)
              }
            } else {
              this.businessRuleData = [];
            }
          else
            this.toastr.error(getRes.message, { nzDuration: 3000 }); // Show an error message to the user
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      })
    }
  }
  lastFormlyModelValue: string;
  makeUIJSONForSave(
    screenData: any,
    index: number,
    inputType: any,
    currentValue: boolean
  ) {
    for (let k = 0; k < screenData.uiData[index].targetCondition.length; k++) {
      for (let l = 0; l < inputType.length; l++) {
        if (
          inputType[l].type == 'button' ||
          inputType[l].type == 'linkbutton' ||
          inputType[l].type == 'dropdownButton'
        ) {
          if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          ) {
            inputType[l] =
              this.screenData.uiData[index].targetCondition[k].inputJsonData;
          } else if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l] =
              this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
        } else if (inputType[l].type == 'buttonGroup') {
          if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          )
            inputType[l].children =
              this.screenData.uiData[index].targetCondition[k].inputJsonData;
          else if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l].children =
              this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
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
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].formly[0].fieldGroup[0].key &&
            currentValue
          ) {
            inputType[l].formly[0].fieldGroup[0] =
              this.screenData.uiData[index].targetCondition[k].inputJsonData;
            inputType[l].formly[0].fieldGroup[0].defaultValue =
              this.screenData.uiData[index].targetCondition[
                k
              ].inputJsonData.defaultValue;
          } else if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].formly[0].fieldGroup[0].key &&
            !currentValue
          ) {
            inputType[l].formly[0].fieldGroup[0] =
              this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
            inputType[l].formly[0].fieldGroup[0].defaultValue =
              this.screenData.uiData[index].targetCondition[
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
          inputType[l].type == 'audio' ||
          inputType[l].type == 'multiFileUpload' ||
          inputType[l].type == 'rate' ||
          inputType[l].type == 'toastr' ||
          inputType[l].type == 'video'
        ) {
          if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          )
            inputType[l] =
              this.screenData.uiData[index].targetCondition[k].inputJsonData;
          else if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l] =
              this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
        } else if (inputType[l].type == 'mainDashonicTabs') {
          for (let m = 0; m < inputType[l].children.length; m++) {
            if (
              this.screenData.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].key &&
              currentValue
            )
              inputType[l].children[m] =
                this.screenData.uiData[index].targetCondition[k].inputJsonData;
            else if (
              this.screenData.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].key &&
              !currentValue
            )
              inputType[l].children[m] =
                this.screenData.uiData[index].targetCondition[
                  k
                ].inputOldJsonData;
          }
        } else if (inputType[l].type == 'stepperMain') {
          for (let m = 0; m < inputType[l].children.length; m++) {
            if (
              this.screenData.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].formly[0].fieldGroup[0].key &&
              currentValue
            )
              inputType[l].children[m] =
                this.screenData.uiData[index].targetCondition[k].inputJsonData;
            else if (
              this.screenData.uiData[index].targetCondition[k].targetName ==
              inputType[l].children[m].formly[0].fieldGroup[0].key &&
              !currentValue
            )
              inputType[l].children[m] =
                this.screenData.uiData[index].targetCondition[
                  k
                ].inputOldJsonData;
          }
        } else if (
          inputType[l].type == 'gridList' ||
          inputType[l].type == 'gridListEditDelete'
        ) {
          if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            currentValue
          )
            inputType[l] =
              this.screenData.uiData[index].targetCondition[k].inputJsonData;
          else if (
            this.screenData.uiData[index].targetCondition[k].targetName ==
            inputType[l].key &&
            !currentValue
          )
            inputType[l] =
              this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
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
      value == 'gridList' ||
      value == 'accordionButton' ||
      value == 'header_1' ||
      value == 'header_2' ||
      value == 'header_3' ||
      value == 'header_4' ||
      value == 'header_5' ||
      value == 'header_6' ||
      value == 'header_7'
    )
      return 'w-full';
    else if (value == 'body') return 'px-6 pt-6 pb-10';
    else if (value == 'buttonGroup') return 'w-11/12';
    else return 'sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2';
  }
  addControlToJson(value: string, data?: any) {

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
      this.controls(value, data, obj);
    } else {
      const modal =
        this.modalService.create<AddControlCommonPropertiesComponent>({
          nzTitle: 'Change Control Value',
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
          this.controls(value, data, obj, res);
        }
      });
    }
  }
  controls(value: any, data: any, obj?: any, res?: any) {
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
    if (data?.parameter == 'input') {
      newNode = {
        id: this.navigation + '_' + value.toLowerCase() + '_' + Guid.newGuid(),
        className: this.columnApply(value),
        expanded: true,
        type: value,
        title: res?.title ? res.title : obj.title,
        children: [],
        tooltip: '',
        hideExpression: false,
        highLight: false,
        copyJsonIcon: false,
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
      };
    }
    if (
      value == 'insertButton' ||
      value == 'updateButton' ||
      value == 'deleteButton'
    ) {
      newNode.isSubmit = res.isSubmit;
    }
    if (value == 'invoiceGrid') {
      newNode.type = 'gridList';
      newNode.id =
        this.screenName + '_' + 'gridList'.toLowerCase() + '_' + Guid.newGuid();
    }
    switch (value) {
      case 'page':
        newNode = { ...newNode, ...this.addControlService.getPageControl() };
        break;
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
      case 'header_1':
        newNode = {
          ...newNode,
          ...this.addControlService.getHeader1(newNode, this.screenName),
        };
        break;
      case 'header_2':
        newNode = {
          ...newNode,
          ...this.addControlService.getHeader_2(newNode, this.screenName),
        };
        break;
      case 'header_3':
        newNode = {
          ...newNode,
          ...this.addControlService.getHeade_3(newNode, this.screenName),
        };
        break;
      case 'header_4':
        newNode = {
          ...newNode,
          ...this.addControlService.getHeader_4(newNode, this.screenName),
        };
        break;
      case 'header_5':
        newNode = {
          ...newNode,
          ...this.addControlService.getHeader_5(newNode, this.screenName),
        };
        break;
      case 'header_6':
        newNode = {
          ...newNode,
          ...this.addControlService.getHeader_6(newNode, this.screenName),
        };
        break;
      case 'header_7':
        newNode = {
          ...newNode,
          ...this.addControlService.getHeader_7(newNode, this.screenName),
        };
        break;
      case 'pricing':
        newNode = {
          ...newNode,
          ...this.addControlService.getwebistepricing(newNode, this.screenName),
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
      case 'deleteButton':
        newNode = {
          ...newNode,
          ...this.addControlService.getInsertButtonControl(),
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
      case 'simpleCardWithHeaderBodyFooter':
        newNode = {
          ...newNode,
          ...this.addControlService.getSimpleCardWithHeaderBodyFooterControl(),
        };
        break;
      case 'tabs':
        newNode = { ...newNode, ...this.addControlService.getTabsControl() };
        this.chilAdd = newNode;
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
        this.chilAdd = newNode;
        break;
      case 'step':
        newNode = { ...newNode, ...this.addControlService.getStepControl() };
        this.chilAdd = newNode;
        break;
      case 'kanban':
        newNode = { ...newNode, ...this.addControlService.getKanbanControl() };
        break;
      case 'kanbanTask':
        newNode = {
          ...newNode,
          ...this.addControlService.getKanbanTaskControl(),
        };
        break;
      case 'simplecard':
        newNode = { ...newNode, ...this.addControlService.simplecardControl() };
        break;
      case 'div':
        newNode = { ...newNode, ...this.addControlService.divControl() };
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

      case 'multiFileUpload':
        newNode = {
          ...newNode,
          ...this.addControlService.multiFileUploadControl(),
        };
        break;

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

      case 'fixedDiv':
        newNode = { ...newNode, ...this.addControlService.fixedDivControl() };
        this.chilAdd = newNode;
        break;

      case 'accordionButton':
        newNode = {
          ...newNode,
          ...this.addControlService.accordionButtonControl(),
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

      case 'cascader':
        newNode = { ...newNode, ...this.addControlService.cascaderControl() };
        break;

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
            formly: [
              {
                fieldGroup: [
                  {
                    key: res?.key ? res.key : obj.key,
                    type: data?.type,
                    defaultValue: '',
                    focus: false,
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
                        requiredMessage: 'This field is required',
                        tooltipPosition: 'right',
                        toolTipClass: '',
                        formlyTypes: '',
                      },
                      rows: 1,
                      maxLength: 10000000,
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
                        // this.checkConditionUIRule(model, currentVal);
                      },
                    },
                  },
                ],
              },
            ],
          };
          newNode = { ...newNode, ...formlyObj };
        }
        break;
    }
    this.addNode(node, newNode);
    this.updateNodes();
  }
  makeFormlyOptions(option: any, type: any) {
    if (option) {
      let data = [];
      if (type == 'checkbox') {
        data = [
          {
            label: 'option1',
            value: '1',
          },
        ];
      } else {
        data = [
          {
            label: 'option1',
            value: '1',
          },
          {
            label: 'option2',
            value: '2',
          },
          {
            label: 'option3',
            value: '3',
          },
        ];
      }
      return data;
    } else return [];
  }
  addNode(node: TreeNode, newNode: TreeNode) {
    if (node.children) {
      node.children.push(newNode);
      if (this.showNotification) {
        this.toastr.success('Control Added', { nzDuration: 3000 });
      }
    }
    this.makeFaker();
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
  closeConfigurationList() {
    this.IsShowConfig = false;
  }
  openConfig(parent: any, node: any) {
    if (node.origin) {
      parent = parent?.parentNode?.origin;
      node = node.origin;
    }
    // this.isActiveShow = node.origin.id;
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
    this.dataSharedService.screenModule = this.screens;
    this.dataSharedService.selectedNode = this.selectedNode;
    this.dataSharedService.screenName = this.screenName;
  }
  applySize() {
    this.sizes = [25, 75, 0];
    if (
      !this.IslayerVisible &&
      this.IsConfigurationVisible &&
      !this.IsjsonEditorVisible
    ) {
      this.sizes = [1, 99, 0];
    } else if (
      !this.IslayerVisible &&
      this.IsConfigurationVisible &&
      this.IsjsonEditorVisible
    ) {
      this.sizes = [25, 75, 0];
    } else if (
      !this.IslayerVisible &&
      !this.IsConfigurationVisible &&
      this.IsjsonEditorVisible
    ) {
      this.sizes = [25, 75, 0];
    } else if (
      this.IslayerVisible &&
      !this.IsConfigurationVisible &&
      !this.IsjsonEditorVisible
    ) {
      this.sizes = [25, 75, 0];
    } else if (
      !this.IslayerVisible &&
      !this.IsConfigurationVisible &&
      !this.IsjsonEditorVisible
    ) {
      this.sizes = [1, 99, 0];
    }
  }

  clickButton(type: any) {
    debugger
    let _formFieldData = new formFeildData();
    this.validationFieldData = new GenaricFeild({
      type: 'inputValidationRule',
      title: 'Change Attribute Values',
      formData: _formFieldData.inputValidationRuleFields,
    });
    if (this.joiValidationData.length > 0) {
      let getJoiRule = this.joiValidationData.find(
        (a) => a.key == this.selectedNode.key
      );
      if (getJoiRule) this.validationFieldData.modelData = getJoiRule;
    }
    let veriableOptions: any[] = [];
    if (this.nodes[0].options) {
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
      fieldGroup.push({
        key: 'className',
        type: 'multiselect',
        className: 'w-full',
        wrappers: ['formly-vertical-theme-wrapper'],
        props: {
          multiple: true,
          label: 'CSS ClassName',
          options: [
            {
              label: 'w-1/2',
              value: 'w-1/2',
            },
            {
              label: 'w-1/3',
              value: 'w-1/3',
            },
            {
              label: 'w-2/3',
              value: 'w-2/3',
            },
            {
              label: 'w-1/4',
              value: 'w-1/4',
            },
            {
              label: 'w-3/4',
              value: 'w-3/4',
            },
            {
              label: 'w-full',
              value: 'w-full',
            },
            {
              label: 'w-auto',
              value: 'w-auto',
            },
            {
              label: 'w-screen',
              value: 'w-screen',
            },
            {
              label: 'sm:w-1/2',
              value: 'sm:w-1/2',
            },
            {
              label: 'md:w-1/3',
              value: 'md:w-1/3',
            },
            {
              label: 'lg:w-2/3',
              value: 'lg:w-2/3',
            },
            {
              label: 'xl:w-1/4',
              value: 'xl:w-1/4',
            },
            {
              label: 'text-gray-500',
              value: 'text-gray-500',
            },
            {
              label: 'text-red-600',
              value: 'text-red-600',
            },
            {
              label: 'text-blue-400',
              value: 'text-blue-400',
            },
            {
              label: 'text-green-500',
              value: 'text-green-500',
            },
            {
              label: 'text-yellow-300',
              value: 'text-yellow-300',
            },
            {
              label: 'bg-gray-200',
              value: 'bg-gray-200',
            },
            {
              label: 'bg-blue-500',
              value: 'bg-blue-500',
            },
            {
              label: 'bg-green-300',
              value: 'bg-green-300',
            },
            {
              label: 'bg-yellow-200',
              value: 'bg-yellow-200',
            },
            {
              label: 'p-4',
              value: 'p-4',
            },
            {
              label: 'pt-6',
              value: 'pt-6',
            },
            {
              label: 'ml-2',
              value: 'ml-2',
            },
            {
              label: 'mr-8',
              value: 'mr-8',
            },
            {
              label: 'my-3',
              value: 'my-3',
            },
            {
              label: 'flex',
              value: 'flex',
            },
            {
              label: 'justify-center',
              value: 'justify-center',
            },
            {
              label: 'items-center',
              value: 'items-center',
            },
          ],
          additionalProperties: {
            allowClear: true,
            serveSearch: true,
            showArrow: true,
            showSearch: true,
            selectType: 'tags',
            maxCount: 6,
          },
        },
      });
      _formFieldData.commonFormlyConfigurationFields[0].fieldGroup = fieldGroup;
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

    this.fieldData = new GenaricFeild({
      type: type,
      title: 'Change Attribute Values',
      commonData: _formFieldData.commonOtherConfigurationFields,
    });
    const selectedNode = this.selectedNode;
    let configObj: any;
    configObj = selectedNode;
    let newClass = selectedNode.className;
    selectedNode.id = selectedNode.id?.toLowerCase();
    if (typeof selectedNode.className === "string") {
      const classObj = JSON.parse(JSON.stringify(selectedNode.className.split(" ")));
      configObj.className = classObj
    }
    // this.selectedNode.className = newClass;
    // selectedNode.className = newClass;
    // configObj = JSON.parse(JSON.stringify(selectedNode));
    switch (type) {
      case 'drawer':
        this.addIconCommonConfiguration(_formFieldData.drawerFields, false);
        this.fieldData.formData = _formFieldData.drawerFields;
        break;
      case 'cardWithComponents':
        this.fieldData.formData = _formFieldData.cardWithComponentsFields;
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'icon':
        this.fieldData.formData = _formFieldData.commonIconFields;
        break;
      case 'anchor':
        this.fieldData.formData = _formFieldData.anchorFields;

        break;
      case 'treeSelect':
        this.fieldData.formData = _formFieldData.treeSelectFields;
        break;
      case 'treeView':
        this.fieldData.formData = _formFieldData.treeviewFields;
        break;
      case 'cascader':
        this.addIconCommonConfiguration(_formFieldData.cascaderFields, false);
        this.fieldData.formData = _formFieldData.cascaderFields;
        delete configObj.options;
        break;
      case 'tree':
        this.addIconCommonConfiguration(_formFieldData.treeFields, false);
        this.fieldData.formData = _formFieldData.treeFields;
        break;
      case 'htmlBlock':
        this.fieldData.formData = _formFieldData.htmlBlockFields;
        break;
      case 'modal':
        this.addIconCommonConfiguration(_formFieldData.modalFields, false);
        this.fieldData.formData = _formFieldData.modalFields;
        break;
      case 'transfer':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getTransferConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.transferFields;
        break;
      case 'gridList':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getGridConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.gridFields;
        break;
      case 'comment':
        this.fieldData.formData = _formFieldData.commentFields;
        break;
      case 'rate':
        if (!configObj.options[0].label) {
          configObj.options = configObj.options.map((option: any) => ({
            label: option,
          }));
        }
        this.addIconCommonConfiguration(_formFieldData.rateFields, true);
        this.fieldData.formData = _formFieldData.rateFields;
        break;
      case 'skeleton':
        this.fieldData.formData = _formFieldData.skeletonFields;
        break;
      case 'badge':
        this.addIconCommonConfiguration(_formFieldData.badgeFields, false);
        this.fieldData.formData = _formFieldData.badgeFields;
        break;
      case 'mentions':
        this.fieldData.formData = _formFieldData.mentionsFields;
        break;
      case 'empty':
        this.fieldData.formData = _formFieldData.emptyFields;
        break;
      case 'segmented':
        this.fieldData.formData = _formFieldData.segmentedFields;
        break;
      case 'statistic':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getStatisticConfig(selectedNode),
        };
        this.addIconCommonConfiguration(_formFieldData.statisticFields, true);
        this.fieldData.formData = _formFieldData.statisticFields;
        break;
      case 'tag':
        this.addIconCommonConfiguration(_formFieldData.nzTagFields, false);
        this.fieldData.formData = _formFieldData.nzTagFields;
        break;
      case 'message':
        this.fieldData.formData = _formFieldData.messageFields;
        break;
      case 'notification':
        this.addIconCommonConfiguration(
          _formFieldData.notificationFields,
          true
        );
        this.fieldData.formData = _formFieldData.notificationFields;
        break;
      case 'list':
        this.fieldData.formData = _formFieldData.listFields;
        break;
      case 'description':
        this.fieldData.formData = _formFieldData.descriptionFields;
        break;
      case 'descriptionChild':
        this.fieldData.formData = _formFieldData.descriptionChildFields;
        break;
      case 'affix':
        this.fieldData.formData = _formFieldData.affixFields;
        break;
      case 'backTop':
        this.fieldData.formData = _formFieldData.backtopFields;
        break;
      case 'avatar':
        this.fieldData.formData = _formFieldData.avatarFields;
        break;
      case 'popOver':
        this.fieldData.formData = _formFieldData.popOverFields;
        break;
      case 'popConfirm':
        this.fieldData.formData = _formFieldData.popOverFields;
        break;
      case 'result':
        this.fieldData.formData = _formFieldData.resultFields;
        break;
      case 'spin':
        this.fieldData.formData = _formFieldData.spinFields;
        break;
      case 'imageUpload':
        this.fieldData.formData = _formFieldData.imageUploadFeilds;
        break;
      case 'toastr':
        this.fieldData.formData = _formFieldData.toastrFeilds;
        break;
      case 'invoice':
        // configObj = { ...configObj, ...this.clickButtonService.getinvoiceConfig(selectedNode) };
        this.fieldData.formData = _formFieldData.invoiceFeilds;
        break;
      case 'rangeSlider':
        this.addIconCommonConfiguration(_formFieldData.rangeSliderFeilds, true);
        this.fieldData.formData = _formFieldData.rangeSliderFeilds;
        break;
      case 'inputGroupGrid':
        this.fieldData.formData = _formFieldData.inputGroupGridFeilds;
        break;
      case 'card':
        this.fieldData.formData = _formFieldData.cardFields;
        break;
      case 'calender':
        this.fieldData.formData = _formFieldData.tuiCalendarFeilds;
        break;
      case 'multiFileUpload':
        this.fieldData.formData = _formFieldData.multiFileUploadFeilds;
        break;
      case 'switch':
        this.fieldData.formData = _formFieldData.switchFeilds;
        break;
      case 'tabs':
        this.addIconCommonConfiguration(_formFieldData.tabsFields, true);
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        this.fieldData.formData = _formFieldData.tabsFields;
        break;
      case 'kanban':
        this.fieldData.formData = _formFieldData.kanbanFeilds;
        break;
      case 'kanbanTask':
        this.fieldData.formData = _formFieldData.kanbanTaskFeilds;
        break;
      case 'mainTab':
        this.fieldData.formData = _formFieldData.mainTabFields;
        break;
      case 'progressBar':
        this.fieldData.formData = _formFieldData.progressBarFields;
        break;
      case 'divider':
        this.addIconCommonConfiguration(_formFieldData.dividerFeilds, true);
        this.fieldData.formData = _formFieldData.dividerFeilds;
        break;
      case 'video':
        this.fieldData.formData = _formFieldData.videosFeilds;
        break;
      case 'audio':
        this.fieldData.formData = _formFieldData.audioFeilds;
        break;
      case 'carouselCrossfade':
        this.fieldData.formData = _formFieldData.carouselCrossfadeFeilds;
        break;
      case 'alert':
        this.addIconCommonConfiguration(_formFieldData.alertFeilds, true);
        this.fieldData.formData = _formFieldData.alertFeilds;
        break;
      case 'timeline':
        this.addIconCommonConfiguration(_formFieldData.timelineFeilds, false);
        this.fieldData.formData = _formFieldData.timelineFeilds;
        break;
      case 'simpleCardWithHeaderBodyFooter':
        this.fieldData.formData =
          _formFieldData.simpleCardWithHeaderBodyFooterFeilds;
        break;
      case 'div':
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        this.fieldData.formData = _formFieldData.divFields;
        break;
      case 'mainDiv':
        this.fieldData.formData = _formFieldData.mainDivFields;
        break;
      case 'heading':
        this.fieldData.formData = _formFieldData.headingFields;
        break;
      case 'paragraph':
        this.addIconCommonConfiguration(_formFieldData.paragraphFields, false);
        this.fieldData.formData = _formFieldData.paragraphFields;
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
      case 'inputGroup':
      case 'image':
      case 'textarea':
      case 'telephone':
      case 'autoComplete':
      case 'number':
      case 'url':
      case 'customMasking':
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
        this.fieldData.commonData =
          _formFieldData.commonFormlyConfigurationFields;
        switch (type) {
          case 'search':
            this.fieldData.formData = _formFieldData.selectFields;
            break;
          case 'radiobutton':
          case 'checkbox':
            this.fieldData.formData = _formFieldData.radioFields;
            break;
          case 'color':
            this.fieldData.formData = _formFieldData.colorFields;
            break;
          case 'autoComplete':
            this.fieldData.formData = _formFieldData.autoCompleteFields;
            break;
          case 'date':
            this.fieldData.formData = _formFieldData.zorroDateFields;
            break;
          case 'number':
            this.fieldData.formData = _formFieldData.numberFields;
            break;
          case 'repeatSection':
          case 'multiselect':
            this.fieldData.formData = _formFieldData.zorroSelectFields;
            break;
          case 'timepicker':
            this.fieldData.formData = _formFieldData.zorroTimeFields;
            break;
          case 'customMasking':
            this.fieldData.formData = _formFieldData.customMaskingFields;
            break;
        }
        break;
      case 'button':
        // configObj = { ...configObj, ...this.clickButtonService.getButtonConfig(selectedNode) };
        if (typeof selectedNode.buttonClass === "string") {
          const classObj = JSON.parse(JSON.stringify(selectedNode.buttonClass.split(" ")));
          configObj.buttonClass = classObj
        }
        configObj.icon = selectedNode.btnIcon;
        this.addIconCommonConfiguration(_formFieldData.buttonFields, true);
        this.fieldData.formData = _formFieldData.buttonFields;
        break;
      case 'dropdownButton':
        if (typeof selectedNode.buttonClass === "string") {
          const classObj = JSON.parse(JSON.stringify(selectedNode.buttonClass.split(" ")));
          configObj.buttonClass = classObj
        }
        (configObj.icon = selectedNode.btnIcon),
          (configObj.options = selectedNode.dropdownOptions);
          // configObj = { ...configObj, ...this.clickButtonService.getDropdownButtonConfig(selectedNode) };
          this.addIconCommonConfiguration(
            _formFieldData.dropdownButtonFields,
            true
          );
        this.fieldData.formData = _formFieldData.dropdownButtonFields;
        break;
      case 'accordionButton':
        this.addIconCommonConfiguration(
          _formFieldData.accordionButtonFields,
          true
        );
        this.fieldData.formData = _formFieldData.accordionButtonFields;
        break;
      case 'linkbutton':
        if (typeof selectedNode.buttonClass === "string") {
          const classObj = JSON.parse(JSON.stringify(selectedNode.buttonClass.split(" ")));
          configObj.buttonClass = classObj
        }
        // configObj = { ...configObj, ...this.clickButtonService.getLinkButtonConfig(selectedNode) };
        (configObj.icon = selectedNode.btnIcon),
          this.addIconCommonConfiguration(
            _formFieldData.linkButtonFields,
            true
          );
        this.fieldData.formData = _formFieldData.linkButtonFields;
        break;
      case 'buttonGroup':
        this.fieldData.formData = _formFieldData.buttonGroupFields;
        break;
      case 'page':
        this.fieldData.formData = _formFieldData.pageFields;
        break;
      case 'pageHeader':
        this.fieldData.formData = _formFieldData.pageHeaderFields;
        break;
      case 'pageBody':
        break;
      case 'pageFooter':
        this.fieldData.formData = _formFieldData.pageFooterFields;
        break;
      case 'sections':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getSectionConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.sectionsFields;
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'header':
        this.fieldData.formData = _formFieldData.headerFields;
        break;
      case 'footer':
        this.fieldData.formData = _formFieldData.footerFields;
        break;
      case 'body':
        this.fieldData.formData = _formFieldData.bodyFields;
        break;
      case 'step':
        this.addIconCommonConfiguration(_formFieldData.stepperFields, true);
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        this.fieldData.formData = _formFieldData.stepperFields;
        break;
      case 'mainStep':
        this.fieldData.formData = _formFieldData.mainStepperFields;

        break;
      case 'listWithComponents':
        this.fieldData.formData = _formFieldData.listWithComponentsFields;
        break;
      case 'listWithComponentsChild':
        this.fieldData.formData = _formFieldData.listWithComponentsChildFields;
        this.fieldData.mappingConfig = _formFieldData.mappingFields;
        this.fieldData.mappingNode = this.selectedNode;
        break;
      case 'tabsMain':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getMainTabsConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.mainTabFields;
        break;
      case 'barChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getBarChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.barChartFields;
        break;
      case 'pieChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getPieChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.pieChartFields;
        break;
      case 'bubbleChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getBubbleChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.bubbleChartFields;
        break;
      case 'candlestickChart':
        this.fieldData.formData = _formFieldData.candlestickChartFields;
        break;
      case 'columnChart':
        this.fieldData.formData = _formFieldData.columnChartFields;
        break;
      case 'ganttChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getGanttChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.ganttChartFields;
        break;
      case 'geoChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getGeoChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.geoChartFields;
        break;
      case 'histogramChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getHistogramChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.histogramChartFields;
        break;
      case 'treeMapChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.gettreeMapChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.treeMapChartFields;
        break;
      case 'tableChart':
        this.fieldData.formData = _formFieldData.tableChartFields;
        break;
      case 'lineChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getLineChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.lineChartFields;
        break;
      case 'sankeyChart':
        this.fieldData.formData = _formFieldData.sankeyChartFields;
        break;
      case 'scatterChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getScatterChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.scatterChartFields;
        break;
      case 'areaChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getAreaChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.areaChartFields;
        break;
      case 'comboChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getComboChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.comboChartFields;
        break;
      case 'steppedAreaChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getSteppedAreaChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.steppedAreaChartFields;
        break;
      case 'timelineChart':
        configObj = {
          ...configObj,
          ...this.clickButtonService.getTimelineChartConfig(selectedNode),
        };
        this.fieldData.formData = _formFieldData.steppedAreaChartFields;
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
    node = node.origin;
    if (
      node.type != 'page' &&
      node.type != 'pageHeader' &&
      node.type != 'pageBody' &&
      node.type != 'pageFooter' &&
      node.type != 'header' &&
      node.type != 'body' &&
      node.type != 'footer'
    ) {
      let newNode = JSON.parse(JSON.stringify(node));
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
        if (parent.type == 'mainTab' || parent.type == 'dropdown') {
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
        node.formly[0].key = node.formly[0].key + Guid.newGuid();
      } else if (node.formly[0].fieldGroup[0].key) {
        node.formly[0].fieldGroup[0].key =
          node.formly[0].fieldGroup[0].key + Guid.newGuid();
      }
    } else if (node.key) {
      node.key = node.key + Guid.newGuid();
    }
    return node;
  }

  addFunctionsInHtml(type: any) {
    this.addControl = true;
    this.showNotification = false;
    if (type == 'dashonictabsAddNew')
      this.addChildControlsWithSubChild('mainTab', 'tabs');
    else if (type == 'stepperAddNew')
      this.addChildControlsWithSubChild('mainStep', 'step');
    else if (type == 'kanabnAddNew')
      this.addChildControls('kanban', 'kanbanTask');
    else if (type == 'listWithComponents')
      this.addChildControlsWithSubChild(
        'listWithComponents',
        'listWithComponentsChild'
      );
    else if (
      type == 'address_form' ||
      type == 'employee_form' ||
      type == 'login_Form' ||
      type == 'signUp_Form'
    )
      this.formDataFromApi(type);
    else if (type == 'addSection') {
      this.addSection('sections');
    }
    this.addControl = false;
    this.showNotification = true;
    this.toastr.success('Control Added', { nzDuration: 3000 });
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
  dashonicTemplates(model: any) {
    this.requestSubscription = this.builderService
      .dashonicTemplates(model)
      .subscribe({
        next: (res) => {
          this.selectedNode?.children?.push(res);
          this.updateNodes();
          this.toastr.success('Controll Added', { nzDuration: 3000 });
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
        },
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
      parent.children.splice(idx as number, 1);
    } else {
      console.log(parent, node);
      const idx = this.nodes.indexOf(node);
      this.nodes.splice(idx as number, 1);
    }
    this.updateNodes();
  }
  nzEvent(event: NzFormatEmitEvent): void { }

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
    switch (event.type) {
      case 'body':
        this.selectedNode = this.api(event.form.api, this.selectedNode);
        break;
      case 'sections':
      case 'tabs':
      case 'step':
      case 'div':
      case 'listWithComponentsChild':
      case 'cardWithComponents':
        if (this.selectedNode.id) {
          if (event.type == 'div') {
            this.selectedNode['rowClass'] = event.form.rowClass;
            this.selectedNode.imageSrc = event.form.imageSrc
              ? event.form.imageSrc
              : this.dataSharedService.imageUrl;
            if (event.form.divRepeat > 0) {
              this.addDynamic(event.form.nodes, 'step', 'mainStep');
            }
          }
          if (event.type == 'sections') {
            const filteredNodes = this.filterInputElements(
              this.selectedNode?.children?.[1]?.children
            );
            filteredNodes.forEach((node) => {
              if (event.form.sectionClassName) {
                node.className = event.form.sectionClassName;
              }
              node.formly[0].fieldGroup = this.diasabledAndlabelPosition(
                event.form,
                node.formly[0].fieldGroup
              );
            });
            this.selectedNode?.children?.[1]?.children?.forEach((element: any) => {
              if (!element.formly) {
                element['tooltipIcon'] = event.form.tooltipIcon;
              }
            });
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
            if (this.selectedNode.children) {
              this.selectedNode.children[1]['rowClass'] = event.form.rowClass;
            }
            if (this.selectedNode.wrappers != event.form.wrappers) {
              this.selectedNode.wrappers = event.form.wrappers;
              this.clickBack();
            }
          }
          this.selectedNode['checkData'] =
            this.selectedNode.checkData == undefined
              ? ''
              : this.selectedNode.checkData;
          let check = this.arrayEqual(
            this.selectedNode.checkData,
            event.tableDta == undefined
              ? event.tableDta
              : this.selectedNode.tableBody
          );
          if (!check) {
            if (event.dbData) {
              for (let index = 0; index < event.dbData.length; index++) {
                const item = event.dbData[index];
                let newNode: any = {};
                if (
                  event.type == 'tabs' ||
                  event.type == 'step' ||
                  event.type == 'div' ||
                  event.type == 'listWithComponentsChild' ||
                  event.type == 'cardWithComponents'
                ) {
                  newNode = JSON.parse(
                    JSON.stringify(this.selectedNode?.children)
                  );
                } else {
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
                } else if (
                  event.type != 'tabs' &&
                  event.type != 'step' &&
                  event.type != 'div' &&
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
                break;
              }
              this.updateNodes();
            }
            this.selectedNode.dbData = event.dbData;
            this.selectedNode.tableBody = event.tableDta;
            this.selectedNode.mapApi = event.form.mapApi;
            if (event.tableDta) {
              this.selectedNode.checkData = JSON.parse(
                JSON.stringify(event.tableDta)
              );
            }
          } else {
            alert('change Data if you want mapping');
          }
          this.updateNodes();
        }
        break;

      case 'anchor':
      case 'mentions':
      case 'treeSelect':
      case 'tree':
      case 'treeView':
      case 'cascader':
        if (event.tableDta) {
          this.selectedNode.nodes = event.tableDta;
        }
        if (event.form.api) {
          this.requestSubscription = this.builderService
            .genericApis(event.form.api)
            .subscribe({
              next: (res) => {
                switch (event.type) {
                  case 'anchor':
                  case 'mentions':
                    this.selectedNode.options = res;
                    break;
                  case 'treeSelect':
                  case 'tree':
                  case 'treeView':
                  case 'cascader':
                    this.selectedNode.nodes = res;
                    break;
                  case 'transfer':
                    this.selectedNode.list = res;
                    break;
                  default:
                    break;
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
      case 'mainTab':
        this.addDynamic(event.form.nodes, 'tabs', 'mainTab');
        break;
      case 'mainStep':
        this.addDynamic(event.form.nodes, 'step', 'mainStep');
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
        if (event.tableDta) {
          this.selectedNode.options = event.tableDta.map(
            (option: any) => option.label
          );
        } else {
          this.selectedNode.options = this.selectedNode.options.map(
            (option: any) => option.label
          );
        }
        break;

      case 'statistic':
        if (event.tableDta) {
          this.selectedNode.statisticArray = event.tableDta;
        } else {
          this.selectedNode.statisticArray = this.selectedNode.statisticArray;
        }
        break;
      case 'button':
      case 'linkbutton':
        this.selectedNode.btnIcon = event.form?.icon;
        // this.selectedNode['captureData'] = event.form?.captureData;

        break;
      case 'accordionButton':
        this.selectedNode.nzExpandedIcon = event.form?.icon;
        break;
      case 'segmented':
      case 'tag':
        if (event.tableDta) {
          this.selectedNode.options = event.tableDta;
        } else {
          this.selectedNode.options = this.selectedNode.options;
        }
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
        if (this.selectedNode) {
          needToUpdate = false;

          this.selectedNode.title = event.form.title;
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
            // fieldGroup[0].hideExpression = event.form.hideExpression;
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
                let classArray: any;
                for (let i = 0; i < event.form.className.length; i++) {
                  if (i == 0) {
                    classArray = event.form.className[i];
                  } else {
                    classArray = classArray + ' ' + event.form.className[i];
                  }
                }
                this.selectedNode['className'] = classArray;
                props['className'] = classArray;
              }
            } else {
              props['className'] = event.form.className;
              this.selectedNode['className'] = event.form.className;
            }
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
            if (event.tableDta) {
              props['options'] = event.tableDta;
            }
            props['required'] = event.form.required;
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
            props['readonly'] = event.form.readonly;
            if (event.tableDta) {
              props['options'] = event.tableDta;
            }
            // if (this.selectedNode.type == "multiselect" && event.form.defaultValue) {
            //   const arr = event.form.defaultValue.split(',');
            //   props['defaultValue'] = arr;
            // } else {
            // }
            if (event.form.api) {
              this.requestSubscription = this.builderService
                .jsonTagsDataGet(event.form.api)
                .subscribe({
                  next: (res) => {
                    props.options = res;
                  },
                  error: (err) => {
                    console.error(err); // Log the error to the console
                    this.toastr.error('An error occurred', {
                      nzDuration: 3000,
                    }); // Show an error message to the user
                  },
                });
            }
          });
          this.updateNodes();
        }
        break;
      case 'inputValidationRule':
        if (this.selectedNode) {
          const selectedScreen = this.screens.filter(
            (a: any) => a.name == this.screenName
          );
          const jsonRuleValidation = {
            "screenName": this.screenName,
            "screenBuilderId": this._id,
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
          const validationRuleModel = {
            "ValidationRule": JOIData
          }
          const checkAndProcess = this.validationRuleId == ''
            ? this.applicationService.addNestCommonAPI('cp', validationRuleModel)
            : this.applicationService.updateNestCommonAPI('cp/ValidationRule', this.validationRuleId, validationRuleModel);
          checkAndProcess.subscribe({
            next: (res: any) => {
              if (res.isSuccess) {
                this.getJoiValidation(this._id);
                this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
              }
              else
                this.toastr.error(`Validation Rule: ${res.message}`, { nzDuration: 3000 })
            },
            error: (err) => {
              this.toastr.error(`Validation rule not save, some exception unhandle`, { nzDuration: 3000 });

            }
          });
          // if (selectedScreen.length > 0) {
          //   this.builderService.jsonGetValidationRule(selectedScreen[0].screenId, this.selectedNode.id).subscribe((getRes => {
          //     getRes;
          //     if (getRes.length > 0) {
          //       this.builderService.jsonDeleteValidationRule(this.selectedNode.id).subscribe((delRes => {
          //         this.builderService.jsonSaveValidationRule(JOIData).subscribe((saveRes => {
          //           alert("Data Save");
          //         }))
          //       }))
          //     }
          //     else {
          //       this.builderService.jsonSaveValidationRule(JOIData).subscribe((saveRes => {
          //         alert("Data Save");
          //       }))
          //     }
          //   }));
          // }
        }
        break;
      case 'avatar':
        if (event.form.src) {
          this.selectedNode.src = event.form.src;
        } else if (this.dataSharedService.imageUrl) {
          this.selectedNode.src = this.dataSharedService.imageUrl;
          this.dataSharedService.imageUrl = '';
        }
        break;
      case 'imageUpload':
        if (event.form.source) {
          this.dataSharedService.imageUrl = '';
          this.selectedNode.base64Image = '';
        } else if (this.dataSharedService.imageUrl) {
          this.selectedNode.base64Image = this.dataSharedService.imageUrl;
        }
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
          this.selectedNode.sortDirections = event.form.sortDirections
            ? JSON.parse(event.form.sortDirections)
            : event.form?.sortDirections;
          this.selectedNode.className = event.form?.className;
          this.selectedNode.filterMultiple = event.form?.filterMultiple;
          this.selectedNode.rowClickApi = event.form?.rowClickApi;
          this.selectedNode.tableHeaders = event.tableDta
            ? event.tableDta
            : event.form.options;
          if (this.selectedNode.tableHeaders.length > 0) {
            let newHeaders = this.selectedNode.tableHeaders.map((obj: any) => {
              let newObj = { ...obj };
              let key = newObj.key;
              if (event.form.sortOrder) {
                newObj.sortOrder = event.form.sortOrder;
              }
              if (event.form.sortDirections) {
                newObj.sortDirections = event.form.sortDirections;
              }
              if (event.form.filterMultiple) {
                newObj.filterMultiple = event.form.filterMultiple;
              }
              if (newObj.listOfFilter) {
                newObj.listOfFilter = JSON.parse(newObj.listOfFilter);
              }
              return newObj;
            });
            this.selectedNode.tableHeaders = newHeaders;
          }
          this.selectedNode.columnData = this.updateTableData(
            event.tableDta ? event.tableDta : event.form.options,
            event.tableDta ? event.tableDta : event.form.options
          );
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
          } else {
            if (this.selectedNode['tableNoResultArray'])
              this.selectedNode.tableData =
                this.selectedNode['tableNoResultArray'];
          }
        }
        break;

      case 'dropdownButton':
        this.selectedNode.btnIcon = event.form?.icon;
        if (event.tableDta) {
          this.selectedNode.dropdownOptions = event.tableDta;
        }
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
      // case "heading":
      //   this.selectedNode.fontSize = event.form.style + event.form.textAlignment + 'color:' + event.form.headingColor;
      //   if (event.form.headingApi) {
      //     this.requestSubscription = this.builderService.genericApis(event.form.headingApi).subscribe({
      //       next: (res) => {
      //         this.selectedNode.data = res.data;
      //         this.updateNodes();
      //       },
      //       error: (err) => {
      //         console.error(err); // Log the error to the console
      //         this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      //       }
      //     })
      //   }
      //   break;
      case 'page':
        this.selectedNode.options = event.tableDta
          ? event.tableDta
          : event.form?.options;
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
        event.tableDta != undefined
          ? (this.selectedNode.carousalConfig = event.tableDta)
          : (this.selectedNode.carousalConfig =
            this.selectedNode.carousalConfig);
        if (event.form.link != undefined || event.form.link != '') {
          this.requestSubscription = this.builderService
            .genericApis(event.form.link)
            .subscribe({
              next: (res) => {
                this.selectedNode.carousalConfig = res;
                this.updateNodes();
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
              },
            });
        }
        break;
      case 'timeline':
        this.selectedNode['data'] = event.form.options;
        if (event.tableDta) {
          this.selectedNode.data = event.tableDta;
        }
        if (event.form.api) {
          this.requestSubscription = this.builderService
            .genericApis(event.form.api)
            .subscribe({
              next: (res) => {
                if (res) {
                  this.selectedNode.data = res;
                  this.updateNodes();
                }
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error('An error occurred', { nzDuration: 3000 }); // Show an error message to the user
              },
            });
        }
        break;
      case 'simpleCardWithHeaderBodyFooter':
        if (event.form.imageSrc) {
          this.selectedNode.imageSrc = event.form.imageSrc;
        } else if (this.dataSharedService.imageUrl) {
          this.selectedNode.imageSrc = this.dataSharedService.imageUrl;
        }
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

          if (event.tableDta) {
            this.selectedNode.tableData = event.tableDta;
            this.selectedNode.chartData = event.tableDta.map((data: any) => [
              data.name,
              data.value,
              data.value2,
            ]);
          }
        }
        break;
      case 'pieChart':
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
            data.id,
            Number(data.x),
            Number(data.y),
            Number(data.temprature),
          ]);
        }
        break;
      case 'candlestickChart':
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode['chartData'] = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
            data.label,
            data.value,
          ]);
        }
        break;
      case 'tableChart':
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
            Number(data.id),
            Number(data.col1),
            Number(data.col2),
            Number(data.col3),
          ]);
        }
        break;
      case 'sankeyChart':
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
            data.id,
            data.value,
          ]);
        }
        break;
      case 'areaChart':
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
        if (event.tableDta) {
          this.selectedNode.tableData = event.tableDta;
          this.selectedNode.chartData = event.tableDta.map((data: any) => [
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
      // this.selectedNode = { ...this.selectedNode, ...event.form };
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
          this.selectedNode = { ...this.selectedNode, ...event.form };
        }
      } else {
        this.selectedNode.className = event.form.className;
      }

      // this.updateNodes();
    }
    // this.showSuccess();
    this.updateNodes();
    this.closeConfigurationList();
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
  addDynamic(abc: any, subType: any, mainType: any) {
    try {
      if (this.selectedNode.children) {
        this.addControl = true;
        this.showNotification = false;
        let nodesLength = this.selectedNode.children?.length;
        if (nodesLength < abc) {
          for (let k = 0; k < abc; k++) {
            if (nodesLength < abc) {
              if (mainType != 'mainDiv') {
                this.addControlToJson(subType);
                if (mainType != 'timeline') {
                  this.selectedNode = this.chilAdd;
                  this.addControlToJson('text', this.textJsonObj);
                }
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
                    if (abc < nodesLength) {
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
        this.toastr.success('Control Updated', { nzDuration: 3000 });
      }
    } catch (error) {
      console.error(error);
      this.toastr.error('An error occurred', { nzDuration: 3000 });
    }
  }
  searchControll() {
    this.searchControllData = [];
    var input = (
      document.getElementById('searchControll') as HTMLInputElement
    ).value.toUpperCase();
    if (input && input != ' ') {
      let filterData = this.htmlTabsData[0].children.filter(
        (a: any) => a.id != 'website-block'
      );
      filterData.forEach((a: any) => {
        if (a.children.length > 0) {
          a.children.forEach((b: any) => {
            if (b.children)
              if (b.children.length > 0) {
                b.children.forEach((c: any) => {
                  if (c.label.toUpperCase().includes(input)) {
                    this.searchControllData.push(c);
                  }
                });
              }
          });
        }
      });
    }
  }
  diasabledAndlabelPosition(formValues: any, fieldGroup: any) {
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
          fieldGroup[0].wrappers[0] = [formValues.wrappers][0];
          fieldGroup[0].props['additionalProperties']['wrapper'] = [
            formValues.wrappers,
          ][0];
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
              'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
            fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
              'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4';
          } else if (formValues.wrappers == 'floating_outlined') {
            fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
              'block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
            fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
              'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1';
          } else if (formValues.wrappers == 'floating_standard') {
            fieldGroup[0].props['additionalProperties']['floatFieldClass'] =
              'floting-standerd-input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
            fieldGroup[0].props['additionalProperties']['floatLabelClass'] =
              'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';
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
        } else {
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
      if (typeof value === 'string' && value.startsWith('(')) {
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
    let contents: any;
    event;
    if (this.screenName) {
      if (
        event.target instanceof HTMLInputElement &&
        event.target.files.length > 0
      ) {
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
            }) || '{}'
          );

          var data =
          {
            "screenName": makeData.screenName,
            "screenData": currentData,
            "navigation": makeData.navigation,
          };
          this.navigation = makeData.navigation;
          this.nodes = makeData.screenData;
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
    let contents;
    event;
    if (
      event.target instanceof HTMLInputElement &&
      event.target.files.length > 0
    ) {
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
          }) || '{}'
        );
        if (this.selectedNode.children) {
          this.selectedNode.children.push(makeData);
          this.updateNodes();
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  }
  handleCancel(): void {
    this.showModal = false;
  }
  isTableSave: boolean = false;
  newCases: string[] = [];
  deleteCases: any[] = [];
  deleteDBFields() {
    if (this.deleteCases.length > 0) {
      const deleteObservables = this.deleteCases.map((element) => {
        return this.builderService
          .deleteSQLDatabaseTable('knex-crud/table_schema/', element.id)
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
  saveDBFields(table_id: any) {
    if (this.newCases.length > 0) {
      const observables = this.newCases.map((element) => {
        const objFields = {
          table_id: table_id,
          fieldName: element,
          type: 'VARCHAR',
          description: '',
          status: 'Pending',
          isActive: true,
        };
        return this.builderService
          .saveSQLDatabaseTable('knex-crud/table_schema', objFields)
          .pipe(
            catchError((error) => of(error)) // Handle error and continue the forkJoin
          );
      });
      forkJoin(observables).subscribe({
        next: (results) => {
          if (results.every((result) => !(result instanceof Error))) {
            this.toastr.success('Save Fields Successfully', {
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
      let keyPart = element.split('.');
      let check = mainArray.find((a) => a.name == keyPart[0]);
      if (!check) {
        let obj: any = { name: keyPart[0], children: [] };
        obj.children.push(keyPart[1]);
        mainArray.push(obj);
      } else {
        check.children.push(keyPart[1]);
      }
    }
    this.builderService.getSQLDatabaseTable('knex-crud/tables').subscribe({
      next: (objTRes) => {
        if (objTRes) {
          this.builderService
            .getSQLDatabaseTable('knex-crud/table_schema')
            .subscribe({
              next: (objFRes) => {
                if (objFRes) {
                  for (let i = 0; i < mainArray.length; i++) {
                    const element = mainArray[i];
                    const tableElement = objTRes.filter(
                      (x: any) => x.tableName == element.name
                    );

                    //For Delete Field Case
                    if (tableElement.length > 0) {
                      const tableFields = objFRes.filter(
                        (x: any) => x.table_id == tableElement[0]?.id
                      );
                      for (const item of tableFields) {
                        const fieldName = item.fieldName;
                        if (!mainArray[i].children.includes(fieldName)) {
                          const deleteCase = {
                            id: item.id,
                            table_id: item.table_id,
                            fieldName: fieldName,
                            status: item.status,
                          };
                          this.deleteCases.push(deleteCase);
                        }
                      }
                      //For New Field Case
                      for (const fieldName of mainArray[i].children) {
                        let exists = false;
                        for (const item of tableFields) {
                          if (item.fieldName === fieldName) {
                            exists = true;
                            break;
                          }
                        }
                        if (!exists) {
                          if (fieldName != 'id') this.newCases.push(fieldName);
                        }
                      }
                      this.saveDBFields(tableElement[0]?.id);
                      this.deleteDBFields();
                    } else {
                      const objTableNames = {
                        tableName: element.name,
                        comment: '',
                        totalFields: '',
                        isActive: 'Pending',
                      };
                      this.builderService
                        .saveSQLDatabaseTable('knex-crud/tables', objTableNames)
                        .subscribe({
                          next: (res) => {
                            mainArray[i].children.map((objFieldName: any) => {
                              if (objFieldName != 'id') {
                                const objFields = {
                                  table_id: res.id,
                                  fieldName: objFieldName,
                                  type: 'VARCHAR',
                                  description: '',
                                  status: 'Pending',
                                  isActive: true,
                                };
                                this.builderService
                                  .saveSQLDatabaseTable(
                                    'knex-crud/table_schema',
                                    objFields
                                  )
                                  .subscribe({
                                    next: (res) => {
                                      this.toastr.success(
                                        'Save Table Fields Successfully',
                                        { nzDuration: 3000 }
                                      );
                                    },
                                    error: (err) => {
                                      console.error(err);
                                      this.toastr.error('An error occurred', {
                                        nzDuration: 3000,
                                      });
                                    },
                                  });
                              }
                            });
                          },
                          error: (err) => {
                            console.error(err);
                            this.toastr.error('An error occurred', {
                              nzDuration: 3000,
                            });
                          },
                        });
                    }
                  }
                }
              },
              error: (err) => {
                console.error(err);
                this.toastr.error('An error occurred', { nzDuration: 3000 });
              },
            });
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('An error occurred', { nzDuration: 3000 });
      },
    });
  }
  handleOk(): void {
    if (this.isTableSave)
      this.saveInDB();
    if (this.modalType === 'webCode') {
      this.dashonicTemplates(this.htmlBlockimagePreview.parameter);
    } else if (this.modalType === 'saveAsTemplate') {
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
            this.requestSubscription = this.applicationService.addNestCommonAPI('cp', templateModel).subscribe({
              next: (res: any) => {
                if (res.isSuccess) {
                  this.toastr.success(`Template: ${res.message}`, { nzDuration: 3000 });
                  this.makeDatainTemplateTab();
                  this.saveLoader = false;
                } else
                  this.toastr.error(`Template: ${res.message}`, { nzDuration: 3000 });
              },
              error: (err) => {
                console.error(err);
                this.saveLoader = false;
                this.toastr.error('An error occurred', { nzDuration: 3000 });
              }
            });
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
            this.requestSubscription = this.applicationService.addNestCommonAPI('cp', templateModel).subscribe({
              next: (res: any) => {
                if (res.isSuccess) {
                  this.toastr.success(`Template: ${res.message}`, { nzDuration: 3000 });
                  this.makeDatainTemplateTab();
                  this.saveLoader = false;
                } else
                  this.toastr.error(`Template: ${res.message}`, { nzDuration: 3000 });
              },
              error: (err) => {
                console.error(err);
                this.saveLoader = false;
                this.toastr.error('Template: An error occurred', { nzDuration: 3000 });
              }
            });
          }
          setTimeout(() => {
            this.saveJson();
            this.saveLoader = false;
            this.showModal = false;
          }, 500);
        } else {
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
          this.saveLoader = false;
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
        if (data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByKey(child, key);
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }
    }
  }

  dataReplace(node: any, replaceData: any, value: any): any {
    let typeMap: any = {
      cardWithComponents: 'title',
      buttonGroup: 'title',
      button: 'title',
      breakTag: 'title',
      switch: 'title',
      imageUpload: 'source',
      heading: 'text',
      paragraph: 'text',
      alert: 'text',
      progressBar: 'percent',
      video: 'videoSrc',
      audio: 'audioSrc',
      carouselCrossfade: 'carousalConfig',
      tabs: 'title',
      mainTab: 'title',
      mainStep: 'title',
      listWithComponents: 'title',
      listWithComponentsChild: 'title',
      step: 'title',
      kanban: 'title',
      simplecard: 'title',
      div: 'title',
      textEditor: 'title',
      multiFileUpload: 'uploadBtnLabel',
      accordionButton: 'title',
      divider: 'dividerText',
      toastr: 'toasterTitle',
      rate: 'icon',
      editor_js: 'title',
      rangeSlider: 'title',
      affix: 'title',
      statistic: 'title',
      anchor: 'title',
      modal: 'btnLabel',
      popConfirm: 'btnLabel',
      avatar: 'src',
      badge: 'nzText',
      comment: 'avatar',
      description: 'btnText',
      descriptionChild: 'content',
      segmented: 'title',
      result: 'resultTitle',
      tree: 'title',
      transfer: 'title',
      spin: 'loaderText',
      cascader: 'title',
      drawer: 'btnText',
      skeleton: 'title',
      empty: 'text',
      list: 'title',
      treeView: 'title',
      message: 'content',
      mentions: 'title',
      icon: 'title',
    };

    const type = node.type;
    const key = typeMap[type];
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
    } else {
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
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Template').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.dbWebsiteBlockArray = res.data.filter((x: any) => x.templateType == 'websiteBlock');
          this.htmlTabsData[0].children.forEach((item: any) => {
            if (item?.id == 'template') {
              item.children[0].children = res.data.filter((x: any) => x.templateType == 'builderBlock');
            }
          })
        } else { this.toastr.error(`Template : ${res.message}`, { nzDuration: 3000 }); }
      },
      error: (err) => {
        console.error(err);
        { this.toastr.error(`Template : An error occurred`, { nzDuration: 3000 }); }
      }
    });
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
          value: node.fieldType,
        };
        this.formlyTypes.push(obj);
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
      if (node.parameter == 'input' && node.fieldType == type) {
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

  deleteValidationRule(data: any) {
    this.applicationService.deleteNestCommonAPI('cp/ValidationRule', data.modelData._id).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.validationRuleId = '';
          this.validationFieldData.modelData = {};
          this.getJoiValidation(this._id);
          this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
        }
        else
          this.toastr.success(`Valiadation Rule : ${res.message}`, { nzDuration: 3000 });
      },
      error: () => {
        this.toastr.error('Delete data unhandler', { nzDuration: 3000 });
      }
    })
  }
  checkPage() {
    if (!this.screenPage) {
      alert("Please Select Screen")
    } else {
      this.router.navigate(['/pages/', this.navigation]);
    }
  }
}
