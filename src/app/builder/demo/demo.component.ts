import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  nestedForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.nestedForm = this.fb.group({
      businessRule: this.fb.array([])
    });
  }

  get businessRule(): FormArray {
    return this.nestedForm.get('businessRule') as FormArray;
  }

  addRule(): void {
    const rule = this.fb.group({
      name: '',
      description: '',
      type: '',
      condition: this.fb.array([]),
      then: this.fb.array([]),
      children: this.fb.array([])
    });
    this.businessRule.push(rule);
  }

  getConditionControls(rule: any): FormArray {
    return rule.get('condition') as FormArray;
  }

  getThenControls(rule: any): FormArray {
    return rule.get('then') as FormArray;
  }

  getChildrenControls(rule: any): FormArray {
    return rule.get('children') as FormArray;
  }

  addCondition(rule: any): void {
    const condition = this.fb.group({
      A1: '',
      B1: '',
      C1: ''
    });
    this.getConditionControls(rule).push(condition);
  }

  addThen(rule: any): void {
    const thenField = this.fb.group({
      D1: '',
      E1: '',
      F1: ''
    });
    this.getThenControls(rule).push(thenField);
  }

  addChildCondition(child: any): void {
    const condition = this.fb.group({
      A: '',
      B: '',
      C: ''
    });
    this.getConditionControls(child).push(condition);
  }

  addChildThen(child: any): void {
    const thenField = this.fb.group({
      D: '',
      E: '',
      F: ''
    });
    this.getThenControls(child).push(thenField);
  }

  saveForm(): void {
    console.log(this.nestedForm.value);
  }

  addNewChild(ruleIndex: number) {
    const childGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: [''],
      condition: this.fb.array([]),
      then: this.fb.array([]),
    });
  
    const rule = this.nestedForm.get('businessRule') as FormArray;
    const childrenArray = rule.at(ruleIndex).get('children') as FormArray;
    childrenArray.push(childGroup);
  }
  
}
