import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
@Input() treeData:any;
  constructor() { }

  ngOnInit(): void {
  }
  common(data : any){
    console.log(data);
  }

}
