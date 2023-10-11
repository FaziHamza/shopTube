import { Component, Input } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-repeatable-controll',
  templateUrl: './repeatable-controll.component.html',
  styleUrls: ['./repeatable-controll.component.scss']
})
export class RepeatableControllComponent extends FieldArrayType {
  child: any = {};
  fildArray: any = this.field.fieldArray;
  constructor(public dataSharedService: DataSharedService) {
    super();

  }
  ngOnInit(): void {
    this.child = this.field;
    // this.child = this.child ? this.child : this.options

    // this.child = this.options;

    this.dataSharedService.repeatableControll.subscribe(res => {
      debugger
      if (res) {
        this.child = res;
        let findObj = this.findObjectByKey(res, this.field.key);
        if (findObj) {
          this.child = JSON.parse(JSON.stringify(findObj));
        }
      }
    });
  }
  addChild() {
    let inputs = this.filterInputElements(this.child.children);
    if (!this.fildArray) {
      this.fildArray = this.field.fieldGroup;
      if (inputs.length > 0) {
        inputs.forEach((element: any) => {
          if (element) {
            this.fildArray.push(element);
          }
        });
      }
      // this.fildArray.push(this.child.children[0]);
      this.child.children.push(this.child.children[0]);
    }
    else {
      if (inputs.length > 0) {
        inputs.forEach((element: any) => {
          if (element) {
            this.fildArray.push(element);
          }
        });
      }
      // this.fildArray.push(this.child.children[0]);
      this.child.children.push(this.child.children[0]);
    }
    this.field.fieldGroup = this.fildArray;
    // this.fildArray.push(this.child.children[0])
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
}
