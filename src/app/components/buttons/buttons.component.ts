import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Subject, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { SocketService } from 'src/app/services/socket.service';



@Component({
  selector: 'st-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Input() buttonData: any;
  @Input() title: any;
  @Input() tableRowId: any;
  @Input() tableDisplayData: any;
  @Input() softIconList: any;
  @Input() screenId: any;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() GridRuleColor: any;
  @Input() drawOpen: any;
  @Input() tableIndex: any;
  @Input() mappingId: any;
  bgColor: any;
  hoverTextColor: any;
  dataSrc: any;
  isShow: Boolean = false;
  color: "hover:bg-[#000000]";
  borderColor: any;
  isVisible = false;
  isVisibleDrawer = false;
  saveHoverIconColor: any;
  hoverOpacity = '';
  nodes: any[] = [];
  responseData: any;
  loader: boolean = false;
  isActionExist: boolean = false;
  requestSubscription: Subscription;
  policyList: any = [];
  policyId: any = {};
  hostUrl: any = '';
  policyTheme: any = '';
  //Drawer title and keyName is used in case of previous next in button drawer
  drawerTiltle: any;
  keyName: any = '';
  private subscriptions: Subscription = new Subscription();
  private destroy$: Subject<void> = new Subject<void>();
  @Output() gridEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(private modalService: NzModalService, public employeeService: EmployeeService, private toastr: NzMessageService, private router: Router,
    public dataSharedService: DataSharedService, private activatedRoute: ActivatedRoute, private location: Location, private cdr: ChangeDetectorRef,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    if (this.tableDisplayData) {
      this.keyName = this.findKeyByOrderid(this.tableDisplayData, this.title);
    }

    const userData = this.dataSharedService.decryptedValue('user') ? JSON.parse(this.dataSharedService.decryptedValue('user')) : null;
    if (this.buttonData?.dropdownProperties == 'policyTheme' && userData) {
      this.policyTheme = userData['policy']['policyTheme'];
      this.buttonData['title'] = userData['policy']['policyTheme'] ? userData['policy']['policyTheme'] : this.buttonData?.title;
    }
    // this.drawerClose();
    this.hostUrl = window.location.host;
    if (this.buttonData?.showPolicies || this.buttonData?.dropdownProperties == 'policyTheme') {
      this.jsonPolicyModuleList();
    }
    if (this.buttonData?.appConfigurableEvent || this.buttonData?.eventActionconfig || this.buttonData?.redirect || this.buttonData?.isSubmit) {
      this.isActionExist = true;
    }
    this.hoverTextColor = this.buttonData?.textColor ? this.buttonData?.textColor : '';
    this.bgColor = this.buttonData?.color ? this.buttonData?.color : '';
    if (this.buttonData.title === '$user' && window.location.href.includes('/pages') && userData) {
      this.policyId = userData['policy']['policyId'];
      this.buttonData.title = userData.policy.policyName ? userData.policy.policyName : this.buttonData.title;
    }

    if (this.drawOpen && this.tableIndex == 0) {
      this.pagesRoute(this.buttonData);
    }

  }

  pagesRoute(data: any): void {
    debugger
    if (data.isSubmit) {
      return;
    }

    if (!data.href) {
      return;
    }

    switch (data.redirect) {
      case 'modal':
      case '1200px':
      case '800px':
      case '600px':
      case 'drawer':
      case 'largeDrawer':
      case 'extraLargeDrawer':
        this.drawerTiltle = '';
        if (!data.href) {
          this.toastr.warning('Required Href', {
            nzDuration: 3000,
          });
          return
        }
        this.cdr.detectChanges();
        this.nodes = [];
        if (this.tableRowId) {
          this.mappingId = this.tableRowId;
          this.mappingId = this.mappingId;

        }
        this.dataSharedService.drawerIdList = {};
        if (this.buttonData?.headerHeight !== undefined) {
          document.documentElement.style.setProperty('--drawerHeaderHight', this.buttonData?.headerHeight + '%');
          this.cdr.detectChanges();
        } else {
          document.documentElement.style.setProperty('--drawerHeaderHight', 'auto');

        }
        this.loader = true;
        this.isVisible = true;
        let externalLogin = localStorage.getItem('externalLogin') || false;
        if (!externalLogin) {
          const { jsonData, newGuid } = this.socketService.makeJsonDataById('CheckUserScreen', data.href, 'CheckUserScreen');
          this.socketService.Request(jsonData);
          this.socketService.OnResponseMessage().subscribe(res => {
            if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
              res = res.parseddata.apidata;
              if (res?.data == true) {
                this.getBuilderScreen(data);
              }
              else {
                this.loader = false;
                this.screenId = res.data[0].screenbuilderid;
                this.nodes.push(res)
              }
            }
          });
        } else {
          this.getBuilderScreen(data);
        }

        break;
      case '_blank':
        if (this.tableRowId) {
          window.open('/pages/' + data.href + '/' + this.tableRowId);
        } else {
          this.requestSubscription = this.activatedRoute.params.subscribe((params: Params) => {
            if (params["id"]) {
              window.open('/pages/' + data.href + '/' + params["id"]);
            } else if (data.href.includes('https://www')) {
              window.open(data.href);
            }
            else {
              window.open('/pages/' + data.href);
            }
          });
        }

        break;
      case '':
        if (this.tableRowId) {
          this.router.navigate(['/pages/' + data.href + '/' + this.tableRowId]);
        }
        else if (data.href.includes('https://www')) {
          window.location.href = data.href;
        }
        else {
          this.requestSubscription = this.activatedRoute.params.subscribe((params: Params) => {
            if (params["id"]) {
              this.router.navigate(['/pages/' + data.href + '/' + params["id"]])
            }
            else if (data.href.includes('https://www')) {
              this.router.navigate([data.href]);
            }
            else {
              this.router.navigate(['/pages/' + data.href]);
            }
          });
        }
        break;
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  isHover: boolean = false;
  handleCancel(): void {
    this.isVisible = false;
  }
  handleClose(): void {
    this.isVisible = false;
    this.dataSharedService.drawerVisible = false;
    this.gridEmit.emit();

  }
  handleButtonClick(buttonData: any): void {
    this.pagesRoute(buttonData);
    if ((!buttonData.captureData || buttonData.captureData == 'sectionLevel') && buttonData.isSubmit) {
      this.dataSharedService.buttonData = buttonData;
      this.dataSharedService.saveModel = this.formlyModel;
      let newData = {
        buttonData: buttonData,
        mappingId: this.mappingId,
      }
      this.dataSharedService.sectionSubmit.next(newData);
    } else if (buttonData.captureData == 'pageLevel' && buttonData.isSubmit) {
      this.dataSharedService.pageSubmit.next(buttonData);
    }
  }

  handleButtonMouseOver(buttonData: any): void {
    this.hoverOpacity = '1';
    this.bgColor = buttonData.hoverColor || '';
    this.hoverTextColor = buttonData.hoverTextColor || '';
    this.borderColor = buttonData.hoverBorderColor || '';
    this.saveHoverIconColor = buttonData['iconColor'];
    buttonData['iconColor'] = buttonData['hoverIconColor'];
  }

  handleButtonMouseOut(buttonData: any): void {
    this.hoverOpacity = '';
    buttonData['iconColor'] = this.saveHoverIconColor;
    this.bgColor = buttonData.color || '';
    this.hoverTextColor = buttonData.textColor || '';
    this.borderColor = buttonData.borderColor || '';
  }

  hoverStyle(data: any, mouseOver: any): void {
    if (mouseOver) {
      this.buttonData.dropdownOptions.forEach((option: any) => option.label == data.label ? option['hover'] = true : option['hover'] = false);
    } else {
      this.buttonData.dropdownOptions.forEach((option: any) => option['hover'] = false);
    }
  }
  findObjectByTypeBase(data: any, type: any) {
    if (data) {
      if (data.type && type) {
        if (data.type === type && data.mapApi && (data.componentMapping == undefined || data.componentMapping == '' || data.componentMapping == false) && this.tableRowId) {
          data.mapApi += `/${this.tableRowId}`
        }
        if (data.children.length > 0) {
          for (let child of data.children) {
            this.findObjectByTypeBase(child, type);
          }
        }
      }
    }
  }
  logout() {
    localStorage.removeItem('isLoggedIn'); // Clear the logged-in flag
    localStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
  jsonPolicyModuleList() {

    let user = JSON.parse(this.dataSharedService.decryptedValue('user'));
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('getpolicy', user?.policy?.userid, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            if (res?.data.length > 0) {
              if (this.buttonData?.showPolicies) {
                this.policyList = res.data.filter((a: any) => a?.policyId._id != user['policy']['policyId']);
              } else {
                this.policyList = res?.data;
              }
            }
          }
        }

      },
      error: (err) => {
        this.toastr.error(`Policy : ${err}`, { nzDuration: 3000 });
      },
    });
  }

  switchPolicy(policy: any) {
    this.modalService.confirm({
      nzTitle: '<i>Do you Want to switch this policy?</i>',
      nzContent: '',
      nzOnOk: () => this.changePolicy(policy)
    });
  }
  switchPolicyTheme(policy: any) {
    this.modalService.confirm({
      nzTitle: '<i>Do you Want to switch this theme?</i>',
      nzContent: '',
      nzOnOk: () => this.changeTheme(policy)
    });
  }
  changeTheme(policy: any) {

    let user = JSON.parse(window.localStorage['user']);
    this.policyTheme = policy?.policyId?.applicationTheme;
    user['policy']['policyTheme'] = policy?.policyId?.applicationTheme ? policy?.policyId?.applicationTheme : '';
    this.buttonData.title = policy?.policyId?.applicationTheme ? policy?.policyId?.applicationTheme : '';

    this.dataSharedService.ecryptedValue('user', JSON.stringify(user), true);
    this.dataSharedService.applicationTheme.next(true);
  }
  changePolicy(policy: any) {

    let user = JSON.parse(this.dataSharedService.decryptedValue('user'));
    user['policy']['policyId'] = policy?.policyId?._id;
    user['policy']['policyName'] = policy?.policyId?.name;
    this.policyTheme = policy?.policyId?.applicationTheme;
    this.dataSharedService.ecryptedValue('user', JSON.stringify(user), true);
    let obj = {
      UserMapping: {
        policyId: policy?.policyId?._id,
        userId: policy?.userId?._id,
        defaultPolicy: true,
        applicationId: this.dataSharedService.decryptedValue('applicationId'),
      }
    }
    this.dataSharedService.pagesLoader.next(true);
    const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(policy.id);
    var ResponseGuid: any = newUGuid;
    const Update = { [`UserMapping`]: obj, metaInfo: metainfoupdate };
    this.socketService.Request(Update)
    this.socketService.OnResponseMessage().subscribe((res: any) => {
      if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
        res = res.parseddata.apidata;
        this.dataSharedService.pagesLoader.next(false);

        if (res.isSuccess) {
          this.router.navigate(['/']).then(() => {
            // Reload the entire application to re-render all components
            this.location.replaceState('/');
            window.location.reload();
          });
        } else {
          this.toastr.error(res.message, { nzDuration: 3000 });
        }
      }
    });
  }
  // private drawerClose(): void {
  //   const subscription = this.dataSharedService.drawerClose.subscribe({
  //     next: (res) => {
  //       if (res && this.isVisible && (this.buttonData.redirect == 'drawer' || this.buttonData.redirect == 'largeDrawer' || this.buttonData.redirect == 'extraLargeDrawer')) {
  //         this.isVisible = false;
  //         // this.dataSharedService.gridDataLoad = false;
  //         this.gridEmit.emit(this.buttonData)
  //       }
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  //   this.subscriptions.add(subscription);
  // }
  ngOnDestroy(): void {
    try {
      if (this.requestSubscription) {
        this.requestSubscription.unsubscribe();
      }
      if (this.subscriptions) {
        this.subscriptions.unsubscribe();
      }
      this.destroy$.next();
      this.destroy$.complete();
    } catch (error) {
      console.error('Error in ngOnDestroy:', error);
    }
  }

  getNextOrPreviousObjectById(direction: any) {
    const index = this.tableDisplayData.findIndex((item: any) => item.id === this.tableRowId);
    if (index !== -1) {
      if (direction === 'next' && index < this.tableDisplayData.length - 1) {
        this.tableRowId = this.tableDisplayData[index + 1]['id'];
        this.drawerTiltle = this.tableDisplayData[index + 1][this.keyName];
      }
      else if (direction === 'previous' && index > 0) {
        this.tableRowId = this.tableDisplayData[index - 1]['id'];
        this.drawerTiltle = this.tableDisplayData[index - 1][this.keyName];
      } else {
        const indexValue = direction === 'next' ? 1 : -1
        this.gridEmit.emit(indexValue);
        // this.toastr.warning('Id does not exist', { nzDuration: 3000 });
        return;
      }
    }
    let obj: any = {
      tableRowId: this.tableRowId,
      screenId: this.screenId
    }
    this.dataSharedService.prevNextRecord.next(obj);
  }
  findKeyByOrderid(data: any[], targetOrderid: string): string | null {
    for (const key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        const foundObject = data.find(obj => obj[key] === targetOrderid);
        if (foundObject) {
          return key;
        }
      }
    }
    return null;
  }
  getBuilderScreen(data: any) {
    const { jsonData, newGuid } = this.socketService.makeJsonDataById('Builders', data.href, 'GetModelTypeById');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        try {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            if (res.isSuccess) {
              if (res.data.length > 0) {
                this.screenId = res.data[0].screenbuilderid;
                this.nodes = [];
                this.nodes.push(res);
              }
              this.loader = false;
            } else {
              this.toastr.error(res.message, { nzDuration: 3000 });
              this.loader = false;
            }
          }
        } catch (err) {
          this.loader = false;
          this.toastr.warning('An error occurred: ' + err, { nzDuration: 3000 });
          console.error(err); // Log the error to the console
        }
      },
      error: (err) => {
        this.loader = false;
        this.toastr.warning('Required Href ' + err, { nzDuration: 3000 });
        console.error(err); // Log the error to the console
      }
    });
  }
}
