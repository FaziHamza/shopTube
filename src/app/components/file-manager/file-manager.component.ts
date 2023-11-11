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
  breadcrumbFolder: any[] = [];
  ngOnInit(): void {
    this.loadFolder();
  }

  loadFolder() {
    if (this.breadcrumbFolder.length == 0) {
      this.getAllFolders();
    }
    else {
      this.getSubFolder(this.selectedFolder);
    }
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

  selectSubFolder(folder: any) {
    this.breadcrumbFolder.push(folder);
    this.getSubFolder(folder);
  }

  selectedFolder: any;
  getSubFolder(folder: any) {
    this.selectedFolder = folder;
    this.saveLoader = true;
    this.folderName = '';
    this.folderList = [];

    this.applicationService.getNestCommonAPI('s3-file-manager/folderwithFiles/' + folder._id).subscribe(res => {
      this.saveLoader = false;
      if (res.isSuccess) {
        this.folderList = res?.data?.folderList;
        this.filesList = res?.data?.filesList;
      }
      else {
        this.filesList = [];
        this.folderList = [];
      }
    })
  }
  gotoFolder(index:number){
    this.selectedFolder =  this.breadcrumbFolder[index];
    this.breadcrumbFolder = this.breadcrumbFolder.splice(0,index+1);
    this.getSubFolder(this.selectedFolder);
  }
  remove(item: any) {
    this.applicationService.addNestCommonAPI('s3-file-manager/deleteFile', item._id).subscribe(res => {
      if (res.isSuccess) {
        this.loadFolder();
      }
    })
  }
  addFolder() {
    const gets3Folder = this.breadcrumbFolder.map(a => a.folderName);
    const model = {
      folderName: this.folderName,
      parentId: this.selectedFolder?._id,
      s3folderName: gets3Folder.join('/') + '/' + this.folderName
    };

    this.applicationService.addNestCommonAPI('s3-file-manager/createfolder', model).subscribe(res => {
      if (res.isSuccess) {
        this.folderName = '';
        this.loadFolder();
      }
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }
  uploadFile(file: File) {
    const gets3Folder = this.breadcrumbFolder.map(a => a.folderName);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('parentId', this.selectedFolder?._id);
    formData.append('path', gets3Folder.join('/'));
    this.applicationService.uploadS3File(formData).subscribe({
      next: (res) => {
        this.loadFolder();

        console.log('File uploaded successfully:', res);
      },
      error: (err) => {
        // this.isLoading = false;
        console.error('Error uploading file:', err);
      }
    });

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
