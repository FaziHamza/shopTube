// peer.service.ts
import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private peer: Peer;

  constructor() {
    // Replace the apiKey with your PeerJS API key (if required)
    this.peer = new Peer({ key: 'your-peerjs-api-key', debug: 3 });
    this.peer = new Peer({});

    this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });
  }

  getPeerId(): string {
    return this.peer.id;
  }

  connectToPeer(peerId: string): any {
    return this.peer.connect(peerId);
  }

  makeCall(peerId: string, stream: MediaStream): any {
    return this.peer.call(peerId, stream);
  }

  onCall(callHandler: (call: any) => void): void {
    this.peer.on('call', callHandler);
  }

  onConnection(connectionHandler: (connection: any) => void): void {
    this.peer.on('connection', connectionHandler);
  }

}
