import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnyARecord } from 'dns';
import { NzImageService } from 'ng-zorro-antd/image';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.scss']
})
export class MainsComponent implements OnInit {
  @Input() item: any;
  @Input() formlyModel: any;
  @Input() isLast: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() screenId: any;
  @Input() mappingId: any;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  menu: boolean = false;
  serverPath = environment.nestImageUrl;
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  @Input() isDrawer: boolean = false;
  constructor(private nzImageService: NzImageService, public dataSharedService: DataSharedService, private router: Router) { }

  ngOnInit(): void {

  }
  imagePreview(data: any) {
    const images = [
      {
        src: data.image ? data.image : data.source,
        width: data.imageWidth + 'px',
        height: data.imagHieght + 'px',
        alt: data.alt,
      }
    ];
    this.nzImageService.preview(images, { nzZoom: data.zoom, nzRotate: data.rotate, nzKeyboard: data.keyboardKey, nzZIndex: data.zIndex });
  }


  handleIndexChange(e: number): void {
    console.log(e);
  }
  onClose(data: any, index: any): void {
    data.options = data.options.filter((_: any, i: any) => i != index);
  }

  menuCollapsed() {
    this.dataSharedService.collapseMenu.next(true)
  }
  defaultPageRoute() {
    this.router.navigate(['/pages/' + this.dataSharedService.applicationDefaultScreen]);
  }
  accordingList(event: any) {
    this.notify.emit(event);
  }
  patchValue(data: any) {

    if (data?.dataObj) {
      let makeModel: any = JSON.parse(JSON.stringify(this.formlyModel));
      if (this.formlyModel) {
        this.form.value = {};
        for (const key in this.formlyModel) {
          if (typeof this.formlyModel[key] === 'object') {
            for (const key1 in this.formlyModel[key]) {
              if (data?.dataObj[key1]) {
                makeModel[key][key1] = data?.dataObj[key1]
              }
            }
            makeModel[key]['id'] = data?.dataObj['id'];
          }
          else {
            if (data?.dataObj[key.split('.')[1]]) {
              makeModel[key] = data?.dataObj[key.split('.')[1]];
              // if (this.form.value) {
              //   if(this.form.value[key.split('.')[0]]){
              //     this.form.value[key.split('.')[0]][key.split('.')[1]] = data?.dataObj[key.split('.')[1]];
              //   }
              //   else{
              //     this.form.value[key.split('.')[0]] = {};
              //     this.form.value[key.split('.')[0]][key.split('.')[1]] = data?.dataObj[key.split('.')[1]];
              //   }
              // }
            }
          }
        }
      }
      this.formlyModel = makeModel;
      this.form.patchValue(this.formlyModel);
    }
  } 
}
