import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  signup(firstname, lastname, email, password){

    let requestBody = {
      'firstname':firstname,
      'lastname':lastname,
      'username':email,
      'password':this.authService.encrypyPassword(password)
    };

    console.log(requestBody);
    return this.http.post(environment.baseUrl + environment.api.register,requestBody);
    // return this.http.get("http://localhost:4200/assets/json/signup.json");
}

}
