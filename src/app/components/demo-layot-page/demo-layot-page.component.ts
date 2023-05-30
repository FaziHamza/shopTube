import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-demo-layot-page',
  templateUrl: './demo-layot-page.component.html',
  styleUrls: ['./demo-layot-page.component.scss']
})
export class DemoLayotPageComponent implements OnInit {
  requestSubscription: Subscription;
  constructor(private builderService: BuilderService, public dataSharedService: DataSharedService) { }

  ngOnInit(): void {
    this.getDefaultPage();
  }
  getDefaultPage() {
    if (!window.location.host.includes('localhost') && !this.dataSharedService.defaultPageNodes) {
      let url = window.location.host
      let check = url.includes(':');
      if (check)
        url = url.split(':')[0];
      this.requestSubscription = this.builderService.getApplicationByDomainName(url).subscribe({
        next: (res) => {
          if (res.length > 0) {
            const observables = [
              this.builderService.jsonBuilderSettingV1(res[0].name + "_default"),
            ];
            forkJoin(observables).subscribe({
              next: (results) => {
                this.dataSharedService.defaultPageNodes = results[0] ? results[0].length > 0 ? results[0][0].menuData : "" : '';
              },
              error: (err) => {
                console.error(err);
              }
            });
          }
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }
}
