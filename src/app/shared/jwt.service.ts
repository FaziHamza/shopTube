import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  encryptSecretKey = "@12356489231SFSJDFPOSFSDF5464954$%#%DZGDSDFDSF"; //adding secret key
  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    // window.localStorage.removeItem('jwtToken');
    window.localStorage.clear();
  }
  ecryptedValue(property: any, value: any, stringify: any) {
    var result = CryptoJS.AES.encrypt(value, this.encryptSecretKey).toString();
    window.localStorage[property] = stringify ? JSON.stringify(result) : result;
  }

  decryptedValue(property: any, value: any, parse: any) {
    var result = CryptoJS.AES.decrypt(value, this.encryptSecretKey).toString(CryptoJS.enc.Utf8);

  }

}
