import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  @Input() statisticData:any;
  constructor() { }

  ngOnInit(): void {
  }

}
