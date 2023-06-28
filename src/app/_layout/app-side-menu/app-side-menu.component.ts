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
  @Input() menuItems: any = [];
  @Output() notify: EventEmitter<any> = new EventEmitter();
  // menuItems: MenuItem[] = [];
  newMenuArray: any = false;
  menuChildArrayTwoColumn: any = [];
  moduleData: any = [];
  selectApplicationModuleData: any = [];
  requestSubscription: Subscription;
  checked:false
  isActiveShow: any;
  hoverActiveShow: any;
  constructor(private employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,
    public builderService: BuilderService, public dataSharedService: DataSharedService, private renderer: Renderer2,
    private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.loadModules();
    // this.makeMenuData();
  }


  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }

  setHovered(value: any, event: any) {
    event.stopPropagation();
    if (this.selectedTheme.sideBarSize == 'smallHoverView' && (this.selectedTheme.layout == 'vertical' || this.selectedTheme.layout == 'rtl')) {
      if (!this.selectedTheme.checked) {
        this.selectedTheme.isCollapsed = value;
      }
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

  getMenu() {
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
    }
  }

  // getMenu() {
  //   debugger
  //   this.requestSubscription = this.applicationService.getNestCommonAPIById('menu/application', "649053c6ad28a951f554e688").subscribe({
  //     next: (res) => {
  //       if (res.length > 0) {
  //         this.selectedTheme.allMenuItems = JSON.parse(res[0].menuData);
  //         this.makeMenuData();
  //         this.selectedTheme.allMenuItems.forEach((e: any) => {
  //           e["menuIcon"] = "up"
  //         });
  //       }
  //       else
  //         this.menuItems = [];
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.toastr.error("An error occurred", { nzDuration: 3000 });
  //     }
  //   })
  // }
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


  // changeIcon() {
  //   this.newMenuArray[0].icon == 'up' ? 'down' : 'up';
  // }

  loadTabsAndButtons(event: MouseEvent, data: any,pushInTwoColumn ?:any) {
    this.isActiveShow = data.id;
    event.stopPropagation();
    if (data.application) {
      this.dataSharedService.selectApplication = data.id;
      this.selectApplicationModuleData = this.moduleData.filter((item: any) => item.applicationName == data.title);
      this.notify.emit(this.selectApplicationModuleData);
    }
    else {
      let checkTabsAndDropdown = false;
      data.children.forEach((element: any) => {
        if (!checkTabsAndDropdown) {
          if (element.type == 'mainTab' || element.type == 'dropdown') {
            checkTabsAndDropdown = true;
          }
        }
      });
      this.notify.emit(data);
      if(pushInTwoColumn){
        this.menuChildArrayTwoColumn = [];
      }
      if (data.link && !checkTabsAndDropdown) {
        let routerLink = data.link;
        this.router.navigate([routerLink]);
      }
      else if (data.children.length > 0 && this.selectedTheme.layout == 'twoColumn' && pushInTwoColumn) {
        this.selectedTheme['isCollapsed'] = false;
        this.dataSharedService.collapseMenu.next(false)
        this.selectedTheme.menuColumn = 'w-1/6';
        this.selectedTheme.rowClass = 'w-10/12';
        this.selectedTheme.topHeaderMenu = 'w-1/6';
        this.selectedTheme.topHeader = 'w-10/12';
        data.children.forEach((i: any) => {
          this.menuChildArrayTwoColumn.push(i);
        });
      }
      else {
        this.toastr.error('No screen , tabs and dropdown against this menu', { nzDuration: 3000 });
      }
    }
  }

  // newMenuArrayFunc() {
  //   this.newMenuArray = [];
  //   if (this.menuItems.length > 7) {
  //     this.newMenuArray = [{
  //       label: "More",
  //       icon: "down",
  //       subMenu: []
  //     }]
  //     this.newMenuArray[0].subMenu = this.menuItems.slice(7);
  //     this.menuItems.splice(7);
  //   }
  // }

  makeMenuItemsArray() {
    if (this.newMenuArray.length > 0) {
      if (this.newMenuArray[0].subMenu.length > 0) {
        this.newMenuArray[0].subMenu.forEach((a: any) => {
          this.menuItems.push(a);
        });
      }
    }
    this.newMenuArray = [];
  }

  shouldExecute(data: any): boolean {
    if (data.type === 'mainTab' || data.type === 'dropdown') {
      return false;
    }
    return true;
  }
  loadModules(): void {
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
}


