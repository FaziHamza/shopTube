import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'st-formly-field-ng-search',
  template: `
      <ng-container *ngIf="to.config?.wrapper != 'floating_standard'">
  <div class="example-input">
    <input [ngClass]="to.config?.wrapper && to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined' ? to.config?.floatFieldClass : ''" [placeholder]="to.placeholder" nz-input [formControl]="formControl" (ngModelChange)="onChange($event)" [nzAutocomplete]="auto" />
    <label *ngIf="to.config?.wrapper == 'floating_filled' || to.config?.wrapper == 'floating_outlined'" [ngClass]="to.config?.floatLabelClass">{{to.label}}</label>
    <nz-autocomplete [nzDataSource]="list" #auto></nz-autocomplete>
  </div>
</ng-container>
<div class="relative z-0" *ngIf="to.config?.wrapper == 'floating_standard'">
  <div class="example-input">
    <input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" [placeholder]="to.placeholder" nz-input [formControl]="formControl" (ngModelChange)="onChange($event)" [nzAutocomplete]="auto" />
    <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{to.label}}</label>
    <nz-autocomplete [nzDataSource]="list" #auto></nz-autocomplete>
  </div>

  `,
})
export class FormlyFieldNgSearchComponent extends FieldType<FieldTypeConfig> {
  inputValue?: string;
  get list(): any {
    debugger
    return this.to.options;
  }
  get labelVal(): any {
    return this.to.label;
  }

  filteredOptions: string[] = [];

  onChange(value: string): void {
    if (this.list)
      this.filteredOptions = this.list.filter((option: any) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
