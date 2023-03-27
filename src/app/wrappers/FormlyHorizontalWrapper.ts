import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <div class="flex flex-wrap">
      <div [ngClass]="[fieldColumn]" [dir]="rtl" *ngIf="to.labelPosition =='rtl pr-1'">
        <ng-template #fieldComponent></ng-template>
      </div>
      <div *ngIf="showError && to.labelPosition =='rtl pr-1'" [dir]="rtl" class="ml-6 sm:ml-6 text-red-500 text-sm block {{ errorColumn }}">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <label [attr.for]="id" *ngIf="to.label" [dir]="rtl" [ngClass]="[labelColumn , to.labelPosition]" >
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
      <div *ngIf="showError && to.labelPosition !='rtl pr-1'" class="ml-6 sm:ml-6 text-red-500 text-sm block {{ errorColumn }}">
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
    debugger
    const fullWidth = this.to.className.includes('w-full');
    const labelPosition = this.to.labelPosition || '';
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
      case 'large': return 'pt-2';
      default: return '';
    }
  }
}
