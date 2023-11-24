import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-create-control',
  templateUrl: './create-control.component.html',
  styleUrls: ['./create-control.component.scss']
})
export class CreateControlComponent {
  form: FormGroup;
  loader: boolean = false;
  editId: any = '';
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  constructor(private fb: FormBuilder, private applicationService: ApplicationService, private toastr: NzMessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required], // Classes is required
      controlJson: ['', Validators.required], // Classes is required
    });
  }

  save() {
    debugger
    if (this.form.valid) {
      const formValue = this.form.value;

      const obj = {
        controls: {
          ...formValue,
        }
      };

      this.loader = true;
      const checkPolicyAndProceed = this.editId == ''
        ? this.applicationService.addNestCommonAPI('cp', obj)
        : this.applicationService.updateNestCommonAPI('cp/controls', this.editId, obj);
      checkPolicyAndProceed.subscribe({
        next: (objTRes: any) => {
          this.loader = false;
          if (objTRes.isSuccess) {
            this.editId = '';
            this.form.reset();
            this.getcontrols();
          } else {
            this.toastr.error(objTRes.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.loader = false;
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
    else {
      this.toastr.warning('Please enter data', { nzDuration: 3000 });
    }
  }
  getcontrols() {
    this.loader = true;
    this.applicationService.getNestCommonAPI('cp/applicationTheme').subscribe(((res: any) => {
      this.loader = false;
      if (res.isSuccess) {
        this.listOfData = res.data;
        this.listOfDisplayData = res.data;
      } else
        this.toastr.warning(res.message, { nzDuration: 2000 });
    }));
  }
}
