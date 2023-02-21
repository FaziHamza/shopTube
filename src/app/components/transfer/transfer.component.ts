import { Component, Input, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @Input() transferData : any;
  list: TransferItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}


