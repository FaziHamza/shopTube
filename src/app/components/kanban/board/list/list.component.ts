import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ListInterface } from '../../model/list/list.model';
import { Movement, MovementIntf } from '../../model/card/movement';
import { Card, CardInterface } from '../../model/card/card.model';
import { DOCUMENT } from '@angular/common';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-lists',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListsComponent implements OnInit {
  @Input() kanban: any;
  @Input() mappingId: any;
  @Input() screenLink: any;
  @Input() list: any;
  @Input() listIndex: number;
  @Output() moveCardAcrossList: EventEmitter<MovementIntf> = new EventEmitter<MovementIntf>();
  @Output() newCardAdded: EventEmitter<Card> = new EventEmitter<CardInterface>();
  @Output() deleteList: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskSubmitEmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() screenId: any;
  loader: boolean = false;
  isVisible = false;

  private cardCount = 0;

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document,
    private applicationService: ApplicationService, public dataSharedService: DataSharedService,
    private toastr: NzMessageService,) { }

  ngOnInit() {
  }

  addNewCard() {
    const card = new Card(this.cardCount++ + '', 'header ' + this.cardCount, 'summary ' + this.cardCount, 'sample desc');
    this.list['cards'] = [];
    this.list.cards.push(card);
    this.newCardAdded.emit(card);
  }


  allowCardReplacement(dragEvent: DragEvent) {
    if (dragEvent.dataTransfer)
      dragEvent.dataTransfer.dropEffect = 'move';
    dragEvent.preventDefault();
  }

  delete() {
    this.deleteList.emit(this.listIndex);

  }


  dropCard(dragEvent: DragEvent) {

    if (dragEvent.dataTransfer) {
      const data = JSON.parse(dragEvent.dataTransfer.getData('text'));
      const elements: Element[] = this.document.elementsFromPoint(dragEvent.x, dragEvent.y);
      const cardElementBeingDroppedOn = elements.find(x => x.tagName.toLowerCase() === 'st-card-summary');
      const listElementBeingDroppedOn = elements.find(x => x.tagName.toLowerCase() === 'st-lists');
      if (listElementBeingDroppedOn && listElementBeingDroppedOn.getAttribute('listIndex')) {
        const listIndexDroppedOn = parseInt(listElementBeingDroppedOn.getAttribute('listIndex') ?? '', 10);
        const cardIndexDroppedOn = cardElementBeingDroppedOn === undefined ? undefined :
          parseInt(cardElementBeingDroppedOn.getAttribute('cardIndex') ?? '', 10);
        const listIndexDragged = parseInt(data.listIndex, 10);
        const cardIndexDragged = parseInt(data.cardIndex, 10);

        if (listIndexDragged === listIndexDroppedOn) {
          // same list just re-organize the cards
          const cardDragged = this.list.cards.splice(cardIndexDragged, 1);
          if (cardIndexDroppedOn)
            this.list.cards.splice(cardIndexDroppedOn, 0, ...cardDragged);
        } else {
          this.moveCardAcrossList.emit(new Movement(listIndexDragged, listIndexDroppedOn, cardIndexDragged, cardIndexDroppedOn));
        }
      }

    }
  }
  requestSubscription: Subscription;
  responseData: any;
  nodes: any[] = [];
  openDrawer() {
    if (this.screenLink) {
      this.isVisible = true;
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', this.screenLink).subscribe({
        next: (res: any) => {
          try {
            if (res.isSuccess) {
              if (res.data.length > 0) {

                // if (this.dataSharedService.drawerIdList) {
                //   // for (const key in this.dataSharedService.drawerIdList) {
                //   //   this.dataSharedService.drawerIdList[key] = false;
                //   // }
                //   // this.dataSharedService.drawerIdList[this.tableRowId] = true;
                //   this.dataSharedService.drawerIdList[this.tableRowId] = true;
                // } else {
                //   this.dataSharedService.drawerIdList = {};
                //   this.dataSharedService.drawerIdList[this.tableRowId] = true;
                // }
                this.screenId = res.data[0].screenBuilderId;
                const data = JSON.parse(res.data[0].screenData);
                this.responseData = data;
                res.data[0].screenData = this.applicationService.jsonParseWithObject(this.applicationService.jsonStringifyWithObject(this.responseData));
                this.nodes = [];
                this.nodes.push(res);

              }
              this.loader = false;
            } else {
              this.toastr.error(res.message, { nzDuration: 3000 });
              this.loader = false;
            }
          } catch (err) {
            this.loader = false;
            this.toastr.warning('An error occurred: ' + err, { nzDuration: 3000 });
            console.error(err); // Log the error to the console
          }
        },
        error: (err) => {
          this.loader = false;
          this.toastr.warning('Required Href ' + err, { nzDuration: 3000 });
          console.error(err); // Log the error to the console
        }
      });
    } else {
      this.toastr.error("Screen Link is not found please provide screen link first", { nzDuration: 3000 });
    }
  }
  handleClose(): void {
    this.isVisible = false;
    this.dataSharedService.drawerVisible = false;
    if (this.dataSharedService.isSaveData)
      this.taskSubmitEmit.emit(true)
  }

}
