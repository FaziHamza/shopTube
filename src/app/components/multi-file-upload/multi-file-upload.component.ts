import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.scss']
})
export class MultiFileUploadComponent implements OnInit {
  @Input() multiFileUploadData: any;
  constructor(private msg: NzMessageService) { }

  ngOnInit(): void {
    
    this.multiFileUploadData;
  }
    // handleUpload(event: any): void {
  //   // Handle uploaded files here
  //   console.log(event.fileList);
  // }

  onFileSelected(event: any) {
    
    console.log(event.addedFiles);
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    
    const status = file.status;
    console.log(fileList)
    // if (status !== 'uploading') {
    //   console.log(file, fileList);
    // }
    // if (status === 'done') {
    //   this.msg.success(`${file.name} file uploaded successfully.`);
    // } else if (status === 'error') {
    //   this.msg.error(`${file.name} file upload failed.`);
    // }
  }


}
