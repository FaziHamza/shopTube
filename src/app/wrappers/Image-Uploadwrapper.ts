import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldTypeConfig, FieldWrapper } from '@ngx-formly/core';
import { DataSharedService } from '../services/data-shared.service';
import { ApplicationService } from '../services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'formly-field-image-upload',
  template: `

<div class="imageUpoload"[class]="to['additionalProperties']?.wrapper=='floating_standard' ? 'relative z-0' : ''"
   *ngIf="to.type != 'number'">
   <nz-input-group [style.border-radius]="to['additionalProperties']?.borderRadius"
   [ngClass]="showError ? 'input-border' : ''"
   [nzSuffix]="(to['additionalProperties']?.addonRight   || to['additionalProperties']?.suffixicon) ? suffixTemplateInfo : undefined"
   [nzPrefix]="(to['additionalProperties']?.addonLeft || to['additionalProperties']?.prefixicon) ? prefixTemplateUser : undefined"
   [nzSize]="to['additionalProperties']?.size"
   [nzStatus]="to['additionalProperties']?.status">
   <input [accept]=" to['additionalProperties']?.filetype == 'excel' ?' application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :to['additionalProperties']?.filetype || '.jpg'"  [style.border-radius]="to['additionalProperties']?.borderRadius"
   [ngClass]=" showError && !to['additionalProperties']?.suffixicon && !to['additionalProperties']?.prefixicon
   && !to['additionalProperties']?.addonLeft && !to['additionalProperties']?.addonRight ? 'input-border' : ''"
   *ngIf=" to.type !='textarea'"
   [ngClass]="to['additionalProperties']?.wrapper=='floating_filled' || to['additionalProperties']?.wrapper=='floating_standard'
   || to['additionalProperties']?.wrapper=='floating_outlined' ? to['additionalProperties']?.floatFieldClass : ''"
   [formlyAttributes]=" field"
   nz-input
   [type]="'file'"
   (change)="onFileSelected($event)" 
   [placeholder]="to.placeholder"
   [nzStatus]="to['additionalProperties']?.status"
   [nzSize]="to['additionalProperties']?.size"
   [formControl]="formControl"
   [nzBorderless]="to['additionalProperties']?.border" />
   <label
   *ngIf="to['additionalProperties']?.wrapper == 'floating_filled' ||to['additionalProperties']?.wrapper=='floating_standard'
   ||to['additionalProperties']?.wrapper == 'floating_outlined'"
   [ngClass]="to['additionalProperties']?.floatLabelClass">{{ to.label ?? '' | translate }}
   </label>
   </nz-input-group>
</div>
<ng-template #suffixTemplateInfo>
   <ng-container *ngIf="to['additionalProperties']?.suffixicon ; else addonLeftText">
      <st-icon [type]="to['additionalProperties']?.iconType || 'outline'"
      [icon]="to['additionalProperties']?.suffixicon"
      [size]="to['additionalProperties']?.iconSize"
      [hoverIconColor]="to['additionalProperties']?.hoverIconColor || ''"
      [color]="to['additionalProperties']?.iconColor" ></st-icon>
   </ng-container>
   <ng-template #addonLeftText>
      {{to['additionalProperties']?.addonLeft}}
   </ng-template>
</ng-template>
<ng-template #prefixTemplateUser >
   <ng-container *ngIf="to['additionalProperties']?.prefixicon ; else addonRightText">
      <st-icon [type]="to['additionalProperties']?.iconType || 'outline'"
      [icon]="to['additionalProperties']?.prefixicon"
      [size]="to['additionalProperties']?.iconSize"
      [hoverIconColor]="to['additionalProperties']?.hoverIconColor || ''"
      [color]="to['additionalProperties']?.iconColor"
      ></st-icon>
   </ng-container>
   <ng-template #addonRightText>
      {{to['additionalProperties']?.addonRight}}
   </ng-template>
</ng-template>
  `,
})
export class FormlyFieldImageUploadComponent extends FieldWrapper<FieldTypeConfig> {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imageUrl: any;
  imagePath = environment.nestImageUrl;

  constructor(private sharedService: DataSharedService,private applicationService:ApplicationService) {
    super();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    debugger
    const formData = new FormData();
    formData.append('image', file);
    this.applicationService.uploadS3File(formData).subscribe({
      next: (res) => {
        // this.isLoading = false;
        // this.toastr.success('File uploaded successfully', { nzDuration: 3000 });
        this.formControl.patchValue(this.imagePath + res.path);
        // this.form.patchValue({ url:  })
        this.model.url = this.imagePath + res.path;
        console.log('File uploaded successfully:', res);
      },
      error: (err) => {
        // this.isLoading = false;
        console.error('Error uploading file:', err);
      }
    });
    // const reader = new FileReader();

    // if (file) {
    //   if (file.type === 'application/json') {
    //     reader.onload = () => {
    //       const base64Data = reader.result as string;
    //       const makeData = JSON.parse(base64Data);
    //       let data = makeData.screenData ? makeData.screenData : makeData;
    //       const currentData = JSON.parse(
    //         JSON.stringify(data, function (key, value) {
    //           if (typeof value === 'function') {
    //             return value.toString();
    //           } else {
    //             return value;
    //           }
    //         }) || '{}'
    //       );
    //       // this.formControl.setValue(JSON.stringify(currentData));
    //       this.sharedService.onChange(JSON.stringify(currentData), this.field);

    //     };

    //     reader.readAsText(file); // Read the JSON file as text
    //   }
    //   else {
    //     reader.readAsDataURL(file); // Read other types of files as data URL (base64)
    //     reader.onload = () => {
    //       const base64Data = reader.result as string;
    //       this.sharedService.imageUrl = base64Data;
    //       // this.formControl.setValue(base64Data);
    //       this.sharedService.onChange(base64Data, this.field);
    //     };
    //   }

    //   reader.onerror = (error) => {
    //     console.error('Error converting file to base64:', error);
    //   };
    // }

  }
  // Function to clear the selected file and reset the form control value
  clearFile() {
    this.imageUrl = null;
    this.fileInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }
}
