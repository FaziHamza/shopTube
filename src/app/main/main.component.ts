import { JoiService } from './../services/joi.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import * as Joi from 'joi';
import { NzImageService } from 'ng-zorro-antd/image';
import { BuilderService } from '../services/builder.service';
import { TreeNode } from '../models/treeNode';
import { ElementData } from '../models/element';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
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
  newcomment: any = '';
  newCommentRes: any = '';
  showAllComments = false;
  commentEdit = false;
  showRply = '';
  commentEditObj: any = {};
  assignToresponse: any = '';
  commentForm: FormGroup;
  constructor(private cd: ChangeDetectorRef, private nzImageService: NzImageService, private employeeService: EmployeeService,
    private builderService: BuilderService, private applicationServices: ApplicationService,
    private toastr: NzMessageService, private router: Router, public dataSharedService: DataSharedService,
    private clipboard: Clipboard, private modalService: NzModalService, private viewContainerRef: ViewContainerRef,
    private applicationService: ApplicationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
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
  setInternalValuesEmpty = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.setInternalValuesEmpty(obj[key]);
      } else {
        obj[key] = '';
      }
    }
  };

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
    this.toastr.success('Copied to clipboard', { nzDuration: 3000 });
  }
  issueReportFun(json: any) {
    const modal = this.modalService.create<CommentModalComponent>({
      nzTitle: 'Issue Report',
      nzContent: CommentModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data: json,
        screenName: this.screenName,
        update: null,
        type: 'pages',
      },
      nzFooter: []
    });
    modal.afterClose.subscribe((res: any) => {
      if (res) {
        res['id'] = res._id;
        delete res._id;
        delete res.__v;

        if (json.formly) {
          if (json.formly.length > 0) {
            if (json.formly[0].fieldGroup) {
              if (json.formly[0].fieldGroup[0]) {
                json.formly[0].fieldGroup[0].props['screenName'] = this.screenName;
                json.formly[0].fieldGroup[0].props['id'] = json.id;
                if (json.formly[0].fieldGroup[0].props['issueReport']) {
                  json.formly[0].fieldGroup[0].props['issueReport'].push(res);
                } else {
                  json.formly[0].fieldGroup[0].props['issueReport'] = [];
                  json.formly[0].fieldGroup[0].props['issueReport'].push(res);
                }
              }
            }
          }
          this.cd.detectChanges();
          json.formly = JSON.parse(JSON.stringify(json.formly));
        }
        else {
          if (json['issueReport']) {
            json['issueReport'].push(res);
          } else {
            json['issueReport'] = [];
            json['issueReport'].push(res);
          }
          this.cd.detectChanges();
        }
      }
    });
  }

}
