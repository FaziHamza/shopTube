import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-paragraph',
  templateUrl:'./paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
@Input() data:any;


  constructor() { }

  ngOnInit(): void {
  }


}
