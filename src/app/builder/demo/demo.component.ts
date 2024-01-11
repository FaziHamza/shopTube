import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  ngOnInit() {

  }

  readonly rows = [
    ["King Arthur", "-", "Arrested"],
    ["Sir Bedevere", "The Wise", "Arrested"],
    ["Sir Lancelot", "The Brave", "Arrested"],
    ["Sir Galahad", "The Chaste", "Killed"],
    ["Sir Robin", "The Not-Quite-So-Brave-As-Sir-Lancelot", "Killed"],
  ];
}
