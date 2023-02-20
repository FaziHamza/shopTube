import { ConfigOption } from "@ngx-formly/core";
import { FormlyFieldCustomInputComponent } from "./wrappers/formly-field-custom-input.component";
import { FormlyFieldStepper } from "./wrappers/FormlyFieldStepper";
import { FormlyHorizontalWrapper } from "./wrappers/FormlyHorizontalWrapper";
import { FormlyVerticalThemeWrapper } from "./wrappers/FormlyVerticalThemeWrapper";
import { FormlyVerticalWrapper } from "./wrappers/FormlyVerticalWrapper";
// import { FormlyHorizontalWrapper } from "./wrappers/FormlyHorizontalWrapper";

export const fieldComponents = [
    // FormlyFieldRepeatSectionComponent,
    // MultiRepeatComponent
];


export const formlyCustomeConfig: ConfigOption = {
    types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
        //   { name: 'extended-input', extends: 'input' },
        //   { name: 'customInput', component: FormlyFieldCustomInputComponent },
        // { name: 'repeatText', component: FormlyFieldInputRepeatSectionComponent },
        // { name: 'repeatSection', component: FormlyFieldRepeatSectionComponent },
        // { name: 'multiRepeatSection', component: MultiRepeatComponent },
        // { name: 'ng-select', component: FormlyFieldNgSelectComponent },
        // { name: 'ng-search', component: FormlyFieldNgSearchComponent },
        { name: 'custom', component: FormlyFieldCustomInputComponent },
        // { name: 'tabs', component: FormlyFieldTabs },
        // { name: 'tab', component: FormlyVerticalFieldTabs },
        // { name: 'repeatInput', component: FormlyGridWrapper },
        // { name: 'image-upload', component: FormlyFieldImageUploadComponent },
        // { name: 'gridrepeatsection', component: gridrepeatsection },

        //   {
        //     name: 'multicheckbox', component: FormlyFieldMultiCheckbox,
        //     defaultOptions: {
        //       templateOptions: {
        //         options: []
        //       }
        //     }
        //   },

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
