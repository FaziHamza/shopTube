import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {
  @Input() data: any = {};
  form: FormGroup;
  requestSubscription: Subscription;
  constructor(private formBuilder: FormBuilder, public builderService: BuilderService, private toastr: NzMessageService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  onSubmit() {
    debugger
    if (this.form.valid) {
      this.route.url.subscribe((segments) => {
        const component = segments[segments.length - 1].path;
        const currentDate = new Date();
        const hours = this.padZero(currentDate.getHours());
        const minutes = this.padZero(currentDate.getMinutes());
        const seconds = this.padZero(currentDate.getSeconds());
        let commentObj = {
          commentId: this.data.id,
          type: this.data.type,
          screenId: component,
          comment: this.form.value.comment,
          date: new Date(),
          time: `${hours}:${minutes}:${seconds}`,
        }
        this.requestSubscription = this.builderService.genericApisPost('commentList', commentObj).subscribe({
          next: (res) => {
            this.#modal.destroy();
            this.toastr.success("Data saved Successfully", { nzDuration: 3000 }); // Show an error message to the user
          },
          error: (err) => {
            console.error(err); // Log the error to the console
            this.toastr.error("An error occurred", { nzDuration: 3000 }); // Show an error message to the user
            this.#modal.destroy();
          }
        });
      });
    }
  }
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  readonly #modal = inject(NzModalRef);

}
