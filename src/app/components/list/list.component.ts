import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<any> = [];
  constructor(private http: HttpClient, private msg: NzMessageService) { }
  @Input() listData: any;
  ngOnInit(): void {
    this.listData;
    debugger
    this.data = this.listData.listData;
    this.list = this.listData.listData;
    this.initLoading = false;
  }
  onLoadMore(): void {
    this.loadingMore = true;
    this.data = this.data.concat(this.listData.listData);
    this.list = [...this.data];
    this.loadingMore = false;
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }
}
