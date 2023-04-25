import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss']
})
export class NestedTableComponent implements OnInit {
  @Input() data: any[] = [];
  constructor() { }
  isNested:boolean = true;;
  ngOnInit(): void {
  }

}
