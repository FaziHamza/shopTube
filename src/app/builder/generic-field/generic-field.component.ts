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
  @Input() screenname: any;
  @Input() componentType: any;
  @Output() valueChange = new EventEmitter();
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteValidation: EventEmitter<any> = new EventEmitter<any>();
  requestSubscription: Subscription;
  showMappingTable : boolean = false;
  resData: any;
  saveLoader: boolean = false;
  publicList: object[] = [
    { productName: "Samsung", quantity: 2 },
    { productName: "Apple", quantity: 1 }
  ]
  optionsArray: any[] = [];


  constructor(private toastr: NzMessageService, private _dataSharedService: DataSharedService, public builderService: BuilderService,
    private applicationService: ApplicationService,) { }
  ngOnInit(): void {
    this.requestSubscription = this._dataSharedService.gericFieldLoader.subscribe(res => {
      this.saveLoader = res;
    });
    this.itemData;
    this._dataSharedService.data = '';
    if (this.itemData?.mappingNode) {
      // this.saveLoader = true;
      this.itemData.mappingNode['dbData'] = this.itemData?.mappingNode?.dbData == undefined ? [] : this.itemData?.mappingNode?.dbData;
      this.itemData.mappingNode['tableBody'] = this.itemData?.mappingNode?.tableBody == undefined ? [] : this.itemData?.mappingNode?.tableBody;
      if (this.itemData.mappingNode['tableBody'].length) {
        this.itemData.mappingNode['tableBody'].forEach((item: any) => {
          delete item.id;
        });
      }
      this.itemData.mappingNode['tableHeader'] = [
        { name: 'Id', key: 'id' }, { name: 'File Header', key: 'fileHeader' }, { name: 'Select QBO Field', key: 'SelectQBOField' }, { name: 'Default Value', key: 'defaultValue' }];
      this.itemData.mappingNode['tableKey'] = this.itemData.mappingNode['tableHeader'];
      let checkId = this.itemData.mappingNode['tableHeader'].find((a: any) => a.name == 'Id');
      if (!checkId) {
        let obj = { name: 'Id' }
        this.itemData.mappingNode['tableHeader'].unshift(obj);
      }
      let checkComponentKey = this.itemData.mappingNode['tableHeader'].find((a: any) => a.name == 'componentKey');
      if (!checkComponentKey) {
        let obj = { name: 'Component Key', key: 'componentKey' };
        this.itemData.mappingNode.tableHeader.push(obj);
      }
      this.tableId = this.itemData.mappingNode.key + Guid.newGuid();
      this.itemData.mappingNode['tableKey'] = this.itemData.mappingNode['tableHeader']
      if (this.itemData?.mappingNode?.dbData) {
        this.resData = this.itemData.mappingNode.dbData;
      }
      if (this.itemData?.mappingNode?.dbData && this.itemData?.mappingNode?.dbData?.length > 0) {
        let firstObjectKeys = Object.keys(this.itemData.mappingNode.dbData[0]);
        let key = firstObjectKeys.map(key => ({ key: key, value: key }));
        this.itemData.mappingNode.tableBody = this.itemData.mappingNode.tableBody.map((body: any) => {
          return {
            ...body,
            'SelectQBOField': key
          }
        })
      }
    }
    // setTimeout(() => {
    //   this.saveLoader = false;
    //   this.showMappingTable = true;
    // }, 1);
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
    var formData: any;
    if (this.type == "inputValidationRule") {
      formData = {
        form: this.actionform.value,
        type: this.type,
      }
    } else {
      formData = {
        form: this.modal,
        type: this.type,
      }
    }

    if (this.actionform.valid) {
      var currentData = JSON.parse(JSON.stringify(formData) || '{}');
      for (const key in currentData.form) {
        if (Array.isArray(currentData.form[key])) {
          currentData.form[key] = this._dataSharedService.getData();
        }
      }
      if (this._dataSharedService.getData()) {
        currentData["tableDta"] = this._dataSharedService.getData();
      }
      // if (this.resData) {
      //   currentData["dbData"] = this.resData;
      // }
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
      try {
        this.saveLoader = true;
        this.requestSubscription = this.applicationService.getNestCommonAPI(obj.mapApi).subscribe({
          next: (res) => {
            this.saveLoader = false;
            if (res?.data.length > 0) {
              this.saveLoader = false;
              this.resData = res.data;
              this.itemData.mappingNode['dbData'] = res.data;
              this.itemData.mappingNode.tableBody = [];
              let firstObjectKeys = Object.keys(res.data[0]);
              let key = firstObjectKeys.map(key => ({ key: key, value: key }));
              this.optionsArray = [];
              if (this.itemData.mappingNode.type == 'tabs' || this.itemData.mappingNode.type == 'step' || this.itemData.mappingNode.type == 'div' || this.itemData.mappingNode.type == 'listWithComponentsChild' || this.itemData.mappingNode.type == 'cardWithComponents' || this.itemData.mappingNode.type == 'timelineChild') {
                this.itemData.mappingNode.children.forEach((element: any) => {
                  this.createOptionsArray(element);
                });
              }
              else {
                this.createOptionsArray(this.itemData.mappingNode.children[1].children[0]);
              }

              this.itemData.mappingNode.tableBody = this.optionsArray.map((item: any, index: number) => ({
                // id: index + 1,
                fileHeader: item.key,
                SelectQBOField: key,
                defaultValue: '',
                componentKey: this._dataSharedService.typeMap[item.type] ? this._dataSharedService.typeMap[item.type] : '',
              }));
              this.itemData.mappingNode.tableBody = this.itemData.mappingNode.tableBody.map((item: any) => {
                let qboField = item.SelectQBOField.find((field: any) => field.key === item.fileHeader);

                if (qboField) {
                  // Assign defaultValue from QBO field value if there's a match
                  return {
                    ...item,
                    defaultValue: qboField.value
                  };
                } else {
                  return item;
                }
              });
            } else {
              this.toastr.warning("Did not get data", { nzDuration: 3000 }); // Show an error message to the user
            }
          },
          error: (err) => {
            console.error(err); // Log the error to the console
            this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
          }
        });
      } catch (error) {
        this.saveLoader = false;
        console.error("An error occurred in get mapping:", error);
        // Handle the error appropriately, e.g., show an error message to the user.
      }
    } else {
      this.saveLoader = false;
      this.itemData.mappingNode.tableBody = [];
    }
  }

  createOptionsArray(node: any) {
    if (node?.formly) {
      this.optionsArray.push({ type: node.type, key: node?.formly[0]?.fieldGroup[0]?.key });
    } else {
      this.optionsArray.push({ type: node.type, key: node.key });
    }
    if (node.children) {
      node.children.forEach((child: any) => {
        this.createOptionsArray(child);
      });
    }
  }

}

