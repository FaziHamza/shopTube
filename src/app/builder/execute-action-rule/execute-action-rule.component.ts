import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import * as monaco from 'monaco-editor';
import Ajv, { ErrorObject } from 'ajv';
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
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private cdRef: ChangeDetectorRef,
    private applicationService: ApplicationService,
    private toastr: NzMessageService,) { }
  actionResult: any;
  ngOnInit() {
    this.getActionData();
    let filteredInputNodes = this.filterInputElements(this.nodes[0].children[1].children);
    if (filteredInputNodes.length > 0) {
      this.extractNodes(filteredInputNodes, this.nodeList);
    }
    this.getActionRule();
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
  actionRuleId = '';
  getActionRule() {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/ActionRule').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.actionRule = res.data?.[0]?.rule || '';
          this.actionRuleId = res.data?.[0]?._id || '';
          if (!this.isEditorInitialized) {
            this.codeEditorRuleInstance = monaco.editor.create(this._editorRuleContainer.nativeElement, {
              theme: 'myCustomTheme',
              language: this.languageId,
              value: this.actionRule // Initial value
            });
          }
        } else
          this.toastr.error(res.message, { nzDuration: 3000 });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }

    });
  }
  getActionData() {
    debugger
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
  actionList: any = '';
  actionRule: any = '';
  actionModel: any = JSON.stringify({
    "userTypeId": 1,
    "status": "premium",
    "price": 250
  }
  )
  db = {
    execute: async (query: string) => {
      if (query.includes("userType")) {
        return { status: 1 }; // Simulate premium user
      } else if (query.includes("tblDiscount")) {
        return { discount: 10 }; // Simulate discount value
      } else {
        throw new Error("Unknown query");
      }
    },
  };

  ruleForm: FormGroup;



  validationMessage: any[] = [];
  codeEditorRuleInstance!: monaco.editor.IStandaloneCodeEditor;
  codeEditorActionsInstance!: monaco.editor.IStandaloneCodeEditor;
  // @ViewChild('editorRuleContainer', { static: false}) _editorRuleContainer!: ElementRef;
  @ViewChild('editorRuleContainer', { static: false }) private _editorRuleContainer: ElementRef;

  // @ViewChild('editorActionsContainer', { static: false }) _editorActionsContainer!: ElementRef;
  columnsFields: any = [];
  operators = ['==', '!=', '>', '<', '>=', '<='];

  ngAfterViewInit(): void {
    if (this.IsShowConfig) {
      this.initializeMonacoEditor();
    }

  }
  validateJSON() {
    this.validationMessage = [];
    try {
      const jsonData = JSON.parse(this.codeEditorRuleInstance.getValue());
      const ajv = new Ajv();
      const valid = ajv.validate(this.jsonSchema, jsonData);
      if (!valid && ajv.errors) {
        // Keep the original error objects, but add custom error messages
        this.validationMessage = ajv.errors.map(err => ({
          originalError: err,
          message: this.customErrorMessage(err)
        }));
      }
    } catch (error) {
      this.validationMessage.push({ message: 'Invalid JSON format.' });
    }
  }
  fixError(errorObj: any) {
    const error = errorObj.originalError; // Extract the original Ajv error object
    if (!error || !error.instancePath) {
      console.error('Invalid error object', error);
      return;
    }
    const fieldPath = error.instancePath.split('/');
    let jsonData = JSON.parse(this.codeEditorRuleInstance.getValue()); // Get JSON object from editor

    let currentObject: any = jsonData; // Start at the root of the JSON object

    // Navigate to the parent object of the invalid field
    for (let i = 1; i < fieldPath.length - 1; i++) { // Skip the empty first element
      currentObject = currentObject[fieldPath[i]];
    }

    const invalidField = fieldPath[fieldPath.length - 1];
    const allowedValues = error.params['allowedValues'] as string[] | undefined;
    const validField = allowedValues ? allowedValues[0] : ''; // Choose the correct value

    // Update the invalid field with the correct value
    currentObject[invalidField] = validField;

    // Update the editor with the corrected JSON
    this.updateEditor(JSON.parse(JSON.stringify(jsonData, null, 2))); // Pretty print with 2 spaces
    this.validateJSON(); // Re-run the validation
  }
  updateEditor(json: any) {
    const editorContent = JSON.stringify(json, null, 2);
    // Assuming you have a reference to the Monaco editor instance
    this.codeEditorRuleInstance.setValue(editorContent);
  }
  customErrorMessage(error: ErrorObject): string {
    if (error.keyword === 'enum' && error.instancePath.includes('conditions')) {
      const field = error.instancePath.split('/')[3];
      const allowedValues = error.params['allowedValues'] as string[] | undefined;
      if (allowedValues) {
        return `Invalid value for field '${field}'. Did you mean one of these? ${allowedValues.join(', ')}`;
      }
    } else if (error.keyword === 'type' && error.instancePath.endsWith('/value')) {
      const field = error.instancePath.split('/')[3];
      return `Invalid type for field '${field}'. The value must be a string.`;
    } else if (error.keyword === 'additionalProperties') {
      const propertyName = error.params['additionalProperty'];
      const validProperties = Object.keys(error.parentSchema?.['properties'] || {}).join(', ');
      return `Unknown property '${propertyName}'. Please choose from the following valid properties: ${validProperties}`;
    }
    return error.message || 'Unknown error';
  }
  addCustomButton() {
    // Wait for the editor to be ready
    setTimeout(() => {
      // Find the toolbar in the Monaco Editor's DOM
      const toolbar = document.querySelector('.monaco-toolbar');

      // Create a button element
      const button = document.createElement('button');
      button.innerText = 'Validate JSON';
      button.className = 'my-custom-button'; // You can add styling with CSS

      // Add a click event listener to run your validation function
      button.addEventListener('click', () => {
        this.validateJSON();
      });

      // Append the button to the toolbar
      if (toolbar) {
        toolbar.appendChild(button);
      }
    }, 1000); // Adjust the timeout if necessary
  }

  // fazi
  extractActionsFromJSON(json: any): string[] {
    const actions: string[] = [];
    const extractActionsFromObject = (obj: any) => {
      if (obj && typeof obj === 'object') {
        if (obj['actionRule']) {
          actions.push(obj['actionRule']);
        }
        for (let key in obj) {
          extractActionsFromObject(obj[key]);
        }
      }
    };
    extractActionsFromObject(json);
    return [...new Set(actions)]; // Removes duplicates
  }

  actionsList = this.extractActionsFromJSON(JSON.parse(this.actionRule));


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
                'applyDiscount',
                'notifyUser',
                'applyPremiumDiscount',
                'checkUserType',
                'applyUserTypeDiscount',
                // ... add other actions here
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
                  'applyDiscount',
                  'notifyUser',
                  'applyPremiumDiscount',
                  'checkUserType',
                  'applyUserTypeDiscount',
                  // ... add other actions here
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
                      'applyDiscount',
                      'notifyUser',
                      'applyPremiumDiscount',
                      // ... add other actions here
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
                        'applyDiscount',
                        'notifyUser',
                        'applyPremiumDiscount',
                        // ... add other actions here
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
                      'applyDiscount',
                      'notifyUser',
                      'applyPremiumDiscount',
                      // ... add other actions here
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
                        'applyDiscount',
                        'notifyUser',
                        'applyPremiumDiscount',
                        // ... add other actions here
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
  IsShowConfig: boolean = false;
  closeConfigurationList() {
    this.IsShowConfig = false;
    // Dispose the editors to ensure they are destroyed when the drawer is closed
    if (this.codeEditorRuleInstance) {
      this.codeEditorRuleInstance.dispose();
    }
    if (this.codeEditorActionsInstance) {
      this.codeEditorActionsInstance.dispose();
    }
  }
  controlListOpen() {
    this.IsShowConfig = true;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.initializeMonacoEditor();
    }, 100);
  }
  isEditorInitialized = false;
  afterDrawerOpen() {
    alert("fazi")
  }


  initializeMonacoEditor(): void {
    debugger
    if (!this.isEditorInitialized) {


      debugger
      if (this._editorRuleContainer) {
        // Try logging to see if the reference is available
        console.log(this._editorRuleContainer?.nativeElement);
      } else {
        console.log('editorRuleContainer is not available');
      }

      // if (this._editorActionsContainer) {
      //   console.log(this._editorActionsContainer.nativeElement);
      // } else {
      //   console.log('editorActionsContainer is not available');
      // }

      if (this.isEditorInitialized) {
        return;
      }
      // Define a JSON schema for suggestions
      monaco.editor.defineTheme('myCustomTheme', {
        base: 'vs', // can also be vs-dark or hc-black
        inherit: true, // can also be false to completely replace the built-in rules
        rules: [
          { token: 'comment', foreground: 'ffa500' },
          { token: 'string', foreground: '00ff00' },
          // more rules here
        ],
        colors: {
          // you can also set editor-wide colors here
          'editor.foreground': '#000000',
          'editor.background': '#f5f5f5',
          // and more
        }
      });

      // Register the JSON schema
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
          uri: 'mySchema',
          fileMatch: ['*'],
          schema: this.jsonSchema
        }]
      });
      //   if (this._editorRuleContainer && this._editorRuleContainer.nativeElement) {
      //     // Access the nativeElement or other properties/methods
      // }

      // Create editor
      this.codeEditorRuleInstance = monaco.editor.create(this._editorRuleContainer.nativeElement, {
        theme: 'myCustomTheme',
        language: this.languageId,
        value: this.actionRule // Initial value
      });
      // this.codeEditorActionsInstance = monaco.editor.create(this._editorActionsContainer.nativeElement, {
      //   theme: 'myCustomTheme',
      //   language: this.languageId,
      //   value: this.actionList // Initial value
      // });

      this.codeEditorRuleInstance.addAction({
        id: 'validate-json',
        label: 'Validate JSON',
        run: () => {
          this.validateJSON(); // Call the validation method
        }
      });

      this.codeEditorActionsInstance.addAction({
        id: 'validate-json',
        label: 'Validate JSON',
        run: () => {
          this.validateJSON(); // Call the validation method
        }
      });
      this.codeEditorActionsInstance.addAction({
        id: 'my-duplicate-action',
        label: 'Duplicate',
        keybindings: [monaco.KeyCode.F10],
        contextMenuGroupId: 'customActions',
        contextMenuOrder: 1.5,
        run: (ed: any) => {
          const selectedText = ed.getModel().getValueInRange(ed.getSelection());

          if (selectedText) {
            try {
              const selectedJson = JSON.parse(selectedText);

              if (selectedJson.if) {
                const content = ed.getValue();
                const updatedContent = this.duplicateIfObjectInContent(content, selectedJson);
                ed.setValue(updatedContent);
              }
            } catch (e) {
              console.error("Invalid JSON selected or other error:", e);
            }
          }
        }
      });

      this.addCustomButton();
      this.isEditorInitialized = true;

    } else {
      // this.codeEditorRuleInstance.layout();
      // this.codeEditorActionsInstance.layout();
    }
  }
  duplicateIfObjectInContent(content: any, ifObjectToDuplicate: any) {
    const data = JSON.parse(content);
    const indexOfObject = data.findIndex((obj: any) => JSON.stringify(obj.if) === JSON.stringify(ifObjectToDuplicate));

    if (indexOfObject !== -1) {
      const newObject = { ...data[indexOfObject] };
      data.splice(indexOfObject + 1, 0, newObject);
    }

    return JSON.stringify(data, null, 2);
  }

  onDrawerVisibilityChanged(isVisible: boolean) {
    if (isVisible) {
      // Adjust the editors' size to fit the container
      this.codeEditorRuleInstance.layout();
      this.codeEditorActionsInstance.layout();
    }
  }
  save() {
    const ActionRule = {
      ActionRule:{
        rule:this.codeEditorRuleInstance.getValue(),
        screenBuilderId:this.screeenBuilderId,
        applicationId:this.applicationId
      }
    };
    const addOrUpdateActionRule$ = !this.actionRuleId
      ? this.applicationService.addNestCommonAPI('cp', ActionRule)
      : this.applicationService.updateNestCommonAPI(
        'cp/ActionRule',
        this.actionRuleId,
        ActionRule
      );
    addOrUpdateActionRule$.subscribe((res: any) => {
      try {
        if (res.isSuccess) {
          this.getActionRule();
          this.toastr.success(`Action Rule : ${res.message}`, { nzDuration: 2000 });
        } else {
          this.toastr.error(`Action Rule : ${res.message}`, { nzDuration: 2000 });
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  }
}
