import { Component, Input } from '@angular/core';

@Component({
  selector: 'st-policy-mapping-table',
  templateUrl: './policy-mapping-table.component.html',
  styleUrls: ['./policy-mapping-table.component.scss']
})
export class PolicyMappingTableComponent {
@Input() menuOfDisplayData:any;
@Input() loading:any;
@Input() pageSize:any;
@Input() listOfColumns:any;
@Input() startIndex:any;
@Input() data:any;
}
