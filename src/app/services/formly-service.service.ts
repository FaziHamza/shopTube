// import { ChangeDetectorRef, Injectable } from '@angular/core';
// import { TreeNode } from '../models/treeNode';
// import { EmployeeService } from './employee.service';
// // import * as Joi from 'joi';
// // import { faker } from '@faker-js/faker';
// // import { DetailCardComponent } from '../sharedComponent/ProfileCard/detail-card/detail-card.component';
// // import { ruleFactory } from '@elite-libs/rules-machine';

// @Injectable({
//   providedIn: 'root'
// })
// export class FormlyServiceService {
//   dropTargetIds: string[] = [];
//   nodeLookup: any = [];
//   rowData: any = [];
//   columnData: any = [];
//   nodes: TreeNode[];
//   templateNode: TreeNode[];
//   screenModule: any;
//   screenName: any;
//   formlyModel: any;
//   screenNode: any = [];
//   ruleValidation: any = {};
//   ruleObj: any = {};
//   scheemaValidation: any;
//   validationCheckStatus: any = [];
//   setErrorToInput: any = [];

//   selectdNode: TreeNode;
//   testInput: string ;
//   testInputNumber: string;
//   screenData: any;
//   GridBusinessRuleData: any;
//   //This variable is used to get url through upload image in upload image component configuration
//   imageUrl: any;
//   gridData: any = [];
//   constructor(public employeeService: EmployeeService) { }



//   evalConditionRule(query: any, dataTargetIfValue: any) {
//     dataTargetIfValue.forEach((e: any) => {
//       let type = e.conditonType == "AND" ? "&&" : "||";
//       type = query == '' ? "" : type;
//       let getModelValue = this.formlyModel[e.ifMenuName] == "" ? "''" : this.formlyModel[e.ifMenuName];
//       if (getModelValue == undefined)
//         getModelValue = "";

//       if (e.condationName == 'contains') {
//         if (this.formlyModel[e.ifMenuName] != undefined && this.formlyModel[e.ifMenuName].includes(e.targetValue))
//           query = query + " " + type + " " + '1 == 1';
//         else
//           query = query + " " + type + " " + '1 == 2';
//       } else if (e.condationName == 'null') {
//         if (typeof (this.formlyModel[e.ifMenuName]) != "number") {
//           if (this.formlyModel[e.ifMenuName] == '' || this.formlyModel[e.ifMenuName] == null)
//             query = query + " " + type + " " + '1 == 1';
//           else
//             query = query + " " + type + " " + '1 == 2';
//         }
//         else
//           query = query + " " + type + " " + '1 == 2';
//       } else {
//         if (e.ifMenuName.includes('number') || e.ifMenuName.includes('decimal')) {
//           query = query + " " + type + " " + Number(getModelValue) + " " + e.condationName + " " + e.targetValue;
//         }
//         else {
//           query = query + " " + type + " '" + getModelValue + "' " + e.condationName + " '" + e.targetValue + "'";
//         }
//       }
//     });
//     return query;
//   }
//   checkConditionUIRule(model: any, currentValue: any) {
//
//     if (this.screenData != undefined) {
//       var inputType = this.nodes[0].children[1].children[0].children[1].children
//       for (let j = 0; j < inputType.length; j++) {
//         for (let index = 0; index < this.screenData.uiData.length; index++) {
//           if (inputType[j].chartCardConfig == undefined) {
//             let query: any;
//             let getModelValue = this.formlyModel[this.screenData.uiData[index].ifMenuName] == "" ? false : this.formlyModel[this.screenData.uiData[index].ifMenuName];
//             if (this.screenData.uiData[index].condationName == 'contains') {
//               if (this.formlyModel[this.screenData.uiData[index].ifMenuName] != undefined &&
//                 this.formlyModel[this.screenData.uiData[index].ifMenuName].includes(this.screenData.uiData[index].targetValue)) {
//                 query = '1 == 1';
//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }
//               else {
//                 query = '1 == 2';
//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }
//             } else if (this.screenData.uiData[index].condationName == 'null') {
//               if (typeof (this.formlyModel[this.screenData.uiData[index].ifMenuName]) != "number") {
//                 if (this.formlyModel[this.screenData.uiData[index].ifMenuName] == '' || this.formlyModel[this.screenData.uiData[index].ifMenuName] == null) {
//                   query = '1 == 1';
//                   query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//                 }
//                 else {
//                   query = '1 == 2';
//                   query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//                 }
//               } else {
//                 query = '1 == 2';
//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }

//             } else {
//               if (this.screenData.uiData[index].ifMenuName.includes('number') || this.screenData.uiData[index].ifMenuName.includes('decimal')) {
//                 query = Number(getModelValue) + " " + this.screenData.uiData[index].condationName + " " + this.screenData.uiData[index].targetValue;

//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               } else {
//                 query = "'" + getModelValue + "' " + this.screenData.uiData[index].condationName + " '" + this.screenData.uiData[index].targetValue + "'";

//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }
//             }
//             if (eval(query)) {
//               inputType = this.makeUIJSONForSave(this.screenData, index, inputType, true);
//             }
//             else {
//               inputType = this.makeUIJSONForSave(this.screenData, index, inputType, false);
//             }
//           } else if (inputType[j].chartCardConfig[0].formly != undefined) {
//             let query: any;
//             let getModelValue = this.formlyModel[this.screenData.uiData[index].ifMenuName] == "" ? false : this.formlyModel[this.screenData.uiData[index].ifMenuName];
//             if (this.screenData.uiData[index].condationName == 'contains') {
//               if (this.formlyModel[this.screenData.uiData[index].ifMenuName] != undefined &&
//                 this.formlyModel[this.screenData.uiData[index].ifMenuName].includes(this.screenData.uiData[index].targetValue)) {
//                 query = '1 == 1';
//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }
//               else {
//                 query = '1 == 2';
//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }
//             } else if (this.screenData.uiData[index].condationName == 'null') {
//               if (typeof (this.formlyModel[this.screenData.uiData[index].ifMenuName]) != "number") {
//                 if (this.formlyModel[this.screenData.uiData[index].ifMenuName] == '' || this.formlyModel[this.screenData.uiData[index].ifMenuName] == null) {
//                   query = '1 == 1';
//                   query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//                 }
//                 else {
//                   query = '1 == 2';
//                   query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//                 }
//               } else {
//                 query = '1 == 2';
//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }

//             } else {
//               if (this.screenData.uiData[index].ifMenuName.includes('number') || this.screenData.uiData[index].ifMenuName.includes('decimal')) {
//                 query = Number(getModelValue) + " " + this.screenData.uiData[index].condationName + " " + this.screenData.uiData[index].targetValue;

//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               } else {
//                 query = "'" + getModelValue + "' " + this.screenData.uiData[index].condationName + " '" + this.screenData.uiData[index].targetValue + "'";

//                 query = this.evalConditionRule(query, this.screenData.uiData[index].targetIfValue);
//               }
//             }
//             if (eval(query)) {
//               inputType = this.makeUIJSONForSave(this.screenData, index, inputType, true);
//             }
//             else {
//               inputType = this.makeUIJSONForSave(this.screenData, index, inputType, false);
//             }
//           }
//         }
//       }
//       this.nodes[0].children[1].children[0].children[1].children = [];
//       this.nodes[0].children[1].children[0].children[1].children = inputType;
//       this.clickBack(model, currentValue);
//     }
//   }
//   lastFormlyModelValue: string;
//   makeUIJSONForSave(screenData: any, index: number, inputType: TreeNode[], currentValue: boolean) {
//     for (let k = 0; k < screenData.uiData[index].targetCondition.length; k++) {
//       for (let l = 0; l < inputType.length; l++) {
//         if (inputType[l].type == "button" || inputType[l].type == "linkButton" || inputType[l].type == "dropdownButton") {
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].buttonGroup[0].btnConfig[0].key && currentValue) {
//             inputType[l].chartCardConfig[0].buttonGroup[0] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//             // const element = this.screenData.uiData[index].targetCondition[k].changeData;
//             // var arr = JSON.parse(JSON.stringify(this.screenData.uiData[index].targetCondition[k].inputOldJsonData));
//             // arr = arr.chartCardConfig[0].buttonGroup[0].btnConfig[0];
//             // for (let objIndex = 0; objIndex < element.length; objIndex++) {
//             //   for (const key of Object.keys(arr)) {
//             //     if (element[objIndex].key === key) {
//             //       arr[key] = element[objIndex].value;
//             //     }
//             //     //  else if (typeof arr[key] === 'object') {
//             //     //   for (const childKey of Object.keys(arr[key][0])) {
//             //     //     if (element[objIndex].key === childKey) {
//             //     //       arr[key][0][childKey] = element[objIndex].value;
//             //     //     }
//             //     //   }
//             //     // }
//             //   }
//             //   inputType[1].chartCardConfig[0].buttonGroup[0].btnConfig[0] = JSON.parse(JSON.stringify(arr));
//             // }
//           } else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].buttonGroup[0].btnConfig[0].key && !currentValue)
//             inputType[l].chartCardConfig[0].buttonGroup[0] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//         } else if (inputType[l].type == "buttonGroup") {
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].key && currentValue)
//             inputType[l].children = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//           else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].key && !currentValue)
//             inputType[l].children = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//           // }
//         } else if (inputType[l].type == "stepperMain") {
//           for (let m = 0; m < inputType[l].children.length; m++) {
//             if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].chartCardConfig[0].formly[0].fieldGroup[0].key && currentValue)
//               inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//             else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].chartCardConfig[0].formly[0].fieldGroup[0].key && !currentValue)
//               inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//           }
//         } else if (inputType[l].type == "input" || inputType[l].type == "inputGroup" || inputType[l].type == "checkbox" || inputType[l].type == "color" ||
//           inputType[l].type == "decimal" || inputType[l].type == "image" || inputType[l].type == "multiselect" ||
//           inputType[l].type == "radiobutton" || inputType[l].type == "search" || inputType[l].type == "repeatSection" ||
//           inputType[l].type == "tags" || inputType[l].type == "telephone" || inputType[l].type == "textarea"
//           || inputType[l].type == "date" || inputType[l].type == "datetime" || inputType[l].type == "month"
//           || inputType[l].type == "time" || inputType[l].type == "week") {
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].key && currentValue) {
//             inputType[l].chartCardConfig[0].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//             this.lastFormlyModelValue = inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].defaultValue;
//             this.formlyModel[inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].key.toString()] = inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].defaultValue;
//           }
//           else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].key && !currentValue) {
//             inputType[l].chartCardConfig[0].formly[0].fieldGroup[0] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//             if (this.formlyModel[inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].key.toString()] == this.lastFormlyModelValue)
//               this.formlyModel[inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].key.toString()] = inputType[l].chartCardConfig[0].formly[0].fieldGroup[0].defaultValue;
//           }
//         } else if (inputType[l].type == "alert") {
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].alertConfig[0].key && currentValue)
//             inputType[l].chartCardConfig[0].alertConfig[0] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//           else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].alertConfig[0].key && !currentValue)
//             inputType[l].chartCardConfig[0].alertConfig[0] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//         } else if (inputType[l].type == "card") {
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].key && currentValue)
//             inputType[l].chartCardConfig[0] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//           else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].key && !currentValue)
//             inputType[l].chartCardConfig[0] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//         } else if (inputType[l].type == "simpleCardWithHeaderBodyFooter") {
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].key && currentValue)
//             inputType[l].chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//           else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].chartCardConfig[0].key && !currentValue)
//             inputType[l].chartCardConfig[0].simpleCardWithHeaderBodyFooterConfig = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//         } else if (inputType[l].type == "mainDashonicTabs") {
//           for (let m = 0; m < inputType[l].children.length; m++) {
//             if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].key && currentValue)
//               inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//             else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].children[m].key && !currentValue)
//               inputType[l].children[m] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//           }
//         } else if (inputType[l].type == "gridList" || inputType[l].type == "gridListEditDelete") {
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && currentValue)
//             inputType[l] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//           else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue)
//             inputType[l] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//         } else if (inputType[l].type == "header" || inputType[l].type == "paragraph") {
//
//           if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && currentValue)
//             inputType[l] = this.screenData.uiData[index].targetCondition[k].inputJsonData;
//           else if (this.screenData.uiData[index].targetCondition[k].targetName == inputType[l].key && !currentValue)
//             inputType[l] = this.screenData.uiData[index].targetCondition[k].inputOldJsonData;
//         }
//       }
//     }
//     return inputType;
//   }
//   clickBack(model: any, currentValue: any) {
//     this.templateNode = [];
//     this.templateNode = JSON.parse(
//       JSON.stringify(this.nodes, (key, value) => {
//         if (typeof value == 'function') {
//           return value.toString();
//         } else {
//           return value;
//         }
//       }), (key, value) => {
//         if (typeof value === 'string' && value.startsWith('(')) {
//           return eval(`(${value})`);
//         }
//         return value;
//       });
//     this.formlyModel[model.key] = currentValue;
//     let makeObject = Object.assign({}, this.formlyModel)
//     let oldformly = JSON.parse(JSON.stringify(makeObject));
//     this.prepareDragDrop(this.templateNode, this.selectdNode);
//     this.formlyModel = oldformly;
//
//     let newSelectedNode = this.findElementNode(this.nodes, model.key);
//     newSelectedNode.chartCardConfig[0].formly[0].fieldGroup[0].focus = true;
//   }
//   jsonStringifData() {
//     this.templateNode = [];
//     this.templateNode = JSON.parse(
//       JSON.stringify(this.nodes, (key, value) => {
//         if (typeof value == 'function') {
//           return value.toString();
//         } else {
//           return value;
//         }
//       }), (key, value) => {
//         if (typeof value === 'string' && value.startsWith('(')) {
//           return eval(`(${value})`);
//         }
//         return value;
//       });
//     this.prepareDragDrop(this.templateNode, this.selectdNode);
//   }
//   prepareDragDrop(nodes: TreeNode[], selecteNode?: TreeNode) {

//     nodes.forEach((node, index) => {
//       this.dropTargetIds.push(node.id);
//       // var v =(node.id.toString());
//       this.nodeLookup[node.id] = node;
//       if (true) { //node.type == "pages"
//         // data[i].type == "pageBody"
//         let getWorkingNode = JSON.parse(
//           JSON.stringify(node, function (key, value) {
//             if (typeof value == 'function') {
//               return value.toString();
//             } else {
//               return value;
//             }
//           }), (key, value) => {
//             // if (typeof value != 'string') return value;
//             // return (value.substring(0, 8) == 'function') ? eval('(' + value + ')') : value;
//             if (typeof value === 'string' && value.startsWith('(')) {
//               return eval(`(${value})`);
//             }
//             return value;
//           });

//         // let getWorkingNode = JSON.parse(JSON.stringify(node));
//         if (node.type == "pageBody") {
//           for (let findNode = 0; findNode < getWorkingNode.children.length; findNode++) {
//             const element = getWorkingNode.children[findNode];
//             if (element.type == "according") {
//               // node.chartCardConfig = this.wrapperForChartCardFeilds(element.children);
//               // if(node.chartCardConfig.length > 0)
//               // {
//               //
//               // }
//               for (let index = 0; index < element.children.length; index++) {

//                 if (element.children[index].id.includes("accordingHeader")) {

//                   if (node.headerButtonGroupData == undefined) {
//                     node.headerButtonGroupData = [];
//                     element.children[index].children.forEach((element2: any) => {
//                       if (element2.type == "button" || element2.type == "linkButton") {
//                         element2 = this.makePropertiesInBtn(element2, "button")
//                       } if (element2.type == "buttonGroup") {
//                         if (element2.children.length > 0) {
//                           element2 = this.makePropertiesInBtn(element2, "buttonGroup")
//                         }
//                       }

//                     });
//                     node.headerButtonGroupData.push(this.wrapperForButtonFeilds(element.children[index].children));
//                   }
//                   else {
//                     let buttonData = JSON.parse(JSON.stringify(element.children[index].children))
//                     node.headerButtonGroupData.push(this.wrapperForButtonFeilds(buttonData));
//                   }
//                 }
//                 else if (element.children[index].id.includes("accordingBody")) {
//                   let changeJSON = JSON.parse(
//                     JSON.stringify(element.children, function (key, value) {
//                       if (typeof value == 'function') {
//                         return value.toString();
//                       } else {
//                         return value;
//                       }
//                     }), (key, value) => {
//                       // if (typeof value != 'string') return value;
//                       // return (value.substring(0, 8) == 'function') ? eval('(' + value + ')') : value;
//                       if (typeof value === 'string' && value.startsWith('(')) {
//                         return eval(`(${value})`);
//                       }
//                       return value;
//                     });
//                   // let changeJSON = JSON.parse(JSON.stringify(element.children));


//                   let commonData = this.wrapperForChartCardFeilds(changeJSON, selecteNode);
//                   if (commonData.length > 0) {
//                     if (node.chartCardConfig == undefined) {
//                       node.chartCardConfig = [];
//                       node.chartCardConfig.push(commonData);
//                     }
//                     else
//                       node.chartCardConfig.push(commonData);
//                   }
//                 }
//                 else if (element.children[index].id.includes("accordingFooter")) {
//                   if (node.footerButtonGroupData == undefined) {
//                     node.footerButtonGroupData = [];
//                     element.children[index].children.forEach((element2: any) => {
//                       if (element2.type == "button" || element2.type == "linkButton") {
//                         element2 = this.makePropertiesInBtn(element2, "button")
//                       } if (element2.type == "buttonGroup") {
//                         if (element2.children.length > 0) {
//                           element2 = this.makePropertiesInBtn(element2, "buttonGroup")
//                         }
//                       }
//                     });

//                     node.footerButtonGroupData.push(this.wrapperForButtonFeilds(element.children[index].children));
//                   }
//                   else {
//                     let buttonData = JSON.parse(JSON.stringify(element.children[index].children))
//                     node.footerButtonGroupData.push(this.wrapperForButtonFeilds(buttonData));
//                   }
//                 }
//               }
//               // if (element.children[0]?.type == "accordingHeader") {
//               //   node.buttonGroupData = this.wrapperForButtonFeilds(element.children);
//               // }
//               // else if (element.children[1]?.type == "accordingBody") {

//               // }
//               // else if (element.children[0]?.type == "accordingFooter") {
//               // }
//               // this.wrapperForCombineFeilds(element.children.filter(x => x.type != "button"));
//             }
//           }

//         }
//         else if (node.type == "pageFooter") {

//           for (let index = 0; index < getWorkingNode.children.length; index++) {
//             if (getWorkingNode.children[index].children.type == "button" || getWorkingNode.children[index].children.type == "linkButton") {
//               getWorkingNode.children[index].children = this.makePropertiesInBtn(getWorkingNode.children[index].children, "button")
//             } if (getWorkingNode.children[index].children.type == "buttonGroup") {
//               if (getWorkingNode.children[index].children[0].children.length > 0) {
//                 getWorkingNode.children[index].children = this.makePropertiesInBtn(getWorkingNode.children[index].children, "buttonGroup")
//               }
//             }
//             let buttondatatype = [];
//             buttondatatype.push(getWorkingNode.children[index]);

//             if (node.pageFooterButtonGroupData == undefined) {
//               // node.pageHeaderData = this.wrapperForChartCardFeilds(element.children);
//               node.pageFooterButtonGroupData = [];
//               node.pageFooterButtonGroupData.push(this.wrapperForButtonFeilds(buttondatatype));
//             }
//             else {
//               node.pageFooterButtonGroupData.push(this.wrapperForButtonFeilds(buttondatatype));
//             }
//           }
//           // for (let findNode = 0; findNode < getWorkingNode.children.length; findNode++) {
//           //   const element = getWorkingNode.children[findNode];
//           //   node.pageFooterData = this.wrapperForChartCardFeilds(element.children);
//           //   node.pageFooterButtonGroupData = this.wrapperForButtonFeilds(element.children);
//           // }
//         }
//         else if (node.type == "pageHeader") {

//           node.pageHeaderAlertData = [];
//           for (let index = 0; index < getWorkingNode.children.length; index++) {
//             if (getWorkingNode.children[index].type == 'button' || getWorkingNode.children[index].type == 'buttonGroup' || getWorkingNode.children[index].type == 'linkButton' || getWorkingNode.children[index].type == 'dropdownButton') {
//               if (getWorkingNode.children[index].type == 'button' || getWorkingNode.children[index].type == 'linkButton' || getWorkingNode.children[index].type == 'dropdownButton') {
//                 getWorkingNode.children[index] = this.makePropertiesInBtn(getWorkingNode.children[index], "button")
//               } if (getWorkingNode.children[index].type == 'buttonGroup') {
//                 getWorkingNode.children[index] = this.makePropertiesInBtn(getWorkingNode.children[index], "buttonGroup")
//               }
//               let buttondatatype = [];
//               buttondatatype.push(getWorkingNode.children[index]);
//               if (node.pageHeaderButtonGroupData == undefined) {
//                 // node.pageHeaderData = this.wrapperForChartCardFeilds(element.children);
//                 node.pageHeaderButtonGroupData = [];
//                 node.pageHeaderButtonGroupData.push(this.wrapperForButtonFeilds(buttondatatype));
//               }
//               else {
//                 node.pageHeaderButtonGroupData.push(this.wrapperForButtonFeilds(buttondatatype));
//               }
//             }
//             else if (getWorkingNode.children[index].type == 'alert') {
//               node.pageHeaderAlertData.push(getWorkingNode.children[index]);
//               // let alertDataType = [];
//               // alertDataType.push(getWorkingNode.children[index]);
//               // if (node.pageHeaderAlertData == undefined) {
//               // node.pageHeaderAlertData = [];
//               // node.pageHeaderAlertData.push(this.wrapperFroAlertFields(alertDataType));
//               // node.pageHeaderAlertData.push(getWorkingNode.children[index]);
//               // length = node.pageHeaderAlertData.length - 1;
//               // node.pageHeaderAlertData[length]["highLight"] = [];
//               // node.pageHeaderAlertData[length]["highLight"] = getWorkingNode.children[index].highLight;
//               // }
//             }

//           }
//         }


//         // for (let b = 0; b < node.children.length; b++) {
//         //   if (node.children[b].type == "button") {
//         //     node.btnConfig = this.wrapperForButtonFeilds(node.children.filter(x => x.type == "button"))[0];
//         //   }
//         // }

//         //   for (let n = 0; n < node.children[b].children.length; n++) {
//         //     if (node.children[b].children[n].type == "button") {
//         //       node.btnConfig = this.wrapperForButtonFeilds(node.children[b].children.filter(x => x.type == "button"));
//         //     }
//         // }
//         //
//         // let gridListData = node?.children[1]?.children[0]?.children[1]?.children;
//         // if (gridListData?.length > 0) {
//         //   for (let b = 0; b < gridListData?.length; b++) {

//         //     if (gridListData[b]?.type == "gridList") {
//         //       if (this.columnData.length == 0) {
//         //         for (let j = 0; j < gridListData[0]?.children.length; j++) {
//         //           this.columnData.push(gridListData[0]?.children[j]?.gridList[0])
//         //           this.rowData.push(gridListData[0]?.children[j]?.gridList[0])
//         //         }
//         //       }
//         //       if (gridListData[b]?.type == "gridList" && this.columnData.length > 0) {
//         //         const objData = { "rowData": this.rowData, "columnData": this.columnData };
//         //         node['gridData'] = [];
//         //         node.gridData.push(objData);
//         //       }
//         //     }
//         //   }
//         // }
//         // if (node.children.length > 0) {
//         //   for (let b = 0; b < node.children.length; b++) {
//         //     if (node.children[b].type == "button") {
//         //       node.btnConfig = this.wrapperForButtonFeilds(node.children.filter(x => x.type == "button"));
//         //     }
//         //   }
//         // }
//         this.prepareDragDrop(node.children, selecteNode);
//       }
//       else {
//         // node.formlyData = this.wrapperForCombineSimpleFeilds(node.children);
//         // this.prepareDragDrop(node.children);
//       }

//       // if (node.type == 'gridList') {
//       //
//       //   node.gridData = this.wrapperForGrid(node.children);
//       //   this.prepareDragDrop(node.children);
//       // }
//       // node.btnConfig = this.wrapperForButtonFeilds(node.children.filter(x=>x.id=='button'));
//     });
//     this.makeFaker();
//   }

//   wrapperForButtonFeilds(data: TreeNode[]) {

//     let indexNumber = 0;
//     let assignNumber = 0;
//     let isGenerate = false;
//     let array: any[] = [];
//     for (let i = 0; i < data.length; i++) {
//       indexNumber = assignNumber;
//       isGenerate = false;
//       if (data[i].id.includes("common")) {
//         if (data[i].children.length > 0) {
//           for (let index = 0; index < data[i].children.length; index++) {
//             if (index == 0) {
//               if (array[indexNumber] == undefined) {
//                 array[indexNumber] = Object.assign({}, ...data[i].children[index].chartCardConfig[0].buttonGroup);
//               } else if (array[indexNumber] == undefined)
//                 array[indexNumber] = Object.assign({}, ...data[i].children[index].chartCardConfig[0].buttonGroup);
//             }
//             else {

//               if (data[i].children[index].chartCardConfig[0].buttonGroup != undefined) {
//                 if (data[i].children[index].chartCardConfig[0].buttonGroup.length > 0) {
//                   if (data[i].children[index].chartCardConfig[0].buttonGroup[0].btnConfig != undefined) {
//                     array[indexNumber].btnConfig.push(...data[i].children[index].chartCardConfig[0].buttonGroup[0].btnConfig);
//                     isGenerate = true;
//                   }
//                 }
//               }
//             }
//             isGenerate = true;
//           }
//         } else {
//           if (array.length > 0) {
//             if (data[i].chartCardConfig[0].buttonGroup != undefined) {
//               array.push(data[i].chartCardConfig[0].buttonGroup[0]);
//               isGenerate = true;
//             }
//             else
//               array.push(data[i]);
//           }
//           else {
//             if (data[i].chartCardConfig[0].buttonGroup != undefined) {
//               array.push(Object.assign({}, data[i].chartCardConfig[0].buttonGroup[0]));
//               isGenerate = true;
//             }
//             else
//               array.push(Object.assign({}, data[i]));
//           }
//         }
//         if (isGenerate)
//           assignNumber = assignNumber + 1;
//       }
//       // else if (data[i].id.includes("formRows")) {
//       //   for (let index = 0; index < data[i].children.length; index++) {
//       //     if (data[i].children[index].id.includes("button")) {
//       //       if (index == 0) {
//       //         if (array[indexNumber] == undefined) {
//       //           array[indexNumber] = Object.assign({}, ...data[i].children[index].buttonGroup);
//       //         } else if (array[indexNumber] == undefined)
//       //           array[indexNumber] = Object.assign({}, ...data[i].children[index].buttonGroup);
//       //       } else {
//       //         if (array[indexNumber] == undefined)
//       //           array[indexNumber] = Object.assign({}, ...data[i].children[index].buttonGroup);
//       //         else if (array[indexNumber] == undefined)
//       //           array[indexNumber] = Object.assign({}, ...data[i].children[index].buttonGroup);
//       //         else if (data[i].children[index].buttonGroup != undefined)
//       //           array[indexNumber].btnConfig.push(...data[i].children[index].buttonGroup[0].btnConfig);
//       //       }
//       //     }
//       //     isGenerate = true;
//       //   }
//       //   if (isGenerate)
//       //     assignNumber = assignNumber + 1;
//       // }
//       else {
//         if (data[i].id.includes("button")) {
//           if (data[i].chartCardConfig[0].buttonGroup.length > 0) {
//             for (let index = 0; index < data[i].chartCardConfig[0].buttonGroup.length; index++) {
//               if (index == 0) {
//                 if (array[indexNumber] == undefined) {
//                   array[indexNumber] = Object.assign({}, ...data[i].chartCardConfig[0].buttonGroup);
//                 } else {
//                   array[indexNumber].btnConfig.push(...data[i].btnConfig);
//                 }
//               } else {
//                 if (data[indexNumber] != undefined) {
//                   array[indexNumber].btnConfig.push(...data[i].btnConfig);
//                 }
//               }
//               isGenerate = true;
//             }
//             if (isGenerate)
//               assignNumber = assignNumber + 1;
//           } else {
//             if (array.length > 0) {
//               if (data[indexNumber].btnConfig != undefined)
//                 array[indexNumber] = Object.assign({}, ...data[i].btnConfig);
//               else
//                 array.push(...data[i].btnConfig);
//             }
//             else {
//               if (data[i].formly != undefined)
//                 array.push(...data[i].btnConfig);
//               else
//                 array.push(...data[i].btnConfig);
//             }
//           }
//         }

//       }
//     }
//     // data.forEach((element, index) => {
//     //   array[index] = Object.assign({}, ...element.btnConfig);
//     //   // array[index] = Object.assign({}, [...(element.formly ||[])]);
//     // });
//     let jsonString = JSON.parse(
//       JSON.stringify(Object.assign({}, array), function (key, value) {
//         if (typeof value == 'function') {
//           return value.toString();
//         } else {
//           return value;
//         }
//       }), (key, value) => {
//         // if (typeof value != 'string') return value;
//         // return (value.substring(0, 8) == 'function') ? eval('(' + value + ')') : value;
//         if (typeof value === 'string' && value.startsWith('(')) {
//           return eval(`(${value})`);
//         }
//         return value;
//       });
//     // const jsonString = JSON.stringify(Object.assign({}, array))
//     return array
//   }
//   wrapperForChartCardFeilds(data: TreeNode[], selecteNode?: TreeNode) {

//     let arrayIndex = 0;
//     let formlyCheck = false;
//     let array: any[] = [];
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].id.includes("accordingBody")) {
//         for (let j = 0; j < data[i].children.length; j++) {
//           if (data[i].children[j].id.includes("common")) {
//             if (data[i].children[j].forCommomComponentCondition) {
//               if (data[i].children[j].forCommomComponentCondition == 'simpleGridList' || data[i].children[j].forCommomComponentCondition == 'gridListEditDelete') {
//                 data[i].children[j].columnData = [];
//                 data[i].children[j].children.forEach(element => {
//                   data[i].children[j].columnData.push(element)
//                 });
//               }
//             }
//             if (data[i].children[j].type == 'button' || data[i].children[j].type == "linkButton") {
//               data[i].children[j] = this.makePropertiesInBtn(data[i].children[j], "button");
//             }
//             if (data[i].children[j].chartCardConfig) {
//               if (data[i].children[j].chartCardConfig.length > 0) {
//                 for (let index = 0; index < data[i].children[j].chartCardConfig.length; index++) {
//                   // array[index] = Object.assign({}, ...data[0].children[index].formly);
//                   if (array[arrayIndex] != undefined) {
//                     if (array[arrayIndex].chartCardConfig != undefined) {
//                       if (array[arrayIndex].chartCardConfig[0].formly != undefined && formlyCheck) {
//                         if (data[i].children[j].chartCardConfig[index].formly != undefined) {
//                           if (array[arrayIndex].chartCardConfig[0].formly[0].type == undefined) {
//                             array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup.push(...data[i].children[j].chartCardConfig[index].formly[0].fieldGroup);
//                           }
//                           else {
//                             array[arrayIndex + 1] = Object.assign({}, data[i].children[j]);
//                             // if (array[arrayIndex].chartCardConfig[0].formly[0].type == 'stepper') {
//                             //   array.push(data[i].children[j]);
//                             // }
//                             // else if (array[arrayIndex].chartCardConfig[0].formly[0].type == 'tab') {
//                             //   array.push(data[i].children[j]);
//                             // }
//                             // else {
//                             //   array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup.push(...data[i].children[j].chartCardConfig[index].formly[0].fieldGroup);
//                             // }
//                           }
//                           formlyCheck = true;
//                         }
//                         else if (index == 0) {

//                           if (array[arrayIndex] == undefined) {
//                             array[arrayIndex] = Object.assign({}, data[i].children[j]);
//                             formlyCheck = true;
//                           } else {
//                             if (data[i].children[j].type == "buttonGroup") {
//                               if (data[i].children[j].children.length > 0) {
//                                 data[i].children[j] = this.makePropertiesInBtn(data[i].children[j], "buttonGroup");
//                                 array[arrayIndex + 1] = Object.assign({}, data[i].children[j].children[0]);
//                                 array[arrayIndex + 1].type = "buttonGroup";
//                                 for (let e = 0; e < data[i].children[j].children.length - 1; e++) {
//                                   array[arrayIndex + 1].chartCardConfig[0].buttonGroup[0].btnConfig.push(...data[i].children[j].children[e + 1].chartCardConfig[0].buttonGroup[0].btnConfig)
//                                 }
//                               }
//                             } else if (data[i].children[j].type == 'fixedDiv') {
//                               array[arrayIndex + 1] = Object.assign({}, data[i].children[j]);
//                               if (data[i].children[j].children.length > 0) {
//                                 for (let e = 0; e < data[i].children[j].children.length; e++) {
//                                   array[arrayIndex + 1].chartCardConfig[0].fixedDivChild.push(data[i].children[j].children[e]);
//                                   if (data[i].children[j].children[e].type == "buttonGroup") {
//                                     for (let a = 0; a < array[arrayIndex + 1].chartCardConfig[0].fixedDivChild.length; a++) {
//                                       if (array[arrayIndex + 1].chartCardConfig[0].fixedDivChild[a].type == "buttonGroup") {
//                                         if (array[arrayIndex + 1].chartCardConfig[0].fixedDivChild[a].children.length > 0) {
//                                           for (let index = 0; index < data[i].children[j].children[e].children.length - 1; index++) {
//                                             array[arrayIndex + 1].chartCardConfig[0].fixedDivChild[a].children[0].chartCardConfig[0].buttonGroup[0].btnConfig.push(data[i].children[j].children[e].children[index + 1].chartCardConfig[0].buttonGroup[0].btnConfig[0]);
//                                           }
//                                         }
//                                       }
//                                     }
//                                   }
//                                 }
//                               }
//                             }
//                             else {
//                               array.push(data[i].children[j]);
//                             }
//                             formlyCheck = true;
//                           }
//                         } else {
//                           if (data[arrayIndex] != undefined) {
//                             if (data[i].children[j].type == "buttonGroup") {
//                               if (data[i].children[j].children.length > 0) {
//                                 data[i].children[j] = this.makePropertiesInBtn(data[i].children[j], "buttonGroup");
//                                 array[arrayIndex + 1] = Object.assign({}, data[i].children[j].children[0]);
//                                 array[arrayIndex + 1].type = "buttonGroup";
//                                 for (let e = 0; e < data[i].children[j].children.length - 1; e++) {
//                                   array[arrayIndex + 1].chartCardConfig[0].buttonGroup[0].btnConfig.push(...data[i].children[j].children[e + 1].chartCardConfig[0].buttonGroup[0].btnConfig)
//                                 }
//                               }
//                             } else {
//                               array.push(data[i].children[j]);
//                             }
//                             formlyCheck = true;
//                           }
//                         }
//                       }
//                       else if (index == 0) {
//                         if (array[arrayIndex] == undefined) {
//                           array[arrayIndex] = Object.assign({}, data[i].children[j]);
//                         } else {
//                           if (data[i].children[j].type == "buttonGroup") {
//                             if (data[i].children[j].children.length > 0) {
//                               data[i].children[j] = this.makePropertiesInBtn(data[i].children[j], "buttonGroup");
//                               array[arrayIndex + 1] = Object.assign({}, data[i].children[j].children[0]);
//                               array[arrayIndex + 1].type = "buttonGroup";
//                               for (let e = 0; e < data[i].children[j].children.length - 1; e++) {
//                                 array[arrayIndex + 1].chartCardConfig[0].buttonGroup[0].btnConfig.push(...data[i].children[j].children[e + 1].chartCardConfig[0].buttonGroup[0].btnConfig)
//                               }
//                             }
//                           }
//                           else if (data[i].children[j].type == 'fixedDiv') {
//                             array[arrayIndex + 1] = Object.assign({}, data[i].children[j]);
//                             if (data[i].children[j].children.length > 0) {
//                               for (let e = 0; e < data[i].children[j].children.length; e++) {
//                                 array[arrayIndex + 1].chartCardConfig[0].fixedDivChild.push(data[i].children[j].children[e]);
//                                 if (data[i].children[j].children[e].type == "buttonGroup") {
//                                   for (let a = 0; a < array[arrayIndex + 1].chartCardConfig[0].fixedDivChild.length; a++) {
//                                     if (array[arrayIndex + 1].chartCardConfig[0].fixedDivChild[a].type == "buttonGroup") {
//                                       if (array[arrayIndex + 1].chartCardConfig[0].fixedDivChild[a].children.length > 0) {
//                                         for (let index = 0; index < data[i].children[j].children[e].children.length - 1; index++) {
//                                           array[arrayIndex + 1].chartCardConfig[0].fixedDivChild[a].children[0].chartCardConfig[0].buttonGroup[0].btnConfig.push(data[i].children[j].children[e].children[index + 1].chartCardConfig[0].buttonGroup[0].btnConfig[0]);
//                                         }
//                                       }
//                                     }
//                                   }
//                                 }
//                               }
//                             }
//                           }
//                           else {
//                             array.push(data[i].children[j]);
//                           }
//                           formlyCheck = true;
//                         }
//                       }
//                       else {
//                         if (data[0] != undefined) {
//                           array.push(data[i].children[j]);
//                           formlyCheck = true;
//                         }
//                       }
//                     }
//                     else {
//                       array.push(data[i].children[j]);
//                     }
//                   }
//                   else if (index == 0) {
//                     if (array[0] == undefined) {
//                       if (data[i].children[j].type == 'tab') {
//                         array[0] = Object.assign({}, data[i].children[j]);
//                         if (data[i].children[j].children.length > 0) {
//                           for (let e = 0; e < data[i].children[j].children.length; e++) {
//                             array[0].chartCardConfig[0].formly[0].fieldGroup[0].fieldGroup.push(data[i].children[j].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                           }
//                         }
//                       }
//                       else if (data[i].children[j].type == "buttonGroup") {
//                         if (data[i].children[j].children.length > 0) {
//                           data[i].children[j] = this.makePropertiesInBtn(data[i].children[j], "buttonGroup");
//                           array[0] = Object.assign({}, data[i].children[j].children[0]);
//                           array[0].type = "buttonGroup";
//                           for (let e = 0; e < data[i].children[j].children.length - 1; e++) {
//                             array[0].chartCardConfig[0].buttonGroup[0].btnConfig.push(...data[i].children[j].children[e + 1].chartCardConfig[0].buttonGroup[0].btnConfig)
//                           }
//                         }
//                       }
//                       else if (data[i].children[j].type == "fixedDiv") {
//                         array[0] = Object.assign({}, data[i].children[j]);
//                         if (data[i].children[j].children.length > 0) {
//                           // array[0].type = "buttonGroup";
//                           for (let e = 0; e < data[i].children[j].children.length; e++) {
//                             array[0].chartCardConfig[0].fixedDivChild.push(data[i].children[j].children[e]);
//                             if (data[i].children[j].children[e].type == "buttonGroup") {
//                               for (let a = 0; a < array[0].chartCardConfig[0].fixedDivChild.length; a++) {
//                                 if (array[0].chartCardConfig[0].fixedDivChild[a].type == "buttonGroup") {
//                                   if (array[0].chartCardConfig[0].fixedDivChild[a].children.length > 0) {
//                                     for (let index = 0; index < data[i].children[j].children[e].children.length - 1; index++) {
//                                       array[0].chartCardConfig[0].fixedDivChild[a].children[0].chartCardConfig[0].buttonGroup[0].btnConfig.push(data[i].children[j].children[e].children[index + 1].chartCardConfig[0].buttonGroup[0].btnConfig[0]);
//                                     }
//                                   }
//                                 }
//                               }
//                             }
//                           }
//                         }
//                       }
//                       else {
//                         array[0] = Object.assign({}, data[i].children[j]);
//                       }
//                       formlyCheck = true;
//                     } else {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   } else {
//                     if (data[0] != undefined) {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   }
//                 }
//               }
//             }
//             else {
//               if (array.length > 0) {
//                 if (data[i].chartCardConfig != undefined)
//                   array[0] = Object.assign({}, data[i].children[j]);
//                 else
//                   array.push(data[i].children[j]);
//               }
//               else {
//                 if (data[i].formly != undefined)
//                   array.push(data[i].children[j]);
//                 else
//                   array.push(data[i].children[j]);
//               }
//             }
//             arrayIndex = array.length - 1;
//           }
//           else if (data[i].children[j].id.includes("inputGroupGrid")) {
//             let stepCheck = false;
//             let stepZero = false;
//             if (data[i].children[j].children.length > 0) {
//               for (let k = 0; k < data[i].children[j].children.length; k++) {
//                 if (data[i].children[j].children[k].formlyType == "input") {
//                   if (array[arrayIndex] != undefined) {
//                     if (data[i].children[j].type == "inputGroupGrid" && stepCheck || stepZero) {
//                       if (array[arrayIndex].chartCardConfig[0].formly != undefined) {
//                         array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup.push(this.updateWrapperFields(data[i].children[j].hideExpression, data[i].children[j].children[k], true));
//                         if (data[i].children[j].children[k].children.length > 0) {
//                           for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                             data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0].wrappers = ['formly-grid-wrapper']
//                             array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                           }
//                         }
//                       }
//                     } else {
//                       array[arrayIndex + 1] = Object.assign({}, this.updateWrapperFields(data[i].children[j].hideExpression, data[i].children[j].children[k], false));
//                       if (data[i].children[j].children[k].children.length > 0) {
//                         for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                           array[arrayIndex + 1].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(this.updateWrapperFields(data[i].children[j].hideExpression, data[i].children[j].children[k], true))
//                         }
//                       }
//                       stepCheck = true;
//                       arrayIndex = array.length - 1;
//                     }

//                   }
//                   else if (k == 0) {
//                     if (array[0] == undefined) {
//                       if (data[i].children[j].children[k].formlyType == "input") {
//                         array[0] = Object.assign({}, this.updateWrapperFields(data[i].children[j].hideExpression, data[i].children[j].children[k], false));
//                         if (data[i].children[j].children[k].children.length > 0) {
//                           for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                             data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0].wrappers = ['formly-grid-wrapper']
//                             array[0].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                           }
//                         }
//                         stepZero = true;
//                       }
//                       else {
//                         data[i].children[j].children[0].chartCardConfig[0].formly[0].fieldGroup[0].className = 'col';
//                         data[i].children[j].children[0].chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.className = 'col';
//                         data[i].children[j].children[0].chartCardConfig[0].formly[0].fieldGroup[0].wrappers = ['formly-grid-wrapper']
//                         array[0] = Object.assign({}, data[i].children[j]);
//                       }
//                       formlyCheck = true;
//                     } else {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   } else {
//                     if (data[0] != undefined) {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   }

//                 }
//               }
//               arrayIndex = array.length - 1;

//             }
//           }
//           else if (data[i].children[j].id.includes("accordionButton")) {
//             var accordionButtonIndex;
//             if (array[arrayIndex] == undefined) {
//               accordionButtonIndex = arrayIndex;
//             } else if (array[arrayIndex] != undefined) {
//               accordionButtonIndex = arrayIndex + 1;
//             }
//             if (data[i].children[j].children.length > 0) {
//               array[accordionButtonIndex] = Object.assign({}, data[i].children[j]);
//               this.forPushInChilds(data[i].children[j], array[accordionButtonIndex].chartCardConfig[0].accordionConfig[0].accordionChild)
//               arrayIndex = array.length - 1;
//             }
//             else {
//               array[accordionButtonIndex] = Object.assign({}, data[i].children[j]);
//               arrayIndex = array.length - 1;
//             }
//           }
//           else if (data[i].children[j].id.includes("invoice")) {
//
//             var index;
//             if (array[arrayIndex] == undefined) {
//               index = arrayIndex;
//             } else if (array[arrayIndex] != undefined) {
//               index = arrayIndex + 1;
//             }
//             if (data[i].children[j].children.length > 0) {
//               array[index] = Object.assign({}, data[i].children[j]);
//               this.forPushInChilds(data[i].children[j], array[index].invoiceChild)
//               arrayIndex = array.length - 1;
//             }
//             else {
//               array[index] = Object.assign({}, data[i].children[j]);
//               arrayIndex = array.length - 1;
//             }
//           }
//           else if (data[i].children[j].id.includes("mainDashonicTabs")) {
//             var tabIndex;
//             if (array[arrayIndex] == undefined) {
//               tabIndex = arrayIndex;
//             } else if (array[arrayIndex] != undefined) {
//               tabIndex = arrayIndex + 1;
//             }
//             if (array[tabIndex] == undefined) {
//               array[tabIndex] = Object.assign({}, data[i].children[j]);
//               if (data[i].children[j].children.length > 0) {
//                 for (let index = 0; index < array[tabIndex].children.length; index++) {
//                   this.forPushInChilds(data[i].children[j].children[index], array[tabIndex].children[index].chartCardConfig[0].dashonicTabsConfig[0].dashonicTabsChild)
//                 }
//                 arrayIndex = array.length - 1;
//               }
//             }
//           }
//           else if (data[i].children[j].id.includes("kanban")) {

//             if (data[i].children[j].children.length > 0) {
//               if (array.length == 0) {
//                 array[0] = Object.assign({}, data[i].children[j]);
//                 for (let index = 0; index < data[i].children[j].children.length; index++) {
//                   if (data[i].children[j].children.length > 0) {
//                     array[0].chartCardConfig[0].kambanChildren.push(data[i].children[j].children[index]);
//                   }
//                 }
//               } else {
//                 array[arrayIndex + 1] = Object.assign({}, data[i].children[j]);
//                 for (let index = 0; index < data[i].children[j].children.length; index++) {
//                   if (data[i].children[j].children.length > 0) {
//                     array[arrayIndex + 1].chartCardConfig[0].kambanChildren.push(data[i].children[j].children[index]);
//                   }
//                 }
//               }

//               arrayIndex = array.length - 1;
//             }
//           }
//           else if (data[i].children[j].id.includes("stepperMain")) {

//             let stepCheck = false;
//             let stepZero = false;
//             if (data[i].children[j].children.length > 0) {
//               for (let k = 0; k < data[i].children[j].children.length; k++) {
//                 if (data[i].children[j].children[k].type == "stepper") {
//                   if (array[arrayIndex] != undefined) {
//                     if (data[i].children[j].type == "stepperMain" && stepCheck || stepZero) {
//                       if (array[arrayIndex].chartCardConfig[0].formly[0].type == 'stepper') {
//                         array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup.push(data[i].children[j].children[k].chartCardConfig[0].formly[0].fieldGroup[0]);
//                         if (data[i].children[j].children[k].children.length > 0) {
//                           for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                             array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                           }
//                         }
//                       }
//                     } else {
//                       array[arrayIndex + 1] = Object.assign({}, data[i].children[j].children[k]);
//                       if (data[i].children[j].children[k].children.length > 0) {
//                         for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                           array[arrayIndex + 1].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                         }
//                       }
//                       stepCheck = true;
//                       arrayIndex = array.length - 1;
//                     }

//                   }
//                   else if (k == 0) {
//                     if (array[0] == undefined) {
//                       if (data[i].children[j].children[k].type == "stepper") {
//                         array[0] = Object.assign({}, data[i].children[j].children[k]);
//                         if (data[i].children[j].children[k].children.length > 0) {
//                           for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                             array[0].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                           }
//                         }
//                         stepZero = true;
//                       }
//                       else {
//                         array[0] = Object.assign({}, data[i].children[j]);
//                       }
//                       formlyCheck = true;
//                     } else {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   } else {
//                     if (data[0] != undefined) {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   }

//                 }
//               }
//               arrayIndex = array.length - 1;
//             }
//           }
//           else if (data[i].children[j].id.includes("tabsMain")) {

//             let tabCheck = false;
//             let tabZero = false;
//             if (data[i].children[j].children.length > 0) {
//               for (let k = 0; k < data[i].children[j].children.length; k++) {
//                 if (data[i].children[j].children[k].type == "tab" || "tabs") {
//                   if (array[arrayIndex] != undefined) {
//                     if (data[i].children[j].type == "tabsMain" && tabCheck || tabZero) {
//                       if (array[arrayIndex].chartCardConfig[0].formly[0].type == 'tab' || 'tabs') {
//                         array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup.push(data[i].children[j].children[k].chartCardConfig[0].formly[0].fieldGroup[0]);
//                         if (data[i].children[j].children[k].children.length > 0) {
//                           for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                             array[arrayIndex].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                           }
//                         }
//                       }
//                     } else {
//                       array[arrayIndex + 1] = Object.assign({}, data[i].children[j].children[k]);
//                       if (data[i].children[j].children[k].children.length > 0) {
//                         for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                           array[arrayIndex + 1].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                         }
//                       }
//                       tabCheck = true,
//                         arrayIndex = array.length - 1;
//                     }
//                   }
//                   else if (k == 0) {
//                     if (array[0] == undefined) {
//                       if (data[i].children[j].children[k].type == "tab" || "tabs") {
//                         array[0] = Object.assign({}, data[i].children[j].children[k]);
//                         if (data[i].children[j].children[k].children.length > 0) {
//                           for (let e = 0; e < data[i].children[j].children[k].children.length; e++) {
//                             array[0].chartCardConfig[0].formly[0].fieldGroup[k].fieldGroup.push(data[i].children[j].children[k].children[e].chartCardConfig[0].formly[0].fieldGroup[0])
//                           }
//                         }
//                         tabZero = true;
//                       }
//                       else {
//                         array[0] = Object.assign({}, data[i].children[j]);
//                       }
//                       formlyCheck = true;
//                     } else {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   } else {
//                     if (data[0] != undefined) {
//                       array[arrayIndex + 1].push(data[i].children[j]);
//                       formlyCheck = true;
//                     }
//                   }

//                 }

//               }
//               arrayIndex = array.length - 1;
//             }
//           }
//         }
//       }
//     }
//     // const jsonString = JSON.stringify(Object.assign({}, array))

//     return array
//   }
//   addgridInAccordion(accordionData: any, data: any) {
//     data.columnData = [];
//     data.children.forEach((element: any) => {
//       data.columnData.push(element)
//     });
//     accordionData.push(data);
//     length = accordionData.length - 1;
//     return length;
//   }
//   addButtonGroupInAccordion(accordionData: any, data: any) {
//     if (data.children.length > 0) {
//       accordionData.push(data.children[0]);
//       length = accordionData.length - 1;
//       for (let a = 0; a < data.children.length; a++) {
//         if (a != 0) {
//           accordionData[length].chartCardConfig[0].buttonGroup[0].btnConfig.push(data.children[a].chartCardConfig[0].buttonGroup[0].btnConfig[0])
//         }
//       }
//     }
//     return length;
//   }
//   wrapperForCombineFeildsv1(data: TreeNode[]) {

//     let array: any[] = [];
//     if (data.length > 0) {
//       // if (data[0].id == "formRows" && data.length == 1) {
//       // if (data.children.length > 0)
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].type == "pageHeader") {

//         }
//         else if (data[i].type == "pageBody") {
//           if (data[i].children.length > 0)
//             if (data[i].children[0].type == "according") {
//               if (data[1].children[0].children.length > 0)
//                 if (data[1].children[0].children[0].type.includes("formRows")) {
//                   if (data[i].children[0].children[0].children.length > 0)
//                     for (let index = 0; index < data[i].children[0].children[0].children.length; index++) {
//                       if (!data[i].children[0].children[0].children[index].id.includes("button")) {
//                         if (index == 0) {
//                           if (array[i] == undefined) {
//                             array[i] = Object.assign({}, ...data[i].children[0].children[0].children[index].formly);
//                           }
//                           else {
//                             if (array[i] == undefined) {
//                               array[i] = Object.assign({}, ...data[i].children[0].children[0].children[index].formly);
//                             }
//                           }
//                           // isGenarteRow=false;

//                         } else {
//                           if (array[i] == undefined)
//                             array[i] = Object.assign({}, ...data[i].children[0].children[index].formly);
//                           else if (data[i].children[0].children[index].formly != undefined) {
//                             if (data[i].children[0].children[index].formly.length > 0) {
//                               if (data[i].children[0].children[index].formly[0].fieldGroup != undefined) {
//                                 array[i].fieldGroup.push(...data[i].children[0].children[index].formly[0].fieldGroup);
//                               }
//                             }
//                           }
//                           // isGenarteRow=true;
//                         }
//                       }
//                     }
//                 }
//                 else if (data[i].label.includes("stepper")) {

//                   if (data[i].children.length > 0) {
//                     for (let index = 0; index < data[i].children.length; index++) {
//                       if (!data[i].children[index].id.includes("button")) {
//                         if (index == 0) {
//                           if (array[0] == undefined) {
//                             array[0] = Object.assign({}, data[i].formly[0]);
//                             array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                           } else if (array[0].fieldGroup[i] == undefined) {
//                             array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                             array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                           }
//                         } else {
//                           if (data[i].children[index].formly.length > 0) {
//                             if (data[i].children[index].formly[0].fieldGroup != undefined) {
//                               array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                             }
//                           }
//                         }
//                       }
//                     }
//                   }
//                   else {
//                     if (data[i].children.length > 0) {
//                       for (let index = 0; index < data[i].children.length; index++) {
//                         // array[index] = Object.assign({}, ...data[0].children[index].formly);

//                         if (index == 0) {
//                           if (data[i].children[index].formly != undefined)
//                             array[i] = Object.assign({}, ...data[i].children[index].formly);

//                         } else {
//                           //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//                           if (data[i].children[index].formly != undefined)
//                             array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);

//                           // isGenarteRow=true;
//                         }
//                       }
//                     }
//                     else {
//                       if (array.length > 0) {
//                         if (data[i].formly != undefined)
//                           array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                         else
//                           array.push(data[i]);
//                       }
//                       else {
//                         if (data[i].formly != undefined)
//                           array.push(Object.assign({}, data[i].formly[0]));
//                         else
//                           array.push(Object.assign({}, data[i]));
//                       }
//                     }
//                   }
//                 }
//                 else if (data[i].label.includes("tabs")) {

//                   if (data[i].children.length > 0) {
//                     for (let index = 0; index < data[i].children.length; index++) {
//                       if (!data[i].children[index].id.includes("button")) {
//                         if (index == 0) {
//                           if (array[0] == undefined) {
//                             array[0] = Object.assign({}, data[i].formly[0]);
//                             array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                           } else if (array[0].fieldGroup[i] == undefined) {
//                             array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                             array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                           }
//                         } else {
//                           if (data[i].children[index].formly.length > 0) {
//                             if (data[i].children[index].formly[0].fieldGroup != undefined) {
//                               array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                             }
//                           }
//                         }
//                       }
//                     }
//                   }
//                   else {
//                     if (data[i].children.length > 0) {
//                       for (let index = 0; index < data[i].children.length; index++) {
//                         // array[index] = Object.assign({}, ...data[0].children[index].formly);

//                         if (index == 0) {
//                           if (data[i].children[index].formly != undefined)
//                             array[i] = Object.assign({}, ...data[i].children[index].formly);

//                         } else {
//                           //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//                           if (data[i].children[index].formly != undefined)
//                             array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);

//                           // isGenarteRow=true;
//                         }
//                       }
//                     }
//                     else {
//                       if (array.length > 0) {
//                         if (data[i].formly != undefined)
//                           array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                         else
//                           array.push(data[i]);
//                       }
//                       else {
//                         if (data[i].formly != undefined)
//                           array.push(Object.assign({}, data[i].formly[0]));
//                         else
//                           array.push(Object.assign({}, data[i]));
//                       }
//                     }
//                   }
//                 }
//                 else {
//                   if (data[i].children[0].children.length > 0) {
//                     for (let index = 0; index < data[i].children[0].children.length; index++) {
//                       // array[index] = Object.assign({}, ...data[0].children[index].formly);

//                       if (index == 0) {
//                         if (data[i].children[0].children[index].formly != undefined)
//                           array[i] = Object.assign({}, ...data[i].children[0].children[index].formly);

//                       } else {
//                         //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//                         if (data[i].children[0].children[index].formly != undefined)
//                           if (data[i].children[0].children[index].formly.length > 0)
//                             array[i].fieldGroup.push(...data[i].children[0].children[index].formly[0].fieldGroup);

//                         // isGenarteRow=true;
//                       }
//                     }
//                   }
//                   else {
//                     if (array.length > 0) {
//                       if (data[i].children[0].formly != undefined)
//                         array.push(data[i].children[0].formly[0]);
//                       else
//                         array.push(data[i].children[0]);
//                     }
//                     else {
//                       if (data[i].children[0].formly != undefined)
//                         array.push(Object.assign({}, data[i].children[0].formly[0]));
//                       else
//                         array.push(Object.assign({}, data[i].children[0]));
//                     }
//                   }
//                 }
//             }
//             else {

//             }
//         }
//         else if (data[i].type == "pageFooter") {

//         }

//       }

//       const jsonString = JSON.stringify(Object.assign({}, array))
//       // }

//       // else {
//       //   data.forEach((element, index) => {
//       //     array[index] = Object.assign({}, ...element.formly);
//       //   });
//       //   const jsonString = JSON.stringify(Object.assign({}, array))
//       // }

//     }
//     return array

//     // let array: any[] = [];
//     // if (data.length > 0) {
//     //   // if (data[0].id == "formRows" && data.length == 1) {
//     //   // if (data.children.length > 0)
//     //   for (let i = 0; i < data.length; i++) {
//     //     if (data[i].id.includes("formRows")) {
//     //       for (let index = 0; index < data[i].children.length; index++) {
//     //         // array[index] = Object.assign({}, ...data[0].children[index].formly);

//     //         if (index == 0) {
//     //           if (array[index] == undefined) {
//     //             array[index] = Object.assign({}, ...data[i].children[index].formly);
//     //           }
//     //           else {
//     //             if (array[i] == undefined) {
//     //               array[i] = Object.assign({}, ...data[i].children[index].formly);
//     //             }
//     //           }
//     //           // isGenarteRow=false;

//     //         } else {
//     //           //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//     //           array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);
//     //           // isGenarteRow=true;
//     //         }
//     //       }
//     //     }
//     //     else {
//     //       if (data[i].children.length > 0) {
//     //         for (let index = 0; index < data[i].children.length; index++) {
//     //           // array[index] = Object.assign({}, ...data[0].children[index].formly);

//     //           if (index == 0) {

//     //             array[index] = Object.assign({}, ...data[i].children[index].formly);

//     //           } else {
//     //             array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);
//     //           }
//     //         }
//     //       }
//     //       else {
//     //         data.filter(a=>a.id !="formRows").forEach((element, index) => {
//     //           array[index].push(element);
//     //         });
//     //         const jsonString = JSON.stringify(Object.assign({}, array))
//     //       }

//     //     }
//     //   }

//     //   const jsonString = JSON.stringify(Object.assign({}, array))
//     //   // }

//     //   // else {
//     //   //   data.forEach((element, index) => {
//     //   //     array[index] = Object.assign({}, ...element.formly);
//     //   //   });
//     //   //   const jsonString = JSON.stringify(Object.assign({}, array))
//     //   // }

//     // }

//     // return array
//   }
//   wrapperForCombineFeilds(data: TreeNode[]) {

//     let array: any[] = [];
//     if (data.length > 0) {
//       // if (data[0].id == "formRows" && data.length == 1) {
//       // if (data.children.length > 0)
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].type.includes("accordingBody")) {
//           for (let index = 0; index < data[i].children.length; index++) {
//             if (data[i].children[index].label.includes("stepper")) {
//               if (data[i].children[index].children.length > 0) {
//                 for (let j = 0; j < data[i].children[index].children.length; j++) {
//                   if (!data[i].children[index].children[j].id.includes("button")) {
//                     if (j == 0) {
//                       if (array[0] == undefined) {
//                         array[0] = Object.assign({}, data[i].children[index].formly[0]);
//                         array[0].fieldGroup[j].fieldGroup.push(data[i].children[index].children[j].chartCardConfig[0].formly[0].fieldGroup[0]);
//                       } else if (array[0].fieldGroup[index] == undefined) {
//                         array[0].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                         array[0].fieldGroup[index].fieldGroup.push(data[i].children[index].children[j].chartCardConfig[0].formly[0].fieldGroup[0]);
//                       }
//                     } else {
//                       if (data[i].children[index].children[j].chartCardConfig[0].formly.length > 0) {
//                         if (data[i].children[index].children[j].chartCardConfig[0].formly[0].fieldGroup != undefined) {
//                           array[0].fieldGroup[index].fieldGroup.push(data[i].children[index].children[j].chartCardConfig[0].formly[0].fieldGroup[0]);
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//               else {
//                 if (data[i].children.length > 0) {
//                   if (index == 0) {
//                     if (data[i].children[index].formly != undefined)
//                       array[index] = Object.assign({}, ...data[i].children[index].formly);
//                   } else {
//                     if (array[i] == undefined)
//                       array[0].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);
//                     else if (data[i].children[index].formly != undefined)
//                       array[index].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);

//                   }

//                 }
//                 else {
//                   if (array.length > 0) {
//                     if (data[i].formly != undefined)
//                       array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                     else
//                       array.push(data[i]);
//                   }
//                   else {
//                     if (data[i].formly != undefined)
//                       array.push(Object.assign({}, data[i].formly[0]));
//                     else
//                       array.push(Object.assign({}, data[i]));
//                   }
//                 }
//               }
//             }
//             else if (data[i].children[index].label.includes("tabs")) {
//               if (data[i].children[index].children.length > 0) {
//                 for (let j = 0; j < data[i].children[index].children.length; j++) {
//                   if (!data[i].children[index].children[j].id.includes("button")) {
//                     if (j == 0) {
//                       if (array[0] == undefined) {
//                         array[0] = Object.assign({}, data[i].formly[0]);
//                         array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].children[j].formly[0].fieldGroup[0]);
//                       } else if (array[0].fieldGroup[i] == undefined) {
//                         array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                         array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].children[j].formly[0].fieldGroup[0]);
//                       }
//                     } else {
//                       if (data[i].children[index].children[j].formly.length > 0) {
//                         if (data[i].children[index].children[j].formly[0].fieldGroup != undefined) {
//                           array[0].children[index].fieldGroup[i].fieldGroup.push(data[i].children[index].children[j].formly[0].fieldGroup[0]);
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//               else {
//                 if (data[i].children.length > 0) {
//                   if (index == 0) {
//                     if (data[i].children[index].formly != undefined)
//                       array[i] = Object.assign({}, ...data[i].children[index].formly);

//                   } else {
//                     if (data[i].children[index].formly != undefined)
//                       array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);

//                   }

//                 }
//                 else {
//                   if (array.length > 0) {
//                     if (data[i].formly != undefined)
//                       array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                     else
//                       array.push(data[i]);
//                   }
//                   else {
//                     if (data[i].formly != undefined)
//                       array.push(Object.assign({}, data[i].formly[0]));
//                     else
//                       array.push(Object.assign({}, data[i]));
//                   }
//                 }
//               }
//             }
//           }
//         }
//         else if (data[i].label.includes("stepper")) {
//           if (data[i].children.length > 0) {
//             for (let index = 0; index < data[i].children.length; index++) {
//               if (!data[i].children[index].id.includes("button")) {
//                 if (index == 0) {
//                   if (array[0] == undefined) {
//                     array[0] = Object.assign({}, data[i].formly[0]);
//                     array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                   } else if (array[0].fieldGroup[i] == undefined) {
//                     array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                     array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                   }
//                 } else {
//                   if (data[i].children[index].formly.length > 0) {
//                     if (data[i].children[index].formly[0].fieldGroup != undefined) {
//                       array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                     }
//                   }
//                 }
//               }
//             }
//           }
//           else {
//             if (data[i].children.length > 0) {
//               for (let index = 0; index < data[i].children.length; index++) {
//                 // array[index] = Object.assign({}, ...data[0].children[index].formly);

//                 if (index == 0) {
//                   if (data[i].children[index].formly != undefined)
//                     array[i] = Object.assign({}, ...data[i].children[index].formly);

//                 } else {
//                   //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//                   if (data[i].children[index].formly != undefined)
//                     array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);

//                   // isGenarteRow=true;
//                 }
//               }
//             }
//             else {
//               if (array.length > 0) {
//                 if (data[i].formly != undefined)
//                   array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                 else
//                   array.push(data[i]);
//               }
//               else {
//                 if (data[i].formly != undefined)
//                   array.push(Object.assign({}, data[i].formly[0]));
//                 else
//                   array.push(Object.assign({}, data[i]));
//               }
//             }
//           }
//         }
//         else if (data[i].label.includes("tabs")) {
//           if (data[i].children.length > 0) {
//             for (let index = 0; index < data[i].children.length; index++) {
//               if (!data[i].children[index].id.includes("button")) {
//                 if (index == 0) {
//                   if (array[0] == undefined) {
//                     array[0] = Object.assign({}, data[i].formly[0]);
//                     array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                   } else if (array[0].fieldGroup[i] == undefined) {
//                     array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                     array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                   }
//                 } else {
//                   if (data[i].children[index].formly.length > 0) {
//                     if (data[i].children[index].formly[0].fieldGroup != undefined) {
//                       array[0].fieldGroup[i].fieldGroup.push(data[i].children[index].formly[0].fieldGroup[0]);
//                     }
//                   }
//                 }
//               }
//             }
//           }
//           else {
//             if (data[i].children.length > 0) {
//               for (let index = 0; index < data[i].children.length; index++) {
//                 // array[index] = Object.assign({}, ...data[0].children[index].formly);

//                 if (index == 0) {
//                   if (data[i].children[index].formly != undefined)
//                     array[i] = Object.assign({}, ...data[i].children[index].formly);

//                 } else {
//                   //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//                   if (data[i].children[index].formly != undefined)
//                     array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);

//                   // isGenarteRow=true;
//                 }
//               }
//             }
//             else {
//               if (array.length > 0) {
//                 if (data[i].formly != undefined)
//                   array[0].fieldGroup.push(data[i].formly[0].fieldGroup[0]);
//                 else
//                   array.push(data[i]);
//               }
//               else {
//                 if (data[i].formly != undefined)
//                   array.push(Object.assign({}, data[i].formly[0]));
//                 else
//                   array.push(Object.assign({}, data[i]));
//               }
//             }
//           }
//         }
//         else {
//           if (data[i].children.length > 0) {
//             for (let index = 0; index < data[i].children.length; index++) {
//               // array[index] = Object.assign({}, ...data[0].children[index].formly);

//               if (index == 0) {
//                 if (data[i].children[index].formly != undefined)
//                   array[i] = Object.assign({}, ...data[i].children[index].formly);

//               } else {
//                 //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//                 if (data[i].children[index].formly != undefined)
//                   if (data[i].children[index].formly.length > 0)
//                     array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);

//                 // isGenarteRow=true;
//               }
//             }
//           }
//           else {
//             if (array.length > 0) {
//               if (data[i].formly != undefined)
//                 array.push(data[i].formly[0]);
//               else
//                 array.push(data[i]);
//             }
//             // else {
//             //   if (data[i].formly != undefined)
//             //     array.push(Object.assign({}, data[i].formly[0]));
//             //   else
//             //     array.push(Object.assign({}, data[i]));
//             // }
//           }
//         }
//       }

//       const jsonString = JSON.stringify(Object.assign({}, array))
//       // }

//       // else {
//       //   data.forEach((element, index) => {
//       //     array[index] = Object.assign({}, ...element.formly);
//       //   });
//       //   const jsonString = JSON.stringify(Object.assign({}, array))
//       // }

//     }

//     return array

//     // let array: any[] = [];
//     // if (data.length > 0) {
//     //   // if (data[0].id == "formRows" && data.length == 1) {
//     //   // if (data.children.length > 0)
//     //   for (let i = 0; i < data.length; i++) {
//     //     if (data[i].id.includes("formRows")) {
//     //       for (let index = 0; index < data[i].children.length; index++) {
//     //         // array[index] = Object.assign({}, ...data[0].children[index].formly);

//     //         if (index == 0) {
//     //           if (array[index] == undefined) {
//     //             array[index] = Object.assign({}, ...data[i].children[index].formly);
//     //           }
//     //           else {
//     //             if (array[i] == undefined) {
//     //               array[i] = Object.assign({}, ...data[i].children[index].formly);
//     //             }
//     //           }
//     //           // isGenarteRow=false;

//     //         } else {
//     //           //array[index] = Object.assign({}, ...element.formly[index].fieldGroup);
//     //           array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);
//     //           // isGenarteRow=true;
//     //         }
//     //       }
//     //     }
//     //     else {
//     //       if (data[i].children.length > 0) {
//     //         for (let index = 0; index < data[i].children.length; index++) {
//     //           // array[index] = Object.assign({}, ...data[0].children[index].formly);

//     //           if (index == 0) {

//     //             array[index] = Object.assign({}, ...data[i].children[index].formly);

//     //           } else {
//     //             array[i].fieldGroup.push(...data[i].children[index].formly[0].fieldGroup);
//     //           }
//     //         }
//     //       }
//     //       else {
//     //         data.filter(a=>a.id !="formRows").forEach((element, index) => {
//     //           array[index].push(element);
//     //         });
//     //         const jsonString = JSON.stringify(Object.assign({}, array))
//     //       }

//     //     }
//     //   }

//     //   const jsonString = JSON.stringify(Object.assign({}, array))
//     //   // }

//     //   // else {
//     //   //   data.forEach((element, index) => {
//     //   //     array[index] = Object.assign({}, ...element.formly);
//     //   //   });
//     //   //   const jsonString = JSON.stringify(Object.assign({}, array))
//     //   // }

//     // }

//     // return array
//   }
//   makePropertiesInBtn(data: any, type: any) {

//     if (type == "buttonGroup")
//       data.children.forEach((element: any) => {
//         if (element.chartCardConfig[0].buttonGroup[0].btnConfig[0].tooltip == undefined || element.chartCardConfig[0].buttonGroup[0].btnConfig[0].tooltip.content != undefined) {
//           element.chartCardConfig[0].buttonGroup[0].btnConfig[0]["tooltip"] = "";
//         } if (element.chartCardConfig[0].buttonGroup[0].btnConfig[0].icon != undefined) {
//           element.chartCardConfig[0].buttonGroup[0].btnConfig[0]["btnIcon"] = element.chartCardConfig[0].buttonGroup[0].btnConfig[0].icon;
//         }
//       });
//     if (type == "button") {
//       if (data.chartCardConfig[0].buttonGroup[0].btnConfig[0].tooltip == undefined || data.chartCardConfig[0].buttonGroup[0].btnConfig[0].tooltip.content != undefined) {
//         data.chartCardConfig[0].buttonGroup[0].btnConfig[0]["tooltip"] = "";
//       } if (data.chartCardConfig[0].buttonGroup[0].btnConfig[0].icon != undefined) {
//         data.chartCardConfig[0].buttonGroup[0].btnConfig[0]["btnIcon"] = data.chartCardConfig[0].buttonGroup[0].btnConfig[0].icon;
//       }
//     }
//     return data;
//   }
//   wrapperForCombineSimpleFeilds(data: TreeNode[]) {

//     let array: any[] = [];
//     if (data.length > 0) {
//       data.forEach((element, index) => {
//         array[index] = Object.assign({}, ...element.formly);
//       });
//       const jsonString = JSON.stringify(Object.assign({}, array))
//     }

//     return array
//   }
//   wrapperForGrid(data: TreeNode[]) {

//     let array: any[] = [];
//     if (data[0].children.length > 0) {
//       data[0].children.forEach((element, index) => {
//         array[index] = Object.assign({}, ...element.gridList);
//         // array[index] = Object.assign({}, [...(element.formly ||[])]);
//       });
//       const jsonString = JSON.stringify(Object.assign({}, array))
//     }
//     return array
//   }

//   wrapperFroAlertFields(data: TreeNode[]) {

//     let indexNumber = 0;
//     let assignNumber = 0;
//     let isGenerate = false;
//     let array: any[] = [];
//     for (let i = 0; i < data.length; i++) {
//       indexNumber = assignNumber;
//       isGenerate = false;
//       if (data[i].id.includes("common")) {
//         if (data[i].chartCardConfig[0].alertConfig != undefined) {
//           array.push(Object.assign({}, data[i].chartCardConfig));
//           isGenerate = true;
//         }
//         if (isGenerate)
//           assignNumber = assignNumber + 1;
//       }
//     }
//     // const jsonString = JSON.stringify(Object.assign({}, array))
//     return array
//   }
//   updateWrapperFields(hide: any, data: any, check: boolean) {
//     data.chartCardConfig[0].formly[0].fieldGroup[0].hideExpression = hide;
//     data.chartCardConfig[0].formly[0].fieldGroup[0].className = 'col'
//     data.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.className = 'col';
//     data.chartCardConfig[0].formly[0].fieldGroup[0].wrappers = ['formly-grid-wrapper'];
//     // check true in case of Push  else when object is assign
//     if (check) {
//       return data.chartCardConfig[0].formly[0].fieldGroup[0]
//     } else {
//       return data;
//     }
//   }
//   faker: boolean = false;

//   makeFaker() {

//     let dataModelFaker: any = [];
//     if (this.faker == true) {


//     }
//     if (this.nodes.length > 0) {
//       this.nodes.forEach(element => {
//         if (element.children != undefined) {
//           element.children.forEach(element2 => {

//             if (element2.children != undefined) {
//               element2.children.forEach((according: any) => {
//                 according.children.forEach((accordingBody: any) => {
//                   if (accordingBody.type == 'accordingBody') {
//                     accordingBody.children.forEach((V2: any) => {
//                       if (V2.chartCardConfig) {
//                         if (V2.chartCardConfig.length > 0) {
//                           if (V2.chartCardConfig[0].formly != undefined) {
//                             if (V2.chartCardConfig[0].formly[0].type == 'stepper' || V2.chartCardConfig[0].formly[0].type == 'dashonicTabs') {
//                               V2.children.forEach((step1: any) => {
//                                 step1.children.forEach((step2: any) => {
//                                   dataModelFaker[step2.chartCardConfig[0].formly[0].fieldGroup[0].key] = this.makeFakerData(step2);
//                                 });
//                               });
//                             }
//                             else {
//                               dataModelFaker[V2.chartCardConfig[0].formly[0].fieldGroup[0].key] = this.makeFakerData(V2);
//                             }
//                           } else if (V2.chartCardConfig[0].mainDashonicTabsConfig) {
//                             V2.children.forEach((element: any) => {
//                               element.children.forEach((element2: any) => {
//                                 if (element2.chartCardConfig) {
//                                   if (element2.chartCardConfig.length > 0) {
//                                     if (element2.chartCardConfig[0].formly) {
//                                       if (element2.chartCardConfig[0].formly[0].fieldGroup) {
//                                         dataModelFaker[element2.chartCardConfig[0].formly[0].fieldGroup[0].key] = this.makeFakerData(element2);
//                                       }
//                                     }
//                                   }
//                                 }
//                               });
//                             });
//                           }
//                         }
//                       }
//                     });
//                   }
//                 });
//               }
//               );
//             }
//           });
//         }
//       });
//     }
//     this.formlyModel = dataModelFaker;
//   }
//   makeFakerData(V2: any) {
//     if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions) {
//       let modelFaker: any;
//       if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type) {
//         if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'password') {
//           // modelFaker = faker.name.firstName()
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'tel') {
//           // modelFaker = faker.phone.number()
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'date') {
//           // modelFaker = faker.date.between('01/01/2001', '01/01/2001');
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'email') {
//           // modelFaker = faker.internet.email()
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'checkbox') {
//           // modelFaker = faker.datatype.boolean()
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'radio') {
//           // modelFaker = faker.datatype.boolean()
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'number') {
//           // modelFaker = 1
//           // modelFaker = faker.datatype.number(10)
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'decimal') {
//           // modelFaker = 0.0
//           // modelFaker = faker.datatype.float({ min: 10, max: 100, precision: 0.001 })
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'month') {
//           // modelFaker = faker.date.month({ abbr: true, context: true })
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'datetime-local') {
//           // modelFaker = faker.datatype.datetime(1893456000000)
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].templateOptions.type == 'color') {
//           // modelFaker = faker.color.colorByCSSColorSpace()
//         }
//       }
//       else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].type) {
//         if (V2.chartCardConfig[0].formly[0].fieldGroup[0].type == 'input') {
//           // modelFaker = faker.name.firstName()
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].type == 'textarea') {
//           // modelFaker = faker.lorem.paragraph()
//         }
//         else if (V2.chartCardConfig[0].formly[0].fieldGroup[0].type == 'inputGroupGrid') {
//           // modelFaker = faker.name.firstName()
//         }
//       }
//       return modelFaker;
//     }
//   }
//   findElementNode(selectedNode: any, key: any) {
//     if (selectedNode[0].key == key) {
//       console.log(selectedNode);
//     } else {
//       if (selectedNode[0]) {
//         for (let i = 0; i < selectedNode[0].children.length; i++) {
//           if (selectedNode[0].children[i].formly[0].key == key) {
//             console.log(selectedNode[0].children[i]);
//             return selectedNode[0].children[i];
//           } else {
//             for (let j = 0; j < selectedNode[0].children[i].children.length; j++) {
//               if (selectedNode[0].children[i].children[j].formly[0].key == key) {
//                 console.log(selectedNode[0].children[i].children[j]);
//                 return selectedNode[0].children[i].children[j];
//               } else if (j == selectedNode[0].children[i].children.length - 1) {
//                 for (let k = 0; k < selectedNode[0].children[i].children[j].children.length; k++) {
//                   let isSelectedKey = true;
//                   if (selectedNode[0].children[i].children[j].children[k].formly[0].key == key) {
//                     console.log(selectedNode[0].children[i].children[j].children[k]);
//                     isSelectedKey = false;
//                     return selectedNode[0].children[i].children[j].children[k];
//                   }
//                   if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children.length > 0) {
//                     for (let l = 0; l < selectedNode[0].children[i].children[j].children[k].children.length; l++) {
//                       if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children[l]?.chartCardConfig[0]?.formly != undefined) {
//                         if (selectedNode[0].children[i].children[j].children[k].children[l]?.chartCardConfig[0]?.formly[0]?.fieldGroup[0]?.key == key) {
//                           isSelectedKey = false;
//                           console.log(selectedNode[0].children[i].children[j].children[k].children[l]);
//                           return selectedNode[0].children[i].children[j].children[k].children[l];
//                         }
//                       }
//                       if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children[l]?.chartCardConfig[0]?.key == key) {
//                         isSelectedKey = false;
//                         console.log(selectedNode[0].children[i].children[j].children[k].children[l]);
//                         return selectedNode[0].children[i].children[j].children[k].children[l];
//                       }
//                       if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children[l]?.chartCardConfig[0]?.buttonGroup != undefined) {
//                         if (selectedNode[0].children[i].children[j].children[k].children[l]?.chartCardConfig[0]?.buttonGroup[0]?.btnConfig[0]?.key == key) {
//                           isSelectedKey = false;
//                           console.log(selectedNode[0].children[i].children[j].children[k].children[l]);
//                           return selectedNode[0].children[i].children[j].children[k].children[l];
//                         }
//                       }
//                       if (isSelectedKey && l == selectedNode[0].children[i].children[j].children[k].children.length - 1) {
//                         this.findElementNode(selectedNode[0].children[i].children[j].children[k].formly, key);
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }

//     }
//   }
//   encryptedKey: string = 'Some Value';
//   encrypt(o: any, salt: any) {
//     o = JSON.stringify(o).split('');
//     for (var i = 0, l = o.length; i < l; i++)
//       if (o[i] == '{')
//         o[i] = '}';
//       else if (o[i] == '}')
//         o[i] = '{';
//     return encodeURI(salt + o.join(''));
//   }
//   decrypt(o: any, salt: any) {
//     o = decodeURI(o);
//     if (salt && o.indexOf(salt)
//       != 0)
//       throw new Error('object cannot be decrypted');
//     o = o.substring(salt.length).split('');
//     for (var i = 0, l = o.length; i < l; i++)
//       if (o[i] == '{')
//         o[i] = '}';
//       else if (o[i] == '}')
//         o[i] = '{';
//     return JSON.parse(o.join(''));
//   }
//   getnodeDataDynamicaly(attributeType: string, objFormlyData: any) {
//     for (let i = 0; i < objFormlyData.length; i++) {
//       if (attributeType == "button") {

//       }
//     }
//     return objFormlyData;
//   }
//   jsonStringify(data: any) {
//     return JSON.stringify(data)
//   }
//   jsonStringifyWithObject(data: any) {
//     return JSON.stringify(data, function (key, value) {
//       if (typeof value == 'function') {
//         return value.toString();
//       } else {
//         return value;
//       }
//     }) || '{}'
//   }
//   jsonParse(data: any) {
//     return JSON.parse(data)
//   }
//   jsonParseWithObject(data: any) {
//     return JSON.parse(
//       data, (key, value) => {
//         // if (typeof value != 'string') return value;
//         // return (value.substring(0, 8) == 'function') ? eval('(' + value + ')') : value;
//         if (typeof value === 'string' && value.startsWith('(')) {
//           return eval(`(${value})`);
//         }
//         return value;
//       });
//   }

//   forPushInChilds(data: any, array: any) {
//
//     var length = 0;
//     for (let index = 0; index < data.children.length; index++) {
//       if (index == 0) {
//         if (data.children[index].type == "buttonGroup") {
//           length = this.addButtonGroupInAccordion(array, data.children[index])
//         }
//         else if (data.children[index].type == "gridList" || data.children[index].type == "invoiceGrid" || data.children[index].type == "gridListEditDelete") {
//           length = this.addgridInAccordion(array, data.children[index])
//         }
//         else {
//           array.push(data.children[index]);
//           length = array.length - 1;
//         }
//       }
//       else {
//         if (array.length > 0) {
//           if (array[length].chartCardConfig) {
//             if (array[length].chartCardConfig[0].formly) {
//               if (data.children[index].chartCardConfig == undefined && data.children[index].type != 'buttonGroup' && data.children[index].type != 'gridList' && data.children[index].type != 'gridListEditDelete' && data.children[index].type != 'invoiceGrid') {
//                 array.push(data.children[index]);
//                 length = array.length - 1;
//               }
//               else if (data.children[index].chartCardConfig[0].formly) {
//                 array[length].chartCardConfig[0].formly[0].fieldGroup.push(data.children[index].chartCardConfig[0].formly[0].fieldGroup[0]);
//               }
//               else if (data.chartCardConfig[0].formly == undefined && data.children[index].type != 'buttonGroup' && data.children[index].type != 'gridList' && data.children[index].type != 'gridListEditDelete' && data.children[index].type != 'invoiceGrid') {
//                 array.push(data.children[index]);
//                 length = array.length - 1;
//               }
//               else if (data.children[index].type == 'buttonGroup') {
//                 length = this.addButtonGroupInAccordion(array, data.children[index])
//               }
//               else if (data.children[index].type == "gridList" || data.children[index].type == "gridListEditDelete" || data.children[index].type == "invoiceGrid") {
//                 length = this.addgridInAccordion(array, data.children[index])
//               }
//             }
//             else if (array[length].chartCardConfig) {
//               if (array[length].chartCardConfig[0].formly == undefined && data.children[index].type != "gridList" && data.children[index].type == "buttonGroup" && data.children[index].type != "gridListEditDelete" && data.children[index].type != "invoiceGrid") {
//                 length = this.addButtonGroupInAccordion(array, data.children[index])
//               }
//               else if (data.children[index].type == "gridList" ||data.children[index].type == "invoiceGrid" || data.children[index].type == "gridListEditDelete" && data.children[index].type != "buttonGroup") {
//                 length = this.addgridInAccordion(array, data.children[index])
//               }
//               else if (array[length].chartCardConfig[0].formly == undefined && data.children[index].type != "buttonGroup") {
//                 array.push(data.children[index]);
//                 length = array.length - 1;
//               }
//             }

//             else {
//               array.push(data.children[index]);
//               length = array.length - 1;
//             }
//           }
//           else if (data.children[index].type == "gridList" ||data.children[index].type == "invoiceGrid" || data.children[index].type == "gridListEditDelete" && data.children[index].type != "buttonGroup") {
//             length = this.addgridInAccordion(array, data.children[index])
//           }
//           else {
//             array.push(data.children[index]);
//             length = array.length - 1;
//           }
//         }
//       }
//     }
//     return array;
//   }
// }
