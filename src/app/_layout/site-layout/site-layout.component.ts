import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  visible = false;
  menuMode: any = 'inline';
  menuColumn: any = 'w-2/12';
  contentColumn: any = 'w-10/12';
  rowClass: any = 'flex flex-nowrap';
  horizontalRow = ''
  horizontalColumn = ''
  showToggleButton: any = true;
  menuItems: MenuItem[] = [];
  selected: any = 'vertical'
  theme = false;
  checked = false;
  ulIcon: "down"
  isModalOpen: any = false;
  newMenuArray: any = false;
  tabs: any = [];
  dropdown: any = [];
  menuChildArrayTwoColumn: any = [];
  isCollapsed = false;
  isTwoColumnCollapsed = false;
  selectedTheme = {
    layout: 'vertical',
    colorScheme: '',
    layoutWidth: '',
    layouutPosiion: 'fixed',
    topBarColor: '',
    sideBarSize: '',
    siderBarView: '',
    sieBarColor: '',
    siderBarImages: 'blankImage',
  }
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getMenu();
    this.ulIcon = "down";
  }
  toggleCollapsed(): void {
    debugger
    if (this.selectedTheme.layout == 'twoColumn') {
      this.isTwoColumnCollapsed = !this.isTwoColumnCollapsed;
      if (this.isTwoColumnCollapsed) {
        this.menuColumn = 'w-1/6';
        this.contentColumn = 'w-10/12';
      } else if (!this.isTwoColumnCollapsed) {
        this.menuColumn = 'w-1/5';
        this.contentColumn = 'w-4/5';
      }
    }
    else {
      this.isCollapsed = !this.isCollapsed;
    }
    if (this.isCollapsed == true && this.selectedTheme.layout != 'twoColumn') {
      this.menuColumn = '';
      this.contentColumn = 'w-full';
    }
    else if (!this.isCollapsed) {
      this.menuColumn = 'w-2/12';
      this.contentColumn = 'w-10/12';
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



  changeLayout(layoutType: any) {
    this.horizontalRow = '';
    this.rowClass = 'flex flex-nowrap';
    if (layoutType == 'vertical' || layoutType == 'fluid' || layoutType == 'sidebarViewDefault' || layoutType == 'twoColumn') {
      this.menuMode = "inline",
        this.rowClass = 'flex flex-nowrap',
        this.menuColumn = '';
      this.contentColumn = 'w-full';
      this.showToggleButton = true;
      this.makeMenuItemsArray();
      if (layoutType == 'twoColumn') {
        this.isCollapsed = true;
        this.isTwoColumnCollapsed = false;
        this.menuColumn = 'w-1/5';
        this.contentColumn = 'w-4/5';
      }
    }
    else if (layoutType == 'horizental') {
      this.horizontalColumn = 'w-10/12';
      this.horizontalRow = 'flex flex-wrap';
      this.rowClass = 'w-10/12',
        this.menuMode = "horizontal",
        this.menuColumn = '',
        this.contentColumn = 'w-full',
        this.showToggleButton = false,
        this.isCollapsed = false;
      this.newMenuArrayFunc();
    }
    else if (layoutType == 'dark') {
      this.theme = true;
    }
    else if (layoutType == 'light') {
      this.theme = false;
    }
    else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView') {
      this.isCollapsed = true;
      this.makeMenuItemsArray();
    }
    else if (layoutType == 'boxed') {
      if (this.selectedTheme.layout == 'horizental') {
        this.horizontalColumn = 'w-10/12';
        this.horizontalRow = 'flex flex-wrap';
        this.rowClass = 'w-10/12',
          this.menuMode = "horizontal",
          this.menuColumn = '',
          this.contentColumn = 'w-full',
          this.showToggleButton = false,
          this.isCollapsed = false;
        this.newMenuArrayFunc();
      } else {
        this.isCollapsed = true;
        this.rowClass = 'flex flex-nowrap container mx-auto';
        this.checked = false;
        this.makeMenuItemsArray();
      }
    }
    else if (layoutType == 'default') {
      this.isCollapsed = false;
      this.makeMenuItemsArray();
    }
    // This conditions is used to assign value to object
    if (layoutType == 'vertical' || layoutType == 'horizental' || layoutType == 'twoColumn') {
      this.selectedTheme.layout = layoutType;
    } else if (layoutType == 'fluid' || layoutType == 'boxed') {
      this.selectedTheme.layoutWidth = layoutType;
    }
    else if (layoutType == 'light' || layoutType == 'dark') {
      this.selectedTheme.sieBarColor = layoutType;
    }
    else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView' || layoutType == 'default') {
      this.selectedTheme.sideBarSize = layoutType;
    }
    else if (layoutType == 'fixed' || layoutType == 'scrollable') {
      this.selectedTheme.layouutPosiion = layoutType;
    }
    else if (layoutType == 'sidebarViewDefault' || layoutType == 'detatatched') {
      this.selectedTheme.siderBarView = layoutType;
    }
    else if (layoutType.includes('assets/images/menu/image') || layoutType == '') {
      this.selectedTheme.siderBarImages = layoutType;
    }

  }

  setHovered(value: any, data?: any) {
    debugger
    if (value != 'down' && value != 'up') {
      if (this.selectedTheme.layoutWidth == 'boxed' && this.selectedTheme.sideBarSize != 'smallHoverView') {
        this.isCollapsed = value;
      }
      if (this.selectedTheme.sideBarSize == 'smallHoverView') {
        if (!this.checked)
          this.isCollapsed = value;
      }
    }
    else if (value == 'down' || value == 'up') {
      data = value;
    }

  }

  changeIcon() {

    this.newMenuArray[0].icon == 'up' ? 'down' : 'up';
  }

  notifyEmit(data: any) {
    this.menuItems = [];
    this.menuItems = data;
    this.newMenuArrayFunc();
  }
  notifyEmitForDropdown(data: any) {
    this.tabs = data;
  }

  loadTabsAndButtons(event: MouseEvent, data: any) {
    debugger
    event.stopPropagation();
    this.tabs = [];
    this.dropdown = [];
    this.menuChildArrayTwoColumn = [];
    if (data.subItems.length > 0) {
      data.subItems.forEach((i: any) => {
        if (this.selectedTheme.layout == 'twoColumn') {
          this.menuChildArrayTwoColumn.push(i);
        }
        if (i.type == 'mainDashonicTabs') {
          this.tabs.push(i);
        }
        else if (i.type == 'dropdown') {
          this.dropdown.push(i);
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
