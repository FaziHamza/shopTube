import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-layout-tabs-dropdown',
  templateUrl: './layout-tabs-dropdown.component.html',
  styleUrls: ['./layout-tabs-dropdown.component.scss']
})
export class LayoutTabsDropdownComponent implements OnInit {
  @Input() layoutTabsDropdownData : any;
  constructor(private router: Router , private toastr: NzMessageService) { }

  ngOnInit(): void {
  }
    screenLoad(link: any) {
    debugger
    if (link) {
      let routerLink = '/pages/'+ link;
      this.router.navigate([routerLink]);
    }
  }

}
