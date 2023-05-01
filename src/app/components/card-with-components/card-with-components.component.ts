import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-card-with-components',
  templateUrl: './card-with-components.component.html',
  styleUrls: ['./card-with-components.component.scss']
})
export class CardWithComponentsComponent implements OnInit {
  @Input() item : any;
  constructor() { }

  ngOnInit(): void {
  }

}
