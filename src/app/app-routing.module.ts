import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './user/login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

const routes: Routes = [
  { path: '', component: SiteLayoutComponent ,
  children:[
    {
      path: 'pages/:schema',
      component: PagesComponent
    },

  ]},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
