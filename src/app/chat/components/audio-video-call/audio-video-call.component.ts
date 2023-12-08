import { Component } from '@angular/core';
import { PeerService } from '../../services/peer.service';

@Component({
  selector: 'st-audio-video-call',
  templateUrl: './audio-video-call.component.html',
  styleUrls: ['./audio-video-call.component.scss']
})
export class AudioVideoCallComponent {
  constructor(private peerService: PeerService) {}

  ngOnInit(): void {
    this.peerService.onCall((call) => {
      // Handle incoming call
    });
  }

  startCall(): void {
    const peerId = 'remote-peer-id'; // Replace with the actual remote peer ID
    const call = this.peerService.connectToPeer(peerId);

    // Handle the call, e.g., set up audio/video streams
  }
}
