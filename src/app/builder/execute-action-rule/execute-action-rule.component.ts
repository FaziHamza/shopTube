import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import * as monaco from 'monaco-editor';
import Ajv, { ErrorObject } from 'ajv';

@Component({
  selector: 'st-execute-action-rule',
  templateUrl: './execute-action-rule.component.html',
  styleUrls: ['./execute-action-rule.component.scss']
})
export class ExecuteActionRuleComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }
  actionResult: any;

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
    ]
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

  executeAction = async (actionName: string, parameters: any) => {
    const parsedRules = JSON.parse(this.actionList);
    const action = parsedRules.find((a: any) => a.name === actionName);
    if (!action) {
      throw new Error(`Action ${actionName} not found`);
    }

    let query = action.query;
    for (const [key, value] of Object.entries(parameters)) {
      query = query.replace(`{${key}}`, value);
    }

    // Simulate action execution, replace with actual logic to interact with your database or API
    // const result = await this.executeDatabaseQuery(query);

    return query;
  }

  async processActionRules() {
    try {
      await this.employeeService.saveSQLDatabaseTable('knex-query/execute-actions', JSON.parse(this.actionModel)).subscribe(res => {
        this.actionResult = JSON.stringify(res, null, 2);
      })
      // const results = await this.processActionRulesV1(this.actionRule, this.actionModel);
    } catch (error) {
      console.error('Error while processing action rules:', error);
      this.actionResult = 'Error occurred while processing action rules';
    }
  }

  async processActionRulesV1(actionRules: any, context: any) {
    let actionModel = JSON.parse(this.actionModel);
    const results: any = {};
    const parsedRules = JSON.parse(actionRules);
    const parsedContext = JSON.parse(context);

    for (const rule of parsedRules) {
      if (rule.if) {
        try {
          const { actionRule, key, compare, value } = rule.if;
          const actionQuery = await this.executeAction(actionRule, parsedContext);

          // Get the dynamic comparison function based on the operator
          const comparisonFunction = this.getComparisonFunction(compare);

          // Perform the comparison using the dynamic function
          if (comparisonFunction(actionQuery, value)) {
            let thenConditionSatisfied = true;

            // Check if there is an OR condition
            if (rule.OR) {
              let orConditionSatisfied = false;

              for (const orRule of rule.OR) {
                const { actionRule: orActionRule, key: orKey, compare: orCompare, value: orValue } = orRule.if;
                const orActionQuery = await this.executeAction(orActionRule, parsedContext);
                const orComparisonFunction = this.getComparisonFunction(orCompare);

                if (orComparisonFunction(orActionQuery, orValue)) {
                  orConditionSatisfied = true;
                }
                thenConditionSatisfied = orConditionSatisfied;
                if (thenConditionSatisfied) {
                  if (orRule.then) {
                    const thenActions = orRule.then;
                    for (const actionKey in thenActions) {
                      if (thenActions.hasOwnProperty(actionKey)) {
                        const thenAction = thenActions[actionKey];
                        if (thenAction.actionRule) {
                          const thenActionResult = await this.executeAction(
                            thenAction.actionRule,
                            context
                          );
                          results[actionRule] = thenActionResult;
                          actionModel[actionKey] = thenActionResult;
                        }
                      }
                    }
                  }
                }
              }

            }

            // Check if there is an AND condition
            if (rule.AND) {
              let andConditionSatisfied = true;

              for (const andRule of rule.AND) {
                const { actionRule: andActionRule, key: andKey, compare: andCompare, value: andValue } = andRule.if;
                const andActionQuery = await this.executeAction(andActionRule, parsedContext);
                const andComparisonFunction = this.getComparisonFunction(andCompare);

                if (!andComparisonFunction(andActionQuery, andValue)) {
                  andConditionSatisfied = false;
                }
                thenConditionSatisfied = thenConditionSatisfied && andConditionSatisfied;
                if (thenConditionSatisfied) {
                  if (andRule.then) {
                    const thenActions = andRule.then;
                    for (const actionKey in thenActions) {
                      if (thenActions.hasOwnProperty(actionKey)) {
                        const thenAction = thenActions[actionKey];
                        if (thenAction.actionRule) {
                          const thenActionResult = await this.executeAction(
                            thenAction.actionRule,
                            context
                          );
                          results[actionRule] = thenActionResult;
                          actionModel[actionKey] = thenActionResult;
                        }
                      }
                    }
                  }
                }
              }

            }

            if (rule.then) {
              const thenActions = rule.then;
              for (const actionKey in thenActions) {
                if (thenActions.hasOwnProperty(actionKey)) {
                  const thenAction = thenActions[actionKey];
                  if (thenAction.actionRule) {
                    const thenActionResult = await this.executeAction(
                      thenAction.actionRule,
                      context
                    );
                    results[actionRule] = thenActionResult;
                    actionModel[actionKey] = thenActionResult;
                  }
                }
              }
            }
          }
          // Always apply the 'then' actions of the main condition

        } catch (error) {
          console.error(`Error while processing action rule: ${JSON.stringify(rule)}`, error);
        }
      }
    }
    this.actionModel = JSON.stringify(actionModel);
    return results;
  }

  getComparisonFunction(operator: string): (left: any, right: any) => boolean {
    switch (operator) {
      case '==':
        return (left, right) => left.includes(`= ${right}`);
      case '>':
        return (left, right) => {
          const columnValue = left.split(/([\s><=]+)/);
          return parseFloat(columnValue) > parseFloat(right);
        };
      case '!=':
        return (left, right) => left.includes(`!= ${right}`);
      case '>=':
        return (left, right) => {
          let columnValue = left.split(/([\s><=]+)/);
          return parseFloat(columnValue[columnValue.length - 1]) >= parseFloat(right);
        };
      case '<=':
        return (left, right) => {
          const [, , columnValue] = left.split(/([\s><=]+)/);
          return parseFloat(columnValue) <= parseFloat(right);
        };
      case '<':
        return (left, right) => {
          const [, , columnValue] = left.split(/([\s><=]+)/);
          return parseFloat(columnValue) < parseFloat(right);
        };
      default:
        throw new Error(`Unknown comparison operator: ${operator}`);
    }
  }

  // Rules Form

  ruleForm: FormGroup;
  ngOnInit() {
    this.ruleForm = this.fb.group({
      actionRules: this.fb.array([])
    });
    this.addRule(); // Add first rule
  }
  actionRulesControl(): FormArray {
    return this.ruleForm.get('actionRules') as FormArray;
  }

  get actionRules() {
    return this.ruleForm.get('actionRules') as FormArray;
  }

  addIfThenActions(ifIndex: number): FormArray {
    return this.actionRulesControl()
      .at(ifIndex)
      .get('then') as FormArray;
  }

  createRuleGroup(rule?: any): FormGroup {
    return this.fb.group({
      if: this.fb.group({
        actionRule: ['', Validators.required],
        key: ['', Validators.required],
        compare: ['', Validators.required],
        value: ['', Validators.required]
      }),
      then: this.fb.array([]),
      OR: this.fb.array([]),
      AND: this.fb.array([])
    });
  }
  createThenAction(): FormGroup {
    return this.fb.group({
      actionRule: ['', Validators.required],
      key: ['', Validators.required],
      // Add other form controls for your "then" action properties here
    });
  }
  addRule() {
    this.actionRules.push(this.createRuleGroup());
  }

  removeRule(index: number) {
    this.actionRules.removeAt(index);
  }

  addIfThenAction(index: number) {
    this.addIfThenActions(index).push(this.createThenAction());
  }

  removeIfThenAction(index: number) {
    this.addIfThenActions(index).removeAt(index);
  }
  removeIfThen(index: number) {
    this.actionRulesControl().removeAt(index);
  }
  removeThenAction(parentIndex: number, index: number) {
    this.addIfThenActions(parentIndex).removeAt(index);
  }

  addORCondition(ruleGroup: FormGroup) {
    const orConditions = ruleGroup.get('OR') as FormArray;
    orConditions.push(this.createRuleGroup());
  }

  removeORCondition(ruleGroup: FormGroup, index: number) {
    const orConditions = ruleGroup.get('OR') as FormArray;
    orConditions.removeAt(index);
  }

  addANDCondition(ruleGroup: FormGroup) {
    const andConditions = ruleGroup.get('AND') as FormArray;
    andConditions.push(this.createRuleGroup());
  }

  // AND condition
  createAndCondition(): FormGroup {
    return this.fb.group({
      if: this.fb.group({
        actionRule: ['', Validators.required],
        key: ['', Validators.required],
        compare: ['', Validators.required],
        value: ['', Validators.required]
      }),
      then: this.fb.array([]),
      OR: this.fb.array([]),
      AND: this.fb.array([])
    });
  }

  addIfAndAction(ruleIndex: number) {
    this.addIfAndActions(ruleIndex).push(this.createAndCondition());
  }

  addIfAndActions(ifIndex: number): FormArray {
    return this.actionRulesControl()
      .at(ifIndex)
      .get('AND') as FormArray;
  }

  removeIfAndAction(parentIndex: number, index: number) {
    this.addIfAndActions(parentIndex).removeAt(index);
  }

  addThenActions(ruleIndex: number, andIndex: number): FormArray {
    const andConditions = this.addIfAndActions(ruleIndex);
    const andCondition = andConditions.at(andIndex) as FormGroup;
    return andCondition.get('then') as FormArray;
  }

  removeANDCondition(ruleIndex: number, andIndex: number): void {
    const andConditions = this.addIfAndActions(ruleIndex);
    andConditions.removeAt(andIndex);
  }

  addThenAction(ruleIndex: number, andIndex: number): void {
    const thenActions = this.addThenActions(ruleIndex, andIndex);
    thenActions.push(this.createThenAction());
  }

  removeAndThenAction(ruleIndex: number, andIndex: number, thenIndex: number): void {
    const thenActions = this.addThenActions(ruleIndex, andIndex);
    thenActions.removeAt(thenIndex);
  }


  validationMessage: any[] = [];
  codeEditorRuleInstance!: monaco.editor.IStandaloneCodeEditor;
  codeEditorActionsInstance!: monaco.editor.IStandaloneCodeEditor;
  @ViewChild('editorRuleContainer', { static: true }) _editorRuleContainer!: ElementRef;
  @ViewChild('editorActionsContainer', { static: true }) _editorActionsContainer!: ElementRef;
  columnsFields: any = [] = ["userTypeId", "status", "premium", "price"];
  operators = ['==', '!=', '>', '<', '>=', '<='];

  ngAfterViewInit(): void {
    debugger
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
}
