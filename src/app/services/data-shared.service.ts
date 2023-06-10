import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  // activeTabIndex = 0;
  private languageChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public change: Subject<{ event: any; field: any}> = new Subject();
  public urlModule: Subject<{ aplication?: any ; module? : any}> = new Subject();
  public currentDepartment: Subject<any> = new Subject();
  public currentHeader: Subject<any> = new Subject();
  public currentFooter: Subject<any> = new Subject();
  public currentMenu: Subject<any> = new Subject();
  public screenId: Subject<any> = new Subject();
  public invoiceSum: Subject<any> = new Subject();
  // public menus: Subject<any> = new Subject();
  // public currentApplication: Subject<any> = new Subject();
  // public defaultPage: Subject<any> = new Subject();
  defaultPageNodes:any;
  screenCommentList : any[] = []
  public menus : any;
  currentUrl:any;
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

  setData(data: any) {
    this.data = data;
    this.invoiceSum.next(this.data);
  }

  getData() {
    return this.data;
  }
  onChange(event: any, field: any) {
    this.change.next({ event, field });
  }

  // This variable is used for goTo build page through screen builder
  screenName: any = '';
  //make wrapper of image upload insput used in configuration of image upload
  imageUrl: any;

  element:any;
  getLanguageChange(): Observable<string> {
    return this.languageChange.asObservable();
  }
  setLanguageChange(val: string): void {
    this.languageChange.next(val);
  }
}
