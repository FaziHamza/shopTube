import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

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
  @Output() notifyTable: EventEmitter<any> = new EventEmitter();
  key: any;
  constructor(private _dataSharedService: DataSharedService ) { }

  ngOnInit(): void {
    this.loadTableData();

  }

  addRow(): void {
    debugger
    const id = this.tableData.length + 1;
    const newRow = JSON.parse(JSON.stringify(this.tableData[0]));
    newRow["id"] = id;
    this.tableData = [...this.tableData, newRow];
  };
  deleteRow(id: string): void {
    this.tableData = this.tableData.filter((d: any) => d.id !== id);
  };
  startEdit(id: string): void {
    debugger
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
  loadTableData() {
    const firstObjectKeys = Object.keys(this.tableData[0]);
    this.key = firstObjectKeys.map(key => ({ name: key }));
    this.tableData = this.tableData;
    debugger
    if (this.tableHeaders == undefined) {
      this.tableHeaders = this.key;
    }

  }

  save(){
  this._dataSharedService.setData(this.tableData);
  }
}
