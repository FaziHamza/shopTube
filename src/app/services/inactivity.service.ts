import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent, timer } from 'rxjs';
import { switchMap, tap, startWith  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactivityService implements OnDestroy {
  private inactivityTimeout = 10 * 60 * 1000; // 1 minute in milliseconds
  private localStorageKey = 'lastActivityTime';
  private userActivitySubscription: Subscription;

  constructor(private router: Router) {
    // this.startWatchingForInactivity();
    // this.startWatchingStorageEvents();
  }

  // startWatchingForInactivity() {
  //   this.userActivitySubscription = timer(0, 1000).pipe(
  //     switchMap(() => {
  //       const lastActivity = parseInt(localStorage.getItem(this.localStorageKey) || '0', 10);
  //       const timePassed = Date.now() - lastActivity;
  //       return timePassed >= this.inactivityTimeout ? timer(0) : timer(this.inactivityTimeout - timePassed);
  //     }),
  //     tap(() => this.logout())
  //   ).subscribe();
  // }

  startWatchingStorageEvents() {
    fromEvent<StorageEvent>(window, 'storage').pipe(
      startWith(null),
      tap((event: StorageEvent | null) => {
        if (event instanceof StorageEvent && event.key === this.localStorageKey) {
          this.resetTimer();
        }
      })
    ).subscribe();
  }
  

  resetTimer() {
    // If the user is active, reset the activity timer
    const lastActivityStr = localStorage.getItem(this.localStorageKey);
    if (lastActivityStr) {
      const lastActivity = parseInt(lastActivityStr, 10);
      if (Date.now() - lastActivity >= this.inactivityTimeout) {
        this.logout();
      }
    }
  }
  
  updateUserActivity() {
    // If the user is active in any tab, update the activity timestamp in localStorage
    localStorage.setItem(this.localStorageKey, Date.now().toString());
  }

  logout() {
    // localStorage.clear();
    // console.log('User has been logged out due to inactivity.');
    // localStorage.removeItem(this.localStorageKey);
    // this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.userActivitySubscription) {
      this.userActivitySubscription.unsubscribe();
    }
  }
}
