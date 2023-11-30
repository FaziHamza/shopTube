import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.scss']
})
export class SupportChatComponent {
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenId: any;
  @Input() screenName: any;
  @Input() data: any;
  hideChat: boolean = true;
  comment: any;
  saveLoader: boolean = false;
  chatData: any[] = [];
  userName: any;
  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService,
    private applicationServices: ApplicationService) {
    this.processData = this.processData.bind(this);
  }


  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user')!);
    this.userName = userData.username;
    // this.getChats();
  }

  processData(res: any) {
    debugger
    if (res) {
      this.chatData = res.data;
    }
    return res;
  }
  saveChat() {
    const checkPermission = this.dataSharedService.getUserPolicyMenuList.find(a => a.screenId === this.dataSharedService.currentMenuLink);
    // if (!checkPermission?.create && this.dataSharedService?.currentMenuLink !== '/ourbuilder') {
    //   this.toastr.warning("You do not have permission", { nzDuration: 3000 });
    //   return;
    // }
    const postEvent = this.data.appConfigurableEvent.find((item: any) => item.rule.includes('post_'));
    if (postEvent) {
      const model = {
        screenId: this.screenId,
        postType: 'post',
        modalData: {
          "ticketcomments.comment": this.comment,
          "ticketcomments.createdby": "",
          "ticketcomments.spectrumissueid": "",
          "ticketcomments.currentdate": "",
          "ticketcomments.commenttable": "",
          "ticketcomments.screenid": ""
        }
      };
      this.saveLoader = true;
      this.applicationServices.addNestCommonAPI('knex-query/execute-rules/' + '65685630a1d7d19c38260982', model).subscribe({
        next: (res) => {
          this.comment = '';
          this.saveLoader = false;
          let obj: any = {};
          let responseObject = res[0];
          for (let key in responseObject) {
            obj[key.split('.')[1]] = responseObject[key];
          }
          this.chatData.push(obj);

        },
        error: (err) => {
          // Handle the error
          this.toastr.error("An error occurred", { nzDuration: 3000 });
          console.error(err);
          this.saveLoader = false; // Ensure to set the loader to false in case of error
        },
      });
    } else {
      this.toastr.error("NO save action exist", { nzDuration: 3000 });
    }
  }
  close(){
    this.hideChat = false;
  }
  // getChats() {
  //   debugger
  //   this.saveLoader = true;
  //   this.applicationServices.callApi('knex-query/getexecute-rules/' + '65685630a1d7d19c38260983', 'get', '', '', '').subscribe({
  //     next: (res) => {
  //       this.saveLoader = false; // Ensure to set the loader to false in case of error
  //       if (res.isSuccess) {
  //         this.chatData = res.data;
  //       }
  //     },
  //     error: (err) => {
  //       // Handle the error
  //       this.toastr.error("An error occurred", { nzDuration: 3000 });
  //       console.error(err);
  //       this.saveLoader = false; // Ensure to set the loader to false in case of error
  //     },
  //   });
  // }
}
