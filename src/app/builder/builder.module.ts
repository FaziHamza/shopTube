import { NgModule } from "@angular/core";
import { BuilderComponent } from "./builder.component";
import {
  ActionRuleComponent, BusinessRuleComponent, BusinessRuleGridComponent, UIRuleComponent, ValidationRuleComponent
} from "./configurations";
import { BuilderRoutingModule } from "./builder-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularSplitModule } from "angular-split";
import { NgJsonEditorModule } from "ang-jsoneditor";
import { NgZorroAntdModule } from "../zorro/ng-zorro-antd.module";
import { FormlyNgZorroAntdModule } from "@ngx-formly/ng-zorro-antd";
import { NgxMaskModule } from "ngx-mask";
import { FormlyModule } from "@ngx-formly/core";
import { formlyCustomeConfig } from "../formlyConfig";
import { ShareModule } from "../shared/share.module";
import { CommonModule } from "@angular/common";
import { GoogleChartsModule } from "angular-google-charts";
import { DemoComponent } from './demo/demo.component';
import { NestedTableComponent } from './nested-table/nested-table.component';
import { ApplicationBuilderComponent, ModuleListComponent, ScreenBuilderComponent, organizationBuilderComponent, LanguageComponent } from "../Builder-module";
import { MenuBuilderComponent } from "../menu-builder/menu-builder.component";
import { AddControlCommonPropertiesComponent } from './add-control-common-properties/add-control-common-properties.component';
import { ContextMenuModule } from "@perfectmemory/ngx-contextmenu";
import {  MonacoEditorModule } from "ngx-monaco-editor";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
import { BuilderLayoutComponent } from "../_layout/builder-layout/builder-layout.component";
import { CreateDatabaseComponent } from "../admin/create-database/create-database.component";
import { BuilderDesignComponent } from './builder-design/builder-design.component';

@NgModule({
  declarations: [
    BuilderComponent,
    BuilderLayoutComponent,
    MenuBuilderComponent,
    ActionRuleComponent, BusinessRuleComponent, UIRuleComponent, ValidationRuleComponent, DemoComponent, NestedTableComponent,
    ScreenBuilderComponent, ModuleListComponent, ApplicationBuilderComponent, AddControlCommonPropertiesComponent, organizationBuilderComponent,
    LanguageComponent,
    BulkUpdateComponent,
    CreateDatabaseComponent,
    BuilderDesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularSplitModule,
    NgJsonEditorModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    MonacoEditorModule.forRoot(),
    NgxMaskModule.forRoot(),
    FormlyModule.forRoot(formlyCustomeConfig),
    BuilderRoutingModule,
    ShareModule,
    GoogleChartsModule,
    ContextMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
  ],
})

export class BuilderModule { }
