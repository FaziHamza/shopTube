import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
// import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import Ajv, { ErrorObject } from 'ajv';

import 'monaco-editor';

@Component({
  selector: 'st-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('editorContainer', { static: true }) _editorContainer!: ElementRef;
  codeEditorInstance!: monaco.editor.IStandaloneCodeEditor;
  validationMessage: any[] = [];
  columnsFields :any=[] = ["Age", "Membership","bouns", "Salary","Qty", "Price"];
  operators = ['greaterThan', 'equal'];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
   jsonSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        execute_before: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              function: { type: 'string' },
              params: { type: 'object' }
            }
          }
        },
        'if': {
          type: 'object',
          properties: {
            conditions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', enum: this.columnsFields },
                  operator: { type: 'string', enum: this.operators },
                  value: { type: 'string' }
                }
              }
            },
            actions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  function: { type: 'string' },
                  params: { type: 'object' },
                  usePreviousOutputAs: { type: 'string' }
                }
              }
            }
          },
      "additionalProperties": false

        },
        execute_after: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              function: { type: 'string' },
              params: { type: 'object' }
            }
          }
        }
      },
      "additionalProperties": false
    }
  };
      // Your fields and operators

  ngOnInit() {
    
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
    this.codeEditorInstance = monaco.editor.create(this._editorContainer.nativeElement, {
      theme: 'myCustomTheme',
      language: languageId,
      value: `[
        {
          "execute_before": [
            { "function": "logStart", "params": { "message": "Evaluating rule" } }
          ],
          "if": {
            "conditions": [
              { "field": "age1", "operator": "greaterThan", "value": "18" }
            ],
            "actions": [
              { "function": "getAccessLevel", "params": { "userId": 123 } },
              { "function": "grantAccess", "usePreviousOutputAs": "level" }
            ]
          },
          "execute_after": [
            { "function": "logEnd", "params": { "message": "Finished evaluating rule" } }
          ]
        }
      ]` // Initial value
    });
    this.codeEditorInstance.addAction({
      id: 'validate-json',
      label: 'Validate JSON',
      run: () => {
        this.validateJSON(); // Call the validation method
      }
    });
    this.addCustomButton();

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

  
  validateJSON() {
    this.validationMessage = [];
    try {
      const jsonData = JSON.parse(this.codeEditorInstance.getValue());
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
  fixError(errorObj: any) {
    const error = errorObj.originalError; // Extract the original Ajv error object
    if (!error || !error.instancePath) {
      console.error('Invalid error object', error);
      return;
    }
    const fieldPath = error.instancePath.split('/');
    let jsonData = JSON.parse(this.codeEditorInstance.getValue()); // Get JSON object from editor
  
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
    this.codeEditorInstance.setValue(editorContent);
  }

}


// [
//   {
//     "execute_beforeFazi": [
//       { "function": "logStart", "params": { "message": "Evaluating rule" } }
//     ],
//     "if": {
//       "conditions": [
//         { "field": "age1", "operator": "greaterThan", "value": "18" }
//       ],
//       "actions": [
//         { "function": "getAccessLevel", "params": { "userId": 123 } },
//         { "function": "grantAccess", "usePreviousOutputAs": "level" }
//       ]
//     },
//     "execute_after": [
//       { "function": "logEnd", "params": { "message": "Finished evaluating rule" } }
//     ]
//   }
// ]