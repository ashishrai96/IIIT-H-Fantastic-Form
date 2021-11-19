import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  
  showTab: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url.indexOf("/survey/form/live") >= 0) {
      this.showTab = false;
    }

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        console.log(val);
        if(val.url.indexOf("/survey/form/live") >= 0 || val.urlAfterRedirects.indexOf("/survey/form/live") >= 0) {
          this.showTab = false;
        }
        else{
          this.showTab = true;
        }
      }
    });
  }

}
