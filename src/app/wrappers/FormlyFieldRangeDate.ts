import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
    <nz-range-picker nzMode="date" style="width:100%" [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-range-picker>
  `,
})
export class FormlyFieldRangeDate extends FieldType {
  date = null;
  onChange(result: Date[]): void {
    // console.log('onChange: ', result);
  }
}
