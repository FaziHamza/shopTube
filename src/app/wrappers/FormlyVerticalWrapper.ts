import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-vertical-wrapper',
  template: `
  <div >
   <label [attr.for]="id" class="col-form-label" *ngIf="to.label" [style.background-color]="to['labelBackgroundColor']"
   [style.color]="to['labelColor']">
   <span ><i *ngIf="to['labelIcon']" [class]="to['labelIcon']" style="padding-right: 1%;"></i>{{ to.label }}</span>
    <span  nz-tooltip nzTooltipTitle="prompt text" class="uil uil-question-circle"></span>
  </label>
  <div class="mt-1">
    <ng-template #fieldComponent></ng-template>
  </div>
  <div *ngIf="showError" class="invalid-feedback d-block">
    <formly-validation-message [field]="field"></formly-validation-message>
  </div>
</div>
  `,
})
export class FormlyVerticalWrapper extends FieldWrapper {
  ngOnInit(): void {
    
    this.to
  }
}
