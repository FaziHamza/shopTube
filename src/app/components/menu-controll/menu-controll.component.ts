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
  data : any = [];
  requestSubscription: Subscription;
  constructor(public _dataShared: DataSharedService, private toastr: NzMessageService, private router: Router, public dataSharedService: DataSharedService) { 
    // this.requestSubscription = this._dataShared.menus.subscribe({
    //   next: (res) => {
    //     debugger
    //     this.data = res
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.toastr.error("An error occurred", { nzDuration: 3000 });
    //   }
    // })
  }

  ngOnInit(): void {

    
  }

  route(data : any): void {
    if (data.link) {
      let routerLink = data.link;
      this.router.navigate([routerLink]);
      this.dataSharedService.defaultPage.next("")
    }
  }
}
