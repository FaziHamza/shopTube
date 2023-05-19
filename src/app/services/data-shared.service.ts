import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  // activeTabIndex = 0;
  public change: Subject<{ event: any; field: any}> = new Subject();
  screenCommentList : any[] = []
  selectedNode:any;
  screenModule:any;
  nodes:any;
  checkModule:any;
  headerData:any = [];
  footerData:any = [];
  public data: any;
  copyJson : any = {};
  selectApplication : any = '';
  constructor() { }

  setData(data: string) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
  onChange(event: any, field: any) {
    this.change.next({ event, field });
  }

  // This variable is used for goTo build page through screen builder
  screenName: any
  //make wrapper of image upload insput used in configuration of image upload
  imageUrl: any;
}
