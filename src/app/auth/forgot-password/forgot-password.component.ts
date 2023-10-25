import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from '../services/auth.service';
import { CommonService } from 'src/common/common-services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // ngAfterViewInit() {
  //   // Reinitialize reCAPTCHA after the view has been initialized
  //   grecaptcha.render('recaptcha', { sitekey: environment.recaptcha.siteKey });
  // }


  recaptchaResponse = '';
  ngOnInit(): void {
    // init Form
    this.loadScript();
    this.create();
    this.cdr.detectChanges();
  }

  showLoader: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
  ) { }
  showRecaptcha: boolean = false;
  isFormSubmit: boolean = false;
  form: FormGroup;
  // form
  create() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      remember: [true],
      recaptch: [false]
    });
  }

  get f() {
    return this.form.controls;
  }

  submitForm(): void {
    debugger
    this.recaptchaResponse = grecaptcha.getResponse();
    if (!this.recaptchaResponse) {
      // this.toastr.warning('You are not human', { nzDuration: 3000 }); // Show an error message to the user
      this.showRecaptcha = true;
      return;
    }


    this.isFormSubmit = true;
    if (this.form.invalid) {
      return;
    }

    this.isFormSubmit = false;
    this.form.value['username'] = this.form.value.email;
    this.showLoader = true;
    this.authService.forgotUser(this.form.value).subscribe(
      (response: any) => {
        this.showLoader = false;
        if (response.isSuccess) {
          this.commonService.showSuccess(response.message, {
            nzDuration: 2000,
          });
          this.showLoader = false;
        } else {
          this.commonService.showError(response.message, {
            nzPauseOnHover: true,
          });
        }

      },
      (error) => {
        this.showLoader = false;
        this.commonService.showError('Login Failed: Something went wrong.', {
          nzPauseOnHover: true,
        });
        this.showLoader = false;
      }
    );
  }
  loadScript() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
