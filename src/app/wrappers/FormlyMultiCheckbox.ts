import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-formly-field-ng-search',
  template: `
  <div [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' || to['additionalProperties']?.wrapper == 'floating_standard' ? 'relative z-0' : 'checkBox'">
  <nz-checkbox-wrapper class='flex flex-wrap' [ngClass]="to['additionalProperties']?.wrapper && to['additionalProperties']?.wrapper == 'floating_filled' || to['additionalProperties']?.wrapper == 'floating_outlined' || to['additionalProperties']?.wrapper == 'floating_standard' ? to['additionalProperties']?.floatFieldClass : ''"  *ngIf="list.length" (nzOnChange)="log($event , field)">
  <ng-container *ngFor="let item of list; let i=index">
     <div [class]="item?.width">
        <label nz-checkbox   [nzDisabled]='to.disabled'  [nzValue]="item.value" 
        >{{item.label}}</label>
     </div>
  </ng-container>
  </nz-checkbox-wrapper>
  <label [ngClass]="to['additionalProperties']?.floatLabelClass" *ngIf='list.length == 0' [formControl]="formControl" [nzDisabled]='to.disabled'  nz-checkbox  ></label>
  <label *ngIf="to['additionalProperties']?.wrapper == 'floating_outlined' || to['additionalProperties']?.wrapper == 'floating_standard' || to['additionalProperties']?.wrapper == 'floating_filled'"
  [ngClass]=" to['additionalProperties']?.floatLabelClass">
  {{to.label}}
  </label>
</div>

  `,
})
export class FormlyFieldMultiCheckbox extends FieldType<FieldTypeConfig> {
  @Output() change = new EventEmitter<any>();
  constructor(private sharedService: DataSharedService) {
    super();
  }
  ngOnInit(): void {

  }

  log(event: any, model: any) {

    this.formControl.patchValue(event);
    this.sharedService.onChange(event, this.field);
    console.log(event, model);
  }

  get list(): any {
    if (this.to.options) {
      return this.to.options;
    } else {
      return [];
    }
  };

  onModelChange(event: any, model: any) {


  }


}
