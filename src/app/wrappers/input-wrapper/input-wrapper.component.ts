import { Component, Input } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'st-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss']
})
export class InputWrapperComponent extends FieldType<FieldTypeConfig>  {
  @Input() value = '';
  @Input() placeholder = '';
  ngOnInit(): void {
    if(this.to.type == 'password'){
      this.to.config.prefixicon = 'eye-invisible';
    }
  }
  showPassword(to : any){
    debugger
    if(to.type == 'password' && this.to.config.prefixicon == 'eye' || this.to.config.prefixicon == 'eye-invisible'){
      this.to.config.prefixicon = 'eye';
      this.to.type = 'text';
    }else if(to.type == 'text'){
      this.to.config.prefixicon = 'eye-invisible';
      this.to.type = 'password';
    }
  }
  

}

