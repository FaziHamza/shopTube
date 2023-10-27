import { Component, Input, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'st-downloadbutton',
  templateUrl: './downloadbutton.component.html',
  styleUrls: ['./downloadbutton.component.scss']
})
export class DownloadbuttonComponent {
  @Input() buttonData: any;
  @Input() title: any;
  @Input() tableRowId: any;
  @Input() softIconList: any;
  @Input() screenId: any;
  @Input() formlyModel: any;
  @Input() form: any;
  @Input() screenName: any;
  @Input() path: any;
  // @Output() notify: EventEmitter<any> = new EventEmitter();
  bgColor: any;
  hoverTextColor: any;
  dataSrc: any;
  isShow: Boolean = false;
  color: "hover:bg-[#000000]";
  borderColor: any;
  isVisible = false;
  saveHoverIconColor: any;
  hoverOpacity = '';
  nodes: any[] = [];
  responseData: any;
  loader: boolean = false;
  requestSubscription: Subscription;
  serverPath = environment.nestBaseUrl

  constructor(private applicationService: ApplicationService , private toastr: NzMessageService,) {

  }
  ngOnInit(): void {
    this.hoverTextColor = this.buttonData?.textColor ? this.buttonData?.textColor : '';
    this.bgColor = this.buttonData?.color ? this.buttonData?.color : '';
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

  handleButtonClick(buttonData: any) {

  }

  downloadReport(buttonData: any) {
    debugger
    if (this.path || this.path == 'notApproved') {
      if (this.path == 'notApproved') {
        this.toastr.warning('User is not approved', {
          nzDuration: 3000,
        });
        return;
      }
      const pdfFileUrl = this.serverPath + this.path;
      if (pdfFileUrl.includes('.pdf')) {
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = pdfFileUrl;
        anchor.target = '_blank'; // Open in a new tab/window

    //     // Set a filename for the downloaded file
    //     anchor.download = 'your-pdf-filename.pdf';

        // Trigger a click event on the anchor element
        anchor.click();
      }
    }
    else if (buttonData.path) {
      if (buttonData.path.includes('.pdf')) {
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = buttonData.path;
        anchor.target = '_blank'; // Open in a new tab/window

        // Set a filename for the downloaded file
        anchor.download = 'your-pdf-filename.pdf';

        // Trigger a click event on the anchor element
        anchor.click();
      }
      else if (buttonData.path.endsWith('.jpg') || buttonData.path.endsWith('.png')) {
        let name = buttonData.path;
        var link = document.createElement("a");
        if (name)
          link.setAttribute('download', '');
        link.href = buttonData.path;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
    else {
      this.toastr.warning('Path did not exist', {
        nzDuration: 3000,
      });
    }
  }

  downloadImage() {

  }
}
