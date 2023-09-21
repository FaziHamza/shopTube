import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ListInterface } from '../../model/list/list.model';
import { Movement, MovementIntf } from '../../model/card/movement';
import { Card, CardInterface } from '../../model/card/card.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'st-lists',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListsComponent implements OnInit {
  @Input() kanban : any;
  @Input() list: any;
  @Input() listIndex: number;
  @Output() moveCardAcrossList: EventEmitter<MovementIntf> = new EventEmitter<MovementIntf>();
  @Output() newCardAdded: EventEmitter<Card> = new EventEmitter<CardInterface>();
  @Output() deleteList: EventEmitter<number> = new EventEmitter<number>();
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() screenId: any;

  private cardCount = 0;

  constructor(private elementRef: ElementRef , @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {

  }

  addNewCard() {
    const card = new Card(this.cardCount++ + '', 'header ' + this.cardCount, 'summary ' + this.cardCount, 'sample desc');
    this.list['cards'] = [];
    this.list.cards.push(card);
    this.newCardAdded.emit(card);
  }


  allowCardReplacement(dragEvent: DragEvent) {
    if(dragEvent.dataTransfer)
    dragEvent.dataTransfer.dropEffect = 'move';
    dragEvent.preventDefault();
  }

  delete(){
    this.deleteList.emit(this.listIndex);

  }


  dropCard(dragEvent: DragEvent) {
    
    if(dragEvent.dataTransfer){
      const data = JSON.parse(dragEvent.dataTransfer.getData('text'));
      const elements: Element[] = this.document.elementsFromPoint(dragEvent.x, dragEvent.y);
      const cardElementBeingDroppedOn = elements.find( x => x.tagName.toLowerCase() === 'st-card-summary');
      const listElementBeingDroppedOn = elements.find( x => x.tagName.toLowerCase() === 'st-lists');
      if(listElementBeingDroppedOn && listElementBeingDroppedOn.getAttribute('listIndex')){
        const listIndexDroppedOn = parseInt(listElementBeingDroppedOn.getAttribute('listIndex') ?? '', 10);
        const cardIndexDroppedOn  = cardElementBeingDroppedOn === undefined ? undefined :
              parseInt(cardElementBeingDroppedOn.getAttribute('cardIndex') ?? '', 10);
        const listIndexDragged = parseInt(data.listIndex, 10);
        const cardIndexDragged = parseInt(data.cardIndex, 10);

        if (listIndexDragged === listIndexDroppedOn) {
            // same list just re-organize the cards
            const cardDragged = this.list.cards.splice(cardIndexDragged,1);
            if(cardIndexDroppedOn)
            this.list.cards.splice(cardIndexDroppedOn , 0 , ...cardDragged);
        } else {
          this.moveCardAcrossList.emit(new Movement(listIndexDragged, listIndexDroppedOn , cardIndexDragged , cardIndexDroppedOn));
        }
      }

    }
  }



}
