import { Component, OnInit } from '@angular/core';
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
  listOfColumns = [
    {
      name: 'Screen Id',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.screenId.localeCompare(b.screenId),
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
    {
      name: 'Organization',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const organizationNameA = a.orgnaizationName ? a.orgnaizationName : a.departmentName;
        const organizationNameB = b.orgnaizationName ? b.orgnaizationName : b.departmentName;
        if (organizationNameA === undefined && organizationNameB === undefined) {
          return 0;
        } else if (organizationNameA === undefined) {
          return 1;
        } else if (organizationNameB === undefined) {
          return -1;
        } else {
          return organizationNameA.localeCompare(organizationNameB);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Department',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const applicationNameA = a.departmentName ? a.departmentName : a.applicationName;
        const applicationNameB = b.departmentName ? b.departmentName : b.applicationName;
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
  constructor(public builderService: BuilderService, private applicationService: ApplicationService,
    public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router, private fb: FormBuilder) {
    this.dataSharedService.change.subscribe(({ event, field }) => {

      if (field.key === 'departmentId' && event) {
        debugger
        this.getApplicationOptionList(event);
      }
      if (field.key === 'organizationId' && event) {
        debugger
        this.getDepartmentOptionList(event);
      }

    });
  }
  ngOnInit(): void {
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
    this.loading = true
    this.applicationService.getNestCommonAPI('screen-builder').subscribe((res => {
      this.listOfDisplayData = res;
      this.listOfData = res;
      this.loading = false;
      this.jsonScreenModule = res;
      const nonEmptySearchArray = this.listOfColumns.filter((element: any) => element.searchValue);
      nonEmptySearchArray.forEach((element: any) => {
        this.search(element.searchValue, element);
      });
    }));
  }
  getApplicationList() {
    this.builderService.jsonModuleModuleList().subscribe((res => {
      this.ApplicationData = res;
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
      this.getOrganization();
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  getDepartment() {
    this.applicationService.getNestCommonAPI('department').subscribe((res => {
      this.departmenData = res;
      // this.loadScreenListFields();
    }));
  }
  getOrganization() {
    this.applicationService.getNestCommonAPI('organization').subscribe((res => {
      this.organizationData = res;
      this.loadScreenListFields();
    }));
  }
  // getModulelist(applicationName: any) {
  //   this.builderService.getjsonModuleModuleListByapplicationName(applicationName).subscribe((res => {
  //     this.moduleList = res;
  //   }))
  // }
  onSubmit() {
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }
    let findData = this.listOfDisplayData.find(a => a.screenId.toLowerCase() == this.form.value.screenId && a.id != this.model?.id);
    let findDataScreen = this.listOfDisplayData.find(a => a.name.toLowerCase() == this.form.value.name.toLowerCase() && a.id != this.model?.id);

    if (findData || findDataScreen) {
      if (findData) {
        this.toastr.warning('Screen ID already exists in the database. Please choose a different ID.', { nzDuration: 2000 });
      }
      if (findDataScreen) {
        this.toastr.warning('Screen name already exists in the database. Please choose a different name.', { nzDuration: 2000 });
      }
      this.loading = false;
      return;
    }
    else {
      const modelData = {
        "ScreenBuilder": this.form.value
      }

      const checkScreenAndProceed = this.isSubmit
        ? this.applicationService.addNestCommonAPI('cp', modelData)
        : this.applicationService.updateNestCommonAPI('screen-builder', this.model._id, this.form.value);
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
    this.applicationService.getNestCommonAPIById('department/organization', id).subscribe((res) => {
      const moduleListOptions = res.map((item: any) => ({
        label: item.name,
        value: item._id
      }));

      // Find the index of the "Select Module" field in the 'this.fields' array
      const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
        const field = fieldGroup.fieldGroup[0];
        return field.key === 'departmentId';
      });

      if (moduleFieldIndex !== -1) {
        // Update the options of the "Select Module" field
        this.fields[moduleFieldIndex].fieldGroup[0].props.options = moduleListOptions;
      }
    });
  }
  getApplicationOptionList(id: string) {
    this.applicationService.getNestCommonAPIById('application/department', id).subscribe((res) => {
      const moduleListOptions = res.map((item: any) => ({
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
    });
  }

  editItem(item: any) {
    debugger
    this.model = JSON.parse(JSON.stringify(item));
    this.getApplicationOptionList(this.model.departmentId)
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.applicationService.deleteNestCommonAPI('screen-builder', id).subscribe((res => {
      this.jsonScreenModuleList();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };
  goToBuildPage(screenName: any) {
    this.router.navigate(["/builder"]);
    this.dataSharedService.screenName = screenName
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
    debugger
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) => {
        const { name } = data;
        const { screenId, applicationName, departmentName, moduleName, name: itemName } = item;

        if (name === 'Screen Id') {
          return screenId.toLowerCase().indexOf(inputValue) !== -1;
        }

        if (name === 'Department') {
          const department = applicationName || departmentName;
          return department && department.toLowerCase().indexOf(inputValue) !== -1;
        }

        if (name === 'Screen Name') {
          return itemName && itemName.toLowerCase().indexOf(inputValue) !== -1;
        }

        if (name === 'Application') {
          const application = moduleName || applicationName;
          return application && application.toLowerCase().indexOf(inputValue) !== -1;
        }

        return false;
      });

      data.searchIcon = "close";
    }

    else {
      this.listOfDisplayData = this.listOfData;
      data.searchIcon = "search";
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
      value: item._id
    }));
    this.fields = [
      {
        fieldGroup: [
          {
            key: 'organizationId',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Select Organization',
              options: options,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'departmentId',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Select Department',
              options: [],
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'applicationId',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Select Application',
              options: [],
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Screen Name',
              placeholder: 'Screen Name...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'screenId',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Screen Id',
              placeholder: 'Screen Id...',
              required: true,
            }
          },
        ],
      },
    ];
  }
}
