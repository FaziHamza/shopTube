import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-card-with-header-body-footer',
  templateUrl: './simple-card-with-header-body-footer.component.html',
  styleUrls: ['./simple-card-with-header-body-footer.component.scss']
})
export class SimpleCardWithHeaderBodyFooterComponent implements OnInit {
  @Input() SimpleCardWithHeaderBodyFooterData: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loadURLData(link: any) {
    if (link) {
      let routerLink = "/pages/" + link;
      this.router.navigate([routerLink]);
    }
  }
}
