import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Output, EventEmitter } from '@angular/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent extends FieldType<FieldTypeConfig> {
  @Output() radioChange = new EventEmitter<any>();

  // constructor() { }
  constructor(private sharedService: DataSharedService) {
    super();
  }
  
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {
  }
  onRadioChange(event: any, model: any) {
    debugger
    let currentVal = model.formControl.value;
  
    let txt=`Selected value for :`+ model.formControl.value;
    this.sharedService.onChange(event, this.field,'radio');
    console.log(event, model, 'radio');
  }

}
