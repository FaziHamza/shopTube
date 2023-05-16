import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { AngularSplitModule } from 'angular-split';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../zorro/ng-zorro-antd.module';
import { WebMenuComponent } from './web-menu/web-menu.component';

@NgModule({
    declarations: [
    
    WebMenuComponent
  ],
    imports: [
      FormsModule,
      // CommonModule,
      AngularSplitModule,
      NgJsonEditorModule,
      // BrowserModule,
      NgZorroAntdModule,
      ReactiveFormsModule,
      FormlyNgZorroAntdModule,
      NgxMaskModule.forRoot(),
      // BrowserAnimationsModule,
      HttpClientModule,
    ],
  })

export class WebsiteModules { }