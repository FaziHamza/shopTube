export interface MenuRolePermission {
    _id: string;
    menuId: string;
    menuItem: string;
    screenId: string;
    admin: string[];
    employee: string[];
    developer: string[];
    designer: string[];
    createdOn: string;
}