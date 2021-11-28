import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private authService: AuthService) { }


  login(email, password){
      let requestBody = {
        'username':email,
        'password':this.authService.encrypyPassword(password)
      };

      return this.http.post(environment.baseUrl + environment.api.login,requestBody);
    //  return this.http.get("http://localhost:4200/assets/json/login.json");
  }

  logout(){
    return this.http.post(environment.baseUrl + environment.api.logout, {});
  }

  deleteUser(){
    return this.http.post(environment.baseUrl + environment.api.deleteUser, {});
  }
}
