import { Component, Input, OnInit } from '@angular/core';
import { List, ListInterface } from '../../model/list/list.model';
import { MovementIntf } from '../../model/card/movement';
import { BoardModel } from '../../model/board/board.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() kanbanData: any;
  lists: ListInterface[];

  constructor(private toastr: NzMessageService,) {
    this.processData = this.processData.bind(this);
  }

  ngOnInit() {

    this.lists = this.kanbanData.kanbanSave;
  }

  addList() {
    debugger
    if (this.lists === undefined) {
      this.lists = [];
    }
    const newList: ListInterface = new List();
    // newList.position = this.lists.length + 1;
    // newList.name = `List (${newList.position})`;

    this.lists.push(newList);
    this.toastr.success('Board add!', { nzDuration: 3000 });
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    const cardMoved = this.kanbanData.children[movementInformation.fromListIdx].children.splice(movementInformation.fromCardIdx ?? 0, 1);
    this.kanbanData.children[movementInformation.toListIdx].children.splice(movementInformation?.toCardIdx ?? 0, 0, ...cardMoved);
  }

  saveBoard() {
    // const boardModel = new BoardModel();
    this.kanbanData.kanbanSave = this.lists;
    this.toastr.success('Save successfully!', { nzDuration: 3000 });
    // this.localService.saveBoard(boardModel);
  }

  deleteList(listIndex: number) {
    this.lists.splice(listIndex, 1);
    this.toastr.error('Delete !', { nzDuration: 3000 });

  }

  processData(data: any[]) {
    console.log("kanban Work")
    return data
  }

}
