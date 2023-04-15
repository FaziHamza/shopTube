import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.LineChart;
  chartData: any;
  options: any;
  constructor() { }

  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.id, data.col1, data.col2, data.col3]);
    this.options = {
      chart: {
        title: this.charts.title,
        subtitle: this.charts.subtitle,
      },
      // width: 900,
      // height: 500
    };
  }

}
