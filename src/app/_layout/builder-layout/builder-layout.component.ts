import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-builder-layout',
  templateUrl: './builder-layout.component.html',
  styleUrls: ['./builder-layout.component.scss']
})
export class BuilderLayoutComponent implements OnInit {
  selectedTheme: any;
  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  tabs: any = [];
  dropdown: any = [];
  menus: any = [];
  requestSubscription: Subscription;
  currentUser: any;
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
  menuStringify = {
    "_id": {
      "$oid": "649053c6ad28a951f554e688"
    },
    "name": "64a910940ab8ae224f887a9b",
    "selectedTheme": "{\"topHeaderMenu\":\"w-1/6\",\"topHeader\":\"w-10/12\",\"menuMode\":\"inline\",\"menuColumn\":\"w-1/6\",\"rowClass\":\"w-10/12\",\"horizontalRow\":\"flex flex-wrap\",\"layout\":\"vertical\",\"colorScheme\":\"light\",\"layoutWidth\":\"fluid\",\"layoutPosition\":\"fixed\",\"topBarColor\":\"light\",\"sideBarSize\":\"default\",\"siderBarView\":\"sidebarViewDefault\",\"sieBarColor\":\"light\",\"siderBarImages\":\"\",\"checked\":false,\"theme\":false,\"isCollapsed\":false,\"newMenuArray\":[],\"menuChildArrayTwoColumn\":[],\"isTwoColumnCollapsed\":false,\"allMenuItems\":[],\"showMenu\":true,\"font\":\"font-roboto\",\"buttonIcon\":\"fa-regular fa-bars\",\"buttonIconType\":\"font_awsome\",\"buttonPosition\":\"right\",\"buttonClassArray\":[],\"showButton\":true,\"showLogo\":true,\"inPageMenu\":{\"font\":\"font-roboto\"}}",
    "menuData": "[{\"id\":\"Menu_fc755327\",\"key\":\"menu_6672d980\",\"title\":\"Add Organization\",\"link\":\"/builder/organization-builder\",\"icon\":\"fa-light fa-house\",\"type\":\"input\",\"isTitle\":false,\"expanded\":true,\"color\":\"\",\"children\":[],\"selected\":false,\"expand\":false,\"iconType\":\"font_awsome\"},{\"id\":\"Menu_d52b29dc\",\"key\":\"menu_fb67e615\",\"title\":\"Add Department\",\"link\":\"/builder/application-builder\",\"icon\":\"fa-light fa-grid-2\",\"type\":\"input\",\"isTitle\":false,\"expanded\":true,\"color\":\"\",\"children\":[],\"selected\":false,\"expand\":false,\"iconType\":\"font_awsome\"},{\"id\":\"Menu_7f02bcc5\",\"key\":\"menu_842b25b7\",\"title\":\"Add Menu\",\"link\":\"/builder/menu-builder\",\"icon\":\"fa-light fa-bars\",\"type\":\"input\",\"isTitle\":false,\"expanded\":true,\"color\":\"\",\"children\":[],\"selected\":false,\"expand\":false,\"iconType\":\"font_awsome\"},{\"id\":\"Menu_94f1dfd5\",\"key\":\"menu_94d1fcb1\",\"title\":\"Add Screen\",\"link\":\"/builder/screen-builder\",\"icon\":\" fa-light fa-signal-bars-fair\",\"type\":\"input\",\"isTitle\":false,\"expanded\":true,\"color\":\"\",\"children\":[],\"selected\":false,\"expand\":false,\"iconType\":\"font_awsome\"},{\"id\":\"Menu_1ffcf5e1\",\"key\":\"menu_15ff0dc0\",\"title\":\"Builder\",\"link\":\"/builder\",\"icon\":\"fa-light fa-star\",\"type\":\"input\",\"isTitle\":false,\"expanded\":true,\"color\":\"\",\"children\":[],\"selected\":false,\"expand\":false,\"iconType\":\"font_awsome\"},{\"id\":\"menu_55571686\",\"key\":\"menu_a00bbfa5\",\"title\":\"Dashboard\",\"link\":\"/\",\"icon\":\"fa-light fa-envelope\",\"type\":\"input\",\"isTitle\":false,\"children\":[],\"selected\":false,\"expand\":false,\"iconType\":\"font_awsome\"}]",
    "applicationId": {
      "$oid": "64a910940ab8ae224f887a9b"
    },
    "__v": 0
  }
  constructor(private toastr: NzMessageService, private employeeService: EmployeeService, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    if (!this.selectedTheme) {
      this.selectedTheme = this.newSelectedTheme;
      this.getMenu();
    }
    this.menus = JSON.parse(this.menuStringify.menuData);
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
            this.selectedTheme = res.data[0].selectedTheme ? JSON.parse(res.data[0].selectedTheme) : this.newSelectedTheme;
            this.collapsed();
            this.selectedTheme.allMenuItems = JSON.parse(res.data[0].menuData);
            if (!res.data[0].selectedTheme.showMenu) {
              this.selectedTheme['showMenu'] = true;
            }
            this.makeMenuData();
            this.notifyEmit({ emitData: true, screenType: "desktop" })
          }
          else {
            this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Menu', "64a910940ab8ae224f887a9b").subscribe({
              next: (res: any) => {
                if (res.isSuccess)
                  if (res.data.length > 0) {
                    this.selectedTheme = res.data[0].selectedTheme ? JSON.parse(res.data[0].selectedTheme) : this.newSelectedTheme;
                    this.collapsed();
                    this.selectedTheme.allMenuItems = JSON.parse(res.data[0].menuData);
                    if (!res.data[0].selectedTheme.showMenu) {
                      this.selectedTheme['showMenu'] = true;
                    }
                    this.makeMenuData();
                    this.notifyEmit({ emitData: true, screenType: "desktop" })
                  }
                  else {
                    this.selectedTheme = this.newSelectedTheme;
                    this.collapsed();
                    // this.newSelectedTheme.allMenuItems = [];
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
}
