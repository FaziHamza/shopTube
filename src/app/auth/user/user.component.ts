import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(
    private applicationService: ApplicationService,
    private toastr: NzMessageService,

  ) { }
  ngOnInit(): void {
    this.getUsers()
  }
  loading: boolean = false;
  listOfData: any[] = [];
  edit: any = null;
  updateModel: any = {};

  getUsers() {
    debugger
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
    for(const key in this.updateModel){
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
}
