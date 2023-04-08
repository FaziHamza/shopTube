import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { first } from 'rxjs';
import { ColorPickerService } from 'src/app/services/colorpicker.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'st-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: UntypedFormGroup;
  successmsg: boolean = false;
  error = '';
  colorData : any;
  saveSubmitted = false;
  myColor: string = '#fff';
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    this.saveSubmitted = true;
    if (this.signupForm.valid) {
      console.log('submit', this.signupForm.value);
      this.employeeService.register(this.signupForm.value).pipe(first()).subscribe((data: any) => {
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
      Object.values(this.signupForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.signupForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: UntypedFormBuilder,
    public employeeService: EmployeeService,
    private router: Router,
    public colorPickerService: ColorPickerService) { }

  customColor(shade: string) {
    this.colorData = this.colorPickerService.getColor(shade);
    return this.colorPickerService.getColor(shade);
  }

  setCustomColor(data:any) {
    
    let color: string;
    color = data.target.value;
    document.documentElement.style.setProperty('--my-color', color);
    // this.colorPickerService.setCustomColor('custom-color', color);
  }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userName: [null, [Validators.required]],
      // agree: [false]
    });
  }

}
