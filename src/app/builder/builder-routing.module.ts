import { BuilderComponent } from './builder.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DemoComponent } from './demo/demo.component';
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ScreenBuilderComponent } from '../Builder-module/screen-builder/screen-builder.component';
import { ApplicationBuilderComponent } from '../Builder-module/application-builder/application-builder.component';
import { ModuleListComponent } from '../Builder-module/module-list/module-list.component';
import { LanguageComponent } from '../Builder-module';
import { organizationBuilderComponent } from '../Builder-module/organization/organization-builder.component';
import { BuilderLayoutComponent } from '../_layout/builder-layout/builder-layout.component';
import { CreateDatabaseComponent } from '../admin/create-database/create-database.component';
import { RoleManagementComponent } from '../admin/role-management/role-management.component';
import { MenuRolePermissionComponent } from '../admin/menu-role-permission/menu-role-permission.component';
import { TaskManagementComponent } from '../admin/task-management/task-management.component';
import { ReleaseManagementComponent } from '../admin/release-management/release-management.component';
import { ExecuteActionRuleComponent } from './execute-action-rule/execute-action-rule.component';

const routes: Routes = [
  {
    path: "",
    component: BuilderLayoutComponent,
    children: [
      {
        path: "",
        component: BuilderComponent
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
      {
        path: 'role',
        component: RoleManagementComponent
      },
      {
        path: 'permission',
        component: MenuRolePermissionComponent
      },
      {
        path: 'task',
        component: TaskManagementComponent
      },
      {
        path: 'release',
        component: ReleaseManagementComponent
      },
      {
        path: 'actions',
        component: ExecuteActionRuleComponent
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
