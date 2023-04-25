import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  @Input() itemData: any;
  @Input() tableId: any;
  @Input() checkType: boolean;
  @Input() tableData: any;
  @Input() tableHeaders: any[];
  @Input() data: any;
  editId: string | null = null;
  @Input() screenName: any;
  GridType: string = '';
  key: any;
  screenNameaa: any;
  footerData: any[];
  childKey: any;
  allChecked = false;
  indeterminate = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  @Input() screenId: any;
  @Input() dataModel: any;
  selectList = [
    { key: "Faizan", value: "Faizan" },
    { key: "Arfan", value: "Arfan" },
    { key: "Zubair", value: "Zubair" },
    { key: "Husnain", value: "Husnain" },
  ];
  constructor(public _dataSharedService: DataSharedService, private builderService: BuilderService) {
    // this.getHeader();
  }

  ngOnInit(): void {
    debugger
    this.gridInitilize();
  }
  gridInitilize() {

    this.loadTableData();
    if (this.screenId)
      this.builderService.jsonGridBusinessRuleGet(this.screenId).subscribe((getRes => {

        if (getRes.length > 0) {
          // this.dataModel['input34d5985f']='1313'
          let gridFilter = getRes.filter(a => a.gridType == 'Body');
          for (let m = 0; m < gridFilter.length; m++) {
            if (gridFilter[m].gridKey == this.data.key && this.data.tableData) {
              for (let index = 0; index < gridFilter[m].buisnessRulleData.length; index++) {
                const elementv1 = gridFilter[m].buisnessRulleData[index];
                let checkType = Object.keys(this.data.tableData[0]).filter(a => a == elementv1.target);
                if (checkType.length == 0) {
                  console.log("No obj Found!")
                }
                else {
                  for (let j = 0; j < this.data.tableData.length; j++) {
                    //query
                    let query: any;
                    if (elementv1.oprator == 'NotNull')
                      query = "1==1"
                    else
                      query = this.tableData[j][elementv1.ifCondition] + elementv1.oprator + elementv1.getValue

                    if (eval(query)) {
                      for (let k = 0; k < elementv1.getRuleCondition.length; k++) {
                        const elementv2 = elementv1.getRuleCondition[k];
                        if (elementv1.getRuleCondition[k].referenceOperator != '') {
                          this.data.tableData[j][elementv1.target] = eval(`${this.data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${this.data.tableData[j][elementv2.target]}`);
                          this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                        } else {
                          if (k > 0) {
                            this.data.tableData[j][elementv1.target] = eval(`${this.data.tableData[j][elementv1.target]} ${elementv1.getRuleCondition[k - 1].referenceOperator} ${this.data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${this.data.tableData[j][elementv2.target]}`);
                            this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                          }
                          else
                            this.data.tableData[j][elementv1.target] = eval(`${this.data.tableData[j][elementv2.ifCondition]} ${elementv1.getRuleCondition[k].oprator} ${this.data.tableData[j][elementv2.target]}`);
                          this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                        }
                        if (elementv2.multiConditionList.length > 0) {
                          for (let l = 0; l < elementv2.multiConditionList.length; l++) {
                            const elementv3 = elementv2.multiConditionList[l];
                            const value = this.data.tableData[j][elementv1.target];
                            this.data.tableData[j][elementv1.target] = eval(`${value} ${elementv3.oprator} ${this.data.tableData[j][elementv3.target]}`);
                            // this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                          }
                        }
                      }
                      for (let k = 0; k < elementv1.thenCondition.length; k++) {
                        const elementv2 = elementv1.thenCondition[k];
                        for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                          const elementv3 = elementv2.getRuleCondition[l];
                          this.data.tableData[j][elementv2.thenTarget] = eval(`${this.data.tableData[j][elementv3.ifCondition]} ${elementv3.oprator} ${this.data.tableData[j][elementv3.target]}`);
                          if (elementv3.multiConditionList.length > 0) {
                            for (let m = 0; m < elementv3.multiConditionList.length; m++) {
                              const elementv4 = elementv3.multiConditionList[m];
                              const value = this.data.tableData[j][elementv2.thenTarget];
                              this.data.tableData[j][elementv2.thenTarget] = eval(`${value} ${elementv4.oprator} ${this.data.tableData[j][elementv4.target]}`);
                              // this.data.tableData[j]['color'] = elementv1.getRuleCondition[k].referenceColor;
                            }
                          }
                        }
                      }
                    }
                  }
                }

              }
            }
          }
          let headerFilter = getRes.filter(a => a.gridType == 'Header');
          for (let m = 0; m < headerFilter.length; m++) {
            if (headerFilter[m].gridKey == this.data.key && this.data.tableData) {
              for (let index = 0; index < headerFilter[m].buisnessRulleData.length; index++) {
                const elementv1 = headerFilter[m].buisnessRulleData[index];
                let checkType = Object.keys(this.data.tableData[0]).filter(a => a == elementv1.target);
                if (checkType.length == 0) {
                  // const filteredData = this.filterTableData(elementv1)
                  // const result = this.makeAggregateFunctions(filteredData, elementv1.target);
                  // elementv1.getRuleCondition.forEach((elementv2: any) => {
                  //   element = this.applyAggreateFunctions(elementv2, element, result, 'gridHeaderSum')
                  // });
                }
                else {
                  this.tableHeaders.forEach(element => {
                    if (element.key == checkType[0]) {
                      element['gridHeaderSum'] = 0;
                      const filteredData = this.filterTableData(elementv1)
                      const result = this.makeAggregateFunctions(filteredData, elementv1.target)
                      elementv1.getRuleCondition.forEach((elementv2: any) => {
                        element = this.applyAggreateFunctions(elementv2, element, result, 'gridHeaderSum')
                      });
                      for (let k = 0; k < elementv1.thenCondition.length; k++) {
                        const elementv2 = elementv1.thenCondition[k];
                        for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                          const elementv3 = elementv2.getRuleCondition[l];
                          let checkType = Object.keys(this.data.tableData[0]).filter(a => a == elementv3.ifCondition);
                          if (checkType.length == 0) {
                            console.log("No obj Found!")
                          }
                          else {
                            const resultData = this.makeAggregateFunctions(filteredData, elementv3.ifCondition)
                            this.tableHeaders.forEach(element => {
                              if (element.key == checkType[0]) {
                                element = this.applyAggreateFunctions(elementv3, element, resultData, 'gridHeaderSum')
                              }
                            })
                          }
                        }
                      }
                    }
                    else {
                      if (!element.gridHeaderSum)
                        element['gridHeaderSum'] = '';
                    }
                  });
                }
              }
            }
          }
          let footerFilter = getRes.filter(a => a.gridType == 'Footer');
          for (let m = 0; m < footerFilter.length; m++) {
            if (footerFilter[m].gridKey == this.data.key && this.data.tableData) {
              for (let index = 0; index < footerFilter[m].buisnessRulleData.length; index++) {
                const elementv1 = footerFilter[m].buisnessRulleData[index];
                let checkType = Object.keys(this.data.tableData[0]).filter(a => a == elementv1.target);
                if (checkType.length == 0) {
                  console.log("No obj Found!")
                }
                else {
                  this.tableHeaders.forEach(element => {
                    if (element.key == checkType[0]) {
                      element['gridFooterSum'] = 0;
                      const filteredData = this.filterTableData(elementv1)
                      const result = this.makeAggregateFunctions(filteredData, elementv1.target)
                      elementv1.getRuleCondition.forEach((elementv2: any) => {
                        element = this.applyAggreateFunctions(elementv2, element, result, 'gridFooterSum')
                      });
                      for (let k = 0; k < elementv1.thenCondition.length; k++) {
                        const elementv2 = elementv1.thenCondition[k];
                        for (let l = 0; l < elementv2.getRuleCondition.length; l++) {
                          const elementv3 = elementv2.getRuleCondition[l];
                          let checkType = Object.keys(this.data.tableData[0]).filter(a => a == elementv3.ifCondition);
                          if (checkType.length == 0) {
                            console.log("No obj Found!")
                          }
                          else {
                            const resultData = this.makeAggregateFunctions(filteredData, elementv3.ifCondition)
                            this.tableHeaders.forEach(element => {
                              if (element.key == checkType[0]) {
                                element = this.applyAggreateFunctions(elementv3, element, resultData, 'gridFooterSum')
                              }
                            })
                          }
                        }
                      }
                    }
                    else {
                      if (!element.gridHeaderSum)
                        element['gridHeaderSum'] = '';
                    }
                  });
                }

              }
            }
          }

        }
        this.loadTableData();
      }));
  }
  applyAggreateFunctions(elementv3: any, element: any, resultData: any, value: any) {
    if (elementv3.oprator == 'sum')
      element[value] = resultData?.sum;
    else if (elementv3.oprator == 'count')
      element[value] = resultData?.count;
    else if (elementv3.oprator == 'avg') {
      element[value] = resultData.avg
    }
    else if (elementv3.oprator == 'min')
      element[value] = resultData.min
    else if (elementv3.oprator == 'max')
      element[value] = resultData.max;
    return element;
  }
  filterTableData(elementv1: any) {
    let filterData = this.data.tableData.filter((item: any) => {
      const condition = item[elementv1.ifCondition];
      const value = elementv1.getValue;

      switch (elementv1.oprator) {
        case ">=":
          return condition >= value;
        case ">":
          return condition > value;
        case "<=":
          return condition <= value;
        case "<":
          return condition < value;
        case "==":
          return condition === value;
        case "!=":
          return condition !== value;
        default:
          return false;
      }
    });
    return filterData;
  }
  makeAggregateFunctions(filteredData: any, elementv1: any) {
    let getData = filteredData.reduce((accumulator: any, currentValue: any, index: any, array: any) => {
      accumulator.count++;
      accumulator.sum += currentValue[elementv1];
      accumulator.min = Math.min(accumulator.min, currentValue[elementv1]);
      accumulator.max = Math.max(accumulator.max, currentValue[elementv1]);

      if (index === array.length - 1) {
        accumulator.avg = accumulator.sum / accumulator.count;
      }

      return accumulator;
    },
      {
        count: 0,
        sum: 0,
        min: Infinity,
        max: -Infinity,
        avg: 0,
      }
    );
    return getData;
  }
  columnName: any;
  isHeaderVisible = false;
  // addColumn(): void {
  //   this.isVisible = true;
  // };
  // handleOk(): void {
  addColumn(): void {

    const id = this.tableData.length - 1;
    const newRow = JSON.parse(JSON.stringify(this.tableData[0]));
    newRow["id"] = this.tableData[id].id + 1;
    this.tableData = [...this.tableData, newRow];
    // if (this.tableData.length > 0) {
    //   const firstObjectKeys = Object.keys(this.tableData[0]);
    //   for (let index = 0; index < firstObjectKeys.length; index++) {
    //     const element = firstObjectKeys[index];
    //     if (element.toLocaleLowerCase() == this.columnName.toLocaleLowerCase())
    //       return alert('this Column is already Exsist')
    //   }
    //   this.tableHeaders.push(
    //     {
    //       name: this.columnName,
    //       sortOrder: null,
    //       // sortFn: "(a, b) => a.name.localeCompare(b.name)",
    //       sortDirections: [
    //         "ascend",
    //         "descend",
    //         null
    //       ],
    //       "filterMultiple": true
    //     });
    //   for (let j = 0; j < this.data.tableData.length; j++) {
    //     this.data.tableData[j][this.columnName.charAt(0).toLowerCase() + this.columnName.slice(1)] = 0;
    //   }
    //   this.loadTableData();
    //   this.columnName = null;
    // }
    // this.isVisible = false;
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
    if (this.tableData) {
      const firstObjectKeys = Object.keys(this.tableData[0]);
      this.key = firstObjectKeys.map(key => ({ name: key }));
      this.key = this.key.filter((header: any) => header.name !== 'color');
      // this.childKey = this.getChildrenData();
      // let checkcount = this.getParentChildrenKeys(this.tableData);
      // console.log(JSON.stringify(checkcount));
      this.footerData = this.tableHeaders;
      if (!this.tableHeaders || !this.footerData) {
        this.tableHeaders = this.key;
        this.footerData = this.key;
      }

      let newId = 0;
      if (!this.tableData[0].id) {
        this.tableData.forEach((j: any) => {
          newId = newId + 1
          j['id'] = newId;
        });
      }
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


  }
  handleCancel(): void {
    this.isHeaderVisible = false;
  }
  showModal(type: any): void {
    this.GridType = type;
    this.isHeaderVisible = true;
  }

  handleOk(): void {
    this.isHeaderVisible = false;
  }

  // handleCancel(): void {
  //   console.log('Button cancel clicked!');
  //   this.isVisible = false;
  // }
  getSumOfRow(data: any) {
    if (data.sum) {
      if (this.tableData.some((item: any) => item.hasOwnProperty(data.key.toLowerCase()))) {
        const sum = this.tableData.reduce((acc: any, curr: any) => {
          acc += curr[data.key.toLowerCase()];
          return acc;
        }, 0);
        return sum;
      } else {
        return '';
      }
      return 0
    }
    else {
      return '';
    }
  }
  getHeader() {
    if (this.tableData) {
      const firstObjectKeys = Object.keys(this.tableData[0]);
      this.key = firstObjectKeys.map(key => ({ name: key }));
      this.key = this.key.filter((header: any) => header.name !== 'color');
    }

  }
  getChildrenData() {
    const childKeys = this.tableData.reduce((acc: any, obj: any) => {
      if (obj.children) {
        obj.children.forEach((child: any) => {
          Object.keys(child).forEach(key => {
            if (!acc.includes(key)) {
              acc.push(key);
            }
          });
        });
      }
      return acc;
    }, []);
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
    const firstObjectKeys = Object.keys(obj);
    keys.parent = firstObjectKeys.map(key => ({ name: key }));
    if (obj.children) {
      keys.children = this.getChildKeys(obj.children[0])
    }
    return keys;
  }

  getParentChildrenKeys(data: any[]): any[] {
    const result: any[] = [];
    if (data.length > 0) {
      const keys = this.getChildKeys(data[0]);
      result.push(keys);
    };
    return result;
  }

  // addThousanRows(){
  //     for (let index = 0; index < 1000; index++) {
  //       this.addRow();
  //     }
  // }
  isMyDataArray(data: any): boolean {
    return Array.isArray(data);
  }

  select(rowIndex: number, value: any) {
    debugger
    // this.tableData[rowIndex].defaultValue = value.type;
    // Perform any additional updates to 'listOfData' if needed
  }
}
