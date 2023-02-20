import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accordion-button',
  templateUrl: './accordion-button.component.html',
  styleUrls: ['./accordion-button.component.scss']
})
export class AccordionButtonComponent implements OnInit {
  @Input() accordionData: any;
  @Input() dataModel !: any;
  expandIconPosition : any = "left";
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    
    this.accordionData;
  }
  form = new FormGroup({});
  submit() {
    // this.commonChartService.submit();
    this.cd.detectChanges();
  }

  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];

}
