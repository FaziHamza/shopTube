import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'st-parent-calendar',
  templateUrl: './parent-calendar.component.html',
  styleUrls: ['./parent-calendar.component.scss']
})
export class ParentCalendarComponent {
  @Input() item: any;
  dataGet = false
  constructor(private changeDetector: ChangeDetectorRef) {
    this.processData = this.processData.bind(this);
  }
  ngOnInit() {
    this.dataGet =  false;
  }
  processData(data: any[]) {
    
    this.dataGet = false;
    if (data.length > 0) {
      this.item.options = [];
      data.forEach((element, index) => {
        let event = {
          "id": index + 1, // Increment the index to start from 1
          "title": element.message,
          "start": this.extractDate(element.datetime),
          "backgroundColor": "#fbe0e0",
          "textColor": "#ea5455",
          "color": "#EF6C00",
          "borderColor": "#ea5455"
        };
        this.item.options.push(event);
      });
      let newData = JSON.parse(JSON.stringify(this.item.options));
      this.item.options = JSON.parse(JSON.stringify(newData));
      let newItem = JSON.parse(JSON.stringify(this.item));
      this.item = JSON.parse(JSON.stringify(newItem));
    }
    this.dataGet = true;
    this.changeDetector.detectChanges();
    return data
  }
  extractDate(date: any) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Add 1 to the month because it's zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

