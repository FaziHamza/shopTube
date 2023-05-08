import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  pageSize = 10;
  searchIcon = "search";
  searchValue = '';
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
    this.model = daata;
    this.companyName = '';
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.companyBuilder = res;
    }));
  }
  onSubmit() {
    debugger
    if (this.form.valid) {
      if (this.isSubmit) {
        const mainModuleName = this.companyBuilder.filter((a: any) => a.name == this.companyName)
        var currentData = JSON.parse(JSON.stringify(this.model) || '{}');
        currentData["companyName"] = mainModuleName[0].name;
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
    this.model = item;
    this.companyName = item?.companyName;
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.builderService.deleteApplicationBuilder(id).subscribe((res => {
      this.jsonApplicationBuilder();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };
  search(event?: any): void {
    debugger
    if (event.target.value) {
      let inputValue = event.target.value.toLowerCase();
      this.listOfDisplayData = this.listOfData.filter((item: any) =>
        (item.name.toLowerCase().indexOf(inputValue) !== -1 ||  (item?.companyName ? item.companyName.toLowerCase().indexOf(inputValue) !== -1 : false))
      );
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
    let obj = Object.assign({}, this.applicationData);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }

  

}
