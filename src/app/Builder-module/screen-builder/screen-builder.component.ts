import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'st-screen-builder',
  templateUrl: './screen-builder.component.html',
  styleUrls: ['./screen-builder.component.scss']
})
export class ScreenBuilderComponent implements OnInit {
  paginatedData: any[] = [];
  departmenData: any;
  organizationData: any;
  ApplicationData: any;
  model: any;
  jsonScreenModule: any = [];
  isSubmit: boolean = true;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  loading = false;
  searchValue = '';
  pageSize = 10;
  searchIcon = "search";
  fields: any = [];
  options: FormlyFormOptions = {};
  form: any = new FormGroup({});
  pageIndex: any = 1;
  totalItems: number = 0; // Total number of items
  startIndex = 1;
  endIndex: any = 10;
  listOfColumns = [
    {
      name: 'Screen Id',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.navigation.localeCompare(b.navigation),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Screen Name',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    // {
    //   name: 'Organization',
    //   visible: false,
    //   searchValue: '',
    //   sortOrder: null,
    //   sortFn: (a: any, b: any) => {
    //     const organizationNameA = a.orgnaizationName
    //       ? a.orgnaizationName
    //       : a.departmentname;
    //     const organizationNameB = b.orgnaizationName
    //       ? b.orgnaizationName
    //       : b.departmentname;
    //     if (
    //       organizationNameA === undefined &&
    //       organizationNameB === undefined
    //     ) {
    //       return 0;
    //     } else if (organizationNameA === undefined) {
    //       return 1;
    //     } else if (organizationNameB === undefined) {
    //       return -1;
    //     } else {
    //       return organizationNameA.localeCompare(organizationNameB);
    //     }
    //   },
    //   sortDirections: ['ascend', 'descend', null],
    // },
    {
      name: 'Department',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const applicationnameA = a.departmentname
          ? a.departmentname
          : a.applicationname;
        const applicationnameB = b.departmentname
          ? b.departmentname
          : b.applicationname;
        if (applicationnameA === undefined && applicationnameB === undefined) {
          return 0;
        } else if (applicationnameA === undefined) {
          return 1;
        } else if (applicationnameB === undefined) {
          return -1;
        } else {
          return applicationnameA.localeCompare(applicationnameB);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Application',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const modulenameA = a.modulename ? a.modulename : a.applicationname;
        const modulenameB = b.modulename ? b.modulename : b.applicationname;
        if (modulenameA === undefined && modulenameB === undefined) {
          return 0;
        } else if (modulenameA === undefined) {
          return 1;
        } else if (modulenameB === undefined) {
          return -1;
        } else {
          return modulenameA.localeCompare(modulenameB);
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
  constructor(
    public builderService: BuilderService,
    public dataSharedService: DataSharedService,
    private toastr: NzMessageService,
    private router: Router,
    public socketService: SocketService,
  ) {
    this.dataSharedService.change.subscribe(({ event, field }) => {
      debugger
      if (field.key === 'departmentid' && event) {

        this.getApplicationOptionList(event);
      }
      if (field.key === 'organizationid' && event) {

        this.getDepartmentOptionList(event);
      }
    });
  }
  ngOnInit(): void {
    this.totalItems = this.listOfDisplayData.length;

    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.getOrganization();
    // this.getDepartment();
    this.jsonScreenModuleList();
  }
  jsonScreenModuleList() {
    this.loading = true;
    const { jsonData, newGuid } = this.socketService.makeJsonData('ScreenBuilder', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess && res?.data.length > 0) {
            this.toastr.success(`Screen : ${res.message}`, { nzDuration: 3000 });
            this.listOfDisplayData = res.data;
            this.listOfData = res.data;
            this.loading = false;
            this.jsonScreenModule = res.data;
            this.handlePageChange(1);
            const nonEmptySearchArray = this.listOfColumns.filter(
              (element: any) => element.searchValue
            );
            nonEmptySearchArray.forEach((element: any) => {
              this.search(element.searchValue, element);
            });
          } else {
            this.toastr.error(`Screen : ${res.message}`, { nzDuration: 3000 });
            this.loading = false;
          }
        }
      },
      error: (err) => {
        this.toastr.error(`Screen : An error occured`, { nzDuration: 3000 });
        this.loading = false;
      },
    });
  }
  getApplicationList() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('Application', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe(((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        if (res.isSuccess)
          this.ApplicationData = res.data;
        else
          this.toastr.success(res.message, { nzDuration: 3000 });
      }

    }))
  }
  openModal() {
    this.form.reset();
    this.isVisible = true;
    if (this.isSubmit) {
      for (let prop in this.model) {
        if (this.model.hasOwnProperty(prop)) {
          this.model[prop] = null;
        }
      }
    }
    if (!this.isSubmit) {
      this.isSubmit = true;
      // this.getDepartment();
      // this.getOrganization();
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  getDepartment() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('Department', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        if (res.isSuccess) {
          console.log('getDepartment-Info');
          this.departmenData = res.data;
        } else console.error(res.message, { nzDuration: 3000 });
      }
      // this.loadScreenListFields();
    });
  }
  getOrganization() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('Organization', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        if (res.isSuccess) {
          console.log('getOrganization-Info');
          this.organizationData = res.data;
          this.loadScreenListFields();
        }
        else console.error(res.message, { nzDuration: 3000 });
      }

    });
  }
  onSubmit() {

    if (!this.form.valid) {
      this.handleCancel();
      return;
    }
    let findData = this.listOfDisplayData.find(
      (a) =>
        a.navigation.toLowerCase() == this.form.value.navigation &&
        a.id != this.model?.id
    );
    let findDataScreen = this.listOfDisplayData.find(
      (a) =>
        a.name.toLowerCase() == this.form.value.name.toLowerCase() &&
        a.id != this.model?.id
    );

    if (findData || findDataScreen) {
      if (findData) {
        this.toastr.warning(
          'Screen ID already exists in the database. Please choose a different ID.',
          { nzDuration: 2000 }
        );
      }
      if (findDataScreen) {
        this.toastr.warning(
          'Screen name already exists in the database. Please choose a different name.',
          { nzDuration: 2000 }
        );
      }
      this.loading = false;
      return;
    }
    else {
      var ResponseGuid: any;
      if (this.isSubmit) {
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [`ScreenBuilder`]: this.form.value, metaInfo: metainfocreate }
        this.socketService.Request(Add);
      }
      else {
        const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(this.model.id);
        ResponseGuid = newUGuid;
        const Update = { [`ScreenBuilder`]: this.form.value, metaInfo: metainfoupdate };
        this.socketService.Request(Update)
      }
      this.loading = true;
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              this.isVisible = false;
              this.jsonScreenModuleList();
              const message = this.isSubmit ? 'Save' : 'Update';
              this.toastr.success(res.message, { nzDuration: 3000 });
              if (!this.isSubmit) {
                this.isSubmit = true;
              }
              this.handleCancel();
            } else {
              this.toastr.error(res.message, { nzDuration: 3000 });
            }
          }

        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
  }

  getDepartmentOptionList(id: string) {
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('Department', id, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata
        if (res.isSuccess) {
          const moduleListOptions = res.data.map((item: any) => ({
            label: item.name,
            value: item.id
          }));
          const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
            const field = fieldGroup.fieldGroup[0];
            return field.key === 'departmentid';
          });

          if (moduleFieldIndex !== -1) {
            // Update the options of the "Select Module" field
            this.fields[moduleFieldIndex].fieldGroup[0].props.options = moduleListOptions;
          }
        } else
          this.toastr.error(res.message, { nzDuration: 3000 });
      }

      // Find the index of the "Select Module" field in the 'this.fields' array
    });
  }
  getApplicationOptionList(id: string) {
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('Application', id, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        if (res.isSuccess) {
          const moduleListOptions = res.data.map((item: any) => ({
            label: item.name,
            value: item.id
          }));

          // Find the index of the "Select Module" field in the 'this.fields' array
          const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
            const field = fieldGroup.fieldGroup[0];
            return field.key === 'applicationid';
          });

          if (moduleFieldIndex !== -1) {
            // Update the options of the "Select Module" field
            this.fields[moduleFieldIndex].fieldGroup[0].props.options = moduleListOptions;
          }
        } else
          this.toastr.error(res.message, { nzDuration: 3000 });
      }

    });
  }

  editItem(item: any) {

    this.model = JSON.parse(JSON.stringify(item));
    this.getApplicationOptionList(this.model.departmentid);
    this.isSubmit = false;
  }
  deleteRow(data: any): void {
    if (data.name.includes('_header') || data.name.includes('_footer') || data.navigation.includes('_header') || data.navigation.includes('_footer')) {
      const lastPart = data.navigation.split('_').pop();
      this.toastr.warning(`Not allowed to delete ${lastPart}`, { nzDuration: 2000 });
      return;
    }
    const { jsonData, newGuid } = this.socketService.deleteModelType('ScreenBuilder', data.id);

    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        if (res.isSuccess) {
          this.jsonScreenModuleList();
          this.handlePageChange(1);
          this.toastr.success(`Screen: ${res.message}`, { nzDuration: 2000, });
        } else this.toastr.error(`Screen: ${res.message}`, { nzDuration: 2000, });
      }

    });
  }
  goToBuildPage(data: any) {

    this.dataSharedService.screenName = data;
    this.router.navigate(['/builder']);
  }
  downloadJson() {
    let obj = Object.assign({}, this.jsonScreenModule);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }

  search(event?: any, data?: any): void {

    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) => {
        const { name } = data;
        const {
          navigation,
          applicationname,
          departmentname,
          modulename,
          name: itemName,
        } = item;

        if (name === 'Screen Id') {
          return navigation.toLowerCase().indexOf(inputValue) !== -1;
        }

        if (name === 'Department') {
          const department = applicationname || departmentname;
          return (
            department && department.toLowerCase().indexOf(inputValue) !== -1
          );
        }

        if (name === 'Screen Name') {
          return itemName && itemName.toLowerCase().indexOf(inputValue) !== -1;
        }

        if (name === 'Application') {
          const application = modulename || applicationname;
          return (
            application && application.toLowerCase().indexOf(inputValue) !== -1
          );
        }

        return false;
      });

      data.searchIcon = 'close';
    } else {
      this.listOfDisplayData = this.listOfData;
      data.searchIcon = 'search';
    }
  }
  loadScreenListFields() {
    const options = this.organizationData.map((item: any) => ({
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
              label: 'Select Organization',
              options: options,
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'departmentid',
            type: 'select',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Select Department',
              options: [],
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'applicationid',
            type: 'select',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Select Application',
              options: [],
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
              label: 'Screen Name',
              placeholder: 'Screen Name...',
              required: true,
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'navigation',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Screen Id',
              placeholder: 'Screen Id...',
              required: true,
              pattern: /^[a-z0-9_.]+$/,
            },
          },
        ],
      },
    ];
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
