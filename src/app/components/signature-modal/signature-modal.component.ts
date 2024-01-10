import { Component, ElementRef, VERSION, ViewChild, OnInit, ViewContainerRef, inject } from "@angular/core";
import SignaturePad from "signature_pad";
import { ApplicationService } from "src/app/services/application.service";
import { DataSharedService } from "src/app/services/data-shared.service";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: 'st-signature-modal',
  templateUrl: './signature-modal.component.html',
  styleUrls: ['./signature-modal.component.scss']
})
export class SignatureModalComponent {
  constructor(private sharedService: DataSharedService, private applicationService: ApplicationService,
    private modalService: NzModalService, private viewContainerRef: ViewContainerRef) {
  }
  data: any;
  isVisible: boolean = false;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  sig: SignaturePad;
  signatureData: any;
  readonly #modal = inject(NzModalRef);
  ngOnInit() {
    this.sig = new SignaturePad(this.canvas.nativeElement);
    if (this.data) {
      this.sig.fromDataURL(this.data.signatureData)
    }
  }

  clear() {
    this.sig.clear();
  }

  add() {
    debugger
    let label = this.sig._isEmpty ? 'Add' : 'Update'
    let signValue = this.sig.toDataURL();
    this.sig.fromDataURL(signValue);
    let obj = {
      'url': signValue,
      'add': label
    }
    this.#modal.destroy(obj);
  }

}
