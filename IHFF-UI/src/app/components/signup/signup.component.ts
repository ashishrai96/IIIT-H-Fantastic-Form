import { Component, OnInit } from '@angular/core';
import { SignupService } from './service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstname:string;
  fname:boolean;
  lastname:string;
  lname:boolean;
  email:string;
  validateEmail:boolean;
  password:string;
  pwd:boolean;
  rpassword:string;
  rpwd:boolean;
  recheckPwd:boolean;
  respCheck:boolean;
  constructor(private signupService:SignupService) { }

  ngOnInit(): void {
  }
  signup(){
    this.fname=true;
    this.lname=true;
    this.validateEmail=true;
    this.pwd=true;
    this.rpwd=true;
    this.recheckPwd=true;
    this.respCheck=true;
    if(this.firstname==null || this.firstname.length==0)
      this.fname=false;
    if(this.lastname==null || this.lastname.length ==0)
      this.lname=false;
    if(this.password==null || this.password.length ==0)
      this.pwd=false;
    if(this.rpassword == null || this.rpassword.length==0)
      this.rpwd=false;
    if(this.rpwd == true && this.password != this.rpassword){
      this.password="";
      this.rpassword="";
      this.pwd=false;
      this.recheckPwd=false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validateEmail =re.test(this.email);
    if(this.validateEmail==false){
        this.email="";  
    }
    if( !this.fname || !this.lname || !this.password || !this.recheckPwd || !this.validateEmail){
      return;
    }
    this.signupService.signup(this.firstname,this.lastname,this.email,this.password).subscribe((resp) => {
      console.log(resp);
      if(resp['response'] != "success"){
        this.email="";
        this.respCheck=false;
        console.log("Some Error");
      }
    }, 
    (err)=> {
      console.log(err);
    });
  }
}
