import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit {
  @Input() layout: any;
  currentMenu: any;
  currentHeader: any;
  currentFooter: any;
  defaultPage: any;
  requestSubscription: Subscription;
  // currentApplicationList:any;
  constructor(private _dataShared: DataSharedService, private toastr: NzMessageService,
    private router:Router) { }

  ngOnInit(): void {

    this.requestSubscription = this._dataShared.currentMenu.subscribe({
      next: (res) => {
        debugger
        if (res)
          this.currentMenu = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
    this.requestSubscription = this._dataShared.currentHeader.subscribe({
      next: (res) => {
        debugger
        this.currentHeader = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
    this.requestSubscription = this._dataShared.currentFooter.subscribe({
      next: (res) => {
        debugger
        this.currentFooter = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
    this.requestSubscription = this._dataShared.defaultPage.subscribe({
      next: (res) => {
        debugger
        this.defaultPage = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
    // this._dataShared.currentApplication.subscribe(res=>{
    //   debugger
    //   if(res)
    //   this.currentApplicationList = res;
    // })
  }
  gotoPage(item:any){
    debugger
    this.router.navigate(item.link)
  }

}
