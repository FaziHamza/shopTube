import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.scss']
})
export class UserMappingComponent {
  policyName = '';
  policyList: any = [];
  userName = '';
  userList: any = [];
  isSubmit: boolean = true;
  loading = false;
  constructor(
    public builderService: BuilderService,
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService,
    private toastr: NzMessageService,
  ) {
  }
  ngOnInit(): void {
    this.jsonPolicyModuleList();
    this.jsonUserModuleList();
  }


  jsonPolicyModuleList() {
    this.applicationService.getNestCommonAPI('cp/Policy').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res?.data.length > 0) {
            this.policyList = res.data;
          }
        }
      },
      error: (err) => {
        this.toastr.error(`Policy : An error occured`, { nzDuration: 3000 });
      },
    });
  }
  jsonUserModuleList() {
    this.applicationService.getNestCommonAPI('cp/user').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res?.data.length > 0) {
            this.userList = res.data;
          }
        }
      },
      error: (err) => {
        this.toastr.error(`Policy : An error occured`, { nzDuration: 3000 });
      },
    });
  }
  onSubmit() {
    debugger



    if (!this.policyName || !this.userName) {
      if (!this.policyName) {
        this.toastr.warning(
          'Please Select Policy Name',
          { nzDuration: 2000 }
        );
        this.loading = false;
        return;
      }
      if (!this.userName) {
        this.toastr.warning(
          'Please Select User',
          { nzDuration: 2000 }
        );
        this.loading = false;
        return;
      }
    } else {


      let obj = {
        UserMapping: {
          policyId: this.policyName,
          userId: this.userName,
          applicationId: JSON.parse(localStorage.getItem('applicationId')!),
        }
      }

      const checkPolicyAndProceed = this.isSubmit
        ? this.applicationService.addNestCommonAPI('cp', obj)
        : this.applicationService.updateNestCommonAPI('cp/UserMapping', 1, obj);
      checkPolicyAndProceed.subscribe({
        next: (objTRes: any) => {
          if (objTRes.isSuccess) {

            const message = this.isSubmit ? 'Save' : 'Update';
            this.toastr.success(objTRes.message, { nzDuration: 3000 });
            if (!this.isSubmit) {
              this.isSubmit = true;
            }
          } else {
            this.toastr.error(objTRes.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
  }
}
