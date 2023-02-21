import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-affix',
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.scss']
})
export class AffixComponent implements OnInit {
  @Input() affixData : any;
  offsetTop = 10;
  nzOffsetBottom = 0;

  setOffsetTop(): void {
    this.offsetTop += 10;
  }

  setOffsetBottom(): void {
    this.nzOffsetBottom += 10;
  }
  constructor() { }

  ngOnInit(): void {
    this.offsetTop = this.affixData.affixTop;
  }

}
