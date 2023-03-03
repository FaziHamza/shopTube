import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() tableId: any;
  @Input() tableData: any;
  @Input() tableHeaders: any[];
  editId: string | null = null;
  key: any;
  constructor() { }

  ngOnInit(): void {
    debugger
    this.loadTableData();
    
  }
  addRow(): void {
    debugger
    const id = this.tableData.length + 1;
    const newRow = JSON.parse(JSON.stringify(this.tableData[0]));
    newRow.id = id;
    this.tableData.push(newRow);
  };
  deleteRow(id: string): void {
    this.tableData = this.tableData.filter((d: any) => d.id !== id);
  };
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
  loadTableData() {
    const firstObjectKeys = Object.keys(this.tableData[0]);
    this.key = firstObjectKeys.map(key => ({ name: key }));
    // const index = this.key.indexOf('id');
    // this.key.splice(index, 1);
    this.tableData = this.tableData;
  }

}

