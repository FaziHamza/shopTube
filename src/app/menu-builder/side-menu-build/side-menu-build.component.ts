import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu-build',
  templateUrl: './side-menu-build.component.html',
  styleUrls: ['./side-menu-build.component.scss']
})
export class SideMenuBuildComponent implements OnInit {
  @Input() menuBuilderData: any
  @Output() notify: EventEmitter<any> = new EventEmitter();
  // @Input() selectedTheme : any;
  constructor() { }
  theme = true;
  ngOnInit(): void {
  }

  loadTabsAndButtons(event: MouseEvent,data: any) {
    debugger
    event.stopPropagation();
    let arrayEmpty = true;
    data.children.forEach((j: any) => {
      if (j.type == 'dropdown' || j.type == 'mainTab') {
        arrayEmpty = false;
      }
    });
    const myData = { menuData: data, arrayEmpty: arrayEmpty };
    if(!arrayEmpty){
    this.notify.emit(myData);
    }else{
      this.notify.emit(myData);
    }
  }


}
