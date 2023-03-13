import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent extends FieldType<FieldTypeConfig> {

  // constructor() { }
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {
  }

}
