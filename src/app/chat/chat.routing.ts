import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { FriendListComponent } from "./components/friend-list/friend-list.component";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { FriendRequestsComponent } from "./components/friend-requests/friend-requests.component";
import { OneOnOneChatComponent } from "./components/one-on-one-chat/one-on-one-chat.component";
import { GroupChatComponent } from "./components/group-chat/group-chat.component";

const routes: Routes = [
  {
    path: "",
    component: ChatComponent,
    children: [
      {
        path: "",
        component: ProfileComponent
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'friends', component: FriendListComponent },
      { path: 'groups', component: GroupListComponent },
      { path: 'friend-requests', component: FriendRequestsComponent },
      { path: 'one-on-one-chat/:userId', component: OneOnOneChatComponent },
      { path: 'group-chat/:groupId', component: GroupChatComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
