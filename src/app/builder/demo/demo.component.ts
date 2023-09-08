import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})

export class DemoComponent implements OnInit {

  constructor(private fb: FormBuilder,private employeeService:EmployeeService) { }

  actionList: any = JSON.stringify([
    {
      "name": "checkUserType",
      "query": "select userTypeId from Users where userTypeId = {userTypeId}"
    },
    {
      "name": "checkUserStatus",
      "query": "select status from Users where status = {status}"
    },
    {
      "name": "applyUserTypeDiscount",
      "query": "update Discounts set discountPercentage = 10 where userType = {userTypeId}"
    },
    {
      "name": "applyPremiumDiscount",
      "query": "update Discounts set discountPercentage = 20 where userType = 'premium'"
    },
    {
      "name": "checkMinimumValue",
      "query": "select price from Products where price = {price}"
    },
    {
      "name": "applySpecialOfferForNormalUser",
      "query": "update Discounts set discountPercentage = 15 where userType = 'normal'"
    },
    {
      "name": "notifyAdmin",
      "query": "insert into Notifications (message) values ('Special offer applied for product with price >= {price}')"
    },
    {
      "name": "sendNotification",
      "query": "insert into Notifications (message) values ('Discount applied for user with id = {userId}')"
    }
  ]
  );
  actionRule: any = JSON.stringify(
    [
      {
        "if": {
          "actionRule": "checkUserType",
          "key": "userTypeId",
          "compare": "==",
          "value": "1"
        },
        "then": {
          "applyDiscount": {
            "actionRule": "applyUserTypeDiscount",
            "key": "userTypeId"
          },
          "notifyUser": {
            "actionRule": "sendNotification",
            "key": "userTypeId"
          }
        },
        "OR": [{
          "if": {
            "actionRule": "checkUserStatus",
            "key": "status",
            "compare": "==",
            "value": "premium"
          },
          "then": {
            "applyPremiumDiscount": {
              "actionRule": "applyPremiumDiscount",
              "key": "status"
            }
          }
        }]
      },
      {
        "if": {
          "actionRule": "checkMinimumValue",
          "key": "price",
          "compare": ">=",
          "value": "200"
        },
        "AND": [{
          "if": {
            "actionRule": "checkUserType",
            "key": "userTypeId",
            "compare": "==",
            "value": "2"
          },
          "then": {
            "applySpecialOfferForNormalUser": {
              "actionRule": "applySpecialOfferForNormalUser",
              "key": "price"
            },
            "notifyUser": {
              "actionRule": "sendNotification",
              "key": "price"
            }
          }
        }],
        "then": {
          "notifyAdmin": {
            "actionRule": "notifyAdmin",
            "key": "price"
          }
        }
      }
    ]
  );
  actionModel: any = JSON.stringify({
    "userTypeId": 1,
    "status": "premium",
    "price": 250
  }
  )
  actionResult: any;
  db = {
    execute: async (query: string) => {
      if (query.includes("userType")) {
        return { status: 1 }; // Simulate premium user
      } else if (query.includes("tblDiscount")) {
        return { discount: 10 }; // Simulate discount value
      } else {
        throw new Error("Unknown query");
      }
    },
  };

  executeAction = async (actionName: string, parameters: any) => {
    const parsedRules = JSON.parse(this.actionList);
    const action = parsedRules.find((a: any) => a.name === actionName);
    if (!action) {
      throw new Error(`Action ${actionName} not found`);
    }

    let query = action.query;
    for (const [key, value] of Object.entries(parameters)) {
      query = query.replace(`{${key}}`, value);
    }

    // Simulate action execution, replace with actual logic to interact with your database or API
    // const result = await this.executeDatabaseQuery(query);

    return query;
  }


  async processActionRules() {
    try {
      await this.employeeService.saveSQLDatabaseTable('knex-query/execute-actions' ,JSON.parse(this.actionModel)).subscribe(res=>{
        this.actionResult = JSON.stringify(res, null, 2);
      })
      // const results = await this.processActionRulesV1(this.actionRule, this.actionModel);
    } catch (error) {
      console.error('Error while processing action rules:', error);
      this.actionResult = 'Error occurred while processing action rules';
    }
  }

  async processActionRulesV1(actionRules: any, context: any) {
    let actionModel = JSON.parse(this.actionModel);
    const results: any = {};
    const parsedRules = JSON.parse(actionRules);
    const parsedContext = JSON.parse(context);

    for (const rule of parsedRules) {
      if (rule.if) {
        try {
          const { actionRule, key, compare, value } = rule.if;
          const actionQuery = await this.executeAction(actionRule, parsedContext);

          // Get the dynamic comparison function based on the operator
          const comparisonFunction = this.getComparisonFunction(compare);

          // Perform the comparison using the dynamic function
          if (comparisonFunction(actionQuery, value)) {
            let thenConditionSatisfied = true;

            // Check if there is an OR condition
            if (rule.OR) {
              let orConditionSatisfied = false;

              for (const orRule of rule.OR) {
                const { actionRule: orActionRule, key: orKey, compare: orCompare, value: orValue } = orRule.if;
                const orActionQuery = await this.executeAction(orActionRule, parsedContext);
                const orComparisonFunction = this.getComparisonFunction(orCompare);

                if (orComparisonFunction(orActionQuery, orValue)) {
                  orConditionSatisfied = true;
                }
                thenConditionSatisfied = orConditionSatisfied;
                if (thenConditionSatisfied) {
                  if (orRule.then) {
                    const thenActions = orRule.then;
                    for (const actionKey in thenActions) {
                      if (thenActions.hasOwnProperty(actionKey)) {
                        const thenAction = thenActions[actionKey];
                        if (thenAction.actionRule) {
                          const thenActionResult = await this.executeAction(
                            thenAction.actionRule,
                            context
                          );
                          results[actionRule] = thenActionResult;
                          actionModel[actionKey] = thenActionResult;
                        }
                      }
                    }
                  }
                }
              }

            }

            // Check if there is an AND condition
            if (rule.AND) {
              let andConditionSatisfied = true;

              for (const andRule of rule.AND) {
                const { actionRule: andActionRule, key: andKey, compare: andCompare, value: andValue } = andRule.if;
                const andActionQuery = await this.executeAction(andActionRule, parsedContext);
                const andComparisonFunction = this.getComparisonFunction(andCompare);

                if (!andComparisonFunction(andActionQuery, andValue)) {
                  andConditionSatisfied = false;
                }
                thenConditionSatisfied = thenConditionSatisfied && andConditionSatisfied;
                if (thenConditionSatisfied) {
                  if (andRule.then) {
                    const thenActions = andRule.then;
                    for (const actionKey in thenActions) {
                      if (thenActions.hasOwnProperty(actionKey)) {
                        const thenAction = thenActions[actionKey];
                        if (thenAction.actionRule) {
                          const thenActionResult = await this.executeAction(
                            thenAction.actionRule,
                            context
                          );
                          results[actionRule] = thenActionResult;
                          actionModel[actionKey] = thenActionResult;
                        }
                      }
                    }
                  }
                }
              }

            }

            if (rule.then) {
              const thenActions = rule.then;
              for (const actionKey in thenActions) {
                if (thenActions.hasOwnProperty(actionKey)) {
                  const thenAction = thenActions[actionKey];
                  if (thenAction.actionRule) {
                    const thenActionResult = await this.executeAction(
                      thenAction.actionRule,
                      context
                    );
                    results[actionRule] = thenActionResult;
                    actionModel[actionKey] = thenActionResult;
                  }
                }
              }
            }
          }
          // Always apply the 'then' actions of the main condition

        } catch (error) {
          console.error(`Error while processing action rule: ${JSON.stringify(rule)}`, error);
        }
      }
    }
    this.actionModel = JSON.stringify(actionModel);
    return results;
  }



  getComparisonFunction(operator: string): (left: any, right: any) => boolean {
    switch (operator) {
      case '==':
        return (left, right) => left.includes(`= ${right}`);
      case '>':
        return (left, right) => {
          const columnValue = left.split(/([\s><=]+)/);
          return parseFloat(columnValue) > parseFloat(right);
        };
      case '!=':
        return (left, right) => left.includes(`!= ${right}`);
      case '>=':
        return (left, right) => {
          let columnValue = left.split(/([\s><=]+)/);
          return parseFloat(columnValue[columnValue.length - 1]) >= parseFloat(right);
        };
      case '<=':
        return (left, right) => {
          const [, , columnValue] = left.split(/([\s><=]+)/);
          return parseFloat(columnValue) <= parseFloat(right);
        };
      case '<':
        return (left, right) => {
          const [, , columnValue] = left.split(/([\s><=]+)/);
          return parseFloat(columnValue) < parseFloat(right);
        };
      default:
        throw new Error(`Unknown comparison operator: ${operator}`);
    }
  }

  // Rules Form

  ruleForm: FormGroup;
  ngOnInit() {
    this.ruleForm = this.fb.group({
      actionRules: this.fb.array([])
    });
    this.addRule(); // Add first rule
  }
  actionRulesControl(): FormArray {
    return this.ruleForm.get('actionRules') as FormArray;
  }

  get actionRules() {
    return this.ruleForm.get('actionRules') as FormArray;
  }

  addIfThenActions(ifIndex: number): FormArray {
    return this.actionRulesControl()
      .at(ifIndex)
      .get('then') as FormArray;
  }
  createRuleGroup(rule?: any): FormGroup {
    return this.fb.group({
      if: this.fb.group({
        actionRule: ['', Validators.required],
        key: ['', Validators.required],
        compare: ['', Validators.required],
        value: ['', Validators.required]
      }),
      then: this.fb.array([]),
      OR: this.fb.array([]),
      AND: this.fb.array([])
    });
  }
  createThenAction(): FormGroup {
    return this.fb.group({
      actionRule: ['', Validators.required],
      key: ['', Validators.required],
      // Add other form controls for your "then" action properties here
    });
  }
  addRule() {
    this.actionRules.push(this.createRuleGroup());
  }

  removeRule(index: number) {
    this.actionRules.removeAt(index);
  }

  addIfThenAction(index: number) {
    this.addIfThenActions(index).push(this.createThenAction());
  }

  removeIfThenAction(index: number) {
    this.addIfThenActions(index).removeAt(index);
  }
  removeIfThen(index: number) {
    this.actionRulesControl().removeAt(index);
  }
  removeThenAction(parentIndex: number, index: number) {
    this.addIfThenActions(parentIndex).removeAt(index);
  }

  addORCondition(ruleGroup: FormGroup) {
    const orConditions = ruleGroup.get('OR') as FormArray;
    orConditions.push(this.createRuleGroup());
  }

  removeORCondition(ruleGroup: FormGroup, index: number) {
    const orConditions = ruleGroup.get('OR') as FormArray;
    orConditions.removeAt(index);
  }

  addANDCondition(ruleGroup: FormGroup) {
    const andConditions = ruleGroup.get('AND') as FormArray;
    andConditions.push(this.createRuleGroup());
  }

  // AND condition
  createAndCondition(): FormGroup {
    return this.fb.group({
      if: this.fb.group({
        actionRule: ['', Validators.required],
        key: ['', Validators.required],
        compare: ['', Validators.required],
        value: ['', Validators.required]
      }),
      then: this.fb.array([]),
      OR: this.fb.array([]),
      AND: this.fb.array([])
    });
  }

  addIfAndAction(ruleIndex: number) {
    this.addIfAndActions(ruleIndex).push(this.createAndCondition());
  }

  addIfAndActions(ifIndex: number): FormArray {
    return this.actionRulesControl()
      .at(ifIndex)
      .get('AND') as FormArray;
  }

  removeIfAndAction(parentIndex: number, index: number) {
    this.addIfAndActions(parentIndex).removeAt(index);
  }

  addThenActions(ruleIndex: number, andIndex: number): FormArray {
    const andConditions = this.addIfAndActions(ruleIndex);
    const andCondition = andConditions.at(andIndex) as FormGroup;
    return andCondition.get('then') as FormArray;
  }

  removeANDCondition(ruleIndex: number, andIndex: number): void {
    const andConditions = this.addIfAndActions(ruleIndex);
    andConditions.removeAt(andIndex);
  }

  addThenAction(ruleIndex: number, andIndex: number): void {
    const thenActions = this.addThenActions(ruleIndex, andIndex);
    thenActions.push(this.createThenAction());
  }

  removeAndThenAction(ruleIndex: number, andIndex: number, thenIndex: number): void {
    const thenActions = this.addThenActions(ruleIndex, andIndex);
    thenActions.removeAt(thenIndex);
  }
}

