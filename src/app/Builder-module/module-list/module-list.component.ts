import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  moduleList: any;
  applicationName: any;
  applicationBuilder: any;
  model: any;
  fields: any = [];
  applicationData: any = [];
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
  listOfColumns = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Application',
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
  constructor(public builderService: BuilderService, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.jsonModuleSetting();
    this. moduleSettingForm();
    this.loadData();
  }
  moduleSettingForm() {
    this.builderService.moduleSettingForm().subscribe((res => {
      this.fields = res;
    }));
  }
  jsonModuleSetting() {
    this.builderService.jsonModuleSetting().subscribe((res => {
      debugger
      this.moduleList = res;
      this.listOfDisplayData = res;
      this.listOfData = res;
    }));
  }
  openModal() {
    this.isVisible = true;
    if (!this.isSubmit) {
      this.isSubmit = true;
      this.loadData();
    }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  loadData() {
    var daata = {
      name: '',
    };
    this.model = daata;
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      this.applicationBuilder = res;
    }));
  }
  onSubmit() {
    if (this.form.valid) {
      if (this.isSubmit) {
        const mainModuleName = this.applicationBuilder.filter((a: any) => a.name == this.applicationName)
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        currentData["applicationName"] =mainModuleName[0].name;
        this.builderService.addModule(currentData).subscribe((res => {
          this.loadData();
          this.jsonModuleSetting();
          this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });
        }))
      }
      else {
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.updateApplicationBuilder(this.model.id, currentData).subscribe((res => {
          this.loadData();
          this.jsonModuleSetting();
          this.isSubmit = true;
        }))
      }
    }
    this.handleCancel();
  }
  editItem(item: any) {
    debugger
    this.model = item;
    this.applicationName = item?.applicationName;
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    debugger
    this.builderService.deletejsonModule(id).subscribe((res => {
      this.jsonModuleSetting();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    debugger
    this.isShow = false;
    this.listOfDisplayData = this.listOfData.filter((item: any) => item.name.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
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

}
