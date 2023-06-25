import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-layout-tabs',
  templateUrl: './layout-tabs.component.html',
  styleUrls: ['./layout-tabs.component.scss']
})
export class LayoutTabsComponent implements OnInit {
  @Input() tabsData: any;
  @Input() theme: any;
  constructor(private router: Router , private toastr: NzMessageService) { }

  ngOnInit(): void {

    this.tabsData;
  }

  screenLoad(link: any) {

    if (link) {
      let routerLink = link;
      this.router.navigate([routerLink]);
    }
    else{
      this.toastr.error('No screen against this tab', { nzDuration: 3000 });
      // this.router.navigate(['/pages/notfound']);
    }
  }
  closeTab({ index }: { index: number }): void {
    this.tabsData.splice(index, 1);
  }
  handleTabSelect(index: any) {
    console.log('Selected tab index: ', index);
    // add your code here to handle the tab select event
  }


}
