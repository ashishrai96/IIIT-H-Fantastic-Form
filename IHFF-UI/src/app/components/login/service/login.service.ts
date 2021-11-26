import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  login(email, password){

      let requestBody = {
        'email':email,
        'password':password
      };

      //this.http.post("",requestBody);
     return this.http.get("http://localhost:4200/assets/json/login.json");
  }
}
