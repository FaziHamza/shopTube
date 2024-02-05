import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'st-layout-drawer',
  templateUrl: './layout-drawer.component.html',
  styleUrls: ['./layout-drawer.component.scss']
})
export class LayoutDrawerComponent implements OnInit {
  @Input() selectedTheme: any;
  @Input() applicationType: any;
  @Input() selectedAppId: any;
  @Input() themeList: any[] = [];
  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Output() selectedThemeNotify: EventEmitter<any> = new EventEmitter();
  saveLoader: boolean = false;
  listOfOption: any = [];
  visible = false;

  constructor(public dataSharedService: DataSharedService, private toastr: NzMessageService, private applicationService: ApplicationService,
    private modalService: NzModalService,) { }
  themeName: string = ''
  ngOnInit(): void {
    this.disabledButtonsFunc();
    this.listOfOption = [
      { label: "px-1", value: "px-1" },
      { label: "py-1", value: "py-1" },
      { label: "ps-1", value: "ps-1" },
      { label: "pe-1", value: "pe-1" },
      { label: "pt-1", value: "pt-1" },
      { label: "pr-1", value: "pr-1" },
      { label: "pb-1", value: "pb-1" },
      { label: "pl-1", value: "pl-1" },
      { label: "p-2", value: "p-2" },
      { label: "px-2", value: "px-2" },
      { label: "py-2", value: "py-2" },
      { label: "ps-2", value: "ps-2" },
      { label: "pe-2", value: "pe-2" },
      { label: "pt-2", value: "pt-2" },
      { label: "pr-2", value: "pr-2" },
      { label: "pb-2", value: "pb-2" },
      { label: "pl-2", value: "pl-2" },
      { label: "p-3", value: "p-3" },
      { label: "px-3", value: "px-3" },
      { label: "py-3", value: "py-3" },
      { label: "ps-3", value: "ps-3" },
      { label: "pe-3", value: "pe-3" },
      { label: "pt-3", value: "pt-3" },
      { label: "pr-3", value: "pr-3" },
      { label: "m-1", value: "m-1" },
      { label: "mx-1", value: "mx-1" },
      { label: "my-1", value: "my-1" },
      { label: "ms-1", value: "ms-1" },
      { label: "me-1", value: "me-1" },
      { label: "mt-1", value: "mt-1" },
      { label: "mr-1", value: "mr-1" },
      { label: "mb-1", value: "mb-1" },
      { label: "ml-1", value: "ml-1" },
      { label: "m-1.5", value: "m-1.5" },
      { label: "mx-1.5", value: "mx-1.5" },
      { label: "my-1.5", value: "my-1.5" },
      { label: "ms-1.5", value: "ms-1.5" },
      { label: "me-1.5", value: "me-1.5" },
      { label: "mt-1.5", value: "mt-1.5" },
      { label: "mr-1.5", value: "mr-1.5" },
      { label: "mb-1.5", value: "mb-1.5" },
      { label: "ml-1.5", value: "ml-1.5" },
      { label: "m-2", value: "m-2" },
      { label: "mx-2", value: "mx-2" },
      { label: "my-2", value: "my-2" },
      { label: "ms-2", value: "ms-2" },
      { label: "me-2", value: "me-2" },
      { label: "mt-2", value: "mt-2" },
      { label: "mr-2", value: "mr-2" },
      { label: "mb-2", value: "mb-2" },
      { label: "ml-2", value: "ml-2" },
      { label: "m-3", value: "m-3" },
      { label: "mx-3", value: "mx-3" },
      { label: "my-3", value: "my-3" },
    ];

  }
  size: 'large' | 'default' = 'default';

  showDefault(): void {
    this.size = 'default';
    this.open();
  }

  showLarge(): void {
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }


  close(): void {
    this.visible = false;
  }
  changeLayout(layoutType: any, inPageMenu: any) {
    let obj = {
      layoutType: layoutType,
      inPageMenu: inPageMenu,
    }
    this.notify.emit(obj);
  }
  reset(type: any) {
    if (type == 'mainMenu') {
      this.selectedTheme.font = 'font-roboto';
      this.selectedTheme.backGroundColor = '#ffffff';
      this.selectedTheme.textColor = '#6f777d';
      this.selectedTheme.activeBackgroundColor = '#e6f7ff';
      this.selectedTheme.activeTextColor = '#6f777d';
      this.selectedTheme.hoverTextColor = '#ffffff';
      this.selectedTheme.titleSize = '15';
      this.selectedTheme.iconColor = '#6f777d';
      this.selectedTheme.hoverIconColor = '#ffffff';
      this.selectedTheme.activeIconColor = '#6f777d';
      this.selectedTheme.iconSize = '15';
      this.selectedTheme.siderBarImages = '';
      // this.selectedTheme.iconType = '';
      this.selectedTheme.layout = 'vertical';
      this.selectedTheme.layoutWidth = 'fluid';
      this.selectedTheme.sideBarSize = 'default';
      this.selectedTheme.siderBarView = 'sidebarViewDefault';
      this.selectedTheme.hoverBgColor = '#3b82f6';
      this.selectedTheme.newMenuArray = [];
      this.selectedTheme.menuChildArrayTwoColumn = [];
      this.selectedTheme.allMenuItems = [];
      this.selectedTheme.isCollapsed = false;
      this.selectedTheme.hoverBgColor = '#3b82f6'
      this.changeLayout('vertical', false)
    }
    else {
      this.selectedTheme['inPageMenu'].font = 'font-roboto';
      this.selectedTheme['inPageMenu'].backGroundColor = '#ffffff';
      this.selectedTheme['inPageMenu'].textColor = '#73757A';
      this.selectedTheme['inPageMenu'].activeBackgroundColor = '#2563eb';
      this.selectedTheme['inPageMenu'].activeTextColor = '#2563eb';
      this.selectedTheme['inPageMenu'].hoverTextColor = '#73757A';
      this.selectedTheme['inPageMenu'].titleSize = 16;
      this.selectedTheme['inPageMenu'].iconColor = '#73757A';
      this.selectedTheme['inPageMenu'].hoverIconColor = '#73757A';
      this.selectedTheme['inPageMenu'].activeIconColor = '#2563eb';
      this.selectedTheme['inPageMenu'].iconSize = 15;
      this.selectedTheme['inPageMenu']['child'].font = 'font-roboto';
      this.selectedTheme['inPageMenu']['child'].backGroundColor = '#ffffff';
      this.selectedTheme['inPageMenu']['child'].textColor = '#73757A';
      this.selectedTheme['inPageMenu']['child'].activeBackgroundColor = '#2563eb';
      this.selectedTheme['inPageMenu']['child'].activeTextColor = '#ffffff';
      this.selectedTheme['inPageMenu']['child'].hoverTextColor = '#ffffff';
      this.selectedTheme['inPageMenu']['child'].titleSize = 16;
      this.selectedTheme['inPageMenu']['child'].iconColor = '#73757A';
      this.selectedTheme['inPageMenu']['child'].hoverIconColor = '#ffffff';
      this.selectedTheme['inPageMenu']['child'].activeIconColor = '#ffffff';
      this.selectedTheme['inPageMenu']['child'].hoverBgColor = '#3b82f6';
      this.selectedTheme['inPageMenu']['child'].iconSize = 15;
    }
  }

  policyTheme: any;

  saveTheme() {
    if (this.policyTheme || this.themeName) {
      const saveTheme = JSON.parse(JSON.stringify(this.selectedTheme));
      delete saveTheme?.allMenuItems;
      delete saveTheme?.menuChildArrayTwoColumn;
      delete saveTheme?.newMenuArray;
      if (this.policyTheme) {
        const obj = {
          "MenuTheme": {
            theme: saveTheme,
            name: this.themeName,
            applicationId: this.selectedAppId
          }
        }
        this.saveLoader = true;
        this.applicationService.updateNestCommonAPI("cp/MenuTheme", this.policyTheme, obj).subscribe({
          next: (res) => {
            this.saveLoader = false;
            if (res.isSuccess) {
              this.policyTheme = '';
              this.themeName = '';
              this.getTheme(this.selectedAppId);
              this.toastr.success(res.message, { nzDuration: 3000 });
            } else
              this.toastr.error(res.message, { nzDuration: 3000 });
          }, error: (error) => {
            this.toastr.error(JSON.stringify(error), { nzDuration: 3000 });
            this.saveLoader = false;
          }
        })
      }
      else {
        const obj = {
          "MenuTheme": {
            theme: saveTheme,
            name: this.themeName,
            applicationId: this.selectedAppId
          }
        }
        this.saveLoader = true;
        this.applicationService.addNestCommonAPI("cp", obj).subscribe({
          next: (res) => {
            this.saveLoader = false;
            if (res.isSuccess) {
              this.getTheme(this.selectedAppId);
              this.policyTheme = '';
              this.themeName = '';
              this.toastr.success(res.message, { nzDuration: 3000 });
            } else
              this.toastr.error(res.message, { nzDuration: 3000 });
          },
          error: (error) => {
            this.saveLoader = false;
            this.toastr.error(JSON.stringify(error), { nzDuration: 3000 });
          }
        })
      }
    } else {
      this.toastr.warning('Please Enter Data', { nzDuration: 3000 });
    }
  }
  cloneThemeConfirmation() {
    if (this.policyTheme) {
      this.modalService.confirm({
        nzClassName: 'confirm-modal',
        nzTitle: '<p class="font-bold">Are you sure you want to clone this theme?</p>',
        nzContent: '',
        nzOnOk: () => this.cloneTheme()
      });
    } else {
      this.toastr.warning('Please select theme to clone ', { nzDuration: 3000 });
    }

  }
  cloneTheme() {
    const saveTheme = JSON.parse(JSON.stringify(this.selectedTheme));
    delete saveTheme?.allMenuItems;
    delete saveTheme?.menuChildArrayTwoColumn;
    delete saveTheme?.newMenuArray;
    if (this.policyTheme) {
      const obj = {
        "MenuTheme": {
          theme: saveTheme,
          name: this.themeName,
          applicationId: this.selectedAppId
        }
      }
      this.saveLoader = true;
      this.applicationService.addNestCommonAPI("cp", obj).subscribe({
        next: (res) => {
          this.saveLoader = false;
          if (res.isSuccess) {
            this.policyTheme = '';
            this.themeName = '';
            this.getTheme(this.selectedAppId);
            this.toastr.success(res.message, { nzDuration: 3000 });
          } else
            this.toastr.error(res.message, { nzDuration: 3000 });
        }, error: (error) => {
          this.toastr.error(JSON.stringify(error), { nzDuration: 3000 });
          this.saveLoader = false;
        }
      })
    }
  }
  generateRandomAlphabets(length: any) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet.charAt(randomIndex);
    }

    return result;
  }
  setNewTheme(event: any) {
    if (event) {
      this.applicationService.getNestCommonAPIById("cp/MenuTheme1", event).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.selectedTheme = res.data[0].theme || [];
            this.themeName = this.themeList.find(a => a._id == this.policyTheme)?.name
            this.selectedThemeNotify.emit(this.selectedTheme);
            this.disabledButtonsFunc();
          } else
            this.toastr.error(res.message, { nzDuration: 3000 });
        }, error: (error) => {
          this.toastr.error(JSON.stringify(error), { nzDuration: 3000 });
        }
      });
    } else {
      this.disabledButtonsFunc();
    }
  }
  getTheme(value: any) {

    // this.saveLoader = true;
    if (value) {
      this.applicationService.getNestCommonAPIById("cp/MenuTheme", value).subscribe({
        next: (res) => {
          // this.saveLoader = false;
          if (res.isSuccess) {
            this.themeList = res.data || [];
            this.disabledButtonsFunc();
          } else
            this.toastr.error(res.message, { nzDuration: 3000 });
        }, error: (error) => {
          // this.saveLoader = false;
          this.toastr.error(JSON.stringify(error), { nzDuration: 3000 });
        }
      })
    }
  }
  showDeleteConfirm(): void {
    if (this.policyTheme) {
      this.modalService.confirm({
        nzTitle: 'Are you sure you want to delete this menu theme?',
        nzOkText: 'Yes',
        nzClassName: 'deleteRow',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteMenuTheme(),
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      });
    } else {
      this.toastr.warning('Please select theme to delete', { nzDuration: 3000 });
    }

  }
  deleteMenuTheme() {
    this.saveLoader = true;
    this.applicationService.deleteNestCommonAPI("cp/MenuTheme", this.policyTheme).subscribe({
      next: (res: any) => {
        this.saveLoader = false;
        if (res.isSuccess) {
          this.policyTheme = '';
          this.themeName = '';
          this.getTheme(this.selectedAppId);
          this.toastr.success(res.message, { nzDuration: 3000 });
        } else
          this.toastr.error(res.message, { nzDuration: 3000 });
      }, error: (error) => {
        this.toastr.error(JSON.stringify(error), { nzDuration: 3000 });
        this.saveLoader = false;
      }
    })
  }
  disabledButton = {
    "save": true,
    "clone": true,
    "delete": true,
    "update": false,
  }
  disabledButtonsFunc(event?: any) {
    if (this.policyTheme || this.themeName) {
      if (this.policyTheme && event == '') {
        this.disabledButton['save'] = true;
        this.disabledButton['clone'] = true;
        this.disabledButton['delete'] = false;
        this.disabledButton['update'] = false;
      }
      else if (this.policyTheme) {
        this.disabledButton['save'] = false;
        this.disabledButton['clone'] = false;
        this.disabledButton['delete'] = false;
        this.disabledButton['update'] = true;
        // let policyThemeName = this.themeList.find((theme: any) => theme._id == this.policyTheme)
        // if (policyThemeName.name === (event ? event : this.themeName)) {
        //   this.disabledButton['update'] = true;
        //   this.disabledButton['save'] = false;
        // }
      }
      else {
        this.disabledButton['save'] = false;
        this.disabledButton['clone'] = true;
        this.disabledButton['delete'] = true;
        this.disabledButton['update'] = false;
      }
    }
    else {
      this.disabledButton = {
        "save": true,
        "clone": true,
        "delete": true,
        "update": false,
      }
    }
  }
}
