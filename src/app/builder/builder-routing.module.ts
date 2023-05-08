import { BuilderComponent } from './builder.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DemoComponent } from './demo/demo.component';
import { AppBuilderSideMenuComponent } from '../_layout/app-builder-side-menu/app-builder-side-menu.component';
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ScreenBuilderComponent } from '../Builder-module/screen-builder/screen-builder.component';
import { ApplicationBuilderComponent } from '../Builder-module/application-builder/application-builder.component';
import { CompanyBuilderComponent } from '../Builder-module/company-builder/company-builder.component';
import { ModuleListComponent } from '../Builder-module/module-list/module-list.component';

const routes: Routes = [
  {
    path: "",
    component: AppBuilderSideMenuComponent,
    children:[
      {
        path: "",
        component:BuilderComponent
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
        path: 'company-builder',
        component: CompanyBuilderComponent
      },
      {
        path: 'module-list',
        component: ModuleListComponent
      },
    ]
  },
  {
    path: "demo",
    component: DemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }
