import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreeNode } from 'src/app/models/treeNode';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  visible = false;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() drawerData: any;
  @Input() showModal = true;
  bgColor: any;
  borderColor: any;
  hoverTextColor: any;
  nodes: any = [];
  loader: boolean = false
  screenId: any;
  requestSubscription: Subscription;
  res: any = {};
  showChild: boolean = true;
  constructor(private applicationService: ApplicationService) {
    this.processData = this.processData.bind(this);
  }

  ngOnInit(): void {
    if (this.drawerData?.eventActionconfig) {
      this.showChild = false;
      this.loader = true
    } else {
      this.showChild = true;
    }

  }

  open(event: MouseEvent,): void {
    if (this.drawerData?.link) {
      event.stopPropagation();
      this.loader = true;
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', this.drawerData?.link).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.screenId = res.data[0].screenBuilderId;
              this.nodes.push(res);
            }
          }
          this.loader = false;
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.loader = false;
        }
      });
    }
    this.drawerData['visible'] = true;
  }

  close(): void {
    this.drawerData['visible'] = false;
  }
  jsonParseWithObject(data: any) {
    return JSON.parse(
      data, (key, value) => {
        if (typeof value === 'string' && value.startsWith('(') && value.includes('(model)')) {
          return eval(`(${value})`);
        }
        return value;
      });
  }
  jsonStringifyWithObject(data: any) {
    return JSON.stringify(data, function (key, value) {
      if (typeof value == 'function') {
        return value.toString();
      } else {
        return value;
      }
    }) || '{}'
  }
  processData(data: any[]) {
    debugger
    if (data.length > 0) {
      this.showChild = true;
      this.res = {};
      this.res['data'] = [];
      this.res.data = data;
      this.checkDynamicSection();
    } 
    else {
      if (this.drawerData.children[0].type == 'timeline') {
        this.drawerData.children[0].hideExpression = true;
      }
      this.showChild = true;
      this.res = {};
      this.res['data'] = [];
    }
    this.loader = false
    return data
  }

  makeDynamicSections(api: any, selectedNode: any) {

    let checkFirstTime = true;
    let tabsAndStepper: any = [];
    for (let index = 0; index < this.res.data.length; index++) {
      const item = this.res.data[index];
      let newNode: any = {};
      if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'div' || selectedNode.type == 'listWithComponentsChild' || selectedNode.type == 'cardWithComponents' || selectedNode.type === 'timelineChild') {
        newNode = JSON.parse(JSON.stringify(selectedNode?.children));
      }
      else {
        newNode = JSON.parse(JSON.stringify(selectedNode?.children?.[1]?.children?.[0]));
      }
      if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'div' || selectedNode.type === 'timelineChild' || selectedNode.type == 'listWithComponentsChild' || selectedNode.type == 'cardWithComponents') {
        if (selectedNode.tableBody) {
          selectedNode.tableBody.forEach((element: any) => {
            if (newNode.length) {
              newNode.forEach((j: any) => {
                const keyObj = this.findObjectByKey(j, element.fileHeader);
                if (keyObj && element.defaultValue) {
                  const updatedObj = this.dataReplace(keyObj, item, element);
                  j = this.replaceObjectByKey(j, keyObj.key, updatedObj);
                  if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'listWithComponentsChild') {
                    j['mapping'] = true;
                  }
                }
              });
            }
          });
        }
      }
      else if (selectedNode.type != 'tabs' && selectedNode.type != 'step' && selectedNode.type != 'div' && selectedNode.type != 'listWithComponentsChild' && selectedNode.type != 'listWithComponentsChild' && selectedNode.type != 'cardWithComponents') {
        if (selectedNode.tableBody) {
          selectedNode.tableBody.forEach((element: any) => {
            const keyObj = this.findObjectByKey(newNode, element.fileHeader);
            if (keyObj && element.defaultValue) {
              const updatedObj = this.dataReplace(keyObj, item, element);
              newNode = this.replaceObjectByKey(newNode, keyObj.key, updatedObj);
            }
          });
        }
      }
      if (checkFirstTime) {
        if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'div' || selectedNode.type == 'listWithComponentsChild' || selectedNode.type == 'cardWithComponents' || selectedNode.type == 'timelineChild') {
          selectedNode.children = newNode;
        }
        else if (selectedNode.children[1]) {
          selectedNode.children[1].children = [];
          selectedNode?.children[1]?.children?.push(newNode);
        }
        selectedNode = JSON.parse(JSON.stringify(selectedNode))
        // this.updateNodes();
        checkFirstTime = false
      }
      else {
        if (selectedNode.type == 'tabs' || selectedNode.type == 'step' || selectedNode.type == 'listWithComponentsChild') {
          if (newNode.length) {
            newNode.forEach((k: any) => {
              if (k.mapping) {
                tabsAndStepper.push(k);
              }
            });
          }
          if (index == this.res.data.length - 1) {
            if (tabsAndStepper.length) {
              tabsAndStepper.forEach((j: any) => {
                selectedNode?.children?.push(j);
              });
            }
            let unMapped = selectedNode?.children.filter((child: any) => child.mapping == undefined);
            let mapped = selectedNode?.children.filter((child: any) => child.mapping);
            selectedNode.children = mapped;
            if (unMapped.length) {
              unMapped.forEach((element: any) => {
                selectedNode.children.push(element);
              });
            }
            selectedNode.children.forEach((k: any) => {
              delete k.mapping
            });
          }
        }
        else if (selectedNode.type == 'div' || selectedNode.type == 'timelineChild' || selectedNode.type == 'cardWithComponents') {
          let newSelected = JSON.parse(JSON.stringify(selectedNode));
          newSelected.children = newNode;
          let data = JSON.parse(JSON.stringify(newSelected));
          tabsAndStepper.push(data);
          if (index == this.res.data.length - 1) {
            let checkPushOrNot = true
            if ((selectedNode.type == 'div' || selectedNode.type == 'cardWithComponents' || selectedNode.type == 'timelineChild') && checkPushOrNot) {
              if (tabsAndStepper) {
                this.pushObjectsById(this.drawerData, tabsAndStepper, selectedNode.id);
                checkPushOrNot = false;
              }
            }
          }
        }
        else if (selectedNode.children[1]) {
          selectedNode?.children[1]?.children?.push(newNode);
        }
      }
    }
    selectedNode = JSON.parse(JSON.stringify(selectedNode))
  }
  pushObjectsById(targetObject: any, sourceArray: any[], idToMatch: string): void {
    // Variable to keep track of the parent object
    let parent: any = null;

    // Function to recursively search and update the object
    function pushObjects(obj: any, sourceArray: any[], id: string): boolean {
      if (obj.id === id) {
        // Check if the current item's id matches the id to match
        if (parent) {
          const index = parent.children.indexOf(obj);

          // Check if the item was found in the parent's children
          if (index !== -1) {
            // Splice the source array into the parent's children at the next index
            sourceArray.forEach(element => {
              parent.children.push(element);
            });
            return true; // Operation is complete
          }
        }
      }

      // If the current item has children, recursively search within them
      if (obj.children && obj.children.length > 0) {
        // Update the parent to the current object before traversing children
        parent = obj;
        for (const child of obj.children) {
          if (pushObjects(child, sourceArray, id)) {
            return true; // Operation is complete
          }
        }
        // Restore the parent to its previous value after traversing children
        parent = obj;
      }

      return false; // Item not found, operation incomplete
    }

    // Call the recursive function with the top-level object
    pushObjects(targetObject, sourceArray, idToMatch);
  }


  updateNodes() {
    this.drawerData = JSON.parse(JSON.stringify(this.drawerData));
  }
  dataReplace(node: any, replaceData: any, value: any): any {
    let typeMap: any = {
      cardWithComponents: 'title',
      buttonGroup: 'title',
      button: 'title',
      breakTag: 'title',
      switch: 'title',
      imageUpload: 'source',
      heading: 'text',
      paragraph: 'text',
      alert: 'text',
      progressBar: 'percent',
      video: 'videoSrc',
      audio: 'audioSrc',
      carouselCrossfade: 'carousalConfig',
      tabs: 'title',
      mainTab: 'title',
      mainStep: 'title',
      listWithComponents: 'title',
      listWithComponentsChild: 'title',
      step: 'title',
      kanban: 'title',
      simplecard: 'title',
      div: 'title',
      textEditor: 'title',
      multiFileUpload: 'uploadBtnLabel',
      accordionButton: 'title',
      divider: 'dividerText',
      toastr: 'toasterTitle',
      rate: 'icon',
      editor_js: 'title',
      rangeSlider: 'title',
      affix: 'title',
      statistic: 'title',
      anchor: 'title',
      modal: 'btnLabel',
      popConfirm: 'btnLabel',
      avatar: 'src',
      badge: 'nzText',
      comment: 'avatar',
      description: 'btnText',
      descriptionChild: 'content',
      segmented: 'title',
      result: 'resultTitle',
      tree: 'title',
      transfer: 'title',
      spin: 'loaderText',
      cascader: 'title',
      drawer: 'btnText',
      skeleton: 'title',
      empty: 'text',
      list: 'title',
      treeView: 'title',
      message: 'content',
      mentions: 'title',
      icon: 'title'
    };

    const type = node.type;
    const key = typeMap[type];
    if (node.type == 'avatar') {
      if (Array.isArray(replaceData[value.defaultValue])) {
        let nodesArray: any = [];
        replaceData[value.defaultValue].forEach((i: any) => {
          let newNode = JSON.parse(JSON.stringify(node));
          newNode.src = i;
          nodesArray.push(newNode);
        });
        return nodesArray;
      }
    }
    else if (node.type == "tag") {
      if (Array.isArray(replaceData[value.defaultValue])) {
        node.options = replaceData[value.defaultValue];
        return node;
      }
    }
    else {
      if (key) {
        node[key] = replaceData[value.defaultValue];
      }
      return node;
    }
  }
  replaceObjectByKey(data: any, key: any, updatedObj: any) {
    if (data.key === key) {
      return updatedObj;
    }
    for (let i = 0; i < data.children.length; i++) {
      const child = data.children[i];
      if (child.key === key) {
        if (Array.isArray(updatedObj) && child.type == 'avatar') {
          let check = data.children.filter((a: any) => a.type == "avatar");
          if (check.length != 1) {
            // let getFirstAvatar = JSON.parse(JSON.stringify(check[0]));
            let deleteAvatar = check.length - 1;
            for (let index = 0; index < deleteAvatar; index++) {
              const element = data.children.filter((a: any) => a.type == "avatar");;
              const idx = data.children.indexOf(element[0]);
              data.children.splice(idx as number, 1);
            }
            let lastAvatarIndex = data.children.filter((a: any) => a.type == "avatar");
            let idx = data.children.indexOf(lastAvatarIndex[0]);
            data.children.splice(idx, 1);
            updatedObj.forEach((i: any) => {
              data.children.splice(idx + 1, 0, i);
              idx = idx + 1;
            });
          }
          else {
            let lastAvatarIndex = data.children.filter((a: any) => a.type == "avatar");
            let idx = data.children.indexOf(lastAvatarIndex[0]);
            data.children.splice(idx, 1);
            updatedObj.forEach((i: any) => {
              data.children.splice(idx + 1, 0, i);
              idx = idx + 1;
            });
          }
        }
        else {
          data.children[i] = updatedObj;
        }
        return data;
      }
      const result = this.replaceObjectByKey(child, key, updatedObj);
      if (result !== null) {
        return data;
      }
    }
    return null;
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
  checkDynamicSection() {
    if (this.drawerData && this.drawerData.children && this.drawerData.children.length > 0) {
      if (this.drawerData.children[0].type == 'timeline') {
        this.drawerData.children[0].hideExpression =  false;
        const firstChild = this.drawerData.children[0].children[0];
        this.drawerData.children[0].children = [firstChild];
      }
      else {
        const firstChild = this.drawerData.children[0];
        this.drawerData.children[0] = [firstChild];
      }
      this.recursiveCheck(this.drawerData.children);
    }
  }



  recursiveCheck(data: any): void {
    if (Array.isArray(data)) {
      data.forEach((element: any) => {
        this.recursiveCheck(element);
      });
    }
    else if (typeof data === 'object' && data !== null) {
      if (data.type) {
        if (data.type === 'sections' || data.type === 'div' || data.type === 'cardWithComponents' || data.type === 'timelineChild') {
          if (data.mapApi) {
            this.makeDynamicSections(data.mapApi, data);
          }
        } else if (data.type === 'listWithComponents' || data.type === 'mainTab' || data.type === 'mainStep') {
          if (data.children) {
            data.children.forEach((item: any) => {
              if (item.mapApi) {
                this.makeDynamicSections(item.mapApi, item);
              }
            });
          }
        }
      }
      if (data.children) {
        this.recursiveCheck(data.children);
      }
    }
  }
}
