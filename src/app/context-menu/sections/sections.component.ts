import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'st-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  @Input() sections:any;
  @Input() screenName: any;
  @Input() screenId: any;
  @Input() resData: any;
  @Input() formlyModel: any;
  @Output() traverseChangeEmit: EventEmitter<any> = new EventEmitter();
  @Output() sectionRepeatEmit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  traverseAndChange(node:any,type:string){
    let obj = {
      node:node,
      type:type
    }
    this.traverseChangeEmit.emit(obj);
  }
  sectionRepeat(data:any){
    this.sectionRepeatEmit.emit(data);
  }
}
