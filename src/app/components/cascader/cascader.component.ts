import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-cascader',
  templateUrl: './cascader.component.html',
  styleUrls: ['./cascader.component.scss']
})
export class CascaderComponent implements OnInit {
  @Input() cascaderData : any;
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  // changeNzOptions(): void {
  //   if (this.nzOptions === options) {
  //     this.nzOptions = otherOptions;
  //   } else {
  //     this.nzOptions = options;
  //   }
  // }

  onChanges(values: any): void {
    console.log(values, this.values);
  }

}


