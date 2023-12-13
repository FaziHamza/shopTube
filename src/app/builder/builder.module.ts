import { NgModule } from "@angular/core";
import { BuilderComponent } from "./builder.component";
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
import { ContextMenuModule } from "@perfectmemory/ngx-contextmenu";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BuilderLayoutComponent } from "../_layout/builder-layout/builder-layout.component";
import { BuilderShareModule } from "../shared/builder-share.module";
import { TemplatePopupComponent } from './template-popup/template-popup.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { ExecuteActionRuleComponent } from './execute-action-rule/execute-action-rule.component';
import { MonacoEditorComponent } from './execute-action-rule/monaco-editor/monaco-editor.component';
import { PolicyComponent } from "../admin/policy/policy.component";
import { PolicyMappingComponent } from "../admin/policy-mapping/policy-mapping.component";
import { UserMappingComponent } from "../admin/user-mapping/user-mapping.component";
import { HeadingParagrapghUpdateComponent } from './heading-paragrapgh-update/heading-paragrapgh-update.component';
import { OtherBulkUpdateComponent } from './other-bulk-update/other-bulk-update.component';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    BuilderComponent,
    BuilderLayoutComponent,
    TemplatePopupComponent,
    MarketPlaceComponent,
    ExecuteActionRuleComponent,
    MonacoEditorComponent,
    HeadingParagrapghUpdateComponent,
    OtherBulkUpdateComponent

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
    BuilderShareModule,
    ShareModule,
    GoogleChartsModule,
    ContextMenuModule,
    DragDropModule,
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