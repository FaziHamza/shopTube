import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
@Component({
  selector: 'st-sankey-chart',
  templateUrl: './sankey-chart.component.html',
  styleUrls: ['./sankey-chart.component.scss']
})
export class SankeyChartComponent implements OnInit {
  @Input() charts: any;
  @Input() chartData: any;
  chartType = ChartType.Sankey;
  constructor() { }

  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.label, data.link, data.value]);
  }
}
