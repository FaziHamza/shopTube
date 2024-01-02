import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ElementData } from 'src/app/models/element';
import { ApplicationService } from 'src/app/services/application.service';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {
  addSection: boolean = false;
  @Input() screenName: any;
  @Input() screenId: any;
  @Input() taskManagerData: any;
  @Input() formlyModel: any;
  @Input() form: any;
  requestSubscription: Subscription;
  saveLoader: boolean = false;
  drawerLoader: boolean = false;
  visible: boolean = false;
  addSubtask: boolean = false;
  drawerData: any = {
    "task": '',
    "date": '',
    "assignee": '',
    "data": []
  }
  constructor(public _dataSharedService: DataSharedService, private builderService: BuilderService,
    private applicationService: ApplicationService, private toastr: NzMessageService,
    public dataSharedService: DataSharedService,
    private applicationServices: ApplicationService
  ) {
    this.processData = this.processData.bind(this);
  }
  ngOnInit() {
    if (this.taskManagerData?.eventActionconfig) {
      this.saveLoader = true
    } else {
      this.saveLoader = false
    }
  }

  listOfDisplayData: any = []
  showAddTask(item: any) {
    item['addTask'] = true
  }
  expand(item: any, head: any) {
    item['expand'] = !item['expand'];
    this.applyDefaultValue();
    // Adding a delay of 500 milliseconds (adjust the delay as needed)
    if (item['expand']) {
      setTimeout(() => {
        this.makeModel(item.id);
        this.dataSharedService.updateModel.next(this.formlyModel)
      }, 100);
    }

    if (head.callApi && item['expand']) {
      let pagination = '';
      let { _id, actionLink, data, headers, parentId, page, pageSize } = this.taskManagerData.eventActionconfig;
      if (page && pageSize) {
        pagination = `?page=${localStorage.getItem('tablePageNo') || 1}&pageSize=${localStorage.getItem('tablePageSize') || 10}`
      }
      this.saveLoader = true;
      let itemIdString: string | undefined = item?.id;
      parentId = itemIdString ? parseInt(itemIdString, 10) : 0;
      if (parentId) {
        let url = head.callApi + '/' + parentId;
        this.requestSubscription = this.applicationService.callApi(`${url}${pagination}`, 'get', data, headers, null).subscribe({
          next: (res) => {
            this.saveLoader = false;
            item['children'] = res.data.map((item: any) => ({ "expand": false, ...item }));
          },
          error: (error: any) => {
            console.error(error);
            this.saveLoader = false;
            this.toastr.error("An error occurred", { nzDuration: 3000 });
          }
        })
      }
    }
  }

  makeModel(event: any) {
    let newModel = JSON.parse(JSON.stringify(this.formlyModel));
    if (newModel) {
      for (const key in newModel) {
        if (newModel.hasOwnProperty(key)) {
          if (typeof newModel[key] === 'object') {
            newModel[key]['parentid'] = event
          }
          else {
            if (key.includes('parentid')) {
              newModel[key] = event;
            }
          }
        }
      }
    }
    this.formlyModel = newModel;
  }
  processData(res: any) {
    this.saveLoader = false
    if (res) {
      if (res.data.length > 0) {
        this.getFromQueryOnlyTable(res);
      }
    }
    return res;
  }
  getFromQueryOnlyTable(res: any) {
    this.listOfDisplayData = res.data.map((item: any) => ({ "expand": false, ...item }));
    this.taskManagerData['tableHeaders'] = this.taskManagerData['tableHeaders'] ? this.taskManagerData['tableHeaders'] : [];
    if (this.taskManagerData['tableHeaders'].length === 0) {
      this.taskManagerData['tableHeaders'] = Object.keys(this.listOfDisplayData[0] || {}).map(key => ({ name: key, key: key }));
    } else {
      const tableKey = Object.keys(this.listOfDisplayData[0] || {}).map(key => ({ name: key }));
      const updatedData = tableKey.filter(updatedItem =>
        !this.taskManagerData['tableHeaders'].some((headerItem: any) => headerItem.key === updatedItem.name)
      );
      if (updatedData.length > 0) {
        updatedData.forEach(updatedItem => {
          this.taskManagerData['tableHeaders'].push({ id: this.taskManagerData.tableHeaders.length + 1, key: updatedItem.name, name: updatedItem.name, });
        });
      }
    }

    const hasExpandKey = this.taskManagerData['tableHeaders'].some((head: any) => head.key === 'expand');
    if (!hasExpandKey) {
      this.taskManagerData['tableHeaders'].unshift({
        'name': 'expand',
        'key': 'expand',
      });
    }
  }
  addSectionFunc() {
    debugger
    this.addSection = true;
    this.applyDefaultValue();
    this.dataSharedService.updateModel.next(this.formlyModel)
    this.makeModel('');
  }
  close() {
    this.visible = false;
  }
  tdFunc(head: any, item: any) {
    if (head?.drawer) {
      this.visible = true;
      this.drawerData['task'] = item?.task;
      this.drawerData['date'] = item?.date;
      this.drawerData['assignee'] = item?.assignee;
      if (head.callApi) {
        let pagination = '';
        let { _id, actionLink, data, headers, parentId, page, pageSize } = this.taskManagerData.eventActionconfig;
        if (page && pageSize) {
          pagination = `?page=${localStorage.getItem('tablePageNo') || 1}&pageSize=${localStorage.getItem('tablePageSize') || 10}`
        }
        this.drawerLoader = true;
        let itemIdString: string | undefined = item?.id;
        parentId = itemIdString ? parseInt(itemIdString, 10) : 0;
        if (parentId) {
          let url = head.callApi + '/' + parentId;
          this.requestSubscription = this.applicationService.callApi(`${url}${pagination}`, 'get', data, headers, null).subscribe({
            next: (res) => {
              this.drawerLoader = false;
              this.drawerData.data = res.data;
            },
            error: (error: any) => {
              console.error(error);
              this.drawerLoader = false;
              this.toastr.error("An error occurred", { nzDuration: 3000 });
            }
          })
        }
      }
    }
  }
  applyDefaultValue() {
    const filteredNodes = this.filterInputElements(this.taskManagerData.children);
    const newMode = filteredNodes.reduce((acc, node) => {
      const formlyConfig = node.formly?.[0]?.fieldGroup?.[0]?.defaultValue;
      let formlyKey = node?.formly?.[0]?.fieldGroup?.[0]?.key;
      acc[formlyKey] = formlyConfig;
      return acc;
    }, {});

    this.formlyModel = newMode;
  }
  filterInputElements(data: ElementData[]): any[] {
    const inputElements: ElementData[] = [];
    const visited = new Set(); // To keep track of visited objects

    function traverse(obj: any): void {
      if (visited.has(obj)) return; // If the object is visited, return to prevent infinite loop
      visited.add(obj); // Mark the current object as visited

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
