import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: any;
  selectedIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }
  handleTabChange(index: number) {
    console.log('Selected tab index: ', index);
    // add your code here to handle the tab change
  }
  handleIndexChange(e: number): void {
    console.log(e);
  }
  handleTabSelect(index: any) {
    console.log('Selected tab index: ', index);
    // add your code here to handle the tab select event
  }
  closeTab({ index }: { index: number }): void {
    debugger
    this.tabs.children.splice(index, 1);
    this.tabs.nodes = this.tabs.children.length;
  }
}
