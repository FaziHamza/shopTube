import { BuilderService } from './../../../services/builder.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';
import {} from 'ngx-monaco-editor';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'st-action-rule',
  templateUrl: './action-rule.component.html',
  styleUrls: ['./action-rule.component.scss']
})
export class ActionRuleComponent implements OnInit {
  backendApi  = environment.nestBaseUrl;
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
    if(this.requestSubscription)
    this.requestSubscription.unsubscribe();
  }
  @Input() screens: any;
  @Input() screenName: any;
  @Input() selectedNode: any;
  @Input() formlyModel: any;
  @Input() nodes: any;
  @Input() applicationId: string;
  actionForm: FormGroup;
  genrateQuery: any;
  genrateValue: any;
  sqlType: string = "sql";
  generatedSqlQuery: any;
  requestSubscription: Subscription;
  screenActions: any[];
  nodeList: { title: string, key: string }[] = [];
  constructor(private formBuilder: FormBuilder, private builderService: BuilderService,
    private employeeService: EmployeeService,
    public dataSharedService: DataSharedService, private toastr: NzMessageService,
    private applicationService: ApplicationService) { }

  ngOnInit(): void {

    this.actionFormLoad();
    this.getActionData();
    this.extractNodes(this.nodes, this.nodeList);
  }
  extractNodes(nodes: any, nodeList: { title: string, key: string }[]) {
    for (const node of nodes) {
      const { title, key, children, id } = node;
      if (title === '') {
        nodeList.push({ title: key, key });
      } else {
        nodeList.push({ title, key });
      }
      if (children && children.length > 0) {
        this.extractNodes(children, nodeList);
      }
    }
  }

  actionFormLoad() {
    this.actionForm = this.formBuilder.group({
      actionType: [''],
      actionLink: [''],
      elementName: [''],
      elementNameTo: [''],
      submissionType: [''],
      Actions: this.formBuilder.array([]),
    })
  }

  duplicateActionFormGroup(index: number, data: any) {
    let check = this.actionForm.value.Actions.filter((a: any) => a.type == data);
    this.ActionsForms.insert(index as number + 1,
      this.formBuilder.group({
        id: 0,
        type: [check[0].type],
        email: [check[0].email],
        sqlType: [check[0].sqlType],
        elementName: [check[0].elementName],
        elementNameTo: [check[0].elementNameTo],
        actionLink: [check[0].actionLink],
        actionType: [check[0].actionType],
        submissionType: [check[0].submissionType],
        confirmEmail: [check[0].confirmEmail],
        referenceId: [check[0].referenceId],
        httpAddress: [check[0].httpAddress],
        contentType: [check[0].contentType],
        query: [check[0].query]
      }));
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
    let apiUrl = '';
    if (this.actionForm.value.actionType === 'api') {
      // if (this.actionForm.value.elementName.includes('button')) {
        if (this.actionForm.value.actionLink === 'get') {
          apiUrl = this.backendApi + 'knex-query/' + this.screenName;
        } else {
          apiUrl = this.backendApi + 'knex-query';
        }
      // }
    }
    this.ActionsForms.push(
      this.formBuilder.group({
        id: 0,
        submit: [this.actionForm.value.submissionType],
        type: [this.actionForm.value.actionType],
        sqlType: ["sql"],
        actionLink: [this.actionForm.value.actionLink],
        elementName: [this.actionForm.value.elementName],
        elementNameTo: [this.actionForm.value.elementNameTo],
        actionType: [this.actionForm.value.actionType],
        submissionType: [this.actionForm.value.submissionType],
        email: [this.actionForm.value.actionType === "email" ? dataForQuery : ""],
        confirmEmail: [this.actionForm.value.actionType === "confirmEmail " ? dataForQuery : ""],
        referenceId: [''],
        httpAddress: [apiUrl],
        contentType: [''],
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
  removeActionFormGroup(index: number, data: any) {

    this.ActionsForms.removeAt(index);
    if (data.id == 0) {
    } else {
      // this.requestSubscription = this.employeeService.deleteSQLDatabaseTable('knex-crud/SQLQueries/', data.id).subscribe({
      //   next: (res) => {
      //     this.ActionsForms.removeAt(index);
      //     this.toastr.success("Delete Successfully", { nzDuration: 3000 });
      //   },
      //   error: (err) => {
      //     console.error(err);
      //     this.toastr.error("An error occurred", { nzDuration: 3000 });
      //   }
      // });
    }
  }

// Save Action Backup 💾
/*
SaveAction() {
  debugger
   const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
   const observables = this.actionForm.value.Actions.map((element: any) => {
     let data: any = {
       "moduleName": this.screenName,
       "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
       "btnActionType": element.submissionType ? element.submissionType : "",
       "elementName": element.elementName,
       "actionType": element.actionType,
       "actionLink": element.actionLink,
       "quryType": element.referenceId,
       "quries": element.query,
       "submit": element.submit,
       "type": element.type,
       "sqlType": element.sqlType,
       "email": element.email,
       "confirmEmail": element.confirmEmail,
       "referenceId": element.referenceId,
       "httpAddress": element.httpAddress ? element.httpAddress : "",
       "contentType": element.contentType ? element.contentType : ""
     }
     if (element.id == 0) {
       return this.employeeService.saveSQLDatabaseTable('knex-crud/SQLQueries', data).pipe(
         catchError(error => of(error)) // Handle error and continue the forkJoin
       );
     } else {
       return this.employeeService.updateSQLDatabaseTable('knex-crud/SQLQueries/' + element.id, data).pipe(
         catchError(error => of(error)) // Handle error and continue the forkJoin
       );
     }
   });

   forkJoin(observables).subscribe({
     next: (results: any) => {
       if (results.every((result: any) => !(result instanceof Error))) {
         this.getActionData();
         this.toastr.success("Actions Save Successfully", { nzDuration: 3000 });
       } else {
         this.toastr.error("Actions not saved", { nzDuration: 3000 });
       }
     },
     error: (err) => {
       console.error(err);
       this.toastr.error("Actions not saved", { nzDuration: 3000 });
     }
   });
 } */


  SaveAction() {
    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
    this.applicationService.deleteNestCommonAPI('cp/Action/DeleteAction',mainModuleId[0].navigation).subscribe(res=>{
      const observables = this.actionForm.value.Actions.map((element: any) => {

        let actionData: any = {
          "moduleName": this.screenName,
          "moduleId": mainModuleId.length > 0 ? mainModuleId[0].navigation : "",
          "btnActionType": element.submissionType ? element.submissionType : "",
          "elementName": element.elementName,
          "elementNameTo": element.elementNameTo,
          "actionType": element.actionType,
          "actionLink": element.actionLink,
          "quryType": element.referenceId,
          "quries": element.query,
          "submit": element.submit,
          "type": element.type,
          "sqlType": element.sqlType,
          "email": element.email,
          "confirmEmail": element.confirmEmail,
          "referenceId": element.referenceId,
          "httpAddress": element.httpAddress ? element.httpAddress : "",
          "contentType": element.contentType ? element.contentType : "",
          "applicationId": this.applicationId,
        }


        const actionModel = {
          "Action" : actionData
        }
        return this.applicationService.addNestCommonAPI('cp', actionModel).pipe(
          catchError(error => of(error)) // Handle error and continue the forkJoin
        );
        // else {
        //   return this.applicationService.updateNestCommonAPI('cp/Action',element.id, actionModel).pipe(
        //     catchError(error => of(error)) // Handle error and continue the forkJoin
        //   );
        // }
      });
      forkJoin(observables).subscribe({
        next: (allResults: any) => {
          if (allResults.every((result:any) => result.isSuccess === true)) {  //results.every((result: any) => !(result instanceof Error))
            debugger
            // if (allResults) {
              this.getActionData();
              this.getFromQuery();
              this.toastr.success("Actions Save Successfully", { nzDuration: 3000 });
            // }
          } else {
            this.toastr.error("Actions not saved", { nzDuration: 3000 });
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Actions: An error occured", { nzDuration: 3000 });
        }
      });
    })

  }

  getActionData() {
    debugger
    const selectedScreen = this.screens.filter((a: any) => a.name == this.screenName)
    if (selectedScreen[0].navigation != null && selectedScreen[0].navigation != undefined) { // selectedScreen[0].navigation
      this.requestSubscription = this.applicationService.getNestCommonAPIById("cp/actionbyscreenname", selectedScreen[0].navigation ).subscribe({
        next: (res:any) => {
          if (res.isSuccess) {
            // this.toastr.success(`Action : Success => ${JSON.stringify(res.data)}`)
          }
          if (res.data && res.data.length > 0) {
            // console.warn(`Length : ${res.data.length}`)
            const getRes = res.data.filter((x: any) => x.moduleId == selectedScreen[0].navigation)
            if (getRes.length > 0) {
              // console.warn(`Get Result Length : ${res.data.length}`)
              this.screenActions = getRes;
              this.actionForm = this.formBuilder.group({
                elementName: [getRes[0].elementName],
                elementNameTo: [getRes[0]?.elementNameTo],
                actionType: [getRes[0].actionType],
                actionLink: [getRes[0].actionLink],
                submissionType: [getRes[0].btnActionType],
                Actions: this.formBuilder.array(getRes.map((getQueryActionRes: any) =>
                  this.formBuilder.group({
                    id: [getQueryActionRes._id],
                    submit: [getQueryActionRes.submit],
                    type: [getQueryActionRes.type],
                    sqlType: [getQueryActionRes.sqlType],
                    actionType: [getQueryActionRes.actionType],
                    elementName: [getQueryActionRes.elementName],
                    elementNameTo: [getQueryActionRes?.elementNameTo],
                    actionLink: [getQueryActionRes.actionLink],
                    submissionType: [getQueryActionRes.btnActionType],
                    email: [getQueryActionRes.email],
                    confirmEmail: [getQueryActionRes.confirmEmail],
                    referenceId: [getQueryActionRes.referenceId],
                    query: [getQueryActionRes.quries],
                    httpAddress: [getQueryActionRes.httpAddress],
                    contentType: [getQueryActionRes.contentType]
                  })
                )),
              })
            }
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
    }
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
  getFromQuery() {
    let tableData = this.findObjectByTypeBase(this.nodes[0],"gridList");
    if(tableData){
      const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
      this.employeeService.getSQLDatabaseTable(`knex-query/${mainModuleId[0].navigation}`).subscribe({
        next: (res) => {
          if (tableData  && res) {
            let saveForm = JSON.parse(JSON.stringify(res[0]));
            const firstObjectKeys = Object.keys(saveForm);
            let obj = firstObjectKeys.map(key => ({ name: key,key: key}));
            tableData.tableData = [];
            tableData['tableKey'] = obj;
            tableData.tableHeaders = tableData['tableKey'];
            saveForm.id = tableData.tableData.length + 1
            res.forEach((element: any) => {
              element.id = (element.id).toString();
              tableData.tableData?.push(element);
            });
          }
        }
      });
    }
  }
  findObjectByTypeBase(data: any, type: any) {
    if (data) {
      if (data.type && type) {
        if (data.type === type) {
          return data;
        }
        if (data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByTypeBase(child, type);
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }
    }
  }
}
