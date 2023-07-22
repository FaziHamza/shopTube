import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { MenuRolePermission } from '../modals/menu-role-permission.modal';

@Component({
  selector: 'st-menu-role-permission',
  templateUrl: './menu-role-permission.component.html',
  styleUrls: ['./menu-role-permission.component.scss']
})
export class MenuRolePermissionComponent implements OnInit {

  requestSubscription: Subscription;
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  menuRolePermissionList: MenuRolePermission[] = [];
  model: any = {};
  screenBuilderList: [] = [];
  menuList: [] = [];
  roleList: [] = [];
  userList: [] = [];

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
          key: 'menuId',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Menu ID',
            placeholder: 'Enter Menu Id',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'menuItem',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'menuItem',
            placeholder: 'Enter Menu Item',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'screenId',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Screen Id',
            placeholder: 'Enter Screen Id',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'admin',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Admin',
            placeholder: 'Enter Admin',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'employee',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Employee',
            placeholder: 'Enter Employee',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'developer',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Developer',
            placeholder: 'Enter Developer',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'designer',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Designer',
            placeholder: 'Enter Designer',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'createdOn',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Created On',
            placeholder: 'Enter Created On',
            required: true,
          }
        }
      ]
    }
  ];
  ngOnInit(): void {
    this.getMenuRolepermission();
    this.getRoles();
    this.getMenus();
    this.getScreenBuilder();
    this.getUsers();
  }
  editRole(rolePermission: any) {
    this.model = JSON.parse(JSON.stringify(rolePermission));
  }
  clearForm() {
    this.model = {};
  }
  getMenuRolepermission() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('MenuRolepermission').subscribe({
      next: (getRes: any) => {
        debugger
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.menuRolePermissionList = getRes.data
          }
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  getRoles() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('role').subscribe({
      next: (getRes: any) => {
        debugger
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
  getMenus() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Menu').subscribe({
      next: (getRes: any) => {
        debugger
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.menuList = getRes.data
          }
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  getScreenBuilder() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/ScreenBuilder').subscribe({
      next: (getRes: any) => {
        debugger
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.screenBuilderList = getRes.data
          }
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  getUsers() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('auth/user').subscribe({
      next: (getRes: any) => {
        debugger
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.userList = getRes.data
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
      this.requestSubscription = this.applicationService.addNestCommonAPI('MenuRolepermission', this.myForm.value).subscribe({
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

  deleteRole(rolePermission: any) {
    this.requestSubscription = this.applicationService.deleteNestCommonAPI('MenuRolepermission', rolePermission._id).subscribe({
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
