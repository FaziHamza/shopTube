import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesComponent } from './pages/pages.component';
import { ZorroComponent } from './zorro/zorro.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'ZorroComponent', component: ZorroComponent },
  {
    path: 'pages/:schema',
    component: PagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
