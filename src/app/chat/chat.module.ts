import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularSplitModule } from "angular-split";
import { NgJsonEditorModule } from "ang-jsoneditor";
import { FormlyNgZorroAntdModule } from "@ngx-formly/ng-zorro-antd";
import { NgxMaskModule } from "ngx-mask";
import { FormlyModule } from "@ngx-formly/core";
import { CommonModule } from "@angular/common";
import { GoogleChartsModule } from "angular-google-charts";
import { ContextMenuModule } from "@perfectmemory/ngx-contextmenu";
import { NgZorroAntdModule } from "src/app/zorro/ng-zorro-antd.module";
import { ShareModule } from "src/app/shared/share.module";
import { ChatRoutingModule } from "./chat.routing";
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { ProfileService } from "./services/profile.service";
import { OneOnOneChatComponent } from './components/one-on-one-chat/one-on-one-chat.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { AudioVideoCallComponent } from './components/audio-video-call/audio-video-call.component';
import { formlyCustomeConfig } from "../formlyConfig";
import { BuilderRoutingModule } from "../builder/builder-routing.module";
import { BuilderShareModule } from "../shared/builder-share.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ChatComponent } from "./chat/chat.component";
import { ProfileComponent } from "./components/profile/profile.component";

@NgModule({
    declarations: [
        FriendListComponent,
        GroupListComponent,
        FriendRequestsComponent,
        OneOnOneChatComponent,
        GroupChatComponent,
        AttachmentComponent,
        AudioVideoCallComponent, 
        ChatComponent,ProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularSplitModule,
        NgJsonEditorModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        FormlyNgZorroAntdModule,
        NgxMaskModule.forRoot(),
        FormlyModule.forRoot(formlyCustomeConfig),
        ChatRoutingModule,
        // BuilderRoutingModule,
        BuilderShareModule,
        ShareModule,
        GoogleChartsModule,
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
    ],

    // providers: [ProfileService],
})


export class ChatAppModule { }