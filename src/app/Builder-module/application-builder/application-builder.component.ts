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
  listOfColumns = [
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
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
    });
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.loadData();
    this.jsonApplicationBuilder();
    // this.fieldsLoad();
  }

  jsonApplicationBuilder() {
    this.loading = true
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.listOfDisplayData = res;
      this.listOfData = res;
      this.loading = false;
      this.applicationData = res;
      if (this.searchValue) {
        this.search(this.searchValue);
      }
    }));
  }
  openModal() {
    // this.myForm.reset();
    for (let prop in this.model) {
      if (this.model.hasOwnProperty(prop)) {
        this.model[prop] = null;
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
      debugger
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

    let findData = this.listOfDisplayData.find(a => a.name.toLowerCase() == this.myForm.value.name.toLowerCase() && a.id != this.model?.id);
    if (findData) {
      this.toastr.warning('Application name already exists in the database.', { nzDuration: 2000 });
      return;
    } else {
      const action$ = this.isSubmit
        ? this.builderService.addApplicationBuilder(this.myForm.value)
        : this.builderService.updateApplicationBuilder(this.model.id, this.myForm.value);
      action$.subscribe((res) => {
        this.jsonApplicationBuilder();
        this.isSubmit = true;
        this.handleCancel();
        this.toastr.success(this.isSubmit ? 'Your data has been saved.' : 'Data updated successfully!', { nzDuration: 2000 });
      });
    }
  }


  editItem(item: any) {
    // this.myForm.patchValue({
    //   name: item.name,
    //   companyName: item.companyName
    // });
    this.model = item;
    this.isSubmit = false;
  }


  deleteRow(id: any): void {
    this.builderService.deleteApplicationBuilder(id).subscribe((res => {
      this.jsonApplicationBuilder();
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

  // callCompanyData (){
  //   this.builderService.jsonCompanyBuilder().subscribe((res => {
  //     this.listOfDisplayData = res.map(obj => {
  //       obj.expand = false;
  //       return obj;
  //     });
  //     this.listOfData = res;
  //     this.copmanyData = res;
  //     this.builderService.jsonApplicationBuilder().subscribe((res => {
  //       this.listOfChildrenData = res;
  //       this.loading = false;
  //     }))
  //     if (this.searchValue) {
  //       this.search(this.searchValue);
  //     }
  //   }));
  // }
}
