import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() switchData: any;
  constructor() { }
  ngOnInit(): void {
    
    this.switchData
  }

}
