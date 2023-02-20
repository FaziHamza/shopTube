import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormlyWrapperRow } from './zorro/wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { FormlyHorizontalWrapper } from './wrappers/FormlyHorizontalWrapper';
import { FormlyVerticalWrapper } from './wrappers/FormlyVerticalWrapper';
import { FormlyVerticalThemeWrapper } from './wrappers/FormlyVerticalThemeWrapper';
import { formlyCustomeConfig } from './formlyConfig';
import { MenuComponent } from './menu/menu.component';
import { NgZorroAntdModule } from './zorro/ng-zorro-antd.module';
import { AppSideMenuComponent } from './_layout/app-side-menu/app-side-menu.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { NgxMaskModule } from 'ngx-mask';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { SettingOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { MainComponent } from './main/main.component';
import { MultiFileUploadComponent } from './components/multi-file-upload/multi-file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SalesCardComponent } from './components/sales-card/sales-card.component';
import { HeadingComponent } from './components/heading/heading.component';
import { SanitizePipe } from './pipe';
import { BlockButtonsCardComponent } from './components/block-buttons-card/block-buttons-card.component';
import { ProgressbarsComponent } from './components/progressbars/progressbars.component';
import { DividerComponent } from './components/divider/divider.component';
import { VideosComponent } from './components/videos/videos.component';
import { NewAlertsComponent } from './components/new-alerts/new-alerts.component';
import { SwitchComponent } from './components/switch/switch.component';
import { FormlyFieldCustomInputComponent } from './wrappers/formly-field-custom-input.component';
import { SimpleCardWithHeaderBodyFooterComponent } from './components/simple-card-with-header-body-footer/simple-card-with-header-body-footer.component';
import { AccordionButtonComponent } from './components/accordion-button/accordion-button.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

// export function createTranslateLoader(http: HttpClient): any {
//   return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    FormlyWrapperRow,
    PagesComponent,
    HomePageComponent,
    FormlyHorizontalWrapper,
    FormlyVerticalWrapper,
    FormlyVerticalThemeWrapper,
    FormlyFieldCustomInputComponent,
    MenuComponent,
    AppSideMenuComponent,
    SiteLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    MainComponent,
    MultiFileUploadComponent,
    SalesCardComponent,
    HeadingComponent,
    SanitizePipe,
    BlockButtonsCardComponent,
    ProgressbarsComponent,
    DividerComponent,
    VideosComponent,
    NewAlertsComponent,
    SwitchComponent,
    SimpleCardWithHeaderBodyFooterComponent,
    AccordionButtonComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    NgxMaskModule.forRoot(),
    FormlyModule.forRoot(formlyCustomeConfig),
    // FormlyModule.forRoot({
    //   validationMessages: [{ name: 'required', message: 'This field is required' }],
    // }),
    // FormlyModule.forRoot({
    //   types: [
    //     { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
    //   ],
    // }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDropzoneModule,
    // NzIconModule.forRoot([ SettingOutline  ]),
    FormlyModule.forRoot(formlyCustomeConfig),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
