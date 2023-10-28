import { Component, Input } from '@angular/core';

@Component({
  selector: 'st-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  @Input() model :any;
}
