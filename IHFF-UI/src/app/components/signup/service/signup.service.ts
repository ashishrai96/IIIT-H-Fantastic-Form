import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  signup(firstname, lastname, email, password){

    let requestBody = {
      'firstname':firstname,
      'lastname':lastname,
      'email':email,
      'password':password
    };

    console.log(requestBody);
    //return this.http.post("",requestBody);
    return this.http.get("http://localhost:4200/assets/json/signup.json");
}

}
