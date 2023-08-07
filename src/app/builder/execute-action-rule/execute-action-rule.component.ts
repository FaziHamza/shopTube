import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-execute-action-rule',
  templateUrl: './execute-action-rule.component.html',
  styleUrls: ['./execute-action-rule.component.scss']
})
export class ExecuteActionRuleComponent implements OnInit {
  actionList: any;
  actionRule: any;
  actionModel: any;
  actionResult: any;

  constructor() { }

  ngOnInit(): void {
  }

  db = {
    execute: async (query: any) => {
      // Simulate executing the query and getting results
      // In this example, we return a hardcoded result
      if (query.includes("userType")) {
        return { status: 1 }; // Simulate premium user
      } else if (query.includes("tblDiscount")) {
        return { discount: 10 }; // Simulate discount value
      } else {
        throw new Error("Unknown query");
      }
    },
  };

  executeAction = async (actionName: any, parameters: any) => {
    const action = this.actionList.find((a: any) => a.name === actionName);
    if (!action) {
      throw new Error(`Action ${actionName} not found`);
    }

    let query = action.query;
    // Replace placeholders with actual parameters
    for (const [key, value] of Object.entries(parameters)) {
      query = query.replace(`{${key}}`, value);
    }

    // Execute the query (simulated)
    const result = await this.db.execute(query);

    return result;
  };

  processActionRules = async (actionRules: any, context: any) => {
    debugger
    let results: any = {};
    this.actionList = JSON.parse(this.actionList);
    actionRules = JSON.parse(actionRules);
    context = JSON.parse(context);

    for (const rule of actionRules) {
      if (rule.if) {
        const { actionRule, key, compare, value } = rule.if;
        const actionResult = await this.executeAction(actionRule, context);
        results[actionRule] = actionResult;

        if (compare === "==") {
          if (actionResult.status === parseInt(value)) {
            if (rule.then) {
              results[`${actionRule}_then`] = "Applied discount";
            }
          }
        }
      }
    }
    this.actionList = JSON.stringify(this.actionList);
    this.actionResult = JSON.stringify(results);
    return results;
  };
}
