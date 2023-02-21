import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
   <div class="example-input">
      <input
        [placeholder]="to.placeholder"
        nz-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChange($event)"
        [nzAutocomplete]="auto" />
      <nz-autocomplete [nzDataSource]="list" #auto></nz-autocomplete>
    </div>
  `,
})
export class FormlyFieldNgSearchComponent extends FieldType {
  inputValue?: string;
  get list(): any {
    return this.to.options;
  }
  get labelVal(): any {
    return this.to.label;
  }

  filteredOptions: string[] = [];

  onChange(value: string): void {
    this.filteredOptions = this.list.filter((option:any) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
