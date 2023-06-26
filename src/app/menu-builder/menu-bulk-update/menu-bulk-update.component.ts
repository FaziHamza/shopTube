import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'st-menu-bulk-update',
  templateUrl: './menu-bulk-update.component.html',
  styleUrls: ['./menu-bulk-update.component.scss']
})
export class MenuBulkUpdateComponent implements OnInit {
  @Input() nodes: any;
  tabelNodes: any[] = [];
  constructor(private drawerRef: NzDrawerRef<any>) { }

  ngOnInit(): void {
    this.makeGridData()
  }
  makeGridData() {
    this.tabelNodes = this.generateTableNodesExpand(this.nodes);
    // this.tabelNodes = this.generateTableNodes(this.nodes);
    // let tableData = this.nodes;
    // tableData.forEach((element: any, index: any) => {
    //   let sectionObj = {
    //     id: element.id,
    //     link: element.link,
    //     title: element.title,
    //     isTitle: element.isTitle,
    //     icon: element.icon,
    //     children: [],
    //     expand: false,
    //   }
    //   this.tabelNodes.push(sectionObj);
    //   element.children.forEach((forms: any,innerIndex:any) => {
    //     if (forms.type == 'mainTab') {
    //       forms.children.forEach((tab: any,tabIndex:any)=>{
    //         const obj = {
    //           id: tab.id,
    //           link: tab.link,
    //           title: tab.title,
    //           icon: tab.icon,
    //           tabexpand: false,
    //         }
    //         this.tabelNodes[index].children.push(obj);
    //         tab.children.forEach((sub:any)=>{
    //           this.tabelNodes[index].children[tabIndex]['children'] = [];
    //           const obj = {
    //             id: sub.id,
    //             link: sub.link,
    //             title: sub.title,
    //             icon: sub.icon,
    //           }
    //           this.tabelNodes[index].children[tabIndex].children.push(obj);
    //         })
    //       });
    //     }
    //     else {
    //       const obj = {
    //         id: forms.id,
    //         link: forms.link,
    //         title: forms.title,
    //         icon: forms.icon,
    //       }
    //       this.tabelNodes[index].children.push(obj);
    //     }

    //   });
    // });
  }
  generateTableNodesExpand(data: any[]): any[] {
    return data.map((element: any) => {
      element['expand'] = false;

      if (element.children && element.children.length > 0) {
        element.children = this.generateTableNodesExpand(element.children);
      }
      return element;
    });
  }


  close() {
    this.drawerRef.close(this.nodes);
  }


  save() {
    this.concatePages(this.tabelNodes);
    this.nodes = this.tabelNodes;
    // this.tabelNodes.forEach((element, index) => {
    //   this.nodes[index].title = element.title;
    //   this.nodes[index].link = element.link;
    //   this.nodes[index].isTitle = element.isTitle;
    //   this.nodes[index].icon = element.icon;
    //   if (!element.link.includes("pages") && element.link != '')
    //     this.nodes[index].link = "/pages/" + element.link;
    //   else
    //     this.nodes[index].link = element.link;

    //   element.children.forEach((body: any, innerIndex: any) => {
    //     this.nodes[index].children[innerIndex].title = body.title;
    //     this.nodes[index].children[innerIndex].icon = body.icon;
    //     this.nodes[index].children[innerIndex].key = body.key;
    //     if (!element.link.includes("pages") && element.link != '')
    //       this.nodes[index].children[innerIndex].link = "/pages/" + element.link;
    //     else
    //       this.nodes[index].children[innerIndex].link = element.link;
    //   });
    // });
    this.drawerRef.close(this.nodes);
  }
  // concatePages(data: any[]): any[] {
  //   return data.map((element: any) => {
  //     element['expand'] = false;

  //     if (element.children && element.children.length > 0) {
  //       element.children = this.generateTableNodesExpand(element.children);
  //     }
  //     return element;
  //   });
  // }

  concatePages(data: any) {
    data.forEach((element: any) => {
      if (element.link) {
        if (!element.link.includes("/pages/") && element.link !== '') {
          element.link = "/pages/" + element.link;
        }
      }
      if (element.children && element.children.length > 0) {
        this.concatePages(element.children);
      }
    });
  }
  

}
