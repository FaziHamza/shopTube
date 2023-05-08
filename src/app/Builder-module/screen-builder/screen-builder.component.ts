import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  applicationName: any;
  moduleList: any;
  moduleName: any
  // applicationType: any;
  model: any;
  fields: any = [];
  jsonScreenModule: any = [];
  schema: any;
  isSubmit: boolean = true;
  form = new FormGroup({});
  isDesc: boolean = false;
  column: any = 'name';
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  isShow: boolean = false;
  listOfData: any = [];
  listOfDisplayData: any = [];
  loading = false;
  searchValue = '';
  pageSize = 10;
  searchIcon = "search";
  listOfColumns = [
    {
      name: 'Screen Id',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.screenId.localeCompare(b.screenId),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Screen Name',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Module',
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
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) { }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.screenSettingForm();
    this.loadData();
    this.jsonScreenModuleList();
  }

  screenSettingForm() {
    this.builderService.screenSettingForm().subscribe((res => {
      this.fields = res;
    }));
  }
  jsonScreenModuleList() {
    this.loading = true
    this.builderService.jsonScreenModuleList().subscribe((res => {
      this.listOfDisplayData = res;
      this.listOfData = res;
      this.loading = false;
      this.jsonScreenModule = res;

    }));
  }
  getModuleList() {
    this.builderService.jsonModuleModuleList().subscribe((res => {
      this.moduleList = res;
    }))
  }
  openModal() {
    this.isVisible = true;
    this.applicationName = "";
    this.moduleName = "";
    if (!this.isSubmit) {
      this.isSubmit = true;
      this.loadData();
    }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  loadData() {
    var daata = {
      name: '',
      screenId: '',
      applicationName: '',
      moduleName: '',
    };
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationBuilder = res;
    }));
    this.model = daata;
  }
  getModulelist(applicationName: any) {
    this.builderService.getjsonModuleModuleListByapplicationName(applicationName).subscribe((res => {
      this.moduleList = res;
    }))
  }
  onSubmit() {
    if (this.form.valid && this.applicationName && this.moduleName) {
      const mainModuleName = this.applicationBuilder.filter((a: any) => a.name == this.applicationName);
      var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
      currentData["applicationName"] = mainModuleName[0].name;
      currentData["moduleName"] = this.moduleName;
      currentData.name = currentData.name.toLowerCase();
      if (this.isSubmit) {
        if (this.applicationName != '' && this.moduleName != '') {
          this.builderService.checkScreenAlreadyExistOrNot(currentData.screenId).subscribe((res => {
            if (res.length == 0) {
              this.builderService.checkScreenAlreadyExistOrNotWithName(currentData.name).subscribe((res1 => {
                if (res1.length == 0) {
                  this.builderService.addScreenModule(currentData).subscribe((res => {
                    this.isVisible = false;
                    this.loadData();
                    this.jsonScreenModuleList();
                    this.toastr.success('Save Successfully!', { nzDuration: 3000 });
                  }))
                }
                else {
                  this.toastr.error('This screen name is already exist!', { nzDuration: 3000 });
                }
              }))
            }
            else {
              this.toastr.error('This screen id is already exist!', { nzDuration: 3000 });
            }
          }))
        }
      }
      else {
        this.builderService.updateScreenModule(this.model.id, currentData).subscribe((res => {
          this.isVisible = false;
          this.isSubmit = true;
          this.loadData();
          this.jsonScreenModuleList();
          this.toastr.success('Update Successfully!', { nzDuration: 3000 });
        }))
      }
    } else {
      this.toastr.error('The field is required!', { nzDuration: 3000 });
    }
  }

  editItem(item: any) {
    this.getModuleList();
    this.model = item;
    this.applicationName = item?.applicationName;
    this.moduleName = item?.moduleName;
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

  search(event?: any): void {
    if (event.target.value) {
      let inputValue = event.target.value.toLowerCase();
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
      (item.screenId.toLowerCase().indexOf(inputValue) !== -1 ||
        item.name.toLowerCase().indexOf(inputValue) !== -1 ||
        (item?.moduleName ? item.moduleName.toLowerCase().indexOf(inputValue) !== -1 : false) ||
        item?.applicationName.toLowerCase().indexOf(inputValue) !== -1)
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

}
