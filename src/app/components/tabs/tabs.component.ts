import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: any;
  @Input() dataModel !: any;
  form = new FormGroup({});
  constructor() { }

  ngOnInit(): void {

    this.tabs;
    this.tabs.forEach((i: any) => {
      i.dashonicTabsConfig[0].dashonicTabsChild.forEach((j: any) => {
        j.formly[0].fieldGroup.forEach((b: any) => {
          if (b.wrappers.length > 1) {
            b.wrappers.splice(1, 1);
          }
        });
      })
    });
  }
}
