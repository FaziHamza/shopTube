import { ChangeDetectorRef, Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { DataSharedService } from '../services/data-shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'formly-vertical-theme-wrapper',
  template: `
  <span *ngIf="to['additionalProperties']?.tooltip && to['additionalProperties']?.tooltipPosition == 'top' && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
  <span nz-icon [nzType]="to['additionalProperties']['tooltipIcon'] ?  to['additionalProperties']['tooltipIcon'] : 'question-circle'" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span></span>
  <div class=" flex flex-wrap" [dir]="to['additionalProperties']?.formatAlignment || 'ltr'">
    <label [attr.for]="id" class="w-1/3 py-2 col-form-label column-form-label {{to['additionalProperties']?.labelPosition}}" *ngIf="to.label">
    <span  *ngIf="to['additionalProperties']?.tooltip && to['additionalProperties']['tooltipPosition'] == 'left' && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
      <span nz-icon [nzType]="to['additionalProperties']['tooltipIcon'] ?  to['additionalProperties']['tooltipIcon'] : 'question-circle'" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span>
    </span>
      <span class="mr-1 mb-1">
        <st-icon *ngIf="to['additionalProperties']?.titleIcon" [type]="to['additionalProperties']?.iconType || 'outline'" [icon]="to['additionalProperties']?.titleIcon" [size]="to['additionalProperties']?.iconSize" [hoverIconColor]="to['additionalProperties']?.hoverIconColor || ''" [color]="to['additionalProperties']?.iconColor"></st-icon>
      </span>
      <st-task-report class="close-icon mr-2" *ngIf="to['issueReport'] && to['issueReport']?.length > 0 " [item]="to" [screenName]="to['screenName']"
                [type]="'pages'"></st-task-report>
      <span [class]="to['additionalProperties']?.labelClassName">{{to.label | translate}}</span>
      <span *ngIf="to.required" class="text-red-600">*</span>
      <span *ngIf="to['additionalProperties']?.tooltip && (to['additionalProperties']['tooltipPosition'] == 'right' || to['additionalProperties']?.tooltipPosition == undefined) && !to['additionalProperties']?.tooltipWithoutIcon || false" nz-tooltip [nzTooltipTitle]="to['additionalProperties']?.tooltip">
        <span nz-icon [nzType]="to['additionalProperties']['tooltipIcon'] ?  to['additionalProperties']['tooltipIcon'] : 'question-circle'" [class]="to['additionalProperties']['toolTipClass']" nzTheme="outline"></span>
      </span>
    </label>
    <div class="w-2/3 column-form-input form-control-style v-body-border" style="padding: 0px">
      <ng-template #fieldComponent></ng-template>
    </div>
    <div *ngIf="hasError && to.label" class="w-1/3 {{to['additionalProperties']?.labelPosition}}"></div>
    <div *ngIf="hasError" class="w-2/3 text-red-500 text-sm block" style="padding: 0px">
      <span>{{to['additionalProperties']?.requiredMessage}}</span>
      <!-- <formly-validation-message [field]="field"></formly-validation-message> -->
    </div>
  </div>
  `,
})
export class FormlyVerticalThemeWrapper extends FieldWrapper {
  constructor(public dataSharedService: DataSharedService, private cd: ChangeDetectorRef) {
    super();
  }
  requestSubscription!: Subscription;
  hasError: boolean = false;
  ngOnInit(): void {
    this.to;
    this.requestSubscription = this.dataSharedService.formlyShowError.subscribe({
      next: (res: any) => {
        if (res) {
          this.hasError = JSON.parse(JSON.stringify(res));
          this.cd.detectChanges(); // Mark component for change detection
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
    if (this.field.formControl) {
      this.field.formControl.statusChanges.subscribe(() => {
        if (this.field.formControl) {
          this.hasError = this.field.formControl.invalid;
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
    this.hasError = false;
  }

}
