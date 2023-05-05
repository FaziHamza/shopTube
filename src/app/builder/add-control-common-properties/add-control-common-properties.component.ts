import { FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Component,OnInit, inject,Input} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-control-common-properties',
  templateUrl: './add-control-common-properties.component.html',
  styleUrls: ['./add-control-common-properties.component.scss']
})
export class AddControlCommonPropertiesComponent implements OnInit {
  form = new FormGroup({});

  @Input() model: any = {};

  options: FormlyFormOptions = {};
  fields: any = [
    {
      fieldGroup: [
        {
          key: 'key',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Key',
            placeholder: 'Enter Key'
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'title',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Title',
            placeholder: 'Enter Title'
          },
        },
      ],
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }
  readonly #modal = inject(NzModalRef);

  saveCommon(): void {
    debugger
    this.#modal.destroy(this.model );
  }
}