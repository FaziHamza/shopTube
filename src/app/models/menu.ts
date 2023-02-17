export interface MenuItem {
  id?: number;
  moduleId?: number;
  label?: any;
  icon?: string;
  type?: string;
  link?: string;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  isLayout?: boolean;
  menuData?:any;
  color?:any;
  isShowChild?:any;
}
