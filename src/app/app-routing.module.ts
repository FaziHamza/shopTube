import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { BarChartComponent, FileManagerComponent, googleMapComponent } from './components';
import { DemoComponent } from './builder/demo/demo.component';
import { Screenv1Component } from './Builder-module/screenv1/screenv1.component';
import { AuthGuard } from './auth/auth.Guard';
import { PolicyComponent } from './admin/policy/policy.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { AuthResolverService } from './resolver/auth-resolver.service';
import { PermissionDeniedComponent } from './auth/permission-denied/permission-denied.component';
import { UserComponent } from './auth/user/user.component';
import { PolicyMappingComponent } from './admin/policy-mapping/policy-mapping.component';
import { UserMappingComponent } from './admin/user-mapping/user-mapping.component';

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'pages/:schema',
        component: PagesComponent,
        // resolve: {
        //   resolvedData: AuthResolverService
        // }
      },
      // {
      //   path: 'pages/:schema/:commentId',
      //   component: PagesComponent
      // },
      {
        path: 'pages/:schema/:id',
        component: PagesComponent,
        // resolve: {
        //   resolvedData: AuthResolverService
        // }
      },
      {
        path: 'pages',
        component: PagesComponent
      },
      // {
      //   path: 'pages/:application/:module',
      //   component: PagesComponent
      // },
      {
        path: 'home/pages/:schema',
        component: PagesComponent
      },

      { path: '**', redirectTo: 'not-found' },
      { path: 'permission-denied', component: PermissionDeniedComponent },
      {
        path: 'policy',
        component: PolicyComponent
      },
      {
        path: 'policy-mapping',
        component: PolicyMappingComponent
      },
      {
        path: 'user-mapping',
        component: UserMappingComponent
      },
      {
        path: 'user',
        component: UserComponent
      },

    ]
  },
  {
    path: 'builder',
    loadChildren: () =>
      import(
        "src/app/builder/builder.module"
      ).then((m) => m.BuilderModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import(
        "src/app/builder/builder.module"
      ).then((m) => m.BuilderModule),
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
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
