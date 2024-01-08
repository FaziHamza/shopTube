import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from '../services/auth.service';
import { CommonService } from 'src/common/common-services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordType: string = "password";
  passwordIcon: string = "fa-light fa-eye-slash text-lg";
  // ngAfterViewInit() {
  //   // Render reCAPTCHA using the reCAPTCHA site key
  //   grecaptcha.render('recaptcha', {
  //     sitekey: environment.recaptcha.siteKey,
  //     callback: (response) => {
  //       // Handle the reCAPTCHA response token (e.g., send it to your server)
  //       console.log('reCAPTCHA response token:', response);
  //     }
  //   });
  // }
  ngOnDestroy() {

  }


  recaptchaResponse = '';
  ngOnInit(): void {
    this.loadScript();
    // grecaptcha.render('recaptcha', { sitekey: environment.recaptcha.siteKey });
    // init Form
    this.create();
    this.getApplicationData();
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
    private toastr: NzMessageService,
  ) {

  }
  showRecaptcha: boolean = false;
  isFormSubmit: boolean = false;
  form: FormGroup;
  applications: any;
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
      // this.toastr.warning('You are not human', { nzDuration: 3000 }); // Show an error message to the user
      this.showRecaptcha = true;
      return;
    }


    this.isFormSubmit = true;
    if (this.form.invalid) {
      return;
    }

    this.isFormSubmit = false;

    // console.log('submit', this.form.value);
    this.form.value['username'] = this.form.value.email;
    this.form.value['domain'] = window.location.host.split(':')[0],
      this.form.value['responsekey'] = this.recaptchaResponse;
    let obj = this.form.value;
    obj['applicationId'] = this.applications?.application?._id || environment.applicationId;
    // Show Loader
    this.showLoader = true;
    this.authService.loginUser(this.form.value).subscribe(
      (response: any) => {
        this.showLoader = false;
        if (response.isSuccess) {
          if (response.data?.access_token) {
            grecaptcha.reset(); // Reset reCAPTCHA

            this.commonService.showSuccess('Login Successfully!', {
              nzDuration: 2000,
            });
            localStorage.setItem('isLoggedIn', 'true');
            this.showLoader = false;
            this.authService.setAuth(response.data);
            this.router.navigate(['/home/allorder']);
            this.router.navigate(['/']);
          } else {
            this.commonService.showError('Something went wrong!');
            grecaptcha.reset(); // Reset reCAPTCHA

          }
        } else {
          grecaptcha.reset(); // Reset reCAPTCHA

          this.commonService.showError(response.message, {
            nzPauseOnHover: true,
          });
        }

      },
      (error) => {
        this.showLoader = false;
        grecaptcha.reset(); // Reset reCAPTCHA

        this.commonService.showError('Login Failed: Something went wrong.', {
          nzPauseOnHover: true,
        });
        this.showLoader = false;
      }
    );
  }
  showPassword() {
    this.passwordType = this.passwordType == 'password' ? 'string' : 'password';
    this.passwordIcon = this.passwordIcon == 'fa-light fa-eye-slash text-lg' ? 'fa-light fa-eye text-lg' : 'fa-light fa-eye-slash text-lg'
  }
  reloadPage() {
    location.reload();
  }
  loadScript() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
  getApplicationData() {
    this.showLoader = true;
    const hostUrl = window.location.host.split(':')[0];
    this.authService.getNestCommonAPI('auth/domain/' + hostUrl).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.applications = res.data;
        }
        else {
          this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
        }
        this.showLoader = false
      },
      error: (err) => {
        this.showLoader = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }

}
