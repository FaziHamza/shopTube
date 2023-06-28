import { Inject, Injectable } from '@angular/core';
import { CommonService } from '../../common/common-services/common.service';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor(@Inject(CommonService) private commonService: CommonService) {
  }

  // The values that are defined here are the default values that can be overridden by env.js

  // Dev URL
  public nestBaseUrl = 'http://localhost:4500/';
  public Url = 'https://creditmanagementtest.azurewebsites.net/POSAPI/api/';
  // public GeneralToken = 'eyJhbGciOiJI............';

  public loginMode = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  //for version of the application
  public versionId = 1.0;

  //for ag-grid Enterprise Key
  public agGridKey = '';


  showWarning() {
    this.commonService.showWarning('You are not <b> Sign in</b> ');
  }
}
