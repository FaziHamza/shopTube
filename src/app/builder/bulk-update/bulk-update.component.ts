import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'st-bulk-update',
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.scss']
})
export class BulkUpdateComponent implements OnInit {
  @Input() nodes: any;
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  tabelNodes: any[] = [];
  constructor(private drawerRef: NzDrawerRef<any>) { }

  ngOnInit(): void {
    this.makeGridData()
  }
  makeGridData() {
    let tableData = this.nodes[0].children[1].children;
    tableData.forEach((element: any, index: any) => {
      let sectionObj = {
        id: element.id,
        key: element.key,
        title: element.title,
        children: [],
      }
      this.tabelNodes.push(sectionObj);
      element.children.forEach((body: any) => {
        if (body.type == 'body') {
          body.children.forEach((forms: any) => {
            if (forms.formlyType) {
              let obj = {
                id: forms.id,
                key: forms.formly[0].fieldGroup[0].key,
                title: forms.formly[0].fieldGroup[0].props.label,
                formlyType: 'input'
              }
              this.tabelNodes[index].children.push(obj);
            } else {
              this.tabelNodes[index].children.push(forms);
            }
          });
        }
      });
    });
    this.tabelNodes.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
  }
  close() {
    this.drawerRef.close(this.nodes);
  }
  cancle() {
    // this.activeModel.close();
  }
  mapOfExpandedData: { [id: string]: any[] } = {};

  collapse(array: any[], data: any, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach((d: any) => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: any): any[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: any, hashMap: { [key: string]: boolean }, array: any[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }
  save() {
    this.tabelNodes = this.convertListToTree()
    this.tabelNodes.forEach((element, index) => {
      this.nodes[0].children[1].children[index].key = element.key;
      this.nodes[0].children[1].children[index].title = element.title;
      element.children.forEach((body: any, innerIndex: any) => {
        if (body.formlyType) {
          this.nodes[0].children[1].children[index].children[1].children[innerIndex].title = body.title
          this.nodes[0].children[1].children[index].children[1].children[innerIndex].formly[0].fieldGroup[0].key = body.key
          this.nodes[0].children[1].children[index].children[1].children[innerIndex].formly[0].fieldGroup[0].props.label = body.title
        }
        else {
          this.nodes[0].children[1].children[index].children[1].children[innerIndex] = body;
        }
      });
    });
    this.drawerRef.close(this.nodes);
  }
  convertListToTree(){
    let arrayList : any[] =[];
    this.tabelNodes.forEach((element:any,index:any)=>{
      let getData =  this.mapOfExpandedData[element.id];
      for (let j = 0; j < getData.length; j++) {
        const sect = getData[j];
        if(j ==0){
          let sectionObj = {
            id: sect.id,
            key: sect.key,
            title: sect.title,
            children: [],
          }
        arrayList.push(sectionObj);
        }
        if(j != 0){
          if (sect.formlyType) {
            let obj = {
              id: sect.id,
              key: sect.key,
              title: sect.title,
              formlyType: 'input'
            }
            arrayList[index].children.push(obj);
          } else {
            arrayList[index].children.push(sect);
          }
        }
      }

    })
    return arrayList;
  }
}
