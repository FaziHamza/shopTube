import { ConfigOption } from "@ngx-formly/core";
import { FormlyFieldCustomInputComponent } from "./wrappers/formly-field-custom-input.component";
import { FormlyFieldNgSearchComponent } from "./wrappers/formly-field-ng-search.component";
import { FormlyFieldNgSelectComponent } from "./wrappers/formly-field-ng-select.component";
import { FormlyFieldRangeDate } from "./wrappers/FormlyFieldRangeDate";
import { FormlyFieldStepper } from "./wrappers/FormlyFieldStepper";
import { FormlyFieldTimePicker } from "./wrappers/FormlyFieldTimePicker";
import { FormlyHorizontalWrapper } from "./wrappers/FormlyHorizontalWrapper";
import { FormlyFieldMultiCheckbox } from "./wrappers/FormlyMultiCheckbox";
import { FormlyVerticalThemeWrapper } from "./wrappers/FormlyVerticalThemeWrapper";
import { FormlyVerticalWrapper } from "./wrappers/FormlyVerticalWrapper";
// import { FormlyHorizontalWrapper } from "./wrappers/FormlyHorizontalWrapper";

export const fieldComponents = [
  FormlyFieldCustomInputComponent,
    FormlyFieldNgSearchComponent,
    FormlyFieldNgSelectComponent,
    FormlyFieldMultiCheckbox,
    FormlyHorizontalWrapper,
    FormlyVerticalWrapper,
    FormlyVerticalThemeWrapper,
    FormlyFieldRangeDate,
    FormlyFieldTimePicker,
];


export const formlyCustomeConfig: ConfigOption = {
    types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
        //   { name: 'extended-input', extends: 'input' },
        // { name: 'repeatText', component: FormlyFieldInputRepeatSectionComponent },
        // { name: 'repeatSection', component: FormlyFieldRepeatSectionComponent },
        // { name: 'multiRepeatSection', component: MultiRepeatComponent },
        { name: 'ng-select', component: FormlyFieldNgSelectComponent },
        { name: 'ng-search', component: FormlyFieldNgSearchComponent },
        { name: 'custom', component: FormlyFieldCustomInputComponent },
        { name: 'rangedatetime', component: FormlyFieldRangeDate },
        { name: 'timepicker', component: FormlyFieldTimePicker },
        // { name: 'tabs', component: FormlyFieldTabs },
        // { name: 'tab', component: FormlyVerticalFieldTabs },
        // { name: 'repeatInput', component: FormlyGridWrapper },
        // { name: 'image-upload', component: FormlyFieldImageUploadComponent },
        // { name: 'gridrepeatsection', component: gridrepeatsection },

          {
            name: 'multicheckbox', component: FormlyFieldMultiCheckbox,
            defaultOptions: {
              templateOptions: {
                options: []
              }
            }
          },

        //   {
        //     name: 'select', component: FormlyFieldSelect,
        //     defaultOptions: {
        //       templateOptions: {
        //         options: []
        //       }
        //     }
        //   },

    ],
    validationMessages: [
        { name: 'required', message: 'This field is required' },
    ],
    wrappers: [
        { name: 'form-field-horizontal', component: FormlyHorizontalWrapper },
        { name: 'formly-vertical-wrapper', component: FormlyVerticalWrapper },
        { name: 'formly-vertical-theme-wrapper', component: FormlyVerticalThemeWrapper },
        // { name: 'floating-label', component: FormlyFloatingLabelWrapper },

    ]
};
