import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldTypeConfig, FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-image-upload',
  template: `
    <div class="imageUpoload">
      <input nz-input type="file" (change)="onFileSelected($event)" #fileInput [formlyAttributes]="field">
    </div>
  `,
})
export class FormlyFieldImageUploadComponent extends FieldWrapper<FieldTypeConfig> {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imageUrl: any;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    const reader = new FileReader();

    if (file.type === 'application/json') {
      reader.onload = () => {
        const base64Data = reader.result as string;
        const makeData = JSON.parse(base64Data);
        const currentData = JSON.parse(
          JSON.stringify(makeData.screenData, function (key, value) {
            if (typeof value === 'function') {
              return value.toString();
            } else {
              return value;
            }
          }) || '{}'
        );
        this.formControl.setValue(JSON.stringify(currentData));
      };

      reader.readAsText(file); // Read the JSON file as text
    } else {
      reader.readAsDataURL(file); // Read other types of files as data URL (base64)
      reader.onload = () => {
        const base64Data = reader.result as string;
        this.formControl.setValue(base64Data);
      };
    }

    reader.onerror = (error) => {
      console.error('Error converting file to base64:', error);
    };
  }
  // Function to clear the selected file and reset the form control value
  clearFile() {
    this.imageUrl = null;
    this.fileInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }
}
