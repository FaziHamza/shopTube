import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-select',
  template: `
      <nz-select nzShowSearch nzAllowClear nzPlaceHolder="Select a person" [(ngModel)]="selectedValue">
      <nz-option [nzLabel]="item.label" [nzValue]="item.value" *ngFor="let item of list"></nz-option>
    </nz-select>
  `,
})
export class FormlyFieldNgSelectComponent extends FieldType {
  selectedValue = null;
  get list(): any {
    return this.to.options;
  }
}
