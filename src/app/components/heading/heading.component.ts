import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input() headingData: any;
  constructor() { }

  ngOnInit(): void {

  }

  pageRoute(link : any){
    
  }

}
