import { Component, OnDestroy, OnInit } from '@angular/core';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
import { NatsService } from '../service/nats.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, OnDestroy {
  rowData!: any[];
  colDefs!: any[];

  constructor(private natsService: NatsService) {}

  ngOnInit() {
    this.initializeGrid();
    this.connectToNatsAndSubscribe();
  }

  ngOnDestroy() {
    this.natsService.closeConnection();
  }

  initializeGrid() {
    // Define your column definitions here
    this.colDefs = [
      { field: 'tconst' },
      // ... other fields
    ];
  }
  myFun(){
    const jsonString = JSON.stringify("get");
    this.natsService.publishMessage('Req_Auth_Login', jsonString);
  }
  async connectToNatsAndSubscribe() {
    try {
      debugger
      await this.natsService.connectToNats(environment.natsUrl);
      this.natsService.subscribeToSubject('Res_Auth_Login', (err, data) => {
        if (err) {
          console.error('Error:', err);
          return;
        }
        this.rowData = JSON.parse(data);
      });
    } catch (error) {
      console.error('Error connecting to NATS:', error);
    }
  }

  getData() {
    // Replace with your subject and data
    this.natsService.publishMessage('getalltitlebasic.subject', 'Your Message Here');
  }
  clear(){
    this.rowData =[];
  }
}
