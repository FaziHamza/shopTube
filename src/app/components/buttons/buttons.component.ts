import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() buttonData: any;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  bgColor: any;
  hoverTextColor: any;
  dataSrc: any;
  isShow: Boolean = false;
  color: "hover:bg-[#000000]";
  borderColor: any;
  isVisible = false;
  nodes: TreeNode[];
  constructor(private modalService: NzModalService, public employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,) { }

  ngOnInit(): void {
    // this.hoverTextColor = this.buttonData?.textColor ? this.buttonData?.textColor : '#000000';
    this.hoverTextColor = this.buttonData?.textColor ? this.buttonData?.textColor : '';
    this.bgColor = this.buttonData?.color ? this.buttonData?.color : '';
    // this.borderColor = this.buttonData?.borderColor ? this.buttonData?.borderColor : '';
    // this.buttonData['textColor'] = this.buttonData?.textColor ? this.buttonData?.textColor :'#000000';
  }

  pagesRoute(data: any): void {
    
    if (data.isSubmit) {
      return;
    }

    if (!data.href) {
      // this.toastr.error('Link is required', { nzDuration: 3000 });
      return;
    }

    switch (data.btnType) {
      case 'modal':
        this.employeeService.jsonBuilderSetting(data.href).subscribe((res: any) => {
          if (res.length > 0) {
            this.nodes = res[0].menuData;
            this.isVisible = true;
          }
        });
        break;
      case '_blank':
        window.open('/pages/' + data.href);
        break;
      case '':
        this.router.navigate(['/pages/' + data.href]);
        break;
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
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  isHover: boolean = false;
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handleButtonClick(buttonData : any): void {
    this.getButtonType(buttonData.type);
    this.pagesRoute(buttonData);
    this.notify.emit(buttonData);
  }
  
  handleButtonMouseOver(buttonData : any): void {
    this.bgColor = buttonData.hoverColor || '';
    this.hoverTextColor = buttonData.hoverTextColor || '';
    this.borderColor = buttonData.hoverBorderColor || '';
  }
  
  handleButtonMouseOut(buttonData : any): void {
    this.bgColor = buttonData.color || '';
    this.hoverTextColor = buttonData.textColor || '';
    this.borderColor = buttonData.borderColor || '';
  }
  

}
