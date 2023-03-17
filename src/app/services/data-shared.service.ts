import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  private data: any;

  constructor() { }

  setData(data: string) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  // This variable is used for goTo build page through screen builder
  screenName : any
}
