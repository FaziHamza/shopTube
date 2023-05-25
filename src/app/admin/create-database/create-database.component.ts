import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'st-create-database',
  templateUrl: './create-database.component.html',
  styleUrls: ['./create-database.component.scss']
})
export class CreateDatabaseComponent implements OnInit {
  editCache: { [key: number]: { edit: boolean; data: any } } = {};
  listOfData: any[] = [];
  requestSubscription: Subscription;
  model: any = {};
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  data: any[] = [];
  tableId = 0;
  fieldType: any[] = [
    { "id": "INT", "name": "INT" },
    { "id": "SMALLINT", "name": "SMALLINT" },
    { "id": "BIGINT", "name": "BIGINT" },
    { "id": "FLOAT", "name": "FLOAT" },
    { "id": "REAL", "name": "REAL" },
    { "id": "DOUBLE PRECISION", "name": "DOUBLE PRECISION" },
    { "id": "DECIMAL", "name": "DECIMAL" },
    { "id": "CHAR", "name": "CHAR" },
    { "id": "VARCHAR", "name": "VARCHAR" },
    { "id": "TEXT", "name": "TEXT" },
    { "id": "BOOLEAN", "name": "BOOLEAN" },
    { "id": "DATE", "name": "DATE" },
    { "id": "TIME", "name": "TIME" },
    { "id": "DATETIME", "name": "DATETIME" },
    { "id": "TIMESTAMP", "name": "TIMESTAMP" },
    { "id": "BINARY", "name": "BINARY" },
    { "id": "VARBINARY", "name": "VARBINARY" },
    { "id": "BLOB", "name": "BLOB" },
    { "id": "ENUM", "name": "ENUM" },
    { "id": "SET", "name": "SET" }
  ];
  fields = [
    {
      fieldGroup: [
        {
          key: 'tableName',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Name',
            placeholder: 'Name',
            required: true,
          }
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'comment',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Comment',
            placeholder: 'Comment',
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'totalFields',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Total Fields',
            placeholder: 'Total Fields',
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'relation',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            label: 'Relation',
            placeholder: 'Relation',
          }
        }
      ]
    },
  ];
  constructor(private employeeService: EmployeeService, private toastr: NzMessageService,) { }
  ngOnDestroy(){
    this.requestSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getDatabaseTable();
  }
  cancelEdit(index: number): void {
    this.editCache[index] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }
  enableEditCache(): void {
    this.listOfData.forEach((item, index) => {
      this.editCache[index + 1] = {
        edit: false,
        data: { ...item }
      };
    });
    let item = this.listOfData[0];
    this.editCache[1] = {
      edit: true,
      data: { ...item }
    };
  }
  deleteRow(data: any): void {
    const idx = this.listOfData.indexOf(data);
    this.listOfData.splice(idx as number, 1);
    this.updateData();
    this.updateEditCache();
  }
  updateEditCache(): void {
    debugger
    this.listOfData.forEach((item, index) => {
      this.editCache[index + 1] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }
  addRow(): void {
    const newRow = {
      id: 0,
      fieldName: '',
      type: '',
      description: '',
    }
    this.listOfData.unshift(newRow);
    this.updateData();
    this.enableEditCache();
  }
  updateData() {
    this.listOfData.forEach((record, index) => {
      record.id = index + 1;
    });
    this.listOfData = [...this.listOfData];
  }
  submitForm() {
    if (this.myForm.valid) {
      this.myForm.value['schema'] = this.listOfData;
      this.requestSubscription = this.employeeService.saveDatabaseTable(this.myForm.value).subscribe({
        next: (res) => {
          this.toastr.success("Save Successfully", { nzDuration: 3000 });
          this.getDatabaseTable();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
    }
  }
  updateForm() {
    if (this.myForm.valid) {
      this.myForm.value['schema'] = this.listOfData;
      this.myForm.value['id'] = this.tableId;
      // this.employeeService.saveDatabaseTable(this.myForm.value).subscribe(res => {
      //   this.toastr.success("Save Successfully", { nzDuration: 3000 });
      //   this.getDatabaseTable();
      // })
    }
  }
  getDatabaseTable() {
    this.requestSubscription = this.employeeService.getDatabaseTable().subscribe({
      next: (res) => {
        if (res) {
          this.data = res;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    })
  }
  editTableData(item: any) {
    this.tableId = item.id
    this.model = item;
    this.listOfData = item.schema;
    this.updateEditCache();
  }
}
