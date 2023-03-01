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
  size: NzButtonSize = 'large';
  visible = false;
  menuMode: any = 'inline';
  menuColumn: any = 'w-2/12';
  contentColumn: any = 'w-10/12';
  rowClass: any = 'flex flex-nowrap';
  showToggleButton: any = true;
  menuItems: MenuItem[] = [];
  selected: any = 'vertical'
  theme = false;
  checked = false;
  ulIcon:"down"
  isModalOpen: any = false;
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
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed == true) {
      this.menuColumn = 'w-1/12';
      this.contentColumn = 'w-11/12';
    } else {
      this.menuColumn = 'w-2/12';
      this.contentColumn = 'w-10/12';
    }
  }
  getMenu() {
    this.employeeService.getJsonModules('Home Page').subscribe((res) => {
      if (res.length > 0)
        this.menuItems = res[0].menuData;
      else
        this.menuItems = [];
    })
    // this.employeeService.getMenuData(1).subscribe((res)=>{
    //
    //   this.menuItems = res;
    // })
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  changeLayout(layoutType: any) {
    debugger
    if (layoutType == 'vertical' || layoutType == 'fluid' || layoutType == 'sidebarViewDefault') {
      this.menuMode = "inline",
        this.rowClass = 'flex flex-nowrap',
        this.menuColumn = '',
        this.contentColumn = 'w-full',
        this.showToggleButton = true
    }
    else if (layoutType == 'horizental') {
      this.menuMode = "horizontal",
        this.rowClass = '',
        this.menuColumn = 'w-full',
        this.contentColumn = 'w-full',
        this.showToggleButton = false,
        this.isCollapsed = false;
    }
    else if (layoutType == 'dark') {
      this.theme = true;
    }
    else if (layoutType == 'light') {
      this.theme = false;
    }
    else if (layoutType == 'smallIconView' || layoutType == 'smallHoverView') {
      this.isCollapsed = true;
    }
    else if (layoutType == 'boxed') {
      this.isCollapsed = true;
      this.rowClass = 'flex flex-nowrap container mx-auto';
      this.checked = false;
    }
    else if (layoutType == 'default') {
      this.isCollapsed = false;
    }
    // This conditions is used to assign value to object
    if (layoutType == 'vertical' || layoutType == 'horizental') {
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

  setHovered(value: any) {
    debugger
    if (value != 'down' && value != 'up') {
      if (this.selectedTheme.layoutWidth == 'boxed' && this.selectedTheme.sideBarSize != 'smallHoverView') {
        this.isCollapsed = value;
      }
      if (this.selectedTheme.sideBarSize == 'smallHoverView') {
        if (!this.checked)
          this.isCollapsed = value;
      }
    }else if(value == 'down' || value == 'up'){
      this.ulIcon = value;
    }

  }

  notifyEmit(data: any) {
    debugger
    this.menuItems = data
  }

}
