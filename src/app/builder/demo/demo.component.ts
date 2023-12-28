import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  form: FormGroup;
  isVisible: boolean = false;
  selectedFiles: any;
  constructor(private fb: FormBuilder, private applicationService: ApplicationService, private toastr: NzMessageService, private modal: NzModalService
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
  sendEmail() {
    const formData = new FormData();

    // Append form data
    Object.keys(this.form.value).forEach((key) => {
      formData.append(key, this.form.value[key]);
    });

    // Append files
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('attachments', this.selectedFiles[i]);
    }

    console.log(formData);
    let obj = this.form.value;
    obj['attachments'] = formData;
    this.applicationService.addNestCommonAPI('email/sendEmailReal', formData).subscribe(
      (res: any) => {
        this.toastr.success(res.message, { nzDuration: 2000 });
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }

  openEmail(value: any) {
    this.isVisible = value;
  }
  onFileChange(event: any) {
    const files: File[] = event.target.files;
    this.selectedFiles = files;
  }


}
