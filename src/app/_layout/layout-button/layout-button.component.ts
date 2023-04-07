import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'st-layout-button',
  templateUrl: './layout-button.component.html',
  styleUrls: ['./layout-button.component.scss']
})
export class LayoutButtonComponent implements OnInit {
  @Input() dropdownData: any;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  forPushData: any = [];
  newTabArray: any = [];
  constructor(private router: Router) { }

  ngOnInit(): void {

    // if (this.dropdownData) {
    //   if (this.dropdownData.length > 0) {
    //     for (let index = 0; index < this.dropdownData.length; index++) {
    //       if (this.dropdownData[index].type == "dropdown") {
    //         this.forPushData.push(this.dropdownData[index]);
    //       }
    //     }
    //   }
    // }
  }

  tabsLoad(data: any) {

    this.notify.emit(data);

  }

  apiCall(link: any) {

    if (link) {
      let routerLink = link;
      this.router.navigate([routerLink]);
    } else {
      this.router.navigate(['/pages/notFound']);
    }
  }
}
