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
      {
        path: 'permission-denied',
        component: PermissionDeniedComponent
      },
      {
        path: 'email-template',
        component: EmailTemplatesComponent
      },
      { path: '**', redirectTo: 'not-found' }
    ]
  },
  // {
  //   path: 'permission-denied',
  //   component: PermissionDeniedComponent
  // },
  {
    path: 'builder',
    loadChildren: () => import("src/app/builder/builder.module").then((m) => m.BuilderModule),
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
  {
    path: 'screenv1',
    component: Screenv1Component
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }