import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'st-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss']
})
export class FriendRequestsComponent {
  incomingRequests: any[] = [];

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    // Subscribe to events
    this.websocketService.on('newMessage').subscribe((data) => {
      console.log('New Message:', data);
    });

    this.websocketService.on('friendRequest').subscribe((data) => {
      console.log('Friend Request:', data);
    });
    this.websocketService.receiveFriendRequest().subscribe((request) => {
      // Handle incoming friend requests
      this.incomingRequests.push(request);
    });
  }
  sendMessage(): void {
    // Emit a new message event
    this.websocketService.emit('newMessage', { content: 'Hello, world!' });
  }
  acceptRequest(request: any): void {
    // Implement logic to accept the friend request
    // For example, you may send a response to the server
    // and update the UI accordingly
  }

  declineRequest(request: any): void {
    // Implement logic to decline the friend request
    // For example, you may send a response to the server
    // and update the UI accordingly
  }
}
