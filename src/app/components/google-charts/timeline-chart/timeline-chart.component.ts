import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit {
  @Input() charts: any;
  @Input() chartData: any;
  chartType = ChartType.Timeline;
  constructor() { }

  ngOnInit(): void {
    
    this.chartData = this.charts.tableData.map((data: any) => [data.label , data.value,new Date(data.startDate) ,new Date(data.endDate)]);
    console.log(this.chartData)
  }
  convertIntoDate(date: any) {
    
    if (!date) {
      return null;
    }
    const startDateArray = date.split('/').map((str: any) => parseInt(str.trim(), 10));
    const startDate = startDateArray.length ? new Date(startDateArray[0], startDateArray[1], startDateArray[2]) : null;
    return startDate;
  }
}
