import { Component, OnDestroy, OnInit } from '@angular/core';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
import { NatsService } from '../service/nats.service';

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
    this.natsService.publishMessage('getalltitlebasicV1', jsonString);
  }
  async connectToNatsAndSubscribe() {
    try {
      debugger
      await this.natsService.connectToNats('ws://172.23.0.5:9090');
      this.natsService.subscribeToSubject('getalldatacallbackV1', (err, data) => {
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
