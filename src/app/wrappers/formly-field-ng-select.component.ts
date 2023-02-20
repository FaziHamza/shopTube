import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-select',
  template: `
  <nz-select ngModel="lucy">
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
    </nz-select>

  <!-- <ng-select [items]="list"
      [bindLabel]="labelProp"
      [bindValue]="valueProp"
      [multiple]="to.multiple"
      [placeholder]="to.placeholder"
      [(ngModel)]="selectedValue"
      >
    </ng-select> -->

  `,
})
export class FormlyFieldNgSelectComponent extends FieldType {
  // get labelProp(): any {
  //   return this.to.labelProp || 'label';
  // }
  // get labelVal(): any {
  //   return this.to.label ;
  // }
  // get list(): any {
  //   return this.to.options;
  // }
  // get valueProp(): any {
  //   return this.to.valueProp || 'value';
  // }
  // get groupProp(): any {
  //   return this.to.groupProp || 'group';
  // }
  // selectedValue: any;

  // ngOnInit() {
  //   debugger
  //   this.selectedValue = this.to.defaultValue;
  // }
}
