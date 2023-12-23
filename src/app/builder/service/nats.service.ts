// nats.service.ts
import { Injectable } from '@angular/core';
import { connect, NatsConnection, StringCodec, Subscription } from 'nats.ws';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NatsService {
  private nc!: NatsConnection;
  private sc = StringCodec();

  async connectToNats(serverUrl: string): Promise<void> {
    if (!this.nc) {
      this.nc = await connect({ servers: [environment.natsUrl] });
      // this.nc.publish(`getalltitlebasicV1`,"get");

    }
  }

  async subscribeToSubject(subject: string, callback: (error: Error | null, data: any) => Promise<void>): Promise<Subscription> {
    return  await this.nc.subscribe(subject, {
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

  publishMessage(subject: string, message: any) {
    let applicationId = JSON.parse(localStorage.getItem('applicationId')!);
    let organizationId = JSON.parse(localStorage.getItem('organizationId')!);
    let user = JSON.parse(localStorage.getItem('user')!);
    let id = JSON.parse(localStorage.getItem('user')!);
    let screenId = localStorage.getItem('screenId')! || '';
    let screenBuildId = localStorage.getItem('screenBuildId')! || '';
    let policyId = JSON.parse(localStorage.getItem('user')!)?.policy?.policyId
    let theme = JSON.parse(window.localStorage['user']).policy?.policyTheme || '';

    message['applicationId'] = applicationId;
    message['organizationId'] = organizationId;
    message['screenId'] = screenId;
    message['screenBuildId'] = screenBuildId;
    message['user'] = user?.username || "";
    message['userId'] = id?.userId || "";
    message["policyId"] = policyId;
    message["policyTheme"] = theme;
    const payloadData = this.sc.encode(JSON.stringify(message));

    this.nc.publish(subject, payloadData);

  }

  closeConnection(): void {
    if (this.nc) {
      this.nc.close();
    }
  }
}
