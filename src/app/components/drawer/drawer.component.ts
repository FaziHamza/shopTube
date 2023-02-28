import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  visible = false;
  @Input() drawerData : any;

  constructor() { }

  ngOnInit(): void {
    this.drawerData;

  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
