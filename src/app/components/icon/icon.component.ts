import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'st-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() type: any;
  @Input() icon: any;
  @Input() size: any;
  @Input() color: any;
  @Input() hoverIconColor: any;
  constructor() { }
  mainColor: any;

  ngOnInit(): void {
    debugger
    this.color;
    this.icon;
    this.size;
    this.type;
  }


  applyHoverColor() {

  }
  applyColor(allow: boolean) {
    debugger
    if (allow) {
      this.mainColor = this.color;
      this.color = this.hoverIconColor;
    } else {
      this.color = this.mainColor;
    }
  }
}
