import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() mainData: any = [];
  @Input() dataModel !: any;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    debugger
    this.mainData = this.mainData[0];
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


}
