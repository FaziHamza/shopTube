import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'st-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent extends FieldType<FieldTypeConfig> {
  filteredOptions: any = [];
  // constructor() { }
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {
    this.filteredOptions = this.to.options;
  }
  onChange(value: string): void {
    debugger
    this.filteredOptions = this.list.filter((option : any) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
