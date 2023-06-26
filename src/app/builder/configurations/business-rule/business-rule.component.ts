import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BuilderService } from 'src/app/services/builder.service';
import { ruleFactory } from '@elite-libs/rules-machine';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.scss']
})
export class BusinessRuleComponent implements OnInit {
  @Output() businessRuleNotify: EventEmitter<any> = new EventEmitter<any>();
  @Input() screens: any;
  @Input() screenName: any;
  @Input() screenId: any;
  @Input() selectedNode: any;
  @Input() nodes: any;
  @Input() formlyModel: any;
  constructor(private formBuilder: FormBuilder, private applicationService: ApplicationService,
    private builderService: BuilderService, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.dynamicBuisnessRule();
  }
  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
  buisnessRuleData: any = [];
  requestSubscription: Subscription;
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
    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
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
      this.requestSubscription = this.applicationService.getNestCommonAPIById('buisness-rule/screen', this.screenId).subscribe({
        next: (getRes) => {
          if (getRes.length > 0) {
            const objRuleData = JSON.parse(getRes[0].buisnessRuleData);
            this.buisnessForm = this.formBuilder.group({
              buisnessRule: this.formBuilder.array(objRuleData.map((getBuisnessRuleRes: any) =>
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

        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      })
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
    debugger

    this.bussinessRuleObj = [];
    this.buisnessForm.value.buisnessRule.forEach((elv: any) => {
      let cond = ' ';
      if (elv.conditional) {
        elv.conditional.forEach((elv2: any) => {
          cond = cond + '"' + elv2.condType + '"' + elv2.condifCodition + elv2.condOperator + " " + this.checkValueIntegerOrNot(elv2.condValue) + " ";
        });
      }
      let condThen = '';
      if (elv.thenCondition) {
        elv.thenCondition.forEach((elv2: any) => {
          condThen = condThen + " , 'then' : " + elv2.thenTarget + elv2.thenOpratorForTraget + '"' + elv2.thenResultValue + '"';
        });
      }
      var dt = {
        if: elv.ifCondition + " " + elv.oprator + this.applyCondition(elv.getValue) + this.checkValueIntegerOrNot(elv.getValue) + this.applyCondition(elv.getValue) + cond,
        then: elv.target + " " + elv.opratorForTraget + ' "' + this.checkValueIntegerOrNot(elv.resultValue) + '"' + condThen
      };
      this.bussinessRuleObj.push(dt);
      // { if: 'fish == "oneFish"', then: 'fish = "twoFish"' }
    });

    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
    const jsonRuleValidation = {
      "screenName": this.screenName,
      "screenId": this.screenId,
      "buisnessRule": JSON.stringify(this.bussinessRuleObj),
      "buisnessRuleData": JSON.stringify(this.buisnessForm.value.buisnessRule)
    }
    // new Work
    const ruleModel = {
      "BusinessRule": jsonRuleValidation
    }
    if (jsonRuleValidation != null) {
      if (mainModuleId[0].screenId != null) {
        debugger
        this.requestSubscription = this.applicationService.addNestCommonAPI('cp', ruleModel).subscribe({
          next: (res: any) => {
            if (res.isSuccess)
              this.toastr.success(`Rules: ${res.message}`, { nzDuration: 3000 });
            else { this.toastr.error(`Rules: ${res.message}`, { nzDuration: 3000 });}
          },
          error: (err) => {
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        });
        // this.requestSubscription = this.builderService.jsonBisnessRuleGet(selectedScreen[0].screenId).subscribe({
        //   next: (getRes) => {
        //     if (getRes.length == 0) {
        //       this.requestSubscription = this.builderService.jsonBisnessRuleSave(jsonRuleValidation).subscribe({
        //         next: (saveRes) => {
        //           this.businessRuleNotify.emit();
        //           alert("Data Save");
        //         },
        //         error: (err) => {
        //           console.error(err);
        //           this.toastr.error("An error occurred", { nzDuration: 3000 });
        //         }
        //       });
        //     }
        //     else {
        //       this.requestSubscription = this.builderService.jsonBisnessRuleRemove(getRes[0].id).subscribe({
        //         next: (delRes) => {
        //           this.requestSubscription = this.builderService.jsonBisnessRuleSave(jsonRuleValidation).subscribe({
        //             next: (saveRes) => {
        //               this.businessRuleNotify.emit();
        //               alert("Data Saved");
        //             },
        //             error: (err) => {
        //               console.error(err);
        //               this.toastr.error("An error occurred", { nzDuration: 3000 });
        //             }
        //           });
        //         },
        //         error: (err) => {
        //           console.error(err);
        //           this.toastr.error("An error occurred", { nzDuration: 3000 });
        //         }
        //       });
        //     }
        //   },
        //   error: (err) => {
        //     console.error(err);
        //     this.toastr.error("An error occurred", { nzDuration: 3000 });
        //   }
        // });
      }
    }
    const fishRhyme = ruleFactory(this.bussinessRuleObj);
    // const fishRhyme1 = ruleFactory([{ if: 'text_675d95bf == "abc"', then: 'text_2e6b7d72 = "ghi"' }]);
    // console.log(fishRhyme1({ text_675d95bf: "abc" }));
    // console.log(fishRhyme({text_675d95bf:"abc"})); // {fish: 'twoFish'}
    console.log(fishRhyme(this.formlyModel));
  }
  checkValueIntegerOrNot(value: any) {
    return /^[0-9]+$/.test(value) ? parseInt(value) : value
  }
  applyCondition(value: any) {
    return /^[0-9]+$/.test(value) ? '' : '"'
  }

  deleteBuisnessRule() {
    this.applicationService.deleteNestCommonAPI('buisness-rule', this.screenId).subscribe({
      next: (res) => {
        this.toastr.success("Buisness rule delete successfully", { nzDuration: 3000 });
      },
      error: (err) => {
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }
}
