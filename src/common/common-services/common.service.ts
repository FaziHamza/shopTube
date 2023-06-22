import { Injectable } from '@angular/core';
import { NzMessageDataOptions, NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  breadcrumb: any[] = [];
  private languageChange: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  selectedWorkorder = 0;
  loadRequestTab = false;
  constructor(public toastr: NzMessageService) {}
  // Success
  showSuccess(title: string, options?: NzMessageDataOptions) {
    this.toastr.success(title, options);
  }
  // Error
  showError(title: string, options?: NzMessageDataOptions) {
    debugger;
    this.toastr.error(title, options);
  }
  // Warning
  showWarning(title: string, options?: NzMessageDataOptions) {
    this.toastr.warning(title, options);
  }

  // Warning
  // showWarning(message: string, title: string) {
  //   // this.toastr.warning(message, title, {
  //   //   closeButton: true,
  //   //   enableHtml: true,
  //   // });
  // }
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
