import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  form: FormGroup;
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
      this.loadModuleFields();
    }));
  }
  onSubmit() {
    debugger;
    if (!this.form.valid) {
      this.handleCancel();
      return;
    }

    this.loading = true;
    let findData = this.listOfDisplayData.find(a => a.name.toLowerCase() == this.form.value.name.toLowerCase() && a.applicationName.toLowerCase() == this.form.value.applicationName.toLowerCase());
    if (findData) {
      this.toastr.warning('Module name already exists in the database.', { nzDuration: 2000 });
      this.loading = false;
      return;
    }
    else {
      const addOrUpdateModule = this.isSubmit
        ? this.builderService.addModule(this.form.value)
        : this.builderService.updateModule(this.model.id, this.form.value);
      addOrUpdateModule.subscribe(() => {
        this.jsonModuleSetting();
        this.loading = false;
        this.isSubmit = true;
        this.handleCancel();
        this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });
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

  loadModuleFields() {
    debugger
    const options = this.applicationBuilder.map((item: any) => ({
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
              label: 'Module Name',
              placeholder: 'Module Name...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'applicationName',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Application',
              options: options,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'owner',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Owner Name',
              placeholder: 'Owner Name...',
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
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'description',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Description',
              placeholder: 'Description...',
            }
          },
        ],
      },
      
    ];
  }

}
