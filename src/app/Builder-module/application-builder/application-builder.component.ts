import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, catchError, of } from 'rxjs';
import { Guid } from 'src/app/models/guid';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplicationThemeComponent } from '../application-theme/application-theme.component';
import { ApplicationGlobalClassesComponent } from '../application-global-classes/application-global-classes.component';

@Component({
  selector: 'st-application-builder',
  templateUrl: './application-builder.component.html',
  styleUrls: ['./application-builder.component.scss']
})
export class ApplicationBuilderComponent implements OnInit {
  serverPath = environment.nestImageUrl
  organizations: any[] = [];
  companyBuilder: any;
  departmentData: any = [];
  isSubmit: boolean = true;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  listOfData: any = [];
  listOfDisplayData: any[] = [];
  loading = false;
  pageSize = 10;
  searchIcon = "search";
  searchValue = '';
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  requestSubscription: Subscription;
  fields: any = [];
  listOfChildrenData: any[] = [];
  applicationSubmit: boolean = false;
  checkRes: boolean = false;
  footerSaved: boolean = false;
  searchArray: any = [];
  currentUser: any;
  designStudio: any;
  startIndex = 1;
  endIndex: any = 10;
  pageIndex: any = 1;
  listOfColumns = [
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Department Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Organization Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const dataA = a.companyname ? a.companyname : a.organizationname;
        const dataB = b.companyname ? b.companyname : b.organizationname;
        if (dataA === undefined && dataB === undefined) {
          return 0;
        } else if (dataA === undefined) {
          return 1;
        } else if (dataB === undefined) {
          return -1;
        } else {
          return dataA.localeCompare(dataB);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    // {
    //   name: 'Department Type',
    //   visible: false,
    //   searchValue: '',
    //   sortOrder: null,
    //   sortFn: (a: any, b: any) => {
    //     const name1 = a.applicationtype;
    //     const name2 = b.applicationtype;
    //     if (name1 === undefined && name2 === undefined) {
    //       return 0;
    //     } else if (name1 === undefined) {
    //       return 1;
    //     } else if (name2 === undefined) {
    //       return -1;
    //     } else {
    //       return name1.localeCompare(name2);
    //     }
    //   },
    //   sortDirections: ['ascend', 'descend', null],
    // },
    {
      name: 'Action',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
  ];
  constructor(public builderService: BuilderService,
    private modalService: NzModalService,
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) {
    this.dataSharedService.change.subscribe(({ event, field }) => {
      if (field.key === 'applicationtype' && event) {
        const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
          const field = fieldGroup.fieldGroup[0];
          return field.key === 'defaultApplication';
        });
        if (moduleFieldIndex !== -1) {
          // let optionArray = [
          //   { label: event == 'website' ? 'Layout 1' : 'Admin Panel 1', value: event == 'website' ? 'layout1' : 'Admin Panel 1' },
          //   { label: event == 'website' ? 'Layout 2' : 'Admin Panel 2', value: event == 'website' ? 'layout2' : 'Admin Panel 2' },
          //   { label: event == 'website' ? 'Layout 3' : 'Admin Panel 3', value: event == 'website' ? 'layout3' : 'Admin Panel 3' },
          //   { label: event == 'website' ? 'Layout 4' : 'Admin Panel 4', value: event == 'website' ? 'layout4' : 'Admin Panel 4' },
          //   { label: event == 'website' ? 'Layout 5' : 'Admin Panel 5', value: event == 'website' ? 'layout5' : 'Admin Panel 5' },
          // ];
          let optionArray = this.designStudio
            .filter((app: any) => app.applicationtype == event)
            .map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          this.fields[moduleFieldIndex].fieldGroup[0].props.options = event != 'mobile' ? optionArray : [];
        }
      }
    });
    this.dataSharedService.change.subscribe(({ event, field }) => {

      if (event && field && field.key == 'image') {
        if (this.myForm) {
          this.model['image'] = event;
          this.myForm.value['image'] = event
        }
      }
    });
  }


  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.callDesignStudio();
    this.getOrganizationData();
    this.getDepartment();
    this.getApplication();
    // this.loadSearchArray();
  }

  getDepartment() {
    this.loading = true
    this.requestSubscription = this.applicationService.getNestNewCommonAPI(`cp/Department`).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.listOfDisplayData = res.data.map((obj: any) => {
            obj.expand = false;
            return obj;
          });
          this.listOfDisplayData = res.data;
          this.listOfData = res.data;
          this.departmentData = res.data;
          this.handlePageChange(1);
          const nonEmptySearchArray = this.listOfColumns.filter((element: any) => element.searchValue);
          nonEmptySearchArray.forEach((element: any) => {
            this.search(element.searchValue, element);
          });
        } else
          this.toastr.error(res.message, { nzDuration: 3000 });

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
        this.loading = false;
      }
    });
  }
  // defaultApplicationBuilder(isSubmit?: any, key?: any, value?: any, model?: any) {
  //   if (isSubmit && key == "applicationid") {
  //     const screen = {
  //       "ScreenBuilder": {
  //         name: value.name + "_default",
  //         navigation: value.name + "_default",
  //         departmentid: value.departmentid,
  //         applicationid: value.id
  //       }
  //     };
  //     const header = {
  //       "ScreenBuilder": {
  //         name: value.name + "_header",
  //         navigation: value.name + "_header",
  //         departmentid: value.departmentid,
  //         applicationid: value.id,
  //         organizationid: model?.organizationid
  //       }
  //     };

  //     const footer = {
  //       "ScreenBuilder": {
  //         name: value.name + "_footer",
  //         navigation: value.name + "_footer",
  //         departmentid: value.departmentid,
  //         applicationid: value.id,
  //         organizationid: model?.organizationid
  //       }
  //     };
  //     const requests = [
  //       this.applicationService.addNestNewCommonAPI("cp", screen),
  //       this.applicationService.addNestNewCommonAPI("cp", header),
  //       this.applicationService.addNestNewCommonAPI("cp", footer)
  //     ];
  //     this.loading = true;
  //     forkJoin(requests).subscribe((responses: any) => {

  //       if (responses[0].isSuccess && responses[1].isSuccess && responses[2].isSuccess) {
  //         this.getBuilderScreen(responses[0], responses[1], responses[2], value)
  //       } else {
  //         this.toastr.error("Some error occurred", { nzDuration: 2000 });
  //       }
  //       this.loading = false;
  //     },
  //       (error) => {
  //         this.toastr.error("Some exception occurred", { nzDuration: 2000 });
  //         this.loading = false;
  //       });
  //   }
  // }

  // getBuilderScreen(screen: any, header: any, footer: any, value: any) {
  //   const requests = [
  //     this.applicationService.getNestNewCommonAPIById('cp/Builder', "64a81f1164d44e484c177a78"),
  //     this.applicationService.getNestNewCommonAPIById('cp/Builder', "64a939a6a2c44ea9c78ac137"),
  //     this.applicationService.getNestNewCommonAPIById('cp/Builder', "64a939b8a2c44ea9c78ac13c"),
  //     // this.applicationService.getNestNewCommonAPIById('cp/Menu', "64a3c6cfa5d51b158d31cc00"),
  //   ];
  //   this.loading = true;
  //   forkJoin(requests).subscribe((responses: any) => {
  //     if (responses[0].isSuccess && responses[1].isSuccess && responses[2].isSuccess) {
  //       const objects = [screen, header, footer];
  //       for (let i = 0; i < 3; i++) {
  //         responses[i].data[0].navigation = objects[i].data.navigation;
  //         responses[i].data[0].screenName = objects[i].data.name;
  //         responses[i].data[0].screenBuilderId = objects[i].data.id;
  //       }
  //       this.saveBuilderScreen(responses[0], responses[1], responses[2], responses[3], value);
  //     } else {
  //       this.toastr.error("Some error occurred", { nzDuration: 2000 });
  //     }
  //   },
  //     (error) => {
  //       this.toastr.error("Some exception occurred", { nzDuration: 2000 });
  //       this.loading = false;
  //     });
  // }

  // getScreensForClone(value?: any, model?: any) {
  //   this.requestSubscription = this.applicationService.getNestNewCommonAPIById('cp/ScreenBuilder', this.myForm.value.defaultApplication).subscribe({
  //     next: (res: any) => {
  //       if (res.isSuccess) {
  //         if (res.data.length > 0) {
  //           const requests = res.data.map((element: any) => {
  //             if (element.name.includes('_header')) {
  //               element.name = value.name + '_header'
  //               element.navigation = value.name + '_header'
  //             } else if (element.name.includes('_footer')) {
  //               element.name = value.name + '_footer'
  //               element.navigation = value.name + '_footer'
  //             } else if (element.name.includes('_default')) {
  //               element.name = value.name + '_default'
  //               element.navigation = value.name + '_default'
  //             }
  //             const screen = {
  //               "ScreenBuilder": {
  //                 applicationid: value.id,
  //                 departmentid: value.departmentid,
  //                 name: element.name,
  //                 navigation: element.navigation,
  //                 organizationid: model?.organizationid
  //               }
  //             };


  //             return this.applicationService.addNestNewCommonAPI('cp', screen).pipe(
  //               catchError(error => of(error)) // Handle error and continue the forkJoin
  //             );
  //           });

  //           forkJoin(requests).subscribe({
  //             next: (allResults: any) => {
  //               if (allResults.every((result: any) => result.isSuccess === true)) {
  //                 // this.loading = false;
  //                 this.getBuilderScreensForClone(value, model);
  //                 this.toastr.success("Save Successfully", { nzDuration: 3000 });
  //               } else {
  //                 this.toastr.error("Error Occurred", { nzDuration: 3000 });
  //               }
  //             },
  //             error: (err) => {
  //               console.error(err);
  //               this.toastr.error("Actions: An error occurred", { nzDuration: 3000 });
  //             }
  //           });
  //         }

  //       }
  //       else
  //         this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
  //     },
  //     error: (err) => {
  //       console.error(err); // Log the error to the console
  //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
  //     }
  //   });
  // }
  // getBuilderScreensForClone(value?: any, model?: any) {
  //   this.requestSubscription = this.applicationService.getNestNewCommonAPIById('cp/ScreenBuilder', this.myForm.value.defaultApplication).subscribe({
  //     next: (res: any) => {
  //       if (res.isSuccess) {
  //         if (res.data.length > 0) {
  //           const requests = res.data.map((element: any) => {
  //             if (element.screenName.includes('_header')) {
  //               element.screenName = value.name + '_header'
  //               element.navigation = value.name + '_header'
  //             } else if (element.name.includes('_footer')) {
  //               element.screenName = value.name + '_footer'
  //               element.navigation = value.name + '_footer'
  //             } else if (element.name.includes('_default')) {
  //               element.screenName = value.name + '_default'
  //               element.navigation = value.name + '_default'
  //             }
  //             const screen = {
  //               "Builder": {
  //                 "screenData": JSON.parse(element.screenData),
  //                 "screenName": element.screenName,
  //                 "navigation": element.navigation,
  //                 // "screenBuilderId": this.id,
  //                 "applicationid": value.id,
  //               }
  //             };


  //             return this.applicationService.addNestNewCommonAPI('cp', screen).pipe(
  //               catchError(error => of(error)) // Handle error and continue the forkJoin
  //             );
  //           });

  //           forkJoin(requests).subscribe({
  //             next: (allResults: any) => {
  //               if (allResults.every((result: any) => result.isSuccess === true)) {
  //                 this.loading = false;
  //                 this.toastr.success("Save Successfully", { nzDuration: 3000 });
  //               } else {
  //                 this.toastr.error("Error Occurred", { nzDuration: 3000 });
  //               }
  //             },
  //             error: (err) => {
  //               console.error(err);
  //               this.toastr.error("Actions: An error occurred", { nzDuration: 3000 });
  //             }
  //           });
  //         }

  //       }
  //       else
  //         this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
  //     },
  //     error: (err) => {
  //       console.error(err); // Log the error to the console
  //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
  //     }
  //   });
  // }

  // saveBuilderScreen(screen: any, header: any, footer: any, menu: any, value: any) {
  //   const screenModel: any = {
  //     "Builder": screen.data[0]
  //   }
  //   const headerModel = {
  //     "Builder": header.data[0]
  //   }
  //   const footerModel = {
  //     "Builder": footer.data[0]
  //   }
  //   delete screenModel.Builder.__v;
  //   delete screenModel.Builder.id;
  //   delete headerModel.Builder.__v;
  //   delete headerModel.Builder.id;
  //   delete footerModel.Builder.__v;
  //   delete footerModel.Builder.id;
  //   screenModel.Builder['applicationid'] = value.id;
  //   headerModel.Builder['applicationid'] = value.id;
  //   footerModel.Builder['applicationid'] = value.id;
  //   const menuModel = {
  //     "Menu": menu.data[0]
  //   }
  //   delete menuModel.Menu.__v;
  //   delete menuModel.Menu.id;
  //   menuModel.Menu.applicationid = value.id
  //   menuModel.Menu.name = value.id
  //   const requests = [
  //     this.applicationService.addNestNewCommonAPI('cp', screenModel),
  //     this.applicationService.addNestNewCommonAPI('cp', headerModel),
  //     this.applicationService.addNestNewCommonAPI('cp', footerModel),
  //     this.applicationService.addNestNewCommonAPI('cp', menuModel),
  //   ];
  //   forkJoin(requests).subscribe((responses: any) => {
  //     if (responses[0].isSuccess && responses[1].isSuccess && responses[2].isSuccess) {
  //       this.toastr.success("Default things Added", { nzDuration: 2000 });
  //     } else {
  //       this.toastr.error("Some error occurred", { nzDuration: 2000 });
  //     }
  //   },
  //     (error) => {
  //       this.toastr.error("Some exception occurred", { nzDuration: 2000 });
  //       this.loading = false;
  //     });
  // }
  openModal(type: any, eidt?: boolean) {
    if (this.isSubmit) {
      for (let prop in this.model) {
        if (this.model.hasOwnProperty(prop)) {
          this.model[prop] = null;
        }
      }
      this.model = {};
      this.myForm = new FormGroup({});
      this.fields = [];
    }
    this.applicationSubmit = type == 'application' ? true : false;
    if (eidt == false || eidt == undefined) {
      if (type == 'application') {
        this.loadApplicationFields();
      } else {
        this.loadDepartmentFields();
      }
    }
    this.isVisible = true;
    // if (!this.isSubmit) {
    //   this.isSubmit = true;
    // }
  }
  applicationTheme() {
    const modal =
      this.modalService.create<ApplicationThemeComponent>({
        nzTitle: 'Application Theme',
        nzWidth: '60%',
        nzContent: ApplicationThemeComponent,
        // nzViewContainerRef: this.viewContainerRef,
        nzComponentParams: {
          applicationList: this.listOfChildrenData,
        },
        // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
        nzFooter: [],
      });
    const instance = modal.getContentComponent();
    modal.afterClose.subscribe((res) => {
      if (res) {
        // this.controls(value, data, obj, res);
      }
    });
  }
  applicationClasses() {
    const modal =
      this.modalService.create<ApplicationGlobalClassesComponent>({
        nzTitle: 'Application Custom Classes',
        nzWidth: '60%',
        nzContent: ApplicationGlobalClassesComponent,
        // nzViewContainerRef: this.viewContainerRef,
        nzComponentParams: {
        },
        // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
        nzFooter: [],
      });
    const instance = modal.getContentComponent();
    modal.afterClose.subscribe((res) => {
      if (res) {
        // this.controls(value, data, obj, res);
      }
    });
  }
  handleCancel(): void {
    this.isVisible = false;
    this.isSubmit = true;
  }
  getOrganizationData() {
    this.applicationService.getNestNewCommonAPI(`cp/Organization`).subscribe(((res: any) => {
      if (res.isSuccess) {
        this.companyBuilder = res.data.map((item: any) => ({
          label: item.name,
          value: item.id
        }));
        this.loadDepartmentFields();
      } else
        this.toastr.warning(res.message, { nzDuration: 2000 });
    }));
  }

  onSubmit() {
    if (!this.myForm.valid) {
      this.handleCancel();
      return;
    }
    const findData = this.applicationSubmit
      ? this.listOfChildrenData.find(a => a.name.toLowerCase() == this.myForm.value.name.toLowerCase() && a.id !== this.model?.id)
      : this.listOfDisplayData.find(a => a.name.toLowerCase() == this.myForm.value.name.toLowerCase() && a.id !== this.model?.id);

    if (findData) {
      const message = this.applicationSubmit ? 'Application name already exists in the database.' : 'Department name already exists in the database.';
      this.toastr.warning(message, { nzDuration: 2000 });
      return;
    }
    else {
      const key = this.applicationSubmit ? 'applicationid' : 'departmentid';
      // this.myForm.value[key] = this.myForm.value.name.replace(/\s+/g, '-');
      if (!this.applicationSubmit) {
        const data = this.companyBuilder.find((x: any) => x.value == this.myForm.value.organizationid);
        this.myForm.value.organizationname = data.label;
      } else {
        const departmentData = this.listOfData.find((x: any) => x.id == this.myForm.value.departmentid)
        this.myForm.value.departmentname = departmentData.name;
      }
      let objDataModel: any;
      if (this.applicationSubmit) {
        const objDepartmentName = this.departmentData.find((x: any) => x.id == this.myForm.value.departmentid);
        this.myForm.value.departmentname = objDepartmentName.name;
        this.myForm.value['organizationid'] =objDepartmentName.organizationid;
        const tableValue = `Application`;
        objDataModel = {
          [tableValue]: this.myForm.value
        }
      }
      else {
        const tableValue = `Department`;
        objDataModel = {
          [tableValue]: this.myForm.value
        }
      }
      if (this.applicationSubmit && key == "applicationid" && this.isSubmit) {

        // this.handleCancel();
        this.loading = true;
        const defaultCheck = '/' + this.myForm.value.defaultApplication ?? "''";
        this.applicationService.addNestNewCommonAPI('cp', objDataModel).subscribe({
        // this.applicationService.addNestNewCommonAPI(`applications/clone${defaultCheck}`, this.myForm.value).subscribe({
          next: (res: any) => {
            if (res.isSuccess) {
              this.getDepartment();
              this.getApplication();
              this.toastr.success(res.message, { nzDuration: 2000 });
              this.isSubmit = true;
              this.loading = false;
            } else {
              this.toastr.error(`clone: ${res.message}`, { nzDuration: 3000 });
            }
          },
          error: (err) => {
            this.toastr.error(`clone saved, some unhandled exception`, { nzDuration: 3000 });
          }
        });
      }

      const action$ = !this.applicationSubmit
        ? this.isSubmit
          ? this.applicationService.addNestNewCommonAPI('cp', objDataModel)
          : this.applicationService.updateNestNewCommonAPI(`cp/Department`, this.model.id, objDataModel)
        : !this.isSubmit
          ? this.applicationService.updateNestNewCommonAPI(`cp/Application`, this.model.id, objDataModel)
          : '';

      if (action$) {
        action$.subscribe((res: any) => {
          if (res.isSuccess) {
            this.getDepartment();
            this.getApplication();
            this.handleCancel();
            this.toastr.success(res.message, { nzDuration: 2000 });
            this.isSubmit = true;
          } else {
            this.toastr.error(res.message, { nzDuration: 2000 });
          }
        });
      }
    }
  }
  editItem(item: any, type: any) {
    if (type == 'application') {
      this.loadApplicationFields();
      let data = this.fields.filter((fieldsData: any) => {
        return fieldsData.fieldGroup[0].key != 'email' && fieldsData.fieldGroup[0].key != 'password';
      });
      this.fields = data;
    } else {
      this.loadDepartmentFields();
    }
    this.isSubmit = false;
    this.openModal(type, true)
    this.model = JSON.parse(JSON.stringify(item));
  }


  deleteRow(id: any, type: any): void {
    const api$ = type == 'application' ? this.applicationService.deleteNestNewCommonAPI(`cp/Application`, id) : this.applicationService.deleteNestNewCommonAPI(`cp/Department`, id);
    api$.subscribe(((res: any) => {
      if (res.isSuccess) {
        this.getDepartment();
        this.getApplication();
        this.handlePageChange(1);
        this.toastr.success(res.message, { nzDuration: 2000 });
      } else
        this.toastr.error(res.message, { nzDuration: 2000 });
    }))
  };

  search(event?: any, data?: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
      (
        data.name == 'Department Name' ? item.name.toLowerCase().indexOf(inputValue) !== -1 : false ||
          (data.name == 'Organization Name' ? ((item?.companyname ? item?.companyname : item.organizationname) ? item.companyname.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Department Type' ? (item?.applicationtype ? item.applicationtype.toLowerCase().indexOf(inputValue) !== -1 : false) : false))
      );
      data.searchIcon = "close";
    }
    else {
      this.listOfDisplayData = this.listOfData;
      data.searchIcon = "search";
    }
  }

  clearModel(data?: any, searchValue?: any) {
    if (data.searchIcon == "close" && searchValue) {
      data.searchValue = '';
      this.listOfDisplayData = this.listOfData;
      data.searchIcon = "search";
    }
  }

  downloadJson() {
    let obj = Object.assign({}, this.departmentData);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  callChild(department: any) {
    const moduleData = this.listOfChildrenData.filter((item: any) => (item.applicationname == department.name) || (item.departmentname == department.name));
    department['children'] = moduleData;
  }
  getApplication() {
    this.requestSubscription = this.applicationService.getNestNewCommonAPI(`cp/Application`).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.listOfChildrenData = res.data;
        }
        else
          this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
        this.loading = false;
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        this.loading = false;
      }

    });
  }

  loadDepartmentFields() {
    this.fields = [
      {
        fieldGroup: [
          {
            key: 'organizationid',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Organization Name',
              additionalProperties: {
                allowClear: true,
                serveSearch: false,
                showArrow: true,
                showSearch: true,
              },
              options: this.companyBuilder,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Department Name',
              placeholder: 'Department Name...',
              required: true,
            }
          },
        ],
      },
    ];
  }

  loadApplicationFields() {
    const options = this.listOfData.map((item: any) => ({
      label: item.name,
      value: item.id
    }));
    // let departments = this.listOfData.filter((org: any) => org.organizationid === "64abfde576ac2e992aa14d75");
    // let data: any = [];
    // departments.forEach((element: any) => {
    //   let applications = this.listOfChildrenData.filter((d: any) => d.departmentid === element.id);
    //   if (applications.length > 0) {
    //     applications.forEach((app: any) => {
    //       data.push(app);
    //     });
    //   }
    // });
    // const cloneApplicationOptions = data.map((item: any) => ({
    //   label: item.name,
    //   value: item.id
    // }));
    this.fields = [
      {
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Application Name',
              placeholder: 'Application Name...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'departmentid',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Department',
              additionalProperties: {
                allowClear: true,
                serveSearch: false,
                showArrow: true,
                showSearch: true,
              },
              options: options,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'owner',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Owner Name',
              placeholder: 'Owner Name...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'description',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Description',
              placeholder: 'Description...',
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'email',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Email',
              placeholder: 'Email...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'password',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              type: 'password',
              label: 'Password',
              placeholder: 'password...',
              required: true,
              additionalProperties: {
                suffixicon: 'eye-invisible',
              }
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            fieldGroup: [
              {
                key: 'image',
                type: 'image-upload',
                className: "w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2",
                wrappers: ["formly-vertical-theme-wrapper"],
                props: {
                  label: 'Image Upload',
                }
              },
            ]
          }
        ],
      },
      {
        fieldGroup: [
          {
            key: 'applicationtype',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Application Type',
              required: true,
              additionalProperties: {
                allowClear: true,
                serveSearch: false,
                showArrow: true,
                showSearch: true,
              },
              options: [
                { label: "Website", value: 'website' },
                { label: "Mobile", value: 'mobile' },
                { label: "Backend Application", value: 'backend_application' },
              ]
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'defaultApplication',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Default Application',
              // required: true,
              additionalProperties: {
                allowClear: true,
                serveSearch: false,
                showArrow: true,
                showSearch: true,
              },
              options: [],
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'domains',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Domain Name',
              placeholder: 'Domain Name...',
              required: true,
            }
          },
        ],
      }
      // {
      //   fieldGroup: [
      //     {
      //       key: 'primaryColor',
      //       type: 'input',
      //       wrappers: ["formly-vertical-theme-wrapper"],
      //       defaultValue: '',
      //       props: {
      //         type: 'color',
      //         label: 'Primary Color',
      //         additionalProperties: {
      //           tooltip: "This class used for app-primary-color",
      //         }
      //       }
      //     },
      //   ],
      // },
      // {
      //   fieldGroup: [
      //     {
      //       key: 'secondaryColor',
      //       type: 'input',
      //       wrappers: ["formly-vertical-theme-wrapper"],
      //       defaultValue: '',
      //       props: {
      //         type: 'color',
      //         label: 'Secondary Color',
      //         additionalProperties: {
      //           tooltip: "This class used for app-secondary-color",
      //         }
      //       }
      //     },
      //   ],
      // }
    ];

  }
  loadSearchArray() {
    const properties = ['expand', 'name', 'companyname', 'applicationtype', 'action'];
    this.searchArray = properties.map(property => {
      return {
        name: property,
        searchIcon: "search",
        searchValue: ''
      };
    });
  }
  callDesignStudio() {
    this.applicationService.getNestNewCommonAPI(`cp/applications/cloneApplicationData/app`).subscribe(((res: any) => {
      if (res.isSuccess) {
        this.designStudio = res.data;
      } else
        this.toastr.warning(res.message, { nzDuration: 2000 });
    }));
  }
  handlePageChange(event: number): void {
    this.pageSize = !this.pageSize || this.pageSize < 1 ? 1 : this.pageSize
    this.pageIndex = event;
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.startIndex = start == 0 ? 1 : ((this.pageIndex * this.pageSize) - this.pageSize) + 1;
    this.listOfDisplayData = this.listOfData.slice(start, end);
    this.endIndex = this.listOfDisplayData.length != this.pageSize ? this.listOfData.length : this.pageIndex * this.pageSize;
  }
}
