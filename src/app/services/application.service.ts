import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvService } from '../shared/envoirment.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  protected baseUrl = environment.serverApiUrl;
  protected nestUrl = environment.nestBaseUrl;
  protected nestNewUrl = environment.nestNewBaseUrl;
  protected finalUrl = "";
  constructor(public http: HttpClient, public envService: EnvService) { }

  getNestCommonAPI(api: string): Observable<any> {
    return this.http.get<any>(
      api.includes('http') ? api : this.nestUrl + api
    );
  }
  getNestNewCommonAPI(api: string): Observable<any> {
    return this.http.get<any>(
      api.includes('http') ? api : this.nestNewUrl + api
    );
  }
  getNestCommonAPIById(api: string, id: string): Observable<any> {
    return this.http.get<any>(
      `${this.envService.nestBaseUrl}${api}/${id}`
    );
  }
  getNestNewCommonAPIById(api: string, id: string): Observable<any> {
    return this.http.get<any>(
      `${this.nestNewUrl}${api}/${id}`
    );
  }
  getNestBuilderAPIByScreen(api: string, id: string): Observable<any> {
    return this.http.get<any>(
      `${this.envService.nestBaseUrl}${api}/${id}`
    );
  }

  getNestCommonAPIByScreenId(api: string, id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.envService.nestBaseUrl}${api}/${id}`
    );
  }
  // getNestCommonAPIByCustomQuery(api: string, customQuery:string): Observable<any[]> {
  //     return this.http.get<any[]>(
  //         this.nestUrl + api + customQuery
  //     );
  // }
  addNestCommonAPI(api: string, modal: any): Observable<any> {
    return this.http.post<any>(
      api.includes('http') ? api : this.nestUrl + api, modal
    );
  }
  addNestNewCommonAPI(api: string, modal: any): Observable<any> {
    return this.http.post<any>(
      api.includes('http') ? api : this.nestNewUrl + api, modal
    );
  }
  getBackendCommonAPI(api: string): Observable<any> {
    return this.http.get<any>(
      api.includes('http') ? api : this.nestUrl + api
    );
  }
  updateNestCommonAPI(api: string, id: any, modal: any): Observable<any> {
    return this.http.put<any>(
      this.nestUrl + api + `/${id}`, modal
    );
  }
  updateNestNewCommonAPI(api: string, id: any, modal: any): Observable<any> {
    return this.http.put<any>(
      this.nestNewUrl + api + `/${id}`, modal
    );
  }
  deleteNestCommonAPI(api: string, id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.nestUrl + api + `/${id}`
    );
  }
  deleteNestNewCommonAPI(api: string, id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.nestNewUrl + api + `/${id}`
    );
  }
  deleteNestApi(api: string): Observable<any[]> {
    return this.http.delete<any[]>(
      this.nestUrl + api
    );
  }
  callApi(url: string, method: string, data?: any, headers?: any, parentId?: any): Observable<any> {
    let apiUrl = url.includes('http') ? url : this.nestNewUrl + url;

    if (method === 'get' && parentId) {
      // Assuming apiUrl already has a base URL
      apiUrl += `/${parentId}`;
    }

    switch (method) {
      case 'POST':
        return this.http.post(apiUrl, data, { headers });
      case 'PUT':
        return this.http.put(apiUrl, data, { headers });
      // add other methods as required
      default:
        return this.http.get(apiUrl, { headers });
    }
  }


  commonCallApi(url: string, method: string, data?: any, headers?: any): Observable<any> {
    switch (method) {
      case 'post':
        return this.http.post(url.includes('http') ? url : this.nestUrl + url, data, { headers });
      case 'put':
        return this.http.put(url.includes('http') ? url : this.nestUrl + url, data, { headers });
      case 'delete':
        return this.http.delete(url.includes('http') ? url : this.nestUrl + url, data);
      // add other methods as required
      default:
        return this.http.get(url.includes('http') ? url : this.nestUrl + url, { headers });
    }
  }
  uploadS3File(formData: FormData): Observable<any> {
    const url = this.nestNewUrl + "s3-file-manager";
    const headers = new HttpHeaders(); // You may need to set appropriate headers if required

    return this.http.post(url, formData, { headers });
  }
  deleteS3File(path: string): Observable<any> {
    const encodedPath = encodeURIComponent(path);
    const url = `${this.nestUrl}s3-file-manager?path=${encodedPath}`;
    return this.http.delete(url);
  }
  downloadFile(url: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = window.URL.createObjectURL(blob);

      a.href = objectUrl;
      a.download = url;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(objectUrl);
      document.body.removeChild(a);
    });
  }
  jsonStringifyWithObject(data: any) {
    return JSON.stringify(data, function (key, value) {
      if (typeof value == 'function') {
        return value.toString();
      } else {
        return value;
      }
    }) || '{}'
  }
  jsonParseWithObject(data: any) {
    return JSON.parse(
      data, (key, value) => {
        if (typeof value === 'string' && value.startsWith('(') && value.includes('(model)')) {
          return eval(`(${value})`);
        }
        return value;
      });
  }
}
