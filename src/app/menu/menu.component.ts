import { EmployeeService } from './../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  constructor(private employeeService:EmployeeService ) { }
  isVisible : any = false;
  ngOnInit(): void {
    // this.getMenu();
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
