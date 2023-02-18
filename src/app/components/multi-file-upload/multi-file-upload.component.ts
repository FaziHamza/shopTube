import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.scss']
})
export class MultiFileUploadComponent implements OnInit {
  @Input() multiFileUploadData: any;
  constructor() { }

  ngOnInit(): void {
    debugger
    this.multiFileUploadData;
  }
    // handleUpload(event: any): void {
  //   // Handle uploaded files here
  //   console.log(event.fileList);
  // }

  onFileSelected(event: any) {
    console.log(event.addedFiles);
  }


}
