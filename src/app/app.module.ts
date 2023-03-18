import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { fieldComponents, formlyCustomeConfig } from './formlyConfig';
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
// import { SwitchComponent } from './components/switch/switch.component';
import { SimpleCardWithHeaderBodyFooterComponent } from './components/simple-card-with-header-body-footer/simple-card-with-header-body-footer.component';
import { AccordionButtonComponent } from './components/accordion-button/accordion-button.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BuilderToaterComponent } from './components/builder-toater/builder-toater.component';
import { RangInputsComponent } from './components/rang-inputs/rang-inputs.component';
import { CarouselCrossfadeCardComponent } from './components/carousel-crossfade-card/carousel-crossfade-card.component';
import { TimelineBuilderComponent } from './components/timeline-builder/timeline-builder.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FormlyFieldStepper } from './wrappers/FormlyFieldStepper';
import { InvoiceTemplateComponent } from './components/invoice-template/invoice-template.component';
import { AudioComponent } from './components/audio/audio.component';
import { RateComponent } from './components/rate/rate.component';
import { TableComponent } from './components/table/table.component';
import { AffixComponent } from './components/affix/affix.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { TreeSelectComponent } from './components/tree-select/tree-select.component';
import { CascaderComponent } from './components/cascader/cascader.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CommentComponent } from './components/comment/comment.component';
import { ModalComponent } from './components/modal/modal.component';
import { PopconfirmComponent } from './components/popconfirm/popconfirm.component';
import { BuilderComponent } from './builder/builder.component';
import { AngularSplitModule } from 'angular-split';
import { GenericFieldComponent } from './builder/generic-field/generic-field.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { BusinessRuleGridComponent } from './builder/configurations/business-rule-grid/business-rule-grid.component';
import { ActionRuleComponent } from './builder/configurations/action-rule/action-rule.component';
import { BusinessRuleComponent } from './builder/configurations/business-rule/business-rule.component';
import { ValidationRuleComponent } from './builder/configurations/validation-rule/validation-rule.component';
import { UIRuleComponent } from './builder/configurations/uirule/uirule.component';
import { DescriptionComponent } from './components/description/description.component';
import { ResultComponent } from './components/result/result.component';
import { AnchorComponent } from './components/anchor/anchor.component';
import { BackTopComponent } from './components/back-top/back-top.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ListComponent } from './components/list/list.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { MentionComponent } from './components/mention/mention.component';
import { MessageComponent } from './components/message/message.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LayoutButtonComponent } from './_layout/layout-button/layout-button.component';
import { LayoutTabsComponent } from './_layout/layout-tabs/layout-tabs.component';
import { LayoutDrawerComponent } from './_layout/layout-drawer/layout-drawer.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { BadgeComponent } from './components/badge/badge.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StepperComponent } from './components/stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './components/tree/tree.component';
import { InputWrapperComponent } from './wrappers/input-wrapper/input-wrapper.component';
import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { SideMenuBuildComponent } from './menu-builder/side-menu-build/side-menu-build.component';
import { ScreenBuilderComponent } from './Builder-module/screen-builder/screen-builder.component';
import { ApplicationBuilderComponent } from './Builder-module/application-builder/application-builder.component';
import { ModuleListComponent } from './Builder-module/module-list/module-list.component';

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
    PagesComponent,
    HomePageComponent,
    fieldComponents,
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
    // SwitchComponent,
    SimpleCardWithHeaderBodyFooterComponent,
    AccordionButtonComponent,
    BuilderToaterComponent,
    RangInputsComponent,
    CarouselCrossfadeCardComponent,
    TimelineBuilderComponent,
    TabsComponent,
    FormlyFieldStepper,
    InvoiceTemplateComponent,
    AudioComponent,
    LoginComponent,
    RegisterComponent,
    RateComponent,
    TableComponent,
    AffixComponent,
    BreadCrumbComponent,
    TransferComponent,
    TreeSelectComponent,
    CascaderComponent,
    AvatarComponent,
    CommentComponent,
    ModalComponent,
    BuilderComponent,
    GenericFieldComponent,
    BusinessRuleGridComponent,
    ActionRuleComponent,
    BusinessRuleComponent,
    ValidationRuleComponent,
    UIRuleComponent,
    PopconfirmComponent,
    DescriptionComponent,
    ResultComponent,
    AnchorComponent,
    BackTopComponent,
    StatisticComponent,
    DrawerComponent,
    SkeletonComponent,
    EmptyComponent,
    ListComponent,
    TreeViewComponent,
    MentionComponent,
    MessageComponent,
    NotificationComponent,
    LayoutButtonComponent,
    LayoutTabsComponent,
    LayoutDrawerComponent,
    DynamicTableComponent,
    BadgeComponent,
    StepperComponent,
    TreeComponent,
    MenuBuilderComponent,
    SideMenuBuildComponent,
    ScreenBuilderComponent,
    ApplicationBuilderComponent,
    ModuleListComponent,
    // InputWrapperComponent,
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
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDropzoneModule,
    DragDropModule


    // NzIconModule.forRoot([ SettingOutline  ]),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
