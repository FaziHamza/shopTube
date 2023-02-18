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

  @Input() softIconList: any;
  dataSrc: any;
  isShow: Boolean = false;
  nodes: TreeNode[];
  url: string;
  size: NzButtonSize = 'large';
  constructor(private modalService: NzModalService, public employeeService: EmployeeService,
  ) { }
  ngOnInit(): void {

    this.url = window.location.origin;

    this.softIconList
  }

  centerModal(dataModal: any, href: string, size: string) {
    // this.dataSrc = href.split('/')[5]
    this.employeeService.jsonBuilderSetting(href).subscribe(((res: any) => {

      if (res.length > 0) {
        this.isShow = true;
        this.nodes = res[0].menuData;
        this.open();
        // this.modalService.open(dataModal, {size:size, centered: true, windowClass: 'modal-holder' });
      }
    }));
  }

  open() {
    this.modalService.confirm({
      nzTitle: 'Confirmation',
      nzContent: 'Are you sure you want to do this?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {
        // User clicked the confirm button
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        // User clicked the cancel button or closed the modal
      }
    });
  }
  getButtonType(type:any){
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

}
