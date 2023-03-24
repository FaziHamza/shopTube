import { AppRoutingModule } from './../app-routing.module';
import { PagesComponent } from './../pages/pages.component';
import { NgModule, Component } from '@angular/core';
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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MainComponent } from '../main/main.component';
import {
  AccordionButtonComponent, AffixComponent, AnchorComponent, AudioComponent, AvatarComponent, BackTopComponent, BadgeComponent,
  BlockButtonsCardComponent, BreadCrumbComponent, BuilderToaterComponent, CarouselCrossfadeCardComponent, CascaderComponent, CommentComponent, DescriptionComponent,
  DividerComponent, DrawerComponent, DynamicTableComponent, DynamicTableRepeatSectionComponent, EmptyComponent, HeadingComponent,
  InvoiceTemplateComponent, ListComponent, MentionComponent, MessageComponent, ModalComponent, MultiFileUploadComponent, NewAlertsComponent,
  NotificationComponent, ParagraphComponent, PopconfirmComponent, ProgressbarsComponent, RangInputsComponent, RateComponent, ResultComponent,
  SalesCardComponent, SimpleCardWithHeaderBodyFooterComponent, SkeletonComponent, StatisticComponent, StepperComponent, SwitchComponent, TableComponent,
  TabsComponent, TimelineBuilderComponent, TransferComponent, TreeComponent, TreeSelectComponent, TreeViewComponent, VideosComponent,
} from '../components'
import { SanitizePipe } from '../pipe/sanitize.pipe';
import { RouterModule } from '@angular/router';

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
      NgxDropzoneModule,
      DragDropModule,
      RouterModule,
    ],
  declarations: [
    GenericFieldComponent,
    PagesComponent,
    MainComponent,
    AccordionButtonComponent, AffixComponent, AnchorComponent, AudioComponent, AvatarComponent, BackTopComponent, BadgeComponent,
    BlockButtonsCardComponent, BreadCrumbComponent, BuilderToaterComponent, CarouselCrossfadeCardComponent, CascaderComponent, CommentComponent, DescriptionComponent,
    DividerComponent, DrawerComponent, DynamicTableComponent, DynamicTableRepeatSectionComponent, EmptyComponent, HeadingComponent,
    InvoiceTemplateComponent, ListComponent, MentionComponent, MessageComponent, ModalComponent, MultiFileUploadComponent, NewAlertsComponent,
    NotificationComponent, ParagraphComponent, PopconfirmComponent, ProgressbarsComponent, RangInputsComponent, RateComponent, ResultComponent,
    SalesCardComponent, SimpleCardWithHeaderBodyFooterComponent, SkeletonComponent, StatisticComponent, StepperComponent, SwitchComponent, TableComponent,
    TabsComponent, TimelineBuilderComponent, TransferComponent, TreeComponent, TreeSelectComponent, TreeViewComponent, VideosComponent,
    SanitizePipe,
  ],
  exports: [
    FormsModule,
    GenericFieldComponent,
    PagesComponent,
    MainComponent,
    AccordionButtonComponent, AffixComponent, AnchorComponent, AudioComponent, AvatarComponent, BackTopComponent, BadgeComponent,
    BlockButtonsCardComponent, BreadCrumbComponent, BuilderToaterComponent, CarouselCrossfadeCardComponent, CascaderComponent, CommentComponent, DescriptionComponent,
    DividerComponent, DrawerComponent, DynamicTableComponent, DynamicTableRepeatSectionComponent, EmptyComponent, HeadingComponent,
    InvoiceTemplateComponent, ListComponent, MentionComponent, MessageComponent, ModalComponent, MultiFileUploadComponent, NewAlertsComponent,
    NotificationComponent, ParagraphComponent, PopconfirmComponent, ProgressbarsComponent, RangInputsComponent, RateComponent, ResultComponent,
    SalesCardComponent, SimpleCardWithHeaderBodyFooterComponent, SkeletonComponent, StatisticComponent, StepperComponent, SwitchComponent, TableComponent,
    TabsComponent, TimelineBuilderComponent, TransferComponent, TreeComponent, TreeSelectComponent, TreeViewComponent, VideosComponent,
  ],
  providers: [
  ],
})

export class ShareModule {

}