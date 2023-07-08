import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  constructor(private sharedService: DataSharedService , private cdr: ChangeDetectorRef) {
    super();
  }
  ngOnInit(): void {
    document.documentElement.style.setProperty('--radius', this.to['additionalProperties']?.borderRadius);
    if (typeof this.formControl.value === 'string') {
      if (this.formControl.value === '' || this.formControl.value === undefined) {
        this.formControl.patchValue([]);
      }
    }
    this.cdr.detectChanges();
  }
  ngOnChanges(changes: any) {
    document.documentElement.style.setProperty('--radius', this.to['additionalProperties']?.borderRadius);
  }
  get list(): any {
    return this.to.options;
  }
  onModelChange(event: any, model: any) {
    this.sharedService.onChange(event, this.field,);
    console.log(event, model, 'radio');
  }
}

