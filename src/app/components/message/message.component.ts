import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() messageData: any;
  constructor(private message: NzMessageService) { }

  ngOnInit(): void {
    debugger
    this.messageData;
  }
  createBasicMessage(data: any): void {
    debugger
    this.message.create(data.type, data.content, { nzDuration: data.duration, nzPauseOnHover: data.pauseOnHover, nzAnimate: data.animate });
  }
}
