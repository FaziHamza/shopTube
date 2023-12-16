import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'st-card-with-components',
  templateUrl: './card-with-components.component.html',
  styleUrls: ['./card-with-components.component.scss']
})
export class CardWithComponentsComponent implements OnInit {
  @Input() item: any;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  routeLink(link: any) {
    debugger
    if (link) {

      let url = window.location.href;

      // Extract the port number using a regular expression
      const portMatch = url.match(/\.com:(\d+)\//);

      if (portMatch && portMatch[1]) {
        const portNumber = portMatch[1];
        window.open(`//${link}:${portNumber}`, '_blank');
      } else {
        window.open(`//${link}`, '_blank');
      }


    }
  }
}
