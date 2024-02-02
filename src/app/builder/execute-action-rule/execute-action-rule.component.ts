import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import * as monaco from 'monaco-editor';
import { ApplicationService } from 'src/app/services/application.service';
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'st-execute-action-rule',
  templateUrl: './execute-action-rule.component.html',
  styleUrls: ['./execute-action-rule.component.scss']
})
export class ExecuteActionRuleComponent implements OnInit, AfterViewInit {
  @Input() screens: any;
  @Input() screenname: any;
  @Input() selectedNode: any;
  @Input() formlyModel: any;
  @Input() nodes: any;
  @Input() applicationid: string;
  @Input() screeenBuilderId: string;
  requestSubscription: Subscription;
  languageId = 'json';
  saveLoader: boolean = false;
  nodeList: { title: string, key: string }[] = [];
  levelList: any[] = [
    {
      title: 'level 1',
      key: '0',
    },
    {
      title: 'level 2',
      key: '1',
    },
    {
      title: 'level 3',
      key: '2',
    },
    {
      title: 'level 4',
      key: '3',
    },
    {
      title: 'level 5',
      key: '4',
    },
  ]
  constructor(
    private fb: FormBuilder,
    public socketService: SocketService,
    private toastr: NzMessageService,) {
    this.multiSelectForm = this.fb.group({
      multiSelects: this.fb.array([]),
    });
  }
  ngOnInit() {

    this.getActionData();
    this.extractNodes(this.nodes, this.nodeList);
    // this.getActionRule();
  }

  ngAfterViewInit(): void {

  }
  columnsFields: any = [];
  operators = ['==', '!=', '>', '<', '>=', '<='];

  getActionRuleData() {
    const selectedScreen = this.screens.filter((a: any) => a.name == this.screenname)
    if (selectedScreen[0].navigation != null && selectedScreen[0].navigation != undefined) { // selectedScreen[0].navigation
      this.saveLoader = true;
      const { jsonData, newGuid } = this.socketService.makeJsonDataById('ActionRule', selectedScreen[0].id, 'GetModelTypeById');
      this.socketService.Request(jsonData);
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            this.saveLoader = false;
            if (res.data && res.data.length > 0) {
              this.multiSelectForm = this.fb.group({
                multiSelects: this.fb.array([]),
              });
              res.data.forEach((element: any) => {
                let newItem = this.fb.group({
                  componentFrom: element.componentfrom, // Initialize this with your select value
                  id: element.id, // Initialize this with your select value
                  targetId: element.targetid, // Initialize this with your select value
                  level: element.level, // Initialize this with your select value
                  action: element.action, // Initialize this with your select value
                  monacoEditorControl: [element.rule], // Initialize this with your Monaco editor value
                });
                this.multiSelectArray.push(newItem);
              });

            }
          }
        },
        error: (err) => {
          this.saveLoader = false;
          // this.getActionRule();
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
    }
  }
  actionsList: any[] = [];
  getActionData() {
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
              this.actionsList = res.data;
              const schema = res.data.map((x: any) => { return x.quryType });
              // Update the enum values in jsonSchema
              this.jsonSchema.items.properties.if.properties.actionRule.enum = schema;
              this.jsonSchema.items.properties.then.additionalProperties.properties.actionRule.enum = schema;
              this.jsonSchema.items.properties.OR.items.properties.if.properties.actionRule.enum = schema;
              this.jsonSchema.items.properties.OR.items.properties.then.additionalProperties.properties.actionRule.enum = schema;
              this.jsonSchema.items.properties.AND.items.properties.if.properties.actionRule.enum = schema;
              this.jsonSchema.items.properties.AND.items.properties.then.additionalProperties.properties.actionRule.enum = schema;

            }
            this.getActionRuleData();
          }

        },
        error: (err) => {
          this.saveLoader = false;
          this.getActionRuleData();
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
    }
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
  extractNodes(nodes: any, nodeList: { title: string, key: string }[]) {
    for (const node of nodes) {
      const { title, key, children, id } = node;
      if (title === '') {
        nodeList.push({ title: key, key });
        this.columnsFields.push(key);
      } else {
        nodeList.push({ title, key });
        this.columnsFields.push(key);
      }
      if (children && children.length > 0) {
        this.extractNodes(children, nodeList);
      }
    }
  }
  jsonSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        if: {
          type: 'object',
          properties: {
            actionRule: {
              type: 'string',
              enum: [

              ]
            },
            key: { type: 'string', enum: this.columnsFields },
            compare: { type: 'string', enum: this.operators },
            value: { type: 'string' }
          },
          required: ['actionRule', 'key', 'compare', 'value']
        },
        then: {
          type: 'object',
          properties: {},
          additionalProperties: {
            type: 'object',
            properties: {
              actionRule: {
                type: 'string',
                enum: [

                ]
              },
              key: { type: 'string', enum: this.columnsFields }
            },
            required: ['actionRule', 'key']
          }
        },
        OR: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              if: {
                type: 'object',
                properties: {
                  actionRule: {
                    type: 'string',
                    enum: [

                    ]
                  },
                  key: { type: 'string', enum: this.columnsFields },
                  compare: { type: 'string', enum: this.operators },
                  value: { type: 'string' }
                },
                required: ['actionRule', 'key', 'compare', 'value']
              },
              then: {
                type: 'object',
                properties: {},
                additionalProperties: {
                  type: 'object',
                  properties: {
                    actionRule: {
                      type: 'string',
                      enum: [
                      ]
                    },
                    key: { type: 'string', enum: this.columnsFields }
                  },
                  required: ['actionRule', 'key']
                }
              }
            },
            required: ['if', 'then']
          }
        },
        AND: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              if: {
                type: 'object',
                properties: {
                  actionRule: {
                    type: 'string',
                    enum: [
                    ]
                  },
                  key: { type: 'string', enum: this.columnsFields },
                  compare: { type: 'string', enum: this.operators },
                  value: { type: 'string' }
                },
                required: ['actionRule', 'key', 'compare', 'value']
              },
              then: {
                type: 'object',
                properties: {},
                additionalProperties: {
                  type: 'object',
                  properties: {
                    actionRule: {
                      type: 'string',
                      enum: [

                      ]
                    },
                    key: { type: 'string', enum: this.columnsFields }
                  },
                  required: ['actionRule', 'key']
                }
              }
            },
            required: ['if', 'then']
          }
        }
      },
      additionalProperties: false,
      required: ['if']
    }
  };
  multiSelectForm: FormGroup;

  codeEditorRuleInstance!: monaco.editor.IStandaloneCodeEditor;

  get multiSelectArray() {
    return this.multiSelectForm.get('multiSelects') as FormArray;
  }
  addMultiSelect() {
    const newItem = this.fb.group({
      action: [''], // Initialize this with your select value
      id: [''], // Initialize this with your select value
      componentFrom: [''], // Initialize this with your select value
      targetId: [''], // Initialize this with your select value
      level: [''], // Initialize this with your select value
      monacoEditorControl: [this.codeEditorRuleInstance], // Initialize this with your Monaco editor value
    });
    this.multiSelectArray.push(newItem);
  }
  addAllActions() {
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
    actions.forEach((action: any) => {
      const getAction = this.actionsList.find(a => a.actionlink === action.actionLink && a.actiontype === action.type);
      const existingAction = this.multiSelectArray.value?.find((a: any) =>
        a.action === action.actionLink
      );
      if (getAction) {
        if (!existingAction) {
          const obj = [
            {
              "if": {
                "actionRule": getAction.qurytype,
                "key": "0",
                "compare": "==",
                "value": "0"
              }
            }
          ]
          const newItem = this.fb.group({
            componentFrom: buttonData?.key, // Initialize this with your select value
            targetId: (action.type === 'query' && action.actionLink === 'get') ? tableData?.key : '', // Initialize this with your select value
            action: 'click', // Initialize this with your select value
            level: '', // Initialize this with your select value
            monacoEditorControl: [JSON.stringify(obj)]
          });
          this.multiSelectArray.push(newItem);
        }
      }
    });

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
  removeMultiSelect(index: number) {
    this.multiSelectArray.removeAt(index);
  }
  onEditorContentChange(content: string, index: number) {
    const editorControl = this.multiSelectArray.at(index).get('monacoEditorControl');
    if (editorControl) {
      editorControl.setValue(content);
    }
  }
  saveMultiSelects() {
    let actionRuleList: any[] = [];
    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenname)
    const observables = this.multiSelectArray.value.map((element: any) => {
      let actionData: any = {
        "screenbuilderid": mainModuleId.length > 0 ? mainModuleId[0].id : "",
        "componentFrom": element.componentFrom,
        "targetId": element.targetId,
        "level": element.level,
        // "id": element.id,
        "action": element.action,
        "rule": element.monacoEditorControl,
        "applicationid": this.applicationid,
      }
      if (element.id)
        actionData['id'] = element.id
      actionRuleList.push(actionData);
    });
    // const Json = { json: JSON.stringify(actionRuleList) }
    // const obj = {
    //   screenbuilderid: mainModuleId.length > 0 ? mainModuleId[0].id : "",
    //   applicationid: this.applicationid,
    //   data: JSON.stringify(Json)
    // }
    this.saveLoader = true;
    const { newGuid, metainfocreate } = this.socketService.metainfoDynamic(`ActionRuleCrud`, 'actionrule', mainModuleId[0].id);
    var ResponseGuid: any = newGuid;
    const Add = { [`dataobject`]: actionRuleList, metaInfo: metainfocreate }
    this.socketService.Request(Add);
    this.socketService.OnResponseMessage().subscribe({
      next: (allResults: any) => {
        if (allResults.parseddata.requestId == ResponseGuid && allResults.parseddata.isSuccess) {
          allResults = allResults.parseddata.apidata;
          this.saveLoader = false;
          if (allResults) {  //results.every((result: any) => !(result instanceof Error))
            this.getActionData();
            this.toastr.success("Action Rules Save Successfully", { nzDuration: 3000 });
            // }
          } else {
            this.toastr.error("Action Rules not saved", { nzDuration: 3000 });
          }
        }
      },
      error: (err) => {
        this.saveLoader = false;
        console.error(err);
        this.toastr.error("Action Rules: An error occured", { nzDuration: 3000 });
      }

    })
    // const mainModuleId = this.screens.filter((a: any) => a.name == this.screenname)
    // this.applicationService.deleteNestCommonAPI('cp/ActionRule/deleteActionRule', mainModuleId[0].id).subscribe(res => {
    //   const observables = this.multiSelectArray.value.map((element: any) => {

    //     let actionData: any = {
    //       "screenbuilderid": mainModuleId.length > 0 ? mainModuleId[0].id : "",
    //       "componentFrom": element.componentFrom,
    //       "targetId": element.targetId,
    //       "level": element.level,
    //       "id": element.id,
    //       "action": element.action,
    //       "rule": element.monacoEditorControl,
    //       "applicationid": this.applicationid,
    //     }

    //     const actionModel = {
    //       "ActionRule": actionData
    //     }
    //     return this.applicationService.addNestCommonAPI('cp', actionModel).pipe(
    //       catchError(error => of(error)) // Handle error and continue the forkJoin
    //     );
    //   });
    //   forkJoin(observables).subscribe({
    //     next: (allResults: any) => {
    //       if (allResults.every((result: any) => result.isSuccess === true)) {  //results.every((result: any) => !(result instanceof Error))
    //         
    //         // if (allResults) {
    //         this.getActionData();
    //         this.toastr.success("Action Rules Save Successfully", { nzDuration: 3000 });
    //         // }
    //       } else {
    //         this.toastr.error("Action Rules not saved", { nzDuration: 3000 });
    //       }
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.toastr.error("Action Rules: An error occured", { nzDuration: 3000 });
    //     }
    //   });
    // })

  }
}
