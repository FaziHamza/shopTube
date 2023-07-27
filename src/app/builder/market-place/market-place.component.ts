import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {
  @Input() nodes: any[] = [];
  groupedData: any[];
  data : any[] = []

  constructor(private applicationService: ApplicationService,private drawerRef: NzDrawerRef<any>) { }

  ngOnInit(): void {
    this.groupDataByCategory();
  }
  groupDataByCategory() {
    this.applicationService.getNestCommonAPI('cp/MarketPlaceList').subscribe(res => {
      if(res?.isSuccess){
        const groupedDataMap = new Map<string, any[]>();

        for (const item of res?.data) {
          const categoryKey = item.category;
          const itemsArray = groupedDataMap.get(categoryKey) ?? [];
          itemsArray.push(item);
          groupedDataMap.set(categoryKey, itemsArray);
        }

        this.groupedData = Array.from(groupedDataMap.entries()).map(([category, items]) => ({
          category,
          items,
        }));
      }
    })
  }
  addNodes(item:any,group:any){
    debugger
    let templateData = JSON.parse(item.data);
    if(group?.category ==='Block'){
      templateData.forEach((element:any) => {
        this.nodes[0].children[1].children.push(element);
      });
    }else{
      this.nodes = templateData;
    }
  }
  close() {
    this.drawerRef.close(this.nodes);
  }
  cancel() {
    this.drawerRef.close();
  }
}
