import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-uirule',
  templateUrl: './uirule.component.html',
  styleUrls: ['./uirule.component.scss']
})
export class UIRuleComponent implements OnInit {

  @Input() screenModule: any;
  @Input() screenName: any;
  @Input() selectedNode: any;
  @Input() nodes: any;
  public editorOptions: JsonEditorOptions;
  makeOptions = () => new JsonEditorOptions();
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  constructor(private formBuilder: FormBuilder, private builderService: BuilderService) {
    this.editorOptions = new JsonEditorOptions();
  }

  uiRuleForm: FormGroup;
  screenData: any;
  targetList: any = [];
  condationList: any;
  ifMenuName: any = [];
  ifMenuList: any = [];
  ngOnInit(): void {
    this.uiRule();
  }
  changeIf() {
    // this.addUIRuleIfCondition(uiIndex).at(ifIndex).get("conditonType").setValue(conValue)
    this.targetList = [];
    var objTargetList = { key: '', value: '' };
    for (let j = 0; j < this.nodes[0].children[1].children[0].children[1].children.length; j++) {
      objTargetList = { key: '', value: '' };
      var inputType = this.nodes[0].children[1].children[0].children[1].children[j];

      if (inputType.type == "button" || inputType.type == "linkButton" || inputType.type == "dropdownButton") {
        objTargetList.key = (inputType.key).toString()
        objTargetList.value = (inputType.title).toString()
        this.targetList.push(objTargetList)
      } else if (inputType.type == "buttonGroup") {
        objTargetList.key = (inputType.key).toString()
        objTargetList.value = (inputType.title).toString()
        this.targetList.push(objTargetList)
      } else if (inputType.formlyType != undefined) {
        objTargetList.key = (inputType.key).toString()
        objTargetList.value = inputType.title ? (inputType.title).toString() : '';
        this.targetList.push(objTargetList);
      }
      else if (inputType.type == "alert" || inputType.type == "header" || inputType.type == "paragraph" ||
        inputType.type == "nzTag" || inputType.type == "card" || inputType.type == "simpleCardWithHeaderBodyFooter" ||
        inputType.type == "cascader" || inputType.type == "mentions" || inputType.type == "transfer" ||
        inputType.type == "treeSelect" || inputType.type == "switch" || inputType.type == "avatar" ||
        inputType.type == "badge" || inputType.type == "treeView" || inputType.type == "carouselCrossfade" ||
        inputType.type == "comment" || inputType.type == "description" || inputType.type == "statistic" ||
        inputType.type == "empty" || inputType.type == "list" || inputType.type == "popConfirm" ||
        inputType.type == "timeline" || inputType.type == "popOver" || inputType.type == "imageUpload" ||
        inputType.type == "invoice" || inputType.type == "segmented" || inputType.type == "drawer" ||
        inputType.type == "message" || inputType.type == "notification" || inputType.type == "modal" ||
        inputType.type == "progressBar" || inputType.type == "result" || inputType.type == "skeleton" ||
        inputType.type == "spin" || inputType.type == "accordionButton" || inputType.type == "audio" ||
        inputType.type == "multiFileUpload" || inputType.type == "rate" || inputType.type == "toastr" ||
        inputType.type == "video") {
        objTargetList.key = (inputType.key).toString()
        objTargetList.value = inputType.title ? (inputType.title).toString() : '';
        this.targetList.push(objTargetList);
      }

      // else if (inputType.type == "stepperMain") {
      //   for (let k = 0; k < inputType.children.length; k++) {
      //     objTargetList = { key: '', value: '' };
      //     objTargetList.key = (inputType.children[k].formly[0].fieldGroup[0].key).toString()
      //     objTargetList.value = (inputType.children[k].formly[0].fieldGroup[0].templateOptions.title).toString()
      //     this.targetList.push(objTargetList)
      //   }
      // }
      // else if (inputType.type == "mainDashonicTabs") {
      //   for (let k = 0; k < inputType.children.length; k++) {
      //     objTargetList = { key: '', value: '' };
      //     objTargetList.key = (inputType.children[k].key).toString()
      //     objTargetList.value = (inputType.children[k].dashonicTabsConfig[0].tabtitle).toString()
      //     this.targetList.push(objTargetList)
      //   }
      // } else if (inputType.type == "mainDashonicTabs") {
      //   for (let k = 0; k < inputType.children.length; k++) {
      //     objTargetList = { key: '', value: '' };
      //     objTargetList.key = (inputType.children[k].key).toString()
      //     objTargetList.value = (inputType.children[k].title).toString()
      //     this.targetList.push(objTargetList)
      //   }
      // } else if (inputType.type == "gridList" || inputType.type == "gridListEditDelete") {
      //   objTargetList = { key: '', value: '' };
      //   objTargetList.key = (inputType.key).toString()
      //   objTargetList.value = (inputType.title).toString()
      //   this.targetList.push(objTargetList)
      // }
    }
    // this.targetList = this.targetList.filter((a: any) => a.key != this.ifMenuName);
  }
  getConditionList(uiIndex?: number, ifIndex?: number) {
    let nodeList: any;
    let menuName: any;
    if (ifIndex != undefined && uiIndex != undefined) {
      menuName = this.addUIRuleIfCondition(uiIndex)?.at(ifIndex)?.get("ifMenuName")?.value;
      nodeList = this.findElementNode(this.nodes, menuName);
    }
    else if (uiIndex != undefined) {
      menuName = this.getUiRule().at(uiIndex).get('ifMenuName')?.value;
      nodeList = this.findElementNode(this.nodes, menuName);
    }

    let inputType = nodeList.formly[0].fieldGroup[0].templateOptions.type == undefined ? nodeList.type : nodeList.formly[0].fieldGroup[0].templateOptions.type;
    this.condationList = [];
    this.condationList = this.conditioList(inputType);
    if (ifIndex != undefined && uiIndex != undefined) {
      this.addUIRuleIfCondition(uiIndex).at(ifIndex).patchValue({
        condationList: this.condationList
      });
    }
    else {
      if (uiIndex != undefined)
        this.getUiRule().at(uiIndex).patchValue({
          condationList: this.condationList
        });
    }
  }
  uIRuleInitilize(): FormGroup {
    return this.formBuilder.group({
      ifMenuName: '',
      inputType: '',
      condationList: [''],
      condationName: '',
      targetValue: '',
      targetName: '',
      conditonType: 'And',
      targetIfValue: this.formBuilder.array([]),
      targetCondition: this.formBuilder.array([]),
    });
  }
  uiRuleFormInitilize() {
    this.uiRuleForm = this.formBuilder.group({
      uiRules: this.formBuilder.array([this.uIRuleInitilize()])
    });
  }
  getUiRule(): FormArray {
    return this.uiRuleForm.get('uiRules') as FormArray;
  }
  addUIRule() {
    this.getUiRule().push(this.uIRuleInitilize());
  }

  newIfUIRule(): FormGroup {
    return this.formBuilder.group({
      ifMenuName: '',
      inputType: '',
      condationList: [''],
      condationName: '',
      targetValue: '',
      conditonType: 'AND',
    });
  }

  addUIRuleIfCondition(ifIndex: number): FormArray {
    return this.getUiRule()
      .at(ifIndex)
      .get('targetIfValue') as FormArray;
  }
  removeUIRule(uiIndex: number) {
    this.getUiRule().removeAt(uiIndex);
  }
  removeIfUIRule(uiIndex: number, ifIndex: number) {
    this.addUIRuleIfCondition(uiIndex).removeAt(ifIndex);
  }
  addUITargetIfRule(uiIndex: number) {
    this.addUIRuleIfCondition(uiIndex).push(this.newIfUIRule());
  }
  buttonUITextCahnge(uiIndex: number, ifIndex: number) {
    let conValue = this.addUIRuleIfCondition(uiIndex)?.at(ifIndex)?.get("conditonType")?.value == "AND" ? "OR" : "AND";
    this.addUIRuleIfCondition(uiIndex)?.at(ifIndex)?.get("conditonType")?.setValue(conValue);
  };
  addTargetCondition(uiIndex: number): FormArray {
    return this.getUiRule()
      .at(uiIndex)
      .get('targetCondition') as FormArray;
  }
  onChangeTargetNameChild(event: any, uiIndex: number, index: number) {
    
    for (let j = 0; j < this.nodes[0].children[1].children[0].children[1].children.length; j++) {
      var inputType = this.nodes[0].children[1].children[0].children[1].children[j]
      if (inputType.type == "button" || inputType.type == "linkButton" || inputType.type == "dropdownButton") {
        const element = inputType.key;
        if (element == event) {
          this.addTargetCondition(uiIndex).at(index).patchValue({
            inputJsonData: inputType,
            inputOldJsonData: inputType
          });
        }
      } else if (inputType.type == "buttonGroup") {
        const element = inputType.key;
        if (element == event) {
          this.addTargetCondition(uiIndex).at(index).patchValue({
            inputJsonData: inputType.children,
            inputOldJsonData: inputType.children
          });
        }
      } else if (inputType.type == "input" || inputType.type == "inputGroup" || inputType.type == "checkbox" || inputType.type == "color" ||
        inputType.type == "decimal" || inputType.type == "image" || inputType.type == "multiselect" || inputType.type == "radiobutton" ||
        inputType.type == "search" || inputType.type == "repeatSection" || inputType.type == "tags" || inputType.type == "telephone"
        || inputType.type == "textarea" || inputType.type == "date" || inputType.type == "datetime" || inputType.type == "month"
        || inputType.type == "time" || inputType.type == "week") {
        const element = inputType.key;
        if (element == event) {
          this.addTargetCondition(uiIndex).at(index).patchValue({
            inputJsonData: inputType.formly[0].fieldGroup[0],
            inputOldJsonData: inputType.formly[0].fieldGroup[0]
          });
        }
      } else if (inputType.type == "alert" || inputType.type == "header" || inputType.type == "paragraph" ||
        inputType.type == "nzTag" || inputType.type == "card" || inputType.type == "simpleCardWithHeaderBodyFooter" ||
        inputType.type == "cascader" || inputType.type == "mentions" || inputType.type == "transfer" ||
        inputType.type == "treeSelect" || inputType.type == "switch" || inputType.type == "avatar" ||
        inputType.type == "badge" || inputType.type == "treeView" || inputType.type == "carouselCrossfade" ||
        inputType.type == "comment" || inputType.type == "description" || inputType.type == "statistic" ||
        inputType.type == "empty" || inputType.type == "list" || inputType.type == "popConfirm" ||
        inputType.type == "timeline" || inputType.type == "popOver" || inputType.type == "imageUpload" ||
        inputType.type == "invoice" || inputType.type == "segmented" || inputType.type == "drawer" ||
        inputType.type == "message" || inputType.type == "notification" || inputType.type == "modal" ||
        inputType.type == "progressBar" || inputType.type == "result" || inputType.type == "skeleton" ||
        inputType.type == "spin" || inputType.type == "accordionButton" || inputType.type == "audio" ||
        inputType.type == "multiFileUpload" || inputType.type == "rate" || inputType.type == "toastr" ||
        inputType.type == "video") {
        const element = inputType.key;
        if (element == event) {
          this.addTargetCondition(uiIndex).at(index).patchValue({
            inputJsonData: inputType,
            inputOldJsonData: inputType
          });
        }
      } else if (inputType.type == "stepperMain") {
        for (let k = 0; k < inputType.children.length; k++) {
          const element = inputType.children[k].formly[0].fieldGroup[0].key;
          if (element == event) {
            this.addTargetCondition(uiIndex).at(index).patchValue({
              inputJsonData: inputType.children[k],
              inputOldJsonData: inputType.children[k]
            });
          }
        }
      } else if (inputType.type == "mainDashonicTabs") {
        for (let k = 0; k < inputType.children.length; k++) {
          const element = inputType.children[k].key;
          if (element == event) {
            this.addTargetCondition(uiIndex).at(index).patchValue({
              inputJsonData: inputType.children[k],
              inputOldJsonData: inputType.children[k]
            });
          }
        }
      } else if (inputType.type == "gridList" || inputType.type == "gridListEditDelete") {
        const element = inputType.key;
        if (element == event) {
          this.addTargetCondition(uiIndex).at(index).patchValue({
            inputJsonData: inputType,
            inputOldJsonData: inputType
          });
        }
      }
    }
  }
  saveJsonStringify(uiIndex: number, index: number) {
    this.addTargetCondition(uiIndex).at(index).patchValue({
      // inputJsonData: this.addTargetCondition(uiIndex).at(index).get("inputJsonData").value,
      changeData: this.compare(this.addTargetCondition(uiIndex)?.at(index)?.get("inputJsonData")?.value, this.addTargetCondition(uiIndex)?.at(index)?.get("inputOldJsonData")?.value)
    });
  }
  compare(newData: any, oldData: any) {
    const changes: any[] = [];
    for (const key of Object.keys(newData)) {
      if (newData[key] !== oldData[key]) {
        if (typeof newData[key] === 'object') {
          const nestedChanges = this.compare(newData[key], oldData[key]);
          changes.push(...nestedChanges);
        } else {
          changes.push({ key: key, value: newData[key] });
        }
      }
    }
    return changes;
  }
  removeTargetUIRule(uiIndex: number, targetIndex: number) {
    this.addTargetCondition(uiIndex).removeAt(targetIndex);
  }
  addUITargetRule(uiIndex: number) {
    this.addTargetCondition(uiIndex).push(this.newTargetUIRule());
  }
  newTargetUIRule(): FormGroup {
    return this.formBuilder.group({
      targetValue: '',
      targetName: '',
      formattingName: '',
      inputJsonData: [''],
      inputOldJsonData: [''],
      changeData: [''],
    });
  }
  updateRule() {
    
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    const jsonUIResult = {
      // "key": this.selectedNode.chartCardConfig?.at(0)?.buttonGroup == undefined ? this.selectedNode.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.key : this.selectedNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
      "key": this.selectedNode.key,
      "title": this.selectedNode.title,
      "moduleName": this.screenName,
      "moduleId": mainModuleId.length > 0 ? mainModuleId[0].screenId : "",
      "uiData": this.uiRuleForm.value.uiRules,
    }
    if (jsonUIResult != null) {
      const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
      if (mainModuleId[0].screenId != null) {
        this.builderService.jsonUIRuleGetData(this.screenName).subscribe((getRes => {
          
          if (getRes.length > 0) {
            this.builderService.jsonUIRuleRemove(getRes[0].id).subscribe((delRes => {
              this.builderService.jsonUIRuleDataSave(jsonUIResult).subscribe((saveRes => {
                alert("Data Save");
                this.screenData = [];
                this.screenData = jsonUIResult;
                // this.makeFaker();
                this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
              }));
            }));
          }
          else {
            this.builderService.jsonUIRuleDataSave(jsonUIResult).subscribe((saveRes => {
              alert("Data Save");
              this.screenData = [];
              this.screenData = jsonUIResult;
              // this.makeFaker();
              this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
            }));
          }
        }));
      }
    }
    // this.cd.detectChanges();
    // this.clickBack();
  }
  uiRule() {
    
    //UIRule Form Declare
    this.uiRuleFormInitilize();
    const mainModuleId = this.screenModule.filter((a: any) => a.name == this.screenName)
    this.ifMenuName = [];
    this.ifMenuList = [];
    for (let j = 0; j < this.nodes[0].children[1].children[0].children[1].children.length; j++) {
      if (this.nodes[0].children[1].children[0].children[1].children[j].formlyType != undefined) {
        this.ifMenuList.push(this.nodes[0].children[1].children[0].children[1].children[j]);
      }
    }
    this.ifMenuName = this.ifMenuList;
    this.changeIf();
    this.builderService.jsonUIRuleGetData(this.screenName).subscribe((getRes: Array<any>) => {
      this.uiRuleForm = this.formBuilder.group({
        uiRules: this.formBuilder.array(
          getRes[0].uiData.map((getUIRes: any, uiIndex: number) =>
            this.formBuilder.group({
              ifMenuName: [getUIRes.ifMenuName],
              condationList: [this.getConditionListOnLoad(getUIRes.ifMenuName)],
              condationName: [getUIRes.condationName],
              targetValue: [getUIRes.targetValue],
              conditonType: [getUIRes.conditonType],
              targetIfValue: this.formBuilder.array(getUIRes.targetIfValue.map((getIFRes: any, ifIndex: number) =>
                this.formBuilder.group({
                  ifMenuName: [getIFRes.ifMenuName],
                  condationList: [this.getConditionListOnLoad(getIFRes.ifMenuName)],
                  condationName: [getIFRes.condationName],
                  targetValue: [getIFRes.targetValue],
                  conditonType: [getIFRes.conditonType]
                }))),
              targetCondition: this.formBuilder.array(getUIRes.targetCondition.map((getTargetRes: any) =>
                this.formBuilder.group({
                  targetValue: [getTargetRes.targetValue],
                  targetName: [getTargetRes.targetName],
                  formattingName: [getTargetRes.formattingName],
                  inputJsonData: [getTargetRes.inputJsonData],
                  inputOldJsonData: [getTargetRes.inputOldJsonData],
                  changeData: getTargetRes.changeData
                })
              )),
            })
          )
        )
      });
    });
  }
  getConditionListOnLoad(menuName: string) {
    
    let nodeList: any;
    nodeList = this.findElementNode(this.nodes, menuName);
    if (nodeList) {

      let inputType = nodeList.formly[0].fieldGroup[0].templateOptions.type == undefined ? nodeList.type : nodeList.formly[0].fieldGroup[0].templateOptions.type;
      this.condationList = [];
      this.condationList = this.conditioList(inputType);
      return this.condationList;
    }
  }
  checkConditionUIRule(model: any, currentValue: any) { }
  conditioList(inputType: string) {
    
    if (inputType == 'number' || inputType == 'decimal') {
      this.condationList = [
        { name: "Null OR Empty", key: "null" },
        { name: "Equal", key: "==" },
        { name: "Not Equal", key: "!=" },
        { name: "Greater Then", key: ">" },
        { name: "Less Then", key: "<" },
        { name: "Greater then and Equal", key: ">=" },
        { name: "Less Then and Equal", key: "<=" },
      ]
    } else {
      this.condationList = [
        { name: "Null OR Empty", key: "null" },
        { name: "Equal", key: "==" },
        { name: "Not Equal", key: "!=" },
        { name: "Contain", key: "contains" }
      ]
    }
    return this.condationList;
  }
  findElementNode(selectedNode: any, key: any) {
    if (selectedNode[0].key == key) {
      console.log(selectedNode);
    } else {
      if (selectedNode[0] && selectedNode[0].children) {
        for (let i = 0; i < selectedNode[0].children.length; i++) {
          if (selectedNode[0].children[i].formly[0].key == key) {
            console.log(selectedNode[0].children[i]);
            return selectedNode[0].children[i];
          } else {
            for (let j = 0; j < selectedNode[0].children[i].children.length; j++) {
              if (selectedNode[0].children[i].children[j].formly[0].key == key) {
                console.log(selectedNode[0].children[i].children[j]);
                return selectedNode[0].children[i].children[j];
              } else if (j == selectedNode[0].children[i].children.length - 1) {
                for (let k = 0; k < selectedNode[0].children[i].children[j].children.length; k++) {
                  let isSelectedKey = true;
                  if (selectedNode[0].children[i].children[j].children[k].formly[0].key == key) {
                    console.log(selectedNode[0].children[i].children[j].children[k]);
                    isSelectedKey = false;
                    return selectedNode[0].children[i].children[j].children[k];
                  }
                  if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children.length > 0) {
                    for (let l = 0; l < selectedNode[0].children[i].children[j].children[k].children.length; l++) {
                      if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children[l]?.formly != undefined) {
                        if (selectedNode[0].children[i].children[j].children[k].children[l]?.key == key) {
                          isSelectedKey = false;
                          console.log(selectedNode[0].children[i].children[j].children[k].children[l]);
                          return selectedNode[0].children[i].children[j].children[k].children[l];
                        }
                      }
                      if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children[l]?.key == key) {
                        isSelectedKey = false;
                        console.log(selectedNode[0].children[i].children[j].children[k].children[l]);
                        return selectedNode[0].children[i].children[j].children[k].children[l];
                      }//strat Input Fields
                      if (isSelectedKey && selectedNode[0].children[i].children[j].children[k].children[l]?.buttonGroup != undefined) {
                        if (selectedNode[0].children[i].children[j].children[k].children[l]?.buttonGroup[0]?.btnConfig[0]?.key == key) {
                          isSelectedKey = false;
                          console.log(selectedNode[0].children[i].children[j].children[k].children[l]);
                          return selectedNode[0].children[i].children[j].children[k].children[l];
                        }
                      }
                      if (isSelectedKey && l == selectedNode[0].children[i].children[j].children[k].children.length - 1) {
                        this.findElementNode(selectedNode[0].children[i].children[j].children[k].formly, key);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

    }
  }
}
