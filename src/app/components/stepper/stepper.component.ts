import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  current = 0;
  tttt: any;
  @Input() step: any;


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
    this.tttt = this.step.stepperType

  }

}
