import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from '../services/auth.service';
import { CommonService } from 'src/common/common-services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ngAfterViewInit() {
    // Reinitialize reCAPTCHA after the view has been initialized
    grecaptcha.render('recaptcha', { sitekey: '6LcZ59MnAAAAAEFG5x2mJoJ_ptOFR7O2hSX0HHx3' });
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
    private toastr: NzMessageService,
  ) { }
  showRecaptcha: boolean = false;
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

    // Show Loader
    this.showLoader = true;
    this.authService.loginUser(this.form.value).subscribe(
      (response: any) => {
        this.showLoader = false;
        if (response.isSuccess) {
          if (response.data?.access_token) {
            this.commonService.showSuccess('Login Successfully!', {
              nzDuration: 2000,
            });
            this.showLoader = false;
            this.authService.setAuth(response.data);
            this.router.navigate(['/home/allorder']);
            this.router.navigate(['/']);
          } else {
            this.commonService.showError('Something went wrong!');
          }
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
}
