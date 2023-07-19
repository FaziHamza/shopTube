import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'st-list-with-components',
  templateUrl: './list-with-components.component.html',
  styleUrls: ['./list-with-components.component.scss']
})
export class ListWithComponentsComponent implements OnInit {
  @Input() listData : any;
  @Input() formlyModel : any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
