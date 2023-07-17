import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldTypeConfig, FieldWrapper } from '@ngx-formly/core';
import { DataSharedService } from '../services/data-shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'formly-field-image-upload',
  template: `
    <div class="imageUpoload">
      <input nz-input type="file" (change)="onFileSelected($event)" [formControl]="formControl" [formlyAttributes]="field">
    </div>
  `,
})
export class FormlyFieldImageUploadComponent extends FieldWrapper<FieldTypeConfig> {
  constructor(public dataSharedService: DataSharedService, private http: HttpClient) {
    super();
  }
  imageUrl: any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      this.imageUrl = ev.target.result;
      if (this.imageUrl) {
        this.dataSharedService.imageUrl = this.imageUrl;
      }
    };
    reader.readAsDataURL(file);
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.formControl.setValue(formData);
  }
}
