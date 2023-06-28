import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApplicationService } from 'src/app/services/application.service';


@Component({
  selector: 'st-app-builder-side-menu',
  templateUrl: './app-builder-side-menu.component.html',
  styleUrls: ['./app-builder-side-menu.component.scss']
})

export class AppBuilderSideMenuComponent implements OnInit {
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

  constructor(private toastr: NzMessageService, private employeeService: EmployeeService, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    if (!this.selectedTheme) {
      this.selectedTheme = this.newSelectedTheme;
      this.getMenu();
    }
    // window.onresize = () => {
    //   this.controlMenu();
    // };
    this.controlMenu();
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
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Menu', "64904a898a251ec02d145c55").subscribe({
      next: (res: any) => {
        if (res.isSuccess)
          if (res.data.length > 0) {
            this.selectedTheme = JSON.parse(res.data[0].selectedTheme);
            this.selectedTheme.allMenuItems = JSON.parse(res.data[0].menuData);
            if (!res[0].selectedTheme.showMenu) {
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
    })
  }
  controlMenu() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 789) {
      this.selectedTheme.showMenu = false;
      this.selectedTheme.rowClass = 'w-full';
    } else {
      this.selectedTheme.rowClass = 'w-10/12';
      this.selectedTheme.showMenu = true;
    }
  }
  collapsed() {
    this.selectedTheme.showMenu = true;
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
}
