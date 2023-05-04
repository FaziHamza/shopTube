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
  chartType = ChartType.Bar;
  chartColumns: any;
  constructor() { }
  ngOnInit(): void {
    
    this.charts.columnNames.push({ role: 'style', type: 'string' }, { role: 'annotation', type: 'string' })
    this.chartData = this.charts.tableData.map((data: any) => [data.name, data.value, data.value2]);
  }
}
