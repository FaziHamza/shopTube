import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-menu-controll',
  templateUrl: './menu-controll.component.html',
  styleUrls: ['./menu-controll.component.scss']
})
export class MenuControllComponent implements OnInit {
  @Input() data : any;
  isActiveShow : any;
  hoverActiveShow: any;
  requestSubscription: Subscription;
  constructor(public _dataShared: DataSharedService, private toastr: NzMessageService, private router: Router, public dataSharedService: DataSharedService) { 
  }

  ngOnInit(): void {
   
    
  }

  route(data : any): void {
    this.isActiveShow = data.id;
    if (data.link) {
      let routerLink = data.link;
      this.router.navigate([routerLink]);
      this.dataSharedService.defaultPage.next("")
    }
  }
}
