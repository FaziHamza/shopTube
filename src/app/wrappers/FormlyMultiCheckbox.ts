import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
    <nz-checkbox-wrapper style="width: 100%;" (nzOnChange)="log($event)">
      <div nz-row>
        <div nz-col ><label nz-checkbox [nzValue]="item.value" *ngFor="let item of list">{{item.value}}</label></div>
      </div>
    </nz-checkbox-wrapper>
  `,
})
export class FormlyFieldMultiCheckbox extends FieldType {
  log(value: string[]): void {
    console.log(value);
  }

  get list(): any {
    return this.to.options;
  }

}
