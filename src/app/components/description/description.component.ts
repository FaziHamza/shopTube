import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() descriptionData : any;
  constructor() { }

  ngOnInit(): void {
    this.descriptionData

  }

}
