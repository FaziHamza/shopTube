import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreeNode } from 'src/app/models/treeNode';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  visible = false;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() drawerData: any;
  @Input() showModal = true;
  bgColor : any;
  borderColor : any;
  hoverTextColor : any;
  nodes: TreeNode[];
  loader: boolean = false
  requestSubscription: Subscription;
  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    if (!this.showModal) {
      this.drawerData.visible = true;
    }


  }

  open(): void {
    if (this.drawerData?.link) {
      this.loader = true;
      this.requestSubscription = this.applicationService.getNestCommonAPIById('cp/Builder', this.drawerData?.link).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            if (res.data.length > 0) {
              const data = JSON.parse(res.data[0].screenData);
              this.nodes = this.jsonParseWithObject(this.jsonStringifyWithObject(data));
            }
          }
          this.loader = false;
        },
        error: (err) => {
          console.error(err); // Log the error to the console
          this.loader = false;
        }
      });
    }
    this.drawerData['visible'] = true;
  }

  close(): void {
    this.drawerData['visible'] = false;
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
  jsonStringifyWithObject(data: any) {
    return JSON.stringify(data, function (key, value) {
      if (typeof value == 'function') {
        return value.toString();
      } else {
        return value;
      }
    }) || '{}'
  }
}
