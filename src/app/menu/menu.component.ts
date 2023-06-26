import { EmployeeService } from './../services/employee.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataSharedService } from '../services/data-shared.service';
import { StorageService } from '../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from '../services/application.service';
import { Subscription } from 'rxjs';

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
  isCollapsed: boolean = false;
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
  constructor(private employeeService: EmployeeService, private notification: NzNotificationService,
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
    this.applicationService.getNestCommonAPI('department').subscribe((res => {
      this.departments = res;
    }));
    this.applicationService.getNestCommonAPI('application').subscribe((res => {
      this.applications = res;
    }));
  }
  UpdateMenuLink(data: any) {
    // if (data.applicationName) {
    this.selectedApp = data.name;
    this.applicationService.getNestCommonAPIById('menu/application', data._id).subscribe({
      next: (res) => {
        if (res.length > 0) {
          const resData = {
            _id: res[0]._id,
            name: res[0].name,
            applicationId: res[0].id,
            menuData: JSON.parse(res[0].menuData),
            selectedTheme: JSON.parse(res[0].selectedTheme),

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
      },
      error: (err) => {

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
    this.selectedTheme.isCollapsed = !this.selectedTheme.isCollapsed;
    let obj = {
      emitData: this.selectedTheme.isCollapsed,
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
  ngOnDestroy(){
    this.requestSubscription.unsubscribe();
  }
}
