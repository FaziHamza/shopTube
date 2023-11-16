import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-cascader',
  templateUrl: './cascader.component.html',
  styleUrls: ['./cascader.component.scss']
})
export class CascaderComponent implements OnInit {
  @Input() cascaderData: any;
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  constructor(private applicationService: ApplicationService, private cdr: ChangeDetectorRef) {
    this.processData = this.processData.bind(this);
  }

  ngOnInit(): void {
    
    if (this.cascaderData?.borderRadius) {
      document.documentElement.style.setProperty('--cascaderBorderRadius', this.cascaderData?.borderRadius);
      this.cdr.detectChanges();
    }
  }

  // changeNzOptions(): void {
  //   if (this.nzOptions === options) {
  //     this.nzOptions = otherOptions;
  //   } else {
  //     this.nzOptions = options;
  //   }
  // }

  onChanges(values: any): void {
    console.log(values, this.values);
  }
  async loadData(node: NzCascaderOption, index: number): Promise<void> {
    let getNextNode = this.cascaderData['appConfigurableEvent'].find((a: any) => a.level == index + 1);
    if (getNextNode) {
      let url = `knex-query/getexecute-rules/${getNextNode._id}`;
      // Root node - Load application data
      try {
        const res = await this.applicationService.callApi(url, 'get', '', '', `${node.value}`).toPromise();
        if (res.isSuccess) {
          let propertyNames = Object.keys(res.data[0]);
          let result = res.data.map((item: any) => {
            let newObj: any = {};
            let propertiesToGet: string[];
            if ('id' in item && 'name' in item) {
              propertiesToGet = ['id', 'name'];
            } else {
              propertiesToGet = Object.keys(item).slice(0, 2);
            }
            propertiesToGet.forEach((prop) => {
              newObj[prop] = item[prop];
            });
            return newObj;
          });
          let finalObj = result.map((item: any) => {
            return {
              label: item.name || item[propertyNames[1]],
              value: item.id || item[propertyNames[0]],
              isLeaf:  this.cascaderData['appConfigurableEvent'].length == index + 1 ? true : false
            };
          });
          node.children = finalObj;
        } else {
          // this.toastr.error(res.message, { nzDuration: 3000 });
        }
      } catch (err) {
        // this.toastr.error('An error occurred while loading application data', { nzDuration: 3000 });
      }
    }
  }

  processData(data: any) {
    if (data?.data?.length > 0) {
      let propertyNames = Object.keys(data?.data?.[0]);
      let result = data?.data?.map((item: any) => {
        let newObj: any = {};
        let propertiesToGet: string[];
        if ('id' in item && 'name' in item) {
          propertiesToGet = ['id', 'name'];
        } else {
          propertiesToGet = Object.keys(item).slice(0, 2);
        }
        propertiesToGet.forEach((prop) => {
          newObj[prop] = item[prop];
        });
        return newObj;
      });

      let finalObj = result.map((item: any) => {
        return {
          label: item.name || item[propertyNames[1]],
          value: item.id || item[propertyNames[0]],
        };
      });
      this.cascaderData.options = finalObj;
    }
    // Your processing logic here
    return data;
  }
}


