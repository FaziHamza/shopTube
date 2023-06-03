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
  copmanyData: any = [];
  schema: any;
  isSubmit: boolean = true;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  listOfData: any = [];
  languageData: any[] = [];
  listOfChildrenData: any[] = [];
  loading = false;
  pageSize = 10;
  searchIcon = "search";
  searchValue = '';
  form: any = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  requestSubscription: Subscription;
  fields: any = [];
  searchArray: any = [];
  listOfColumns: any = [
    {
      name: 'Company Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.company;
        const name2 = b.company;
        if (name1 === undefined && name2 === undefined) {
          return 0;
        } else if (name1 === undefined) {
          return 1;
        } else if (name2 === undefined) {
          return -1;
        } else {
          return name1.localeCompare(name2);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Application Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.application;
        const name2 = b.application;
        if (name1 === undefined && name2 === undefined) {
          return 0;
        } else if (name1 === undefined) {
          return 1;
        } else if (name2 === undefined) {
          return -1;
        } else {
          return name1.localeCompare(name2);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Field Key',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.fieldKey;
        const name2 = b.fieldKey;
        if (name1 === undefined && name2 === undefined) {
          return 0;
        } else if (name1 === undefined) {
          return 1;
        } else if (name2 === undefined) {
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
        if (name1 === undefined && name2 === undefined) {
          return 0;
        } else if (name1 === undefined) {
          return 1;
        } else if (name2 === undefined) {
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
        if (name1 === undefined && name2 === undefined) {
          return 0;
        } else if (name1 === undefined) {
          return 1;
        } else if (name2 === undefined) {
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
        if (name1 === undefined && name2 === undefined) {
          return 0;
        } else if (name1 === undefined) {
          return 1;
        } else if (name2 === undefined) {
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
        if (name1 === undefined && name2 === undefined) {
          return 0;
        } else if (name1 === undefined) {
          return 1;
        } else if (name2 === undefined) {
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
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,private http: HttpClient) {
    this.dataSharedService.change.subscribe(({ event, field }) => {
      debugger
      if (field.key === 'company' && event) {
        const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
          const field = fieldGroup.fieldGroup[0];
          return field.key === 'application';
        });
        if (moduleFieldIndex !== -1) {
          let optionArray = this.applicationData.filter((item: any) => item.companyName == event);
          const options = optionArray.map((item: any) => ({
            label: item.name,
            value: item.name
          }));
          this.fields[moduleFieldIndex].fieldGroup[0].props.options = options;
        }
      }
    });
  }

  ngOnInit(): void {
    this.companyData();
    this.applications();
    this.getLangauge();
    this.loadSearchArray();
  }
  companyData() {
    this.loading = true
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.copmanyData = res;
      this.loading = false;
    }));
  }
  getLangauge() {
    this.loading = true
    this.builderService.genericApis('language').subscribe((res => {
      this.languageData = res;
      this.listOfData = res;
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
      // this.loading = true;
      if (this.isSubmit) {
        this.saveTranslation('abc','Abc')


        // var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        // this.builderService.genericApisPost('language', currentData).subscribe((res => {
        //   this.builderService.saveTranslation('abc', 'ABC')
        //   .then(() => {
        //     console.log('Translation saved successfully');
        //   })
        //   .catch((error) => {
        //     console.error('Error saving translation:', error);
        //   });
        //   this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });

        //   this.getLangauge();
        //   this.loading = false;
        // }))
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
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
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
          (data.name == 'Russian' ? (item?.russian ? item.russian.toLowerCase().indexOf(inputValue) !== -1 : false) : false))
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

  applications() {
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationData = res;
      this.fieldsLoad();
      this.loading = false;
    }));
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
            key: 'company',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Company',
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
            key: 'application',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Application',
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
            key: 'fieldKey',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Field Key',
              placeholder: 'Key...',
              required: true,
            }
          },
        ],
      },
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
}
