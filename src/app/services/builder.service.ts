import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map, Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../models/menu';
import { TreeNode } from '../models/treeNode';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {
  protected baseUrl = environment.serverApiUrl;
  protected nestUrl = environment.nestBaseUrl;
  protected nestNewUrl = environment.nestNewBaseUrl;
  protected finalUrl = "";
  constructor(public http: HttpClient) { }

  getjsonModuleModuleListByapplicationName(applicationName: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "jsonModule?applicationName=" + applicationName
    );
  }
  jsonDeleteBuilder(id: number): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonBuilderSetting/" + id
    );
  }
  jsonSaveBuilder(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonBuilderSetting", modal
    );
  }
  jsonBuilderSettingV1(moduleName: any): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(
      this.baseUrl + "jsonBuilderSetting?moduleName=" + moduleName
    );
  }
  jsonScreenModuleList(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "jsonScreenModule"
    );
  }
  checkScreen(screen: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "jsonScreenModule").pipe(
      map((screens: any[]) => {
        let screenName = screen.name.toLowerCase();
        let screenId = screen.screenId.toLowerCase();
        let found = screens.find(a => a.name.toLowerCase() == screenName || a.screenId.toLowerCase() == screenId);
        if (found) {
          if (found.name.toLowerCase() === screenName) {
            return { type: 'name', value: found.name };
          } else {
            return { type: 'screenId', value: found.screenId };
          }
        }
        return null;
      })
    );
  }

  jsonApplicationBuilder(): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonApplication"
    );
  }

  checkApplication(application: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "jsonApplication").pipe(
      map((applications: any[]) => {
        let lower = application.toLowerCase();
        let found = applications.find(a => a.name.toLowerCase() == lower);
        return found ? found : null;
      })
    );
  }

  jsonCompanyBuilder(): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "companyJson"
    );
  }
  jsonUIRuleGetData(moduleId: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonUIRuleData?moduleName=" + moduleId
    );
  }
  jsonUIRuleDataSave(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonUIRuleData", modal
    );
  }
  jsonUIRuleRemove(moduleId: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonUIRuleData/" + moduleId
    );
  }
  jsonActionRuleDataSave(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonActionRuleData", modal
    );
  }
  jsonActionRuleRemove(moduleId: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonActionRuleData/" + moduleId
    );
  }
  jsonBisnessRuleGet(moduleId: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonBuisnessRule?moduleId=" + moduleId
    );
  }
  jsonActionRuleDataGet(moduleId?: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonActionRuleData?moduleId=" + moduleId
    );
  }
  jsonBisnessRuleSave(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonBuisnessRule", modal
    );
  }
  jsonBisnessRuleRemove(moduleId: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonBuisnessRule/" + moduleId
    );
  }
  genericApis(api: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + api
    );
  }
  genericApisWithId(api: any, id: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + api + `?key=${id}`
    );
  }
  genericApisPost(api: any, data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + api, data
    );
  }
  languageUpdate(api: any, data: any): Observable<any> {
    return this.http.put<any>(
      this.nestUrl + api, data
    );
  }
  genericPost(id: any, modal: any, api: any): Observable<any[]> {
    return this.http.put<any[]>(
      this.baseUrl + api + "/" + id, modal
    );
  }
  genericApisDeleteWithId(api: any, id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + `${api}/` + id
    );
  }
  jsonGridBusinessRuleGet(moduleId: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonGridBusinessRule?moduleId=" + moduleId
    );
  }
  jsonGridBusinessRuleGridKey(gridKey: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonGridBusinessRule?gridKey=" + gridKey
    );
  }
  jsonGridConditionRemove(moduleId: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonGridCondition/" + moduleId
    );
  }
  jsonGridConditionSave(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonGridCondition", modal
    );
  }
  jsonGridConditionGet(moduleId: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonGridCondition?moduleId=" + moduleId
    );
  }
  jsonGridBusinessRuleSave(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonGridBusinessRule", modal
    );
  }
  jsonGridBusinessRuleRemove(moduleId: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonGridBusinessRule/" + moduleId
    );
  }
  multiAPIData(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "MultiAPIData"
    );
  }
  jsonTagsDataGet(api: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + api
    );
  }
  salesDataApi(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "salesDataApi"
    );
  }
  visitordonutChart(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "visitordonutChart"
    );
  }
  dashonicTemplates(model: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + model
    );
  }
  jsonUpdateModule(id: any, modal: any): Observable<any[]> {
    return this.http.put<any[]>(
      this.baseUrl + "jsonModuleSetting/" + id, modal
    );
  }
  jsonDeleteModule(id: number): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonModuleSetting/" + id
    );
  }
  jsonSaveModule(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonModuleSetting", modal
    );
  }
  getJsonModules(moduleName: any): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      this.baseUrl + "jsonModuleSetting?moduleName=" + moduleName
    );
  }
  screenById(moduleId: any): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(
      this.baseUrl + "jsonBuilderSetting?moduleId=" + moduleId
    );
  }
  jsonModuleSetting(): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonModule"
    );
  }
  checkModule(module: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "jsonModule").pipe(
      map((modules: any[]) => {
        let lower = module.toLowerCase();
        let found = modules.find(a => a.name.toLowerCase() == lower);
        return found ? found : null;
      })
    );
  }
  updateModule(id: any, modal: any): Observable<any[]> {

    return this.http.put<any[]>(
      this.baseUrl + "jsonModule/" + id, modal
    );
  }
  jsonModuleModuleList(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "jsonModule"
    );
  }
  addScreenModule(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonScreenModule", modal
    );
  }
  getScreenByModuleName(moduleName: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonScreenModule?applicationName=" + moduleName
    );
  }
  updateScreenModule(id: any, modal: any): Observable<any[]> {
    return this.http.put<any[]>(
      this.baseUrl + "jsonScreenModule/" + id, modal
    );
  }
  screenSettingForm(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "screenSetting"
    );
  }
  deletejsonScreenModule(id: number): Observable<any[]> {

    return this.http.delete<any[]>(
      this.baseUrl + "jsonScreenModule/" + id
    );
  }
  applicationBuilderForm(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "applicationBuilder"
    );
  }
  addApplicationBuilder(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonApplication", modal
    );
  }
  addCompanyBuilder(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "companyJson", modal
    );
  }
  addOrganization(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.nestUrl + "organization", modal
    );
  }
  checkCompanyName(company: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "companyJson").pipe(
      map((companies: any[]) => {
        let lowerCompany = company.toLowerCase();
        let foundCompany = companies.find(company => company.name.toLowerCase() === lowerCompany);
        return foundCompany ? foundCompany : null;
      })
    );
  }
  updateApplicationBuilder(id: any, modal: any): Observable<any[]> {
    return this.http.put<any[]>(
      this.baseUrl + "jsonApplication/" + id, modal
    );
  }
  updateCompanyBuilder(id: any, modal: any): Observable<any[]> {
    return this.http.put<any[]>(
      this.baseUrl + "companyJson/" + id, modal
    );
  }
  deleteApplicationBuilder(id: number): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonApplication/" + id
    );
  }
  deleteCompanyBuilder(id: number): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "companyJson/" + id
    );
  }
  moduleSettingForm(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "moduleSetting"
    );
  }
  jsonModuleHeader(): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonModuleHeader"
    )
  }
  addModule(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonModule", modal
    );
  }
  getModuleByApplicationName(applicationName: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonModule?applicationName=" + applicationName
    );
  }
  getApplicationByNewDomainName(domain: any): Observable<any> {
    return this.http.get<any>(
      this.nestNewUrl + `cp/domain/application/${domain}`
    );
  }
  // getApplicationByHeaderName(domain: any): Observable<any> {
  //   return this.http.get<any>(
  //     this.nestUrl + "cp/header/Application/" + domain
  //   );
  // }
  getUserAssignTask(screenId: any, applicationId: any): Observable<any> {
    return this.http.get<any>(
      this.nestUrl + "cp/userAssignTask/UserAssignTask/" + screenId + '/' + applicationId
    );
  }
  getusermenuAssignTask(applicationId: any): Observable<any> {
    return this.http.get<any>(
      this.nestUrl + "cp/userMenuAssignTask/UserAssignTask/" + applicationId
    );
  }

  deletejsonModule(id: number): Observable<any[]> {

    return this.http.delete<any[]>(
      this.baseUrl + "jsonModule/" + id
    );
  }
  jsonGetValidationRule(moduleId: any, key: any): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(
      this.baseUrl + "jsonBuilderValidationRule?moduleId=" + moduleId + "&id=" + key
    );
  }
  jsonGetScreenValidationRule(moduleId: any): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(
      this.baseUrl + "jsonBuilderValidationRule?moduleId=" + moduleId
    );
  }
  getCommentById(id: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "commentList?id=" + id
    );
  }
  jsonSaveValidationRule(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonBuilderValidationRule", modal
    );
  }
  jsonDeleteValidationRule(key: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonBuilderValidationRule/" + key
    );
  }
  jsonScreenDataSave(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "screenData", modal
    );
  }
  //NestJS
  saveTranslation(key: string, translation: string): Promise<void> {
    const url = `assets/i18n/en.json`;
    const payload = { key, translation };
    return this.http.post<void>(url, payload).toPromise();
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
      this.nestNewUrl + api, obj
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
  getSQLDatabaseTable(api: string): Observable<any> {
    return this.http.get<any>(
      this.nestNewUrl + api
    );
  }
  getPendingTableFields(api: string): Observable<any> {
    return this.http.get<any>(
      this.nestUrl + api
    );
  }
}


