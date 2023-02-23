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
  }
  createBasicMessage(type: string): void {
    this.message.create(type, this.messageData.content, { nzDuration: this.messageData.duration });
  }
}
