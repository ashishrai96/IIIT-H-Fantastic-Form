import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SurveyBuilderDataExchangeService } from './survey-builder-data-exchange.service';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.scss']
})
export class SurveyBuilderComponent implements OnInit {

  showActionGroup:boolean = false;
  preview: boolean = false;

  constructor(private router: Router, 
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
  }

  togglePreview() {
    this.preview = !this.preview;
    this.surveyDataExchange.setPreview(this.preview);
  }

  publishForm() {
    this.surveyDataExchange.triggerPublish();
  }

}
