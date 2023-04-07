import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-validation-rule',
  templateUrl: './validation-rule.component.html',
  styleUrls: ['./validation-rule.component.scss']
})
export class ValidationRuleComponent implements OnInit {
  @Input() configurationData:any;
  constructor() { }

  ngOnInit(): void {
  }

}
