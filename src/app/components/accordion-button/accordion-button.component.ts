import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-accordion-button',
  templateUrl: './accordion-button.component.html',
  styleUrls: ['./accordion-button.component.scss']
})
export class AccordionButtonComponent implements OnInit {
  @Input() accordionData: any;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  expandIconPosition: any = "left";
  expand: any = false;
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
  }
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
  accordionCollapse(){
    debugger
    this.expand = !this.expand;
  }
}
