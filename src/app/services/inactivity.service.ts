import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap, startWith } from 'rxjs/operators';
import { Subject, Observable, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds
  private userActivity = new Subject();
  private userActivitySubscription: Subscription;
  
  constructor(private router: Router) {
    this.watchUserActivity();
  }

  watchUserActivity() {
    // Start watching for user activity.
    this.userActivitySubscription = this.userActivity.pipe(
      startWith(null),
      // When user activity is detected, restart the timer
      switchMap(() => timer(this.inactivityTimeout)),
      tap(() => this.logout())
    ).subscribe();
  }

  updateUserActivity() {
    // Called by the app component on user activity
    this.userActivity.next(undefined);
  }

  logout() {
    window.localStorage.clear();
    localStorage.clear();
    // Here you would normally do whatever is needed to log out the user,
    // like clearing the session, informing the backend, etc.
    console.log('User has been logged out due to inactivity.');
    // Navigate to the login page or show any other logout confirmation
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.userActivitySubscription) {
      this.userActivitySubscription.unsubscribe();
    }
  }
}