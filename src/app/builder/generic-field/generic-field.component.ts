import { GenaricFeild } from './../../models/genaricFeild.modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Guid } from 'src/app/models/guid';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-generic-field',
  templateUrl: './generic-field.component.html',
  styleUrls: ['./generic-field.component.scss']
})
export class GenericFieldComponent implements OnInit {
  model: any;
  tableId: any;
  @Input() itemData: any;
  @Input() type: string;
  @Input() modal: string;
  @Output() valueChange = new EventEmitter();
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  requestSubscription: Subscription;
  resData: any;
  publicList: object[] = [
    { productName: "Samsung", quantity: 2 },
    { productName: "Apple", quantity: 1 }
  ]
  optionsArray: any[] = [];


  constructor(private toastr: NzMessageService, private _dataSharedService: DataSharedService, public builderService: BuilderService) { }
  ngOnInit(): void {
    debugger
    this.itemData;
    this._dataSharedService.data = '';
    if (this.itemData?.dynamicSectionNode) {
      this.tableId = this.itemData.dynamicSectionNode.key + Guid.newGuid();

    }
  }
  actionform = new FormGroup({});
  onSubmitV1(e: any) {

  }
  onSubmit() {

    // event.stopPropagation();
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
      currentData["tableDta"] = this._dataSharedService.getData();
      if (this.resData) {
        currentData["dynamicData"] = this.resData;
      }
      this.notify.emit(currentData);
      // this.check(currentData);

    }
    else {
      this.toastr.error('In key no space allow, only underscore allow and lowercase', { nzDuration: 3000 });
    }
  }

  dynamicSectionOption() {
    debugger
    this.resData = [];
    let obj: { dynamicApi?: any } = this.actionform.value;
    if (obj.dynamicApi) {
      this.requestSubscription = this.builderService.genericApis(obj.dynamicApi).subscribe({
        next: (res) => {
          this.resData = res;
          let firstObjectKeys = Object.keys(res[0]);
          let key = firstObjectKeys.map(key => ({ key: key, value: key }));
          this.optionsArray = [];
          this.createOptionsArray(this.itemData.dynamicSectionNode.children[1].children[0]);
          this.optionsArray.forEach((item: any, index: number) => {
            let newObj = {
              // no: index + 1,
              fileHeader: item.type + '-' + item.key,
              SelectQBOField: key,
              defaultValue: '',
            }
            this.itemData.dynamicSectionNode.tableBody.push(newObj);
          })
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      })
    }
  }

  createOptionsArray(node: any) {
    this.optionsArray.push({ type: node.type, key: node.key });
    if (node.children) {
      node.children.forEach((child: any) => {
        this.createOptionsArray(child);
      });
    }
  }


  check(event: any) {
    debugger
    event.dynamicData.forEach((item: any) => {
      if (this.itemData.dynamicSectionNode.children) {
        if (this.itemData.dynamicSectionNode.children[1].children) {
          let sectionMapData = this.itemData.dynamicSectionNode.children[1].children;
          event.tableDta.forEach((element: any) => {
            sectionMapData = this.sectionMap(this.itemData.dynamicSectionNode.children[1].children, item, element)
          });
          this.itemData.dynamicSectionNode.children[1].children.push(sectionMapData[0]);
          console.log(this.itemData.dynamicSectionNode.children[1].children);
          // this.updateNodes();
        }
      }
    });
  }

  sectionMap(node?: any, replaceData?: any, value?: any) {
    let newNode = JSON.parse(JSON.stringify(node));
    newNode.forEach((item: any) => {
      if (value.defaultValue) {
        let key = value.fileHeader.split("-")
        if (item.key == key[1]) {
          if (item.type == 'cardWithComponents')
            item.title = replaceData[value.defaultValue];
          else if (item.type == 'imageUpload')
            item.source = replaceData[value.defaultValue];
          else if (item.type == 'heading')
            item.text = replaceData[value.defaultValue];
          else if (item.type == 'paragraph')
            item.text = replaceData[value.defaultValue];
          else if (item.type == 'breakTag')
            item.title = replaceData[value.defaultValue];
          else if (item.type == 'button')
            item.title = replaceData[value.defaultValue];
        }
        if (item.children && item.children.length) {
          this.sectionMap(item.children, replaceData, value);
        }
      } else if (item.children && item.children.length) {
        this.sectionMap(item.children, replaceData, value);
      }
    });
    return newNode;
  }


}
