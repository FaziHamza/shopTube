import { FormlyFieldConfig } from "@ngx-formly/core";

export class GenaricFeild {
  title?: string;
  formData?: FormlyFieldConfig[]
  commonData?: FormlyFieldConfig[]
  dynamicSectionConfig?: FormlyFieldConfig[]
  type: string;
  modelData: any;
  dynamicSectionNode: any;

  constructor(data: any) {
    this.commonData = data.commonData;
    this.formData = data.formData;
    this.title = data.title;
    this.type = data.type;
    this.modelData = data.modelData;
    this.dynamicSectionConfig = data.dynamicSectionConfig;
    this.dynamicSectionNode = data.dynamicSectionNode;
  }
}
