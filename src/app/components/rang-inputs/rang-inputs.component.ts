import { Component, Input, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NzMarks } from 'ng-zorro-antd/slider';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-rang-inputs',
  templateUrl: './rang-inputs.component.html',
  styleUrls: ['./rang-inputs.component.scss']
})
export class RangInputsComponent  {
  @Input() rangSlider: any;
  marks: any;
  rangeValue: any;
  _sliderValue = 0;
  preHighLight = false;
  nextHighLight = false;
  mid: any = 0;
  constructor(private sharedService: DataSharedService) {
  }
  ngOnInit(): void {
    debugger
    this.sliderValue = 0;
    document.documentElement.style.setProperty('--slider-color', this.rangSlider.color ? this.rangSlider.color : '#91d5ff');
    this.mid = parseFloat(((this.rangSlider.max - this.rangSlider.min) / 2).toFixed(5));
    this.marks = {
      0: '0°C',
      26: '26°C',
      37: '37°C',
    };
  }
  set sliderValue(value: number) {

    this._sliderValue = value;
    this.highlightIcon();
  }
  highlightIcon(): void {
    const lower = this._sliderValue >= this.mid;
    this.preHighLight = !lower;
    this.nextHighLight = lower;
  }
  get sliderValue(): number {
    return this._sliderValue;
  }
  // onModelChange(event: any, model: any) {
  //   this.sharedService.onChange(event, this.field);
  // }
}
