import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-app-side-menu',
  templateUrl: './app-side-menu.component.html',
  styleUrls: ['./app-side-menu.component.scss']
})
export class AppSideMenuComponent implements OnInit {
  @Input() selectedTheme : any;
  menuItems: MenuItem[] = [];
  newMenuArray: any = false;
  menuChildArrayTwoColumn: any = [];
  isTwoColumnCollapsed = false;
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getMenu();
  }

  toggleCollapsed(): void {
  }

  setHovered(value: any, data?: any) {
    if (value != 'down' && value != 'up') {
      if (this.selectedTheme.layoutWidth == 'boxed' && this.selectedTheme.sideBarSize != 'smallHoverView') {
        this.selectedTheme.isCollapsed = value;
      }
      if (this.selectedTheme.sideBarSize == 'smallHoverView') {
        if (!this.selectedTheme.checked)
          this.selectedTheme.isCollapsed = value;
      }
    }
    else if (value == 'down' || value == 'up') {
      data = value;
    }
  }

  getMenu() {
    debugger
    this.employeeService.getJsonModules('Home Page').subscribe((res) => {
      if (res.length > 0) {
        this.menuItems = res[0].menuData;
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
  
}
