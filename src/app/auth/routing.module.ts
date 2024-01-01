import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DemoComponent } from '../builder/demo/demo.component';
import { PdfComponent } from '../components/pdf/pdf.component';
import { TaskManagerComponent } from '../components/task-manager/task-manager.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pdf/:pdfPage', component: PdfComponent },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'task',
    component: TaskManagerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
