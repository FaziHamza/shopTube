import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private timer: any;
  private timeoutMinutes = 10; // Set the inactivity timeout duration (e.g., 15 minutes)

  constructor(private router: Router) {}

  resetTimer(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.logout(); // Call your logout function here
    }, this.timeoutMinutes * 60 * 1000); // Convert minutes to milliseconds
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keydown', ['$event'])
  activity(event: Event): void {
    this.resetTimer();
  }

  logout(): void {
    window.localStorage.clear();
    localStorage.clear();
    // Perform logout actions, e.g., clear user data, navigate to login page
    this.router.navigate(['/login']);
  }
}
