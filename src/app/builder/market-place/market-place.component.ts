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
  marketPlaceList: any[];
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
    
    this.saveLoader = true;
    this.applicationService.getNestCommonAPI('market-place').subscribe(res => {
      this.saveLoader = false;
      if (res.isSuccess) {

        const expectedData: any = [];
        console.log(JSON.stringify(res.data))
        res.data.forEach((data: any) => {
          const categoryIndex = expectedData.findIndex((item: any) => item._id === data.categoryDetails[0]._id);
          if (categoryIndex === -1) {
            expectedData.push({
              ...data.categoryDetails[0],
              children: [{
                ...data.subcategoryDetails[0],
                children: [data],
              }],
            });
          } else {
            const subcategoryIndex = expectedData[categoryIndex].children.findIndex((item: any) => item._id === data.subcategoryDetails?.[0]?._id);
            if (subcategoryIndex === -1) {
              expectedData[categoryIndex].children.push({
                ...data.subcategoryDetails[0],
                children: [data],
              });
            } else {
              expectedData[categoryIndex].children[subcategoryIndex].children.push(data);
            }
          }
        });
        this.groupedData = expectedData;
        this.marketPlaceList = expectedData;
        // console.log(JSON.stringify(this.groupedData));
        // this.groupedData = this.transformCategoryChildren(data);
      }
    })
  }
  filterNestedData(data: any[], searchTerm: string): any[] {
    const filteredData = [];

    for (const item of data) {
      const matchingChildren = item.children ? this.filterNestedData(item.children, searchTerm) : [];
      const matchesSearch = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (matchesSearch || matchingChildren.length > 0) {
        const newItem = { ...item };
        if (matchingChildren.length > 0) {
          newItem.children = matchingChildren;
        }
        filteredData.push(newItem);
      }
    }

    return filteredData;
  }

  filterData(search:any){
    this.groupedData = this.filterNestedData(JSON.parse(JSON.stringify(this.marketPlaceList)),search.target.value);
  }
  reset(){
    this.groupedData = this.marketPlaceList;
  }
  // Example usage
  // const searchTerm = "Academy";
  // const filteredResult = filterNestedData(sampleData, searchTerm);
  // console.log(filteredResult);

  // addNodes(item: any, group: any) {
  //   
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
                this.toastr.success(data?.name + ' added successfully', { nzDuration: 3000 })
              }
            }
            else {
              this.nodesData[0].children[1].children.push(templateData);
              this.toastr.success(data?.name + ' added successfully', { nzDuration: 3000 })
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
