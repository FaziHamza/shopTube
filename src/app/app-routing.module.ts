import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { BuilderComponent } from './builder/builder.component';
import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './user/login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { BarChartComponent, DemoLayotPageComponent } from './components';
import { DemoComponent } from './builder/demo/demo.component';
import { CreateDatabaseComponent } from './admin/create-database/create-database.component';
import { Layout1Component } from './admin/layout1/layout1.component';

const routes: Routes = [
  { path: '', component: SiteLayoutComponent ,
  children:[
    {
      path: 'home',
      component: DemoLayotPageComponent
    },
    {
      path: 'pages/:schema',
      component: PagesComponent
    },
    {
      path: 'pages/:application/:module',
      component: PagesComponent
    },
    {
      path: 'pages/:application/:module/:schema',
      component: PagesComponent
    },
    {
      path: 'layout/:application/:module',
      component: DemoLayotPageComponent
    },
    {
      path: 'database',
      component: CreateDatabaseComponent
    },
    {
      path: '',
      redirectTo: 'home', pathMatch: 'full'
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
    loadChildren: () =>
        import(
            "src/app/builder/builder.module"
        ).then((m) => m.BuilderModule),
  },
  {
    path: 'bar-chart',
    component: BarChartComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'layout1',
    component: Layout1Component,
    children:[
      {
        path: 'pages/:schema',
        component: PagesComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
