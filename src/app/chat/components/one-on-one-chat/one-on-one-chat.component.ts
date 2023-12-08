import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { PeerService } from '../../services/peer.service';

@Component({
  selector: 'st-one-on-one-chat',
  templateUrl: './one-on-one-chat.component.html',
  styleUrls: ['./one-on-one-chat.component.scss']
})
export class OneOnOneChatComponent {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private websocketService: WebsocketService, private peerService: PeerService) {}

  ngOnInit(): void {
    // Subscribe to WebSocket for text messages
    this.websocketService.receiveMessage().subscribe((message) => {
      // Handle new messages received through WebSocket
      this.messages.push(message);
    });

    // Handle incoming audio/video call
    this.peerService.onCall((call) => {
      // Handle incoming call, for example, display a notification
    });
  }

  sendMessage(message: string): void {
    // Send the message via WebSocket
    this.websocketService.sendMessage({ content: message, sender: 'User1' });
  }

  initiateCall(peerId: string): void {
    // Initiate audio/video call
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = this.peerService.makeCall(peerId, stream);
        // Handle the call, for example, start streaming video
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  }
}
