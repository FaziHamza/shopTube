import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.Gantt;
  columns = [
    ["Task ID"],
    ["Task Name"],
    ["Resource"],
    ["Start"],
    ["End"],
    ["Duration"],
    ["Percent Complete"],
    ["Dependencies"]
  ];
  @Input() chartData: any;
  daysToMilliseconds(days: any) {
    return days * 24 * 60 * 60 * 1000;
  }
  chartOptions: any;
  width = 100;
  height = 275;
  constructor() { }

  ngOnInit(): void {
    
    this.chartData = this.charts.tableData.map((data: any) => [data.taskID, data.taskName, data.resource, new Date(data.startDate), new Date(data.endDate), data.duration, data.percentComplete, data.dependencies]);
    // this.chartOptions = {
    //   height: 275,
    //   gantt: {
    //     criticalPathEnabled: this.charts.isCriticalPath,//if true then criticalPathStyle apply
    //     criticalPathStyle: {
    //       stroke: this.charts.stroke,
    //       strokeWidth: this.charts.isCriticalPath
    //     },
    //     innerGridHorizLine: {
    //       stroke: this.charts.isCriticalPath,
    //       strokeWidth: this.charts.strokeWidth
    //     },
    //     arrow: {
    //       angle: this.charts.angle,
    //       width: this.charts.arrowWidth,
    //       color: this.charts.color,
    //       radius: this.charts.radius
    //     },
    //     innerGridTrack: { fill: this.charts.innerGridTrack },
    //     innerGridDarkTrack: { fill: this.charts.innerGridDarkTrack }
    //   }
    // };
  }
  convertIntoDate(date: any) {
    if (!date) {
      return null;
    }
    const startDateArray = date.split(',').map((str: any) => parseInt(str.trim(), 10));
    const startDate = startDateArray.length ? new Date(startDateArray[0], startDateArray[1], startDateArray[2]) : null;
    return startDate;
  }

}
