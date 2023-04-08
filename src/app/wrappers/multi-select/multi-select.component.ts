import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'st-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {
  selectedValue: any | null = null;
  ngOnInit(): void {
  }
  get list(): any {
    return this.to.options;
  }
  log(value: any): void {
    this.formControl.patchValue(value);
  }
}

