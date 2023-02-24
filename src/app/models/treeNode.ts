import { FormlyFieldConfig } from "@ngx-formly/core";
import { badge } from "./badge";
import { actionConfig, btnConfig, btnGroup } from "./btnConfig";
import { builderConfig } from "./cardConfig";
import { formlyConfig } from "./formlyConfig";
import { gridConfig } from "./gridConfig";
import { headerConfig } from "./headerConfig"

export interface TreeNode {
  id: string;
  screenId?: string;
  type?: string;
  editor?: any;
  formatter?: any;
  actionType?: string;
  formlyType?: string;
  wrapper?: string;
  highLight?:boolean;
  isNextChild?:boolean;
  padding?:any;
  hideExpression?:boolean;
  paddingLeft?:any;
  paddingRight?:any;
  paddingTop?:any;
  paddingBottom?:any;
  showValue?:boolean;
  className?: string;
  alt?: any;
  source?: any;
  imagHieght?: any;
  imageWidth?: any;
  base64Image?: any;
  imageClass?: any;
  data?: any;
  style?: any;
  fontSize?: any;
  textAlign?: any;
  headingColor?: any;
  classNameForPosition?: any;
  dividerClassName?: any;
  dividerPosition?: any;
  options?: any;
  text?: any;
  lineColor?: any;
  textcolorForStyle?: any;
  lineColorForStyle?: any;
  dividerFormat?: any;
  verticalLineHieght?: any;
  verticalLinePosition?: any;
  verticalLinePositionForCssBinding?: any;
  verticalLineHieghtForCssBinding?: any;
  verticalLineColorForCssBinding?: any;
  // fieldGroupClassName:?string;
  children: TreeNode[];
  rowData?: any;
  columnData?:any;
  expanded?: boolean;
  screenVariables?: any[];
  sectionDisabled?: string;
  position?: string,
  header?: any;
  name?: any;
  total?: any;
  sortingType?: any;
  showColumn?: any;
  editorType?: any;
  jsonData?: string,
  formly?: FormlyFieldConfig[],
  formlyData?: any[],
  pageFooterData?: any[],
  pageFooterButtonGroupData?: any[],
  pageHeaderData?: any[],
  pageHeaderButtonGroupData?: any[],
  pageHeaderAlertData?:any[],
  btnConfig?: btnConfig[],
  buttonGroupData?: any[],
  headerButtonGroupData?: any[],
  bodyButtonGroupData?: any[],
  footerButtonGroupData?: any[],
  buttonGroup?: btnGroup[],
  actionConfig?: actionConfig,
  // btnConfig?: any[],
  gridConfig?: any,
  haediing?: string,
  viewType?: string,
  tooltip?: any,
  switchType?: any,
  switchPosition?: any,
  timeOut?: any,
  positionClass?: any,
  progressBar?: any,
  message?: any,
  toastrType?: any,
  title?: any,
  sortable?: any,
  headingConfig?: headerConfig[],
  paragrapghConfig?: headerConfig[],
  simpleCardConfig?: builderConfig[],
  chartCardConfig?: builderConfig[],
  audioSrc?: any,
  dataOnly?: any,
  nodes?:any,
  widgetSecondCard?: builderConfig[],
  widgetSectionCard?: builderConfig[],
  browserdata?: builderConfig[],
  visitordonutChart?: builderConfig[],
  saledDonutChart?: builderConfig[],
  analyticsChart?: builderConfig[],
  gridList?: any,
  gridData?: any,
  label?: string,
  min?: any,
  invoiceNumberLabel?: any,
  datelabel?: any,
  paymentTermsLabel?: any,
  poNumber?: any,
  billToLabel?: any,
  dueDateLabel?: any,
  shipToLabel?: any,
  notesLabel?: any,
  subtotalLabel?: any,
  dicountLabel?: any,
  shippingLabel?: any,
  taxLabel?: any,
  termsLabel?: any,
  totalLabel?: any,
  amountpaidLabel?: any,
  balanceDueLabel?: any,
  max?: any,
  sliderType?: any,
  disabled?: boolean,
  headingSize?: string,
  buttonFormat?: string,
  btngroupformat?: string,
  btnGroupPosition?: string,
  footer?: boolean,
  class?: string,
  isTitle?: boolean,
  textColor?: string,
  repeat?: any,
  color?: string,
  icon?: any,
  link?: string,
  forCommomComponentCondition?: string,
  pagination?: any,
  delete?: boolean,
  update?: boolean,
  create?: boolean,
  filter?: any,
  backGroundColor?: any,
  labelPosition?: string,
  repeatable?: any,
  alertPosition?: string,
  moduleName?: string,
  moduleId?: string,
  badge?: badge[],
  parentId?: number;
  isLayout?: boolean;
  subItems?: any;
  menuData?: any;
  key?: any;
  pattern?: any;
  emailTypeAllow?: any;
  refrance?: string;
  minlength?: number;
  maxlength?: number;
  required?: boolean;
  deleteapi?:string
}
