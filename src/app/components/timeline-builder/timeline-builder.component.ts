import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timeline-builder',
  templateUrl: './timeline-builder.component.html',
  styleUrls: ['./timeline-builder.component.scss']
})
export class TimelineBuilderComponent implements OnInit {
  @Input() timelineData: any;
  constructor() { }

  ngOnInit(): void {

    this.timelineData;
  }

}
