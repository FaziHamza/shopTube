import { Component,  EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'st-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.scss']
})
export class MainsComponent implements OnInit { 
  @Input() item:any;
  @Input() dataModel:any;
  @Input() isLast:any;
  @Input() form:any;
  @Input() screenName: any;
  @Input() screenId: any;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  constructor(private nzImageService: NzImageService,) { }

  ngOnInit(): void {
  }
  imagePreview(data: any) {
    let image = '';
    if (data.source) {
      image = data.source
    } else if (data.base64Image) {
      image = data.base64Image
    }
    const images = [
      {
        src: image,
        width: data.imageWidth + 'px',
        height: data.imagHieght + 'px',
        alt: data.alt,
      }
    ];
    this.nzImageService.preview(images, { nzZoom: data.zoom, nzRotate: data.rotate, nzKeyboard: data.keyboardKey, nzZIndex: data.zIndex });
  }
  saveData(data : any){

    this.notify.emit(data);
  }
  handleIndexChange(e: number): void {
    console.log(e);
  }
  onClose(data: any, index: any): void {
    data.options = data.options.filter((_: any, i: any) => i != index);
  }
}