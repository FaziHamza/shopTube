import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { Guid } from '../models/guid';
@Component({
  selector: 'nz-demo-table-edit-cell',
  template: `
  <nz-collapse>
      <nz-collapse-panel
        [nzHeader]="'Options'"
        [nzActive]="true"
      >
      <button nz-button nzType="primary" (click)="addRow()">Add Row</button>
<nz-table [nzScroll]="{ x: formData.length > 0 ?  '100vw' : '10vw', y: null }" [nzBordered]='true'  [nzData]="formData" nzSize="middle" [nzPageSize]="10">
  <thead>
    <tr>
      <th *ngFor="let column of tableHeader">{{ column.name }}</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let item of formData; let i = index">
      <td *ngFor="let column of  tableHeader" (click)="edit(i)" >
        <input nz-input *ngIf="editId == i; else displayValue" [(ngModel)]="item[column.name]" />
        <ng-template #displayValue>
        {{ item[column.name] }}
        </ng-template>
      </td>
      <td>
        <a nz-popconfirm nzPopconfirmTitle="Sure to delete?" (nzOnConfirm)="deleteData(i)">
          <span class="text-red-500" nz-icon nzType="delete" nzTheme="outline"></span>
        </a>
      </td>
    </tr>
  </tbody>
</nz-table>
      </nz-collapse-panel>
    </nz-collapse>


  `,
})
export class formlyRepeatSectionComponent extends FieldArrayType {
  tableId: any = "";
  formData: any = "";
  tableHeader: any = [];
  data: any = {};
  editId: any = undefined;
  ngOnInit(): void {
    debugger
    this.tableId = this.field.key + Guid.newGuid();
    const key = Array.isArray(this.field.key) ? this.field.key[0] : this.field.key;
    if (key) {
      this.formData = this.form.value[key];
    }


    const firstObjectKeys = Object.keys(this.formData[0]);
    this.tableHeader = firstObjectKeys.map(key => ({ name: key }));
  }
  addRow(): void {
    const lastRow = this.formData[this.formData.length - 1];
    const newRow = { ...lastRow, id: lastRow.id + 1 };
    this.formData.push(newRow);
  }
  edit(index: any) {
    this.editId = index;
  }
  deleteData(index: any) {
    this.formData.splice(index, 1); // Remove one item at the specified index
  }

}



