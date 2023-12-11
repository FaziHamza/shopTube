import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:3000'; // Replace with your NestJS API endpoint

  constructor(private http: HttpClient) {}

  createGroup(groupData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/groups`, groupData);
  }

  updateGroup(groupId: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/groups/${groupId}`, updates);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/groups/${groupId}`);
  }

  addUserToGroup(groupId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/group-members/${groupId}/${userId}`, {});
  }

  // Add more methods for group management
}
