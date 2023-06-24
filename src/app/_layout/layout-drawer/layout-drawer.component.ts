import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService,) { }

  ngOnInit(): void {


  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  changeLayout(layoutType: any) {
    let obj = {
      layoutType: layoutType,
      reset: false
    }
    // if (layoutType == 'horizental') {
    //   this.dataSharedService.menuSelectedThemeLayout.next(false);
    // } else {
    //   this.dataSharedService.menuSelectedThemeLayout.next(true);
    // }
    this.notify.emit(obj);
  }
  reset() {
    let obj = {
      font: '',
      backGroundColor: '',
      textColor: '',
      activeBackgroundColor: '',
      activeTextColor: '',
      hoverTextColor: '',
      titleSize: '',
      iconColor: '',
      hoverIconColor: '',
      activeIconColor: '',
      iconSize: '',
      iconType: '',
      topHeaderMenu: 'w-1/6',
      topHeader: 'w-10/12',
      menuMode: 'inline',
      menuColumn: 'w-2/12',
      rowClass: 'w-10/12',
      horizontalRow: 'flex flex-wrap',
      layout: 'vertical',
      colorScheme: 'light',
      layoutWidth: 'fluid',
      layoutPosition: 'fixed',
      topBarColor: 'light',
      sideBarSize: 'default',
      siderBarView: 'sidebarViewDefault',
      sieBarColor: 'light',
      siderBarImages: '',
      checked: false,
      theme: false,
      isCollapsed: false,
      newMenuArray: [],
      menuChildArrayTwoColumn: [],
      isTwoColumnCollapsed: false,
      allMenuItems: [],
      showMenu: true,
    }
    let resetObj = {
      resetTheme: obj,
      reset: true
    }
    this.notify.emit(resetObj);
    this.toastr.success('Reset Successfully!', { nzDuration: 3000 });
  }
}
