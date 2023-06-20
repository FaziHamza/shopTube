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
    let tableData = this.nodes;
    tableData.forEach((element: any, index: any) => {
      let sectionObj = {
        id: element.id,
        link: element.link,
        title: element.title,
        isTitle: element.isTitle,
        icon: element.icon,
        children: [],
        expand: false,
      }
      this.tabelNodes.push(sectionObj);
      element.children.forEach((forms: any) => {
        let obj = {
          id: forms.id,
          link: forms.link,
          title: forms.title,
          icon: forms.icon,
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
      this.nodes[index].title = element.title;
      this.nodes[index].link = element.link;
      this.nodes[index].isTitle = element.isTitle;
      this.nodes[index].icon = element.icon;
      if (!element.link.includes("pages") && element.link != '')
        this.nodes[index].link = "/pages/" + element.link;
      else
        this.nodes[index].link = element.link;

      element.children.forEach((body: any, innerIndex: any) => {
        this.nodes[index].children[innerIndex].title = body.title;
        this.nodes[index].children[innerIndex].icon = body.icon;
        this.nodes[index].children[innerIndex].key = body.key;
        if (!element.link.includes("pages") && element.link != '')
          this.nodes[index].children[innerIndex].link = "/pages/" + element.link;
        else
          this.nodes[index].children[innerIndex].link = element.link;
      });
    });
    this.drawerRef.close(this.nodes);
  }

}
