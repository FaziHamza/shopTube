import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map, Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../models/menu';
import { TreeNode } from '../models/treeNode';
import { ApiResponse } from 'src/common/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  protected baseUrl = environment.serverApiUrl;
  protected nestUrl = environment.nestBaseUrl;
  protected nestNewUrl = environment.nestNewBaseUrl;
  protected finalUrl = "";
  constructor(public http: HttpClient) { }

  jsonBuilderSetting(moduleName: any): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(
      this.baseUrl + "jsonBuilderSetting?moduleId=" + moduleName
    );
  }
  headerFooter(name: any): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(
      this.baseUrl + "jsonBuilderSetting?module=" + name
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
  // getJsonModules(moduleName: any): Observable<MenuItem[]> {
  //   return this.http.get<MenuItem[]>(
  //     this.baseUrl + "jsonModuleSetting?moduleName=" + moduleName
  //   );
  // }
  getJsonModules(moduleName: any): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      this.baseUrl + "jsonModuleSetting?moduleName=" + moduleName
    );
  }
  register(user: any) {
    return this.http.post(this.baseUrl + `users`, user);
  }
  jsonApplicationBuilder(): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonApplication"
    );
  }
  jsonModuleModuleList(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "jsonModule"
    );
  }
  getDatabaseTable(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "databaseTable"
    );
  }
  saveDatabaseTable(obj: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "databaseTable", obj
    );
  }
  saveSQLDatabaseTable(api: string, obj: any): Observable<any> {
    return this.http.post<any>(
      this.nestUrl + api, obj
    );
  }
  updateSQLDatabaseTable(api: string, obj: any): Observable<any> {
    return this.http.put<any>(
      this.nestUrl + api, obj
    );
  }
  deleteSQLDatabaseTable(api: string, obj: number): Observable<any> {
    return this.http.delete<any>(
      this.nestUrl + api + obj
    );
  }
  deleteCommonApi(api: string, id: any): Observable<any> {
    const url = api.includes('http') ? api : this.nestUrl + api
    return this.http.delete<any>(url  + '/'  + id);
  }
  getSQLDatabaseTable(api: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      api.includes('http') ? api : this.nestNewUrl + api
    );
  }
  getSQLDatabaseTableCRUD(api: string): Observable<any> {
    return this.http.get<any>(
      api.includes('http') ? api : this.nestUrl + api
    );
  }


}


