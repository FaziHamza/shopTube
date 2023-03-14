import {  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { BuilderService } from 'src/app/services/builder.service';
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
  constructor(private _dataSharedService: DataSharedService, private builderService: BuilderService) { }

  ngOnInit(): void {
    debugger
    this.builderService.jsonGridBusinessRuleGet('55').subscribe((getRes => {
      if (getRes.length > 0) {
        for (let index = 0; index < getRes[0].buisnessRulleData.length; index++) {
          const elementv1 = getRes[0].buisnessRulleData[index];
          for (let j = 0; j < this.data.tableData.length; j++) {
            //query
            let query: any;
            query = elementv1.getValue + elementv1.oprator + this.tableData[j][elementv1.ifCondition]
            if (eval(query)) {
              for (let k = 0; k < elementv1.getRuleCondition.length; k++) {
                const elementv2 = elementv1.getRuleCondition[k];
                // this.data.tableData[j][elementv1.target] = this.data.tableData[j][elementv2.ifCondition] * this.data.tableData[j][elementv2.target];
                this.data.tableData[j][elementv1.target] = eval(`${this.data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${this.data.tableData[j][elementv2.target]}`);
                if (elementv2.multiConditionList.length > 0) {
                  for (let l = 0; l < elementv2.multiConditionList.length; l++) {
                    const elementv3 = elementv2.multiConditionList[l];
                    const value = this.data.tableData[j][elementv1.target];
                    // this.data.tableData[j][elementv1.target] = value + this.data.tableData[j][elementv3.target]
                    this.data.tableData[j][elementv1.target] = eval(`${value} ${elementv3.oprator} ${this.data.tableData[j][elementv3.target]}`);
                  }
                }
              }
              for (let k = 0; k < elementv1.thenCondition.length; k++) {
                const elementv2 = elementv1.thenCondition[k];
                for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                  const elementv3 = elementv2.getRuleCondition[l];
                  // this.data.tableData[j][elementv2.thenTarget] = this.data.tableData[j][elementv3.ifCondition] * this.data.tableData[j][elementv3.target];
                  this.data.tableData[j][elementv2.thenTarget] = eval(`${this.data.tableData[j][elementv3.ifCondition]} ${elementv3.oprator} ${this.data.tableData[j][elementv3.target]}`);
                  if (elementv3.multiConditionList.length > 0) {
                    for (let m = 0; m < elementv3.multiConditionList.length; m++) {
                      const elementv4 = elementv3.multiConditionList[m];
                      const value = this.data.tableData[j][elementv2.thenTarget];
                      // this.data.tableData[j][elementv2.thenTarget] = value + this.data.tableData[j][elementv4.target]
                      this.data.tableData[j][elementv2.thenTarget] = eval(`${value} ${elementv4.oprator} ${this.data.tableData[j][elementv4.target]}`);
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.loadTableData();
    }));
  }
  columnName: any;
  isVisible = false;
  addColumn(): void {
    this.isVisible = true;
  };
  handleOk(): void {
    if (this.tableData.length > 0) {
      this.tableHeaders.push(
        {
          name: this.columnName,
          sortOrder: null,
          // sortFn: "(a, b) => a.name.localeCompare(b.name)",
          sortDirections: [
            "ascend",
            "descend",
            null
          ],
          "filterMultiple": true
        });
      for (let j = 0; j < this.data.tableData.length; j++) {
        this.data.tableData[j][this.columnName.charAt(0).toLowerCase() + this.columnName.slice(1)] = 0;
      }
      this.loadTableData();
    }
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  addRow(): void {

    const id = this.tableData.length - 1;
    const newRow = JSON.parse(JSON.stringify(this.tableData[0]));
    newRow["id"] = this.tableData[id].id + 1;
    this.tableData = [...this.tableData, newRow];
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
    debugger
    // for (let index = 0; index < this.data.tableData.length; index++) {
    //   this.data.tableData[index]['total'] = 0;
    //   this.data.tableData[index].total = this.data.tableData[index].id * this.data.tableData[index].age;
    // }
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
