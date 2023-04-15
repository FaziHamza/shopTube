import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-vertical-theme-wrapper',
  template: `
    <div class=" flex flex-wrap" [dir]="to.config?.formatAlignment || 'ltr'">
  <label [attr.for]="id" class="w-1/3 py-2 col-form-label column-form-label {{to.labelPosition}}" *ngIf="to.label">
    <span nz-icon [nzType]="to.titleIcon" nzTheme="outline"></span>
    <span *ngIf="to.required">*</span>{{to.label}}
    <span *ngIf="to?.tooltip && !to?.config?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to.tooltip">
          <span nz-icon nzType="question-circle" nzTheme="twotone"></span>
        </span>
  </label>
  <div class="w-2/3 column-form-input form-control-style v-body-border" style="padding: 0px" >
    <ng-template #fieldComponent></ng-template>
  </div>
  <div *ngIf="showError && to.label" class="w-1/3 py-2 col-form-label column-form-label {{to.labelPosition}}"></div>
  <div *ngIf="showError" class="w-2/3 column-form-input form-control-style v-body-border text-red-500 text-sm block" style="padding: 0px" >
    <formly-validation-message [field]="field"></formly-validation-message>
  </div>
</div>
  `,
})
export class FormlyVerticalThemeWrapper extends FieldWrapper {
  ngOnInit(): void {
    this.to;
  }
}
