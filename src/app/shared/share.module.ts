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
  ButtonsComponent, BoardComponent, DetailComponent, SummaryComponent, ContextMenuComponent,  ListsComponent, ContentEditDirective, HtmlBlockComponent,
  BarChartComponent,PieChartComponent,BubbleChartComponent,CandlestickChartComponent,ColumnChartComponent,GanttChartComponent,
  GeoChartComponent, HistogramChartComponent,LineChartComponent, SankeyChartComponent,ScatterChartComponent,
  TimelineChartComponent,AreaChartComponent,ComboChartComponent,SteppedAreaChartComponent ,OrgChartComponent,TableChartComponent,ListWithComponentsComponent,TreeMapComponent,
  CardWithComponentsComponent,CommentModalComponent, CommentListComponent,MenuControllComponent,PrintInvoiceComponent,FileManagerComponent,googleMapComponent,
  TaskReportComponent,ContactListComponent

} from '../components'
import { SanitizePipe } from '../pipe/sanitize.pipe';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BusinessRuleGridComponent } from '../builder/configurations/business-rule-grid/business-rule-grid.component';
import { EditorJsWrapperComponent } from '../wrappers/editor/editor-js-wrapper/editor-js-wrapper.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { MenuComponent } from '../menu/menu.component';
import { SiteLayoutComponent,  LayoutTabsComponent,
  AppSideMenuComponent,LayoutDrawerComponent,LayoutTabsDropdownComponent,
  LayoutButtonComponent} from '../_layout';
import {MainsComponent,PageComponent,SectionsComponent} from '../context-menu/index'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GoogleMapsModule } from '@angular/google-maps';
import { ErrorComponent } from 'src/common/error/error.component';
import { CommonService } from '../../common/common-services/common.service';
import { ConfigurableDirective } from 'src/directive/configuration.directive';
import { ConfigurableSelectDirective } from 'src/directive/configuration-select.directive';
import { ParentCalendarComponent } from '../components/parent-calendar/parent-calendar.component';
import { AudioRecordingService } from '../services/audio-recording.service';
import { VideoRecordingService } from '../services/video-recording.service';
import { VoiceRecorderComponent } from '../components/voice-recorder/voice-recorder.component';
import { DownloadbuttonComponent } from '../components/downloadbutton/downloadbutton.component';
import { QrCodeComponent } from '../components/qr-code/qr-code.component';
import { ApplicationThemeComponent } from '../Builder-module/application-theme/application-theme.component';
import { CreateControlComponent } from '../Builder-module/create-control/create-control.component';
import { SupportChatComponent } from '../admin/support-chat/support-chat.component';
import { PdfComponent } from '../components/pdf/pdf.component';
import { EmailComponent } from '../components/email/email.component';
import { TaskManagerComponent } from '../components/task-manager/task-manager.component';
// import { CommonService } from './common.service';
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
      GoogleMapsModule,
      ContextMenuModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http, './assets/i18n/', '.json');
          },
          deps: [HttpClient]
        }
      }),
      // WebsiteModules,
    ],
  declarations: [
    GenericFieldComponent,
    PagesComponent,
    MainComponent,
    BusinessRuleGridComponent,
    AccordionButtonComponent, AffixComponent, AnchorComponent, AudioComponent, AvatarComponent, BackTopComponent, BadgeComponent,
    BlockButtonsCardComponent, BreadCrumbComponent, BuilderToaterComponent, CarouselCrossfadeCardComponent, CascaderComponent, CommentComponent, DescriptionComponent,
    DividerComponent, DrawerComponent, DynamicTableComponent, DynamicTableRepeatSectionComponent, EmptyComponent, HeadingComponent,
    InvoiceTemplateComponent, ListComponent, MentionComponent, MessageComponent, ModalComponent, MultiFileUploadComponent, NewAlertsComponent,
    NotificationComponent, ParagraphComponent, PopconfirmComponent, ProgressbarsComponent, RangInputsComponent, RateComponent, ResultComponent,
    SalesCardComponent, SimpleCardWithHeaderBodyFooterComponent, SkeletonComponent, StatisticComponent, StepperComponent, SwitchComponent, TableComponent,
    TabsComponent, TimelineBuilderComponent, TransferComponent, TreeComponent, TreeSelectComponent, TreeViewComponent, VideosComponent, CalendarComponent,ParentCalendarComponent,
    SanitizePipe, IconComponent, ButtonsComponent,
    EditorJsWrapperComponent,
    BoardComponent, DetailComponent, SummaryComponent, ContextMenuComponent,  ListsComponent, HtmlBlockComponent,
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
    AppSideMenuComponent,LayoutTabsDropdownComponent,SiteLayoutComponent,LayoutTabsComponent,LayoutDrawerComponent,LayoutButtonComponent,
    MenuComponent,
    MainsComponent,PageComponent,SectionsComponent,
    CommentModalComponent,CommentListComponent,
    MenuControllComponent,
    PrintInvoiceComponent,FileManagerComponent,googleMapComponent,
    ConfigurableDirective,
    ConfigurableSelectDirective,
    TaskReportComponent,VoiceRecorderComponent,
    DownloadbuttonComponent,QrCodeComponent,ApplicationThemeComponent,CreateControlComponent,
    SupportChatComponent,ContactListComponent,
    PdfComponent,EmailComponent,TaskManagerComponent
    //
    // ErrorComponent
  ],
  exports: [
    FormsModule,
    GenericFieldComponent,
    PagesComponent,
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
    AppSideMenuComponent,LayoutTabsDropdownComponent,SiteLayoutComponent,LayoutTabsComponent,LayoutDrawerComponent,LayoutButtonComponent,
    MenuComponent,
    MainsComponent,PageComponent,SectionsComponent,
    CommentModalComponent,CommentListComponent,
    MenuControllComponent,
    PrintInvoiceComponent,FileManagerComponent,googleMapComponent,
    ConfigurableDirective,
    ConfigurableSelectDirective,
    TaskReportComponent,
    ParentCalendarComponent,
    VoiceRecorderComponent,
    DownloadbuttonComponent,QrCodeComponent,ApplicationThemeComponent,CreateControlComponent,
    SupportChatComponent,ContactListComponent,
    PdfComponent,EmailComponent,TaskManagerComponent
    //
    // ErrorComponent
  ],
  providers: [
    AudioRecordingService, 
    VideoRecordingService,
  ],
})

export class ShareModule {

}
