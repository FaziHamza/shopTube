import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  initLoading = true; // bug
  data: any[] = [];
  list: Array<any> = [];
  constructor(private http: HttpClient, private msg: NzMessageService) { }
  @Input() listData: any;
  ngOnInit(): void {
    this.listData;

    this.data = this.listData.options;
    this.list = this.listData.options;
    this.initLoading = false;
  }
  onLoadMore(): void {
    this.listData.isLoad = true;
    this.data = this.data.concat(this.listData.options);
    this.list = [...this.data];
    this.listData.isLoad = false;
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }
}
