import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map, Observable, observable } from 'rxjs';
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
    login(email: string, password: string) {

        return this.http.get<any>(this.baseUrl + 'users?email=' + email + '&pwd=' + password)

            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.length > 0) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // this.currentUserSubject.next(user);
                }
                else {
                    alert("Invalid login")
                }
                return user;
            }));
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
    register(user: any) {
        return this.http.post(this.baseUrl +`users`, user);
    }
    

}


