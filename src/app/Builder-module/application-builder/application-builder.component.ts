import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Guid } from 'src/app/models/guid';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-application-builder',
  templateUrl: './application-builder.component.html',
  styleUrls: ['./application-builder.component.scss']
})
export class ApplicationBuilderComponent implements OnInit {
  companyName: any;
  companyBuilder: any;
  applicationData: any = [];
  schema: any;
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
  moduleSubmit: boolean = false;
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
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) {
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
    this.loadData();
    this.jsonApplicationBuilder();
    // this.loadSearchArray();
  }

  jsonApplicationBuilder() {
    this.loading = true
    this.requestSubscription = this.builderService.jsonApplicationBuilder().subscribe({
      next: (res) => {
        this.listOfDisplayData = res.map(obj => {
          obj.expand = false;
          return obj;
        });
        this.listOfDisplayData = res;
        this.listOfData = res;
        this.applicationData = res;
        this.jsonModuleSetting();
        const nonEmptySearchArray = this.listOfColumns.filter((element: any) => element.searchValue);
        nonEmptySearchArray.forEach((element: any) => {
          this.search(element.searchValue, element);
        });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
        this.loading = false;
      }

    });
  }
  defaultApplicationBuilder(isSubmit?: any, key?: any, value?: any) {

    if (isSubmit && key == "moduleId") {
      let obj = {
        name: value.name + "_default",
        screenId: value.name + "_default",
        applicationName: value.name,
        moduleName: value.name + "_default",
      }
      this.builderService.addScreenModule(obj).subscribe(res => {
        this.loading = true;
        setTimeout(() => {
          let screen = {
            name: value.name + "_header",
            screenId: value.name + "_header",
            applicationName: value.name,
            moduleName: value.name + "_header",
          }
          this.builderService.addScreenModule(screen).subscribe(() => {
            let screen = {
              name: value.name + "_footer",
              screenId: value.name + "_footer",
              applicationName: value.name,
              moduleName: value.name + "_footer",
            }
            this.builderService.addScreenModule(screen).subscribe(() => {
              this.loading = false;
              // this.jsonApplicationBuilder();
              this.toastr.success("Default things Added", { nzDuration: 2000 });
              // setTimeout(() => {
              //   this.jsonApplicationBuilder();
              // }, 2000)
            })
          })
        }, 1000);
      })
    }
  }

  defaultMenu() {
    this.loading = true;
    setTimeout(() => {
      let menu = {
        "moduleName": this.myForm.value.name,
        "menuData": [
          {
            "id": "menu_" + Guid.newGuid(),
            "key": "menu_" + Guid.newGuid(),
            "title": "Menu",
            "link": "",
            "icon": "appstore",
            "type": "input",
            "isTitle": false,
            "children": []
          }
        ],
        "moduleId": this.myForm.value.name,
        "selectedTheme": {
          "topHeaderMenu": "w-1/6",
          "topHeader": "w-10/12",
          "menuMode": "inline",
          "menuColumn": "w-2/12",
          "rowClass": "w-10/12",
          "horizontalRow": "flex flex-wrap",
          "layout": "vertical",
          "colorScheme": "light",
          "layoutWidth": "fluid",
          "layoutPosition": "fixed",
          "topBarColor": "light",
          "sideBarSize": "default",
          "siderBarView": "sidebarViewDefault",
          "sieBarColor": "light",
          "siderBarImages": "",
          "checked": false,
          "theme": false,
          "isCollapsed": false,
          "newMenuArray": [],
          "menuChildArrayTwoColumn": [],
          "isTwoColumnCollapsed": false,
          "allMenuItems": [],
          "showMenu": true
        },
        "id": 59
      }
      this.requestSubscription = this.builderService.jsonSaveModule(menu).subscribe({
        next: (res) => {
          let screen = {
            name: this.myForm.value.name,
            screenId: this.myForm.value.name,
            applicationName: '',
            moduleName: this.myForm.value.name,
          }
          setTimeout(() => {
            this.requestSubscription = this.builderService.addScreenModule(screen).subscribe({
              next: (res) => {
                this.loading = false;
              },
              error: (err) => {
                console.error(err); // Log the error to the console
                this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
                this.loading = false;
              }
            })
          }, 500)

        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
          this.loading = false;
        }
      })
    }, 500)
  }
  openModal(type: any) {
    if (type == 'module') {
      this.loadModuleFields();
      this.moduleSubmit = true;
    } else {
      this.fieldsLoad();
      this.moduleSubmit = false;
    }
    if (this.isSubmit) {
      for (let prop in this.model) {
        if (this.model.hasOwnProperty(prop)) {
          this.model[prop] = null;
        }
      }
    }

    this.isVisible = true;
    if (!this.isSubmit) {
      this.isSubmit = true;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  loadData() {
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.companyBuilder = res.map(item => ({
        label: item.name,
        value: item.name
      }));
      this.fieldsLoad();
    }));
  }
  onSubmit() {

    if (!this.myForm.valid) {
      this.handleCancel();
      return;
    }
    const findData = this.moduleSubmit
      ? this.listOfChildrenData.find(a => a.name.toLowerCase() == this.myForm.value.name.toLowerCase() && a.id !== this.model?.id)
      : this.listOfDisplayData.find(a => a.name.toLowerCase() == this.myForm.value.name.toLowerCase() && a.id !== this.model?.id);

    if (findData) {
      const message = this.moduleSubmit ? 'Application name already exists in the database.' : 'Department name already exists in the database.';
      this.toastr.warning(message, { nzDuration: 2000 });
      return;
    }
    else {
      const key = this.moduleSubmit ? 'moduleId' : 'applicationId';
      this.myForm.value[key] = this.myForm.value.name.replace(/\s+/g, '-');
      const action$ = !this.moduleSubmit ? (this.isSubmit
        ? this.builderService.addApplicationBuilder(this.myForm.value)
        : this.builderService.updateApplicationBuilder(this.model.id, this.myForm.value)) : this.isSubmit
        ? this.builderService.addModule(this.myForm.value)
        : this.builderService.updateModule(this.model.id, this.myForm.value);
      action$.subscribe((res) => {

        // if (this.moduleSubmit && key == 'moduleId' && this.myForm.value) {
        //   this.defaultMenu();
        // };
        // if (this.moduleSubmit) {
        //   setTimeout(() => {
        //     this.saveHeaderFooter('header');
        //   }, 2000);
        //   this.footerSaved = false;
        // }
        if (this.moduleSubmit && key == "moduleId") {
          setTimeout(() => {
            this.defaultApplicationBuilder(this.isSubmit, key, this.myForm.value);
          }, 1000);
        }
        // else
        this.jsonApplicationBuilder();
        this.jsonModuleSetting();
        this.handleCancel();
        this.toastr.success(this.isSubmit ? 'Your data has been saved.' : 'Data updated successfully!', { nzDuration: 2000 });
        this.isSubmit = true;
      });
    }
  }
  editItem(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }


  deleteRow(id: any, type: any): void {
    const api$ = type == 'module' ? this.builderService.deletejsonModule(id) : this.builderService.deleteApplicationBuilder(id);
    api$.subscribe((res => {
      this.jsonApplicationBuilder();
      this.jsonModuleSetting();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };

  search(event?: any, data?: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
      (
        data.name == 'Department Name' ? item.name.toLowerCase().indexOf(inputValue) !== -1 : false ||
          (data.name == 'Company Name' ? ((item?.companyName ? item?.companyName : item.organizationName) ? item.companyName.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
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
    let obj = Object.assign({}, this.applicationData);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  callChild(company: any) {

    const moduleData = this.listOfChildrenData.filter((item: any) => item.applicationName == company.name);
    company['children'] = moduleData;
  }
  jsonModuleSetting() {
    this.requestSubscription = this.builderService.jsonModuleSetting().subscribe({
      next: (res) => {
        this.listOfChildrenData = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        this.loading = false;
      }

    });
  }

  saveHeaderFooter(type: any) {

    if (this.isSubmit) {
      let screen = {
        name: this.myForm.value.name + '-' + type,
        screenId: this.myForm.value.name + '-' + type,
        applicationName: '',
        moduleName: this.myForm.value.name,
      }
      this.builderService.addScreenModule(screen).subscribe(() => {
        if (!this.footerSaved) { // Check if 'footer' hasn't been saved yet
          this.footerSaved = true; // Set the flag to indicate 'footer' has been saved
          setTimeout(() => {
            this.saveHeaderFooter('footer');
          }, 2000);
        }
      })
    }
  }

  fieldsLoad() {
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
            key: 'organizationName',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Company Name',
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

  loadModuleFields() {
    const options = this.listOfData.map((item: any) => ({
      label: item.name,
      value: item.name
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
            key: 'applicationName',
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
              // required: true,
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
