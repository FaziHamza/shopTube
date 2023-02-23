import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notification: NzNotificationService) { }
  @Input() notificationData: any;
  ngOnInit(): void {
  }
  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template,{ nzDuration: this.notificationData.duration });
  }
}
