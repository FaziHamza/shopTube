import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-multi-file-upload-wrapper',
  templateUrl: './multi-file-upload-wrapper.component.html',
  styleUrls: ['./multi-file-upload-wrapper.component.scss']
})
export class MultiFileUploadWrapperComponent extends FieldType<FieldTypeConfig> {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imageUrl: any;
  loading = false;
  avatarUrl?: string;
  constructor(private msg: NzMessageService, private sharedService: DataSharedService) {
    super();
  }

  ngOnInit(): void {
  }
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    debugger
    this.uploadFile(fileList);
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  defaultFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error'
    }
  ];

  fileList1 = [...this.defaultFileList];
  fileList2 = [...this.defaultFileList];

  uploadFile(file: any) {
    const reader = new FileReader();
    if (file) {
      if (file.type === 'application/json') {
        reader.onload = () => {
          const base64Data = reader.result as string;
          const makeData = JSON.parse(base64Data);
          const currentData = JSON.parse(
            JSON.stringify(makeData.screenData, function (key, value) {
              if (typeof value === 'function') {
                return value.toString();
              } else {
                return value;
              }
            }) || '{}'
          );
          // this.formControl.setValue(JSON.stringify(currentData));
          this.sharedService.onChange(JSON.stringify(currentData), this.field);
        };
        reader.readAsText(file); // Read the JSON file as text
      }
      else {
        reader.readAsDataURL(file); // Read other types of files as data URL (base64)
        reader.onload = () => {
          const base64Data = reader.result as string;
          // this.formControl.setValue(base64Data);
          this.sharedService.onChange(base64Data, this.field);
        };
      }

      reader.onerror = (error) => {
        console.error('Error converting file to base64:', error);
      };
    }

  }
  // Function to clear the selected file and reset the form control value
  clearFile() {
    this.imageUrl = null;
    this.fileInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }
}
