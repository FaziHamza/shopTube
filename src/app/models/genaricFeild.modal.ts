import { FormlyFieldConfig } from "@ngx-formly/core";

  export class GenaricFeild {
    title?: string;
    formData?:FormlyFieldConfig[]
    commonData?:FormlyFieldConfig[]
    type:string;
    modelData:any;

    constructor(data:any){
      this.commonData = data.commonData;
      this.formData= data.formData;
      this.title=data.title;
      this.type=data.type;
      this.modelData=data.modelData;
    }
  }
