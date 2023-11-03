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
  menuRolePermissionList: any[] = [];
  model: any = {};
  screenBuilderList: [] = [];
  menuList: any[] = [];
  roleList: any[] = [];
  userList: [] = [];

  constructor(private applicationService: ApplicationService, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.getApiData();
  }
  getApiData() {
    this.getMenuRolepermission();
    this.getRoles();
    this.getMenus();
    this.getScreenBuilder();
    this.getUsers();
  }
  getMenuRolepermission() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('MenuRolepermission').subscribe({
      next: (getRes: any) => {
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
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.menuList = getRes.data.map((menu: any) => {
              return {
                ...menu,
                permissions: {} // Initialize the 'permissions' property as an empty object
              };
            });
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

  submitRole(menu: any) {
    const separatedPermissions = this.separatePermissions(menu.permissions);
    const objData = {
      menuId: menu._id,
      menuItem: menu.menuData,
      screenId: "64a2652f757c8f4b56440a54",
      ...separatedPermissions,
      createdOn: this.formatDateTime()
    }
    this.requestSubscription = this.applicationService.addNestCommonAPI('MenuRolepermission', objData).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`Menu Role Permission: ${res.message}`, { nzDuration: 3000 });
          this.getApiData();
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  bulkUpdate() {
    
  }

  separatePermissions(permissions: any): any {
    const result: any = {};
    Object.entries(permissions).forEach(([permissionKey, permissionValue]) => {
      const [roleName, permissionType] = permissionKey.split('_');

      if (permissionValue) {
        if (!result[roleName]) {
          result[roleName] = [permissionType];
        } else {
          result[roleName].push(permissionType);
        }
      }
    });

    return result;
  }
  formatDateTime() {
    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const formattedHour = hour % 12 || 12;

    // Add leading zeros to day, month, hour, minute, and second if necessary
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHourStr = formattedHour < 10 ? '0' + formattedHour : formattedHour;
    const formattedMinute = minute < 10 ? '0' + minute : minute;
    const formattedSecond = second < 10 ? '0' + second : second;

    // Combine the formatted components into the desired format
    return `${formattedMonth}/${formattedDay}/${year}, ${formattedHourStr}:${formattedMinute}:${formattedSecond} ${ampm}`;
  }
  // deleteRole(rolePermission: any) {
  //   this.requestSubscription = this.applicationService.deleteNestCommonAPI('MenuRolepermission', rolePermission._id).subscribe({
  //     next: (res: any) => {
  //       if (res.isSuccess) {
  //         this.toastr.success(`Role: ${res.message}`, { nzDuration: 3000 });
  //         this.getApiData();
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //       this.toastr.error("An error occurred", { nzDuration: 3000 });
  //     }
  //   });
  // }
}
