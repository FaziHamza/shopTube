import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-app-side-menu',
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
  isTwoColumnCollapsed = false;
  newSelectedTheme = {
    layout: 'vertical',
    colorScheme: 'light',
    layoutWidth: 'fluid',
    layoutPosition: 'fixed',
    topBarColor: 'light',
    sideBarSize: 'default',
    siderBarView: 'sidebarViewDefault',
    sieBarColor: 'light',
    siderBarImages: '',
    menuMode: 'inline',
    checked: false,
    theme: false,
    isCollapsed: false,
    allMenuItems: [],
  }
  constructor(private employeeService: EmployeeService , private toastr: NzMessageService, private router: Router ,) { }

  ngOnInit(): void {

    this.makeMenuData();
  }

  toggleCollapsed(): void {
  }

  setHovered(value: any, data?: any, item?: any) {

    if (value != 'down' && value != 'up') {
      if (this.selectedTheme.layoutWidth == 'boxed' && this.selectedTheme.layout != 'horizental' && this.selectedTheme.sideBarSize != 'smallHoverView') {
        this.selectedTheme.isCollapsed = value;
        // if(value){
        //   this.rowClass = 'w-10/12';
        //   this.menuColumn = 'w-1/6';
        // }else{
        //   this.rowClass = 'w-11/12';
        //   this.menuColumn = 'w-1/12';
        // }
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

    this.employeeService.getJsonModules('Home Page').subscribe((res) => {
      if (res.length > 0) {
        this.selectedTheme.allMenuItems = res[0].menuData;
        this.makeMenuData();
        this.selectedTheme.allMenuItems.forEach((e: any) => {
          e["menuIcon"] = "up"
        });
      }
      else
        this.menuItems = [];
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
      this.selectedTheme.newMenuArray[0].subMenu = this.menuItems.slice(7);
      this.selectedTheme.allMenuItems = arrayList.slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }

  changeIcon() {
    this.newMenuArray[0].icon == 'up' ? 'down' : 'up';
  }

  loadTabsAndButtons(event: MouseEvent, data: any) {
    debugger
    event.stopPropagation();
    this.notify.emit(data);
    this.menuChildArrayTwoColumn = [];
    if (data.link) {
      let routerLink = data.link;
      this.router.navigate([routerLink]);
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
      // this.router.navigate(['/pages/notfound']);
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



}


