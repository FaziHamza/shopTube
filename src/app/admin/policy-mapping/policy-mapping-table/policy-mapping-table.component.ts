import { Component, Input } from '@angular/core';

@Component({
  selector: 'st-policy-mapping-table',
  templateUrl: './policy-mapping-table.component.html',
  styleUrls: ['./policy-mapping-table.component.scss']
})
export class PolicyMappingTableComponent {
  @Input() menuOfDisplayData: any;
  @Input() loading: any;
  @Input() pageSize: any;
  @Input() listOfColumns: any;
  @Input() startIndex: any;
  @Input() data: any[] = [];

  ngOnInit(): void {
    const checkMenu = this.data?.find((a: any) => a.sqlType == "sql");
    if(checkMenu){
      this.listOfColumns = this.actionColumns;
    }
  }

  actionColumns = [
    { name: '', dataField: 'expand' },
    {
      name: 'Action Name', dataField: 'quryType'
    },
    {
      name: 'Is Allow', dataField: 'isAllow'
    }
  ];

}
