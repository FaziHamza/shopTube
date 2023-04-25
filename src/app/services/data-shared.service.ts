import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  // activeTabIndex = 0;
  public radioChange: Subject<{ event: any; field: any,type?:string }> = new Subject();

  selectedNode:any;
  screenModule:any;
  nodes:any;
  public data: any;

  constructor() { }

  setData(data: string) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
  onChange(event: any, field: any,type?:string) {
    this.radioChange.next({ event, field,type });
  }

  // This variable is used for goTo build page through screen builder
  screenName: any
  //make wrapper of image upload insput used in configuration of image upload
  imageUrl: any;
}
