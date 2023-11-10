import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactivityService implements OnDestroy {
  private inactivityTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds
  private localStorageKey = 'lastActivityTime';
  private isLoggedInKey = 'isLoggedIn';
  private userActivitySubscription: Subscription;

  constructor(private router: Router) {
    this.startWatchingForInactivity();
    this.startWatchingStorageEvents();
  }

  private startWatchingForInactivity() {
    this.userActivitySubscription = timer(0, 1000).pipe(
      switchMap(() => {
        if (localStorage.getItem(this.isLoggedInKey) !== 'true') {
          return timer(0); // Not logged in, navigate to login
        }
        const lastActivity = parseInt(localStorage.getItem(this.localStorageKey) || '0', 10);
        const timePassed = Date.now() - lastActivity;
        return timePassed >= this.inactivityTimeout ? timer(0) : timer(this.inactivityTimeout - timePassed);
      }),
      tap(() => this.logout())
    ).subscribe();
  }

  private startWatchingStorageEvents() {
    fromEvent<StorageEvent>(window, 'storage').pipe(
      tap((event: StorageEvent | null) => {
        if (event && event.key === this.localStorageKey && localStorage.getItem(this.isLoggedInKey) !== 'true') {
          this.logout();
        }
      })
    ).subscribe();
  }

  updateUserActivity() {
    // If the user is active in any tab, update the activity timestamp in localStorage
    localStorage.setItem(this.localStorageKey, Date.now().toString());
  }

  logout() {
    console.log('User has been logged out due to inactivity or user action.');
    localStorage.removeItem(this.isLoggedInKey); // Clear the logged-in flag
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.userActivitySubscription) {
      this.userActivitySubscription.unsubscribe();
    }
  }
}
