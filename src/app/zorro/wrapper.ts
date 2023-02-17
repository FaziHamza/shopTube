import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-row',
  template: `
    <div class="flex flex-row">
        <!-- {{field.fieldGroup | json}} -->
      <div *ngFor="let f of field.fieldGroup" class={{f.className}}>
        <formly-field [field]="f"></formly-field>
      </div>
    </div>
  `,
})
export class FormlyWrapperRow extends FieldType {}