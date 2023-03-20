import { Component, Input, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
// export class SwitchComponent extends FieldType {
export class SwitchComponent implements OnInit {
  @Input() switchData: any;
  constructor() { }
  ngOnInit(): void {
  //  this.to;
    this.switchData
  }

}
