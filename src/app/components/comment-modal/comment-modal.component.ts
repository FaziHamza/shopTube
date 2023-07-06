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
  constructor(
    private formBuilder: FormBuilder,
    public builderService: BuilderService,
    private toastr: NzMessageService,
    private route: ActivatedRoute,
    public dataSharedService: DataSharedService,
    private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.create();
  }
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
    // ScreenName cannot be Null.
    if (!this.screenName) {
      this.toastr.warning("Please select any screen", { nzDuration: 3000 });
      return;
    }

    if (this.form.valid) {
      const currentDate = new Date();
      const commentTime = currentDate.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: '2-digit' });
      let commentObj = {
        // commentId: this.data.id,
        type: this.data.type,
        screenId: this.screenName,
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
            this.#modal.destroy();

            // error
          } else this.toastr.error(`UserComment : ${res.message}`, { nzDuration: 3000 });
        },
        error: (err) => {
          // console.error(err); // Log the error to the console
          this.toastr.error("UserComment : An error occurred", { nzDuration: 3000 });
          this.#modal.destroy();
        }
      });
    }
  }
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  readonly #modal = inject(NzModalRef);

  // Get Comments Data
  getCommentsData(): void {
    debugger
    this.requestSubscription = this.applicationService.getNestCommonAPI('cp/UserComment').subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(`User Comment : ${res.message}`, { nzDuration: 3000 });
          this.dataSharedService.screenCommentList = res.data;

          // error
        } else this.toastr.error(`UserComment : ${res.message}`, { nzDuration: 3000 });

      },
      error: (err) => {
        console.error(err); // Log the error to the console
        this.toastr.error(`UserComment : An error occurred`, { nzDuration: 3000 });
        this.#modal.destroy();
      }
    });
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }

}
