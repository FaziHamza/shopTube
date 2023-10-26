import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'st-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.scss']
})
export class UserMappingComponent {
  policyName = '';
  policyList: any = [];
  listOfDisplayData: any = [];
  listOfData: any[] = [];
  userName = '';
  userList: any = [];
  isSubmit: boolean = true;
  loader: boolean = false;
  loading = false;
  pageSize = 10;
  pageIndex: any = 1;
  totalItems: number = 0; // Total number of items
  startIndex = 1;
  endIndex: any = 10;
  listOfColumns = [
    {
      name: 'Id',
    },
    {
      name: 'User Name',
    },
    {
      name: 'Policy Name',
    },
    {
      name: 'Actions',
    },
  ];
  constructor(
    public builderService: BuilderService,
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService,
    private toastr: NzMessageService,
  ) {
  }
  ngOnInit(): void {
    this.loadUserData();
    this.jsonModuleList(); // To get policy list
  }


  jsonModuleList() {
    this.loader = true;

    forkJoin([
      this.applicationService.getNestCommonAPI('cp/Policy'),
      this.applicationService.getNestCommonAPI('cp/user'),
    ]).subscribe({
      next: ([policyRes, userRes]) => {
        this.loader = false;

        if (policyRes.isSuccess) {
          this.policyList = policyRes?.data;
        }

        if (userRes.isSuccess) {
          this.userList = userRes?.data;
        }
      },
      error: (err) => {
        this.loader = false;
        this.toastr.error('An error occurred', { nzDuration: 3000 });
      },
    });
  }

  loadUserData() {
    this.loader = true;
    this.applicationService.getNestCommonAPI('cp/UserMapping').subscribe({
      next: (res: any) => {
        this.loader = false;
        if (res.isSuccess) {
          if (res?.data.length > 0) {
            const transformedData = res.data.map((item: any) => ({
              _id: item._id,
              policyId: item?.policyId?._id,
              policyName: item?.policyId?.name,
              userId: item?.userId?._id,
              userName: item?.userId?.username,
              applicationId: item.applicationId,
            }));
            this.listOfData = transformedData;
            this.handlePageChange(1);
          }
        }
      },
      error: (err) => {
        this.loader = false;
        this.toastr.error(`Policy : An error occured`, { nzDuration: 3000 });
      },
    });
  }

  onSubmit() {
    if (!this.policyName || !this.userName) {
      if (!this.policyName) {
        this.toastr.warning('Please Select Policy Name', { nzDuration: 2000 });
        this.loading = false;
        return;
      }
      if (!this.userName) {
        this.toastr.warning('Please Select User', { nzDuration: 2000 });
        this.loading = false;
        return;
      }
    } else {
      let findPreviousUser = this.listOfData.find(a => a.policyId == this.policyName && a.userId == this.userName);
      if (findPreviousUser) {
        this.toastr.warning('This user already assign this policy please select another.', { nzDuration: 2000 });
        this.loading = false;
        return;
      }

      let obj = {
        UserMapping: {
          policyId: this.policyName,
          userId: this.userName,
          applicationId: JSON.parse(localStorage.getItem('applicationId')!),
        }
      }
      this.loader = true;
      const checkPolicyAndProceed = this.isSubmit
        ? this.applicationService.addNestCommonAPI('cp', obj)
        : this.applicationService.updateNestCommonAPI('cp/UserMapping', this.editId, obj);
      checkPolicyAndProceed.subscribe({
        next: (objTRes: any) => {
          this.loader = false;
          if (objTRes.isSuccess) {
            this.loadUserData();
            this.policyName = "";
            this.userName = "";
            this.toastr.success(objTRes.message, { nzDuration: 3000 });
            if (!this.isSubmit) {
              this.isSubmit = true;
            }
          } else {
            this.toastr.error(objTRes.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.loader = false;
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
  }
  editId: any
  editItem(item: any) {
    this.editId = item._id;
    this.policyName = item.policyId;
    this.userName = item.userId;
    this.isSubmit = false;
  }
  deleteRow(id: any): void {
    this.loader = true;
    this.applicationService.deleteNestCommonAPI('cp/UserMapping', id).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.isSuccess) {
          this.loadUserData();
          this.toastr.success(`UserMapping: ${res.message}`, { nzDuration: 2000, });
        } else this.toastr.error(`UserMapping: ${res.message}`, { nzDuration: 2000, });
      },
      error: (err) => {
        this.loading = false;
        console.log(err.message)
        this.toastr.error(`UserMapping: ${err.message}`, { nzDuration: 2000, });
      },
    });

  }
  downloadJson() {
    let obj = Object.assign({}, this.listOfData);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.';
    document.body.appendChild(a);
    a.click();
  }
  handlePageChange(event: number): void {
    this.pageSize = !this.pageSize || this.pageSize < 1 ? 1 : this.pageSize
    this.pageIndex = event;
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.startIndex = start == 0 ? 1 : ((this.pageIndex * this.pageSize) - this.pageSize) + 1;
    this.listOfDisplayData = this.listOfData.slice(start, end);
    this.endIndex = this.listOfDisplayData.length != this.pageSize ? this.listOfData.length : this.pageIndex * this.pageSize;
  }
}
