import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
  <div class=" row mt-1 mb-1">
  <label [attr.for]="id" class= {{firstColum}} *ngIf="to.label" >
   <span><i *ngIf="to.labelIcon" class={{to.labelIcon}} style="padding-right: 3%;"></i>{{to.label }}</span>
    <!-- <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container> -->
    <span *ngIf="to?.tooltip && to.tooltip.content" nz-tooltip nzTooltipTitle="prompt text" class=" uil uil-question-circle">Tooltip will show when mouse enter.</span>
  </label>
  <div class= {{secondColum1}}>
    <ng-template #fieldComponent></ng-template>
  </div>
  <!-- <div *ngIf="to.error != null" class="col-10 offset-md-4 offset-sm-4 invalid-feedback d-block">
      <p class="m-0 p-0">{{to.error }}</p>
  </div> -->
  <div *ngIf="showError" class={{secondColum2}}>
    <formly-validation-message [field]="field"></formly-validation-message>
  </div>
</div>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {
  firstColum = '';
  secondColum1 = '';
  secondColum2 = '';
  ngOnInit(): void {
    if (this.to.className == 'col-12' || this.to.className == 'col-12 s-icon' || this.to.className == 'col-12 tagSt') {
      if(this.to.labelPosition){
        this.firstColum = "col-3 col-form-label " + this.to.labelPosition;
        }else{
          this.firstColum = "col-3 col-form-label";
        }
      this.secondColum1 = "col-sm-10 mt-2";
      this.secondColum2 = "col-10 offset-md-3 offset-sm-3 invalid-feedback d-block";
    } else {
      this.firstColum = 'col-3 col-form-label '  + this.to.labelPosition;
      if(this.to.labelPosition){
        this.firstColum = "col-3 col-form-label " + this.to.labelPosition;
        }else{
          this.firstColum = "col-3 col-form-label";
        }
      this.secondColum1 = "col-sm-9 formly-horizontal-wrapper";
      this.secondColum2 = 'col-9 offset-md-3 offset-sm-3 invalid-feedback d-block'
    }
  }
}
