import { NgModule } from "@angular/core";
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
import {  MonacoEditorModule } from "ngx-monaco-editor";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BuilderDesignComponent } from "./builder-design.component";
import { BuilderDesignRoutingModule } from "./builder-design-routing.module";
import { BuilderShareModule } from "../shared/builder-share.module";
import { BuilderDesignLayoutComponent } from "./builder-design-layout/builder-design-layout.component";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


@NgModule({
  declarations: [
    BuilderDesignComponent,
    BuilderDesignLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularSplitModule,
    NzDropDownModule,
    NgJsonEditorModule,
    BuilderShareModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NzToolTipModule,
    FormlyNgZorroAntdModule,
    MonacoEditorModule.forRoot(),
    NgxMaskModule.forRoot(),
    FormlyModule.forRoot(formlyCustomeConfig),
    BuilderDesignRoutingModule,
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

export class BuilderDesignModule { }
