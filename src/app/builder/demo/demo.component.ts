import { Component } from '@angular/core';
interface Tab {
  name: string;
  icon: string;
}

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {

  tabs : Tab[] = [
    {
      name: 'Overview',
      icon: 'fa-light fa-clipboard-list-check text-sm text-gray-600'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];

}
