import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-web-menu',
  templateUrl: './web-menu.component.html',
  styleUrls: ['./web-menu.component.scss']
})
export class WebMenuComponent implements OnInit {
  @Input() menuData : any;
  constructor() { }

  ngOnInit(): void {
    
    this.menuData;
  }

}
