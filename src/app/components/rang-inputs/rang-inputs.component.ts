import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-rang-inputs',
  templateUrl: './rang-inputs.component.html',
  styleUrls: ['./rang-inputs.component.scss']
})
export class RangInputsComponent implements OnInit {
  @Input() rangSlider: any;
  rangeValue: any;
  constructor() { }
  ngOnInit(): void {
    this.rangeValue = this.rangSlider.min
  }



}
