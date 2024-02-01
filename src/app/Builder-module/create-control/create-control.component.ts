import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplicationService } from 'src/app/services/application.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'st-create-control',
  templateUrl: './create-control.component.html',
  styleUrls: ['./create-control.component.scss']
})
export class CreateControlComponent {
  form: FormGroup;
  loader: boolean = false;
  editId: any = '';
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  start = 1;
  end = 10;
  listOfColumns = [
    {
      name: 'NO',
      key: 'no',
      searchValue: '',
      hideSearch: true,
      visible: false
    },
    {
      name: 'NAME',
      key: 'name',
      searchValue: '',
      hideSearch: false,
      visible: false
    },
    {
      name: 'ACTION',
      key: 'action',
      searchValue: '',
      hideSearch: true,
      visible: false
    },
  ];
  constructor(private fb: FormBuilder, private socketService: SocketService, private toastr: NzMessageService, private modal: NzModalService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required], // Classes is required
      controlJson: ['', Validators.required], // Classes is required
    });
  }
  ngOnInit() {
    this.getcontrols();
  }
  save() {

    if (this.form.valid) {
      if (this.editId === '' && this.listOfData.some((a: any) => a.name == this.form.value.name)) {
        this.toastr.warning('Already exist this name exist', { nzDuration: 3000 });
        return;
      } else if (this.listOfData.some((a: any) => a.name === this.form.value.name && a._id !== this.editId)) {
        this.toastr.warning('Already exist this name exist', { nzDuration: 3000 });
        return;
      }
      var ResponseGuid: any;
      if (this.editId == '') {
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [`controls`]: this.form.value, metaInfo: metainfocreate }
        this.socketService.Request(Add);
      }
      else {
        const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(this.editId);
        ResponseGuid = newUGuid;
        const Update = { [`controls`]: this.form.value, metaInfo: metainfoupdate };
        this.socketService.Request(Update)
      }
      this.loader = true;
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            this.loader = false;
            if (res.isSuccess) {
              this.editId = '';
              this.form.reset();
              this.getcontrols();
            } else {
              this.toastr.error(res.message, { nzDuration: 3000 });
            }
          }

        },
        error: (err) => {
          this.loader = false;
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
    else {
      this.toastr.warning('Please enter data', { nzDuration: 3000 });
    }
  }
  getcontrols() {
    this.loader = true;
    const { jsonData, newGuid } = this.socketService.makeJsonData('controls', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe(((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        this.loader = false;
        if (res.isSuccess) {
          this.listOfData = res.data;
          this.listOfDisplayData = res.data;
          this.onPageIndexChange(1);
        } else
          this.toastr.warning(res.message, { nzDuration: 2000 });
      }
    }));
  }
  searchValue(event: any, column: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: any) => {
        const { key } = column;
        const { [key]: itemName } = item || {}; // Check if item is undefined, set to empty object if so
        return itemName?.toLowerCase()?.includes(inputValue); // Check if itemName is undefined or null
      });
    }
  }
  search(): void {
    this.listOfDisplayData = this.listOfData;
    let checkSearchExist = this.listOfColumns.filter(a => a.searchValue);
    if (checkSearchExist.length > 0) {
      checkSearchExist.forEach(element => {
        this.searchValue(element.searchValue, element)
      });
    }
    // this.onPageIndexChange(1);
  }
  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.updatefilesList();
  }

  updatefilesList(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.start = start == 0 ? 1 : ((this.pageIndex * this.pageSize) - this.pageSize) + 1;
    this.listOfDisplayData = this.listOfData.slice(start, end);
    this.end = this.listOfData.length != 6 ? this.listOfDisplayData.length : this.pageIndex * this.pageSize;
  }
  showDeleteConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Record?',
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzClassName: 'deleteRow',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  delete(id: any) {
    this.loader = true;
    const { jsonData, newGuid } = this.socketService.deleteModelType('controls', id);
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe(((res: any) => {
      if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        this.loader = false;
        if (res.isSuccess) {
          this.getcontrols();
        } else
          this.toastr.warning(res.message, { nzDuration: 2000 });
      }
    }));
  }
  edit(data: any) {
    this.editId = data._id;
    this.form.patchValue({
      name: data?.name,
      controlJson: data?.controlJson,
    });
  }
  reset() {
    this.editId = '';
    this.form.reset()
  }
}
