import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  // activeTabIndex = 0;
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

  // This variable is used for goTo build page through screen builder
  screenName: any
  //make wrapper of image upload insput used in configuration of image upload
  imageUrl: any;
}
