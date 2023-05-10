import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  moduleList: any;
  model: any;
  jsonScreenModule: any = [];
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
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      screenId: new FormControl('', Validators.required),
      applicationName: new FormControl('', Validators.required),
      moduleName: new FormControl('', Validators.required),
    });
    const applicationNameControl = this.form.get('applicationName');
    if (applicationNameControl !== null) {
      applicationNameControl.valueChanges.subscribe(value => {
        this.getModulelist(value);
      });
    }

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
      if (this.searchValue) {
        this.search(this.searchValue);
      }
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
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationBuilder = res;
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
    // this.builderService.checkScreen(this.form.value).subscribe((result) => {
    //   if (result) {
    //     const message = result.type === 'name'
    //       ? `Screen name '${result.value}' already exists in the database. Please choose a different name.`
    //       : `Screen ID '${result.value}' already exists in the database. Please choose a different ID.`;
    //     this.toastr.warning(message, { nzDuration: 2000 });
    //     this.loading = false;
    //   } else {

    //   }
    // });
  }


  editItem(item: any) {
    this.getModuleList();
    this.model = item;
    this.form.patchValue({
      name: item.name,
      screenId: item.screenId,
      applicationName: item.applicationName,
      moduleName: item.moduleName,
    });
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
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
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
