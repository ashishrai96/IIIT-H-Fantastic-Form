import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SHA3 from 'sha3';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt: string = "dummy Token";
  isLoggedIn: boolean = false;
  redirectUrl: string = '/';

  constructor(private http:HttpClient) { }

  getToken(){
    return this.jwt;
  }

  setToken(token:string){
    this.jwt = token;
  }

  login(username, password) {
    password = this.encrypyPassword(password);
    this.http.post('https://6194ea0374c1bd00176c6a11.mockapi.io/api/vi/login', { username, password }).subscribe((resp: any) => {
      console.log("login", resp);
      this.jwt = resp.jwt;
      this.isLoggedIn = true;
    });
  }

  logout(username){
    this.isLoggedIn = false;
  }

  encrypyPassword(password) {
    const sha3 = new SHA3(256);
    sha3.update(password, 'base64');
    return sha3.digest('base64');
  }
}
