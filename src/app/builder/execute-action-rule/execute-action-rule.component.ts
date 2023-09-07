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
  nodeList: { title: string, key: string }[] = [];
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private cdRef: ChangeDetectorRef,
    private applicationService: ApplicationService,
    private toastr: NzMessageService,) { }
  actionResult: any;
  ngOnInit() {
    this.getActionData();
    this.extractNodes(this.nodes, this.nodeList);
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
  getActionData() {
    debugger
    const selectedScreen = this.screens.filter((a: any) => a.name == this.screenName)
    if (selectedScreen[0].navigation != null && selectedScreen[0].navigation != undefined) { // selectedScreen[0].navigation
      this.requestSubscription = this.applicationService.getNestCommonAPIById("cp/actionbyscreenname", selectedScreen[0]._id).subscribe({
        next: (res: any) => {
          if (res.data && res.data.length > 0) {
            const getRes = res.data.map((x: any) =>  {return {name: x.elementName, query : x.quries} });
            this.actionList = JSON.stringify(getRes);
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
    }
  }
  actionList: any = JSON.stringify([
    {
      "name": "checkUserType",
      "query": "select userTypeId from Users where userTypeId = {userTypeId}"
    },
    {
      "name": "checkUserStatus",
      "query": "select status from Users where status = {status}"
    },
    {
      "name": "applyUserTypeDiscount",
      "query": "update Discounts set discountPercentage = 10 where userType = {userTypeId}"
    },
    {
      "name": "applyPremiumDiscount",
      "query": "update Discounts set discountPercentage = 20 where userType = 'premium'"
    },
    {
      "name": "checkMinimumValue",
      "query": "select price from Products where price = {price}"
    },
    {
      "name": "applySpecialOfferForNormalUser",
      "query": "update Discounts set discountPercentage = 15 where userType = 'normal'"
    },
    {
      "name": "notifyAdmin",
      "query": "insert into Notifications (message) values ('Special offer applied for product with price >= {price}')"
    },
    {
      "name": "sendNotification",
      "query": "insert into Notifications (message) values ('Discount applied for user with id = {userId}')"
    }
  ]
  );
  actionRule: any = JSON.stringify(
    [
      {
        "if": {
          "actionRule": "checkUserType",
          "key": "userTypeId",
          "compare": "==",
          "value": "1"
        },
        "then": {
          "applyDiscount": {
            "actionRule": "applyUserTypeDiscount",
            "key": "userTypeId"
          },
          "notifyUser": {
            "actionRule": "sendNotification",
            "key": "userTypeId"
          }
        },
        "OR": [{
          "if": {
            "actionRule": "checkUserStatus",
            "key": "status",
            "compare": "==",
            "value": "premium"
          },
          "then": {
            "applyPremiumDiscount": {
              "actionRule": "applyPremiumDiscount",
              "key": "status"
            }
          }
        }]
      },
      {
        "if": {
          "actionRule": "checkMinimumValue",
          "key": "price",
          "compare": ">=",
          "value": "200"
        },
        "AND": [{
          "if": {
            "actionRule": "checkUserType",
            "key": "userTypeId",
            "compare": "==",
            "value": "2"
          },
          "then": {
            "applySpecialOfferForNormalUser": {
              "actionRule": "applySpecialOfferForNormalUser",
              "key": "price"
            },
            "notifyUser": {
              "actionRule": "sendNotification",
              "key": "price"
            }
          }
        }],
        "then": {
          "notifyAdmin": {
            "actionRule": "notifyAdmin",
            "key": "price"
          }
        }
      }
    ],null,2
  );
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

  @ViewChild('editorActionsContainer', { static: false }) _editorActionsContainer!: ElementRef;
  columnsFields: any = [] = ["userTypeId", "status", "premium", "price"];
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

  jsonSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        if: {
          type: 'object',
          properties: {
            actionRule: { type: 'string' },
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
              actionRule: { type: 'string' },
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
                  actionRule: { type: 'string' },
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
                    actionRule: { type: 'string' },
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
                  actionRule: { type: 'string' },
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
                    actionRule: { type: 'string' },
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

      if (this._editorActionsContainer) {
        console.log(this._editorActionsContainer.nativeElement);
      } else {
        console.log('editorActionsContainer is not available');
      }

      if (this.isEditorInitialized) {
        return;
      }
      const languageId = 'json';
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
        language: languageId,
        value: this.actionRule // Initial value
      });
      this.codeEditorActionsInstance = monaco.editor.create(this._editorActionsContainer.nativeElement, {
        theme: 'myCustomTheme',
        language: languageId,
        value: this.actionList // Initial value
      });

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

      this.addCustomButton();
      this.isEditorInitialized = true;

    }else{
      // this.codeEditorRuleInstance.layout();
      // this.codeEditorActionsInstance.layout();
    }
  }
  onDrawerVisibilityChanged(isVisible: boolean) {
    if (isVisible) {
      // Adjust the editors' size to fit the container
      this.codeEditorRuleInstance.layout();
      this.codeEditorActionsInstance.layout();
    }
  }

}
