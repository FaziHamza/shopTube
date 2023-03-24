import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-select',
  template: `
  <nz-input-group [nzSuffix]="to.config?.addonLeft" [nzPrefix]="to.config?.addonRight" [nzStatus]="to.config?.status" [nzSize]="to.config?.size">
    <nz-select nzShowSearch nzAllowClear [nzPlaceHolder]="to.placeholder || ''" [formControl]="formControl" [nzStatus]="to.config?.status" [nzSize]="to.config?.size">
      <nz-option [nzLabel]="item.label" [nzValue]="item.value" *ngFor="let item of list"></nz-option>
    </nz-select>
  </nz-input-group>
   
  `,
})
export class FormlyFieldNgSelectComponent extends FieldType<FieldTypeConfig> {
  selectedValue = null;
  get list(): any {
    return this.to.options;
  }
}
