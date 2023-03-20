import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-tabs-dropdown',
  templateUrl: './layout-tabs-dropdown.component.html',
  styleUrls: ['./layout-tabs-dropdown.component.scss']
})
export class LayoutTabsDropdownComponent implements OnInit {
  @Input() layoutTabsDropdownData : any;
  constructor() { }

  ngOnInit(): void {
  }

}
