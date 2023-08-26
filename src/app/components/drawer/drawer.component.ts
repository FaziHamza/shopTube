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
      this.drawerData.visible = true;
    }
  }

  open(): void {
    this.drawerData['visible'] = true;
  }

  close(): void {
    this.drawerData['visible'] = false;
  }
}
