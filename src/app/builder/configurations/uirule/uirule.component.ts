import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import * as jsonpatch from 'fast-json-patch';
import { Operation } from 'fast-json-patch';
import { diff, Config, DiffPatcher, formatters, Delta } from "jsondiffpatch";
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'st-uirule',
  templateUrl: './uirule.component.html',
  styleUrls: ['./uirule.component.scss']
})
export class UIRuleComponent implements OnInit {
  @Output() ruleNotify: EventEmitter<any> = new EventEmitter<any>();
  @Input() screens: any;
  @Input() screenId: string;
  @Input() screenname: string;
  @Input() applicationid: string;
  @Input() selectedNode: any;
  @Input() nodes: any;
  @Input() responseData: any;
  @Input() isScreenSaved: boolean;
  originalData: any;
  saveLoader: any = false;
  public editorOptions: JsonEditorOptions;
  makeOptions = () => new JsonEditorOptions();
  private jsondiffpatch = new DiffPatcher();
  constructor(private formBuilder: FormBuilder,
    public socketService: SocketService,
    private toastr: NzMessageService,) {
    this.editorOptions = new JsonEditorOptions();
  }
  nodesData: any[] = [];
  uiRuleForm: FormGroup;
  screenData: any;
  targetList: any = [];
  condationList: any;
  ifMenuName: any = [];
  actionTypeList: any = [];
  ifMenuList: any = [];
  uiRuleId: string = '';
  invoice1: any;
  invoice2: any;
  ngOnInit(): void {
    if (this.isScreenSaved)
      this.toastr.warning("Please save screen before add or update ui rule", { nzDuration: 3000 });
    const obj = {
      title: "User Policy",
      key: "policyId",
      type: 'string'
    }
    const data = JSON.parse(JSON.stringify(this.nodes));
    this.nodes = data;
    let createData = [{ 'title': 'App application Id', 'key': 'app_applicationId', type: 'string' },
    { 'title': 'App Organization Id', 'key': 'app_organizationId', type: 'string' },
    { 'title': 'App ScreenBuilder Id', 'key': 'app_screenBuildId', type: 'string' },
    { 'title': 'App ScreenId', 'key': 'app_screenId', type: 'string' },
    { 'title': 'User User Name', 'key': 'app_user.username', type: 'string' },
    { 'title': 'User User Id', 'key': 'app_user.userId', type: 'string' },
    { 'title': 'User Policy policyName', 'key': 'app_user.policy.policyName', type: 'string' },
    ];

    createData.forEach((element: any) => {
      this.nodes[0].children[1].children.push(element);
    });
    this.nodes[0].children[1].children.push(obj);
    this.uiRule();
    this.invoice1 = { "title": "Select One" };
    this.invoice2 = { "title": "Select two" };
    // this.applyDiff();
  }
  changeIf() {

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
    // 
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

    let inputType = nodeList.formly == undefined ? nodeList.type : nodeList.formly[0].fieldGroup[0].props.type;
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
      actionType: '',
      targetValue: '',
      targetName: '',
      conditonType: 'And',
      targetIfValue: this.formBuilder.array([]),
      targetCondition: this.formBuilder.array([]),
      diff: {},
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
    // 
    this.getUiRule().push(this.uIRuleInitilize());
  }

  newIfUIRule(): FormGroup {
    return this.formBuilder.group({
      ifMenuName: '',
      inputType: '',
      condationList: [this.conditioList('')],
      condationName: '',
      actionType: '',
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

    const findObj = this.nodesData.find(a => a.key == event);
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
      else {
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
    let findObj = this.findObjectByKey(this.nodesData[0], this.addTargetCondition(uiIndex)?.at(index)?.get("inputJsonData")?.value.key);
    // if (findObj) {
    //   const jsondiffpatch = require('jsondiffpatch');
    //   const appDiv: any = document.getElementById(`app${uiIndex}diff${index}`);
    //   const diff: any = jsondiffpatch.diff(findObj, this.addTargetCondition(uiIndex)?.at(index)?.get("inputJsonData")?.value);
    //   appDiv.innerHTML = jsondiffpatch.formatters.html.format(diff, this.invoice1);
    //   jsondiffpatch.formatters.html.hideUnchanged();
    // }
    if (findObj) {
      this.addTargetCondition(uiIndex).at(index).patchValue({
        // inputJsonData: this.addTargetCondition(uiIndex).at(index).get("inputJsonData").value,

        diff: this.jsondiffpatch.diff(findObj, this.addTargetCondition(uiIndex)?.at(index)?.get("inputJsonData")?.value),
        // changeData: this.compare(this.addTargetCondition(uiIndex)?.at(index)?.get("inputJsonData")?.value, this.addTargetCondition(uiIndex)?.at(index)?.get("inputOldJsonData")?.value)
      });
    }

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
      diff: {}
    });
  }
  modifedOriginalData() {
    let data = JSON.stringify(this.uiRuleForm.value.uiRules);
    let parseData = JSON.parse(data);
    parseData.forEach((rule: any) => {
      if (rule.targetCondition.length > 0) {
        rule.targetCondition.forEach((ruleChild: any) => {
          let findObj = this.findObjectByKey(this.nodes[0], ruleChild.targetName);
          if (findObj)
            delete ruleChild.inputOldJsonData;
          delete ruleChild.changeData;
          delete ruleChild.diff;
          ruleChild['inputJsonData'] = JSON.parse(JSON.stringify(findObj));
        })
      }
      else {
        let findObj = this.findObjectByKey(this.nodes[0], rule.targetName);
        if (findObj)
          delete rule.inputOldJsonData;
        delete rule.changeData;
        delete rule.diff;
        rule['inputJsonData'] = JSON.parse(JSON.stringify(findObj));
      }
    });
    const jsonUIResult = {
      "key": this.selectedNode.key,
      "title": this.selectedNode.title,
      "screenname": this.screenname,
      "applicationid": this.applicationid,
      "screenbuilderid": this.screenId,
      "uiData": parseData,
      "patchOperations": ""
    }
    return jsonUIResult;
  }

  saveUIRule() {
    if (this.isScreenSaved)
      this.toastr.error("Please save screen before add or update  ui rule", { nzDuration: 3000 }); // Show an error message to the user
    else {
      const data = JSON.parse(JSON.stringify(this.uiRuleForm.value.uiRules));
      data.forEach((rule: any) => {
        if (rule.targetCondition.length > 0) {
          rule.targetCondition.forEach((ruleChild: any) => {
            delete ruleChild.inputOldJsonData;
            delete ruleChild.changeData;
            delete ruleChild.diff;
          })
        }
      });


      const newData = {
        // "key": this.selectedNode.chartCardConfig?.at(0)?.buttonGroup == undefined ? this.selectedNode.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.key : this.selectedNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
        "title": this.selectedNode.title,
        "screenname": this.screenname,
        "applicationid": this.applicationid,
        "screenbuilderid": this.screenId,
        "uiData": data,
        "patchOperations": ""
      }
      this.saveLoader = true;
      let patchOperations: any = '';
      // if (this.originalData) {
      const getModifiedData = this.modifedOriginalData();
      const cleanedChanges = this.removeDiffChanges(newData); //Changed Data
      patchOperations = this.generatePatchOperations(getModifiedData, cleanedChanges);
      // } else {
      //   const cleanedChanges = this.removeDiffChanges(this.uiRuleForm.value);
      //   patchOperations = this.generatePatchOperations(this.originalData, cleanedChanges);
      // }

      this.uiRuleForm.value.uiRules.forEach((rule: any) => {
        if (rule.targetCondition.length > 0) {
          rule.targetCondition.forEach((ruleChild: any) => {
            ruleChild
            delete ruleChild.inputJsonData;
            delete ruleChild.inputOldJsonData;
            delete ruleChild.changeData;
          })

        }
      });
      const updatepatchOperations = {
        json: patchOperations
      }
      const ruleData = {
        json: this.uiRuleForm.value.uiRules
      }
      const jsonUIResult = {
        // "key": this.selectedNode.chartCardConfig?.at(0)?.buttonGroup == undefined ? this.selectedNode.chartCardConfig?.at(0)?.formly?.at(0)?.fieldGroup?.at(0)?.key : this.selectedNode.chartCardConfig?.at(0)?.buttonGroup?.at(0)?.btnConfig[0].key,
        "key": this.selectedNode.key,
        "title": this.selectedNode.title,
        "screenname": this.screenname,
        "applicationid": this.applicationid,
        "screenbuilderid": this.screenId,
        "uiData": JSON.stringify(ruleData),
        "patchOperations": JSON.stringify(updatepatchOperations)
      }
      if (jsonUIResult != null) {
        var ResponseGuid: any;
        if (this.uiRuleId == '') {
          const { newGuid, metainfocreate } = this.socketService.metainfocreate();
          ResponseGuid = newGuid;
          const Add = { [`UiRule`]: jsonUIResult, metaInfo: metainfocreate }
          this.socketService.Request(Add);
        } else {
          const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(this.uiRuleId);
          ResponseGuid = newUGuid;
          const Update = { [`UiRule`]: jsonUIResult, metaInfo: metainfoupdate };
          this.socketService.Request(Update)
        }

        this.socketService.OnResponseMessage().subscribe({
          next: (res: any) => {
            if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
              res = res.parseddata.apidata;
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
            }

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
    debugger
    this.saveLoader = true;

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
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('UiRule', this.screenId, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (getRes: any) => {
        if (getRes.parseddata.requestId == newGuid && getRes.parseddata.isSuccess) {
          getRes = getRes.parseddata.apidata;
          this.saveLoader = false;
          if (getRes.isSuccess) {
            if (getRes.data.length > 0) {
              this.uiRuleId = getRes.data[0].id;
              this.responseData = JSON.parse(JSON.stringify(getRes.data));
              let parseData = getRes.data[0].uidata.json;
              let newData = JSON.parse(JSON.stringify(this.nodes))
              parseData.forEach((rule: any) => {
                if (rule.targetCondition.length > 0) {
                  rule.targetCondition.forEach((ruleChild: any) => {
                    let findObj = this.findObjectByKey(newData[0], ruleChild.targetName);
                    ruleChild['inputJsonData'] = findObj ? findObj : {};
                  })
                }
              });
              let originalData = JSON.parse(JSON.stringify({ uiData: parseData }));
              let objUiData = getRes.data[0].patchoperations?.json ? jsonpatch.applyPatch(originalData, getRes.data[0].patchoperations?.json).newDocument : parseData;
              objUiData = objUiData.uiData ? objUiData.uiData : objUiData;
              this.responseData[0].uidata = objUiData;

              objUiData.forEach((rule: any) => {
                if (rule.targetCondition.length > 0) {
                  rule.targetCondition.forEach((ruleChild: any) => {
                    let findObj = this.findObjectByKey(newData[0], ruleChild.targetName);
                    if (findObj) {
                      const diff: any = this.jsondiffpatch.diff(findObj, ruleChild['inputJsonData']);
                      ruleChild['diff'] = diff;
                    }
                  })
                }
                else {
                  let findObj = this.findObjectByKey(newData[0], rule.targetName);
                  if (findObj) {
                    const diff: any = this.jsondiffpatch.diff(findObj, rule['inputJsonData']);
                    rule['diff'] = diff;
                  }
                }
              });

              this.uiRuleForm = this.formBuilder.group({
                uiRules: this.formBuilder.array(
                  objUiData.map((getUIRes: any, uiIndex: number) =>
                    this.formBuilder.group({
                      ifMenuName: [getUIRes.ifMenuName],
                      condationList: [this.getConditionListOnLoad(getUIRes.ifMenuName)],
                      condationName: [getUIRes.condationName],
                      actionType: [getUIRes?.actionType],
                      targetValue: [getUIRes.targetValue],
                      conditonType: [getUIRes.conditonType],
                      targetIfValue: this.formBuilder.array(getUIRes.targetIfValue.map((getIFRes: any, ifIndex: number) =>
                        this.formBuilder.group({
                          ifMenuName: [getIFRes.ifMenuName],
                          condationList: [this.getConditionListOnLoad(getIFRes.ifMenuName)],
                          condationName: [getIFRes.condationName],
                          actionType: [getIFRes.actionType],
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
                          diff: [getTargetRes?.diff],
                          changeData: getTargetRes.changeData
                        })
                      )),
                    })
                  )
                )
              });
              // setTimeout(() => {
              //   objUiData.forEach((rule: any, uiIndex: number) => {
              //     if (rule.targetCondition.length > 0) {
              //       rule.targetCondition.forEach((ruleChild: any, index: number) => {
              //         let findObj = this.findObjectByKey(newData[0], ruleChild.targetName);
              //         if (findObj) {
              //           const jsondiffpatch = require('jsondiffpatch');
              //           const appDiv: any = document.getElementById(`app${uiIndex}diff${index}`);
              //           const diff: any = jsondiffpatch.diff(findObj, ruleChild['inputJsonData']);
              //           appDiv.innerHTML = jsondiffpatch.formatters.html.format(diff, this.invoice1);
              //           jsondiffpatch.formatters.html.hideUnchanged();
              //         }
              //       })
              //     }
              //   });
              // }, 200);

            }
          } else
            this.toastr.error(getRes.message, { nzDuration: 3000 });
        }
      },
      error: (err) => {
        console.error(err);
        this.saveLoader = false;
      }

    });
  }
  getConditionListOnLoad(menuName: string) {

    let nodeList: any;
    nodeList = this.findElementNode(this.nodes[0], menuName);
    if (nodeList) {

      let inputType = nodeList.formly == undefined ? nodeList.type : nodeList.formly[0].fieldGroup[0].props.type;
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
      if ((data.key ? data.key : data.formly[0]?.fieldGroup[0]?.key) && key) {
        if ((data.key ? data.key : data.formly[0]?.fieldGroup[0]?.key) === key) {
          return data;
        }
        if (data.children) {
          if (data.children.length > 0) {
            for (let child of data.children) {
              let result: any = this.findElementNode(child, key);
              if (result !== null) {
                return result;
              }
            }
          }
        }
        return null;
      }
    }
  }

  deleteUiRule() {
    if (this.uiRuleId != '') {
      const { jsonData, newGuid } = this.socketService.deleteModelType('UiRule', this.uiRuleId);
      this.socketService.Request(jsonData);
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              this.uiRuleId = '';
              this.uiRuleFormInitilize();
              this.uiRule();
              this.toastr.success(res.message, { nzDuration: 3000 }); // Show an error message to the user
            }
            else
              this.toastr.success(res.message, { nzDuration: 3000 }); // Show an error message to the user
          }
        },
        error: (err) => {
          this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
        }
      });
    }
    else
      this.uiRuleFormInitilize();
  }
  separateRecordAndDifferences(user: any): { record: any, differences: any[] } {
    const record: any = { ...user };
    const differences: any[] = [];

    // Extract the differences and remove them from the record
    Object.keys(user).forEach((key) => {
      if (!isNaN(Number(key))) { // Check if the key is a number
        differences.push(user[key]);
        delete record[key];
      }
    });

    return { record, differences };
  }

  filterRemovedProperties(user: any): any {
    const cleanedUser: any = { ...user };

    // Remove properties with keys like "0", "1", etc.
    Object.keys(cleanedUser).forEach(key => {
      if (!isNaN(Number(key))) {
        delete cleanedUser[key];
      }
    });

    return cleanedUser;
  }

  applyChangesAndSave(changes: any) {
    // if (!this.originalData) {
    //   return Promise.reject('Original data not available');
    // }

    const originalUser = this.uiRuleForm.value;
    let originalUserObj = {
      originalUser
    }
    let changesObj = {
      changes
    }
    // Remove diff changes from the changes object
    const cleanedChanges = this.removeDiffChanges(changesObj);

    const patchOperations = this.generatePatchOperations(originalUserObj, cleanedChanges);

    // if (patchOperations.length === 0) {
    //   // No differences found, nothing to update
    //   return Promise.resolve();
    // }
    const updatedUser = jsonpatch.applyPatch(originalUser, patchOperations).newDocument;
  }
  private removeDiffChanges(changes: any): any {
    // Check if the changes object is defined and has properties
    if (!changes || typeof changes !== 'object' || Object.keys(changes).length === 0) {
      return {};
    }

    const cleanedChanges: any = JSON.parse(JSON.stringify(changes));

    // Remove properties with keys like "0", "1", etc.
    Object.keys(cleanedChanges).forEach(key => {
      if (!isNaN(Number(key))) {
        delete cleanedChanges[key];
      }
    });

    return cleanedChanges;
  }
  private generatePatchOperations(originalUser: any, changes: any): Operation[] {
    const patchOperations: Operation[] = [];

    const compareObjects = (obj1: any, obj2: any, path: string = ''): Operation[] => {
      const differences: Operation[] = [];
      if (obj1 && obj2) {
        Object.keys(obj1).forEach((key) => {
          const currentPath = `${path}/${key}`;

          if (!obj2.hasOwnProperty(key)) {
            // Add remove operation for properties not present in obj2
            differences.push({ op: 'remove', path: currentPath });
          } else {
            const value1 = obj1[key];
            const value2 = obj2[key];

            if (typeof value1 === 'object' && typeof value2 === 'object') {
              // Recursively compare nested objects
              differences.push(...compareObjects(value1, value2, currentPath));
            } else if (value1 !== value2) {
              // Add replace operation for primitive values
              differences.push({ op: 'replace', path: currentPath, value: value2 });
            }
          }
        });
        Object.keys(obj2).forEach((key) => {
          const currentPath = `${path}/${key}`;
          if (!obj1.hasOwnProperty(key)) {
            differences.push({ op: 'add', path: currentPath, value: obj2[key] });
          }
        });
      }
      return differences; // Add this return statement
    };


    // Compare the entire uiData array
    const uiDataDifferences = compareObjects(originalUser.uiData, changes.uiData, '/uiData');
    patchOperations.push(...uiDataDifferences);

    return patchOperations;
  }
  findObjectByKey(data: any, key: any) {
    if (data) {
      if (data.key && key) {
        if (data.key === key) {
          return data;
        }
        if (data.children && data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByKey(child, key);
            if (result !== null) {
              return result;
            }
          }
        }
      }
    }
    return null;
  }
  applyDiff() {
    debugger

    setTimeout(() => {
      const appDiv: any = document.getElementById('app');
      const jsondiffpatch = require('jsondiffpatch');
      let delta = jsondiffpatch.create().diff(this.invoice1, this.invoice2);
      appDiv.innerHTML = jsondiffpatch.formatters.html.format(delta, this.invoice1);
      jsondiffpatch.formatters.html.hideUnchanged();
      console.log(delta);

    }, 1000);
  }
}
