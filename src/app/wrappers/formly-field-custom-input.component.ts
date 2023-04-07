
import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';


@Component({
  selector: 'st-formly-field-custom-input',
  template: `
  <div [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' || to.config?.wrapper == 'floating_standard' ? 'height' : ''">
  <ng-container *ngIf="to.config?.wrapper != 'floating_standard'">
    <nz-input-group  [nzSuffix]="to.config?.addonLeft" [nzPrefix]="to.config?.addonRight" [nzStatus]="to.config?.status" [nzSize]="to.config?.size">
      <input [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' ? to.config?.floatFieldClass : ''" nz-input *ngIf="!to['maskString']" class='form-control' [formControl]="formControl" [type]="type" [formlyAttributes]="field" [nzStatus]="to.config?.status">
      <input [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' ? to.config?.floatFieldClass : ''" nz-input *ngIf="to['maskString']" [formControl]="formControl" [mask]="to['maskString']" class='form-control' [type]="type" [formlyAttributes]="field" aria-describedby="passwordHelpBlock" [nzStatus]="to.config?.status">
      <label *ngIf="to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined'" [ngClass]="to.config?.floatLabelClass">{{to.label}}</label>
    </nz-input-group>
  </ng-container>
  <div class="relative z-0" *ngIf="to.config?.wrapper == 'floating_standard'">
    <input nz-input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" *ngIf="!to['maskString']" class='form-control' [formControl]="formControl" [type]="type" [formlyAttributes]="field" [nzStatus]="to.config?.status">
    <input nz-input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" *ngIf="to['maskString']" [formControl]="formControl" [mask]="to['maskString']" class='form-control' [type]="type" [formlyAttributes]="field" aria-describedby="passwordHelpBlock" [nzStatus]="to.config?.status">
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

