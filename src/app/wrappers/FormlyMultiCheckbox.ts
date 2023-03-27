import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
  <ng-container *ngIf="to.config?.wrapper != 'floating_standard'">
  <nz-checkbox-wrapper [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' || to.config?.wrapper == 'floating_standard' ? to.config?.floatFieldClass : ''" [formControl]="formControl" *ngIf="list.length" style="width: 100%;" (nzOnChange)="log($event)">
      <div nz-row>
        <div nz-col ><label nz-checkbox [nzDisabled]='to.disabled' [nzValue]="item.value" *ngFor="let item of list">{{item.label}}</label></div>
      </div>
    </nz-checkbox-wrapper>
    <label [ngClass]="to.config?.floatLabelClass" *ngIf='list.length == 0'[nzDisabled]='to.disabled'  nz-checkbox style="width: 100%;" [formControl]="formControl">{{to.label}}</label> 
  </ng-container>
  <div class="relative z-0" *ngIf="to.config?.wrapper == 'floating_standard'">
  <nz-checkbox-wrapper class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" [formControl]="formControl" *ngIf="list.length" style="width: 100%;" (nzOnChange)="log($event)">
      <div nz-row>
        <div nz-col ><label nz-checkbox [nzDisabled]='to.disabled' [nzValue]="item.value" *ngFor="let item of list">{{item.label}}</label></div>
      </div>
    </nz-checkbox-wrapper>
    <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" *ngIf='list.length == 0'[nzDisabled]='to.disabled'  nz-checkbox style="width: 100%;" [formControl]="formControl">{{to.label}}</label> 
  </div>
  `,
})
export class FormlyFieldMultiCheckbox extends FieldType<FieldTypeConfig> {
  ngOnInit(): void {
    
  }
  log(value: string[]): void {
    console.log(value);
  }

  get list(): any {
    if (this.to.options) {
      return this.to.options;
    } else {
      return [];
    }
  };


}
