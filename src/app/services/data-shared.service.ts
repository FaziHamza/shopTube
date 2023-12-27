import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  // activeTabIndex = 0;
  private languageChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public change: Subject<{ event: any; field: any }> = new Subject();
  public eventChange: Subject<any> = new Subject();
  public gridData: Subject<{ event: any; field: any }> = new Subject();
  public urlModule: Subject<{ aplication?: any; module?: any }> = new Subject();
  public currentDepartment: Subject<any> = new Subject();
  public currentHeader: Subject<any> = new Subject();
  public currentFooter: Subject<any> = new Subject();
  public currentMenu: Subject<any> = new Subject();
  public screenId: Subject<any> = new Subject();
  public localhostHeaderFooter: Subject<any> = new Subject();
  public invoiceSum: Subject<any> = new Subject();
  public menuSelectedThemeLayout: Subject<any> = new Subject();
  public sectionSubmit: Subject<any> = new Subject();
  public pageSubmit: Subject<any> = new Subject();
  public formlyShowError = new BehaviorSubject<boolean>(false);
  public collapseMenu = new BehaviorSubject<boolean>(false);
  public highlightFalse = new BehaviorSubject<boolean>(false);
  public taskmanager = new BehaviorSubject<boolean>(false);
  public taskmanagerDrawer = new BehaviorSubject<boolean>(false);
  public spectrumControlNull = new BehaviorSubject<boolean>(false);
  public gericFieldLoader = new BehaviorSubject<boolean>(false);
  public pagesLoader = new BehaviorSubject<boolean>(false);
  public drawerClose = new BehaviorSubject<boolean>(false);
  public applicationTheme = new BehaviorSubject<boolean>(false);
  public prevNextRecord = new BehaviorSubject<boolean>(false);
  public commentsRecall = new BehaviorSubject<boolean>(false);
  public removeKanbanListIndex = new BehaviorSubject<boolean>(false);
  public voiceRecord: Subject<any> = new Subject();
  public configuration: Subject<any> = new Subject();
  public moveLink: Subject<any> = new Subject();
  public repeatableControll: Subject<any> = new Subject();
  // public menus: Subject<any> = new Subject();
  // public currentApplication: Subject<any> = new Subject();
  // public defaultPage: Subject<any> = new Subject();

  gridDataLoad: boolean = false;
  drawerVisible: boolean = true;
  getUserPolicyMenuList: any[] = [];
  currentMenuLink: string = '';
  defaultPageNodes: any;
  screenCommentList: any[] = [];
  menuCommentList: any[] = []
  nodeData: any[] = [];
  drawerIdList: any;
  checkContentForFixFooter: any;
  commentId: any;
  public menus: any;
  currentUrl: any;
  selectedNode: any;
  screenModule: any;
  nodes: any;
  checkModule: any;
  headerData: any = [];
  footerData: any = [];
  public data: any;
  copyJson: any = {};
  selectApplication: any = '';
  headerLogo: any = '';
  applicationDefaultScreen: any = '';
  usersData: any = [];
  rightClickMenuData: any = '';
  buttonData: any = '';
  saveModel: any = '';
  measureHeight: any = 0;
  contentHeight: number;
  showFooter: boolean;
  queryId: any = '';
  isSaveData: boolean = false;
  fixedFooter: boolean = false;
  applicationGlobalClass: any = [];
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
  onEventChange(event: any) {
    this.eventChange.next(event);
  }

  saveGridData(data: any) {
    this.gridData.next(data);
  }

  // This variable is used for goTo build page through screen builder
  screenName: any = '';
  //make wrapper of image upload insput used in configuration of image upload
  imageUrl: any;

  element: any;
  getLanguageChange(): Observable<string> {
    return this.languageChange.asObservable();
  }
  setLanguageChange(val: string): void {
    this.languageChange.next(val);
  }

  //This is used for mapping to replace data of specific key 
  typeMap: any = {
    cardWithComponents: 'link',
    buttonGroup: 'title',
    button: 'title',
    downloadButton: 'path',
    breakTag: 'title',
    switch: 'title',
    imageUpload: 'source',
    heading: 'text',
    paragraph: 'text',
    alert: 'text',
    progressBar: 'percent',
    video: 'videoSrc',
    audio: 'audioSrc',
    carouselCrossfade: 'carousalConfig',
    tabs: 'title',
    mainTab: 'title',
    mainStep: 'title',
    listWithComponents: 'title',
    listWithComponentsChild: 'title',
    step: 'title',
    kanban: 'title',
    simplecard: 'title',
    div: 'title',
    textEditor: 'title',
    multiFileUpload: 'uploadBtnLabel',
    accordionButton: 'title',
    divider: 'dividerText',
    toastr: 'toasterTitle',
    rate: 'icon',
    editor_js: 'title',
    rangeSlider: 'title',
    affix: 'title',
    statistic: 'title',
    anchor: 'title',
    modal: 'btnLabel',
    popConfirm: 'btnLabel',
    avatar: 'src',
    badge: 'nzText',
    comment: 'avatar',
    description: 'btnText',
    descriptionChild: 'content',
    segmented: 'title',
    result: 'resultTitle',
    tree: 'title',
    transfer: 'title',
    spin: 'loaderText',
    cascader: 'title',
    drawer: 'btnText',
    skeleton: 'title',
    empty: 'text',
    list: 'title',
    treeView: 'title',
    message: 'content',
    mentions: 'title',
    icon: 'title',
  }
}
