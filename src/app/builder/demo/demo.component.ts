import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  constructor() { }

  send(form: any): void {
    // Validate reCAPTCHA here
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      // reCAPTCHA validation failed
      return;
    }

    // Perform your form submission logic here
    console.log('Form submitted');
  }

}


