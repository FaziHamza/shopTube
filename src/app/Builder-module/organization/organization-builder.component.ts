import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-organization-builder',
  templateUrl: './organization-builder.component.html',
  styleUrls: ['./organization-builder.component.scss']
})
export class organizationBuilderComponent implements OnInit {
  organizationData: any = [];
  isSubmit: boolean = true;
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
  departmentSubmit: boolean = false;
  listOfColumns: any = [
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],

    },
    {
      name: 'Address',
      visible: false,
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
      visible: false,
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
      visible: false,
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
      visible: false,
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
      visible: false,
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
      visible: false,
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
  constructor(public builderService: BuilderService, private applicationService: ApplicationService,
    public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.organizationBuilder();
    this.LoadOrganizationFields();
    this.loadSearchArray();
  }
  organizationBuilder() {
    this.loading = true
    this.applicationService.getNestCommonAPI('organization').subscribe((res => {
      this.listOfDisplayData = res.map(obj => {
        obj.expand = false;
        return obj;
      });
      this.listOfData = res;
      this.organizationData = res;
      this.loading = false;
      this.getDepartment();
      const nonEmptySearchArray = this.listOfColumns.filter((element: any) => element.searchValue);
      nonEmptySearchArray.forEach((element: any) => {
        this.search(element.searchValue, element);
      });
    }));
  }


  openModal(type: any, selectedAllow?: boolean, organizationName?: any) {
   
    if (this.isSubmit) {
      for (let prop in this.model) {
        if (this.model.hasOwnProperty(prop)) {
          this.model[prop] = null;
        }
      }
      this.form = new FormGroup({});
    }
    if (type == 'department') {
      this.loadDepartmentFields();
      if (selectedAllow) {
        this.fields.forEach((element: any) => {
          if (element.fieldGroup[0].key === 'organizationId') {
            this.model.organizationId = organizationName;
            // element.fieldGroup[0].props.['disabled'] = true;
          }
        });
      }
      
      this.departmentSubmit = true;
    } else {
      this.LoadOrganizationFields();
      this.departmentSubmit = false;
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
    if (!this.departmentSubmit) {
      this.organizationSubmit();
    } else {
      this.departmentSave();
    }
  }

  organizationSubmit() {
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }
    // let findName = this.listOfDisplayData.find(a => a.name.toLowerCase() == this.form.value.name.toLowerCase() && a._id != this.model?._id);
    // let findEmail = this.listOfDisplayData.find(a => a.a?.email?.toLowerCase() == this.form.value.email.toLowerCase() && a._id != this.model?._id);
    // let findContact = this.listOfDisplayData.find(a => a?.contact?.toLowerCase() == this.form.value.contact.toLowerCase() && a._id != this.model?._id);
    // if (findName) {
    //   this.toastr.warning('Name already exists in the database.', { nzDuration: 2000 });
    //   return;
    // }
    // if (findEmail) {
    //   this.toastr.warning('Email already exists in the database.', { nzDuration: 2000 });
    //   return;
    // }
    // if (findContact) {
    //   this.toastr.warning('Contact already exists in the database.', { nzDuration: 2000 });
    //   return;
    // }
    else {
      const addOrUpdateOrganization$ = this.isSubmit
        ? this.applicationService.addNestCommonAPI('organization', this.form.value)
        : this.applicationService.updateNestCommonAPI('organization', this.model._id, this.form.value);

      addOrUpdateOrganization$.subscribe((res) => {
        this.organizationBuilder();
        this.isSubmit = true;
        this.resetForm();
        this.handleCancel();
        this.toastr.success('Your data has been saved.', { nzDuration: 2000 });
      });
    }
  }

  departmentSave() {
   
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }

    let findData = this.listOfChildrenData.find(a => a.name.toLowerCase() == this.form.value.name.toLowerCase() && a._id != this.model?._id);
    if (findData) {
      this.toastr.warning('Department name already exists in the database.', { nzDuration: 2000 });
      return;
    } else {
      const objOrganization = this.listOfData.find((x: any) => x._id == this.form.value.organizationId)
      this.form.value.organizationName = objOrganization.name;
      const action$ = this.isSubmit
        ? this.applicationService.addNestCommonAPI('department', this.form.value)
        : this.applicationService.updateNestCommonAPI('department', this.model._id, this.form.value);
      action$.subscribe((res) => {
        this.organizationBuilder();
        // this.getDepartment();
        this.resetForm();
        this.isSubmit = true;
        this.handleCancel();
        this.toastr.success(this.isSubmit ? 'Your data has been saved.' : 'Data updated successfully!', { nzDuration: 2000 });
      });
    }
  }
  resetForm() {
   
    for (let prop in this.model) {
      if (this.model.hasOwnProperty(prop)) {
        this.model[prop] = null;
      }
    }
    this.form = new FormGroup({});
  }
  editItem(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }
  deleteRow(id: any, type: any): void {
    const api$ = type == 'department' ? this.applicationService.deleteNestCommonAPI('department', id) : this.applicationService.deleteNestCommonAPI('organization', id);
    api$.subscribe((res => {
      this.organizationBuilder();
      this.getDepartment();
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
  callChild(organization: any) {
    const departmentData = this.listOfChildrenData.filter((item: any) => (item.companyName == organization.name) || (item.organizationName == organization.name));
    organization['children'] = departmentData;
  }

  getDepartment() {
    this.applicationService.getNestCommonAPI('department').subscribe((res => {
      this.listOfChildrenData = res;
      this.loading = false;
    }));
  }

  loadDepartmentFields() {
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
              options: options,
            }
          }
        ]
      },
    ];
  }
  LoadOrganizationFields() {
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
