import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AppResponse } from 'src/app/models/AppResponse';
// import { toFilteringUrl } from 'src/app/utility/util';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  message!: string;
  header: any;
  token!: string;
  headers!: HttpHeaders;
  profilePic: string = '';

  constructor(private http: HttpClient) {}

  getUser() {
    return JSON.parse(localStorage.getItem('userDetail')!);
  }
}
