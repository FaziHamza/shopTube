import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-vertical-theme-wrapper',
  template: `
    <!-- {{to.label | json}} -->
  <div class=" flex flex-wrap" [dir]="to.config?.formatAlignment || 'ltr'">
  <label [attr.for]="id" class="w-1/3 col-form-label column-form-label {{to.labelPosition}}" *ngIf="to.label">
    <span>
      <span nz-icon [nzType]="to.titleIcon" nzTheme="outline" class="mr-1 mb-1"></span>
      <span *ngIf="to.required">*</span>{{to.label}}
    </span>
    <span *ngIf="to?.tooltip" nz-tooltip [nzTooltipTitle]="to.tooltip">
      <span nz-icon nzType="question-circle" nzTheme="twotone"></span>
    </span>
  </label>
  <div class="w-2/3 column-form-input form-control-style v-body-border" style="padding: 0px" *ngIf="to.labelPosition !='rtl pr-1'">
    <ng-template #fieldComponent></ng-template>
  </div>
  <div *ngIf="showError" class="col-sm-8 offset-md-4 offset-sm-4 invalid-feedback d-block"><formly-validation-message [field]="field"></formly-validation-message></div>
</div>
  `,
})
export class FormlyVerticalThemeWrapper extends FieldWrapper {
  ngOnInit(): void {
    this.to;
  }
}
