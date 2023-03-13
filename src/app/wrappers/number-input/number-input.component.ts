import { Component, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent extends FieldType<FieldTypeConfig> {

  get max() {
    return this.to?.max ?? Infinity;
  }

  get min() {
    return this.to?.min ?? -Infinity;
  }

  get value() {
    return this.formControl.value;
  }

  get precision() {
    return this.to?.['precision'] ?? 5;
  }


  set value(value) {
    if (value != null)
      this.formControl.patchValue(value);
  }


  isAboveMin(value: any): boolean {
    return this.min == null || value >= this.min;
  }

  isBelowMax(value: any): boolean {
    return this.max == null || value <= this.max;
  }
}
