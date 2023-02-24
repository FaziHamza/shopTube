import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'app-formly-field-custom-input',
  template: `
  <input nz-input *ngIf="to['maskString']"  [mask]="to['maskString']"  class='form-control'
  [type]="type" [formlyAttributes]="field" aria-describedby="passwordHelpBlock">
  <input nz-input *ngIf="!to['maskString']" class='form-control' [type]="type" [formlyAttributes]="field" >
`,
})
export class FormlyFieldCustomInputComponent extends FieldType {
  get type() {
    return this.to.type || 'text';
  }
}

