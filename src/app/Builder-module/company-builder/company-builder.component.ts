import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-company-builder',
  templateUrl: './company-builder.component.html',
  styleUrls: ['./company-builder.component.scss']
})
export class CompanyBuilderComponent implements OnInit {
  applicationName: any;
  copmanyData: any = [];
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
      name: 'Name',
      visible:false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],

    },
    {
      name: 'Address',
      visible:false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.address;
        const name2 = b.address;
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
      name: 'Email',
      visible:false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.email;
        const name2 = b.email;
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
      name: 'Contact',
      visible:false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.contact;
        const name2 = b.contact;
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
      name: 'Website',
      visible:false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.website;
        const name2 = b.website;
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
      name: 'Year Founded',
      visible:false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.year_founded;
        const name2 = b.year_founded;
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
      name: 'Mission statement',
      visible:false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.mission_statement;
        const name2 = b.mission_statement;
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
      name: 'Image',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Action',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
  ];
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.jsonCompanyBuilder();
    this.fieldsLoad();
    this.loadSearchArray();
  }
  jsonCompanyBuilder() {
    this.loading = true
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.listOfDisplayData = res.map(obj => {
        obj.expand = false;
        return obj;
      });
      this.listOfData = res;
      this.copmanyData = res;
      this.loading = false;
      this.jsonApplicationBuilder();
      const nonEmptySearchArray = this.listOfColumns.filter((element: any) => element.searchValue);
      nonEmptySearchArray.forEach((element: any) => {
        this.search(element.searchValue, element);
      });
    }));
  }


  openModal(type: any) {

    if (type == 'application') {
      this.loadApplicationFields();
      this.applicationSubmit = true;
    } else {
      this.fieldsLoad();
      this.applicationSubmit = false;
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

  submit() {

    if (!this.applicationSubmit) {
      this.companySubmit();
    } else {
      this.ApplicationSubmit();
    }
  }

  companySubmit() {
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }
    let findName = this.listOfDisplayData.find(a => a.name.toLowerCase() == this.form.value.name.toLowerCase() && a.id != this.model?.id);
    let findEmail = this.listOfDisplayData.find(a => a.a?.email?.toLowerCase() == this.form.value.email.toLowerCase() && a.id != this.model?.id);
    let findContact = this.listOfDisplayData.find(a => a?.contact?.toLowerCase() == this.form.value.contact.toLowerCase() && a.id != this.model?.id);
    if (findName) {
      this.toastr.warning('Name already exists in the database.', { nzDuration: 2000 });
      return;
    }
    if (findEmail) {
      this.toastr.warning('Email already exists in the database.', { nzDuration: 2000 });
      return;
    }
    if (findContact) {
      this.toastr.warning('Contact already exists in the database.', { nzDuration: 2000 });
      return;
    }
    else {
      const addOrUpdateCompany$ = this.isSubmit
        ? this.builderService.addCompanyBuilder(this.form.value)
        : this.builderService.updateCompanyBuilder(this.model.id, this.form.value);

      addOrUpdateCompany$.subscribe((res) => {
        this.jsonCompanyBuilder();
        this.isSubmit = true;
        this.handleCancel();
        this.toastr.success('Your data has been saved.', { nzDuration: 2000 });
      });
    }
  }

  ApplicationSubmit() {
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }

    let findData = this.listOfChildrenData.find(a => a.name.toLowerCase() == this.form.value.name.toLowerCase() && a.id != this.model?.id);
    if (findData) {
      this.toastr.warning('Department name already exists in the database.', { nzDuration: 2000 });
      return;
    } else {
      const action$ = this.isSubmit
        ? this.builderService.addApplicationBuilder(this.form.value)
        : this.builderService.updateApplicationBuilder(this.model.id, this.form.value);
      action$.subscribe((res) => {
        this.jsonCompanyBuilder();
        this.jsonApplicationBuilder();
        this.isSubmit = true;
        this.handleCancel();
        this.toastr.success(this.isSubmit ? 'Your data has been saved.' : 'Data updated successfully!', { nzDuration: 2000 });
      });
    }
  }

  editItem(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }
  deleteRow(id: any, type: any): void {
    const api$ = type == 'application' ? this.builderService.deleteApplicationBuilder(id) : this.builderService.deleteCompanyBuilder(id);
    api$.subscribe((res => {
      this.jsonCompanyBuilder();
      this.jsonApplicationBuilder();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }));
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

  downloadJson() {
    let obj = Object.assign({}, this.copmanyData);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }

  callChild(organization: any) {
    const applicationData = this.listOfChildrenData.filter((item: any) => item.companyName ? item.companyName : item.organizationName == organization.name);
    organization['children'] = applicationData;
  }

  jsonApplicationBuilder() {
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.listOfChildrenData = res;
      this.loading = false;
    }));
  }

  loadApplicationFields() {
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
              label: 'Organization Name',
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
      // {
      //   fieldGroup: [
      //     {
      //       key: 'application_Type',
      //       type: 'select',
      //       wrappers: ["formly-vertical-theme-wrapper"],
      //       defaultValue: '',
      //       props: {
      //         label: 'Department Type',
      //         additionalProperties: {
      //           allowClear: true,
      //           serveSearch: true,
      //           showArrow: true,
      //           showSearch: true,
      //         },
      //         options: [
      //           { label: "Website", value: 'website' },
      //           { label: "Mobile", value: 'mobile' },
      //           { label: "Backend Application", value: 'backend_application' },
      //         ]
      //       }
      //     }
      //   ]
      // },
      // {
      //   fieldGroup: [
      //     {
      //       key: 'layout',
      //       type: 'select',
      //       wrappers: ["formly-vertical-theme-wrapper"],
      //       defaultValue: '',
      //       props: {
      //         label: 'Layout',
      //         additionalProperties: {
      //           allowClear: true,
      //           serveSearch: true,
      //           showArrow: true,
      //           showSearch: true,
      //         },
      //         options: [
      //           { label: "Layout1", value: 'layout1' },
      //           { label: "Layout2", value: 'layout2' },
      //           { label: "Layout3", value: 'layout3' },
      //         ]
      //       }
      //     }
      //   ]
      // },
      // {
      //   fieldGroup: [
      //     {
      //       key: 'domain',
      //       type: 'input',
      //       wrappers: ["formly-vertical-theme-wrapper"],
      //       defaultValue: '',
      //       props: {
      //         label: 'Domain Name',
      //         placeholder: 'Domain Name...',
      //         required: true,
      //       }
      //     },
      //   ],
      // }
    ];
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
              label: 'Name',
              placeholder: 'Name...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'address',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Address',
              placeholder: 'Address...',
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
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'contact',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Contact',
              placeholder: 'Contact...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'website',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Website',
              placeholder: 'Website...',
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'year_founded',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Year Founded',
              placeholder: 'Year Founded...',
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'mission_statement',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Statement',
              placeholder: 'Mission Statement...',
            }
          },
        ]
      },
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
