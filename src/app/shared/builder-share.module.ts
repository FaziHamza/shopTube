import { NgModule } from '@angular/core';
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ActionRuleComponent, BusinessRuleComponent, UIRuleComponent, ValidationRuleComponent } from '../builder/configurations';
import { DemoComponent } from '../builder/demo/demo.component';
import { NestedTableComponent } from '../builder/nested-table/nested-table.component';
import { ApplicationBuilderComponent, LanguageComponent, ModuleListComponent, ScreenBuilderComponent, UserTaskManagementComponent, organizationBuilderComponent } from '../Builder-module';
import { BulkUpdateComponent } from '../builder/bulk-update/bulk-update.component';
import { AddControlCommonPropertiesComponent } from '../builder/add-control-common-properties/add-control-common-properties.component';
import { CreateDatabaseComponent } from '../admin/create-database/create-database.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularSplitModule } from "angular-split";
import { NgJsonEditorModule } from "ang-jsoneditor";
import { NgZorroAntdModule } from "../zorro/ng-zorro-antd.module";
import { FormlyNgZorroAntdModule } from "@ngx-formly/ng-zorro-antd";
import { NgxMaskModule } from "ngx-mask";
import { FormlyModule } from "@ngx-formly/core";
import { formlyCustomeConfig } from "../formlyConfig";
import { CommonModule } from "@angular/common";
import { GoogleChartsModule } from "angular-google-charts";
import { ContextMenuModule } from "@perfectmemory/ngx-contextmenu";
import { RouterModule } from '@angular/router';
import { ShareModule } from './share.module';
import { RoleManagementComponent } from '../admin/role-management/role-management.component';
import { MenuRolePermissionComponent } from '../admin/menu-role-permission/menu-role-permission.component';
import { TaskManagementComponent } from '../admin/task-management/task-management.component';
import { ReleaseManagementComponent } from '../admin/release-management/release-management.component';
import { TaskManagementListComponent } from '../Builder-module/task-management-list/task-management-list.component';
import { BacklogComponent } from '../Builder-module/backlog/backlog.component';
import { TestActionRuleComponent } from '../builder/configurations/test-action-rule/test-action-rule.component';

@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      AngularSplitModule,
      NgJsonEditorModule,
      NgZorroAntdModule,
      ReactiveFormsModule,
      FormlyNgZorroAntdModule,
      NgxMaskModule.forRoot(),
      FormlyModule.forRoot(formlyCustomeConfig),
      GoogleChartsModule,
      ContextMenuModule,
      RouterModule,
      ShareModule,
    ],
  declarations: [
    MenuBuilderComponent,
    ActionRuleComponent, BusinessRuleComponent, UIRuleComponent, ValidationRuleComponent, DemoComponent, NestedTableComponent,
    ScreenBuilderComponent, ModuleListComponent, ApplicationBuilderComponent, AddControlCommonPropertiesComponent, organizationBuilderComponent,
    LanguageComponent,
    BulkUpdateComponent,
    CreateDatabaseComponent,
    RoleManagementComponent,
    MenuRolePermissionComponent,
    TaskManagementComponent,
    ReleaseManagementComponent,
    UserTaskManagementComponent,
    TaskManagementListComponent,
    TestActionRuleComponent,
    BacklogComponent,

  ],
  exports: [
    MenuBuilderComponent,
    ActionRuleComponent, BusinessRuleComponent, UIRuleComponent, ValidationRuleComponent, DemoComponent, NestedTableComponent,
    ScreenBuilderComponent, ModuleListComponent, ApplicationBuilderComponent, AddControlCommonPropertiesComponent, organizationBuilderComponent,
    LanguageComponent,TestActionRuleComponent,
    BulkUpdateComponent,
    CreateDatabaseComponent,
    RoleManagementComponent,
    MenuRolePermissionComponent,
    TaskManagementComponent,
    ReleaseManagementComponent,
    TaskManagementComponent,
    UserTaskManagementComponent,
    TaskManagementListComponent,
    BacklogComponent,

  ],
  providers: [

  ],
})

export class BuilderShareModule {

}
