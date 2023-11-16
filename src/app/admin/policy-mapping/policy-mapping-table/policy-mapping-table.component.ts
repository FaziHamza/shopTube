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
  @Input() data: any;

  search(event: any, column: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.data = this.menuOfDisplayData.filter((item: any) => {
        const { key } = column;
        const { [key]: itemName } = item || {}; // Check if item is undefined, set to empty object if so
        return itemName?.toLowerCase()?.includes(inputValue); // Check if itemName is undefined or null
      });
    } else {
      this.data = this.menuOfDisplayData;
    }
  }
}



