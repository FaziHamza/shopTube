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
  expandIconPosition: any = "left";
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    
    this.accordionData;
    this.accordionData[0].accordionChild.forEach((a: any) => {
      if (a.formlyType) {
        if (a.formlyType == "input") {
          a.chartCardConfig[0].formly[0].fieldGroup.forEach((b: any) => {
            if (b.wrappers.length > 1) {
              b.wrappers.splice(1, 1);
            }
          });
        }
      }
    });
  }
  form = new FormGroup({});
  submit() {
    // this.commonChartService.submit();
    this.cd.detectChanges();
  }
}
