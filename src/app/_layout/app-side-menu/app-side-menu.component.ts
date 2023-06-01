import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/models/menu';
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
  isTwoColumnCollapsed = false;
  requestSubscription: Subscription;
  isActiveShow: any;
  hoverActiveShow: any;
  constructor(private employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,
    public builderService: BuilderService, public dataSharedService: DataSharedService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadModules();
    this.makeMenuData();
  }


  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }

  setHovered(value: any, data?: any, item?: any) {
    // if (!value) {
    //   this.hoverActiveShow = data.id;
    // } else {
    //   this.hoverActiveShow = null;
    // }
    if (value != 'down' && value != 'up') {
      if (this.selectedTheme.layoutWidth == 'boxed' && this.selectedTheme.layout != 'horizental' && this.selectedTheme.sideBarSize != 'smallHoverView') {
        this.selectedTheme.isCollapsed = value;
      }
      if (this.selectedTheme.sideBarSize == 'smallHoverView' && this.selectedTheme.layout != 'horizental') {
        if (!this.selectedTheme.checked)
          this.selectedTheme.isCollapsed = value;
      }
    }
    else if (value == 'down' || value == 'up') {
      data = value;
      item.menuIcon = value;
    }

  }

  getMenu() {
    this.requestSubscription = this.employeeService.getJsonModules('Home Page').subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.selectedTheme.allMenuItems = res[0].menuData;
          this.makeMenuData();
          this.selectedTheme.allMenuItems.forEach((e: any) => {
            e["menuIcon"] = "up"
          });
        }
        else
          this.menuItems = [];
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
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
        subMenu: []
      }]
      const withOutTitle = this.menuItems.filter((a: any) => a.isTitle != true);
      this.selectedTheme.newMenuArray[0].subMenu = withOutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((a: any) => a.isTitle != true).slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }


  changeIcon() {
    this.newMenuArray[0].icon == 'up' ? 'down' : 'up';
  }

  loadTabsAndButtons(event: MouseEvent, data: any) {
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
      this.menuChildArrayTwoColumn = [];
      if (data.link && !checkTabsAndDropdown) {
        if(!window.location.href.includes('/menu-builder')){
          let routerLink = data.link;
          this.router.navigate([routerLink]);
        }
      }
      else if (data.children.length > 0) {
        data.children.forEach((i: any) => {
          if (this.selectedTheme.layout == 'twoColumn') {
            this.menuChildArrayTwoColumn.push(i);
          }
        });
      }
      else {
        this.toastr.error('No screen , tabs and dropdown against this menu', { nzDuration: 3000 });
      }
    }
  }

  newMenuArrayFunc() {
    this.newMenuArray = [];
    if (this.menuItems.length > 7) {
      this.newMenuArray = [{
        label: "More",
        icon: "down",
        subMenu: []
      }]
      this.newMenuArray[0].subMenu = this.menuItems.slice(7);
      this.menuItems.splice(7);
    }
  }

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
    this.requestSubscription = this.builderService.jsonModuleSetting().subscribe({
      next: (res) => {
        this.moduleData = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  // getMenuItemColor(item: any, type: any): string {
  //   if (this.hoverActiveShow === item.id) {
  //     return this.selectedTheme['hoverTextColor'];
  //   } else if (this.isActiveShow === item.id) {
  //     return this.selectedTheme['activeTextColor'] || item['iconColor'];
  //   } else if (type == 'text') {
  //     return this.selectedTheme['textColor'];
  //   }
  //   else if(type == 'color') {
  //     return item['iconColor'];
  //   }else{
  //     return ''
  //   }
  // }

}


