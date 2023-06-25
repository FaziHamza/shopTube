import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  requestSubscription: Subscription;
  applicationData: any = [];
  @Input() moduleData:any;
  // @Input() moduleData: any = [];
  applicationChild: any = [];
  selectedIndex = 0;
  constructor(public builderService: BuilderService, private toastr: NzMessageService, public dataSharedService: DataSharedService) {
  }

  ngOnInit(): void {
    // this.loadApplication();
    // this.loadModules();
  }

  loadApplication() {
    this.requestSubscription = this.builderService.jsonApplicationBuilder().subscribe({
      next: (res) => {
        this.applicationData = res;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  loadModules(): void {
    this.requestSubscription = this.builderService.jsonModuleSetting().subscribe({
      next: (res) => {
        this.moduleData = res;
        res.length > 0 ? this.callChild(this.applicationData[0]) : null;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("An error occurred", { nzDuration: 3000 });
      }
    });
  }

  callChild(data: any) {
    let filteredData = this.moduleData.filter((item: any) => item.applicationName == data.name);
    this.applicationChild = filteredData.map((item: any) => {
      item.select = false;;
      return item;
    });
  }
}

