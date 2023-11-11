import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactivityService implements OnDestroy {
  private inactivityTimeout = 1 * 60 * 1000; // 10 minutes in milliseconds
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
        const isLoggedIn = localStorage.getItem(this.isLoggedInKey) === 'true';
        console.log('Checking activity. Is Logged In:', isLoggedIn);

        if (!isLoggedIn) {
          return timer(0); // Not logged in, navigate to login
        }

        const lastActivity = parseInt(localStorage.getItem(this.localStorageKey) || '0', 10);
        const timePassed = Date.now() - lastActivity;
        const timeLeft = this.inactivityTimeout - timePassed;
        console.log('Time passed:', timePassed, 'Time left:', timeLeft);

        return timeLeft <= 0 ? timer(0) : timer(timeLeft);
      }),
      tap(() => {
        console.log('Executing logout due to inactivity.');
        this.logout();
      })
    ).subscribe();
  }

  private startWatchingStorageEvents() {
    fromEvent<StorageEvent>(window, 'storage').pipe(
      tap((event: StorageEvent | null) => {
        if (event && event.key === this.localStorageKey && localStorage.getItem(this.isLoggedInKey) !== 'true') {
          console.log('Detected logout from another tab.');
          this.logout();
        }
      })
    ).subscribe();
  }

  updateUserActivity() {
    console.log('User activity detected.');
    localStorage.setItem(this.localStorageKey, Date.now().toString());
  }

  logout() {
    console.log('Logging out user.');
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
