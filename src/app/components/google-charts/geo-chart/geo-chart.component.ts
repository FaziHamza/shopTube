import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-geo-chart',
  templateUrl: './geo-chart.component.html',
  styleUrls: ['./geo-chart.component.scss']
})
export class GeoChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.GeoChart;
  @Input() chartData: any;
  options: any;
  constructor() { }

  ngOnInit(): void {
    this.chartData = this.charts.tableData.map((data: any) => [data.label, data.value]);
      // this.options = {
      //   region: this.charts.region, // Africa
      //   colorAxis: { colors: this.charts.colorAxis },
      //   backgroundColor: this.charts.bgColor,
      //   datalessRegionColor: this.charts.color,
      //   defaultColor: this.charts.defaultColor,
      // };
  }

}
