import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  onCardHover: boolean = false;
  constructor(public dataSharedService: DataSharedService,private router:Router) { }

  ngOnInit(): void {

  }
  gotoPages(item:any){
    debugger
    const queryParams = { screenName: item.screenId, commentId: item.id };
    this.router.navigate(['/pages/',item.screenId,item.id])
  }
}
