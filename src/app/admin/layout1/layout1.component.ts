import { Component, Input, OnInit } from '@angular/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit {
  @Input() layout:any;
  currentMenu : any;
  currentHeader:any;
  currentFooter:any;
  defaultPage:any;
  // currentApplicationList:any;
  constructor(private _dataShared:DataSharedService) { }

  ngOnInit(): void {

    this._dataShared.currentMenu.subscribe(res=>{
      debugger
      if(res)
      this.currentMenu = res;
    })
    this._dataShared.currentHeader.subscribe(res=>{
      debugger
      this.currentHeader = res;
    })
    this._dataShared.currentFooter.subscribe(res=>{
      debugger
      this.currentFooter = res;
    })
    this._dataShared.defaultPage.subscribe(res=>{
      debugger
      this.defaultPage = res;
    })
    // this._dataShared.currentApplication.subscribe(res=>{
    //   debugger
    //   if(res)
    //   this.currentApplicationList = res;
    // })
  }

}
