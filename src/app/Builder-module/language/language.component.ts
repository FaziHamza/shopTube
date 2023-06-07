import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'st-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  private translationsUrl = 'assets/i18n/en.json';
  applicationName: any;
  applicationData: any = [];
  menus: any = [];
  optionsArray: any = [];
  copmanyData: any = [];
  schema: any;
  isSubmit: boolean = true;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  listOfData: any = [];
  languageData: any[] = [];
  reslanguageData: any[] = [];
  listOfChildrenData: any[] = [];
  loading = false;
  pageSize = 10;
  searchIcon = "search";
  searchValue = '';
  form: any = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  screenFieldsModel: any = {};
  requestSubscription: Subscription;
  fields: any = [];
  screenFields: any = [];
  searchArray: any = [];
  screens: any = [];
  builderScreens: any = [];
  modules: any = [];
  listOfColumns: any = [
    // {
    //   name: 'Select Type',
    //   visible: false,
    //   searchValue: '',
    //   sortOrder: null,
    //   sortFn: (a: any, b: any) => {
    //     const name1 = a.select_Type;
    //     const name2 = b.select_Type;
    //     if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
    //       return 0;
    //     } else if (name1 === undefined || name1 === '') {
    //       return 1;
    //     } else if (name2 === undefined || name2 === '') {
    //       return -1;
    //     } else {
    //       return name1.localeCompare(name2);
    //     }
    //   },
    //   sortDirections: ['ascend', 'descend', null],
    // },
    // {
    //   name: 'Organization Name',
    //   visible: false,
    //   searchValue: '',
    //   sortOrder: null,
    //   sortFn: (a: any, b: any) => {
    //     const name1 = a.companyName;
    //     const name2 = b.companyName;
    //     if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
    //       return 0;
    //     } else if (name1 === undefined || name1 === '') {
    //       return 1;
    //     } else if (name2 === undefined || name2 === '') {
    //       return -1;
    //     } else {
    //       return name1.localeCompare(name2);
    //     }
    //   },
    //   sortDirections: ['ascend', 'descend', null],
    // },
    // {
    //   name: 'Application Name',
    //   visible: false,
    //   searchValue: '',
    //   sortOrder: null,
    //   sortFn: (a: any, b: any) => {
    //     const name1 = a.application;
    //     const name2 = b.application;
    //     if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
    //       return 0;
    //     } else if (name1 === undefined || name1 === '') {
    //       return 1;
    //     } else if (name2 === undefined || name2 === '') {
    //       return -1;
    //     } else {
    //       return name1.localeCompare(name2);
    //     }
    //   },
    //   sortDirections: ['ascend', 'descend', null],
    // },
    // {
    //   name: 'screen / menu',
    //   visible: false,
    //   searchValue: '',
    //   sortOrder: null,
    //   sortFn: (a: any, b: any) => {
    //     const name1 = a.screen_menu;
    //     const name2 = b.screen_menu;
    //     if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
    //       return 0;
    //     } else if (name1 === undefined || name1 === '') {
    //       return 1;
    //     } else if (name2 === undefined || name2 === '') {
    //       return -1;
    //     } else {
    //       return name1.localeCompare(name2);
    //     }
    //   },
    //   sortDirections: ['ascend', 'descend', null],
    // },

    {
      name: 'Field Key',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.fieldKey;
        const name2 = b.fieldKey;
        if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
          return 0;
        } else if (name1 === undefined || name1 === '') {
          return 1;
        } else if (name2 === undefined || name2 === '') {
          return -1;
        } else {
          return name1.localeCompare(name2);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'English',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.english;
        const name2 = b.english;
        if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
          return 0;
        } else if (name1 === undefined || name1 === '') {
          return 1;
        } else if (name2 === undefined || name2 === '') {
          return -1;
        } else {
          return name1.localeCompare(name2);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Arabic',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.arabic;
        const name2 = b.arabic;
        if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
          return 0;
        } else if (name1 === undefined || name1 === '') {
          return 1;
        } else if (name2 === undefined || name2 === '') {
          return -1;
        } else {
          return name1.localeCompare(name2);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Chinese',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.chinese;
        const name2 = b.chinese;
        if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
          return 0;
        } else if (name1 === undefined || name1 === '') {
          return 1;
        } else if (name2 === undefined || name2 === '') {
          return -1;
        } else {
          return name1.localeCompare(name2);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Russian',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.russian;
        const name2 = b.russian;
        if ((name1 === undefined || name1 === '') && (name2 === undefined || name2 === '')) {
          return 0;
        } else if (name1 === undefined || name1 === '') {
          return 1;
        } else if (name2 === undefined || name2 === '') {
          return -1;
        } else {
          return name1.localeCompare(name2);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Action',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
  ];
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router, private http: HttpClient) {
    this.dataSharedService.change.subscribe(({ event, field }) => {
      debugger;
      let key = '';
      const { key: fieldKey } = field;

      if (fieldKey === 'organization') {
        key = 'department';
      } else if (fieldKey === 'department') {
        key = 'screen_application';
      }
      else if (fieldKey === 'screen_application') {
        key = 'fieldKey';
      }
      else if (fieldKey === 'organization_ScreenField') {
        key = 'department_ScreenField';
      }
      else if (fieldKey === 'department_ScreenField') {
        key = 'screen_application_ScreenField';
      }


      if (['organization', 'department', 'screen_application', 'organization_ScreenField', 'department_ScreenField', 'screen_application_ScreenField'].includes(fieldKey) && event) {
        let moduleFieldIndex: any;
        if (fieldKey == 'organization' || fieldKey == 'department' || fieldKey == 'screen_application') {
          moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
            const { key: groupKey } = fieldGroup.fieldGroup[0];
            return groupKey === key;
          });
        }
        else if (fieldKey == 'organization_ScreenField' || fieldKey == 'department_ScreenField') {
          moduleFieldIndex = this.screenFields.findIndex((fieldGroup: any) => {
            const { key: groupKey } = fieldGroup.fieldGroup[0];
            return groupKey === key;
          });
        }
        if (moduleFieldIndex !== -1) {
          if (fieldKey == 'organization' || fieldKey == 'department' || fieldKey == 'organization_ScreenField' || fieldKey == 'department_ScreenField') {
            let optionArray = [];

            if (fieldKey === 'organization' || fieldKey == 'organization_ScreenField') {
              optionArray = this.applicationData.filter((item: any) => item.companyName  == event);
            } else if ((fieldKey === 'department' || fieldKey == 'department_ScreenField') && (this.model.select_Type == 'screen' || this.screenFieldsModel.select_Type_ScreenField == 'screen')) {
              optionArray = this.screens.filter((item: any) => item.applicationName == event);
            } else if ((fieldKey === 'department' || fieldKey == 'department_ScreenField') && (this.model.select_Type == 'menu' || this.screenFieldsModel.select_Type_ScreenField == 'menu')) {
              optionArray = this.modules.filter((item: any) => item.applicationName == event);
            }
            const options = optionArray.map((item: any) => ({
              label: item.name,
              value: item.name
            }));
            if (fieldKey == 'organization' || fieldKey == 'department') {
              this.fields[moduleFieldIndex].fieldGroup[0].props.options = options;
            } else if (fieldKey == 'organization_ScreenField' || fieldKey == 'department_ScreenField') {
              this.screenFields[moduleFieldIndex].fieldGroup[0].props.options = options;
            }
          }
          else if (fieldKey === 'screen_application') {
            if (this.model.select_Type == 'screen') {
              let data = this.builderScreens.filter((item: any) => item.moduleName == event);
              this.optionsArray = [];
              this.createOptionsArray(data[0].menuData[0]);
              this.fields[moduleFieldIndex].fieldGroup[0].props.options = this.optionsArray;
            } else if (this.model.select_Type == 'menu') {
              let data = this.menus.filter((item: any) => item.moduleName == event);
              this.optionsArray = [];
              data[0].menuData.forEach((element: any) => {
                this.createOptionsArray(element);
              });
              this.fields[moduleFieldIndex].fieldGroup[0].props.options = this.optionsArray;
            }
          }
          else if (fieldKey == 'screen_application_ScreenField') {
            this.languageData = this.reslanguageData.filter(a => a.screen_application == this.screenFieldsModel.screen_application_ScreenField)
          }
        }
      }
    });

  }

  ngOnInit(): void {
    this.organizationData();
    this.applications();
    this.getLangauge();
    // this.loadSearchArray();
    this.getScreens();
    this.getBuilderScreens();
    this.getModules();
    this.getMenus();
  }
  organizationData() {
    this.loading = true
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.copmanyData = res;
      this.loading = false;
    }));
  }
  getLangauge() {
    this.loading = true
    this.builderService.genericApis('language').subscribe((res => {
      if (res.length > 0) {
        res.forEach((element: any) => {
          element['edit'] = false;
        });
      }
      this.languageData = res;
      this.reslanguageData = res;
      this.listOfData = res;
      this.loading = false;
    }));
  }
  getScreens() {
    this.loading = true
    this.requestSubscription = this.builderService.jsonScreenModuleList().subscribe({
      next: (res) => {
        this.screens = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  getBuilderScreens() {
    this.loading = true
    this.requestSubscription = this.builderService.genericApis('jsonBuilderSetting').subscribe({
      next: (res) => {
        this.builderScreens = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  getModules() {
    this.loading = true
    this.requestSubscription = this.builderService.genericApis('jsonModule').subscribe({
      next: (res) => {
        this.modules = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  getMenus() {
    this.loading = true
    this.requestSubscription = this.builderService.genericApis('jsonModuleSetting').subscribe({
      next: (res) => {
        this.menus = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  applications() {
    this.loading = true;
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationData = res;
      this.screenFieldsLoad();
      this.fieldsLoad();
      this.loading = false;
    }));
  }
  openModal(type: any) {
    this.fieldsLoad();
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

  submit() {
    if (this.form.valid) {
      this.loading = true;
      if (this.isSubmit) {
        // this.saveTranslation('abc', 'Abc')
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.genericApisPost('language', currentData).subscribe((res => {
          // this.builderService.saveTranslation('abc', 'ABC')
          //   .then(() => {
          //     console.log('Translation saved successfully');
          //   })
          //   .catch((error) => {
          //     console.error('Error saving translation:', error);
          //   });
          this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });

          this.getLangauge();
          this.loading = false;
        }))
      }
      else {
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.genericPost(this.model.id, currentData, 'language').subscribe((res => {
          this.getLangauge();
          this.loading = false;
          this.isSubmit = true;
        }))
      }
    }
    this.handleCancel();
  }


  editItem(item: any) {
    item['edit'] = true
    // this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }
  saveEdit(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    item['edit'] = true
    this.isSubmit = false;
    this.submit();
  }
  cancelEdit(item: any) {
    item['edit'] = false
  }
  deleteRow(id: any, type: any): void {
    this.builderService.genericApisDeleteWithId('language', id).subscribe((res => {
      this.getLangauge();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }));
  }

  search(event?: any, data?: any): void {
    debugger
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.languageData = this.listOfData.filter((item: any) =>
      (
        data.name == 'Company Name' ? item.company.toLowerCase().indexOf(inputValue) !== -1 : false ||
          (data.name == 'Application Name' ? (item?.application ? item.application.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Field Key' ? (item?.fieldKey ? item.fieldKey.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'English' ? (item?.english ? item.english.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Arabic' ? (item?.arabic ? item.arabic.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Chinese' ? (item?.chinese ? item.chinese.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Russian' ? (item?.russian ? item.russian.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'select_Type' ? (item?.select_Type ? item.select_Type.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'screen_application' ? (item?.screen_application ? item.screen_application.toLowerCase().indexOf(inputValue) !== -1 : false) : false))
      );
      data.searchIcon = "close";
    }
    else {
      this.languageData = this.listOfData;
      data.searchIcon = "search";
    }
  }


  clearModel(data?: any, searchValue?: any) {
    if (data.searchIcon == "close" && searchValue) {
      data.searchValue = '';
      this.languageData = this.listOfData;
      data.searchIcon = "search";
    }
  }



  fieldsLoad() {
    debugger
    const options = this.copmanyData.map((item: any) => ({
      label: item.name,
      value: item.name
    }));
    const applicationOptions = this.applicationData.map((item: any) => ({
      label: item.name,
      value: item.name
    }));

    this.fields = [
      {
        fieldGroup: [
          {
            key: 'select_Type',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Type',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: [
                {
                  label: 'Screen',
                  value: 'screen'
                },
                {
                  label: 'Menu',
                  value: 'menu'
                },
              ]
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'organization',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Organization',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: options
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'department',
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
              options: applicationOptions
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'screen_application',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Screen/App',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
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
            key: 'fieldKey',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Field Key',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: [],
              required: true,
            }
          }
        ]
      },
      // {
      //   fieldGroup: [
      //     {
      //       key: 'fieldKey',
      //       type: 'input',
      //       wrappers: ["formly-vertical-theme-wrapper"],
      //       defaultValue: '',
      //       props: {
      //         label: 'Field Key',
      //         placeholder: 'Key...',
      //         required: true,
      //       }
      //     },
      //   ],
      // },
      {
        fieldGroup: [
          {
            key: 'english',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'English',
              placeholder: 'English...',
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'arabic',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Arabic',
              placeholder: 'Arabic...',
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'chinese',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Chinese',
              placeholder: 'Chinese...',
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'russian',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Russian',
              placeholder: 'Russian...',
            }
          },
        ],
      },
    ];
  };
  screenFieldsLoad() {
    debugger
    const options = this.copmanyData.map((item: any) => ({
      label: item.name,
      value: item.name
    }));
    const applicationOptions = this.applicationData.map((item: any) => ({
      label: item.name,
      value: item.name
    }));

    this.screenFields = [
      {
        fieldGroup: [
          {
            key: 'select_Type_ScreenField',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Type',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: [
                {
                  label: 'Screen',
                  value: 'screen'
                },
                {
                  label: 'Menu',
                  value: 'menu'
                },
              ]
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'organization_ScreenField',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Organization',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: options
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'department_ScreenField',
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
              options: applicationOptions
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'screen_application_ScreenField',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Screen/App',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: [],
            }
          }
        ]
      },
    ];
  };
  loadSearchArray() {
    const properties = ['company', 'application', 'fieldKey', 'english', 'arabic', 'chinese', 'action'];
    this.searchArray = properties.map(property => {
      return {
        name: property,
        searchIcon: "search",
        searchValue: ''
      };
    });
  }
  createOptionsArray(node: any) {
    if (node.title) {
      this.optionsArray.push({ label: node.title, value: node.title });
    }
    if (node.children) {
      node.children.forEach((child: any) => {
        this.createOptionsArray(child);
      });
    }
  }
  getTranslations(): Promise<any> {
    return this.http.get<any>(this.translationsUrl).toPromise();
  }

  saveTranslation(key: string, translation: string): Promise<void> {
    debugger
    return this.getTranslations()
      .then((translations) => {
        translations[key] = translation;
        return this.http.put<void>(this.translationsUrl, translations).toPromise();
      })
      .catch((error) => {
        console.error('Error saving translation:', error);
      });
  }
  clear(){
    this.languageData = this.reslanguageData
  }
}
