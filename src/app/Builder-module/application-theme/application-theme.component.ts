import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-application-theme',
  templateUrl: './application-theme.component.html',
  styleUrls: ['./application-theme.component.scss']
})
export class ApplicationThemeComponent {
  @Input() applicationList: any;
  selectedApplication: any;
  selectedTag: any;
  themeName: string = '';
  editId = '';
  tagList: any[] = [
    "p", "input", 'button'
  ];
  form: FormGroup;
  isSubmit: boolean = false;
  loader: boolean = false;
  displayData: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 6;
  constructor(private fb: FormBuilder, private applicationService: ApplicationService, private toastr: NzMessageService,) {
    this.form = this.fb.group({
      id: [''], // Application is required
      applicationId: ['', Validators.required], // Application is required
      tag: ['', Validators.required], // Tag is required
      classes: ['', Validators.required], // Classes is required
    });
  }
  ngOnInit() {
    this.getApplicationTheme();
  }


  save() {
    debugger
    if (this.form.valid) {
      let obj: any = {
        applicationTheme: {}
      }
      obj.applicationTheme = JSON.parse(JSON.stringify(this.form.value));
      obj.applicationTheme['name'] = this.form.value.tag;
      let app = this.applicationList.find((a: any) => a._id == this.form.value.applicationId);
      obj.applicationTheme['applicationName'] = app.name
      let classNamesString = JSON.parse(JSON.stringify(this.form.value.classes));
      obj.applicationTheme['classes'] = classNamesString.replace(/\s+/g, ',').split(',');
      this.loader = true;
      const checkPolicyAndProceed = this.editId == ''
        ? this.applicationService.addNestCommonAPI('cp', obj)
        : this.applicationService.updateNestCommonAPI('cp/applicationTheme', this.editId, obj);
      checkPolicyAndProceed.subscribe({
        next: (objTRes: any) => {
          this.loader = false;
          if (objTRes.isSuccess) {
            this.form.reset();
            this.getApplicationTheme();
          } else {
            this.toastr.error(objTRes.message, { nzDuration: 3000 });
          }
        },
        error: (err) => {
          this.loader = false;
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
    else {
      this.toastr.warning('Please enter data', { nzDuration: 3000 });
    }
  }

  getApplicationTheme() {
    this.loader = true;
    this.applicationService.getNestCommonAPI('cp/applicationTheme').subscribe(((res: any) => {
      this.loader = false;
      if (res.isSuccess) {
        this.displayData = res.data
      } else
        this.toastr.warning(res.message, { nzDuration: 2000 });
    }));
  }
  delete(id: any) {
    this.loader = true;
    this.applicationService.deleteNestCommonAPI('cp/applicationTheme', id).subscribe(((res: any) => {
      this.loader = false;
      if (res.isSuccess) {
        this.getApplicationTheme();
      } else
        this.toastr.warning(res.message, { nzDuration: 2000 });
    }));
  }
  edit(data: any) {
    this.editId = data._id;
    this.form.patchValue({
      applicationId: data?.applicationId,
      tag: data?.name,
      classes: data?.classes.join(' '), // Join the array elements with a space
    });
  }


}
