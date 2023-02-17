

export interface btnConfig {
  key?: string;
  type?: string;
  color?: string;
  title?: string,
  btnIcon?: string,
  icon?: string,
  fontSize?: string,
  fontStyle?: string,
  textColor?: string,
  bgColor?: string,
  border?: string,
  margin?: string,
  padding?: string,
  className?: string,
  target?: string,
  btnType?: string,
  href?: string,
  format?:string,
  btnDisables?:boolean;
  tooltip?: any;
  btngroupformat?: string;
  btnGroupPosition?:string;
  disabled?:boolean;
  hideExpression?: any;
  dropdownOptions?:dropdownOptions[];
}

export interface actionTypeFeild {
  form?: any;
  type?: any;
}
export interface dropdownOptions {
  label:any;
  link:any;
}

export interface actionConfig {
  key?: string;
  redirection?: string;
  method?: string,
  title?: string,
  successMessage?: string,
  errorMessage?: string,
  isDailoge?: boolean,
}

export interface btnGroup {
  name?: string;
  aligmentChange?: string;
  btnGroupFormat?: string;
  highLight?: boolean;
  
  
  btnGroupPosition?: string;
  // btnPosition?: string;
  btnConfig:btnConfig[],
}