import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-vertical-theme-wrapper',
  template: `
  <div class=" row mt-1 mb-1"  >
 
  <label [attr.for]="id" class="col-sm-4 col-form-label column-form-label"  *ngIf="to.label">
   <span style="color: #0B0B0B;
    font-size: 17px;"><i *ngIf="to.labelIcon" class={{to.labelIcon}}></i>{{ to.label }}</span>  
    <!-- <ng-container *ngIf="to.required && to.hideRequiredMarker !== true"> *</ng-container> -->
    <span *ngIf="to?.tooltip && to.tooltip.content" nz-tooltip nzTooltipTitle="prompt text" class=" uil uil-question-circle">Tooltip will show when mouse enter.</span>
  </label>
  <div class="col-sm-8 column-form-input form-control-style v-body-border" style="padding: 0px">
    <ng-template #fieldComponent ></ng-template>
  </div>
  <!-- <div *ngIf="showError" class="col-sm-8 offset-md-4 offset-sm-4 invalid-feedback d-block">
    <formly-validation-message [field]="field"></formly-validation-message>
  </div> -->
</div>
  `,
})
export class FormlyVerticalThemeWrapper extends FieldWrapper {
  class: any;
  ngOnInit(): void {
    if (this.to.labelPosition) {
      this.class = "col-sm-4 col-form-label " + this.to.labelPosition;
    } else {
      this.class = "col-sm-4 col-form-label";
    }
  }
}
