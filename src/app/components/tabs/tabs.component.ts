import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: any;
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
    this.tabs.splice(index, 1);
  }
}
