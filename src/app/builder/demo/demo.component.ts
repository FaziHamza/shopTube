import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor() { }
  listOfData :any;
  ngOnInit(): void {
    this.listOfData = [
      {
        id: '0',
        name: 'Edward 0',
        age: 32,
        address: 'London Park no. 0',
        children: [
          {
            id: '00',
            name: 'Edward 00',
            age: 32,
            address: 'London Park no. 00',
            children: [
              {
                id: '000',
                name: 'Edward 000',
                age: 32,
                address: 'London Park no. 000',
                children: [
                  {
                    id: '0000',
                    name: 'Fzi 000',
                    age: 32,
                    address: 'London Park no. 000',
                    children: [
                      {
                        id: '00006',
                        name: 'Arf 000',
                        age: 32,
                        address: 'London Park no. 000'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      // ... other data
    ];
  }

}
