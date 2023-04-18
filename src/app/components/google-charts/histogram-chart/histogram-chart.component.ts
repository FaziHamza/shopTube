import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.scss']
})
export class HistogramChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.Histogram;
  @Input() chartData:any;
  options: any;
  constructor() { }

  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.label, data.value]);
    // this.options = {
    //   title: this.charts.title,
    //   legend: this.charts.legend,
    //   colors: this.charts.color,
    //   histogram:this.charts.histogram,
    //   hAxis: this.charts.hAxis,
    //   vAxis: this.charts.vAxis
    // }
  }

}
