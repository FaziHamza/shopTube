import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { dataClassification } from '../data-classification';

@Component({
  selector: 'st-bulk-update',
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.scss']
})
export class BulkUpdateComponent implements OnInit {
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
    debugger
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
      let findInputs = this.filterInputElements(element.children)
      findInputs.forEach((forms: any) => {
        let obj = {
          id: forms.id,
          hideExpression: forms.hideExpression,
          key: forms?.formly[0]?.fieldGroup[0]?.key,
          title: forms?.formly[0]?.fieldGroup[0]?.props?.label,
          formlyType: 'input',
          defaultValue: forms?.formly[0]?.fieldGroup[0]?.defaultValue,
          placeholder: forms?.formly[0]?.fieldGroup[0]?.props?.placeholder,
          readonly: forms?.formly[0]?.fieldGroup[0]?.props?.readonly,
          className: forms?.className,
          // type: this.types,
          dataClassification: forms?.formly[0]?.fieldGroup[0]?.props?.additionalProperties['dataClassification'],
        }
        this.tabelNodes[index].children.push(obj);
      });

    });
  }
  close() {
    this.drawerRef.close(this.nodes);
  }


  save() {

    let check = this.filterInputElementKey(this.tabelNodes);
    if (check.length > 0) {
      alert("key cannot be empty")
    }
    else {
      this.tabelNodes.forEach((element, index) => {
        this.nodes[0].children[1].children[index].key = element.key;
        if (this.nodes[0].children[1].children[index].title != element.title) {
          this.nodes[0].children[1].children[index].title = element.title;
          this.nodes[0].children[1].children[index].children[0].title = element.title;
        }
        this.nodes.forEach((body: any, innerIndex: any) => {
          let findInputs = this.filterInputElements(body.children);
          findInputs.forEach((input: any) => {
            for (let j = 0; j < element.children.length; j++) {
              const check = element.children[j];
              if (check.id == input.id) {
                // if(input.formly[0].fieldGroup[0].key != check.key){
                //   delete this.formlyModel[input.formly[0].fieldGroup[0].key];
                // }
                input.hideExpression = check.hideExpression;
                input.title = check.title;
                input.className = check.className;
                input.key = check.key;
                input.formly[0].fieldGroup[0].key = check.key
                input.formly[0].fieldGroup[0].props.label = check.title;
                input.formly[0].fieldGroup[0].defaultValue = check.defaultValue;
                input.formly[0].fieldGroup[0].props.placeholder = check.placeholder;
                input.formly[0].fieldGroup[0].props.className = check.className;
                input.formly[0].fieldGroup[0].props.readonly = check.readonly;
                input.formly[0].fieldGroup[0].props.additionalProperties['dataClassification'] = check.dataClassification;
                // this.formlyModel[input.formly[0].fieldGroup[0].key] = check.defaultValue;
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
      this.keyValidation = [];
      this.checkKeyValidation(this.tabelNodes);
      if (this.keyValidation.length == 0) {
        this.drawerRef.close(obj);
      } else {
        // this.drawerRef.close(undefined);
        alert(this.keyValidation);
        console.log(this.keyValidation)
      }

    }

  }
  apply(key: any, data: any) {
    if (data.children.length > 0) {
      key = key.toLowerCase();
      let findInputs = this.filterInputElements(data.children);
      findInputs.forEach(res => {
        if (!res.key.includes('.')) {
          res.key = key + '.' + res.key;
        }
        else if (res.key.includes('.')) {

          let new_key = res.key.split(".")
          if (new_key.length > 1) {
            let result = new_key[1];
            res.key = key + '.' + result;
          }
        }
      })
    }
  }


  filterInputElementKey(data: any): any[] {
    const inputElements: any[] = [];

    function traverse(obj: any): void {
      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          traverse(item);
        });
      } else if (typeof obj === 'object' && obj !== null) {
        if (obj.key === null || obj.key === undefined || obj.key == "") {
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
  checkKeyValidation(nodes: any) {
    const pattern = /^[a-z0-9_.]+$/; // Your pattern

    // Use a separate function to handle recursion
    const validateNode = (node: any) => {
      if (!pattern.test(node.key)) {
        this.keyValidation.push(`${node.title} : ${node.key}`);
      }
      if (node.children && node.children.length > 0) {
        for (const childNode of node.children) {
          validateNode(childNode); // Recursively call the validation function for child nodes
        }
      }
    };

    for (const node of nodes) {
      validateNode(node); // Start validation from the root nodes
    }
  }


}
