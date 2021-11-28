import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  check:boolean;
  validateEmail:boolean;
  emptyPwd:boolean;
  email:string;
  password:string;
  
  constructor(private router: Router, private messageService: MessageService,
    private loginService : LoginService, private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  login(){
    console.log(this.email,this.password);
    this.validateEmail=true;
    this.emptyPwd=true;
    this.check=true;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validateEmail =re.test(this.email);
    if(this.validateEmail==false){
        this.email=""; 
    }
    if(this.password ==null || this.password.length ==0 ){
      this.emptyPwd=false;
    }
    if(this.emptyPwd ==false || this.validateEmail ==false){
      return;
    }

    this.loginService.login(this.email,this.password).subscribe((resp: any) => {
      console.log(resp);
      if(resp['status'] != 200){
        // this.email="";
        // this.password="";
        this.check=false;
      }
      else{
        // this.authService.isLoggedIn = true;
        // this.authService.username = this.email;
        // this.authService.setToken(resp.access_token);
        // this.authService.isLoggedInSub.next(true);
        // this.authService.creatorId = resp.id;
        let fi = resp.firstname && resp.firstname.length>0?resp.firstname[0]:'';
        let li = resp.lastname && resp.lastname.length>0?resp.lastname[0]:'';
        this.authService.loginUser(this.email, resp.access_token, resp.id, fi+li);

        let url = this.authService.redirectUrl;
        if(url && url != "/"){
          this.router.navigateByUrl(url);
        }
        else{
          this.router.navigate(['/survey/form/dashboard']);
        }
      }
    }, 
    (err)=> {
      console.log(err);
      this.check = false;
    });
  }

}
