import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { TreeNode } from 'src/app/models/treeNode';
import { ApplicationService } from 'src/app/services/application.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import * as Joi from 'joi';

@Component({
  selector: 'st-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  @Input() sections: any;
  @Input() screenName: any;
  @Input() screenId: any;
  @Input() resData: any;
  @Input() formlyModel: any;
  form: any = new FormGroup({});
  @Output() traverseChangeEmit: EventEmitter<any> = new EventEmitter();
  @Output() sectionRepeatEmit: EventEmitter<any> = new EventEmitter();
  @Output() notify: EventEmitter<any> = new EventEmitter();
  requestSubscription: Subscription;
  dataModel: any = {};
  validationCheckStatus: any = [];
  setErrorToInput: any = [];
  joiValidationData: TreeNode[] = [];
  schemaValidation: any;
  ruleObj: any = {};
  ruleValidation: any = {};
  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService, private employeeService: EmployeeService
    , private applicationServices: ApplicationService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getJoiValidation();
    // this.getFromQuery();
    this.requestSubscription = this.dataSharedService.sectionSubmit.subscribe({
      next: (res) => {
        const checkButtonExist = this.isButtonIdExist(this.sections.children[1].children, res.id);
        if (checkButtonExist) {
          let makeModel: any = {};
          const filteredNodes = this.filterInputElements(this.sections.children[1].children);
          for (let item in this.formlyModel) {
            filteredNodes.forEach((element) => {
              if (item == element.formly[0].fieldGroup[0].key) {
                makeModel[item] = this.formlyModel[item]
              }
            });
          }
          this.dataModel = makeModel;
          if (Object.keys(makeModel).length > 0) {
            for (const key in this.dataModel) {
              if (this.dataModel.hasOwnProperty(key)) {
                const value = this.getValueFromNestedObject(key, this.formlyModel);
                if (value !== undefined) {
                  this.dataModel[key] = value;
                }
              }
            }
          }
          // this.submit();
          if (Object.keys(makeModel).length > 0) {
            let obj = {
              "employeeeuser": this.dataModel
            };
            // this.dataModel = obj;
            this.saveData(res)

          }
        }



        // for (const key in this.dataModel) {
        //   if (this.dataModel.hasOwnProperty(key)) {
        //     if (this.formlyModel.hasOwnProperty(key)) {
        //       this.dataModel[key] = this.formlyModel[key];
        //     }
        //   }
        // }
        // this.saveData(res);
        // const checkButtonExist = this.isButtonIdExist(this.sections.children[1].children, res.id);
        // if (checkButtonExist) {
        //   let makeModel: any = {};
        //   const filteredNodes = this.filterInputElements(this.sections.children[1].children);
        //   for (let item in this.formlyModel) {
        //     filteredNodes.forEach((element) => {
        //       if (item == element.formly[0].fieldGroup[0].key) {
        //         makeModel[item] = this.formlyModel[item]
        //       }
        //     });
        //   }
        //   this.dataModel = makeModel;
        //   // this.submit();
        //   this.saveData(res)
        // }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getValueFromNestedObject(key: string, obj: any): any {
    const keys = key.split('.');
    let value = obj;
    for (const k of keys) {
      if (!value || !value.hasOwnProperty(k)) {
        return undefined;
      }
      value = value[k];
    }
    return value;
  }
  traverseAndChange(node: any, type: string) {
    let obj = {
      node: node,
      type: type
    }
    this.traverseChangeEmit.emit(obj);
  }
  sectionRepeat(data: any) {
    this.sectionRepeatEmit.emit(data);
  }
  isButtonIdExist(data: any[], targetId: string): boolean {
    for (const item of data) {
      if (item.type === 'button' && item.id === targetId) {
        return true;
      }
      if (item.children && item.children.length > 0) {
        if (this.isButtonIdExist(item.children, targetId)) {
          return true;
        }
      }
    }
    return false;
  }
  filterInputElements(data: any): any[] {
    const inputElements: any[] = [];

    function traverse(obj: any): void {
      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          traverse(item);
        });
      } else if (typeof obj === 'object' && obj !== null) {
        if (obj.formlyType === 'input') {
          inputElements.push(obj);
        }
        Object.values(obj).forEach((value) => {
          traverse(value);
        });
      }
    }

    traverse(data);
    return inputElements;
  }
  saveData(data: any) {

    if (data.isSubmit) {
      // let oneModelData = this.convertModel(this.dataModel);
      // // this.sections.children[1].children
      // // this.sections.children[1].childrena.forEach((element:any) => {
      // //   if(element.type == "gridList"){
      // //     let tableData = this.findObjectByType(element,"gridList");
      // //     tableData.tableData = [];
      // //     tableData.tableHeaders = [];
      // //     tableData?.tableData?.push(this.dataModel);
      // //   }
      // // });
      // // let tableData = this.findObjectByType(element,"gridList");
      // let tableData = this.sections.children[1].children.filter((a: any) => a.type == "gridList");
      // if (tableData.length > 0) {
      //   tableData[0]['api'] = data.dataTable;
      //   let saveForm = JSON.parse(JSON.stringify(oneModelData));
      //   // saveForm["id"] = '';
      //   // this.dataModel["id"] = tableData[0]['tableKey'].length
      //   const firstObjectKeys = Object.keys(saveForm);
      //   let obj = firstObjectKeys.map(key => ({ name: key }));
      //   // obj.unshift({name: 'id'});
      //   if (JSON.stringify(tableData[0]['tableKey']) != JSON.stringify(obj)) {
      //     tableData[0].tableData = [];
      //     tableData[0]['tableKey'] = obj;
      //     tableData[0].tableHeaders = tableData[0]['tableKey'];
      //     saveForm.id = tableData[0].tableData.length + 1
      //     tableData[0].tableData?.push(saveForm);
      //   } else {
      //     tableData[0]['tableKey'] = obj;
      //     tableData[0].tableHeaders = tableData[0]['tableKey'];
      //     saveForm.id = tableData[0].tableData.length + 1;
      //     tableData[0].tableData?.push(saveForm);
      //   }

      // }
      this.joiValidation();
      // this.saveData1(data);
    }
  }
  saveData1(data: any) {
    // this.submit();
    let oneModelData = this.convertModel(this.dataModel);
    // const objModel: any = this.dataModel;
    // var nestedObject = {};
    // for (var key in objModel) {
    //   Object.assign(nestedObject, objModel[key]);
    // }

    // let nestedObject: any = null;
    // Object.keys(objModel).forEach(key => {
    //   const value = objModel[key];
    //   if (typeof value === "object" && value !== null) {
    //     nestedObject = value;
    //   }
    // });
    const empData = {
      screenId: this.screenName,
      modalData: oneModelData
    };

    console.log(empData);
    const tableNames = new Set();

    for (const key in empData.modalData) {
      const tableName = key.split('.')[0];
      tableNames.add(tableName);
    }

    const Arraytables = Array.from(tableNames)
    const remainingTables = Arraytables.slice(1);
    let id;
    for (const key in empData.modalData) {
      if (empData.modalData.hasOwnProperty(key) &&
        key.endsWith('.id') &&
        empData.modalData[key] !== "") {
        id = key;
      }
    }

    if (id == undefined) {
      let relationIds: any = remainingTables.map(table => `${Arraytables[0]}_id`);
      relationIds = relationIds.toString();
      const tables = (Array.from(tableNames)).toString();
      console.log(tables);
      if (Object.keys(empData.modalData).length > 0)
        this.employeeService.saveSQLDatabaseTable('knex-query', empData).subscribe({
          next: (res) => {
            if (res[0]?.error)
              this.toastr.error(res[0]?.error, { nzDuration: 3000 });
            else {
              this.toastr.success("Save Successfully", { nzDuration: 3000 });
              this.setInternalValuesEmpty(this.dataModel)
              // this.employeeService.getSQLDatabaseTable(`knex-query?tables=${tables}&relationIds=id,${relationIds.toString()}`).subscribe({
              this.getFromQuery();
            }
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
    } else {
      // const dynamicPropertyName = Object.keys(this.dataModel)[0]; // Assuming the dynamic property name is the first property in this.dataModel
      if (this.dataModel) {
        // this.form.get(dynamicPropertyName);
        const model = {
          screenId: this.screenName,
          postType: 'put',
          modalData: empData.modalData
        };
        if (Object.keys(empData.modalData).length > 0)
          this.employeeService.saveSQLDatabaseTable('knex-query/executeQuery', model).subscribe({
            next: (res) => {
              this.toastr.success("Update Successfully", { nzDuration: 3000 });
              this.getFromQuery();
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          });
      }
    }

    // if (data.dataTable) {
    //   this.requestSubscription = this.builderService.genericApisPost(data.dataTable, this.dataModel).subscribe({
    //     next: (res) => {
    //       this.toastr.success("Data saved!", { nzDuration: 3000 });
    //     },
    //     error: (err) => {
    //       console.error(err); // Log the error to the console
    //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //     }
    //   });
    // } else {
    //   this.toastr.error("Data table required", { nzDuration: 3000 }); // Show an error message to the user
    // }
  }
  convertModel(model: any, parentKey = "") {
    const convertedModel: any = {};

    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const value = model[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          Object.assign(convertedModel, this.convertModel(value, newKey.toLocaleLowerCase()));
        } else {
          convertedModel[newKey.toLocaleLowerCase()] = value;
        }
      }
    }

    return convertedModel;
  }
  getFromQuery() {

    let tableData = this.sections.children[1].children.filter((a: any) => a.type == "gridList");
    this.employeeService.getSQLDatabaseTable(`knex-query/${this.screenName}`).subscribe({
      next: (res) => {

        if (tableData.length > 0) {
          // tableData[0]['api'] = data.dataTable;
          let saveForm = JSON.parse(JSON.stringify(res[0]));
          // saveForm["id"] = '';
          // this.dataModel["id"] = tableData[0]['tableKey'].length
          const firstObjectKeys = Object.keys(saveForm);
          let obj = firstObjectKeys.map(key => ({ name: key }));
          // obj.unshift({name: 'id'});
          if (JSON.stringify(tableData[0]['tableKey']) != JSON.stringify(obj)) {
            tableData[0].tableData = [];
            tableData[0]['tableKey'] = obj;
            tableData[0].tableHeaders = tableData[0]['tableKey'];
            saveForm.id = tableData[0].tableData.length + 1
            res.forEach((element: any) => {
              element.id = (element.id).toString();
              tableData[0].tableData?.push(element);
            });
          } else {
            tableData[0]['tableKey'] = obj;
            tableData[0].tableHeaders = tableData[0]['tableKey'];
            tableData[0].tableData = [];
            saveForm.id = tableData[0].tableData.length + 1;
            res.forEach((element: any) => {
              element.id = (element.id).toString();
              tableData[0].tableData?.push(element);
            });
            // tableData[0].tableData?.push(saveForm);
          }
        }
      }
    });
  }
  setInternalValuesEmpty = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.setInternalValuesEmpty(obj[key]);
      } else {
        obj[key] = '';
      }
    }
  };
  submit() {

    // this.commonChartService.submit();
    // this.cd.detectChanges();
    // this.joiService.dataModel = this.dataModel;
    // this.joiService.submit();
    this.dataModel = this.formlyModel;
    // this.formlyModel = this.dataModel;
    this.joiValidation();
    // if (this.validationCheckStatus.length === 0) {
    //   this.dataModel;
    //   console.log(this.dataModel);
    //   this.dataModel
    // }
    // else {
    //   alert(this.validationCheckStatus);
    // }
  }
  joiValidation() {
    let jsonScreenRes: any = [];
    if (this.joiValidationData.length > 0) {
      for (let j = 0; j < this.sections.children[1].children.length; j++) {
        if (this.sections.children[1].children[j].formlyType != undefined) {
          let jsonScreenRes = this.joiValidationData.filter(a => a.key == this.sections.children[1].children[j].formly[0].fieldGroup[0].key);
          if (jsonScreenRes.length > 0) {
            if (jsonScreenRes[0].type === "text") {
              const { minlength, maxlength } = jsonScreenRes[0];
              const minLimit: any = typeof minlength !== 'undefined' ? minlength : 0;
              const maxLimit: any = typeof maxlength !== 'undefined' ? maxlength : 0;
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.string().min(parseInt(minLimit, 10)).max(parseInt(maxLimit, 10)),
              };
            }
            else if (jsonScreenRes[0].type === "number") {
              const { minlength, maxlength } = jsonScreenRes[0];
              const minLimit: any = typeof minlength !== 'undefined' ? minlength : 0;
              const maxLimit: any = typeof maxlength !== 'undefined' ? maxlength : 0;
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.number().integer().min(parseInt(minLimit, 10)).max(parseInt(maxLimit, 10)),
              };
            }
            else if (jsonScreenRes[0].type == "pattern") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.string().pattern(new RegExp(jsonScreenRes[0].pattern)),
              }
            }
            else if (jsonScreenRes[0].type == "reference") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.ref(typeof jsonScreenRes[0].reference !== 'undefined' ? jsonScreenRes[0].reference : ''),
              }
            }
            else if (jsonScreenRes[0].type == "email") {
              // this.ruleObj = {
              //   [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments: jsonScreenRes[0].emailTypeAllow.length, tlds: { allow: jsonScreenRes[0].emailTypeAllow } }),
              // }
              const emailTypeAllow = Array.isArray(jsonScreenRes[0].emailTypeAllow) ? jsonScreenRes[0].emailTypeAllow : [];
              const minDomainSegments = Math.max(0, Number.isInteger(jsonScreenRes[0].emailTypeAllow.length) ? jsonScreenRes[0].emailTypeAllow.length : 0);
              const schema = {
                [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments, tlds: { allow: emailTypeAllow } }),
              };
              this.ruleObj = schema;
            }
            Object.assign(this.ruleValidation, this.ruleObj);
          }
        }

      }
      this.schemaValidation = Joi.object(Object.assign({}, this.ruleValidation));
      this.validationChecker();

    }
    return true;
  }
  validationChecker() {
    this.sections.children[1].children.forEach((item: any) => {
      if (item.formly) {
        item.formly[0].fieldGroup[0].props.error = null;
      }
      // for (let index = 0; index < this.sections.children[1].children[0].formly[0].fieldGroup.length; index++) {
      //   this.sections.children[1].children[0].formly[0].fieldGroup[index].props.error = null;
      // }
    });

    this.validationCheckStatus = [];
    const cc = this.schemaValidation.validate(Object.assign({}, this.formlyModel), { abortEarly: false });
    let filteredNodes = this.filterInputElements(this.sections.children[1].children);
    if (cc?.error) {
      this.setErrorToInput = cc.error.details;
      filteredNodes.forEach((V2: any) => {
        for (let index = 0; index < V2.formly[0].fieldGroup.length; index++) {
          for (let i = 0; i < this.setErrorToInput.length; i++) {
            const element = this.setErrorToInput[i];
            if (V2.formly[0].fieldGroup[index].key.includes(this.setErrorToInput[i].context.key)) {
              if (this.setErrorToInput[i].message == '"' + this.setErrorToInput[i].context.key + '" ' + "is not allowed") {
                V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = null;
                // V2.formly[0].fieldGroup[index].props['required'] = false;
              }
              else {
                V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = this.setErrorToInput[i].message.replace(this.setErrorToInput[i].context.key, V2.formly[0].fieldGroup[index].props.label);
                // V2.formly[0].fieldGroup[index].props['required'] = true;
              }
            }
            else {
              let check = this.setErrorToInput.filter((error: any) => error.context.key == V2.formly[0].fieldGroup[index].key);
              if (check.length == 0) {
                V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = null;
                // this.dataSharedService.formlyShowError.next(false);
              }
            }
          }
          if (V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage)
            this.validationCheckStatus.push(V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage);
        }
      });
      if (this.setErrorToInput.length > 0) {
        this.dataSharedService.formlyShowError.next(true);
      }
      this.cd.detectChanges();
    }
    else {
      // filteredNodes = this.filterInputElements(this.sections.children[1].children);
      filteredNodes.forEach((V2: any) => {
        for (let index = 0; index < V2.formly[0].fieldGroup.length; index++) {
          V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = null;
        }
      })
    }
  }
  findObjectByType(data: any, key: any) {
    if (data.type === key) {
      return data;
    }
    for (let child of data.children) {
      let result: any = this.findObjectByType(child, key);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
  getJoiValidation() {
    
    if (this.screenId)
      this.applicationServices.getNestCommonAPIById('cp/ValidationRule', this.screenId).subscribe((getRes => {
        this.joiValidationData = getRes.data;
      }))
  }
}
