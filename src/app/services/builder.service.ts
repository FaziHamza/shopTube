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
export class BuilderService {
  protected baseUrl = environment.serverApiUrl;
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
  jsonApplicationBuilder(): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "jsonApplication"
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
  checkScreenAlreadyExistOrNot(id: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "jsonScreenModule?screenId=" + id
    );
  }
  checkScreenAlreadyExistOrNotWithName(screenName: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "jsonScreenModule?applicationName=" + screenName
    );
  }
  addScreenModule(modal: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "jsonScreenModule", modal
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
  updateApplicationBuilder(id: any, modal: any): Observable<any[]> {
    return this.http.put<any[]>(
      this.baseUrl + "jsonApplication/" + id, modal
    );
  }
  deleteApplicationBuilder(id: number): Observable<any[]> {
    return this.http.delete<any[]>(
      this.baseUrl + "jsonApplication/" + id
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
  deletejsonModule(id: number): Observable<any[]> {

    return this.http.delete<any[]>(
      this.baseUrl + "jsonModule/" + id
    );
  }
}


