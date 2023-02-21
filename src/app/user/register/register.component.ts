import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { first } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  successmsg: boolean = false;
  error = '';
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    debugger
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.employeeService.register(this.validateForm.value).pipe(first()).subscribe((data: any) => {
        this.successmsg = true;
        if (this.successmsg) {
          this.router.navigate(['/login']);
        }
      })
      // this.employeeService.register(this.validateForm.value).subscribe(((res: any) => {
      //   if (res.length > 0) {
      //     this.successmsg = true;
      //     if (this.successmsg) {
      //       this.router.navigate(['/']);
      //     }
      //   }
      // }))
    }
    else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: UntypedFormBuilder, public employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      pwd: [null, [Validators.required]],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      first_name: [null, [Validators.required]],
      // agree: [false]
    });
  }

}
