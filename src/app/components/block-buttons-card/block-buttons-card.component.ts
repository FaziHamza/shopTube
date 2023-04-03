import { Component, Input } from '@angular/core';
import { TreeNode } from 'src/app/models/treeNode';
import { EmployeeService } from 'src/app/services/employee.service';
// import { CommonchartService } from 'src/app/servics/commonchart.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-block-buttons-card',
  templateUrl: './block-buttons-card.component.html',
  styleUrls: ['./block-buttons-card.component.scss']
})
export class BlockButtonsCardComponent {
  bgColor: any;
  @Input() softIconList: any;
  dataSrc: any;
  isShow: Boolean = false;
  nodes: TreeNode[];
  url: string;
  size: NzButtonSize = 'large';
  color: "hover:bg-[#000000]";
  constructor(private modalService: NzModalService, public employeeService: EmployeeService,
  ) { }
  ngOnInit(): void {
    
    this.bgColor = this.softIconList?.color;
    this.url = window.location.origin;
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



  showModal(href: string): void {

    this.employeeService.jsonBuilderSetting(href).subscribe(((res: any) => {
      if (res.length > 0) {
        this.nodes = res[0].menuData;
        this.isVisible = true;
      }
    }));
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
  changeColor(bgColor:any , hoverColor:any){
    
    bgColor = hoverColor;
  }
}
