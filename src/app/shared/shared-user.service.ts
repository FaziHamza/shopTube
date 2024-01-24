import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  private _user!: any;
  constructor() {
  }
  encryptSecretKey = "@12356489231SFSJDFPOSFSDF5464954$%#%DZGDSDFDSF"; //adding secret key
  getUser() {
    if (!this._user) {

    }
    return this._user;
  }
  setAppLication(user: any) {
    var result = CryptoJS.AES.encrypt(user?.applicationId, this.encryptSecretKey).toString();
    window.localStorage['applicationId'] = JSON.stringify(result);
  }
  getAppLication(user: any) {
    const getToken = JSON.parse(window.localStorage['applicationId']);
    var result = CryptoJS.AES.decrypt(getToken, this.encryptSecretKey).toString(CryptoJS.enc.Utf8);
    return result;
  }
}
