import { ChangeDetectorRef, Injectable, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as Joi from 'joi';
import { BuilderService } from './builder.service';

@Injectable({
  providedIn: 'root'
})
export class JoiService {
  chartData: any;
  dataModel !: any;
  nodes !: any;
  screenId !: any;
  screenName !: any;
  form = new FormGroup({});
  jsonQuryResult: any = [];
  link: any;
  dddLink:any;
  formlyModel:any;
  schemaValidation: any;
  validationCheckStatus: any = [];
  setErrorToInput: any = [];
  screenNode: any = [];
  ruleValidation: any = {};
  ruleObj: any = {};
  constructor(
    public builderService: BuilderService,
    private activatedRoute: ActivatedRoute,) { }
  submit(buttonType?: any) {

    // this.builderService.jsonActionRuleDataGet(this.link).subscribe((res => {
    //   for (let index = 0; index < res.length; index++) {
    //     if (buttonType == res[index].btnActionType) {
    //       if (res[index].queryData[0].type == 'email') {
    //       } else if (res[index].queryData[0].type == 'confirmEmail') {
    //       }
    //       else if (res[index].queryData[0].type == 'query') {
    //         var jsonQuryData = {
    //           "moduleName": res[index].moduleName,
    //           "moduleId": this.link,
    //           "key": res[index].key,
    //           "label": res[index].label,
    //           "type": res[index].type,
    //           "data": [{
    //             "query": res[index].queryData[0].query,
    //             "type": res[index].queryData[0].type,
    //             "actionType": res[index].queryData[0].submit
    //           }]
    //         }
    //         this.jsonQuryResult.push(jsonQuryData);
    //       }
    //       let nameVlaue = res[0].moduleName.toString();
    //       let objData = {
    //         [nameVlaue]: Object.assign({}, this.dataModel)
    //       }
    //       this.builderService.jsonScreenDataSave(objData).subscribe((saveRes => {
    //         alert("Action Execute 1 on "+ buttonType);
    //       }));
    //     }
    //   }
    // }));
    // this.makeModel();
    this.joiValidation();
    // this.cd.detectChanges();
  }

  makeModel() {
    if (this.chartData) {
      var dataModelFaker: any = [];
      this.chartData.forEach((V2: any) => {
        if (V2.chartCardConfig) {
          if (V2.formly != undefined) {
            if (V2.formly != 'stepper')
              dataModelFaker[V2.formly[0].fieldGroup[0].key] = '';
          }
        }
      });
      this.dataModel = dataModelFaker;
    }
    // this.cd.detectChanges();
  }
  joiValidation() {
    if (this.screenId > 0) {
      this.builderService.jsonGetScreenValidationRule(this.screenId).subscribe((getRes => {
        let jsonScreenRes : any;
        if (getRes.length > 0) {
          for (let j = 0; j < this.screenNode.length; j++) {
            if (this.screenNode[j].formlyType != undefined) {
              let jsonScreenRes = getRes.filter(a => a.key == this.screenNode[j].formly[0].fieldGroup[0].key);
              if (jsonScreenRes.length > 0 && jsonScreenRes) {
                if (jsonScreenRes[0].type == "text") {
                  this.ruleObj = {
                    [jsonScreenRes[0].key]: Joi.string().min(typeof jsonScreenRes[0].minlength !== 'undefined' ? jsonScreenRes[0].minlength : 0).max(typeof jsonScreenRes[0].maxlength !== 'undefined' ? jsonScreenRes[0].maxlength: 0),
                  }
                }
                else if (jsonScreenRes[0].type == "number") {
                  this.ruleObj = {
                    [jsonScreenRes[0].key]: Joi.number().integer().min(typeof jsonScreenRes[0].minlength !== 'undefined' ?jsonScreenRes[0].minlength : 0).max(typeof jsonScreenRes[0].maxlength !== 'undefined' ? jsonScreenRes[0].maxlength: 0),
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
                  this.ruleObj = {
                    [jsonScreenRes[0].key]: Joi.string().email({ minDomainSegments: jsonScreenRes[0].emailTypeAllow.length, tlds: { allow: jsonScreenRes[0].emailTypeAllow } }),
                  }
                }
              }
            }
            if (jsonScreenRes.length > 0) {
              Object.assign(this.ruleValidation, this.ruleObj);
            }
          }
          this.schemaValidation = Joi.object(Object.assign({}, this.ruleValidation));
          this.validationChecker();

        }
        return true;
      }))
    }
  }
  validationChecker() {
    for (let index = 0; index < this.chartData[0].formly[0].fieldGroup.length; index++) {
      this.chartData[0].formly[0].fieldGroup[index].templateOptions.error = null;
    }
    this.validationCheckStatus = [];
    const cc = this.schemaValidation.validate(Object.assign({}, this.formlyModel), { abortEarly: false });
    if (cc?.error) {
      this.setErrorToInput = cc.error.details;
      this.chartData;
      this.chartData.forEach((V2: any) => {
        for (let index = 0; index < V2.formly[0].fieldGroup.length; index++) {
          for (let i = 0; i < this.setErrorToInput.length; i++) {
            const element = this.setErrorToInput[i];
            if (V2.formly[0].fieldGroup[index].key.includes(this.setErrorToInput[i].context.key)) {
              if (this.setErrorToInput[i].message == '"' + this.setErrorToInput[i].context.key + '" ' + "is not allowed")
                V2.formly[0].fieldGroup[index].templateOptions.error = null;
              else
                V2.formly[0].fieldGroup[index].templateOptions.error = this.setErrorToInput[i].message.replace(this.setErrorToInput[i].context.key, V2.formly[0].fieldGroup[index].templateOptions.label)
            }
          }
          this.validationCheckStatus.push(V2.formly[0].fieldGroup[index].templateOptions.error);
        }
      });

    }
  }
}
