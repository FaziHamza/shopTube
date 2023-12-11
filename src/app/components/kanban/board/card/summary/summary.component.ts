import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../../model/card/card.model';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-card-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() kanbanData: any;
  @Input() screenName: any;
  @Input() screenId: any;
  @Input() card: Card;
  @Input() listIndex: number;
  @Input() cardIndex: number;
  @Output() taskEditEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskDeleteEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dataSharedService: DataSharedService,) { }

  ngOnInit() {

  }

  identifyCardBeingDragged(dragEvent: DragEvent) {
    if (dragEvent.dataTransfer) {
      dragEvent.dataTransfer.effectAllowed = 'move'
      dragEvent.dataTransfer.dropEffect = 'move'
      const transferObject = {
        'listIndex': this.listIndex,
        'cardIndex': this.cardIndex
      };
      dragEvent.dataTransfer.setData('text', JSON.stringify(transferObject));
    }

  }

  allowCardDragToBeDropped(dragEvent: DragEvent) {
    if (dragEvent.dataTransfer)
      dragEvent.dataTransfer.dropEffect = 'move'
    dragEvent.preventDefault();
  }
  edit(item: any) {
    this.taskEditEmit.emit(item?.dataObj)
  }
  delete(item: any) {
    this.taskDeleteEmit.emit(item?.dataObj)
  }
  
}
