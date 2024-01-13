import { Component, OnInit } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  ngOnInit() {

  }
  cols = [
    {
      title: 'Name',
      width: '180px'
    },
    {
      title: 'Age',
      width: '180px'
    },
    {
      title: 'Address',
      width: '200px'
    },
    {
      title: 'Address1',
      width: '200px'
    },
    {
      title: 'Address2',
      width: '200px'
    },
    {
      title: 'Address3',
      width: '200px'
    },
    {
      title: 'Address4',
      width: '200px'
    },
    {
      title: 'Address5',
      width: '200px'
    },
    {
      title: 'Address6',
      width: '200px'
    }
   
  ];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      Address1: 'New York No. 1 Lake Park',
      Address2: 'New York No. 1 Lake Park',
      Address3: 'New York No. 1 Lake Park',
      Address4: 'New York No. 1 Lake Park',
      Address5: 'New York No. 1 Lake Park',
      Address6: 'New York No. 1 Lake Park'
    },
   
  ];
  onResize({ width }: NzResizeEvent, col: string): void {
    this.cols = this.cols.map(e => (e.title === col ? { ...e, width: `${width}px` } : e));
  }
}
