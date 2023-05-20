import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <div class="flex flex-wrap pb-1 pr-1" [dir]="to['additionalProperties']?.formatAlignment || 'ltr'">
   <label class="label-style py-1 px-2 text-muted" [attr.for]="id" *ngIf="to.label" [ngClass]="[labelColumn , to['additionalProperties']?.labelPosition , to.type != 'checkbox' && to.type!='radio' ? fieldPadding : '']" >
   <span>
      <span class="mr-1 mb-1">
      <st-icon *ngIf="to['additionalProperties']?.titleIcon" [type]="to['additionalProperties']?.iconType || 'outline'" [icon]="to['additionalProperties']?.titleIcon"
      [size]="to['additionalProperties']?.iconSize" [color]="to['additionalProperties']?.iconColor"></st-icon>
      </span>
      <!-- <span nz-icon [nzType]="to.titleIcon" nzTheme="outline" class="mr-1 mb-1"></span> -->
      <span *ngIf="to.required">*</span>{{ to.label }}
   </span>
   <span *ngIf="to['additionalProperties']?.tooltip && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
   <span nz-icon nzType="question-circle" nzTheme="twotone"></span>
   </span>
   </label>
   <div [ngClass]="[(!to.label) || (!to.label && to['className'].include('w-full')) ? 'w-full' : fieldColumn]">
      <ng-template #fieldComponent></ng-template>
   </div>
   <div *ngIf="to['additionalProperties']?.error != null"  class="{{labelColumn}}"></div>
   <div *ngIf="to['additionalProperties']?.error != null" class="text-red-500 text-sm block {{fieldColumn}}">
      <p class="m-0 p-0">{{to['additionalProperties']?.error }}</p>
   </div>
   <div *ngIf="showError"  class="{{labelColumn}}"></div>
   <div *ngIf="showError" class="text-red-500 text-sm block {{fieldColumn}}">
      <formly-validation-message [field]="field"></formly-validation-message>
   </div>
</div>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {
  labelColumn: string;
  fieldColumn: string;
  errorColumn: string;
  fieldPadding: string;
  rtl: any;
  ngOnInit(): void {
    
    const fullWidth = this.to['className'].includes('w-full');
    const labelPosition = this.to['additionalProperties']?.labelPosition + ' pl-2 pr-2' || '';
    this.labelColumn = `w-1/4 ${labelPosition}`;
    this.fieldColumn = fullWidth ? 'w-3/4' : 'w-3/4';
    this.fieldPadding = this.getFieldPaddingClass(this.to['additionalProperties']?.size);
  }

  private getFieldPaddingClass(size: string): string {
    switch (size) {
      case 'default': return 'pt-2';
      case 'small': return 'pt-1';
      case 'large': return 'pt-3';
      default: return '';
    }
  }
}
