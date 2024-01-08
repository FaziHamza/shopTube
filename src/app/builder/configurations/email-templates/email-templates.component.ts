import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent {
  emailForm: FormGroup;
  imagePath = environment.nestImageUrl;
  loader: boolean = false;
  emailTemplateId: any = '';
  @Input() screenname: any;
  @Input() screenId: any;
  constructor(private fb: FormBuilder, private applicationService: ApplicationService, private toastr: NzMessageService) {
    this.emailForm = this.fb.group({
      fields: this.fb.array([
        // this.createField()
      ])
    });
  }
  ngOnInit(): void {
    this.getEmailTemplates();
  }
  createField(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      emailTemplate: ['', Validators.required],
      image: [''],
      imagePath: [''],
      _id: [''],
      templateType: ['', Validators.required]
    });
  }

  get emailFields() {
    return this.emailForm.get('fields') as FormArray;
  }

  addField() {
    this.emailFields.push(this.createField());
  }

  removeField(index: number) {
    this.emailFields.removeAt(index);
  }

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    this.uploadFile(file, index);
  }

  uploadFile(file: File, index: number) {
    const formData = new FormData();
    formData.append('image', file);
    this.loader = true;
    this.applicationService.uploadS3File(formData).subscribe({
      next: (res) => {
        this.loader = false;
        let imageValue = this.imagePath + res.path;
        this.emailFields.at(index).get('imagePath')?.setValue(imageValue); // Assign image value to the form control
        console.log('File uploaded successfully:', res);
      },
      error: (err) => {
        this.loader = false;
        console.error('Error uploading file:', err);
      }
    });
  }



  saveForm() {
    if (!this.emailForm.valid) {
      this.toastr.warning("Please enter data in required fields", { nzDuration: 3000 });
      return;
    }
    let saveData: any[] = [];
    this.emailForm.value.fields.forEach((element: any) => {
      const emailData: any = {
        "screenname": this.screenname,
        "applicationId": JSON.parse(localStorage.getItem('applicationId')!),
        "screenBuilderId": this.screenId,
        "emailTemplate": element?.emailTemplate,
        "name": element?.name,
        "templateType": element?.templateType,
      }
      if (element._id) {
        emailData['_id'] = element._id;
      }
      saveData.push(emailData)
    });


    this.loader = true;
    this.applicationService.addNestCommonAPI('cp/deleteEmailTemplate/' + this.screenId, saveData).subscribe({
      next: (allResults: any) => {
        this.loader = false;
        if (allResults) {
          this.toastr.success("Save Successfully", { nzDuration: 3000 });
          // this.getEmailTemplates();
        }
      },
      error: (err) => {
        this.loader = false;
        console.error(err);
        this.toastr.error(" An error occured", { nzDuration: 3000 });
      }
    })
  }

  removeImage(index: number) {
    const imageControl = this.emailFields.at(index).get('image');
    const imagePathControl = this.emailFields.at(index).get('imagePath');

    if (imageControl && imagePathControl) {
      imageControl.reset();
      imagePathControl.reset();
    }
  }

  imagePreview(imagePath: string | undefined) {
    if (imagePath) {
      window.open(imagePath, '_blank');
    }
  }

  getEmailTemplates() {
    
    this.loader = true;
    this.applicationService.getNestCommonAPIById('cp/emailTemplates', this.screenId).subscribe((getRes: any) => {
      this.loader = false;
      if (getRes.isSuccess) {
        getRes.data.forEach((data: any) => {
          this.emailFields.push(this.fb.group({
            _id: [data._id],
            name: [data.name],
            emailTemplate: [data.emailTemplate],
            screenBuilderId: [data.screenBuilderId],
            applicationId: [data.applicationId],
            screenname: [data.screenname],
            image: [''],
            imagePath: [''],
            templateType: [data?.templateType ? data?.templateType : '']
          }));
        });
      } else
        this.toastr.error(getRes.message, { nzDuration: 3000 });
    });
  }

}
