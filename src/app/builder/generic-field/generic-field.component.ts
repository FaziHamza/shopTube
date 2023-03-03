import { GenaricFeild } from './../../models/genaricFeild.modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-generic-field',
  templateUrl: './generic-field.component.html',
  styleUrls: ['./generic-field.component.scss']
})
export class GenericFieldComponent implements OnInit {
  model: any;
  @Input() itemData: any;
  @Input() type: string;
  @Input() modal: string;
  @Output() valueChange = new EventEmitter();
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  publicList: object[] = [
    { productName: "Samsung", quantity: 2 },
    { productName: "Apple", quantity: 1 }
  ]

  constructor(private toastr: NzMessageService) { }
  ngOnInit(): void {
    this.itemData;
  }
  actionform = new FormGroup({});
  onSubmit() {

    // this.valueChange.emit(this.model + ' from child.');
    // const newProduct = { productName: "New", quantity: 666 };
    // this.publicList.push(newProduct);
    // this.model["redirection"]="sss"
    var formData = {
      form: this.actionform.value,
      type: this.type,
    }
    if (this.actionform.valid) {
      var currentData = JSON.parse(JSON.stringify(formData) || '{}');
      this.notify.emit(currentData);
    }
    else{
      this.toastr.error('In key no space allow, only underscore allow and lowercase', { nzDuration: 3000});
    }
  }
}
