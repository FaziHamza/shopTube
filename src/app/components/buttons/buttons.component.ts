import { Component, EventEmitter, Input , OnInit, Output } from '@angular/core';
import { TreeNode } from 'src/app/models/treeNode';
import { EmployeeService } from 'src/app/services/employee.service';
// import { CommonchartService } from 'src/app/servics/commonchart.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'st-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Input() buttonData : any;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  bgColor: any;
  hoverTextColor: any;
  dataSrc: any;
  isShow: Boolean = false;
  color: "hover:bg-[#000000]";
  borderColor:any;
  isVisible = false;
  nodes: TreeNode[];
  constructor(private modalService: NzModalService, public employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,) { }

  ngOnInit(): void {
    // this.hoverTextColor = this.buttonData?.textColor ? this.buttonData?.textColor : '#000000';
    this.hoverTextColor = this.buttonData?.textColor ? this.buttonData?.textColor : '';
    this.bgColor = this.buttonData?.color ? this.buttonData?.color : '';
    this.borderColor = this.buttonData?.textColor ? this.buttonData?.textColor :'';

    // this.buttonData['textColor'] = this.buttonData?.textColor ? this.buttonData?.textColor :'#000000';
  }

  pagesRoute(data : any): void {
    let url = window.location.origin;
    if (data.href && !data.isSubmit) {
      if (data.btnType == 'modal') {
        this.employeeService.jsonBuilderSetting(data.href).subscribe(((res: any) => {
          if (res.length > 0) {
            this.nodes = res[0].menuData;
            this.isVisible = true;
          }
        }));
      } else if (data.btnType == '_blank') {
        window.open('/pages/' + data.href)
      } else if (data.btnType == '') {
        this.router.navigate(['/pages/' + data.href]);
      }
    } else {
      this.toastr.error('Link is required', { nzDuration: 3000 });
    }

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
  change(value: boolean): void {
    console.log(value);
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
  changeColor(bgColor: any, hoverColor: any) {

    bgColor = hoverColor;
  }
  saveData(data : any){
    debugger
    this.notify.emit(data);
  }

}
