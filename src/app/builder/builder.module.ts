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
import { NgxDropzoneModule } from "ngx-dropzone";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { formlyCustomeConfig } from "../formlyConfig";
import { ShareModule } from "../shared/share.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    BuilderComponent,
    ActionRuleComponent,BusinessRuleComponent,UIRuleComponent,ValidationRuleComponent
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
    NgxDropzoneModule,
    DragDropModule,
    BuilderRoutingModule,
    ShareModule,
  ],
})

export class BuilderModule {}
