import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { FormElement } from 'src/app/shared/models/form-element.model';
import { SurveyBuilderService } from '../../survey-builder.service';

@Component({
  selector: 'app-form-live',
  templateUrl: './form-live.component.html',
  styleUrls: ['./form-live.component.scss']
})
export class FormLiveComponent implements OnInit {

  formData: any;
  formTitle: string;
  creatorId: string;

  constructor(private activateRoute: ActivatedRoute, private router:Router,
    private messageService:MessageService,
    private surveyService: SurveyBuilderService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params:Params) => {
      console.log(params);
      if(params != null){
        this.creatorId = params['creatorId'];
        this.formTitle = params['title'];

        this.loader.start();
        this.surveyService.showForm(this.creatorId, this.formTitle).subscribe((resp:any) => {
          this.formData = resp;
          this.formTitle = resp.title;
          this.loader.stop();
        },
        err => {
          console.error(err);
          this.loader.stop();
        });
      }
    });
  }

  submitResponse(){
    console.log("To submit = ", this.formData);
    this.surveyService.submitResponse(this.formData, this.creatorId, this.formTitle)
      .subscribe((resp:any) => {
        this.messageService.add({
          severity: 'success',
          summary: resp.message
        });

        this.router.navigateByUrl("/survey/submitted");
      },
      err => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to submit'
        });
      });
  }

}
