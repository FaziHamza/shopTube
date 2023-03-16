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
    if(arrayEmpty){
      data = {};
    }
    this.notify.emit(data);
  }

  shouldExecute(data: any): boolean {
    if (data.type === 'mainTab' || data.type === 'dropdown') {
      return false;
    }
    return true;
  }
}
