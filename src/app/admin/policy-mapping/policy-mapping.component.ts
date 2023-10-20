import { Component, OnInit } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-policy-mapping',
  templateUrl: './policy-mapping.component.html',
  styleUrls: ['./policy-mapping.component.scss']
})
export class PolicyMappingComponent implements OnInit {
  
  paginatedData: any[] = [];
  model: any;
  isSubmit: boolean = true;
  breadCrumbItems!: Array<{}>;
  menuOfDisplayData: any[] = [];
  loading = false;
  searchValue = '';
  pageSize = 10;
  searchIcon = "search";
  pageIndex: any = 1;
  totalItems: number = 0; // Total number of items
  startIndex = 1;
  endIndex: any = 10;

  //detail
  menuList: any[] = [];
  policyMenuList: any[] = [];
  applicationMenuList: any[] = [];
  currentUser: any;
  applications: any;
  applicationName: any;
  selectedAppId: any = "";
  applicationId: string = '';
  selectDepartmentName: any = [];
  departmentData: any = [];
  departments: any[] = [];
  listOfColumns = [
    {
      name: 'Menu Name',
    },
    {
      name: 'Create',
    },
    {
      name: 'Read',
    },
    {
      name: 'Update',
    },
    {
      name: 'Delete',
    },
  ];
  constructor(
    public builderService: BuilderService,
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService,
    private toastr: NzMessageService,
    private modalService: NzModalService,
  ) {
  }
  ngOnInit(): void {
    this.totalItems = this.menuOfDisplayData.length;
    this.breadCrumbItems = [
      { label: 'Formly' },
      { label: 'Pages', active: true }
    ];
    this.jsonPolicyModuleList();
    this.getDepartments();
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
  }
  policyName = '';
  policyList: any = [];
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

  onSubmit() {
    if (!this.policyName) {
      this.toastr.warning(
        'Please Select Policy Name',
        { nzDuration: 2000 }
      );
      this.loading = false;
      return;
    } else {
      if (this.menuList.length == 0) {
        this.toastr.warning(
          'Please Select Menu',
          { nzDuration: 2000 }
        );
        return;
      }
      const newData = this.menuList.map(item => ({
        ...item,
        policyId: this.policyName,
        applicationId: this.applicationId,
      }));
      const filteredObjects = newData.filter(item => item.create || item.update || item.delete || item.read || item._id);
      this.loading = true;

      const checkPolicyAndProceed = this.isSubmit
        ? this.applicationService.addNestCommonAPI('policy-mapping', filteredObjects)
        : this.applicationService.updateNestCommonAPI('policy-mapping', this.model._id, filteredObjects);
      checkPolicyAndProceed.subscribe({
        next: (objTRes: any) => {
          this.loading = false;
          if (objTRes.isSuccess) {
            this.getPolicyMenu();
            this.toastr.success(objTRes.message, { nzDuration: 3000 });
            if (!this.isSubmit) {
              this.isSubmit = true;
            }
          } else {
            this.toastr.error(objTRes.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
  }


  downloadJson() {
    let obj = Object.assign({}, this.menuList);
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
    this.menuOfDisplayData = this.menuList.slice(start, end);
    this.endIndex = this.menuOfDisplayData.length != this.pageSize ? this.menuList.length : this.pageIndex * this.pageSize;
  }


  onDepartmentChange(departmentId: any) {
    if (departmentId.length === 2) {
      if (departmentId[1] != 'selectApplication') {
        this.selectedAppId = departmentId[1];
        this.getMenus(departmentId[1])
      }
    }
    else if (departmentId.length === 1) {
      const selectedNode = this.departmentData.find((a: any) => a.value == departmentId[0]);
      if (selectedNode.children && selectedNode?.children?.length > 0) {
        selectedNode.children = [];
        this.loadData(selectedNode, 0);
      }
    }
  }
  async loadData(node: NzCascaderOption, index: number): Promise<void> {
    if (index === 0 && node.value != 'selectDepartment') {
      try {
        const res = await this.applicationService.getNestCommonAPIById('cp/Application', node.value).toPromise();
        if (res.isSuccess) {
          this.applications = res.data;
          const applications = res.data.map((appData: any) => {
            return {
              label: appData.name,
              value: appData._id,
              isLeaf: true
            };
          });
          let header = {
            label: 'Select Application',
            value: 'selectApplication'
          }
          applications.unshift(header)
          node.children = applications;
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      } catch (err) {
        console.error('Error loading screen data:', err);
        this.toastr.error('An error occurred while loading screen data', { nzDuration: 3000 });
      }
    }
  }
  getDepartments() {
    this.applicationService.getNestCommonAPI('cp/Department').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            this.departments = res.data;
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
          } 
          else {
            this.departments = [];
            this.departmentData = [];
          }
        }
        else
          this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
      }
    });
  };


  getMenus(id: any) {
    this.applicationService.getNestCommonAPIById('cp/Menu', id).subscribe(((res: any) => {
      if (res.isSuccess) {
        if (res.data.length > 0) {
          this.applicationId = res.data[0]._id
          const menuList = JSON.parse(res.data[0].menuData);
          const booleanObject = {
            create: false,
            read: false,
            update: false,
            delete: false,
          };
          const newData = menuList.map((item: any) => ({
            ...item,
            ...booleanObject,
            screenId:item.link,
            menuId: item.id,
          }));
          this.applicationMenuList = newData;
        } else {
          this.toastr.warning('No menu againts this', { nzDuration: 3000 });
        }
      } else
        this.toastr.error(res.message, { nzDuration: 3000 });
    }));
  }
  getPolicyMenu() {
    debugger
    if (!this.policyName) {
      this.toastr.error("Please select policy name", { nzDuration: 3000 });
      return;
    }
    this.applicationService.getNestCommonAPIById('policy-mapping/policy' , this.policyName).subscribe(((res: any) => {
      if (res)
        this.policyMenuList = res.data || [];

      this.updatedMenuList();
    }));
  }
  updatedMenuList() {
    let updatedData = this.applicationMenuList;
    if (this.policyMenuList && this.policyMenuList?.length > 0) {
      const obj2Map = new Map(this.policyMenuList.map(item => [item.menuId, item]));

      updatedData = this.applicationMenuList.map(item => {
        const obj2Item = obj2Map.get(item.id);
        return obj2Item ? { ...item, ...obj2Item } : item;
      });
    }

    this.menuList = JSON.parse(JSON.stringify(updatedData));
    this.handlePageChange(1);
    // console.log(updatedData);

  }

  deleteAllPolicy() {
    if (!this.policyName) {
      this.toastr.warning('Please Select Policy Name', { nzDuration: 2000 });
      return;
    }
    if (this.menuList.length == 0) {
      this.toastr.warning('Please Select Menu', { nzDuration: 2000 });
      return;
    }
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete all records?',
      nzClassName: 'custom-modal-class',
      nzCentered: true,
      nzOnOk: () => {
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
          this.applicationService.deleteNestApi(`policy-mapping/${this.policyName}/${this.applicationId}`).subscribe(
            {
              next: (objTRes: any) => {
                if (objTRes.isSuccess) {
                  this.getPolicyMenu();
                  this.toastr.success(objTRes.message, { nzDuration: 3000 });
                } else {
                  this.toastr.error(objTRes.message, { nzDuration: 3000 });
                }
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
              },
            }
          )
        })
          .catch(() => false)
      },
      nzOnCancel: () => {
        // this.navigation = this.previousScreenId ? this.previousScreenId : this.navigation;
        console.log('User clicked Cancel');
      }
    });
  }
  selectAll(){
    const updatedDat = this.menuOfDisplayData.map((item) => ({
      ...item,
      create: true,
      update: true,
      read: true,
      delete: true,
    }));
    this.menuOfDisplayData = updatedDat
    const updatedData = this.menuList.map((item) => ({
      ...item,
      create: true,
      update: true,
      read: true,
      delete: true,
    }));
    this.menuList = updatedData;
  }
}