import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-card-with-header-body-footer',
  templateUrl: './simple-card-with-header-body-footer.component.html',
  styleUrls: ['./simple-card-with-header-body-footer.component.scss']
})
export class SimpleCardWithHeaderBodyFooterComponent implements OnInit {

  @Input() SimpleCardWithHeaderBodyFooterData: any;
  link:any;
  constructor() { }

  ngOnInit(): void {
    this.link = this.SimpleCardWithHeaderBodyFooterData[0].link;
  }

  loadURLData(link : any){
    if(this.link){
       location.replace('http://localhost:4200/pages/' + this.link);
    }
  }
}
