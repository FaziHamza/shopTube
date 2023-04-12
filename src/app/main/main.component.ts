import { JoiService } from './../services/joi.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import * as Joi from 'joi';
import { NzImageService } from 'ng-zorro-antd/image';
import { BuilderService } from '../services/builder.service';
import { TreeNode } from '../models/treeNode';
import { ElementData } from '../models/element';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() mainData: any = [];
  @Input() dataModel !: any;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  selectedTags: any[] = [];
  @Input() screenName: any;
  @Input() screenId: any;
  editorData: any;
  ruleValidation: any = {};
  ruleObj: any = {};
  schemaValidation: any;
  formlyModel: any;
  validationCheckStatus: any = [];
  setErrorToInput: any = [];
  joiValidationData: TreeNode[] = [];
  requestSubscription: Subscription;
  constructor(private cd: ChangeDetectorRef, private nzImageService: NzImageService,
    private builderService: BuilderService, private toastr: NzMessageService,) { }

  ngOnInit(): void {
    this.getJoiValidation();
  }

  submit() {

    // this.commonChartService.submit();
    // this.cd.detectChanges();
    // this.joiService.dataModel = this.form.value;
    // this.joiService.submit();
    this.formlyModel = this.form.value;
    this.joiValidation();
    if (this.validationCheckStatus.length === 0) {
      this.form.value;
      console.log(this.form.value);
      this.dataModel
    }
  }
  handleIndexChange(e: number): void {
    console.log(e);
  }
  onClose(): void {
    console.log('tag was closed.');
  }
  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }
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
  getJoiValidation() {
    if (this.screenId > 0) {
      this.builderService.jsonGetScreenValidationRule(this.screenId).subscribe((getRes => {
        this.joiValidationData = getRes;
      }))
    }
  }
  joiValidation() {

    let jsonScreenRes: any = [];
    if (this.joiValidationData.length > 0) {
      for (let j = 0; j < this.mainData.length; j++) {
        if (this.mainData[j].formlyType != undefined) {
          let jsonScreenRes = this.joiValidationData.filter(a => a.key == this.mainData[j].formly[0].fieldGroup[0].key);
          if (jsonScreenRes.length) {
            if (jsonScreenRes[0].type == "text") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.string().min(typeof jsonScreenRes[0].minlength !== 'undefined' ? jsonScreenRes[0].minlength : 0).max(typeof jsonScreenRes[0].maxlength !== 'undefined' ? jsonScreenRes[0].maxlength : 0),
              }
            }
            else if (jsonScreenRes[0].type == "number") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.number().integer().min(typeof jsonScreenRes[0].minlength !== 'undefined' ? jsonScreenRes[0].minlength : 0).max(typeof jsonScreenRes[0].maxlength !== 'undefined' ? jsonScreenRes[0].maxlength : 0),
              }
            }
            else if (jsonScreenRes[0].type == "pattern") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.string().pattern(new RegExp(jsonScreenRes[0].pattern)),
              }
            }
            else if (jsonScreenRes[0].type == "reference") {
              this.ruleObj = {
                [jsonScreenRes[0].key]: Joi.ref(typeof jsonScreenRes[0].reference !== 'undefined' ? jsonScreenRes[0].reference : ''),
              }
            }
            else if (jsonScreenRes[0].type == "email") {
              // this.ruleObj = {
              //   [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments: jsonScreenRes[0].emailTypeAllow.length, tlds: { allow: jsonScreenRes[0].emailTypeAllow } }),
              // }
              const emailTypeAllow = Array.isArray(jsonScreenRes[0].emailTypeAllow) ? jsonScreenRes[0].emailTypeAllow : [];
              const minDomainSegments = Math.max(0, Number.isInteger(jsonScreenRes[0].emailTypeAllow.length) ? jsonScreenRes[0].emailTypeAllow.length : 0);
              const schema = {
                [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments, tlds: { allow: emailTypeAllow } }),
              };
              this.ruleObj = schema;
            }
            Object.assign(this.ruleValidation, this.ruleObj);
          }
        }

      }
      this.schemaValidation = Joi.object(Object.assign({}, this.ruleValidation));
      this.validationChecker();

    }
    return true;
  }
  validationChecker() {
    for (let index = 0; index < this.mainData[0].formly[0].fieldGroup.length; index++) {
      this.mainData[0].formly[0].fieldGroup[index].props.error = null;
    }
    this.validationCheckStatus = [];
    const cc = this.schemaValidation.validate(Object.assign({}, this.formlyModel), { abortEarly: false });
    if (cc?.error) {
      this.setErrorToInput = cc.error.details;
      const filteredNodes = this.filterInputElements(this.mainData);
      filteredNodes.forEach((V2: any) => {
        for (let index = 0; index < V2.formly[0].fieldGroup.length; index++) {
          for (let i = 0; i < this.setErrorToInput.length; i++) {
            const element = this.setErrorToInput[i];
            if (V2.formly[0].fieldGroup[index].key.includes(this.setErrorToInput[i].context.key)) {
              if (this.setErrorToInput[i].message == '"' + this.setErrorToInput[i].context.key + '" ' + "is not allowed")
                V2.formly[0].fieldGroup[index].props.error = null;
              else
                V2.formly[0].fieldGroup[index].props.error = this.setErrorToInput[i].message.replace(this.setErrorToInput[i].context.key, V2.formly[0].fieldGroup[index].props.label)
            }
          }
          if (V2.formly[0].fieldGroup[index].props.error)
            this.validationCheckStatus.push(V2.formly[0].fieldGroup[index].props.error);
        }
      });
      // this.cd.detectChanges();
    }
  }
  filterInputElements(data: ElementData[]): any[] {
    const inputElements: ElementData[] = [];

    function traverse(obj: any): void {
      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          traverse(item);
        });
      } else if (typeof obj === 'object' && obj !== null) {
        if (obj.formlyType === 'input') {
          inputElements.push(obj);
        }
        Object.values(obj).forEach((value) => {
          traverse(value);
        });
      }
    }

    traverse(data);
    return inputElements;
  }
  saveData(data: any) {
    debugger
    if (data.isSubmit) {
      if (data.dataTable) {
        this.requestSubscription = this.builderService.genericApisPost(data.dataTable, this.form.value).subscribe({
          next: (res) => {
            this.toastr.success("Data saved!", { nzDuration: 3000 });
          },
          error: (err) => {
            console.error(err); // Log the error to the console
            this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
          }
        });
      }else{
        this.toastr.error("Data table required", { nzDuration: 3000 }); // Show an error message to the user
      }
    }
  }
}
