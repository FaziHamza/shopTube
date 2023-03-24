import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-vertical-wrapper',
  template: `
  <div [class]='to.labelPosition'>
    <label [attr.for]="id" class="col-form-label" *ngIf="to.label" [style.background-color]="to['labelBackgroundColor']" [style.color]="to['labelColor']">
    <span>
        <span nz-icon [nzType]="to.titleIcon" nzTheme="outline" class="mr-1 mb-1"></span>
        <span *ngIf="to.required">*</span>{{to.label}}
      </span>
      <span *ngIf="to?.tooltip" nz-tooltip [nzTooltipTitle]="to.tooltip">
        <span nz-icon nzType="question-circle" nzTheme="twotone"></span>
      </span>
    </label>
  </div>
  <div class="mt-1">
    <ng-template #fieldComponent></ng-template>
  </div>
  <div *ngIf="showError" class="invalid-feedback d-block">
    <formly-validation-message [field]="field"></formly-validation-message>
  </div>
  `,
})
export class FormlyVerticalWrapper extends FieldWrapper {
  ngOnInit(): void {
    
    this.to
  }
}
