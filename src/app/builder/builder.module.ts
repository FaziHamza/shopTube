import { NgModule } from "@angular/core";
import { BuilderComponent } from "./builder.component";
import {
ActionRuleComponent,BusinessRuleComponent,BusinessRuleGridComponent,UIRuleComponent,ValidationRuleComponent
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
import { ApplicationBuilderComponent, ModuleListComponent, ScreenBuilderComponent } from "../Builder-module";
import { AppBuilderSideMenuComponent } from "../_layout/app-builder-side-menu/app-builder-side-menu.component";
import { MenuBuilderComponent } from "../menu-builder/menu-builder.component";
import { AddControlCommonPropertiesComponent } from './add-control-common-properties/add-control-common-properties.component';
import { ContextMenuModule } from "@perfectmemory/ngx-contextmenu";

@NgModule({
  declarations: [
    BuilderComponent,
    AppBuilderSideMenuComponent,
    MenuBuilderComponent,
    ActionRuleComponent,BusinessRuleComponent,UIRuleComponent,ValidationRuleComponent, DemoComponent, NestedTableComponent,
    ScreenBuilderComponent,ModuleListComponent,ApplicationBuilderComponent, AddControlCommonPropertiesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularSplitModule,
    NgJsonEditorModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    NgxMaskModule.forRoot(),
    FormlyModule.forRoot(formlyCustomeConfig),
    BuilderRoutingModule,
    ShareModule,
    GoogleChartsModule ,
    ContextMenuModule,

  ],
})

export class BuilderModule {}
