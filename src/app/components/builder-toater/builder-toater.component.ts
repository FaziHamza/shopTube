import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-builder-toater',
  templateUrl: './builder-toater.component.html',
  styleUrls: ['./builder-toater.component.scss']
})
export class BuilderToaterComponent implements OnInit {
  @Input() toastrData: any;
  constructor(private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.showtoastr(this.toastrData);
  }
  showtoastr(data: any) {
    this.notification.create(
      data.toastrType,
      data.message,
      data.label,
      { nzPlacement: data.positionClass }
    );
  }

}
