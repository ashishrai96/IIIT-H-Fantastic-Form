import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.scss']
})
export class SurveyBuilderComponent implements OnInit {

  showActionGroup:boolean = false;

  constructor(private router: Router){ }

  ngOnInit() {
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

}
