import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Guid } from 'src/app/models/guid';

@Component({
  selector: 'st-menu-bulk-update',
  templateUrl: './menu-bulk-update.component.html',
  styleUrls: ['./menu-bulk-update.component.scss']
})
export class MenuBulkUpdateComponent implements OnInit {
  @Input() nodes: any;
  tabelNodes: any[] = [];
  constructor(private drawerRef: NzDrawerRef<any>, private toastr: NzMessageService) { }

  ngOnInit(): void {
    this.makeGridData();
  }
  makeGridData() {
    this.tabelNodes = this.generateTableNodesExpand(this.nodes);
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
    this.drawerRef.close(this.nodes);
  }
  concatePages(data: any) {
    data.forEach((element: any) => {
      if (element.link) {
        if (!element.link.includes("/pages/") && element.link !== '') {
          if (!element.link.includes("#")) {
            element.link = "/pages/" + element.link;
          }
        }
      }
      if (element.children && element.children.length > 0) {
        this.concatePages(element.children);
      }
    });
  }
  addMenu() {
    
    const newNode = {
      id: 'Menu_' + Guid.newGuid(),
      key: 'menu_' + Guid.newGuid(),
      title: 'Menu_' + (this.nodes.length + 1),
      link: '',
      icon: "appstore",
      type: "input",
      isTitle: false,
      expanded: true,
      iconType: "outline",
      iconSize: "15",
      iconColor: "",
      children: [
      ],
    } as any;
    if (this.nodes.length > 0) {
      this.nodes.push(newNode);
      this.makeGridData();
      this.toastr.success('Menu add successfully!', { nzDuration: 3000 });
    }
  }

}
