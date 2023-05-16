import { Component, OnInit } from '@angular/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  onCardHover: boolean = false;
  constructor(public dataSharedService: DataSharedService,) { }

  ngOnInit(): void {
    debugger
  }

}
