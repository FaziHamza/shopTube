import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { DataSharedService } from 'src/app/services/data-shared.service';


@Component({
  selector: 'st-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends FieldType<FieldTypeConfig> {
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  @Output() change = new EventEmitter<any>();
  constructor(private sharedService: DataSharedService) {
    super();
  }
  startValue: Date | null = null;
  endValue: Date | null = null;

  ngOnInit(): void {
  }

  // disabledStartDate = (startValue: Date): boolean => {
  //   if (!startValue || !this.endValue) {
  //     return false;
  //   }
  //   return startValue.getTime() > this.endValue.getTime();
  // };

  // disabledEndDate = (endValue: Date): boolean => {
  //   if (!endValue || !this.startValue) {
  //     return false;
  //   }
  //   return endValue.getTime() <= this.startValue.getTime();
  // };

  // handleStartOpenChange(open: boolean): void {
  //   if (!open) {
  //     this.endDatePicker.open();
  //   }
  //   console.log('handleStartOpenChange', open);
  // }

  // handleEndOpenChange(open: boolean): void {
  //   console.log('handleEndOpenChange', open);
  // }

  onModelChange(event: any, model: any) {
    if(typeof event !== 'string'){
      const formattedDate = event.toLocaleDateString();
      this.formControl.patchValue(formattedDate);
      this.sharedService.onChange(formattedDate, this.field);
    }
  }

}


