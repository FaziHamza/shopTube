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
  @Input() model : any;
  fields: any = [];
  @Input() dbRes: any = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params["schema"]){
        this.employeeService.jsonBuilderSetting(params["schema"]).subscribe((res => {
          if (res.length > 0) {
            // 
            this.dbRes = res[0].menuData;
            this.resData = res[0].menuData;
          }
        }));
      }
    });

  }
  disabledAndEditableSection(data: any) {
    data[0].forEach((a: any) => {
      if (a.formlyType) {
        if (a.formlyType == "input") {
          a.formly[0].fieldGroup.forEach((b: any) => {
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
