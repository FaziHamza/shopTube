import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})

export class PolicyComponent implements OnInit {
  paginatedData: any[] = [];
  model: any;
  jsonPolicyModule: any = [];
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
  themeList: any[] = [];
  listOfColumns = [
    {
      name: 'Policy Id',
      sortOrder: null,
      sortFn: (a: any, b: any) => a._id.localeCompare(b._id),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Policy Name',
      visible: false,
      searchValue: '',
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
  constructor(
    public builderService: BuilderService,
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService,
    private toastr: NzMessageService,
  ) {
  }
  ngOnInit(): void {
    this.totalItems = this.listOfDisplayData.length;
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.loadPolicyListFields();
    this.jsonPolicyModuleList();
    this.getTheme();
    this.getMenuTheme();
  }
  getMenuTheme(){
    let id = JSON.parse(localStorage.getItem('user')!).userId;

  }
  jsonPolicyModuleList() {
    this.loading = true;
    this.applicationService.getNestCommonAPI('cp/Policy').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.loading = false;
          this.toastr.success(`Policy : ${res.message}`, { nzDuration: 3000 });
          if (res?.data.length > 0) {
            this.listOfDisplayData = res.data;
            this.listOfData = res.data;
            this.jsonPolicyModule = res.data;
            this.handlePageChange(1);
            const nonEmptySearchArray = this.listOfColumns.filter(
              (element: any) => element.searchValue
            );
            nonEmptySearchArray.forEach((element: any) => {
              this.search(element.searchValue, element);
            });
          }
        } else {
          this.toastr.error(`Policy : ${res.message}`, { nzDuration: 3000 });
          this.loading = false;
        }
      },
      error: (err) => {
        this.toastr.error(`Policy : An error occured`, { nzDuration: 3000 });
        this.loading = false;
      },
    });
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

  onSubmit() {

    if (!this.form.valid) {
      this.handleCancel();
      return;
    }

    let findDataPolicy = this.listOfDisplayData.find(
      (a) =>
        a.name.toLowerCase() == this.form.value.name.toLowerCase() &&
        a.id != this.model?.id
    );

    if (findDataPolicy) {
      if (findDataPolicy) {
        this.toastr.warning(
          'Policy name already exists in the database. Please choose a different name.',
          { nzDuration: 2000 }
        );
      }
      this.loading = false;
      return;
    } else {
      let obj = {
        applicationId: JSON.parse(localStorage.getItem('applicationId')!),
        name: this.form.value.name,
        menuThemeId: this.form.value.menuThemeId
      };

      const PolicyModel = {
        Policy: obj,
      };

      const checkPolicyAndProceed = this.isSubmit
        ? this.applicationService.addNestCommonAPI('cp', PolicyModel)
        : this.applicationService.updateNestCommonAPI('cp/Policy', this.model._id, PolicyModel);
      checkPolicyAndProceed.subscribe({
        next: (objTRes: any) => {
          if (objTRes.isSuccess) {

            this.isVisible = false;
            this.jsonPolicyModuleList();
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


  editItem(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.applicationService
      .deleteNestCommonAPI('cp/Policy', id)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.jsonPolicyModuleList();
          this.handlePageChange(1);
          this.toastr.success(`Policy: ${res.message}`, { nzDuration: 2000, });
        } else this.toastr.error(`Policy: ${res.message}`, { nzDuration: 2000, });
      });
  }
  downloadJson() {
    let obj = Object.assign({}, this.jsonPolicyModule);
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
          name: itemName,
        } = item;
        if (name === 'Policy Name') {
          return itemName && name.toLowerCase().indexOf(inputValue) !== -1;
        }
        return false;
      });

      data.searchIcon = 'close';
    } else {
      this.listOfDisplayData = this.listOfData;
      data.searchIcon = 'search';
    }
  }
  loadPolicyListFields() {
    this.fields = [
      {
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            wrappers: ['formly-vertical-theme-wrapper'],
            defaultValue: '',
            props: {
              label: 'Policy Name',
              placeholder: 'Policy Name...',
              required: true,
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            key: 'menuThemeId',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Menu Theme',
              additionalProperties: {
                allowClear: true,
                serveSearch: false,
                showArrow: true,
                showSearch: true,
              },
              options: this.themeList,
            }
          }
        ]
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

  getTheme() {
    this.applicationService.getNestCommonAPI("cp/MenuTheme").subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.themeList = res.data.map((item: any) => ({
            label: item.name,
            value: item._id
          }));
          this.loadPolicyListFields();
        } else
          this.toastr.error(res.message, { nzDuration: 3000 });
      }, error: (error) => {
        this.toastr.error(JSON.stringify(error), { nzDuration: 3000 });
      }
    });
  }
}