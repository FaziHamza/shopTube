import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-application-theme',
  templateUrl: './application-theme.component.html',
  styleUrls: ['./application-theme.component.scss']
})
export class ApplicationThemeComponent {
  @Input() applicationList: any;
  selectedApplication: any;
  selectedTag: any;
  themeName: string = '';
  editId = '';
  tagList: any[] = [
    "p", "input", 'button'
  ];
  form: FormGroup;
  isSubmit: boolean = false;
  loader: boolean = false;
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 6;
  start = 1;
  end = 10;
  constructor(private fb: FormBuilder, private applicationService: ApplicationService, private toastr: NzMessageService, private modal: NzModalService) {
    this.form = this.fb.group({
      id: [''], // Application is required
      applicationId: ['', Validators.required], // Application is required
      tag: ['', Validators.required], // Tag is required
      classes: ['', Validators.required], // Classes is required
    });
  }
  ngOnInit() {
    this.getApplicationTheme();
  }


  save() {
    debugger
    if (this.form.valid) {
      if (this.listOfData.some((a) => a.name === this.form.value.tag)) {
        this.toastr.warning('Already classes exist against this tag', { nzDuration: 3000 });
        return;
      }
      const formValue = this.form.value;
      const app = this.applicationList.find((a: any) => a._id === formValue.applicationId);

      const classNamesArray = formValue.classes.split(/\s+/).filter(Boolean);

      const obj = {
        applicationTheme: {
          ...formValue,
          name: formValue.tag,
          applicationName: app?.name,
          classes: classNamesArray,
        }
      };

      this.loader = true;
      const checkPolicyAndProceed = this.editId == ''
        ? this.applicationService.addNestCommonAPI('cp', obj)
        : this.applicationService.updateNestCommonAPI('cp/applicationTheme', this.editId, obj);
      checkPolicyAndProceed.subscribe({
        next: (objTRes: any) => {
          this.loader = false;
          if (objTRes.isSuccess) {
            this.editId = '';
            this.form.reset();
            this.getApplicationTheme();
          } else {
            this.toastr.error(objTRes.message, { nzDuration: 3000 });
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

  getApplicationTheme() {
    this.loader = true;
    this.applicationService.getNestCommonAPI('cp/applicationTheme').subscribe(((res: any) => {
      this.loader = false;
      if (res.isSuccess) {
        this.listOfData = res.data;
        this.listOfDisplayData = res.data;
      } else
        this.toastr.warning(res.message, { nzDuration: 2000 });
    }));
  }
  delete(id: any) {
    this.loader = true;
    this.applicationService.deleteNestCommonAPI('cp/applicationTheme', id).subscribe(((res: any) => {
      this.loader = false;
      if (res.isSuccess) {
        this.getApplicationTheme();
      } else
        this.toastr.warning(res.message, { nzDuration: 2000 });
    }));
  }
  edit(data: any) {
    this.editId = data._id;
    this.form.patchValue({
      applicationId: data?.applicationId,
      tag: data?.name,
      classes: data?.classes.join(' '), // Join the array elements with a space
    });
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
}
