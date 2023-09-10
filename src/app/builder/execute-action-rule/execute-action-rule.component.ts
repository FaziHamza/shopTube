import { AfterViewInit, ChangeDetectorRef, Component,  Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import * as monaco from 'monaco-editor';
import { ApplicationService } from 'src/app/services/application.service';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'st-execute-action-rule',
  templateUrl: './execute-action-rule.component.html',
  styleUrls: ['./execute-action-rule.component.scss']
})
export class ExecuteActionRuleComponent implements OnInit, AfterViewInit {
  @Input() screens: any;
  @Input() screenName: any;
  @Input() selectedNode: any;
  @Input() formlyModel: any;
  @Input() nodes: any;
  @Input() applicationId: string;
  @Input() screeenBuilderId: string;
  requestSubscription: Subscription;
  languageId = 'json';
  nodeList: { title: string, key: string }[] = [];
  constructor(private employeeService: EmployeeService, private cdRef: ChangeDetectorRef,
    private applicationService: ApplicationService,private fb: FormBuilder,
    private toastr: NzMessageService,) {
      this.multiSelectForm = this.fb.group({
        multiSelects: this.fb.array([]),
      });
     }
  ngOnInit() {
    this.getActionData();
    this.extractNodes(this.nodes, this.nodeList);
  }

  ngAfterViewInit(): void {

  }
  columnsFields: any = [];
  operators = ['==', '!=', '>', '<', '>=', '<='];
  actionList: any = '';
  
  getActionData() {
    const selectedScreen = this.screens.filter((a: any) => a.name == this.screenName)
    if (selectedScreen[0].navigation != null && selectedScreen[0].navigation != undefined) { // selectedScreen[0].navigation
      this.requestSubscription = this.applicationService.getNestCommonAPIById("cp/actionbyscreenname", selectedScreen[0]._id).subscribe({
        next: (res: any) => {
          if (res.data && res.data.length > 0) {
            const getRes = res.data.map((x: any) => { return { name: x.quryType, query: x.quries } });
            const schema = res.data.map((x: any) => { return x.quryType });
            this.actionList = JSON.stringify(getRes);
            // Update the enum values in jsonSchema
            this.jsonSchema.items.properties.if.properties.actionRule.enum = schema;
            this.jsonSchema.items.properties.then.additionalProperties.properties.actionRule.enum = schema;
            this.jsonSchema.items.properties.OR.items.properties.if.properties.actionRule.enum = schema;
            this.jsonSchema.items.properties.OR.items.properties.then.additionalProperties.properties.actionRule.enum = schema;
            this.jsonSchema.items.properties.AND.items.properties.if.properties.actionRule.enum = schema;
            this.jsonSchema.items.properties.AND.items.properties.then.additionalProperties.properties.actionRule.enum = schema;

          }
        },
        error: (err) => {
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
    debugger
    const newItem = this.fb.group({
      selectControl: [''], // Initialize this with your select value
      monacoEditorControl: [this.codeEditorRuleInstance], // Initialize this with your Monaco editor value
    });
    this.multiSelectArray.push(newItem);
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
    debugger
    const selectedValues = this.multiSelectArray.value;
    console.log('Selected Values:', selectedValues);
  }
}
