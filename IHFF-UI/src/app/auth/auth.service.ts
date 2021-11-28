import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import SHA3 from 'sha3';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt: string = "";
  isLoggedIn: boolean = false;
  redirectUrl: string = '/';
  username:string;
  creatorId:number;

  isLoggedInSub:BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http:HttpClient, private router: Router) { }

  getToken(){
    return this.jwt;
  }

  setToken(token:string){
    this.jwt = token;
  }

  // login(username, password, ) {
  //   password = this.encrypyPassword(password);
  //   return this.http.post('https://6194ea0374c1bd00176c6a11.mockapi.io/api/vi/login', { username, password })
  //   .pipe(tap((resp: any) => {
  //     console.log("login", resp);
  //     this.jwt = resp.jwt;
  //     this.isLoggedIn = true;
  //     return resp;
  //   }));
  // }

  // logout(username){
  //   this.isLoggedIn = false;
  //   this.router.navigate(["/"])
  // }

  loginUser(username, token, creatorId, initials) {
    this.isLoggedIn = true;
    this.username = username;
    this.setToken(token);
    this.isLoggedInSub.next(initials);
    this.creatorId = creatorId;

    sessionStorage.setItem('user', JSON.stringify({
      "username": username,
      "token": token,
      "creatorId": creatorId,
      "initials": initials
    }));
  }

  logoutUser() {
    this.isLoggedIn = false;
    this.username = null;
    this.setToken(null);
    this.isLoggedInSub.next(null);
    this.redirectUrl = "/";

    sessionStorage.removeItem('user');
  }

  encrypyPassword(password) {
    const sha3 = new SHA3(256);
    sha3.update(password, 'base64');
    return sha3.digest('base64');
  }
}
