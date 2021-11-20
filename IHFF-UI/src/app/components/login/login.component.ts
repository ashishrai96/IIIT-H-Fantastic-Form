import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  check:boolean=true;
  validateEmail:boolean=true;
  emptyPwd:boolean=true;
  email:string;
  password:string;
  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    
  }

  login(){
    console.log(this.email,this.password);
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validateEmail =re.test(this.email);
    if(this.validateEmail==false){
        this.email="";
        return;  
    }
    if(this.password == null ){
      this.emptyPwd=false;
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
