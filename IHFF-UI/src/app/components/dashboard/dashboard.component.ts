import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { SurveyBuilderService } from '../survey-builder/survey-builder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data:{ creatorId: number, formTitle: string }[] = [];

  constructor(private router: Router,
    private surveyService:SurveyBuilderService, private authService: AuthService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.surveyService.getAllFormByUser(this.authService.creatorId).subscribe((resp:any) => {
      console.log(resp);
      if(resp.status == 200){
        let forms:any[] = resp.forms
        this.data = [ ...forms.map(x => ({ 'creatorId': x.creator_id, 'formTitle': x.title })) ];
      }
    },
    err => {
      console.log(err);
      this.messageService.add({
        severity: 'error',
        summary: "Something went wrong",
        detail: "Try after sometime"
      });
    });
  }

  openForm(form) {
    this.router.navigateByUrl(`/survey/form/responses/${form.creatorId}/${form.formTitle}`);
  }

  createForm(){
    this.router.navigateByUrl("/survey/form/questions");
  }
  
}
