import { Component } from '@angular/core';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'st-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent {
  userId = '';


  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;
    this.getFriendRequestList();
  }

  keyword: string = '';
  matchingFriends: any[] = [];
  friendRequests: any[] = [];
  constructor(private friendService: FriendService) { }

  sendFriendRequest(targetUserId: string): void {
    this.friendService.sendFriendRequest(targetUserId).subscribe(
      () => {
        console.log('Friend request sent successfully');
      },
      (error) => {
        console.error('Error sending friend request:', error);
      }
    );
  }
  getFriendRequestList(): void {
    this.friendService.getFriendRequestList().subscribe(
      (res) => {
        if(res.isSuccess){
          this.friendRequests = res.data;
        }
      },
      (error) => {
        console.error('Error sending friend request:', error);
      }
    );
  }

  acceptFriendRequest(requestId: string): void {
    this.friendService.acceptFriendRequest(requestId).subscribe(
      () => {
        console.log('Friend request accepted successfully');
      },
      (error) => {
        console.error('Error accepting friend request:', error);
      }
    );
  }

  rejectFriendRequest(requestId: string): void {
    this.friendService.rejectFriendRequest(requestId).subscribe(
      () => {
        console.log('Friend request rejected successfully');
      },
      (error) => {
        console.error('Error rejecting friend request:', error);
      }
    );
  }

  searchFriends(): void {
    this.friendService.searchFriends(this.keyword).subscribe(
      (friends) => {
        this.matchingFriends = friends['data'];
      },
      (error) => {
        console.error('Error searching for friends:', error);
      }
    );
  }
}
