import { Component } from '@angular/core';

@Component({
  selector: 'st-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  groups: string[] = ['Group1', 'Group2', 'Group3']; // Replace with actual group data

  constructor() {}

  ngOnInit(): void {}
}
