import { Component} from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}

@Component({
  selector: 'nz-demo-table-edit-cell',
  template: `
 <dynamic-table    [tableId]='tableId' [tableData]='this.form.value?.options'></dynamic-table>
  `,
  styles: [
    `
      .editable-cell {
        position: relative;
        padding: 5px 12px;
        cursor: pointer;
      }

      .editable-row:hover .editable-cell {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
      }
    `
  ]
})
export class formlyRepeatSectionComponent extends FieldArrayType {
  tableId: any = "";
  i = 0;


  ngOnInit(): void {
    debugger
    this.tableId = this.field.key + Guid.newGuid();
    this.form.value?.options

  }

}
class Guid {
  static newGuid() {
    let data = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    return data.split("-")[0];
  }
}
