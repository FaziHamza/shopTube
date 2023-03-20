import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldTypeConfig, FieldWrapper } from '@ngx-formly/core';
import { DataSharedService } from '../services/data-shared.service';

@Component({
  selector: 'formly-field-image-upload',
  template: `
    <input type="file" (change)="change($event)" accept="image/*" [formControl]="formControl" [formlyAttributes]="field">
  `,
})
export class FormlyFieldImageUploadComponent extends FieldWrapper<FieldTypeConfig> {
  constructor(public dataSharedService: DataSharedService,) {
    super();
   }
  imageUrl: string;
  ngOnInit(): void {
    
    // this.imageUrl = '';
    this.dataSharedService.imageUrl = '';
  }
  
  change(event : any) {
    
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      this.imageUrl = ev.target.result;
      // this.formControl.setValue(file);
      if(this.imageUrl){
        // this.formControl.setValue(this.imageUrl);
        this.dataSharedService.imageUrl = this.imageUrl;
      }
    };
    reader.readAsDataURL(file);
  }
}
