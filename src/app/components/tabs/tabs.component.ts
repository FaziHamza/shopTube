import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: any;
  selectedIndex = 0;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() screenId: any;
  constructor() { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--selected-tab-color',this.tabs?.selectedTabColor || '#1890ff');
  }
  handleTabChange(index: number) {
    console.log('Selected tab index: ', index);
    // add your code here to handle the tab change
  }
  handleIndexChange(e: number): void {
    console.log(e);
  }
  handleTabSelect(index: any) {
    this.tabs.selectedIndex = index;
    console.log('Selected tab index: ', index);
    // add your code here to handle the tab select event
  }
  closeTab({ index }: { index: number }): void {

    this.tabs.children.splice(index, 1);
    this.tabs.nodes = this.tabs.children.length;
  }
}
