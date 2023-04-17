import { Component, Input, OnInit } from '@angular/core';
import { ChartType, Formatter } from 'angular-google-charts';
@Component({
  selector: 'st-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() charts: any;
  @Input() chartData: any;
  // @Input() options: any;
  chartType = ChartType.Bar;
  chartColumns: any;
  constructor() { }
  ngOnInit(): void {
    debugger
    this.chartData = this.charts.tableData.map((data: any) => [data.name, data.value, data.value2]);
    // this.options= {
    //   title: this.charts.title,
    //   hAxis: {
    //     title: this.charts.hAxistitle,
    //     minValue: 0
    //   },
    //   vAxis: {
    //     title: this.charts.vAxistitle
    //   },
    //   colors: this.charts.color
    // }
  }
}
