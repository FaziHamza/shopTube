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
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() screenId: any;

  constructor(private toastr: NzMessageService) {
    this.processData = this.processData.bind(this);
  }

  ngOnInit() {
    debugger
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
    let status = [
      "open", "closed", "inprogress", "backlog"
    ]
    data = [
      {
        "id": 545,
        "screenid": "",
        "datetime": "2023-09-27T16:11",
        "message": "rtyg4",
        "status": "open"
      },
      {
        "id": 544,
        "screenid": "",
        "datetime": "1970-05-03T09:15",
        "message": "This is message",
        "status": "closed"
      },
      {
        "id": 544,
        "screenid": "",
        "datetime": "1970-05-03T09:15",
        "message": "This is message",
        "status": "inprogress"
      },
    ]


    let statusObject: any = {};

    // Initialize the object with empty arrays for each status
    status.forEach(statusValue => {
      statusObject[statusValue] = [];
    });

    // Populate the arrays based on the status
    data.forEach(item => {
      const itemStatus = item.status;
      if (statusObject.hasOwnProperty(itemStatus)) {
        statusObject[itemStatus].push(item);
      }
    });

    // // Access the arrays based on status
    // console.log(statusObject["open"]); // Array of objects with status "open"
    // console.log(statusObject["closed"]); // Array of objects with status "closed"
    // console.log(statusObject["inprogress"]); // Array of objects with status "inprogress"
    // console.log(statusObject["backlog"]); // Array of objects with status "backlog"
    this.kanbanData.children = [this.kanbanData.children[0]];
    this.kanbanData.children
    console.log("kanban Work")
    return data
  }

}
