import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'st-layout-drawer',
  templateUrl: './layout-drawer.component.html',
  styleUrls: ['./layout-drawer.component.scss']
})
export class LayoutDrawerComponent implements OnInit {
  @Input() selectedTheme: any;
  @Input() applicationType: any;
  size: NzButtonSize = 'large';
  @Output() notify: EventEmitter<any> = new EventEmitter();
  visible = false;

  constructor() { }

  ngOnInit(): void {
    

  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  changeLayout(layoutType: any) {
    this.notify.emit(layoutType);
  }

}
