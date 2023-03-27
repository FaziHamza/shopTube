import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-select',
  template: `
  <ng-container *ngIf="to.config?.wrapper != 'floating_standard'">
    <nz-input-group  [nzSuffix]="to.config?.addonLeft" [nzPrefix]="to.config?.addonRight" [nzStatus]="to.config?.status" [nzSize]="to.config?.size">
      <nz-select [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' ? to.config?.floatFieldClass : ''" [formControl]="formControl" [nzStatus]="to.config?.status" [nzSize]="to.config?.size">
        <nz-option [nzLabel]="item.label" [nzValue]="item.value" *ngFor="let item of list"></nz-option>
      </nz-select>
      <label *ngIf="to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined'" [ngClass]="to.config?.floatLabelClass">{{to.label}}</label>
    </nz-input-group>
  </ng-container>
  <div class="relative z-0" *ngIf="to.config?.wrapper == 'floating_standard'">
    <nz-select class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' ? to.config?.floatFieldClass : ''" nzShowSearch nzAllowClear [nzPlaceHolder]="to.placeholder || ''" [formControl]="formControl" [nzStatus]="to.config?.status" [nzSize]="to.config?.size">
      <nz-option [nzLabel]="item.label" [nzValue]="item.value" *ngFor="let item of list"></nz-option>
    </nz-select>
    <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{to.label}}</label>
  </div>
   
  `,
})
export class FormlyFieldNgSelectComponent extends FieldType<FieldTypeConfig> {
  selectedValue = null;
  get list(): any {
    return this.to.options;
  }
}
