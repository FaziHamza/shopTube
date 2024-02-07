import { BuilderComponent } from './builder.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DemoComponent } from './demo/demo.component';
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ApplicationBuilderComponent, ApplicationGlobalClassesComponent, ApplicationThemeComponent, BacklogComponent, CreateControlComponent, LanguageComponent, ModuleListComponent, ScreenBuilderComponent, TaskManagementListComponent, UserTaskManagementComponent, organizationBuilderComponent } from '../Builder-module';
import { CreateDatabaseComponent, ExecuteQueryComponent, MenuRolePermissionComponent,  ReleaseManagementComponent, SupportChatComponent, TaskManagementComponent } from '../Builder-module/admin';
import { BarChartComponent, FileManagerComponent, googleMapComponent } from '../components';
import { EmailTemplatesComponent, ExecuteActionRuleComponent } from './configurations';
import { BuilderLayoutComponent } from './builder-layout/builder-layout.component';
import { NgxGraphNodeComponent } from './ngx-graph-node/ngx-graph-node.component';
import { PolicyComponent, PolicyMappingComponent, UserComponent, UserMappingComponent } from '../accounts';


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
        path: 'email-template',
        component: EmailTemplatesComponent
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
        path: 'bar-chart',
        component: BarChartComponent
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
