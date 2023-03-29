import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <div class="flex flex-wrap pb-1" [dir]="to.config?.formatAlignment || 'ltr'">
      <label [attr.for]="id" *ngIf="to.label" [ngClass]="[labelColumn , to.labelPosition , to.type != 'checkbox' && to.type!='radio' ? fieldPadding : '']" >
        <span>
          <span nz-icon [nzType]="to.titleIcon" nzTheme="outline" class="mr-1 mb-1"></span>
          <span *ngIf="to.required">*</span>{{ to.label }}
        </span>
        <span *ngIf="to?.tooltip" nz-tooltip [nzTooltipTitle]="to.tooltip">
          <span nz-icon nzType="question-circle" nzTheme="twotone"></span>
        </span>
      </label>
      <div [ngClass]="[fieldColumn]" *ngIf="to.labelPosition !='rtl pr-1'">
        <ng-template #fieldComponent></ng-template>
      </div>
      <div *ngIf="showError" class="ml-6 sm:ml-6 text-red-500 text-sm block {{ errorColumn }}">
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
  rtl:any;
  ngOnInit(): void {
    
    const fullWidth = this.to.className.includes('w-full');
    const labelPosition = this.to.labelPosition + ' pl-2 pr-2' || '';
    this.labelColumn = `w-1/4 ${labelPosition}`;
    this.fieldColumn = fullWidth ? 'w-3/4' : 'w-3/4';
    this.errorColumn = fullWidth ? 'w-3/4' : '';
    this.fieldPadding = this.getFieldPaddingClass(this.to.config?.size);
    if(labelPosition == 'rtl pr-1'){
      this.rtl = 'rtl'
    }else{
      this.rtl = ''
    }
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
