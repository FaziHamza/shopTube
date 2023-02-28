import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.scss']
})
export class BusinessRuleComponent implements OnInit {

  @Input() screenModule:any;
  @Input() screenName:any;
  @Input() selectedNode:any;
  @Input() nodes:any;
  constructor(private formBuilder: FormBuilder,private builderService:BuilderService) { }

  ngOnInit(): void {
    this.dynamicBuisnessRule();
  }
  buisnessRuleData: any = [];
  buisnessRuleIfList: any = [];
  BuisnessRuleCondationList: any;
  buisnessForm: FormGroup;
  buisnessRuleTargetList: any = [];
  bussinessRuleObj: any = [];
  UIRule: boolean = false;
  dynmaicRule: boolean = false;
  dynamicBuisnessRule() {
    this.buisnessRuleData = [];
    this.buisnessRuleIfList = [];
    this.UIRule = false;
    this.dynmaicRule = true;
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    this.buisnessForm = this.formBuilder.group({
      buisnessRule: this.formBuilder.array([])
    });
    for (let j = 0; j < this.nodes[0].children[1].children[0].children[1].children.length; j++) {
      if (this.nodes[0].children[1].children[0].children[1].children[j].formlyType != undefined) {
        this.buisnessRuleIfList.push(this.nodes[0].children[1].children[0].children[1].children[j].formly[0].fieldGroup[0]);
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
    ]
    if (mainModuleId.length > 0) {
      this.builderService.jsonBisnessRuleGet(mainModuleId[0].screenId).subscribe((getRes => {
        if(getRes.length > 0){
          this.buisnessForm = this.formBuilder.group({
            buisnessRule: this.formBuilder.array(getRes[0].buisnessRulleData.map((getBuisnessRuleRes: any) =>
              this.formBuilder.group({
                ifCondition: [getBuisnessRuleRes.ifCondition],
                oprator: [getBuisnessRuleRes.oprator],
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
                  })
                )),
                thenCondition: this.formBuilder.array(getBuisnessRuleRes.thenCondition.map((getthenCodRes: any) =>
                  this.formBuilder.group({
                    thenTarget: getthenCodRes.thenTarget,
                    thenOpratorForTraget: getthenCodRes.thenOpratorForTraget,
                    thenResultValue: getthenCodRes.thenResultValue
                  })
                ))
              })))
          });
        }

      }))
    }
  }

  newThen(): FormGroup {
    return this.formBuilder.group({
      thenTarget: '',
      thenOpratorForTraget: '',
      thenResultValue: ''
    });
  }

  changeDynamicBuisnessRuleIf() {
    this.buisnessRuleTargetList = [];
    for (let j = 0; j < this.nodes[0].children[1].children[0].children[1].children.length; j++) {
      if (this.nodes[0].children[1].children[0].children[1].children[j].formlyType != undefined) {
        this.buisnessRuleTargetList.push(this.nodes[0].children[1].children[0].children[1].children[j].formly[0].fieldGroup[0]);
      }
    }
    // this.buisnessRuleTargetList = this.buisnessRuleTargetList.filter((a: any) => a.key != this.ifDynamicMenuName);
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
  addBuisnessRule() {
    this.buisnessRule().push(this.newBuisnessRule());
  }
  newBuisnessRule(): FormGroup {
    return this.formBuilder.group({
      ifCondition: '',
      oprator: '',
      getValue: '',
      target: '',
      opratorForTraget: '',
      resultValue: '',
      conditional: this.formBuilder.array([]),
      thenCondition: this.formBuilder.array([]),
    });
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
  buttonTextCahnge(empIndex: number, skillIndex: number) {
    let conValue = this.buisnessRuleSkills(empIndex)?.at(skillIndex)?.get("condType")?.value == "AND" ? "OR" : "AND";
    this.buisnessRuleSkills(empIndex).at(skillIndex).get("condType")?.setValue(conValue);
  }
  addBuisnessRuleSkill(empIndex: number) {
    this.buisnessRuleSkills(empIndex).push(this.newSkill());
    // this.cd.detectChanges();
  }
  addBuisnessRuleThen(empIndex: number) {
    this.buisnessRuleThen(empIndex).push(this.newThen());
  }

  newSkill(): FormGroup {
    return this.formBuilder.group({
      condifCodition: '',
      condOperator: '',
      condValue: '',
      condType: 'AND',
    });
  }

  saveBussinessRule() {
    this.bussinessRuleObj = [];
    this.buisnessForm.value.buisnessRule.forEach((elv: any) => {
      let cond = '"';
      if (elv.conditional) {
        elv.conditional.forEach((elv2: any) => {
          cond = cond + '"' + elv2.condType + '"' + elv2.condifCodition + elv2.condOperator + " " + elv2.condValue + " ";
        });
      }
      let condThen = '';
      if (elv.thenCondition) {
        elv.thenCondition.forEach((elv2: any) => {
          condThen = condThen + " , 'then' : " + elv2.thenTarget + elv2.thenOpratorForTraget + " " + elv2.thenResultValue + " ";
        });
      }
      var dt = {
        if: elv.ifCondition + " " + elv.oprator + ' "' + elv.getValue + cond,
        then: elv.target + " " + elv.opratorForTraget + ' "' + elv.resultValue + '"' + condThen
      };
      this.bussinessRuleObj.push(dt);
      // { if: 'fish == "oneFish"', then: 'fish = "twoFish"' }
    });

    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    const jsonRuleValidation = {
      "moduleName": this.screenName,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
      "buisnessRulleData": this.buisnessForm.value.buisnessRule,
      "buisnessRule": this.bussinessRuleObj
    }
    if (jsonRuleValidation != null) {
      const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
      if (mainModuleId[0].screenId != null) {
        this.builderService.jsonBisnessRuleGet(mainModuleId[0].screenId).subscribe((getRes => {
          if (getRes.length == 0) {
            this.builderService.jsonBisnessRuleSave(jsonRuleValidation).subscribe((saveRes => {
              alert("Data Save");
            }));
          }
          else {
            this.builderService.jsonBisnessRuleRemove(getRes[0].id).subscribe((delRes => {
              this.builderService.jsonBisnessRuleSave(jsonRuleValidation).subscribe((saveRes => {
                alert("Data Save");
              }));
            }));
          }
        }));
      }
    }
    // const fishRhyme = ruleFactory(this.bussinessRuleObj);
    // const fishRhyme1 = ruleFactory([{ if: 'text_675d95bf == "abc"', then: 'text_2e6b7d72 = "ghi"' }]);
    // console.log(fishRhyme1({ text_675d95bf: "abc" }));
    // console.log(fishRhyme({text_675d95bf:"abc"})); // {fish: 'twoFish'}
    // console.log(fishRhyme(this.formlyService.formlyModel));
  }
}
