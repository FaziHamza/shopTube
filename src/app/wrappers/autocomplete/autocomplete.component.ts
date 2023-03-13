import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent extends FieldType<FieldTypeConfig> {

  // constructor() { }
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {
  }

}
