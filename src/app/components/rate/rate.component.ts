import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  @Input() rateData:any;
  value = 0;
  constructor() { }

  ngOnInit(): void {
  }
  onRateBlur() {
    console.log('Rate component blurred');
  }
  onRateFocus() {
    console.log('Rate component focused');
  }
  onRateHoverChange(value: number) {
    console.log(`Rate component hover changed to ${value}`);
  }
  onRateKeyDown(event: KeyboardEvent) {
    console.log(`Key ${event.key} pressed on Rate component`);
  }

}
