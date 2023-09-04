import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { BarChartComponent,  FileManagerComponent, googleMapComponent } from './components';
import { DemoComponent } from './builder/demo/demo.component';
import { Screenv1Component } from './Builder-module/screenv1/screenv1.component';
import { AuthGuard } from './auth/auth.Guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'pages/:schema',
        component: PagesComponent
      },
      {
        path: 'pages/:schema/:commentId',
        component: PagesComponent
      },
      {
        path: 'pages',
        component: PagesComponent
      },
      {
        path: 'pages/:application/:module',
        component: PagesComponent
      },
      {
        path: 'home/pages/:schema',
        component: PagesComponent
      },

    ]
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
    path: 'builder-design',
    loadChildren: () =>
      import(
        "src/app/builder-design/builder-design.module"
      ).then((m) => m.BuilderDesignModule),
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import(
  //       "src/app/auth/auth.module"
  //     ).then((m) => m.AuthModule),
  // },
  {
    path: 'bar-chart',
    component: BarChartComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'file-manager',
    component: FileManagerComponent
  },
  {
    path: 'map',
    component: googleMapComponent
  },
  {
    path: 'screenv1',
    component: Screenv1Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
