import { PagesComponent } from './../pages/pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericFieldComponent } from '../builder/generic-field/generic-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { formlyCustomeConfig } from '../formlyConfig';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { NgxMaskModule } from 'ngx-mask';
import { NgZorroAntdModule } from '../zorro/ng-zorro-antd.module';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AngularSplitModule } from 'angular-split';
import { MainComponent } from '../main/main.component';
import { ContextMenuModule } from "@perfectmemory/ngx-contextmenu";
import {
  AccordionButtonComponent, AffixComponent, AnchorComponent, AudioComponent, AvatarComponent, BackTopComponent, BadgeComponent,
  BlockButtonsCardComponent, BreadCrumbComponent, BuilderToaterComponent, CarouselCrossfadeCardComponent, CascaderComponent, CommentComponent, DescriptionComponent,
  DividerComponent, DrawerComponent, DynamicTableComponent, DynamicTableRepeatSectionComponent, EmptyComponent, HeadingComponent,
  InvoiceTemplateComponent, ListComponent, MentionComponent, MessageComponent, ModalComponent, MultiFileUploadComponent, NewAlertsComponent,
  NotificationComponent, ParagraphComponent, PopconfirmComponent, ProgressbarsComponent, RangInputsComponent, RateComponent, ResultComponent,
  SalesCardComponent, SimpleCardWithHeaderBodyFooterComponent, SkeletonComponent, StatisticComponent, StepperComponent, SwitchComponent, TableComponent,
  TabsComponent, TimelineBuilderComponent, TransferComponent, TreeComponent, TreeSelectComponent, TreeViewComponent, VideosComponent, CalendarComponent, IconComponent,
  ButtonsComponent, BoardComponent, DetailComponent, SummaryComponent, ContextMenuComponent, HeaderComponent, ListsComponent, ContentEditDirective, HtmlBlockComponent,
  BarChartComponent,PieChartComponent,BubbleChartComponent,CandlestickChartComponent,ColumnChartComponent,GanttChartComponent,
  GeoChartComponent, HistogramChartComponent,LineChartComponent, SankeyChartComponent,ScatterChartComponent,
  TimelineChartComponent,AreaChartComponent,ComboChartComponent,SteppedAreaChartComponent ,OrgChartComponent,TableChartComponent,ListWithComponentsComponent,TreeMapComponent,
  CardWithComponentsComponent,CommentModalComponent, CommentListComponent,DemoLayotPageComponent

} from '../components'
import { SanitizePipe } from '../pipe/sanitize.pipe';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BusinessRuleGridComponent } from '../builder/configurations/business-rule-grid/business-rule-grid.component';
import { EditorJsWrapperComponent } from '../wrappers/editor/editor-js-wrapper/editor-js-wrapper.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { MenuComponent } from '../menu/menu.component';
import { SiteFooterComponent, SiteHeaderComponent, SiteLayoutComponent,  LayoutTabsComponent,
  AppSideMenuComponent,LayoutDrawerComponent,LayoutTabsDropdownComponent,
  LayoutButtonComponent, WebsiteMenuComponent} from '../_layout';
import {MainsComponent,PageComponent,SectionsComponent} from '../context-menu/index'
import { WebMenuComponent } from '../Website/web-menu/web-menu.component';
import { WebisteHeaderComponent } from '../Website/webiste-header/webiste-header.component';
import { WebsitePricingComponent } from '../Website/website-pricing/website-pricing.component';
import { Layout1Component } from '../admin/layout1/layout1.component';
// import { WebsiteModules } from '../Website/website.module';

@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      AngularSplitModule,
      NgJsonEditorModule,
      NgZorroAntdModule,
      ReactiveFormsModule,
      FormlyNgZorroAntdModule,
      NgxMaskModule.forRoot(),
      FormlyModule.forRoot(formlyCustomeConfig),
      FullCalendarModule,
      RouterModule,
      GoogleChartsModule,
      ContextMenuModule,
      // WebsiteModules,
    ],
  declarations: [
    GenericFieldComponent,
    Layout1Component,
    PagesComponent,
    MainComponent,
    BusinessRuleGridComponent,
    AccordionButtonComponent, AffixComponent, AnchorComponent, AudioComponent, AvatarComponent, BackTopComponent, BadgeComponent,
    BlockButtonsCardComponent, BreadCrumbComponent, BuilderToaterComponent, CarouselCrossfadeCardComponent, CascaderComponent, CommentComponent, DescriptionComponent,
    DividerComponent, DrawerComponent, DynamicTableComponent, DynamicTableRepeatSectionComponent, EmptyComponent, HeadingComponent,
    InvoiceTemplateComponent, ListComponent, MentionComponent, MessageComponent, ModalComponent, MultiFileUploadComponent, NewAlertsComponent,
    NotificationComponent, ParagraphComponent, PopconfirmComponent, ProgressbarsComponent, RangInputsComponent, RateComponent, ResultComponent,
    SalesCardComponent, SimpleCardWithHeaderBodyFooterComponent, SkeletonComponent, StatisticComponent, StepperComponent, SwitchComponent, TableComponent,
    TabsComponent, TimelineBuilderComponent, TransferComponent, TreeComponent, TreeSelectComponent, TreeViewComponent, VideosComponent, CalendarComponent,
    SanitizePipe, IconComponent, ButtonsComponent, EditorJsWrapperComponent,
    BoardComponent, DetailComponent, SummaryComponent, ContextMenuComponent, HeaderComponent, ListsComponent, HtmlBlockComponent,
    ContentEditDirective, BarChartComponent,PieChartComponent,BubbleChartComponent,CandlestickChartComponent,ColumnChartComponent,
    GanttChartComponent,GeoChartComponent, HistogramChartComponent,LineChartComponent,
    SankeyChartComponent,AreaChartComponent,ComboChartComponent,SteppedAreaChartComponent,
    ScatterChartComponent,
    TimelineChartComponent,
    OrgChartComponent,
    TableChartComponent,
    ListWithComponentsComponent,
    TreeMapComponent,
    CardWithComponentsComponent,
    AppSideMenuComponent,LayoutTabsDropdownComponent,SiteLayoutComponent,SiteFooterComponent,SiteHeaderComponent,LayoutTabsComponent,LayoutDrawerComponent,LayoutButtonComponent,
    MenuComponent,
    MainsComponent,PageComponent,SectionsComponent,
    CommentModalComponent,CommentListComponent,WebsiteMenuComponent,
    WebMenuComponent,WebisteHeaderComponent,WebsitePricingComponent,DemoLayotPageComponent
  ],
  exports: [
    FormsModule,
    GenericFieldComponent,
    PagesComponent,
    Layout1Component,
    MainComponent,
    BusinessRuleGridComponent,
    AccordionButtonComponent, AffixComponent, AnchorComponent, AudioComponent, AvatarComponent, BackTopComponent, BadgeComponent,
    BlockButtonsCardComponent, BreadCrumbComponent, BuilderToaterComponent, CarouselCrossfadeCardComponent, CascaderComponent, CommentComponent, DescriptionComponent,
    DividerComponent, DrawerComponent, DynamicTableComponent, DynamicTableRepeatSectionComponent, EmptyComponent, HeadingComponent,
    InvoiceTemplateComponent, ListComponent, MentionComponent, MessageComponent, ModalComponent, MultiFileUploadComponent, NewAlertsComponent,
    NotificationComponent, ParagraphComponent, PopconfirmComponent, ProgressbarsComponent, RangInputsComponent, RateComponent, ResultComponent,
    SalesCardComponent, SimpleCardWithHeaderBodyFooterComponent, SkeletonComponent, StatisticComponent, StepperComponent, SwitchComponent, TableComponent,
    TabsComponent, TimelineBuilderComponent, TransferComponent, TreeComponent, TreeSelectComponent, TreeViewComponent, VideosComponent, IconComponent, ButtonsComponent,
    EditorJsWrapperComponent,
    BoardComponent,
    DetailComponent,
    SummaryComponent,
    ContextMenuComponent,
    HeaderComponent,
    ListsComponent,
    ContentEditDirective,
    EditorJsWrapperComponent,
    HtmlBlockComponent,
    BarChartComponent,
    PieChartComponent,
    BubbleChartComponent,
    CandlestickChartComponent,
    ColumnChartComponent,
    GanttChartComponent,
    GeoChartComponent,
    GeoChartComponent,
    HistogramChartComponent,
    LineChartComponent,
    SankeyChartComponent,
    ScatterChartComponent,
    TimelineChartComponent,
    OrgChartComponent,
    TableChartComponent,
    AreaChartComponent,
    ComboChartComponent,
    SteppedAreaChartComponent,
    ListWithComponentsComponent,
    TreeMapComponent,
    CardWithComponentsComponent,
    AppSideMenuComponent,LayoutTabsDropdownComponent,SiteLayoutComponent,SiteFooterComponent,SiteHeaderComponent,LayoutTabsComponent,LayoutDrawerComponent,LayoutButtonComponent,
    MenuComponent,
    MainsComponent,PageComponent,SectionsComponent,
    CommentModalComponent,CommentListComponent,WebsiteMenuComponent,
    WebMenuComponent,WebisteHeaderComponent,WebsitePricingComponent,DemoLayotPageComponent
  ],
  providers: [
  ],
})

export class ShareModule {

}
