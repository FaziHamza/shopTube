import { ChangeDetectorRef, Component, Input, OnInit, ViewContainerRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, filter, forkJoin } from 'rxjs';
import { CommentModalComponent } from 'src/app/components';
import { Guid } from 'src/app/models/guid';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';

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

  constructor(private applicationService: ApplicationService, private renderer: Renderer2, private el: ElementRef, public dataSharedService: DataSharedService, public builderService: BuilderService,
    private toastr: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef, private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef) {
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

  ngOnDestroy() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    // this.getTaskManagementIssuesFunc(JSON.parse(localStorage.getItem('applicationId')!));
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
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
    debugger
    this.fullCurrentUrl = window.location.href.includes('spectrum.com') ? "spectrum.expocitydubai.com" : window.location.href;
    this.currentUrl = window.location.href.includes('spectrum.com') ? "spectrum.expocitydubai.com" : window.location.href;
    if (!this.currentUrl.includes('localhost')) {
      let check = this.currentUrl.includes(':');
      if (check) {
        this.currentUrl = this.currentUrl.split(':')[0];
        this.getMenuByDomainName(this.currentUrl, true);
      } else {
        this.getMenuByDomainName(this.currentUrl, true);
      }
    }
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateHeaderHeight();
      this.updateFooterHeight();
    }, 5000)

  }


  updateHeaderHeight() {
    // Get the actual header height dynamically
    if (this.el.nativeElement.querySelector('#HEADER')) {
      const headerElement = this.el.nativeElement.querySelector('#HEADER');
      this.headerHeight = headerElement.clientHeight;
      console.log('the height is header', this.headerHeight);

      const layoutElement = this.el.nativeElement.querySelector('.content-container');
      this.renderer.setStyle(layoutElement, 'height', `calc(100vh - ${this.headerHeight + 10}px)`);
      console.log('nz-layout', `calc(100vh - ${this.headerHeight + 15}px)`)
    }
  }


  private updateFooterHeight() {
    if (this.el.nativeElement.querySelector('#FOOTER')) {
      const footerElement = this.el.nativeElement.querySelector('#FOOTER');
      this.footerHeight = footerElement.clientHeight;
      console.log('the height is footer', this.footerHeight);

      const contentElement = this.el.nativeElement.querySelector('.content');
      // this.renderer.setStyle(contentElement, 'height', `calc(100vh - ${this.footerHeight + 10}px)`);
      // console.log('the content height' ,`calc(100vh - ${this.footerHeight + 10}px)`)

      this.renderer.setStyle(contentElement, 'marginBottom', `${this.footerHeight}px`);
      console.warn('the content height', this.footerHeight);
    }
  }


  // private updateHeaderHeight() {
  //   debugger
  //   // Get the actual header height dynamically
  //   const headerElement = this.el.nativeElement.querySelector('.head2');
  //   if (headerElement) {
  //     this.headerHeight = headerElement.clientHeight;
  //     console.log('Header Height:', this.headerHeight);
  //   }
  // }


  getMenuByDomainName(domainName: any, allowStoreId: boolean) {
    try {
      this.loader = true;
      this.requestSubscription = this.builderService.getApplicationByDomainName(domainName).subscribe({
        next: (res) => {
          debugger
          if (res.isSuccess) {
            this.domainData = res.data;
            if (res.data.appication) {
              this.currentWebsiteLayout = res.data.appication.application_Type ? res.data.appication.application_Type : 'backend_application';
            }
            document.documentElement.style.setProperty('--primaryColor', res.data.appication?.primaryColor);
            document.documentElement.style.setProperty('--secondaryColor', res.data.appication?.secondaryColor);
            this.dataSharedService.applicationDefaultScreen = res.data['default'] ? res.data['default'].navigation : '';
            this.logo = res.data.appication['image'];
            this.dataSharedService.headerLogo = res.data.appication['image'];
            if (allowStoreId) {
              localStorage.setItem('applicationId', JSON.stringify(res.data?.appication?._id));
              localStorage.setItem('organizationId', JSON.stringify(res.data?.department?.organizationId));
            }
            this.currentWebsiteLayout = res.data.appication['application_Type'] ? res.data.appication['application_Type'] : 'backend_application';
            this.currentHeader = res.data['header'] ? this.jsonParseWithObject(res.data['header']['screenData']) : '';
            this.currentFooter = res.data['footer'] ? this.jsonParseWithObject(res.data['footer']['screenData']) : '';
            if (res.data['menu']) {
              if (this.selectedTheme && res.data['menu']?.selectedTheme) {
                const theme = JSON.parse(res.data['menu'].selectedTheme);
                this.selectedTheme['isCollapsed'] = theme['isCollapsed'];
              }
              if (!window.location.href.includes('/menu-builder')) {
                this.isShowContextMenu = true;
                let getMenu = res.data['menu'] ? this.jsonParseWithObject(res.data['menu']['menuData']) : '';
                let selectedTheme = res.data['menu'] ? this.jsonParseWithObject(res.data['menu'].selectedTheme) : {};
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
            if (!window.location.href.includes('/pages') && res.data?.default?.navigation && !window.location.href.includes('/menu-builder')) {
              this.router.navigate(['/pages/' + res.data?.default?.navigation
              ]);
            }
            this.loader = false;
            this.getUserPolicyMenu();
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
          this.loader = false; // Set loader to false in case of an error to avoid infinite loading
        }
      });
    }
    catch (error) {
      console.error(error);
      this.toastr.error("An error occurred", { nzDuration: 3000 });
      this.loader = false; // Set loader to false in case of an error to avoid infinite loading
    }
  }

  getMenuBHeaderName(domainName: any, allowStoreId: boolean) {

    try {
      this.loader = true;
      this.requestSubscription = this.builderService.getApplicationByHeaderName(domainName).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.currentHeader = res.data['header'] ? this.jsonParseWithObject(res.data['header']['screenData']) : '';
            this.loader = false;
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
          this.loader = false; // Set loader to false in case of an error to avoid infinite loading
        }
      });
    }
    catch (error) {
      console.error(error);
      this.toastr.error("An error occurred", { nzDuration: 3000 });
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
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Department').subscribe({
      next: (res: any) => {
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
              "_id": res.data._id,
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
                      "_id": res.data._id,
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
        res['id'] = res._id;
        delete res._id;
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
    this.requestSubscription = this.applicationService.getNestCommonAPI("cp/getuserCommentsByApp/UserComment/menu").subscribe((res: any) => {
      if (res.isSuccess) {
        let commentList = res.data
        this.dataSharedService.menuCommentList = commentList;
        this.dataSharedService.menuCommentList.forEach(element => {
          this.assignIssue(this.selectedTheme.allMenuItems, element);
        });

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
    this.requestSubscription = this.builderService.getusermenuAssignTask(applicationId).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            this.getTaskManagementIssues = res.data;
          }
        }
        else {
          this.toastr.error(`userAssignTask:` + res.message, { nzDuration: 3000 });
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  getUserPolicyMenu() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/userpolicy/getUserPolicyMenu/1').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            this.dataSharedService.getUserPolicyMenuList = res.data;
          }
        }
        else {
          this.toastr.error(`getUserPolicyMenu:` + res.message, { nzDuration: 3000 });
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }

  updateStyles() {

  }

}

