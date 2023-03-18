import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'app-application-builder',
  templateUrl: './application-builder.component.html',
  styleUrls: ['./application-builder.component.scss']
})
export class ApplicationBuilderComponent implements OnInit {

  applicationName: any;
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
      name: 'Application Name',
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
  constructor(public builderService: BuilderService, public dataSharedService: DataSharedService, private toastr: NzMessageService, private router: Router,) { }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.applicationBuilderForm();
    this.loadData();
    // this.getModuleList();
   this.jsonApplicationBuilder();

  }

  applicationBuilderForm() {
    this.builderService.applicationBuilderForm().subscribe((res => {
      this.fields = res;
    }));
  }
  jsonApplicationBuilder() {
    this.loading = true
    this.builderService.jsonApplicationBuilder().subscribe((res => {
      debugger
      this.listOfDisplayData = res;
      this.listOfData = res;
      this.loading = false;
      this.applicationData = res;

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
    // this.builderService.jsonApplicationBuilder().subscribe((res => {
    //   debugger
    // }));
    this.model = daata;
  }
  onSubmit() {
    if (this.form.valid) {
      if (this.isSubmit) {
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.addApplicationBuilder(currentData).subscribe((res => {
          this.loadData();
          this.jsonApplicationBuilder();
          this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });
        }))
      }
      else {
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.updateApplicationBuilder(this.model.id, currentData).subscribe((res => {
          this.loadData();
          this.jsonApplicationBuilder();
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
    this.builderService.deleteApplicationBuilder(id).subscribe((res => {
      this.jsonApplicationBuilder();
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

  sort(property: string | number) {
    debugger
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    this.applicationData.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

}
