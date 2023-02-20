import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    debugger
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.employeeService.login(this.validateForm.value.email
        , this.validateForm.value.password
        ).subscribe((res=>{
        if(res.length>0){
          this.router.navigate(['/']);
        }
      }))
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

  constructor(private fb: UntypedFormBuilder , public employeeService: EmployeeService , private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['admin@co.co', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      remember: [true]
    });
  }
}
