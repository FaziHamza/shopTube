import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu-build',
  templateUrl: './side-menu-build.component.html',
  styleUrls: ['./side-menu-build.component.scss']
})
export class SideMenuBuildComponent implements OnInit {
  @Input() menuBuilderData : any
  // @Input() selectedTheme : any;
  constructor() { }
  theme = true;
  ngOnInit(): void {
  }

}
