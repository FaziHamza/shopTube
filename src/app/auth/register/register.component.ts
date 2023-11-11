import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'st-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() userAddDrawer: boolean = false;
  private drawerRef: NzDrawerRef<any>;
  passwordType: string = "password";
  confirmpasswordType: string = "password";
  passwordIcon: string = "fa-light fa-eye-slash text-lg";
  confirmpasswordIcon: string = "fa-light fa-eye-slash text-lg";

  cascaderValue: any[] = [];
  cascaderData: any[] = [];
  applications: any[] = [];
  departments: any[] = [];
  organizations: any[] = [];
  loader: boolean = false;
  form: FormGroup;
  showRecaptcha: boolean = false;
  recaptchaResponse = '';
  isFormSubmit: boolean = false;
  saveLoader: boolean = false;
  constructor(private applicationService: ApplicationService, private authService: AuthService, private router: Router,
    private toastr: NzMessageService, private formBuilder: FormBuilder, @Optional() drawerRef: NzDrawerRef<any>) {
      this.drawerRef = drawerRef;
     }

  ngOnInit(): void {
    this.loadScript();
    this.create();
    // this.organizationBuilder();
  }
  get f() {
    return this.form.controls;
  }
  create() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      contactnumber: [null, [Validators.required, Validators.pattern(/^92\d{10}$/)]],
      companyname: [null, [Validators.required]],
      accreditationNumber: [null, [Validators.required]],
      confirmpassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      application: [null], // Use the custom validator here
      remember: [false, [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmpassword')?.setErrors({ passwordMatch: true });
    } else {
      formGroup.get('confirmpassword')?.setErrors(null);
    }
  }

  organizationBuilder() {
    this.loader = true;
    this.applicationService.getNestCommonAPI('cp/Organization').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          if (res.data.length > 0) {
            this.organizations = res.data;
            this.cascaderData = res.data?.map((data: any) => {
              return {
                label: data.name,
                value: data._id
              };
            });
            let header = {
              label: 'Select organizations',
              value: 'selectOrganizations'
            }
            this.cascaderData.unshift(header)
          } else {
            this.organizations = [];
            this.cascaderData = [];
          }
        }
        else {
          this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
        }
        this.loader = false
      },
      error: (err) => {
        this.loader = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }
  async loadData(node: NzCascaderOption, index: number): Promise<void> {
    if (index === 0 && node.value != 'selectOrganizations') {
      try {
        const res = await this.applicationService.getNestCommonAPIById('cp/Department', node.value).toPromise();
        if (res.isSuccess) {
          this.departments = res.data;
          const departments = res.data.map((dep: any) => {
            return {
              label: dep.name,
              value: dep._id,
            };
          });
          let header = {
            label: 'Select Department',
            value: 'selectdepartment'
          }
          departments.unshift(header)
          node.children = departments;
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      } catch (err) {
        console.error('Error loader screen data:', err);
        this.toastr.error('An error occurred while loader screen data', { nzDuration: 3000 });
      }
    }
    else if (index === 1 && node.value != 'selectdepartment') {
      try {
        const res = await this.applicationService.getNestCommonAPIById('cp/Application', node.value).toPromise();
        if (res.isSuccess) {
          const applications = res.data.map((appData: any) => {
            return {
              label: appData.name,
              value: appData._id,
              isLeaf: true
            };
          });
          let header = {
            label: 'Select Application',
            value: 'selectApplication'
          }
          applications.unshift(header)
          node.children = applications;
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      } catch (err) {
        console.error('Error loader screen data:', err);
        this.toastr.error('An error occurred while loader screen data', { nzDuration: 3000 });
      }
    }
  }
  onDepartmentChange(value: any) {
    if (value.length === 2) {
      const selectedNode = this.departments.find((a: any) => a._id == value[1]);
      if (selectedNode) {
        let data = {
          label: selectedNode.name,
          value: selectedNode._id,
          children: []
        }
        this.loadData(data, 1);
      }
    }
    else if (value.length === 1) {
      const selectedNode = this.cascaderData.find((a: any) => a.value == value[0]);
      if (selectedNode.children && selectedNode?.children?.length > 0) {
        selectedNode.children = [];
        this.loadData(selectedNode, 0);
      }
    }
  }
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
    // Reset reCAPTCHA in the ngOnDestroy method to clean up when the component is destroyed
    // grecaptcha.reset();
  }
  submitForm(): void {
    this.isFormSubmit = true;
    // if (this.form.invalid) {
    //   this.toastr.warning('Fill all fields', { nzDuration: 3000 }); // Show an error message to the user
    //   return;
    // }
    // if ( this.cascaderValue.length < 3) {
    //   this.toastr.warning('Application required', { nzDuration: 3000 }); // Show an error message to the user
    //   return;
    // }
    if (!this.userAddDrawer) {
      this.recaptchaResponse = grecaptcha.getResponse();
      if (!this.recaptchaResponse) {
        // this.toastr.warning('You are not human', { nzDuration: 3000 }); // Show an error message to the user
        this.showRecaptcha = true;
        return;
      }
    }

    this.loader = true;
    let obj = {
      "username": this.form.value.email,
      "email": this.form.value.email,
      "firstName": this.form.value.firstname,
      "lastName": this.form.value.lastname,
      "companyName": this.form.value.companyname,
      "password": this.form.value.password,
      "accreditationNumber": this.form.value.accreditationNumber,
      "organizationId": environment.organizationId,
      "applicationId": environment.applicationId,
      "status": 'Pending',
      "domain": window.location.host.split(':')[0],
      "contactnumber": this.form.value.contactnumber,
    }
    console.log(obj);
    if (!this.form.value?.remember && !this.userAddDrawer) {
      this.toastr.warning("Please accept the term and conditions", { nzDuration: 2000 });
      return;
    }
    if (this.form.valid) {
      this.saveLoader = true;
      this.authService.registerUser(obj).subscribe({
        next: (res: any) => {
          if (res.isSuccess && res?.data) {
            this.toastr.success(res.message, { nzDuration: 2000 });
            this.create();
            if (this.userAddDrawer) {
              this.drawerRef.close(true);
            }else{
              this.router.navigateByUrl('/login')
            }
          } else {
            this.toastr.error(res.message, { nzDuration: 2000 });
          }
          this.saveLoader = false;
        },
        error: (err) => {
          this.create();
          this.saveLoader = false;
          this.toastr.error('some error exception', { nzDuration: 2000 });
        },
      });
      this.isFormSubmit = false;
    }

  }

  showPassword() {
    this.passwordType = this.passwordType == 'password' ? 'string' : 'password';
    this.passwordIcon = this.passwordIcon == 'fa-light fa-eye-slash text-lg' ? 'fa-light fa-eye text-lg' : 'fa-light fa-eye-slash text-lg'
  }
  showConfirmPassword() {
    this.confirmpasswordType = this.confirmpasswordType == 'password' ? 'string' : 'password';
    this.confirmpasswordIcon = this.confirmpasswordIcon == 'fa-light fa-eye-slash text-lg' ? 'fa-light fa-eye text-lg' : 'fa-light fa-eye-slash text-lg'
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

}
