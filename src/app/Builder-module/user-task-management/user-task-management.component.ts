import { Component, OnInit } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';

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
  editId: any = '';
  editObj: any = {};
  constructor(private toastr: NzMessageService, private applicationService: ApplicationService, public builderService: BuilderService,) {

  }
  editCache: { [key: string]: { edit: boolean; data: any } } = {};

  ngOnInit(): void {
    this.loadDepartmentData();
  }


  onDepartmentChange(departmentId: any) {
    if (departmentId.length === 3) {
      if (departmentId[2] != 'selectScreen') {
        this.getIssues(departmentId[2], departmentId[1])
      }
    }
  }
  async loadDepartmentData(): Promise<void> {
    try {
      const res = await this.applicationService.getNestCommonAPI('cp/Department').toPromise();
      if (res?.isSuccess) {
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
  getIssues(screenId: string, applicationId: string) {
    const objScreen = this.screens.find((x: any) => x._id == screenId);
    const data = this.builderService.getUserAssignTask(objScreen.navigation, applicationId).subscribe((res: any) => {
      res.issue
      this.data = res.data;
      this.data.forEach((obj: any) => {
        obj.expand = false;
      });
      this.data[0]['children'] = [];
      let obj =
      {

        "_id":
          "64d64d428909734e2f0a24d3",
        "screenId": "CakeForm",
        "dueDate": "2023-08-11",
        "status": "open",
        "organizationId": "64abfde576ac2e992aa14d75",
        "applicationId": "64c7cf48c577c6286a78ce45",
        "componentId": "cakeform_input_22a7f843",
        "createdBy": "zubairv@gmail.com",
        "assignTo": "zubairv2@gmail.com",
      }
      this.data[0]['children'].push(obj);
      console.log(this.data);
    })
  }

  data: any = [];

  startEdit(id: any, data: any): void {
    this.editObj = JSON.parse(JSON.stringify(data));
    this.editId = id;
    this.editObj.status = data.status;

  }

  cancelEdit(data?: any, index?: any): void {
    debugger
    this.data[index] = this.editObj;
    this.data[index].status = this.editObj.status;
    // data = this.editObj
    this.editId = '';
  }

  saveEdit(id: number): void {
    const index = this.data.findIndex((item: any) => item._id === id);
    Object.assign(this.data[index], this.editId.data);
    this.editId = '';
    const updatedTask = this.applicationService.updateNestCommonAPI(this.data, id, this.editId).subscribe((res: any) => {
      if (res.isSuccess) {
        this.toastr.success(res.message, { nzDuration: 3000 });
      } else {
        this.toastr.error(res.message, { nzDuration: 3000 });
      }
    })
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }


}
