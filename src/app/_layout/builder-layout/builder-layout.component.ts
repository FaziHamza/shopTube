import { Component, Input, OnInit, } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Router } from '@angular/router';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-builder-layout',
  templateUrl: './builder-layout.component.html',
  styleUrls: ['./builder-layout.component.scss']
})
export class BuilderLayoutComponent implements OnInit {

  menus: any = [];
  selectedTheme: any = {};
  //menu path 
  //website templates -> landen templates
  menuStringify = { 
    "_id": {
      "$oid": "649053c6ad28a951f554e688"
    },
    "name": "Landen_Template",
    "selectedTheme": "{\"topHeaderMenu\":\"w-1/6\",\"topHeader\":\"w-10/12\",\"menuMode\":\"inline\",\"menuColumn\":\"w-1/6\",\"rowClass\":\"w-10/12\",\"horizontalRow\":\"flex flex-wrap\",\"layout\":\"vertical\",\"colorScheme\":\"light\",\"layoutWidth\":\"fluid\",\"layoutPosition\":\"fixed\",\"topBarColor\":\"light\",\"sideBarSize\":\"default\",\"siderBarView\":\"sidebarViewDefault\",\"sieBarColor\":\"light\",\"siderBarImages\":\"\",\"checked\":false,\"theme\":false,\"isCollapsed\":false,\"newMenuArray\":[],\"menuChildArrayTwoColumn\":[],\"isTwoColumnCollapsed\":false,\"allMenuItems\":[],\"showMenu\":true,\"font\":\"font-roboto\",\"buttonIcon\":\"fa-regular fa-bars\",\"buttonIconType\":\"font_awsome\",\"buttonPosition\":\"right\",\"buttonClassArray\":[],\"showButton\":true,\"showLogo\":true,\"inPageMenu\":{\"font\":\"font-roboto\",\"child\":{\"backGroundColor\":\"#ffffff\",\"activeTextColor\":\"#ffffff\",\"textColor\":\"#73757A\",\"activeBackgroundColor\":\"#ffffff\",\"hoverTextColor\":\"#ffffff\",\"iconColor\":\"#73757A\",\"hoverIconColor\":\"#73757A\",\"activeIconColor\":\"#ffffff\",\"titleSize\":16,\"iconSize\":15,\"font\":\"font-roboto\",\"hoverBgColor\":\"#3b82f6\"},\"backGroundColor\":\"#ffffff\",\"activeTextColor\":\"#2563eb\",\"textColor\":\"#73757A\",\"activeBackgroundColor\":\"#2563eb\",\"hoverTextColor\":\"#73757A\",\"iconColor\":\"#73757A\",\"hoverIconColor\":\"#73757A\",\"activeIconColor\":\"#2563eb\",\"titleSize\":16,\"iconSize\":15},\"backGroundColor\":\"#ffffff\",\"hoverBgColor\":\"#3b82f6\",\"activeTextColor\":\"#6f777d\",\"textColor\":\"#6f777d\",\"activeBackgroundColor\":\"#e6f7ff\",\"hoverTextColor\":\"#ffffff\",\"iconColor\":\"#6f777d\",\"hoverIconColor\":\"#ffffff\",\"activeIconColor\":\"#6f777d\",\"titleSize\":15,\"iconSize\":15}",
    "menuData": '[{"id":"Menu_fc755327","key":"menu_6672d980","title":"Add Organization","link":"/builder/organization-builder","icon":"fa-light fa-house","type":"input","isTitle":false,"expanded":true,"color":"","children":[],"selected":true,"expand":false,"iconType":"font_awsome"},{"id":"Menu_d52b29dc","key":"menu_fb67e615","title":"Add Department","link":"/builder/application-builder","icon":"fa-light fa-grid-2","type":"input","isTitle":false,"expanded":true,"color":"","children":[],"selected":true,"expand":false,"iconType":"font_awsome"},{"id":"Menu_7f02bcc5","key":"menu_842b25b7","title":"Add Menu","link":"/builder/menu-builder","icon":"fa-light fa-bars","type":"input","isTitle":false,"expanded":true,"color":"","children":[],"selected":true,"expand":false,"iconType":"font_awsome"},{"id":"Menu_94f1dfd5","key":"menu_94d1fcb1","title":"Add Screen","link":"/builder/screen-builder","icon":" fa-light fa-signal-bars-fair","type":"input","isTitle":false,"expanded":true,"color":"","children":[],"selected":true,"expand":false,"iconType":"font_awsome"},{"id":"Menu_1ffcf5e1","key":"menu_15ff0dc0","title":"Builder","link":"/builder","icon":"fa-light fa-star","type":"input","isTitle":false,"expanded":true,"color":"","children":[],"selected":true,"expand":false,"iconType":"font_awsome"},{"id":"menu_55571686","key":"menu_a00bbfa5","title":"Dashboard","link":"/","icon":"fa-light fa-envelope","type":"input","isTitle":false,"children":[],"selected":true,"expand":false,"iconType":"font_awsome"},{"id":"Menu_6085cbb6","key":"menu_ac2990d8","title":"User Task","link":"/builder/user-task","icon":"fa-light fa-user","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":true},{"id":"Menu_f4f31360","key":"menu_838af51a","title":"Task Management","link":"/builder/user-task-list","icon":"fa-light fa-list","type":"input","isTitle":false,"expanded":false,"iconType":"font_awsome","children":[],"selected":true},{"id":"Menu_1c733467","key":"menu_091ca1ea","title":"Database","link":"/builder/database","icon":"fa-regular fa-database","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":true},{"id":"Menu_eb29cc75","key":"menu_b19add5a","title":"User Mapping","link":"/builder/user-mapping","icon":"fa-regular fa-user-circle","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":true},{"id":"Menu_d0c44b61","key":"menu_2c1ee880","title":"Policy Mapping","link":"/builder/policy-mapping","icon":"fa-regular fa-shield-alt","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":true},{"id":"Menu_accc7416","key":"menu_d142f511","title":"Policy","link":"/builder/policy","icon":"fa-regular fa-file-alt","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":false},{"id":"Menu_46dab543","key":"menu_7873e2db","title":"User","link":"/builder/user","icon":"fa-regular fa-user-check","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":false},{"id":"Menu_7584a28d","key":"menu_07de5fc4","title":"Controls","link":"/builder/create-controls","icon":"fa-regular fa-cogs","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":false},{"id":"Menu_0eb9859a","key":"menu_4dc8a266","title":"Global Classes","link":"/builder/global-Classes","icon":"fa-regular fa-code","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":false},{"id":"Menu_38b8fae3","key":"menu_30db761a","title":"Application Theme","link":"/builder/app-theme","icon":"fa-regular fa-paint-brush","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":false},{"id":"Menu_7d25c5c9","key":"menu_6e1f327a","title":"Query Editor","link":"/builder/query","icon":"fa-regular fa-terminal","type":"input","isTitle":false,"expanded":true,"iconType":"font_awsome","children":[],"selected":false}]',
    "applicationId": {
      "$oid": "64a910940ab8ae224f887a9b"
    },
    "__v": 0
  }
  requestSubscription: any;
  username: any;
  constructor(private toastr: NzMessageService, private employeeService: EmployeeService, private applicationService: ApplicationService, private router: Router, private dataSharedService: DataSharedService) { }

  ngOnInit(): void {
    // this.getUsers();
    this.menus = JSON.parse(this.menuStringify.menuData);
    this.selectedTheme = JSON.parse(this.menuStringify.menuData);

    let a=JSON.parse(localStorage['user'])
    this.username=a.username;

  }


  navigate() {
    localStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }
  // getUsers() {
  //   this.requestSubscription = this.applicationService.getNestCommonAPI('cp/user').subscribe({
  //     next: (res: any) => {
  //       if (res.data.length > 0) {
  //         this.dataSharedService.usersData = res.data;
  //       }
  //     },
  //     error: (err) => {
  //       console.error(err); // Log the error to the console
  //       this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
  //     }
  //   });
  // }

}
