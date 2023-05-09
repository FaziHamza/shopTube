import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  copmanyData: any = [];
  schema: any;
  isSubmit: boolean = true;
  form: FormGroup;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
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
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.jsonCompanyBuilder();
  }
  jsonCompanyBuilder() {
    this.loading = true
    this.builderService.jsonCompanyBuilder().subscribe((res => {
      this.listOfDisplayData = res;
      this.listOfData = res;
      this.loading = false;
      this.copmanyData = res;
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
 
  onSubmit() {
    if (this.form.valid) {
      if (this.isSubmit) {
        this.builderService.addCompanyBuilder(this.form.value).subscribe((res => {
          this.jsonCompanyBuilder();
          this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });
        }))
      }
      else {
        this.builderService.updateCompanyBuilder(this.model.id, this.form.value).subscribe((res => {
          this.jsonCompanyBuilder();
          this.isSubmit = true;
        }))
      }
    }
    this.handleCancel();
  }
  editItem(item: any) {
    this.form.patchValue({
      name: item.name,
    });
    this.model = item;
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.builderService.deleteCompanyBuilder(id).subscribe((res => {
      this.jsonCompanyBuilder();
      this.toastr.success('Your data has been deleted.', { nzDuration: 2000 });
    }))
  };
  search(event?: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) => (item.name).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
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
