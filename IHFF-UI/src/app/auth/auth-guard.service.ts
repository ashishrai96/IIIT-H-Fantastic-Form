import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url = state.url;

    let session = sessionStorage.getItem('user');
    if(this.authService.isLoggedIn){
      return true;
    }
    else if(session != null){
      session = JSON.parse(session);
      this.authService.loginUser(session['username'], session['token'], session['creatorId'], session['initials']);
      return true;
    }
    else{
      this.authService.redirectUrl = url;
      console.log("redirected to login");
      this.router.navigate(['/survey/login']);
      return false;
    }
  }
}
