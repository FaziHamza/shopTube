import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-execute-action-rule',
  templateUrl: './execute-action-rule.component.html',
  styleUrls: ['./execute-action-rule.component.scss']
})
export class ExecuteActionRuleComponent  {
  actionList: any = JSON.stringify([
    {
      "name": "checkUserType",
      "query": "select status from userType where userType = {userTypeId}"
    },
    {
      "name": "applyUserTypeDiscount",
      "query": "select discount from tblDiscount"
    },
    {
      "name": "checkUserStatus",
      "query": "select status from userStatus where status = {status}"
    },
    {
      "name": "applyPremiumDiscount",
      "query": "select premiumDiscount from tblPremiumDiscount"
    },
    {
      "name": "checkMinimumValue",
      "query": "select price from product where price >= {price}"
    },
    {
      "name": "applySpecialOfferForNormalUser",
      "query": "select specialOffer from tblSpecialOffer where userTypeId = 2"
    },
    {
      "name": "notifyAdmin",
      "query": "insert into adminNotifications (message) values ('Price exceeded minimum value')"
    }
  ]);
  actionRule: any = JSON.stringify([
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
        }
      },
      "OR": {
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
      }
    },
    {
      "if": {
        "actionRule": "checkMinimumValue",
        "key": "price",
        "compare": ">=",
        "value": "200"
      },
      "AND": {
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
          }
        }
      },
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
  })
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

  executeAction  = async (actionName: string, parameters: any) => {
    const parsedRules = JSON.parse(this.actionList);
    const action = parsedRules.find((a:any) => a.name === actionName);
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
      const results = await this.processActionRulesV1(this.actionRule, this.actionModel);
      this.actionResult = JSON.stringify(results, null, 2);
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

              const { actionRule: orActionRule, key: orKey, compare: orCompare, value: orValue } = rule.OR.if;
              const orActionQuery = await this.executeAction(orActionRule, parsedContext);
              const orComparisonFunction = this.getComparisonFunction(orCompare);

              if (orComparisonFunction(orActionQuery, orValue)) {
                orConditionSatisfied = true;
              }

              thenConditionSatisfied = orConditionSatisfied;
            }
            if (rule.AND) {
              let andConditionSatisfied = true;

              const { actionRule: andActionRule, key: andKey, compare: andCompare, value: andValue } = rule.AND.if;
              const andActionQuery = await this.executeAction(andActionRule, parsedContext);
              const andComparisonFunction = this.getComparisonFunction(andCompare);

              if (!andComparisonFunction(andActionQuery, andValue)) {
                andConditionSatisfied = false;
              }

              thenConditionSatisfied = thenConditionSatisfied && andConditionSatisfied;
            }
            if (thenConditionSatisfied) {
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
          }
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
          return parseFloat(columnValue[columnValue.length -1]) >= parseFloat(right);
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




}
