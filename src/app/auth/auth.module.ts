import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ShareModule } from '../shared/share.module';
import { NgZorroAntdModule } from '../zorro/ng-zorro-antd.module';
import { ErrorComponent } from 'src/common/error/error.component';
import { EnvService } from '../shared/envoirment.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserComponent } from './user/user.component';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent, 
    ErrorComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserComponent,
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ShareModule,
    NgZorroAntdModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [RouterModule],
  providers:[EnvService]

})
export class AuthModule { }
