import { NgModule } from '@angular/core';
import { MenuBuilderComponent } from '../menu-builder/menu-builder.component';
import { ActionRuleComponent, BusinessRuleComponent, BusinessRuleGridComponent, EmailTemplatesComponent, UIRuleComponent, ValidationRuleComponent } from '../builder/configurations';
import { DemoComponent } from '../builder/demo/demo.component';
import { NestedTableComponent } from '../builder/nested-table/nested-table.component';
import { ApplicationBuilderComponent, ApplicationGlobalClassesComponent, ApplicationThemeComponent, BacklogComponent, CreateControlComponent, LanguageComponent, ModuleListComponent, ScreenBuilderComponent, TaskManagementListComponent, UserTaskManagementComponent, organizationBuilderComponent } from '../Builder-module';
import { BulkUpdateComponent } from '../builder/bulk-update/bulk-update.component';
import { AddControlCommonPropertiesComponent } from '../builder/add-control-common-properties/add-control-common-properties.component';
import { CreateDatabaseComponent } from '../Builder-module/admin/create-database/create-database.component';
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
import { ExecuteQueryComponent, MenuRolePermissionComponent, ReleaseManagementComponent, TaskManagementComponent } from '../Builder-module/admin';
import { LayoutDrawerComponent } from '../menu-builder/layout-drawer/layout-drawer.component';
import { MenuBulkUpdateComponent } from '../menu-builder/menu-bulk-update/menu-bulk-update.component';
import { TableRowComponent } from '../menu-builder/table-row/table-row.component';
import { GenericFieldComponent } from '../builder/generic-field/generic-field.component';


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
    LayoutDrawerComponent,
    ActionRuleComponent, BusinessRuleComponent, UIRuleComponent, ValidationRuleComponent, DemoComponent, NestedTableComponent,
    ScreenBuilderComponent, ModuleListComponent, ApplicationBuilderComponent, AddControlCommonPropertiesComponent, organizationBuilderComponent,
    LanguageComponent,
    BulkUpdateComponent,
    CreateDatabaseComponent,
    MenuRolePermissionComponent,
    TaskManagementComponent,
    ReleaseManagementComponent,
    UserTaskManagementComponent,
    TaskManagementListComponent,
    BacklogComponent,
    ApplicationGlobalClassesComponent,
    MenuBulkUpdateComponent,
    ExecuteQueryComponent,
    TableRowComponent,
    EmailTemplatesComponent,
    GenericFieldComponent,
    ApplicationThemeComponent,CreateControlComponent,
  ],
  exports: [
    MenuBuilderComponent,
    LayoutDrawerComponent,
    ActionRuleComponent, BusinessRuleComponent, UIRuleComponent, ValidationRuleComponent, DemoComponent, NestedTableComponent,
    ScreenBuilderComponent, ModuleListComponent, ApplicationBuilderComponent, AddControlCommonPropertiesComponent, organizationBuilderComponent,
    LanguageComponent,
    BulkUpdateComponent,
    CreateDatabaseComponent,
    MenuRolePermissionComponent,
    TaskManagementComponent,
    ReleaseManagementComponent,
    TaskManagementComponent,
    UserTaskManagementComponent,
    MenuBulkUpdateComponent,
    TaskManagementListComponent,
    BacklogComponent,ApplicationGlobalClassesComponent,
    ExecuteQueryComponent,
    TableRowComponent,
    EmailTemplatesComponent,
    GenericFieldComponent,
    ApplicationThemeComponent,CreateControlComponent,
  ],
  providers: [

  ],
})

export class BuilderShareModule {

}
