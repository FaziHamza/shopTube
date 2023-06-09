import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-vertical-wrapper',
  template: `
  <span *ngIf="to['additionalProperties']['tooltipPosition'] == 'top' && to['additionalProperties']?.tooltip">
  <span *ngIf="to['additionalProperties']?.tooltip && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
  <span nz-icon nzType="question-circle" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span></span>
  </span>

  <div class="pr-1" [dir]="to['additionalProperties']?.formatAlignment || 'ltr'">
    <div [class]='to["additionalProperties"]?.labelPosition'>
      <span *ngIf="to['additionalProperties']?.tooltipPosition == 'left'">
      <span *ngIf="to['additionalProperties']?.tooltip && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
        <span nz-icon nzType="question-circle" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span>
      </span>
      </span>
      <label class="label-style" [attr.for]="id" class="col-form-label {{to['additionalProperties']?.labelPosition}} pl-1" *ngIf="to.label" [style.background-color]="to['labelBackgroundColor']" [style.color]="to['labelColor']">
        <span>
          <span class="mr-1 mb-1">
            <st-icon *ngIf="to['additionalProperties']?.titleIcon" [type]="to['additionalProperties']?.iconType || 'outline'" [icon]="to['additionalProperties']?.titleIcon" [hoverIconColor]="to['additionalProperties']?.hoverIconColor || ''" [size]="to['additionalProperties']?.iconSize" [color]="to['additionalProperties']?.iconColor"></st-icon>
          </span>
          <span *ngIf="to.required">*</span>{{to.label | translate}}
        </span>
        <span *ngIf="to['additionalProperties']?.tooltipPosition == 'right' || to['additionalProperties']?.tooltipPosition == undefined">
        <span *ngIf="to['additionalProperties']?.tooltip && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
          <span nz-icon nzType="question-circle" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span>
        </span>
        </span>
      </label>
    </div>
    <div class="mt-1 pl-2">
      <ng-template #fieldComponent></ng-template>
    </div>
    <div *ngIf="showError" class="text-red-500 text-sm block pl-2">
      <span>{{to['additionalProperties']?.requiredMessage}}</span>
      <!-- <formly-validation-message [field]="field"></formly-validation-message> -->
    </div>
  </div>

  `,
})
export class FormlyVerticalWrapper extends FieldWrapper {
  ngOnInit(): void {
    this.to;

  }
}
