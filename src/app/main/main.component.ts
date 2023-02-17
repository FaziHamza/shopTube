import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() mainData: any = [];
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  constructor() { }

  ngOnInit(): void {
    debugger
    this.mainData;
  }

}
