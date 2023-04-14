import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { Guid } from '../models/guid';
@Component({
  selector: 'nz-demo-table-edit-cell',
  template: `
 <dynamic-table *ngIf='this.formData.length' [tableId]='tableId' [checkType]='true' [tableData]='this.formData'></dynamic-table>
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
  formData: any = "";
  ngOnInit(): void {
    debugger
    this.tableId = this.field.key + Guid.newGuid();
    const key = Array.isArray(this.field.key) ? this.field.key[0] : this.field.key;
    if (key)
      this.formData = this.form.value[key];
  }
}

