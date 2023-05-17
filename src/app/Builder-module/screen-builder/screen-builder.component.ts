import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-screen-builder',
  templateUrl: './screen-builder.component.html',
  styleUrls: ['./screen-builder.component.scss']
})
export class ScreenBuilderComponent implements OnInit {
  applicationBuilder: any;
  moduleList: any;
  model: any;
  jsonScreenModule: any = [];
  isSubmit: boolean = true;
  // form: FormGroup;
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
      name: 'Module',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const moduleNameA = a.moduleName;
        const moduleNameB = b.moduleName;
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
      name: 'Application',
      visible: false,
      searchValue: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const applicationNameA = a.applicationName;
        const applicationNameB = b.applicationName;
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
      name: 'Action',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
  ];
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router, private fb: FormBuilder) {
    this.dataSharedService.change.subscribe(({ event, field }) => {
      debugger
      if (field.key === 'applicationName' && event) {
        this.builderService.getjsonModuleModuleListByapplicationName(event).subscribe((res) => {
          const moduleListOptions = res.map((item: any) => ({
            label: item.name,
            value: item.name
          }));

          // Find the index of the "Select Module" field in the 'this.fields' array
          const moduleFieldIndex = this.fields.findIndex((fieldGroup: any) => {
            const field = fieldGroup.fieldGroup[0];
            return field.key === 'moduleName';
          });

          if (moduleFieldIndex !== -1) {
            // Update the options of the "Select Module" field
            this.fields[moduleFieldIndex].fieldGroup[0].props.options = moduleListOptions;
          }
        });
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
    this.loadData();
    this.jsonScreenModuleList();
  }
  jsonScreenModuleList() {
    this.loading = true
    this.builderService.jsonScreenModuleList().subscribe((res => {
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
  getModuleList() {
    this.builderService.jsonModuleModuleList().subscribe((res => {
      this.moduleList = res;
    }))
  }
  openModal() {
    debugger
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
      this.loadData();
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  loadData() {
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationBuilder = res;
      this.loadScreenListFields();
    }));
  }
  getModulelist(applicationName: any) {
    this.builderService.getjsonModuleModuleListByapplicationName(applicationName).subscribe((res => {
      this.moduleList = res;
    }))
  }
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
      const checkScreenAndProceed = this.isSubmit
        ? this.builderService.addScreenModule(this.form.value)
        : this.builderService.updateScreenModule(this.model.id, this.form.value);
      checkScreenAndProceed.subscribe(() => {
        this.isVisible = false;
        this.jsonScreenModuleList();
        const message = this.isSubmit ? 'Save' : 'Update';
        this.toastr.success(`${message} Successfully!`, { nzDuration: 3000 });
        if (!this.isSubmit) {
          this.isSubmit = true;
        }
        this.handleCancel();
      });
    }
  }


  editItem(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.builderService.deletejsonScreenModule(id).subscribe((res => {
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
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
      (
        data.name == 'Screen Id' ? item.name.toLowerCase().indexOf(inputValue) !== -1 : false ||
          (data.name == 'Screen Name' ? (item?.moduleName ? item.moduleName.toLowerCase().indexOf(inputValue) !== -1 : false) : false) ||
          (data.name == 'Module' ? (item?.moduleName ? item.moduleName.toLowerCase().indexOf(inputValue) !== -1 : false) : false)
          ||
          (data.name == 'Application' ? (item?.applicationName ? item.applicationName.toLowerCase().indexOf(inputValue) !== -1 : false) : false)
      )
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
  loadScreenListFields() {
    const options = this.applicationBuilder.map((item: any) => ({
      label: item.name,
      value: item.name
    }));
    this.fields = [
      {
        fieldGroup: [
          {
            key: 'applicationName',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Select Application',
              options: options,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'moduleName',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Select Module',
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
  handlePageChange(pageIndex: number): void {
    debugger
    const pageSize = this.pageSize;
    this.pageIndex = pageIndex;
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newData = this.listOfData.slice(startIndex, endIndex);
    this.listOfDisplayData = newData;
  }
}
