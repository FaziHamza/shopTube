import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-task-management-list',
  templateUrl: './task-management-list.component.html',
  styleUrls: ['./task-management-list.component.scss']
})
export class TaskManagementListComponent implements OnInit {
  tasks: any = [];
  editId: any = '';
  editObj: any = {};
  Object = Object;
  requestSubscription: Subscription;
  saveLoader: boolean = false;
  issueReport: any = [];
  assignToresponse: any = '';
  userTaskManagement: any = '';
  chartData: any = [];
  constructor(private applicationService: ApplicationService, private toastr: NzMessageService, public dataSharedService: DataSharedService,) { }

  ngOnInit(): void {
    this.getUsers();
    this.getTasks();
  }

  getTasks() {
    
    this.saveLoader = true;
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/getuserCommentsCurrentMonth/UserComment').subscribe({
      next: (res: any) => {
        this.saveLoader = false;
        if (res.isSuccess && res.data?.length > 0) {

          this.tasks = res.data.filter((a: any) => a.parentId == '' || a.parentId == undefined);
          let groupedData = this.tasks;
          this.tasks = groupedData;
          let newData = JSON.parse(JSON.stringify(groupedData));
          this.chartData = this.groupDataByStatus(newData)
        }
      },
      error: (err) => {
        this.saveLoader = false;
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
            data['startDate'] = res.data[0]['startDate'];
            data['endDate'] = res.data[0]['endDate'];
            data['tags'] = res.data[0]['tags'];
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
  groupDataByWeek(data: any[]): any[] {
    // Create an object to store data for each week
    const groupedData: { [week: string]: any[] } = {};

    // Iterate through the data and group it by week
    data.forEach((item) => {
      const date = new Date(item.dateTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Month is 0-indexed
      const weekNumber = this.getISOWeek(date);

      // Convert the week number to a string for grouping
      const weekLabel = `Week ${this.getWeekNumberInMonth(date)}`;
      const weekKey = `${year}-${month}-${weekLabel}`;
      const weekStartDate = this.getWeekStartDate(date);
      const weekEndDate = this.getWeekEndDate(date);

      if (!groupedData[weekKey]) {
        groupedData[weekKey] = [];
      }

      groupedData[weekKey].push({
        ...item,
        weekLabel: weekLabel,
        weekStartDate: weekStartDate.toISOString(),
        weekEndDate: weekEndDate.toISOString(),
      });
    });

    // Convert the grouped data object to an array
    const result = Object.keys(groupedData).map((key) => ({
      week: key.split('-').slice(-1)[0], // Extract the week label
      issues: groupedData[key],
      weekStartDate: groupedData[key][0].weekStartDate,
      weekEndDate: groupedData[key][0].weekEndDate,
    }));

    return result;
  }

  // Function to get the ISO week number
  getISOWeek(date: Date): number {
    const d: any = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart: any = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  // Function to get the start date of the week
  getWeekStartDate(date: Date): Date {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay() + 1);
    return d;
  }

  // Function to get the end date of the week
  getWeekEndDate(date: Date): Date {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay() + 7);
    return d;
  }

  // Function to get the week number in the month
  getWeekNumberInMonth(date: Date): number {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const days = date.getDate();
    const weekNumber = Math.ceil((days + firstDay.getDay()) / 7);
    return weekNumber;
  }
  groupDataByStatus(data: any[]): any[] {
    return data.map((weekData) => {
      const statusGroups: { [status: string]: any[] } = {
        open: [],
        completed: [],
        inProgress: [],
        closed: [],
      };

      weekData.issues.forEach((issue : any) => {
        const status = issue.status;

        // Push the issue to the corresponding status array
        if (status in statusGroups) {
          statusGroups[status].push(issue);
        }
      });

      return {
        week: weekData.week,
        issues: statusGroups,
        weekStartDate: weekData.weekStartDate,
        weekEndDate: weekData.weekEndDate,
      };
    });
  }


}
