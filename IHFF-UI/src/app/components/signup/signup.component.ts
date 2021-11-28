import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { SignupService } from './service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  firstname: string;
  fname: boolean;
  lastname: string;
  lname: boolean;
  email: string;
  validateEmail: boolean;
  password: string;
  pwd: boolean;
  rpassword: string;
  rpwd: boolean;
  recheckPwd: boolean;
  respCheck: boolean;

  constructor(private signupService: SignupService, private router: Router,
              private messageService:MessageService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  signup() {
    this.fname = true;
    this.lname = true;
    this.validateEmail = true;
    this.pwd = true;
    this.rpwd = true;
    this.recheckPwd = true;
    this.respCheck = true;
    if (this.firstname == null || this.firstname.length == 0)
      this.fname = false;
    if (this.lastname == null || this.lastname.length == 0)
      this.lname = false;
    if (this.password == null || this.password.length == 0)
      this.pwd = false;
    if (this.rpassword == null || this.rpassword.length == 0)
      this.rpwd = false;
    if (this.rpwd == true && this.password != this.rpassword) {
      this.password = "";
      this.rpassword = "";
      this.pwd = false;
      this.recheckPwd = false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validateEmail = re.test(this.email);
    if (this.validateEmail == false) {
      this.email = "";
    }
    if (!this.fname || !this.lname || !this.password || !this.recheckPwd || !this.validateEmail) {
      return;
    }

    this.signupService.signup(this.firstname, this.lastname, this.email, this.password).subscribe((resp: any) => {
      console.log(resp);
      if(resp.status == 201){
        this.messageService.add({severity:'success', summary:'Successfully Registered!!', detail: resp.message});
        
        let fi = resp.firstname && resp.firstname.length>0?resp.firstname[0]:'';
        let li = resp.lastname && resp.lastname.length>0?resp.lastname[0]:'';
        this.authService.loginUser(this.email, resp.access_token, resp.id, fi+li);
        this.router.navigateByUrl("/survey/form/dashboard");
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail: resp.message});
      }
    },
    (err) => {
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error occurred', detail: err.error.message});
      });
  }
}
