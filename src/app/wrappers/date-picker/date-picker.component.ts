import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'st-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends FieldType<FieldTypeConfig> {
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  @Output() change = new EventEmitter<any>();
  constructor(private sharedService: DataSharedService , private datePipe: DatePipe) {
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
    debugger
    console.log(event);
    console.log(this.to['additionalProperties']?.format);
    if (typeof event !== 'string') {
      let formattedDate = event.toLocaleDateString();
      if (this.to['additionalProperties']?.format) {
        // Format the date using DatePipe
        formattedDate = this.datePipe.transform(
          event,
          this.to['additionalProperties']?.format
        );
      }
      this.formControl.patchValue(formattedDate);
      this.sharedService.onChange(formattedDate, this.field);
    }
  }

}


