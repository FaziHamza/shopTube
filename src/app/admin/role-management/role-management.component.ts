import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { Role } from '../modals/role-modal';

@Component({
  selector: 'st-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})

export class RoleManagementComponent implements OnInit {
  requestSubscription: Subscription;
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  roleList: Role[] = [];
  model: any = {};

  constructor(private applicationService: ApplicationService, private toastr: NzMessageService) { }

  fields = [
    {
      fieldGroup: [
        {
          key: '_id',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'ID',
            placeholder: '',
            readonly: true
          }
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Name',
            placeholder: 'Enter role name',
            required: true,
          }
        }
      ]
    },
  ];
  ngOnInit(): void {
    this.getRoles();
  }
  editRole(role: any) {
    this.model = JSON.parse(JSON.stringify(role));
  }
  clearForm() {
    this.model = {};
  }
  getRoles() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('role').subscribe({
      next: (getRes: any) => {
        
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.roleList = getRes.data
          }
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  submitRole() {
    if (this.myForm.valid) {
      
      if (this.myForm.value._id == "")
        this.myForm.value._id = undefined
      this.requestSubscription = this.applicationService.addNestCommonAPI('role', this.myForm.value).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.clearForm();
            this.toastr.success(`Role: ${res.message}`, { nzDuration: 3000 });
            this.getRoles();
          }
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    }
  }

  deleteRole(role: any) {
    this.requestSubscription = this.applicationService.deleteNestCommonAPI('role', role._id).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`Role: ${res.message}`, { nzDuration: 3000 });
          this.getRoles();
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
}
