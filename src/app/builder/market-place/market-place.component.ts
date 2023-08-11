import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
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
  requestSubscription: Subscription;
  constructor(private applicationService: ApplicationService, private drawerRef: NzDrawerRef<any>,
    private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.groupDataByCategory();
    this.nodesData = JSON.parse(JSON.stringify(this.nodes));
  }
  groupDataByCategory() {
    debugger
    this.saveLoader = true;
    this.applicationService.getNestCommonAPI('market-place').subscribe(res => {
      this.saveLoader = false;
      if (res) {
        // const groupedDataMap = new Map<string, any[]>();
        // for (const item of res) {
        //   const categoryKey = item.categoryname;
        //   const itemsArray = groupedDataMap.get(categoryKey) ?? [];
        //   itemsArray.push(item);
        //   groupedDataMap.set(categoryKey, itemsArray);
        // }
        // this.groupedData = Array.from(groupedDataMap.entries()).map(([categoryname, items]) => ({
        //   categoryname,
        //   items,
        // }));

        const groupedData: { [category: string]: { [subcategory: string]: any[] } } = {};

        res.forEach((data: any) => {
          if (!groupedData[data.categoryname]) {
            groupedData[data.categoryname] = {};
          }
          if (!groupedData[data.categoryname][data.subcategoryname]) {
            groupedData[data.categoryname][data.subcategoryname] = [];
          }

          groupedData[data.categoryname][data.subcategoryname].push(data);
        });

        const needData: any[] = [];

        Object.keys(groupedData).forEach(category => {
          const categoryData = groupedData[category];
          const categoryItem: any = {
            _id: categoryData[Object.keys(categoryData)[0]][0]._id,
            name: categoryData[Object.keys(categoryData)[0]][0].name,
            categoryname: categoryData[Object.keys(categoryData)[0]][0].categoryname,
            subcategoryname: Object.keys(categoryData)[0],
            children: [],
          };

          Object.keys(categoryData).forEach(subcategory => {
            const subcategoryData = categoryData[subcategory];
            const subcategoryItem: any = {
              _id: subcategoryData[0]._id,
              name: subcategoryData[0].name,
              categoryname: subcategoryData[0].categoryname,
              subcategoryname: subcategory,
              children: subcategoryData,
            };
            categoryItem.children?.push(subcategoryItem);
          });

          needData.push(categoryItem);
        });

        console.log(needData);


        this.groupedData = needData;
        // this.groupedData = this.transformCategoryChildren(data);
      }
    })
  }
  // addNodes(item: any, group: any) {
  //   debugger
  //   let templateData = JSON.parse(item.data);
  //   if (templateData?.[0]) {
  //     const checkPage = templateData.find((a: any) => a.type === 'page');
  //     const checkSection = templateData.find((a: any) => a.type === 'sections');
  //     if (checkPage) {
  //       this.nodesData = templateData;
  //       this.toastr.success(group?.categoryname + ' added successfully', { nzDuration: 3000 })

  //     }
  //     else if (checkSection) {
  //       templateData.forEach((element: any) => {
  //         this.nodesData[0].children[1].children.push(element);
  //       });
  //       this.toastr.success(group?.categoryname + ' added successfully', { nzDuration: 3000 })
  //     }
  //   }
  //   // if(group?.categoryname ==='Block'){
  //   //   templateData.forEach((element:any) => {
  //   //     this.nodesData[0].children[1].children.push(element);
  //   //   });
  //   // }
  //   // else
  //   // {
  //   //   this.nodesData = templateData;
  //   //   this.toastr.success(group?.category + ' added successfully', { nzDuration: 3000 })
  //   // }
  // }
  addNodes(data: any) {
    debugger
    this.requestSubscription = this.applicationService.getNestCommonAPIById('market-place', data._id).subscribe({
      next: (res: any) => {
        if (res) {
          if (res.data.length > 0) {
            let templateData = JSON.parse(res.data);
            if (templateData?.[0]) {
              const checkPage = templateData.find((a: any) => a.type === 'page');
              const checkSection = templateData.find((a: any) => a.type === 'sections');
              if (checkPage) {
                this.nodesData = templateData;
                this.toastr.success(data?.categoryname + ' added successfully', { nzDuration: 3000 })
              }
            } 
            else {
              this.nodesData[0].children[1].children.push(templateData);
              this.toastr.success(data?.subcategoryname + ' added successfully', { nzDuration: 3000 })
            }
          }
        }
      }, error: (err: any) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserAssignTask : An error occurred`, { nzDuration: 3000 });
      }
    })
  }
  close() {
    this.drawerRef.close(this.nodesData);
  }
  cancel() {
    this.drawerRef.close();
  }

  transformData(sample: any): any {
    const expectedData: any = [];

    sample.forEach((item: any) => {
      const existingCategory = expectedData.find((category: any) => category.categoryname === item.categoryname);
      if (existingCategory) {
        const existingSubcategory = existingCategory.children?.find((subcategory: any) => subcategory.subcategoryname === item.subcategoryname);
        if (existingSubcategory) {
          existingSubcategory.children?.push(item);
        } else {
          existingCategory.children?.push({
            ...item,
            children: [item]
          });
        }
      } else {
        expectedData.push({
          ...item,
          children: [item]
        });
      }
    });

    return expectedData;
  }




}
