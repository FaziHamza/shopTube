import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(public http: HttpClient) { }

  getTopicData(): Observable<any> {
    return this.http.get<any>(
      `https://siteofsports.com/v2/api/topics-with-subtopics`
    );
  }
}
