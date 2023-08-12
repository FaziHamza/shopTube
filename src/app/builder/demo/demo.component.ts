import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  nestedForm: FormGroup;
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  isContextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  contextMenuOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  constructor(private fb: FormBuilder, private elementRef: ElementRef) { }
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
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.isContextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
  }

  onMenuItemClick(option: string): void {
    console.log('Clicked:', option);
    this.isContextMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.isContextMenuVisible = false;
  }

}
