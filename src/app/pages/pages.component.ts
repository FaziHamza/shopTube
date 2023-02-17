import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private activatedRoute: ActivatedRoute) { }
  resData : any = [];
  ngOnInit(): void {
    debugger
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.employeeService.getFormGridData("").subscribe((res => {
    //     this.employeeService.jsonBuilderSetting(params["schema"]).subscribe((res => {
    //       var link = "/pages/" + (params["schema"]);
    //       if (res.length > 0) {
    //        this.resData =  res[0].menuData[0].children[1].chartCardConfig[0][0].chartCardConfig[0].formly
    //       }
    //     }));
    //   }));
    // })
  }

}
