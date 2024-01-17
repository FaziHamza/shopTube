import { environment } from './../../../environments/environment';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
// import { JwtService } from 'src/app/shared/services/jwt.service';
// import { ApiConstants } from 'src/app/shared/common/constants';
// import { AppResponse } from 'src/app/models/AppResponse';
import { User } from 'src/app/models/employee';
import { JwtService } from 'src/app/shared/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1)

  constructor(private router: Router, private jwtService: JwtService, private http: HttpClient
    , handler: HttpBackend) { this.http = new HttpClient(handler) }

  // 1  Set Auth
  setAuth(user: any) {
    
    // saving JWT sent from Server, in LocalStorage
    this.jwtService.saveToken(user.access_token);
    window.localStorage['user'] = JSON.stringify(user);
    window.localStorage['authToken'] = JSON.stringify(user?.access_token);
    window.localStorage['applicationId'] = JSON.stringify(user?.applicationId);
    window.localStorage['organizationId'] = JSON.stringify(user?.organizationId);


    // set current user data into  Observable
    this.currentUserSubject.next(user)

    // set isAuthenticated to true
    this.isAuthenticatedSubject.next(true)
  }

  // 2 getCurrent User
  getCurrentUser(): User {
    return this.currentUserSubject.value
  }

  // 3 Destroying Auth
  purgeAuth() {
    // Remove JWT from localStorage.
    this.jwtService.destroyToken();

    // Set Current User to an empty Object
    this.currentUserSubject.next({} as User);

    // Set Auth Status to false
    this.isAuthenticatedSubject.next(false);
    if (!(this.router.url === '/')) {
      this.router.navigateByUrl('/login')
    }
  }

  //   Login:
  public loginUser(model: any) {
    let url = environment.nestNewBaseUrl + `auth/login/login`;
    return this.http.post(url, model)
  }

  //   Login:
  public forgotUser(model: any) {
    let url = environment.nestNewBaseUrl + "forgot";
    return this.http.post(url, model)
  }

  public registerUser(model: any) {
    let url = environment.nestNewBaseUrl + "auth/signup";
    return this.http.post(url, model)
  }
  public resetpassword(model: any) {
    let url = environment.nestNewBaseUrl + "forgot/resetpassword";
    return this.http.post(url, model)
  }
  getNestCommonAPI(api: string): Observable<any> {
    return this.http.get<any>(
      api.includes('http') ? api : environment.nestNewBaseUrl + api
    );
  }
  getNestNewCommonAPI(api: string): Observable<any> {
    return this.http.get<any>(
      api.includes('http') ? api : environment.nestNewBaseUrl + api
    );
  }
  addNestCommonAPI(api: string, modal: any): Observable<any> {
    return this.http.post<any>(
      api.includes('http') ? api : environment.nestBaseUrl + api, modal
    );
  }
  // Register
  // public userRegister(model: LoginModel) {
    
  //   // model["userName"] = model["email"];
  //   let url = environment.administration + ApiConstants.apiEndPoints.auth.register;
  //   return this.http.post(url, model);
  // }
  
}
