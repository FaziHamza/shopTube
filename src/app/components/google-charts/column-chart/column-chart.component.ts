import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.SteppedAreaChart;
  chartData = [
    ['Alfred Hitchcock (1935)', 8.4,         7.9],
    ['Ralph Thomas (1959)',     6.9,         6.5],
    ['Don Sharp (1978)',        6.5,         6.4],
    ['James Hawes (2008)',      4.4,         6.2]
  ]
  options = {
    backgroundColor: '#ddd',
      legend: { position: 'bottom' },
      connectSteps: false,
      colors: ['#4374E0', '#53A8FB', '#F1CA3A', '#E49307'],
      isStacked: true,
      vAxis: {
        minValue: 0,
        ticks: [0, .3, .6, .9, 1]
      },
  };
  constructor() { }

  ngOnInit(): void {
    // this.chartData = this.charts.tableData.map((data: any) => [data.name, data.value, data.value2]);
  }

}
