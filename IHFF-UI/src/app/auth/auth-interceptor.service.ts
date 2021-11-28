import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken();
    
    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      map(event => {
        return event;
      }),
      catchError((errorEvent: HttpErrorResponse, _:Observable<HttpEvent<any>>) => {
        if(errorEvent.status == HttpStatusCode.Unauthorized){
          this.authService.logoutUser();
          this.router.navigateByUrl("/survey/login");
        }
        return throwError(errorEvent);
      }));
  }
}
