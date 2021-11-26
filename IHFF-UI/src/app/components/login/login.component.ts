import { Component, OnInit } from '@angular/core';
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
  constructor(private loginService : LoginService) { }

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
    this.loginService.login(this.email,this.password).subscribe((resp) => {
      console.log(resp);
      if(resp['response'] != "success"){
        this.email="";
        this.password="";
        this.check=false;
      }
    }, 
    (err)=> {
      console.log(err);
    });
  }

}
