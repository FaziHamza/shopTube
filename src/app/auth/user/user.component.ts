import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { RegisterComponent } from '../register/register.component';

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
  edit: any = null;
  updateModel: any = {};

  getUsers() {
    this.loading = true;
    this.applicationService.getNestCommonAPI('cp/user').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.listOfData = res.data;
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
    this.edit = data._id;
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
    this.applicationService.updateNestCommonAPI('cp/auth/updateUser', data._id, data).subscribe({
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
    this.applicationService.deleteNestCommonAPI('auth', data._id).subscribe({
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

}
