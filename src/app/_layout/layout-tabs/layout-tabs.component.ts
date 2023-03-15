import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-tabs',
  templateUrl: './layout-tabs.component.html',
  styleUrls: ['./layout-tabs.component.scss']
})
export class LayoutTabsComponent implements OnInit {
  @Input() tabsData: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    debugger
    this.tabsData;
  }

  screenLoad(link: any) {
    
    if (link) {
      let routerLink = "/pages/" + link;
      this.router.navigate([routerLink]);
    }
    // else{
    //   this.router.navigate(['/pages/notfound']);
    // }
  }
  closeTab({ index }: { index: number }): void {
    this.tabsData.splice(index, 1);
  }
  handleTabSelect(index: any) {
    console.log('Selected tab index: ', index);
    // add your code here to handle the tab select event
  }


}