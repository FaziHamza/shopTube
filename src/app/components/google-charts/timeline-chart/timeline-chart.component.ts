import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.Timeline;
  chartData = [
    ['Magnolia Room', 'CSS Fundamentals', new Date(0, 0, 0, 12, 0, 0), new Date(0, 0, 0, 14, 0, 0)],
    ['Magnolia Room', 'Intro JavaScript', new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0)],
    ['Magnolia Room', 'Advanced JavaScript', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 19, 0, 0)],
    ['Gladiolus Room', 'Intermediate Perl', new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0)],
    ['Gladiolus Room', 'Advanced Perl', new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0)],
    ['Gladiolus Room', 'Applied Perl', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 0, 0)],
    ['Petunia Room', 'Google Charts', new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0)],
    ['Petunia Room', 'Closure', new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0)],
    ['Petunia Room', 'App Engine', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 30, 0)]
  ]
  options = {
    timeline: {
      showRowLabels: false,
      colorByRowLabel: true,
      singleColor: '#8d8',
      rowLabelStyle: { fontName: 'Helvetica', fontSize: 24, color: '#603913' },
      barLabelStyle: { fontName: 'Garamond', fontSize: 14 }
    },
    backgroundColor: '#ffd',
    alternatingRowStyle: false,
    colors: ['#cbb69d', '#603913', '#c69c6e'],
  };
  constructor() { }

  ngOnInit(): void {
  }

}
