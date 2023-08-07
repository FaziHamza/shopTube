import { JoiService } from './../services/joi.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import * as Joi from 'joi';
import { NzImageService } from 'ng-zorro-antd/image';
import { BuilderService } from '../services/builder.service';
import { TreeNode } from '../models/treeNode';
import { ElementData } from '../models/element';
import { Subscription, catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { DataSharedService } from '../services/data-shared.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommentModalComponent } from '../components';
import { EmployeeService } from '../services/employee.service';
import { ApplicationService } from '../services/application.service';


@Component({
  selector: 'st-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() mainData: any = [];
  @Input() formlyModel: any;
  @Input() form: any;
  // form: any = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  selectedTags: any[] = [];
  @Input() screenName: any;
  @Input() screenId: any;
  editorData: any;
  ruleValidation: any = {};
  ruleObj: any = {};
  validationCheckStatus: any = [];
  setErrorToInput: any = [];
  joiValidationData: TreeNode[] = [];
  requestSubscription: Subscription;
  isShowContextMenu = false;
  schemaValidation: any;
  constructor(private cd: ChangeDetectorRef, private nzImageService: NzImageService, private employeeService: EmployeeService,
    private builderService: BuilderService, private applicationServices: ApplicationService,
    private toastr: NzMessageService, private router: Router, public dataSharedService: DataSharedService,
    private clipboard: Clipboard, private modalService: NzModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    if (this.router.url.includes('/pages'))
      this.isShowContextMenu = true;
  }


  handleIndexChange(e: number): void {
    console.log(e);
  }
  onClose(data: any, index: any): void {

    data.options = data.options.filter((_: any, i: any) => i != index);
    console.log('tag was closed.');
  }
  // handleChange(checked: boolean, tag: string): void {
  //   if (checked) {
  //     this.selectedTags.push(tag);
  //   } else {
  //     this.selectedTags = this.selectedTags.filter(t => t !== tag);
  //   }
  //   console.log('You are interested in: ', this.selectedTags);
  // }
  imagePreview(data: any) {
    let image = '';
    if (data.source) {
      image = data.source
    } else if (data.base64Image) {
      image = data.base64Image
    }
    const images = [
      {
        src: image,
        width: data.imageWidth + 'px',
        height: data.imagHieght + 'px',
        alt: data.alt,
      }
    ];
    this.nzImageService.preview(images, { nzZoom: data.zoom, nzRotate: data.rotate, nzKeyboard: data.keyboardKey, nzZIndex: data.zIndex });
  }
  // getJoiValidation() {
  //   this.applicationServices.getNestCommonAPIById('cp/ValidationRule', this.screenId).subscribe(((getRes: any) => {
  //     if (getRes.isSuccess)
  //       this.joiValidationData = getRes.data;
  //     else
  //       this.toastr.error(getRes.message, { nzDuration: 3000 });
  //   }))
  // }
  // joiValidation() {
  //   let jsonScreenRes: any = [];
  //   if (this.joiValidationData.length > 0) {
  //     for (let j = 0; j < this.mainData.children.length; j++) {
  //       if (this.mainData.children[j].formlyType != undefined) {
  //         let jsonScreenRes = this.joiValidationData.filter(a => a.key == this.mainData.children[j].formly[0].fieldGroup[0].key);
  //         if (jsonScreenRes.length) {
  //           if (jsonScreenRes[0].type == "text") {
  //             const joiString = Joi.string()
  //               .min(typeof jsonScreenRes[0].minlength !== 'undefined' ? jsonScreenRes[0].minlength : 0)
  //               .max(typeof jsonScreenRes[0].maxlength !== 'undefined' ? jsonScreenRes[0].maxlength : 0);

  //             if (jsonScreenRes[0].required) {
  //               joiString.required();
  //             }

  //             this.ruleObj = {
  //               [jsonScreenRes[0].key]: joiString,
  //             };
  //           }

  //           else if (jsonScreenRes[0].type == "number") {
  //             this.ruleObj = {
  //               [jsonScreenRes[0].key]: Joi.number().integer().min(typeof jsonScreenRes[0].minlength !== 'undefined' ? jsonScreenRes[0].minlength : 0).max(typeof jsonScreenRes[0].maxlength !== 'undefined' ? jsonScreenRes[0].maxlength : 0),
  //             }
  //           }
  //           else if (jsonScreenRes[0].type == "pattern") {
  //             this.ruleObj = {
  //               [jsonScreenRes[0].key]: Joi.string().pattern(new RegExp(jsonScreenRes[0].pattern)),
  //             }
  //           }
  //           else if (jsonScreenRes[0].type == "reference") {
  //             this.ruleObj = {
  //               [jsonScreenRes[0].key]: Joi.ref(typeof jsonScreenRes[0].reference !== 'undefined' ? jsonScreenRes[0].reference : ''),
  //             }
  //           }
  //           else if (jsonScreenRes[0].type == "email") {
  //             // this.ruleObj = {
  //             //   [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments: jsonScreenRes[0].emailTypeAllow.length, tlds: { allow: jsonScreenRes[0].emailTypeAllow } }),
  //             // }
  //             const emailTypeAllow = Array.isArray(jsonScreenRes[0].emailTypeAllow) ? jsonScreenRes[0].emailTypeAllow : [];
  //             const minDomainSegments = Math.max(0, Number.isInteger(jsonScreenRes[0].emailTypeAllow.length) ? jsonScreenRes[0].emailTypeAllow.length : 0);
  //             const schema = {
  //               [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments, tlds: { allow: emailTypeAllow } }),
  //             };
  //             this.ruleObj = schema;
  //           }
  //           Object.assign(this.ruleValidation, this.ruleObj);
  //         }
  //       }

  //     }
  //     this.schemaValidation = Joi.object(Object.assign({}, this.ruleValidation));
  //     this.validationChecker();

  //   }
  //   return true;
  // }
  // validationChecker() {
  //   this.mainData.children.forEach((item: any) => {
  //     if (item.formly) {
  //       item.formly[0].fieldGroup[0].props.error = null;
  //     }
  //     // for (let index = 0; index < this.mainData.children[0].formly[0].fieldGroup.length; index++) {
  //     //   this.mainData.children[0].formly[0].fieldGroup[index].props.error = null;
  //     // }
  //   });

  //   this.validationCheckStatus = [];
  //   const cc = this.schemaValidation.validate(Object.assign({}, this.formlyModel), { abortEarly: false });
  //   let filteredNodes = this.filterInputElements(this.mainData.children);
  //   if (cc?.error) {
  //     this.setErrorToInput = cc.error.details;
  //     filteredNodes.forEach((V2: any) => {
  //       for (let index = 0; index < V2.formly[0].fieldGroup.length; index++) {
  //         for (let i = 0; i < this.setErrorToInput.length; i++) {
  //           const element = this.setErrorToInput[i];
  //           if (V2.formly[0].fieldGroup[index].key.includes(this.setErrorToInput[i].context.key)) {
  //             if (this.setErrorToInput[i].message == '"' + this.setErrorToInput[i].context.key + '" ' + "is not allowed") {
  //               V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = null;
  //               // V2.formly[0].fieldGroup[index].props['required'] = false;
  //             }
  //             else {
  //               V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = this.setErrorToInput[i].message.replace(this.setErrorToInput[i].context.key, V2.formly[0].fieldGroup[index].props.label);
  //               // V2.formly[0].fieldGroup[index].props['required'] = true;
  //             }
  //           }
  //           else {
  //             let check = this.setErrorToInput.filter((error: any) => error.context.key == V2.formly[0].fieldGroup[index].key);
  //             if (check.length == 0) {
  //               V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = null;
  //               // this.dataSharedService.formlyShowError.next(false);
  //             }
  //           }
  //         }
  //         if (V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage)
  //           this.validationCheckStatus.push(V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage);
  //       }
  //     });
  //     if (this.setErrorToInput.length > 0) {
  //       this.dataSharedService.formlyShowError.next(true);
  //     }
  //     this.cd.detectChanges();
  //   }
  //   else {
  //     // filteredNodes = this.filterInputElements(this.mainData.children);
  //     filteredNodes.forEach((V2: any) => {
  //       for (let index = 0; index < V2.formly[0].fieldGroup.length; index++) {
  //         V2.formly[0].fieldGroup[index].props['additionalProperties'].requiredMessage = null;
  //       }
  //     })
  //   }
  // }
  // filterInputElements(data: ElementData[]): any[] {
  //   const inputElements: ElementData[] = [];

  //   function traverse(obj: any): void {
  //     if (Array.isArray(obj)) {
  //       obj.forEach((item) => {
  //         traverse(item);
  //       });
  //     } else if (typeof obj === 'object' && obj !== null) {
  //       if (obj.formlyType === 'input') {
  //         inputElements.push(obj);
  //       }
  //       Object.values(obj).forEach((value) => {
  //         traverse(value);
  //       });
  //     }
  //   }

  //   traverse(data);
  //   return inputElements;
  // }
  convertModel(model: any, parentKey = "") {
    const convertedModel: any = {};

    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const value = model[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          Object.assign(convertedModel, this.convertModel(value, newKey.toLocaleLowerCase()));
        } else {
          convertedModel[newKey.toLocaleLowerCase()] = value;
        }
      }
    }
  }
  saveData(data: any) {
    if (data.isSubmit) {
      let oneModelData = this.convertModel(this.form.value);
      // this.mainData.children
      // this.mainData.children.forEach((element:any) => {
      //   if(element.type == "gridList"){
      //     let tableData = this.findObjectByType(element,"gridList");
      //     tableData.tableData = [];
      //     tableData.tableHeaders = [];
      //     tableData?.tableData?.push(this.form.value);
      //   }
      // });
      // let tableData = this.findObjectByType(element,"gridList");
      let tableData = this.mainData.children.filter((a: any) => a.type == "gridList");
      if (tableData.length > 0) {
        tableData[0]['api'] = data.dataTable;
        let saveForm = JSON.parse(JSON.stringify(oneModelData));
        // saveForm["id"] = '';
        // this.form.value["id"] = tableData[0]['tableKey'].length
        const firstObjectKeys = Object.keys(saveForm);
        let obj = firstObjectKeys.map(key => ({ name: key }));
        // obj.unshift({name: 'id'});
        if (JSON.stringify(tableData[0]['tableKey']) != JSON.stringify(obj)) {
          tableData[0].tableData = [];
          tableData[0]['tableKey'] = obj;
          tableData[0].tableHeaders = tableData[0]['tableKey'];
          saveForm.id = tableData[0].tableData.length + 1
          tableData[0].tableData?.push(saveForm);
        } else {
          tableData[0]['tableKey'] = obj;
          tableData[0].tableHeaders = tableData[0]['tableKey'];
          saveForm.id = tableData[0].tableData.length + 1;
          tableData[0].tableData?.push(saveForm);
        }

      }
      this.saveData1(data);
    }
  }
  setInternalValuesEmpty = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.setInternalValuesEmpty(obj[key]);
      } else {
        obj[key] = '';
      }
    }
  };
  saveData1(data: any) {
    let oneModelData = this.convertModel(this.form.value);

    // const objModel: any = this.form.value;
    // var nestedObject = {};
    // for (var key in objModel) {
    //   Object.assign(nestedObject, objModel[key]);
    // }

    // let nestedObject: any = null;
    // Object.keys(objModel).forEach(key => {
    //   const value = objModel[key];
    //   if (typeof value === "object" && value !== null) {
    //     nestedObject = value;
    //   }
    // });
    const empData: any = {
      screenId: this.screenName,
      modalData: oneModelData
    };

    console.log(empData);
    const tableNames = new Set();

    for (const key in empData.modalData) {
      const tableName = key.split('.')[0];
      tableNames.add(tableName);
    }

    const Arraytables = Array.from(tableNames)
    const remainingTables = Arraytables.slice(1);
    let id;
    for (const key in empData.modalData) {
      if (empData.modalData.hasOwnProperty(key) &&
        key.endsWith('.id') &&
        empData.modalData[key] !== "") {
        id = key;
      }
    }

    if (id == undefined) {
      let relationIds: any = remainingTables.map(table => `${Arraytables[0]}_id`);
      relationIds = relationIds.toString();
      const tables = (Array.from(tableNames)).toString();
      console.log(tables);
      this.employeeService.saveSQLDatabaseTable('knex-query', empData)
        .pipe(
          catchError((error) => {
            console.error(error);
            if (error.status === 400 && error.error && error.error.message) {
              this.toastr.error(error.error.message, { nzDuration: 3000 });
            } else {
              this.toastr.error('An error occurred', { nzDuration: 3000 });
            }
            return throwError(error); // Rethrow the error
          })
        )
        .subscribe((res) => {
          // Handle success response or further logic
          this.toastr.success('Save Successfully', { nzDuration: 3000 });
          this.setInternalValuesEmpty(this.form.value);
          this.getFromQuery();
        });
    } else {
      const dynamicPropertyName = Object.keys(this.form.value)[0]; // Assuming the dynamic property name is the first property in this.form.value
      if (this.form.get(dynamicPropertyName)) {
        this.form.get(dynamicPropertyName);
        const model = {
          screenId: this.screenName,
          postType: 'put',
          modalData: this.form.value[dynamicPropertyName]
        };

        this.employeeService.saveSQLDatabaseTable('knex-query/executeQuery', model).subscribe({
          next: (res) => {
            this.toastr.success("Update Successfully", { nzDuration: 3000 });
            this.getFromQuery();
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
      }
    }

    // if (data.dataTable) {
    //   this.requestSubscription = this.builderService.genericApisPost(data.dataTable, this.form.value).subscribe({
    //     next: (res) => {
    //       this.toastr.success("Data saved!", { nzDuration: 3000 });
    //     },
    //     error: (err) => {
    //       console.error(err); // Log the error to the console
    //       this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
    //     }
    //   });
    // } else {
    //   this.toastr.error("Data table required", { nzDuration: 3000 }); // Show an error message to the user
    // }
  }
  getFromQuery() {
    let tableData = this.mainData.children.filter((a: any) => a.type == "gridList");
    this.employeeService.getSQLDatabaseTable(`knex-query/${this.screenName}`).subscribe({
      next: (res) => {

        if (tableData.length > 0) {
          // tableData[0]['api'] = data.dataTable;
          let saveForm = JSON.parse(JSON.stringify(res[0]));
          // saveForm["id"] = '';
          // this.form.value["id"] = tableData[0]['tableKey'].length
          const firstObjectKeys = Object.keys(saveForm);
          let obj = firstObjectKeys.map(key => ({ name: key }));
          // obj.unshift({name: 'id'});
          if (JSON.stringify(tableData[0]['tableKey']) != JSON.stringify(obj)) {
            tableData[0].tableData = [];
            tableData[0]['tableKey'] = obj;
            tableData[0].tableHeaders = tableData[0]['tableKey'];
            saveForm.id = tableData[0].tableData.length + 1
            res.forEach((element: any) => {
              element.id = (element.id).toString();
              tableData[0].tableData?.push(element);
            });
          } else {
            tableData[0]['tableKey'] = obj;
            tableData[0].tableHeaders = tableData[0]['tableKey'];
            tableData[0].tableData = [];
            saveForm.id = tableData[0].tableData.length + 1;
            res.forEach((element: any) => {
              element.id = (element.id).toString();
              tableData[0].tableData?.push(element);
            });
            // tableData[0].tableData?.push(saveForm);
          }
        }
      }
    });
  }
  findObjectByType(data: any, key: any) {
    if (data.type === key) {
      return data;
    }
    for (let child of data.children) {
      let result: any = this.findObjectByType(child, key);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
  copyJson(json: any) {

    let data = JSON.stringify(json);
    this.clipboard.copy(data);
    // alert('Copied to clipboard');
  }
  comment(json: any) {
    const modal = this.modalService.create<CommentModalComponent>({
      nzTitle: 'Comment',
      nzContent: CommentModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data: json,
        screenName: this.screenName,
      },
      nzFooter: []
    });
    modal.afterClose.subscribe((res: any) => {
      if (res) {
        this.dataSharedService.screenCommentList.forEach(element => {
          this.assignComment(this.mainData, element);
        });
      }
    });
  }
  assignComment(node: any, comment: any) {
    if (comment['ObjectID']) {
      if (node.id == comment['ObjectID']) {
        let obj = {
          whoCreated: comment['whoCreated'],
          dateTime: comment['dateTime'],
          message: comment['message'],
        }
        if (!node['comment']) {
          node['comment'] = [];
          node['comment'].push(obj)
        } else {
          node['comment'].push(obj)
        }
      }
      if (node.children.length > 0) {
        node.children.forEach((child: any) => {
          this.assignComment(child, comment)
        });
      }
    }
  }
}
