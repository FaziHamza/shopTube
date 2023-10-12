import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApplicationService } from '../services/application.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthResolverService {

    constructor(private applicationService: ApplicationService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let screenId: string | null = route.paramMap.get('schema');
        return forkJoin(
            this.applicationService.getNestCommonAPI('cp/auth/pageAuth/' + screenId),
        )
            .pipe(
                map((response: any) => {
                    return response || [];
                },
                    catchError(error => this.handleError(error))
                ));
    }

    // helper methods
    private handleError(error: any) {
        return of(error);
    }
}

