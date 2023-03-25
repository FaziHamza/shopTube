import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-stepper',
  template: `
  <!-- {{field.fieldGroup | json}} -->
    <nz-steps [nzCurrent]="currentStepIndex">
      <nz-step *ngFor="let step of field.fieldGroup" [nzTitle]="step.props?.label">
      </nz-step>
    </nz-steps>
    <formly-field [field]='getField()'></formly-field>

    <div class="steps-action">
      <button nz-button nzType="default" (click)="prev()" [disabled]=" currentStepIndex === 0">
        Previous
      </button>
      <button nz-button nzType="primary" (click)="next()" [disabled]=" currentStepIndex  === steps.length - 1">
        Next
      </button>
    </div>
  `,
  styles: [
    `
      .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      }

      .steps-action {
        margin-top: 24px;
      }

      button {
        margin-right: 8px;
      }
    `
  ]
})
export class FormlyFieldStepper extends FieldType {
  currentStepIndex = 0;

  index = 'First-content';
  steps = [
    {
      title: 'Step 1',
      content: 'Content of Step 1',
    },
    {
      title: 'Step 2',
      content: 'Content of Step 2',
    },
    {
      title: 'Step 3',
      content: 'Content of Step 3',
    },
  ];

  next(): void {
    this.currentStepIndex += 1;
  }

  prev(): void {
    this.currentStepIndex -= 1;
  }

  getField(): FormlyFieldConfig{
    if (this.field.fieldGroup) {
      return this.field.fieldGroup[this.currentStepIndex];
    }
    return this.field;
  }
  ngOnInit(): void {

  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
