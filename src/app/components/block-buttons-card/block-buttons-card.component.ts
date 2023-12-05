import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from 'src/app/models/treeNode';
import { EmployeeService } from 'src/app/services/employee.service';
// import { CommonchartService } from 'src/app/servics/commonchart.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'st-block-buttons-card',
  templateUrl: './block-buttons-card.component.html',
  styleUrls: ['./block-buttons-card.component.scss']
})
export class BlockButtonsCardComponent {
  bgColor: any;
  hoverTextColor: any;
  @Input() softIconList: any;
  @Input() GridRuleColor: any;
  @Input() tableDisplayData: any;
  @Input() drawOpen: any;
  @Input() tableIndex: any;
  @Input() screenId: any;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() title: any;
  @Input() tableRowId: any;
  @Input() mappingId: any;
  dataSrc: any;
  isShow: Boolean = false;
  nodes: TreeNode[];
  size: NzButtonSize = 'large';
  color: "hover:bg-[#000000]";
  borderColor: any;
  @Output() tableEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(private modalService: NzModalService, public employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,
  ) { }
  ngOnInit(): void {
    this.hoverTextColor = this.softIconList?.color;
    this.bgColor = this.softIconList?.color;
    this.borderColor = this.softIconList?.textColor;
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

  // insertData(type:any){
  //   this.commonChartService.submit(type);
  //   alert("Insert Click");
  // }
  // updateData(type:any){
  //   this.commonChartService.submit(type);
  //   alert("Update Click");
  // }
  // deleteData(type:any){
  //   this.commonChartService.submit(type);
  //   alert("Delete Click");
  // }
  isVisible = false;



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
  gridEmit(data:any){
    this.tableEmit.emit(data);
  }

}
