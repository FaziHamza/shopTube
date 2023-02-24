import { GenaricFeild } from './../../models/genaricFeild.modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-field',
  templateUrl: './generic-field.component.html',
  styleUrls: ['./generic-field.component.scss']
})
export class GenericFieldComponent implements OnInit {
  model: any;
  @Input() itemData: GenaricFeild;
  @Input() type: string;
  @Input() modal: string;
  @Output() valueChange = new EventEmitter();
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
