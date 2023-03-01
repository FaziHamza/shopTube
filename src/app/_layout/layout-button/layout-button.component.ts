import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-button',
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
    
    let arrayIndex = 0;
    let mainIndex = 0;
    let mainAarayIndex = 0;
    this.dropdownData;
    if (this.dropdownData) {
      if (this.dropdownData.length > 0) {
        for (let index = 0; index < this.dropdownData.length; index++) {
          if (this.dropdownData[index].type == "dropdown") {
            if (arrayIndex == 0 && mainAarayIndex == 0) {
              this.forPushData.push(this.dropdownData[index]);
              this.forPushData[mainAarayIndex].chartCardConfig[mainIndex].subItems = this.dropdownData[index].subItems;
            }
            else if (mainAarayIndex != 0 || mainAarayIndex == 0) {
              this.forPushData[mainAarayIndex].chartCardConfig[mainIndex] = this.dropdownData[index].chartCardConfig[0];
              this.forPushData[mainAarayIndex].chartCardConfig[mainIndex].subItems = this.dropdownData[index].subItems;
            }
            else {
              mainAarayIndex = arrayIndex;
              this.forPushData.push(this.dropdownData[index]);
              this.forPushData[mainAarayIndex].chartCardConfig[mainIndex].subItems = this.dropdownData[index].subItems;
            }
            mainIndex = mainIndex + 1;
          }
          arrayIndex = this.forPushData.length;
        }
      }
    }
  }

  tabsLoad(data: any) {
    
    this.newTabArray = [];
    data.subItems.forEach((k: any) => {
      if (k.type == "mainDashonicTabs") {
        this.newTabArray.push(k)
      }
    });
    this.notify.emit(this.newTabArray);
  }

  apiCall(link: any) {
    
    if (link) {
      let routerLink = "/pages/" + link;
      this.router.navigate([routerLink]);
    } else {
      this.router.navigate(['/pages/notFound']);
    }
  }
}
