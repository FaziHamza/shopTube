import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApplicationService } from 'src/app/services/application.service';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';

// import { Component } from '@angular/core';

import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}

@Component({
  selector: 'st-builder-design-layout',
  templateUrl: './builder-design-layout.component.html',
  styleUrls: ['./builder-design-layout.component.scss']
})
export class BuilderDesignLayoutComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  selectedTheme: any;
  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  tabs: any = [];
  dropdown: any = [];
  requestSubscription: Subscription;
  newSelectedTheme = {
    topHeaderMenu: 'w-1/6',
    topHeader: 'w-10/12',
    menuMode: 'inline',
    menuColumn: 'w-2/12',
    rowClass: 'w-11/12',
    horizontalRow: 'flex flex-wrap',
    layout: 'vertical',
    colorScheme: 'light',
    layoutWidth: 'fluid',
    layoutPosition: 'fixed',
    topBarColor: 'light',
    sideBarSize: 'default',
    siderBarView: 'sidebarViewDefault',
    sieBarColor: 'light',
    siderBarImages: '',
    checked: false,
    theme: false,
    isCollapsed: false,
    newMenuArray: [],
    menuChildArrayTwoColumn: [],
    isTwoColumnCollapsed: false,
    allMenuItems: [],
    showMenu: true,
  }
  isCollapsed = false;
  currentUser: any;
  constructor(private toastr: NzMessageService, private employeeService: EmployeeService, private applicationService: ApplicationService, private nzContextMenuService: NzContextMenuService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    if (!this.selectedTheme) {
      this.selectedTheme = this.newSelectedTheme;
      this.getMenu();
    }
  }
  toggleCollapsed(): void {

    if (this.selectedTheme.layout == 'twoColumn') {
      this.selectedTheme.isTwoColumnCollapsed = !this.selectedTheme.isTwoColumnCollapsed;
      if (this.selectedTheme.isTwoColumnCollapsed) {
        this.selectedTheme.menuColumn = 'w-1/6';
      } else if (!this.selectedTheme.isTwoColumnCollapsed) {
        this.selectedTheme.menuColumn = 'w-1/5';
      }
    }
    else {
      this.selectedTheme.isCollapsed = !this.selectedTheme.isCollapsed;
    }
    if (this.selectedTheme.isCollapsed == true && this.selectedTheme.layout != 'twoColumn') {
    }
    else if (!this.selectedTheme.isCollapsed) {
      this.selectedTheme.menuColumn = 'w-2/12';
    }
  }

  notifyEmit(data: any) {

    if (data.screenType) {
      if (data.screenType == 'desktop') {
        this.selectedTheme.showMenu = true;
        this.selectedTheme.isCollapsed = data.emitData;
        if (this.selectedTheme.isCollapsed) {
          this.selectedTheme.topHeaderMenu = 'w-1/12';
          this.selectedTheme.topHeader = 'w-full';
          this.selectedTheme.menuColumn = '';
          this.selectedTheme.rowClass = 'w-full';
        }
        else {
          this.selectedTheme.menuColumn = 'w-1/6';
          this.selectedTheme.rowClass = 'w-10/12';
          this.selectedTheme.topHeaderMenu = 'w-1/6';
          this.selectedTheme.topHeader = 'w-10/12';
        }

      } else if (data.screenType == 'mobile') {
        this.selectedTheme.showMenu = data.emitData;
      }
    }
    else {
      if (data.emitData.selectedTheme) {
        this.selectedTheme = data.emitData.selectedTheme
      }
      else {
        this.selectedTheme = this.newSelectedTheme;
      }
      this.selectedTheme.allMenuItems = data.emitData.menuData;
      this.makeMenuData();
    }
  }
  notifyEmitForDropdown(data: any) {
    this.tabs = [];
    data.children.forEach((i: any) => {
      if (i.type == 'mainTab') {
        this.tabs.push(i);
      }
    });
  }

  loadTabsAndButtons(data: any) {
    data.isOpen = !data.isOpen;
    this.tabs = [];
    this.dropdown = [];
    this.selectedTheme.menuChildArrayTwoColumn = [];
    if (data.children.length > 0) {
      data.children.forEach((i: any) => {
        if (this.selectedTheme.layout == 'twoColumn') {
          this.selectedTheme.rowClass = 'w-10/12';
          this.selectedTheme.menuColumn = 'w-2/12';
          this.selectedTheme.menuChildArrayTwoColumn.push(i);
        }
        if (i.type == 'mainTab') {
          this.tabs.push(i);
        }
        else if (i.type == 'dropdown') {
          this.dropdown.push(i);
        }
      });
    }
    else if (this.selectedTheme.layout == 'twoColumn') {
      this.selectedTheme.rowClass = 'w-11/12';
      this.selectedTheme.menuColumn = '-w-1/12';
    }
  }

  makeMenuData() {
    let arrayList = [];
    arrayList = this.selectedTheme.allMenuItems;
    this.selectedTheme.newMenuArray = [];
    this.selectedTheme.newMenuArray = [];
    if (this.selectedTheme.allMenuItems.length > 7 && this.selectedTheme.layout == 'horizental') {
      this.selectedTheme.newMenuArray = [{
        label: "More",
        icon: "down",
        id: 'menu_428605c1',
        key: 'menu_0f7d1e4e',
        children: []
      }]
      const withOutTitle = this.selectedTheme.allMenuItems.filter((a: any) => a.isTitle != true);
      this.selectedTheme.newMenuArray[0].children = withOutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((a: any) => a.isTitle != true).slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }
  getMenu() {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/CacheMenu', this.currentUser.userId).subscribe({
      next: (res: any) => {
        if (res.isSuccess)
          if (res.data.length > 0) {
            this.selectedTheme = JSON.parse(res.data[0].selectedTheme);
            this.selectedTheme.allMenuItems = JSON.parse(res.data[0].menuData);
            if (!res.data[0].selectedTheme.showMenu) {
              this.selectedTheme['showMenu'] = true;
            }
            this.makeMenuData();
            this.notifyEmit({ emitData: true, screenType: "desktop" })
          }
          else {
            this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Menu', "64904a898a251ec02d145c55").subscribe({
              next: (res: any) => {
                if (res.isSuccess)
                  if (res.data.length > 0) {
                    this.selectedTheme = JSON.parse(res.data[0].selectedTheme);
                    this.selectedTheme.allMenuItems = JSON.parse(res.data[0].menuData);
                    if (!res.data[0].selectedTheme.showMenu) {
                      this.selectedTheme['showMenu'] = true;
                    }
                    this.makeMenuData();
                    this.notifyEmit({ emitData: true, screenType: "desktop" })
                  }
                  else
                    this.newSelectedTheme.allMenuItems = [];
                else
                  this.toastr.error(res.message, { nzDuration: 3000 });
              },
              error: (err) => {
                console.error(err);
                this.toastr.error("An error occurred", { nzDuration: 3000 });
              }
            });
          }
        else
          this.toastr.error(res.message, { nzDuration: 3000 });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  collapsed() {
    this.selectedTheme.isCollapsed = !this.selectedTheme?.isCollapsed
    if (this.selectedTheme.isCollapsed) {
      this.selectedTheme.topHeaderMenu = 'w-1/12';
      this.selectedTheme.topHeader = 'w-full';
      this.selectedTheme.menuColumn = '';
      this.selectedTheme.rowClass = 'w-full';
    }
    else {
      this.selectedTheme.menuColumn = 'w-1/6';
      this.selectedTheme.rowClass = 'w-10/12';
      this.selectedTheme.topHeaderMenu = 'w-1/6';
      this.selectedTheme.topHeader = 'w-10/12';
    }
  }
  mobileViewCollapseInHostCom() {
    this.selectedTheme.showMenu = !this.selectedTheme.showMenu;
  }
  activatedNode?: NzTreeNode;
  nodes = [
    {
      title: 'parent 0',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      children: [
        { title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true }
      ]
    },
    {
      title: 'parent 1',
      key: '101',
      author: 'NG ZORRO',
      children: [
        { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true }
      ]
    }
  ];

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
  fields: any = [
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Name',
            placeholder: 'File Name'
          },
        },
      ],
    },
  ];

  // table
  listOfColumns: any[] = [
    {
      name: 'Check',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: '',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },

    {
      name: '',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: '',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: '',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'ID',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: '',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: '',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: '',
      width: "40px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Subject',
      width: "100px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Requester Name',
      width: "140px",

      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Created Date',
      width: "100px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Status',
      width: "100px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Priority',
      width: "100px",
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },


  ];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  sortByAge(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Age') {
        item.sortOrder = 'descend';
      } else {
        item.sortOrder = null;
      }
    });
  }

  resetFilters(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Name') {
        item.listOfFilter = [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' }
        ];
      } else if (item.name === 'Address') {
        item.listOfFilter = [
          { text: 'London', value: 'London' },
          { text: 'Sidney', value: 'Sidney' }
        ];
      }
    });
  }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach(item => {
      item.sortOrder = null;
    });
    this.resetFilters();
  }
  visible = false;
  size: 'large' | 'default' = 'default';

  get title(): string {
    return `${this.size} Drawer`;
  }

  showDefault(): void {
    this.size = 'default';
    this.open();
  }

  showLarge(): void {
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
