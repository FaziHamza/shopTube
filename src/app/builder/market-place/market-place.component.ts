import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {
  enviorment = environment.nestImageUrl;
  @Input() nodes: any[] = [];
  groupedData: any[];
  data: any[] = []
  saveLoader: any = false;
  nodesData: any[] = [];
  constructor(private applicationService: ApplicationService, private drawerRef: NzDrawerRef<any>,
    private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.groupDataByCategory();
    this.nodesData = JSON.parse(JSON.stringify(this.nodes));
  }
  groupDataByCategory() {
    this.saveLoader = true;
    this.applicationService.getNestCommonAPI('market-place').subscribe(res => {
      this.saveLoader = false;
      if (res) {
        const groupedDataMap = new Map<string, any[]>();
        for (const item of res) {
          const categoryKey = item.categoryname;
          const itemsArray = groupedDataMap.get(categoryKey) ?? [];
          itemsArray.push(item);
          groupedDataMap.set(categoryKey, itemsArray);
        }
        this.groupedData = Array.from(groupedDataMap.entries()).map(([categoryname, items]) => ({
          categoryname,
          items,
        }));
      }
    })
  }
  addNodes(item: any, group: any) {
    debugger
    let templateData = JSON.parse(item.data);
    if (templateData?.[0]) {
      const checkPage = templateData.find((a: any) => a.type === 'page');
      const checkSection = templateData.find((a: any) => a.type === 'sections');
      if (checkPage){
        this.nodesData = templateData;
        this.toastr.success(group?.categoryname + ' added successfully', { nzDuration: 3000 })

      }
      else if (checkSection) {
        templateData.forEach((element: any) => {
          this.nodesData[0].children[1].children.push(element);
        });
        this.toastr.success(group?.categoryname + ' added successfully', { nzDuration: 3000 })
      }
    }
    // if(group?.categoryname ==='Block'){
    //   templateData.forEach((element:any) => {
    //     this.nodesData[0].children[1].children.push(element);
    //   });
    // }
    // else
    // {
    //   this.nodesData = templateData;
    //   this.toastr.success(group?.category + ' added successfully', { nzDuration: 3000 })
    // }
  }
  close() {
    this.drawerRef.close(this.nodesData);
  }
  cancel() {
    this.drawerRef.close();
  }
}
