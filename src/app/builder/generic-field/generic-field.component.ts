import { GenaricFeild } from './../../models/genaricFeild.modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Guid } from 'src/app/models/guid';
import { ApplicationService } from 'src/app/services/application.service';
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
  @Input() screenId: any;
  @Input() screenName: any;
  @Input() componentType: any;
  @Output() valueChange = new EventEmitter();
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteValidation: EventEmitter<any> = new EventEmitter<any>();
  requestSubscription: Subscription;
  resData: any;
  publicList: object[] = [
    { productName: "Samsung", quantity: 2 },
    { productName: "Apple", quantity: 1 }
  ]
  optionsArray: any[] = [];


  constructor(private toastr: NzMessageService, private _dataSharedService: DataSharedService, public builderService: BuilderService,
    private applicationService: ApplicationService,) { }
  ngOnInit(): void {

    this.itemData;
    this._dataSharedService.data = '';
    if (this.itemData?.mappingNode) {
      this.itemData.mappingNode['dbData'] = this.itemData?.mappingNode?.dbData == undefined ? [] : this.itemData?.mappingNode?.dbData;
      this.itemData.mappingNode['tableBody'] = this.itemData?.mappingNode?.tableBody == undefined ? [] : this.itemData?.mappingNode?.tableBody;
      if (this.itemData.mappingNode['tableBody'].length) {
        this.itemData.mappingNode['tableBody'].forEach((item: any) => {
          delete item.id;
        });
      }
      this.itemData.mappingNode['tableHeader'] = this.itemData?.mappingNode?.tableHeader == undefined ? [
        { name: 'Id' }, { name: 'fileHeader' }, { name: 'SelectQBOField' }, { name: 'defaultValue' },] : this.itemData?.mappingNode?.tableHeader;
      let checkId = this.itemData.mappingNode['tableHeader'].find((a: any) => a.name == 'Id');
      if (!checkId) {
        let obj = { name: 'Id' }
        this.itemData.mappingNode['tableHeader'].unshift(obj);
      }
      this.tableId = this.itemData.mappingNode.key + Guid.newGuid();
      this.itemData.mappingNode['tableKey'] = this.itemData.mappingNode['tableHeader']
      if (this.itemData?.mappingNode?.dbData) {
        this.resData = this.itemData.mappingNode.dbData;
      }
    }
  }
  actionform = new FormGroup({});
  onSubmitV1(e: any) {

  }
  onSubmit() {
    debugger
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
      let check = this._dataSharedService.getData()
      if (check) {
        currentData["tableDta"] = this._dataSharedService.getData();
      }
      if (this.resData) {
        currentData["dbData"] = this.resData;
      }
      this.notify.emit(currentData);
      // this.check(currentData);

    }
    else {
      this.toastr.error('In key no space allow, only underscore allow and lowercase', { nzDuration: 3000 });
    }
  }

  onDelete(data: any) {
    this.deleteValidation.emit(data)
  }

  dynamicSectionOption() {
    debugger
    this.resData = [];
    let obj: { mapApi?: any } = this.actionform.value;
    if (obj.mapApi) {
      this.requestSubscription = this.applicationService.getNestCommonAPI(obj.mapApi).subscribe({
        next: (res) => {
          if (res.data.length > 0) {
            this.resData = res.data;
            this.itemData.mappingNode.tableBody = [];
            let firstObjectKeys = Object.keys(res.data[0]);
            let key = firstObjectKeys.map(key => ({ key: key, value: key }));
            this.optionsArray = [];
            if (this.itemData.mappingNode.type == 'tabs' || this.itemData.mappingNode.type == 'step' || this.itemData.mappingNode.type == 'div' || this.itemData.mappingNode.type == 'listWithComponentsChild' || this.itemData.mappingNode.type == 'cardWithComponents') {
              this.itemData.mappingNode.children.forEach((element: any) => {
                this.createOptionsArray(element);
              });
            }
            else {
              this.createOptionsArray(this.itemData.mappingNode.children[1].children[0]);
            }
            this.optionsArray.forEach((item: any, index: number) => {
              let newObj = {
                // id: index + 1,
                fileHeader: item.key,
                SelectQBOField: key,
                defaultValue: '',
              }
              this.itemData.mappingNode.tableBody.push(newObj);
            })
          }

        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      })
    } else {
      this.itemData.mappingNode.tableBody = [];
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
}

