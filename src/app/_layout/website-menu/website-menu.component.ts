import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-website-menu',
  templateUrl: './website-menu.component.html',
  styleUrls: ['./website-menu.component.scss']
})
export class WebsiteMenuComponent implements OnInit {
  @Input() menuData : any;
  constructor() { }

  ngOnInit(): void {
    debugger
    this.menuData;
  }

}
