import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'dynamic-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldType<FieldTypeConfig> {
  
  getIcon(value: any) {
    return (this.to.options as any)
      .find((i : any) => i.value === value)?.icon;
  }
  get list(): any {
    debugger
    return this.to.options;
  }
  ngOnInit(): void {
    
    this.to
  }
  getNzMode(to : any) {
    debugger
    if (to.type === 'multiselect') {
      return 'multiple';
    } else if (to.type === 'tag') {
      return 'tags';
    } else {
      return 'default';
    }
  }
}
