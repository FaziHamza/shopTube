import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-execute-query',
  templateUrl: './execute-query.component.html',
  styleUrls: ['./execute-query.component.scss']
})
export class ExecuteQueryComponent {
  public editorOptions: JsonEditorOptions;
  makeOptions = () => new JsonEditorOptions();
  saveLoader: boolean = false;
  queryRes: string;
  validateForm: FormGroup<{
    query: FormControl<string | null>;
  }> = this.fb.group({
    query: this.fb.control<string | null>(null, Validators.required),
  });

  constructor(private fb: FormBuilder, private applicationService: ApplicationService,
    private toastr: NzMessageService,) {
    this.editorOptions = new JsonEditorOptions();
  }

  submitQuery() {
    debugger
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const tableValue = `executecustomquery`;

      const objQuery = {
        "query": this.validateForm.value.query,
      };

      const tableModel = {
        [tableValue]: objQuery
      }

      this.applicationService.addNestNewCommonAPI(`cp`, tableModel).subscribe({
        next: (objRes) => {
          this.saveLoader = false;
          if (objRes.isSuccess) {
            this.toastr.success("Query execute successfull", { nzDuration: 3000 });
            console.log(objRes.message);
            this.queryRes = objRes.data;
          } else {
            console.log(objRes.message);
            this.toastr.error(objRes.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.saveLoader = false;
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
