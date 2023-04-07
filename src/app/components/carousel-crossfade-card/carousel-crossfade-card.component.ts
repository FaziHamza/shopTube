import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-carousel-crossfade-card',
  templateUrl: './carousel-crossfade-card.component.html',
  styleUrls: ['./carousel-crossfade-card.component.scss']
})
export class CarouselCrossfadeCardComponent implements OnInit {

  @Input() carouselslides:any;
  constructor() { }

  ngOnInit(): void {

  }

}
