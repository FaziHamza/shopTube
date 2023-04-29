import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'st-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
  @Input() data: any;
    

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  pageRoute(link: any) {
    if (link) {
      this.router.navigate(['/pages/' + link]);
    }
  }


}
