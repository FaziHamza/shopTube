import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {
  @Input() charts: any;
  @Input() chartData: any;
  chartType = ChartType.BubbleChart;
  constructor() { }
  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.id, data.x, data.y, data.temprature]);
  }

}
