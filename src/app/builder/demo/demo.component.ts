import { Component } from '@angular/core';
interface Tab {
  name: string;
  icon: string;
}
interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  visible = false;


  tabs: Tab[] = [
    {
      name: 'Overview',
      icon: 'fa-light fa-clipboard-list-check text-sm text-gray-600'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
