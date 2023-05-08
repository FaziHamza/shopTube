import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-company-builder',
  templateUrl: './company-builder.component.html',
  styleUrls: ['./company-builder.component.scss']
})
export class CompanyBuilderComponent implements OnInit {
  applicationName: any;
  model: any;
  fields: any = [];
  copmanyData: any = [];
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
  pageSize = 10;
  searchIcon = "search";
  searchValue = '';
  listOfColumns = [
    {
      name: 'Company Name',
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
    this.jsonCompanyBuilder();
  }

  applicationBuilderForm() {
    this.builderService.applicationBuilderForm().subscribe((res => {
      this.fields = res;
    }));
  }
  jsonCompanyBuilder() {
    this.loading = true
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.listOfDisplayData = res;
      this.listOfData = res;
      this.loading = false;
      this.copmanyData = res;
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
  }
  onSubmit() {
    if (this.form.valid) {
      if (this.isSubmit) {
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.addCompanyBuilder(currentData).subscribe((res => {
          this.loadData();
          this.jsonCompanyBuilder();
          this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });
        }))
      }
      else {
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        this.builderService.updateCompanyBuilder(this.model.id, currentData).subscribe((res => {
          this.loadData();
          this.jsonCompanyBuilder();
          this.isSubmit = true;
        }))
      }
    }
    this.handleCancel();
  }
  editItem(item: any) {
    this.model = item;
    this.applicationName = item?.applicationName;
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.builderService.deleteCompanyBuilder(id).subscribe((res => {
      this.jsonCompanyBuilder();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };
  search(event?: any): void {
    debugger
    if (event.target.value) {
      this.isShow = false;
      this.listOfDisplayData = this.listOfData.filter((item: any) => (item.name).toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
      this.searchIcon = "close";
    } else {
      this.listOfDisplayData = this.listOfData;
      this.searchIcon = "search";
    }
  }

  clearModel(){
    if(this.searchIcon == "close" && this.searchValue){
      this.searchValue = '';
      this.listOfDisplayData = this.listOfData;
      this.searchIcon = "search";
    }
  }

  downloadJson() {
    let obj = Object.assign({}, this.copmanyData);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }

}
