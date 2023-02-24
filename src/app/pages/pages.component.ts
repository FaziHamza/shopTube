import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private activatedRoute: ActivatedRoute) { }
  @Input() resData: any = [];
  fields: any = [];
  @Input() dbRes: any = [];
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params["schema"]){
        this.employeeService.jsonBuilderSetting(params["schema"]).subscribe((res => {
          if (res.length > 0) {
            // res[0].menuData[0].children[1].chartCardConfig[0].forEach((a: any) => {
            //   if (a.formlyType) {
            //     if (a.formlyType == "input") {
            //       a.chartCardConfig[0].formly[0].fieldGroup.forEach((b: any) => {
            //         if (b.wrappers.length > 1) {
            //           b.wrappers.splice(1, 1);
            //         }
            //       });
            //     }
            //   }
            // });
            this.dbRes = res[0].menuData;
            this.resData = res[0].menuData[0];
          }
        }));
      }
    });

  }
  disabledAndEditableSection(data: any) {

    data
    data[0].forEach((a: any) => {
      if (a.formlyType) {
        if (a.formlyType == "input") {
          a.chartCardConfig[0].formly[0].fieldGroup.forEach((b: any) => {
            if (b.templateOptions.disabled == true)
            b.templateOptions.disabled = false;
            else if (b.templateOptions.disabled == false)
            b.templateOptions.disabled = true;
          });
        }
      }
    });
  }

}
