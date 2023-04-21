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
  objects: any[] = [];
  publicList: object[] = [
    { productName: "Samsung", quantity: 2 },
    { productName: "Apple", quantity: 1 }
  ]

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
      this.notify.emit(currentData);
    }
    else {
      this.toastr.error('In key no space allow, only underscore allow and lowercase', { nzDuration: 3000 });
    }
  }

  dynamicSectionOption() {
    debugger
    let obj: { dynamicApi?: any } = this.actionform.value;
    if (obj.dynamicApi) {
      this.requestSubscription = this.builderService.genericApis(obj.dynamicApi).subscribe({
        next: (res) => {
          let firstObjectKeys = Object.keys(res[0]);
          this.objects = [];
          const allObjects = this.createOptionsArray(this.itemData.dynamicSectionNode.children[1].children);
          console.log(allObjects);

          firstObjectKeys.forEach((item: any, index: number) => {
            let newObj = {
              no: index + 1,
              fileHeader: item,
              SelectQBOField: [
                {
                  key: 'key',
                  value: 'key'
                },
                {
                  key: 'key1',
                  value: 'key1'
                },
                {
                  key: 'key2',
                  value: 'key2'
                },
              ],
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
  findObjects(obj: any) {
    if (!obj || typeof obj !== 'object') {
      return;
    }
    if (obj.type) {
      this.objects.push(obj);
    }
    if (Array.isArray(obj.children)) {
      obj.children.forEach((child : any) => this.findObjects(child));
    }
    return this.objects;
  }


  getAllObjects(obj: any): any[] {
    let objects: any[] = [];
    for (let prop in obj) {
      if (typeof obj[prop] === 'object') {
        if (Array.isArray(obj[prop])) {
          obj[prop].forEach((item: any) => {
            objects.push(...this.getAllObjects(item));
          });
        } else {
          objects.push(obj[prop]);
          objects.push(...this.getAllObjects(obj[prop]));
        }
      }
    }
    return objects;
  }

  createOptionsArray(jsonData: any): any[] {
    let optionsArray: any[] = [];
    for (let i = 0; i < jsonData.length; i++) {
      let item = jsonData[i];
      if (item.type === 'cardWithComponents') {
        let children = this.createOptionsArray(item.children);
        optionsArray.push({ type: 'card', title: item.title, children });
      } else if (item.type === 'imageUpload') {
        optionsArray.push({ type: 'image', source: item.source });
      } else if (item.type === 'heading') {
        optionsArray.push({ type: 'heading', title: item.title });
      } else if (item.type === 'icon') {
        optionsArray.push({ type: 'icon', title: item.title });
      } else if (item.type === 'paragraph') {
        optionsArray.push({ type: 'paragraph', title: item.title });
      } else if (item.type === 'breakTag') {
        optionsArray.push({ type: 'break', title: item.title });
      } else if (item.type === 'button') {
        optionsArray.push({ type: 'button', title: item.title });
      }
    }
    return optionsArray;
  }
  
}
