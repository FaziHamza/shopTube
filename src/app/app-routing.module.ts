import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesComponent } from './pages/pages.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

const routes: Routes = [
  { path: '', component: SiteLayoutComponent ,
  children:[
    {
      path: 'pages/:schema',
      component: PagesComponent
    },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
