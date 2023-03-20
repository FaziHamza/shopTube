import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
  <nz-input-group [nzSuffix]="to.config?.addonLeft" [nzPrefix]="to.config?.addonRight" [nzStatus]="to.config?.status"
  [nzSize]="to.config?.size">
  <nz-time-picker [formControl]="formControl" [nzStatus]="to.config?.status" [nzDisabled]="to.disabled" [nzAddOn]="addOnTemplate" #timePicker></nz-time-picker>
    <ng-template #addOnTemplate>
      <button nz-button nzSize="small" nzType="primary" (click)="timePicker.close()">Ok</button>
    </ng-template>
</nz-input-group>

  `,
})
export class FormlyFieldTimePicker extends FieldType<FieldTypeConfig> {
  time: Date | null = null;
}
