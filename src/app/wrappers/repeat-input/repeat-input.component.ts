import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'st-repeat-input',
  templateUrl: './repeat-input.component.html',
  styleUrls: ['./repeat-input.component.scss']
})
export class RepeatInputComponent extends FieldType<FieldTypeConfig> {
  listOfControl :any = [];
  ngOnInit(): void {
    this.listOfControl.push(this.to);
  }
  
  addField(e?: MouseEvent): void {
    debugger
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: id
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
   
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
    }
  }

}
