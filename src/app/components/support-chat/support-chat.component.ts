import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  @Input() mappingId: any;
  @Input() data: any;
  hideChat: boolean = true;
  comment: any;
  saveLoader: boolean = false;
  chatData: any[] = [];
  userName: any;
  showIcon : boolean = false;
  requestSubscription: Subscription;
  editDeleteId: any;
  editId: any;
  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService,
    private applicationServices: ApplicationService, private employeeService: EmployeeService, private modal: NzModalService,
    private cdr: ChangeDetectorRef, private applicationService: ApplicationService) {
    this.processData = this.processData.bind(this);
  }


  ngOnInit(): void {
    console.log('supportchat')
    if (this.mappingId && this.data.eventActionconfig) {
      this.data.eventActionconfig['parentId'] = this.mappingId;
    }
    // this.getChatsWithMapping();
    // if (this.mappingId && this.data?.eventActionconfig) {
    //   this.data.eventActionconfig['parentId'] = this.mappingId;
    // }
    const userData = JSON.parse(localStorage.getItem('user')!);
    this.userName = userData.username;
    // this.getChats();
  }

  processData(res: any) {
    if (res) {
      this.data.chatData = res.data;
    }
    return res;
  }
  saveChat() {
    debugger
    if (this.comment == '' || this.comment == undefined || this.comment == null) {
      return;
    }
    const checkPermission = this.dataSharedService.getUserPolicyMenuList.find(a => a.screenId === this.dataSharedService.currentMenuLink);
    if (!checkPermission?.creates && this.dataSharedService?.currentMenuLink !== '/ourbuilder') {
      this.toastr.warning("You do not have permission", { nzDuration: 3000 });
      return;
    }
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
        "ticketcomments.spectrumissueid": this.formlyModel ? (this.formlyModel['ticketcomments.spectrumissueid'] ? this.formlyModel['ticketcomments.spectrumissueid'] : '') : '',
        "ticketcomments.currentdate": "",
        "ticketcomments.commenttable": "",
        "ticketcomments.screenid": ""
      }
    };
    let actionID = this.editId ? putEvent?._id : postEvent._id;
    if (this.editId) {
      model['modalData']['ticketcomments.id'] = this.editId;
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
          this.resetValues();
          const successMessage = (model.postType === 'post') ? 'Save Successfully' : 'Update Successfully';
          this.toastr.success(successMessage, { nzDuration: 3000 });
          if (this.data.mapApi) {
            this.getChatsWithMapping();
            return;
          }
          if (model.postType === 'put' && !res?.isSuccess) {
            this.toastr.error(res.message, { nzDuration: 3000 });
            return;
          }
          this.getChats();
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
    const checkPermission = this.dataSharedService.getUserPolicyMenuList.find(a => a.screenId == this.dataSharedService.currentMenuLink);
    if (!checkPermission?.deletes && this.dataSharedService.currentMenuLink != '/ourbuilder') {
      alert("You did not have permission");
      return;
    }
    const model = {
      screenId: this.screenName,
      postType: 'delete',
      modalData: data
    };
    if (this.screenName != undefined) {
      const findClickApi = this.data.appConfigurableEvent.find((item: any) => item.rule.includes('delete'));
      if (!findClickApi) {
        this.toastr.warning("Action not found", { nzDuration: 3000 });
      }
      this.saveLoader = true;
      this.requestSubscription = this.employeeService.saveSQLDatabaseTable(`knex-query/executeDelete-rules/${findClickApi._id}`, model).subscribe({
        next: (res) => {
          this.saveLoader = false;
          this.resetValues();
          if (res.isSuccess) {
            this.toastr.success("Delete Successfully", { nzDuration: 3000 });
            this.data.chatData = this.data.chatData.filter((a: any) => a.id != data.id)
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
    this.cdr.detectChanges();
  }
  resetValues() {
    this.comment = '';
    this.editId = '';
    this.editDeleteId = '';
  }
  getChats() {
    if (this.data.eventActionconfig) {
      if (this.data.eventActionconfig.action) {
        this.saveLoader = true;
        this.applicationServices.callApi('knex-query/getexecute-rules/' + this.data.eventActionconfig._id, 'get', '', '', '').subscribe({
          next: (res) => {
            this.saveLoader = false; // Ensure to set the loader to false in case of error
            if (res.isSuccess) {
              this.data['chatData'] = res.data;
            }
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
  }

  showicon(){
    this.showIcon = true ;
    console.log(this.showIcon)
  }
  getChatsWithMapping() {
    let api = this.formlyModel ? (this.formlyModel['ticketcomments.spectrumissueid'] ? `${this.data.mapApi}/${this.formlyModel['ticketcomments.spectrumissueid']}` : '') : '';
    if (api) {
      this.data['chatData'] = [];
      this.saveLoader = true;
      this.requestSubscription = this.applicationService.getNestCommonAPI(api).subscribe({
        next: (res) => {
          this.saveLoader = false;
          if (res && res.data && res.data.length > 0) {
            this.data['chatData'] = res.data;
          }
        },
        error: (err) => {
          console.error(err);
          this.saveLoader = false;
          this.toastr.error("An error occurred in mapping", { nzDuration: 3000 });
        }
      });
    }
  }
}
