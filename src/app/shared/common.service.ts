import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  breadcrumb: any[] = [];
  private languageChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedWorkorder = 0;
  loadRequestTab = false;
  constructor() { }
  // Success
  showSuccess(message: string, title: string) {
    // this.toastr.success(message, title);
  }
  // Error
  showError(message: string, title: string) {
    // this.toastr.error(message, title);
  }

  // Warning
  showWarning(message: string, title: string) {
    // this.toastr.warning(message, title, {
    //   closeButton: true,
    //   enableHtml: true,
    // });


  }
  selectedAvatar = '';

  getUser() {
    return JSON.parse(localStorage.getItem('userDetail')!);
  }

  
  //JSON-Beautify
  // This Method add 4 indentation into json to make readability.
  jsonBeautify(json: any) {
    alert(JSON.stringify(json, null, 4));
  }
}
