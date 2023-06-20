import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'st-bulk-update',
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.scss']
})
export class BulkUpdateComponent implements OnInit {
  @Input() nodes: any;
  @Input() types: any;
  // @Input() formlyModel: any;
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
        expand: false
      }
      this.tabelNodes.push(sectionObj);
      let findInputs = this.filterInputElements(element.children)
      findInputs.forEach((forms: any) => {
        let obj = {
          id: forms.id,
          key: forms.formly[0].fieldGroup[0].key,
          title: forms.formly[0].fieldGroup[0].props.label,
          formlyType: 'input',
          // defaultValue:forms.formly[0].fieldGroup[0].defaultValue,
          placeholder:forms.formly[0].fieldGroup[0].props.placeholder,
          type:this.types
        }
        this.tabelNodes[index].children.push(obj);
      });
    });
  }
  close() {
    this.drawerRef.close(this.nodes);
  }
 

  save() {
    this.tabelNodes.forEach((element, index) => {
      this.nodes[0].children[1].children[index].key = element.key;
      if(this.nodes[0].children[1].children[index].title != element.title){
        this.nodes[0].children[1].children[index].title = element.title;
        this.nodes[0].children[1].children[index].children[0].title = element.title;
      }
      this.nodes.forEach((body: any, innerIndex: any) => {
        let findInputs = this.filterInputElements(body.children);
        findInputs.forEach((input: any) => {
          for (let j = 0; j < element.children.length; j++) {
            const check = element.children[j];
            if(check.id == input.id) {
              input.title = check.title;
              input.formly[0].fieldGroup[0].key = check.key
              input.formly[0].fieldGroup[0].props.label = check.title;
              input.formly[0].fieldGroup[0].defaultValue = check.defaultValue;
              input.formly[0].fieldGroup[0].props.placeholder = check.placeholder;
              // this.formlyModel[input.formly[0].fieldGroup[0].key] = check.defaultValue;
              break;
            }
          }
        })
      });
    });
    let obj = {
      nodes:this.nodes,
      // formlyModel :this.formlyModel
    }
    this.drawerRef.close(obj);
  }

  filterInputElements(data: any): any[] {
    const inputElements: any[] = [];

    function traverse(obj: any): void {
      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          traverse(item);
        });
      } else if (typeof obj === 'object' && obj !== null) {
        if (obj.formlyType === 'input') {
          inputElements.push(obj);
        }
        Object.values(obj).forEach((value) => {
          traverse(value);
        });
      }
    }

    traverse(data);
    return inputElements;
  }
}
