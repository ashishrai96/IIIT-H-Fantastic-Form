import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    this.http.post('https://6194ea0374c1bd00176c6a11.mockapi.io/api/vi/login', { username, password }).subscribe((resp: any) => {
      console.log("login", resp);
      this.jwt = resp.jwt;
      this.isLoggedIn = true;
    });
  }

  logout(username){
    this.isLoggedIn = false;
  }
}
