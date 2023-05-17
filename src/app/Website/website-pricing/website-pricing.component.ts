import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-website-pricing',
  templateUrl: './website-pricing.component.html',
  styleUrls: ['./website-pricing.component.scss']
})
export class WebsitePricingComponent implements OnInit {
  @Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
