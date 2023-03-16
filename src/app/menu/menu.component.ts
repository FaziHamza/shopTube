import { EmployeeService } from './../services/employee.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  applicationBuilder: any;
  screenSetting: any;
  constructor(private employeeService: EmployeeService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getApllicationAndModule();
  }
  getApllicationAndModule() {
    this.employeeService.jsonApplicationBuilder().subscribe((res => {
      this.applicationBuilder = res;
    }));
    this.employeeService.jsonModuleModuleList().subscribe((res => {
      this.screenSetting = res;
    }));
  }
  UpdateMenuLink(moduleName: any) {
    debugger
    this.employeeService.getJsonModules(moduleName).subscribe((res => {
      if (res.length > 0) {
        this.notify.emit(res[0].menuData);
      } 
      else {
        this.notification.create(
          'error',
          'Error',
          'No menu against this module'
        );
      }
    }));
  }
}
