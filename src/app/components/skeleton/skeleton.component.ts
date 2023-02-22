import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  @Input() skeltonData: any;
  constructor() { }

  ngOnInit(): void {
    this.skeltonData;
  }

}
