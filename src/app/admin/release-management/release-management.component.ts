import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { Release } from '../modals/release.model';

@Component({
  selector: 'st-release-management',
  templateUrl: './release-management.component.html',
  styleUrls: ['./release-management.component.scss']
})
export class ReleaseManagementComponent implements OnInit {
  requestSubscription: Subscription;
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  releaseList: Release[] = [];
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
          key: 'date',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Date',
            type: "datetime-local",
          }
        }
      ]
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
          key: 'version',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Version',
            placeholder: 'Enter version',
            required: true,
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'status',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Status',
            placeholder: 'Enter status',
            required: true,
          }
        }
      ]
    },
  ];
  ngOnInit(): void {
    this.getRelease();
  }
  editRelease(objRelease: any) {
    this.model = JSON.parse(JSON.stringify(objRelease));
  }
  clearForm() {
    this.model = {};
  }
  getRelease() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Release').subscribe({
      next: (getRes: any) => {
        
        if (getRes.isSuccess) {
          if (getRes.data.length > 0) {
            this.releaseList = getRes.data
          }
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  submitRelease() {
    if (this.myForm.valid) {
      
      if (this.myForm.value._id == "" || this.myForm.value._id == undefined) {
        this.myForm.value._id = undefined
        this.model._id = undefined
      }

      const releaseModel = {
        Release: this.myForm.value,
      };
      const addOrUpdateRelease$ = this.model._id == undefined
        ? this.applicationService.addNestCommonAPI('cp', releaseModel)
        : this.applicationService.updateNestCommonAPI(
          'cp/Release',
          this.model._id,
          releaseModel
        );

      this.requestSubscription = addOrUpdateRelease$.subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.clearForm();
            this.toastr.success(`Task: ${res.message}`, { nzDuration: 3000 });
            this.getRelease();
          }
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    }
  }

  deleteRelease(objRelease: any) {
    this.requestSubscription = this.applicationService.deleteNestCommonAPI('cp/Release', objRelease._id).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`Task: ${res.message}`, { nzDuration: 3000 });
          this.getRelease();
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
}
