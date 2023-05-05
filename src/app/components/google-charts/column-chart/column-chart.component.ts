import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.ColumnChart;
  @Input() chartData: any;
  constructor() { }
  ngOnInit(): void {
    
    this.charts.columnNames.push({ role: 'style', type: 'string' }, { role: 'annotation', type: 'string' })
    this.chartData = this.charts.tableData.map((data: any) => [data.id, data.col1, data.col2, data.col3, data.col4, data.col5, data.col6, data.style, data.annotation]);
  }

}
