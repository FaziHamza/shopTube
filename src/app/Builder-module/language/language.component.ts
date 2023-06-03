import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  applicationName: any;
  applicationData: any;
  copmanyData: any = [];
  languageData: any = []
  schema: any;
  isSubmit: boolean = true;
  // form: FormGroup;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  listOfData: any = [];
  listOfDisplayData: any[] = [];
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
  applicationSubmit: boolean = false;
  listOfColumns: any = [
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Company Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      sortDirections: ['ascend', 'descend', null],

    },
    {
      name: 'Application Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.applicationName;
        const name2 = b.applicationName;
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
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) {
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
    this.fieldsLoad();
    this.getLangauge();
    // this.loadSearchArray();
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
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.genericApisPost('language', currentData).subscribe((res => {
          this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });
          this.getLangauge();
          this.loading = false;
        }))
      }
      else {
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.genericPost(this.model.id, currentData , 'language').subscribe((res => {
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
    // const api$ = type == 'application' ? this.builderService.deleteApplicationBuilder(id) : this.builderService.deleteCompanyBuilder(id);
    // api$.subscribe((res => {
    //   this.jsonCompanyBuilder();
    //   this.jsonApplicationBuilder();
    //   this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    // }));
  }

  search(event?: any, data?: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
      (
        data.name == 'Name' ? item.name.toLowerCase().indexOf(inputValue) !== -1 : false ||
          (data.name == 'Address' ? (item?.address ? item.address.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Email' ? (item?.email ? item.email.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Contact' ? (item?.contact ? item.contact.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Website' ? (item?.website ? item.website.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Year Founded' ? (item?.year_founded ? item.year_founded.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Mission statement' ? (item?.mission_statement ? item.mission_statement.toLowerCase().indexOf(inputValue) !== -1 : false) : false))
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

  applications() {
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationData = res;
      this.loading = false;
    }));
  }

  fieldsLoad() {
    const options = this.copmanyData.map((item: any) => ({
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
              options: options
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
              type: 'number',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'English',
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
            key: 'Arabic',
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
            key: 'Chinese',
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
            key: 'Russian',
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
    const properties = ['expand', 'name', 'address', 'email', 'contact', 'website', 'year_founded', 'mission_statement', 'action'];
    this.searchArray = properties.map(property => {
      return {
        name: property,
        searchIcon: "search",
        searchValue: ''
      };
    });
  }

}
