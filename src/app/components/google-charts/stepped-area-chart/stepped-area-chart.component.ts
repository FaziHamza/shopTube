import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-stepped-area-chart',
  templateUrl: './stepped-area-chart.component.html',
  styleUrls: ['./stepped-area-chart.component.scss']
})
export class SteppedAreaChartComponent implements OnInit {
  @Input() charts: any;
  @Input() chartData: any;
  chartType = ChartType.SteppedAreaChart;
  constructor() { }

  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.label, Number(data.value1), Number(data.value2), Number(data.value3), Number(data.value4)]);
  }

}
