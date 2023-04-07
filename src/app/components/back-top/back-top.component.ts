import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss']
})
export class BackTopComponent implements OnInit {
  @Input() backTopData : any;
  constructor() { }

  ngOnInit(): void {
  }

}
