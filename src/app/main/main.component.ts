import { JoiService } from './../services/joi.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import * as Joi from 'joi';
import { NzImageService } from 'ng-zorro-antd/image';
import { BuilderService } from '../services/builder.service';
import { TreeNode } from '../models/treeNode';
import { ElementData } from '../models/element';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { DataSharedService } from '../services/data-shared.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommentModalComponent } from '../components';
import { EmployeeService } from '../services/employee.service';
import { ApplicationService } from '../services/application.service';


@Component({
  selector: 'st-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Output() notifySection: EventEmitter<any> = new EventEmitter();
  @Input() mainData: any = [];
  @Input() dataModel !: any;
  form: any = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  selectedTags: any[] = [];
  @Input() screenName: any;
  @Input() screenId: any;
  editorData: any;
  ruleValidation: any = {};
  ruleObj: any = {};
 
  formlyModel: any;
  validationCheckStatus: any = [];
  setErrorToInput: any = [];
  joiValidationData: TreeNode[] = [];
  requestSubscription: Subscription;
  isShowContextMenu = false;

  constructor(private cd: ChangeDetectorRef, private nzImageService: NzImageService, private employeeService: EmployeeService,
    private builderService: BuilderService, private applicationServices: ApplicationService,
    private toastr: NzMessageService, private router: Router, public dataSharedService: DataSharedService,
    private clipboard: Clipboard, private modalService: NzModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    if (this.router.url.includes('/pages'))
      this.isShowContextMenu = true;
  }

  
  handleIndexChange(e: number): void {
    console.log(e);
  }
  onClose(data: any, index: any): void {

    data.options = data.options.filter((_: any, i: any) => i != index);
    console.log('tag was closed.');
  }
  // handleChange(checked: boolean, tag: string): void {
  //   if (checked) {
  //     this.selectedTags.push(tag);
  //   } else {
  //     this.selectedTags = this.selectedTags.filter(t => t !== tag);
  //   }
  //   console.log('You are interested in: ', this.selectedTags);
  // }
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

  updateModel(data: any) {

    const dynamicPropertyName = Object.keys(this.dataModel)[0]; // Assuming the dynamic property name is the first property in this.dataModel
    if (this.form.get(dynamicPropertyName)) {
      this.form.get(dynamicPropertyName)?.patchValue(data);
    }
  }
  
  copyJson(json: any) {

    let data = JSON.stringify(json);
    this.clipboard.copy(data);
    // alert('Copied to clipboard');
  }
  comment(json: any) {

    const modal = this.modalService.create<CommentModalComponent>({
      nzTitle: 'Comment',
      nzContent: CommentModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data: json,
        screenName: this.screenName,
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: []
    });
    modal.afterClose.subscribe(res => {
      if (res) {
      }
    });
  }
  saveData(data : any){
    debugger
    this.notifySection.emit(data);
  }

}
