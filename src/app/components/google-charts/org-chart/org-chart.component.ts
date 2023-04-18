import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'st-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent implements OnInit {
  @Input() charts: any;
  chartType = ChartType.TreeMap;
  @Input() chartData: any;
  width =  600;
  height =  400;
  options ={};
  constructor() { }

  ngOnInit(): void {

    this.chartData = [
      ['Global',    null,                 0,                               0],
      ['America',   'Global',             0,                               0],
      ['Europe',    'Global',             0,                               0],
      ['Asia',      'Global',             0,                               0],
      ['Australia', 'Global',             0,                               0],
      ['Africa',    'Global',             0,                               0],
      ['Brazil',    'America',            11,                              10],
      ['USA',       'America',            52,                              31],
      ['Mexico',    'America',            24,                              12],
      ['Canada',    'America',            16,                              -23],
      ['France',    'Europe',             42,                              -11],
      ['Germany',   'Europe',             31,                              -2],
      ['Sweden',    'Europe',             22,                              -13],
      ['Italy',     'Europe',             17,                              4],
      ['UK',        'Europe',             21,                              -5],
      ['China',     'Asia',               36,                              4],
      ['Japan',     'Asia',               20,                              -12],
      ['India',     'Asia',               40,                              63],
      ['Laos',      'Asia',               4,                               34],
      ['Mongolia',  'Asia',               1,                               -  5],
      ['Israel',    'Asia',               12,                              24],
      ['Iran',      'Asia',               18,                              13],
      ['Pakistan',  'Asia',               11,                              -52],
      ['Egypt',     'Africa',             21,                              0],  
      ['S. Africa', 'Africa',             30,                              43],
      ['Sudan',     'Africa',             12,                              2],
      ['Congo',     'Africa',             10,                              12],
      ['Zaire',     'Africa',             10,                               10]
    ];
    
    this.options = { // For v49 or before
      highlightOnMouseOver: true,
      maxDepth: 1,
      maxPostDepth: 2,
      minHighlightColor: 'black',
      midHighlightColor: 'yellow',
      maxHighlightColor: 'purple',
      minColor: 'red',
      midColor: 'blue',
      maxColor: 'green',
      headerHeight: 15,
      showScale: true,
      useWeightedAverageForAggregation: true
    }
  }

}
