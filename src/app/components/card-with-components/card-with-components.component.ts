import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'st-card-with-components',
  templateUrl: './card-with-components.component.html',
  styleUrls: ['./card-with-components.component.scss']
})
export class CardWithComponentsComponent implements OnInit {
  @Input() item : any;
  @Input() formlyModel: any;
  @Input() form: any;
  constructor() { }

  ngOnInit(): void {
  }

}
