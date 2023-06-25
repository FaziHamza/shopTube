import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, catchError, forkJoin, of } from 'rxjs';
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
          key: 'isActive',
          type: 'select',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: true,
          props: {
            label: 'Select Status',
            options: [
              {label: "Approved", value: "Approved"},
              {label: "Pending", value: "Pending"},
              {label: "Reject", value: "Reject"}
            ]
          }
        }
      ]
    },
  ];
  constructor(private employeeService: EmployeeService, private toastr: NzMessageService,) { }
  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  ngOnInit(): void {
    // this.getDatabaseTable();
    this.getDatabaseTablev1();
  }
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }
  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
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
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
    // let item = this.listOfData[0];
    // this.editCache[1] = {
    //   edit: true,
    //   data: { ...item }
    // };
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  deletedIds: any[] = [];
  deleteRow(data: any): void {
    const idx = this.listOfData.indexOf(data);
    this.listOfData.splice(idx as number, 1);
    // this.updateData();
    this.deletedIds.push({ id: data.id })
    this.listOfData = [...this.listOfData];
    this.updateEditCache();
  }
  addRow(): void {
    const isExistingDataValid = this.listOfData.every(item => {
      // Check if any field in the existing rows is empty or null
      return (
        item.fieldName !== '' &&
        item.type !== '' &&
        item.status !== ''
      );
    });
    if (!isExistingDataValid) {
      // Display an error message or perform any other action
      this.toastr.error('Existing data is not valid. Cannot add a new row. please fill proper data', { nzDuration: 3000 });
      return;
    }
    const maxId = this.listOfData.reduce((max, item) => {
      return item.id > max ? item.id : max;
    }, 0);
    const newRow = {
      id: maxId + 1,
      fieldName: '',
      type: '',
      description: '',
      status: '',
      isActive: true,
      update: false,
      updatedBy: null,
      updatedOn: null
    }
    this.listOfData.unshift(newRow);
    this.listOfData = [...this.listOfData];
    this.enableEditCache();
  }
  updateData() {
    this.listOfData.forEach((record, index) => {
      record.id = index + 1;
    });
    this.listOfData = [...this.listOfData];
  }
  tableFields: any;
  getDatabaseTablev1() {
    this.employeeService.getSQLDatabaseTable('knex-crud/tables').subscribe({
      next: (objTRes) => {
        if (objTRes) {
          this.employeeService.getSQLDatabaseTable('knex-crud/table_schema').subscribe({
            next: (objFRes) => {
              this.tableFields = objFRes;
              this.data = [];
              if (objFRes) {
                objFRes.forEach((element: any) => {
                  element['update'] = true;
                });
                objTRes.forEach((element: any) => {
                  element['schema'] = [];
                  const objlistData = {
                    "id": element.id,
                    "tableName": element.tableName,
                    "comment": element.comment,
                    "totalFields": element.totalFields,
                    "isActive": element.isActive,
                    "schema": objFRes.filter((x: any) => x.table_id == element.id)
                  }
                  this.data.push(objlistData);
                });

              }
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          });
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  submitFormv1() {
   
    const isExistingDataValid = this.listOfData.every(item => {
      // Check if any field in the existing rows is empty or null
      return (
        item.fieldName !== '' &&
        item.type !== '' &&
        item.status !== ''
      );
    });
    if (!isExistingDataValid) {
      // Display an error message or perform any other action
      this.toastr.error('Existing data is not valid. please fill proper data', { nzDuration: 3000 });
      return;
    }
    if (this.listOfData.length === 0) {
      this.toastr.error("Please add table fields ", { nzDuration: 3000 });
    } else if (this.myForm.valid) {
      const fields: { [key: string]: any } = {};
      this.listOfData.forEach((element: any) => {
        if (element.status == 'Approved')
          fields[element.fieldName] = element.type;
      });
      const data = {
        "tableName": this.myForm.value.tableName,
        "schema": fields
      };
      console.log(data);
      if (this.myForm.value.isActive === "Approved")
      // saving table if status is approved.
        this.employeeService.saveSQLDatabaseTable('knex', data).subscribe({
          next: (res) => {
           ;
            this.toastr.success("Save Successfully", { nzDuration: 3000 });
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });

      const objTableNames = {
        "tableName": this.myForm.value.tableName,
        "comment": this.myForm.value.comment,
        "totalFields": this.myForm.value.totalFields,
        "isActive": this.myForm.value.isActive
      };
      this.employeeService.saveSQLDatabaseTable('knex-crud/tables', objTableNames).subscribe({
        next: (res) => {
          const observables = this.listOfData.map(element => {
            const objFields = {
              "table_id": res?.id,
              "fieldName": element.fieldName,
              "type": element.type,
              "description": element.description,
              "status": element.status,
              "isActive": true
            };
            return this.employeeService.saveSQLDatabaseTable('knex-crud/table_schema', objFields).pipe(
              catchError(error => of(error)) // Handle error and continue the forkJoin
            );
          });

          forkJoin(observables).subscribe({
            next: (results) => {
              if (results.every(result => !(result instanceof Error))) {
                this.toastr.success("Save Table Fields Successfully", { nzDuration: 3000 });
                this.cancelEditTable();
                this.getDatabaseTablev1();
                this.deletedIds = [];
              } else {
                this.toastr.error("Fields not inserted", { nzDuration: 3000 });
              }
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("Fields not inserted", { nzDuration: 3000 });
            }
          });
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    }
  }
  updateFormv1() {
   
    const isExistingDataValid = this.listOfData.every(item => {
      // Check if any field in the existing rows is empty or null
      return (
        item.fieldName !== '' &&
        item.type !== '' &&
        item.status !== ''
      );
    });
    if (!isExistingDataValid) {
      // Display an error message or perform any other action
      this.toastr.error('Existing data is not valid. please fill proper data', { nzDuration: 3000 });
      return;
    }
    if (this.listOfData.length === 0) {
      this.toastr.error("Please add table fields ", { nzDuration: 3000 });
    } else if (this.myForm.valid) {
      this.myForm.value['id'] = this.tableId;
      const fields: { [key: string]: any } = {};
      this.listOfData.forEach((element: any) => {
        if (element.status == 'Approved')
          fields[element.fieldName] = element.type;
      });
      const data = {
        "tableName": this.myForm.value.tableName,
        "schema": fields
      };
      if (this.myForm.value.isActive === "Approved") {
        this.employeeService.saveSQLDatabaseTable('knex', data).subscribe({
          next: (res) => {
            this.toastr.success("Save Successfully", { nzDuration: 3000 });
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
      } else if(this.myForm.value.isActive === "Pending" || this.myForm.value.isActive === "Reject"){
        this.toastr.warning("Setting is done.", { nzDuration: 3000 });
      }

      const objTableNames = {
        "tableName": this.myForm.value.tableName,
        "comment": this.myForm.value.comment,
        "totalFields": this.myForm.value.totalFields,
        "isActive": this.myForm.value.isActive
      };
      this.employeeService.updateSQLDatabaseTable('knex-crud/tables/' + this.tableId, objTableNames).subscribe({
        next: (res) => {
          this.toastr.success("update Table Name Successfully", { nzDuration: 3000 });
          const observables = this.listOfData.map(element => {
            const objFields = {
              "table_id": element.update ? this.tableId : 0,
              "fieldName": element.fieldName,
              "type": element.type,
              "description": element.description,
              "status": element.status,
              "isActive": true
            }
            if (objFields.table_id == 0) {
              objFields.table_id = this.tableId;
              return this.employeeService.saveSQLDatabaseTable('knex-crud/table_schema', objFields).pipe(
                catchError(error => of(error)) // Handle error and continue the forkJoin
              );
            } else {
              return this.employeeService.updateSQLDatabaseTable('knex-crud/table_schema/' + element.id, objFields).pipe(
                catchError(error => of(error)) // Handle error and continue the forkJoin
              );
            }
          });
          forkJoin(observables).subscribe({
            next: (results) => {
              if (results.every(result => !(result instanceof Error))) {
                if (this.deletedIds.length == 0) {
                  this.toastr.success("Save and Update Table Fields Successfully", { nzDuration: 3000 });
                  this.cancelEditTable();
                  this.getDatabaseTablev1();
                  this.deletedIds = [];
                } else {
                  this.deleteRowData();
                }
              } else {
                this.toastr.error("Fields not inserted", { nzDuration: 3000 });
              }
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("Fields not inserted", { nzDuration: 3000 });
            }
          });
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    }
  }
  deleteRowData() {
    if (this.deletedIds.length > 0) {
      const observables = this.deletedIds.map(element => {
        return this.employeeService.deleteSQLDatabaseTable('knex-crud/table_schema/', element.id).pipe(
          catchError(error => of(error)) // Handle error and continue the forkJoin
        );
      });
      forkJoin(observables).subscribe({
        next: (results) => {
          if (results.every(result => !(result instanceof Error))) {
            this.toastr.success("Save and Update Table Fields Successfully", { nzDuration: 3000 });
            this.cancelEditTable();
            this.getDatabaseTablev1();
            this.deletedIds = [];
          } else {
            this.toastr.error("Fields not inserted", { nzDuration: 3000 });
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Fields not inserted", { nzDuration: 3000 });
        }
      });
    }
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
  cancelEditTable() {
    this.tableId = 0
    this.model = {};
    this.deletedIds = [];
    this.listOfData = [];
  }
}
