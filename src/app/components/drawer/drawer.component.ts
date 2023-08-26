import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'st-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  visible = false;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() drawerData: any;
  @Input() showModal = true;
  constructor() { }

  ngOnInit(): void {
    debugger
    this.drawerData;
    if(!this.showModal){
      this.visible = true;
    }
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
