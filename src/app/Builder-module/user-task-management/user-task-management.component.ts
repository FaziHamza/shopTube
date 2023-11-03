import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

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
  editId: any = '';
  assignToresponse: any = '';
  userTaskManagement: any = '';
  editObj: any = {};
  saveLoader: boolean = false;
  issueReport: any = [];
  constructor(private toastr: NzMessageService, private applicationService: ApplicationService, public builderService: BuilderService,
    public dataSharedService: DataSharedService,
    private cdr: ChangeDetectorRef) {

  }
  editCache: { [key: string]: { edit: boolean; data: any } } = {};

  ngOnInit(): void {
    this.loadDepartmentData();
    this.getUsers();
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
    
    this.saveLoader = true;
    this.requestSubscription = this.builderService.getUserAssignTask(objScreen ? objScreen.navigation : screenId, applicationId).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            this.data = res.data;
            this.data.forEach((obj: any) => {
              obj.expand = false;
            });
            this.data[0]['children'] = [];
            this.saveLoader = false;
          } else {
            this.toastr.error(`No data against this screen:`, { nzDuration: 3000 });
            this.saveLoader = false;
          }
        }
        else {
          this.toastr.error(`userAssignTask:` + res.message, { nzDuration: 3000 });
          this.saveLoader = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
        this.saveLoader = false;
      }
    })
  }

  data: any = [];

  startEdit(id: any, data: any): void {
    this.editObj = JSON.parse(JSON.stringify(data));
    this.editId = id;
  }

  cancelEdit(data?: any): void {
    data.status = this.editObj.status;
    this.editId = '';
  }

  async saveEdit(data: any) {
    let UserAssignTaskModel = {
      "UserAssignTask": data
    }
    this.saveLoader = true;
    this.requestSubscription = this.applicationService.updateNestCommonAPI('cp/UserAssignTask', data._id, UserAssignTaskModel).subscribe({
      next: (res: any) => {
        if (res) {
          this.toastr.success(`UserAssignTask : ${res.message}`, { nzDuration: 3000 });
          this.getIssues(this.selectDepartmentName[2], this.selectDepartmentName[1]);
          this.editId = '';
          this.saveLoader = false;
        }
      },
      error: (err: any) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserAssignTask : An error occurred`, { nzDuration: 3000 });
        this.saveLoader = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }
  showIssue(data: any): void {
    this.saveLoader = true;
    this.requestSubscription = this.applicationService.getNestCommonAPI("cp/getuserComments/UserComment/pages/" + data.screenId).subscribe({
      next: (res: any) => {
        this.saveLoader = false;
        this.issueReport['issueReport'] = '';
        this.issueReport['showAllComments'] = false;
        if (res.isSuccess && res.data.length > 0) {
          const filterIssue = res.data.filter((rep: any) => rep.componentId === data.componentId);
          if (filterIssue.length > 0) {
            this.userTaskManagement = data;
            this.issueReport['status'] = data['status'];
            this.issueReport['showAllComments'] = true;
            this.issueReport['issueReport'] = filterIssue;
            this.issueReport['id'] = filterIssue[0].componentId;
            this.callAssignee(this.issueReport);
          } else {
            this.saveLoader = false;
            this.toastr.error(`UserComment : No comments against this`, { nzDuration: 3000 });
          }
        }
      },
      error: (err) => {
        this.issueReport['issueReport'] = '';
        this.issueReport['showAllComments'] = false;
        console.error(err); // Log the error to the console
        this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
      }
    });
  }

  getUsers() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/user').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.dataSharedService.usersData = res.data;
        }
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
      }
    });
  }
  callAssignee(data: any) {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/UserAssignTask', data.id).subscribe({
      next: (res: any) => {
        if (res) {
          if (res.data.length > 0) {
            this.assignToresponse = res.data[0];
            // data['dueDate'] = res.data[0]['dueDate'];
            data['assignTo'] = res.data[0]['assignTo'];
            data['startDate'] = res.data[0]['startDate'];
            data['endDate'] = res.data[0]['endDate'];
            data['tags'] = res.data[0]['tags'];
            this.toastr.success(`UserAssignTask : ${res.message}`, { nzDuration: 3000 });
          } else {
            data['dueDate'] = new Date();
            data['dueDate'] = data['dueDate'].toISOString().split('T')[0];
          }
        }
      }, error: (err: any) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserAssignTask : An error occurred`, { nzDuration: 3000 });
      }
    })
  }
  updateIssues(updateData: any) {

    if (updateData) {
      // const elementIndex = this.data.findIndex((element: any) => element._id === updateData.data._id);
      // if (elementIndex !== -1) {
      //   this.data[elementIndex] = updateData.data;
      //   this.data = [...this.data];
      //   this.cdr.detach();
      // }
      // this.screenId = updateData.data.screenId;
      this.getIssues(updateData.data.screenId , updateData.data.applicationId)
    }
  }
}
