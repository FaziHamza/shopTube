import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss']
})
export class InputWrapperComponent extends FieldType {
  @Input() value = '';
  @Input() placeholder = '';
  myForm: FormGroup;
  ngOnInit(): void {
    debugger
    this.to;
    this.myForm = this.formBuilder.group({
      input1: ['',new FormControl('',Validators.required)],
      input2: ['',new FormControl('',Validators.required)],
    });

  }
  constructor(private formBuilder: FormBuilder){
    super();
  }
}
