import { Component, Input } from '@angular/core';

import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Input() treeListData: any;

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}