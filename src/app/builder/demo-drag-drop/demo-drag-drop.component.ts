import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import 'monaco-editor';
import { DemoService } from '../service/demo.service';

@Component({
  selector: 'st-demo-drag-drop',
  templateUrl: './demo-drag-drop.component.html',
  styleUrls: ['./demo-drag-drop.component.scss'],
})
export class DemoDragDropComponent implements OnInit {

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  topicList: any = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private demoService: DemoService) { }

  ngOnInit() {
    this.getTopicsData();
  }

  getTopicsData() {
    this.demoService.getTopicData().subscribe((res: any) => {
      console.log(res);
      this.topicList = res.MenuItems;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.topicList, event.previousIndex, event.currentIndex);
  }
}
