import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
    <nz-checkbox-wrapper [formControl]="formControl" *ngIf="list.length" style="width: 100%;" (nzOnChange)="log($event)">
      <div nz-row>
        <div nz-col ><label nz-checkbox [nzDisabled]='to.disabled' [nzValue]="item.value" *ngFor="let item of list">{{item.label}}</label></div>
      </div>
    </nz-checkbox-wrapper>
    <label *ngIf='list.length == 0'[nzDisabled]='to.disabled'  nz-checkbox style="width: 100%;" [formControl]="formControl"></label> 
  `,
})
export class FormlyFieldMultiCheckbox extends FieldType<FieldTypeConfig> {
  ngOnInit(): void {
    debugger
  }
  log(value: string[]): void {
    console.log(value);
  }

  get list(): any {
    if (this.to.options) {
      return this.to.options;
    } else {
      return [];
    }
  };


}
