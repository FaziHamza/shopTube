import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private activatedRoute: ActivatedRoute) { }
  resData: any = [];
  fields: any = [];
  dbRes : any = [];
  // fields: FormlyFieldConfig[] = [
  //   {
  //     fieldGroupClassName: "flex flex-wrap",
  //     "fieldGroup": [
  //       {
  //         className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2 bg-blue-500",
  //         "key": "text_69be54cd",
  //         "type": "input",
  //         "defaultValue": "",
  //         "focus": false,
  //         "wrappers": [
  //           "form-field-horizontal",
  //         ],
  //         "templateOptions": {
  //           "attributes": {
  //             "autocomplete": "off"
  //           },
  //           "addonLeft": {
  //             "text": ""
  //           },
  //           "addonRight": {
  //             "text": ""
  //           },
  //           "labelPosition": "text-right",
  //           "className": "col-md-6 col-xs-12",
  //           "label": "Text_Text1",
  //           "placeholder": "Enter Text",
  //           "error": null,
  //           "tooltip": {
  //             "content": ""
  //           },
  //           "labelIcon": "",
  //           "name": "",
  //           "minLength": 0,
  //           "maxLength": 0 ,
  //           "readonly": false,
  //           "hidden": false,
  //           "disabled": false
  //         },
  //         "hideExpression": false,
  //         "id": "formly_32_input_text_69be54cd_0",
  //         "hooks": {},
  //         "modelOptions": {},
  //         "resetOnHide": true,
  //         "expressionProperties": {},
  //         "validation": {}
  //       },
  //       {
  //         className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //         "key": "text_d67b3cee",
  //         "type": "input",
  //         "defaultValue": "",
  //         "focus": false,
  //         wrappers: ['form-field-horizontal'],
  //         "templateOptions": {
  //           "attributes": {
  //             "autocomplete": "off"
  //           },
  //           "addonLeft": {
  //             "text": ""
  //           },
  //           "addonRight": {
  //             "text": ""
  //           },
  //           "labelPosition": "text-right",
  //           "className": "col-md-6 col-xs-12",
  //           "label": "Text_Text1",
  //           "placeholder": "Enter Text",
  //           "error": null,
  //           "tooltip": {
  //             "content": ""
  //           },
  //           "labelIcon": "",
  //           "name": "",
  //           "minLength": 0,
  //           "maxLength": 0,
  //           "readonly": false,
  //           "hidden": false,
  //           "disabled": false
  //         },
  //         "hideExpression": false,
  //         "id": "formly_32_input_text_d67b3cee_1",
  //         "hooks": {},
  //         "modelOptions": {},
  //         "resetOnHide": true,
  //         "expressionProperties": {},
  //         "validation": {}
  //       },
  //       {
  //         className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //         "key": "text_3d178c09",
  //         "type": "input",
  //         "defaultValue": "",
  //         "focus": false,
  //         "wrappers": [
  //           "form-field-horizontal",
  //         ],
  //         "templateOptions": {
  //           "attributes": {
  //             "autocomplete": "off"
  //           },
  //           "addonLeft": {
  //             "text": ""
  //           },
  //           "addonRight": {
  //             "text": ""
  //           },
  //           "labelPosition": "text-right",
  //           "className": "col-md-6 col-xs-12",
  //           "label": "Text_Text1",
  //           "placeholder": "Enter Text",
  //           "error": null,
  //           "tooltip": {
  //             "content": ""
  //           },
  //           "labelIcon": "",
  //           "name": "",
  //           "minLength": 0,
  //           "maxLength": 0,
  //           "readonly": false,
  //           "hidden": false,
  //           "disabled": false
  //         },
  //         "hideExpression": false,
  //         "id": "formly_32_input_text_3d178c09_2",
  //         "hooks": {},
  //         "modelOptions": {},
  //         "resetOnHide": true,
  //         "expressionProperties": {},
  //         "validation": {}
  //       }
  //     ],
  //     "id": "formly_29___0",
  //     "hooks": {},
  //     "modelOptions": {},
  //     "templateOptions": {},
  //     "resetOnHide": true,
  //     "type": "formly-group",
  //     "wrappers": [],
  //     "expressionProperties": {},
  //     "validation": {}
  //   }
  // ]
  // fields: FormlyFieldConfig[] = [
  //   {
  //     fieldGroupClassName: "flex flex-wrap",
  //     fieldGroup: [
  //       {
  //         className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //         key: 'key',
  //         type: 'input',
  //         // wrappers: ['form-field-horizontal'],
  //         templateOptions: {
  //           label: 'Key',
  //           required: true,
  //           pattern: /^[a-z0-9_]+$/,
  //         }
  //       },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'id',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'ID',
  //       //     pattern: '^\\S*$',
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'label',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'label'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'labelIcon',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'label Icon'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'tooltip',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Tooltip',
  //       //   }
  //       // },
  //       // {
  //       //   key: 'className',
  //       //   type: 'select',
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   templateOptions: {
  //       //     label: 'column',
  //       //     options: [
  //       //       {
  //       //         label: 'col-2',
  //       //         value: 'col-md-2 col-sm-6 col-xs-12'
  //       //       },
  //       //       {
  //       //         label: 'col-3',
  //       //         value: 'col-md-3 col-sm-6 col-xs-12'
  //       //       },
  //       //       {
  //       //         label: 'col-4',
  //       //         value: 'col-md-4 col-sm-6 col-xs-12'
  //       //       },
  //       //       {
  //       //         label: 'col-6',
  //       //         value: 'col-md-6 col-xs-12'
  //       //       },
  //       //       {
  //       //         label: 'col-8',
  //       //         value: 'col-md-8 col-xs-12'
  //       //       },
  //       //       {
  //       //         label: 'col-9',
  //       //         value: 'col-md-9 col-xs-12'
  //       //       },
  //       //       {
  //       //         label: 'col-10',
  //       //         value: 'col-md-10 col-xs-12'
  //       //       },
  //       //       {
  //       //         label: 'col-12',
  //       //         value: 'col-12'
  //       //       }
  //       //     ]
  //       //   },
  //       //   defaultValue: 'col-4'
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'placeholder',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'placeholder'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'default',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'default value',
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'getVariable',
  //       //   type: 'select',
  //       //   templateOptions: {
  //       //     label: 'Get Variable',
  //       //     options:[]
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'setVariable',
  //       //   type: 'select',
  //       //   templateOptions: {
  //       //     label: 'Set Variable',
  //       //     options:[]
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'minlength',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Min Length',
  //       //     type: 'number',
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'maxlength',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Max Length',
  //       //     type: 'number',
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'addonLeft',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Add On Left Text'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'addonRight',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Add On Right Text'
  //       //   }
  //       // },
  //       // {
  //       //   template: '<div class="mt-3"></div>'
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'margin',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Margin',
  //       //     placeholder: '0px 0px 0px 0px'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'padding',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Padding',
  //       //     placeholder: '0px 0px 0px 0px'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'border',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Border',
  //       //     placeholder: '2px solid blue'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'bgColor',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Backgroung Color',
  //       //     type: 'color'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'textColor',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Text Color',
  //       //     type: 'color'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'fontSize',
  //       //   type: 'input',
  //       //   templateOptions: {
  //       //     label: 'Font Size',
  //       //     placeholder: '12px'
  //       //   }
  //       // },
  //       // {
  //       //   className: "w-full sm:w-1/2 md:w-1/3 mb-4 px-2",
  //       //   key: 'fontStyle',
  //       //   type: 'select',
  //       //   templateOptions: {
  //       //     label: 'Font Style',
  //       //     options: [
  //       //       {
  //       //         label: 'Normal',
  //       //         value: 'normal'
  //       //       },
  //       //       {
  //       //         label: 'Italic',
  //       //         value: 'italic'
  //       //       },
  //       //       {
  //       //         label: 'Oblique',
  //       //         value: 'oblique'
  //       //       }
  //       //     ]
  //       //   },
  //       //   defaultValue: 'normal'
  //       // },
  //       // {
  //       //   template: '<div class="mt-3"></div>'
  //       // },
  //       // {
  //       //   className: "col-md-2 col-sm-2 col-xl-2 col-xs-6 mt-2",
  //       //   key: 'focus',
  //       //   type: 'checkbox',
  //       //   templateOptions: {
  //       //     label: 'Autofocus'
  //       //   },
  //       //   defaultValue: false
  //       // },
  //       // {
  //       //   className: "col-md-2 col-sm-2 col-xl-2 col-xs-6 mt-2",
  //       //   key: 'required',
  //       //   type: 'checkbox',
  //       //   templateOptions: {
  //       //     label: 'required'
  //       //   },
  //       //   defaultValue: false
  //       // },
  //       // {
  //       //   className: "col-md-2 col-sm-2 col-xl-2 col-xs-6 mt-2",
  //       //   key: 'readonly',
  //       //   type: 'checkbox',
  //       //   templateOptions: {
  //       //     label: 'Readonly'
  //       //   },
  //       //   defaultValue: false
  //       // },
  //       // {
  //       //   className: "col-md-2 col-sm-2 col-xl-2 col-xs-6 mt-2",
  //       //   key: 'disabled',
  //       //   type: 'checkbox',
  //       //   templateOptions: {
  //       //     label: 'Disabled',
  //       //   },
  //       //   defaultValue: false
  //       // },
  //       // {
  //       //   className: "col-md-2 col-sm-2 col-xl-2 col-xs-6 mt-2",
  //       //   key: 'hideExpression',
  //       //   type: 'checkbox',
  //       //   templateOptions: {
  //       //     label: 'Hide',
  //       //   },
  //       //   defaultValue: false
  //       // },
  //       // {
  //       //   key: 'repeat',
  //       //   type: 'checkbox',
  //       //   className: "col-md-2 col-sm-2 col-xl-2 col-xs-6 mt-2",
  //       //   templateOptions: {
  //       //     label: 'Repeat'
  //       //   },
  //       // },
  //     ]
  //   },
  // ]
  ngOnInit(): void {
    debugger
    this.activatedRoute.params.subscribe((params: Params) => {
      this.employeeService.jsonBuilderSetting(params["schema"]).subscribe((res => {
        if (res.length > 0) {
          this.dbRes =  res[0].menuData;
          this.resData = res[0].menuData[0].children[1].chartCardConfig[0][0].chartCardConfig[0].formly;
          if (this.resData.length > 0) {
            this.resData[0].fieldGroup.forEach((a: any) => {
              if (a.wrappers[0] == 'form-field-horizontal')
                var newWrappers: any = ["form-field-horizontal"];
              a.wrappers = newWrappers;
            });
            this.fields = this.resData;
          }
        }
      }));
    });

  }

}
