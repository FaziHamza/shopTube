import { EmployeeService } from './../services/employee.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataSharedService } from '../services/data-shared.service';
import { StorageService } from '../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from '../services/application.service';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() selectedTheme: any;
  selectedLanguageObj: any | undefined;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  departments: any;
  applications: any;
  selectedApp: string = '';
  isCollapsed: boolean = true;
  isVisible: boolean = false;
  showCollapseButton: boolean = true;
  requestSubscription: Subscription;
  languages = [
    {
      id: 'english',
      title: 'English',
      flag: 'us.png'
    },
    {
      id: 'arabic',
      title: 'Arabic',
      flag: 'arabic.png'
    },
    {
      id: 'russian',
      title: 'Russian',
      flag: 'russian.png'
    },
    {
      id: 'chinese',
      title: 'Chinese',
      flag: 'chinese.png'
    }
  ];
  constructor(private toastr: NzMessageService, private notification: NzNotificationService,
    private applicationService: ApplicationService,
    public dataSharedService: DataSharedService, private storageService: StorageService, private translate: TranslateService) {
    const currentLanguageString = this.storageService.getString("currentLanguage");
    let currentLanguage: any;
    if (currentLanguageString !== null) {
      currentLanguage = JSON.parse(currentLanguageString);
      this.translate.setDefaultLang(currentLanguage);
    } else {
      this.translate.setDefaultLang('english');
      this.storageService.storeString(
        'currentLanguage',
        JSON.stringify('english')
      );
    }
  }

  ngOnInit(): void {
    this.getApllicationAndModule();
    const currentLanguageString = this.storageService.getString("currentLanguage");
    let currentLanguage: any;

    if (currentLanguageString !== null) {
      currentLanguage = JSON.parse(currentLanguageString);
      this.selectedLanguageObj = this.languages.find(language => language.id == currentLanguage);
    }
    this.requestSubscription = this.dataSharedService.collapseMenu.subscribe({
      next: (res) => {
        if (res)

          this.isCollapsed = res;
      },
      error: (err) => {
        console.error(err);
        // this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  getApllicationAndModule() {
    this.applicationService.getNestCommonAPI('cp/Department').subscribe(((res: any) => {
      if (res.isSuccess)
        this.departments = res.data;
      else
        this.toastr.error(res.message, { nzDuration: 2000 });
    }));
    this.applicationService.getNestCommonAPI('cp/Application').subscribe(((res: any) => {
      if (res.isSuccess)
        this.applications = res.data;
      else
        this.toastr.error(res.message, { nzDuration: 2000 });
    }));
  }
  UpdateMenuLink(data: any) {
    // if (data.applicationName) {
    this.selectedApp = data.name;
    this.applicationService.getNestCommonAPIById('cp/Menu', data._id).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            const resData = {
              _id: res.data[0]._id,
              name: res.data[0].name,
              applicationId: res.data[0].id,
              menuData: JSON.parse(res.data[0].menuData),
              selectedTheme: JSON.parse(res.data[0].selectedTheme),

            }
            let obj = {
              emitData: resData,
              screenType: ''
            };
            this.notify.emit(obj);
          }
          else {
            this.notification.create(
              'error',
              'Error',
              'No menu against this module'
            );
          }
        } else
          this.toastr.error(res.message, { nzDuration: 3000 });
      },
      error: (err) => {
        this.toastr.error("Error Unhandler", { nzDuration: 3000 });
      }
    });
    // this.employeeService.getJsonModules(data.name).subscribe((res => {
    //   if (res.length > 0) {
    //     let obj = {
    //       emitData: res[0],
    //       screenType: ''
    //     };
    //     this.notify.emit(obj);
    //   }
    //   else {
    //     this.notification.create(
    //       'error',
    //       'Error',
    //       'No menu against this module'
    //     );
    //   }
    // }));
    // }
    // else if (data.moduleName) {
    //   this.selectedApp = data.name;
    //   this.employeeService.getJsonModules(data.name).subscribe((res => {
    //     if (res.length > 0) {
    //       let obj = {
    //         emitData: res[0],
    //         screenType: ''
    //       };
    //       this.notify.emit(obj);
    //     }
    //     else {
    //       this.notification.create(
    //         'error',
    //         'Error',
    //         'No menu against this module'
    //       );
    //     }
    //   }));
    // }

  }
  collapse(screenType: any) {
    debugger
    if (screenType == 'desktop') {
      this.selectedTheme.isCollapsed = !this.selectedTheme.isCollapsed;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
    let obj = {
      emitData: screenType == 'desktop' ? this.selectedTheme.isCollapsed : this.isCollapsed,
      screenType: screenType
    };
    this.notify.emit(obj);
  }
  openComment() {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  setLanguage(lang: string): void {

    this.selectedLanguageObj = this.languages.find(
      (record) => record.id === lang
    );
    this.dataSharedService.setLanguageChange(lang);
    this.storageService.storeString(
      'currentLanguage',
      JSON.stringify(lang)
    );
    this.translate.use(lang);
  }
  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
}
