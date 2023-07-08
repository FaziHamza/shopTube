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
  listOfOption: any = [];
  visible = false;
  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService,) { }

  ngOnInit(): void {
    debugger
    this.listOfOption = [
      { label: "px-1", value: "px-1" },
      { label: "py-1", value: "py-1" },
      { label: "ps-1", value: "ps-1" },
      { label: "pe-1", value: "pe-1" },
      { label: "pt-1", value: "pt-1" },
      { label: "pr-1", value: "pr-1" },
      { label: "pb-1", value: "pb-1" },
      { label: "pl-1", value: "pl-1" },
      { label: "p-2", value: "p-2" },
      { label: "px-2", value: "px-2" },
      { label: "py-2", value: "py-2" },
      { label: "ps-2", value: "ps-2" },
      { label: "pe-2", value: "pe-2" },
      { label: "pt-2", value: "pt-2" },
      { label: "pr-2", value: "pr-2" },
      { label: "pb-2", value: "pb-2" },
      { label: "pl-2", value: "pl-2" },
      { label: "p-3", value: "p-3" },
      { label: "px-3", value: "px-3" },
      { label: "py-3", value: "py-3" },
      { label: "ps-3", value: "ps-3" },
      { label: "pe-3", value: "pe-3" },
      { label: "pt-3", value: "pt-3" },
      { label: "pr-3", value: "pr-3" },
      { label: "m-1", value: "m-1" },
      { label: "mx-1", value: "mx-1" },
      { label: "my-1", value: "my-1" },
      { label: "ms-1", value: "ms-1" },
      { label: "me-1", value: "me-1" },
      { label: "mt-1", value: "mt-1" },
      { label: "mr-1", value: "mr-1" },
      { label: "mb-1", value: "mb-1" },
      { label: "ml-1", value: "ml-1" },
      { label: "m-1.5", value: "m-1.5" },
      { label: "mx-1.5", value: "mx-1.5" },
      { label: "my-1.5", value: "my-1.5" },
      { label: "ms-1.5", value: "ms-1.5" },
      { label: "me-1.5", value: "me-1.5" },
      { label: "mt-1.5", value: "mt-1.5" },
      { label: "mr-1.5", value: "mr-1.5" },
      { label: "mb-1.5", value: "mb-1.5" },
      { label: "ml-1.5", value: "ml-1.5" },
      { label: "m-2", value: "m-2" },
      { label: "mx-2", value: "mx-2" },
      { label: "my-2", value: "my-2" },
      { label: "ms-2", value: "ms-2" },
      { label: "me-2", value: "me-2" },
      { label: "mt-2", value: "mt-2" },
      { label: "mr-2", value: "mr-2" },
      { label: "mb-2", value: "mb-2" },
      { label: "ml-2", value: "ml-2" },
      { label: "m-3", value: "m-3" },
      { label: "mx-3", value: "mx-3" },
      { label: "my-3", value: "my-3" },
    ];

  }
  open(): void {
    debugger
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  changeLayout(layoutType: any) {
    debugger
    if (layoutType == 'null_titleSize' || layoutType == 'null_iconSize' || layoutType == 'null_buttonIconSize') {
      layoutType = layoutType.replace('null', '');
    }
    let obj = {
      layoutType: layoutType,
      reset: false,
      inPageMenu: false,
    }
    this.notify.emit(obj);
  }
  changeInPageLayout(data: any) {
    debugger
    let obj = {
      layoutType: data,
      reset: false,
      inPageMenu: true,
    }
    this.notify.emit(obj);
  }
  reset(type: any) {
    let obj = {
      font: 'font-roboto',
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
      buttonPosition: 'right',
      buttonColor: '',
      buttonIconColor: '',
      buttonIconType: 'font_awsome',
      buttonIcon: 'fa-regular fa-bars',
      buttonIconSize: '',
      showButton: true,
      checked: false,
      theme: false,
      isCollapsed: false,
      newMenuArray: [],
      menuChildArrayTwoColumn: [],
      isTwoColumnCollapsed: false,
      allMenuItems: [],
      showMenu: true,
    }
    let inPageObj = {
      font: 'font-roboto',
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
    }
    let resetObj = {
      resetTheme: type == 'mainMenu' ? obj : inPageObj,
      reset: true,
      inPageMenu: type == 'mainMenu' ? false : true,
    }
    this.notify.emit(resetObj);
    this.toastr.success('Reset Successfully!', { nzDuration: 3000 });
  }


}
