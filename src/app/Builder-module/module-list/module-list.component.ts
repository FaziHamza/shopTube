import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'st-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  moduleList: any;
  applicationBuilder: any;
  model: any;
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
  requestSubscription: Subscription;
  listOfChildrenData: any[] = [];
  listOfColumns = [
    {
      name: 'Module',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Application',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.applicationName.localeCompare(b.applicationName),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Owner',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const companyNameA = a.owner;
        const companyNameB = b.owner;
        if (companyNameA === undefined && companyNameB === undefined) {
          return 0;
        } else if (companyNameA === undefined) {
          return 1;
        } else if (companyNameB === undefined) {
          return -1;
        } else {
          return companyNameA.localeCompare(companyNameB);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Email',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const companyNameA = a.email;
        const companyNameB = b.email;
        if (companyNameA === undefined && companyNameB === undefined) {
          return 0;
        } else if (companyNameA === undefined) {
          return 1;
        } else if (companyNameB === undefined) {
          return -1;
        } else {
          return companyNameA.localeCompare(companyNameB);
        }
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Description',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const companyNameA = a.description;
        const companyNameB = b.description;
        if (companyNameA === undefined && companyNameB === undefined) {
          return 0;
        } else if (companyNameA === undefined) {
          return 1;
        } else if (companyNameB === undefined) {
          return -1;
        } else {
          return companyNameA.localeCompare(companyNameB);
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
  constructor(public builderService: BuilderService, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.jsonModuleSetting();
    this.loadData();
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      applicationName: new FormControl('', Validators.required),
    });
  }
  jsonModuleSetting() {
    this.loading = true;
    this.builderService.jsonModuleSetting().subscribe((res => {
      debugger
      this.moduleList = res;
      this.listOfDisplayData = res;
      this.listOfData = res;
      this.loading = false;
      if (this.searchValue) {
        this.search(this.searchValue);
      }
    }));
  }
  openModal() {
    this.form.reset();
    this.isVisible = true;
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
  onSubmit() {
    debugger
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }
    let findData = this.listOfDisplayData.find(a => a.screenId.toLowerCase() == this.form.value.screenId && a.id !=this.model?.id);
    let findDataScreen = this.listOfDisplayData.find(a => a.name.toLowerCase() == this.form.value.name.toLowerCase() && a.id !=this.model?.id);

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
    debugger
    this.form.patchValue({
      name: item.name,
      applicationName: item.applicationName
    });
    this.model = item;
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.builderService.deletejsonModule(id).subscribe((res => {
      this.jsonModuleSetting();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };

  search(event?: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
        (item.name.toLowerCase().indexOf(inputValue) !== -1 || item.applicationName.toLowerCase().indexOf(inputValue) !== -1)
      );
      this.searchIcon = "close";
    } else {
      this.listOfDisplayData = this.listOfData;
      this.searchIcon = "search";
    }
  }

  clearModel() {
    if (this.searchIcon == "close" && this.searchValue) {
      this.searchValue = '';
      this.listOfDisplayData = this.listOfData;
      this.searchIcon = "search";
    }
  }

  downloadJson() {
    let obj = Object.assign({}, this.moduleList);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  jsonScreenModuleList() {
    this.requestSubscription = this.builderService.jsonScreenModuleList().subscribe({
      next: (res) => {
        this.listOfChildrenData = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        this.loading = false;
      }

    });
    
    this.builderService.jsonScreenModuleList().subscribe((res => {
      this.listOfDisplayData = res;
    }));
  }


  loadScreenListFields() {
    debugger
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
              label: 'Application Name...',
              options: options,
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
