// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.nestBaseUrl; // Replace with your NestJS backend URL

  constructor(private http: HttpClient) {}

  getProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}auth/${userId}`);
  }

  updateProfile(userId: string, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}auth/${userId}`, profileData);
  }
}
