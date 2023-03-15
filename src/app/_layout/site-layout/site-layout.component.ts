import { Component, Input, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  @Input() menuBuiderData: any = [];
  topHeaderMenu = 'w-1/6'
  topHeader = 'w-10/12'
  menuMode: any = 'inline';
  menuColumn: any = 'w-2/12';
  rowClass: any = 'w-10/12';
  horizontalRow = 'flex flex-wrap'
  menuItems: MenuItem[] = [];
  newMenuArray: any = false;
  tabs: any = [];
  dropdown: any = [];
  menuChildArrayTwoColumn: any = [];
  isTwoColumnCollapsed = false;
  selectedTheme: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.selectedTheme = {
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
  }
  toggleCollapsed(): void {
    
    if (this.selectedTheme.layout == 'twoColumn') {
      this.isTwoColumnCollapsed = !this.isTwoColumnCollapsed;
      if (this.isTwoColumnCollapsed) {
        this.menuColumn = 'w-1/6';
      } else if (!this.isTwoColumnCollapsed) {
        this.menuColumn = 'w-1/5';
      }
    }
    else {
      this.selectedTheme.isCollapsed = !this.selectedTheme.isCollapsed;
    }
    if (this.selectedTheme.isCollapsed == true && this.selectedTheme.layout != 'twoColumn') {
      this.menuColumn = '';
    }
    else if (!this.selectedTheme.isCollapsed) {
      this.menuColumn = 'w-2/12';
    }
  }


  changeLayout(layoutType: any) {
    
    // this.horizontalRow = '';
    // this.rowClass = 'flex flex-wrap';
    if (layoutType == 'vertical' || layoutType == 'fluid' || layoutType == 'sidebarViewDefault' || layoutType == 'twoColumn') {
      this.selectedTheme.menuMode = "inline",
        this.selectedTheme.isCollapsed = false;
      this.topHeaderMenu = 'w-1/6'
      this.topHeader = 'w-10/12';
      // this.menuColumn = 'w-1/6';
      // this.rowClass = 'w-10/12';
      if (layoutType == 'vertical' || layoutType == 'fluid') {
        this.horizontalRow = 'flex flex-wrap';
        this.menuColumn = 'w-1/6';
        this.rowClass = 'w-10/12';
        if (layoutType == 'vertical')
          this.selectedTheme.layout = layoutType;
      }
      if (layoutType == 'twoColumn') {
        this.selectedTheme.layoutPosition = '';
        this.selectedTheme.layout = layoutType;
        this.horizontalRow = 'flex flex-wrap'
        this.rowClass = 'w-11/12';
        this.selectedTheme.isCollapsed = true;
        this.isTwoColumnCollapsed = false;
        this.menuColumn = '-w-1/12';
        this.topHeaderMenu = '';
        this.topHeader = '';
        this.selectedTheme.layoutWidth = '';
        if (this.menuChildArrayTwoColumn.length > 0) {
          this.rowClass = 'w-10/12';
          this.menuColumn = 'w-2/12';
        }
      }
    }
    else if (layoutType == 'horizental') {
      this.selectedTheme.layout = layoutType;
      this.horizentalLayout();
      if (this.selectedTheme.layoutWidth == 'boxed')
        this.rowClass = 'w-full'
    }
    else if (layoutType == 'dark') {
      this.selectedTheme.theme = true;
    }
    else if (layoutType == 'light') {
      this.selectedTheme.theme = false;
    }
    else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView') {
      this.selectedTheme.isCollapsed = true;
    }
    else if (layoutType == 'boxed') {
      if (this.selectedTheme.layout == 'horizental') {
        this.horizontalRow = 'flex flex-wrap';
        this.rowClass = 'w-full',
          this.selectedTheme.menuMode = "horizontal",
          this.menuColumn = 'w-full',
          this.selectedTheme.isCollapsed = false;
      } else {
        this.selectedTheme.isCollapsed = true;
        this.horizontalRow = 'flex flex-wrap';
        this.rowClass = 'w-10/12';
        this.selectedTheme.checked = false;
      }
    }
    else if (layoutType == 'default' || layoutType == 'compact') {
      this.selectedTheme.isCollapsed = false;
    }
    // This conditions is used to assign value to object
    if (layoutType == 'vertical' || layoutType == 'horizental' || layoutType == 'twoColumn') {
      this.selectedTheme.layout = layoutType;
      if (this.selectedTheme.sideBarSize == 'compact') {
        if (layoutType == 'horizental' || layoutType == 'twoColumn')
          this.selectedTheme.sideBarSize = '';
      }
    } else if (layoutType == 'fluid' || layoutType == 'boxed') {
      this.selectedTheme.layoutWidth = layoutType;
      if (this.selectedTheme.layout == 'horizental' && layoutType == 'fluid') {
        this.horizentalLayout();
        // this.horizontalRow = 'flex flex-wrap';
        // this.rowClass = 'h-5/6';
        // this.menuColumn = 'w-full',
        // this.menuMode = "horizontal";
      }
    }
    else if (layoutType == 'light' || layoutType == 'dark') {
      this.selectedTheme.sieBarColor = layoutType;
    }
    else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView' || layoutType == 'default' || layoutType == 'compact') {
      this.selectedTheme.sideBarSize = layoutType;
    }
    else if (layoutType == 'fixed' || layoutType == 'scrollable') {
      this.selectedTheme.layoutPosition = layoutType;
    }
    else if (layoutType == 'sidebarViewDefault' || layoutType == 'detatatched') {
      this.selectedTheme.siderBarView = layoutType;
    }
    else if (layoutType.includes('assets/images/menu/image') || layoutType == '') {
      this.selectedTheme.siderBarImages = layoutType;
    }
    this.makeMenuData();
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

  changeIcon() {

    this.newMenuArray[0].icon == 'up' ? 'down' : 'up';
  }

  notifyEmit(data: any) {
    debugger
    this.menuItems = [];
    this.menuItems = data;
    // this.newMenuArrayFunc();
    this.makeMenuData();
  }
  notifyEmitForDropdown(data: any) {
    this.tabs = data;
  }

  loadTabsAndButtons(data: any) {
    debugger
    // event.preventDefault();
    data.isOpen = !data.isOpen;
    this.tabs = [];
    this.dropdown = [];
    this.menuChildArrayTwoColumn = [];
    if (data.children.length > 0) {
      data.children.forEach((i: any) => {
        if (this.selectedTheme.layout == 'twoColumn') {
          this.rowClass = 'w-10/12';
          this.menuColumn = 'w-2/12';
          this.menuChildArrayTwoColumn.push(i);
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
      this.rowClass = 'w-11/12';
      this.menuColumn = '-w-1/12';
    }
  }


  // newMenuArrayFunc() {
  //   this.newMenuArray = [];
  //   if (this.menuItems.length > 7) {

  //     // this.menuItems.splice(7);
  //   }
  // }
  makeMenuData() {
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

  horizentalLayout() {
    this.horizontalRow = 'flex flex-wrap';
    this.rowClass = 'w-10/12',
      this.selectedTheme.menuMode = "horizontal",
      this.menuColumn = 'w-full',
      this.selectedTheme.isCollapsed = false;
  }
}

