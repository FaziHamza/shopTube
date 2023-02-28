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
  menuColumn: any = '';
  contentColumn: any = 'w-full';
  rowClass: any = 'flex flex-nowrap';
  showToggleButton: any = true;
  menuItems: MenuItem[] = [];
  selected: any = 'vertical'
  theme = false;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getMenu();
  }
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
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

    this.selected = layoutType;
    if (layoutType == 'vertical' || layoutType == 'fluid' || layoutType == 'boxed') {
      this.menuMode = "inline",
        this.rowClass = 'flex flex-nowrap',
        this.menuColumn = '',
        this.contentColumn = 'w-full',
        this.showToggleButton = true
      if (layoutType == 'boxed') {
        this.isCollapsed = true;
        this.rowClass = 'flex flex-nowrap container mx-auto';
      } else {
        this.isCollapsed = false;
      }
    }
    else if (layoutType == 'horizental') {
      this.menuMode = "horizontal",
        this.rowClass = '',
        this.menuColumn = 'w-full',
        this.contentColumn = 'w-full',
        this.showToggleButton = false,
        this.isCollapsed = false;
    }
    else if(layoutType == 'dark'){
      this.theme = true;
    }
    else if(layoutType == 'light'){
      this.theme = false;
    }
  }

  setHovered(value: boolean) {

    if (this.selected == 'boxed') {
      this.isCollapsed = value;
    }
  }


}
