import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <div class="flex flex-wrap pb-1 pr-1" [dir]="to.config?.formatAlignment || 'ltr'">
      <label class="label-style py-1 px-2" [attr.for]="id" *ngIf="to.label" [ngClass]="[labelColumn , to.labelPosition , to.type != 'checkbox' && to.type!='radio' ? fieldPadding : '']" >
        <span>
          <span nz-icon [nzType]="to.titleIcon" nzTheme="outline" class="mr-1 mb-1"></span>
          <span *ngIf="to.required">*</span>{{ to.label }}
        </span>
        <span *ngIf="to?.tooltip" nz-tooltip [nzTooltipTitle]="to.tooltip">
          <span nz-icon nzType="question-circle" nzTheme="twotone"></span>
        </span>
      </label>
      <div [ngClass]="[(!to.label) || (!to.label && to.className.include('w-full')) ? 'w-full' : fieldColumn]">
        <ng-template #fieldComponent></ng-template>
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
    debugger
    const fullWidth = this.to.className.includes('w-full');
    const labelPosition = this.to.labelPosition + ' pl-2 pr-2' || '';
    this.labelColumn = `w-1/4 ${labelPosition}`;
    this.fieldColumn = fullWidth ? 'w-3/4' : 'w-3/4';
    this.fieldPadding = this.getFieldPaddingClass(this.to.config?.size);
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
