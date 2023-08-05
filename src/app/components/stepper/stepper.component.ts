import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'st-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() step: any;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  current = 0;
  ngOnInt(){

    this.step;
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }



  handleIndexChange(event: any) {
    console.log("step click");
  }
  constructor() { }

  ngOnInit(): void {
    this.current = 0;

  }

}
