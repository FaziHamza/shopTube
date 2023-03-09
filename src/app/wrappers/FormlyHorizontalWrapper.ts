import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
  <div [class]="to.labelPosition">
   
  <label [attr.for]="id" *ngIf="to.label" >
   <span><span nz-icon  [nzType]='to.titleIcon' nzTheme="outline" class="mr-1 mb-1"></span><span *ngIf="to.required">*</span>{{to.label}}</span>
    <span *ngIf="to?.tooltip" nz-tooltip [nzTooltipTitle]='to.tooltip' ><span nz-icon nzType="question-circle" nzTheme="twotone"></span></span>
  </label>
  <div>
    <ng-template #fieldComponent></ng-template>
  </div>
  <div *ngIf="showError">
    <formly-validation-message [field]="field" class="text-red-500"></formly-validation-message>
  </div>
</div>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {
  
  ngOnInit(): void {
    
  }
}
