import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-vertical-theme-wrapper',
  template: `
  <span *ngIf="to['additionalProperties']?.tooltip && to['additionalProperties']?.tooltipPosition == 'top' && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
  <span nz-icon nzType="question-circle" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span></span>
  <div class=" flex flex-wrap" [dir]="to['additionalProperties']?.formatAlignment || 'ltr'">
    <label [attr.for]="id" class="w-1/3 py-2 col-form-label column-form-label {{to['additionalProperties']?.labelPosition}}" *ngIf="to.label">
    <span  *ngIf="to['additionalProperties']?.tooltip && to['additionalProperties']['tooltipPosition'] == 'left' && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
      <span nz-icon nzType="question-circle" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span>
    </span>
      <span class="mr-1 mb-1">
        <st-icon *ngIf="to['additionalProperties']?.titleIcon" [type]="to['additionalProperties']?.iconType || 'outline'" [icon]="to['additionalProperties']?.titleIcon" [size]="to['additionalProperties']?.iconSize" [hoverIconColor]="to['additionalProperties']?.hoverIconColor || ''" [color]="to['additionalProperties']?.iconColor"></st-icon>
      </span>
      {{to.label}}
      <span *ngIf="to.required" class="text-red-600">*</span>
      <span *ngIf="to['additionalProperties']?.tooltip && (to['additionalProperties']['tooltipPosition'] == 'right' || to['additionalProperties']?.tooltipPosition == undefined) && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
        <span nz-icon nzType="question-circle" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span>
      </span>
    </label>
    <div class="w-2/3 column-form-input form-control-style v-body-border" style="padding: 0px">
      <ng-template #fieldComponent></ng-template>
    </div>
    <div *ngIf="showError && to.label" class="w-1/3 {{to['additionalProperties']?.labelPosition}}"></div>
    <div *ngIf="showError" class="w-2/3 text-red-500 text-sm block" style="padding: 0px">
      <span>{{to['additionalProperties']?.requiredMessage}}</span>
      <!-- <formly-validation-message [field]="field"></formly-validation-message> -->
    </div>
  </div>
  `,
})
export class FormlyVerticalThemeWrapper extends FieldWrapper {
  ngOnInit(): void {
    this.to;
  }
}
