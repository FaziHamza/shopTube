import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Replace with your NestJS API endpoint

  constructor(private http: HttpClient) {}

  updateUser(userId: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, updates);
  }

  sendFriendRequest(senderId: string, receiverId: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/friend-requests/${senderId}/${receiverId}`,
      {}
    );
  }

  // Add more methods for user management
}
