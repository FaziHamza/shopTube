import { BuilderService } from './../../../services/builder.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-action-rule',
  templateUrl: './action-rule.component.html',
  styleUrls: ['./action-rule.component.scss']
})
export class ActionRuleComponent implements OnInit {

  @Input() screenModule: any;
  @Input() screenName: any;
  @Input() selectedNode: any;
  @Input() formlyModel: any;
  actionForm: FormGroup;
  genrateQuery: any;
  genrateValue: any;
  sqlType: string = "sql";
  generatedSqlQuery: any;
  constructor(private formBuilder: FormBuilder, private builderService: BuilderService,
    public dataSharedService: DataSharedService,) { }

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
        sqlType: [check[0].sqlType],
        confirmEmail: [check[0].confirmEmail],
        referenceId: [check[0].referenceId],
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
    this.genrateQuery = "";
    this.genrateValue = "";
    let firstKey = "";
    let firstValue = "";
    for (let i = 0; i < Object.keys(this.formlyModel).length; i++) {
      const key = Object.keys(this.formlyModel)[i];
      if (i == 0) {
        firstKey = key
        firstValue = !this.formlyModel[key] ? "'value1'" : `'${this.formlyModel[key]}'`;
      }
      this.genrateQuery += key + ', ';
      this.genrateValue += !this.formlyModel[key] ? `'value${i + 1}', ` : `'${this.formlyModel[key]}', `;
    }
    this.genrateQuery = this.genrateQuery.slice(0, -2);
    this.genrateValue = this.genrateValue.slice(0, -2);

    if (this.actionForm.value.actionLink == 'select') {
      dataForQuery = "select " + this.genrateQuery + " from " + this.dataSharedService.screenName;
    } else if (this.actionForm.value.actionLink == 'get') {
      dataForQuery = "select * from " + this.dataSharedService.screenName;
    }
    else if (this.actionForm.value.actionLink == 'post') {
      dataForQuery = "insert into " + this.dataSharedService.screenName + "(" + this.genrateQuery + ") VALUES (" + this.genrateValue + ");";
    }
    else if (this.actionForm.value.actionLink == 'put') {
      let updateQuery = "";
      for (let i = 0; i < Object.keys(this.formlyModel).length; i++) {
        const key = Object.keys(this.formlyModel)[i];
        updateQuery += key + ' = ' + (!this.formlyModel[key] ? `'value${i + 1}', ` : `'${this.formlyModel[key]}', `);
      }
      updateQuery = updateQuery.slice(0, -2);
      dataForQuery = "UPDATE " + this.dataSharedService.screenName + " SET " + updateQuery + " WHERE " + firstKey + " = " + firstValue;
    }
    else if (this.actionForm.value.actionLink == 'delete') {
      let deleteQuery = "DELETE FROM " + this.dataSharedService.screenName + " WHERE " + firstKey + " = " + firstValue;
      dataForQuery = deleteQuery;
    }

    this.ActionsForms.push(
      this.formBuilder.group({
        submit: [this.actionForm.value.submissionType],
        type: [this.actionForm.value.actionType],
        sqlType: ["sql"],
        email: [this.actionForm.value.actionType === "email" ? dataForQuery : ""],
        confirmEmail: [this.actionForm.value.actionType === "confirmEmail " ? dataForQuery : ""],
        referenceId: [''],
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
      if (getRes.length > 0)
        this.actionForm = this.formBuilder.group({
          actionType: [getRes[0]?.queryData[0]?.type],
          actionLink: [getRes[0].actionLink],
          submissionType: [getRes[0].actionType],
          Actions: this.formBuilder.array(getRes[0].queryData.map((getQueryActionRes: any) =>
            this.formBuilder.group({
              submit: [getQueryActionRes.submit],
              type: [getQueryActionRes.type],
              sqlType: [getQueryActionRes.sqlType],
              email: [getQueryActionRes.email],
              confirmEmail: [getQueryActionRes.confirmEmail],
              referenceId: [getQueryActionRes.referenceId],
              query: [getQueryActionRes.query]
            })
          )),
        })
    }));
  }
  changePostgress(queryType: string, index: number) {
    const sqlType: any = this.ActionsForms.at(index).get('sqlType');
    if (sqlType == "postgress")
      if (queryType = "query") {
        const value = this.actionForm.value.Actions[index].query.replaceAll('"', "'")
        this.ActionsForms.at(index).patchValue({ query: value });
      } else if (queryType = "email") {
        const value = this.actionForm.value.Actions[index].email.replaceAll('"', "'")
        this.ActionsForms.at(index).patchValue({ email: value });
      } else if (queryType = "confirmEmail") {
        const value = this.actionForm.value.Actions[index].confirmEmail.replaceAll('"', "'")
        this.ActionsForms.at(index).patchValue({ confirmEmail: value });
      }
  }
}
