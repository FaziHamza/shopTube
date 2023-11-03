import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BuilderService } from 'src/app/services/builder.service';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { ElementData } from 'src/app/models/element';

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
  @Input() applicationId: any;
  @Input() nodes: any;
  @Input() formlyModel: any;
  constructor(private formBuilder: FormBuilder, private applicationService: ApplicationService,
    private builderService: BuilderService, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.dynamicBuisnessRule();
  }
  ngOnDestroy() {
    if (this.requestSubscription)
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
  allFormlyInputs: any[] = [];
  dynamicBuisnessRule() {
    this.businessRuleData = [];
    this.businessRuleIfList = [];
    this.UIRule = false;
    this.dynmaicRule = true;
    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
    this.businessForm = this.formBuilder.group({
      buisnessRule: this.formBuilder.array([]),
    });
    this.allFormlyInputs = this.filterInputElements(this.nodes);
    for (let j = 0; j < this.allFormlyInputs.length; j++) {
      this.businessRuleIfList.push(this.allFormlyInputs[j].formly[0].fieldGroup[0]);
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
                buisnessRule: this.formBuilder.array(
                  objRuleData.map((getBusinessRuleRes: any) =>
                    this.formBuilder.group({
                      name: [getBusinessRuleRes.name],
                      description: [getBusinessRuleRes.description],
                      type: [getBusinessRuleRes.type],
                      ifRuleMain: this.formBuilder.array(
                        getBusinessRuleRes?.ifRuleMain?.map((ifRuleMain: any) =>
                          this.formBuilder.group({
                            ifCondition: [ifRuleMain.ifCondition],
                            oprator: [ifRuleMain.oprator],
                            getValue: [ifRuleMain.getValue],
                            condType: [ifRuleMain.condType],
                            conditional: this.formBuilder.array(
                              ifRuleMain.conditional.map((conditional: any) =>
                                this.formBuilder.group({
                                  condifCodition: [conditional.condifCodition],
                                  condOperator: [conditional.condOperator],
                                  condValue: [conditional.condValue],
                                  condType: [conditional.condType]
                                })
                              )
                            )
                          })
                        )
                      ),
                      thenCondition: this.formBuilder.array(
                        getBusinessRuleRes.thenCondition.map((thenCondition: any) =>
                          this.formBuilder.group({
                            thenTarget: [thenCondition.thenTarget],
                            thenOpratorForTarget: [thenCondition.thenOpratorForTarget],
                            thenResultValue: [thenCondition.thenResultValue]
                          })
                        )
                      )
                    })
                  )
                )
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

  changeDynamicBuisnessRuleIf() {
    this.businessRuleTargetList = [];
    for (let j = 0; j < this.allFormlyInputs.length; j++) {
      this.businessRuleTargetList.push(this.allFormlyInputs[j].formly[0].fieldGroup[0]);
    }
    // this.businessRuleTargetList = this.businessRuleTargetList.filter((a: any) => a.key != this.ifDynamicMenuName);
  }

  //Add Main Rule Start
  buisnessRule(): FormArray {
    return this.businessForm.get('buisnessRule') as FormArray;
  }
  addBuisnessRule() {
    this.buisnessRule().push(this.newBuisnessRule());
  }
  newBuisnessRule(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      type: 'clientSide',
      ifRuleMain: this.formBuilder.array([this.newIfRuleMain()]),
      thenCondition: this.formBuilder.array([this.newThen()]),
    });
  }
  removeBuisnessRule(empIndex: number) {
    this.buisnessRule().removeAt(empIndex);
  }
  //Main Rule End

  //ifRuleMain Rule Start
  newIfRuleMain(): FormGroup {
    return this.formBuilder.group({
      ifCondition: '',
      oprator: '',
      getValue: '',
      condType: '',
      conditional: this.formBuilder.array([])
    });
  }
  buisnessRuleIfMain(mainIndex: number): FormArray {
    return this.buisnessRule()
      .at(mainIndex)
      .get('ifRuleMain') as FormArray;
  }
  addBuisnessIfRuleMain(mainIndex: number) {
    this.buisnessRuleIfMain(mainIndex).push(this.newIfRuleMain());
  }
  removeBuisnessIfRuleMain(mainIndex: number, ifIndex: number) {
    this.buisnessRuleIfMain(mainIndex).removeAt(ifIndex);
  }
  ifButtonCondition(mainIndex: number, ifIndex: number) {
    let conValue = this.buisnessRuleIfMain(mainIndex)?.at(ifIndex)?.get("condType")?.value == "AND" ? "OR" : "AND";
    this.buisnessRuleIfMain(mainIndex).at(ifIndex).get("condType")?.setValue(conValue);
  }
  //ifRuleMain Rule End

  //Conditional Rule Start
  newConditional(): FormGroup {
    return this.formBuilder.group({
      condifCodition: '',
      condOperator: '',
      condValue: '',
      condType: '',
    });
  }
  buisnessRuleConditional(mainIndex: number, ifIndex: number): FormArray {
    return this.buisnessRuleIfMain(mainIndex)
      .at(ifIndex)
      .get('conditional') as FormArray;
  }
  addBuisnessRuleConditional(mainIndex: number, ifIndex: number) {
    this.buisnessRuleConditional(mainIndex, ifIndex).push(this.newConditional());
  }
  removeBuisnessRuleConditional(mainIndex: number, ifIndex: number, conditionIndex: number) {
    this.buisnessRuleConditional(mainIndex, ifIndex).removeAt(conditionIndex);
  }
  conditionalButton(mainIndex: number, ifIndex: number, conditionIndex: number) {
    let conValue = this.buisnessRuleConditional(mainIndex, ifIndex)?.at(conditionIndex)?.get("condType")?.value == "AND" ? "OR" : "AND";
    this.buisnessRuleConditional(mainIndex, ifIndex).at(conditionIndex).get("condType")?.setValue(conValue);
  }
  //Conditional Rule End

  //Then Conditional Rule Start
  newThen(): FormGroup {
    return this.formBuilder.group({
      thenTarget: '',
      thenOpratorForTarget: '=',
      thenResultValue: ''
    });
  }
  buisnessRuleThen(empIndex: number): FormArray {
    return this.buisnessRule()
      .at(empIndex)
      .get('thenCondition') as FormArray;
  }
  addBuisnessRuleThen(empIndex: number) {
    this.buisnessRuleThen(empIndex).push(this.newThen());
  }
  removeBuisnessRuleThen(empIndex: number, thenIndex: number) {
    this.buisnessRuleThen(empIndex).removeAt(thenIndex);
  }
  //Then Conditional Rule End


  saveBussinessRule() {
    
    this.businessRuleObj = [];
    this.businessForm.value.buisnessRule.forEach((rule: any) => {
      let ifConditions: any = [];

      rule.ifRuleMain.forEach((ifRule: any) => {
        let ifCondition = `${ifRule.ifCondition} ${ifRule.oprator} '${this.checkValueIntegerOrNot(ifRule.getValue)}'`;

        if (ifRule.conditional && ifRule.conditional.length > 0) {
          let conditionalConditions = ifRule.conditional.map((cond: any) => `${cond.condType === 'OR' ? '||' : cond.condType === 'AND' ? '&&' : ''} ${cond.condifCodition} ${cond.condOperator} '${this.checkValueIntegerOrNot(cond.condValue)}'`);
          ifCondition = `(${ifCondition} ${conditionalConditions.join(' ')}) ${ifRule.condType === 'AND' ? ' && ' : ifRule.condType === 'OR' ? ' || ' : ''} `;
        }

        ifConditions.push(ifCondition);
      });

      let ifConditionExpression = ifConditions.join('').trim();

      let thenConditions = rule.thenCondition.map((thenRule: any) => `${thenRule.thenTarget} ${thenRule.thenOpratorForTarget} '${thenRule.thenResultValue}'`);
      let thenConditionExpression = thenConditions.join(' , ');

      let ruleExpression = { if: ifConditionExpression, then: thenConditionExpression };
      this.businessRuleObj.push(ruleExpression);
    });

    console.log(this.businessRuleObj);


    const mainModuleId = this.screens.filter((a: any) => a.name == this.screenName)
    const businessRuleValid = {
      "screenName": this.screenName,
      "screenBuilderId": this.screenId,
      "applicationId": this.applicationId,
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
  }
  checkValueIntegerOrNot(value: any) {
    return /^[0-9]+$/.test(value) ? parseInt(value) : "'" + value + "'"
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
        buisnessRule: this.formBuilder.array([]),
      });
  }
}
