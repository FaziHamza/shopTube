import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.scss']
})
export class CandlestickChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.CandlestickChart;
  @Input() chartData: any;
  constructor() { }

  ngOnInit(): void {
    
    this.chartData = this.charts.tableData.map((data: any) => [data.name, data.value, data.value1, data.value2, data.value3]);
  }

}
