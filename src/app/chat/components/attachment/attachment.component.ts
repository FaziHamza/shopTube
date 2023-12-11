import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'st-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent {
  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileSelected.emit(file);
  }
}
