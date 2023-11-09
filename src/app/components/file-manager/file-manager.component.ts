import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  folderList: any[] = []
  filesList: any[] = [];
  saveLoader: boolean = false;
  folderName: string = '';
  constructor(private applicationService: ApplicationService) { }
  selectedFolder: string = '';
  ngOnInit(): void {
    this.getAllFolders();
  }

  getAllFolders() {
    this.applicationService.getBackendCommonAPI('s3-file-manager/getParentFolders').subscribe(res => {
      if (res.isSuccess) {
        this.folderList = res.data || []
        console.log(res);
      } else {
        this.folderList = [];
      }
    })
  }
  getSubFolder(folderName: any) {
    this.saveLoader = true;
    this.selectedFolder = this.selectedFolder + folderName + "/";
    this.folderName = '';
    this.folderList = [];
    this.applicationService.getBackendCommonAPI('s3-file-manager/folderwithFiles/' + folderName).subscribe(res => {
      this.saveLoader = false;
      if (res.isSuccess) {
        this.filesList = res?.data || [];
      } else {
        this.filesList = [];
      }
      this.getFolderandFiles();
    })
  }
  subFolderList: any[] = [];
  getFolderandFiles() {
    const getFolderDetails = this.filesList.filter(a => a.type == "application/octet-stream");
    this.subFolderList = getFolderDetails;
    const filesDetails = this.filesList.filter(a => a.type != "application/octet-stream");
    this.filesList = filesDetails;
  }
  remove(item: any) {
    const model = {
      fileName: item.fileName
    }
    this.applicationService.addNestCommonAPI('s3-file-manager/deleteFile', model).subscribe(res => {
      if (res.isSuccess) {
        this.filesList = this.filesList.filter(a => a.fileName != item.fileName);
      }
    })
  }
  addFolder() {
    const folderName = this.selectedFolder ? `${this.selectedFolder}${this.folderName}` : this.folderName;

    const model = {
      folderName,
    };

    this.applicationService.addNestCommonAPI('s3-file-manager/createfolder', model).subscribe(res => {
      if (res.isSuccess) {
        if (!this.selectedFolder)
          this.folderList.push(this.folderName);
        else
          this.selectedFolder = this.selectedFolder + this.folderName + "/";
      }
    })
  }
  iconClass(fileType: string) {
    let iconName = 'fas fa-file'; // Default icon for unknown file types

    switch (fileType) {
      case 'application/pdf':
        iconName = 'fas fa-file-pdf';
        break;
      case 'image/png':
      case 'image/jpeg':
        iconName = 'fas fa-file-image';
        break;
      case 'text/plain':
        iconName = 'fas fa-file-alt';
        break;
      case 'application/msword':
        iconName = 'fas fa-file-word';
        break;
      case 'application/vnd.ms-excel':
        iconName = 'fas fa-file-excel';
        break;
      case 'application/vnd.ms-powerpoint':
        iconName = 'fas fa-file-powerpoint';
        break;
      case 'application/zip':
        iconName = 'fas fa-file-archive';
        break;
      case 'video/mp4':
        iconName = 'fas fa-file-video';
        break;
    }

    return iconName;
  }


  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }
}
