import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {
  @Output() change = new EventEmitter<any>();
  selectedValue: any | null = null;
  constructor(private sharedService: DataSharedService) {
    super();
  }
  ngOnInit(): void {
  }
  get list(): any {
    return this.to.options;
  }
  log(event: any, model: any): void {
    
    this.formControl.patchValue(event);
    this.sharedService.onChange(event, this.field);
    console.log(event, model);
  }
  getFloatFieldClass(): string {
    if (this.to['additionalProperties']?.wrapper === 'floating_filled' || this.to['additionalProperties']?.wrapper === 'floating_outlined') {
      return this.to['additionalProperties']?.floatFieldClass || '';
    } else {
      return '';
    }
  }
}

