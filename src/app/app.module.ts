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
// import { MultiFileUploadWrapperComponent } from './wrappers/multi-file-upload-wrapper/multi-file-upload-wrapper.component';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { DataService } from './services/offlineDb.service';
import { AudioRecordingService } from './services/audio-recording.service';
import { VideoRecordingService } from './services/video-recording.service';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { MsalModule, MsalInterceptor, MsalInterceptorConfiguration, MsalGuardConfiguration, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService, MsalRedirectComponent } from "@azure/msal-angular";
import { BrowserCacheLocation, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';

export const protectedResourceMap: any = [
  [environment.nestBaseUrl, environment.scopeUri],
];


export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: '/',
      postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.apiConfig.uri, environment.apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes]
    },
    loginFailedRoute: '/login-failed'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    fieldComponents,
    FormlyFieldStepper,
    RegisterComponent,
    MapComponent,
    MenuBulkUpdateComponent,
    Screenv1Component,
    TableRowComponent,
    // MultiFileUploadWrapperComponent,
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
    FormlyNgZorroAntdModule,
    NgxMaskModule.forRoot(),
    FormlyModule.forRoot(formlyCustomeConfig),
    FullCalendarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ShareModule,
    GoogleChartsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
    OAuthModule.forRoot(),
    MsalModule
  
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
    DataService,
    AudioRecordingService, 
    VideoRecordingService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (router: Router, env: EnvService) {
        return new AuthInterceptor(router, env);
      },
      multi: true,
      deps: [Router, EnvService],
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService

  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule { }
