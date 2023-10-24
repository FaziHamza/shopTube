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
    {
      name: 'Hide',
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
      const filteredData = this.findObjectsWithPermissions(this.menuList);
      const newData = filteredData.map(item => ({
        ...item,
        policyId: this.policyName,
        applicationId: this.applicationId,
      }));
      const checkPolicyAndProceed = this.isSubmit
        ? this.applicationService.addNestCommonAPI('policy-mapping', newData)
        : this.applicationService.updateNestCommonAPI('policy-mapping', this.model._id, newData);
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

  findObjectsWithPermissions(data: any[]): any[] {
    const result: any[] = [];
    for (const item of data) {
      if (item.create || item.update || item.read || item.delete) {
        result.push(item);
      }

      if (item.children && item.children.length > 0) {
        const childResults = this.findObjectsWithPermissions(item.children);
        result.push(...childResults);
      }
    }
    return result;
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
          
          const newData =  this.applyBooleanToArray(menuList,booleanObject);
          console.log(newData);
          this.applicationMenuList = newData;
        } else {
          this.toastr.warning('No menu againts this', { nzDuration: 3000 });
        }
      } else
        this.toastr.error(res.message, { nzDuration: 3000 });
    }));
  }
  applyBooleanToArray(data: any[], booleanObject: any): any[] {
    return data.map((item: any) => this.applyBooleanToObject(item, booleanObject));
  }
  applyBooleanToObject(data: any, booleanObject: any): any {
    // Apply the booleanObject to the current object
    const newData = {
      ...data,
      ...booleanObject,
      screenId: data.link,
      menuId: data.id,
      expand: false,
    };

    if (data.children && data.children.length > 0) {
      // If the current object has children, apply the booleanObject recursively to each child
      newData.children = data.children.map((child: any) =>
        this.applyBooleanToObject(child, booleanObject)
      );
    }

    return newData;
  }
  getPolicyMenu() {
    debugger
    if (!this.policyName) {
      this.toastr.error("Please select policy name", { nzDuration: 3000 });
      return;
    }
    this.applicationService.getNestCommonAPIById('policy-mapping/policy', this.policyName).subscribe(((res: any) => {
      if (res)
        this.policyMenuList = res.data || [];

      this.updatedMenuList();
    }));
  }
  updatedMenuList() {
    let updatedData = this.applicationMenuList;
    // if (this.policyMenuList && this.policyMenuList?.length > 0) {
    //   const obj2Map = new Map(this.policyMenuList.map(item => [item.menuId, item]));

    //   updatedData = this.applicationMenuList.map(item => {
    //     const obj2Item = obj2Map.get(item.id);
    //     return obj2Item ? { ...item, ...obj2Item } : item;
    //   });
    // }

    // this.menuList = JSON.parse(JSON.stringify(updatedData));
    const updatedMenuData = this.mergePolicyIntoMenu(updatedData, this.policyMenuList);
    this.menuList = JSON.parse(JSON.stringify(updatedMenuData));
    console.log(updatedMenuData);
    
    // this.handlePageChange(1);

  }
// Define a function to merge policy data into menu data recursively
  mergePolicyIntoMenu(menuData: any[], policyData: any[]) {
    return menuData.map(menuItem => {
      const matchingPolicyItem = policyData.find(policyItem => policyItem.menuId === menuItem.menuId);

      if (matchingPolicyItem) {
        matchingPolicyItem.screenId = menuItem.link;
        // Merge policy data into the menu item
        const mergedItem = { ...menuItem, ...matchingPolicyItem };

        // Check if the menu item has children and merge recursively
        if (menuItem.children && menuItem.children.length > 0) {
          mergedItem.children = this.mergePolicyIntoMenu(menuItem.children, policyData);
        }

        return mergedItem;
      }

      return menuItem; // No policy data found, return menu item as is
    });
  }

// Call the function to merge policy data into menu data

// updatedMenuData now contains the merged data

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
  selectAll() {
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