import { Component, Input, OnInit } from '@angular/core';

import { formatDistance } from 'date-fns';

@Component({
  selector: 'st-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentData: any;
  data: any[] = [];
  submitting = false;
  inputValue = '';
  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.data = [
      ...this.data,
      {
        content,
        datetime: new Date(),
        displayTime: formatDistance(new Date(), new Date())
      }
    ].map(e => ({
      ...e,
      displayTime: formatDistance(new Date(), e.datetime)
    }));
    this.submitting = false;
  }
  constructor() { }

  ngOnInit(): void {

    this.commentData;
  }

}
