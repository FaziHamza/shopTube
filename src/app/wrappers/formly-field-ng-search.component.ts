import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-ng-search',
  template: `
    
   <div class="example-input">
      <input
        [placeholder]="to.placeholder"
        nz-input
        [formControl]="formControl"
        (ngModelChange)="onChange($event)"
        [nzAutocomplete]="auto" />
      <nz-autocomplete [nzDataSource]="list" #auto></nz-autocomplete>
    </div>
  `,
})
export class FormlyFieldNgSearchComponent extends FieldType<FieldTypeConfig> {
  inputValue?: string;
  get list(): any {
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
