// nats.service.ts
import { Injectable } from '@angular/core';
import { connect, NatsConnection, StringCodec, Subscription } from 'nats.ws';

@Injectable({
  providedIn: 'root'
})
export class NatsService {
  private nc!: NatsConnection;
  private sc = StringCodec();

  async connectToNats(serverUrl: string): Promise<void> {
    if (!this.nc) {
      this.nc = await connect({ servers: ['ws://172.23.0.5:9090'] });
      // this.nc.publish(`getalltitlebasicV1`,"get");

    }
  }

  subscribeToSubject(subject: string, callback: (error: Error | null, data: any) => void): Subscription {
    debugger
    return this.nc.subscribe(subject, {
      callback: (err, msg) => {
        if (err) {
          callback(err, null);
        } else {
          const data = this.sc.decode(msg.data);
          callback(null, (data));
        }
      }
    });
  }

  publishMessage(subject: string, message: string) {
    // this.nc.publish(`getalltitlebasicV1`,"get");
    this.nc.publish(subject, this.sc.encode(message));
  
  }

  closeConnection(): void {
    if (this.nc) {
      this.nc.close();
    }
  }
}
