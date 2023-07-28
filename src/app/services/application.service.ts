import { HttpClient } from '@angular/common/http';
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
    protected finalUrl = "";
    constructor(public http: HttpClient , public envService :EnvService) { }

    getNestCommonAPI(api: string): Observable<any> {
        return this.http.get<any>(
            this.nestUrl + api
        );
    }
    getNestCommonAPIById(api: string, id:string): Observable<any> {
        return this.http.get<any>(
            `${this.envService.nestBaseUrl}${api}/${id}`
        );
    }
    getNestBuilderAPIByScreen(api: string, id:string): Observable<any> {
        return this.http.get<any>(
            `${this.envService.nestBaseUrl}${api}/${id}`
        );
    }

    getNestCommonAPIByScreenId(api: string, id:string): Observable<any[]> {
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
            this.nestUrl + api, modal
        );
    }
    updateNestCommonAPI(api: string, id: any, modal: any): Observable<any[]> {
        return this.http.put<any[]>(
            this.nestUrl + api + `/${id}`, modal
        );
    }
    deleteNestCommonAPI(api: string, id: any): Observable<any[]> {
        return this.http.delete<any[]>(
            this.nestUrl + api + `/${id}`
        );
    }
    callApi(url: string, method: string, data?: any, headers?: any): Observable<any> {
      switch(method) {
        case 'POST':
          return this.http.post(this.nestUrl + url, data, { headers });
        case 'PUT':
          return this.http.put(this.nestUrl + url, data, { headers });
        // add other methods as required
        default:
          return this.http.get( this.nestUrl + url, { headers });
      }
    }
}
