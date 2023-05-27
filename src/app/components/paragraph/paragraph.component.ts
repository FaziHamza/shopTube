import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { B } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'st-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
  @Input() data: any;
    currentColor:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  pageRoute(link: any) {
    if (link) {
      this.router.navigate(['/pages/' + link]);
    }
  }
  linkColor(allow :boolean) {
    if(allow && this.data.link){
      this.currentColor = this.data.color;
      this.data.color = 'blue';
    }else{
      this.data.color = this.currentColor;
    }
  }


}
