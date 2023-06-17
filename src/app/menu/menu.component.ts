import { EmployeeService } from './../services/employee.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataSharedService } from '../services/data-shared.service';
import { StorageService } from '../services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'st-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  selectedLanguageObj: any | undefined;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  applicationBuilder: any;
  screenSetting: any;
  selectedApp: string = '';
  isCollapsed: boolean = false;
  isVisible: boolean = false;
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
  }
  getApllicationAndModule() {
    this.employeeService.jsonApplicationBuilder().subscribe((res => {
      this.applicationBuilder = res;
    }));
    this.employeeService.jsonModuleModuleList().subscribe((res => {
      this.screenSetting = res;
    }));
  }
  UpdateMenuLink(data: any) {
    debugger
    if (data.applicationName) {
      this.selectedApp = data.name;
      this.employeeService.getJsonModules(data.name).subscribe((res => {
        if (res.length > 0) {
          let obj = {
            emitData: res[0],
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
      }));
    } 
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
    this.isCollapsed = !this.isCollapsed;
    let obj = {
      emitData: this.isCollapsed,
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
}
