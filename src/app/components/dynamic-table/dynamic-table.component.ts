import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() tableId: string;
  @Input() tableData: any[];
  @Input() tableHeaders: string[];
  constructor() { }

  ngOnInit(): void {
  }  
}
