import { BuilderComponent } from './builder.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DemoComponent } from './demo/demo.component';
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ScreenBuilderComponent } from '../Builder-module/screen-builder/screen-builder.component';
import { ApplicationBuilderComponent } from '../Builder-module/application-builder/application-builder.component';
import { ModuleListComponent } from '../Builder-module/module-list/module-list.component';
import { LanguageComponent, UserTaskManagementComponent } from '../Builder-module';
import { organizationBuilderComponent } from '../Builder-module/organization/organization-builder.component';
import { BuilderLayoutComponent } from '../_layout/builder-layout/builder-layout.component';
import { CreateDatabaseComponent } from '../admin/create-database/create-database.component';
import { RoleManagementComponent } from '../admin/role-management/role-management.component';
import { MenuRolePermissionComponent } from '../admin/menu-role-permission/menu-role-permission.component';
import { TaskManagementComponent } from '../admin/task-management/task-management.component';
import { ReleaseManagementComponent } from '../admin/release-management/release-management.component';
import { ExecuteActionRuleComponent } from './execute-action-rule/execute-action-rule.component';
import { TaskManagementListComponent } from '../Builder-module/task-management-list/task-management-list.component';
import { BacklogComponent } from '../Builder-module/backlog/backlog.component';
import { PolicyComponent } from '../admin/policy/policy.component';
import { PolicyMappingComponent } from '../admin/policy-mapping/policy-mapping.component';
import { UserMappingComponent } from '../admin/user-mapping/user-mapping.component';
import { UserComponent } from '../auth/user/user.component';
import { FileManagerComponent } from '../components';
import { ApplicationThemeComponent } from '../Builder-module/application-theme/application-theme.component';
import { CreateControlComponent } from '../Builder-module/create-control/create-control.component';
import { SupportChatComponent } from '../admin/support-chat/support-chat.component';
import { EmailComponent } from '../components/email/email.component';
import { EmailTemplatesComponent } from './configurations/email-templates/email-templates.component';
import { ApplicationGlobalClassesComponent } from '../Builder-module/application-global-classes/application-global-classes.component';
import { ExecuteQueryComponent } from '../admin/execute-query/execute-query.component';


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
        path: 'query',
        component: ExecuteQueryComponent
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
      {
        path: 'user-task',
        component: UserTaskManagementComponent
      },
      {
        path: 'user-task-list',
        component: TaskManagementListComponent
      },
      {
        path: 'backlog',
        component: BacklogComponent
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
        path: 'file-manager',
        component: FileManagerComponent
      },
      {
        path: 'support-chat',
        component: SupportChatComponent
      },
      {
        path: 'global-Classes',
        component: ApplicationGlobalClassesComponent
      },
      {
        path: 'app-theme',
        component: ApplicationThemeComponent
      },
      {
        path: 'create-controls',
        component: CreateControlComponent
      },
      {
        path: 'email',
        component: EmailComponent
      },
      {
        path: 'email-template',
        component: EmailTemplatesComponent
      },
    ]
  },
  // {
  //   path: "demo",
  //   component: DemoComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }
