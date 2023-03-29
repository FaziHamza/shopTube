import { BuilderService } from './../../../services/builder.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-business-rule-grid',
  templateUrl: './business-rule-grid.component.html',
  styleUrls: ['./business-rule-grid.component.scss']
})
export class BusinessRuleGridComponent implements OnInit {
  @Input() screenModule: any = [];
  @Input() screenName: any;
  @Input() selectedNode: any;
  @Input() nodes: any;
  isVisible = false;
  GridBusinessRuleData: any;
  constructor(private formBuilder: FormBuilder,
    private builderService: BuilderService,
    public cd: ChangeDetectorRef,
    private modalService: NzModalService) { }
  isModalVisible = false;
  isReadOnly: boolean = true;
  ngOnInit(): void {

    this.dynamicBuisnessRule();
    this.conditionForm = this.formBuilder.group({
      getRuleCondition: this.formBuilder.array([
        this.formBuilder.group({
          ifCondition: '',
          oprator: '',
          target: '',
          refranceId: '',
          refranceOperator: '',
          refranceColor: '',
          condition: '',
          multiConditionList: this.formBuilder.array([]),
        })
      ])
    });
  }
  //Reactive Form For Modal Data Get and Save
  getConditionFormInput() {
    let stringValue = '';
    let objConditionForm = this.conditionForm.get('getRuleCondition')?.value;
    for (let index = 0; index < objConditionForm.length; index++) {
      if (index > 0)
        stringValue += this.getRuleCondition()?.at(index - 1)?.get('refranceOperator')?.value + this.getRuleCondition().at(index).get('refranceId')?.value;
      else
        stringValue += this.getRuleCondition()?.at(index)?.get('refranceId')?.value;
    }
    this.conditionFormInput = stringValue;
  }

  getGridRuleCondition() {
    let value = '';
    let childValue = "";
    let objConditionForm = this.conditionForm.get('getRuleCondition')?.value;
    for (let index = 0; index < objConditionForm.length; index++) {
      value = '';
      childValue = '';
      value += "(" + objConditionForm[index].ifCondition + objConditionForm[index].oprator + objConditionForm[index].target + ")"
      if (objConditionForm[index].multiConditionList && objConditionForm[index].multiConditionList.length > 0) {
        for (let j = 0; j < objConditionForm[index].multiConditionList.length; j++) {
          const element = objConditionForm[index].multiConditionList[j];
          childValue += "(" + value + element.oprator + element.target + ")";
          value = '';
        }
      }
      if (childValue != '') {
        this.getRuleCondition().at(index).patchValue({
          condition: childValue
        });
      } else {
        this.getRuleCondition().at(index).patchValue({
          condition: value
        });
      }
    }
    value = '';
    for (let index = 0; index < this.getRuleCondition().length; index++) {
      let match = this.conditionFormInput.match(new RegExp(`${this.getRuleCondition()?.at(index)?.get('refranceId')?.value}[+*/-]`));
      if (match)
        value += this.getRuleCondition()?.at(index).get('condition')?.value + match[0][match[0].length - 1]
      else
        value += this.getRuleCondition()?.at(index)?.get('condition')?.value
    }
    this.getConditionFormInput();
    return value;
  }
  // getModalCondition() {
  //   this.builderService.jsonGridConditionGet(this.mainModuleId[0].screenId).subscribe((getRes => {
  //
  //     if (getRes.length > 0) {
  //       this.conditionForm = this.formBuilder.group({
  //         getRuleCondition: this.formBuilder.array(getRes[0].conditionRule.map((getconditionRule: any) =>
  //           this.formBuilder.group({
  //             ifCondition: [getconditionRule.ifCondition],
  //             oprator: [getconditionRule.oprator],
  //             target: [getconditionRule.target],
  //             refranceId: [getconditionRule.refranceId],
  //             refranceOperator: [getconditionRule.refranceOperator],
  //             refranceColor: [getconditionRule.refranceColor],
  //             condition: [getconditionRule.condition],
  //             multiConditionList: this.formBuilder.array(getconditionRule.multiConditionList.map((getMultiConditionListRes: any) =>
  //               this.formBuilder.group({
  //                 oprator: getMultiConditionListRes.oprator,
  //                 target: getMultiConditionListRes.target,
  //                 condType: getMultiConditionListRes.condType
  //               })
  //             ))
  //           })
  //         ))
  //       });
  //     }
  //     this.conditionFormInput = getRes[0].condition;
  //   }));
  // }
  conditionFormInput: string;
  conditionForm: FormGroup;
  conditonFormOprator = [
    { name: "+", key: "+" },
    { name: "-", key: "-" },
    { name: "*", key: "*" },
    { name: "/", key: "/" },
    { name: "%", key: "%" },
  ]
  mathmaticRule(): FormGroup {
    return this.formBuilder.group({
      ifCondition: '',
      oprator: '',
      target: '',
      refranceId: '',
      refranceOperator: '',
      refranceColor: '',
      condition: '',
      multiConditionList: this.formBuilder.array([]),
    });
  }
  multiCondition(): FormGroup {
    return this.formBuilder.group({
      oprator: '',
      target: '',
      condType: 'AND',
    });
  }
  getRuleCondition(): FormArray {
    return this.conditionForm.get('getRuleCondition') as FormArray;
  }
  getRuleMultiCondition(index: number): FormArray {
    return this.getRuleCondition()
      .at(index)
      .get('multiConditionList') as FormArray;
  }
  addMathmaticRule() {

    this.getRuleCondition().push(this.mathmaticRule());
  }
  addgetRuleMultiCondition(index: number) {

    this.getRuleMultiCondition(index).push(this.multiCondition());
    this.cd.detectChanges();
  }
  removeMathmaticRule(mathIndex: number) {

    this.getRuleCondition().removeAt(mathIndex);
    this.getGridRuleCondition();
  }
  removegetRuleMultiCondition(index: number, cIndex: number) {
    this.getRuleMultiCondition(index).removeAt(cIndex);
    this.getGridRuleCondition();
  }
  saveMathmaticRule() {

    if (this.thenIndexForConditionForm != undefined) {
      this.buisnessRuleThen(this.indexForConditionForm).at(this.thenIndexForConditionForm).patchValue({
        thenResultValue: this.getGridRuleCondition()
      });
      this.getBuisnessThenRuleCondition(this.indexForConditionForm, this.thenIndexForConditionForm).clear();
      this.getRuleCondition().value.forEach((objGetRuleCondition: any) => {
        this.getBuisnessThenRuleCondition(this.indexForConditionForm, this.thenIndexForConditionForm).push(
          this.formBuilder.group({
            ifCondition: objGetRuleCondition.ifCondition,
            oprator: objGetRuleCondition.oprator,
            target: objGetRuleCondition.target,
            refranceId: objGetRuleCondition.refranceId,
            refranceOperator: objGetRuleCondition.refranceOperator,
            refranceColor: objGetRuleCondition.refranceColor,
            condition: objGetRuleCondition.condition,
            multiConditionList: objGetRuleCondition.multiConditionList ? this.formBuilder.array(objGetRuleCondition.multiConditionList.map((objGetRuleMultiCondition: any) =>
              this.formBuilder.group({
                oprator: objGetRuleMultiCondition.oprator,
                target: objGetRuleMultiCondition.target,
                condType: objGetRuleMultiCondition.condType
              })
            )) : this.formBuilder.array([]),
          })
        )
      });
    } else {
      this.buisnessRule().at(this.indexForConditionForm).patchValue({
        resultValue: this.getGridRuleCondition()
      });
      this.getBuisnessRuleCondition(this.indexForConditionForm).clear();
      this.getRuleCondition().value.forEach((objGetRuleCondition: any) => {
        this.getBuisnessRuleCondition(this.indexForConditionForm).push(
          this.formBuilder.group({
            ifCondition: objGetRuleCondition.ifCondition,
            oprator: objGetRuleCondition.oprator,
            target: objGetRuleCondition.target,
            refranceId: objGetRuleCondition.refranceId,
            refranceOperator: objGetRuleCondition.refranceOperator,
            refranceColor: objGetRuleCondition.refranceColor,
            condition: objGetRuleCondition.condition,
            multiConditionList: objGetRuleCondition.multiConditionList ? this.formBuilder.array(objGetRuleCondition.multiConditionList.map((objGetRuleMultiCondition: any) =>
              this.formBuilder.group({
                oprator: objGetRuleMultiCondition.oprator,
                target: objGetRuleMultiCondition.target,
                condType: objGetRuleMultiCondition.condType
              })
            )) : this.formBuilder.array([]),
          })
        )
      });
    }
    this.isModalVisible = false;
    // this.modalService.dismissAll();
  }
  indexForConditionForm: any;
  thenIndexForConditionForm: any;
  addConditionRule(index: number, thenIndex?: number) {

    this.isVisible = true;
    this.indexForConditionForm = index;
    this.thenIndexForConditionForm = thenIndex;
    this.getRuleCondition().clear();
    if (thenIndex != undefined) {
      if (this.getBuisnessThenRuleCondition(index, thenIndex).value.length > 0) {
        this.getBuisnessThenRuleCondition(index, thenIndex).value.forEach((objGetRuleCondition: any) => {
          this.getRuleCondition().push(
            this.formBuilder.group({
              ifCondition: objGetRuleCondition.ifCondition,
              oprator: objGetRuleCondition.oprator,
              target: objGetRuleCondition.target,
              refranceId: objGetRuleCondition.refranceId,
              refranceOperator: objGetRuleCondition.refranceOperator,
              refranceColor: objGetRuleCondition.refranceColor,
              condition: objGetRuleCondition.condition,
              multiConditionList: (objGetRuleCondition.multiConditionList && objGetRuleCondition.multiConditionList.length > 0) ? this.formBuilder.array(objGetRuleCondition.multiConditionList.map((objGetMultiConditionList: any) =>
                this.formBuilder.group({
                  oprator: objGetMultiConditionList.oprator,
                  target: objGetMultiConditionList.target,
                  condType: objGetMultiConditionList.condType
                }))) : this.formBuilder.array([])
            })
          )
          // this.conditionFormInput = objGetRuleCondition.resultValue
        })
        // this.getBuisnessThenRuleCondition(index, thenIndex).clear()
      } else {
        this.addMathmaticRule();
      }
    } else {
      if (this.getBuisnessRuleCondition(index).value.length > 0) {
        this.getBuisnessRuleCondition(index).value.forEach((objGetRuleCondition: any) => {
          this.getRuleCondition().push(
            this.formBuilder.group({
              ifCondition: objGetRuleCondition.ifCondition,
              oprator: objGetRuleCondition.oprator,
              target: objGetRuleCondition.target,
              refranceId: objGetRuleCondition.refranceId,
              refranceOperator: objGetRuleCondition.refranceOperator,
              refranceColor: objGetRuleCondition.refranceColor,
              condition: objGetRuleCondition.condition,
              multiConditionList: (objGetRuleCondition.multiConditionList && objGetRuleCondition.multiConditionList.length > 0) ? this.formBuilder.array(objGetRuleCondition.multiConditionList.map((objGetMultiConditionList: any) =>
                this.formBuilder.group({
                  oprator: objGetMultiConditionList.oprator,
                  target: objGetMultiConditionList.target,
                  condType: objGetMultiConditionList.condType
                }))) : this.formBuilder.array([])
            })
          )
          // this.conditionFormInput = objGetRuleCondition.resultValue
        })
        // this.getBuisnessRuleCondition(index).clear();
      } else {
        this.addMathmaticRule();
      }
    }
    this.isModalVisible = true;
    // this.modalService.open(content, { centered: true, size: 'lg', scrollable: true });
    this.getConditionFormInput();
  }
  modalClose() {
    this.conditionForm = this.formBuilder.group({
      getRuleCondition: this.formBuilder.array([
        this.formBuilder.group({
          ifCondition: '',
          oprator: '',
          target: '',
          multiConditionList: this.formBuilder.array([]),
        })
      ])
    });
    this.isModalVisible = false;
    // this.modalService.dismissAll();
  }
  //End Modal

  //Buisness Rule Strat
  buisnessRuleData: any = [];
  buisnessRuleIfList: any = [];
  BuisnessRuleCondationList: any;
  buisnessForm: FormGroup;
  buisnessRuleTargetList: any = [];
  // bussinessRuleObj: any = [];
  UIRule: boolean = false;
  dynmaicRule: boolean = false;
  // bussinessForm: FormArray = new FormArray([
  // ]);
  newBuisnessRule(): FormGroup {
    return this.formBuilder.group({
      ifCondition: '',
      oprator: '',
      getValue: '',
      isGetValue: true,
      target: '',
      opratorForTraget: '',
      resultValue: '',
      conditional: this.formBuilder.array([]),
      thenCondition: this.formBuilder.array([]),
      getRuleCondition: this.formBuilder.array([]),
    });
  }
  newSkill(): FormGroup {
    return this.formBuilder.group({
      condifCodition: '',
      condOperator: '',
      condValue: '',
      condType: 'AND',
    });
  }
  newThen(): FormGroup {

    return this.formBuilder.group({
      thenTarget: '',
      thenOpratorForTraget: '',
      thenResultValue: '',
      getRuleCondition: this.formBuilder.array([]),
    });
  }
  buisnessGetThenRuleCondition(): FormGroup {

    return this.formBuilder.group({
      ifCondition: '',
      oprator: '',
      target: '',
      refranceId: '',
      refranceOperator: '',
      refranceColor: '',
      condition: '',
      multiConditionList: this.formBuilder.array([]),
    });
  }
  buisnessGetThenRuleMultiCondition(): FormGroup {
    return this.formBuilder.group({
      oprator: '',
      target: '',
      condType: 'AND',
    });
  }
  buisnessGetRuleCondition(): FormGroup {
    return this.formBuilder.group({
      ifCondition: '',
      oprator: '',
      target: '',
      refranceId: '',
      refranceOperator: '',
      refranceColor: '',
      condition: '',
      multiConditionList: this.formBuilder.array([]),
    });
  }
  buisnessGetRuleMultiCondition(): FormGroup {
    return this.formBuilder.group({
      oprator: '',
      target: '',
      condType: 'AND',
    });
  }
  buisnessRule(): FormArray {
    return this.buisnessForm.get('buisnessRule') as FormArray;
  }
  buisnessRuleSkills(empIndex: number): FormArray {
    return this.buisnessRule()
      .at(empIndex)
      .get('conditional') as FormArray;
  }
  buisnessRuleThen(empIndex: number): FormArray {
    return this.buisnessRule()
      .at(empIndex)
      .get('thenCondition') as FormArray;
  }
  getBuisnessThenRuleCondition(empIndex: number, conditionIndex: number): FormArray {
    return this.buisnessRuleThen(empIndex)
      .at(conditionIndex)
      .get('getRuleCondition') as FormArray;
  }
  getBuisnessThenRuleMultiCondition(empIndex: number, conditionIndex: number, conditionMultiIndex: number): FormArray {
    return this.getBuisnessThenRuleCondition(empIndex, conditionIndex)
      .at(conditionMultiIndex)
      .get('multiConditionList') as FormArray;
  }
  getBuisnessRuleCondition(empIndex: number): FormArray {
    return this.buisnessRule()
      .at(empIndex)
      .get('getRuleCondition') as FormArray;
  }
  getBuisnessRuleMultiCondition(empIndex: number, conditionIndex: number): FormArray {
    return this.getBuisnessRuleCondition(empIndex)
      .at(conditionIndex)
      .get('multiConditionList') as FormArray;
  }
  addBuisnessRule() {

    this.buisnessRule().push(this.newBuisnessRule());
  }
  addBuisnessRuleSkill(empIndex: number) {
    this.buisnessRuleSkills(empIndex).push(this.newSkill());
    this.cd.detectChanges();
  }
  addBuisnessRuleThen(empIndex: number) {
    this.buisnessRuleThen(empIndex).push(this.newThen());
  }
  addBuisnessThenRuleCondition(empIndex: number, conditionIndex: number) {
    this.getBuisnessThenRuleCondition(empIndex, conditionIndex).push(this.buisnessGetThenRuleCondition());
  }
  addBuisnessThenRuleMultiCondition(empIndex: number, conditionIndex: number, conditionMultiIndex: number) {
    this.getBuisnessThenRuleMultiCondition(empIndex, conditionIndex, conditionMultiIndex).push(this.buisnessGetThenRuleMultiCondition());
  }
  addBuisnessRuleCondition(empIndex: number) {
    this.getBuisnessRuleCondition(empIndex).push(this.buisnessGetRuleCondition());
  }
  addBuisnessRuleMultiCondition(empIndex: number, conditionIndex: number) {
    this.getBuisnessRuleMultiCondition(empIndex, conditionIndex).push(this.buisnessGetRuleMultiCondition());
  }
  removeBuisnessRule(empIndex: number) {
    this.buisnessRule().removeAt(empIndex);
  }
  removeBuisnessRuleSkill(empIndex: number, skillIndex: number) {
    this.buisnessRuleSkills(empIndex).removeAt(skillIndex);
  }
  removeBuisnessRuleThen(empIndex: number, thenIndex: number) {
    this.buisnessRuleThen(empIndex).removeAt(thenIndex);
  }
  removeBuisnessThenRuleCondition(empIndex: number, thenIndex: number, conditionIndex: number) {
    this.getBuisnessThenRuleCondition(empIndex, thenIndex).removeAt(conditionIndex);
  }
  removeBuisnessThenRuleMultiCondition(empIndex: number, thenIndex: number, conditionIndex: number, multiConditionIndex: number) {
    this.getBuisnessThenRuleMultiCondition(empIndex, thenIndex, conditionIndex).removeAt(multiConditionIndex);
  }
  removeBuisnessRuleCondition(empIndex: number, conditionIndex: number) {
    this.getBuisnessRuleCondition(empIndex).removeAt(conditionIndex);
  }
  removeBuisnessRuleMultiCondition(empIndex: number, conditionIndex: number, multiConditionIndex: number) {
    this.getBuisnessRuleMultiCondition(empIndex, conditionIndex).removeAt(multiConditionIndex);
  }
  dynamicBuisnessRule() {
    debugger
    this.buisnessRuleData = [];
    this.buisnessRuleIfList = [];
    this.UIRule = false;
    this.dynmaicRule = true;
    this.buisnessForm = this.formBuilder.group({
      buisnessRule: this.formBuilder.array([])
    });

    if (this.selectedNode.type == "gridList") {
      for (let index = 0; index < this.selectedNode.tableHeaders.length; index++) {
        this.buisnessRuleIfList.push(this.selectedNode.tableHeaders[index]);
      }
    }
    this.buisnessRuleData = this.buisnessRuleIfList;
    this.changeDynamicBuisnessRuleIf();
    this.buisnessRuleTargetList;
    this.BuisnessRuleCondationList = [
      { name: "==", key: "==" },
      { name: "!=", key: "!=" },
      { name: ">=", key: ">=" },
      { name: "<=", key: "<=" },
      { name: "=", key: "=" },
      { name: ">", key: ">" },
      { name: "<", key: "<" },
      { name: "Not Null", key: "NotNull" },
    ]
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName);
    if (mainModuleId.length > 0) {
      this.builderService.jsonGridBusinessRuleGet(mainModuleId[0].screenId).subscribe((getRes => {

        if (getRes.length > 0) {
          for (let k = 0; k < getRes.length; k++) {
            if (getRes[k].gridKey == this.selectedNode.key) {
              this.buisnessForm = this.formBuilder.group({
                buisnessRule: this.formBuilder.array(getRes[k].buisnessRulleData.map((getBuisnessRuleRes: any) =>
                  this.formBuilder.group({
                    ifCondition: [getBuisnessRuleRes.ifCondition],
                    oprator: [getBuisnessRuleRes.oprator],
                    isGetValue: [getBuisnessRuleRes.oprator == "NotNull" ? false : true],
                    getValue: [getBuisnessRuleRes.getValue],
                    target: [getBuisnessRuleRes.target],
                    opratorForTraget: [getBuisnessRuleRes.opratorForTraget],
                    resultValue: [getBuisnessRuleRes.resultValue],
                    conditional: this.formBuilder.array(getBuisnessRuleRes.conditional.map((getConditionalRes: any) =>
                      this.formBuilder.group({
                        condifCodition: getConditionalRes.condifCodition,
                        condOperator: getConditionalRes.condOperator,
                        condValue: getConditionalRes.condValue,
                        condType: getConditionalRes.condType
                      }))),
                    thenCondition: this.formBuilder.array(getBuisnessRuleRes.thenCondition.map((getthenCodRes: any) =>
                      this.formBuilder.group({
                        thenTarget: getthenCodRes.thenTarget,
                        thenOpratorForTraget: getthenCodRes.thenOpratorForTraget,
                        thenResultValue: getthenCodRes.thenResultValue,
                        getRuleCondition: this.formBuilder.array(getthenCodRes.getRuleCondition.map((objGetRuleCondition: any) =>
                          this.formBuilder.group({
                            ifCondition: objGetRuleCondition.ifCondition,
                            oprator: objGetRuleCondition.oprator,
                            target: objGetRuleCondition.target,
                            refranceId: objGetRuleCondition.refranceId,
                            refranceOperator: objGetRuleCondition.refranceOperator,
                            refranceColor: objGetRuleCondition.refranceColor,
                            condition: objGetRuleCondition.condition,
                            multiConditionList: this.formBuilder.array(objGetRuleCondition.multiConditionList.map((objGetMultiConditionList: any) =>
                              this.formBuilder.group({
                                oprator: objGetMultiConditionList.oprator,
                                target: objGetMultiConditionList.target,
                                condType: objGetMultiConditionList.condType
                              })
                            ))
                          })
                        ))
                      }))),
                    getRuleCondition: this.formBuilder.array(getBuisnessRuleRes.getRuleCondition.map((objGetRuleCondition: any) =>
                      this.formBuilder.group({
                        ifCondition: objGetRuleCondition.ifCondition,
                        oprator: objGetRuleCondition.oprator,
                        target: objGetRuleCondition.target,
                        refranceId: objGetRuleCondition.refranceId,
                        refranceOperator: objGetRuleCondition.refranceOperator,
                        refranceColor: objGetRuleCondition.refranceColor,
                        condition: objGetRuleCondition.condition,
                        multiConditionList: this.formBuilder.array(objGetRuleCondition.multiConditionList.map((objGetMultiConditionList: any) =>
                          this.formBuilder.group({
                            oprator: objGetMultiConditionList.oprator,
                            target: objGetMultiConditionList.target,
                            condType: objGetMultiConditionList.condType
                          })
                        ))
                      })
                    ))
                  })
                ))
              });
            }

          }

        }
      }))
    }
  }
  changeDynamicBuisnessRuleIf() {
    this.buisnessRuleTargetList = [];
    if (this.selectedNode.type == "gridList") {
      for (let index = 0; index < this.selectedNode.tableHeaders.length; index++) {
        this.buisnessRuleTargetList.push(this.selectedNode.tableHeaders[index]);
      }
    }
  }
  buttonTextCahnge(empIndex: number, skillIndex: number) {
    let conValue = this.buisnessRuleSkills(empIndex)?.at(skillIndex)?.get("condType")?.value == "AND" ? "OR" : "AND";
    this.buisnessRuleSkills(empIndex).at(skillIndex).get("condType")?.setValue(conValue);
  }
  saveBussinessRule() {

    let condThen: any = [];
    this.GridBusinessRuleData = [];
    this.buisnessForm.value.buisnessRule.forEach((elv: any) => {
      let cond = '"';
      if (elv.conditional) {
        elv.conditional.forEach((elv2: any) => {
          cond = ' "' + elv2.condType + '" ' + elv2.condifCodition + ' ' + elv2.condOperator + " " + elv2.condValue;
        });
      }
      condThen.push(elv.target + " " + elv.opratorForTraget + ' ' + elv.resultValue + '')
      if (elv.thenCondition) {
        elv.thenCondition.forEach((elv2: any) => {
          condThen.push(elv2.thenTarget + " " + elv2.thenOpratorForTraget + " " + elv2.thenResultValue + " ");
        });
      }

      var dt = {
        if: elv.ifCondition + " " + elv.oprator + ' ' + elv.getValue,
        then: condThen
      };
      condThen = [];
      this.GridBusinessRuleData.push(dt);
      // { if: 'fish == "oneFish"', then: 'fish = "twoFish"' }
    });

    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName);
    const jsonRuleValidation = {
      "moduleName": this.screenName,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
      "buisnessRulleData": this.buisnessForm.value.buisnessRule,
      "buisnessRule": this.GridBusinessRuleData,
      "gridKey": this.selectedNode.key,
    }
    if (jsonRuleValidation != null) {
      if (mainModuleId[0].screenId != null) {
        this.builderService.jsonGridBusinessRuleGridKey(this.selectedNode.key).subscribe((getRes => {
          if (getRes.length == 0) {
            this.builderService.jsonGridBusinessRuleSave(jsonRuleValidation).subscribe((saveRes => {
              alert("Data Save");
            }));
          }
          else {
            this.builderService.jsonGridBusinessRuleRemove(getRes[0].id).subscribe((delRes => {
              this.builderService.jsonGridBusinessRuleSave(jsonRuleValidation).subscribe((saveRes => {
                alert("Data Save");
              }));
            }));
          }
        }));
      }
    }
    // const fishRhyme = ruleFactory(this.GridBusinessRuleData);
    // const fishRhyme1 = ruleFactory([{ if: 'text_675d95bf == "abc"', then: 'text_2e6b7d72 = "ghi"' }]);
    // console.log(fishRhyme1({ text_675d95bf: "abc" }));
    // console.log(fishRhyme({text_675d95bf:"abc"})); // {fish: 'twoFish'}
    if (this.selectedNode.type == 'gridList') {
      for (let index = 0; index < this.buisnessForm?.value?.buisnessRule.length; index++) {
        let query: any;
        let color = this.buisnessForm?.value?.buisnessRule[index]?.getRuleCondition[0]?.refranceColor;
        let dataval = this.buisnessForm?.value?.buisnessRule[index]?.getValue.toString();
        var conditionKey: any = this.buisnessForm.value.buisnessRule[index].ifCondition;
        var conditionOperator: any = this.buisnessForm.value.buisnessRule[index].oprator;
        let _attributes = {
          className: {
            row: [color]
          }
        }
        let _attributesRevert = {
        }
        this.selectedNode.rowData.forEach((elementV1: any) => {

          query = elementV1[conditionKey] + " " + conditionOperator + " " + dataval;
          if (eval(query)) {
            elementV1["_attributes"] = _attributes;
            // var data = fishRhyme(elementV1);
            // if (data) {
            //   elementV1 = data;
            // }
            // else {
            //   elementV1 = _attributesRevert;
            // }
          }
        });
      }
    }
    // console.log(fishRhyme(this.formlyModel));
  }
  handleOk(): void {
    this.saveMathmaticRule();
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  isInput: boolean = true;
  operatorChange(operator: string, index: number) {
    debugger
    if (operator == "NotNull")
      this.buisnessRule().at(index).patchValue({
        isGetValue: false,
        getValue: null
      });
    else
      this.buisnessRule().at(index).patchValue({
        isGetValue: true
      });
  }
}
