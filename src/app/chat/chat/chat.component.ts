import { Component, Input, OnInit, } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router } from '@angular/router';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

}
