import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Guid } from 'src/app/models/guid';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'st-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  @Input() menuItems: any = [];
  @Input() selectedTheme: any;

  // menuItems: MenuItem[] = [];
  // newMenuArray: any = false;
  tabs: any = [];
  dropdown: any = [];
  requestSubscription: Subscription;
  newSelectedTheme = {
    topHeaderMenu: 'w-1/6',
    topHeader: 'w-10/12',
    menuMode: 'inline',
    menuColumn: 'w-2/12',
    rowClass: 'w-10/12',
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
  // selectedTheme: any;

  constructor(private employeeService: EmployeeService, public dataSharedService: DataSharedService, public builderService: BuilderService,
    private toastr: NzMessageService,) { }

  ngOnInit(): void {
    if (!this.selectedTheme) {
      this.selectedTheme = this.newSelectedTheme;
      this.getMenu();
    }
    window.onresize = () => {
      this.controlMenu();
    };
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
      // this.selectedTheme.topHeaderMenu = 'w-1/12';
      // this.selectedTheme.topHeader = 'w-11/12';
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
          this.selectedTheme.menuColumn = 'w-1/12';
          this.selectedTheme.rowClass = 'w-11/12';
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
      // let newData = JSON.parse(JSON.stringify(this.selectedTheme));
      // this.selectedTheme = this.selectedTheme;
    }
    else {
      if (data.emitData.selectedTheme) {
        this.selectedTheme = data.emitData.selectedTheme
      }
      else {
        this.selectedTheme = this.newSelectedTheme;
      }
      this.selectedTheme.allMenuItems = data.emitData.menuData;
      // this.newMenuArrayFunc();
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
    debugger
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
    // this.selectedTheme.allMenuItems = [];
    this.selectedTheme.newMenuArray = [];
    this.selectedTheme.newMenuArray = [];
    if (this.selectedTheme.allMenuItems.length > 7 && this.selectedTheme.layout == 'horizental') {
      this.selectedTheme.newMenuArray = [{
        label: "More",
        icon: "down",
        subMenu: []
      }]
      const withOutTitle = this.selectedTheme.allMenuItems.filter((a: any) => a.isTitle != true);
      this.selectedTheme.newMenuArray[0].subMenu = withOutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((a: any) => a.isTitle != true).slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }
  getMenu() {
    this.requestSubscription = this.builderService.genericApis('jsonApplication').subscribe({
      next: (res) => {
        if (res.length > 0) {
          let menus : any = [];
          debugger
          res.forEach((element: any) => {
            let newID = element.name.replace('','_')
            const newNode = {
              id: newID + '_' + Guid.newGuid(),
              key: newID + '_' + Guid.newGuid(),
              title: element.name,
              link: '',
              icon: "appstore",
              type: "input",
              isTitle: false,
              expanded: true,
              color: "",
              application:true,
              children: [
              ],
            }
            menus.push(newNode);
          });
          this.selectedTheme.allMenuItems = menus;
          if (!res[0]?.selectedTheme?.showMenu) {
            this.selectedTheme['showMenu'] = true;
          }
          this.makeMenuData();
          // this.menuItems.forEach((e: any) => {
          //   e["menuIcon"] = "up"
          // });
        }
        else
          this.newSelectedTheme.allMenuItems = [];
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }

    });
  }
  controlMenu() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 789) {
      // this.selectedTheme.isCollapsed = true;
      this.selectedTheme.showMenu = false;
      this.selectedTheme.rowClass = 'w-full';
      // this.selectedTheme.isCollapsed = true;
    } else {
      // this.selectedTheme.isCollapsed = false;
      this.selectedTheme.rowClass = 'w-10/12';
      this.selectedTheme.showMenu = true;
      // this.selectedTheme.topHeaderMenu = 'w-1/6';
      // this.selectedTheme.topHeader = 'w-10/12';
    }
  }
}

