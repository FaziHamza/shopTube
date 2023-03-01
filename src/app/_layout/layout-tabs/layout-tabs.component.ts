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

  }

  screenLoad(link: any) {
    debugger
    if (link) {
      let routerLink = "/pages/" + link;
      this.router.navigate([routerLink]);
    }else{
      this.router.navigate(['/pages/notfound']);
    }
  }


}
