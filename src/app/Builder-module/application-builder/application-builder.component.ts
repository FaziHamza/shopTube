import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Guid } from 'src/app/models/guid';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-application-builder',
  templateUrl: './application-builder.component.html',
  styleUrls: ['./application-builder.component.scss']
})
export class ApplicationBuilderComponent implements OnInit {
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
        const dataA = a.companyName ? a.companyName : a.organizationName;
        const dataB = b.companyName ? b.companyName : b.organizationName;
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
    //     const name1 = a.application_Type;
    //     const name2 = b.application_Type;
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
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) {
    this.dataSharedService.change.subscribe(({ event, field }) => {
      if (field.key === 'application_Type' && event) {
        const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
          const field = fieldGroup.fieldGroup[0];
          return field.key === 'layout';
        });
        if (moduleFieldIndex !== -1) {
          let optionArray = [
            { label: event == 'website' ? 'Layout 1' : 'Admin Panel 1', value: event == 'website' ? 'layout1' : 'Admin Panel 1' },
            { label: event == 'website' ? 'Layout 2' : 'Admin Panel 2', value: event == 'website' ? 'layout2' : 'Admin Panel 2' },
            { label: event == 'website' ? 'Layout 3' : 'Admin Panel 3', value: event == 'website' ? 'layout3' : 'Admin Panel 3' },
            { label: event == 'website' ? 'Layout 4' : 'Admin Panel 4', value: event == 'website' ? 'layout4' : 'Admin Panel 4' },
            { label: event == 'website' ? 'Layout 5' : 'Admin Panel 5', value: event == 'website' ? 'layout5' : 'Admin Panel 5' },
          ];
          this.fields[moduleFieldIndex].fieldGroup[0].props.options = event != 'mobile' ? optionArray : [];
        }
      }
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.getOrganizationData();
    this.getDepartment();
    // this.loadSearchArray();
  }

  getDepartment() {
    this.loading = true
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Department').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.listOfDisplayData = res.data.map((obj: any) => {
            obj.expand = false;
            return obj;
          });
          this.listOfDisplayData = res.data;
          this.listOfData = res.data;
          this.departmentData = res.data;
          this.getApplication();
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
  defaultApplicationBuilder(isSubmit?: any, key?: any, value?: any) {
    if (isSubmit && key == "applicationId") {
      const obj = {
        "ScreenBuilder": {
          name: value.name + "_default",
          navigation: value.name + "_default",
          departmentId: value._id,
          applicationId: value.departmentId
        }
      }
      this.loading = true;
      this.applicationService.addNestCommonAPI("cp", obj).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            setTimeout(() => {
              const screen = {
                "ScreenBuilder": {
                  name: value.name + "_header",
                  navigation: value.name + "_header",
                  departmentId: value._id,
                  applicationId: value.departmentId
                }
              }
              this.applicationService.addNestCommonAPI("cp", screen).subscribe((getRes: any) => {
                if (getRes.isSuccess) {
                  let screen = {
                    "ScreenBuilder": {
                      name: value.name + "_footer",
                      navigation: value.name + "_footer",
                      departmentId: value._id,
                      applicationId: value.departmentId
                    }
                  }
                  this.applicationService.addNestCommonAPI("cp", screen).subscribe((res3: any) => {
                    if (res3.isSuccess) {
                      this.loading = false;
                      // this.jsonApplicationBuilder();
                      this.toastr.success("Default things Added", { nzDuration: 2000 });
                      // setTimeout(() => {
                      //   this.jsonApplicationBuilder();
                      // }, 2000)
                    } else {
                      this.loading = false;
                      this.toastr.error(res.message, { nzDuration: 2000 });
                    }
                  })
                } else {
                  this.loading = false;
                  this.toastr.error(res.message, { nzDuration: 2000 });
                }
              })
            }, 1000);
          } else {
            this.loading = false;
            this.toastr.error(res.message, { nzDuration: 2000 });
          }
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error("Some exception are unhandler", { nzDuration: 2000 });
        }
      })

    }
  }

  // defaultMenu() {
  //   this.loading = true;
  //   setTimeout(() => {
  //     let menu = {
  //       "applicationName": this.myForm.value.name,
  //       "menuData": [
  //         {
  //           "id": "menu_" + Guid.newGuid(),
  //           "key": "menu_" + Guid.newGuid(),
  //           "title": "Menu",
  //           "link": "",
  //           "icon": "appstore",
  //           "type": "input",
  //           "isTitle": false,
  //           "children": []
  //         }
  //       ],
  //       "applicationId": this.myForm.value.name,
  //       "selectedTheme": {
  //         "topHeaderMenu": "w-1/6",
  //         "topHeader": "w-10/12",
  //         "menuMode": "inline",
  //         "menuColumn": "w-2/12",
  //         "rowClass": "w-10/12",
  //         "horizontalRow": "flex flex-wrap",
  //         "layout": "vertical",
  //         "colorScheme": "light",
  //         "layoutWidth": "fluid",
  //         "layoutPosition": "fixed",
  //         "topBarColor": "light",
  //         "sideBarSize": "default",
  //         "siderBarView": "sidebarViewDefault",
  //         "sieBarColor": "light",
  //         "siderBarImages": "",
  //         "checked": false,
  //         "theme": false,
  //         "isCollapsed": false,
  //         "newMenuArray": [],
  //         "menuChildArrayTwoColumn": [],
  //         "isTwoColumnCollapsed": false,
  //         "allMenuItems": [],
  //         "showMenu": true
  //       },
  //       "id": 59
  //     }
  //     this.requestSubscription = this.builderService.jsonSaveModule(menu).subscribe({
  //       next: (res) => {
  //         // let screen = {
  //         //   name: this.myForm.value.name,
  //         //   screenId: this.myForm.value.name,
  //         //   departmentName: '',
  //         //   applicationName: this.myForm.value.name,
  //         // }
  //         // setTimeout(() => {
  //         //   this.requestSubscription = this.builderService.addScreenModule(screen).subscribe({
  //         //     next: (res) => {
  //         //       this.loading = false;
  //         //     },
  //         //     error: (err) => {
  //         //       console.error(err); // Log the error to the console
  //         //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
  //         //       this.loading = false;
  //         //     }
  //         //   })
  //         // }, 500)

  //       },
  //       error: (err) => {
  //         console.error(err); // Log the error to the console
  //         this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
  //         this.loading = false;
  //       }
  //     })
  //   }, 500)
  // }
  openModal(type: any, selectedAllow?: boolean, departmentId?: any) {
    if (this.isSubmit) {
      for (let prop in this.model) {
        if (this.model.hasOwnProperty(prop)) {
          this.model[prop] = null;
        }
      }
    }
    this.model = {};
    this.myForm = new FormGroup({});
    if (type == 'application') {
      this.loadApplicationFields();
      if (selectedAllow) {
        this.fields.forEach((element: any) => {
          if (element.fieldGroup[0].key === 'departmentId') {
            this.model.departmentId = departmentId;
            // element.fieldGroup[0].props.disabled = true;
          }
        });
      }
      this.applicationSubmit = true;
    } else {
      this.loadDepartmentFields();
      this.applicationSubmit = false;
    }
    this.isVisible = true;
    if (!this.isSubmit) {
      this.isSubmit = true;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  getOrganizationData() {
    this.applicationService.getNestCommonAPI('cp/Organization').subscribe(((res: any) => {
      if (res.isSuccess) {
        this.companyBuilder = res.data.map((item: any) => ({
          label: item.name,
          value: item._id
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
      const key = this.applicationSubmit ? 'applicationId' : 'departmentId';
      // this.myForm.value[key] = this.myForm.value.name.replace(/\s+/g, '-');
      if (!this.applicationSubmit) {
        const data = this.companyBuilder.find((x: any) => x.value == this.myForm.value.organizationId);
        this.myForm.value.organizationName = data.label;
      } else {
        const departmentData = this.listOfData.find((x: any) => x._id == this.myForm.value.departmentId)
        this.myForm.value.departmentName = departmentData.name;
      }
      let objDataModel: any;
      if (this.applicationSubmit) {
        const objDepartmentName = this.departmentData.find((x: any) => x._id == this.myForm.value.departmentId);
        this.myForm.value.departmentName = objDepartmentName.name;
        objDataModel = {
          "Application": this.myForm.value
        }
      } else {
        objDataModel = {
          "Department": this.myForm.value
        }
      }

      const action$ = !this.applicationSubmit ? (this.isSubmit
        ? this.applicationService.addNestCommonAPI('cp', objDataModel)
        : this.applicationService.updateNestCommonAPI('cp/Department', this.model._id, objDataModel)) : this.isSubmit
        ? this.applicationService.addNestCommonAPI('cp', objDataModel)
        : this.applicationService.updateNestCommonAPI('cp/Application', this.model._id, objDataModel);
      action$.subscribe((res: any) => {
        if (res.isSuccess) {
          if (this.applicationSubmit && key == "applicationId") {
            setTimeout(() => {
              this.defaultApplicationBuilder(this.isSubmit, key, res.data);
            }, 1000);
          }
          // else
          this.getDepartment();
          this.getApplication();
          this.handleCancel();
          this.toastr.success(res.message, { nzDuration: 2000 });
          this.isSubmit = true;
        } else 
          this.toastr.error(res.message, { nzDuration: 2000 });

        // if (this.applicationSubmit && key == 'moduleId' && this.myForm.value) {
        //   this.defaultMenu();
        // };
        // if (this.applicationSubmit) {
        //   setTimeout(() => {
        //     this.saveHeaderFooter('header');
        //   }, 2000);
        //   this.footerSaved = false;
        // }

      });
    }
  }
  editItem(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }


  deleteRow(id: any, type: any): void {
    const api$ = type == 'application' ? this.applicationService.deleteNestCommonAPI('cp/Application', id) : this.applicationService.deleteNestCommonAPI('cp/Department', id);
    api$.subscribe(((res: any) => {
      if (res.isSuccess) {
        this.getDepartment();
        this.getApplication();
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
          (data.name == 'Organization Name' ? ((item?.companyName ? item?.companyName : item.organizationName) ? item.companyName.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Department Type' ? (item?.application_Type ? item.application_Type.toLowerCase().indexOf(inputValue) !== -1 : false) : false))
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
   
    const moduleData = this.listOfChildrenData.filter((item: any) => (item.applicationName == department.name) || (item.departmentName == department.name));
    department['children'] = moduleData;
  }
  getApplication() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Application').subscribe({
      next: (res: any) => {
        if (res.isSuccess)
          this.listOfChildrenData = res.data;
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

  // saveHeaderFooter(type: any) {

  //   if (this.isSubmit) {
  //     let screen = {
  //       name: this.myForm.value.name + '-' + type,
  //       screenId: this.myForm.value.name + '-' + type,
  //       applicationName: '',
  //       moduleName: this.myForm.value.name,
  //     }
  //     this.builderService.addScreenModule(screen).subscribe(() => {
  //       if (!this.footerSaved) { // Check if 'footer' hasn't been saved yet
  //         this.footerSaved = true; // Set the flag to indicate 'footer' has been saved
  //         setTimeout(() => {
  //           this.saveHeaderFooter('footer');
  //         }, 2000);
  //       }
  //     })
  //   }
  // }

  loadDepartmentFields() {
    this.fields = [
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
      {
        fieldGroup: [
          {
            key: 'organizationId',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Organization Name',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: this.companyBuilder,
            }
          }
        ]
      },

    ];
  }

  loadApplicationFields() {
    const options = this.listOfData.map((item: any) => ({
      label: item.name,
      value: item._id
    }));
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
            key: 'departmentId',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Department',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
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
            key: 'email',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Email',
              placeholder: 'Email...',
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
            fieldGroup: [
              {
                key: 'image',
                type: 'input',
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
            key: 'application_Type',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Application Type',
              required: true,
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
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
            key: 'layout',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Layout',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: [
                { label: "Layout1", value: 'layout1' },
                { label: "Layout2", value: 'layout2' },
                { label: "Layout3", value: 'layout3' },
              ]
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'domain',
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
    ];
  }
  loadSearchArray() {
    const properties = ['expand', 'name', 'companyName', 'application_Type', 'action'];
    this.searchArray = properties.map(property => {
      return {
        name: property,
        searchIcon: "search",
        searchValue: ''
      };
    });
  }
}
