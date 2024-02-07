import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { BarChartComponent, FileManagerComponent, googleMapComponent } from './components';
import { DemoComponent } from './builder/demo/demo.component';
import { AuthGuard } from './auth/auth.Guard';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { PermissionDeniedComponent } from './auth/permission-denied/permission-denied.component';
import { ApplicationThemeComponent } from './Builder-module/application-theme/application-theme.component';
import { NgxGraphNodeComponent } from './builder/ngx-graph-node/ngx-graph-node.component';
import { EmailTemplatesComponent } from './builder/configurations/email-templates/email-templates.component';

const routes: Routes = [
  {
    path: '', 
    component: SiteLayoutComponent,
    children: [
      {
        path: 'pages',
        component: PagesComponent
      },
      {
        path: 'pages/:schema',
        component: PagesComponent,
      },
      {
        path: 'pages/:schema/:id',
        component: PagesComponent,
      },
      {
        path: 'home/pages/:schema',
        component: PagesComponent
      },

      {
        path: 'permission-denied',
        component: PermissionDeniedComponent
      },

      { path: '**', redirectTo: 'not-found' }
    ]
  },
  // {
  //   path: 'permission-denied',
  //   component: PermissionDeniedComponent
  // },
  {
    path: 'auth',
    loadChildren: () => import("src/app/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: 'account',
    loadChildren: () => import("src/app/accounts/account.module").then((m) => m.AccountModule),
  },
  {
    path: 'builder',
    loadChildren: () => import("src/app/builder/builder.module").then((m) => m.BuilderModule),
  },
  {
    path: 'menu-builder',
    loadChildren: () => import("src/app/menu-builder/menu-builder.module").then((m) => m.MenuBuilderModule),
  },
  {
    path: 'admin',
    loadChildren: () => import("src/app/builder/builder.module").then((m) => m.BuilderModule),
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
    path: 'mindmap',
    component: NgxGraphNodeComponent
  },
  {
    path: 'file-manager',
    component: FileManagerComponent
  },
  {
    path: 'app-theme',
    component: ApplicationThemeComponent
  },
  {
    path: 'map',
    component: googleMapComponent // renamed to PascalCase
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }