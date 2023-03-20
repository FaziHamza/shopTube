import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
  <nz-input-group [nzSuffix]="to.config?.addonLeft" [nzPrefix]="to.config?.addonRight" [nzStatus]="to.config?.status"
  [nzSize]="to.config?.size">
  <nz-range-picker nzMode="date" style="width:100%" [nzDisabled]="to.disabled" [formControl]="formControl" [nzStatus]="to.config?.status"></nz-range-picker>
</nz-input-group>
  `,
})
export class FormlyFieldRangeDate extends FieldType<FieldTypeConfig> {
  date = null;
  onChange(result: Date[]): void {
    // console.log('onChange: ', result);
  }
}
