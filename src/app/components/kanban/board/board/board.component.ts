import { Component, OnInit } from '@angular/core';
import { List, ListInterface } from '../../model/list/list.model';
import { MovementIntf } from '../../model/card/movement';
import { BoardModel } from '../../model/board/board.model';

@Component({
  selector: 'st-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  lists: ListInterface[];

  constructor() { }

  ngOnInit() {

    // const board = this.localService.getBoard();
    this.lists =  [];

    // ideally retrive and initialize from some storage.

  }

  addList() {
    const newList: ListInterface = new List();
    newList.position = this.lists.length + 1;
    newList.name = `List #${newList.position}`;
    if (this.lists === undefined) {
      this.lists = [];
    }
    this.lists.push(newList);
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx ?? 0 , 1);
    this.lists[movementInformation.toListIdx].cards.splice(movementInformation?.toCardIdx ?? 0 , 0 , ...cardMoved);
  }

  saveBoard() {
    const boardModel = new BoardModel();
    boardModel.lists = this.lists;
    // this.localService.saveBoard(boardModel);
  }

  deleteList(listIndex: number){
      this.lists.splice(listIndex,1);
  }
}
