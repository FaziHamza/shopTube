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
  tempData: any;
  moreMenu: any = [];
  constructor(private router: Router, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.tempData = JSON.parse(JSON.stringify(this.layoutTabsDropdownData));
    window.onresize = () => {
      this.controlMenu();
    };
  }
  screenLoad(link: any) {
    if (link) {
      if (link.includes('/pages/')) {
        this.router.navigate([link]);
      } else {
        let routerLink = '/pages/' + link;
        this.router.navigate([routerLink]);
      }

    }
  }
  controlMenu() {
    debugger
    const screenWidth = window.innerWidth;
    let arrayList = [];
    this.moreMenu = [];
    this.layoutTabsDropdownData.children = this.tempData.children;
    arrayList = this.layoutTabsDropdownData.children;
    if (screenWidth <= 789) {
      if (this.layoutTabsDropdownData.children.length > 2) {
        this.moreMenu = this.layoutTabsDropdownData.children.slice(2);
        this.layoutTabsDropdownData.children = arrayList.slice(0, 2)
      }
    } else {
      this.layoutTabsDropdownData.children = this.tempData.children
      // this.moreMenu = [];
    }
  }
}
