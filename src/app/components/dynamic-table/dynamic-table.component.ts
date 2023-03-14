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
  childKey: any;
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
    this.childKey = this.getChildrenData();
    let checkcount = this.getParentChildrenKeys(this.tableData);
    debugger
    if (!this.tableHeaders) {
      this.tableHeaders = this.key;
    }
    if (!this.data) {
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
    if (!this.tableData[0].id) {
      this.tableData.forEach((j: any) => {
        newId = newId + 1
        j['id'] = newId;
      });
    }

  }
  getChildrenData() {
    const childKeys = this.tableData.reduce((acc: any, obj: any) => {
      obj.children.forEach((child: any) => {
        Object.keys(child).forEach(key => {
          if (!acc.includes(key)) {
            acc.push(key);
          }
        });
      });
      return acc;
    }, []);
    console.log(childKeys); // This will output an array of unique keys for all the child objects in the tableData array.
    return childKeys;
  }
  save() {
    this._dataSharedService.setData(this.tableData);
    alert("Data save");
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
  // getNestedChildrenCount(obj: any): number {
  //   if (!obj.children) {
  //     return 0;
  //   }
  //   let maxLevel = 0;
  //   obj.children.forEach((child:any) => {
  //     const childLevel = this.getNestedChildrenCount(child);
  //     maxLevel = Math.max(maxLevel, childLevel);
  //   });
  //   return 1 + maxLevel;
  // }
  getChildKeys(obj: any): any {
    const keys: any = {};
    // keys.parent = Object.keys(obj);
    const firstObjectKeys = Object.keys(obj);
    keys.parent = firstObjectKeys.map(key => ({ name: key }));
    if (obj.children) {
      keys.children = obj.children.map((child: any) => {
        const childKeys = this.getChildKeys(child);
        return childKeys;
      });
    }
    return keys;
  }

  getParentChildrenKeys(data: any[]): any[] {
    const result: any[] = [];
    data.forEach(obj => {
      const keys = this.getChildKeys(obj);
      result.push(keys);
    });
    return result;
  }




  // addThousanRows(){
  //     for (let index = 0; index < 1000; index++) {
  //       this.addRow();
  //     }
  // }
}
