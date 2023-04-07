import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, Input } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

interface TreeNode {
  name: string;
  disabled?: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'st-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Input() treeListData: any;

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // private transformer = (node: TreeNode, level: number): FlatNode => ({
  //   expandable: !!node.children && node.children.length > 0,
  //   name: node.name,
  //   level,
  //   disabled: !!node.disabled
  // });

  // selectListSelection = new SelectionModel<FlatNode>(true);

  // // treeControl = new TreeControl<any>(
  // //   node => node.level,
  // //   node => node.expandable,
  // // );

  // treeFlattener = new NzTreeFlattener(
  //   this.transformer,
  //   node => node.level,
  //   node => node.expandable,
  //   node => node.children
  // );
  // dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // constructor(private treeControl: TreeControl<FlatNode>) {
  //   this.dataSource.setData(this.treeListData);
  //   this.treeControl.expandAll();
  //   this.treeControl.dataNodes.forEach(node => this.selectListSelection.select(node));
  // }

  // hasChild = (_: number, node: FlatNode): boolean => node.expandable;

}
