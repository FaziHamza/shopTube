import { Component, OnDestroy, OnInit } from '@angular/core';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
import { NatsService } from '../service/nats.service';
import { diff, Config, DiffPatcher, formatters, Delta } from "jsondiffpatch";

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  invoice1: any;
  invoice2: any;

  constructor() { }

  ngOnInit() {
    this.invoice1 = { "title": "Select One" };
    this.invoice2 = { "title": "Select two" };
    this.applyDiff();
  }

  applyDiff() {
    const appDiv: any = document.getElementById('app');
    const jsondiffpatch = require('jsondiffpatch');
    let delta = jsondiffpatch.create().diff(this.invoice1, this.invoice2);
    appDiv.innerHTML = jsondiffpatch.formatters.html.format(delta, this.invoice1);
    jsondiffpatch.formatters.html.hideUnchanged();
    console.log(delta);
  }


}
