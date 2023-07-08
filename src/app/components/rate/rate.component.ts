import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'st-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnChanges {
  @Input() rateData: any;
  value = 0;
  constructor() { }
  ngOnChanges(changes: any) {
    document.documentElement.style.setProperty('--my-color', this.rateData.iconColor != '' ? this.rateData.iconColor : 'yellow');
  }
  // ngOnInit(): void {
  // }
  onRateBlur() {
    // console.log('Rate component blurred');
  }
  onRateFocus() {
    // console.log('Rate component focused');
  }
  onRateHoverChange(value: number) {
    document.documentElement.style.setProperty('--my-color', this.rateData.iconColor);
    // console.log(`Rate component hover changed to ${value}`);
  }
  onRateKeyDown(event: KeyboardEvent) {
    // console.log(`Key ${event.key} pressed on Rate component`);
  }

}
