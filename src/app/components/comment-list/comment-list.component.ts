import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';

@Component({
  selector: 'st-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  onCardHover: boolean = false;
  constructor(public dataSharedService: DataSharedService, private router: Router,
    private modalService: NzModalService, private viewContainerRef: ViewContainerRef,) { }

  ngOnInit(): void {

  }
  gotoPages(item: any) {
    const queryParams = { screenName: item.screenId, commentId: item.id };
    this.router.navigate(['/pages/', item.screenId, item.id])
  }
  edit(data: any) {
    const modal = this.modalService.create<CommentModalComponent>({
      nzTitle: 'Comment',
      nzContent: CommentModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data: data,
        screenName: data.screenId,
        update: data,
      },
      nzFooter: []
    });
    modal.afterClose.subscribe((res: any) => {
      if (res) {
        
      }
    });
  }


}
