import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, filter, forkJoin } from 'rxjs';
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
  isVisible: boolean = false;
  currentHeader: any = undefined;
  logo: any;
  currentFooter: any = undefined;
  defaultPage: any;
  tabs: any = [];
  dropdown: any = [];
  modules: any = [];
  menuList: any = [];
  requestSubscription: Subscription;
  loader: boolean = false;
  currentWebsiteLayout = "";
  currentUrl: any = "";
  fullCurrentUrl = "";
  currentUser: any;
  // newSelectedTheme = {
  //   topHeaderMenu: 'w-1/6',
  //   topHeader: 'w-10/12',
  //   menuMode: 'inline',
  //   menuColumn: 'w-2/12',
  //   rowClass: 'w-10/12',
  //   horizontalRow: 'flex',
  //   layout: 'vertical',
  //   colorScheme: 'light',
  //   layoutWidth: 'fluid',
  //   layoutPosition: 'fixed',
  //   topBarColor: 'light',
  //   sideBarSize: 'default',
  //   siderBarView: 'sidebarViewDefault',
  //   sieBarColor: 'light',
  //   siderBarImages: '',
  //   checked: false,
  //   theme: false,
  //   isCollapsed: false,
  //   newMenuArray: [],
  //   menuChildArrayTwoColumn: [],
  //   isTwoColumnCollapsed: false,
  //   allMenuItems: [],
  //   showMenu: true,
  // }

  constructor(private applicationService: ApplicationService, public dataSharedService: DataSharedService, public builderService: BuilderService,
    private toastr: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.requestSubscription = this.dataSharedService.localhostHeaderFooter.subscribe({
      next: (res) => {
        debugger
        if (res) {
          this.getMenuByDomainName(res, false);
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.requestSubscription = this.dataSharedService.collapseMenu.subscribe({
      next: (res) => {
        if (res) {
          this.selectedTheme.isCollapsed = !this.selectedTheme.isCollapsed;
          if (!this.selectedTheme.isCollapsed && this.selectedTheme.layout === 'twoColumn') {
            this.selectedTheme['menuChildArrayTwoColumn'] = []
          }
        }else{
          this.currentHeader = undefined;
          this.currentFooter = undefined;
        }
      },
      error: (err) => {
        console.error(err);
      }
    })

    // this.requestSubscription = this.dataSharedService.currentHeader.subscribe({
    //   next: (res) => {
    //     if (res) {
    //       this.currentHeader = res;
    //     }
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
    // this.requestSubscription = this.dataSharedService.currentFooter.subscribe({
    //   next: (res) => {
    //     if (res) {
    //       this.currentFooter = res;
    //     }
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
    // this.requestSubscription = this.dataSharedService.currentDepartment.subscribe({
    //   next: (res) => {
    //     if (res)
    //       this.currentWebsiteLayout = res;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.toastr.error("An error occurred", { nzDuration: 3000 });
    //   }
    // })
    this.currentUrl = window.location.host;
    if (this.currentUrl.includes('localhost')) {
      this.currentWebsiteLayout = "backend_application";
    }
    this.fullCurrentUrl = window.location.href;
    if (!this.currentUrl.includes('localhost')) {
      let check = this.currentUrl.includes(':');
      if (check) {
        this.currentUrl = this.currentUrl.split(':')[0];
        this.getMenuByDomainName(this.currentUrl, true);
      }
    }
    else if (!window.location.href.includes('/menu-builder')) {
      if (!this.dataSharedService.goToMenu) {
        this.selectedTheme = this.selectedTheme;
        this.getApplications();
        this.getAllMenu();
      }
      else {
        this.requestSubscription = this.applicationService.getNestCommonAPIById('menu/application', this.dataSharedService.goToMenu).subscribe({
          next: (res) => {
            if (res.length > 0) {
              if (res[0].selectedTheme) {
                this.selectedTheme = JSON.parse(res[0].selectedTheme);
                this.selectedTheme.allMenuItems = JSON.parse(res[0].menuData);
                this.menuItems = JSON.parse(res[0].menuData);
              }
              this.makeMenuData();
            }
          },
          error: (err) => {
            this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
          }
        });
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


  // notifyEmit(data: any) {
  //   this.selectedTheme = data.selectedTheme
  //   this.selectedTheme.allMenuItems = data.menuData;
  //   this.menuItems = data.menuData;
  //   this.makeMenuData();
  // }
  // collapsed() {
  //   this.selectedTheme.isCollapsed = !this.selectedTheme?.isCollapsed
  //   if (this.selectedTheme.isCollapsed) {
  //     this.selectedTheme.topHeaderMenu = 'w-1/12';
  //     this.selectedTheme.topHeader = 'w-full';
  //     this.selectedTheme.menuColumn = '';
  //     this.selectedTheme.rowClass = 'w-full';
  //   }
  //   else {
  //     this.selectedTheme.menuColumn = 'w-1/6';
  //     this.selectedTheme.rowClass = 'w-10/12';
  //     this.selectedTheme.topHeaderMenu = 'w-1/6';
  //     this.selectedTheme.topHeader = 'w-10/12';
  //   }
  // }
  // mobileViewCollapseInHostCom() {
  //   this.selectedTheme.showMenu = !this.selectedTheme.showMenu;
  // }
  getMenuByDomainName(domainName: any, allowStoreId: boolean) {
    debugger
    try {
      this.loader = true;
      this.requestSubscription = this.builderService.getApplicationByDomainName(domainName).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            debugger
            if (res.data.appication) {
              this.currentWebsiteLayout = res.data.appication.application_Type ? res.data.appication.application_Type : 'backend_application';
            }
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
            if (this.selectedTheme && res.data['menu'].selectedTheme) {
              const theme = JSON.parse(res.data['menu'].selectedTheme);
              this.selectedTheme['isCollapsed'] = theme['isCollapsed'];
            }
            if (!window.location.href.includes('/menu-builder')) {
              let getMenu = res.data['menu'] ? this.jsonParseWithObject(res.data['menu']['menuData']) : '';
              let selectedTheme = res.data['menu'] ? this.jsonParseWithObject(res.data['menu'].selectedTheme) : {};
              if (this.currentWebsiteLayout == 'backend_application' && getMenu) {
                this.selectedTheme = selectedTheme;
                this.selectedTheme.allMenuItems = getMenu;
                this.menuItems = getMenu;
                this.makeMenuData();
              } else {
                this.dataSharedService.menus = getMenu;
                this.dataSharedService.menus.allMenuItems = getMenu;
                this.selectedTheme = undefined;
              }
            }
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
    let arrayList = [];
    arrayList = this.selectedTheme.allMenuItems;
    // this.selectedTheme.allMenuItems = [];
    this.selectedTheme.newMenuArray = [];
    if (this.selectedTheme.allMenuItems.length > 7 && this.selectedTheme.layout == 'horizental') {
      this.selectedTheme.newMenuArray = [{
        label: "More",
        icon: "down",
        id: 'menu_428605c1',
        key: 'menu_0f7d1e4e',
        children: []
      }]
      const withOutTitle = this.selectedTheme.allMenuItems.filter((a: any) => a.isTitle != true);
      this.selectedTheme.newMenuArray[0].children = withOutTitle.slice(7);
      this.selectedTheme.allMenuItems = arrayList.filter((a: any) => a.isTitle != true).slice(0, 7);
    }
    else {
      this.selectedTheme.allMenuItems = arrayList;
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
            this.selectedTheme.allMenuItems = menus;
            if (!res[0]?.selectedTheme?.showMenu) {
              this.selectedTheme['showMenu'] = true;
            }
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

  callMenus(api?: any) {
    let moduleRouting = api.moduleId ? api.moduleId : api.name.replace(/\s+/g, '-');
    this.router.navigate(['/pages', this.dataSharedService.selectApplication, moduleRouting]);
  }

  openComment() {
    this.isVisible = true;
    this.requestSubscription = this.applicationService.getNestCommonAPI("cp/UserComment").subscribe((res: any) => {
      if (res.isSuccess) {
        let commentList = res.data
        this.dataSharedService.screenCommentList = commentList;
      }
    })
  }
  handleCancel(): void {
    this.isVisible = false;
  }

}

