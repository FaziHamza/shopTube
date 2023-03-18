import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { BuilderComponent } from './builder/builder.component';
import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './user/login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { ScreenBuilderComponent } from './Builder-module/screen-builder/screen-builder.component';
import { ApplicationBuilderComponent } from './Builder-module/application-builder/application-builder.component';
import { ModuleListComponent } from './Builder-module/module-list/module-list.component';

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
  {
    path: 'builder',
    component: BuilderComponent
  },
  {
    path: 'menu-builder',
    component: MenuBuilderComponent
  },
  {
    path: 'screen-builder',
    component: ScreenBuilderComponent
  },
  {
    path: 'application-builder',
    component: ApplicationBuilderComponent
  },
  {
    path: 'module-list',
    component: ModuleListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
