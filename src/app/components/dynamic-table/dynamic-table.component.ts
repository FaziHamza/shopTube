import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output 
} from '@angular/core';
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
  @Input() data: any;
  editId: string | null = null;
  @Output() notifyTable: EventEmitter<any> = new EventEmitter();
  key: any;
  allChecked = false;
  indeterminate = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  constructor(private _dataSharedService: DataSharedService) { }

  ngOnInit(): void {
    debugger
    this.loadTableData();
    // this.addThousanRows();
    // this.data.noResult == true ? this.tableData = [] : true;
    // this.data.get('tableScroll')!.valueChanges.subscribe((scroll: any) => {
    //   this.data.fixedColumn = scroll === 'fixed';
    //   this.scrollX = scroll === 'scroll' || scroll === 'fixed' ? '100vw' : null;
    // });
    // this.data.get('fixHeader')!.valueChanges.subscribe((fixed: any) => {
    //   this.scrollY = fixed ? '240px' : null;
    // });
  }

  addRow(): void {
    debugger
    const id = this.tableData.length - 1;
    const newRow = JSON.parse(JSON.stringify(this.tableData[0]));
    newRow["id"] = this.tableData[id].id + 1;
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
    debugger
    if (!this.tableHeaders) {
      this.tableHeaders = this.key;
    }
    if(!this.data){
      const newNode = {
        nzFooter: "",
        nzTitle: "",
        nzPaginationPosition: "bottom",
        nzPaginationType: "default",
        nzLoading: false,
        nzFrontPagination: true,
        nzShowPagination: true,
        nzBordered: true,
        showColumnHeader: true,
        noResult: false,
        nzSimple: false,
        nzSize: 'default',
        nzShowSizeChanger: false,
        showCheckbox: false,
        expandable: false,
        fixHeader: false,
        tableScroll: false,
        fixedColumn: false,
        sort: true,
        filter: true,
      }
      this.data = newNode;
    }
    let newId = 0;
    if(!this.tableData[0].id){
      this.tableData.forEach((j :any) => {
        newId = newId + 1
        j['id'] = newId; 
      });
    }

  }

  save() {
    this._dataSharedService.setData(this.tableData);
  }

  checkAll(value: boolean): void {
    this.tableData.forEach((data: any) => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.tableData.filter((value: any) => !value.disabled);
    const allChecked = validData.length > 0 && validData.every((value: any) => value.checked === true);
    const allUnChecked = validData.every((value: any) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  // addThousanRows(){
  //     for (let index = 0; index < 1000; index++) {
  //       this.addRow();
  //     }
  // }
}
