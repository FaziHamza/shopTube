import { Component, OnInit } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-user-task-management',
  templateUrl: './user-task-management.component.html',
  styleUrls: ['./user-task-management.component.scss']
})
export class UserTaskManagementComponent implements OnInit {
  selectDepartmentName: any = [];
  departmentData: any = [];
  selectApplicationName: any = '';
  screens: any;
  applicationData: any = [];
  requestSubscription: Subscription;
  _id: any = "";
  constructor(private toastr: NzMessageService, private applicationService: ApplicationService) {
    this.data.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  editCache: { [key: string]: { edit: boolean; data: any } } = {};

  ngOnInit(): void {
    this.loadDepartmentData();
  }
  onDepartmentChange(departmentId: any) {
    if (departmentId.length === 3 ) {
      if(departmentId[2] != 'selectScreen'){
        this.getScreenData(departmentId[2])
      }
    }
  }
  async loadDepartmentData(): Promise<void> {
    try {
      const res = await this.applicationService.getNestCommonAPI('cp/Department').toPromise();
      if (res?.isSuccess) {
        debugger
        this.departmentData = res.data?.map((data: any) => {
          return {
            label: data.name,
            value: data._id
          };
        });
        let header = {
          label: 'Select Department',
          value: 'selectDepartment'
        }
        this.departmentData.unshift(header)
      } else {
        this.toastr.error(`Department:`, { nzDuration: 3000 });
      }
    } catch (err) {
      console.error('Department: An error occurred');
      this.toastr.error('Department: An error occurred', { nzDuration: 3000 });
    }
  }
  async loadData(node: NzCascaderOption, index: number): Promise<void> {
    if (index == 1 && node.value != 'selectApplication') {
      // Root node - Load application data
      try {
        this.selectApplicationName = node.value;
        const res = await this.applicationService.getNestCommonAPIById('cp/ScreenBuilder', node.value).toPromise();
        if (res.isSuccess) {
          this.screens = res.data;
          const screens = res.data.map((screenData: any) => {
            return {
              label: screenData.name,
              value: screenData._id,
              isLeaf: true
            };

          });
          node.children = screens;
          let header = {
            label: 'Select Screen',
            value: 'selectScreen'
          }
          screens.unshift(header)
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      } catch (err) {
        this.toastr.error('An error occurred while loading application data', { nzDuration: 3000 });
      }
    }
    else if (index === 0 && node.value != 'selectDepartment') {
      try {
        const res = await this.applicationService.getNestCommonAPIById('cp/Application', node.value).toPromise();
        if (res.isSuccess) {
          this.selectApplicationName = "";
          this.applicationData = res.data;
          const applications = res.data.map((appData: any) => {
            return {
              label: appData.name,
              value: appData._id,
              isLeaf: false
            };
          });
          node.children = applications;
          let header = {
            label: 'Select Application',
            value: 'selectApplication'
          }
          applications.unshift(header)
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      } catch (err) {
        console.error('Error loading screen data:', err);
        this.toastr.error('An error occurred while loading screen data', { nzDuration: 3000 });
      }
    }
  }
  getScreenData(data: any) {
    const objScreen = this.screens.find((x: any) => x._id == data);
    this._id = objScreen._id;
    this.getBuilderScreen();
  }
  getBuilderScreen() {
    // this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', this._id).subscribe({
    //   next: (res: any) => {
    //     if (res.isSuccess) {

    //     }
    //   },
    //   error: (err) => {
    //     console.error(err); // Log the error to the console
    //     this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //   }
    // });
  }
  data: any[] = [
    { id: 1, issue: 'Issue 1', status: 'open' },
    { id: 2, issue: 'Issue 2', status: 'progress' },
    { id: 3, issue: 'Issue 3', status: 'complete' },
    { id: 4, issue: 'Issue 4', status: 'inprogress' },
    { id: 5, issue: 'Issue 5', status: 'close' },
  ];
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.data.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.data[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.data.findIndex(item => item.id === id);
    Object.assign(this.data[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }
  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }
}
