import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from '../services/auth.service';
import { CommonService } from 'src/common/common-services/common.service';

@Component({
  selector: 'st-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngAfterViewInit() {
    // Reinitialize reCAPTCHA after the view has been initialized
    grecaptcha.render('recaptcha', { sitekey: '6LfKNi0cAAAAACeYwFRY9_d_qjGhpiwYUo5gNW5-' });
  }

  recaptchaResponse = '';
  ngOnInit(): void {
    // init Form
    this.create();
    this.cdr.detectChanges();
  }

  showLoader: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
  ) { }

  isFormSubmit: boolean = false;
  form: FormGroup;
  // form
  create() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
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
      alert("You are not human");
      return;
    }


    this.isFormSubmit = true;
    if (this.form.invalid) {
      return;
    }

    this.isFormSubmit = false;

    // console.log('submit', this.form.value);
    this.form.value['username'] = this.form.value.email;

    // Show Loader
    this.showLoader = true;
    this.authService.loginUser(this.form.value).subscribe(
      (response: any) => {
        if (response?.access_token) {
          this.commonService.showSuccess('Login Successfully!', {
            nzDuration: 2000,
          });
          this.showLoader = false;
          this.authService.setAuth(response);
          this.router.navigate(['/home/allorder']);
          this.router.navigate(['/']);
        } else {
          this.commonService.showError('Something went wrong!');
        }
      },
      (error) => {
        this.commonService.showError('Login Failed: Something went wrong.', {
          nzPauseOnHover: true,
        });
        this.showLoader = false;
      }
    );
  }
}
