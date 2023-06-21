import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'st-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder , public authService:AuthService  , private route: ActivatedRoute,
    private router: Router) { }

  validateForm!: UntypedFormGroup;

  submitForm(): void {

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.validateForm.value["username"] = this.validateForm.value.email;
      this.authService.loginUser(this.validateForm.value).subscribe(
        (response: any) => {
          if (response?.access_token) {
            // this.commonService.stopLoader();
            localStorage.setItem('userDetail', JSON.stringify(response.data));
          // this.commonService.showSuccess("Login Successfully!", "Success");
          this.authService.setAuth(response);
          // this.router.navigate(['/home/allorder']);
          this.router.navigate(['/']);
          } else {
            // this.commonService.stopLoader();
          // this.commonService.showError(response.Errors[0].ErrorMessageEn, "error");
        }

        },
        (error) => {
          // this.commonService.stopLoader();
          // this.commonService.showError(error.message, "error");
        }
      );
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



  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['admin@co.co', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      remember: [true]
    });
  }
}
