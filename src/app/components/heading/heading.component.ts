import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'st-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input() headingData: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  pageRoute(link: any) {
    if (link) {
      this.router.navigate(['/pages/' + link]);
    }
  }
}
