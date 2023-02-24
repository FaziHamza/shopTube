import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mention',
  templateUrl: './mention.component.html',
  styleUrls: ['./mention.component.scss']
})
export class MentionComponent implements OnInit {
  @Input() mentionData: any;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: string): void {
    console.log(value);
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
}
