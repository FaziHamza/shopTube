import { FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, inject, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'st-add-control-common-properties',
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
    {
      fieldGroup: [
        {
          key: 'isSubmit',
          type: 'checkbox',
          default: false,
          wrappers: ["formly-vertical-theme-wrapper"],
          props: {
            label: 'Submit',
          },
          expressionProperties: {
            hide: "model.type!='insertButton'",
          },
        },
      ],
    },
    {
      fieldGroup: [
        {
          key: 'type',
          type: 'input',
          defaultValue: '',
          wrappers: ["formly-vertical-theme-wrapper"],
          hideExpression: true,
          props: {
            label: 'type',
            placeholder: 'type',
          }
        },
      ],
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  readonly #modal = inject(NzModalRef);

  saveCommon(): void {

    this.#modal.destroy(this.model);
  }
  cancel(){
    this.#modal.destroy();
  }
}
