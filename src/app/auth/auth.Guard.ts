import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
      // debugger

        if (!localStorage.getItem('authToken')) { // or however you manage your user authentication
            this.router.navigate(['/auth/login']); // navigate to login if not authenticated
            return false;
        }
        return true;
    }
}
