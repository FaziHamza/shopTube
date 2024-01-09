import { Component, ElementRef, VERSION, ViewChild, OnInit } from "@angular/core";
import SignaturePad from "signature_pad";
import { ApplicationService } from "src/app/services/application.service";
import { DataSharedService } from "src/app/services/data-shared.service";
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Console } from "console";

@Component({
  selector: 'st-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent extends FieldType<FieldTypeConfig> {
  constructor(private sharedService: DataSharedService, private applicationService: ApplicationService) {
    super();
  }

  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  sig: SignaturePad;

  ngOnInit() {
    this.sig = new SignaturePad(this.canvas.nativeElement);
    if(this.field.formControl.value){
      this.sig.fromDataURL(this.field.formControl.value)
    }

  }

  clear() {
    this.sig.clear();
  }

  save() {
    debugger
    if (this.sig.isEmpty()) {
      // If the signature is empty, show an alert and don't proceed
      alert("Signature is required.");
      return;
    }
    let signValue = this.sig.toDataURL();
    this.sharedService.onChange(signValue, this.field);
  }
  changeModal() {
    console.log(this.field.formControl.value)
  }
}
