import { ChangeDetectorRef, Component, Input, OnInit, ViewContainerRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, Subscription, filter, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommentModalComponent } from 'src/app/components';
import { Guid } from 'src/app/models/guid';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { JwtService } from 'src/app/shared/jwt.service';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'st-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  @Input() menuItems: any = [];
  @Input() selectedTheme: any;
  headerHeight: number;
  footerHeight: number;
  @ViewChild('footerContainer') footerContainer: ElementRef;
  dynamic: number;
  currentHeader: any = undefined;
  logo: any;
  currentFooter: any = undefined;
  defaultPage: any;
  tabs: any = [];
  dropdown: any = [];
  modules: any = [];
  menuList: any = [];
  getTaskManagementIssues: any = [];
  requestSubscription: Subscription;
  loader: boolean = false;
  currentWebsiteLayout = "";
  currentUrl: any = "";
  fullCurrentUrl = "";
  currentUser: any;
  domainData: any;
  isShowContextMenu = false;
  hideHeaderFooterMenu = false;
  externalLogin: boolean = false
  constentMarging: any = '0px';
  newSelectedTheme = {
    menuMode: 'inline',
    layout: 'vertical',
    colorScheme: 'light',
    layoutWidth: 'fluid',
    sideBarSize: 'default',
    siderBarView: 'sidebarViewDefault',
    sieBarColor: 'light',
    siderBarImages: '',
    checked: false,
    theme: false,
    isCollapsed: false,
    newMenuArray: [],
    menuChildArrayTwoColumn: [],
    isTwoColumnCollapsed: false,
    allMenuItems: [],
    showMenu: true,
    font: 'font-roboto',
    backGroundColor: '#ffffff',
    textColor: '#6f777d',
    activeBackgroundColor: '#e6f7ff',
    activeTextColor: '#6f777d',
    hoverTextColor: '#ffffff',
    titleSize: '15',
    iconColor: '#6f777d',
    hoverIconColor: '#ffffff',
    activeIconColor: '#6f777d',
    iconSize: '15',
    hoverBgColor: '#3b82f6'
  }
  private subscriptions: Subscription = new Subscription();
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private applicationService: ApplicationService, private renderer: Renderer2, private el: ElementRef, public dataSharedService: DataSharedService, public builderService: BuilderService,
    private toastr: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef, private modalService: NzModalService,
    public socketService: SocketService,
    private viewContainerRef: ViewContainerRef, private authService: AuthService, private jwtService: JwtService,) {
    this.requestSubscription = this.dataSharedService.localhostHeaderFooter.subscribe({
      next: (res) => {
        if (res) {
          this.getMenuBHeaderName(res, false);
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  ngOnInit(): void {

    // localStorage.setItem('externalLogin', 'false');
    this.dataSharedService.measureHeight = 0;
    // this.getTaskManagementIssuesFunc(JSON.parse(localStorage.getItem('applicationId')!));

    this.currentUser = this.dataSharedService.decryptedValue('user') ? JSON.parse(this.dataSharedService.decryptedValue('user')) : null;
    let externalLogin = localStorage.getItem('externalLogin') || false;
    // if (externalLogin == 'true') {
    //   this.externalLogin = true;
    //   this.router.navigate(['permission-denied']);
    // }
    this.requestSubscription = this.dataSharedService.collapseMenu.subscribe({
      next: (res) => {
        if (res) {
          this.selectedTheme.isCollapsed = !this.selectedTheme.isCollapsed;
          if (!this.selectedTheme.isCollapsed && this.selectedTheme.layout === 'twoColumn') {
            this.selectedTheme['menuChildArrayTwoColumn'] = []
          }
        } else {
          this.currentHeader = undefined;
          this.currentFooter = undefined;
        }
      },
      error: (err) => {
        console.error(err);
      }
    })

    this.currentUrl = window.location.host;
    if (this.currentUrl.includes('localhost')) {
      this.currentWebsiteLayout = "backend_application";
      if (!window.location.href.includes('/menu-builder')) {
        this.selectedTheme = this.selectedTheme;
        this.getApplications();
        this.getAllMenu();
      }
    }
    //http://spectrum.com/
    this.fullCurrentUrl = window.location.host.split(':')[0];
    this.currentUrl = window.location.host.split(':')[0];
    if (window.location.search.includes('token=')) {
      localStorage.clear();
      const getToken = window.location.search.split('token=')[1];
      const body = { page: window.location.pathname }
      localStorage.setItem('screenBuildId', window.location.pathname);
      localStorage.setItem('screenId', window.location.pathname)
      this.authService.getUserInfo(getToken, body).subscribe((response: any) => {
        if (response.isSuccess) {
          // localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('externalLogin', 'false');
          this.authService.setAuth(response.data);
          this.getMenuByDomainName(this.currentUrl, true);
          this.router.navigate([window.location.pathname]);
        }
        else {
          if (response?.isPermission) {
            this.router.navigate(['permission-denied']);
            this.externalLogin = true;
          }
          else {
            this.jwtService.saveToken(getToken);
            window.localStorage['authToken'] = JSON.stringify(getToken);
            this.jwtService.ecryptedValue('externalLoginLink', response.data[0].pageLink, true);
            this.jwtService.ecryptedValue('username', response.data[0].username, true);
            localStorage.setItem('externalLogin', 'true');
            this.externalLogin = true;
            this.router.navigate([window.location.pathname]);
            window.localStorage['externalPageLink'] = JSON.stringify(getToken);
            this.applicationService.getNestNewCommonAPI(`cp/applicationglobalclass`).subscribe({
              next: (res: any) => {
                this.dataSharedService.applicationGlobalClass = res.data;
                this.loader = false;
              },
              error: (err) => {
                this.toastr.error(`Screen : An error occured`, { nzDuration: 3000 });
                this.loader = false;
              },
            });
          }


        }
      })
    }
    else {
      if (externalLogin == 'false') {
        this.getMenuByDomainName(this.currentUrl, true);
        this.requestSubscription = this.dataSharedService.urlModule.subscribe(({ aplication, module }) => {

          if (module) {
            setTimeout(() => {
              const filteredMenu = this.menuList.filter((item: any) => item.applicationId == module);
              if (filteredMenu.length > 0) {
                this.selectedTheme = filteredMenu[0].selectedTheme;
                this.selectedTheme.allMenuItems = filteredMenu[0].menuData;
                if (!filteredMenu[0].selectedTheme?.showMenu) {
                  this.selectedTheme.showMenu = true;
                }
                this.makeMenuData();
              } else {
                this.selectedTheme.allMenuItems = [];
              }
            }, 100);

          } else if (aplication == '' && module == '') {
            // this.getApplications();
          }
          this.tabs = [];
        });
      }
      else {
        let externalPageLink = this.dataSharedService.decryptedValue('externalLoginLink');
        if (window.location.pathname == `/${externalPageLink}`) {
          this.router.navigate([window.location.pathname]);
        } else {
          this.router.navigate(['/permission-denied']);
        }
        this.externalLogin = true;
      }
    }
    // this.fullCurrentUrl = window.location.host.includes('spectrum') ? '172.23.0.8' : window.location.host.split(':')[0];
    // this.currentUrl = window.location.host.includes('spectrum') ? '172.23.0.8' : window.location.host.split(':')[0];

    // if (!this.currentUrl.includes('localhost')) {
    //   let check = this.currentUrl.includes(':');
    //   if (check) {
    //     this.currentUrl = this.currentUrl.split(':')[0];
    //     this.getMenuByDomainName(this.currentUrl, true);
    //   } else {
    //     this.getMenuByDomainName(this.currentUrl, true);
    //   }
    // }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateHeaderHeight();
    }, 10000)

    // const container = this.footerContainer.nativeElement;
    // if (container.classList.contains('dynamic-footer') || container.classList.contains('dynamic-footer-website')) {
    //   this.dynamic = true;
    // }

  }


  updateHeaderHeight() {
    if (this.el.nativeElement.querySelector('#HEADER')) {
      const headerElement = this.el.nativeElement.querySelector('#HEADER');
      this.headerHeight = headerElement.clientHeight;
      const layoutElement = this.el.nativeElement.querySelector('.content-container');
      this.renderer.setStyle(layoutElement, 'height', `calc(100vh - ${this.headerHeight + 10}px)`);
    }

    if (this.el.nativeElement.querySelector('#FOOTER')) {
      const footerElement = this.el.nativeElement.querySelector('#FOOTER');
      this.footerHeight = footerElement.clientHeight;
      console.log(this.footerHeight);
    }

    if (this.el.nativeElement.querySelector('#Content') && this.footerHeight) {
      ;
      const contentElement = this.el.nativeElement.querySelector('#Content');
      this.dataSharedService.contentHeight = contentElement.clientHeight;
      this.constentMarging = this.footerHeight.toString() + 'px';
      // Corrected assignment without spaces around the value and !important after the semicolon
      // contentElement.style.marginBottom = this.footerHeight.toString() + 'px';

      console.log(contentElement.style.marginBottom);
    }



    this.dataSharedService.measureHeight = window.innerHeight - (this.headerHeight + this.footerHeight + 10);

    // Extract the numeric values from the strings
    console.log(this.dataSharedService.measureHeight);
    this.dataSharedService.showFooter = true;
    // if (this.dataSharedService.measureHeight < this.dataSharedService.contentHeight) {
    //   this.dataSharedService.showFooter = false;
    //   console.log(false);
    // } else {
    //   console.log(true);
    //   this.dataSharedService.showFooter = true;
    // }
  }



  getMenuByDomainName(domainName: any, allowStoreId: boolean) {

    try {
      this.loader = true;
      const { jsonData, newGuid } = this.socketService.makeJsonDataById('application', domainName, 'DomainModelTypeById');
      this.socketService.Request(jsonData);
      this.socketService.OnResponseMessage().subscribe({
        next: (res) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              this.domainData = res.data;
              if (res.data.appication) {
                this.currentWebsiteLayout = res.data.appication.application_Type ? res.data.appication.application_Type : 'backend_application';
              }
              // document.documentElement.style.setProperty('--primaryColor', res.data.appication?.primaryColor);
              // document.documentElement.style.setProperty('--secondaryColor', res.data.appication?.secondaryColor);
              this.dataSharedService.applicationDefaultScreen = res.data['default'] ? res.data['default'].navigation : '';
              this.logo = res.data.appication['image'];
              this.dataSharedService.headerLogo = res.data.appication['image'];
              // if (allowStoreId) {
              //   localStorage.setItem('applicationId', JSON.stringify(res.data?.appication?._id));
              //   localStorage.setItem('organizationId', JSON.stringify(res.data?.department?.organizationId));
              // }
              if (res.data['applicationGlobalClasses']) {
                this.dataSharedService.applicationGlobalClass = res.data['applicationGlobalClasses'];
              }
              this.currentWebsiteLayout = res.data.appication['applicationtype'] ? res.data.appication['applicationtype'] : 'backend_application';
              this.currentHeader = res.data['header'] ? res.data['header']['screendata'] : '';
              this.currentFooter = res.data['footer'] ? res.data['footer']['screendata'] : '';
              if (res.data['menu']) {
                if (this.selectedTheme && res.data['menu']?.selectedTheme) {
                  const theme = JSON.parse(res.data['menu'].selectedTheme);
                  this.selectedTheme['isCollapsed'] = theme['isCollapsed'];
                }
                if (!window.location.href.includes('/menu-builder')) {
                  this.isShowContextMenu = true;
                  let getMenu = res.data['menu'] ? res.data['menu']['menudata']?.json : '';
                  let selectedTheme = res.data['menu'] ? res.data['menu'].selectedtheme : {};
                  if (getMenu) {
                    this.selectedTheme = selectedTheme;
                    this.selectedTheme.allMenuItems = getMenu;
                    this.menuItems = getMenu;
                    this.getComments();
                    if (selectedTheme?.layout == 'horizental') {
                      this.makeMenuData();
                    }

                  }
                  if (this.currentWebsiteLayout == 'website') {
                    this.dataSharedService.menus = this.selectedTheme;
                    this.dataSharedService.menus.allMenuItems = getMenu;
                  }
                }
              }
              this.hideHeaderFooterMenu = window.location.href.includes('/pdf') ? true : false;
              // Example usage:

              if (window.location.href.includes('/pages') && this.selectedTheme) {
                const urlSegments = window.location.href.split('/');
                const parentMenu = this.findParentMenu(this.selectedTheme.allMenuItems, `/pages/${urlSegments[urlSegments.length - 1].trim()}`);
                if (parentMenu && parentMenu.type == "mainTab") {
                  this.tabs.push(parentMenu);
                }
              }

              if (!window.location.href.includes('/pages') && res.data?.default?.navigation && !window.location.href.includes('/menu-builder')) {
                this.router.navigate(['/pages/' + res.data?.default?.navigation
                ]);
              }
              this.loader = false;
              this.getUserPolicyMenu();
            }
          }
        },
        error: (err) => {
          // console.error(err);
          // this.toastr.error("An error occurred", { nzDuration: 3000 });
          this.loader = false; // Set loader to false in case of an error to avoid infinite loading
        }
      });
    }
    catch (error) {
      // console.error(error);
      // this.toastr.error("An error occurred", { nzDuration: 3000 });
      this.loader = false; // Set loader to false in case of an error to avoid infinite loading
    }
  }

  getMenuBHeaderName(domainName: any, allowStoreId: boolean) {

    try {
      this.loader = true;
      const { jsonData, newGuid } = this.socketService.makeJsonDataById('application', domainName, 'DomainModelTypeById');
      this.socketService.Request(jsonData);
      this.socketService.OnResponseMessage().subscribe({
        next: (res) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata
            if (res.isSuccess) {
              this.currentHeader = res.data['header'] ? this.jsonParseWithObject(res.data['header']['screenData']) : '';
              this.loader = false;
            }
          }
        },
        error: (err) => {
          console.error(err);
          // this.toastr.error("An error occurred", { nzDuration: 3000 });
          this.loader = false; // Set loader to false in case of an error to avoid infinite loading
        }
      });
    }
    catch (error) {
      console.error(error);
      // this.toastr.error("An error occurred", { nzDuration: 3000 });
      this.loader = false; // Set loader to false in case of an error to avoid infinite loading
    }
  }

  jsonParseWithObject(data: any) {
    return JSON.parse(data, (key, value) => {
      if (typeof value === 'string' && value.startsWith('(') && value.includes('(model)')) {
        return eval(`(${value})`);
      }
      return value;
    });
  }
  jsonStringifyWithObject(data: any) {
    return (
      JSON.stringify(data, function (key, value) {
        if (typeof value == 'function') {
          let check = value.toString();
          if (check.includes('model =>'))
            return check.replace('model =>', '(model) =>');
          else return check;
        } else {
          return value;
        }
      }) || '{}'
    );
  }
  loadTabsAndButtons(data: any) {
    this.tabs = [];
    // this.dropdown = [];
    this.modules = [];
    this.selectedTheme.menuChildArrayTwoColumn = [];
    if (Array.isArray(data)) {
      this.modules = JSON.parse(JSON.stringify(data));
    }
    else if (data.children.length > 0) {
      this.tabs = data.children.filter((child: any) => child)
      // data.isOpen = !data.isOpen;
      // data.children.forEach((i: any) => {
      //   if (this.selectedTheme.layout == 'twoColumn') {
      //     this.selectedTheme.rowClass = 'w-10/12';
      //     this.selectedTheme.menuColumn = 'w-2/12';
      //     this.selectedTheme.menuChildArrayTwoColumn.push(i);
      //   }
      //   if (i.type == 'mainTab') {
      //     this.tabs.push(i);
      //   }
      //   // else if (i.type == 'dropdown') {
      //   //   this.dropdown.push(i);
      //   // }
      // });
    }
  }
  makeMenuData() {
    let arrayList = [...this.menuItems];
    this.selectedTheme.newMenuArray = [];
    if (this.menuItems.length > 7 && this.selectedTheme.layout === 'horizental') {
      this.selectedTheme.newMenuArray = [{
        label: "More",
        icon: "down",
        id: 'menu_428605c1',
        key: 'menu_0f7d1e4e',
        children: []
      }];
      const withoutTitle = this.menuItems.filter((item: any) => !item.isTitle);
      this.selectedTheme.newMenuArray[0].children = withoutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((item) => !item.isTitle).slice(0, 7);
    }
    else if (this.selectedTheme.layout === 'horizental' && this.menuItems.length > 0) {
      this.selectedTheme.allMenuItems = this.menuItems;
    }
  }
  getApplications() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('Department', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            if (res.data.length > 0) {
              let menus: any = [];
              this.currentWebsiteLayout = "backend_application";
              res.data.forEach((element: any) => {
                let newID = element.applicationId ? element.applicationId : element.name.replace(/\s+/g, '-');
                const newNode = {
                  id: newID,
                  key: newID,
                  title: element.name,
                  link: '',
                  icon: "appstore",
                  type: "input",
                  isTitle: false,
                  expanded: true,
                  color: "",
                  application: true,
                  children: [
                  ],
                }
                menus.push(newNode);
              });
              this.selectedTheme = this.newSelectedTheme;
              this.selectedTheme['allMenuItems'] = menus;
            }
          } else
            this.toastr.error(res.message, { nzDuration: 3000 });
        }

      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }

    });
  }
  getAllMenu() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/CacheMenu').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            const objMenu =
            {
              "id": res.data.id,
              "name": res.data.name,
              "selectedTheme": res.data?.selectedTheme ? JSON.parse(res.data?.selectedTheme) : {},
              "menuData": res.data?.menuData ? JSON.parse(res.data?.menuData) : {},
              "__v": 0,
              "applicationId": "648b4d73dc2ca800d3684f7b"
            }
            this.menuList = objMenu;
          } else {
            this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Menu').subscribe({
              next: (res: any) => {
                if (res.isSuccess) {
                  if (res.data.length > 0) {
                    const objMenu =
                    {
                      "id": res.data.id,
                      "name": res.data.name,
                      "selectedTheme": res.data?.selectedTheme ? JSON.parse(res.data?.selectedTheme) : {},
                      "menuData": res.data?.menuData ? JSON.parse(res.data?.menuData) : {},
                      "__v": 0,
                      "applicationId": "648b4d73dc2ca800d3684f7b"
                    }
                    this.menuList = objMenu;
                  }
                } else
                  this.toastr.error(res.message, { nzDuration: 3000 });
              },
              error: (err) => {
                console.error(err);
                this.toastr.error("An error occurred", { nzDuration: 3000 });
              }
            });
          }
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
  getUsers() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/user').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.dataSharedService.usersData = res.data;
        }
      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
      }
    });
  }
  issueReportFun() {
    const modal = this.modalService.create<CommentModalComponent>({
      nzTitle: 'Issue Report',
      nzContent: CommentModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data: this.dataSharedService.rightClickMenuData,
        // screenName: this.screenName,
        update: null,
        type: 'menu',
      },
      nzFooter: []
    });
    modal.afterClose.subscribe((res: any) => {
      if (res) {
        res['id'] = res.id;
        delete res.id;
        delete res.__v
          ;
        this.selectedTheme.allMenuItems.forEach((element: any) => {
          if (element.id == this.dataSharedService.rightClickMenuData.id) {
            if (element['issueReport']) {
              element['issueReport'].push(res);
            } else {
              element['issueReport'] = [];
              element['issueReport'].push(res);
            }
            this.cd.detectChanges();
          }

        });
        if (this.selectedTheme['menuChildArrayTwoColumn']) {
          if (this.selectedTheme['menuChildArrayTwoColumn'].length > 0) {
            this.selectedTheme['menuChildArrayTwoColumn'].forEach((element: any) => {
              if (element.id == this.dataSharedService.rightClickMenuData.id) {
                if (element['issueReport']) {
                  element['issueReport'].push(res);
                } else {
                  element['issueReport'] = [];
                  element['issueReport'].push(res);
                }
                this.cd.detectChanges();
              }

            });
          }
        }
      }
    });
  }
  getComments() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('UserComment', 'GetUserCommentsByApp', 'menu');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        if (res.isSuccess) {
          let commentList = res.data
          this.dataSharedService.menuCommentList = commentList;
          this.dataSharedService.menuCommentList.forEach(element => {
            this.assignIssue(this.selectedTheme.allMenuItems, element);
          });

        }
      }

    })
  }
  assignIssue(node: any, issue: any) {
    node.forEach((element: any) => {
      if (issue['componentId']) {
        if (element.id == issue['componentId']) {
          let assign = this.getTaskManagementIssues.find((a: any) => a.componentId == element.id)
          if (assign && assign?.status) {
            element['status'] = assign.status;
          }
          if (!element['issueReport']) {
            element['issueReport'] = [];
          }

          element['issueReport'].push(issue);

          if (!element['issueUser']) {
            element['issueUser'] = [issue['createdBy']];
          }
          else {
            if (!element['issueUser'].includes(issue['createdBy'])) {
              // Check if the user is not already in the array, then add them
              element['issueUser'].push(issue.createdBy);
            }
          }
        }

        if (element.children.length > 0) {
          this.assignIssue(element.children, issue);
        }
      }
    });
  }
  getTaskManagementIssuesFunc(applicationId: string) {
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('UserAssignTask', applicationId, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.getTaskManagementIssues = res.data;
            }
          }
          else {
            // this.toastr.error(`userAssignTask:` + res.message, { nzDuration: 3000 });
          }
        }
      },
      error: (err) => {
        console.error(err);
        // this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  getUserPolicyMenu() {

    const { jsonData, newGuid } = this.socketService.makeJsonData('GetUserPolicyMenu', 'GetUserPolicyMenu');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.dataSharedService.getUserPolicyMenuList = res.data[0]?.data?.json;
            }
          }
          else {
            this.toastr.error(`getUserPolicyMenu:` + res.message, { nzDuration: 3000 });
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  ngOnDestroy() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }
  findParentMenu(menus: any[], link: string): any {
    for (const menu of menus) {
      if (menu.link === link) {
        return null; // No parent for the root menu
      }

      if (menu.children && menu.children.length > 0) {
        const childWithLink = menu.children.find((child: any) => child.link === link);

        if (childWithLink) {
          return menu;
        }

        const parent = this.findParentMenu(menu.children, link);

        if (parent !== null) {
          return parent;
        }
      }
    }

    return null;
  }
}

