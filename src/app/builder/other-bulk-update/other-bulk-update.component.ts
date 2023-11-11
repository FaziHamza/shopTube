import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { dataClassification } from '../data-classification';

@Component({
  selector: 'st-other-bulk-update',
  templateUrl: './other-bulk-update.component.html',
  styleUrls: ['./other-bulk-update.component.scss']
})
export class OtherBulkUpdateComponent {
  @Input() nodes: any;
  @Input() types: any;
  @Input() formlyModel: any;
  @Input() screenName: any;
  tabelNodes: any[] = [];
  keyValidation: any[] = [];
  optionData: any[] = dataClassification;

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
        expand: false,
      }
      this.tabelNodes.push(sectionObj);
      let filterHeadingParagrapgh = this.filterInputElements(element.children)
      filterHeadingParagrapgh.forEach((forms: any) => {
        let obj = {
          id: forms.id,
          hideExpression: forms.hideExpression,
          key: forms.key,
          title: forms.title,
          className: forms?.className,
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
      if (this.nodes[0].children[1].children[index].title != element.title) {
        this.nodes[0].children[1].children[index].title = element.title;
        this.nodes[0].children[1].children[index].children[0].title = element.title;
      }
      this.nodes.forEach((body: any, innerIndex: any) => {
        let findInputs = this.filterInputElements(body.children);
        findInputs.forEach((a: any) => {
          for (let j = 0; j < element.children.length; j++) {
            const check = element.children[j];
            if (check.id == a.id) {
              a.hideExpression = check.hideExpression;
              a.title = check.title;
              a.className = check.className;
              a.key = check.key;
              // a.label = check.title;
              break;
            }
          }
        })
      });
    });
    let obj = {
      nodes: this.nodes,
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
        if (obj.type !== 'heading' && obj.type !== 'paragraph' && obj.formlyType != 'input' && obj.hideExpression != undefined) {
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
