import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input() headingData: any;
  constructor() { }

  ngOnInit(): void {
    
    this.headingData;
  }
  data(head:any,value:any,type:any,fontSize:any){
    var stringData = "";
    if(type == "paragraph")
    stringData = "<p " + "style="+fontSize + ">" + value +"</p>";
    else
    stringData= "<h"+head + " style="+fontSize+">" + value +"</h"+head+">"; 
    return stringData;
  }
}
