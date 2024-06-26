import { Component, Input, OnInit } from '@angular/core';
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
  currentHeader: any;
  logo: any;
  currentFooter: any;
  defaultPage: any;
  tabs: any = [];
  dropdown: any = [];
  modules: any = [];
  menuList: any = [];
  requestSubscription: Subscription;
  currentWebsiteLayout = "";
  currentUrl = "";
  fullCurrentUrl = "";
  newSelectedTheme = {
    topHeaderMenu: 'w-1/6',
    topHeader: 'w-10/12',
    menuMode: 'inline',
    menuColumn: 'w-2/12',
    rowClass: 'w-10/12',
    horizontalRow: 'flex flex-wrap',
    layout: 'vertical',
    colorScheme: 'light',
    layoutWidth: 'fluid',
    layoutPosition: 'fixed',
    topBarColor: 'light',
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
  }
  // selectedTheme: any;

  constructor(private applicationService: ApplicationService, public dataSharedService: DataSharedService, public builderService: BuilderService,
    private toastr: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.requestSubscription = this.dataSharedService.currentHeader.subscribe({
      next: (res) => {
        this.currentHeader = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
    this.requestSubscription = this.dataSharedService.currentFooter.subscribe({
      next: (res) => {
        this.currentFooter = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
    // this.requestSubscription = this.dataSharedService.defaultPage.subscribe({
    //   next: (res) => {

    //     this.defaultPage = res;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.toastr.error("An error occurred", { nzDuration: 3000 });
    //   }
    // })

    this.requestSubscription = this.dataSharedService.currentDepartment.subscribe({
      next: (res) => {
        if (res)
          this.currentWebsiteLayout = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
    this.currentUrl = window.location.host;
    if (this.currentUrl.includes('localhost') || window.location.href.includes('/menu-builder')) {
      this.currentWebsiteLayout = "backend_application";
    } else {
      this.currentWebsiteLayout = "";
    }
    this.fullCurrentUrl = window.location.href;
    if (!this.currentUrl.includes('localhost') && !window.location.href.includes('/menu-builder')) {
      this.selectedTheme = this.newSelectedTheme;
      this.getMenuByDomainName();
    }
    else if (!window.location.href.includes('/menu-builder')) {
      if (!this.dataSharedService.goToMenu) {
        if (!this.selectedTheme) {
          this.selectedTheme = this.newSelectedTheme;
        }
        this.getApplications();
        this.getAllMenu();
      } else {
        this.requestSubscription = this.applicationService.getNestCommonAPIById('menu/application', this.dataSharedService.goToMenu).subscribe({
          next: (res) => {
            if (res.length > 0) {
              if (res[0].selectedTheme) {
                this.selectedTheme = JSON.parse(res[0].selectedTheme);
                this.selectedTheme.allMenuItems = JSON.parse(res[0].menuData);
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
            this.selectedTheme = filteredMenu[0].selectedTheme || this.newSelectedTheme;
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
    // window.onresize = () => {
    //   this.controlMenu();
    // };
    // this.controlMenu();
  }


  notifyEmit(data: any) {
    debugger
    if (data.screenType) {
      if (data.screenType == 'desktop') {
        this.selectedTheme.showMenu = true;
        this.selectedTheme.isCollapsed = data.emitData;
        if (this.selectedTheme.isCollapsed) {
          this.selectedTheme.topHeaderMenu = 'w-1/12';
          this.selectedTheme.topHeader = 'w-full';
          this.selectedTheme.menuColumn = '';
          this.selectedTheme.rowClass = 'w-full';
        }
        else {
          this.selectedTheme.menuColumn = 'w-1/6';
          this.selectedTheme.rowClass = 'w-10/12';
          this.selectedTheme.topHeaderMenu = 'w-1/6';
          this.selectedTheme.topHeader = 'w-10/12';
        }
      }
      else if (data.screenType == 'mobile') {
        this.selectedTheme.showMenu = data.emitData;
      }
    }
    else {
      if (data.emitData.selectedTheme) {
        this.selectedTheme = data.emitData.selectedTheme
      }
      else {
        this.selectedTheme = this.newSelectedTheme;
      }
      this.selectedTheme.allMenuItems = data.emitData.menuData;
      this.menuItems = data.emitData.menuData;
      this.makeMenuData();
    }
  }
  collapsed() {
    debugger
    this.selectedTheme.showMenu = true;
    this.selectedTheme.isCollapsed = !this.selectedTheme?.isCollapsed
    if (this.selectedTheme.isCollapsed) {
      this.selectedTheme.topHeaderMenu = 'w-1/12';
      this.selectedTheme.topHeader = 'w-full';
      this.selectedTheme.menuColumn = '';
      this.selectedTheme.rowClass = 'w-full';
    }
    else {
      this.selectedTheme.menuColumn = 'w-1/6';
      this.selectedTheme.rowClass = 'w-10/12';
      this.selectedTheme.topHeaderMenu = 'w-1/6';
      this.selectedTheme.topHeader = 'w-10/12';
    }
  }
  mobileViewCollapseInHostCom() {
    this.selectedTheme.showMenu = !this.selectedTheme.showMenu;
  }
  getMenuByDomainName() {
    let getURL = window.location.href;
    let check = this.currentUrl.includes(':');
    if (check)
      this.currentUrl = this.currentUrl.split(':')[0];
    this.requestSubscription = this.builderService.getApplicationByDomainName(this.currentUrl).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.logo = res.data[0]['image'];
          // this.dataSharedService.currentApplication.next(res[0]);
          this.currentWebsiteLayout = res.data[0]?.application_Type ? res.data[0]?.application_Type : 'backend_application';
          const observables = [

            // this.builderService.jsonBuilderSettingV1(res[0].name + "_default"),
            this.applicationService.getNestBuilderAPIByScreen('cp/screen/Builder',res.data[0].name + "_header"),
            this.applicationService.getNestBuilderAPIByScreen('cp/screen/Builder',res.data[0].name + "_footer"),
            this.applicationService.getNestCommonAPIById('cp/Menu',res.data[0]._id),
          ];
          forkJoin(observables).subscribe({
            next: (results) => {
              this.dataSharedService.currentHeader.next(results[0].isSuccess ? results[0].data.length  > 0 ? this.jsonParseWithObject(results[0].data[0].screenData) : '' : '');
              this.dataSharedService.currentFooter.next(results[1].isSuccess ? results[1].data.length > 0 ? this.jsonParseWithObject(results[1].data[0].screenData) : '' : '');
              let getMenu = results[2].isSuccess ? results[2].data.length  > 0 ? this.jsonParseWithObject(results[2].data[0].menuData) :{} : {};
              let selectedTheme = results[2].isSuccess ? results[2].data.length  > 0 ? this.jsonParseWithObject(results[2].data[0].selectedTheme) :{} : {};
              if (this.currentWebsiteLayout == 'backend_application' && getMenu) {
                this.selectedTheme = selectedTheme;
                this.selectedTheme.allMenuItems = getMenu
              } else {
                this.dataSharedService.menus = getMenu;
                this.dataSharedService.menus.allMenuItems = getMenu;
                this.selectedTheme = undefined;
              }
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          });
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  jsonParseWithObject(data: any) {
    return JSON.parse(data, (key, value) => {
      if (typeof value === 'string' && value.startsWith('(')) {
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
    this.dropdown = [];
    this.modules = [];
    this.selectedTheme.menuChildArrayTwoColumn = [];
    if (Array.isArray(data)) {
      this.modules = JSON.parse(JSON.stringify(data));
    }
    else if (data.children.length > 0) {
      data.isOpen = !data.isOpen;
      data.children.forEach((i: any) => {
        if (this.selectedTheme.layout == 'twoColumn') {
          this.selectedTheme.rowClass = 'w-10/12';
          this.selectedTheme.menuColumn = 'w-2/12';
          this.selectedTheme.menuChildArrayTwoColumn.push(i);
        }
        if (i.type == 'mainTab') {
          this.tabs.push(i);
        }
        else if (i.type == 'dropdown') {
          this.dropdown.push(i);
        }
      });
    }
  }
  makeMenuData() {
    let arrayList = [];
    arrayList = this.selectedTheme.allMenuItems;
    // this.selectedTheme.allMenuItems = [];
    this.selectedTheme.newMenuArray = [];
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
    // this.currentUrl = window.location.host;
    // let url = window.location.href.split('.com');
    // this.currentWebsiteUrl = url[0] + ".com";
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Department').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            let menus: any = [];
            // let checkHttp = this.currentWebsiteUrl.includes('http');
            // if (!checkHttp)
            //   this.currentWebsiteUrl = "http://" + this.currentWebsiteUrl;
            // if (this.dataSharedService.currentUrl != this.currentUrl) {
            //   this.dataSharedService.currentUrl = this.currentUrl;
            //   let checkLayout = res.find((a: any) => a.domain && a.domain.toLowerCase() == this.currentWebsiteUrl.toLowerCase());
            //   if (!checkLayout) {
            //     let splitHttp = this.currentWebsiteUrl.split("//");
            //     checkLayout = res.find((a: any) => a.domain && a.domain.toLowerCase() == splitHttp[1].toLowerCase());
            //   }

            //   this.currentWebsiteLayout = checkLayout?.layout;
            //   let checkLayoutType = this.currentUrl.includes("pages");
            //   if (!checkLayoutType && checkLayout && this.currentUrl.includes('/home')) {
            //     this.builderService.getModuleByApplicationName(checkLayout.name).subscribe(res => {
            //       this.dataSharedService.currentApplicationList.next(res);
            //       let getDefaultModule = res.find(a => a.name.toLowerCase().includes("default"));
            //       if (getDefaultModule) {
            //         this.builderService.getScreenByModuleName(checkLayout.name).subscribe(res => {
            //           let filterDefaultScreen = res.filter(a => a.name.toLowerCase().includes("default"));
            //           if (filterDefaultScreen.length > 0) {
            //             this.builderService.screenById(filterDefaultScreen[0].screenId).subscribe(res => {
            //               if (filterDefaultScreen[0].screenId.toLowerCase().includes('header'))
            //                 this.dataSharedService.currentHeader.next(res ? res.length > 0 ? res[0].menuData : "" : '');
            //               else
            //                 this.dataSharedService.currentFooter.next(res ? res.length > 0 ? res[0].menuData : "" : '');
            //             })
            //             this.builderService.screenById(filterDefaultScreen[1].screenId).subscribe(res => {
            //               if (filterDefaultScreen[1].screenId.toLowerCase().includes('footer'))
            //                 this.dataSharedService.currentFooter.next(res ? res.length > 0 ? res[0].menuData : "" : '');
            //               else
            //                 this.dataSharedService.currentHeader.next(res ? res.length > 0 ? res[0].menuData : "" : '');
            //             })
            //           }
            //         })
            //         this.builderService.getJsonModules(getDefaultModule.name).subscribe(res => {
            //           this.dataSharedService.currentMenu.next(res);
            //         })
            //       }
            //     })
            //     // this.dataSharedService.currentModule.next(checkLayout.name);
            //   }
            //   else {
            //     this.currentWebsiteLayout = checkLayout?.layout ? checkLayout?.layout : "website";
            //   }
            // }
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
  // controlMenu() {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth <= 789) {
  //     // this.selectedTheme.isCollapsed = true;
  //     this.selectedTheme.showMenu = false;
  //     this.selectedTheme.rowClass = 'w-full';
  //     // this.selectedTheme.isCollapsed = true;
  //   } else {
  //     // this.selectedTheme.isCollapsed = false;
  //     this.selectedTheme.rowClass = 'w-10/12';
  //     this.selectedTheme.showMenu = true;
  //     // this.selectedTheme.topHeaderMenu = 'w-1/6';
  //     // this.selectedTheme.topHeader = 'w-10/12';
  //   }
  // }

  getAllMenu() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/Menu').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            const objMenu =
            {
              "_id": res.data._id,
              "name": res.data.name,
              "selectedTheme": JSON.parse(res.data.selectedTheme),
              "menuData": JSON.parse(res.data.menuData),
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
    })
  }

  callMenus(api?: any) {
    let moduleRouting = api.moduleId ? api.moduleId : api.name.replace(/\s+/g, '-');
    this.router.navigate(['/pages', this.dataSharedService.selectApplication, moduleRouting]);
  }

}

