import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  encryptSecretKey = "@12356489231SFSJDFPOSFSDF5464954$%#%DZGDSDFDSF"; //adding secret key

  getToken(): String {
    const getToken = window.localStorage['jwtToken'];
    var result = CryptoJS.AES.decrypt(getToken, this.encryptSecretKey).toString(CryptoJS.enc.Utf8);
    return result;
  }

  saveToken(token: any) {
    var result = CryptoJS.AES.encrypt(token, this.encryptSecretKey).toString();
    window.localStorage['jwtToken'] = result;
  }

  destroyToken() {
    // window.localStorage.removeItem('jwtToken');
    window.localStorage.clear();
  }
}
