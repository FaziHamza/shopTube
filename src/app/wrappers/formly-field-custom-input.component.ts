
import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';


@Component({
  selector: 'st-formly-field-custom-input',
  template: `
<div [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' || to['additionalProperties']?.wrapper == 'floating_standard' ? 'height' : ''">
   <ng-container *ngIf="to['additionalProperties']?.wrapper != 'floating_standard'">
      <nz-input-group  [ngClass]="showError ? 'input-border' : ''" *ngIf="!to['additionalProperties']?.suffixicon && !to['additionalProperties']?.prefixicon" [nzSuffix]="to['additionalProperties']?.addonRight" [nzPrefix]="to['additionalProperties']?.addonLeft" [nzStatus]="to['additionalProperties']?.status" [nzSize]="to['additionalProperties']?.size">
      <input [ngClass]="showError && !to['additionalProperties']?.suffixicon && !to['additionalProperties']?.prefixicon && !to['additionalProperties']?.addonLeft && !to['additionalProperties']?.addonRight ? 'input-border' : ''" [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' ? to['additionalProperties']?.floatFieldClass : ''" nz-input *ngIf="!to['maskString']" class='form-control' [formControl]="formControl" [type]="type" [formlyAttributes]="field" [nzStatus]="to['additionalProperties']?.status">
      <input [ngClass]="showError && !to['additionalProperties']?.suffixicon && !to['additionalProperties']?.prefixicon && !to['additionalProperties']?.addonLeft && !to['additionalProperties']?.addonRight ? 'input-border' : ''" [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' ? to['additionalProperties']?.floatFieldClass : ''" nz-input *ngIf="to['maskString']" [formControl]="formControl" [mask]="to['maskString']" class='form-control' [type]="type" [formlyAttributes]="field" aria-describedby="passwordHelpBlock" [nzStatus]="to['additionalProperties']?.status">
      <label *ngIf="to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined'" [ngClass]="to['additionalProperties']?.floatLabelClass">{{to.label}}</label>
      </nz-input-group>
      <nz-input-group  [ngClass]="showError ? 'input-border' : ''" *ngIf="to['additionalProperties']?.suffixicon || to['additionalProperties']?.prefixicon" [nzSuffix]="suffixTemplateInfo" [nzPrefix]="prefixTemplateUser" [nzSize]="to['additionalProperties']?.size" [nzStatus]="to['additionalProperties']?.status" [nzSize]="to['additionalProperties']?.size">
      <input [ngClass]="showError && !to['additionalProperties']?.suffixicon && !to['additionalProperties']?.prefixicon && !to['additionalProperties']?.addonLeft && !to['additionalProperties']?.addonRight ? 'input-border' : ''" [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' ? to['additionalProperties']?.floatFieldClass : ''" nz-input *ngIf="!to['maskString']" class='form-control' [formControl]="formControl" [type]="type" [formlyAttributes]="field" [nzStatus]="to['additionalProperties']?.status">
      <input [ngClass]="showError && !to['additionalProperties']?.suffixicon && !to['additionalProperties']?.prefixicon && !to['additionalProperties']?.addonLeft && !to['additionalProperties']?.addonRight ? 'input-border' : ''" [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' ? to['additionalProperties']?.floatFieldClass : ''" nz-input *ngIf="to['maskString']" [formControl]="formControl" [mask]="to['maskString']" class='form-control' [type]="type" [formlyAttributes]="field" aria-describedby="passwordHelpBlock" [nzStatus]="to['additionalProperties']?.status">
      <label *ngIf="to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined'" [ngClass]="to['additionalProperties']?.floatLabelClass">{{to.label}}</label>
      </nz-input-group>
      <ng-template #prefixTemplateUser>
         <span>
         <st-icon *ngIf="to['additionalProperties']?.suffixicon" [type]="to['additionalProperties']?.iconType || 'outline'" [icon]="to['additionalProperties']?.suffixicon"
         [hoverIconColor]="to['additionalProperties']?.hoverIconColor || ''" [size]="to['additionalProperties']?.iconSize" [color]="to['additionalProperties']?.iconColor"></st-icon>
         </span>
      </ng-template>
      <ng-template #suffixTemplateInfo>
         <span>
         <st-icon *ngIf="to['additionalProperties']?.prefixicon" [type]="to['additionalProperties']?.iconType || 'outline'" [icon]="to['additionalProperties']?.prefixicon"
         [hoverIconColor]="to['additionalProperties']?.hoverIconColor || ''" [size]="to['additionalProperties']?.iconSize" [color]="to['additionalProperties']?.iconColor" ></st-icon>
         </span>
      </ng-template>
   </ng-container>
   <div class="relative z-0" *ngIf="to['additionalProperties']?.wrapper == 'floating_standard'">
      <input nz-input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" *ngIf="!to['maskString']"  [formControl]="formControl" [type]="type" [formlyAttributes]="field" [nzStatus]="to['additionalProperties']?.status">
      <input nz-input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" *ngIf="to['maskString']" [formControl]="formControl" [mask]="to['maskString']"  [type]="type" [formlyAttributes]="field" aria-describedby="passwordHelpBlock" [nzStatus]="to['additionalProperties']?.status">
      <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{to.label}}</label>
   </div>
</div>



`,
})
export class FormlyFieldCustomInputComponent extends FieldType<FieldTypeConfig> {
  get type() {
    return this.to.type || 'text';
  }
}

