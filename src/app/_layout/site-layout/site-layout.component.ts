import { Component, Input, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'st-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  @Input() menuBuiderData: any = [];
  @Input() menuItems: any = [];
  @Input() selectedTheme: any;

  // menuItems: MenuItem[] = [];
  // newMenuArray: any = false;
  tabs: any = [];
  dropdown: any = [];
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

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    window.onresize = () => {
      this.controlMenu();
    };
    // this.controlMenu();
    if (!this.selectedTheme) {
      this.selectedTheme = this.newSelectedTheme;
      this.getMenu();
    }
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


  // changeLayout(layoutType: any) {
  //
  //   // this.selectedTheme.horizontalRow = '';
  //   // this.selectedTheme.rowClass = 'flex flex-wrap';
  //   if (layoutType == 'vertical' || layoutType == 'fluid' || layoutType == 'sidebarViewDefault' || layoutType == 'twoColumn') {
  //     this.selectedTheme.menuMode = "inline",
  //       this.selectedTheme.isCollapsed = false;
  //     this.selectedTheme.topHeaderMenu = 'w-1/6'
  //     this.selectedTheme.topHeader = 'w-10/12';
  //     // this.selectedTheme.menuColumn = 'w-1/6';
  //     // this.selectedTheme.rowClass = 'w-10/12';
  //     if (layoutType == 'vertical' || layoutType == 'fluid') {
  //       this.selectedTheme.horizontalRow = 'flex flex-wrap';
  //       this.selectedTheme.menuColumn = 'w-1/6';
  //       this.selectedTheme.rowClass = 'w-10/12';
  //       if (layoutType == 'vertical')
  //         this.selectedTheme.layout = layoutType;
  //     }
  //     if (layoutType == 'twoColumn') {
  //       this.selectedTheme.layoutPosition = '';
  //       this.selectedTheme.layout = layoutType;
  //       this.selectedTheme.horizontalRow = 'flex flex-wrap'
  //       this.selectedTheme.rowClass = 'w-11/12';
  //       this.selectedTheme.isCollapsed = true;
  //       this.selectedTheme.isTwoColumnCollapsed = false;
  //       this.selectedTheme.menuColumn = '-w-1/12';
  //       this.selectedTheme.topHeaderMenu = '';
  //       this.selectedTheme.topHeader = '';
  //       this.selectedTheme.layoutWidth = '';
  //       if (this.selectedTheme.menuChildArrayTwoColumn.length > 0) {
  //         this.selectedTheme.rowClass = 'w-10/12';
  //         this.selectedTheme.menuColumn = 'w-2/12';
  //       }
  //     }
  //   }
  //   else if (layoutType == 'horizental') {
  //     this.selectedTheme.layout = layoutType;
  //     this.horizentalLayout();
  //     if (this.selectedTheme.layoutWidth == 'boxed')
  //       this.selectedTheme.rowClass = 'w-full'
  //   }
  //   else if (layoutType == 'dark') {
  //     this.selectedTheme.theme = true;
  //   }
  //   else if (layoutType == 'light') {
  //     this.selectedTheme.theme = false;
  //   }
  //   else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView') {
  //     this.selectedTheme.isCollapsed = true;
  //   }
  //   else if (layoutType == 'boxed') {
  //     if (this.selectedTheme.layout == 'horizental') {
  //       this.selectedTheme.horizontalRow = 'flex flex-wrap';
  //       this.selectedTheme.rowClass = 'w-full',
  //         this.selectedTheme.menuMode = "horizontal",
  //         this.selectedTheme.menuColumn = 'w-full',
  //         this.selectedTheme.isCollapsed = false;
  //     } else {
  //       this.selectedTheme.isCollapsed = true;
  //       this.selectedTheme.horizontalRow = 'flex flex-wrap';
  //       this.selectedTheme.rowClass = 'w-10/12';
  //       this.selectedTheme.checked = false;
  //     }
  //   }
  //   else if (layoutType == 'default' || layoutType == 'compact') {
  //     this.selectedTheme.isCollapsed = false;
  //   }
  //   // This conditions is used to assign value to object
  //   if (layoutType == 'vertical' || layoutType == 'horizental' || layoutType == 'twoColumn') {
  //     this.selectedTheme.layout = layoutType;
  //     if (this.selectedTheme.sideBarSize == 'compact') {
  //       if (layoutType == 'horizental' || layoutType == 'twoColumn')
  //         this.selectedTheme.sideBarSize = '';
  //     }
  //   } else if (layoutType == 'fluid' || layoutType == 'boxed') {
  //     this.selectedTheme.layoutWidth = layoutType;
  //     if (this.selectedTheme.layout == 'horizental' && layoutType == 'fluid') {
  //       this.horizentalLayout();
  //       // this.selectedTheme.horizontalRow = 'flex flex-wrap';
  //       // this.selectedTheme.rowClass = 'h-5/6';
  //       // this.selectedTheme.menuColumn = 'w-full',
  //       // this.menuMode = "horizontal";
  //     }
  //   }
  //   else if (layoutType == 'light' || layoutType == 'dark') {
  //     this.selectedTheme.sieBarColor = layoutType;
  //   }
  //   else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView' || layoutType == 'default' || layoutType == 'compact') {
  //     this.selectedTheme.sideBarSize = layoutType;
  //   }
  //   else if (layoutType == 'fixed' || layoutType == 'scrollable') {
  //     this.selectedTheme.layoutPosition = layoutType;
  //   }
  //   else if (layoutType == 'sidebarViewDefault' || layoutType == 'detatatched') {
  //     this.selectedTheme.siderBarView = layoutType;
  //   }
  //   else if (layoutType.includes('assets/images/menu/image') || layoutType == '') {
  //     this.selectedTheme.siderBarImages = layoutType;
  //   }
  //   this.makeMenuData();
  // }

  // setHovered(value: any, data?: any, item?: any) {
  //   if (value != 'down' && value != 'up') {
  //     if (this.selectedTheme.layoutWidth == 'boxed' && this.selectedTheme.layout != 'horizental' && this.selectedTheme.sideBarSize != 'smallHoverView') {
  //       this.selectedTheme.isCollapsed = value;
  //       // if(value){
  //       //   this.selectedTheme.rowClass = 'w-10/12';
  //       //   this.selectedTheme.menuColumn = 'w-1/6';
  //       // }else{
  //       //   this.selectedTheme.rowClass = 'w-11/12';
  //       //   this.selectedTheme.menuColumn = 'w-1/12';
  //       // }
  //     }
  //     if (this.selectedTheme.sideBarSize == 'smallHoverView' && this.selectedTheme.layout != 'horizental') {
  //       if (!this.selectedTheme.checked)
  //         this.selectedTheme.isCollapsed = value;
  //     }
  //   }
  //   else if (value == 'down' || value == 'up') {
  //     data = value;
  //     item.menuIcon = value;
  //   }

  // }

  // changeIcon() {

  //   this.selectedTheme.newMenuArray[0].icon == 'up' ? 'down' : 'up';
  // }

  notifyEmit(data: any) {
    debugger
    if (typeof data === 'boolean') {
      this.selectedTheme.showMenu = data;
      this.selectedTheme.rowClass = 'w-full';
      let newData = JSON.parse(JSON.stringify(this.selectedTheme));
      this.selectedTheme = newData;

    }
    else {
      if (data.selectedTheme) {
        this.selectedTheme = data.selectedTheme
      } else {
        this.selectedTheme = this.newSelectedTheme;
      }
      this.selectedTheme.allMenuItems = data.menuData;
      // this.newMenuArrayFunc();
      this.makeMenuData();
    }
  }
  notifyEmitForDropdown(data: any) {
    debugger
    this.tabs = [];
    data.children.forEach((i: any) => {
      if (i.type == 'mainTab') {
        this.tabs.push(i);
      }
    });
  }

  loadTabsAndButtons(data: any) {
    debugger
    // event.preventDefault();
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


  // newMenuArrayFunc() {
  //   this.newMenuArray = [];
  //   if (this.menuItems.length > 7) {

  //     // this.menuItems.splice(7);
  //   }
  // }
  makeMenuData() {

    let arrayList = [];
    arrayList = this.selectedTheme.allMenuItems;
    // this.selectedTheme.allMenuItems = [];
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

  // horizentalLayout() {
  //
  //   this.makeMenuData();
  //   this.selectedTheme.horizontalRow = 'flex flex-wrap';
  //   this.selectedTheme.rowClass = 'w-10/12',
  //     this.selectedTheme.menuMode = "horizontal",
  //     this.selectedTheme.menuColumn = 'w-full',
  //     this.selectedTheme.isCollapsed = false;
  // }
  getMenu() {

    this.employeeService.getJsonModules('Demo Template').subscribe((res) => {
      if (res.length > 0) {
        this.selectedTheme = res[0].selectedTheme;
        this.selectedTheme.allMenuItems = res[0].menuData;
        if (!res[0].selectedTheme.showMenu) {
          this.selectedTheme['showMenu'] = true;
        }
        // this.menuItems.forEach((e: any) => {
        //   e["menuIcon"] = "up"
        // });
      }
      else
        this.newSelectedTheme.allMenuItems = [];
    })
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

