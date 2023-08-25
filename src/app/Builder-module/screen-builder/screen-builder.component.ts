import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

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
    //       : a.departmentName;
    //     const organizationNameB = b.orgnaizationName
    //       ? b.orgnaizationName
    //       : b.departmentName;
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
        const applicationNameA = a.departmentName
          ? a.departmentName
          : a.applicationName;
        const applicationNameB = b.departmentName
          ? b.departmentName
          : b.applicationName;
        if (applicationNameA === undefined && applicationNameB === undefined) {
          return 0;
        } else if (applicationNameA === undefined) {
          return 1;
        } else if (applicationNameB === undefined) {
          return -1;
        } else {
          return applicationNameA.localeCompare(applicationNameB);
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
        const moduleNameA = a.moduleName ? a.moduleName : a.applicationName;
        const moduleNameB = b.moduleName ? b.moduleName : b.applicationName;
        if (moduleNameA === undefined && moduleNameB === undefined) {
          return 0;
        } else if (moduleNameA === undefined) {
          return 1;
        } else if (moduleNameB === undefined) {
          return -1;
        } else {
          return moduleNameA.localeCompare(moduleNameB);
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
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService,
    private toastr: NzMessageService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSharedService.change.subscribe(({ event, field }) => {
      if (field.key === 'departmentId' && event) {

        this.getApplicationOptionList(event);
      }
      if (field.key === 'organizationId' && event) {

        this.getDepartmentOptionList(event);
      }
    });
  }
  ngOnInit(): void {
    this.totalItems = this.listOfDisplayData.length;
    // this.form = new FormGroup({
    //   name: new FormControl('', Validators.required),
    //   screenId: new FormControl('', Validators.required),
    //   applicationName: new FormControl('', Validators.required),
    //   moduleName: new FormControl('', Validators.required),
    // });
    // const applicationNameControl = this.form.get('applicationName');
    // if (applicationNameControl !== null) {
    //   applicationNameControl.valueChanges.subscribe(value => {
    //     this.getModulelist(value);
    //   });
    // }

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
    this.applicationService.getNestCommonAPI('cp/ScreenBuilder').subscribe({
      next: (res: any) => {
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
      },
      error: (err) => {
        this.toastr.error(`Screen : An error occured`, { nzDuration: 3000 });
        this.loading = false;
      },
    });
  }
  getApplicationList() {
    this.applicationService.getNestCommonAPI('cp/Application').subscribe(((res: any) => {
      if (res.isSuccess)
        this.ApplicationData = res.data;
      else
        this.toastr.success(res.message, { nzDuration: 3000 });
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
    this.applicationService.getNestCommonAPI('cp/Department').subscribe((res: any) => {
      if (res.isSuccess) {
        console.log('getDepartment-Info');
        this.departmenData = res.data;
      } else console.error(res.message, { nzDuration: 3000 });
      // this.loadScreenListFields();
    });
  }
  getOrganization() {
    this.applicationService
      .getNestCommonAPI('cp/Organization')
      .subscribe((res: any) => {
        if (res.isSuccess) {
          console.log('getOrganization-Info');
          this.organizationData = res.data;
          this.loadScreenListFields();
        }
        else console.error(res.message, { nzDuration: 3000 });
      });
  }
  // getModulelist(applicationName: any) {
  //   this.builderService.getjsonModuleModuleListByapplicationName(applicationName).subscribe((res => {
  //     this.moduleList = res;
  //   }))
  // }
  onSubmit() {
    debugger
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
    } else {
      const screenModel = {
        ScreenBuilder: this.form.value,
      };

      const checkScreenAndProceed = this.isSubmit
        ? this.applicationService.addNestCommonAPI('cp', screenModel)
        : this.applicationService.updateNestCommonAPI('cp/ScreenBuilder', this.model._id, screenModel);
      checkScreenAndProceed.subscribe({
        next: (objTRes: any) => {
          if (objTRes.isSuccess) {

            this.isVisible = false;
            this.jsonScreenModuleList();
            const message = this.isSubmit ? 'Save' : 'Update';
            this.toastr.success(objTRes.message, { nzDuration: 3000 });
            if (!this.isSubmit) {
              this.isSubmit = true;
            }
            this.handleCancel();
          } else {
            this.toastr.error(objTRes.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
  }

  getDepartmentOptionList(id: string) {
    debugger
    this.applicationService.getNestCommonAPIById('cp/Department', id).subscribe((res: any) => {
      if (res.isSuccess) {
        const moduleListOptions = res.data.map((item: any) => ({
          label: item.name,
          value: item._id
        }));
        const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
          const field = fieldGroup.fieldGroup[0];
          return field.key === 'departmentId';
        });

        if (moduleFieldIndex !== -1) {
          // Update the options of the "Select Module" field
          this.fields[moduleFieldIndex].fieldGroup[0].props.options = moduleListOptions;
        }
      } else
        this.toastr.error(res.message, { nzDuration: 3000 });
      // Find the index of the "Select Module" field in the 'this.fields' array
    });
  }
  getApplicationOptionList(id: string) {
    this.applicationService.getNestCommonAPIById('cp/Application', id).subscribe((res: any) => {
      if (res.isSuccess) {
        const moduleListOptions = res.data.map((item: any) => ({
          label: item.name,
          value: item._id
        }));

        // Find the index of the "Select Module" field in the 'this.fields' array
        const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
          const field = fieldGroup.fieldGroup[0];
          return field.key === 'applicationId';
        });

        if (moduleFieldIndex !== -1) {
          // Update the options of the "Select Module" field
          this.fields[moduleFieldIndex].fieldGroup[0].props.options = moduleListOptions;
        }
      } else
        this.toastr.error(res.message, { nzDuration: 3000 });
    });
  }

  editItem(item: any) {

    this.model = JSON.parse(JSON.stringify(item));
    this.getApplicationOptionList(this.model.departmentId);
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.applicationService
      .deleteNestCommonAPI('cp/ScreenBuilder', id)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.jsonScreenModuleList();
          this.handlePageChange(1);
          this.toastr.success(`Screen: ${res.message}`, { nzDuration: 2000, });
        } else this.toastr.error(`Screen: ${res.message}`, { nzDuration: 2000, });
      });
  }
  goToBuildPage(data: any) {
    debugger
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
          applicationName,
          departmentName,
          moduleName,
          name: itemName,
        } = item;

        if (name === 'Screen Id') {
          return navigation.toLowerCase().indexOf(inputValue) !== -1;
        }

        if (name === 'Department') {
          const department = applicationName || departmentName;
          return (
            department && department.toLowerCase().indexOf(inputValue) !== -1
          );
        }

        if (name === 'Screen Name') {
          return itemName && itemName.toLowerCase().indexOf(inputValue) !== -1;
        }

        if (name === 'Application') {
          const application = moduleName || applicationName;
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

  // clearModel(data?: any, searchValue?: any) {
  //   if (data.searchIcon == "close" && searchValue) {
  //     data.searchValue = '';
  //     this.listOfDisplayData = this.listOfData;
  //     data.searchIcon = "search";
  //   }
  // }
  loadScreenListFields() {
    const options = this.organizationData.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
    this.fields = [
      {
        fieldGroup: [
          {
            key: 'organizationId',
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
            key: 'departmentId',
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
            key: 'applicationId',
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
