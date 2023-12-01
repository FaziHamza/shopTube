import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';

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
  requestSubscription: Subscription;
  editDeleteId: any;
  editId: any;
  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService,
    private applicationServices: ApplicationService, private employeeService: EmployeeService, private modal: NzModalService) {
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
    debugger
    const checkPermission = this.dataSharedService.getUserPolicyMenuList.find(a => a.screenId === this.dataSharedService.currentMenuLink);
    // if (!checkPermission?.create && this.dataSharedService?.currentMenuLink !== '/ourbuilder') {
    //   this.toastr.warning("You do not have permission", { nzDuration: 3000 });
    //   return;
    // }
    const postEvent = this.data.appConfigurableEvent.find((item: any) => item.rule.includes('post_'));
    const putEvent = this.data.appConfigurableEvent.find((item: any) => item.rule.includes('put_'));
    if (!postEvent && !putEvent) {
      this.toastr.error("No action exist", { nzDuration: 3000 });
      return;
    }
    const model: any = {
      screenId: this.screenId,
      postType: this.editId ? 'put' : 'post',
      modalData: {
        "ticketcomments.comment": this.comment,
        "ticketcomments.createdby": "",
        "ticketcomments.spectrumissueid": "",
        "ticketcomments.currentdate": "",
        "ticketcomments.commenttable": "",
        "ticketcomments.screenid": ""
      }
    };
    let actionID = this.editId ? putEvent?._id : postEvent._id;
    if (this.editId) {
      model['modalData']['ticketcomments.id'] = this.editId;
      model['modalData']['ticketcomments.screenid'] = this.screenName;
    }
    this.saveLoader = true;
    if (actionID) {
      this.applicationServices.addNestCommonAPI('knex-query/execute-rules/' + actionID, model).subscribe({
        next: (res) => {
          this.saveLoader = false;
          if (res[0]?.error) {
            this.toastr.error(res[0]?.error, { nzDuration: 3000 });
            return;
          }
          if (model.postType === 'put') {
            if (!res?.isSuccess) {
              this.toastr.error(res.message, { nzDuration: 3000 });
              return;
            }
          }
          if (model.postType === 'put') {
            this.chatData = this.chatData.map((obj: any) => (obj.id === this.editId ? { ...obj, comment: this.comment } : obj));
          } else {
            let obj: any = {};
            let responseObject = res[0];
            for (let key in responseObject) {
              obj[key.split('.')[1]] = responseObject[key];
            }
            this.chatData.push(obj);
          }
          this.comment = '';
          this.editId = '';
          const successMessage = (model.postType === 'post') ? 'Save Successfully' : 'Update Successfully';
          this.toastr.success(successMessage, { nzDuration: 3000 });

        },
        error: (err) => {
          // Handle the error
          this.toastr.error("An error occurred", { nzDuration: 3000 });
          console.error(err);
          this.saveLoader = false; // Ensure to set the loader to false in case of error
        },
      });
    }

  }
  close() {
    this.hideChat = false;
  }
  editIdAssign(id: any) {
    this.editDeleteId = id;
  }
  delete(data: any) {
    // const checkPermission = this.dataSharedService.getUserPolicyMenuList.find(a => a.screenId == this.dataSharedService.currentMenuLink);
    // if (!checkPermission?.delete && this.dataSharedService.currentMenuLink != '/ourbuilder') {
    //   alert("You did not have permission");
    //   return;
    // }
    const model = {
      screenId: this.screenName,
      postType: 'delete',
      modalData: data
    };
    if (this.screenName != undefined) {
      if (this.data?.appConfigurableEvent && this.data?.appConfigurableEvent?.length > 0) {
        const findClickApi = this.data.appConfigurableEvent.find((item: any) => item.rule.includes('delete'));
        if (findClickApi) {
          this.saveLoader = true;
          this.requestSubscription = this.employeeService.saveSQLDatabaseTable(`knex-query/executeDelete-rules/${findClickApi._id}`, model).subscribe({
            next: (res) => {
              this.saveLoader = false;
              if (res.isSuccess) {
                this.toastr.success("Delete Successfully", { nzDuration: 3000 });
                this.chatData = this.chatData.filter((a: any) => a.id != data.id)
              } else {
                this.toastr.warning(res.message || "Data is not deleted", { nzDuration: 3000 });
              }
            },
            error: (err) => {
              this.saveLoader = false;
              this.toastr.error(`An error occurred ${err}`, { nzDuration: 3000 });
            }
          });
        }
      }
    }
  }
  showDeleteConfirm(rowData: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this message?',
      nzOkText: 'Yes',
      nzClassName: 'deleteRow',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(rowData),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  edit(data: any) {
    this.editId = data.id;
    this.comment = data.comment;
  }
  // getChats() {
  //   debugger
  //   this.saveLoader = true;
  //   const getEvent = this.data.appConfigurableEvent.find((item: any) => item.rule.includes('get_'));
  //   if (!getEvent) {
  //     return;
  //   }
  //   this.applicationServices.callApi('knex-query/getexecute-rules/' + getEvent._id, 'get', '', '', '').subscribe({
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
