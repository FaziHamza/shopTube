import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';


@Component({
  selector: 'app-formly-field-custom-input',
  template: `
  <nz-input-group [nzSuffix]="to.config?.addonLeft" [nzPrefix]="to.config?.addonRight" [nzStatus]="to.config?.status"
  [nzSize]="to.config?.size">
  <input nz-input *ngIf="!to['maskString']" class='form-control' [formControl]="formControl" [type]="type" [formlyAttributes]="field" >
  <input nz-input *ngIf="to['maskString']"  [formControl]="formControl" [mask]="to['maskString']"  class='form-control'
  [type]="type" [formlyAttributes]="field" aria-describedby="passwordHelpBlock">
</nz-input-group>

`,
})
export class FormlyFieldCustomInputComponent extends FieldType<FieldTypeConfig> {
  get type() {
    return this.to.type || 'text';
  }
}

