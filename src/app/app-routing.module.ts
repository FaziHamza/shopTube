import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { BuilderComponent } from './builder/builder.component';
import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './user/login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { BarChartComponent } from './components';
import { DemoComponent } from './builder/demo/demo.component';

const routes: Routes = [
  { path: '', component: SiteLayoutComponent ,
  children:[
    {
      path: 'pages/:schema',
      component: PagesComponent
    },
    {
      path: 'pages/:application/:schema',
      component: PagesComponent
    },
    {
      path: 'pages/:application/:mod/:schema',
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
