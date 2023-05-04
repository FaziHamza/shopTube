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
import { MenuComponent } from './menu/menu.component';
import { NgZorroAntdModule } from './zorro/ng-zorro-antd.module';
import { AppSideMenuComponent } from './_layout/app-side-menu/app-side-menu.component';
import { AppBuilderSideMenuComponent } from './_layout/app-builder-side-menu/app-builder-side-menu.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
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
import { LayoutButtonComponent } from './_layout/layout-button/layout-button.component';
import { LayoutTabsComponent } from './_layout/layout-tabs/layout-tabs.component';
import { LayoutDrawerComponent } from './_layout/layout-drawer/layout-drawer.component';

import { CommonModule } from '@angular/common';
import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { SideMenuBuildComponent } from './menu-builder/side-menu-build/side-menu-build.component';
import { ScreenBuilderComponent } from './Builder-module/screen-builder/screen-builder.component';
import { ApplicationBuilderComponent } from './Builder-module/application-builder/application-builder.component';
import { ModuleListComponent } from './Builder-module/module-list/module-list.component';
import { LayoutTabsDropdownComponent } from './_layout/layout-tabs-dropdown/layout-tabs-dropdown.component';
import { ShareModule } from './shared/share.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GoogleChartsModule } from 'angular-google-charts';
import { ContextMenuModule } from 'ngx-contextmenu';

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
    ScreenBuilderComponent,
    ModuleListComponent,
    LayoutTabsDropdownComponent,
    MenuComponent,
    AppSideMenuComponent,
    AppBuilderSideMenuComponent,
    SiteLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    ApplicationBuilderComponent,
    FormlyFieldStepper,
    LoginComponent,
    RegisterComponent,
    MenuBuilderComponent,
    LayoutTabsComponent,
    LayoutDrawerComponent,
    LayoutButtonComponent,
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
    ContextMenuModule.forRoot()
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
