import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodesList, clusters, linksList, CustomNode } from './data';
import { Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Guid } from 'src/app/models/guid';
import { DataSharedService } from 'src/app/services/data-shared.service';
;

@Component({
  selector: 'app-ngx-graph-node',
  templateUrl: './ngx-graph-node.component.html',
  styleUrls: ['./ngx-graph-node.component.scss']
})
export class NgxGraphNodeComponent implements OnInit {
  name = 'NGX-Graph Demo';
  checked = true;
  isVisible = false;
  addNodeModal = false;
  nodes: CustomNode[] = [];
  clusters: any = clusters;
  links: Edge[] = [];

  layout: any = 'dagreCluster';
  isCopy: boolean = true;
  layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre',
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true,
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true,
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected',
    },
  ];

  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false;

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  selectedNode: any = null;
  droppedNode: any | null = null;
  isLabel: any = null;
  copiedData: any;
  labelName: any;
  linkName: any;
  color: any;
  linkColor: any;
  addChild = false;
  constructor(public layoutService: DataSharedService) { }

  ngOnInit() {
    this.draggingEnabled = true;
    this.panningEnabled = true;
    this.zoomEnabled = true;
    this.layoutService.nodeData = this.jsonData.Root;
    this.func(this.layoutService.nodeData);
  }

  setInterpolationType(curveType: any) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  setLayout(layoutName: any): void {
    const layout = this.layouts.find(l => l.value === layoutName);
    this.layout = layoutName;
    if (!layout.isClustered) {
      this.clusters = undefined;
    } else {
      this.clusters = clusters;
    }
  }

  onSubmit() {
    console.log(this.jsonData);
  }

  changeColor(): void {
    if (this.selectedNode) {
      // this.selectedNode.color = 'new-color';
    }
  }

  openModalForLabel(dataModal: any, selectedNode: CustomNode | null, type: string) {
    if (selectedNode) {
      this.selectedNode = selectedNode;
      this.labelName = null;
      this.linkName = null;
      this.color = null;
      if (type == "color") {
        this.isLabel = "color";
      } else if (type == "linkColor") {
        this.isLabel = "linkColor";
      } else if (type == "label") {
        this.isLabel = "label";
      } else if (type == "linkName") {
        this.isLabel = "linkName";
      }
      this.isVisible = true;
    }
  }

  openModalForAddNewNode(dataModal: any, selectedNode: CustomNode | null) {
    if (selectedNode) {
      this.selectedNode = selectedNode;
      this.labelName = null;
      this.linkName = null;
      this.color = null;
      this.linkColor = null;
      this.addNodeModal = true;
      // this.modalService.open(dataModal, { size: "lg", centered: true, windowClass: 'modal-holder' });
    }
  }

  changeLabel(): void {
    if (this.selectedNode) {
      this.nodes = [];
      this.links = [];
      let objJsonData: any;
      if (this.isLabel == 'label' || this.isLabel == 'linkName') {
        objJsonData = this.funcDelete(this.layoutService.nodeData, this.selectedNode.id, null, this.labelName, this.isLabel);
      } else if (this.isLabel == 'color' || this.isLabel == 'linkColor') {
        objJsonData = this.funcDelete(this.layoutService.nodeData, this.selectedNode.id, null, this.color, this.isLabel);
      }
      this.layoutService.nodeData = objJsonData;
      this.func(this.layoutService.nodeData);
      this.labelName = null;
      this.nodes = [...this.nodes];
      this.links = [...this.links];
      this.isVisible = false;
    }
  }

  onClickNodeToggle(selectedNode: any): void {
    this.nodes = [];
    this.links = [];
    const objJsonData = this.funcDelete(this.layoutService.nodeData, selectedNode.id, null, null, 'collapse');
    this.layoutService.nodeData = objJsonData;
    this.func(this.layoutService.nodeData);
    this.nodes = [...this.nodes];
    this.links = [...this.links];
  }

  copyData(selectedNode: any, type: string) {
    if (selectedNode) {
      this.nodes = [];
      this.links = [];
      const objJsonData = this.funcDelete(this.layoutService.nodeData, selectedNode.id, null, this.labelName, type);
      if (type == "paste") {
        this.copiedData = undefined;
      }
      this.layoutService.nodeData = objJsonData;
      this.func(this.layoutService.nodeData);
      this.labelName = "";
      this.nodes = [...this.nodes];
      this.links = [...this.links];
      this.isVisible = false;
    }
  }

  selectedNodeValue(node: any) {
    this.selectedNode = node;
    this.copiedData = node;
  }

  onNodeDragged(event: CdkDragDrop<any[]>): void {
    this.droppedNode = event;
    this.copiedData = event;
  }

  onNodeDrop(event: CdkDragDrop<any[]>): void {
    debugger
    if (this.selectedNode?.id != this.droppedNode.id)
      if (this.selectedNode && this.copiedData && this.droppedNode) {
        this.nodes = [];
        this.links = [];
        const objJsonData = this.funcDelete(this.layoutService.nodeData, this.droppedNode.id, null, this.labelName, 'cut');
        this.layoutService.nodeData = objJsonData;
        const objJsonDataPaste = this.funcDelete(this.layoutService.nodeData, this.selectedNode.id, null, this.labelName, 'paste');
        this.layoutService.nodeData = objJsonDataPaste;

        this.copiedData = undefined;
        this.func(this.layoutService.nodeData);
        this.labelName = "";
        this.nodes = [...this.nodes];
        this.links = [...this.links];
        this.isVisible = false;
      }
  }

  funcDelete(data: any, selectedNodeId: string, parentId: string | null = null, value: string | null = null, moveType: string | null = null): any {
    const updatedData = { ...data };
    if (moveType == 'paste' && this.copiedData.isCut) {
      if (this.copiedData.id == updatedData.id) {
        updatedData.children.splice(this.copiedData.index, 1);
      }
    }
    if (updatedData.id == selectedNodeId) {
      if (moveType == 'label' && value) {
        updatedData.extendedData.label = value
      } else if (moveType == 'linkName' && value) {
        updatedData.extendedData.linkName = value
      } else if (moveType == 'color' && value) {
        updatedData.extendedData.nodeColor = value
      } else if (moveType == 'linkColor' && value) {
        updatedData.extendedData.linkColor = value
      } else if (moveType == 'collapse') {
        if (updatedData.extendedData.isExpand) {
          updatedData.extendedData.isExpand = false;
        } else {
          updatedData.extendedData.isExpand = true;
        }
      } else if (moveType == 'copy') {
        this.copiedData = { id: updatedData.id, data: updatedData, isCut: false };
        this.isCopy = false;
      }
      else if (moveType == 'paste') {
        if (this.copiedData.data) {
          const data = this.funcUpdateJson(this.copiedData.data)
          updatedData.children.push(data);
          this.isCopy = true;
        }
      }
    }

    if (updatedData.children && updatedData.children.length > 0) {
      const updatedChildren = [];
      for (const child of updatedData.children) {
        if (child.id == selectedNodeId && (moveType == 'cut' || moveType == 'delete')) {
          const childIndex = updatedData.children.findIndex((a: any) => a.id == child.id);
          if (childIndex != -1) {
            if (moveType != 'delete') {
              this.copiedData = { id: updatedData.id, index: childIndex, data: updatedData.children[childIndex], isCut: true };
              this.isCopy = false;
              updatedChildren.push(this.funcDelete(child, selectedNodeId, updatedData.id, value, moveType));
            }
            if (moveType === 'delete') {
              updatedData.children.splice(childIndex, 1);
            }
          }
        } else {
          updatedChildren.push(this.funcDelete(child, selectedNodeId, updatedData.id, value, moveType));
        }
      }
      updatedData.children = updatedChildren;
    }

    return updatedData;
  }

  funcUpdateJson(data: any, parentId: string | null = null): any {
    const updatedData = { ...data };
    updatedData.id = "n_" + Guid.newGuid();
    updatedData.extendedData.label = "n_" + updatedData.extendedData.label;
    updatedData.extendedData.linkName = "n_" + updatedData.extendedData.linkName;

    if (updatedData.children && updatedData.children.length > 0) {
      const updatedChildren = [];
      for (const child of updatedData.children) {
        updatedChildren.push(this.funcUpdateJson(child, updatedData.id));
      }
      updatedData.children = updatedChildren;
    }

    return updatedData;
  }

  onAddNodeSelect(): void {
    this.nodes = [];
    this.links = [];
    const objJsonData = this.addNewNodeonSelected(this.layoutService.nodeData, this.selectedNode.id);
    this.layoutService.nodeData = objJsonData;
    this.func(this.layoutService.nodeData);
    this.isVisible = false;
    this.labelName = null;
    this.linkName = null;
    this.color = null;
    this.nodes = [...this.nodes];
    this.links = [...this.links];
    this.addNodeModal = false;
  }

  addNewNodeonSelected(data: any, selectedNodeId: string, parentId: string | null = null): any {
    const updatedData = { ...data };

    if (updatedData.id == selectedNodeId) {
      const objNode: any = {
        id: `${Guid.newGuid()}`,
        extendedData: {
          label: this.labelName ? this.labelName : "NewNode",
          nodeColor: this.color ? this.color : "#CDB30A",
          dimension: {
            width: data.extendedData.width ? data.extendedData.width : "",
            height: data.extendedData.height ? data.extendedData.height : ""
          },
          linkName: this.linkName ? this.linkName : "New Link",
          linkColor: this.linkColor ? this.linkColor : "",
          isExpand: false,
        },
        children: []
      };
      updatedData.children.push(objNode);
    }

    if (updatedData.children && updatedData.children.length > 0) {
      const updatedChildren = [];
      for (const child of updatedData.children) {
        // if(updatedData.id == selectedNodeId)
        updatedChildren.push(this.addNewNodeonSelected(child, selectedNodeId, updatedData.id));
      }
      updatedData.children = updatedChildren;
    }

    return updatedData;
  }

  func(data: any, parentId: string | null = null) {
    const objNode: any = {
      id: data.id,
      label: data.extendedData.label,
      color: data.extendedData.nodeColor,
      dimension: {
        width: data.extendedData.width,
        height: data.extendedData.height
      },
      isExpand: data.extendedData.isExpand
    };

    this.nodes.push(objNode);

    if (parentId) {
      const objLink: any = {
        id: "link_" + Guid.newGuid(),
        source: parentId,
        target: data.id,
        label: data.extendedData.linkName,
        color: data.extendedData.linkColor
      };
      this.links.push(objLink);
    }

    if (data.children && data.children.length > 0) {
      if (!data.extendedData.isExpand) {
        for (const child of data.children) {
          this.func(child, data.id);
        }
      }
    }
  }

  arrow = "fa-solid fa-square-arrow-left fa-lg";
  hideConfig() {
    if (this.arrow == "fa-solid fa-square-arrow-right fa-lg") {
      this.arrow = "fa-solid fa-square-arrow-left fa-lg";
    } else {
      this.arrow = "fa-solid fa-square-arrow-right fa-lg";
    }
  }

  fullPage = "fa-sharp fa-solid fa-expand-wide"
  fullPageView() {
    // this.layoutService.isLeftNavMenu = false;
    // this.layoutService.adjustComponents();
    // if (this.fullPage == "fa-sharp fa-regular fa-compress-wide") {
    //   this.fullPage = "fa-sharp fa-solid fa-expand-wide";
    //   document.body.setAttribute('data-sidebar-size', 'sm');
    //   this.layoutService.leftSidebarShow = true;
    //   this.arrow = "fa-solid fa-square-arrow-left fa-lg";
    // } else {
    //   this.layoutService.isLeftNavMenu = false;
    //   this.layoutService.adjustComponents();
    //   this.fullPage = "fa-sharp fa-regular fa-compress-wide";
    //   document.body.setAttribute('data-sidebar-size', 'zero');
    //   this.layoutService.leftSidebarShow = false;
    //   this.arrow = "fa-solid fa-square-arrow-right fa-lg";

    // }
  }

  private draggedLink: any = null;
  startLinkDrag(event: MouseEvent, link: any) {
    this.draggedLink = link;
    // Add mousemove and mouseup listeners to the document
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent) => {
    if (this.draggedLink) {
      // Update the position of the dragged link based on mouse movement
      // You'll need to calculate new link coordinates or SVG path here
      this.draggedLink.x = event.clientX;
      this.draggedLink.y = event.clientY;
    }
  }

  onMouseUp = () => {
    // Remove mousemove and mouseup listeners
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    // Reset the draggedLink variable
    this.draggedLink = null;
  }

  jsonData: any = {
    "Root": {
      "nodeType": 0,
      "id": "08dbbf29-a001-73a8-0009-0ffecc820000",
      "extendedData": {
        "label": "Main",
        "nodeColor": "#CDB30A",
        "width": "",
        "height": "",
        "linkName": "Main Link",
        "linkColor": "black",
        "isExpand": false
      },
      "templateId": "577a0000-d144-b00c-6cc2-08dba1450d41",
      "correlationId": "00000000-0000-0000-0000-000000000000",
      "hasDependencies": false,
      "hasChildren": true,
      "depth": 0,
      "children": [
        {
          "nodeType": 1,
          "id": "cc820000-0ffe-0009-c78f-08dbbf29a001",
          "extendedData": {
            "label": "M to C1",
            "nodeColor": "#CDB30A",
            "linkColor": "blue",
            "width": "",
            "height": "",
            "linkName": "M Link",
            "isExpand": false
          },
          "templateId": "577a0000-d144-b00c-6bb4-08db30cab663",
          "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
          "hasDependencies": true,
          "hasChildren": true,
          "depth": 0,
          "children": [
            {
              "nodeType": 2,
              "id": "cc820000-0ffe-0009-9e16-08dbbf29a003",
              "extendedData": {
                "label": "M_C1 to C1",
                "nodeColor": "#CDB30A",
                "linkColor": "black",
                "width": "",
                "height": "",
                "linkName": "M_C1 Link",
                "isExpand": false
              },
              "templateId": "577a0000-d144-b00c-30a4-08db2ff9d533",
              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
              "hasDependencies": true,
              "hasChildren": true,
              "depth": 0,
              "children": [
                {
                  "nodeType": 2,
                  "id": "cc820000-0ffe-0009-9e37-08dbbf29a003",
                  "extendedData": {
                    "label": "M_C1_C1 to C1",
                    "nodeColor": "#CDB30A",
                    "linkColor": "black",
                    "width": "",
                    "height": "",
                    "linkName": "M_C1_C1 Link",
                    "isExpand": false
                  },
                  "templateId": "577a0000-d144-b00c-cb29-08db689c7490",
                  "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                  "hasDependencies": true,
                  "hasChildren": true,
                  "depth": 0,
                  "children": [
                    {
                      "nodeType": 2,
                      "id": "cc820000-0ffe-0009-9e61-08dbbf29a003",
                      "extendedData": {
                        "label": "M_C1_C1_C1 to C1",
                        "nodeColor": "#CDB30A",
                        "linkColor": "black",
                        "width": "",
                        "height": "",
                        "linkName": "M_C1_C1_C1 Link",
                        "isExpand": false
                      },
                      "templateId": "577a0000-d144-b00c-12de-08db2ff9d533",
                      "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                      "hasDependencies": true,
                      "hasChildren": true,
                      "depth": 0,
                      "children": [
                        {
                          "nodeType": 2,
                          "id": "cc820000-0ffe-0009-9e69-08dbbf29a003",
                          "extendedData": {
                            "label": "M_C1_C1_C1_C1 to C1",
                            "nodeColor": "#CDB30A",
                            "linkColor": "black",
                            "width": "",
                            "height": "",
                            "linkName": "M_C1_C1_C1_C1 Link",
                            "isExpand": false
                          },
                          "templateId": "577a0000-d144-b00c-2132-08db2ff9d533",
                          "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                          "hasDependencies": true,
                          "hasChildren": true,
                          "depth": 0,
                          "children": [
                            {
                              "nodeType": 2,
                              "id": "cc820000-0ffe-0009-9e70-08dbbf29a003",
                              "extendedData": {
                                "label": "M_C1_C1_C1_C1_C1 to C1",
                                "nodeColor": "#CDB30A",
                                "linkColor": "black",
                                "width": "",
                                "height": "",
                                "linkName": "M_C1_C1_C1_C1_C1 Link",
                                "isExpand": false
                              },
                              "templateId": "577a0000-d144-b00c-0aa2-08db2ff9d532",
                              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                              "hasDependencies": true,
                              "hasChildren": true,
                              "depth": 0,
                              "children": [
                                {
                                  "nodeType": 2,
                                  "id": "cc820000-0ffe-0009-9e74-08dbbf29a003",
                                  "extendedData": {
                                    "label": "M_C1_C1_C1_C1_C1_C1 to C1",
                                    "nodeColor": "#CDB30A",
                                    "linkColor": "black",
                                    "width": "",
                                    "height": "",
                                    "linkName": "M_C1_C1_C1_C1_C1_C1 Link",
                                    "isExpand": false
                                  },
                                  "templateId": "577a0000-d144-b00c-da0b-08db690c0523",
                                  "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                                  "hasDependencies": true,
                                  "hasChildren": false,
                                  "depth": 0,
                                  "children": [],
                                  "numberOfPerson": 0,
                                  "consentKey": 0,
                                  "hasFloat": false,
                                  "entity": null,
                                  "dependencies": [
                                    "cc820000-0ffe-0009-9e70-08dbbf29a003"
                                  ],
                                  "isRootNode": false,
                                  "entityType": null,
                                  "entityData": null,
                                  "linkInId": null,
                                  "linkOutId": null,
                                  "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                                  "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                                  "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                                  "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                                  "autorun": false,
                                  "earlyStart": "0001-01-01T00:00:00",
                                  "earlyFinish": "0001-01-01T00:00:00",
                                  "lateStart": "0001-01-01T00:00:00",
                                  "lateFinish": "0001-01-01T00:00:00",
                                  "duration": "14.00:00:00",
                                  "earlyStartDuration": "19.22:30:00",
                                  "earlyFinishDuration": "61.22:30:00",
                                  "lateStartDuration": "64.14:45:00",
                                  "lateFinishDuration": "78.14:45:00",
                                  "float": "00:00:00",
                                  "durationFloat": "44.16:15:00",
                                  "earlyStartDurationOffset": null,
                                  "quartzEarlyTimeRemainder": null,
                                  "cronExpression": null,
                                  "isUserControlledScheduling": false
                                }
                              ],
                              "numberOfPerson": 0,
                              "consentKey": 0,
                              "hasFloat": false,
                              "entity": null,
                              "dependencies": [
                                "cc820000-0ffe-0009-9e69-08dbbf29a003"
                              ],
                              "isRootNode": false,
                              "entityType": null,
                              "entityData": null,
                              "linkInId": null,
                              "linkOutId": null,
                              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                              "autorun": true,
                              "earlyStart": "0001-01-01T00:00:00",
                              "earlyFinish": "0001-01-01T00:00:00",
                              "lateStart": "0001-01-01T00:00:00",
                              "lateFinish": "0001-01-01T00:00:00",
                              "duration": "15:00:00",
                              "earlyStartDuration": "18.01:30:00",
                              "earlyFinishDuration": "19.22:30:00",
                              "lateStartDuration": "63.23:45:00",
                              "lateFinishDuration": "64.14:45:00",
                              "float": "00:00:00",
                              "durationFloat": "45.22:15:00",
                              "earlyStartDurationOffset": null,
                              "quartzEarlyTimeRemainder": null,
                              "cronExpression": null,
                              "isUserControlledScheduling": false
                            }
                          ],
                          "numberOfPerson": 0,
                          "consentKey": 0,
                          "hasFloat": false,
                          "entity": null,
                          "dependencies": [
                            "cc820000-0ffe-0009-9e61-08dbbf29a003"
                          ],
                          "isRootNode": false,
                          "entityType": null,
                          "entityData": null,
                          "linkInId": null,
                          "linkOutId": null,
                          "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                          "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                          "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                          "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                          "autorun": false,
                          "earlyStart": "0001-01-01T00:00:00",
                          "earlyFinish": "0001-01-01T00:00:00",
                          "lateStart": "0001-01-01T00:00:00",
                          "lateFinish": "0001-01-01T00:00:00",
                          "duration": "00:10:00",
                          "earlyStartDuration": "18.01:00:00",
                          "earlyFinishDuration": "18.01:30:00",
                          "lateStartDuration": "63.23:35:00",
                          "lateFinishDuration": "63.23:45:00",
                          "float": "00:00:00",
                          "durationFloat": "45.22:35:00",
                          "earlyStartDurationOffset": null,
                          "quartzEarlyTimeRemainder": null,
                          "cronExpression": null,
                          "isUserControlledScheduling": false
                        }
                      ],
                      "numberOfPerson": 0,
                      "consentKey": 0,
                      "hasFloat": false,
                      "entity": null,
                      "dependencies": [
                        "cc820000-0ffe-0009-9e37-08dbbf29a003"
                      ],
                      "isRootNode": false,
                      "entityType": null,
                      "entityData": null,
                      "linkInId": null,
                      "linkOutId": null,
                      "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                      "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                      "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                      "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                      "autorun": true,
                      "earlyStart": "0001-01-01T00:00:00",
                      "earlyFinish": "0001-01-01T00:00:00",
                      "lateStart": "0001-01-01T00:00:00",
                      "lateFinish": "0001-01-01T00:00:00",
                      "duration": "1.00:00:00",
                      "earlyStartDuration": "15.01:00:00",
                      "earlyFinishDuration": "18.01:00:00",
                      "lateStartDuration": "62.23:35:00",
                      "lateFinishDuration": "63.23:35:00",
                      "float": "00:00:00",
                      "durationFloat": "47.22:35:00",
                      "earlyStartDurationOffset": null,
                      "quartzEarlyTimeRemainder": null,
                      "cronExpression": null,
                      "isUserControlledScheduling": false
                    }
                  ],
                  "numberOfPerson": 0,
                  "consentKey": 0,
                  "hasFloat": false,
                  "entity": null,
                  "dependencies": [
                    "cc820000-0ffe-0009-9e16-08dbbf29a003"
                  ],
                  "isRootNode": false,
                  "entityType": null,
                  "entityData": null,
                  "linkInId": null,
                  "linkOutId": null,
                  "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                  "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                  "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                  "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                  "autorun": false,
                  "earlyStart": "0001-01-01T00:00:00",
                  "earlyFinish": "0001-01-01T00:00:00",
                  "lateStart": "0001-01-01T00:00:00",
                  "lateFinish": "0001-01-01T00:00:00",
                  "duration": "00:10:00",
                  "earlyStartDuration": "15.00:30:00",
                  "earlyFinishDuration": "15.01:00:00",
                  "lateStartDuration": "62.23:25:00",
                  "lateFinishDuration": "62.23:35:00",
                  "float": "00:00:00",
                  "durationFloat": "47.22:55:00",
                  "earlyStartDurationOffset": null,
                  "quartzEarlyTimeRemainder": null,
                  "cronExpression": null,
                  "isUserControlledScheduling": false
                }
              ],
              "numberOfPerson": 0,
              "consentKey": 0,
              "hasFloat": false,
              "entity": null,
              "dependencies": [
                "cc820000-0ffe-0009-c78f-08dbbf29a001"
              ],
              "isRootNode": false,
              "entityType": null,
              "entityData": null,
              "linkInId": null,
              "linkOutId": null,
              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
              "autorun": false,
              "earlyStart": "0001-01-01T00:00:00",
              "earlyFinish": "0001-01-01T00:00:00",
              "lateStart": "0001-01-01T00:00:00",
              "lateFinish": "0001-01-01T00:00:00",
              "duration": "5.00:00:00",
              "earlyStartDuration": "00:30:00",
              "earlyFinishDuration": "15.00:30:00",
              "lateStartDuration": "57.23:25:00",
              "lateFinishDuration": "62.23:25:00",
              "float": "00:00:00",
              "durationFloat": "57.22:55:00",
              "earlyStartDurationOffset": null,
              "quartzEarlyTimeRemainder": null,
              "cronExpression": null,
              "isUserControlledScheduling": false
            },
            {
              "nodeType": 1,
              "id": "cc820000-0ffe-0009-c7b4-08dbbf29a001",
              "extendedData": {
                "label": "M_C1 to C2",
                "nodeColor": "#CDB30A",
                "linkColor": "black",
                "width": "",
                "height": "",
                "linkName": "M_C1 Link",
                "isExpand": false
              },
              "templateId": "577a0000-d144-b00c-8865-08db30cab664",
              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
              "hasDependencies": true,
              "hasChildren": true,
              "depth": 0,
              "children": [
                {
                  "nodeType": 2,
                  "id": "cc820000-0ffe-0009-a487-08dbbf29a003",
                  "extendedData": {
                    "label": "M_C1_C2 to C1",
                    "nodeColor": "#CDB30A",
                    "linkColor": "black",
                    "width": "",
                    "height": "",
                    "linkName": "M_C1_C2 Link",
                    "isExpand": false
                  },
                  "templateId": "577a0000-d144-b00c-50d9-08db2ff9d533",
                  "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                  "hasDependencies": true,
                  "hasChildren": true,
                  "depth": 0,
                  "children": [
                    {
                      "nodeType": 2,
                      "id": "cc820000-0ffe-0009-a48c-08dbbf29a003",
                      "extendedData": {
                        "label": "M_C1_C2_C1 to C1",
                        "nodeColor": "#CDB30A",
                        "linkColor": "black",
                        "width": "",
                        "height": "",
                        "linkName": "M_C1_C2_C1 Link",
                        "isExpand": false
                      },
                      "templateId": "577a0000-d144-b00c-4212-08db2ff9d533",
                      "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                      "hasDependencies": true,
                      "hasChildren": false,
                      "depth": 0,
                      "children": [],
                      "numberOfPerson": 0,
                      "consentKey": 0,
                      "hasFloat": false,
                      "entity": null,
                      "dependencies": [
                        "cc820000-0ffe-0009-a487-08dbbf29a003"
                      ],
                      "isRootNode": false,
                      "entityType": null,
                      "entityData": null,
                      "linkInId": null,
                      "linkOutId": null,
                      "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                      "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                      "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                      "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                      "autorun": true,
                      "earlyStart": "0001-01-01T00:00:00",
                      "earlyFinish": "0001-01-01T00:00:00",
                      "lateStart": "0001-01-01T00:00:00",
                      "lateFinish": "0001-01-01T00:00:00",
                      "duration": "00:15:00",
                      "earlyStartDuration": "60.05:00:00",
                      "earlyFinishDuration": "60.05:45:00",
                      "lateStartDuration": "78.14:30:00",
                      "lateFinishDuration": "78.14:45:00",
                      "float": "00:00:00",
                      "durationFloat": "18.09:30:00",
                      "earlyStartDurationOffset": null,
                      "quartzEarlyTimeRemainder": null,
                      "cronExpression": null,
                      "isUserControlledScheduling": false
                    }
                  ],
                  "numberOfPerson": 0,
                  "consentKey": 0,
                  "hasFloat": false,
                  "entity": null,
                  "dependencies": [
                    "cc820000-0ffe-0009-c7b4-08dbbf29a001"
                  ],
                  "isRootNode": false,
                  "entityType": null,
                  "entityData": null,
                  "linkInId": null,
                  "linkOutId": null,
                  "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                  "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                  "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                  "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                  "autorun": true,
                  "earlyStart": "0001-01-01T00:00:00",
                  "earlyFinish": "0001-01-01T00:00:00",
                  "lateStart": "0001-01-01T00:00:00",
                  "lateFinish": "0001-01-01T00:00:00",
                  "duration": "00:10:00",
                  "earlyStartDuration": "60.04:30:00",
                  "earlyFinishDuration": "60.05:00:00",
                  "lateStartDuration": "78.14:20:00",
                  "lateFinishDuration": "78.14:30:00",
                  "float": "00:00:00",
                  "durationFloat": "18.09:50:00",
                  "earlyStartDurationOffset": null,
                  "quartzEarlyTimeRemainder": null,
                  "cronExpression": null,
                  "isUserControlledScheduling": false
                },
                {
                  "nodeType": 1,
                  "id": "cc820000-0ffe-0009-c7be-08dbbf29a001",
                  "extendedData": {
                    "label": "M_C1_C2 to C2",
                    "nodeColor": "#CDB30A",
                    "linkColor": "black",
                    "width": "",
                    "height": "",
                    "linkName": "M_C1_C2 Link",
                    "isExpand": false
                  },
                  "templateId": "577a0000-d144-b00c-3810-08db30cab664",
                  "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                  "hasDependencies": true,
                  "hasChildren": true,
                  "depth": 0,
                  "children": [
                    {
                      "nodeType": 2,
                      "id": "cc820000-0ffe-0009-a787-08dbbf29a003",
                      "extendedData": {
                        "label": "M_C1_C2_C2 to C1",
                        "nodeColor": "#CDB30A",
                        "linkColor": "black",
                        "width": "",
                        "height": "",
                        "linkName": "M_C1_C2_C2 Link",
                        "isExpand": false
                      },
                      "templateId": "577a0000-d144-b00c-fe90-08db2ff9d532",
                      "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                      "hasDependencies": true,
                      "hasChildren": true,
                      "depth": 0,
                      "children": [
                        {
                          "nodeType": 2,
                          "id": "cc820000-0ffe-0009-a78d-08dbbf29a003",
                          "extendedData": {
                            "label": "M_C1_C2_C2_C1 to C1",
                            "nodeColor": "#CDB30A",
                            "linkColor": "black",
                            "width": "",
                            "height": "",
                            "linkName": "M_C1_C2_C2_C1 Link",
                            "isExpand": false
                          },
                          "templateId": "577a0000-d144-b00c-5e25-08db2ff9d533",
                          "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                          "hasDependencies": true,
                          "hasChildren": true,
                          "depth": 0,
                          "children": [
                            {
                              "nodeType": 2,
                              "id": "cc820000-0ffe-0009-a793-08dbbf29a003",
                              "extendedData": {
                                "label": "M_C1_C2_C2_C1_C1 to C1",
                                "nodeColor": "#CDB30A",
                                "linkColor": "black",
                                "width": "",
                                "height": "",
                                "linkName": "M_C1_C2_C2_C1_C1 Link",
                                "isExpand": false
                              },
                              "templateId": "577a0000-d144-b00c-6b89-08db2ff9d533",
                              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                              "hasDependencies": true,
                              "hasChildren": false,
                              "depth": 0,
                              "children": [],
                              "numberOfPerson": 0,
                              "consentKey": 0,
                              "hasFloat": false,
                              "entity": null,
                              "dependencies": [
                                "cc820000-0ffe-0009-a78d-08dbbf29a003"
                              ],
                              "isRootNode": false,
                              "entityType": null,
                              "entityData": null,
                              "linkInId": null,
                              "linkOutId": null,
                              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                              "autorun": true,
                              "earlyStart": "0001-01-01T00:00:00",
                              "earlyFinish": "0001-01-01T00:00:00",
                              "lateStart": "0001-01-01T00:00:00",
                              "lateFinish": "0001-01-01T00:00:00",
                              "duration": "5.00:00:00",
                              "earlyStartDuration": "63.14:45:00",
                              "earlyFinishDuration": "78.14:45:00",
                              "lateStartDuration": "73.14:45:00",
                              "lateFinishDuration": "78.14:45:00",
                              "float": "00:00:00",
                              "durationFloat": "10.00:00:00",
                              "earlyStartDurationOffset": null,
                              "quartzEarlyTimeRemainder": null,
                              "cronExpression": null,
                              "isUserControlledScheduling": false
                            }
                          ],
                          "numberOfPerson": 0,
                          "consentKey": 0,
                          "hasFloat": false,
                          "entity": null,
                          "dependencies": [
                            "cc820000-0ffe-0009-a787-08dbbf29a003"
                          ],
                          "isRootNode": false,
                          "entityType": null,
                          "entityData": null,
                          "linkInId": null,
                          "linkOutId": null,
                          "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                          "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                          "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                          "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                          "autorun": true,
                          "earlyStart": "0001-01-01T00:00:00",
                          "earlyFinish": "0001-01-01T00:00:00",
                          "lateStart": "0001-01-01T00:00:00",
                          "lateFinish": "0001-01-01T00:00:00",
                          "duration": "1.00:00:00",
                          "earlyStartDuration": "60.14:45:00",
                          "earlyFinishDuration": "63.14:45:00",
                          "lateStartDuration": "72.14:45:00",
                          "lateFinishDuration": "73.14:45:00",
                          "float": "00:00:00",
                          "durationFloat": "12.00:00:00",
                          "earlyStartDurationOffset": null,
                          "quartzEarlyTimeRemainder": null,
                          "cronExpression": null,
                          "isUserControlledScheduling": false
                        }
                      ],
                      "numberOfPerson": 0,
                      "consentKey": 0,
                      "hasFloat": false,
                      "entity": null,
                      "dependencies": [
                        "cc820000-0ffe-0009-c7be-08dbbf29a001"
                      ],
                      "isRootNode": false,
                      "entityType": null,
                      "entityData": null,
                      "linkInId": null,
                      "linkOutId": null,
                      "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                      "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                      "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                      "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                      "autorun": true,
                      "earlyStart": "0001-01-01T00:00:00",
                      "earlyFinish": "0001-01-01T00:00:00",
                      "lateStart": "0001-01-01T00:00:00",
                      "lateFinish": "0001-01-01T00:00:00",
                      "duration": "03:00:00",
                      "earlyStartDuration": "60.05:45:00",
                      "earlyFinishDuration": "60.14:45:00",
                      "lateStartDuration": "72.11:45:00",
                      "lateFinishDuration": "72.14:45:00",
                      "float": "00:00:00",
                      "durationFloat": "12.06:00:00",
                      "earlyStartDurationOffset": null,
                      "quartzEarlyTimeRemainder": null,
                      "cronExpression": null,
                      "isUserControlledScheduling": false
                    }
                  ],
                  "numberOfPerson": 0,
                  "consentKey": 0,
                  "hasFloat": false,
                  "entity": null,
                  "dependencies": [
                    "cc820000-0ffe-0009-c7b4-08dbbf29a001"
                  ],
                  "isRootNode": false,
                  "entityType": null,
                  "entityData": null,
                  "linkInId": null,
                  "linkOutId": null,
                  "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                  "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                  "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                  "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                  "autorun": false,
                  "earlyStart": "0001-01-01T00:00:00",
                  "earlyFinish": "0001-01-01T00:00:00",
                  "lateStart": "0001-01-01T00:00:00",
                  "lateFinish": "0001-01-01T00:00:00",
                  "duration": "6.03:00:00",
                  "earlyStartDuration": "60.05:45:00",
                  "earlyFinishDuration": "78.14:45:00",
                  "lateStartDuration": "66.08:45:00",
                  "lateFinishDuration": "72.11:45:00",
                  "float": "00:00:00",
                  "durationFloat": "6.03:00:00",
                  "earlyStartDurationOffset": null,
                  "quartzEarlyTimeRemainder": null,
                  "cronExpression": null,
                  "isUserControlledScheduling": false
                }
              ],
              "numberOfPerson": 0,
              "consentKey": 0,
              "hasFloat": false,
              "entity": null,
              "dependencies": [
                "cc820000-0ffe-0009-c78f-08dbbf29a001"
              ],
              "isRootNode": false,
              "entityType": null,
              "entityData": null,
              "linkInId": null,
              "linkOutId": null,
              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
              "autorun": false,
              "earlyStart": "0001-01-01T00:00:00",
              "earlyFinish": "0001-01-01T00:00:00",
              "lateStart": "0001-01-01T00:00:00",
              "lateFinish": "0001-01-01T00:00:00",
              "duration": "00:25:00",
              "earlyStartDuration": "60.04:30:00",
              "earlyFinishDuration": "60.05:45:00",
              "lateStartDuration": "66.08:20:00",
              "lateFinishDuration": "66.08:45:00",
              "float": "00:00:00",
              "durationFloat": "6.03:50:00",
              "earlyStartDurationOffset": null,
              "quartzEarlyTimeRemainder": null,
              "cronExpression": null,
              "isUserControlledScheduling": false
            }
          ],
          "numberOfPerson": 0,
          "consentKey": 0,
          "hasFloat": false,
          "entity": null,
          "dependencies": [
            "08dbbf29-a001-73a8-0009-0ffecc820000"
          ],
          "isRootNode": false,
          "entityType": null,
          "entityData": null,
          "linkInId": null,
          "linkOutId": null,
          "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
          "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
          "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
          "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
          "autorun": false,
          "earlyStart": "0001-01-01T00:00:00",
          "earlyFinish": "0001-01-01T00:00:00",
          "lateStart": "0001-01-01T00:00:00",
          "lateFinish": "0001-01-01T00:00:00",
          "duration": "20.01:20:00",
          "earlyStartDuration": "00:30:00",
          "earlyFinishDuration": "60.04:30:00",
          "lateStartDuration": "46.07:00:00",
          "lateFinishDuration": "66.08:20:00",
          "float": "00:00:00",
          "durationFloat": "46.06:30:00",
          "earlyStartDurationOffset": null,
          "quartzEarlyTimeRemainder": null,
          "cronExpression": null,
          "isUserControlledScheduling": false
        },
        {
          "nodeType": 1,
          "id": "cc820000-0ffe-0009-c7c2-08dbbf29a001",
          "extendedData": {
            "label": "M to C2",
            "nodeColor": "#CDB30A",
            "linkColor": "black",
            "width": "",
            "height": "",
            "linkName": "M Link",
            "isExpand": false
          },
          "templateId": "577a0000-d144-b00c-6b89-08db2ff9d533",
          "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
          "hasDependencies": true,
          "hasChildren": true,
          "depth": 0,
          "children": [
            {
              "nodeType": 1,
              "id": "cc820000-0ffe-0009-b3f3-08dbbf29a001",
              "extendedData": {
                "label": "M_C2 to C1",
                "nodeColor": "#CDB30A",
                "linkColor": "black",
                "width": "",
                "height": "",
                "linkName": "M_C2 Link",
                "isExpand": false
              },
              "templateId": "577a0000-d144-b00c-c3ba-08db30cab664",
              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
              "hasDependencies": true,
              "hasChildren": true,
              "depth": 0,
              "children": [
                {
                  "nodeType": 2,
                  "id": "cc820000-0ffe-0009-fe67-08dbbf29a001",
                  "extendedData": {
                    "label": "M_C2_C1 to C1",
                    "nodeColor": "#CDB30A",
                    "linkColor": "black",
                    "width": "",
                    "height": "",
                    "linkName": "M_C2_C1 Link",
                    "isExpand": false
                  },
                  "templateId": "577a0000-d144-b00c-4978-08db69b4b502",
                  "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                  "hasDependencies": true,
                  "hasChildren": true,
                  "depth": 0,
                  "children": [
                    {
                      "nodeType": 2,
                      "id": "cc820000-0ffe-0009-0746-08dbbf29a002",
                      "extendedData": {
                        "label": "M_C2_C1_C1 to C1",
                        "nodeColor": "#CDB30A",
                        "linkColor": "black",
                        "width": "",
                        "height": "",
                        "linkName": "M_C2_C1_C1 Link",
                        "isExpand": false
                      },
                      "templateId": "577a0000-d144-b00c-27ee-08db3001b68a",
                      "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                      "hasDependencies": true,
                      "hasChildren": false,
                      "depth": 0,
                      "children": [],
                      "numberOfPerson": 0,
                      "consentKey": 0,
                      "hasFloat": false,
                      "entity": null,
                      "dependencies": [
                        "cc820000-0ffe-0009-fe67-08dbbf29a001"
                      ],
                      "isRootNode": false,
                      "entityType": null,
                      "entityData": null,
                      "linkInId": null,
                      "linkOutId": null,
                      "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                      "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                      "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                      "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                      "autorun": true,
                      "earlyStart": "0001-01-01T00:00:00",
                      "earlyFinish": "0001-01-01T00:00:00",
                      "lateStart": "0001-01-01T00:00:00",
                      "lateFinish": "0001-01-01T00:00:00",
                      "duration": "10.00:00:00",
                      "earlyStartDuration": "3.18:30:00",
                      "earlyFinishDuration": "33.18:30:00",
                      "lateStartDuration": "68.14:45:00",
                      "lateFinishDuration": "78.14:45:00",
                      "float": "00:00:00",
                      "durationFloat": "64.20:15:00",
                      "earlyStartDurationOffset": null,
                      "quartzEarlyTimeRemainder": null,
                      "cronExpression": null,
                      "isUserControlledScheduling": false
                    }
                  ],
                  "numberOfPerson": 0,
                  "consentKey": 0,
                  "hasFloat": false,
                  "entity": null,
                  "dependencies": [
                    "cc820000-0ffe-0009-b3f3-08dbbf29a001"
                  ],
                  "isRootNode": false,
                  "entityType": null,
                  "entityData": null,
                  "linkInId": null,
                  "linkOutId": null,
                  "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                  "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                  "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                  "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                  "autorun": true,
                  "earlyStart": "0001-01-01T00:00:00",
                  "earlyFinish": "0001-01-01T00:00:00",
                  "lateStart": "0001-01-01T00:00:00",
                  "lateFinish": "0001-01-01T00:00:00",
                  "duration": "08:00:00",
                  "earlyStartDuration": "2.18:30:00",
                  "earlyFinishDuration": "3.18:30:00",
                  "lateStartDuration": "68.06:45:00",
                  "lateFinishDuration": "68.14:45:00",
                  "float": "00:00:00",
                  "durationFloat": "65.12:15:00",
                  "earlyStartDurationOffset": null,
                  "quartzEarlyTimeRemainder": null,
                  "cronExpression": null,
                  "isUserControlledScheduling": false
                }
              ],
              "numberOfPerson": 0,
              "consentKey": 0,
              "hasFloat": false,
              "entity": null,
              "dependencies": [
                "cc820000-0ffe-0009-c7c2-08dbbf29a001"
              ],
              "isRootNode": false,
              "entityType": null,
              "entityData": null,
              "linkInId": null,
              "linkOutId": null,
              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
              "autorun": false,
              "earlyStart": "0001-01-01T00:00:00",
              "earlyFinish": "0001-01-01T00:00:00",
              "lateStart": "0001-01-01T00:00:00",
              "lateFinish": "0001-01-01T00:00:00",
              "duration": "31.08:00:00",
              "earlyStartDuration": "2.18:30:00",
              "earlyFinishDuration": "96.18:30:00",
              "lateStartDuration": "36.22:45:00",
              "lateFinishDuration": "68.06:45:00",
              "float": "00:00:00",
              "durationFloat": "34.04:15:00",
              "earlyStartDurationOffset": null,
              "quartzEarlyTimeRemainder": null,
              "cronExpression": null,
              "isUserControlledScheduling": false
            },
            {
              "nodeType": 1,
              "id": "cc820000-0ffe-0009-c5b7-08dbbf29a001",
              "extendedData": {
                "label": "M_C2 to C2",
                "nodeColor": "#CDB30A",
                "linkColor": "black",
                "width": "",
                "height": "",
                "linkName": "M_C2 Link",
                "isExpand": false
              },
              "templateId": "577a0000-d144-b00c-b103-08db30cab664",
              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
              "hasDependencies": true,
              "hasChildren": true,
              "depth": 0,
              "children": [
                {
                  "nodeType": 2,
                  "id": "cc820000-0ffe-0009-9771-08dbbf29a003",
                  "extendedData": {
                    "label": "M_C2_C2 to C1",
                    "nodeColor": "#CDB30A",
                    "linkColor": "black",
                    "width": "",
                    "height": "",
                    "linkName": "M_C2_C2 Link",
                    "isExpand": false
                  },
                  "templateId": "577a0000-d144-b00c-1ef4-08db3001b68a",
                  "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                  "hasDependencies": true,
                  "hasChildren": true,
                  "depth": 0,
                  "children": [
                    {
                      "nodeType": 2,
                      "id": "cc820000-0ffe-0009-9814-08dbbf29a003",
                      "extendedData": {
                        "label": "M_C2_C2_C1 to C1",
                        "nodeColor": "#CDB30A",
                        "linkColor": "black",
                        "width": "",
                        "height": "",
                        "linkName": "M_C2_C2_C1 Link",
                        "isExpand": false
                      },
                      "templateId": "577a0000-d144-b00c-5f51-08db2fff971a",
                      "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                      "hasDependencies": true,
                      "hasChildren": true,
                      "depth": 0,
                      "children": [
                        {
                          "nodeType": 2,
                          "id": "cc820000-0ffe-0009-981a-08dbbf29a003",
                          "extendedData": {
                            "label": "M_C2_C2_C1_C1 to C1",
                            "nodeColor": "#CDB30A",
                            "linkColor": "black",
                            "width": "",
                            "height": "",
                            "linkName": "M_C2_C2_C1_C1 Link",
                            "isExpand": false
                          },
                          "templateId": "577a0000-d144-b00c-1320-08db3001b68a",
                          "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                          "hasDependencies": true,
                          "hasChildren": true,
                          "depth": 0,
                          "children": [
                            {
                              "nodeType": 2,
                              "id": "cc820000-0ffe-0009-981f-08dbbf29a003",
                              "extendedData": {
                                "label": "M_C2_C2_C1_C1_C1 to C1",
                                "nodeColor": "#CDB30A",
                                "linkColor": "black",
                                "width": "",
                                "height": "",
                                "linkName": "C1 M_C2_C2_C1_C1_C1",
                                "isExpand": false
                              },
                              "templateId": "577a0000-d144-b00c-27ee-08db3001b68a",
                              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                              "hasDependencies": true,
                              "hasChildren": false,
                              "depth": 0,
                              "children": [],
                              "numberOfPerson": 0,
                              "consentKey": 0,
                              "hasFloat": false,
                              "entity": null,
                              "dependencies": [
                                "cc820000-0ffe-0009-981a-08dbbf29a003"
                              ],
                              "isRootNode": false,
                              "entityType": null,
                              "entityData": null,
                              "linkInId": null,
                              "linkOutId": null,
                              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                              "autorun": true,
                              "earlyStart": "0001-01-01T00:00:00",
                              "earlyFinish": "0001-01-01T00:00:00",
                              "lateStart": "0001-01-01T00:00:00",
                              "lateFinish": "0001-01-01T00:00:00",
                              "duration": "10.00:00:00",
                              "earlyStartDuration": "8.15:30:00",
                              "earlyFinishDuration": "38.15:30:00",
                              "lateStartDuration": "68.14:45:00",
                              "lateFinishDuration": "78.14:45:00",
                              "float": "00:00:00",
                              "durationFloat": "59.23:15:00",
                              "earlyStartDurationOffset": null,
                              "quartzEarlyTimeRemainder": null,
                              "cronExpression": null,
                              "isUserControlledScheduling": false
                            }
                          ],
                          "numberOfPerson": 0,
                          "consentKey": 0,
                          "hasFloat": false,
                          "entity": null,
                          "dependencies": [
                            "cc820000-0ffe-0009-9814-08dbbf29a003"
                          ],
                          "isRootNode": false,
                          "entityType": null,
                          "entityData": null,
                          "linkInId": null,
                          "linkOutId": null,
                          "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                          "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                          "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                          "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                          "autorun": true,
                          "earlyStart": "0001-01-01T00:00:00",
                          "earlyFinish": "0001-01-01T00:00:00",
                          "lateStart": "0001-01-01T00:00:00",
                          "lateFinish": "0001-01-01T00:00:00",
                          "duration": "1.00:00:00",
                          "earlyStartDuration": "5.15:30:00",
                          "earlyFinishDuration": "8.15:30:00",
                          "lateStartDuration": "67.14:45:00",
                          "lateFinishDuration": "68.14:45:00",
                          "float": "00:00:00",
                          "durationFloat": "61.23:15:00",
                          "earlyStartDurationOffset": null,
                          "quartzEarlyTimeRemainder": null,
                          "cronExpression": null,
                          "isUserControlledScheduling": false
                        }
                      ],
                      "numberOfPerson": 0,
                      "consentKey": 0,
                      "hasFloat": false,
                      "entity": null,
                      "dependencies": [
                        "cc820000-0ffe-0009-9771-08dbbf29a003"
                      ],
                      "isRootNode": false,
                      "entityType": null,
                      "entityData": null,
                      "linkInId": null,
                      "linkOutId": null,
                      "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                      "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                      "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                      "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                      "autorun": true,
                      "earlyStart": "0001-01-01T00:00:00",
                      "earlyFinish": "0001-01-01T00:00:00",
                      "lateStart": "0001-01-01T00:00:00",
                      "lateFinish": "0001-01-01T00:00:00",
                      "duration": "15:00:00",
                      "earlyStartDuration": "3.18:30:00",
                      "earlyFinishDuration": "5.15:30:00",
                      "lateStartDuration": "66.23:45:00",
                      "lateFinishDuration": "67.14:45:00",
                      "float": "00:00:00",
                      "durationFloat": "63.05:15:00",
                      "earlyStartDurationOffset": null,
                      "quartzEarlyTimeRemainder": null,
                      "cronExpression": null,
                      "isUserControlledScheduling": false
                    }
                  ],
                  "numberOfPerson": 0,
                  "consentKey": 0,
                  "hasFloat": false,
                  "entity": null,
                  "dependencies": [
                    "cc820000-0ffe-0009-c5b7-08dbbf29a001"
                  ],
                  "isRootNode": false,
                  "entityType": null,
                  "entityData": null,
                  "linkInId": null,
                  "linkOutId": null,
                  "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                  "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                  "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                  "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                  "autorun": true,
                  "earlyStart": "0001-01-01T00:00:00",
                  "earlyFinish": "0001-01-01T00:00:00",
                  "lateStart": "0001-01-01T00:00:00",
                  "lateFinish": "0001-01-01T00:00:00",
                  "duration": "08:00:00",
                  "earlyStartDuration": "2.18:30:00",
                  "earlyFinishDuration": "3.18:30:00",
                  "lateStartDuration": "66.15:45:00",
                  "lateFinishDuration": "66.23:45:00",
                  "float": "00:00:00",
                  "durationFloat": "63.21:15:00",
                  "earlyStartDurationOffset": null,
                  "quartzEarlyTimeRemainder": null,
                  "cronExpression": null,
                  "isUserControlledScheduling": false
                }
              ],
              "numberOfPerson": 0,
              "consentKey": 0,
              "hasFloat": false,
              "entity": null,
              "dependencies": [
                "cc820000-0ffe-0009-c7c2-08dbbf29a001"
              ],
              "isRootNode": false,
              "entityType": null,
              "entityData": null,
              "linkInId": null,
              "linkOutId": null,
              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
              "autorun": false,
              "earlyStart": "0001-01-01T00:00:00",
              "earlyFinish": "0001-01-01T00:00:00",
              "lateStart": "0001-01-01T00:00:00",
              "lateFinish": "0001-01-01T00:00:00",
              "duration": "31.08:00:00",
              "earlyStartDuration": "2.18:30:00",
              "earlyFinishDuration": "96.18:30:00",
              "lateStartDuration": "35.07:45:00",
              "lateFinishDuration": "66.15:45:00",
              "float": "00:00:00",
              "durationFloat": "32.13:15:00",
              "earlyStartDurationOffset": null,
              "quartzEarlyTimeRemainder": null,
              "cronExpression": null,
              "isUserControlledScheduling": false
            },
            {
              "nodeType": 2,
              "id": "cc820000-0ffe-0009-ab6e-08dbbf29a003",
              "extendedData": {
                "label": "M_C2 to C3",
                "nodeColor": "#CDB30A",
                "linkColor": "black",
                "width": "",
                "height": "",
                "linkName": "M_C2 Link",
                "isExpand": false
              },
              "templateId": "577a0000-d144-b00c-4691-08db2fff971a",
              "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
              "hasDependencies": true,
              "hasChildren": true,
              "depth": 0,
              "children": [
                {
                  "nodeType": 2,
                  "id": "cc820000-0ffe-0009-ab74-08dbbf29a003",
                  "extendedData": {
                    "label": "M_C2_C3 to C1",
                    "nodeColor": "#CDB30A",
                    "linkColor": "black",
                    "width": "",
                    "height": "",
                    "linkName": "M_C2_C3 Link",
                    "isExpand": false
                  },
                  "templateId": "577a0000-d144-b00c-4ee2-08db2fff971a",
                  "correlationId": "577a0000-d144-b00c-0989-08db9d528ce2",
                  "hasDependencies": true,
                  "hasChildren": false,
                  "depth": 0,
                  "children": [],
                  "numberOfPerson": 0,
                  "consentKey": 0,
                  "hasFloat": false,
                  "entity": null,
                  "dependencies": [
                    "cc820000-0ffe-0009-ab6e-08dbbf29a003"
                  ],
                  "isRootNode": false,
                  "entityType": null,
                  "entityData": null,
                  "linkInId": null,
                  "linkOutId": null,
                  "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
                  "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
                  "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
                  "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
                  "autorun": true,
                  "earlyStart": "0001-01-01T00:00:00",
                  "earlyFinish": "0001-01-01T00:00:00",
                  "lateStart": "0001-01-01T00:00:00",
                  "lateFinish": "0001-01-01T00:00:00",
                  "duration": "14:00:00",
                  "earlyStartDuration": "1.00:30:00",
                  "earlyFinishDuration": "2.18:30:00",
                  "lateStartDuration": "78.00:45:00",
                  "lateFinishDuration": "78.14:45:00",
                  "float": "00:00:00",
                  "durationFloat": "77.00:15:00",
                  "earlyStartDurationOffset": null,
                  "quartzEarlyTimeRemainder": null,
                  "cronExpression": null,
                  "isUserControlledScheduling": false
                }
              ],
              "numberOfPerson": 0,
              "consentKey": 0,
              "hasFloat": false,
              "entity": null,
              "dependencies": [
                "cc820000-0ffe-0009-c7c2-08dbbf29a001"
              ],
              "isRootNode": false,
              "entityType": null,
              "entityData": null,
              "linkInId": null,
              "linkOutId": null,
              "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
              "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
              "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
              "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
              "autorun": true,
              "earlyStart": "0001-01-01T00:00:00",
              "earlyFinish": "0001-01-01T00:00:00",
              "lateStart": "0001-01-01T00:00:00",
              "lateFinish": "0001-01-01T00:00:00",
              "duration": "08:00:00",
              "earlyStartDuration": "00:30:00",
              "earlyFinishDuration": "1.00:30:00",
              "lateStartDuration": "77.16:45:00",
              "lateFinishDuration": "78.00:45:00",
              "float": "00:00:00",
              "durationFloat": "77.16:15:00",
              "earlyStartDurationOffset": null,
              "quartzEarlyTimeRemainder": null,
              "cronExpression": null,
              "isUserControlledScheduling": false
            }
          ],
          "numberOfPerson": 0,
          "consentKey": 0,
          "hasFloat": false,
          "entity": null,
          "dependencies": [
            "08dbbf29-a001-73a8-0009-0ffecc820000"
          ],
          "isRootNode": false,
          "entityType": null,
          "entityData": null,
          "linkInId": null,
          "linkOutId": null,
          "proposerConsentId": "58d141c2-6b81-4bc5-9fd1-dec431986d9d",
          "proposerId": "0f46118d-5cf8-436d-88e8-1b95b8e7becb",
          "objectConsentId": "577a0000-d144-b00c-56a4-08db659df09c",
          "objectId": "577a0000-d144-b00c-2db6-08db9d516c09",
          "autorun": false,
          "earlyStart": "0001-01-01T00:00:00",
          "earlyFinish": "0001-01-01T00:00:00",
          "lateStart": "0001-01-01T00:00:00",
          "lateFinish": "0001-01-01T00:00:00",
          "duration": "22:00:00",
          "earlyStartDuration": "00:30:00",
          "earlyFinishDuration": "2.18:30:00",
          "lateStartDuration": "76.18:45:00",
          "lateFinishDuration": "77.16:45:00",
          "float": "00:00:00",
          "durationFloat": "76.18:15:00",
          "earlyStartDurationOffset": null,
          "quartzEarlyTimeRemainder": null,
          "cronExpression": null,
          "isUserControlledScheduling": false
        }
      ],
      "numberOfPerson": 0,
      "consentKey": 0,
      "hasFloat": false,
      "entity": null,
      "dependencies": [],
      "isRootNode": true,
      "entityType": null,
      "entityData": null,
      "linkInId": null,
      "linkOutId": null,
      "proposerConsentId": null,
      "proposerId": null,
      "objectConsentId": null,
      "objectId": null,
      "autorun": false,
      "earlyStart": "0001-01-01T00:00:00",
      "earlyFinish": "0001-01-01T00:00:00",
      "lateStart": "0001-01-01T00:00:00",
      "lateFinish": "0001-01-01T00:00:00",
      "duration": "00:00:00",
      "earlyStartDuration": "00:30:00",
      "earlyFinishDuration": "00:30:00",
      "lateStartDuration": "76.18:45:00",
      "lateFinishDuration": "76.18:45:00",
      "float": "00:00:00",
      "durationFloat": "76.18:15:00",
      "earlyStartDurationOffset": null,
      "quartzEarlyTimeRemainder": null,
      "cronExpression": null,
      "isUserControlledScheduling": false
    },
    "startDateTime": "{{startupTime}}",
    "parentCorrelationId": null,
    "State": 0,
    "correlationId": "{{id}}"
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.addNodeModal = false;
  }
}
