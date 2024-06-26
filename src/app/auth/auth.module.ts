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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent, 
    ErrorComponent
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ShareModule,
    NgZorroAntdModule
  ],
  exports: [RouterModule],
  providers:[EnvService]

})
export class AuthModule { }
