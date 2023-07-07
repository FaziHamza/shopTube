import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { fieldComponents, formlyCustomeConfig } from './formlyConfig';
import { NgZorroAntdModule } from './zorro/ng-zorro-antd.module';
import { NgxMaskModule } from 'ngx-mask';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { RegisterComponent } from './user/register/register.component';
import { FormlyFieldStepper } from './wrappers/FormlyFieldStepper';
import { AngularSplitModule } from 'angular-split';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { CommonModule } from '@angular/common';
import { ShareModule } from './shared/share.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GoogleChartsModule } from 'angular-google-charts';
// import { CreateDatabaseComponent } from './admin/create-database/create-database.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsService } from './services/google-maps.service';
import { Screenv1Component } from './Builder-module/screenv1/screenv1.component';
import { MenuBulkUpdateComponent } from './menu-builder/menu-bulk-update/menu-bulk-update.component';
import { EnvService } from './shared/envoirment.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from './shared/interceptor';
import { ApiService } from './shared/api.service';
import { AuthModule } from './auth/auth.module';
import { TableRowComponent } from './menu-builder/table-row/table-row.component';
import { AuthGuard } from './auth/auth.Guard';
import { CommonService } from '../common/common-services/common.service';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    fieldComponents,
    FormlyFieldStepper,
    RegisterComponent,
    // CreateDatabaseComponent,
    MapComponent,
    MenuBulkUpdateComponent,
    Screenv1Component,
    TableRowComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AuthModule,
    AngularSplitModule,
    NgJsonEditorModule,
    BrowserModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    FormlyNgZorroAntdModule,
    NgxMaskModule.forRoot(),
    FormlyModule.forRoot(formlyCustomeConfig),
    FullCalendarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ShareModule,
    GoogleChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
    // NzIconModule.forRoot([ SettingOutline  ]),
  ],
  providers: [
    CommonService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    GoogleMapsService,
    ApiService,
    EnvService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (router: Router, env:EnvService) {
        return new AuthInterceptor(router, env);
      },
      multi: true,
      deps: [Router,EnvService],
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
