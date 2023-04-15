import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.ScatterChart;
  chartData: any;
  options: any;
  constructor() { }

  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.id, data.value]);
    this.options = {
      width: 800,
      height: 500,
      chart: {
        title: this.charts.title,
        subtitle: this.charts.subtitle
      },
      axes: {
        x: {
          0: { side: 'top' }
        }
      }
    };
  }

}
