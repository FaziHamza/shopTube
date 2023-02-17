import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormlyWrapperRow } from './zorro/wrapper';
import { ZorroComponent } from './zorro/zorro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HomePageComponent } from './home-page/home-page.component';
import { NzCardModule } from 'ng-zorro-antd/card';
// import { FormlyHorizontalWrapper } from './wrappers/FormlyHorizontalWrapper';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormlyHorizontalWrapper } from './wrappers/FormlyHorizontalWrapper';
import { FormlyVerticalWrapper } from './wrappers/FormlyVerticalWrapper';
import { FormlyVerticalThemeWrapper } from './wrappers/FormlyVerticalThemeWrapper';
import { formlyCustomeConfig } from './formlyConfig';

// export function createTranslateLoader(http: HttpClient): any {
//   return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }
@NgModule({
  declarations: [
    AppComponent,
    ZorroComponent,
    FormlyWrapperRow,
    PagesComponent,
    HomePageComponent,
    FormlyHorizontalWrapper,
    FormlyVerticalWrapper,
    FormlyVerticalThemeWrapper
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    NzButtonModule,
    NzCardModule, 
    NzToolTipModule, 
    FormlyModule.forRoot(formlyCustomeConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
