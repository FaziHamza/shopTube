import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
    <div class="checkBox">
    <nz-checkbox-wrapper [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' || to.config?.wrapper == 'floating_standard' ? to.config?.floatFieldClass.replace('block','') : ''"  *ngIf="list.length" style="width: 100%;" (nzOnChange)="log($event)">
      <div nz-row>
        <div nz-col ><label nz-checkbox [nzDisabled]='to.disabled' [formControl]="formControl" [nzValue]="item.value" *ngFor="let item of list">{{item.label}}</label></div>
      </div>
    </nz-checkbox-wrapper>
    <label [ngClass]="to.config?.floatLabelClass" *ngIf='list.length == 0'[nzDisabled]='to.disabled'  nz-checkbox style="width: 100%;" [formControl]="formControl"></label>
    </div>

  `,
})
export class FormlyFieldMultiCheckbox extends FieldType<FieldTypeConfig> {
  ngOnInit(): void {

  }
  log(value: string[]): void {
    console.log(value);
    this.formControl.patchValue(value);
  }

  get list(): any {
    if (this.to.options) {
      return this.to.options;
    } else {
      return [];
    }
  };


}
