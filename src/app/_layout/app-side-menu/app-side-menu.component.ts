import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/models/menu';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'st-app-side-menu',
  templateUrl: './app-side-menu.component.html',
  styleUrls: ['./app-side-menu.component.scss']
})
export class AppSideMenuComponent implements OnInit {
  @Input() selectedTheme: any;
  @Input() mobileView: any;
  @Input() menuItems: any = [];
  @Output() notify: EventEmitter<any> = new EventEmitter();
  newMenuArray: any = false;
  menuChildArrayTwoColumn: any = [];
  moduleData: any = [];
  selectApplicationModuleData: any = [];
  requestSubscription: Subscription;
  checked: false
  isActiveShow: any;
  hoverActiveShow: any;
  currentUrl = "";
  currentUser: any;
  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub3: false
  };

  constructor(private employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,
    public builderService: BuilderService, public dataSharedService: DataSharedService, private renderer: Renderer2,
    private applicationService: ApplicationService) { }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.loadModules();
    if (!window.location.href.includes('/menu-builder')) {
      window.onresize = () => {
        this.changeHtlmenuAtMblView();
      };
    }
  }
  loadModules(): void {
    this.currentUrl = window.location.host;
    if (this.currentUrl.includes('localhost'))
      this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Application').subscribe({
        next: (res: any) => {
          if (res.isSuccess)
            this.moduleData = res.data;
          else
            this.toastr.error(res.message, { nzDuration: 3000 });
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
  }


  ngOnDestroy() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

  setHovered(value: any, event: any) {
    event.stopPropagation();
    if (!value) {
      document.documentElement.style.setProperty('--my-color1', this.selectedTheme['hoverBgColor']);
    }
    if (this.selectedTheme.sideBarSize == 'smallHoverView' && (this.selectedTheme.layout == 'vertical' || this.selectedTheme.layout == 'rtl')) {
      if (!this.selectedTheme.checked) {
        this.selectedTheme.isCollapsed = value;
      }
      // if (this.selectedTheme.isCollapsed) {
      //   this.selectedTheme.topHeaderMenu = 'w-1/12';
      //   this.selectedTheme.topHeader = 'w-full';
      //   this.selectedTheme.menuColumn = '';
      //   this.selectedTheme.rowClass = 'w-full';
      // }
      // else {
      //   this.selectedTheme.menuColumn = 'w-1/6';
      //   this.selectedTheme.rowClass = 'w-10/12';
      //   this.selectedTheme.topHeaderMenu = 'w-1/6';
      //   this.selectedTheme.topHeader = 'w-10/12';
      // }
    }
  }
  getMenu() {
    this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/CacheMenu', this.currentUser.userId).subscribe({
      next: (res: any) => {
        if (res.isSuccess)
          if (res.data.length > 0) {
            this.selectedTheme.allMenuItems = JSON.parse(res.data[0].menuData);
            this.makeMenuData();
            this.selectedTheme.allMenuItems.forEach((e: any) => {
              e["menuIcon"] = "up"
            });
          }
          else {
            this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Menu', "649053c6ad28a951f554e688").subscribe({
              next: (res: any) => {
                if (res.isSuccess)
                  if (res.data.length > 0) {
                    this.selectedTheme.allMenuItems = JSON.parse(res.data[0].menuData);
                    this.makeMenuData();
                    this.selectedTheme.allMenuItems.forEach((e: any) => {
                      e["menuIcon"] = "up"
                    });
                  }
                  else
                    this.menuItems = [];
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
  makeMenuData() {
    let arrayList = [];
    this.menuItems = this.selectedTheme.allMenuItems;
    arrayList = this.menuItems;
    this.selectedTheme.allMenuItems = [];
    this.selectedTheme.newMenuArray = [];
    if (this.menuItems.length > 7 && this.selectedTheme.layout == 'horizental') {
      this.selectedTheme.newMenuArray = [{
        label: "More",
        icon: "down",
        id: 'menu_428605c1',
        key: 'menu_0f7d1e4e',
        children: []
      }]
      const withOutTitle = this.menuItems.filter((a: any) => a.isTitle != true);
      this.selectedTheme.newMenuArray[0].children = withOutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((a: any) => a.isTitle != true).slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }
  loadTabsAndButtons(event: MouseEvent, data: any, pushInTwoColumn?: any, allowHideInMblView?: any, twoColumnSecondColumn?: any) {
    if (this.mobileView && allowHideInMblView) {
      this.selectedTheme.isCollapsed = true;
    }
    if (allowHideInMblView) {
      this.isActiveShow = data.id;
    }
    event.stopPropagation();
    if (data.application) {
      this.dataSharedService.selectApplication = data.id;
      this.selectApplicationModuleData = this.moduleData.filter((item: any) => item.applicationName == data.title);
      this.notify.emit(this.selectApplicationModuleData);
    }
    else {
      this.notify.emit(data);
      let checkTabs: any = data.children.find((child: any) => child.type == 'mainTab');
      if (data.link && !checkTabs && !window.location.href.includes('/menu-builder')) {
        this.router.navigate([data.link]);
      }
      else if (this.selectedTheme.layout == 'twoColumn') {
        let menus = data.children.filter((child: any) => child.type == 'input')
        if (menus.length > 0 && pushInTwoColumn) {
          this.menuChildArrayTwoColumn = [];
          this.selectedTheme['menuChildArrayTwoColumn'] = [];
          this.selectedTheme['isCollapsed'] = false;
          const filteredChildren = data.children.filter((i: any) => i.type !== 'mainTab');
          this.menuChildArrayTwoColumn.push(...filteredChildren);
          this.selectedTheme['menuChildArrayTwoColumn'].push(...filteredChildren);
        }
        else if (!twoColumnSecondColumn) {
          this.selectedTheme['isCollapsed'] = true;
        }

      }
      // else {
      //   this.toastr.error('No screen , tabs and dropdown against this menu', { nzDuration: 3000 });
      // }
    }
  }
  changeHtlmenuAtMblView() {
    const screenWidth = window.innerWidth;
    let arrayList = [...this.menuItems];
    // this.selectedTheme.allMenuItems = [];
    this.selectedTheme.newMenuArray = [];
    if (this.menuItems.length > 7 && this.selectedTheme.layout === 'horizental' && screenWidth > 768) {
      this.selectedTheme.newMenuArray = [{
        label: "More",
        icon: "down",
        id: 'menu_428605c1',
        key: 'menu_0f7d1e4e',
        children: []
      }];
      const withoutTitle = this.menuItems.filter((item: any) => !item.isTitle);
      this.selectedTheme.newMenuArray[0].children = withoutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((item) => !item.isTitle).slice(0, 7);
    }
    else if (this.selectedTheme.layout === 'horizental' && this.menuItems.length > 0) {
      this.selectedTheme.allMenuItems = this.menuItems;
    }
  }
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

}


