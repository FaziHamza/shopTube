import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApplicationService } from 'src/app/services/application.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';


@Component({
  selector: 'st-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  form: FormGroup;
  isVisible: boolean = false;
  saveLoader: boolean = false;
  selectedFiles: any = [];
  to: any = [];
  cc: any = [];
  bcc: any = [];
  @ViewChild('fileInputRef') fileInputRef: ElementRef | undefined;
  constructor(private fb: FormBuilder, private applicationService: ApplicationService, private toastr: NzMessageService, private modal: NzModalService,
    private msg: NzMessageService
  ) {
    this.form = this.fb.group({
      to: ['', Validators.required], // Classes is required
      cc: ['', Validators.required], // Classes is required
      bcc: ['', Validators.required], // Classes is required
      subject: ['', Validators.required], // Classes is required
      text: ['', Validators.required], // Classes is required
      attachments: [null],
    });
  }

  ngOnInit() {

  }
  fileList: NzUploadFile[] = [];
  listOfOption = [
    {
      label: 'hasnainatique786@gmail.com',
      value: 'hasnainatique786@gmail.com'
    },
    {
      label: 'alizaidi85240@gmail.com',
      value: 'alizaidi85240@gmail.com'
    }
  ]
  sendEmail() {
    debugger
    this.form.patchValue({
      'to': this.to,
      'cc': this.cc,
      'bcc': this.bcc,
    })
    const formData = new FormData();

    // Append form data
    Object.keys(this.form.value).forEach((key) => {
      formData.append(key, this.form.value[key]);
    });

    // Append files to formData
    // Append files to formData
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }
    }
    this.saveLoader = true;
    this.applicationService.addNestCommonAPI('email/send-email', formData).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(res.message, { nzDuration: 2000 });
        } else {
          this.toastr.error(res.message, { nzDuration: 2000 });
        }
        // this.openEmail(false);
        this.saveLoader = false;
      },
      error: (err) => {
        this.saveLoader = false;
        this.toastr.error(`some error exception : ${err}`, { nzDuration: 2000 });
      },
    });
  }

  onFileChange(event: any) {
    this.selectedFiles.push(event.target.files[0]);
    // Clear the file input
    if (this.fileInputRef && this.fileInputRef.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }

  }
  openEmail(value: any) {
    this.isVisible = value;
    if (value == false) {
      this.form.reset();
      this.selectedFiles = [];
      this.to = [];
      this.cc = [];
      this.bcc = [];

    }
  }
  removeFile(file: any): void {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
  }
}
