import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-demo-layot-page',
  templateUrl: './demo-layot-page.component.html',
  styleUrls: ['./demo-layot-page.component.scss']
})
export class DemoLayotPageComponent implements OnInit {
  requestSubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, public dataSharedService: DataSharedService) { }

  ngOnInit(): void {
    
    this.requestSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      if (params["application"] && params["module"]) {
        let activeModule = params["module"].replace('-', ' ');
        let activeApplication = params["application"].replace('-', ' ');
        this.dataSharedService.urlModule.next({ aplication: activeApplication, module: activeModule });
      }
      else {
        this.dataSharedService.urlModule.next({ aplication: '', module: '' });
      }
    })
  }

}
