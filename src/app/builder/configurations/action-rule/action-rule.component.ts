import { BuilderService } from './../../../services/builder.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { E } from '@formulajs/formulajs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';
import {

} from 'ngx-monaco-editor';


@Component({
  selector: 'st-action-rule',
  templateUrl: './action-rule.component.html',
  styleUrls: ['./action-rule.component.scss']
})
export class ActionRuleComponent implements OnInit {
  userTheme: string = "vs-dark";
  userLanguage: string = "javascript";
  editorOptions: any = {
    theme: this.userTheme,
    language: this.userLanguage,
    roundedSelection: true,
    autoIndent: 'full'
  };
  editor: any;
  editorInit(editor: any) {
    this.editor = editor
  }
  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  @Input() screenModule: any;
  @Input() screenName: any;
  @Input() selectedNode: any;
  @Input() formlyModel: any;
  actionForm: FormGroup;
  genrateQuery: any;
  genrateValue: any;
  sqlType: string = "sql";
  generatedSqlQuery: any;
  requestSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private builderService: BuilderService,
    public dataSharedService: DataSharedService, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.actionFormLoad();
    this.getActionData();
  }

  actionFormLoad() {
    this.actionForm = this.formBuilder.group({
      actionType: [''],
      actionLink: [''],
      submissionType: [''],
      Actions: this.formBuilder.array([]),
    })
  }

  duplicateActionFormGroup(index: number, data: any) {
    let check = this.actionForm.value.Actions.filter((a: any) => a.type == data);
    // formArray.insert(0, );
    // const formArray  = this.ActionsForms;
    // formArray.insert(0, this.formBuilder.control(formArray.length + 1));
    // this.ActionsForms.insert(index as number + 1,this.formBuilder.control(ActionsForms.length + 1));
    this.ActionsForms.insert(index as number + 1,
      this.formBuilder.group({
        type: [check[0].type],
        email: [check[0].email],
        sqlType: [check[0].sqlType],
        actionLink: [check[0].actionLink],
        actionType: [check[0].actionType],
        submissionType: [check[0].submissionType],
        confirmEmail: [check[0].confirmEmail],
        referenceId: [check[0].referenceId],
        query: [check[0].query]
      }));
    // this.ActionsForms.push();
    // this.ActionsForms.splice(index as number + 1, 0, newNode);
  }
  get ActionsForms() {
    return this.actionForm.get('Actions') as FormArray;
  }

  addActionFormGroup() {
    debugger
    let mainArray: any[] = [];
    for (let i = 0; i < Object.keys(this.formlyModel).length; i++) {
      const element = Object.keys(this.formlyModel)[i];
      let keyPart = element.split('.')
      let check = mainArray.find(a => a.name == keyPart[0])
      if (!check) {
        let obj: any = { name: keyPart[0], children: [] };
        obj.children.push(this.formlyModel[element] ? this.formlyModel[element] : `value${i}`);
        mainArray.push(obj);
      } else {
        check.children.push(this.formlyModel[element] ? this.formlyModel[element] : `value${i}`)
      }
    }
    let dataForQuery = "";

    let joinTables: any[] = [];
    let joinFields: any[] = [];
    for (let i = 0; i < mainArray.length; i++) {
      const element = mainArray[i];
      joinTables.push(element.name);
      let fields = [];
      let values: any[] = [];

      for (let j = 0; j < Object.keys(this.formlyModel).length; j++) {
        const key = Object.keys(this.formlyModel)[j];
        const keys = key.split('.')
        if (keys[0] == element.name) {
          const item = this.formlyModel[key] ? this.formlyModel[key] : `value${j}`;
          if (item) {
            const keyvalue = key.replace(`${element.name}.`, '');
            fields.push(keyvalue.toLocaleLowerCase());
            if (keyvalue.includes('_id')) {
              let s = (keyvalue).toLowerCase()
              s = s.replace('_id', '');
              s = (`${s}.${keyvalue}`);
              values.push(`$${s.toLocaleLowerCase()}`);
            } else {
              values.push(`$${key.toLocaleLowerCase()}`);
            }
            joinFields.push(`${key.toLocaleLowerCase()}`);
          }
        }
      }


      // if (this.actionForm.value.actionLink == 'select') {
      //   dataForQuery += "select " + fields.join(', ') + " from " + element.name.toLocaleLowerCase();
      // } else 
      if (this.actionForm.value.actionLink == 'get') {
        if (mainArray.length == i + 1) {
          dataForQuery += `select ${joinFields.join(', ')} from ${element.name.toLocaleLowerCase()};`;
        }
      } else if (this.actionForm.value.actionLink == 'getJoin') {
        let joining = "";
        let lastTable = "";
        if (mainArray.length == i + 1) {
          joinTables.forEach((element, index) => {
            if (joining == "")
              joining = element.toLocaleLowerCase();
            else {
              let tableId;
              if (index % 2 === 0) {
                // Include ${lastTable}.id in the selectFields array
                tableId = `${lastTable}.id`;
              } else {
                tableId = joining == lastTable ? `${joining}.id` : `${lastTable}.${lastTable}_id`;
              }
              joining += `${lastTable != joining ? lastTable : ''} INNER JOIN ${element.toLocaleLowerCase()} ON ${tableId} = ${element.toLocaleLowerCase()}.${lastTable.toLocaleLowerCase()}_id `
            }
            lastTable = element.toLocaleLowerCase();
          });
          dataForQuery += `select ${joinFields.join(', ')} from ${joining};`;
        }
      } else if (this.actionForm.value.actionLink == 'post') {
        const columnName = fields.filter(item => item !== 'id');
        const columnValues = values.filter(item => !item.includes('.id'));
        dataForQuery += `insert into ${element.name.toLocaleLowerCase()} ( ${columnName.join(', ')} ) OUTPUT INSERTED.ID VALUES ( ${columnValues.join(', ')});`;
      } else if (this.actionForm.value.actionLink == 'put') {
        const columnName = fields.filter(item => item !== 'id');
        const columnValues = values.filter(item => !item.includes('.id'));
        let updateQuery = columnName.map((field, index) => `${field} = '${columnValues[index]}'`).join(', ');
        dataForQuery += "UPDATE " + element.name.toLocaleLowerCase() + " SET " + updateQuery + " WHERE " + `id = $id; `;
        // dataForQuery += "UPDATE " + element.name.toLocaleLowerCase() + " SET " + updateQuery + " WHERE " + `${element.name.toLocaleLowerCase()}.id = $${element.name.toLocaleLowerCase()}.id; `;
      } else if (this.actionForm.value.actionLink == 'delete') {
        let deleteQuery = "DELETE FROM " + element.name.toLocaleLowerCase() + " WHERE " + `id` + " = " + `$id; `;
        // let deleteQuery = "DELETE FROM " + element.name.toLocaleLowerCase() + " WHERE " + `${element.name.toLocaleLowerCase()}.id` + " = " + `$${element.name.toLocaleLowerCase()}.id; `;
        dataForQuery += deleteQuery;
      }


    }
    this.ActionsForms.push(
      this.formBuilder.group({
        submit: [this.actionForm.value.submissionType],
        type: [this.actionForm.value.actionType],
        sqlType: ["sql"],
        actionLink: [this.actionForm.value.actionLink],
        actionType: [this.actionForm.value.actionType],
        submissionType: [this.actionForm.value.submissionType],
        email: [this.actionForm.value.actionType === "email" ? dataForQuery : ""],
        confirmEmail: [this.actionForm.value.actionType === "confirmEmail " ? dataForQuery : ""],
        referenceId: [''],
        query: [this.actionForm.value.actionType === "query" ? this.reorderQueries(dataForQuery) : ""]
      })
    );
  }
  reorderQueries(queryString: any) {
    let queries = queryString.split(';').map((query: any, index: any) => ({
      id: index + 1,
      query: query.trim(),
    }));

    // Parse foreign keys from queries
    queries.forEach((query: any) => {
      const matches = [...query.query.matchAll(/(\w+)_Id/g)];
      query.foreignKeys = matches.map(match => match[1]);
    });

    let sortedQueries: any[] = [];
    while (queries.length > 0) {
      for (let i = 0; i < queries.length; i++) {
        let currentQuery = queries[i];
        if (currentQuery.foreignKeys.every((fk: any) => sortedQueries.find(sq => (sq.query) === fk))) {
          sortedQueries.push(currentQuery);
          queries.splice(i, 1);
          break;
        }
      }
    }
    // If you want the output to be a single string of sorted queries:
    return sortedQueries.map(query => query.query).join('; ');
  }


  // Remove FormGroup
  removeActionFormGroup(index: number) {
    this.ActionsForms.removeAt(index);
  }

  SaveAction() {
    debugger
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    this.actionForm.value.Actions.forEach((element: any) => {
      const data = {
        "moduleName": this.screenName,
        "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
        "btnActionType": element.submissionType ? element.submissionType : "",
        "actionType": element.actionType,
        "actionLink": element.actionLink,
        "quryType": element.referenceId,
        "quries": element.query,
        "submit": element.submit,
        "type": element.type,
        "sqlType": element.sqlType,
        "email": element.email,
        "confirmEmail": element.confirmEmail,
        "referenceId": element.referenceId
      }
      if (data != null) {
        if (mainModuleId[0].screenId != null) {
          this.builderService.saveSQLDatabaseTable('knex-crud/SQLQueries', data).subscribe({
            next: (res) => {
              this.toastr.success("Save Successfully", { nzDuration: 3000 });

              // for (let j = 0; j < Object.keys(this.formlyModel).length; j++) {
              //   const key = Object.keys(this.formlyModel)[j];
              //   const keys = key.split('.')
              //   if (keys[0] == element.name) {
              //     const item = this.formlyModel[key] ? this.formlyModel[key] : `value${j}`;
              //     if (item) {
              //     }
              //   }
              // }
            },
            error: (err) => {
              console.error(err);
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          });
        }
      }
    });

    // const jsonQuryResult = {
    //   "key": this.selectedNode?.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
    //   "title": this.selectedNode.title,
    //   "type": this.selectedNode.type,
    //   "btnActionType": this.selectedNode.actionType,
    //   "moduleName": this.screenName,
    //   "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
    //   "queryData": this.actionForm.value.Actions,
    //   "actionType": this.actionForm.value.submissionType,
    //   "actionLink": this.actionForm.value.actionLink
    // }
    // if (jsonQuryResult != null) {
    //   const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    //   if (mainModuleId[0].screenId != null) {
    //     this.requestSubscription = this.builderService.jsonActionRuleDataGet(mainModuleId[0].screenId).subscribe({
    //       next: (getRes) => {
    //         if (getRes.length == 0) {
    //           this.requestSubscription = this.builderService.jsonActionRuleDataSave(jsonQuryResult).subscribe({
    //             next: (saveRes) => {
    //               alert("Data Save");
    //             },
    //             error: (err) => {
    //               console.error(err);
    //               this.toastr.error("An error occurred", { nzDuration: 3000 });
    //             }
    //           });
    //         }
    //         else {
    //           this.requestSubscription = this.builderService.jsonActionRuleRemove(getRes[0].id).subscribe({
    //             next: (delRes) => {

    //               this.requestSubscription = this.builderService.jsonActionRuleDataSave(jsonQuryResult).subscribe({
    //                 next: (saveRes) => {
    //                   alert("Data Save");
    //                 },
    //                 error: (err) => {
    //                   console.error(err);
    //                   this.toastr.error("An error occurred", { nzDuration: 3000 });
    //                 }
    //               });


    //             },
    //             error: (err) => {
    //               console.error(err);
    //               this.toastr.error("An error occurred", { nzDuration: 3000 });
    //             }
    //           });
    //         }
    //       },
    //       error: (err) => {
    //         console.error(err);
    //         this.toastr.error("An error occurred", { nzDuration: 3000 });
    //       }
    //     });
    //   }
    // }
  }

  getActionData() {
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    this.requestSubscription = this.builderService.jsonActionRuleDataGet(mainModuleId[0].screenId).subscribe({
      next: (getRes) => {
        if (getRes.length > 0)
          this.actionForm = this.formBuilder.group({
            actionType: [getRes[0]?.queryData[0]?.type],
            actionLink: [getRes[0].actionLink],
            submissionType: [getRes[0].actionType],
            Actions: this.formBuilder.array(getRes[0].queryData.map((getQueryActionRes: any) =>
              this.formBuilder.group({
                submit: [getQueryActionRes.submit],
                type: [getQueryActionRes.type],
                sqlType: [getQueryActionRes.sqlType],
                actionType: [getQueryActionRes.actionType],
                actionLink: [getQueryActionRes.actionLink],
                submissionType: [getQueryActionRes.submissionType],
                email: [getQueryActionRes.email],
                confirmEmail: [getQueryActionRes.confirmEmail],
                referenceId: [getQueryActionRes.referenceId],
                query: [getQueryActionRes.query]
              })
            )),
          })
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  changePostgress(queryType: string, index: number) {
    const sqlType: any = this.ActionsForms.at(index).get('sqlType');
    if (sqlType == "postgress")
      if (queryType = "query") {
        const value = this.actionForm.value.Actions[index].query.replaceAll('"', "'")
        this.ActionsForms.at(index).patchValue({ query: value });
      } else if (queryType = "email") {
        const value = this.actionForm.value.Actions[index].email.replaceAll('"', "'")
        this.ActionsForms.at(index).patchValue({ email: value });
      } else if (queryType = "confirmEmail") {
        const value = this.actionForm.value.Actions[index].confirmEmail.replaceAll('"', "'")
        this.ActionsForms.at(index).patchValue({ confirmEmail: value });
      }
  }

}
