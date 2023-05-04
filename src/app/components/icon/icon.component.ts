import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'st-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() type:any;
  @Input() icon:any;
  @Input() size:any;
  @Input() color:any;
  constructor() { }

  ngOnInit(): void {
    
    this.color;
    this.icon;
    this.size;
    this.type;
  }

}
