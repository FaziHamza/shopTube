import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-webiste-header',
  templateUrl: './webiste-header.component.html',
  styleUrls: ['./webiste-header.component.scss']
})
export class WebisteHeaderComponent implements OnInit {
  @Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
