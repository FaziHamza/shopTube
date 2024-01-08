import { Component, OnInit } from '@angular/core';

interface Tab {
  name: string;
  icon: string;
}

interface Person {
  id: string;
  name: string;
  age: string;
  address: string;
}

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}


@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  visible = false;
  i = 0;
  editId: string | null = null;
  listOfData: Person[] = [];
  listOfParentData: ParentItemData[] = [];
  listOfChildrenData: ChildrenItemData[] = [];

  ngOnInit() {
    this.addRow();
    this.addRow();
  }


  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }





  tabs: Tab[] = [
    {
      name: 'Overview',
      icon: 'fa-light fa-clipboard-list-check text-sm text-gray-600',
    },
    {
      name: 'Tab 2',
      icon: 'android',
    },
  ];

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
