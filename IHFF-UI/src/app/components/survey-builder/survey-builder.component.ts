import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from '../login/service/login.service';
import { SurveyBuilderDataExchangeService } from './survey-builder-data-exchange.service';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.scss']
})
export class SurveyBuilderComponent implements OnInit {

  showActionGroup: boolean = false;
  preview: boolean = false;
  isLoggedIn: boolean = false;
  userLabel: string = null;
  userOptions = [ { name: 'Delete Account', code: 'DU' } ];
  showOption:boolean = false;

  constructor(private router: Router, private loginService: LoginService,
    private authService: AuthService, private messageService: MessageService,
    private surveyDataExchange: SurveyBuilderDataExchangeService){ }

  ngOnInit() {
    if(this.router.url == "/survey/form/questions") {
      this.showActionGroup = true;
    }

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        console.log(val);
        if(val.url == "/survey/form/questions" || val.urlAfterRedirects == "/survey/form/questions") {
          this.showActionGroup = true;
        }
        else{
          this.showActionGroup = false;
        }
      }
    });

    this.authService.isLoggedInSub.subscribe((initial) => {
      this.isLoggedIn = initial != null;
      this.userLabel = initial;
    });
  }

  togglePreview() {
    this.preview = !this.preview;
    this.surveyDataExchange.setPreview(this.preview);
  }

  publishForm() {
    this.surveyDataExchange.triggerPublish();
  }

  logoutUser(){
    this.loginService.logout().subscribe((resp:any) => {
      this.authService.logoutUser();
      this.userLabel = null;

      this.router.navigate(['/']);
    },
    err=>{
      this.authService.logoutUser();
      this.userLabel = null;

      this.router.navigate(['/']);
    });
  }

  deleteUser() {
    this.showOption = false;
    console.log("delete user");

    this.loginService.deleteUser().subscribe((resp:any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'User deleted successfully'
      });
      this.authService.logoutUser();
      this.userLabel = null;

      this.router.navigate(['/']);
    },
    err => {
      this.messageService.add({
        severity: 'error',
        summary: 'User deletion failed'
      });
    });

  }

}
