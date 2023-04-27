import { Component, Input, OnInit } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'st-rang-inputs',
  templateUrl: './rang-inputs.component.html',
  styleUrls: ['./rang-inputs.component.scss']
})
export class RangInputsComponent implements OnInit {
  @Input() rangSlider: any;
  marks : any;
  rangeValue: any;
  _sliderValue = 0;
  preHighLight = false;
  nextHighLight = false;
  mid : any = 0;
  constructor() { }
  ngOnInit(): void {
    this.mid = parseFloat(((this.rangSlider.max - this.rangSlider.min) / 2).toFixed(5));
    this.marks =  {
      0: '0°C',
      26: '26°C',
      37: '37°C',
    };
  }
  set sliderValue(value: number) {
    debugger
    this._sliderValue = value;
    this.highlightIcon();
  }
  highlightIcon(): void {
    const lower = this._sliderValue >= this.mid;
    this.preHighLight = !lower;
    this.nextHighLight = lower;
  }
}
