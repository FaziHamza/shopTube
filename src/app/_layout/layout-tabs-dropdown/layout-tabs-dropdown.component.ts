import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-layout-tabs-dropdown',
  templateUrl: './layout-tabs-dropdown.component.html',
  styleUrls: ['./layout-tabs-dropdown.component.scss']
})
export class LayoutTabsDropdownComponent implements OnInit {
  @Input() layoutTabsDropdownData: any;
  @Input() theme: any;
  tempData: any;
  moreMenu: any = [];
  isActiveShow: any;
  hoverActiveShow: any;
  constructor(private router: Router, private toastr: NzMessageService) { }

  ngOnInit(): void {
    
    this.tempData = JSON.parse(JSON.stringify(this.layoutTabsDropdownData));
    // window.onresize = () => {
    //   this.controlMenu();
    // };
    if (this.layoutTabsDropdownData.children.length > 6) {
      this.layoutTabsDropdownData['aboveSevenTab'] = this.layoutTabsDropdownData.children.slice(6);
      this.layoutTabsDropdownData.children = this.layoutTabsDropdownData.children.slice(0, 6);
    }
  }
  screenLoad(data: any , allow : boolean) {
    if(allow){
      this.isActiveShow = data.id;
    }
    if (data.link) {
      if (data.link.includes('/pages/')) {
        this.router.navigate([data.link]);
      } else {
        let routerLink = '/pages/' + data.link;
        this.router.navigate([routerLink]);
      }

    }
  }
  // controlMenu() {

  //   const screenWidth = window.innerWidth;
  //   let arrayList = [];
  //   this.moreMenu = [];
  //   this.layoutTabsDropdownData.children = this.tempData.children;
  //   arrayList = this.layoutTabsDropdownData.children;
  //   if (screenWidth <= 789) {
  //     if (this.layoutTabsDropdownData.children.length > 2) {
  //       this.moreMenu = this.layoutTabsDropdownData.children.slice(2);
  //       this.layoutTabsDropdownData.children = arrayList.slice(0, 2)
  //     }
  //   } else {
  //     this.layoutTabsDropdownData.children = this.tempData.children
  //     // this.moreMenu = [];
  //   }
  // }
}
