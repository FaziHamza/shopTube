import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { RegisterComponent } from '../register/register.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'st-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  visible = false;
  constructor(
    private applicationService: ApplicationService,
    private toastr: NzMessageService,
    private modal: NzModalService,
    private drawerService: NzDrawerService,
  ) { }
  ngOnInit(): void {
    this.getUsers()
  }
  loading: boolean = false;
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  searchData: any[] = [];
  edit: any = null;
  updateModel: any = {};
  startIndex = 1;
  endIndex: any = 10;
  pageIndex: any = 1;
  pageSize = 10;
  listOfColumns = [
    {
      name: 'User Name',
      key: 'username',
      searchValue: '',
    },
    {
      name: 'Accreditation Number',
      key: 'accreditationnumber',
      visible: false,
      searchValue: '',
    },
    {
      name: 'Status',
      key: 'status',
      searchValue: '',
    },
    {
      name: 'Action',
    },
  ];
  getUsers() {
    this.loading = true;
    this.applicationService.getNestNewCommonAPI(`cp/users`).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.listOfData = res.data;
          this.listOfDisplayData = res.data;
          this.handlePageChange(1);
        }
        else {
          this.toastr.error(res.message, { nzDuration: 2000 });
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }

  editFunc(data: any) {
    this.edit = data.id;
    this.updateModel = JSON.parse(JSON.stringify(data));
  }
  cancelEdit(data: any) {
    for (const key in this.updateModel) {
      data[key] = this.updateModel[key];
    }
    // data = this.updateModel;
    this.edit = null;
  }
  saveEdit(data: any) {
    this.edit = null;
    this.loading = true;
    const tableValue = `users`;
    const obj = {
      [tableValue]: data
    }
    this.applicationService.updateNestNewCommonAPI(`cp/users`, data.id, obj).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          // this.listOfData = res.data;
          this.getUsers();
        }
        else {
          this.toastr.error(res.message, { nzDuration: 2000 });
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }
  delete(data: any) {
    this.loading = true;
    this.applicationService.deleteNestNewCommonAPI(`cp/users`, data.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.isSuccess) {
          this.getUsers();
        }
        else {
          this.toastr.error(res.message, { nzDuration: 2000 });
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }
  showDeleteConfirm(rowData: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Record?',
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzClassName: 'deleteRow',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(rowData),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  drawer() {
    const drawerRef = this.drawerService.create<
      RegisterComponent,
      { value: string },
      string
    >({
      // nzTitle: 'Bulk Update',
      nzWidth: 1000,
      nzContent: RegisterComponent,
      nzContentParams: {
        userAddDrawer: true
      },
    });
    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });
    drawerRef.afterClose.subscribe((data: any) => {
      if (data) {
        this.getUsers();
      }
    });
  }
  searchValue(event: any, column: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.searchData = this.searchData.filter((item: any) => {
        const { key } = column;
        const { [key]: itemName } = item || {}; // Check if item is undefined, set to empty object if so
        return itemName?.toLowerCase()?.includes(inputValue); // Check if itemName is undefined or null
      });
    }
  }
  search(event?: number): void {
    let checkSearchExist = this.listOfColumns.filter(a => a.searchValue);
    if (checkSearchExist.length > 0) {
      this.searchData = this.listOfData;
      checkSearchExist.forEach(element => {
        this.searchValue(element.searchValue, element)
      });
    } else {
      this.searchData = [];
    }
    this.handlePageChange(event ? event : this.pageIndex);
  }
  handlePageChange(event: number): void {
    this.pageSize = !this.pageSize || this.pageSize < 1 ? 1 : this.pageSize
    this.pageIndex = event;
    this.startIndex = (this.pageIndex - 1) * this.pageSize;
    const start = (this.pageIndex - 1) * this.pageSize;
    this.endIndex = start + this.pageSize;
    const end = start + this.pageSize;
    this.startIndex = start == 0 ? 1 : ((this.pageIndex * this.pageSize) - this.pageSize) + 1;
    this.listOfDisplayData = this.searchData.length > 0 ? this.searchData.slice(start, end) : this.listOfData.slice(start, end);
    this.endIndex = this.listOfDisplayData.length != this.pageSize ? this.listOfData.length : this.pageIndex * this.pageSize;
  }
}
