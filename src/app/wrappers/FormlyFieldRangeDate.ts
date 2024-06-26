import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'st-formly-field-ng-search',
  template: `
    <ng-container *ngIf="to['additionalProperties']?.wrapper != 'floating_standard'">
    <nz-input-group [nzSuffix]="to['additionalProperties']?.addonLeft" [nzPrefix]="to['additionalProperties']?.addonRight" [nzStatus]="to['additionalProperties']?.status"
  [nzSize]="to['additionalProperties']?.size">
  <nz-range-picker [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' ? to['additionalProperties']?.floatFieldClass : ''" nzMode="date" style="width:100%" [nzDisabled]="to.disabled" [formControl]="formControl" [nzStatus]="to['additionalProperties']?.status"></nz-range-picker>
  <label *ngIf="to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined'" [ngClass]="to['additionalProperties']?.floatLabelClass">{{to.label}}</label>
</nz-input-group>
    </ng-container>
    <div class="relative z-0" *ngIf="to['additionalProperties']?.wrapper == 'floating_standard'">
    <nz-range-picker class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" nzMode="date" style="width:100%" [nzDisabled]="to.disabled" [formControl]="formControl" [nzStatus]="to['additionalProperties']?.status"></nz-range-picker>
    <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{to.label}}</label>
    </div>

  `,
})
export class FormlyFieldRangeDate extends FieldType<FieldTypeConfig> {
  date = null;
  onChange(result: Date[]): void {
    // console.log('onChange: ', result);
  }
}
