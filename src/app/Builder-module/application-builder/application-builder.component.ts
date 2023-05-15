import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-application-builder',
  templateUrl: './application-builder.component.html',
  styleUrls: ['./application-builder.component.scss']
})
export class ApplicationBuilderComponent implements OnInit {
  companyName: any;
  companyBuilder: any;
  applicationData: any = [];
  schema: any;
  isSubmit: boolean = true;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  listOfData: any = [];
  listOfDisplayData: any[] = [];
  loading = false;
  pageSize = 10;
  searchIcon = "search";
  searchValue = '';
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  requestSubscription: Subscription;
  fields: any = [];
  listOfChildrenData: any[] = [];
  moduleSubmit: boolean = false;
  checkRes: boolean = false;
  listOfColumns = [
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Application Name',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Company Name',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const companyNameA = a.companyName;
        const companyNameB = b.companyName;
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
      name: 'Application Type',
      sortOrder: null,
      sortFn: (a: any, b: any) => {
        const name1 = a.application_Type;
        const name2 = b.application_Type;
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
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.loadData();
    this.jsonApplicationBuilder();
  }

  jsonApplicationBuilder() {
    this.loading = true
    this.requestSubscription = this.builderService.jsonApplicationBuilder().subscribe({
      next: (res) => {
        this.listOfDisplayData = res.map(obj => {
          obj.expand = false;
          return obj;
        });
        this.listOfDisplayData = res;
        this.listOfData = res;
        this.applicationData = res;
        this.jsonModuleSetting();
        if (this.searchValue) {
          this.search(this.searchValue);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
        this.loading = false;
      }

    });
  }
  openModal(type: any) {
    if (type == 'module') {
      this.loadModuleFields();
      this.moduleSubmit = true;
    } else {
      this.fieldsLoad();
      this.moduleSubmit = false;
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

  loadData() {
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.companyBuilder = res.map(item => ({
        label: item.name,
        value: item.name
      }));
      this.fieldsLoad();
    }));
  }
  onSubmit() {
    if (!this.myForm.valid) {
      this.handleCancel();
      return;
    }
    const findData = this.moduleSubmit
      ? this.listOfChildrenData.find(a => a.name.toLowerCase() == this.myForm.value.name.toLowerCase() && a.id !== this.model?.id)
      : this.listOfDisplayData.find(a => a.name.toLowerCase() == this.myForm.value.name.toLowerCase() && a.id !== this.model?.id);

    if (findData) {
      const message = this.moduleSubmit ? 'Module name already exists in the database.' : 'Application name already exists in the database.';
      this.toastr.warning(message, { nzDuration: 2000 });
      return;
    } else {
      const key = this.moduleSubmit ? 'moduleId' : 'applicationId';
      this.myForm.value[key] = this.myForm.value.name.replace(/\s+/g, '-');
      
      const action$ = !this.moduleSubmit ? (this.isSubmit
        ? this.builderService.addApplicationBuilder(this.myForm.value)
        : this.builderService.updateApplicationBuilder(this.model.id, this.myForm.value)) : this.isSubmit
        ? this.builderService.addModule(this.myForm.value)
        : this.builderService.updateModule(this.model.id, this.myForm.value);
      action$.subscribe((res) => {
        // if (this.moduleSubmit) {
        //   this.saveHeaderFooter('header');
        //   this.saveHeaderFooter('footer');
        // }

        this.jsonApplicationBuilder();
        this.jsonModuleSetting();
        this.handleCancel();
        this.toastr.success(this.isSubmit ? 'Your data has been saved.' : 'Data updated successfully!', { nzDuration: 2000 });
        this.isSubmit = true;
      });
    }
  }
  editItem(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }


  deleteRow(id: any, type: any): void {
    const api$ = type == 'module' ? this.builderService.deletejsonModule(id) : this.builderService.deleteApplicationBuilder(id);
    api$.subscribe((res => {
      this.jsonApplicationBuilder();
      this.jsonModuleSetting();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };

  search(event?: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
      (item.name.toLowerCase().indexOf(inputValue) !== -1 || (item?.companyName ? item.companyName.toLowerCase().indexOf(inputValue) !== -1 : false)
        || (item?.application_Type ? item.application_Type.toLowerCase().indexOf(inputValue) !== -1 : false)
      )
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
    let obj = Object.assign({}, this.applicationData);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  callChild(company: any) {
    const moduleData = this.listOfChildrenData.filter((item: any) => item.applicationName == company.name);
    company['children'] = moduleData;
  }
  jsonModuleSetting() {
    this.requestSubscription = this.builderService.jsonModuleSetting().subscribe({
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
  }

  saveHeaderFooter(type: any) {
    debugger
    if (this.isSubmit) {
      let screen = {
        name: this.myForm.value.name + '-' + type,
        screenId: this.myForm.value.name + '-' + type,
        applicationName: '',
        moduleName: this.myForm.value.name,
      }
      this.builderService.addScreenModule(screen).subscribe(() => {

      })
    }
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
              label: 'Application Name',
              placeholder: 'Application Name...',
              required: true,
            }
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'companyName',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Company Name',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: this.companyBuilder,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'application_Type',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Application Type',
              additionalProperties: {
                allowClear: true,
                serveSearch: true,
                showArrow: true,
                showSearch: true,
              },
              options: [
                { label: "Website", value: 'website' },
                { label: "Mobile", value: 'mobile' },
                { label: "Backend Application", value: 'backend_application' },
              ]
            }
          }
        ]
      },
    ];
  }

  loadModuleFields() {
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
              // required: true,
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
