import { Component, DebugEventListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
// Encrypt
import * as CryptoJS from 'crypto-js';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-create-database',
  templateUrl: './create-database.component.html',
  styleUrls: ['./create-database.component.scss']
})
export class CreateDatabaseComponent implements OnInit {
  saveLoader: boolean = false;
  tableName: string;
  editCache: { [key: number]: { edit: boolean; data: any } } = {};
  listOfData: any[] = [];
  requestSubscription: Subscription;
  model: any = {};
  myForm: any = new FormGroup({});
  options: FormlyFormOptions = {};
  data: any[] = [];
  // Separation of pending and Approved.
  filteredApproved: any[] = [];
  searchFilteredApprovedValue: string = '';
  searchFilteredPendingValue: string = '';
  searchFilterdApproved: any[] = [];
  searchFilterdPending: any[] = [];
  filteredPending: any[] = [];
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
          key: 'tablename',
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
          key: 'totalfields',
          type: 'input',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: '',
          props: {
            type: 'number',
            label: 'Total Fields',
            placeholder: 'Total Fields',
          }
        }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'isactive',
          type: 'select',
          wrappers: ["formly-vertical-theme-wrapper"],
          defaultValue: true,
          props: {
            label: 'Select Status',
            options: [
              { label: "Approved", value: "Approved" },
              { label: "Pending", value: "Pending" },
              { label: "Reject", value: "Reject" }
            ]
          }
        }
      ]
    },
  ];
  constructor(private employeeService: EmployeeService, private toastr: NzMessageService,
    private applicationService: ApplicationService,
    private encryptionService: EncryptionService) { }

  //Encrypt work
  //   encryptData :any;
  //   inputFiled :any;
  //  sendEncryptData(){
  //   console.log(CryptoJS.AES.encrypt("78w82y", "myemail").toString()); //email
  //   this.encryptData = CryptoJS.AES.encrypt(this.inputFiled, "myemail").toString()
  //  }

  ngOnDestroy() {
    if (this.requestSubscription)
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
  deletedCloumns: any[] = [];
  deleteRow(data: any): void {
    const idx = this.listOfData.indexOf(data);
    this.listOfData.splice(idx as number, 1);
    // this.updateData();
    this.deletedIds.push({ id: data.id })
    if (data.tableid || data.tableid == 0)
      this.deletedCloumns.push({ id: data.id, fieldname: data.fieldname })
    this.listOfData = [...this.listOfData];
    this.updateEditCache();
  }
  addRow(): void {
    const isExistingDataValid = this.listOfData.every(item => {

      // Check if any field in the existing rows is empty or null
      return (
        item.fieldname !== '' &&
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
      fieldname: '',
      type: '',
      description: '',
      status: '',
      isactive: true,
      update: false,
      updatedby: null,
      updatedon: null
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
    this.searchFilteredApprovedValue = '';
    this.searchFilteredPendingValue = '';
    this.saveLoader = true;
    this.applicationService.getNestNewCommonAPI(`cp/tables`).subscribe({
      // this.employeeService.getSQLDatabaseTableCRUD('knex-crud/tables').subscribe({
      next: (objTRes) => {
        this.saveLoader = false;
        if (objTRes.isSuccess) {
          this.saveLoader = true;
          this.applicationService.getNestNewCommonAPI(`cp/tableschema`).subscribe({
            next: (objFRes) => {
              this.saveLoader = false;
              if (objFRes.isSuccess) {
                this.tableFields = objFRes.data;
                this.data = [];
                if (objFRes.data.length > 0) {
                  objFRes.data.forEach((element: any) => {
                    element['update'] = true;
                  });
                }
                if (objTRes.data.length > 0) {
                  objTRes.data.forEach((element: any) => {
                    element['schema'] = [];
                    const objlistData = {
                      id: element.id,
                      tablename: element.tablename,
                      comment: element.comment,
                      totalfields: element.totalfields,
                      isactive: element.status,
                      schema: objFRes.data.filter(
                        (x: any) => x.tableid == element.id
                      ),
                    };
                    this.data.push(objlistData);
                    // this.filteredApproved = this.data.filter(
                    //   (item) => item.isactive === 'Approved'
                    // );
                    // this.filteredPending = this.data.filter(
                    //   (item) => item.isactive === 'Pending'
                    // );

                    // console.warn("filteredPending:", this.filteredPending);
                    // console.warn("filteredApproved:", this.filteredApproved);
                  });
                }
                this.filteredApproved = this.data.filter((item) => {
                  return item.isactive === 'Approved';
                });
                this.searchFilterdApproved = this.filteredApproved
                this.filteredPending = this.data.filter((item) => {
                  return item.isactive === 'Pending' && item.schema.some((a: any) => a.status === 'Pending');
                });
                let statusFilterd = this.data.filter((item) => {
                  return item.isactive === 'Approved' && item.schema.some((a: any) => a.status === 'Pending');
                });

                statusFilterd.forEach(element => {
                  this.filteredPending.push(element);
                });
                this.searchFilterdPending = this.filteredPending;
                // this.filteredPending = this.data.map((item) => {
                //   return {
                //     ...item,
                //     schema: item.schema.filter((a: any) => a.status === 'Pending')
                //   };
                // }).filter((item) => item.isActive === 'Pending' && item.schema.length > 0);
                // let abc = this.data.map((item) => {
                //   return {
                //     ...item,
                //     schema: item.schema.filter((a: any) => a.status === 'Pending')
                //   };
                // }).filter((item) => item.isactive === 'Approved' && item.schema.length > 0);
                // abc.forEach(element => {
                //   this.filteredPending.push(element);
                // });
                // this.filteredPending = this.data.filter(
                //   (item) => item.isactive === 'Pending'
                // );
              } else {
                this.saveLoader = false;
                console.log(objTRes.message);
                this.toastr.error(objTRes.message, { nzDuration: 3000 });
              }
            },
            error: (err) => {
              this.saveLoader = false;
              console.error(err);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          });
        } else {
          this.saveLoader = false;
          console.log(objTRes.message);
          this.toastr.error(objTRes.message, { nzDuration: 3000 });
        }
      },
      error: (err) => {
        this.saveLoader = false;
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  submitFormv1() {

    const isExistingDataValid = this.listOfData.every(item => {
      // Check if any field in the existing rows is empty or null
      return (
        item.fieldname !== '' &&
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
          fields[element.fieldname] = element.type;
      });
      const data = {
        "tablename": this.myForm.value.tablename,
        "schema": fields
      };
      console.log(data);
      this.saveLoader = true;
      if (this.myForm.value.isactive === "Approved") {
        // saving table if status is approved.
        this.applicationService.addNestNewCommonAPI('cp/createTable', data).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              this.saveLoader = false;
              this.toastr.success("Save Successfully", { nzDuration: 3000 });
            } else {
              this.saveLoader = false;
              console.log(res.message);
              this.toastr.error(res.message, { nzDuration: 3000 });
            }
          },
          error: (err) => {
            this.saveLoader = false;
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
      }

      const objTableNames = {
        "tablename": this.myForm.value.tablename,
        "comment": this.myForm.value.comment,
        "totalfields": this.myForm.value.totalfields,
        "status": this.myForm.value.isactive,//status
        "isactive": true
      };
      this.saveLoader = true;
      const tableValue = `tables`;
      const tableModel = {
        [tableValue]: objTableNames
      }

      this.applicationService.addNestNewCommonAPI('cp', tableModel).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.saveLoader = false;
            const observables = this.listOfData.map(element => {
              const objFields = {
                "tableid": res.data[0]?.id,
                "fieldname": element.fieldname,
                "type": element.type,
                "description": element.description,
                "status": element.status,
                "isactive": true
              };
              const tableFieldsValue = `tableschema`;
              const tableFieldsModel = {
                [tableFieldsValue]: objFields
              }
              return this.applicationService.addNestNewCommonAPI('cp', tableFieldsModel).pipe(
                catchError(error => of(error)
                ) // Handle error and continue the forkJoin

              );
            });

            forkJoin(observables).subscribe({
              next: (results) => {
                if (results.every(result => !(result instanceof Error))) {
                  this.saveLoader = false;
                  this.toastr.success("Save Table Fields Successfully", { nzDuration: 3000 });
                  this.cancelEditTable();
                  this.getDatabaseTablev1();
                  this.deletedIds = [];
                } else {
                  this.saveLoader = false;
                  this.toastr.error("Fields not inserted", { nzDuration: 3000 });
                }
              },
              error: (err) => {
                this.saveLoader = false;
                console.error(err);
                this.toastr.error("Fields not inserted", { nzDuration: 3000 });
              }
            });
          } else {
            this.saveLoader = false;
            console.log(res.message);
            this.toastr.error(res.message, { nzDuration: 3000 });
          }
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
        item.fieldname !== '' &&
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
          fields[element.fieldname] = element.type;
      });
      const data = {
        "tablename": this.myForm.value.tablename.toLowerCase(),
        "schema": fields
      };
      if (this.myForm.value.isactive === "Approved") {
        this.saveLoader = true;

        this.applicationService.addNestNewCommonAPI('cp/createTable', data).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              this.saveLoader = false;
              this.toastr.success("Save Successfully", { nzDuration: 3000 });
            } else {
              this.saveLoader = false;
              console.error(res.message);
              this.toastr.error(res.message, { nzDuration: 3000 });
            }
          },
          error: (err) => {
            this.saveLoader = false;
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
      } else if (this.myForm.value.isactive === "Pending" || this.myForm.value.isactive === "Reject") {
        this.toastr.warning("Setting is done.", { nzDuration: 3000 });
      }

      const objTableNames = {
        "tablename": this.myForm.value.tablename,
        "comment": this.myForm.value.comment,
        "totalfields": this.myForm.value.totalfields,
        "status": this.myForm.value.isactive,
        "isactive": true
      };
      const tableValue = `tables`;
      const tableModel = {
        [tableValue]: objTableNames
      }
      const listdata = this.listOfData.filter((data) => {
        data.status = 'Approved';
        return true;
      })
      if (listdata && this.myForm.value.isactive === "Approved") {

      } else {
        alert('Please Approved Select Status');
        return
      }
      this.saveLoader = true;
      this.applicationService.updateNestNewCommonAPI(`cp/tables`, this.tableId, tableModel).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.saveLoader = false;
              this.toastr.success("Table fields updated successfully", { nzDuration: 3000 });
              const observables = this.listOfData.map(element => {
                const objFields = {
                  "tableid": element.update ? this.tableId : 0,
                  "fieldname": element.fieldname,
                  "type": element.type,
                  "description": element.description,
                  "status": element.status,
                  "isactive": true
                }

                const tableFieldsValue = `tableschema`;
                const tableFieldsModel = {
                  [tableFieldsValue]: objFields
                }
                if (objFields.tableid == 0) {
                  tableFieldsModel[tableFieldsValue].tableid = this.tableId;

                  return this.applicationService.addNestNewCommonAPI('cp', tableFieldsModel).pipe(
                    catchError(error => of(error)) // Handle error and continue the forkJoin
                  );
                } else {
                  return this.applicationService.updateNestNewCommonAPI(`cp/tableschema`, element.id, tableFieldsModel).pipe(
                    catchError(error => of(error)) // Handle error and continue the forkJoin
                  );
                }
              });
              this.saveLoader = true;
              forkJoin(observables).subscribe({
                next: (results) => {
                  this.saveLoader = false;
                  if (results.every(result => !(result instanceof Error))) {
                    if (this.deletedIds.length == 0) {
                      // this.toastr.success("Save and Update Table Fields Successfully", { nzDuration: 3000 });
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
                  this.saveLoader = false;
                  console.error(err);
                  this.toastr.error("Fields not inserted", { nzDuration: 3000 });
                }
              });
            }
          }
        },
        error: (err) => {
          this.saveLoader = false;
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    };
  }

  deleteRowData() {
    if (this.deletedCloumns.length > 0) {
      this.myForm.value.tablename
      const objColumns = {
        "tablename": this.tableName,
        "columns": this.deletedCloumns
      }

      this.saveLoader = true;
      this.applicationService.addNestNewCommonAPI(`cp/dropColumn`, objColumns).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.saveLoader = false;
            this.toastr.success("Table field deleted successfully ", { nzDuration: 3000 });
            this.cancelEditTable();
            this.getDatabaseTablev1();
          } else {
            this.saveLoader = false;
            console.error(res.message);
            this.toastr.error(res.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.saveLoader = false;
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
      // const observables = this.deletedIds.map(element => {
      //   return this.employeeService.deleteSQLDatabaseTable('knex-crud/table_schema/', element.id).pipe(
      //     catchError(error => of(error)) // Handle error and continue the forkJoin
      //   );
      // });
      // forkJoin(observables).subscribe({
      //   next: (results) => {
      //     if (results.every(result => !(result instanceof Error))) {
      //       // this.toastr.success("Save and Update Table Fields Successfully", { nzDuration: 3000 });
      //       this.toastr.success("Table field deleted successfully ", { nzDuration: 3000 });
      //       this.cancelEditTable();
      //       this.getDatabaseTablev1();
      //       this.deletedIds = [];
      //     } else {
      //       this.toastr.error("Fields not inserted", { nzDuration: 3000 });
      //     }
      //   },
      //   error: (err) => {
      //     console.error(err);
      //     this.toastr.error("Fields not inserted", { nzDuration: 3000 });
      //   }
      // });
    }
  }
  dropTable(item: any) {
    if (item) {
      this.saveLoader = true;
      this.applicationService.deleteNestNewCommonAPI(`cp/dropTable`, item.name).subscribe({
        next: (res) => {
          // if (res.success) {
          this.saveLoader = false;
          this.toastr.success("Table deleted successfully ", { nzDuration: 3000 });
          this.cancelEditTable();
          this.getDatabaseTablev1();
          // } else {
          //   this.saveLoader = false;
          //   console.error(res.message);
          //   this.toastr.error("An error occurred", { nzDuration: 3000 });
          // }
        },
        error: (err) => {
          this.saveLoader = false;
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    }
  }
  // not used
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
    this.tableName = item.tablename.toLowerCase();
    this.model = item;
    this.listOfData = item.schema;
    this.deletedIds = [];
    this.deletedCloumns = [];
    this.updateEditCache();
  }
  cancelEditTable() {
    this.tableId = 0
    this.model = {};
    this.tableName = "";
    this.deletedIds = [];
    this.deletedCloumns = [];
    this.listOfData = [];
  }
  search(type: string, searchValue: string): void {
    if (type.toLowerCase() === 'approved') {
      this.filteredApproved = this.filterData(this.searchFilterdApproved, searchValue);
    } else if (type.toLowerCase() === 'pending') {
      this.filteredPending = this.filterData(this.searchFilterdPending, searchValue);
    }
  }

  filterData(data: any, searchValue: any): any[] {
    if (!searchValue) {
      return data; // Return the original data when searchValue is empty
    }

    const lowerCaseSearchValue = searchValue.toLocaleLowerCase();
    return data.filter((item: any) =>
      item.tablename.toLocaleLowerCase().includes(lowerCaseSearchValue)
    );
  }


}
