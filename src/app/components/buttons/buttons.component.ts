import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from 'src/app/models/treeNode';
import { EmployeeService } from 'src/app/services/employee.service';
// import { CommonchartService } from 'src/app/servics/commonchart.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Input() buttonData: any;
  @Input() title: any;
  @Input() tableRowId: any;
  @Input() softIconList: any;
  @Input() screenId: any;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  bgColor: any;
  hoverTextColor: any;
  dataSrc: any;
  isShow: Boolean = false;
  color: "hover:bg-[#000000]";
  borderColor: any;
  isVisible = false;
  saveHoverIconColor: any;
  hoverOpacity = '';
  nodes: TreeNode[];
  requestSubscription: Subscription;
  constructor(private modalService: NzModalService, public employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,
    public dataSharedService: DataSharedService, private applicationService: ApplicationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.hoverTextColor = this.buttonData?.textColor ? this.buttonData?.textColor : '';
    this.bgColor = this.buttonData?.color ? this.buttonData?.color : '';
  }

  pagesRoute(data: any): void {
    debugger

    if (data.isSubmit) {
      return;
    }

    if (!data.href) {
      return;
    }

    switch (data.redirect) {
      case 'modal':
      case '1200px':
      case '800px':
      case '600px':
        this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', data.href).subscribe({
          next: (res: any) => {
            if (res.isSuccess) {
              if (res.data.length > 0) {
                const data = JSON.parse(res.data[0].screenData);
                this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(data));
                this.findObjectByTypeBase(this.nodes[0], 'div')
                this.isVisible = true;
              }
            } else
              this.toastr.error(res.message, { nzDuration: 3000 });
          },
          error: (err) => {
            console.error(err); // Log the error to the console
          }
        });


        // this.requestSubscription = this.employeeService.jsonBuilderSetting(data.href).subscribe((res: any) => {
        //   if (res.length > 0) {
        //     const data = JSON.parse(res.data[0].screenData);
        //     this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(data));
        //     this.isVisible = true;
        //   }
        // });
        break;
      case '_blank':
        if (this.tableRowId) {
          window.open('/pages/' + data.href + '/' + this.tableRowId);
        } else {
          this.requestSubscription = this.activatedRoute.params.subscribe((params: Params) => {
            if (params["id"]) {
              window.open('/pages/' + data.href + '/' + params["id"]);
            } else {
              window.open('/pages/' + data.href);
            }
          });
        }

        break;
      case '':
        if (this.tableRowId) {
          this.router.navigate(['/pages/' + data.href + '/' + this.tableRowId]);
        } else {
          this.requestSubscription = this.activatedRoute.params.subscribe((params: Params) => {
            if (params["id"]) {
              this.router.navigate(['/pages/' + data.href + '/' + params["id"]])
            } else {
              this.router.navigate(['/pages/' + data.href]);
            }
          });
        }
        break;
    }
  }

  ngOnDestroy() {
    if (this.requestSubscription)
      this.requestSubscription.unsubscribe();
  }
  getButtonType(type: any) {
    console.log(type);
    // if(type == 'insert')
    //   this.insertData('insert');
    // else if(type == 'update')
    //   this.updateData('update')
    // else if(type == 'delete')
    //   this.deleteData('delete')
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  isHover: boolean = false;
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handleButtonClick(buttonData: any): void {

    // this.getButtonType(buttonData.type);
    this.pagesRoute(buttonData);
    // this.notify.emit(buttonData);
    if ((!buttonData.captureData || buttonData.captureData == 'sectionLevel') && buttonData.isSubmit) {
      this.dataSharedService.sectionSubmit.next(buttonData);
    } else if (buttonData.captureData == 'pageLevel' && buttonData.isSubmit) {
      this.dataSharedService.pageSubmit.next(buttonData);
    }
  }

  handleButtonMouseOver(buttonData: any): void {
    this.hoverOpacity = '1';
    this.bgColor = buttonData.hoverColor || '';
    this.hoverTextColor = buttonData.hoverTextColor || '';
    this.borderColor = buttonData.hoverBorderColor || '';
    this.saveHoverIconColor = buttonData['iconColor'];
    buttonData['iconColor'] = buttonData['hoverIconColor'];
  }

  handleButtonMouseOut(buttonData: any): void {
    this.hoverOpacity = '';
    buttonData['iconColor'] = this.saveHoverIconColor;
    this.bgColor = buttonData.color || '';
    this.hoverTextColor = buttonData.textColor || '';
    this.borderColor = buttonData.borderColor || '';
  }

  hoverStyle(data: any, mouseOver: any): void {
    if (mouseOver) {
      this.buttonData.dropdownOptions.forEach((option: any) => option.label == data.label ? option['hover'] = true : option['hover'] = false);
    } else {
      this.buttonData.dropdownOptions.forEach((option: any) => option['hover'] = false);
    }
  }
  jsonStringifyWithObject(data: any) {
    return JSON.stringify(data, function (key, value) {
      if (typeof value == 'function') {
        return value.toString();
      } else {
        return value;
      }
    }) || '{}'
  }
  jsonParseWithObject(data: any) {
    return JSON.parse(
      data, (key, value) => {
        if (typeof value === 'string' && value.startsWith('(') && value.includes('(model)')) {
          return eval(`(${value})`);
        }
        return value;
      });
  }
  findObjectByTypeBase(data: any, type: any) {
    if (data) {
      if (data.type && type) {
        if (data.type === type && data.mapApi && (data.componentMapping == undefined || data.componentMapping == '' || data.componentMapping == false) && this.tableRowId) {
          data.mapApi += `/${this.tableRowId}`
        }
        if (data.children.length > 0) {
          for (let child of data.children) {
            let result: any = this.findObjectByTypeBase(child, type);
            if (result !== null) {
              return result;
            }
          }
        }
      }
    }
  }
}
