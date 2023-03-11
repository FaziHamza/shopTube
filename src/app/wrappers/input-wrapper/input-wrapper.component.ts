import { Component, Input } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss']
})
export class InputWrapperComponent extends FieldType {
  @Input() value = '';
  @Input() placeholder = '';
  
  
}
