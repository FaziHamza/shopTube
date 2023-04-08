import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'dynamic-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldType<FieldTypeConfig> {
  selectedValue: any | null = null;
  getIcon(value: any) {
    return (this.to.options as any)
      .find((i: any) => i.value === value)?.icon;
  }
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {

    this.to
  }
  log(value: any): void {
    this.formControl.patchValue(value);
  }
}
