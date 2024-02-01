import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from '@ant-design/icons-angular';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'st-organization-builder',
  templateUrl: './organization-builder.component.html',
  styleUrls: ['./organization-builder.component.scss'],
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
  drawerLoader: boolean = false;
  pageSize = 10;
  searchIcon = 'search';
  searchValue = '';
  form: any = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  requestSubscription: Subscription;
  fields: any = [];
  searchArray: any = [];
  departmentSubmit: boolean = false;
  startIndex = 1;
  endIndex: any = 10;
  pageIndex: any = 1;
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
        } else if (name1 === null && name2 === null) {
          return 0;
        } else if (name1 === null) {
          return 1;
        } else if (name2 === null) {
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
        } else if (name1 === null && name2 === null) {
          return 0;
        } else if (name1 === null) {
          return 1;
        } else if (name2 === null) {
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
        } else if (name1 === null && name2 === null) {
          return 0;
        } else if (name1 === null) {
          return 1;
        } else if (name2 === null) {
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
  organizationId: any;
  constructor(
    public builderService: BuilderService,
    public dataSharedService: DataSharedService,
    private toastr: NzMessageService,
    private router: Router,
    public socketService: SocketService,

  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true },
    ];
    this.organizationId = this.dataSharedService.decryptedValue('organizationId');

    this.organizationBuilder();
    this.LoadOrganizationFields();
    this.loadSearchArray();
  }
  organizationBuilder() {
    this.loading = true;
    const { jsonData, newGuid } = this.socketService.makeJsonData('Organization', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            this.listOfDisplayData = res.data.map((obj: any) => {
              obj.expand = false;
              return obj;
            });
            this.listOfData = res.data;
            this.organizationData = res.data;
            this.getDepartment();
            this.handlePageChange(1);
            const nonEmptySearchArray = this.listOfColumns.filter(
              (element: any) => element.searchValue
            );
            nonEmptySearchArray.forEach((element: any) => {
              this.search(element.searchValue, element);
            });
            this.toastr.success(`Org. : ${res.message}`, { nzDuration: 2000 });
          } else {
            this.toastr.error(`Org. : ${res.message}`, { nzDuration: 2000 });
          }
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }

  openModal(type: any, selectedAllow?: boolean, organizationName?: any) {
    // if (this.isSubmit) {

    // }
    this.model = {};
    this.fields = [];
    this.form = new FormGroup({});
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
    // if (!this.isSubmit) {
    //   this.isSubmit = true;
    // }
  }
  handleCancel(): void {
    this.isSubmit = true;
    this.isVisible = false;
    this.model = {};
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
    else {
      // this.form.value['userId'] = JSON.parse(localStorage.getItem('user')!).userId;
      var ResponseGuid: any;
      if (this.isSubmit) {
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [`Organization`]: this.form.value, metaInfo: metainfocreate }
        this.socketService.Request(Add);
      }
      else {
        const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(this.model.id);
        ResponseGuid = newUGuid;
        const Update = { [`Organization`]: this.form.value, metaInfo: metainfoupdate };
        this.socketService.Request(Update)
      }
      this.drawerLoader = true;
      this.socketService.OnResponseMessage().subscribe((res: any) => {
        try {
          if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
            this.drawerLoader = false;
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              this.loading = false;
              this.organizationBuilder();
              this.isSubmit = true;
              this.resetForm();
              this.handleCancel();
              this.toastr.success(`Org. : ${res.message}`, { nzDuration: 2000 });
            } else {
              this.toastr.error(`Org. : ${res.message}`, { nzDuration: 2000 });
              this.loading = false;
            }
          }
        } catch (error) {
          this.drawerLoader = false;
          // Handle any errors that occur during execution
          console.error("An error occurred:", error);
          // You can add additional error handling here, such as showing an error message to the user.
        }
      });
    }
  }

  departmentSave() {
    debugger
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }

    let findData = this.listOfChildrenData.find(
      (a) =>
        a.name.toLowerCase() == this.form.value.name.toLowerCase() &&
        a.id != this.model?.id
    );
    if (findData) {
      this.toastr.warning('Department name already exists in the database.', {
        nzDuration: 2000,
      });
      return;
    } else {
      var ResponseGuid: any;
      const objOrganization = this.listOfData.find(
        (x: any) => x.id == this.form.value.organizationid
      );
      this.form.value.organizationName = objOrganization.name;
      if (this.isSubmit) {
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [`Department`]: this.form.value, metaInfo: metainfocreate }
        this.socketService.Request(Add);
      }
      else {
        const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(this.model.id);
        ResponseGuid = newUGuid;
        const Update = { [`Department`]: this.form.value, metaInfo: metainfoupdate };
        this.socketService.Request(Update)
      }
      this.drawerLoader = true;
      this.socketService.OnResponseMessage().subscribe((res: any) => {
        try {
          if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
            this.drawerLoader = false;
            res = res.parseddata.apidata;
            this.drawerLoader = false;
            if (res.isSuccess) {
              this.organizationBuilder();
              // this.getDepartment();
              this.resetForm();
              this.isSubmit = true;
              this.handleCancel();
              this.toastr.success(res.message, { nzDuration: 2000 });
            } else {
              this.toastr.error(res.message, { nzDuration: 2000 });
            }
          }
        } catch (error) {
          // Handle any errors that occur during execution
          this.drawerLoader = false;
          console.error("An error occurred:", error);
          // You can add additional error handling here, such as showing an error message to the user.
        }
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
  editItem(item: any, type: any) {
    this.isSubmit = false;
    this.openModal(type);
    this.model = JSON.parse(JSON.stringify(item));
  }
  deleteRow(id: any, type: any): void {
    try {
      this.loading = true;
      var ResponseGuid: any;
      if (type == 'department') {
        const { jsonData, newGuid } = this.socketService.deleteModelType('Department', id);
        ResponseGuid = newGuid;
        this.socketService.Request(jsonData);
      }
      else {
        const { jsonData, newGuid } = this.socketService.deleteModelType('Organization', id);
        ResponseGuid = newGuid;
        this.socketService.Request(jsonData)
      }
      this.socketService.OnResponseMessage()
        .subscribe((res: any) => {
          if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              this.loading = false
              this.handlePageChange(1);
              this.organizationBuilder();
              // this.getDepartment();
              this.toastr.success(res.message, { nzDuration: 2000 });
            } else {
              this.loading = false
              this.toastr.error(res.message, { nzDuration: 2000 });
            }
          }
        });
    } catch (error) {
      // Handle any errors that occur during execution
      console.error("An error occurred:", error);
      // You can add additional error handling here, such as showing an error message to the user.
    }
  }


  search(event?: any, data?: any): void {
    const inputValue = event?.target
      ? event.target.value?.toLowerCase()
      : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
        data.name == 'Name'
          ? item.name.toLowerCase().indexOf(inputValue) !== -1
          : false ||
          (data.name == 'Address'
            ? item?.address
              ? item.address.toLowerCase().indexOf(inputValue) !== -1
              : false
            : false) ||
          (data.name == 'Email'
            ? item?.email
              ? item.email.toLowerCase().indexOf(inputValue) !== -1
              : false
            : false) ||
          (data.name == 'Contact'
            ? item?.contact
              ? item.contact.toLowerCase().indexOf(inputValue) !== -1
              : false
            : false) ||
          (data.name == 'Website'
            ? item?.website
              ? item.website.toLowerCase().indexOf(inputValue) !== -1
              : false
            : false) ||
          (data.name == 'Year Founded'
            ? item?.year_founded
              ? item.year_founded.toLowerCase().indexOf(inputValue) !== -1
              : false
            : false) ||
          (data.name == 'Mission statement'
            ? item?.mission_statement
              ? item.mission_statement.toLowerCase().indexOf(inputValue) !==
              -1
              : false
            : false)
      );
      data.searchIcon = 'close';
    } else {
      this.listOfDisplayData = this.listOfData;
      data.searchIcon = 'search';
    }
  }

  clearModel(data?: any, searchValue?: any) {
    if (data.searchIcon == 'close' && searchValue) {
      data.searchValue = '';
      this.listOfDisplayData = this.listOfData;
      data.searchIcon = 'search';
    }
  }
  callChild(organization: any) {
    const departmentData = this.listOfChildrenData.filter(
      (item: any) =>
        item.companyname == organization.name ||
        item.organizationid == organization.id
    );
    organization['children'] = departmentData;
  }

  getDepartment() {
    this.loading = true;
    const { jsonData, newGuid } = this.socketService.makeJsonData('Department', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            this.listOfChildrenData = res.data;
            this.toastr.success(res.message, { nzDuration: 2000 });
          } else {
            this.toastr.error(res.message, { nzDuration: 2000 });
          }
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });

  }



  loadDepartmentFields() {
    const options = this.listOfData.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
    this.fields = [
      {
        fieldGroup: [
          {
            key: 'organizationid',
            type: 'select',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Organization Name',
              additionalProperties: {
                allowClear: true,
                serveSearch: false,
                showArrow: true,
                showSearch: true,
              },
              options: options,
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Department Name',
              placeholder: 'Department Name...',
              required: true,
            },
          },
        ],
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
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Name',
              placeholder: 'Name...',
              required: true,
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'address',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Address',
              placeholder: 'Address...',
              required: true,
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'email',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Email',
              placeholder: 'Email...',
              required: true,
            },
          },
        ],
      },
      // {
      //   fieldGroup: [
      //     {
      //       key: 'password',
      //       type: 'input',
      //       wrappers: ["formly-vertical-theme-wrapper"],
      //       defaultValue: '',
      //       props: {
      //         type: 'password',
      //         label: 'Password',
      //         placeholder: 'password...',
      //         required: true,
      //         additionalProperties: {
      //           suffixicon: 'eye-invisible',
      //         }
      //       }
      //     },
      //   ],
      // },
      {
        fieldGroup: [
          {
            key: 'contact',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Contact',
              placeholder: 'Contact...',
              required: true,
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'website',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Website',
              placeholder: 'Website...',
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'yearfounded',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Year Founded',
              placeholder: 'Year Founded...',
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'missionstatement',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Statement',
              placeholder: 'Mission Statement...',
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'image',
            type: 'input',
            className: 'w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2',
            wrappers: ['formly-vertical-theme-wrapper'],
            props: {
              label: 'Image Upload',
            },
          },
        ],
      },
    ];
  }
  loadSearchArray() {
    const properties = [
      'expand',
      'name',
      'address',
      'email',
      'contact',
      'website',
      'year_founded',
      'mission_statement',
      'action',
    ];
    this.searchArray = properties.map((property) => {
      return {
        name: property,
        searchIcon: 'search',
        searchValue: '',
      };
    });
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
