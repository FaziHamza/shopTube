import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'st-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {
  @Input() data: any = {};
  @Input() screenName: any;
  @Input() update: any;
  @Input() type: any;
  form: FormGroup;
  newComment: any = '';
  saveLoader: boolean = false;
  requestSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    public builderService: BuilderService,
    private toastr: NzMessageService,
    public dataSharedService: DataSharedService,
    private applicationService: ApplicationService,
  ) {
  }

  ngOnInit(): void {
    this.create();
  }
  readonly #modal = inject(NzModalRef);

  create() {
    this.form = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    debugger
    if (this.type != 'menu') {
      if (!this.screenName) {
        this.toastr.warning("Please select any screen", { nzDuration: 3000 });
        return;
      }
    }


    if (!this.form.valid) {
      this.toastr.warning('Please fill this', { nzDuration: 3000 });
      return;
    }


    const userData = JSON.parse(localStorage.getItem('user')!);
    let commentObj = {
      // id:0,
      screenid: this.screenName,
      datetime: new Date(),
      message: this.form.value.message,
      status: this.update ? this.form.value.status : 'backlog',
      organizationid: JSON.parse(localStorage.getItem('organizationId')!),
      applicationid: JSON.parse(localStorage.getItem('applicationId')!),
      componentid: this.data.id,
      createdby: userData.username,
      parentid: "",
      type: this.type
    }
    const userCommentModel = {
      "UserComment": commentObj
    }
    let requestObservable: Observable<any>;
    this.saveLoader = true;
    debugger
    if (!this.update) {
      requestObservable = this.applicationService.addNestCommonAPI('knex-crud/task', commentObj);
    } else {
      userCommentModel.UserComment['componentid'] = this.update.componentId;
      requestObservable = this.applicationService.updateNestCommonAPI(
        'cp/UserComment',
        this.update._id,
        userCommentModel
      );
    }


    this.requestSubscription = requestObservable.subscribe({
      next: (res: any) => {
        this.saveLoader = false;
        if (res.id) {
          this.create();
          this.#modal.destroy(commentObj);
          if (window.location.href.includes('taskmanager.com')) {
            this.dataSharedService.taskmanager.next(true);
          }
          this.toastr.success(`UserComment save succesfully`, { nzDuration: 3000 });
        } else {
          this.toastr.error(`UserComment: ${res.message}`, { nzDuration: 3000 });
        }
      },
      error: () => {
        this.saveLoader = false;

        this.toastr.error('UserComment: An error occurred', { nzDuration: 3000 });
      }
    });
  }

  getCommentsData(): void {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/UserComment').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`User Comment : ${res.message}`, { nzDuration: 3000 });
          this.dataSharedService.screenCommentList = res.data;
          this.#modal.destroy(this.newComment);
          // error
        } else {
          this.toastr.error(`UserComment : ${res.message}`, { nzDuration: 3000 });
          this.#modal.destroy();
        }

      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
        this.#modal.destroy();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

}
