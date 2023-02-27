import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';


@Component({
  selector: 'app-formly-field-repeat-section',
  template: `
    <div class="header" *ngIf="canAdd()">
        <button type="button" class="add-btn btn btn-sm btn-primary mr-2" (click)="add()">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
    </div>
    <div class="body" [ngClass]="{interactive: canAdd()}">
        <div class="section flex-container" *ngFor="let field of field.fieldGroup; let i = index;"
            [ngClass]="{interactive: canRemove(i)}">
            <div class="row">
              <div class="col-10">
            <!-- <formly-group  [field]='field' *ngIf="field" class="group-inline"></formly-group> -->
              </div>
              <div class="col-2" [style]="to['style']">
                <button nzType="primary" nz-button class="mx-2" (click)="remove(i)"
                    *ngIf="canRemove(i)">
                    <span nz-icon nzType="delete" nzTheme="outline"></span>
                </button>
                <button type="button" nzType="primary" nzDanger (click)="add()">
                <span nz-icon nzType="plus" nzTheme="outline"></span>
                </button>
            </div>
            </div>

            <!-- <formly-form [fields]="field" ></formly-form> -->
        </div>
    </div>
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
