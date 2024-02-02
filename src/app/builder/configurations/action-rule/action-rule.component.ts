import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'st-action-rule',
  templateUrl: './action-rule.component.html',
  styleUrls: ['./action-rule.component.scss']
})
export class ActionRuleComponent implements OnInit {
  backendApi = environment.nestBaseUrl;
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
    if (this.requestSubscription)
      this.requestSubscription.unsubscribe();
  }
  @Input() screens: any;
  @Input() screenname: any;
  @Input() selectedNode: any;
  @Input() formlyModel: any;
  @Input() nodes: any;
  @Input() applicationid: string;
  @Input() screeenBuilderId: string;
  actionForm: FormGroup;
  genrateQuery: any;
  genrateValue: any;
  sqlType: string = "sql";
  generatedSqlQuery: any;
  requestSubscription: Subscription;
  screenActions: any[];
  showActionRuleForm: boolean = true;
  saveLoader: boolean = false;
  nodeList: { title: string, key: string }[] = [];
  emailToOptions: any[] = [];
  emailNameOptions: any = [];
  screenOptions: any = [];
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public dataSharedService: DataSharedService, private toastr: NzMessageService,
    public socketService: SocketService,

  ) { }

  ngOnInit(): void {
    // this.getPendingTableFileds();
    this.actionFormLoad();
    this.getScreens();
    this.getEmailTemplates();
    this.getActionData();
    this.extractNodes(this.nodes, this.nodeList);
    this.extractEmailNodes(this.nodes);
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
  extractEmailNodes(nodes: any[]) {
    for (const node of nodes) {
      if (node.type === 'email') {
        let label = node.title || node.key; // Using node.title if available, otherwise using node.key
        let obj = {
          'label': label,
          'value': node.key,
        };
        this.emailToOptions.push(obj);
      }
      if (node.children && node.children.length > 0) {
        this.extractEmailNodes(node.children);
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
  addActionToForm(actionLink: string, actionType: string, elementName: string): void {
    if (!this.actionForm.value?.Actions.some((a: any) => a.actionLink === actionLink && a.type === actionType)) {
      const obj = {
        actionLink: actionLink,
        actionType: actionType,
        elementName: elementName,
        elementNameTo: "",
        submissionType: "click"
      };
      this.actionForm.patchValue(obj);
      this.addActionFormGroup();
    }
  }
  makeActionRules() {
    const buttonData = this.findObjectByTypeBase(this.nodes[0], "button");
    const tableData = this.findObjectByTypeBase(this.nodes[0], "gridList");

    const actions = [
      { actionLink: 'get', type: 'query' },
      { actionLink: 'post', type: 'query' },
      { actionLink: 'put', type: 'query' },
      { actionLink: 'delete', type: 'query' },
      { actionLink: 'post', type: 'api' },
      { actionLink: 'put', type: 'api' },
      { actionLink: 'get', type: 'api' },
      // { actionLink: 'delete', type: 'api' },
    ];

    actions.forEach((action) => {
      const existingAction = this.actionForm.value?.Actions.find((a: any) =>
        a.actionLink === action.actionLink && a.type === action.type
      );

      if (!existingAction) {
        const obj = {
          actionLink: action.actionLink,
          actionType: action.type,
          elementName: (action.type === 'api' && (action.actionLink === 'get' || action.actionLink === 'put' || action.actionLink === 'post')) ? buttonData.key : (action.type === 'api' && action.actionLink === 'delete') ? tableData.key : this.nodes[0].key,
          elementNameTo: (action.type === 'api' && action.actionLink === 'get') ? tableData.key : '',
          submissionType: 'click',
        };

        this.actionForm.patchValue(obj);
        this.addActionFormGroup();
      }
    });
  }

  addActionFormGroup() {

    let mainArray: any[] = [];
    for (let i = 0; i < Object.keys(this.formlyModel).length; i++) {
      const element = Object.keys(this.formlyModel)[i];
      if (typeof this.formlyModel[element] !== 'object') {
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
        if (typeof this.formlyModel[key] !== 'object') {
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
              }
              else {
                if (this.actionForm.value.actionLink == 'put') {
                  const valueMatched = key.split('.')[1];
                  values.push(`$${valueMatched ? valueMatched.toLocaleLowerCase() : key.toLocaleLowerCase()}`);
                }
                else
                  values.push(`$${key.toLocaleLowerCase()}`);
              }
              if (this.actionForm.value.actionLink == 'put') {
                const valueMatched = key.split('.')[1];
                joinFields.push(`${valueMatched ? valueMatched.toLocaleLowerCase() : key.toLocaleLowerCase()}`);

              } else {
                joinFields.push(`${key.toLocaleLowerCase()}`);
              }
            }
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
                tableId = joining == lastTable ? `${joining}.id` : `${lastTable}.${lastTable}id`;
              }
              joining += `${lastTable != joining ? lastTable : ''} INNER JOIN ${element.toLocaleLowerCase()} ON ${tableId} = ${element.toLocaleLowerCase()}.${lastTable.toLocaleLowerCase()}id `
            }
            lastTable = element.toLocaleLowerCase();
          });
          dataForQuery += `select ${joinFields.join(', ')} from ${joining};`;
        }
      } else if (this.actionForm.value.actionLink == 'post') {
        const columnName = fields.filter(item => item !== 'id');
        columnName.push('id');
        const columnValues = values.filter(item => !item.includes('.id'));
        let tableName = columnValues[0].split('.')[0];
        columnValues.push(`${tableName}.id`)
        dataForQuery += `insert into ${element.name.toLocaleLowerCase()} ( ${columnName.join(', ')} ) VALUES ( ${columnValues.join(', ')}) RETURNING *;`;
        // dataForQuery += `insert into ${element.name.toLocaleLowerCase()} ( ${columnName.join(', ')} ) VALUES ( ${columnValues.join(', ')}) RETURNING id;`;
      } else if (this.actionForm.value.actionLink == 'put') {
        const columnName = fields.filter(item => item !== 'id');
        const columnValues = values.filter(item => !item.includes('$id'));
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
      if (this.actionForm.value.actionLink === 'delete') {
        apiUrl = this.backendApi + 'knex-query/executeQuery';
      }
      else if (this.actionForm.value.actionLink === 'get') {
        apiUrl = this.backendApi + 'knex-query/' + this.screenname;
      }
      else if (this.actionForm.value.actionLink === 'put') {
        apiUrl = this.backendApi + 'knex-query/executeQuery';
      }

      else {
        apiUrl = this.backendApi + 'knex-query';
      }
      // if (this.actionForm.value.elementName.includes('button')) {

      // }
      //  else {
      //   apiUrl = this.backendApi;
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
        referenceId: ['', Validators.required],
        httpAddress: [apiUrl],
        contentType: [''],
        emailto: [],
        emailtype: [''],
        pagelink: [''],
        pagetype: [''],
        emailbulkindividual: [''],
        emailtemplate: [''],
        emailfrom: [''],
        emailsendingtype: [''],
        query: [this.actionForm.value.actionType === "query" ? this.reorderQueries(dataForQuery) : ""]
      })
    );
    this.toastr.success('Action Added', { nzDuration: 3000 });
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
    
     const mainModuleId = this.screens.filter((a: any) => a.name == this.screenname)
     const observables = this.actionForm.value.Actions.map((element: any) => {
       let data: any = {
         "moduleName": this.screenname,
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
    if (!this.ActionsForms.valid) {
      this.toastr.error("Action Name is required", { nzDuration: 3000 });
      return
    }
    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenname);
    const checkQuery = this.actionForm.value.Actions.filter((a: any) => /SELECT\s+\*\s+FROM/i.test(a.query));

    if (checkQuery.length > 0) {
      this.toastr.error("In the query, do not use 'SELECT * FROM'. Please enter a proper query", { nzDuration: 3000 });
      return;
    }

    let actionListData: any[] = [];

    const observables = this.actionForm.value.Actions.map((element: any) => {
      let queryType = '';
      if (!element.referenceId.includes(element.referenceId + '_'))
        queryType = element.actionLink + '_' + element.referenceId;
      else
        queryType = element.referenceId;

      let actionData: any = {
        "moduleName": this.screenname,
        "moduleId": mainModuleId.length > 0 ? mainModuleId[0].navigation : "",
        "screenbuilderid": mainModuleId.length > 0 ? mainModuleId[0].id : "",
        "btnActionType": element.submissionType ? element.submissionType : "",
        "elementName": element.elementName || '',
        "elementNameTo": element.elementNameTo || '',
        "actionType": element.actionType || '',
        "actionLink": element.actionLink || '',
        "quryType": queryType || '',
        "quries": element.query || '',
        "submit": element.submit || '',
        "type": element.type || '',
        "sqlType": element.sqlType || '',
        "email": (element?.emailsendingtype == 'query' ? element.email : ''),
        "emailto": element?.emailto ? JSON.stringify(element?.emailto) : '',
        "emailtype": element?.emailtype,
        "pagelink": (element.emailtype == 'token' ? element?.pagelink : ''),
        "pagetype": element.pagetype || '',
        "emailbulkindividual": element?.emailbulkindividual || '',
        "emailfrom": element?.emailfrom || '',
        "emailsendingtype": element?.emailsendingtype || '',
        "emailtemplate": element?.emailtemplate || '',
        "confirmEmail": element.confirmEmail || '',
        "referenceId": element.referenceId || '',
        "httpAddress": element.httpAddress ? element.httpAddress : "",
        "contentType": element.contentType ? element.contentType : "",
        "applicationid": this.applicationid || '',
      };

      if (element.id)
        actionData['id'] = element.id;

      actionListData.push(actionData);
    });
    this.saveLoader = true;
    const { newGuid, metainfocreate } = this.socketService.metainfoDynamic(`ManageActionCrud`,'Actions',mainModuleId[0].id);
    var ResponseGuid: any= newGuid;
    const Add = { [`dataobject`]: actionListData, metaInfo: metainfocreate }
    this.socketService.Request(Add);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.saveLoader = false;
          if (res.isSuccess) {
            if (res.data.length > 0) {
              setTimeout(() => {
                // Your code to be executed after the delay
                this.getActionData();
              }, 1000);
            }
          }
          else {
            this.toastr.error(`Actions:` + res.message, { nzDuration: 3000 });
          }
        }
      },
      error: (err) => {
        this.saveLoader = false;
        console.error(err);
        this.toastr.error(`Actions: ${err}`, { nzDuration: 3000 });
      }
    })
  }



  getActionData() {
    debugger
    const selectedScreen = this.screens.filter((a: any) => a.name == this.screenname)
    if (selectedScreen[0].navigation != null && selectedScreen[0].navigation != undefined) { // selectedScreen[0].navigation
      this.saveLoader = true;
      const { jsonData, newGuid } = this.socketService.makeJsonDataById('Actions', selectedScreen[0].id, 'GetModelTypeById');
      this.socketService.Request(jsonData);
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            this.saveLoader = false;
            if (res.data && res.data.length > 0) {
              const getRes = res.data;
              if (getRes.length > 0) {
                this.screenActions = getRes;
                this.actionForm = this.formBuilder.group({
                  elementName: [getRes[0].elementname],
                  elementNameTo: [getRes[0]?.elementnameto],
                  actionType: [getRes[0].actiontype],
                  actionLink: [getRes[0].actionlink],
                  submissionType: [getRes[0].btnactiontype],
                  Actions: this.formBuilder.array(getRes.map((getQueryActionRes: any) =>
                    this.formBuilder.group({
                      id: [getQueryActionRes.id],
                      submit: [getQueryActionRes.submit],
                      type: [getQueryActionRes.type],
                      sqlType: [getQueryActionRes.sqltype],
                      actionType: [getQueryActionRes.actiontype],
                      elementName: [getQueryActionRes.elementname],
                      elementNameTo: [getQueryActionRes?.elementnameto],
                      actionLink: [getQueryActionRes.actionlink],
                      submissionType: [getQueryActionRes.btnactiontype],
                      email: [getQueryActionRes.email],
                      confirmEmail: [getQueryActionRes.confirmemail],
                      referenceId: [getQueryActionRes.referenceid],
                      query: [getQueryActionRes.quries],
                      httpAddress: [getQueryActionRes.httpaddress],
                      contentType: [getQueryActionRes.contenttype],
                      emailto: getQueryActionRes?.emailto ? [JSON.parse(getQueryActionRes?.emailto)] : [],
                      emailtype: [getQueryActionRes?.emailtype],
                      pagelink: [getQueryActionRes?.pagelink],
                      pagetype: [getQueryActionRes?.pagetype],
                      emailbulkindividual: [getQueryActionRes?.emailbulkindividual],
                      emailtemplate: [getQueryActionRes?.emailtemplate],
                      emailsendingtype: [getQueryActionRes?.emailsendingtype],
                      emailfrom: [getQueryActionRes?.emailfrom],
                    })
                  )),
                })
                console.log(this.actionForm.value)
              }
            }
          }
        },
        error: (err) => {
          this.saveLoader = false;
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
    let tableData = this.findObjectByTypeBase(this.nodes[0], "gridList");
    if (tableData) {
      let findClickApi = tableData?.appConfigurableEvent?.filter((item: any) =>
        item.actionLink === 'get' && (item.actionType === 'api' || item.actionType === 'query'
        ))
      if (findClickApi) {
        if (findClickApi.length > 0) {
          let url = '';
          const mainModuleId = this.screens.filter((a: any) => a.name == this.screenname)
          for (let index = 0; index < findClickApi.length; index++) {
            let element = findClickApi[index].actionType;
            if (element == 'query') {
              url = `knex-query/getAction/${findClickApi[index].id}`;
              break;
            } else {
              url = `knex-query/getAction/${findClickApi[index].id}`;
            }
          }

          if (url) {
            let pagination = '';
            if (tableData.serverSidePagination) {
              pagination = '?page=' + 1 + '&pageSize=' + tableData?.end;
            }
            this.employeeService.getSQLDatabaseTable(url + pagination).subscribe({
              next: (res) => {
                if (tableData && res.isSuccess) {
                  let saveForm = JSON.parse(JSON.stringify(res.data[0]));
                  const firstObjectKeys = Object.keys(saveForm);
                  let obj = firstObjectKeys.map(key => ({ name: key, key: key }));
                  tableData.tableData = [];
                  tableData['tableKey'] = obj;
                  tableData.tableHeaders = tableData['tableKey'];
                  saveForm.id = tableData.tableData.length + 1;
                  res.data.forEach((element: any) => {
                    element.id = (element.id).toString();
                    tableData.tableData?.push(element);
                  });
                  // pagniation work start
                  if (!tableData.end) {
                    tableData.end = 10;
                  }
                  tableData.pageIndex = 1;
                  tableData.totalCount = res.count;
                  tableData.serverApi = `knex-query/${this.screenname}`;
                  tableData.targetId = '';
                  tableData.displayData = tableData.tableData.length > tableData.end ? tableData.tableData.slice(0, tableData.end) : tableData.tableData;
                  // pagniation work end
                }
              }
            });
          }
        }
      }
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

  // getPendingTableFileds() {
  //   this.requestSubscription = this.builderService.getPendingTableFields('knex-crud/getPending/table_schema/' + this.screeenBuilderId).subscribe({
  //     next: (res: any) => {
  //       if (res) {
  //         if (res.length > 0) {
  //           this.showActionRuleForm = false;
  //         }
  //       }
  //     }, error: (err: any) => {
  //       console.error(err); // Log the error to the console
  //       this.toastr.error(`UserAssignTask : An error occurred`, { nzDuration: 3000 });
  //     }
  //   })
  // }
  getEmailTemplates() {
    this.saveLoader = true;
    const { jsonData, newGuid } = this.socketService.makeJsonData('emailtemplates', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.saveLoader = false;
          if (res.isSuccess && res.data.length > 0) {
            this.emailNameOptions = res.data.map((res: any) => ({
              label: res.name,
              value: res.id,
            }));
          } else {
            this.toastr.error(res.message, { nzDuration: 3000 });
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }
    });
  }
  getScreens() {
    this.saveLoader = true;
    const { jsonData, newGuid } = this.socketService.makeJsonData('ScreenBuilder', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.saveLoader = false;
          if (res.isSuccess && res?.data.length > 0) {
            this.screenOptions = res.data.map((res: any) => ({
              label: res.name,
              value: `pages/${res.navigation}`,
            }));
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }
    });
  }
}
