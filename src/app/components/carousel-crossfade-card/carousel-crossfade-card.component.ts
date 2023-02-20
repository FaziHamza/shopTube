import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-crossfade-card',
  templateUrl: './carousel-crossfade-card.component.html',
  styleUrls: ['./carousel-crossfade-card.component.scss']
})
export class CarouselCrossfadeCardComponent implements OnInit {

  @Input() carouselslides:any;
  showNavigationArrows: any;
  showNavigationIndicators: any;
  array = [1, 2, 3, 4];
  constructor() { }

  ngOnInit(): void {
    
    this.carouselslides;
  }

}
