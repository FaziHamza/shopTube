import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'st-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent extends FieldType<FieldTypeConfig> {
  time: any | null = null;

  ngOnInit(): void {
  }

  log(value: any): void {
    this.formControl.patchValue(value);
  }
}
