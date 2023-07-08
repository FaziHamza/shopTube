import { Component, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'dynamic-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldType<FieldTypeConfig> implements OnChanges {
  @Output() change = new EventEmitter<any>();
  selectedValue: any | null = null;

  constructor(private sharedService: DataSharedService , private cdr: ChangeDetectorRef) {
    super();
  }
  getIcon(value: any) {
    return (this.to.options as any)
      .find((i: any) => i.value === value)?.icon;
  }
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {
    this.to
    document.documentElement.style.setProperty('--radius', this.to['additionalProperties']?.borderRadius);
    this.cdr.detectChanges();
  }
  ngOnChanges(changes: any) {
    document.documentElement.style.setProperty('--radius', this.to['additionalProperties']?.borderRadius);
  }
  log(value: any): void {
    this.formControl.patchValue(value);
  }
  onModelChange(event: any, model: any) {

    this.sharedService.onChange(event, this.field,);
    console.log(event, model, 'radio');
  }
}
