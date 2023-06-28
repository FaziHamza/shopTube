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
  businessRuleData: any = [];
  requestSubscription: Subscription;
  businessRuleIfList: any = [];
  BuisnessRuleCondationList: any;
  businessForm: FormGroup;
  businessRuleTargetList: any = [];
  businessRuleObj: any = [];
  UIRule: boolean = false;
  dynmaicRule: boolean = false;
  businessRuleId: string = '';

  dynamicBuisnessRule() {
    this.businessRuleData = [];
    this.businessRuleIfList = [];
    this.UIRule = false;
    this.dynmaicRule = true;
    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
    this.businessForm = this.formBuilder.group({
      buisnessRule: this.formBuilder.array([])
    });
    for (let j = 0; j < this.nodes[0].children[1].children[0].children[1].children.length; j++) {
      if (this.nodes[0].children[1].children[0].children[1].children[j].formlyType != undefined) {
        this.businessRuleIfList.push(this.nodes[0].children[1].children[0].children[1].children[j].formly[0].fieldGroup[0]);
      }
    }
    this.businessRuleData = this.businessRuleIfList;
    this.changeDynamicBuisnessRuleIf();
    this.businessRuleTargetList;
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
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/BusinessRule', this.screenId).subscribe({
        next: (getRes: any) => {
          if (getRes.isSuccess) {
            if (getRes.data.length > 0) {
              this.businessRuleId = getRes.data[0]._id;
              const objRuleData = JSON.parse(getRes.data[0].businessRuleData);
              this.businessForm = this.formBuilder.group({
                buisnessRule: this.formBuilder.array(objRuleData.map((getBusinessRuleRes: any) =>
                  this.formBuilder.group({
                    ifCondition: [getBusinessRuleRes.ifCondition],
                    oprator: [getBusinessRuleRes.oprator],
                    getValue: [getBusinessRuleRes.getValue],
                    target: [getBusinessRuleRes.target],
                    opratorForTraget: [getBusinessRuleRes.opratorForTraget],
                    resultValue: [getBusinessRuleRes.resultValue],
                    conditional: this.formBuilder.array(getBusinessRuleRes.conditional.map((getConditionalRes: any) =>
                      this.formBuilder.group({
                        condifCodition: getConditionalRes.condifCodition,
                        condOperator: getConditionalRes.condOperator,
                        condValue: getConditionalRes.condValue,
                        condType: getConditionalRes.condType
                      })
                    )),
                    thenCondition: this.formBuilder.array(getBusinessRuleRes.thenCondition.map((getthenCodRes: any) =>
                      this.formBuilder.group({
                        thenTarget: getthenCodRes.thenTarget,
                        thenOpratorForTraget: getthenCodRes.thenOpratorForTraget,
                        thenResultValue: getthenCodRes.thenResultValue
                      })
                    ))
                  })
                ))
              });
            }
          } else
            this.toastr.error(getRes.data, { nzDuration: 3000 });
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
    this.businessRuleTargetList = [];
    for (let j = 0; j < this.nodes[0].children[1].children[0].children[1].children.length; j++) {
      if (this.nodes[0].children[1].children[0].children[1].children[j].formlyType != undefined) {
        this.businessRuleTargetList.push(this.nodes[0].children[1].children[0].children[1].children[j].formly[0].fieldGroup[0]);
      }
    }
    // this.businessRuleTargetList = this.businessRuleTargetList.filter((a: any) => a.key != this.ifDynamicMenuName);
  }
  buisnessRule(): FormArray {
    return this.businessForm.get('buisnessRule') as FormArray;
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
    this.businessRuleObj = [];
    this.businessForm.value.buisnessRule.forEach((elv: any) => {
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
      this.businessRuleObj.push(dt);
      // { if: 'fish == "oneFish"', then: 'fish = "twoFish"' }
    });

    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
    const businessRuleValid = {
      "screenName": this.screenName,
      "screenBuilderId": this.screenId,
      "businessRule": JSON.stringify(this.businessRuleObj),
      "businessRuleData": JSON.stringify(this.businessForm.value.buisnessRule)
    }
    const businessRuleValidModel = {
      "BusinessRule": businessRuleValid
    }
    if (businessRuleValidModel.BusinessRule != null) {
      if (mainModuleId[0].navigation != null) {
        const checkAndProcess = this.businessRuleId == ''
          ? this.applicationService.addNestCommonAPI('cp', businessRuleValidModel)
          : this.applicationService.updateNestCommonAPI('cp/BusinessRule', this.businessRuleId, businessRuleValidModel);
        this.requestSubscription = checkAndProcess.subscribe({
          next: (res: any) => {
            if (res.isSuccess) {
              this.dynamicBuisnessRule();
              this.toastr.success(`Buisness rule: ${res.message}`, { nzDuration: 3000 });
            }
            else
              this.toastr.error(`Buisness rule: ${res.message}`, { nzDuration: 3000 });
          },
          error: (err) => {
            this.toastr.error(`Buisness rule: An error occured`, { nzDuration: 3000 });
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
    const fishRhyme = ruleFactory(this.businessRuleObj);
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
    if (this.businessRuleId != '')
      this.applicationService.deleteNestCommonAPI('cp/BusinessRule', this.businessRuleId).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.businessRuleId = '';
            this.businessForm = this.formBuilder.group({
              buisnessRule: this.formBuilder.array([])
            });
            this.toastr.success(res.message, { nzDuration: 3000 });
          }
          else
            this.toastr.success(res.message, { nzDuration: 3000 });
        },
        error: (err) => {
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    else
      this.businessForm = this.formBuilder.group({
        buisnessRule: this.formBuilder.array([])
      });
  }
}
