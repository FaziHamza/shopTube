import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'st-uirule',
  templateUrl: './uirule.component.html',
  styleUrls: ['./uirule.component.scss']
})
export class UIRuleComponent implements OnInit {
  @Output() ruleNotify: EventEmitter<any> = new EventEmitter<any>();
  @Input() screens: any;
  @Input() screenId: string;
  @Input() screenName: string;
  @Input() applicationId: string;
  @Input() selectedNode: any;
  @Input() nodes: any;
  saveLoader: any = false;
  public editorOptions: JsonEditorOptions;
  makeOptions = () => new JsonEditorOptions();
  constructor(private formBuilder: FormBuilder, private builderService: BuilderService,
    private applicationService: ApplicationService, private toastr: NzMessageService,) {
    this.editorOptions = new JsonEditorOptions();
  }
  nodesData : any[] = [];
  uiRuleForm: FormGroup;
  screenData: any;
  targetList: any = [];
  condationList: any;
  ifMenuName: any = [];
  ifMenuList: any = [];
  uiRuleId: string = '';
  ngOnInit(): void {
    this.uiRule();
  }
  changeIf() {
    debugger
    // this.addUIRuleIfCondition(uiIndex).at(ifIndex).get("conditonType").setValue(conValue)
    this.targetList = [];
    var objTargetList = { key: '', value: '' };
    let sectionData = this.nodes[0].children[1].children;
    for (let index = 0; index < sectionData.length; index++) {
      objTargetList = { key: '', value: '' };
      objTargetList.key = (sectionData[index].key).toString()
      objTargetList.value = sectionData[index].title ? (sectionData[index].title).toString() : '';
      this.targetList.push(objTargetList);
      for (let j = 0; j < sectionData[index].children[1].children.length; j++) {
        objTargetList = { key: '', value: '' };
        var inputType = sectionData[index].children[1].children[j];

        if (inputType.type == "button" || inputType.type == "linkButton" || inputType.type == "dropdownButton" || inputType.type == "buttonGroup") {
          objTargetList.key = (inputType.key).toString()
          objTargetList.value = (inputType.title).toString()
          this.targetList.push(objTargetList)
        } else if (inputType.formlyType != undefined) {
          objTargetList.key = (inputType.formly[0].fieldGroup[0].key).toString()
          objTargetList.value = inputType.title ? (inputType.title).toString() : '';
          this.targetList.push(objTargetList);
        }
        else if (inputType.type == "alert" || inputType.type == "heading" || inputType.type == "paragraph" ||
          inputType.type == "tag" || inputType.type == "card" || inputType.type == "simpleCardWithHeaderBodyFooter" ||
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
        //     objTargetList.value = (inputType.children[k].formly[0].fieldGroup[0].props.title).toString()
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
    }

  }
  getConditionList(uiIndex?: number, ifIndex?: number) {
    // debugger
    let nodeList: any;
    let menuName: any;
    if (ifIndex != undefined && uiIndex != undefined) {
      menuName = this.addUIRuleIfCondition(uiIndex)?.at(ifIndex)?.get("ifMenuName")?.value;
      nodeList = this.findElementNode(this.nodes[0], menuName);
    }
    else if (uiIndex != undefined) {
      menuName = this.getUiRule().at(uiIndex).get('ifMenuName')?.value;
      nodeList = this.findElementNode(this.nodes[0], menuName);
    }

    let inputType = nodeList.formly[0].fieldGroup[0].props.type == undefined ? nodeList.type : nodeList.formly[0].fieldGroup[0].props.type;
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
      condationList: [this.conditioList('')],
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
      uiRules: this.formBuilder.array([])
    });
  }
  getUiRule(): FormArray {
    return this.uiRuleForm.get('uiRules') as FormArray;
  }
  addUIRule() {
    // debugger
    this.getUiRule().push(this.uIRuleInitilize());
  }

  newIfUIRule(): FormGroup {
    return this.formBuilder.group({
      ifMenuName: '',
      inputType: '',
      condationList: [this.conditioList('')],
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

    const findObj = this.nodesData.find(a=>a.key == event);
    this.addTargetCondition(uiIndex).at(index).patchValue({
      inputJsonData: findObj,
      inputOldJsonData: findObj
    });
    return;
    let sectionData = this.nodes[0].children[1].children;
    for (let k = 0; k < sectionData.length; k++) {
      let section = sectionData[k];
      if (section.key == event) {
        this.addTargetCondition(uiIndex).at(index).patchValue({
          inputJsonData: section,
          inputOldJsonData: section
        });
      }
      else
      {
        for (let j = 0; j < sectionData[k].children[1].children.length; j++) {
          var inputType = sectionData[k].children[1].children[j];
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
          } else if (inputType.type == "input" || inputType.type == "inputGroup" || inputType.type == "number" || inputType.type == "checkbox" || inputType.type == "color" ||
            inputType.type == "decimal" || inputType.type == "image" || inputType.type == "multiselect" || inputType.type == "radiobutton" ||
            inputType.type == "search" || inputType.type == "repeatSection" || inputType.type == "tags" || inputType.type == "telephone"
            || inputType.type == "textarea" || inputType.type == "date" || inputType.type == "datetime" || inputType.type == "month"
            || inputType.type == "time" || inputType.type == "week") {
            const element = inputType.key;
            if (element == event) {
              this.addTargetCondition(uiIndex).at(index).patchValue({
                inputJsonData: inputType,
                inputOldJsonData: inputType
              });
            }
          } else if (inputType.type == "alert" || inputType.type == "heading" || inputType.type == "paragraph" ||
            inputType.type == "tag" || inputType.type == "card" || inputType.type == "simpleCardWithHeaderBodyFooter" ||
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
  saveUIRule() {
    this.saveLoader = true;
    const selectedScreen = this.screens.filter((a: any) => a._id == this.screenId)
    const jsonUIResult = {
      // "key": this.selectedNode.chartCardConfig?.at(0)?.buttonGroup == undefined ? this.selectedNode.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.key : this.selectedNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
      "key": this.selectedNode.key,
      "title": this.selectedNode.title,
      "screenName": this.screenName,
      "applicationId": this.applicationId,
      "screenBuilderId": this.screenId,
      "uiData": JSON.stringify(this.uiRuleForm.value.uiRules),
    }
    const uiModel = {
      "UiRule": jsonUIResult
    }
    if (jsonUIResult != null) {
      const checkAndProcess = this.uiRuleId == ''
        ? this.applicationService.addNestCommonAPI('cp', uiModel)
        : this.applicationService.updateNestCommonAPI('cp/UiRule', this.uiRuleId, uiModel);
      checkAndProcess.subscribe({
        next: (res: any) => {
    this.saveLoader = false;
          if (res.isSuccess) {
            this.toastr.success(res.message, { nzDuration: 3000 }); // Show an error message to the user
            this.uiRule();
            this.ruleNotify.emit(true);
            this.screenData = [];
            this.screenData = jsonUIResult;
            this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
          } else
            this.toastr.error(res.message, { nzDuration: 3000 }); // Show an error message to the user
        },
        error: (err) => {
    this.saveLoader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      });

      // const mainModuleId = this.screens.filter((a: any) => a.name == this.screenId)
      // if (mainModuleId[0].screenId != null) {
      //   this.builderService.jsonUIRuleGetData(this.screenId).subscribe((getRes => {

      //     if (getRes.length > 0) {
      //       this.builderService.jsonUIRuleRemove(getRes[0].id).subscribe((delRes => {
      //         this.builderService.jsonUIRuleDataSave(jsonUIResult).subscribe((saveRes => {
      //           alert("Data Save");
      //           this.ruleNotify.emit(true);
      //           this.screenData = [];
      //           this.screenData = jsonUIResult;
      //           // this.makeFaker();
      //           this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
      //         }));
      //       }));
      //     }
      //     else {
      //       this.builderService.jsonUIRuleDataSave(jsonUIResult).subscribe((saveRes => {
      //         alert("Data Save");
      //         this.ruleNotify.emit(true);
      //         this.screenData = [];
      //         this.screenData = jsonUIResult;
      //         // this.makeFaker();
      //         this.checkConditionUIRule({ key: 'text_f53ed35b', id: 'formly_86_input_text_f53ed35b_0' }, '');
      //       }));
      //     }
      //   }));
      // }
    }
    // this.cd.detectChanges();
    // this.clickBack();
  }
  getAllObjects(data: any): any[] {
    const foundObjects: any[] = [];
  
    function recursiveFind(currentData: any) {
      if (currentData) {
        foundObjects.push(currentData);
  
        if (currentData.children && currentData.children.length > 0) {
          for (const child of currentData.children) {
            recursiveFind(child);
          }
        }
      }
    }
  
    recursiveFind(data);
    return foundObjects;
  }
  
  uiRule() {
    this.saveLoader = true;
    // debugger
    //UIRule Form Declare
    this.uiRuleFormInitilize();
    this.ifMenuName = [];
    this.ifMenuList = [];
    // let sectionData = this.nodes[0].children[1].children;
    // for (let j = 0; j < sectionData.length; j++) {
    //   for (let index = 0; index < sectionData[j].children[1].children.length; index++) {
    //     if (sectionData[j].children[1].children[index].formlyType != undefined) {
    //       sectionData[j].children[1].children[index]['key'] = sectionData[j].children[1].children[index].formly[0].fieldGroup[0].key
    //       this.ifMenuList.push(sectionData[j].children[1].children[index]);
    //     }
    //     else
    //       this.ifMenuList.push(sectionData[j].children[1].children[index]);
    //   }

    // }
    let sectionData = this.getAllObjects(this.nodes[0].children[1]);
    this.nodesData = sectionData;
    this.ifMenuList = sectionData;
    this.ifMenuName = this.ifMenuList;
    this.targetList = sectionData;
    // this.changeIf();

    this.applicationService.getNestCommonAPIById('cp/UiRule', this.screenId).subscribe((getRes: any) => {
      this.saveLoader = false;
      if (getRes.isSuccess) {
        if (getRes.data.length > 0) {
          this.uiRuleId = getRes.data[0]._id;
          const objUiData = JSON.parse(getRes.data[0].uiData);
          this.uiRuleForm = this.formBuilder.group({
            uiRules: this.formBuilder.array(
              objUiData.map((getUIRes: any, uiIndex: number) =>
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
        }
      } else
        this.toastr.error(getRes.message, { nzDuration: 3000 });
    });
  }
  getConditionListOnLoad(menuName: string) {

    let nodeList: any;
    nodeList = this.findElementNode(this.nodes[0], menuName);
    if (nodeList) {

      let inputType = nodeList.formly[0].fieldGroup[0].props.type == undefined ? nodeList.type : nodeList.formly[0].fieldGroup[0].props.type;
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
  findElementNode(data: any, key: any) {
    if (data) {
      if (data.key && key) {
        if (data.key === key) {
          return data;
        }
        if (data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findElementNode(child, key);
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }
    }
  }

  deleteUiRule() {
    if (this.uiRuleId != '')
      this.applicationService.deleteNestCommonAPI('cp/UiRule', this.uiRuleId).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.uiRuleId = '';
            this.uiRuleFormInitilize();
            this.uiRule();
            this.toastr.success(res.message, { nzDuration: 3000 }); // Show an error message to the user
          }
          else
            this.toastr.success(res.message, { nzDuration: 3000 }); // Show an error message to the user
        },
        error: (err) => {
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      });
    else
      this.uiRuleFormInitilize();
  }
}
