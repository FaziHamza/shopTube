import { Component, Input } from '@angular/core';

@Component({
  selector: 'st-application-theme',
  templateUrl: './application-theme.component.html',
  styleUrls: ['./application-theme.component.scss']
})
export class ApplicationThemeComponent {
  @Input() applicationList: any;
  selectedApplication: any;
  selectedTag: any;
  themeName: string = '';
  tagList: any[] = [
    "p", "input", 'button'
  ]
  constructor() {

  }
  ngOnInit() {
    console.log(this.applicationList)
  }

  setNewTheme(name: any) {

  }

  save() {

  }


}
