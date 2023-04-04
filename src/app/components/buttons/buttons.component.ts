import { Component, Input , OnInit } from '@angular/core';
import { TreeNode } from 'src/app/models/treeNode';
import { EmployeeService } from 'src/app/services/employee.service';
// import { CommonchartService } from 'src/app/servics/commonchart.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Input() buttonData : any;
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
    debugger
    this.hoverTextColor = this.buttonData?.color ? this.buttonData?.color : '';
    this.bgColor = this.buttonData?.color ? this.buttonData?.color : '';
    this.borderColor = this.buttonData?.textColor ? this.buttonData?.textColor : '';
  }

  pagesRoute(href: string, routeType: any): void {
    let url = window.location.origin;
    if (href) {
      if (routeType == 'modal') {
        this.employeeService.jsonBuilderSetting(href).subscribe(((res: any) => {
          if (res.length > 0) {
            this.nodes = res[0].menuData;
            this.isVisible = true;
          }
        }));
      } else if (routeType == '_blank') {
        let link = '/pages/' + href;
        window.open(link)
      } else if (routeType == '') {
        let link = '/pages/' + href;
        this.router.navigate([link]);
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

}
