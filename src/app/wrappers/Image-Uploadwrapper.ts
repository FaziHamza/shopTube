import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldTypeConfig, FieldWrapper } from '@ngx-formly/core';
import { DataSharedService } from '../services/data-shared.service';

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
   <input [style.border-radius]="to['additionalProperties']?.borderRadius"
   [ngClass]=" showError && !to['additionalProperties']?.suffixicon && !to['additionalProperties']?.prefixicon
   && !to['additionalProperties']?.addonLeft && !to['additionalProperties']?.addonRight ? 'input-border' : ''"
   *ngIf=" to.type !='textarea'"
   [ngClass]="to['additionalProperties']?.wrapper=='floating_filled' || to['additionalProperties']?.wrapper=='floating_standard'
   || to['additionalProperties']?.wrapper=='floating_outlined' ? to['additionalProperties']?.floatFieldClass : ''"
   [formlyAttributes]=" field"
   nz-input
   [type]="'file'"
   (change)="onFileSelected($event)" #fileInput
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
  constructor(private sharedService: DataSharedService) {
    super();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    const reader = new FileReader();
    if (file) {
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
          // this.formControl.setValue(JSON.stringify(currentData));
          this.sharedService.onChange(JSON.stringify(currentData), this.field);

        };

        reader.readAsText(file); // Read the JSON file as text
      }
      else {
        reader.readAsDataURL(file); // Read other types of files as data URL (base64)
        reader.onload = () => {
          const base64Data = reader.result as string;
          // this.formControl.setValue(base64Data);
          this.sharedService.onChange(base64Data, this.field);
        };
      }

      reader.onerror = (error) => {
        console.error('Error converting file to base64:', error);
      };
    }

  }
  // Function to clear the selected file and reset the form control value
  clearFile() {
    this.imageUrl = null;
    this.fileInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }
}
