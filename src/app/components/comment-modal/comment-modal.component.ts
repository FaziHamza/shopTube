import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { ActivatedRoute } from '@angular/router';
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
  form: FormGroup;
  requestSubscription: Subscription;
  currentUser: any;
  constructor(
    private formBuilder: FormBuilder,
    public builderService: BuilderService,
    private toastr: NzMessageService,
    private route: ActivatedRoute,
    public dataSharedService: DataSharedService,
    private applicationService: ApplicationService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.create();
  }
  readonly #modal = inject(NzModalRef);
  // create form
  create() {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
      refLink: ['',],
      messageHeader: ['',],
      message: ['',],
      messageDetail: ['',],
    });
  }
  // submit form
  onSubmit() {
    debugger
    // ScreenName cannot be Null.
    if (!this.screenName) {
      this.toastr.warning("Please select any screen", { nzDuration: 3000 });
      return;
    }

    if (this.form.valid) {
      const currentDate = new Date();
      const userData = JSON.parse(localStorage.getItem('user')!);
      const commentTime = currentDate.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: '2-digit' });
      let commentObj = {
        organizationId: JSON.parse(localStorage.getItem('organizationId')!),
        applicationId: JSON.parse(localStorage.getItem('applicationId')!),
        screenId: this.screenName,
        ObjectID: this.data.id,
        whoCreated: userData.username,
        // type: this.data.type,
        comment: this.form.value.comment,
        dateTime: new Date(),
        refLink: this.form.value.refLink,
        messageHeader: this.form.value.messageHeader,
        message: this.form.value.message,
        messageDetail: this.form.value.messageDetail,
        avatar: 'avatar.png'
      }

      const userCommentModel = {
        "UserComment": commentObj
      }
      // Saving UserComment
      this.requestSubscription = this.applicationService.addNestCommonAPI('cp', userCommentModel).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.toastr.success(`UserComment : ${res.message}`, { nzDuration: 3000 });
            this.getCommentsData();

            // error
          } else this.toastr.error(`UserComment : ${res.message}`, { nzDuration: 3000 });
        },
        error: (err) => {
          // console.error(err); // Log the error to the console
          this.toastr.error("UserComment : An error occurred", { nzDuration: 3000 });
        }
      });
    }
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Get Comments Data
  getCommentsData(): void {
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/UserComment').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`User Comment : ${res.message}`, { nzDuration: 3000 });
          this.dataSharedService.screenCommentList = res.data;
          this.#modal.destroy(res.data);
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
