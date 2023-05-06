import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { fieldComponents, formlyCustomeConfig } from './formlyConfig';
import { NgZorroAntdModule } from './zorro/ng-zorro-antd.module';
import { NgxMaskModule } from 'ngx-mask';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { FormlyFieldStepper } from './wrappers/FormlyFieldStepper';
import { AngularSplitModule } from 'angular-split';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { CommonModule } from '@angular/common';
import { SideMenuBuildComponent } from './menu-builder/side-menu-build/side-menu-build.component';
import { ShareModule } from './shared/share.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GoogleChartsModule } from 'angular-google-charts';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    fieldComponents,
    SideMenuBuildComponent,
    FormlyFieldStepper,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AngularSplitModule,
    NgJsonEditorModule,
    BrowserModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    NgxMaskModule.forRoot(),
    FormlyModule.forRoot(formlyCustomeConfig),
    FullCalendarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ShareModule,
    GoogleChartsModule,
    // NzIconModule.forRoot([ SettingOutline  ]),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
