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
import { Layout1Component } from './admin/layout1/layout1.component';
import { Layout5Component } from './admin/layout5/layout5.component';
import { Layout4Component } from './admin/layout4/layout4.component';
import { Layout3Component } from './admin/layout3/layout3.component';
import { Layout2Component } from './admin/layout2/layout2.component';

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
    path: 'layout1',
    component: Layout1Component
  },
  {
    path: 'layout2',
    component: Layout2Component
  },
  {
    path: 'layout3',
    component: Layout3Component
  },
  {
    path: 'layout4',
    component: Layout4Component
  },
  {
    path: 'layout5',
    component: Layout5Component
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
