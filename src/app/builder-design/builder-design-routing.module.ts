import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ScreenBuilderComponent } from '../Builder-module/screen-builder/screen-builder.component';
import { ApplicationBuilderComponent } from '../Builder-module/application-builder/application-builder.component';
import { ModuleListComponent } from '../Builder-module/module-list/module-list.component';
import { LanguageComponent } from '../Builder-module';
import { organizationBuilderComponent } from '../Builder-module/organization/organization-builder.component';
import { BuilderLayoutComponent } from '../_layout/builder-layout/builder-layout.component';
import { CreateDatabaseComponent } from '../admin/create-database/create-database.component';
import { BuilderDesignComponent } from "./builder-design.component";

const routes: Routes = [
  {
    path: "",
    component: BuilderLayoutComponent,
    children:[

      {
        path: '',
        component: BuilderDesignComponent
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
        path: 'language',
        component: LanguageComponent
      },
      {
        path: 'organization-builder',
        component: organizationBuilderComponent
      },
      {
        path: 'module-list',
        component: ModuleListComponent
      },
      {
        path: 'database',
        component: CreateDatabaseComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderDesignRoutingModule { }
