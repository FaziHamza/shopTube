import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  applicationData: any = [];
  schema: any;
  isSubmit: boolean = true;
  breadCrumbItems!: Array<{}>;
  isVisible: boolean = false;
  listOfData: any = [];
  listOfDisplayData: any = [];
  loading = false;
  pageSize = 10;
  searchIcon = "search";
  searchValue = '';
  myForm: FormGroup;
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
    this.myForm.reset();
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
      this.companyBuilder = res;
    }));
  }
  onSubmit() {
    if (this.myForm.valid) {
      if (this.isSubmit) {
        this.builderService.addApplicationBuilder(this.myForm.value).subscribe((res => {
          this.jsonApplicationBuilder();
          this.toastr.success('Your data has been Saved.', { nzDuration: 2000 });
        }))
      }
      else {
        this.builderService.updateApplicationBuilder(this.model.id, this.myForm.value).subscribe((res => {
          this.loadData();
          this.jsonApplicationBuilder();
          this.isSubmit = true;
          this.toastr.success('Data upodate successfully!.', { nzDuration: 2000 });
        }))
      }
    }
    this.handleCancel();
  }

  editItem(item: any) {
    this.myForm.patchValue({
      name: item.name,
      companyName: item.companyName
    });
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
        (item.name.toLowerCase().indexOf(inputValue) !== -1 || (item?.companyName ? item.companyName.toLowerCase().indexOf(inputValue) !== -1 : false))
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



}
