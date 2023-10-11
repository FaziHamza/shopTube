import { Component, Input } from '@angular/core';
import { FieldArrayType, FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { FormArray, FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-repeatable-controll',
  templateUrl: './repeatable-controll.component.html',
  styleUrls: ['./repeatable-controll.component.scss']
})
export class RepeatableControllComponent extends FieldType<FieldTypeConfig> {
  subscription: Subscription;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  myForm: FormGroup;
  constructor(public dataSharedService: DataSharedService, private formBuilder: FormBuilder) {
    super();
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      fieldGroups: this.formBuilder.array([]),
    });
    this.addFieldGroup(); // Add an initial field group
  }

  addFieldGroup() {
    const fieldGroup = this.formBuilder.group({
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: ['', Validators.required],
      field4: ['', Validators.required],
      field5: ['', Validators.required],
    });

    this.fieldGroups.push(fieldGroup);
    this.dataSharedService.onChange(this.myForm.value.fieldGroups, this.field);
  }

  removeFieldGroup(index: number) {
    this.fieldGroups.removeAt(index);
    this.formControl.patchValue(this.myForm.value.fieldGroups);
  }

  get fieldGroups(): FormArray {
    return this.myForm.get('fieldGroups') as FormArray;
  }

  onModelChange(event: any, model: any) {
    this.dataSharedService.onChange(this.myForm.value.fieldGroups, this.field);
  }

}
