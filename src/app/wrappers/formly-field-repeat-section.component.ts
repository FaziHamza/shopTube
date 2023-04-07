import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';


@Component({
  selector: 'st-formly-field-repeat-section',
  template: `
    <dynamic-table [checkType]='true'></dynamic-table>

   `,
  styles: [`
  .group-inline{
    display: inline-flex !important;
  }

    .header {
      margin-top: .5em;
    }
    .flex-container.interactive {
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
    }
    formly-form {
      flex-grow: 1;
    }
    .body.interactive {
      margin-top: 0.5em;
    }
    .section {
      margin-bottom: .25em;
    }
    .section>button {
      margin-top: .25em;
    }
  `]
})
export class FormlyFieldRepeatSectionComponent extends FieldArrayType {
  //   get fieldArrayClassName(): string {
  //     return this.field.fieldArray?.className ?? '';
  //   }
  ngOnInit(): void {

    this.field;
  }

  canAdd(): boolean {
    const canAdd = this.to['canAdd'] as Function | boolean;
    return canAdd == null || (typeof canAdd === 'function' ? canAdd.apply(this) : canAdd) === true;
  }

  canRemove(index: number): boolean {
    const canRemove = this.to['canRemove'] as Function | boolean;
    if (canRemove === false) {
      return false;
    }

    const value = this.model[index];
    if (value && value.canRemove === false) {
      return false;
    }

    return typeof canRemove !== 'function' || canRemove.apply(this, [index]) === true;
  }
}
