import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    debugger
    this.socket = io(environment.socketBackUrl)
  }

  sendMessage(message: any): void {
    this.socket.send(message);
  }

  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  sendFriendRequest(request: any): void {
    this.socket.emit('friend-request', { request });
  }

  receiveFriendRequest(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('friend-request', (data: any) => observer.next(data));
    });
  }

  on(event: string): Observable<any> {
    debugger
    return new Observable((observer) => {
      this.socket.on(event, (data: any) => observer.next(data));
    });
  }

  emit(event: string, data: any): void {
    debugger
    this.socket.emit(event, data);
  }
}
