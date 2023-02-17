import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../models/menu';
import { TreeNode } from '../models/treeNode';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    protected baseUrl = environment.serverApiUrl;
    protected finalUrl = "";
    constructor(public http: HttpClient) { }

    jsonBuilderSetting(moduleName: any): Observable<TreeNode[]> {
        return this.http.get<TreeNode[]>(
            this.baseUrl + "jsonBuilderSetting?moduleId=" + moduleName
        );
    }
    getFormGridData(id: string): Observable<any> {
        return this.http.get<any>(
            this.baseUrl + "froms/"
        );
    }
    getMenuData(roleId: number): Observable<any[]> {
        return this.http.get<any[]>(
            this.baseUrl + "menus?roleId=" + roleId
       );
    }
    getJsonModules(moduleName: any): Observable<MenuItem[]> {
      return this.http.get<MenuItem[]>(
        this.baseUrl + "jsonModuleSetting?moduleName=" + moduleName
      );
    }

}


