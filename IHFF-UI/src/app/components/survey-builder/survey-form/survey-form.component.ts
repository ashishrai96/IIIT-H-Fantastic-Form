import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  
  showTab: boolean = true;
  showQuestion: boolean = true;
  showResponse: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url.indexOf("/survey/form/live") >= 0) {
      this.showTab = false;
    }
    this.checkForTab(this.router.url);

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        console.log(val);
        if(val.url.indexOf("/survey/form/live") >= 0 || val.urlAfterRedirects.indexOf("/survey/form/live") >= 0) {
          this.showTab = false;
        }
        else{
          this.showTab = true;
        }
        this.checkForTab(val.urlAfterRedirects);
      }
    });
  }

  checkForTab(url){
    console.log(url);
    if(url.indexOf("questions") >= 0){
      this.showQuestion = true;
    }
    else{
      this.showQuestion = false;
    }
    if(url.indexOf("responses") >= 0){
      this.showResponse = true;
    }
    else{
      this.showResponse = false;
    }
  }

}
