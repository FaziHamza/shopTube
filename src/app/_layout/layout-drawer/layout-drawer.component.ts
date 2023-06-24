import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DataSharedService } from 'src/app/services/data-shared.service';

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

  constructor(public dataSharedService: DataSharedService) { }

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
