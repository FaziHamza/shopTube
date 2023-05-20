import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
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
  tabs: any = [];
  dropdown: any = [];
  modules: any = [];
  menuList: any = [];
  applicationRouting: any = '';
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
    private toastr: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMenu();
    if (!this.selectedTheme) {
      this.selectedTheme = this.newSelectedTheme;
    }
    this.dataSharedService.urlModule.subscribe(({ aplication, module }) => {
      if (module) {
        this.getAllMenu();
        const filteredMenu = this.menuList.filter((item: any) => item.moduleName == module);
        if (filteredMenu.length > 0) {
          this.selectedTheme = filteredMenu[0].selectedTheme || this.newSelectedTheme;
          this.selectedTheme.allMenuItems = filteredMenu[0].menuData;
          if (!filteredMenu[0].selectedTheme?.showMenu) {
            this.selectedTheme.showMenu = true;
          }
          this.makeMenuData();
        } else {
          this.selectedTheme.allMenuItems = [];
        }
      }
    });
    window.onresize = () => {
      this.controlMenu();
    };
    this.controlMenu();
  }
  // toggleCollapsed(): void {

  //   if (this.selectedTheme.layout == 'twoColumn') {
  //     this.selectedTheme.isTwoColumnCollapsed = !this.selectedTheme.isTwoColumnCollapsed;
  //     if (this.selectedTheme.isTwoColumnCollapsed) {
  //       this.selectedTheme.menuColumn = 'w-1/6';
  //     } else if (!this.selectedTheme.isTwoColumnCollapsed) {
  //       this.selectedTheme.menuColumn = 'w-1/5';
  //     }
  //   }
  //   else {
  //     this.selectedTheme.isCollapsed = !this.selectedTheme.isCollapsed;
  //   }
  //   if (this.selectedTheme.isCollapsed == true && this.selectedTheme.layout != 'twoColumn') {
  //     // this.selectedTheme.topHeaderMenu = 'w-1/12';
  //     // this.selectedTheme.topHeader = 'w-11/12';
  //   }
  //   else if (!this.selectedTheme.isCollapsed) {
  //     this.selectedTheme.menuColumn = 'w-2/12';
  //   }
  // }


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
  // notifyEmitForDropdown(data: any) {

  //   this.tabs = [];
  //   data.children.forEach((i: any) => {
  //     if (i.type == 'mainTab') {
  //       this.tabs.push(i);
  //     }
  //   });
  // }

  loadTabsAndButtons(data: any) {

    this.tabs = [];
    this.dropdown = [];
    this.modules = [];
    this.selectedTheme.menuChildArrayTwoColumn = [];
    if (Array.isArray(data)) {
      this.modules = JSON.parse(JSON.stringify(data));
    }
    else if (data.children.length > 0) {
      data.isOpen = !data.isOpen;
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
          let menus: any = [];

          res.forEach((element: any) => {
            let newID = element.applicationId ? element.applicationId : element.name.replace(/\s+/g, '-');
            const newNode = {
              id: newID,
              key: newID,
              title: element.name,
              link: '',
              icon: "appstore",
              type: "input",
              isTitle: false,
              expanded: true,
              color: "",
              application: true,
              children: [
              ],
            }
            menus.push(newNode);
          });
          this.selectedTheme.allMenuItems = menus;
          if (!res[0]?.selectedTheme?.showMenu) {
            this.selectedTheme['showMenu'] = true;
          }
          // this.getAllMenu();
        }
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

  getAllMenu() {
    this.requestSubscription = this.builderService.genericApis('jsonModuleSetting').subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.menuList = res;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }

  callMenus(api?: any) {
    debugger
    const filterdMenu = this.menuList.filter((item: any) => item.moduleName
      == api.name);
    if (filterdMenu.length > 0) {
      this.selectedTheme = filterdMenu[0].selectedTheme ? filterdMenu[0].selectedTheme : this.newSelectedTheme;
      this.selectedTheme.allMenuItems = filterdMenu[0].menuData;
      if (!filterdMenu[0].selectedTheme.showMenu) {
        this.selectedTheme['showMenu'] = true;
      }
      this.makeMenuData();
    }
    else {
      this.selectedTheme.allMenuItems = [];
    }
    let moduleRouting = api.moduleId ? api.moduleId : api.name.replace(/\s+/g, '-');
    this.router.navigate(['/pages',this.dataSharedService.selectApplication,moduleRouting]);
  }

}

