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
  tabsData: any = [];
  constructor(private employeeService: EmployeeService) { }
  isVisible: any = false;

  ngOnInit(): void {
    // this.getMenu();
    this.tabsData = [
      {
        tabLabel: "General",
        tabChild: [
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
        ]
      },
      {
        tabLabel: "Utispanties",
        tabChild: [
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
        ]
      },
      {
        tabLabel: "Work logs",
        tabChild: [
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
        ]
      },
      {
        tabLabel: "Time Analysis",
        tabChild: [
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
          {
            label: "Font",
            children: [
              {
                label: "Projects",
              },
              {
                label: "Campaigns",
              },
              {
                label: "Followers",
              },
            ]
          },
        ]
      },
    ]
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



}
