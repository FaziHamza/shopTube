import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-app-side-menu',
  templateUrl: './app-side-menu.component.html',
  styleUrls: ['./app-side-menu.component.scss']
})
export class AppSideMenuComponent implements OnInit {

  menuItems: MenuItem[] = [];
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    // this.getMenu();
    this.menuItems = [
      {
        label:'Request',
      },
      {
        label:'Problems',
      },
      {
        label:'Changes',
      },
      {
        label:'Projects',
      },
      {
        label:'Solutions',
      },
      {
        label:'Assets',
      },
      {
        label:'CMDB',
      },
      {
        label:'Purchases',
      },
    ]
  }
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  getMenu(){
    this.employeeService.getJsonModules('Home Page').subscribe((res)=>{

      if(res.length > 0)
        this.menuItems = res[0].menuData;
      else
        this.menuItems = [];
    })
    // this.employeeService.getMenuData(1).subscribe((res)=>{
    //
    //   this.menuItems = res;
    // })
  }
}
