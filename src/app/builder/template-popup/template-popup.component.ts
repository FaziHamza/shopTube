import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-template-popup',
  templateUrl: './template-popup.component.html',
  styleUrls: ['./template-popup.component.scss']
})
export class TemplatePopupComponent implements OnInit {

  form: FormGroup;
  imageUrl: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      thumbnailImage: [null, Validators.required],
    });
  }

  onSubmit() {
    
    if (this.form.valid) {
      const formData = this.form.value;
      this.modalRef.destroy(formData);
    }
  }

  onCancel() {
    this.modalRef.destroy();
  }

  beforeUpload = (file: NzUploadFile): boolean | Observable<boolean> => {
    const isImage = file?.type?.startsWith('image/');
    if (!isImage) {
      this.messageService.error('You can only upload image files!');
      return false;
    }
    this.form.patchValue({ thumbnailImage: file });
    this.imageUrl = file.name;
    return false;
  };

}
