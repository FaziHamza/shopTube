import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {


  menuItems: MenuItem[] = [];
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getMenu();
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
