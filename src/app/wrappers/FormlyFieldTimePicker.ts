import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
     <nz-time-picker [(ngModel)]="time" [nzAddOn]="addOnTemplate" #timePicker></nz-time-picker>
    <ng-template #addOnTemplate>
      <button nz-button nzSize="small" nzType="primary" (click)="timePicker.close()">Ok</button>
    </ng-template>
  `,
})
export class FormlyFieldTimePicker extends FieldType {
  time: Date | null = null;
}
