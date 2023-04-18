import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})
export class TableChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.Table;
  @Input() chartData: any;
  width =  600;
  height =  400;
  constructor() { }

  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.col1, data.col2 , data.col3 , data.col4 ]);
  }

}
