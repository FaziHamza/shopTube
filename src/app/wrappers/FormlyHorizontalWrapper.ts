import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
  <div class="flex flex-wrap">
  <label class= {{firstColum}} [attr.for]="id" *ngIf="to.label" [ngClass]="paddingClass">
      <span>
        <span nz-icon [nzType]="to.titleIcon" nzTheme="outline" class="mr-1 mb-1"></span>
        <span *ngIf="to.required">*</span>{{to.label}}
      </span>
      <span *ngIf="to?.tooltip" nz-tooltip [nzTooltipTitle]="to.tooltip">
        <span nz-icon nzType="question-circle" nzTheme="twotone"></span>
      </span>
    </label>
    <div class= {{secondColum1}} [ngClass]="to.type == 'checkbox' || to.type == 'radiobutton' && to.config.size == 'large'? 'pt-2' : to.type == 'checkbox' || to.type == 'radiobutton' ? 'pb-6' : ''">
      <ng-template #fieldComponent></ng-template>
    </div>
    <div *ngIf="showError" class={{secondColum2}}>
			<formly-validation-message [field]="field" class="text-red-500"></formly-validation-message>
		</div>
</div>

  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {
  firstColum = '';
  secondColum1 = '';
  secondColum2 = '';
  paddingClass = '';
  ngOnInit(): void {
    
    if (this.to.className.includes('w-full')) {
      if (this.to.labelPosition) {
        this.firstColum = "w-1/4 " + this.to.labelPosition;
      } else {
        this.firstColum = "w-1/4";
      }
      this.secondColum1 = "w-3/4";
      this.secondColum2 = "w-3/4 ml-6 sm:ml-6 text-red-500 text-sm block";
    }
    else {
      if (this.to.labelPosition) {
        this.firstColum = "w-1/4 " + this.to.labelPosition;
      } else {
        this.firstColum = "w-1/4";
      }
      this.secondColum1 = "w-3/4";
      this.secondColum2 = 'w-3/4 ml-6 sm:ml-6 text-red-500 text-sm block'
    }
    if (this.to.config?.size == 'default') {
      this.paddingClass = 'pt-2'
    }
    else if (this.to.config?.size == 'small') {
      this.paddingClass = 'pt-1'
    } 
    else if (this.to.config?.size == 'large') {
      this.paddingClass = 'pt-2'
    }

  }
}
