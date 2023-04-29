import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-accordion-button',
  templateUrl: './accordion-button.component.html',
  styleUrls: ['./accordion-button.component.scss']
})
export class AccordionButtonComponent implements OnInit {
  @Input() accordionData: any;
  @Input() dataModel !: any;
  expandIconPosition: any = "left";

  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
  }
  form = new FormGroup({});
  submit() {
    // this.commonChartService.submit();
    this.cd.detectChanges();
  }
  handleIndexChange(e: number): void {
    console.log(e);
  }
  onClose(): void {
    console.log('tag was closed.');
  }
}
