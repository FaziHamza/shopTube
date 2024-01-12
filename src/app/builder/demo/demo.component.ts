import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  ngOnInit() {

  }
  dataSet  = [
    {
      'name':'aa',
      'name1':'aa',
      'name2':'aa',
      'name3':'aa',
      'name4':'aa',
      'name5':'aa',
      'name6':'aa',
      'name7':'aa',
      'name8':'aa',
      'name9':'aa',
      'name10':'aa',
      'name11':'aa',
      'age':'aa',
      'address':'aa',
    },
    {
      'name':'aa',
      'name1':'aa',
      'name2':'aa',
      'name3':'aa',
      'name4':'aa',
      'name5':'aa',
      'name6':'aa',
      'name7':'aa',
      'name8':'aa',
      'name9':'aa',
      'name10':'aa',
      'name11':'aa',
      'age':'aa',
      'address':'aa',
    },
    {
      'name':'aa',
      'name1':'aa',
      'name2':'aa',
      'name3':'aa',
      'name4':'aa',
      'name5':'aa',
      'name6':'aa',
      'name7':'aa',
      'name8':'aa',
      'name9':'aa',
      'name10':'aa',
      'name11':'aa',
      'age':'aa',
      'address':'aa',
    },
    {
      'name': 'aa',
      'name1': 'aa',
      'name2': 'aa',
      'name3': 'aa',
      'name4': 'aa',
      'name5': 'aa',
      'name6': 'aa',
      'name7': 'aa',
      'name8': 'aa',
      'name9': 'aa',
      'name10': 'aa',
      'name11': 'aa',
      'age': 'aa',
      'address': 'aa',
    },
  ]
  readonly rows = [
    ["King Arthur", "-", "Arrested"],
    ["Sir Bedevere", "The Wise", "Arrested"],
    ["Sir Lancelot", "The Brave", "Arrested"],
    ["Sir Galahad", "The Chaste", "Killed"],
    ["Sir Robin", "The Not-Quite-So-Brave-As-Sir-Lancelot", "Killed"],
  ];
}
