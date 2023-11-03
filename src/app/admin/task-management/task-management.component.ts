import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Task } from '../modals/task.model';
import { ApplicationService } from 'src/app/services/application.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Release } from '../modals/release.model';

@Component({
  selector: 'st-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {
  requestSubscription: Subscription;
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  releaseList: Release[] = [];
  screenList: any[] = [];
  taskList: Task[] = [];
  userList: any[] = [];
  fields: any = [];
  model: any = {};

  constructor(private applicationService: ApplicationService, private toastr: NzMessageService) { }
  getFields() {
    
    const userOptions = this.userList.map((item: any) => ({
      label: item.username,
      value: item._id,
    }));
    const releaseOptions = this.releaseList.map((item: any) => ({
      label: `${item.name} ${item.version} ${item.date} ${item.week}`,
      value: item._id,
    }));
    const screenOptions = this.screenList.map((item: any) => ({
      label: `${item.name}`,
      value: item._id,
    }));

    this.fields = [
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
      {
        fieldGroup: [
          {
            key: 'description',
            type: 'input',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Description',
              placeholder: 'Enter description',
              required: false,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'assigned_to',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Assigned To',
              placeholder: 'Select Assigned To',
              options: userOptions,
              required: true,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'release_id',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Release Version',
              placeholder: 'Select Release Version',
              options: releaseOptions,
              required: true,
            }
          }
        ]
      },
      {
        fieldGroup: [
          {
            key: 'screenId',
            type: 'select',
            wrappers: ["formly-vertical-theme-wrapper"],
            defaultValue: '',
            props: {
              label: 'Screen Name',
              placeholder: 'Select Screen name',
              options: screenOptions,
              required: true,
            }
          }
        ]
      },
    ];
  }

  ngOnInit(): void {
    this.getTasks();
    this.getScreenBuilder();
    this.getUsers();
    this.getRelease();
  }
  editTask(role: any) {
    this.model = JSON.parse(JSON.stringify(role));
  }
  clearForm() {
    this.model = {};
  }
  getTasks() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Task').subscribe({
      next: (getRes: any) => {
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.taskList = getRes.data
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
    this.requestSubscription = this.applicationService.getNestCommonAPI('auth/users').subscribe({
      next: (getRes: any) => {
        if (getRes) {
          this.userList = getRes
          this.getFields();
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  getRelease() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Release').subscribe({
      next: (getRes: any) => {
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.releaseList = getRes.data
            this.getFields();
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
            this.screenList = getRes.data
            this.getFields();
          }
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  submitTask() {
    if (this.myForm.valid) {
      if (this.myForm.value._id == "" || this.myForm.value._id == undefined) {
        this.myForm.value._id = undefined
        this.model._id = undefined
      }

      const taskModel = {
        Task: this.myForm.value,
      };

      const addOrUpdateTask$ = this.model._id == undefined
        ? this.applicationService.addNestCommonAPI('cp', taskModel)
        : this.applicationService.updateNestCommonAPI(
          'cp/Task',
          this.model._id,
          taskModel
        );

      this.requestSubscription = addOrUpdateTask$.subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.clearForm();
            this.toastr.success(`Task: ${res.message}`, { nzDuration: 3000 });
            this.getTasks();
          }
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    }
  }

  deleteTask(objTask: any) {
    this.requestSubscription = this.applicationService.deleteNestCommonAPI('cp/Task', objTask._id).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`Task: ${res.message}`, { nzDuration: 3000 });
          this.getTasks();
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
}
