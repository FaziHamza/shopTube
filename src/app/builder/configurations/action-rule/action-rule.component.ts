import { BuilderService } from './../../../services/builder.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action-rule',
  templateUrl: './action-rule.component.html',
  styleUrls: ['./action-rule.component.scss']
})
export class ActionRuleComponent implements OnInit {

  @Input() screenModule:any;
  @Input() screenName:any;
  @Input() selectedNode:any;
  actionForm: FormGroup;
  insertQuery: any;
  updateQuery: any;
  deleteQuery: any;
  selectQuery: any;
  generatedSqlQuery: any;
  constructor(private formBuilder: FormBuilder,private builderService:BuilderService) { }

  ngOnInit(): void {
    this.actionFormLoad();
    this.getActionData();
  }
  actionFormLoad() {
    this.actionForm = this.formBuilder.group({
      actionType: [''],
      actionLink: [''],
      submissionType: [''],
      Actions: this.formBuilder.array([]),
    })
  }
  duplicateActionFormGroup(index: number, data: any) {
    let check = this.actionForm.value.Actions.filter((a: any) => a.type == data);
    // formArray.insert(0, );
    // const formArray  = this.ActionsForms;
    // formArray.insert(0, this.formBuilder.control(formArray.length + 1));
    // this.ActionsForms.insert(index as number + 1,this.formBuilder.control(ActionsForms.length + 1));
    this.ActionsForms.insert(index as number + 1,
      this.formBuilder.group({
        type: [check[0].type],
        email: [check[0].email],
        confirmEmail: [check[0].confirmEmail],
        refranceId: [check[0].refranceId],
        query: [check[0].query]
      }));
    // this.ActionsForms.push();
    // this.ActionsForms.splice(index as number + 1, 0, newNode);
  }
  get ActionsForms() {
    return this.actionForm.get('Actions') as FormArray;
  }


  addActionFormGroup() {
    let dataForQuery = "";
    if (this.actionForm.value.actionLink == 'get')
      dataForQuery = this.selectQuery;
    else if (this.actionForm.value.actionLink == 'post')
      dataForQuery = this.generatedSqlQuery;
    else if (this.actionForm.value.actionLink == 'put')
      dataForQuery = this.updateQuery;
    else if (this.actionForm.value.actionLink == 'delete')
      dataForQuery = this.deleteQuery;

    this.ActionsForms.push(
      this.formBuilder.group({
        submit: [this.actionForm.value.submissionType],
        type: [this.actionForm.value.actionType],
        email: [''],
        confirmEmail: [''],
        refranceId: [''],
        query: [this.actionForm.value.actionType === "query" ? dataForQuery : ""]
      })
    )
  }
  // Remove FormGroup
  removeActionFormGroup(index: number) {
    this.ActionsForms.removeAt(index);
  }
  SaveAction() {
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    const jsonQuryResult = {
      "key": this.selectedNode?.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
      "title": this.selectedNode.title,
      "type": this.selectedNode.type,
      "btnActionType": this.selectedNode.actionType,
      "moduleName": this.screenName,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
      "queryData": this.actionForm.value.Actions,
      "actionType": this.actionForm.value.submissionType,
      "actionLink": this.actionForm.value.actionLink
    }
    if (jsonQuryResult != null) {
      const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
      if (mainModuleId[0].screenId != null) {
        this.builderService.jsonActionRuleDataGet(mainModuleId[0].screenId).subscribe((getRes => {
          if (getRes.length == 0) {
            this.builderService.jsonActionRuleDataSave(jsonQuryResult).subscribe((saveRes => {
              alert("Data Save");
            }));
          }
          else {
            this.builderService.jsonActionRuleRemove(getRes[0].id).subscribe((delRes => {
              this.builderService.jsonActionRuleDataSave(jsonQuryResult).subscribe((saveRes => {
                alert("Data Save");
              }));
            }));
          }
        }));
      }
    }
  }
  getActionData() {
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    this.builderService.jsonActionRuleDataGet(mainModuleId[0].screenId).subscribe((getRes => {
      this.actionForm = this.formBuilder.group({
        actionType: [getRes[0]?.queryData[0]?.type],
        actionLink: [getRes[0].actionLink],
        submissionType: [getRes[0].actionType],
        Actions: this.formBuilder.array(getRes[0].queryData.map((getQueryActionRes: any) =>
          this.formBuilder.group({
            submit: [getQueryActionRes.submit],
            type: [getQueryActionRes.type],
            email: [getQueryActionRes.email],
            confirmEmail: [getQueryActionRes.confirmEmail],
            refranceId: [getQueryActionRes.refranceId],
            query: [getQueryActionRes.query]
          })
        )),
      })
    }));
  }
}
