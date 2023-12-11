// friend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private baseUrl = environment.nestBaseUrl; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  sendFriendRequest(targetUserId: string): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('user')!).userId
    return this.http.post(`${this.baseUrl}friends/send-request/${userId}/${targetUserId}`, {});
  }

  acceptFriendRequest(requestId: string): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('user')!).userId
    return this.http.post(`${this.baseUrl}friends/accept-request/${requestId}`, {user:userId});
  }

  rejectFriendRequest(requestId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}friends/reject-request/${requestId}`, {});
  }

  searchFriends(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}friends/search?keyword=${keyword}`);
  }
  getFriendRequestList(): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('user')!).userId
    return this.http.get(`${this.baseUrl}friends/requests/${userId}`);
  }
}
