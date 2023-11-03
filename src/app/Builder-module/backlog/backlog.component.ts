import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  tasks: any = [];
  editId: any = '';
  editObj: any = {};
  Object = Object;
  requestSubscription: Subscription;
  saveLoader: boolean = false;
  issueReport: any = [];
  assignToresponse: any = '';
  userTaskManagement: any = '';
  constructor(private applicationService: ApplicationService, private toastr: NzMessageService, public dataSharedService: DataSharedService,) { }

  ngOnInit(): void {
    this.getUsers();
    this.getTasks();
  }

  getTasks() {
    this.requestSubscription =  this.applicationService.callApi('knex-query/getAction/65007a2dc5215fa775985f98', 'get', '', '', '').subscribe({
      next: (res: any) => {
        
        if (res.isSuccess && res.data?.length > 0) {

          this.tasks = res.data
        }
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
      }
    });
  }
  startEdit(id: any, data: any): void {
    // Create a deep copy of data and assign it to this.editObj
    this.editObj = JSON.parse(JSON.stringify(data));
    this.editId = id;
  }

  cancelEdit(data?: any): void {
    if (data) {
      // Restore the original data from this.editObj
      Object.assign(data, JSON.parse(JSON.stringify(this.editObj)));
    }
    this.editId = '';
  }


  async saveEdit(data: any) {
    data.dateTime = new Date();
    let UserCommentModel = {
      "UserComment": data
    }
    this.saveLoader = true;
    this.requestSubscription = this.applicationService.updateNestCommonAPI('cp/UserComment', data._id, UserCommentModel).subscribe({
      next: (res: any) => {
        if (res) {
          this.toastr.success(`UserComment : ${res.message}`, { nzDuration: 3000 });
          this.getTasks();
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
  deleteTask(data: any) {
    this.saveLoader = true;
    this.requestSubscription = this.applicationService.deleteNestCommonAPI('cp/UserComment', data._id).subscribe({
      next: (res: any) => {
        if (res) {
          this.toastr.success(`UserComment : ${res.message}`, { nzDuration: 3000 });
          this.getTasks();
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
  updateIssues(updateData: any) {
    if (updateData) {
      this.getTasks();
    }
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
  callAssignee(data: any) {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/UserAssignTask', data.id).subscribe({
      next: (res: any) => {
        if (res) {
          if (res.data.length > 0) {
            this.assignToresponse = res.data[0];
            data['dueDate'] = res.data[0]['dueDate'];
            data['assignTo'] = res.data[0]['assignTo'];
            // this.toastr.success(`UserAssignTask : ${res.message}`, { nzDuration: 3000 });
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

}
