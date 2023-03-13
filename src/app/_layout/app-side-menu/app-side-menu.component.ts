import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-app-side-menu',
  templateUrl: './app-side-menu.component.html',
  styleUrls: ['./app-side-menu.component.scss']
})
export class AppSideMenuComponent implements OnInit {
  @Input() menuBuilderData : any
  @Input() selectedTheme : any;
  menuItems: MenuItem[] = [];
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
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    debugger
    if(!this.selectedTheme){
      this.selectedTheme = this.newSelectedTheme
    }
    this.getMenu();
  }

  toggleCollapsed(): void {
  }

  setHovered(value: any, data?: any, item?: any) {
    debugger
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
    debugger
    this.employeeService.getJsonModules('Home Page').subscribe((res) => {
      if (res.length > 0) {
        if(this.menuBuilderData.length > 0){
          this.menuItems = this.menuBuilderData;
        }else{
        this.menuItems = res[0].menuData;
        }
        this.makeMenuData();
        this.menuItems.forEach((e: any) => {
          e["menuIcon"] = "up"
        });
      }
      else
        this.menuItems = [];
    })
    // this.employeeService.getMenuData(1).subscribe((res)=>{
    //
    //   this.menuItems = res;
    // })
  }

  changeIcon() {

    this.newMenuArray[0].icon == 'up' ? 'down' : 'up';
  }

  loadTabsAndButtons(event: MouseEvent, data: any) {
    event.stopPropagation();
    this.menuChildArrayTwoColumn = [];
    if (data.subItems.length > 0) {
      data.subItems.forEach((i: any) => {
        if (this.selectedTheme.layout == 'twoColumn') {
          this.menuChildArrayTwoColumn.push(i);
        }
      });
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
  makeMenuData() {
    debugger
    let arrayList = [];
    arrayList = this.menuItems;
    this.selectedTheme.allMenuItems = [];
    this.newMenuArray = [];
    if (this.menuItems.length > 7 && this.selectedTheme.layout == 'horizental') {
      this.newMenuArray = [{
        label: "More",
        icon: "down",
        subMenu: []
      }]
      this.newMenuArray[0].subMenu = this.menuItems.slice(7);
      this.selectedTheme.allMenuItems = arrayList.slice(7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
    }
  }
  
}
